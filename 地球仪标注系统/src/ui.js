/* =====================================================================
 * 界面层：列表、筛选、详情弹窗、示意图
 * ===================================================================== */
(function (global) {
  'use strict';
  const B = global.__GLOBE__;
  const S = B.S;
  const C = global.CAT_COLORS;

  /* ---------------------- 纹理工具 ---------------------- */
  function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function hexToRgb(hex) {
    const n = parseInt(hex.replace('#', ''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgba(hex, a) {
    const [r, g, b] = hexToRgb(hex);
    return `rgba(${r},${g},${b},${a})`;
  }

  /** 地形叠层：等高线 + 随机斑块，做出"地表质感" */
  function drawTerrain(ctx, x, y, w, h, seed, accent) {
    let s = seed || 1;
    const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    ctx.save();
    roundRect(ctx, x, y, w, h, 14); ctx.clip();

    // 底色渐变
    const g = ctx.createLinearGradient(x, y, x + w, y + h);
    g.addColorStop(0, '#0d2233');
    g.addColorStop(0.5, '#0a2c3d');
    g.addColorStop(1, '#0b1e2c');
    ctx.fillStyle = g; ctx.fillRect(x, y, w, h);

    // 远山剪影
    for (let layer = 0; layer < 3; layer++) {
      ctx.beginPath();
      const baseY = y + h * (0.42 + layer * 0.16);
      ctx.moveTo(x, y + h);
      ctx.lineTo(x, baseY);
      let cx = x;
      while (cx < x + w) {
        const step = 30 + rnd() * 60;
        const peak = baseY - (10 + rnd() * 46) * (1 - layer * 0.22);
        ctx.quadraticCurveTo(cx + step * 0.4, peak, cx + step, baseY - rnd() * 12);
        cx += step;
      }
      ctx.lineTo(x + w, y + h);
      ctx.closePath();
      const gg = ctx.createLinearGradient(0, baseY - 60, 0, y + h);
      gg.addColorStop(0, rgba(accent, 0.10 + layer * 0.05));
      gg.addColorStop(1, 'rgba(5,14,22,0.0)');
      ctx.fillStyle = gg; ctx.fill();
    }

    // 等高线
    ctx.strokeStyle = rgba(accent, 0.16);
    ctx.lineWidth = 1;
    for (let i = 0; i < 9; i++) {
      ctx.beginPath();
      const yy = y + h * (0.12 + i * 0.095);
      ctx.moveTo(x, yy);
      for (let xx = x; xx < x + w; xx += 18) {
        ctx.lineTo(xx, yy + Math.sin((xx + i * 40) * 0.012 + seed) * 8 + Math.cos((xx - i * 20) * 0.02) * 4);
      }
      ctx.stroke();
    }

    // 星星点点（灯火）
    for (let i = 0; i < 60; i++) {
      const px = x + rnd() * w, py = y + rnd() * h;
      ctx.fillStyle = `rgba(255,235,180,${0.05 + rnd() * 0.22})`;
      ctx.beginPath(); ctx.arc(px, py, rnd() * 1.4 + 0.3, 0, Math.PI * 2); ctx.fill();
    }

    // 扫描线
    for (let yy = y; yy < y + h; yy += 3) {
      ctx.fillStyle = 'rgba(0,0,0,0.10)';
      ctx.fillRect(x, yy, w, 1);
    }
    ctx.restore();

    // 边框
    ctx.save();
    roundRect(ctx, x + 0.5, y + 0.5, w - 1, h - 1, 14);
    ctx.strokeStyle = rgba(accent, 0.55);
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  /* ---------------------- 三类示意图 ---------------------- */
  const KINDS = {
    桥梁: { title: '桥梁 · 结构意象', draw: drawBridge },
    公路: { title: '公路 · 线形意象', draw: drawRoad },
    铁路: { title: '铁路 · 线形意象', draw: drawRail },
    轨道交通: { title: '轨道 · 线形意象', draw: drawRail },
    能源: { title: '能源 · 设施意象', draw: drawPlant },
    工业: { title: '工业 · 厂区意象', draw: drawMill },
    城市开发: { title: '城市开发 · 天际线意象', draw: drawTower },
    超高层: { title: '超高层 · 天际线意象', draw: drawTower },
    住宅: { title: '住宅 · 模块意象', draw: drawTower },
    酒店: { title: '酒店 · 天际线意象', draw: drawTower },
    公共建筑: { title: '公共建筑 · 立面意象', draw: drawTower },
    教育建筑: { title: '教育建筑 · 校园意象', draw: drawTower },
    文化建筑: { title: '文化建筑 · 立面意象', draw: drawTower },
    文化遗产: { title: '文化遗产 · 风貌意象', draw: drawTower },
    民生: { title: '民生工程 · 空间意象', draw: drawTower },
    体育建筑: { title: '体育建筑 · 场馆意象', draw: drawTower },
    交通枢纽: { title: '枢纽 · 流线意象', draw: drawTower },
    产业园: { title: '产业园 · 厂区意象', draw: drawMill },
    景观: { title: '景观 · 空间意象', draw: drawTower },
    市政: { title: '市政 · 管网意象', draw: drawRoad }
  };

  function drawBridge(ctx, w, h, color) {
    ctx.clearRect(0, 0, w, h);
    drawTerrain(ctx, 0, 0, w, h, 7, color);
    // 水面
    const wy = h * 0.62;
    const wg = ctx.createLinearGradient(0, wy, 0, h);
    wg.addColorStop(0, rgba(color, 0.22));
    wg.addColorStop(1, 'rgba(6,20,34,0.9)');
    ctx.fillStyle = wg; ctx.fillRect(0, wy, w, h - wy);
    ctx.strokeStyle = rgba(color, 0.22);
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      const yy = wy + 8 + i * 8;
      ctx.moveTo(0, yy);
      for (let x = 0; x <= w; x += 14) ctx.lineTo(x, yy + Math.sin(x * 0.05 + i) * 2.4);
      ctx.stroke();
    }
    // 斜拉桥
    const deck = h * 0.50, py = h * 0.10;
    ctx.strokeStyle = rgba(color, 0.95); ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.moveTo(0, deck); ctx.lineTo(w, deck); ctx.stroke();
    // 双塔
    const towers = [w * 0.32, w * 0.70];
    towers.forEach(tx => {
      ctx.beginPath(); ctx.moveTo(tx - 11, deck); ctx.lineTo(tx - 6, py); ctx.lineTo(tx + 6, py); ctx.lineTo(tx + 11, deck); ctx.stroke();
      // 拉索
      ctx.strokeStyle = rgba(color, 0.42); ctx.lineWidth = 1;
      for (let i = 1; i <= 7; i++) {
        const yy = py + (deck - py) * (i / 8);
        ctx.beginPath(); ctx.moveTo(tx, yy); ctx.lineTo(tx - 70 - i * 6, deck); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(tx, yy); ctx.lineTo(tx + 70 + i * 6, deck); ctx.stroke();
      }
      ctx.strokeStyle = rgba(color, 0.95); ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(tx - 11, deck); ctx.lineTo(tx - 6, py); ctx.lineTo(tx + 6, py); ctx.lineTo(tx + 11, deck); ctx.stroke();
    });
    // 桥墩
    ctx.lineWidth = 3;
    towers.forEach(tx => { ctx.beginPath(); ctx.moveTo(tx - 9, deck); ctx.lineTo(tx - 9, wy + 26); ctx.stroke(); });
  }

  function drawRoad(ctx, w, h, color) {
    ctx.clearRect(0, 0, w, h);
    drawTerrain(ctx, 0, 0, w, h, 21, color);
    // 道路：两点透视
    const ctx2 = ctx;
    ctx2.save();
    ctx2.strokeStyle = rgba(color, 0.92);
    ctx2.lineWidth = 10;
    ctx2.beginPath();
    ctx2.moveTo(w * 0.46, h);
    ctx2.bezierCurveTo(w * 0.55, h * 0.72, w * 0.30, h * 0.48, w * 0.62, h * 0.08);
    ctx2.stroke();
    ctx2.lineWidth = 1.4;
    ctx2.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx2.setLineDash([14, 12]);
    ctx2.beginPath();
    ctx2.moveTo(w * 0.46, h);
    ctx2.bezierCurveTo(w * 0.55, h * 0.72, w * 0.30, h * 0.48, w * 0.62, h * 0.08);
    ctx2.stroke();
    ctx2.setLineDash([]);
    ctx2.restore();
  }

  function drawRail(ctx, w, h, color) {
    ctx.clearRect(0, 0, w, h);
    drawTerrain(ctx, 0, 0, w, h, 33, color);
    // 铁轨
    ctx.save();
    const path = (off) => {
      ctx.beginPath();
      ctx.moveTo(w * 0.42 + off, h);
      ctx.bezierCurveTo(w * 0.52 + off * 0.6, h * 0.70, w * 0.26 + off * 0.3, h * 0.44, w * 0.58 + off * 0.12, h * 0.06);
    };
    ctx.strokeStyle = rgba(color, 0.9); ctx.lineWidth = 2.4;
    path(-7); ctx.stroke();
    path(7); ctx.stroke();
    // 枕木
    ctx.strokeStyle = rgba(color, 0.4); ctx.lineWidth = 2;
    for (let i = 0; i < 26; i++) {
      const t = i / 26;
      const y = h - t * h * 0.94;
      const x1 = w * 0.42 + (w * 0.58 - w * 0.42) * Math.pow(t, 1.5) + Math.sin(t * 3) * 8;
      ctx.beginPath(); ctx.moveTo(x1 - 9, y); ctx.lineTo(x1 + 9, y); ctx.stroke();
    }
    ctx.restore();
  }

  function drawPlant(ctx, w, h, color) {
    ctx.clearRect(0, 0, w, h);
    drawTerrain(ctx, 0, 0, w, h, 51, color);
    ctx.save();
    // 冷却塔
    ctx.strokeStyle = rgba(color, 0.9); ctx.lineWidth = 2.2;
    const cx = w * 0.34, cy = h * 0.78;
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy);
    ctx.bezierCurveTo(cx - 18, cy - 50, cx - 14, cy - 80, cx - 20, cy - 100);
    ctx.moveTo(cx + 30, cy);
    ctx.bezierCurveTo(cx + 18, cy - 50, cx + 14, cy - 80, cx + 20, cy - 100);
    ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - 20, cy - 100); ctx.lineTo(cx + 20, cy - 100); ctx.stroke();
    // 烟囱 + 烟
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(w * 0.66, cy); ctx.lineTo(w * 0.66, cy - 96); ctx.stroke();
    ctx.fillStyle = rgba(color, 0.10);
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(w * 0.66 + i * 13, cy - 104 - i * 9, 6 + i * 3, 0, Math.PI * 2); ctx.fill();
    }
    // 厂房
    roundRect(ctx, w * 0.44, cy - 26, w * 0.16, 26, 3);
    ctx.fillStyle = rgba(color, 0.14); ctx.fill();
    ctx.strokeStyle = rgba(color, 0.7); ctx.lineWidth = 1.4; ctx.stroke();
    // 光伏板阵列
    ctx.strokeStyle = rgba(color, 0.5); ctx.lineWidth = 1;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 6; c++) {
        const x = w * 0.06 + c * 16, y = h * 0.80 + r * 10;
        ctx.beginPath();
        ctx.moveTo(x, y); ctx.lineTo(x + 13, y); ctx.lineTo(x + 15, y + 6); ctx.lineTo(x + 2, y + 6); ctx.closePath();
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  function drawMill(ctx, w, h, color) {
    ctx.clearRect(0, 0, w, h);
    drawTerrain(ctx, 0, 0, w, h, 71, color);
    ctx.save();
    const baseY = h * 0.84;
    // 高炉
    ctx.strokeStyle = rgba(color, 0.92); ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.20, baseY);
    ctx.lineTo(w * 0.20, baseY - 55);
    ctx.lineTo(w * 0.25, baseY - 95);
    ctx.lineTo(w * 0.33, baseY - 95);
    ctx.lineTo(w * 0.38, baseY - 55);
    ctx.lineTo(w * 0.38, baseY);
    ctx.stroke();
    // 炉体环
    for (let i = 0; i < 5; i++) {
      const y = baseY - 10 - i * 16;
      ctx.beginPath(); ctx.moveTo(w * 0.20, y); ctx.lineTo(w * 0.38, y); ctx.stroke();
    }
    // 上升管 + 除尘
    ctx.beginPath(); ctx.moveTo(w * 0.29, baseY - 95); ctx.lineTo(w * 0.29, baseY - 118); ctx.lineTo(w * 0.50, baseY - 118); ctx.stroke();
    roundRect(ctx, w * 0.50, baseY - 132, 34, 30, 4);
    ctx.stroke();
    // 厂房
    roundRect(ctx, w * 0.56, baseY - 46, w * 0.26, 46, 3); ctx.stroke();
    // 通廊
    ctx.beginPath(); ctx.moveTo(w * 0.38, baseY - 26); ctx.lineTo(w * 0.56, baseY - 26); ctx.lineTo(w * 0.56, baseY - 12); ctx.lineTo(w * 0.38, baseY - 12); ctx.closePath(); ctx.stroke();
    // 料堆
    ctx.fillStyle = rgba(color, 0.12);
    ctx.beginPath();
    ctx.moveTo(w * 0.84, baseY); ctx.lineTo(w * 0.90, baseY - 26); ctx.lineTo(w * 0.97, baseY); ctx.closePath(); ctx.fill();
    // 天车
    ctx.strokeStyle = rgba(color, 0.55);
    ctx.beginPath(); ctx.moveTo(w * 0.10, baseY - 140); ctx.lineTo(w * 0.90, baseY - 140); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w * 0.55, baseY - 140); ctx.lineTo(w * 0.55, baseY - 118); ctx.stroke();
    ctx.restore();
  }

  function drawTower(ctx, w, h, color) {
    ctx.clearRect(0, 0, w, h);
    drawTerrain(ctx, 0, 0, w, h, 97, color);
    ctx.save();
    const baseY = h * 0.86;
    // 天际线
    const hs = [0.30, 0.46, 0.24, 0.85, 0.38, 0.56, 0.22, 0.34];
    let x = w * 0.04;
    hs.forEach((hh, i) => {
      const bw = w * 0.105;
      const bh = h * 0.62 * hh;
      const alpha = i === 3 ? 0.95 : 0.5;
      ctx.strokeStyle = rgba(color, alpha);
      ctx.lineWidth = i === 3 ? 2.2 : 1.2;
      roundRect(ctx, x, baseY - bh, bw, bh, 2);
      ctx.stroke();
      ctx.fillStyle = rgba(color, i === 3 ? 0.14 : 0.05);
      ctx.fill();
      // 窗格
      ctx.strokeStyle = rgba(color, alpha * 0.45);
      ctx.lineWidth = 0.8;
      for (let yy = baseY - bh + 8; yy < baseY - 4; yy += 9) {
        ctx.beginPath(); ctx.moveTo(x + 3, yy); ctx.lineTo(x + bw - 3, yy); ctx.stroke();
      }
      x += bw + w * 0.012;
    });
    // 制高点天线
    ctx.strokeStyle = rgba(color, 0.95); ctx.lineWidth = 2;
    const tx = w * 0.04 + (w * 0.105 + w * 0.012) * 3.5;
    ctx.beginPath(); ctx.moveTo(tx, baseY - h * 0.62 * 0.85); ctx.lineTo(tx, h * 0.10); ctx.stroke();
    ctx.restore();
  }

  /** 生成三张示意图（dataURL） */
  function makeTriplet(p) {
    const kind = KINDS[p.category] || KINDS['桥梁'];
    const baseColor = C[p.category] || '#38bdf8';
    const W = 760, H = 470;
    const out = [];
    const variants = [
      { label: '全景', accent: baseColor, seed: 1 },
      { label: '细部', accent: '#7dd3fc', seed: 2 },
      { label: '环境', accent: '#a7f3d0', seed: 3 }
    ];
    variants.forEach((v, i) => {
      const cv = document.createElement('canvas');
      cv.width = W; cv.height = H;
      const ctx = cv.getContext('2d');
      // 背景底板
      ctx.fillStyle = '#06121f'; ctx.fillRect(0, 0, W, H);
      kind.draw(ctx, W, H, v.accent);
      // 左上角编号水印
      ctx.save();
      ctx.font = '600 20px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.fillText(`0${i + 1}`, 26, 44);
      ctx.font = '500 14px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.34)';
      ctx.fillText(v.label, 26, 64);
      // 右下角项目名
      ctx.textAlign = 'right';
      ctx.font = '500 15px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.42)';
      const nm = p.name.length > 16 ? p.name.slice(0, 16) + '…' : p.name;
      ctx.fillText(nm, W - 24, H - 22);
      ctx.restore();
      out.push({ url: cv.toDataURL('image/jpeg', 0.82), label: v.label, kind: kind.title });
    });
    return out;
  }
  const _cache = new Map();
  function getTriplet(p) {
    if (!_cache.has(p.id)) _cache.set(p.id, makeTriplet(p));
    return _cache.get(p.id);
  }

  /* ---------------------- 列表 ---------------------- */
  B.renderList = function () {
    const wrap = document.getElementById('list-body');
    const ep = S.state.filterEp, cat = S.state.filterCat, q = (S.state.query || '').trim().toLowerCase();
    const items = window.PROJECT_SEED.filter(p => {
      if (ep && p.ep !== ep) return false;
      if (cat && p.category !== cat) return false;
      if (q) {
        const hay = (p.name + p.country + p.city + p.desc + p.category).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    document.getElementById('count-badge').textContent = items.length;

    if (!items.length) {
      wrap.innerHTML = '<div class="empty">没有匹配的项目，换个关键词试试。</div>';
      return;
    }
    const groups = {};
    items.forEach(p => { (groups[p.ep] = groups[p.ep] || []).push(p); });
    let html = '';
    Object.keys(groups).sort((a, b) => a - b).forEach(epKey => {
      html += `<div class="grp"><div class="grp-title"><span class="grp-bar" style="background:${global.EP_COLORS[(+epKey - 1) % 8]}"></span>第 ${epKey} 集 <em>${groups[epKey].length} 个项目</em></div>`;
      groups[epKey].forEach(p => {
        const c = C[p.category] || '#38bdf8';
        html += `<button class="case" data-id="${p.id}">
          <span class="case-dot" style="background:${c};box-shadow:0 0 10px ${c}"></span>
          <span class="case-main">
            <span class="case-name">${p.name}</span>
            <span class="case-sub">${p.country} · ${p.city}</span>
          </span>
          <span class="case-cat">${p.category}</span>
        </button>`;
      });
      html += '</div>';
    });
    wrap.innerHTML = html;
    wrap.querySelectorAll('.case').forEach(el => {
      el.addEventListener('click', () => B.openDetail(el.dataset.id));
      el.addEventListener('mouseenter', () => B.highlight(el.dataset.id));
      el.addEventListener('mouseleave', () => B.highlight(null));
    });
  };

  B.highlight = function (id) {
    const m = id ? S.markers.find(x => x.data.id === id) : null;
    S.hovered = m || null;
    // 列表高亮联动
    document.querySelectorAll('.case').forEach(el => el.classList.toggle('on', el.dataset.id === id));
  };

  /* ---------------------- 详情 ---------------------- */
  let detailSeq = 0;
  B.openDetail = function (id, opts) {
    const p = window.PROJECT_SEED.find(x => x.id === id);
    if (!p) return;
    const m = S.markers.find(x => x.data.id === id);
    if (m) { S.selected = m; }
    detailSeq++;
    const seq = detailSeq;

    // 相机飞向项目
    if (!opts || opts.fly !== false) B.focusLatLon(p.lat, p.lon, 16.5);

    const panel = document.getElementById('detail');
    const color = C[p.category] || '#38bdf8';
    const tri = getTriplet(p);

    panel.style.setProperty('--accent', color);
    document.getElementById('d-ep').textContent = `第 ${p.ep} 集`;
    document.getElementById('d-ep').style.background = global.EP_COLORS[(p.ep - 1) % 8];
    document.getElementById('d-cat').textContent = p.category;
    document.getElementById('d-name').textContent = p.name;
    document.getElementById('d-name-en').textContent = (p.nameEn || '') + (p.region ? `　·　${p.region}` : '');
    document.getElementById('d-country').innerHTML =
      `<span class="flag-dot" style="background:${color}"></span>${p.country}<span class="sep">·</span>${p.city}`;
    document.getElementById('d-desc').textContent = p.desc;
    document.getElementById('d-quote').textContent = p.quote || '';
    document.getElementById('d-meta').innerHTML =
      `<div class="mrow"><span>坐标</span><b>${p.lat.toFixed(2)}°, ${p.lon.toFixed(2)}°</b></div>` +
      (p.year ? `<div class="mrow"><span>时间</span><b>${p.year}</b></div>` : '') +
      (p.specs || []).map(s => `<div class="mrow"><span>${s.k}</span><b>${s.v}</b></div>`).join('');

    // 三图
    const figs = document.getElementById('d-gallery');
    figs.innerHTML = tri.map((t, i) => `
      <figure class="fig" data-i="${i}">
        <div class="fig-img"><img src="${t.url}" alt="${p.name} 示意图 ${i + 1}"></div>
        <figcaption><b>图 ${i + 1}</b><span>${t.label}</span></figcaption>
      </figure>`).join('');
    setTimeout(() => {
      figs.querySelectorAll('.fig').forEach((f, i) => {
        setTimeout(() => f.classList.add('in'), 60 + i * 90);
      });
    }, 30);

    panel.classList.add('open');
    document.body.classList.add('detail-open');

    // 大图查看
    figs.querySelectorAll('.fig').forEach((f, i) => {
      f.addEventListener('click', () => openLightbox(p, tri, i));
    });

    // 列表联动
    document.querySelectorAll('.case').forEach(el => el.classList.toggle('on', el.dataset.id === id));
  };

  B.closeDetail = function () {
    document.getElementById('detail').classList.remove('open');
    document.body.classList.remove('detail-open');
    if (S.selected) S.selected = null;
    document.querySelectorAll('.case').forEach(el => el.classList.remove('on'));
  };

  function openLightbox(p, tri, idx) {
    const lb = document.getElementById('lightbox');
    lb.innerHTML = `
      <div class="lb-inner">
        <img src="${tri[idx].url}" alt="">
        <div class="lb-cap"><b>${p.name}</b><span>${p.country} · 图 ${idx + 1} ${tri[idx].label}</span></div>
        <div class="lb-dots">${tri.map((_, i) => `<i class="${i === idx ? 'on' : ''}"></i>`).join('')}</div>
      </div>`;
    lb.classList.add('open');
    lb.onclick = () => lb.classList.remove('open');
  }

  /* ---------------------- 初始化 UI ---------------------- */
  B.initUI = function () {
    // 集数筛选
    const epWrap = document.getElementById('ep-filter');
    const eps = [...new Set(window.PROJECT_SEED.map(p => p.ep))].sort((a, b) => a - b);
    epWrap.innerHTML = `<button class="chip on" data-ep="">全部</button>` +
      eps.map(e => `<button class="chip" data-ep="${e}" style="--c:${global.EP_COLORS[(e - 1) % 8]}">第${e}集</button>`).join('');
    epWrap.querySelectorAll('.chip').forEach(ch => {
      ch.addEventListener('click', () => {
        epWrap.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
        ch.classList.add('on');
        S.state.filterEp = ch.dataset.ep ? +ch.dataset.ep : null;
        B.applyFilter(); B.renderList();
      });
    });

    // 类别筛选
    const catWrap = document.getElementById('cat-filter');
    const cats = [...new Set(window.PROJECT_SEED.map(p => p.category))];
    catWrap.innerHTML = `<button class="chip on" data-cat="">全部类别</button>` +
      cats.map(c => `<button class="chip" data-cat="${c}" style="--c:${C[c]}"><i class="cd" style="background:${C[c]}"></i>${c}</button>`).join('');
    catWrap.querySelectorAll('.chip').forEach(ch => {
      ch.addEventListener('click', () => {
        catWrap.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
        ch.classList.add('on');
        S.state.filterCat = ch.dataset.cat || null;
        B.applyFilter(); B.renderList();
      });
    });

    // 搜索
    const search = document.getElementById('search');
    search.addEventListener('input', () => {
      S.state.query = search.value;
      B.applyFilter(); B.renderList();
    });

    // 详情关闭
    document.getElementById('d-close').addEventListener('click', B.closeDetail);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        B.closeDetail();
        document.getElementById('lightbox').classList.remove('open');
      }
    });

    // 顶部工具
    document.getElementById('btn-rotate').addEventListener('click', (e) => {
      S.state.autoRotate = !S.state.autoRotate;
      e.currentTarget.classList.toggle('on', S.state.autoRotate);
    });
    document.getElementById('btn-labels').addEventListener('click', (e) => {
      S.state.showLabels = !S.state.showLabels;
      e.currentTarget.classList.toggle('on', S.state.showLabels);
      document.getElementById('tag-layer').style.display = S.state.showLabels ? 'block' : 'none';
    });
    document.getElementById('btn-arcs').addEventListener('click', (e) => {
      S.state.showArcs = S.state.showArcs === false ? true : false;
      e.currentTarget.classList.toggle('on', S.state.showArcs !== false);
    });
    document.getElementById('btn-reset').addEventListener('click', () => {
      B.focusLatLon(20, 60, 34);
      view_reset();
    });

    function view_reset() {
      S.state.autoRotate = true;
    }

    B.renderList();

    // 侧栏折叠
    document.getElementById('side-toggle').addEventListener('click', () => {
      document.body.classList.toggle('side-collapsed');
      setTimeout(() => window.dispatchEvent(new Event('resize')), 320);
    });
  };

  global.__UI__ = B;
})(window);
