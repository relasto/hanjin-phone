/* ==========================================================
   TWS · 韩振的手机 · 交互
   ========================================================== */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const phone    = $('#phone');
const wall     = $('#wall');
const lockLayer= $('#lockLayer');
const homeLayer= $('#homeLayer');
const appLayer = $('#appLayer');
const overlay  = $('#overlay');
const statusbar= $('#statusbar');
const island   = $('#island');
const homebar  = $('#homebar');

const CLOCK = '23:47';
let appStack = [];
let chatTimer = null;
let callTimer = null;


const TAB = {
  chat: `<svg viewBox="0 0 24 24"><path d="M12 3C6.9 3 2.8 6.4 2.8 10.6c0 2.4 1.4 4.5 3.5 5.9-.2.8-.7 2-1.5 2.8-.2.2 0 .5.2.5 1.7-.2 3-.9 3.8-1.5 1 .3 2.1.4 3.2.4 5.1 0 9.2-3.4 9.2-7.6S17.1 3 12 3Z"/></svg>`,
  contacts: `<svg viewBox="0 0 24 24"><circle cx="9" cy="8.4" r="3.6"/><path d="M2.6 19.4c0-3.4 2.9-5.6 6.4-5.6s6.4 2.2 6.4 5.6H2.6Z"/><circle cx="17.4" cy="9.4" r="2.8" opacity=".6"/><path d="M16 14c3 0 5.4 1.9 5.4 4.6h-4.6" opacity=".6"/></svg>`,
  find: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1z"/></svg>`,
  me: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20.4c0-4 3.6-6.6 8-6.6s8 2.6 8 6.6H4Z"/></svg>`,
  home: `<svg viewBox="0 0 24 24"><path d="M11.3 2.9a1 1 0 0 1 1.4 0l8 7.4-1.3 1.5L12 5.2 4.6 11.8 3.3 10.3l8-7.4Z"/><path d="M5.6 11.4h12.8v9a1 1 0 0 1-1 1H6.6a1 1 0 0 1-1-1v-9Z"/></svg>`,
  fire: `<svg viewBox="0 0 24 24"><path d="M12.6 2c.4 3.2-1.4 4.6-2.8 6-1.5 1.5-3.1 3.2-3.1 6a5.9 5.9 0 0 0 11.8.2c0-3.4-2.2-5.6-4-7.6-1-1.1-1.9-2.4-1.9-4.6Z"/><path d="M12 13.4c.9 1 1.6 1.8 1.6 3a1.9 1.9 0 1 1-3.8 0c0-1.2.7-2 1.6-3Z" fill="#fff" opacity=".65"/></svg>`,
  mail: `<svg viewBox="0 0 24 24"><rect x="2.6" y="5" width="18.8" height="14" rx="2.6"/><path d="m3.6 7 8.4 6 8.4-6" fill="none" stroke="#fff" stroke-width="1.6" opacity=".7"/></svg>`,
  shop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M3.4 7.6h17.2l-1.4 12.2a1.6 1.6 0 0 1-1.6 1.4H6.4a1.6 1.6 0 0 1-1.6-1.4L3.4 7.6Z"/><path d="M8.4 9.6V6.8a3.6 3.6 0 0 1 7.2 0v2.8"/></svg>`
};

/* ---------------- 适配 ---------------- */
function fit(){
  const s = Math.min(
    (window.innerWidth - 24) / 393,
    (window.innerHeight - 24) / 852,
    1.12
  );
  phone.style.transform = `scale(${s})`;
}
window.addEventListener('resize', fit);

function syncClock(){
  const now = new Date();
  const value = now.toLocaleTimeString('zh-CN', { hour:'2-digit', minute:'2-digit', hour12:false, timeZone:'Asia/Taipei' });
  const sb = $('#sbTime');
  if(sb) sb.textContent = value;
  const lockClock = $('.lock-clock');
  if(lockClock) lockClock.textContent = value;
}
setInterval(syncClock, 15000);

/* ---------------- 图标 ---------------- */
const ICONS = {
  msg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.9 3 2.8 6.4 2.8 10.6c0 2.4 1.4 4.5 3.5 5.9-.2.8-.7 2-1.5 2.8-.2.2 0 .5.2.5 1.7-.2 3-.9 3.8-1.5 1 .3 2.1.4 3.2.4 5.1 0 9.2-3.4 9.2-7.6S17.1 3 12 3Z"/></svg>`,
  photos: `<svg viewBox="0 0 40 40" aria-hidden="true"><g transform="translate(20 20)"><ellipse rx="4.4" ry="10.2" cy="-8" fill="#ff5a52"/><ellipse rx="4.4" ry="10.2" cy="-8" transform="rotate(45)" fill="#ffb340"/><ellipse rx="4.4" ry="10.2" cy="-8" transform="rotate(90)" fill="#ffe34d"/><ellipse rx="4.4" ry="10.2" cy="-8" transform="rotate(135)" fill="#65d66e"/><ellipse rx="4.4" ry="10.2" cy="-8" transform="rotate(180)" fill="#45c7b9"/><ellipse rx="4.4" ry="10.2" cy="-8" transform="rotate(225)" fill="#4ca5ff"/><ellipse rx="4.4" ry="10.2" cy="-8" transform="rotate(270)" fill="#8b72f8"/><ellipse rx="4.4" ry="10.2" cy="-8" transform="rotate(315)" fill="#e36ad6"/><circle r="4.1" fill="#fff"/></g></svg>`,
  notes: `<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="6" y="4" width="28" height="32" rx="5" fill="#fff"/><path d="M6 12h28" stroke="#f2c844" stroke-width="5"/><path d="M10 19h20M10 24h20M10 29h15" stroke="#d6d6d6" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  cal: `<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="5" y="7" width="30" height="29" rx="6" fill="#fff"/><path d="M5 13a6 6 0 0 1 6-6h18a6 6 0 0 1 6 6v2H5z" fill="#ff453a"/><text x="20" y="31" text-anchor="middle" font-size="17" font-weight="700" fill="#222">23</text><path d="M13 4v7M27 4v7" stroke="#8b8b8d" stroke-width="2.3" stroke-linecap="round"/></svg>`,
  safari: `<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="16" fill="#f8fbff"/><circle cx="20" cy="20" r="13.6" fill="none" stroke="#2387ec" stroke-width="1.7"/><path d="m25.8 12.8-4 9.2-7.6 5.1 4-9.1z" fill="#ff453a"/><path d="m18.2 18 7.6-5.2-4 9.2z" fill="#1684ee"/><circle cx="20" cy="20" r="1.3" fill="#fff"/></svg>`,
  music: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.4 2.6 9.6 5.1c-.6.2-1 .8-1 1.4v9.1a3.4 3.4 0 1 0 1.9 3.1V8.6l7.3-2.1v6.4a3.4 3.4 0 1 0 1.9 3.1V4c0-.9-.8-1.6-1.7-1.4Z"/></svg>`,
  maps: `<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="10" fill="#f5f7f4"/><path d="M2 12 13 7l12 4 13-6v24l-12 5-12-4-12 5z" fill="#f7cf68"/><path d="m2 12 11-5v23L2 35zm11-5 12 4v23l-12-4zm12 4 13-6v24l-13 5z" fill="#8fd2a0"/><path d="M6 2 21 38" stroke="#fff" stroke-width="5"/><path d="M30 1 15 39" stroke="#e5a1a1" stroke-width="3"/><path d="M29 9c-3 0-5 2.2-5 5 0 4 5 10 5 10s5-6 5-10c0-2.8-2-5-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4" fill="#fff"/></svg>`,
  weather: `<svg viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="wbg" x2="0" y2="1"><stop stop-color="#49b5ff"/><stop offset="1" stop-color="#1477d4"/></linearGradient></defs><rect width="40" height="40" rx="12" fill="url(#wbg)"/><circle cx="27" cy="13" r="7" fill="#ffd34e"/><path d="M12 30h18a6 6 0 0 0 0-12 9 9 0 0 0-17-1 6.5 6.5 0 0 0-1 13" fill="#fff"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 3.5 9 3.1c.5-.1 1 .2 1.1.7l.8 3c.1.4-.1.8-.5 1l-1.4.7c-.2.1-.3.4-.2.6a10 10 0 0 0 4.1 4.1c.2.1.5 0 .6-.2l.7-1.4c.2-.4.6-.6 1-.5l3 .8c.5.1.8.6.7 1.1l-.4 2.1c-.1.6-.6 1.1-1.2 1.2C11 17.6 6.4 13 5.7 4.7c-.1-.6.4-1.1 1.2-1.2Z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 6.8V12l3.4 2.1"/></svg>`,
  set: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="3.3"/><path d="M12 2.6v2.6M12 18.8v2.6M4.9 4.9l1.9 1.9M17.2 17.2l1.9 1.9M2.6 12h2.6M18.8 12h2.6M4.9 19.1l1.9-1.9M17.2 6.8l1.9-1.9"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="2.6" y="6.4" width="18.8" height="13.4" rx="3.4"/><circle cx="12" cy="13.1" r="3.6"/><path d="M8.6 6.4 9.8 4h4.4l1.2 2.4"/></svg>`,
  wechat: `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M16.8 5C9.4 5 4 9.7 4 15.6c0 3.4 2 6.4 5.1 8.2l-1.2 4.5 5-2.5c1.2.3 2.5.5 3.9.5h.7a9.2 9.2 0 0 1-.7-3.5c0-6.2 5.8-11.1 13-11.1.7 0 1.4 0 2.1.1C29.7 7.8 23.7 5 16.8 5Z" fill="#fff"/><path d="M11.5 14a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8m9 0a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8" fill="#13bf66"/><path d="M25.3 16.4c-6 0-10.8 3.9-10.8 8.8s4.8 8.8 10.8 8.8c1.3 0 2.5-.2 3.6-.6l4.4 2.1-1.1-3.9c2.4-1.6 3.9-3.9 3.9-6.5 0-4.8-4.8-8.7-10.8-8.7Z" fill="#fff"/><circle cx="22" cy="24" r="1.2" fill="#13bf66"/><circle cx="28.5" cy="24" r="1.2" fill="#13bf66"/></svg>`,
  weibo: `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M10 19c-5.5 3.4-8.2 8.1-5.4 11.8 3.1 4 11.9 4.6 19.2 1.3 7.1-3.2 10.5-9 7.4-12.7-2.5-3-7.7-3.3-12.5-1.5.8-2.1.4-3.6-1-4.1-2-.7-5.1 1.4-7.7 5.2Z" fill="#fff"/><path d="M21 21c-5.4-.4-10 2.2-10.3 5.9-.3 3.5 3.6 6.6 8.7 6.9 5.2.4 9.6-2.2 9.9-5.8.3-3.4-3.4-6.6-8.3-7Z" fill="#ed2939"/><path d="M14.7 28c.3-2.2 2.8-3.8 5.6-3.6 2.8.2 4.8 2.1 4.6 4.2-.3 2.1-2.7 3.6-5.4 3.4-2.8-.2-5-1.9-4.8-4Z" fill="#fff"/><circle cx="20" cy="28" r="2" fill="#ed2939"/><path d="M25 10c4.5-.7 7.4 1.2 8.1 4.7M25.8 5.5c7.3-1 12.1 2.4 13 8.1" fill="none" stroke="#ff9f28" stroke-width="2.8" stroke-linecap="round"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24"><path d="M16.8 2.2h-3.1v13.1a3.1 3.1 0 1 1-2.4-3V9a6.2 6.2 0 1 0 5.3 6.1V7.9a6.1 6.1 0 0 0 3.6 1.2V6a3.5 3.5 0 0 1-3.4-3.8Z" fill="#25f4ee" transform="translate(-.8,-.7)"/><path d="M16.8 2.2h-3.1v13.1a3.1 3.1 0 1 1-2.4-3V9a6.2 6.2 0 1 0 5.3 6.1V7.9a6.1 6.1 0 0 0 3.6 1.2V6a3.5 3.5 0 0 1-3.4-3.8Z" fill="#fe2c55" transform="translate(.8,.7)"/><path d="M16.8 2.2h-3.1v13.1a3.1 3.1 0 1 1-2.4-3V9a6.2 6.2 0 1 0 5.3 6.1V7.9a6.1 6.1 0 0 0 3.6 1.2V6a3.5 3.5 0 0 1-3.4-3.8Z" fill="#fff"/></svg>`
};

const APP_DEF = {
  chat:      { n:'信息',  bg:'linear-gradient(160deg,#5ee07a,#2fbf4f)', ic:'msg' },
  photos:    { n:'相册',  bg:'linear-gradient(160deg,#fff,#f0e8ff)', ic:'photos', fg:'#7a6bff' },
  notes:     { n:'备忘录',bg:'linear-gradient(160deg,#fff6c9,#ffd95e)', ic:'notes', fg:'#c99a06' },
  calendar:  { n:'日历',  bg:'linear-gradient(160deg,#fff,#f2f2f7)', ic:'cal', fg:'#ff3b30' },
  safari:    { n:'Safari',bg:'linear-gradient(160deg,#6fd3ff,#1a8cf0)', ic:'safari' },
  music:     { n:'音乐',  bg:'linear-gradient(160deg,#ff6b81,#f5305c)', ic:'music' },
  maps:      { n:'地图',  bg:'linear-gradient(160deg,#9be08a,#3fbf62)', ic:'maps' },
  weather:   { n:'天气',  bg:'linear-gradient(160deg,#7fc6ea,#2b7fc0)', ic:'weather' },
  phone:     { n:'电话',  bg:'linear-gradient(160deg,#42df73,#20bd55)', ic:'phone' },
  clock:     { n:'时钟',  bg:'linear-gradient(160deg,#4a4a50,#1c1c1e)', ic:'clock' },
  settings:  { n:'设置',  bg:'linear-gradient(160deg,#cbd1d8,#818a95)', ic:'set' },
  camera:    { n:'相机',  bg:'linear-gradient(160deg,#f7f7f9,#c9cbd0)', ic:'camera', fg:'#3b3b40' },
  wechat:    { n:'微信',  bg:'linear-gradient(160deg,#5ee07a,#07c160)', ic:'wechat' },
  weibo:     { n:'微博',  bg:'linear-gradient(160deg,#ff8a4c,#e6162d)', ic:'weibo' },
  xhs:       { n:'小红书', bg:'#ff2442', ic:'', text:'小红书' },
  tiktok:    { n:'TikTok', bg:'#0a0a0a', ic:'tiktok' }
};

