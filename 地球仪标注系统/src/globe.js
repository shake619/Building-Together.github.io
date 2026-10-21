/* =====================================================================
 * 地球仪主程序 —— 一带一路「共同的建造」纪录片建筑标注
 * 依赖：window.PROJECT_SEED（数据分析层）、window.LAND / COUNTRIES
 * ===================================================================== */
(function (global) {
  'use strict';

  const B = (global.__BUILD__ = global.__BUILD__ || {});
  const THREE = global.THREE;

  /* ------------------------- 常量 ------------------------- */
  const R = 10;                    // 地球半径（场景单位）
  const TEX_W = 8192, TEX_H = 4096; // 等距圆柱纹理尺寸
  const DEG = Math.PI / 180;

  const CAT_COLORS = {
    '桥梁': '#38bdf8',
    '公路': '#a3e635',
    '铁路': '#f472b6',
    '轨道交通': '#f472b6',
    '能源': '#fbbf24',
    '工业': '#fb923c',
    '城市开发': '#c084fc',
    '超高层': '#22d3ee',
    '住宅': '#7dd3fc',
    '公共建筑': '#34d399',
    '民生': '#4ade80',
    '酒店': '#fda4af',
    '文化建筑': '#a78bfa',
    '文化遗产': '#f0abfc',
    '体育建筑': '#facc15',
    '交通枢纽': '#2dd4bf',
    '教育建筑': '#86efac',
    '产业园': '#f97316',
    '景观': '#a3e635',
    '市政': '#60a5fa'
  };
  const EP_COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4', '#22c55e', '#ef4444', '#eab308', '#3b82f6'];

  /* ------------------------- 工具 ------------------------- */
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  /** 经纬度 → 三维单位向量 */
  function llToVec(lat, lon, radius) {
    const la = lat * DEG, lo = lon * DEG;
    const r = radius === undefined ? 1 : radius;
    return new THREE.Vector3(
      Math.cos(la) * Math.cos(lo) * r,
      Math.cos(la) * Math.sin(lo) * r,
      Math.sin(la) * r
    );
  }
  /** 经纬度 → 画布像素（等距圆柱投影） */
  function llToPixel(lat, lon, w, h) {
    return [ (180 - lon) / 360 * w, (90 - lat) / 180 * h ];
  }

  /** 射线法：点是否在多边形内 */
  function pointInRing(x, y, ring) {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0], yi = ring[i][1];
      const xj = ring[j][0], yj = ring[j][1];
      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) inside = !inside;
    }
    return inside;
  }
  function pointInPolygon(lon, lat, polys) {
    for (let p = 0; p < polys.length; p++) {
      const rings = polys[p];
      if (rings.length && pointInRing(lon, lat, rings[0])) {
        let inHole = false;
        for (let r = 1; r < rings.length; r++) if (pointInRing(lon, lat, rings[r])) { inHole = true; break; }
        if (!inHole) return true;
      }
    }
    return false;
  }

  /** 在球面上把经纬度路径插值细分成不穿越球体的折线 */
  function greatCirclePoints(a, b, segments) {
    const va = llToVec(a[0], a[1]), vb = llToVec(b[0], b[1]);
    const out = [];
    const omega = Math.acos(clamp(va.dot(vb), -1, 1));
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      let x, y, z;
      if (omega < 1e-4) { x = va.x; y = va.y; z = va.z; }
      else {
        const s1 = Math.sin((1 - t) * omega) / Math.sin(omega);
        const s2 = Math.sin(t * omega) / Math.sin(omega);
        x = va.x * s1 + vb.x * s2; y = va.y * s1 + vb.y * s2; z = va.z * s1 + vb.z * s2;
      }
      const len = Math.hypot(x, y, z);
      out.push([Math.asin(z / len) / DEG, Math.atan2(y, x) / DEG]);
    }
    return out;
  }

  /* =====================================================================
   * 1. 程序化贴图：用 Canvas 绘制地球（正视 + 背面），避免依赖外部图片
   * ===================================================================== */
  const TEX = { front: null, back: null, bumped: 0 };

  function drawAtlas(canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const half = W / 2;

    // —— 海洋底色：深蓝渐变 + 纬度明暗
    ctx.save();
    const og = ctx.createLinearGradient(0, 0, 0, H);
    og.addColorStop(0.00, '#0b2a4a');
    og.addColorStop(0.18, '#0d3a63');
    og.addColorStop(0.50, '#11507f');
    og.addColorStop(0.82, '#0d3a63');
    og.addColorStop(1.00, '#0b2a4a');
    ctx.fillStyle = og;
    ctx.fillRect(0, 0, W, H);

    // 海洋里加入一点细腻的噪点，避免大面积死板
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * 8;
      d[i] += n; d[i + 1] += n; d[i + 2] += n * 1.2;
    }
    ctx.putImageData(img, 0, 0);
    ctx.restore();

    // —— 陆地填充
    const landGrad = ctx.createLinearGradient(0, 0, 0, H);
    landGrad.addColorStop(0.0, '#2b4a52');
    landGrad.addColorStop(0.25, '#33544f');
    landGrad.addColorStop(0.5, '#2f5647');
    landGrad.addColorStop(0.75, '#33544f');
    landGrad.addColorStop(1.0, '#2b4a52');

    const traceRing = (ctx2, ring) => {
      ctx2.moveTo((180 - ring[0][0]) / 360 * W, (90 - ring[0][1]) / 180 * H);
      for (let i = 1; i < ring.length; i++) {
        ctx2.lineTo((180 - ring[i][0]) / 360 * W, (90 - ring[i][1]) / 180 * H);
      }
      ctx2.closePath();
    };

    ctx.save();
    ctx.beginPath();
    for (const poly of global.LAND) {
      for (const ring of poly) traceRing(ctx, ring);
    }
    ctx.fillStyle = landGrad;
    ctx.fill('evenodd');
    ctx.restore();

    // —— 陆地边缘高亮（模拟海岸线）
    ctx.save();
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = 'rgba(125, 211, 252, 0.55)';
    ctx.shadowColor = 'rgba(56, 189, 248, 0.9)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    for (const poly of global.LAND) {
      for (const ring of poly) traceRing(ctx, ring);
    }
    ctx.stroke();
    ctx.restore();

    // —— 内部细节：用低透明度细线勾出陆地内部的"地形纹理"
    ctx.save();
    ctx.globalCompositeOperation = 'source-atop';
    ctx.strokeStyle = 'rgba(255,255,255,0.035)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < W; gx += 26) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx + 60, H); ctx.stroke();
    }
    ctx.restore();

    // —— 经纬网
    ctx.save();
    ctx.strokeStyle = 'rgba(148, 197, 255, 0.13)';
    ctx.lineWidth = 1.2;
    for (let lon = -180; lon <= 180; lon += 15) {
      const x = (lon + 180) / 360 * W;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let lat = -75; lat <= 75; lat += 15) {
      const y = (90 - lat) / 180 * H;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    // 赤道 / 本初子午线加亮
    ctx.strokeStyle = 'rgba(253, 224, 71, 0.22)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
    ctx.restore();
    return canvas;
  }

  function buildAtlas() {
    if (TEX.front) return TEX;
    const canvas = document.createElement('canvas');
    canvas.width = TEX_W; canvas.height = TEX_H;
    drawAtlas(canvas);

    TEX.canvas = canvas;
    TEX.front = new THREE.CanvasTexture(canvas);
    [TEX.front].forEach(t => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.generateMipmaps = true;
      t.needsUpdate = true;
    });
    return TEX;
  }

  /* =====================================================================
   * 2. 场景搭建
   * ===================================================================== */
  const S = {
    renderer: null, scene: null, camera: null,
    globeGroup: null, globeMats: [], markerGroup: null, arcGroup: null,
    raycaster: null, pointer: new THREE.Vector2(),
    markers: [], labels: [], arcs: [],
    state: { spin: true, autoRotate: true, showLabels: true, filterEp: null, filterCat: null, query: '' },
    hovered: null, selected: null,
    anim: { targetQuat: null, tween: null }
  };
  B.S = S;

  function makeGlobeMaterial(tex) {
    return new THREE.MeshPhongMaterial({
      map: tex,
      bumpMap: tex,
      bumpScale: 0.55,
      shininess: 12,
      specular: new THREE.Color(0x1b3a5c),
      emissive: new THREE.Color(0x0a1a2b),
      emissiveIntensity: 0.85
    });
  }

  B.initScene = function () {
    const host = document.getElementById('globe-canvas');
    const w = host.clientWidth, h = host.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    if (renderer.outputColorSpace !== undefined) renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    S.renderer = renderer;

    const scene = new THREE.Scene();
    S.scene = scene;

    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 2000);
    camera.position.set(0, 0, 34);
    S.camera = camera;

    // 光照
    scene.add(new THREE.AmbientLight(0xbfd8ff, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(-14, 12, 22);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x4aa3ff, 0.9);
    rim.position.set(16, -10, -18);
    scene.add(rim);
    const warm = new THREE.PointLight(0xffb27a, 0.55, 120);
    warm.position.set(-24, -6, 8);
    scene.add(warm);

    // 星空背景
    const starGeo = new THREE.BufferGeometry();
    const N = 2600, pos = new Float32Array(N * 3), sizes = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const r = 160 + Math.random() * 420;
      const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph);
      sizes[i] = Math.random() * 1.6 + 0.3;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    starGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    const starMat = new THREE.PointsMaterial({ color: 0xa8c8ff, size: 1.15, sizeAttenuation: true, transparent: true, opacity: 0.75 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);
    S.stars = stars;

    // 地球组
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    S.globeGroup = globeGroup;

    const atlas = buildAtlas();
    // 整球（一个 mesh，equirect 纹理直接映射）
    const geoF = new THREE.SphereGeometry(R, 128, 96);
    const matF = makeGlobeMaterial(atlas.front);
    S.globeMats = [matF];
    const meshF = new THREE.Mesh(geoF, matF);
    globeGroup.add(meshF);

    // 大气光晕（内 + 外）
    const glowMat = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color(0x3b82f6) } },
      vertexShader: `
        varying vec3 vN; varying vec3 vP;
        void main(){
          vN = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position,1.0);
          vP = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform vec3 uColor; varying vec3 vN; varying vec3 vP;
        void main(){
          float rim = 1.0 - max(dot(vN, vP), 0.0);
          float a = pow(rim, 3.4) * 0.45;
          gl_FragColor = vec4(uColor, a);
        }`,
      blending: THREE.AdditiveBlending, transparent: true, side: THREE.BackSide, depthWrite: false
    });
    const glow = new THREE.Mesh(new THREE.SphereGeometry(R * 1.03, 96, 64), glowMat);
    scene.add(glow);
    S.glow = glow;

    // 外层柔光
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.16, 64, 48),
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(0x1d6fd4) } },
        vertexShader: `varying vec3 vN; varying vec3 vP;
          void main(){ vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vP=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }`,
        fragmentShader: `uniform vec3 uColor; varying vec3 vN; varying vec3 vP;
          void main(){ float rim = 1.0-max(dot(vN,vP),0.0); float a=pow(rim,2.6)*0.22; gl_FragColor=vec4(uColor,a); }`,
        blending: THREE.AdditiveBlending, transparent: true, side: THREE.BackSide, depthWrite: false
      })
    );
    scene.add(halo);

    // 标记与连线容器（独立于 globeGroup，用世界坐标，避免多次变换）
    const markerGroup = new THREE.Group();
    scene.add(markerGroup);
    S.markerGroup = markerGroup;

    const arcGroup = new THREE.Group();
    scene.add(arcGroup);
    S.arcGroup = arcGroup;

    // 射线拾取
    S.raycaster = new THREE.Raycaster();
    S.raycaster.params.Points = { threshold: 0.4 };

    bindInteraction();
    onResize();
    window.addEventListener('resize', onResize);
    return S;
  };

  function onResize() {
    const host = document.getElementById('globe-canvas');
    if (!host || !S.renderer) return;
    const w = host.clientWidth, h = host.clientHeight;
    S.renderer.setSize(w, h);
    S.camera.aspect = w / h;
    S.camera.updateProjectionMatrix();
  }

  /* =====================================================================
   * 3. 标记、连线、标签
   * ===================================================================== */
  const labelEls = new Map();

  function makeMarkerSprite(color, epIndex, big) {
    const c = document.createElement('canvas');
    const S0 = 128;
    c.width = c.height = S0;
    const ctx = c.getContext('2d');
    const cx = S0 / 2, cy = S0 / 2;
    // 光晕（柔和不刺眼）
    const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, S0 / 2);
    g.addColorStop(0, color + '66');
    g.addColorStop(0.30, color + '22');
    g.addColorStop(1, color + '00');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, S0 / 2, 0, Math.PI * 2); ctx.fill();
    // 实心点
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(cx, cy, big ? 8 : 6.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(cx, cy, big ? 5.4 : 4.2, 0, Math.PI * 2); ctx.fill();
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.SpriteMaterial({
      map: tex, transparent: true, depthTest: false, depthWrite: false,
      blending: THREE.NormalBlending, sizeAttenuation: true
    });
    const sp = new THREE.Sprite(mat);
    sp.scale.setScalar(big ? 1.9 : 1.35);
    return sp;
  }

  function makeStem(height, color) {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, height, 0)
    ]);
    const m = new THREE.LineBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: 0.55 });
    return new THREE.Line(g, m);
  }

  B.buildMarkers = function () {
    const projects = global.PROJECT_SEED;
    S.markers.forEach(m => {
      if (m.tagEl && m.tagEl.parentNode) m.tagEl.parentNode.removeChild(m.tagEl);
    });
    S.markerGroup.clear();
    S.markers = [];

    const tagLayer = document.getElementById('tag-layer');
    tagLayer.innerHTML = '';

    projects.forEach((p, idx) => {
      const color = CAT_COLORS[p.category] || '#38bdf8';
      const epColor = EP_COLORS[(p.ep - 1) % EP_COLORS.length];
      const base = llToVec(p.lat, p.lon, R);
      const normal = base.clone().normalize();

      const holder = new THREE.Group();
      holder.position.copy(base);
      // 让 holder 的 +Y 指向球心外法线
      holder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

      const dot = makeMarkerSprite(color, p.ep, false);
      dot.position.set(0, 0.06, 0);
      holder.add(dot);

      const stem = makeStem(1.5, color);
      holder.add(stem);

      const cap = makeMarkerSprite(color, p.ep, true);
      cap.position.set(0, 1.5, 0);
      holder.add(cap);

      const ringGeo = new THREE.RingGeometry(0.16, 0.30, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: 0.65, side: THREE.DoubleSide, depthTest: false });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(0, 0.03, 0);
      ring.rotation.x = -Math.PI / 2;
      holder.add(ring);

      S.markerGroup.add(holder);

      // HTML 标签
      const tag = document.createElement('div');
      tag.className = 'tag';
      tag.dataset.id = p.id;
      tag.innerHTML = `<span class="tag-dot" style="background:${color}"></span><span class="tag-name">${p.name}</span>`;
      tagLayer.appendChild(tag);

      const m = {
        data: p, holder, dot, cap, stem, ring, tag,
        pos: base.clone(), normal,
        color, epColor, baseScale: 1, active: true, phase: Math.random() * Math.PI * 2
      };
      tag.addEventListener('click', (e) => { e.stopPropagation(); B.openDetail(p.id); });
      tag.addEventListener('mouseenter', () => { S.hovered = m; });
      tag.addEventListener('mouseleave', () => { if (S.hovered === m) S.hovered = null; });

      dot.userData.marker = m;
      cap.userData.marker = m;
      S.markers.push(m);
    });

    buildArcs();
    S.labelIndex = null;
  };

  /** 起点：中国（泉州——海上丝路起点，也是纪录片第一集的叙事原点） */
  const ORIGIN = { lat: 24.87, lon: 118.60, name: '泉州' };

  function buildArcs() {
    S.arcGroup.clear();
    S.arcs = [];
    const origin = llToVec(ORIGIN.lat, ORIGIN.lon, R);
    S.markers.forEach(m => {
      const p = m.data;
      const dist = origin.distanceTo(m.pos);
      const lift = clamp(dist * 0.22, 0.6, 3.2);
      const mid = origin.clone().add(m.pos).multiplyScalar(0.5).normalize().multiplyScalar(R + lift);
      const curve = new THREE.QuadraticBezierCurve3(origin, mid, m.pos.clone());
      const pts = curve.getPoints(64);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(m.color), transparent: true, opacity: 0.0, depthWrite: false
      });
      const line = new THREE.Line(geo, mat);
      S.arcGroup.add(line);
      m.arc = line;
      m.arcOpacity = 0.0;
    });
  }

  /* =====================================================================
   * 4. 相机交互：拖拽旋转 / 滚轮缩放 / 惯性
   * ===================================================================== */
  const view = { theta: 0, phi: 0, dist: S.camera ? S.camera.position.z : 34, vt: 0, vp: 0, dragging: false, lastX: 0, lastY: 0, downT: 0, moved: 0 };

  function applyView() {
    const cam = S.camera;
    if (!cam) return;
    // theta: 绕 Z 轴（经度方向）, phi: 俯仰（纬度方向）
    const d = view.dist;
    cam.position.set(
      d * Math.cos(view.phi) * Math.cos(view.theta),
      d * Math.cos(view.phi) * Math.sin(view.theta),
      d * Math.sin(view.phi)
    );
    if (Math.abs(view.phi) > Math.PI / 2 - 0.32) {
      cam.up.set(-Math.sign(view.phi) * Math.cos(view.theta) * 0.55, -Math.sign(view.phi) * Math.sin(view.theta) * 0.55, 1).normalize();
    } else {
      cam.up.set(0, 0, 1);
    }
    cam.lookAt(0, 0, 0);
    if (S.stars) S.stars.rotation.z = view.theta * 0.15;
  }

  /** 让指定经纬度点朝向相机 */
  B.focusLatLon = function (lat, lon, dist) {
    const targetTheta = Math.atan2(Math.sin(lon * DEG), Math.cos(lon * DEG));
    // 纬度限幅，避免极点附近视角翻转
    const targetPhi = clamp(lat * DEG, -Math.PI / 2 + 0.08, Math.PI / 2 - 0.08);
    let dTheta = targetTheta - view.theta;
    while (dTheta > Math.PI) dTheta -= Math.PI * 2;
    while (dTheta < -Math.PI) dTheta += Math.PI * 2;
    S.anim.tween = {
      t: 0, dur: 900,
      from: { theta: view.theta, phi: view.phi, dist: view.dist },
      to: { theta: view.theta + dTheta, phi: targetPhi, dist: dist || 15.5 }
    };
    view.vt = view.vp = 0;
  };

  function bindInteraction() {
    const el = S.renderer.domElement;

    el.addEventListener('pointerdown', (e) => {
      view.dragging = true; view.lastX = e.clientX; view.lastY = e.clientY;
      view.downT = performance.now(); view.moved = 0;
      el.setPointerCapture(e.pointerId);
      S.state.autoRotate = false;
      document.body.classList.add('dragging');
    });
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      S.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      S.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (!view.dragging) return;
      const dx = e.clientX - view.lastX, dy = e.clientY - view.lastY;
      view.lastX = e.clientX; view.lastY = e.clientY;
      view.moved += Math.abs(dx) + Math.abs(dy);
      view.vt = -dx * 0.0042;
      view.vp = dy * 0.0042;
      view.theta += view.vt;
      view.phi = clamp(view.phi + view.vp, -Math.PI / 2 + 0.08, Math.PI / 2 - 0.08);
      S.anim.tween = null;
    });
    const up = () => {
      if (!view.dragging) return;
      view.dragging = false;
      document.body.classList.remove('dragging');
      if (performance.now() - view.downT < 300 && view.moved < 8) {
        // 没有命中标记时：把点击处的经纬度作为新视角中心
        const hit = pickMarker();
        if (hit) { B.openDetail(hit.data.id); return; }
        const pt = screenToLatLon();
        if (pt) B.focusLatLon(pt[0], pt[1], Math.min(view.dist, 22));
      }
    };
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('pointerleave', up);

    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      view.dist = clamp(view.dist * (1 + Math.sign(e.deltaY) * 0.08), 13.2, 60);
      S.anim.tween = null;
    }, { passive: false });

    // 触摸双指缩放
    let pinchStart = 0, pinchDist = 0;
    el.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        pinchStart = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        pinchDist = view.dist;
      }
    }, { passive: true });
    el.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && pinchStart) {
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        view.dist = clamp(pinchDist * (pinchStart / d), 13.2, 60);
      }
    }, { passive: true });
    el.addEventListener('touchend', () => { pinchStart = 0; });
  }

  function pickMarker() {
    if (!S.raycaster) return null;
    S.raycaster.setFromCamera(S.pointer, S.camera);
    const objs = [];
    S.markers.forEach(m => { if (m.active) objs.push(m.dot, m.cap); });
    const hits = S.raycaster.intersectObjects(objs, false);
    for (const h of hits) {
      const m = h.object.userData.marker;
      if (!m) continue;
      // 判断是否被地球遮挡（将命中点与球心连线，若点在球背面则剔除）
      const wp = new THREE.Vector3();
      h.object.getWorldPosition(wp);
      const camDir = S.camera.position.clone().sub(wp).normalize();
      if (wp.clone().normalize().dot(camDir) > 0.05) return m;
    }
    return null;
  }

  /** 把当前指针位置换算成球面经纬度 */
  function screenToLatLon() {
    if (!S.raycaster) return null;
    S.raycaster.setFromCamera(S.pointer, S.camera);
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 48));
    const hits = S.raycaster.intersectObject(sphere, false);
    if (!hits.length) return null;
    const p = hits[0].point;
    const lat = Math.asin(clamp(p.z / R, -1, 1)) / DEG;
    let lon = Math.atan2(p.y, p.x) / DEG;
    return [lat, lon];
  }

  /* =====================================================================
   * 5. 帧循环
   * ===================================================================== */
  let lastT = 0;
  B.loop = function (t) {
    const dt = Math.min((t - lastT) / 1000 || 0.016, 0.05);
    lastT = t;

    // 相机缓动
    if (S.anim.tween) {
      const tw = S.anim.tween;
      tw.t += dt * 1000;
      let k = clamp(tw.t / tw.dur, 0, 1);
      k = 1 - Math.pow(1 - k, 3);
      view.theta = lerp(tw.from.theta, tw.to.theta, k);
      view.phi = lerp(tw.from.phi, tw.to.phi, k);
      view.dist = lerp(tw.from.dist, tw.to.dist, k);
      if (k >= 1) S.anim.tween = null;
    } else if (!view.dragging) {
      // 惯性
      view.theta += view.vt;
      view.phi = clamp(view.phi + view.vp, -Math.PI / 2 + 0.08, Math.PI / 2 - 0.08);
      view.vt *= 0.94; view.vp *= 0.94;
      if (Math.abs(view.vt) < 1e-5) view.vt = 0;
      if (Math.abs(view.vp) < 1e-5) view.vp = 0;
      if (S.state.autoRotate && !S.anim.tween) view.theta += dt * 0.055;
    }
    applyView();

    // 标记动画
    const camPos = S.camera.position;
    S.markers.forEach((m, i) => {
      if (!m.active) { m.holder.visible = false; m.tag.style.display = 'none'; m.arc.visible = false; return; }
      m.holder.visible = true;
      m.arc.visible = S.state.showArcs !== false;

      // 是否被球体遮挡
      const toCam = camPos.clone().sub(m.pos).normalize();
      const facing = m.normal.dot(toCam);
      const vis = facing > 0.02;

      const isHover = S.hovered === m;
      const isSel = S.selected === m;
      const target = vis ? (isSel ? 1.35 : isHover ? 1.22 : 1) : 0;
      m.baseScale = lerp(m.baseScale, target, 0.18);
      m.dot.scale.setScalar(1.35 * m.baseScale);
      m.cap.scale.setScalar(1.9 * m.baseScale);
      m.cap.material.opacity = vis ? (isSel || isHover ? 1 : 0.92) : 0;
      m.dot.material.opacity = vis ? 1 : 0;
      m.stem.material.opacity = vis ? (isSel || isHover ? 0.95 : 0.45) : 0;
      m.ring.material.opacity = vis ? (0.25 + 0.25 * Math.sin(t * 0.003 + m.phase)) : 0;
      m.ring.scale.setScalar(1 + 0.15 * Math.sin(t * 0.003 + m.phase));

      // 连线透明度
      const wantArc = vis ? (isSel ? 0.95 : isHover ? 0.8 : 0.22) : 0;
      m.arcOpacity = lerp(m.arcOpacity, wantArc, 0.08);
      m.arc.material.opacity = m.arcOpacity;

      // 标签位置
      if (!vis || m.baseScale < 0.35) { m.tag.style.display = 'none'; return; }
      const wp = new THREE.Vector3(0, 1.5, 0).applyQuaternion(m.holder.quaternion).multiplyScalar(1).add(m.pos);
      const p2 = wp.clone().project(S.camera);
      const rect = S.renderer.domElement.getBoundingClientRect();
      const x = (p2.x * 0.5 + 0.5) * rect.width;
      const y = (-p2.y * 0.5 + 0.5) * rect.height;
      m.tag.style.display = 'block';
      m.tag.style.transform = `translate(-50%,-100%) translate(${x.toFixed(1)}px, ${(y - 6).toFixed(1)}px)`;
      m.tag.style.opacity = String(clamp((m.baseScale - 0.35) / 0.5, 0, 1));
      m.tag.classList.toggle('is-hover', isHover);
      m.tag.classList.toggle('is-sel', isSel);
    });

    S.renderer.render(S.scene, S.camera);
    requestAnimationFrame(B.loop);
  };

  /* =====================================================================
   * 6. 筛选
   * ===================================================================== */
  B.applyFilter = function () {
    const { filterEp, filterCat, query } = S.state;
    const q = (query || '').trim().toLowerCase();
    S.markers.forEach(m => {
      const p = m.data;
      let ok = true;
      if (filterEp && p.ep !== filterEp) ok = false;
      if (filterCat && p.category !== filterCat) ok = false;
      if (q) {
        const hay = (p.name + p.country + p.city + p.desc + p.category).toLowerCase();
        if (!hay.includes(q)) ok = false;
      }
      m.active = ok;
    });
  };

  global.__GLOBE__ = B;
  global.CAT_COLORS = CAT_COLORS;
  global.EP_COLORS = EP_COLORS;
  global.llToVec = llToVec;
  global.R_ = R;
})(window);
