/* =========================================================
 * 数据源：纪录片字幕整理（第1、3、4、5、6、7、8集）
 * 说明：lat/lon 为项目所在地的近似坐标（精确到市/区级）；
 *       ep 为纪录片集数，quote 为字幕原始依据（便于老师核对）。
 * ========================================================= */
window.PROJECT_SEED = [
  /* ---------------- 第一集：塞尔维亚 / 黑山 / 波黑 ---------------- */
  {
    id: "srb-zemun", ep: 1, country: "塞尔维亚", countryEn: "Serbia",
    region: "贝尔格莱德", city: "贝尔格莱德 · 泽蒙",
    name: "泽蒙—博尔察大桥", nameEn: "Zemun–Borča Bridge",
    lat: 44.8780, lon: 20.3720, year: "2014年建成通车",
    category: "桥梁",
    desc: "中国企业（中交集团）在欧洲承建的第一座大桥，结束了贝尔格莱德近70年来仅有一座多瑙河大桥的历史。",
    quote: "泽蒙博尔察大桥，米莱所属的中国企业在欧洲承建的第一座大桥，2014年建成通车。结束了贝尔格莱德市近70年来，仅有一座多瑙河大桥的历史。",
    specs: [{ k: "跨越", v: "多瑙河" }, { k: "意义", v: "中企在欧洲承建的首座大桥" }]
  },
  {
    id: "srb-hsrail", ep: 1, country: "塞尔维亚", countryEn: "Serbia",
    region: "贝尔格莱德—诺维萨德", city: "贝尔格莱德 / 诺维萨德",
    name: "匈塞铁路（贝诺段）", nameEn: "Belgrade–Novi Sad Railway",
    lat: 45.1200, lon: 19.9400, year: "已开通运营",
    category: "铁路",
    desc: "由中塞两国建设者共同建造的匈塞高速铁路，贝尔格莱德至诺维萨德路段已开通运营。",
    quote: "由两国建设者共同建造的匈塞高速铁路，贝尔格莱德至诺维萨德路段已开通运营。",
    specs: [{ k: "线路", v: "贝尔格莱德 → 诺维萨德" }, { k: "状态", v: "已开通" }]
  },
  {
    id: "srb-novisad", ep: 1, country: "塞尔维亚", countryEn: "Serbia",
    region: "伏伊伏丁那", city: "诺维萨德",
    name: "诺维萨德跨多瑙河四桥", nameEn: "Novi Sad Danube Crossing",
    lat: 45.2510, lon: 19.8600, year: "建设中",
    category: "桥梁",
    desc: "跨越伏伊伏丁那平原多瑙河的全新粮食快速通道的控制性工程，为中国斜拉桥技术在设备在欧洲的首次应用。",
    quote: "一条跨越多瑙河的全新粮食快速通道，正在建设中，诺维萨德寺桥，该通道的控制性工程。……中国拦索技术与设备在这座斜拉式大桥上的运用",
    specs: [{ k: "技术", v: "中国斜拉索技术首次进入欧洲" }, { k: "功能", v: "粮食快速通道" }]
  },
  {
    id: "mne-bar", ep: 1, country: "黑山", countryEn: "Montenegro",
    region: "黑山北部", city: "波德戈里察以北（塔拉河谷）",
    name: "黑山南北高速公路", nameEn: "Bar–Boljare Motorway",
    lat: 42.7800, lon: 19.4500, year: "首段已通车",
    category: "公路",
    desc: "黑山历史上第一条高速公路，首段全长约41公里，桥隧比达60%，将黑山至贝尔格莱德车程由9小时缩短至7小时。",
    quote: "由此延伸的41km桥隧比达到60%，从开工到建成通车用时7年。……将黑山前往贝尔格莱德的车程由九小时缩短到七小时",
    specs: [{ k: "桥隧比", v: "60%" }, { k: "效益", v: "9小时 → 7小时" }]
  },
  {
    id: "mne-tara", ep: 1, country: "黑山", countryEn: "Montenegro",
    region: "黑山北部", city: "塔拉河谷",
    name: "塔拉河谷大桥", nameEn: "Tara River Canyon Bridge",
    lat: 43.1500, lon: 19.3200, year: "在役",
    category: "桥梁",
    desc: "塔拉河谷深处的大桥，是几代中国人的共同记忆（前南斯拉夫影片《桥》的取景地）。",
    quote: "前方黑山塔拉河谷深处，同样珍藏着几代中国人的美好记忆。",
    specs: [{ k: "文化", v: "几代中国人的共同记忆" }]
  },
  {
    id: "mne-moraca", ep: 1, country: "黑山", countryEn: "Montenegro",
    region: "黑山南北高速", city: "莫拉查河",
    name: "莫拉查河大桥", nameEn: "Morača River Bridge",
    lat: 42.8300, lon: 19.5300, year: "随高速通车",
    category: "桥梁",
    desc: "黑山南北高速的关键控制性工程，桥墩高达160多米，桥长960米，最大单跨190米。",
    quote: "穆拉齐察大桥巨大的桥墩高达160多米，身长960米，最大单跨190米。",
    specs: [{ k: "桥墩高", v: "160+ m" }, { k: "桥长", v: "960 m" }, { k: "最大跨", v: "190 m" }]
  },
  {
    id: "bih-corridor5c", ep: 1, country: "波黑", countryEn: "Bosnia and Herzegovina",
    region: "泛欧5C走廊", city: "内雷特瓦河谷",
    name: "泛欧5C走廊波黑段高速", nameEn: "Pan-European Corridor Vc",
    lat: 43.6500, lon: 17.9700, year: "建设中",
    category: "公路",
    desc: "贯穿巴尔干半岛南北的高速通道：南连克罗地亚港口，北接萨拉热窝，延伸至匈牙利布达佩斯。此前180多万方爆破作业削平险峻山体。",
    quote: "阿米拉所属的中国建设团队，承担的是泛欧5C走廊的关键工程。南领克罗地亚西南港口，北捷波黑首府萨拉热窝，在延伸至匈牙利的布达佩斯。",
    specs: [{ k: "走廊", v: "泛欧5C" }, { k: "土方", v: "180万方爆破" }]
  },

  /* ---------------- 第三集：斯里兰卡 / 巴新 / 肯尼亚 / 埃塞 / 孟加拉 ---------------- */
  {
    id: "lka-school", ep: 3, country: "斯里兰卡", countryEn: "Sri Lanka",
    region: "阿努拉达普拉", city: "阿努拉达普拉周边村落",
    name: "“闪耀的星星”公益学校", nameEn: "Shining Stars School",
    lat: 8.3500, lon: 80.4000, year: "中国企业援建",
    category: "民生",
    desc: "中国企业援建的公益学校，是周边十余个村落中唯一一所不收学费的公益课堂。",
    quote: "4年前，中国企业援建了这所名为闪耀的星星公益学校。将两个国家的一群年轻人紧密联系在一起。",
    specs: [{ k: "性质", v: "公益学校（免学费）" }, { k: "覆盖", v: "周边10余个村落" }]
  },
  {
    id: "png-butuka", ep: 3, country: "巴布亚新几内亚", countryEn: "Papua New Guinea",
    region: "首都行政区", city: "莫尔兹比港",
    name: "布图卡学园", nameEn: "Butuka Academy",
    lat: -9.4700, lon: 147.1500, year: "2018年移交",
    category: "民生",
    desc: "南太平洋地区面积最大、功能最齐全的学校，解决3000名孩子上学难问题，被当地人称为“中国带给当地最大的礼物”。中国庭院式风格与当地斜坡大屋顶、低层架空融合。",
    quote: "布图卡学员解决了3000名孩子上学难的问题，这所当地独一无二的学校，被巴布亚新几内亚人称作中国带给当地最大的礼物。",
    specs: [{ k: "规模", v: "可容纳3000名学生" }, { k: "设计", v: "中式庭院 + 当地大屋顶" }]
  },
  {
    id: "png-ramu", ep: 3, country: "巴布亚新几内亚", countryEn: "Papua New Guinea",
    region: "马当省", city: "瑞木（Ramu）山区",
    name: "瑞木镍钴矿", nameEn: "Ramu Nickel-Cobalt Mine",
    lat: -5.5500, lon: 145.2000, year: "已投产十余年",
    category: "工业",
    desc: "世界级大型红土镍钴矿，配套世界第一条镍钴矿长距离输送管道；中方与巴新、澳方联合开发，破解高黏度红土矿下料这一世界性难题。",
    quote: "距离布图卡500km之外的丛林，里克瑞姆布卡里山区，一个世界级大型红土镍钴矿，已进入投产的第10年。……这是世界第一条镍钴矿长距离输送管道",
    specs: [{ k: "类型", v: "红土镍钴矿" }, { k: "首创", v: "世界首条镍钴矿长距离输送管道" }]
  },
  {
    id: "png-highlands", ep: 3, country: "巴布亚新几内亚", countryEn: "Papua New Guinea",
    region: "高地", city: "高地公路沿线",
    name: "高地公路改造", nameEn: "Highlands Highway",
    lat: -5.8000, lon: 144.3000, year: "持续改造",
    category: "公路",
    desc: "巴布亚新几内亚的经济命脉。施工需应对滑坡、地质灾害与疟疾，沿途800多个部落，路修到部落地界即更换所在部落工人。",
    quote: "不远处的高地公路，是巴布亚新几内亚的经济命脉……巴西这边总共有800多个部落，可能也有800多种不同的方言。",
    specs: [{ k: "地位", v: "国家经济命脉" }, { k: "用工", v: "按部落属地分段用工" }]
  },
  {
    id: "ken-nairobi", ep: 3, country: "肯尼亚", countryEn: "Kenya",
    region: "内罗毕", city: "内罗毕",
    name: "内罗毕供水管线工程", nameEn: "Nairobi Water Supply Pipeline",
    lat: -1.2921, lon: 36.8219, year: "建设中",
    category: "市政",
    desc: "全长约60公里的供水管线，惠及超过300万人；把饮用水直接送到各家各户或集中供水点，同时解决20万人口的集中用水问题。",
    quote: "一条长达60km，汇集超过300万人的供水管线……这个项目就是直接把这个饮用水供到各家各户，或者是集中供水点。解决当地的20万人口的集中用水的问题",
    specs: [{ k: "长度", v: "60 km" }, { k: "受益", v: "300万+ 人" }]
  },
  {
    id: "eth-cdc", ep: 3, country: "埃塞俄比亚", countryEn: "Ethiopia",
    region: "亚的斯亚贝巴", city: "亚的斯亚贝巴",
    name: "中国援非盟非洲疾病预防控制中心", nameEn: "Africa CDC Headquarters",
    lat: 9.0300, lon: 38.7400, year: "2023年竣工",
    category: "公共建筑",
    desc: "中国铁建承建，拥有现代化办公与实验条件，汇聚全非防疫数据，构成非洲疾病控制的“大脑”，提升疫情监测与应急反应速度。",
    quote: "全新的中国原非盟非洲疾病预防控制中心。中国铁建集团建设……拥有现代化办公和实验条件，设施完善的中国原非盟非洲疾病预防控制中心",
    specs: [{ k: "承建", v: "中国铁建" }, { k: "功能", v: "非洲疾控“大脑”" }]
  },
  {
    id: "bgd-padma", ep: 3, country: "孟加拉国", countryEn: "Bangladesh",
    region: "比罗杰布尔", city: "库查河（Kacha）",
    name: "孟中友谊八桥", nameEn: "8th Bangladesh-China Friendship Bridge",
    lat: 22.6500, lon: 90.0500, year: "2022年9月4日通车",
    category: "桥梁",
    desc: "中国援建孟加拉国的第八座友谊桥，跨越库查河，建设历时6年，通车后联通河岸两侧村落并催生集市。中国自1986年起已援助孟方八座友谊桥。",
    quote: "我们于2022年9月4日通车的圆梦巴乔，总共援助了孟坊八座友谊桥梁。……梦中友谊八桥是库察河的荣耀，中国建设者用了整整6年时间才完成工程。",
    specs: [{ k: "通车", v: "2022-09-04" }, { k: "序列", v: "援孟第8座友谊桥" }]
  },

  /* ---------------- 第四集：卡塔尔 / 阿联酋 / 中国香港 / 马来西亚 / 越南 / 埃塞 ---------------- */
  {
    id: "qat-lusail", ep: 4, country: "卡塔尔", countryEn: "Qatar",
    region: "卢塞尔", city: "卢塞尔新城",
    name: "卢塞尔体育场", nameEn: "Lusail Stadium",
    lat: 25.4200, lon: 51.4900, year: "2022年世界杯主场",
    category: "体育建筑",
    desc: "2022年卡塔尔世界杯主体育场，设计灵感来自阿拉伯传统金钵、椰枣碗与珐琅灯笼，被建设者称为“大金碗”；梅西在此捧起大力神杯。",
    quote: "不远处的卢塞尔体育场……设计灵感来自阿拉伯传统的金钵，椰枣碗和珐琅灯笼，极具中东风格，那我们就挂那叫大金碗吧。",
    specs: [{ k: "容量", v: "约8万人" }, { k: "意象", v: "阿拉伯金钵 / 椰枣碗" }]
  },
  {
    id: "qat-marina", ep: 4, country: "卡塔尔", countryEn: "Qatar",
    region: "多哈", city: "多哈东岸",
    name: "多哈游艇俱乐部 & 绿洲酒店", nameEn: "Doha Marina & Oasis Hotel",
    lat: 25.3000, lon: 51.5500, year: "世界杯前完工",
    category: "酒店",
    desc: "卡塔尔游艇俱乐部项目在世界杯赛事前如期完成；绿洲酒店拥有310间海景客房，是该团队在海外承建的第一个五星级豪华酒店项目。",
    quote: "他和团队负责的卡塔尔游艇俱乐部项目，同样在世界杯赛事之前如期完成……绿洲酒店刷新多哈东岸的新地标",
    specs: [{ k: "客房", v: "310间海景房" }, { k: "等级", v: "五星级" }]
  },
  {
    id: "are-skyblaze", ep: 4, country: "阿联酋", countryEn: "United Arab Emirates",
    region: "迪拜", city: "迪拜码头（Marina）",
    name: "迪拜蓝天酒店", nameEn: "Skyblaze Tower (Dubai Marina)",
    lat: 25.0800, lon: 55.1400, year: "建设中→交付",
    category: "超高层",
    desc: "高373.5米、1000多间客房，为全球酒店类建筑第一高；位于马瑞纳湖黄金地段，施工实现“三天一层”的防震结构速度。",
    quote: "由中国一家建筑企业负责承建的迪拜蓝天酒店……这座高373.5米，拥有1000多间客房。全球酒店内最高的建筑……三天一层蓝天酒店",
    specs: [{ k: "高度", v: "373.5 m" }, { k: "客房", v: "1000+ 间" }, { k: "纪录", v: "全球最高酒店建筑" }]
  },
  {
    id: "are-burj", ep: 4, country: "阿联酋", countryEn: "United Arab Emirates",
    region: "迪拜", city: "迪拜市中心",
    name: "哈利法塔（幕墙）", nameEn: "Burj Khalifa Curtain Wall",
    lat: 25.1972, lon: 55.2744, year: "2010年落成",
    category: "超高层",
    desc: "世界第一高楼。其幕墙设计与建设由香港团队参与完成，是建设者职业生涯中的荣耀。周边还有帆船酒店、朱美拉棕榈岛、蓝水岛等世界之最。",
    quote: "为世界第一高楼哈利法塔做幕墙设计和建设，是人心能和团队曾有的荣耀。……另一旁有七星级的帆船酒店，还有世界第一高楼哈利法塔",
    specs: [{ k: "高度", v: "828 m" }, { k: "参与", v: "幕墙设计施工" }]
  },
  {
    id: "hkg-museum", ep: 4, country: "中国", countryEn: "China",
    region: "中国香港", city: "香港西九文化区",
    name: "香港故宫文化博物馆（幕墙）", nameEn: "Hong Kong Palace Museum Façade",
    lat: 22.3010, lon: 114.1590, year: "2022年开放",
    category: "文化建筑",
    desc: "以极其复杂的曲面玻璃幕墙构建“紫荆花蕊”的柔美，每个单元板块均为异形，需三维扫描 + BIM 定位，整体精度控制在3毫米，检测精度达0.07毫米。",
    quote: "现在的广州应该好好精准的。这个建筑师的概念，就是代表香港人至今花的花蕾……用极其复杂的曲面玻璃幕墙，构建出紫荆花蕊的柔美，这是业主方设计方案的要求，也是建设者们在全球范围内的首次尝试",
    specs: [{ k: "幕墙", v: "异形曲面玻璃" }, { k: "精度", v: "整体3mm / 检测0.07mm" }]
  },
  {
    id: "mys-sabah", ep: 4, country: "马来西亚", countryEn: "Malaysia",
    region: "沙巴州", city: "亚庇（Kota Kinabalu）",
    name: "亚庇双子塔", nameEn: "KK Twin Towers (Sabah)",
    lat: 5.9800, lon: 116.0730, year: "约5年建成",
    category: "超高层",
    desc: "东马来西亚第一高楼，56层、192米。超高层高强度隔热玻璃可抗六级风，混凝土标号达C60，刷新沙巴州建造标准，产业链随之升级。",
    quote: "马来西亚沙巴州……56层192米，东马来西亚第一高楼……我们现在建的两栋56层，将近200米的楼，他用了不到5年就向他建完了",
    specs: [{ k: "高度", v: "192 m / 56层" }, { k: "材料", v: "C60混凝土 + 超白夹胶中空玻璃" }]
  },
  {
    id: "mys-kl118", ep: 4, country: "马来西亚", countryEn: "Malaysia",
    region: "吉隆坡", city: "吉隆坡市中心",
    name: "吉隆坡标志塔（PNB118 相关超高层）", nameEn: "Kuala Lumpur Landmark Tower",
    lat: 3.1420, lon: 101.7000, year: "31个月建成",
    category: "超高层",
    desc: "高450米，是中国建筑在马来西亚乃至全世界建成的最高建筑，仅用31个月完成，成为代表城市与国家发展信息的地标。",
    quote: "它的高度是450米，是我们中国建筑，在马来西亚也是在全世界建成的最高的建筑吧。我们仅仅用了30一个月的时间",
    specs: [{ k: "高度", v: "450 m" }, { k: "工期", v: "31 个月" }]
  },
  {
    id: "vnm-longbien", ep: 4, country: "越南", countryEn: "Vietnam",
    region: "河内", city: "河内红河",
    name: "龙边桥（改造）", nameEn: "Long Bien Bridge",
    lat: 21.0420, lon: 105.8600, year: "1903年建成",
    category: "桥梁",
    desc: "120年历史的河内地标，被称为“躺着的埃菲尔铁塔”。严重老化需翻新改建，河内还将新建18座大桥。",
    quote: "越南首都河内，120岁的龙边桥是有名的地标，被称为躺着的埃菲尔铁塔。严重老化的龙边桥需要翻新改建，同时河内还将新建18座大桥",
    specs: [{ k: "桥龄", v: "120 年" }, { k: "别称", v: "躺着的埃菲尔铁塔" }]
  },
  {
    id: "vnm-gh-steel", ep: 4, country: "越南", countryEn: "Vietnam",
    region: "河静省", city: "河静（Vũng Áng 经济区）",
    name: "河静钢厂（台塑河静）二期扩建", nameEn: "Formosa Ha Tinh Steel",
    lat: 18.1000, lon: 106.4000, year: "扩建中",
    category: "工业",
    desc: "东南亚最大钢厂之一，中国1959年曾援建越南第一座钢厂。20层楼高的转炉煤气柜可贮15万立方米，柜体可承受15级台风，产能由560万吨跃升至1200万吨。",
    quote: "河发荣居钢厂东临大海，常年深受强台风影响……煤气柜柜体最高能够承受15级台风……年产量从560万吨到1200万吨",
    specs: [{ k: "煤气柜", v: "15万 m³，抗15级台风" }, { k: "产能", v: "560万 → 1200万吨" }]
  },
  {
    id: "eth-friendship", ep: 4, country: "埃塞俄比亚", countryEn: "Ethiopia",
    region: "亚的斯亚贝巴", city: "亚的斯亚贝巴河岸",
    name: "友谊广场", nameEn: "Friendship Square, Addis Ababa",
    lat: 9.0100, lon: 38.7600, year: "中国援建",
    category: "景观",
    desc: "曾经杂草丛生、污水横流的河岸，如今成为城市新地标，当地人亲切称为“友谊广场”，是德米希教授研究绿色建造的样本。",
    quote: "曾经杂草丛生，污水横流的河岸，如今已然成为这座城市民众的全新地标。当地人亲切地称这里为友谊广场",
    specs: [{ k: "性质", v: "援建城市公园" }, { k: "研究", v: "绿色建造样本" }]
  },
  {
    id: "eth-bole", ep: 4, country: "埃塞俄比亚", countryEn: "Ethiopia",
    region: "亚的斯亚贝巴", city: "博莱国际机场",
    name: "博莱国际机场扩建", nameEn: "Bole International Airport Expansion",
    lat: 8.9779, lon: 38.7993, year: "扩建中",
    category: "交通枢纽",
    desc: "非洲空中枢纽。扩建后年吞吐量由700万人次提升至2000万人次，团队来自英国、突尼斯、印度、菲律宾、土耳其等多国。",
    quote: "非洲的空中枢纽，埃塞俄比亚博莱机场新一期扩建正在进行，这个机场扩建工程，将每年700万人次的吞吐量提升至2000万人次",
    specs: [{ k: "吞吐", v: "700万 → 2000万人次/年" }]
  },

  /* ---------------- 第五集：斯里兰卡 / 沙特 / 印尼 / 马来西亚 / 埃及 ---------------- */
  {
    id: "lka-portcity", ep: 5, country: "斯里兰卡", countryEn: "Sri Lanka",
    region: "科伦坡", city: "科伦坡港口",
    name: "科伦坡港口城", nameEn: "Colombo Port City",
    lat: 6.9350, lon: 79.8420, year: "2014年开工，持续建设",
    category: "城市开发",
    desc: "10年吹沙填海269公顷，位于印度洋中心、4小时飞行圈覆盖南亚主要城市。将带动近130亿美元投资，创造超40万个就业机会。",
    quote: "10年间，269公顷的吹沙填海。全世界的目光汇聚于此……港口城项目将带动投资近130亿美元，创造超过40万个就业机会。",
    specs: [{ k: "填海", v: "269 公顷" }, { k: "投资", v: "约130亿美元" }, { k: "就业", v: "40万+" }]
  },
  {
    id: "sau-jazan", ep: 5, country: "沙特阿拉伯", countryEn: "Saudi Arabia",
    region: "吉赞省", city: "吉赞（Jazan）",
    name: "吉赞经济城", nameEn: "Jazan City for Primary and Downstream Industries",
    lat: 16.9000, lon: 42.5500, year: "2013年起建设",
    category: "城市开发",
    desc: "沙特四个经济特区之一，沙特“2030愿景”组成部分。10年前这里还是一片大海，如今港口与新城从海上跃起；远期规划提供50万个岗位、容纳25万人居住。",
    quote: "现在我们脚下这块地，10年前它就片大海……以港兴城，集赞经济城，沙特四个经济特区之一，也是沙特2030年愿景计划的一部分……远期规划能提供50万个工作岗位，共25万人居住",
    specs: [{ k: "属性", v: "沙特经济特区" }, { k: "远期", v: "50万岗位 / 25万人口" }]
  },
  {
    id: "idn-tsingshan", ep: 5, country: "印度尼西亚", countryEn: "Indonesia",
    region: "中苏拉威西", city: "莫罗瓦利（青山工业园）",
    name: "青山工业园 & 3号高炉", nameEn: "Tsingshan IMIP Industrial Park",
    lat: -2.5000, lon: 122.0000, year: "2013年起，10年",
    category: "工业",
    desc: "中印尼两国企业联手共建，已落户52家企业、超8万产业工人。3号1780立方米高炉投产后年产600万吨，为印尼最大普碳钢生产线，使印尼从原料出口国转型为现代制造业大国。",
    quote: "超过8万产业工人奔向同一个产业园区。青山工业园，2013年由中印两国企业联手共建，现已落户52家企业……3号高炉投产后年产量达到600万吨",
    specs: [{ k: "企业", v: "52 家" }, { k: "高炉", v: "1780 m³ / 年产600万吨" }]
  },
  {
    id: "mys-kemaman", ep: 5, country: "马来西亚", countryEn: "Malaysia",
    region: "登嘉楼", city: "甘马挽（Kemaman）",
    name: "东海岸钢厂升级（2号转炉）", nameEn: "East Coast Steel Plant Upgrade",
    lat: 4.2300, lon: 103.4200, year: "改造中",
    category: "工业",
    desc: "老钢厂升级改造：新建2号80吨转炉，整体顶升推移技术（“缩骨功”）为中国专利首次在海外应用，产能提升近一倍，填补热轧生产线空白。",
    quote: "我们新建一个2号的80吨的转轮……缩骨功及转五整体顶升推移技术，这是余艇从中国带来的冶金新技术，也是这项中国专利首次在国外应用",
    specs: [{ k: "关键设备", v: "80吨转炉" }, { k: "技术", v: "整体顶升推移（中国专利首次出海）" }]
  },
  {
    id: "mys-kuantan", ep: 5, country: "马来西亚", countryEn: "Malaysia",
    region: "彭亨州", city: "关丹（Kuantan）",
    name: "马中关丹产业园 · 联合钢铁", nameEn: "Malaysia-China Kuantan Industrial Park",
    lat: 3.9700, lon: 103.3000, year: "2013年开园",
    category: "工业",
    desc: "10年前由马中共同打造，首个入驻的联合钢铁成为技术先进、节能环保的现代化企业范本；年产约400万吨，30%本地销售、70%出口，配套关丹港连通马六甲海峡。",
    quote: "马中关丹产业园，10年前由马来西亚与中国共同打造，一改困境，首个入驻产业园的联合钢铁，成为技术先进，节能环保的现代化企业范本。",
    specs: [{ k: "年产", v: "约400万吨" }, { k: "出口", v: "70%" }]
  },
  {
    id: "egy-ncc", ep: 5, country: "埃及", countryEn: "Egypt",
    region: "开罗以东", city: "新行政首都 CBD",
    name: "埃及新行政首都 CBD & 标志塔", nameEn: "Egypt New Capital CBD & Iconic Tower",
    lat: 30.0150, lon: 31.7300, year: "建设中",
    category: "城市开发",
    desc: "距开罗以东约45公里沙漠腹地建新城，CBD建筑面积约192万平方米；标志塔高385.8米，置顶非洲大陆。3万名埃及建设者与近万名中国建设者奋战5年。",
    quote: "距开罗以东约45km处的沙漠腹地，一座天空之城正在加紧建造……建筑面积，约192万平方米的中央商务区，已经拔地而起。众星捧月，标志塔，以385.8米的高度置顶非洲大陆",
    specs: [{ k: "标志塔", v: "385.8 m（非洲第一高）" }, { k: "CBD", v: "192 万 m²" }]
  },

  /* ---------------- 第六集：乌兹别克斯坦 / 老挝 / 越南 / 新加坡 / 坦桑尼亚 ---------------- */
  {
    id: "uzb-ccgt", ep: 6, country: "乌兹别克斯坦", countryEn: "Uzbekistan",
    region: "锡尔河州", city: "希林（Shirin）",
    name: "锡尔河燃气联合循环电站", nameEn: "Syrdarya CCGT Power Plant",
    lat: 40.4000, lon: 68.8000, year: "2023年投运",
    category: "能源",
    desc: "距塔什干150公里，占地25公顷。采用世界燃烧温度最高、单体功率最大、效率最高的燃机与废水零排放设计，取代上世纪60年代苏联建的老火电厂，为周边三州近300万人供电。",
    quote: "距离首都塔什干市150km的希尔河州……占地面积为25公顷的燃气联合循环电站……采用目前世界上燃烧温度最高，单体功率最大，效率最高的燃气轮机和废水零排放设计方案",
    specs: [{ k: "占地", v: "25 公顷" }, { k: "供电", v: "约300万人" }]
  },
  {
    id: "uzb-samarkand", ep: 6, country: "乌兹别克斯坦", countryEn: "Uzbekistan",
    region: "撒马尔罕", city: "撒马尔罕",
    name: "撒马尔罕造纸作坊", nameEn: "Samarkand Paper Workshop",
    lat: 39.6542, lon: 66.9597, year: "8世纪技艺",
    category: "文化遗产",
    desc: "至今保留着8世纪从中国传到此地的桑皮造纸技艺。河水用来造纸记录文明，如今也用来发电生产清洁能源。",
    quote: "撒马尔罕的一家造纸作坊，至今保留着，八世纪从中国传到此地的桑织造纸技艺。",
    specs: [{ k: "技艺", v: "桑皮造纸（源自中国）" }]
  },
  {
    id: "lao-namlik", ep: 6, country: "老挝", countryEn: "Laos",
    region: "中部南利河", city: "南利河（Nam Lik）",
    name: "南利河水电站", nameEn: "Nam Lik Hydropower Station",
    lat: 18.5000, lon: 102.2000, year: "投运13年",
    category: "能源",
    desc: "中老两国在水电领域首个“建设—运营—移交”项目。累计发电超64亿千瓦时，14.78亿立方米库容动态调节河水，保障下游村庄汛期安全。",
    quote: "电站位于老挝中部南力合上，作为中老两国在水电领域，合作开展的首个建设运营，拥有移交项目，今年是他投产发电的第13年……这个水电站至今已累计发电，超过64亿千瓦时",
    specs: [{ k: "累计发电", v: "64亿 kWh" }, { k: "库容", v: "14.78亿 m³" }]
  },
  {
    id: "vnm-wte", ep: 6, country: "越南", countryEn: "Vietnam",
    region: "河内", city: "河内郊区（距市区35km）",
    name: "河内垃圾焚烧发电厂", nameEn: "Hanoi Waste-to-Energy Plant",
    lat: 20.9500, lon: 105.7500, year: "2019年动工",
    category: "能源",
    desc: "东南亚最大垃圾焚烧发电项目，单体一次性建成规模世界第二。日处理4000吨，占河内生活垃圾总量60%；焚烧后减重75%、减容90%，日发电量可供约24万户居民使用。",
    quote: "这个厂区在东南亚是最大的，焚烧4000吨的垃圾发电……垃圾焚烧厂每天处理垃圾，占河内生活垃圾总量的60%……这个工厂日发电量可供约24万户居民使用",
    specs: [{ k: "处理量", v: "4000 吨/日" }, { k: "供电", v: "约24万户/日" }]
  },
  {
    id: "sgp-ppvc", ep: 6, country: "新加坡", countryEn: "Singapore",
    region: "南部金融区", city: "新加坡岛南岸",
    name: "PPVC 模块化高层住宅", nameEn: "PPVC Modular Residential Tower",
    lat: 1.2760, lon: 103.8500, year: "2025年投用",
    category: "住宅",
    desc: "35层高档住宅，采用PPVC（预制体积模块）装配施工，房间在工厂完成精装后“搭积木”吊装，六天一层；模块混凝土一次性浇筑约2小时完成，大幅减少灰尘与噪音。",
    quote: "一座35层的高档住宅……一天可以掉六粒一层楼，38例，六天就可以完成一层楼吊起来的。这个模块就是一间完全装修好的房间，比喻成就是搭积木……2025年大楼会投入使用",
    specs: [{ k: "层数", v: "35 层" }, { k: "工法", v: "PPVC 预制模块" }, { k: "速度", v: "约6天/层" }]
  },
  {
    id: "tza-magufuri", ep: 6, country: "坦桑尼亚", countryEn: "Tanzania",
    region: "姆万扎", city: "维多利亚湖 · 姆万扎湾",
    name: "马古富力大桥", nameEn: "John Pombe Magufuli Bridge",
    lat: -2.5300, lon: 32.8800, year: "在建",
    category: "桥梁",
    desc: "维多利亚湖上的超级工程，长3公里、共66跨，连接坦桑尼亚姆万扎与乌干达、卢旺达、布隆迪，惠及上百万依赖轮渡的居民。采用柔性止水工艺，首次在非洲应用，湖水污染接近于零。",
    quote: "长达3km的马古富里大桥建成后，将成为连接坦桑尼亚姆万扎地区与邻国乌干达、卢旺达布隆迪的重要交通枢纽……为绿色生态而创新的柔性止水工艺，第一次在非洲应用",
    specs: [{ k: "长度", v: "3 km / 66 跨" }, { k: "技术", v: "柔性止水（非洲首次）" }]
  },

  /* ---------------- 第七集：哥伦比亚 / 智利 / 马拉维 / 阿尔及利亚 / 科威特 ---------------- */
  {
    id: "col-metro", ep: 7, country: "哥伦比亚", countryEn: "Colombia",
    region: "波哥大", city: "波哥大",
    name: "波哥大地铁一号线", nameEn: "Bogotá Metro Line 1",
    lat: 4.6200, lon: -74.1000, year: "2028年运营",
    category: "轨道交通",
    desc: "全长23.96公里，途经75个社区、惠及近300万人，缓解全球最拥堵城市之一的交通。列车为中国首次向海外出口、具备最高等级（GoA4）自动驾驶功能的城市轨道客车，车头取自安第斯山鹰意象。",
    quote: "全长23.96km的博格达地铁一号线，将缓解这一矛盾……首条地铁将在2028年正式投入运营……这是中国首次向海外出口，具备最高等级自动驾驶功能的城市轨道客车",
    specs: [{ k: "长度", v: "23.96 km" }, { k: "车辆", v: "中国出口最高等级自动驾驶列车" }]
  },
  {
    id: "chl-ruta5", ep: 7, country: "智利", countryEn: "Chile",
    region: "马乌莱大区", city: "塔奇段（Talca）",
    name: "5号公路塔奇段改造", nameEn: "Ruta 5 Talca-Chillán Upgrade",
    lat: -35.4000, lon: -71.6000, year: "特许经营中",
    category: "公路",
    desc: "智利5号公路全长3364公里，贯穿南北。塔奇段近200公里穿行车厘子第一大产区，日均通行7万辆、峰值11万辆；13处无感通行系统使车厘子运往港口节约1个多小时。",
    quote: "治理全球最狭长的国家5号公路，全长3364km，贯穿南北……塔奇段日均通行车辆约7万辆，最高峰值达11万辆……仅这一项改造，就能为车厘子运往港口的路上节约一个多小时。",
    specs: [{ k: "主线", v: "3364 km" }, { k: "改造段", v: "约200 km" }, { k: "提速", v: "节约1小时以上" }]
  },
  {
    id: "mwi-rail", ep: 7, country: "马拉维", countryEn: "Malawi",
    region: "南部恩桑杰", city: "恩桑杰（Nsanje）",
    name: "恩桑杰—贝拉铁路 & 公路", nameEn: "Nsanje–Beira Railway",
    lat: -16.9200, lon: 35.2600, year: "建设中",
    category: "铁路",
    desc: "全长72公里的铁路大动脉，连接马拉维与莫桑比克贝拉港，打通非洲铁路网最后一段阻塞；新建柏油公路一年前刚开通，两条路创造约3000个就业机会。",
    quote: "世界最不发达国家之一，马拉维期盼发展南部边境，恩桑杰县正在铺设整个国家的未来之路。全长72km，连接这个国家与世界的铁路大动脉……这两条路创造了3000个工作机会",
    specs: [{ k: "长度", v: "72 km" }, { k: "就业", v: "约3000个" }]
  },
  {
    id: "dza-bejaia", ep: 7, country: "阿尔及利亚", countryEn: "Algeria",
    region: "贝加亚省", city: "贝加亚港（Béjaïa）",
    name: "贝加亚港连接线高速", nameEn: "Béjaïa Port Motorway Link",
    lat: 36.7500, lon: 5.0800, year: "已通车84km",
    category: "公路",
    desc: "北起贝加亚港口，南接阿尔及利亚东西高速公路，途经五座城市、全长约100公里；地处地中海与非洲板块过渡带，中阿建设者奋战1000多个日夜打通84公里。",
    quote: "北起阿尔及利亚贝加亚港口，南与世纪工程东西高速公路相连，途经五座城市，全长约100km……超过1000多个日夜，打通了84km，开通的贝加亚连接线。",
    specs: [{ k: "全长", v: "约100 km" }, { k: "已通", v: "84 km" }]
  },
  {
    id: "kwt-university", ep: 7, country: "科威特", countryEn: "Kuwait",
    region: "科威特城西南", city: "科威特大学城新校区",
    name: "科威特大学城", nameEn: "Kuwait University Sabah Al-Salem Campus",
    lat: 29.2700, lon: 47.8500, year: "耗时20年建成",
    category: "教育建筑",
    desc: "从小规模到建成耗时20年，世界最大大学城之一，12个学院为4万名大学生提供教学设施。中企承建科技学院与石油学院，高峰期五家中国企业同时施工。",
    quote: "科威特首都科威特城西南约15km，一片沙漠中落成的科威特大学城新校区。从立项到建成耗时20年……12个学院为4万名大学生提供教学设施",
    specs: [{ k: "学院", v: "12 个" }, { k: "学生", v: "4 万人" }]
  },

  /* ---------------- 第八集：巴基斯坦 / 老挝 / 泰国 / 马来西亚 ---------------- */
  {
    id: "pak-dasu", ep: 8, country: "巴基斯坦", countryEn: "Pakistan",
    region: "开伯尔-普什图省", city: "达苏（Dasu）",
    name: "达苏水电站", nameEn: "Dasu Hydropower Project",
    lat: 35.3000, lon: 73.2000, year: "建设中",
    category: "能源",
    desc: "巴基斯坦最大水电站。建成后将淹没喀喇昆仑公路27公里路段，为改建该段道路需在陡峭峡谷中抬升100多米，另建12公里电站便道，团队已坚守8年。",
    quote: "达苏水电站，巴基斯坦最大的水力发电站正在艰难建设中。电站建成后，将淹没喀喇昆仑公路27km路段，取代它的道路，要在陡峭的峡谷中抬升100多米",
    specs: [{ k: "地位", v: "巴基斯坦最大水电站" }, { k: "关联", v: "KKH 27km 改线" }]
  },
  {
    id: "pak-kkh", ep: 8, country: "巴基斯坦", countryEn: "Pakistan",
    region: "北部山区", city: "红其拉甫—塔科特",
    name: "喀喇昆仑公路（KKH）", nameEn: "Karakoram Highway",
    lat: 35.9000, lon: 74.3000, year: "1970s建成，持续升级",
    category: "公路",
    desc: "穿越喜马拉雅、喀喇昆仑、兴都库什三大山脉，世界上最高最美的公路。上世纪六七十年代中巴两国以生命与意志修筑，中国援建段613公里、历时6年零7个月，700余人牺牲。",
    quote: "途经帕米尔高原，喀喇昆仑公路，上个世纪70年代，中巴两国人民用生命与意志扑救……北起中巴边界红旗拉甫山口，南至塔科特大桥，全长613km的道路部分",
    specs: [{ k: "援建段", v: "613 km" }, { k: "工期", v: "6年7个月" }, { k: "地貌", v: "三大山脉交汇" }]
  },
  {
    id: "pak-takot", ep: 8, country: "巴基斯坦", countryEn: "Pakistan",
    region: "开伯尔-普什图省", city: "塔科特（Thakot）",
    name: "中巴友谊大桥（塔科特大桥）", nameEn: "Pakistan-China Friendship Bridge",
    lat: 34.7800, lon: 72.9200, year: "1978年建成",
    category: "桥梁",
    desc: "横跨印度河的喀喇昆仑公路终点桥，被命名为“中巴友谊大桥”。由此向南为全新120公里双向四车道高速公路，接入伊斯兰堡高速网。",
    quote: "横跨印度河的喀喇昆仑公路，塔科特大桥被命名为中巴友谊大桥……从这里开始，全新的120km双向四车道高速公路，一路向南。",
    specs: [{ k: "跨越", v: "印度河" }, { k: "意义", v: "KKH 南端起点" }]
  },
  {
    id: "pak-rashakai", ep: 8, country: "巴基斯坦", countryEn: "Pakistan",
    region: "开伯尔-普什图省", city: "拉沙卡伊（Rashakai）",
    name: "拉沙卡伊特别经济区", nameEn: "Rashakai Special Economic Zone",
    lat: 34.1500, lon: 71.9500, year: "建设中",
    category: "产业园",
    desc: "位于西北边境、在一片荒地上拔地而起，是中巴产业与园区合作框架下的重点项目，有望成为东亚—中亚—西亚贸易中转站与产能合作基地。",
    quote: "位于西北边境的拉沙卡一产业园，在一片荒地上拔地而起。产业与园区合作框架下的重点项目……有望成为东亚，中亚，西亚地区，贸易往来的重要中转站和产能合作基地。",
    specs: [{ k: "定位", v: "中巴产能合作基地" }]
  },
  {
    id: "lao-rail", ep: 8, country: "老挝", countryEn: "Laos",
    region: "万象—磨丁", city: "万象 / 琅勃拉邦 / 万荣",
    name: "中老铁路", nameEn: "China-Laos Railway",
    lat: 19.8800, lon: 102.1300, year: "2021年12月3日通车",
    category: "铁路",
    desc: "全部采用中国技术与标准建设，2010年开工、2021年全线通车。沿线“一站一景”，琅勃拉邦站融合老挝乡村寺庙人字形叠层造型；客货两旺，货物可经中欧班列直通欧洲。",
    quote: "2010年开工，2021年全线通车，全部采用中国技术和标准建设的中老铁路……每个帐篷都不一样的，我们现在都提倡了一战一景，一条线路上最能够代表当地的交织性建筑。",
    specs: [{ k: "通车", v: "2021-12-03" }, { k: "标准", v: "全套中国技术标准" }]
  },
  {
    id: "tha-hsr", ep: 8, country: "泰国", countryEn: "Thailand",
    region: "曼谷—呵叻", city: "曼谷 / 大城府",
    name: "中泰高铁（曼谷—呵叻段）", nameEn: "Bangkok–Nakhon Ratchasima HSR",
    lat: 14.2000, lon: 100.6000, year: "建设中",
    category: "铁路",
    desc: "一期全长约253公里，全程采用中国规范与标准、按250公里时速设计。43标段23公里由中国企业承建，是全线最大且唯一全程高架路段，需混凝土80万方、钢筋11万吨。",
    quote: "中泰高铁一期工程曼谷至科勒段，全长约253km……43标段桥梁主体正在架设，这段23km长的铁轨，由中国企业承建……中泰高铁全程采用中国规范和中国标准，按照250km的时速进行设计",
    specs: [{ k: "一期", v: "253 km" }, { k: "时速", v: "250 km/h" }]
  },
  {
    id: "tha-bangsue", ep: 8, country: "泰国", countryEn: "Thailand",
    region: "曼谷", city: "邦似（Bang Sue）",
    name: "邦似中央车站", nameEn: "Krung Thep Aphiwat Central Terminal",
    lat: 13.8030, lon: 100.5390, year: "已启用",
    category: "交通枢纽",
    desc: "东南亚最大铁路交通枢纽，接驳高铁、机场线与地铁，设计使用期限100年。与百年老站华南蓬相隔8公里，如同两个时代的平行剪辑。",
    quote: "邦四中央车站接驳高铁，机场地铁汇聚所有交通方式，已成为东南亚最大的铁路交通枢纽……设计使用期限100年，新老两个火车站相隔8km",
    specs: [{ k: "地位", v: "东南亚最大铁路枢纽" }, { k: "设计寿命", v: "100 年" }]
  },
  {
    id: "mys-ecrl", ep: 8, country: "马来西亚", countryEn: "Malaysia",
    region: "东海岸", city: "云顶隧道 / 彭亨—吉兰丹",
    name: "马来西亚东海岸铁路（ECRL）", nameEn: "East Coast Rail Link",
    lat: 4.3000, lon: 102.4000, year: "2027年建成",
    category: "铁路",
    desc: "全长665公里，11个施工节点同时开工。控制性工程云顶隧道长16.39公里，建成后为东南亚最长隧道，采用中国量身制造的敞开式硬岩掘进机（云顶1号、2号），月进尺350–500米。",
    quote: "全长16.39km的云顶隧道，建成后将成为东南亚最长的隧道……马来西亚东海岸铁路全程665km，有11个施工节点同时开工……2027年，马来西亚东海岸铁路建成后",
    specs: [{ k: "全长", v: "665 km" }, { k: "云顶隧道", v: "16.39 km（东南亚最长）" }]
  }
];