/* ---------------- 真实照片素材 ---------------- */
const IMG = {
  /* TWS official group concept photo, USEN MUSIC, 2026-04-15. */
  twsOfficial:'assets/tws_to_us_2026.jpg',
  /* —— 场景 —— */
  window:'assets/room_kao.jpg',   roomDorm:'assets/room_dorm.jpg',
  roomSoft:'assets/room_soft.jpg',
  stage:'assets/stage_wide.jpg',  stageEmpty:'assets/stage_lit.jpg',
  stageLit:'assets/stage_beam.jpg', stageBlue:'assets/stage_blue.jpg',
  stageWarm:'assets/stage_warm.jpg',
  lightSea:'assets/light_sea.jpg', lightHand:'assets/light_hand.jpg',
  practice:'assets/practice3.jpg', danceGrp:'assets/dance_grp.jpg',
  danceBal:'assets/dance_bal.jpg', practiceRoom:'assets/practice_borrow.jpg',
  airport:'assets/airport_hall.jpg', airportBig:'assets/airport_big.jpg',
  planeWing:'assets/plane_wing.jpg', planeCloud:'assets/plane_cloud2.jpg',
  /* —— 街景 —— */
  city:'assets/seoul_city.jpg',  seoulNight:'assets/seoul_night.jpg',
  seoulRiver:'assets/seoul_river.jpg', seoulDusk:'assets/seoul_dusk.jpg',
  night:'assets/street_neon.jpg', street:'assets/street_night.jpg',
  bkMarket:'assets/bk_market.jpg',
  subway:'assets/subway_plat.jpg', subwayTile:'assets/subway_tile.jpg',
  /* —— 吃的 —— */
  ramen:'assets/ramen_bowl.jpg', ramenClose:'assets/ramen_close.jpg',
  ramenDark:'assets/ramen_dark.jpg', ramenSide:'assets/ramen_side.jpg',
  food:'assets/hotpot_red.jpg',  hotpot:'assets/hotpot_pan.jpg',
  hotpotMix:'assets/hotpot_mix.jpg',
  cvs:'assets/cvs_shelf.jpg',    cvsDoor:'assets/cvs_door.jpg',
  cvsCold:'assets/cvs_cold.jpg',
  cafe:'assets/cafe_latte.jpg',  cafeTop:'assets/cafe_top.jpg',
  cafeCup:'assets/cafe_cup.jpg',
  cake:'assets/cake_candle.jpg', candle:'assets/cake_dark.jpg',
  cakeMany:'assets/cake_many.jpg',
  /* —— 其他 —— */
  sky:'assets/sky_dusk.jpg',     sunset:'assets/sky_sunset.jpg',
  skyPink:'assets/sky_pink.jpg', sea:'assets/sea_calm.jpg',
  seaDusk:'assets/sea_dusk.jpg', cherry:'assets/cherry_road.jpg',
  cherryPink:'assets/cherry_pink.jpg', snow:'assets/snow_street.jpg',
  snowPalace:'assets/snow_palace.jpg',
  six:'assets/street_night.jpg', cam:'assets/desk_laptop.jpg',
  debut:'assets/stage_warm.jpg', empty:'assets/stage_lit.jpg',
  fashion:'assets/fashion_run.jpg', fashionRow:'assets/fashion_row.jpg',
  fashionShow:'assets/fashion_show.jpg',
  studio:'assets/studio_mic.jpg', studioMix:'assets/studio_mix.jpg',
  studioDesk:'assets/studio_desk.jpg', desk:'assets/desk_laptop.jpg',
  /* —— 相册扩充 —— */
  audFront:'assets/aud_front.jpg',   audCrowd:'assets/aud_crowd.jpg',
  planeMeal:'assets/plane_meal.jpg', metro:'assets/metro_kao.jpg',
  parcel:'assets/parcel.jpg',        milktea:'assets/milktea.jpg',
  oden:'assets/oden.jpg',            bkNight:'assets/bk_night.jpg',
  macauNight:'assets/macau_night.jpg', taipeiCity:'assets/taipei_city.jpg',
  taipeiNight:'assets/taipei_night.jpg',
  chicken:'assets/chicken.jpg',      fukuokaCity:'assets/fukuoka_city.jpg',
  danceRoom:'assets/practice_borrow.jpg', cupNoodle:'assets/cup_noodle2.jpg',
  rainGlass:'assets/rain_glass.jpg', rainStreet:'assets/rain_street.jpg',
  cat:'assets/cat.jpg',              deskNight:'assets/desk_night.jpg'
};

function photo(src){
  return `<div class="shot ph"><img src="${src}" alt="" loading="lazy"><div class="vig"></div></div>`;
}

/* ---------------- 抽象「照片」 ---------------- */
function art(kind){
  if(IMG[kind]) return photo(IMG[kind]);
  const cfg = {
    window:  { m:'skyline', c:['#ffc089','#a4636f','#2b2030'] },
    night:   { m:'skyline', c:['#31465f','#18273c','#0a1220'] },
    city:    { m:'skyline', c:['#8ba3c4','#4e6383','#232c3d'] },
    street:  { m:'skyline', c:['#f0b478','#8e5a56','#2a2028'] },
    airport: { m:'skyline', c:['#c9d8e2','#8ba0ae','#3d4b57'] },
    sky:     { m:'open',    c:['#b9d8ec','#e6f1f7','#ffffff'] },
    sea:     { m:'open',    c:['#a7cddd','#5d95ae','#2f5d72'] },
    sunset:  { m:'open',    c:['#ffb27a','#e2725b','#4a3d5c'] },
    stage:   { m:'indoor',  c:['#1a1424','#3b2a4a','#ffcf7a'] },
    practice:{ m:'indoor',  c:['#20262c','#39434c','#cfe3ea'] },
    debut:   { m:'indoor',  c:['#241d18','#4a3a2c','#f0c98a'] },
    ramen:   { m:'table',   c:['#43301f','#c9762f','#f2d29a'] },
    food:    { m:'table',   c:['#3c1a16','#c0392b','#f0b07a'] },
    cake:    { m:'table',   c:['#3a2c33','#e8c6cf','#fff3f4'] },
    candle:  { m:'table',   c:['#161418','#5a4326','#ffd28a'] },
    cam:     { m:'table',   c:['#1e2024','#4a4f57','#9aa3ad'] },
    six:     { m:'figures', c:['#f0a86b','#6b4a52','#241a20'] },
    cherry:  { m:'branch',  c:['#f7dbe4','#e8a8bd','#7a5560'] },
    snow:    { m:'branch',  c:['#dbe6ef','#ffffff','#7d8b99'] }
  }[kind] || { m:'skyline', c:['#8ba3c4','#4e6383','#232c3d'] };

  const [a, b, c] = cfg.c;
  let inner = '';

  if(cfg.m === 'skyline'){
    inner = `
      <defs><linearGradient id="g${kind}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${a}"/><stop offset=".62" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>
      </linearGradient><filter id="sb${kind}"><feGaussianBlur stdDeviation=".8"/></filter></defs>
      <rect width="300" height="300" fill="url(#g${kind})"/>
      <rect y="196" width="300" height="104" fill="${c}" opacity=".92"/>
      <g fill="${c}" opacity=".85" filter="url(#sb${kind})">
        <rect x="8" y="150" width="34" height="60"/><rect x="50" y="168" width="26" height="42"/>
        <rect x="88" y="132" width="40" height="78"/><rect x="138" y="158" width="30" height="52"/>
        <rect x="176" y="140" width="44" height="70"/><rect x="228" y="164" width="28" height="46"/>
        <rect x="262" y="148" width="34" height="62"/>
      </g>
      <g fill="#ffe3ae" opacity=".8">
        <rect x="16" y="160" width="5" height="6"/><rect x="27" y="172" width="5" height="6"/>
        <rect x="97" y="144" width="5" height="6"/><rect x="108" y="158" width="5" height="6"/>
        <rect x="186" y="152" width="5" height="6"/><rect x="200" y="168" width="5" height="6"/>
        <rect x="272" y="160" width="5" height="6"/>
      </g>`;
  } else if(cfg.m === 'open'){
    inner = `
      <defs><linearGradient id="g${kind}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>
      </linearGradient><filter id="sb${kind}"><feGaussianBlur stdDeviation="3"/></filter></defs>
      <rect width="300" height="300" fill="url(#g${kind})"/>
      <g fill="#fff" opacity=".42" filter="url(#sb${kind})">
        <ellipse cx="86" cy="96" rx="52" ry="20"/><ellipse cx="126" cy="88" rx="38" ry="17"/>
        <ellipse cx="228" cy="140" rx="42" ry="15"/>
      </g>
      <rect y="228" width="300" height="72" fill="${c}" opacity=".3"/>`;
  } else if(cfg.m === 'indoor'){
    inner = `
      <defs><linearGradient id="g${kind}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
      </linearGradient></defs>
      <rect width="300" height="300" fill="url(#g${kind})"/>
      <g opacity=".5">
        <polygon points="70,0 130,0 190,300 120,300" fill="${c}" opacity=".18"/>
        <polygon points="180,0 220,0 250,300 200,300" fill="${c}" opacity=".12"/>
      </g>
      <rect y="236" width="300" height="64" fill="${c}" opacity=".1"/>
      <g fill="${c}" opacity=".55">
        <rect x="42" y="62" width="3" height="120"/><rect x="255" y="48" width="3" height="140"/>
      </g>`;
  } else if(cfg.m === 'table'){
    inner = `
      <defs>
        <radialGradient id="g${kind}" cx=".5" cy=".34" r=".82">
          <stop offset="0" stop-color="${b}"/><stop offset=".5" stop-color="${a}"/><stop offset="1" stop-color="${c}"/>
        </radialGradient>
        <linearGradient id="t${kind}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffffff" stop-opacity=".22"/><stop offset="1" stop-color="#000000" stop-opacity=".25"/>
        </linearGradient>
        <filter id="bl${kind}"><feGaussianBlur stdDeviation="2.4"/></filter>
      </defs>
      <rect width="300" height="300" fill="url(#g${kind})"/>
      <ellipse cx="150" cy="196" rx="150" ry="86" fill="url(#t${kind})"/>
      <g filter="url(#bl${kind})" opacity=".55">
        <ellipse cx="78" cy="96" rx="46" ry="30" fill="#fff" opacity=".13"/>
        <ellipse cx="238" cy="250" rx="60" ry="34" fill="#000" opacity=".3"/>
      </g>
      <ellipse cx="150" cy="192" rx="86" ry="30" fill="#000" opacity=".34" filter="url(#bl${kind})"/>
      <ellipse cx="150" cy="176" rx="74" ry="26" fill="${c}"/>
      <ellipse cx="150" cy="171" rx="66" ry="21" fill="${b}"/>
      <ellipse cx="150" cy="169" rx="52" ry="14" fill="#fff" opacity=".16"/>
      <g opacity=".5" stroke="#fff" stroke-width="2.6" stroke-linecap="round">
        <path d="M214 150 L266 116"/><path d="M222 162 L276 132"/>
      </g>
      <g opacity=".26" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#bl${kind})">
        <path d="M132 142 q6 -18 -2 -30"/><path d="M158 138 q-7 -20 3 -32"/>
      </g>`;
  } else if(cfg.m === 'figures'){
    const person = (x, h, d) => `
      <g transform="translate(${x} ${250 - h}) scale(${h / 100})">
        <circle cx="0" cy="6" r="7.4"/>
        <path d="M-7.6 16 q7.6 -5 15.2 0 l2.4 34 h-20 z"/>
        <rect x="-8.4" y="50" width="6.4" height="34" rx="3"/>
        <rect x="2" y="50" width="6.4" height="34" rx="3"/>
      </g>`;
    inner = `
      <defs>
        <linearGradient id="g${kind}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${a}"/><stop offset=".56" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>
        </linearGradient>
        <filter id="bl${kind}"><feGaussianBlur stdDeviation="1.1"/></filter>
      </defs>
      <rect width="300" height="300" fill="url(#g${kind})"/>
      <ellipse cx="150" cy="120" rx="120" ry="60" fill="${a}" opacity=".35" filter="url(#bl${kind})"/>
      <rect y="250" width="300" height="50" fill="${c}" opacity=".8"/>
      <g fill="${c}" opacity=".9" filter="url(#bl${kind})">
        ${person(52, 92)}${person(104, 100)}${person(156, 95)}${person(206, 104)}${person(252, 88)}
      </g>
      <g opacity=".18" fill="${c}">
        <ellipse cx="52" cy="258" rx="16" ry="4"/><ellipse cx="104" cy="260" rx="17" ry="4"/>
        <ellipse cx="156" cy="259" rx="16" ry="4"/><ellipse cx="206" cy="261" rx="17" ry="4"/>
      </g>`;
  } else if(cfg.m === 'branch'){
    inner = `
      <defs><linearGradient id="g${kind}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${c}"/>
      </linearGradient></defs>
      <rect width="300" height="300" fill="url(#g${kind})"/>
      <path d="M-10 40 Q90 78 150 66 T310 96" stroke="${c}" stroke-width="7" fill="none" opacity=".7"/>
      <path d="M60 66 Q70 20 110 6" stroke="${c}" stroke-width="4" fill="none" opacity=".55"/>
      <g fill="${b}" opacity=".9">
        <circle cx="72" cy="52" r="6"/><circle cx="96" cy="40" r="5"/><circle cx="128" cy="60" r="6"/>
        <circle cx="164" cy="54" r="5"/><circle cx="196" cy="74" r="6"/><circle cx="232" cy="70" r="5"/>
        <circle cx="262" cy="92" r="6"/><circle cx="44" cy="70" r="5"/><circle cx="150" cy="86" r="4"/>
      </g>`;
  }

  return `<div class="shot"><div class="art"><svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">${inner}</svg></div><div class="vig"></div></div>`;
}

/* ---------------- 头像 ---------------- */
function avatar(who, size){
  const m = MEMBERS[who] || { name:'?', emoji:'🙂', color:'#8fa4b8' };
  const bg = who === 'mom' ? 'linear-gradient(160deg,#f2a08a,#d9604f)'
           : who === 'manager' ? 'linear-gradient(160deg,#9aa4b2,#5f6b7a)'
           : `linear-gradient(160deg,${m.color},${shade(m.color)})`;
  const em = who === 'mom' ? '🌾' : who === 'manager' ? '📋' : m.emoji;
  return `<div class="av" style="background:${bg};${size?`width:${size}px;height:${size}px;font-size:${size*.42}px`:''}">${em}</div>`;
}
function shade(hex){
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - 46), g = Math.max(0, ((n >> 8) & 255) - 46), b = Math.max(0, (n & 255) - 46);
  return `rgb(${r},${g},${b})`;
}
function groupAvatar(){
  return `<div class="av grp" style="background:linear-gradient(160deg,#2fbf71,#1c7f4c);font-size:17px">TWS</div>`;
}

/* ==========================================================
   锁屏
   ========================================================== */
function renderLock(){
  lockLayer.innerHTML = `
    <div class="lock-glow"></div>
    <div class="lock-top">
    <div class="lock-date">10月23日 星期五</div>
      <div class="lock-clock">${CLOCK}</div>
      <div class="lock-sub">🌙 高雄 · 29° 多云</div>
    </div>
    <div class="lock-notis">
      ${NOTIFICATIONS.map((n, i) => `
        <div class="noti" data-act="noti" data-i="${i}">
          <div class="ic" style="background:${n.app==='weverse'?'linear-gradient(160deg,#5ee07a,#2fbf4f)':'linear-gradient(160deg,#ffe14d,#ffc400)'};font-size:17px">${n.icon}</div>
          <div class="bd">
            <div class="tt"><span>${n.title}</span><em>${n.time}</em></div>
            <div class="ms">${n.text}</div>
          </div>
        </div>`).join('')}
    </div>
    <div class="lock-bottom">
      <button class="lock-btn" data-act="torch">
        <svg viewBox="0 0 24 24"><path d="M8.6 2h6.8v2.6l-1 1.9v14.9a1.6 1.6 0 0 1-1.6 1.6h-1.6a1.6 1.6 0 0 1-1.6-1.6V6.5l-1-1.9V2Zm2 1.9v1.6l1 1.9h1.8l1-1.9V3.9h-3.8Z"/></svg>
      </button>
      <div class="swipe-hint" data-act="unlock">向上轻扫以解锁</div>
      <button class="lock-btn" data-act="unlock">
        <svg viewBox="0 0 24 24"><path d="M4 7h3l1.4-2h7.2L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm8 3.4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/></svg>
      </button>
    </div>
    ${passHTML()}`;
}

/* ---------------- 密码（0105 · 生日） ---------------- */
const PASSCODE = '0105';
let passBuf = '', passFails = 0;

function passHTML(){
  const keys = ['1','2','3','4','5','6','7','8','9','','0','del'];
  return `
  <div id="passLayer">
    <div class="p-top">
      <svg viewBox="0 0 24 24" width="27" height="27"><path d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5Zm3 8V7a3 3 0 0 0-6 0v3h6Z"/></svg>
      <div class="p-ttl">输入密码</div>
      <div class="p-sub">为「韩振的手机」解锁</div>
      <div class="pdots" id="pDots"><i></i><i></i><i></i><i></i></div>
      <div class="p-hint" id="pHint">密码提示：生日 (MMDD)</div>
      <div class="p-err" id="pErr">${passFails >= 2 && passFails % 2 === 1 ? '1 次尝试失败' : ''}</div>
    </div>
    <div class="p-pad">
      ${keys.map(k => k === ''
        ? '<div></div>'
        : k === 'del'
          ? '<div class="pkey fn" data-act="passdel"><svg viewBox="0 0 28 20" width="26"><path d="M9.4 1h15A3.6 3.6 0 0 1 28 4.6v10.8a3.6 3.6 0 0 1-3.6 3.6H9.4a3.6 3.6 0 0 1-2.5-1L1.2 12.5a3.6 3.6 0 0 1 0-5L6.9 2a3.6 3.6 0 0 1 2.5-1Zm3.2 5.4a1.2 1.2 0 0 0-1.7 1.7L13.8 11l-2.9 2.9a1.2 1.2 0 1 0 1.7 1.7l2.9-2.9 2.9 2.9a1.2 1.2 0 1 0 1.7-1.7L17.2 11l2.9-2.9a1.2 1.2 0 1 0-1.7-1.7L15.5 9.3l-2.9-2.9Z" fill="#fff"/></svg></div>'
          : `<div class="pkey" data-act="pass" data-n="${k}">${k}${k==='0'?'<span class="p-l">+</span>':''}</div>`).join('')}
    </div>
    <div class="p-cancel" data-act="passcancel">取消</div>
  </div>`;
}
function passDots(){
  const dots = $('#pDots');
  if(!dots) return;
  dots.querySelectorAll('i').forEach((el,i) => el.classList.toggle('on', i < passBuf.length));
  const hint = $('#pHint');
  if(hint) hint.classList.toggle('vis', passFails >= 2);
}
function passIn(n){
  if(passBuf.length >= 4) return;
  passBuf += n;
  passDots();
  if(passBuf.length === 4) setTimeout(passTry, 160);
}
function passDel(){
  passBuf = passBuf.slice(0,-1);
  passDots();
}
function passTry(){
  if(passBuf === PASSCODE){ doUnlock(); return; }
  passFails++;
  const dots = $('#pDots'), err = $('#pErr');
  if(err) err.textContent = passFails === 1 ? '1 次尝试失败' : `${passFails} 次尝试失败`;
  if(dots){
    dots.classList.remove('shake'); void dots.offsetWidth; dots.classList.add('shake');
    setTimeout(() => { passBuf = ''; passDots(); }, 420);
  }
}
function showPass(){
  passBuf = '';
  lockLayer.classList.add('passmode');
  passDots();
}
function hidePass(){
  lockLayer.classList.remove('passmode');
}
function doUnlock(){
  lockLayer.classList.remove('show','passmode');
  homeLayer.classList.add('show');
  statusbar.classList.remove('dark');
  statusbar.classList.remove('lock');
  homebar.classList.add('light');
}

/* ==========================================================
   主屏
   ========================================================== */
function renderHome(){
  const grid = ['wechat','chat','weibo','xhs','tiktok','photos','notes','calendar','safari','music','maps','weather','phone','clock','settings','camera'];
  const dock = ['phone','wechat','chat','photos'];
  const badge = { chat: 7, wechat: 23, weibo: 1, tiktok: 4 };

  const ico = (id, inDock) => {
    const a = APP_DEF[id];
    const inner = a.text
      ? `<span style="font-size:10.5px;font-weight:700;color:#fff;letter-spacing:-.4px;line-height:1.05;text-align:center">${a.text}</span>`
      : `<span style="color:${a.fg || '#fff'}">${ICONS[a.ic]}</span>`;
    return `<div class="app-ico ${['wechat','weibo','xhs','tiktok','photos','notes','calendar','safari','maps','weather','camera'].includes(id) ? 'brand-icon' : ''}" data-act="open" data-app="${id}">
      <div class="gl" style="background:${a.bg}">
        ${inner}
        ${badge[id] && !inDock ? `<span class="badge">${badge[id]}</span>` : ''}
      </div>
      <div class="nm">${a.n}</div>
    </div>`;
  };

  homeLayer.innerHTML = `
    <div class="home-grid">
      ${ico('wechat')}${ico('chat')}${ico('weibo')}${ico('xhs')}
      <div class="widget" data-act="open" data-app="calendar">
        <div>
          <div class="wl">TO US</div>
          <div class="wt">11月2日 18:00</div>
          <div class="wd">第二张单曲专辑 · 还有 10 天</div>
        </div>
        <div class="wr">
          <div class="wn">10</div>
          <div class="wu">DAYS</div>
        </div>
      </div>
      ${ico('tiktok')}${ico('photos')}${ico('notes')}${ico('calendar')}
      ${ico('safari')}${ico('music')}${ico('maps')}${ico('weather')}
      ${ico('phone')}${ico('clock')}${ico('settings')}${ico('camera')}
    </div>
    <div class="search-pill" data-act="toast" data-msg="搜索 · 模拟器里没有索引">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>搜索
    </div>
    <div class="dock">${dock.map(d => ico(d, true)).join('')}</div>`;
}

/* ==========================================================
   通用视图
   ========================================================== */
function closeAllViews(){
  $$('.view', appLayer).forEach(v => v.remove());
  appStack = [];
}
function backToHome(immediate = false){
  clearTimeout(chatTimer);
  const current = appStack[0];
  if(!immediate && current && appLayer.classList.contains('show')){
    const id = current.dataset.app;
    const icon = id && $(`.app-ico[data-app="${id}"]`, homeLayer);
    const phoneRect = phone.getBoundingClientRect();
    const iconRect = icon?.querySelector('.gl')?.getBoundingClientRect();
    if(iconRect){
      const sx = iconRect.width / phoneRect.width;
      const sy = iconRect.height / phoneRect.height;
      const x = (iconRect.left - phoneRect.left) / (phoneRect.width / 393);
      const y = (iconRect.top - phoneRect.top) / (phoneRect.width / 393);
      current.animate([
        { transform:'none', borderRadius:'0', opacity:1 },
        { transform:`translate(${x}px,${y}px) scale(${sx},${sy})`, transformOrigin:'top left', borderRadius:'25%', opacity:.25 }
      ], { duration:430, easing:'cubic-bezier(.32,.72,0,1)', fill:'forwards' }).finished
        .catch(() => {}).finally(() => finishBackToHome());
      return;
    }
  }
  finishBackToHome();
}
function finishBackToHome(){
  closeAllViews();
  appLayer.classList.remove('show');
  appLayer.innerHTML = '';
  homeLayer.classList.add('show');
  lockLayer.classList.remove('show');
  wall.classList.remove('blur');
  statusbar.classList.remove('dark');
  homebar.classList.add('light');
  island.classList.remove('live');
  overlay.innerHTML = '';
}
function openApp(id, source){
  const fn = APPS[id];
  if(!fn) return;
  homeLayer.classList.remove('show');
  lockLayer.classList.remove('show');
  wall.classList.add('blur');
  appLayer.classList.add('show');
  appLayer.innerHTML = '';
  appStack = [];
  const v = document.createElement('div');
  v.className = 'view';
  v.dataset.app = id;
  v.innerHTML = fn();
  appLayer.appendChild(v);
  appStack.push(v);
  const icon = source?.querySelector('.gl');
  const phoneRect = phone.getBoundingClientRect();
  const iconRect = icon?.getBoundingClientRect();
  if(iconRect){
    const scale = phoneRect.width / 393;
    const sx = iconRect.width / phoneRect.width;
    const sy = iconRect.height / phoneRect.height;
    const x = (iconRect.left - phoneRect.left) / scale;
    const y = (iconRect.top - phoneRect.top) / scale;
    v.animate([
      { transform:`translate(${x}px,${y}px) scale(${sx},${sy})`, transformOrigin:'top left', borderRadius:'25%', opacity:.45 },
      { transform:'none', transformOrigin:'top left', borderRadius:'0', opacity:1 }
    ], { duration:480, easing:'cubic-bezier(.22,1,.36,1)' });
  }
  statusbar.classList.add('dark');
  homebar.classList.remove('light');
  afterRender(id, v);
}
function pushView(html, keep){
  const v = document.createElement('div');
  v.className = 'view';
  v.innerHTML = html;
  appLayer.appendChild(v);
  appStack.push(v);
  statusbar.classList.add('dark');
  return v;
}
function popView(){
  clearTimeout(chatTimer);
  if(appStack.length > 1){
    const v = appStack.pop();
    v.classList.add('back');
    setTimeout(() => v.remove(), 260);
  } else {
    backToHome();
  }
}

/* ==========================================================
   各 App
   ========================================================== */
/* 微信：单人头像用「照片感」配色块，群头像拼九宫格 */
const WX_AVATAR = {
  minghao: 'assets/street_night.jpg',
  wanghao: 'assets/cvs_shelf.jpg',
  mom:     'assets/cake_candle.jpg',
  dad:     'assets/sea_calm.jpg',
  sister:  'assets/cafe_latte.jpg',
  brother: 'assets/hotpot_red.jpg',
  pay:     null,
  mp:      null
};
const WX_GROUP_AVATAR = {
  lvhka:     ['assets/seoul_night.jpg','assets/ramen_bowl.jpg','assets/street_night.jpg','assets/cvs_door.jpg'],
  family:    ['assets/cake_candle.jpg','assets/sea_calm.jpg','assets/cafe_latte.jpg','assets/cherry_road.jpg'],
  classgroup:['assets/subway_plat.jpg','assets/sky_dusk.jpg','assets/hotpot_red.jpg','assets/desk_laptop.jpg']
};
function wxAvatar(id){
  const p = WX_PEOPLE[id] || {};
  const img = WX_AVATAR[id];
  if(img) return `<div class="av sq pic" style="background-image:url(${img})"></div>`;
  return `<div class="av sq" style="background:linear-gradient(160deg,${p.c || '#8fa4b8'},${shade(p.c || '#8fa4b8')});font-size:19px">${p.e || '·'}</div>`;
}
function wxGroupAvatar(id){
  const list = WX_GROUP_AVATAR[id] || [];
  if(list.length >= 4){
    return `<div class="av sq grid4">${list.slice(0,4).map(u => `<i style="background-image:url(${u})"></i>`).join('')}</div>`;
  }
  const c = WX_PEOPLE[id] || {};
  return `<div class="av sq" style="background:linear-gradient(160deg,${c.c || '#7ec98a'},${shade(c.c || '#7ec98a')});font-size:17px">${c.e || '群'}</div>`;
}

/* 账号头像（用真实照片，避免"一个字头像"的塑料感） */
const WB_AV = {
  'TWS打歌repo_':'assets/stage_wide.jpg',
  '韩振站今天也在':'assets/light_sea.jpg',
  '内娱追踪器':'assets/hotpot_red.jpg',
  '首尔夜班车':'assets/seoul_city.jpg',
  '老爹站重生版':'assets/laodie_reborn_avatar.jpg',
  '锐化的原因':'assets/cake_candle.jpg',
  '剧荒急救站':'assets/snow_street.jpg',
  '给42留个门':'assets/seoul_night.jpg',
  '追星法律课代表':'assets/desk_laptop.jpg',
  'TWS中国粉丝站':'assets/stage_blue.jpg',
  '瓜田路过一下':'assets/cafe_latte.jpg',
  '今天不搬砖了':'assets/subway_plat.jpg',
  '回归日历管理员':'assets/cherry_road.jpg',
  '韩娱档案室':'assets/studio_desk.jpg',
  '工位摸鱼中':'assets/cafe_top.jpg',
  '只吃瓜不下场':'assets/hotpot_mix.jpg',
  '秀彬今天营业了吗':'assets/fashion_row.jpg'
};
const XHS_AV = {
  '泡面测评不加蛋':'assets/ramen_close.jpg',
  '首尔打工人momo':'assets/seoul_night.jpg',
  '显微镜追星小陈':'assets/desk_laptop.jpg',
  '今天也去看打歌':'assets/light_sea.jpg',
  '大林洞辣妹':'assets/hotpot_mix.jpg',
  '秀场边角料':'assets/fashion_run.jpg'
};

const WB_AV_FALLBACK = {
  'TWS打歌repo_':'assets/tws_to_us_2026.jpg',
  '韩振站今天也在':'assets/light_sea.jpg',
  '音源空瓶接力赛':'assets/stage_blue.jpg',
  '四季_道勋':'assets/ramen_close.jpg',
  '内娱追踪器':'assets/studio_desk.jpg',
  '首尔夜班车':'assets/seoul_night.jpg',
  '老爹站重生版':'assets/laodie_reborn_avatar.jpg',
  '锐化的原因':'assets/cat.jpg',
  '剧荒急救站':'assets/snow_street.jpg',
  '追星法律课代表':'assets/desk_laptop.jpg',
  'TWS中国粉丝站':'assets/stage_wide.jpg',
  '瓜田路过一下':'assets/hotpot_mix.jpg',
  '今天不搬砖了':'assets/subway_tile.jpg',
  '回归日历管理员':'assets/cherry_road.jpg',
  '今天不营业_0405':'assets/room_soft.jpg',
  '秀彬今天营业了吗':'assets/fashion_show.jpg'
};
function wbAvatar(p){
  const im = WB_AV[p.name] || WB_AV_FALLBACK[p.name];
  if(p.mine) return `<div class="wb-av mine">${p.av}</div>`;
  if(im) return `<div class="wb-av"><img src="${im}" alt=""></div>`;
  return `<div class="wb-av">${p.av}</div>`;
}
function wbName(p){
  return `${p.name}${p.v ? '<i class="wb-v">V</i>' : ''}${p.mine ? '<span class="wb-me">我</span>' : ''}`;
}

const APPS = {

  /* ---- 信息列表 ---- */
  chat(){
    const rows = CHATS.map(c => `
      <div class="msg-row" data-act="chat" data-id="${c.id}">
        ${c.group ? groupAvatar() : avatar(c.id)}
        <div class="msg-main">
          <div class="msg-l1"><span class="msg-nm">${c.name}</span><span class="msg-tm">${c.time}</span></div>
          <div class="msg-l2">
            <span class="msg-pv">${c.preview}</span>
            ${c.unread ? `<span class="unread">${c.unread}</span>` : ''}
          </div>
        </div>
      </div>`).join('');
    return `
      <div class="nav tall big"><div class="ttl">信息</div></div>
      <div class="body"><div class="msg-list">${rows}</div>
        <div class="tagline">KakaoTalk · 6 人的群聊还亮着</div>
      </div>`;
  },

  /* ---- 相册 ---- */
  photos(){
    const secs = PHOTOS.map((s, si) => `
      <div class="ph-sec"><h3>${s.sec}</h3><span>${s.items.length} 张</span></div>
      <div class="ph-grid">
        ${s.items.map((p, pi) => `
          <div class="ph-cell" data-act="photo" data-s="${si}" data-p="${pi}">
            ${art(p.art)}
          </div>`).join('')}
      </div>`).join('');
    return `
      <div class="nav tall big"><div class="ttl">相册</div></div>
      <div class="body">${secs}
        <div class="tagline">214 GB 照片 · 大部分是别人</div>
      </div>`;
  },

  /* ---- 备忘录 ---- */
  notes(){
    const rows = NOTES.map((n, i) => `
      <div class="note-row" data-act="note" data-i="${i}">
        <h4>${n.t}</h4>
        <div class="nd">${n.d}</div>
        <div class="np">${n.p}</div>
      </div>`).join('');
    return `
      <div class="nav tall big"><div class="ttl">备忘录</div></div>
      <div class="body">${rows}<div class="tagline">${NOTES.length} 则备忘录</div></div>`;
  },

  /* ---- 日历 ---- */
  calendar(){
    const first = new Date(2026, 9, 1).getDay();
    const days = 31;
    let cells = '';
    for(let i = 0; i < first; i++) cells += `<div class="cal-d off"></div>`;
    for(let d = 1; d <= days; d++){
      const m = CAL.marks[d];
      cells += `<div class="cal-d ${d === 23 ? 'today' : ''}">${d}
        ${m ? `<div class="ev">${m.map(() => '<i></i>').join('')}</div>` : ''}</div>`;
    }
    const evs = CAL.events.map(e => `
      <div class="ev-item"><div class="bar"></div>
        <div class="txt"><b>${e.t}</b><span>${e.d} · ${e.s}</span></div>
      </div>`).join('');
    return `
      <div class="nav tall big"><div class="ttl">${CAL.month}</div></div>
      <div class="body">
        <div class="cal-week"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>
        <div class="cal-grid">${cells}</div>
        <div class="ph-sec" style="padding-top:22px"><h3>接下来</h3></div>
        <div class="ev-list">${evs}</div>
      </div>`;
  },

  /* ---- Safari ---- */
  safari(){
    const rows = SEARCHES.map(s => `
      <div class="sf-item" data-act="toast" data-msg="Safari 在模拟器里没有网络">
        <div class="gl"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></svg></div>
        <div class="tx"><b>${s.q}</b><span>${s.s}</span></div>
      </div>`).join('');
    return `
      <div class="nav tall"><div class="ttl sub">搜索</div></div>
      <div class="body">
        <div class="sf-bar"><div class="sf-inp">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></svg>
          搜索或输入网站名称
        </div></div>
        <div class="sf-sec"><h4>最近搜索</h4><span>清除</span></div>
        ${rows}
        <div class="tagline">韩国时间 00:47 · 中国时间 23:47</div>
      </div>`;
  },

  /* ---- 音乐 ---- */
  music(){
    const m = MUSIC.now;
    const list = MUSIC.list.map((s, i) => `
      <div class="mu-row" data-act="toast" data-msg="正在播放 · ${s.t}">
        <div class="cv">${art(s.art)}</div>
        <div class="tt"><b>${s.t}${s.new ? ' <span style="color:#ff3b30;font-size:11px">NEW</span>' : ''}</b><span>${s.a}</span></div>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#c4c4c8"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>
      </div>`).join('');
    return `
      <div class="nav tall big"><div class="ttl">播放中</div></div>
      <div class="body">
        <div class="mu-wrap">
          <div class="mu-cover">${art(m.art)}</div>
          <div class="mu-info"><h3>${m.title}</h3><p>${m.artist}</p></div>
          <div class="mu-prog">
            <div class="mu-bar"><i id="muBar"></i></div>
            <div class="mu-tm"><span id="muCur">1:18</span><span>3:34</span></div>
          </div>
          <div class="mu-ctl">
            <button data-act="toast" data-msg="上一首"><svg width="26" height="26" viewBox="0 0 24 24"><path d="M7 5h2v14H7zM19 5v14l-9-7z"/></svg></button>
            <button data-act="toast" data-msg="播放 / 暂停"><svg width="42" height="42" viewBox="0 0 24 24"><path d="M8 4h3.4v16H8zM13.6 4H17v16h-3.4z"/></svg></button>
            <button data-act="toast" data-msg="下一首"><svg width="26" height="26" viewBox="0 0 24 24"><path d="M15 5h2v14h-2zM5 5l9 7-9 7z"/></svg></button>
          </div>
        </div>
        <div class="ph-sec"><h3>接着播放</h3></div>
        <div class="mu-list">${list}</div>
      </div>`;
  },

  /* ---- 地图 ---- */
  maps(){
    const pins = PLACES.map(p => `
      <div class="map-pin" style="left:${p.x}%;top:${p.y}%">
        <div class="pd" style="background:${p.c}"></div><div class="pl">${p.n}</div>
      </div>`).join('');
    const rows = PLACES.map(p => `
      <div class="place-row" data-act="toast" data-msg="${p.n} · ${p.s}">
        <div class="pi" style="background:${p.c}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2Z"/></svg>
        </div>
        <div class="pt"><b>${p.n}</b><span>${p.s}</span></div>
      </div>`).join('');
    return `
      <div class="nav tall big"><div class="ttl">高雄</div></div>
      <div class="body">
        <div class="map-canvas">
          <div class="grid"></div><div class="park"></div><div class="river"></div>
          ${pins}
        </div>
        <div class="ph-sec"><h3>附近</h3><span>明天 19:00</span></div>
        ${rows}
        <div class="tagline">第一次来高雄。明天从这里走到场馆。</div>
      </div>`;
  },

  /* ---- 天气 ---- */
  weather(){
    const w = WEATHER;
    const hrs = w.hours.map(h => `
      <div class="wx-h"><div>${h.h}</div><b>${h.t}°</b><div class="rain">${h.r}</div></div>`).join('');
    return `
      <div class="nav tall" style="background:linear-gradient(180deg,#2e5f7a,#35708c);border:0"><div class="ttl sub" style="color:#fff">天气</div></div>
      <div class="body" style="background:linear-gradient(180deg,#35708c 0%,#3d7e96 40%,#7fb0bd 100%)">
        <div class="wx" style="background:none;min-height:auto">
          <div class="city">${w.city}</div>
          <div class="tmp">${w.temp}°</div>
          <div class="cond">${w.cond}</div>
          <div class="hl">最高 ${w.hi}° 最低 ${w.lo}°</div>
          <div class="wx-card"><div class="wx-hour">${hrs}</div></div>
          <div class="wx-block"><div class="t">演出提示</div><p>${w.note}</p></div>
          <div class="wx-block"><div class="t">明天</div><p>多云转晴 · 24° ~ 31°<br>场馆空调偏冷，带一件外套。</p></div>
        </div>
      </div>`;
  },

  /* ---- 时钟 ---- */
  clock(){
    const zones = [
      { c:'高雄', off:'现在', t:'23:47' },
      { c:'首尔', off:'+1 小时', t:'00:47' },
      { c:'新乡', off:'+0', t:'23:47' }
    ];
    return `
      <div class="nav tall big"><div class="ttl">世界时钟</div></div>
      <div class="body">
        <div class="set-group" style="margin-top:20px">
          ${zones.map(z => `
            <div class="set-row">
              <div style="flex:1"><div style="font-size:13px;color:#8e8e93">${z.off}</div>
              <div style="font-size:17px">${z.c}</div></div>
              <div class="sv" style="font-size:30px;font-weight:200;color:#000;letter-spacing:-1px">${z.t}</div>
            </div>`).join('')}
        </div>
        <div class="tagline">新乡和首尔差一小时。<br>妈妈算时间的时候，总是算错。</div>
      </div>`;
  },

  /* ---- 电话 ---- */
  phone(){
    const rows = CALLS.map(c => `
      <div class="call-row" data-act="toast" data-msg="${c.n} · 通话记录">
        <div class="ci">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 3.5 9 3.1c.5-.1 1 .2 1.1.7l.8 3c.1.4-.1.8-.5 1l-1.4.7c-.2.1-.3.4-.2.6a10 10 0 0 0 4.1 4.1c.2.1.5 0 .6-.2l.7-1.4c.2-.4.6-.6 1-.5l3 .8c.5.1.8.6.7 1.1l-.4 2.1c-.1.6-.6 1.1-1.2 1.2C11 17.6 6.4 13 5.7 4.7c-.1-.6.4-1.1 1.2-1.2Z"/></svg>
        </div>
        <div class="ct"><b>${c.n}</b>
          <span class="${c.type === 'miss' ? 'miss' : ''}">${c.type === 'miss' ? '未接来电' : c.type === 'out' ? '呼出' : '来电'} · ${c.t}</span>
        </div>
        <div style="color:#c4c4c8">›</div>
      </div>`).join('');
    return `
      <div class="nav tall big"><div class="ttl">最近通话</div></div>
      <div class="body">${rows}<div class="tagline">通话记录 · 全部</div></div>`;
  },

  /* ---- 设置 ---- */
  settings(){
    return `
      <div class="nav tall big"><div class="ttl">设置</div></div>
      <div class="body">
        <div class="about">
          <div class="dev">Apple iPhone 15 Pro</div>
          <div class="nm">韩振的 iPhone</div>
          <div class="cap">HANJIN · TWS</div>
          <div class="stat">
            <div><b>214 GB</b><span>照片</span></div>
            <div><b>18 GB</b><span>音乐</span></div>
            <div><b>512 GB</b><span>容量</span></div>
          </div>
        </div>
        <div class="set-group">
          <div class="set-row"><div>语言与地区</div><div class="sv">简体中文 · 韩国</div></div>
          <div class="set-row"><div>键盘</div><div class="sv">中文 拼音 / 한국어</div></div>
          <div class="set-row"><div>专注模式</div><div class="sv">睡眠 · 23:30</div></div>
        </div>
        <div class="set-group">
          <div class="set-row"><div>iCloud 照片</div><div class="sv">同步中 87%</div></div>
          <div class="set-row"><div>电池</div><div class="sv">23%</div></div>
          <div class="set-row"><div>关于本机</div><div class="arrow">›</div></div>
        </div>
        <div class="tagline">这只是一台手机。<br>里面装的东西比手机重。</div>
      </div>`;
  },

  /* ---- 微信 ---- */
  wechat(){
    const rows = WECHAT_CHATS.map(c => {
      const p = WX_PEOPLE[c.id];
      const av = (c.group || c.id === 'classgroup') ? wxGroupAvatar(c.id) : wxAvatar(c.id);
      return `<div class="msg-row wxr" ${c.sys ? 'data-act="toast" data-msg="服务号消息 · 仅推送"' : `data-act="wxchat" data-id="${c.id}"`}>
        ${av}
        <div class="msg-main">
          <div class="msg-l1"><span class="msg-nm">${c.name}</span><span class="msg-tm">${c.time}</span></div>
          <div class="msg-l2">
            <span class="msg-pv">${c.preview}</span>
            ${c.unread ? `<span class="unread wxr">${c.unread}</span>` : ''}
          </div>
        </div>
      </div>`;
    }).join('');
    const total = WECHAT_CHATS.reduce((s, c) => s + (c.unread || 0), 0);
    return `
      <div class="nav wx-nav">
        <div class="ttl">微信${total ? '(' + total + ')' : ''}</div>
        <div class="act">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>
          <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
        </div>
      </div>
      <div class="body wx-body">
        <div class="msg-list">${rows}</div>
      </div>
      <div class="wx-tab">
        <div class="on"><i>${TAB.chat}</i><span>微信</span></div>
        <div><i>${TAB.contacts}</i><span>通讯录</span></div>
        <div><i>${TAB.find}</i><span>发现</span></div>
        <div><i>${TAB.me}</i><span>我</span></div>
      </div>`;
  },

  /* ---- 微博 ---- */
  weibo(){
    const TG = { '爆':'bao', '沸':'fei', '热':'re', '新':'xin' };
    const hot = WEIBO_HOT.map((h, i) => `
      <div class="hot-row" ${h.topic ? `data-act="topic" data-id="${h.topic}"` : `data-act="toast" data-msg="#${h.t}#"`}>
        <span class="rk ${i < 3 ? 'top' : ''}">${i + 1}</span>
        <span class="ht">${h.t}</span>
        ${h.tag ? `<span class="tg ${TG[h.tag] || 'xin'}">${h.tag}</span>` : ''}
        <span class="num">${h.n}</span>
      </div>`).join('');

    const feed = WEIBO_FEED.map(p => `
      <div class="wb-post ${p.mine ? 'mine' : ''} ${p.loo ? 'loo' : ''}">
        <div class="wb-hd">
          ${wbAvatar(p)}
          <div class="wb-hi">
            <b>${wbName(p)}</b>
            <span>${p.time}${p.from ? ' · 来自' + p.from : ''}</span>
          </div>
        </div>
        <div class="wb-tx">${p.text.replace(/\n/g, '<br>')}</div>
        ${p.imgs && p.imgs.length ? `<div class="wb-imgs n${p.imgs.length}">${p.imgs.map(a => art(a)).join('')}</div>` : ''}
        <div class="wb-ft"><span>↻ ${p.rep || '0'}</span><span>💬 ${p.cmt || '0'}</span><span>♡ ${p.like}</span></div>
      </div>`).join('');

    return `
      <div class="nav wb-nav">
        <div class="wb-search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>
          大家都在搜：崔秀彬
        </div>
        <div class="wb-tabs"><b>关注</b><span>推荐</span><span>热门</span><span>视频</span></div>
      </div>
      <div class="body" style="background:#f4f4f6">
        <div class="hot-card">
          <div class="hot-hd"><b>微博热搜</b><span>${new Date().getMonth() + 1}月${new Date().getDate()}日</span></div>
          ${hot}
          <div class="hot-more" data-act="toast" data-msg="完整榜单 50 条">查看完整榜单 ›</div>
        </div>
        ${feed}
        <div class="tagline">小号 @今天不营业_0405 · 12 个粉丝<br>只关注了 3 个超话</div>
      </div>
      <div class="wx-tab wb">
        <div class="on"><i>${TAB.home}</i><span>首页</span></div>
        <div><i>${TAB.fire}</i><span>视频</span></div>
        <div><i>${TAB.find}</i><span>发现</span></div>
        <div><i>${TAB.mail}</i><span>消息</span></div>
        <div><i>${TAB.me}</i><span>我</span></div>
      </div>`;
  },

  /* ---- 小红书 ---- */
  xhs(){
    const cards = XHS_NOTES.map((n, i) => `
      <div class="xhs-card" data-act="xhs" data-i="${i}">
        <div class="xhs-cv">${n.img ? photo('assets/' + n.img + '.jpg') : art(n.cover)}</div>
        <div class="xhs-tt">${n.tag === '黑' ? '<span class="xhs-tag">争议</span>' : n.tag === '红' ? '<span class="xhs-tag hot">热门</span>' : ''}${n.t}</div>
        <div class="xhs-ft"><span class="dot" style="background-image:url(${XHS_AV[n.a] || 'assets/seoul_night.jpg'})"></span><span class="au">${n.a}</span><span class="lk">♡ ${n.like}</span></div>
      </div>`).join('');
    return `
      <div class="nav xhs-nav">
        <div class="xhs-search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>
          韩振 高雄
        </div>
        <div class="xhs-tabs"><span class="on">推荐</span><span>关注</span><span>附近</span></div>
      </div>
      <div class="body xhs-body">
        <div class="xhs-grid">${cards}</div>
        <div class="tagline">小红书 · 他搜自己的名字，也会搜"在韩务工"</div>
      </div>
      <div class="xhs-tabbar">
        <div class="on"><i>${TAB.home}</i><span>首页</span></div>
        <div><i>${TAB.shop}</i><span>购物</span></div>
        <div class="plus"><b>+</b></div>
        <div><i>${TAB.mail}</i><span>消息</span></div>
        <div><i>${TAB.me}</i><span>我</span></div>
      </div>`;
  },

  /* ---- TikTok ---- */
  tiktok(){
    tkIdx = Math.min(tkStart, TIKTOK.feed.length - 1);
    return `<div class="tk-view" id="tkView">${tkInner()}</div>`;
  },

  /* ---- 相机 ---- */
  camera(){
    return `
      <div class="nav tall" style="background:#000;border:0"><div class="ttl sub" style="color:#fff">相机</div></div>
      <div class="body" style="background:#000;display:grid;place-items:center">
        <div style="width:100%;padding:20px">
          <div style="border-radius:6px;overflow:hidden">${art('window')}</div>
          <div style="display:flex;justify-content:space-around;align-items:center;margin-top:30px;color:#fff;opacity:.7;font-size:12px">
            <span>视频</span><span style="color:#ffd60a">照片</span><span>人像</span>
          </div>
          <div style="display:flex;justify-content:center;margin-top:26px">
            <div style="width:64px;height:64px;border-radius:50%;border:4px solid #fff;display:grid;place-items:center">
              <div style="width:50px;height:50px;border-radius:50%;background:#fff"></div>
            </div>
          </div>
          <div style="text-align:center;color:#8e8e93;font-size:11.5px;margin-top:22px">剩余 2,431 张 · 胶卷模式</div>
        </div>
      </div>`;
  }
};

/* ==========================================================
   TikTok（小号，只看不发）
   ========================================================== */
let tkIdx = 0;
let tkStart = 0;                // 调试用：?app=tiktok&tk=3
const tkLiked = { 3: true };   // 第 4 条是他自己悄悄点的赞

/* 竖屏「视频」画面：393×852，比方形插画更适合全屏 */
const TKIMG = {
  stage:'assets/light_sea.jpg',   city:'assets/street_night.jpg',
  practice:'assets/dance_grp.jpg',empty:'assets/stage_lit.jpg',
  night:'assets/cvs_cold.jpg',    window:'assets/seoul_night.jpg'
};

function tkArt(kind){
  if(TKIMG[kind]) return `<img class="tk-photo" src="${TKIMG[kind]}" alt="">`;
  /* 统一的人形剪影：脚底在 (x,base)，总高 h */
  const fig = (x, base, h, fill, op = 1, tilt = 0) => `
    <g transform="translate(${x} ${base}) scale(${(h / 100).toFixed(3)}) rotate(${tilt})" fill="${fill}" opacity="${op}">
      <circle cx="0" cy="-88" r="10.5"/>
      <path d="M-16 -76Q0 -82 16 -76L12 -36Q0 -31 -12 -36Z"/>
      <rect x="-11.5" y="-38" width="9.5" height="38" rx="4.5"/>
      <rect x="2" y="-38" width="9.5" height="38" rx="4.5"/>
    </g>`;

  /* 一排座椅（用透视：越靠下越大） */
  const seatRow = (y, s, op) => {
    let r = '';
    for(let x = -s; x < 410; x += s) r += `<rect x="${x}" y="${y}" width="${s - 6}" height="${Math.round(s * .56)}" rx="3"/>`;
    return `<g fill="#080505" opacity="${op}">${r}</g>`;
  };

  let inner = '';

  if(kind === 'stage'){
    inner = `
      <defs>
        <linearGradient id="tks-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#191026"/><stop offset=".62" stop-color="#2a1a39"/><stop offset="1" stop-color="#0a0710"/>
        </linearGradient>
        <linearGradient id="tks-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffdcab" stop-opacity=".5"/>
          <stop offset=".55" stop-color="#ffd39c" stop-opacity=".16"/>
          <stop offset="1" stop-color="#ffd39c" stop-opacity="0"/>
        </linearGradient>
        <radialGradient id="tks-halo" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#ffd9a4" stop-opacity=".5"/><stop offset="1" stop-color="#ffd9a4" stop-opacity="0"/>
        </radialGradient>
        <filter id="tks-bl"><feGaussianBlur stdDeviation="9"/></filter>
        <filter id="tks-soft"><feGaussianBlur stdDeviation="7"/></filter>
      </defs>
      <rect width="393" height="852" fill="url(#tks-bg)"/>
      <g fill="url(#tks-beam)" opacity=".72" filter="url(#tks-soft)">
        <polygon points="66,44 96,44 176,660 120,660"/>
        <polygon points="164,34 194,34 252,660 208,660"/>
        <polygon points="262,46 292,46 340,660 300,660"/>
      </g>
      <rect width="393" height="40" fill="#0a0710"/>
      <g fill="#ffeacb" opacity=".85">
        <rect x="64" y="34" width="36" height="4" rx="2"/>
        <rect x="162" y="24" width="34" height="4" rx="2"/>
        <rect x="260" y="36" width="36" height="4" rx="2"/>
      </g>
      <ellipse cx="196" cy="470" rx="104" ry="150" fill="url(#tks-halo)"/>
      <rect y="604" width="393" height="248" fill="#0b0810"/>
      <path d="M52 620h289l52 232H0Z" fill="#181122"/>
      <g filter="url(#tks-bl)" opacity=".55">
        <rect x="46" y="614" width="300" height="7" rx="3.5" fill="#ffd6a2"/>
      </g>
      ${fig(196, 606, 208, '#07050b', .95)}
      <ellipse cx="196" cy="612" rx="52" ry="9" fill="#000" opacity=".55" filter="url(#tks-bl)"/>
      <g fill="#ffe9cf" opacity=".45" filter="url(#tks-bl)">
        <circle cx="74" cy="208" r="7"/><circle cx="128" cy="286" r="5"/>
        <circle cx="292" cy="228" r="6"/><circle cx="330" cy="316" r="5"/>
        <circle cx="42" cy="352" r="5"/>
      </g>`;
  }

  else if(kind === 'city'){
    let queue = '';
    for(let i = 0; i < 9; i++){
      const x = 34 + i * 41, h = 58 + (i % 3) * 9;
      queue += fig(x, 566, h, '#05080e', (0.9 - i * 0.02).toFixed(2));
    }
    inner = `
      <defs>
        <linearGradient id="tkc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#111f31"/><stop offset=".5" stop-color="#1c3147"/><stop offset="1" stop-color="#0a1119"/>
        </linearGradient>
        <radialGradient id="tkc-door" cx=".5" cy=".55" r=".5">
          <stop offset="0" stop-color="#ffd9a4" stop-opacity=".9"/><stop offset="1" stop-color="#ffd9a4" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="tkc-moon" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#e8eef6" stop-opacity=".3"/><stop offset="1" stop-color="#e8eef6" stop-opacity="0"/>
        </radialGradient>
        <filter id="tkc-bl"><feGaussianBlur stdDeviation="11"/></filter>
      </defs>
      <rect width="393" height="852" fill="url(#tkc-sky)"/>
      <circle cx="316" cy="104" r="44" fill="url(#tkc-moon)"/>
      <circle cx="316" cy="104" r="10" fill="#eef4fb" opacity=".42"/>
      <g fill="#dfe9f4" opacity=".45">
        <circle cx="62" cy="86" r="1.5"/><circle cx="148" cy="54" r="1.2"/>
        <circle cx="238" cy="96" r="1.4"/><circle cx="352" cy="176" r="1.2"/>
      </g>
      <g fill="#0a141f">
        <rect x="0" y="106" width="66" height="138"/><rect x="70" y="142" width="40" height="102"/>
        <rect x="284" y="96" width="60" height="148"/><rect x="348" y="150" width="45" height="94"/>
        <rect x="114" y="170" width="34" height="74"/>
      </g>
      <g fill="#ffd9a4" opacity=".38">
        <rect x="12" y="126" width="6" height="8"/><rect x="30" y="150" width="6" height="8"/>
        <rect x="46" y="126" width="6" height="8"/><rect x="80" y="160" width="5" height="7"/>
        <rect x="296" y="118" width="6" height="8"/><rect x="318" y="146" width="6" height="8"/>
        <rect x="340" y="118" width="6" height="8"/><rect x="358" y="170" width="5" height="7"/>
        <rect x="122" y="188" width="5" height="7"/>
      </g>
      <rect x="-12" y="240" width="417" height="240" rx="12" fill="#0d1723"/>
      <rect x="-12" y="240" width="417" height="240" rx="12" fill="none" stroke="#3b5b7b" stroke-width="1.4" opacity=".75"/>
      <g stroke="#2c4862" stroke-width="1.2" opacity=".55" fill="none">
        <path d="M58 244v232M118 244v232M178 244v232M238 244v232M298 244v232M358 244v232"/>
      </g>
      <g fill="#8fb8d6" opacity=".45">
        <rect x="10" y="264" width="373" height="3" rx="1.5"/>
        <rect x="10" y="452" width="373" height="3" rx="1.5"/>
      </g>
      <ellipse cx="196" cy="470" rx="132" ry="96" fill="url(#tkc-door)"/>
      <rect x="152" y="392" width="88" height="88" fill="#ffe4b4" opacity=".45"/>
      <g fill="#081019" opacity=".5">
        <rect x="158" y="400" width="3" height="80"/><rect x="196" y="400" width="3" height="80"/><rect x="233" y="400" width="3" height="80"/>
      </g>
      <rect y="480" width="393" height="372" fill="#080d13"/>
      <path d="M0 480h393v14H0Z" fill="#1a2734"/>
      <ellipse cx="196" cy="540" rx="170" ry="34" fill="#ffe2b0" opacity=".12" filter="url(#tkc-bl)"/>
      ${queue}
      <g fill="#7ee7ff" opacity=".9">
        <rect x="70" y="512" width="4" height="24" rx="2"/><rect x="196" y="506" width="4" height="28" rx="2"/>
      </g>
      <g fill="#ff9ec4" opacity=".85"><rect x="318" y="516" width="4" height="22" rx="2"/></g>
      <g fill="#ffe2b0" opacity=".07" filter="url(#tkc-bl)">
        <rect y="620" width="393" height="180"/>
      </g>`;
  }

  else if(kind === 'practice'){
    inner = `
      <defs>
        <linearGradient id="tkp-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#252d35"/><stop offset=".55" stop-color="#1a2127"/><stop offset="1" stop-color="#0d1114"/>
        </linearGradient>
        <linearGradient id="tkp-mir" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#8ea3b2" stop-opacity=".34"/>
          <stop offset=".45" stop-color="#5d717f" stop-opacity=".2"/>
          <stop offset=".72" stop-color="#a8bcc8" stop-opacity=".28"/>
          <stop offset="1" stop-color="#6d8190" stop-opacity=".18"/>
        </linearGradient>
        <linearGradient id="tkp-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#38281d"/><stop offset="1" stop-color="#1c130d"/>
        </linearGradient>
        <filter id="tkp-bl"><feGaussianBlur stdDeviation="10"/></filter>
      </defs>
      <rect width="393" height="852" fill="url(#tkp-bg)"/>
      <rect width="393" height="70" fill="#0e1317"/>
      <g fill="#e8f4fb" opacity=".55" filter="url(#tkp-bl)">
        <rect x="52" y="80" width="128" height="9" rx="4.5"/>
        <rect x="214" y="80" width="128" height="9" rx="4.5"/>
      </g>
      <rect x="12" y="170" width="369" height="390" rx="3" fill="url(#tkp-mir)"/>
      <g fill="#e8f4fb" opacity=".1">
        <rect x="26" y="182" width="86" height="366"/>
        <rect x="286" y="182" width="82" height="366"/>
      </g>
      <g fill="#e8f4fb" opacity=".14" filter="url(#tkp-bl)">
        <rect x="40" y="196" width="150" height="12" rx="6"/>
        <rect x="206" y="196" width="150" height="12" rx="6"/>
      </g>
      ${fig(196, 560, 178, '#0b1116', .22)}
      <g stroke="#9fb3c0" stroke-width="1" opacity=".26" fill="none">
        <rect x="12" y="170" width="369" height="390" rx="3"/>
        <path d="M196 170v390"/>
      </g>
      <rect x="12" y="556" width="369" height="7" rx="3.5" fill="#4a5c68" opacity=".85"/>
      <rect y="560" width="393" height="292" fill="url(#tkp-wood)"/>
      <g stroke="#150d08" stroke-width="1.4" opacity=".5">
        <path d="M0 588h393M0 622h393M0 660h393M0 704h393M0 756h393M0 816h393"/>
      </g>
      <g fill="#f0e2c8" opacity=".09" filter="url(#tkp-bl)">
        <rect x="30" y="566" width="330" height="26"/>
      </g>
      ${fig(196, 646, 196, '#070a0c', .92)}
      ${fig(196, 646, 196, '#070a0c', .1, 180)}
      <ellipse cx="196" cy="648" rx="46" ry="8" fill="#000" opacity=".45" filter="url(#tkp-bl)"/>`;
  }

  else if(kind === 'empty'){
    inner = `
      <defs>
        <linearGradient id="tke-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#120d0a"/><stop offset=".5" stop-color="#1e1610"/><stop offset="1" stop-color="#080605"/>
        </linearGradient>
        <radialGradient id="tke-pool" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#ffd39c" stop-opacity=".42"/><stop offset="1" stop-color="#ffd39c" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="tke-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffd8a8" stop-opacity=".3"/>
          <stop offset=".62" stop-color="#ffd8a8" stop-opacity=".12"/>
          <stop offset="1" stop-color="#ffd8a8" stop-opacity="0"/>
        </linearGradient>
        <filter id="tke-bl"><feGaussianBlur stdDeviation="16"/></filter>
      </defs>
      <rect width="393" height="852" fill="url(#tke-bg)"/>
      <polygon points="148,-40 246,-40 306,478 92,478" fill="url(#tke-cone)" filter="url(#tke-bl)" opacity=".9"/>
      <rect x="-10" y="252" width="413" height="228" fill="#171009"/>
      <ellipse cx="196" cy="392" rx="168" ry="102" fill="url(#tke-pool)"/>
      <path d="M-10 452h413l24 32H-34Z" fill="#241a12"/>
      <g filter="url(#tke-bl)" opacity=".6">
        <rect x="86" y="448" width="220" height="6" rx="3" fill="#ffcf94"/>
      </g>
      ${fig(196, 452, 132, '#080605', .95, 10)}
      <ellipse cx="196" cy="454" rx="34" ry="7" fill="#000" opacity=".5" filter="url(#tke-bl)"/>
      ${seatRow(492, 44, .55)}
      ${seatRow(548, 52, .62)}
      ${seatRow(614, 62, .7)}
      ${seatRow(692, 74, .8)}
      ${seatRow(786, 90, .88)}
      <g fill="#c99a63" opacity=".1">
        <rect x="60" y="536" width="34" height="4" rx="2"/><rect x="176" y="536" width="34" height="4" rx="2"/>
        <rect x="292" y="536" width="34" height="4" rx="2"/>
      </g>`;
  }

  else if(kind === 'night'){
    inner = `
      <defs>
        <linearGradient id="tkn-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0b131c"/><stop offset=".42" stop-color="#121e29"/><stop offset="1" stop-color="#060a0e"/>
        </linearGradient>
        <linearGradient id="tkn-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#eef5fa"/><stop offset="1" stop-color="#cfdde8"/>
        </linearGradient>
        <radialGradient id="tkn-spill" cx=".5" cy=".2" r=".7">
          <stop offset="0" stop-color="#eaf4fb" stop-opacity=".55"/><stop offset="1" stop-color="#eaf4fb" stop-opacity="0"/>
        </radialGradient>
        <filter id="tkn-bl"><feGaussianBlur stdDeviation="14"/></filter>
      </defs>
      <rect width="393" height="852" fill="url(#tkn-bg)"/>
      <g fill="#eaf6ff" opacity=".32" filter="url(#tkn-bl)">
        <rect x="6" y="140" width="381" height="44" rx="6"/>
      </g>
      <rect x="14" y="150" width="365" height="40" rx="6" fill="#0f1a23"/>
      <g fill="#dbeaf5" opacity=".85">
        <rect x="34" y="166" width="86" height="8" rx="4"/>
        <rect x="132" y="166" width="46" height="8" rx="4" opacity=".5"/>
      </g>
      <rect x="20" y="196" width="353" height="352" fill="url(#tkn-glass)"/>
      <rect x="20" y="196" width="353" height="352" fill="none" stroke="#1b2b38" stroke-width="3"/>
      <g fill="#cfdbe4" opacity=".55">
        <rect x="20" y="196" width="353" height="10"/>
        <rect x="20" y="536" width="353" height="12"/>
      </g>
      <g fill="#9fb1bf" opacity=".5">
        <rect x="34" y="286" width="252" height="5" rx="2.5"/>
        <rect x="34" y="368" width="252" height="5" rx="2.5"/>
        <rect x="34" y="450" width="252" height="5" rx="2.5"/>
      </g>
      <g opacity=".85">
        <rect x="40" y="252" width="15" height="34" rx="2" fill="#e4575a"/>
        <rect x="59" y="252" width="15" height="34" rx="2" fill="#e9a13b"/>
        <rect x="78" y="252" width="15" height="34" rx="2" fill="#4d9fd8"/>
        <rect x="97" y="252" width="15" height="34" rx="2" fill="#5fbf8d"/>
        <rect x="116" y="252" width="15" height="34" rx="2" fill="#c9c04a"/>
        <rect x="135" y="252" width="15" height="34" rx="2" fill="#d16a94"/>
        <rect x="154" y="252" width="15" height="34" rx="2" fill="#7b74c8"/>
        <rect x="40" y="334" width="15" height="34" rx="2" fill="#e9a13b"/>
        <rect x="59" y="334" width="15" height="34" rx="2" fill="#4d9fd8"/>
        <rect x="78" y="334" width="15" height="34" rx="2" fill="#c9c04a"/>
        <rect x="97" y="334" width="15" height="34" rx="2" fill="#e4575a"/>
        <rect x="116" y="334" width="15" height="34" rx="2" fill="#5fbf8d"/>
        <rect x="135" y="334" width="15" height="34" rx="2" fill="#d16a94"/>
        <rect x="40" y="416" width="15" height="34" rx="2" fill="#5fbf8d"/>
        <rect x="59" y="416" width="15" height="34" rx="2" fill="#7b74c8"/>
        <rect x="78" y="416" width="15" height="34" rx="2" fill="#e4575a"/>
        <rect x="97" y="416" width="15" height="34" rx="2" fill="#e9a13b"/>
        <rect x="116" y="416" width="15" height="34" rx="2" fill="#4d9fd8"/>
      </g>
      <rect x="292" y="236" width="74" height="300" fill="#eef7fd" opacity=".92"/>
      <g fill="#c3d8e6" opacity=".8">
        <rect x="292" y="236" width="74" height="5"/><rect x="292" y="336" width="74" height="5"/>
        <rect x="292" y="436" width="74" height="5"/><rect x="328" y="236" width="4" height="300"/>
      </g>
      <g fill="#7fb6d6" opacity=".55">
        <rect x="300" y="256" width="12" height="26" rx="2"/><rect x="316" y="256" width="8" height="26" rx="2"/>
        <rect x="300" y="356" width="10" height="26" rx="2"/><rect x="314" y="356" width="10" height="26" rx="2"/>
        <rect x="338" y="256" width="10" height="26" rx="2"/><rect x="352" y="256" width="8" height="26" rx="2"/>
      </g>
      ${fig(246, 528, 138, '#101a22', .85)}
      <g opacity=".6">
        <rect x="231" y="468" width="12" height="18" rx="2.5" fill="#f6fbff"/>
        <rect x="231" y="468" width="12" height="18" rx="2.5" fill="#bfe0ef" opacity=".5"/>
      </g>
      <rect y="548" width="393" height="304" fill="#0a1016"/>
      <rect y="548" width="393" height="10" fill="#20303d"/>
      <ellipse cx="196" cy="600" rx="196" ry="58" fill="url(#tkn-spill)"/>
      <g opacity=".16">
        <rect x="40" y="566" width="22" height="120" fill="#eaf4fb"/>
        <rect x="96" y="566" width="10" height="150" fill="#eaf4fb"/>
        <rect x="300" y="566" width="16" height="130" fill="#eaf4fb"/>
      </g>`;
  }

  else { /* window：在韩务工的出租屋 */
    inner = `
      <defs>
        <linearGradient id="tkw-in" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#191411"/><stop offset="1" stop-color="#0a0807"/>
        </linearGradient>
        <linearGradient id="tkw-out" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1a2a3c"/><stop offset=".5" stop-color="#24394d"/><stop offset="1" stop-color="#0c141c"/>
        </linearGradient>
        <radialGradient id="tkw-moon" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#e8eef6" stop-opacity=".26"/><stop offset="1" stop-color="#e8eef6" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="tkw-lamp" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#ffc98a" stop-opacity=".5"/><stop offset="1" stop-color="#ffc98a" stop-opacity="0"/>
        </radialGradient>
        <filter id="tkw-bl"><feGaussianBlur stdDeviation="13"/></filter>
      </defs>
      <rect width="393" height="852" fill="url(#tkw-in)"/>
      <rect x="24" y="124" width="345" height="430" fill="url(#tkw-out)"/>
      <circle cx="118" cy="206" r="46" fill="url(#tkw-moon)"/>
      <g fill="#0a1017">
        <rect x="24" y="384" width="118" height="170"/><rect x="188" y="356" width="88" height="198"/>
        <rect x="290" y="402" width="79" height="152"/>
        <rect x="150" y="412" width="30" height="142"/>
      </g>
      <g fill="#ffd9a4" opacity=".5">
        <rect x="40" y="404" width="7" height="9"/><rect x="60" y="428" width="7" height="9"/>
        <rect x="84" y="404" width="7" height="9"/><rect x="114" y="440" width="7" height="9"/>
        <rect x="202" y="378" width="7" height="9"/><rect x="228" y="404" width="7" height="9"/>
        <rect x="254" y="378" width="7" height="9"/><rect x="304" y="424" width="7" height="9"/>
        <rect x="330" y="450" width="7" height="9"/><rect x="350" y="424" width="7" height="9"/>
        <rect x="160" y="430" width="5" height="7"/>
      </g>
      <g stroke="#241d18" stroke-width="13" fill="none">
        <rect x="24" y="124" width="345" height="430"/>
        <path d="M196 124v430M24 338h345"/>
      </g>
      <rect x="0" y="554" width="393" height="20" fill="#241c17"/>
      <rect y="574" width="393" height="278" fill="#0f0b09"/>
      <ellipse cx="316" cy="700" rx="126" ry="112" fill="url(#tkw-lamp)"/>
      <g fill="#0c0908" opacity=".5"><rect x="330" y="320" width="63" height="254"/></g>
      <g opacity=".8">
        <rect x="322" y="662" width="3" height="40" fill="#2b211a"/>
        <path d="M312 656h24l-5 -18h-14Z" fill="#ffd9a4" opacity=".55"/>
        <circle cx="324" cy="670" r="9" fill="#ffc98a" opacity=".3"/>
      </g>
      <rect x="0" y="640" width="393" height="212" fill="#080606" opacity=".45"/>
      <g fill="#ffc98a" opacity=".07" filter="url(#tkw-bl)">
        <rect x="20" y="596" width="353" height="160"/>
      </g>`;
  }

  return `<svg viewBox="0 0 393 852" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">${inner}</svg>`;
}

function tkInner(){
  const f = TIKTOK.feed[tkIdx];
  const liked = !!tkLiked[tkIdx];
  return `
    <div class="tk-stage">
      <div class="tk-art" data-act="tk-next">${tkArt(f.art)}</div>
      <div class="tk-scrim"></div>

      <div class="tk-top">
        <span>关注</span><span class="on">推荐</span>
        <div class="tk-srch" data-act="toast" data-msg="搜索「韩振」">
          <svg viewBox="0 0 24 24"><circle cx="10.7" cy="10.7" r="6.5"/><path d="m15.7 15.7 4.3 4.3"/></svg>
        </div>
      </div>

      <div class="tk-rail">
        <div class="tk-av">${TIKTOK.me.name}</div>
        <div class="tk-btn ${liked ? 'on' : ''}" data-act="tk-like">
          <svg viewBox="0 0 24 24"><path d="M12 20.6s-7.6-4.6-7.6-9.7A4.4 4.4 0 0 1 12 8a4.4 4.4 0 0 1 7.6 2.9c0 5.1-7.6 9.7-7.6 9.7Z"/></svg>
          <span>${f.like}</span>
        </div>
        <div class="tk-btn" data-act="toast" data-msg="${f.cmt} 条评论，他一条都没写">
          <svg viewBox="0 0 24 24"><path d="M12 3.3c-4.9 0-8.9 3.2-8.9 7.2 0 2.3 1.3 4.3 3.2 5.6l-.9 4 4.2-2.2c.5.1 1 .1 1.5.1 4.9 0 8.9-3.2 8.9-7.2S16.9 3.3 12 3.3Z"/></svg>
          <span>${f.cmt}</span>
        </div>
        <div class="tk-btn" data-act="toast" data-msg="链接已复制">
          <svg viewBox="0 0 24 24"><path d="M13.4 3.6v3.6C8.2 7.4 5 10.6 4 15.7c2.3-2.7 5.1-4 9.4-4v3.7l7.2-5.9-7.2-5.9Z"/></svg>
          <span>${f.share}</span>
        </div>
        <div class="tk-disc"><i><svg viewBox="0 0 24 24"><path d="M18.3 3.2 9.9 5.6c-.6.2-1 .7-1 1.3v8.6a3.2 3.2 0 1 0 1.8 2.9V8.8l6.8-2v6a3.2 3.2 0 1 0 1.8 2.9V4.5c0-.8-.7-1.5-1.5-1.3Z"/></svg></i></div>
      </div>

      <div class="tk-info">
        <div class="tk-user">${f.user}${f.mine ? '<em>· 已点赞</em>' : ''}</div>
        <div class="tk-desc">${f.desc}</div>
        <div class="tk-mus">
          <svg viewBox="0 0 24 24"><path d="M18.3 3.2 9.9 5.6c-.6.2-1 .7-1 1.3v8.6a3.2 3.2 0 1 0 1.8 2.9V8.8l6.8-2v6a3.2 3.2 0 1 0 1.8 2.9V4.5c0-.8-.7-1.5-1.5-1.3Z"/></svg>
          <span class="mq">${f.music} · ${f.music} · </span>
        </div>
      </div>

      <div class="tk-nav">
        <div class="on"><svg viewBox="0 0 24 24"><path d="M12 2.8 3.4 9.9v11h6.2v-6.2h4.8v6.2h6.2v-11L12 2.8Z"/></svg><span>首页</span></div>
        <div data-act="toast" data-msg="这个号没有好友"><svg viewBox="0 0 24 24"><circle cx="9" cy="8.2" r="3.4"/><path d="M2.8 19.4c0-3.3 2.8-5.4 6.2-5.4s6.2 2.1 6.2 5.4H2.8Z"/><circle cx="17.2" cy="9.2" r="2.6"/><path d="M15.8 14c2.8 0 5 1.8 5 4.4h-4.2"/></svg><span>朋友</span></div>
        <div data-act="toast" data-msg="他不发东西"><div class="tk-plus"><svg viewBox="0 0 24 24"><path d="M10.8 4h2.4v6.8H20v2.4h-6.8V20h-2.4v-6.8H4v-2.4h6.8V4Z"/></svg></div></div>
        <div data-act="toast" data-msg="4 条新消息"><svg viewBox="0 0 24 24"><path d="M4 3.6h16a1.6 1.6 0 0 1 1.6 1.6v10.4a1.6 1.6 0 0 1-1.6 1.6H9l-4.6 3.4v-3.4H4a1.6 1.6 0 0 1-1.6-1.6V5.2A1.6 1.6 0 0 1 4 3.6Z"/></svg><span>消息</span></div>
        <div data-act="tk-me"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4.1"/><path d="M3.8 20.6c0-4.1 3.7-6.7 8.2-6.7s8.2 2.6 8.2 6.7H3.8Z"/></svg><span>我</span></div>
      </div>
      <div class="tk-prog"><i></i></div>
    </div>`;
}

function tkMeHTML(){
  const m = TIKTOK.me;
  return `
    <div class="tk-profile">
      <div class="tk-pf-x" data-act="tk-close">×</div>
      <div class="tk-pf-av">${m.name}</div>
      <div class="tk-pf-nm">${m.handle}</div>
      <div class="tk-pf-st">
        <div><b>${m.following}</b><i>关注</i></div>
        <div><b>${m.followers}</b><i>粉丝</i></div>
        <div><b>${m.likes}</b><i>赞</i></div>
      </div>
      <div class="tk-pf-bio">只看不发。<br>喜欢的都进收藏夹了，没让任何人知道。</div>
      <div class="tk-pf-tabs"><span class="on">作品 ${m.posts}</span><span>收藏 47</span><span>喜欢 213</span></div>
      <div class="tk-pf-empty">
        <div class="ic"></div>
        <p>还没有作品</p>
        <em>注册 1,204 天 · 播放量 0</em>
      </div>
      <div class="tk-pf-note">
        浏览记录：已关闭<br>
        收藏 47 条，一大半是别人拍的他自己。<br>
        关注 12 个：五个队友、六个站子、一个官方。
      </div>
    </div>`;
}

/* ==========================================================
   App 打开后处理
   ========================================================== */
function afterRender(id, v){
  if(id === 'music'){
    const bar = $('#muBar', v);
    if(bar){ bar.style.transition = 'width 90s linear'; setTimeout(() => bar.style.width = '92%', 60); }
  }
  // 深色 App：状态栏白字、home bar 白条
  if(id === 'tiktok' || id === 'camera'){
    statusbar.classList.remove('dark');
    homebar.classList.add('light');
  }
}

/* ==========================================================
   聊天室
   ========================================================== */
function openChat(id, kind){
  const list = kind === 'wx' ? WECHAT_CHATS : CHATS;
  const c = list.find(x => x.id === id);
  if(!c) return;
  c.unread = 0;

  // 从哪条开始「新消息」动起来
  let dynFrom = c.msgs.length;
  if(kind !== 'wx' && id === 'dohoon'){
    const k = c.msgs.findIndex(m => m.dyn);
    if(k >= 0) dynFrom = k;
  }

  const theme = kind === 'wx' ? 'wechat' : '';
  const v = pushView(`
    <div class="chat-room ${theme}">
      <div class="chat-nav ${theme}">
        <button class="back" data-act="back">
          <svg viewBox="0 0 12 20"><path d="M10 2 2 10l8 8"/></svg>
        </button>
        <div class="ct">${c.name}</div>
        ${kind === 'wx' ? `<button class="dots" data-act="toast" data-msg="聊天信息 · 模拟"><span></span><span></span><span></span></button>` : ''}
      </div>
      <div class="chat-body" id="chatBody"></div>
      <div id="chatFoot">
        <div class="chat-input">
          ${kind === 'wx' ? `
          <div class="mic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>
          </div>` : `<div class="plus">+</div>`}
          <div class="fake">输入消息</div>
          ${kind === 'wx' ? `
          <div class="mic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="8.8" cy="10" r=".9" fill="currentColor"/><circle cx="15.2" cy="10" r=".9" fill="currentColor"/><path d="M8.4 14.2c1 1.2 2.2 1.8 3.6 1.8s2.6-.6 3.6-1.8" stroke-linecap="round"/></svg>
          </div>
          <div class="mic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8" stroke-linecap="round"/></svg>
          </div>` : `
          <div class="send">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          </div>`}
        </div>
      </div>
    </div>`);

  const body = $('#chatBody', v);

  // 静态历史
  for(let i = 0; i < dynFrom; i++) body.insertAdjacentHTML('beforeend', msgHTML(c.msgs[i], c));
  body.scrollTop = body.scrollHeight;

  // 动态部分
  let i = dynFrom;
  const step = () => {
    if(i >= c.msgs.length) return;
    const m = c.msgs[i];

    if(m.t === 'choice'){ showChoices(body, m, c, () => { i++; step(); }); return; }
    if(m.t === 'call'){ i++; setTimeout(startCall, 1100); return; }

    body.insertAdjacentHTML('beforeend', msgHTML(m, c));
    body.scrollTop = body.scrollHeight;
    i++;
    const delay = m.t === 'day' ? 520 : (m.v && m.v.length < 8 ? 760 : 980);
    chatTimer = setTimeout(step, delay);
  };
  chatTimer = setTimeout(step, 900);
}

function msgHTML(m, c){
  if(m.t === 'day') return `<div class="day-sep"><span>${m.v}</span></div>`;
  const stamp = m.time ? `<span class="msg-time">${m.time}</span>` : '';
  if(m.t === 'photo') return `
    <div class="line them">
      <div class="lav" style="background:none;width:38px"></div>
      <div class="stack">
        <div class="bub photo">${art(m.art)}<div class="cap">${m.cap || ''}</div></div>
      </div><div class="meta">${stamp}</div>
    </div>`;
  if(m.t === 'voice') return `
      <div class="line them"><div class="lav" style="background:none;width:38px"></div>
      <div class="stack"><div class="bub voice">
        <div class="play"><svg viewBox="0 0 10 12"><path d="M0 0l10 6-10 6z"/></svg></div>
        <div class="wave">${Array.from({length:9},(_,i)=>`<i style="height:${4+((i*7)%11)}px"></i>`).join('')}</div>
        <div class="vd">${m.d||'0:07'}</div>
      </div></div><div class="meta">${stamp}</div>
    </div>`;

  if(m.t === 'me'){
    return `<div class="line me">
      <div class="stack"><div class="bub">${m.v}</div></div><div class="meta">${stamp}</div>
    </div>`;
  }

  // them
  const mem = MEMBERS[m.who] || WX_PEOPLE[m.who] || {};
  const isGroup = c && c.group;
  const label = mem.name || mem.n || '';
  const emo = mem.emoji || mem.e || label.slice(0, 1);
  const col = mem.color || '#8fa4b8';
  const nm = isGroup ? `<div class="nm">${label}</div>` : '';
  const isWx = c && WX_PEOPLE && WX_PEOPLE[c.id];
  const av = isGroup
    ? `<div class="lav" style="background:linear-gradient(160deg,${col},${shade(col)});font-size:15px">${emo}</div>`
    : isWx
      ? `<div class="lav pic" style="background-image:url(${WX_AVATAR[c.id] || ''})"></div>`
      : `<div class="lav" style="background:none;width:38px"></div>`;
  return `<div class="line them">
    ${av}
    <div class="stack">
      ${nm}
      <div class="bub">${m.v}</div>
    </div>
    <div class="meta">${stamp}</div>
  </div>`;
}

function showChoices(body, m, c, next){
  const foot = $('#chatFoot', appLayer);
  const wrap = document.createElement('div');
  wrap.className = 'choices';
  wrap.innerHTML = m.opts.map((o, i) => `<button class="choice" data-i="${i}">${o}</button>`).join('');
  foot.innerHTML = '';
  foot.appendChild(wrap);
  body.scrollTop = body.scrollHeight;

  wrap.addEventListener('click', e => {
    const b = e.target.closest('.choice');
    if(!b) return;
    const txt = m.opts[+b.dataset.i];
    wrap.remove();
    foot.innerHTML = `<div class="chat-input">
        <div class="plus">+</div>
        <div class="fake">输入消息…</div>
        <div class="send"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg></div>
      </div>`;
    body.insertAdjacentHTML('beforeend', msgHTML({ t:'me', v:txt }, c));
    body.scrollTop = body.scrollHeight;
    setTimeout(() => {
      body.insertAdjacentHTML('beforeend', msgHTML({ t:'them', who:'dohoon', v:m.reply }, c));
      body.scrollTop = body.scrollHeight;
      setTimeout(next, 700);
    }, 900);
  });
}

/* ==========================================================
   来电
   ========================================================== */
function startCall(){
  homebar.classList.add('light');
  statusbar.classList.remove('dark');
  island.classList.add('live');
  island.innerHTML = `<div class="island-in">
      <span class="dot"></span><span class="who">道勋哥</span><span class="sub">通话中</span>
    </div>`;

  overlay.innerHTML = `
    <div class="call-fs">
      <div class="call-av">🐺</div>
      <div class="call-nm">道勋哥</div>
      <div class="call-st" id="callSt">来电 · 移动电话</div>
      <div class="call-caps"><div class="call-cap" id="callCap"></div></div>
      <div class="call-btns" id="callBtns">
        <button class="cbtn dec" data-act="call-decline">
          <div class="cir"><svg viewBox="0 0 24 24"><path d="M6.9 3.5 9 3.1c.5-.1 1 .2 1.1.7l.8 3c.1.4-.1.8-.5 1l-1.4.7c-.2.1-.3.4-.2.6a10 10 0 0 0 4.1 4.1c.2.1.5 0 .6-.2l.7-1.4c.2-.4.6-.6 1-.5l3 .8c.5.1.8.6.7 1.1l-.4 2.1c-.1.6-.6 1.1-1.2 1.2C11 17.6 6.4 13 5.7 4.7c-.1-.6.4-1.1 1.2-1.2Z" transform="rotate(136 12 12)"/></svg></div>
          <span>拒绝</span>
        </button>
        <button class="cbtn acc" data-act="call-accept">
          <div class="cir"><svg viewBox="0 0 24 24"><path d="M6.9 3.5 9 3.1c.5-.1 1 .2 1.1.7l.8 3c.1.4-.1.8-.5 1l-1.4.7c-.2.1-.3.4-.2.6a10 10 0 0 0 4.1 4.1c.2.1.5 0 .6-.2l.7-1.4c.2-.4.6-.6 1-.5l3 .8c.5.1.8.6.7 1.1l-.4 2.1c-.1.6-.6 1.1-1.2 1.2C11 17.6 6.4 13 5.7 4.7c-.1-.6.4-1.1 1.2-1.2Z"/></svg></div>
          <span>接听</span>
        </button>
      </div>
    </div>`;
}

function acceptCall(){
  const st = $('#callSt');
  const btns = $('#callBtns');
  const cap = $('#callCap');
  overlay.dataset.t0 = Date.now();
  btns.innerHTML = `
    <button class="cbtn mut" data-act="toast" data-msg="已静音">
      <div class="cir"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4Zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4Z"/></svg></div>
      <span>静音</span>
    </button>
    <button class="cbtn dec" data-act="call-hang">
      <div class="cir"><svg viewBox="0 0 24 24"><path d="M6.9 3.5 9 3.1c.5-.1 1 .2 1.1.7l.8 3c.1.4-.1.8-.5 1l-1.4.7c-.2.1-.3.4-.2.6a10 10 0 0 0 4.1 4.1c.2.1.5 0 .6-.2l.7-1.4c.2-.4.6-.6 1-.5l3 .8c.5.1.8.6.7 1.1l-.4 2.1c-.1.6-.6 1.1-1.2 1.2C11 17.6 6.4 13 5.7 4.7c-.1-.6.4-1.1 1.2-1.2Z" transform="rotate(136 12 12)"/></svg></div>
      <span>挂断</span>
    </button>`;

  let sec = 0;
  const timer = setInterval(() => {
    sec++;
    const mm = String(Math.floor(sec / 60)).padStart(2,'0');
    const ss = String(sec % 60).padStart(2,'0');
    if(st) st.textContent = `${mm}:${ss}`;
  }, 1000);
  if(st) st.textContent = '00:00';

  let k = 0;
  const play = () => {
    if(k >= CALL_SCRIPT.length){
      clearInterval(timer);
      endCall(sec);
      return;
    }
    const line = CALL_SCRIPT[k];
    if(cap){
      cap.style.opacity = '0';
      setTimeout(() => {
        cap.textContent = line.who === 'me' ? `（你）${line.v}` : line.v;
        cap.style.opacity = line.v === '……' ? '.4' : '1';
      }, 220);
    }
    k++;
    callTimer = setTimeout(play, line.v === '……' ? 900 : 2100);
  };
  setTimeout(play, 700);
}

function endCall(sec){
  const fs = $('.call-fs');
  if(fs){
    fs.style.transition = 'opacity .6s';
    fs.style.opacity = '0';
    setTimeout(() => { overlay.innerHTML = ''; }, 600);
  }
  island.classList.remove('live');
  homebar.classList.remove('light');

  // 回到聊天室，补上结尾
  const body = $('#chatBody');
  if(body){
    const mm = String(Math.floor(sec / 60)).padStart(2, '0');
    const ss = String(sec % 60).padStart(2, '0');
    setTimeout(() => {
      body.insertAdjacentHTML('beforeend', `<div class="day-sep"><span>通话结束 · ${mm}:${ss}</span></div>`);
      body.insertAdjacentHTML('beforeend', msgHTML({ t:'them', who:'dohoon', v:'你跑什么' }, { group:false }));
      body.scrollTop = body.scrollHeight;
      setTimeout(() => {
        body.insertAdjacentHTML('beforeend', msgHTML({ t:'me', v:'哥 面要坨了' }, {}));
        body.scrollTop = body.scrollHeight;
        setTimeout(() => {
          body.insertAdjacentHTML('beforeend', msgHTML({ t:'them', who:'dohoon', v:'坨了也好吃' }, { group:false }));
          body.scrollTop = body.scrollHeight;
          setTimeout(showEnding, 1600);
        }, 1200);
      }, 1400);
    }, 900);
  } else {
    showEnding();
  }
}

function showEnding(){
  overlay.innerHTML = `
    <div class="call-fs" style="background:linear-gradient(175deg,#101720,#1b2530 45%,#07090c);justify-content:center">
      <div style="max-width:300px;text-align:center;position:relative;z-index:2" id="endTxt">
        <p class="e-line" style="opacity:0;font-size:14.5px;line-height:2;margin:0 0 18px;transition:opacity 1.2s">
          那天晚上他们坐在便利店门口的台阶上。
        </p>
        <p class="e-line" style="opacity:0;font-size:14.5px;line-height:2;margin:0 0 18px;transition:opacity 1.2s">
          拉面确实坨了。<br>谁也没提明天的两万个人。
        </p>
        <p class="e-line" style="opacity:0;font-size:14.5px;line-height:2;margin:0 0 26px;transition:opacity 1.2s">
          回到房间已经一点多。<br>他把闹钟定在了 6:20。
        </p>
        <p class="e-line" style="opacity:0;font-size:12px;line-height:1.9;opacity:0;letter-spacing:.6px;color:rgba(255,255,255,.45);transition:opacity 1.2s">
          10月24日 19:00 · 高雄巨蛋<br>TWS 24/7:FOR:YOU
        </p>
      </div>
      <button data-act="restart" style="position:absolute;bottom:70px;left:50%;transform:translateX(-50%);color:#fff;font-size:13px;opacity:0;transition:opacity 1s;border:1px solid rgba(255,255,255,.3);padding:9px 22px;border-radius:20px;z-index:3" id="endBtn">再打开一次手机</button>
    </div>`;

  const lines = $$('.e-line');
  lines.forEach((l, i) => setTimeout(() => { l.style.opacity = '1'; }, 700 + i * 1700));
  setTimeout(() => { const b = $('#endBtn'); if(b) b.style.opacity = '.85'; }, 700 + lines.length * 1700);
}

/* ==========================================================
   微博话题 / 小红书详情
   ========================================================== */
function wbPost(p){
  return `<div class="wb-post ${p.mine ? 'mine' : ''}">
    <div class="wb-hd">
      ${wbAvatar(p)}
      <div class="wb-hi"><b>${wbName(p)}</b><span>${p.time}</span></div>
    </div>
    <div class="wb-tx">${p.text.replace(/\n/g, '<br>')}</div>
    <div class="wb-ft"><span>♡ ${p.like}</span><span>💬 ${p.cmt || '0'}</span></div>
  </div>`;
}

function openTopic(id){
  const T = WEIBO_TOPICS[id] || WEIBO_TOPICS.laodie;
  pushView(`
    <div class="nav"><button class="back" data-act="back"><svg viewBox="0 0 12 20"><path d="M10 2 2 10l8 8"/></svg>微博</button>
      <div class="ttl sub">热搜</div></div>
    <div class="body" style="background:#f4f4f6">
      <div class="topic-hd">
        <h3>${T.title}</h3>
        <span>${T.read}</span>
      </div>
      ${T.posts.map(wbPost).join('')}
      <div class="tagline">这个话题里，没有一条是在说他。<br>他还是一条一条看完了。</div>
    </div>`);
}

function openXhs(i){
  const n = XHS_NOTES[i];
  pushView(`
    <div class="nav"><button class="back" data-act="back"><svg viewBox="0 0 12 20"><path d="M10 2 2 10l8 8"/></svg>小红书</button>
      <div class="ttl sub">笔记</div></div>
    <div class="body" style="background:#fff">
      <div class="xhs-hero">${n.img ? photo('assets/' + n.img + '.jpg') : art(n.cover)}</div>
      <div class="xhs-detail">
        <h3>${n.t}</h3>
        <div class="xhs-author"><span class="xa" style="background-image:url(${XHS_AV[n.a] || 'assets/seoul_night.jpg'})"></span>${n.a}<span class="xl">♡ ${n.like}</span></div>
        <div class="xhs-text">${n.body.replace(/\n/g, '<br>')}</div>
        <div class="xhs-cmts">
          <div class="xhs-cmts-hd">共 ${n.cmts.length} 条评论</div>
          ${n.cmts.map(c => `<div class="xhs-cmt"><b>${c[0]}</b><span>${c[1]}</span></div>`).join('')}
        </div>
      </div>
    </div>`);
}

/* ==========================================================
   事件
   ========================================================== */
document.addEventListener('keydown', e => {
  if(!lockLayer.classList.contains('passmode')) return;
  if(e.key >= '0' && e.key <= '9') passIn(e.key);
  else if(e.key === 'Backspace') passDel();
  else if(e.key === 'Escape') hidePass();
});
document.addEventListener('click', e => {
  const t = e.target.closest('[data-act]');
  if(!t) return;
  const act = t.dataset.act;

  if(act === 'unlock'){
    showPass();
  }
  else if(act === 'pass'){ passIn(t.dataset.n); }
  else if(act === 'passdel'){ passDel(); }
  else if(act === 'passcancel'){ hidePass(); }
  else if(act === 'open'){ openApp(t.dataset.app, t); }
  else if(act === 'back'){ popView(); }
  else if(act === 'noti'){
    const n = NOTIFICATIONS[+t.dataset.i];
    lockLayer.classList.remove('show');
    homeLayer.classList.remove('show');
    openApp('chat');
    setTimeout(() => {
      if(n.go && n.go.startsWith('chat:')) openChat(n.go.split(':')[1]);
    }, 240);
  }
  else if(act === 'chat'){ openChat(t.dataset.id); }
  else if(act === 'wxchat'){ openChat(t.dataset.id, 'wx'); }
  else if(act === 'topic'){ openTopic(t.dataset.id); }
  else if(act === 'xhs'){ openXhs(+t.dataset.i); }
  else if(act === 'tk-next'){
    tkIdx = (tkIdx + 1) % TIKTOK.feed.length;
    const v = $('#tkView');
    if(v) v.innerHTML = tkInner();
  }
  else if(act === 'tk-like'){
    tkLiked[tkIdx] = !tkLiked[tkIdx];
    const v = $('#tkView');
    if(v) v.innerHTML = tkInner();
  }
  else if(act === 'tk-me'){
    const v = $('#tkView');
    if(v && !$('.tk-profile', v)) v.insertAdjacentHTML('beforeend', tkMeHTML());
  }
  else if(act === 'tk-close'){
    const p = t.closest('.tk-profile');
    if(p) p.remove();
  }
  else if(act === 'photo'){
    const s = PHOTOS[+t.dataset.s], p = s.items[+t.dataset.p];
    pushView(`
      <div id="photoView">
        <div class="pv-top"><span style="font-size:13px;opacity:.6">${p.d}</span><span class="x" data-act="back">×</span></div>
        <div class="pv-stage">${art(p.art)}</div>
        <div class="pv-bot"><h4>${p.t}</h4><p>${p.desc}</p></div>
      </div>`, true);
  }
  else if(act === 'note'){
    const n = NOTES[+t.dataset.i];
    pushView(`
      <div class="nav"><button class="back" data-act="back"><svg viewBox="0 0 12 20"><path d="M10 2 2 10l8 8"/></svg>备忘录</button></div>
      <div class="body">
        <div class="note-detail">
          <div class="nd-date">${n.d}</div>
          <div class="paper">${n.body}</div>
        </div>
      </div>`);
  }
  else if(act === 'call-accept'){ acceptCall(); }
  else if(act === 'call-hang'){
    const t0 = Number(overlay.dataset.t0 || Date.now());
    const sec = Math.max(1, Math.round((Date.now() - t0) / 1000));
    clearTimeout(callTimer);
    endCall(sec);
  }
  else if(act === 'call-decline'){
    overlay.innerHTML = '';
    island.classList.remove('live');
    homebar.classList.remove('light');
    toast('已拒接');
  }
  else if(act === 'restart'){
    overlay.innerHTML = '';
    clearTimeout(chatTimer);
    backToHome();
    lockLayer.classList.add('show');
    statusbar.classList.remove('dark');
  }
  else if(act === 'toast'){ toast(t.dataset.msg || ''); }
});

let homeGestureY = null;
homeLayer.addEventListener('pointerdown', e => { homeGestureY = e.clientY; }, { passive:true });
homeLayer.addEventListener('pointerup', e => {
  const scale = phone.getBoundingClientRect().width / 393;
  if(homeGestureY !== null && e.clientY - homeGestureY > 70 * scale && appStack.length){
    backToHome();
  }
  homeGestureY = null;
}, { passive:true });

/* home bar */
let skipHomebarClick = false;
homebar.addEventListener('click', () => {
  if(skipHomebarClick){ skipHomebarClick = false; return; }
  if(appStack.length > 1) popView();
  else if(appStack.length === 1) backToHome();
  else if(!lockLayer.classList.contains('show')) backToHome();
});

let homebarStart = null;
homebar.addEventListener('pointerdown', e => { homebarStart = { y:e.clientY, t:Date.now() }; });
homebar.addEventListener('pointerup', e => {
  if(homebarStart && homebarStart.y - e.clientY > 16 && appStack.length){
    skipHomebarClick = true;
    if(appStack.length > 1) popView(); else backToHome();
    setTimeout(() => { skipHomebarClick = false; }, 500);
  }
  homebarStart = null;
});

/* 上滑解锁 */
let touchY = null;
lockLayer.addEventListener('pointerdown', e => { touchY = e.clientY; });
lockLayer.addEventListener('pointerup', e => {
  if(touchY !== null && touchY - e.clientY > 40){
    lockLayer.classList.remove('show');
    homeLayer.classList.add('show');
    statusbar.classList.remove('dark');
    statusbar.classList.remove('lock');
    homebar.classList.add('light');
  }
  touchY = null;
});

/* toast */
let toastEl = null;
function toast(msg){
  if(!msg) return;
  if(toastEl) toastEl.remove();
  toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.textContent = msg;
  phone.appendChild(toastEl);
  requestAnimationFrame(() => toastEl.classList.add('on'));
  setTimeout(() => { toastEl && toastEl.classList.remove('on'); }, 1600);
}

function showIncomingNotice({ app='kakao', icon='💬', title, text, go }){
  const old = $('#incomingNotice', overlay);
  if(old) old.remove();
  const notice = document.createElement('button');
  notice.id = 'incomingNotice';
  notice.className = `incoming-notice ${app === 'weibo' ? 'weibo-notice' : 'kakao-notice'}`;
  const appLabel = app === 'weibo' ? '微博 · 热搜' : 'KakaoTalk';
  notice.innerHTML = `<span class="in-icon">${app === 'weibo' ? '<b>微</b>' : '<i></i>'}</span><span class="in-copy"><span class="in-app">${appLabel}<small>现在</small></span><b>${title}</b><span>${text}</span></span>`;
  notice.addEventListener('click', () => {
    notice.remove();
    if(go?.startsWith('chat:')){
      const id = go.split(':')[1];
      if(!appStack.length) openApp('chat');
      setTimeout(() => openChat(id), appStack.length ? 0 : 120);
    } else if(go === 'weibo') openApp('weibo');
  });
  overlay.appendChild(notice);
  requestAnimationFrame(() => requestAnimationFrame(() => notice.classList.add('on')));
  setTimeout(() => {
    notice.classList.add('dismiss');
    setTimeout(() => notice.remove(), 360);
  }, 6200);
}

/* ==========================================================
   启动
   ========================================================== */
function boot(){
  fit();
  renderLock();
  renderHome();
  lockLayer.classList.add('show');
  statusbar.classList.remove('dark');
  statusbar.classList.add('lock');
  homebar.classList.add('light');
  $('#sbTime').textContent = CLOCK;

  // 调试 / 直达：?app=chat&id=dohoon
  const q = new URLSearchParams(location.search);
  if(q.get('noanim')) document.body.classList.add('noanim');
  if(q.get('unlock')){
    lockLayer.classList.remove('show');
    statusbar.classList.remove('lock');
    homebar.classList.remove('light');
    homeLayer.classList.add('show');
  }
  if(q.get('pass')) setTimeout(showPass, 400);
  if(q.get('passtry')) setTimeout(() => {
    showPass();
    String(q.get('passtry')).split('').forEach((n,i) => setTimeout(() => passIn(n), 200 + i*140));
  }, 400);
  if(q.get('ending')) setTimeout(showEnding, 800);
  if(q.get('tkme')) setTimeout(() => {
    const v = $('#tkView');
    if(v) v.insertAdjacentHTML('beforeend', tkMeHTML());
  }, 500);
  if(q.get('call')) setTimeout(() => {
    startCall();
    if(q.get('answer')) setTimeout(acceptCall, 900);
  }, 1500);
  if(q.get('app')){
    if(q.get('tk')) tkStart = +q.get('tk');
    lockLayer.classList.remove('show');
    statusbar.classList.remove('lock');
    homeLayer.classList.add('show');
    setTimeout(() => {
      openApp(q.get('app'));
      if(q.get('id')) setTimeout(() => {
        openChat(q.get('id'), q.get('app') === 'wechat' ? 'wx' : undefined);
      }, 120);
      if(q.get('note') !== null) setTimeout(() => openXhs(+q.get('note')), 320);
      if(q.get('scroll')) setTimeout(() => {
        const b = document.querySelector('.body');
        if(b) b.scrollTop = +q.get('scroll');
      }, 420);
      if(q.get('topic')) setTimeout(() => openTopic(q.get('topic')), 320);
    }, 60);
  }
  const arrivals = [
    { delay:4200, data:{app:'kakao',icon:'💬',title:'炅潣',text:'哥我把手机放下了 现在应该能睡了',go:'chat:kyungmin'} },
    { delay:13800, data:{app:'weibo',icon:'热',title:'微博热搜 · K-pop',text:'今天追星人的耳机使用时长',go:'weibo'} },
    { delay:24700, data:{app:'kakao',icon:'💬',title:'申惟哥',text:'到场先吃点东西 别空着肚子彩排',go:'chat:shinyu'} }
  ];
  if(!q.get('no-notices')) arrivals.forEach(({delay,data}) => setTimeout(() => {
    if(!document.hidden && !overlay.querySelector('.call-fs') && !lockLayer.classList.contains('show')) showIncomingNotice(data);
  }, delay));
}
boot();
