/* =============================================
   五行体質診断 script.js  ブランドデザイン反映版
   質問内容を変更する場合は QUESTIONS 配列を編集
   画像パスは GOGYOU_DATA.image を編集
============================================= */

// =============================================
// 1. 質問データ
// =============================================
const QUESTIONS = [
  {
    id: 1, theme: "感情の傾向", text: "最近の自分に一番近いものは？",
    options: [
      { label: "イライラしやすい",              gogyou: { wood:2 }, con: { kistasis:2 } },
      { label: "興奮しやすく落ち着かない",       gogyou: { fire:2 }, con: { inkyo:1, kiyo:1 } },
      { label: "心配事を考え続けてしまう",       gogyou: { earth:2 }, con: { kiyo:2 } },
      { label: "悲観的になりやすい",             gogyou: { metal:2 }, con: { kekkyo:1, kiyo:1 } },
      { label: "不安や恐れを感じやすい",         gogyou: { water:2 }, con: { yokyo:1, kiyo:1 } },
    ],
  },
  {
    id: 2, theme: "体の不調", text: "気になる症状は？",
    options: [
      { label: "目の疲れや肩こり",              gogyou: { wood:2 }, con: { kekkyo:2 } },
      { label: "動悸やのぼせ",                  gogyou: { fire:2 }, con: { inkyo:2 } },
      { label: "胃もたれやむくみ",              gogyou: { earth:2 }, con: { tanshitsu:2 } },
      { label: "肌の乾燥や咳",                  gogyou: { metal:2 }, con: { kiyo:1, kekkyo:1 } },
      { label: "腰痛や耳鳴り",                  gogyou: { water:2 }, con: { yokyo:2 } },
    ],
  },
  {
    id: 3, theme: "食の好み", text: "疲れた時につい欲しくなる味は？",
    options: [
      { label: "酸っぱいもの",   gogyou: { wood:2 }, con: {} },
      { label: "苦いもの",       gogyou: { fire:2 }, con: {} },
      { label: "甘いもの",       gogyou: { earth:2 }, con: {} },
      { label: "辛いもの",       gogyou: { metal:2 }, con: {} },
      { label: "塩辛いもの",     gogyou: { water:2 }, con: {} },
    ],
  },
  {
    id: 4, theme: "睡眠", text: "睡眠の状態で当てはまるのは？",
    options: [
      { label: "夢が多く寝つきが悪い",          gogyou: { wood:2 }, con: { kistasis:1 } },
      { label: "夜中に目が覚める",              gogyou: { fire:2 }, con: { inkyo:1 } },
      { label: "寝ても疲れが取れない",          gogyou: { earth:2 }, con: { kiyo:1 } },
      { label: "朝早く目が覚める",              gogyou: { metal:2 }, con: { kekkyo:1 } },
      { label: "疲れているのに眠れない",        gogyou: { water:2 }, con: { inkyo:1, yokyo:1 } },
    ],
  },
  {
    id: 5, theme: "性格", text: "自分の性格として近いのは？",
    options: [
      { label: "行動力がある",   gogyou: { wood:2 }, con: {} },
      { label: "情熱的",         gogyou: { fire:2 }, con: {} },
      { label: "面倒見が良い",   gogyou: { earth:2 }, con: {} },
      { label: "几帳面",         gogyou: { metal:2 }, con: {} },
      { label: "慎重派",         gogyou: { water:2 }, con: {} },
    ],
  },
  {
    id: 6, theme: "季節", text: "気候で体調を崩しやすい時期は？",
    options: [
      { label: "春先",               gogyou: { wood:2 }, con: {} },
      { label: "真夏",               gogyou: { fire:2 }, con: {} },
      { label: "梅雨",               gogyou: { earth:2 }, con: { tanshitsu:1 } },
      { label: "秋の乾燥する時期",   gogyou: { metal:2 }, con: { kekkyo:1 } },
      { label: "冬の寒い時期",       gogyou: { water:2 }, con: { yokyo:1 } },
    ],
  },
  {
    id: 7, theme: "ストレス反応", text: "ストレス時にどうなりやすいですか？",
    options: [
      { label: "頭痛や肩こり",              gogyou: { wood:2 }, con: { kistasis:2 } },
      { label: "顔が赤くなる、動悸",        gogyou: { fire:2 }, con: { inkyo:1, oketsu:1 } },
      { label: "食べ過ぎる、胃が痛い",      gogyou: { earth:2 }, con: { tanshitsu:1, kiyo:1 } },
      { label: "呼吸が浅くなる",            gogyou: { metal:2 }, con: { kiyo:2 } },
      { label: "疲れや腰痛が強くなる",      gogyou: { water:2 }, con: { yokyo:1, kiyo:1 } },
    ],
  },
  {
    id: 8, theme: "血流の状態", text: "血流・血色について当てはまるのは？",
    options: [
      { label: "顔色が白く爪が割れやすい",           gogyou: { wood:2 }, con: { kekkyo:2 } },
      { label: "顔が赤くのぼせやすい",               gogyou: { fire:2 }, con: { inkyo:2 } },
      { label: "むくみやすい",                       gogyou: { earth:2 }, con: { tanshitsu:2 } },
      { label: "長年同じ場所の肩こりや痛みがある",   gogyou: { metal:2 }, con: { oketsu:2 } },
      { label: "冷えやすく疲れやすい",               gogyou: { water:2 }, con: { yokyo:2 } },
    ],
  },
  {
    id: 9, theme: "水分・体質", text: "水分や体の状態で当てはまるのは？",
    options: [
      { label: "ストレスで喉が詰まる感じがある",   gogyou: { wood:2 }, con: { kistasis:1 } },
      { label: "口が苦く感じることがある",         gogyou: { fire:2 }, con: { inkyo:1 } },
      { label: "体が重だるくむくみやすい",         gogyou: { earth:2 }, con: { tanshitsu:2 } },
      { label: "口や肌が乾燥しやすい",             gogyou: { metal:2 }, con: { kekkyo:1, inkyo:1 } },
      { label: "冷たい物が好きで冷えやすい",       gogyou: { water:2 }, con: { yokyo:2 } },
    ],
  },
  {
    id: 10, theme: "エネルギー状態", text: "エネルギー・活力の状態は？",
    options: [
      { label: "朝から元気",                 gogyou: { wood:2 }, con: {} },
      { label: "午後から調子が上がる",       gogyou: { fire:2 }, con: {} },
      { label: "食後眠くなる",               gogyou: { earth:2 }, con: { tanshitsu:1 } },
      { label: "疲れやすい",                 gogyou: { metal:2 }, con: { kiyo:2 } },
      { label: "寒い日に特につらい",         gogyou: { water:2 }, con: { yokyo:2 } },
    ],
  },
];

// =============================================
// 2. 五行タイプデータ（画像パス追加）
// =============================================
const GOGYOU_DATA = {
  wood: {
    key: "wood", name: "木タイプ（肝）", themeWord: "成長", theme: "theme-wood",
    image: "assets/tree.jpg", barColor: "#3d6b4a",
    desc: "あなたは行動力と向上心を持つチャレンジャータイプです。目標に向かって努力する力があり、周囲を引っ張るリーダー気質があります。一方で責任感が強すぎるため、ストレスを抱え込みやすい傾向があります。",
    strengths: ["行動力がある", "決断が早い", "リーダーシップがある", "向上心が強い"],
    cautions: ["イライラしやすい", "肩こり", "眼精疲労", "頑張りすぎる"],
    foods: ["春菊", "セロリ", "レモン"],
    tsubo: { name: "太衝（たいしょう）", location: "足の甲・親指と人差し指の骨が合わさる手前のくぼみ", effect: "気の流れを整え、イライラや頭痛・目の疲れを和らげます。肝の働きを助けるツボです。" },
  },
  fire: {
    key: "fire", name: "火タイプ（心）", themeWord: "活力", theme: "theme-fire",
    image: "assets/fire.jpg", barColor: "#b83020",
    desc: "あなたは明るく情熱的なムードメーカータイプです。人との交流を楽しみ、周囲を元気にする力があります。反面、興奮しやすく休息が不足すると心身のバランスを崩しやすくなります。",
    strengths: ["明るい", "社交的", "情熱的", "発想力が豊か"],
    cautions: ["のぼせ", "不眠", "動悸", "興奮しすぎる"],
    foods: ["トマト", "ゴーヤ", "緑茶"],
    tsubo: { name: "神門（しんもん）", location: "手首の内側・小指側のくぼみ", effect: "心を落ち着かせ、動悸・不眠・精神的な不安を和らげます。心経の原穴です。" },
  },
  earth: {
    key: "earth", name: "土タイプ（脾）", themeWord: "調和", theme: "theme-earth",
    image: "assets/earth.jpg", barColor: "#9a7228",
    desc: "あなたは思いやりがあり、人を支えるサポータータイプです。周囲への気配りが上手で信頼されやすい性格です。ただし考えすぎや食べすぎで胃腸に負担がかかりやすい傾向があります。",
    strengths: ["優しい", "面倒見が良い", "協調性が高い", "安心感を与える"],
    cautions: ["胃もたれ", "むくみ", "食べすぎ", "考えすぎ"],
    foods: ["かぼちゃ", "さつまいも", "大豆"],
    tsubo: { name: "足三里（あしさんり）", location: "膝の外側のくぼみから指4本分下", effect: "胃腸の働きを整え、消化不良・疲労・むくみを改善します。体力増強にも役立つ万能ツボです。" },
  },
  metal: {
    key: "metal", name: "金タイプ（肺）", themeWord: "清らかさ", theme: "theme-metal",
    image: "assets/metal.jpg", barColor: "#5a6b78",
    desc: "あなたは真面目で誠実な職人タイプです。細かな部分によく気が付き、責任感を持って物事に取り組みます。完璧を求めすぎると疲れやすくなるため注意が必要です。",
    strengths: ["几帳面", "責任感が強い", "観察力がある", "計画的"],
    cautions: ["疲れやすい", "乾燥しやすい", "呼吸が浅い", "神経を使いすぎる"],
    foods: ["れんこん", "梨", "白ごま"],
    tsubo: { name: "列缺（れっけつ）", location: "手首の内側・親指側から指2本分上のくぼみ", effect: "肺の気を補い、咳・鼻づまり・皮膚の乾燥を改善します。頭痛や首こりにも効果的です。" },
  },
  water: {
    key: "water", name: "水タイプ（腎）", themeWord: "知恵", theme: "theme-water",
    image: "assets/water.jpg", barColor: "#184e70",
    desc: "あなたは冷静で慎重な知性派タイプです。物事を深く考え、コツコツ積み上げる力があります。無理を続けるとエネルギー不足になりやすいため休息も大切です。",
    strengths: ["慎重", "忍耐強い", "冷静", "継続力がある"],
    cautions: ["冷え", "疲労感", "腰痛", "不安を抱えやすい"],
    foods: ["黒豆", "山芋", "わかめ"],
    tsubo: { name: "太渓（たいけい）", location: "内くるぶしとアキレス腱の間のくぼみ", effect: "腎の気を補い、腰痛・冷え・疲労感・耳鳴りを和らげます。腎経の原穴で生命エネルギーを補うツボです。" },
  },
};

// =============================================
// 3. 体質データ
// =============================================
const CONSTITUTION_DATA = {
  kiyo:      { name: "気虚（ききょ）",   sub: "エネルギー不足タイプ", desc: "頑張っているのに疲れが取れない状態です。", features: ["疲れやすい", "風邪をひきやすい", "声が小さい", "食後眠くなる"] },
  kistasis:  { name: "気滞（きたい）",   sub: "ストレス停滞タイプ",   desc: "ストレスによって気の流れが滞っています。", features: ["イライラ", "ため息が多い", "肩こり", "気分の浮き沈み"] },
  kekkyo:    { name: "血虚（けっきょ）", sub: "栄養不足タイプ",       desc: "血が不足し体を十分に養えていない状態です。", features: ["顔色が白い", "めまい", "爪が割れやすい", "目が疲れやすい"] },
  oketsu:    { name: "瘀血（おけつ）",   sub: "血流停滞タイプ",       desc: "血の巡りが悪くなっている状態です。", features: ["肩こりが長引く", "同じ場所が痛む", "顔色が暗い", "冷えやすい"] },
  inkyo:     { name: "陰虚（いんきょ）", sub: "潤い不足タイプ",       desc: "体の潤いが不足し熱がこもりやすい状態です。", features: ["口が渇く", "のぼせる", "寝汗", "眠りが浅い"] },
  yokyo:     { name: "陽虚（ようきょ）", sub: "冷えタイプ",           desc: "体を温める力が不足している状態です。", features: ["手足が冷える", "寒さに弱い", "疲れやすい", "朝がつらい"] },
  tanshitsu: { name: "痰湿（たんしつ）", sub: "ため込みタイプ",       desc: "余分な水分や老廃物が溜まりやすい状態です。", features: ["むくみ", "体が重い", "眠気", "胃もたれ"] },
};

// =============================================
// 4. アプリ状態
// =============================================
let currentQ = 0;
let scores   = {};
let history  = [];

function initScores() {
  scores = {
    gogyou: { wood:0, fire:0, earth:0, metal:0, water:0 },
    con: { kiyo:0, kistasis:0, kekkyo:0, oketsu:0, inkyo:0, yokyo:0, tanshitsu:0 },
  };
}

// =============================================
// 5. 同点処理（Q10 > Q7 > Q1 優先）
// =============================================
function resolveTie(tiedKeys) {
  const tiebreaker = [10, 7, 1];
  for (const qNum of tiebreaker) {
    const entry = history.find(h => h.qIndex === qNum - 1);
    if (!entry) continue;
    const opt = QUESTIONS[qNum - 1].options[entry.optIndex];
    const dominated = Object.keys(opt.gogyou || {});
    for (const k of dominated) {
      if (tiedKeys.includes(k)) return k;
    }
  }
  return tiedKeys[0];
}

// =============================================
// 6. 画面切替
// =============================================
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// =============================================
// 7. 問題描画
// =============================================
function renderQuestion(index) {
  const q     = QUESTIONS[index];
  const total = QUESTIONS.length;

  document.getElementById("progress-fill").style.width = `${(index / total) * 100}%`;
  document.getElementById("progress-label").textContent = `${index + 1} / ${total}`;
  document.getElementById("question-num").textContent  = `Q${index + 1}　${q.theme}`;
  document.getElementById("question-text").textContent = q.text;

  ["question-area", "options-list"].forEach(id => {
    const el = document.getElementById(id);
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "";
  });

  const list = document.getElementById("options-list");
  list.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className   = "option-btn";
    btn.textContent = opt.label;
    btn.addEventListener("click", () => selectOption(index, i));
    list.appendChild(btn);
  });

  document.getElementById("btn-back").style.display = index === 0 ? "none" : "inline-block";
}

// =============================================
// 8. 選択処理
// =============================================
function selectOption(qIndex, optIndex) {
  const opt = QUESTIONS[qIndex].options[optIndex];

  Object.entries(opt.gogyou || {}).forEach(([k, v]) => { scores.gogyou[k] += v; });
  Object.entries(opt.con    || {}).forEach(([k, v]) => { scores.con[k]    += v; });

  history.push({ qIndex, optIndex, gogyou: opt.gogyou, con: opt.con });

  const next = qIndex + 1;
  if (next < QUESTIONS.length) {
    currentQ = next;
    renderQuestion(next);
  } else {
    buildResult();
  }
}

// =============================================
// 9. 戻る処理
// =============================================
function goBack() {
  if (!history.length) return;
  const last = history.pop();
  Object.entries(last.gogyou || {}).forEach(([k, v]) => { scores.gogyou[k] -= v; });
  Object.entries(last.con    || {}).forEach(([k, v]) => { scores.con[k]    -= v; });
  currentQ = last.qIndex;
  renderQuestion(currentQ);
}

// =============================================
// 10. 結果構築
// =============================================
function buildResult() {
  const gogyouRanked = Object.entries(scores.gogyou).sort((a, b) => b[1] - a[1]);
  const topScore = gogyouRanked[0][1];

  const tiedKeys = gogyouRanked.filter(([, v]) => v === topScore).map(([k]) => k);
  const mainKey  = tiedKeys.length > 1 ? resolveTie(tiedKeys) : tiedKeys[0];
  const subKey   = gogyouRanked.find(([k]) => k !== mainKey)[0];

  const conRanked = Object.entries(scores.con).sort((a, b) => b[1] - a[1]);
  const conTop    = conRanked[0];
  const conSecond = conRanked[1];
  const showRelated = conSecond && (conTop[1] - conSecond[1]) <= 1;

  renderResult(mainKey, subKey, conTop[0], showRelated ? conSecond[0] : null, gogyouRanked);
}

// =============================================
// 11. 結果描画
// =============================================
function renderResult(mainKey, subKey, conKey, relatedConKey, gogyouRanked) {
  const main = GOGYOU_DATA[mainKey];
  const sub  = GOGYOU_DATA[subKey];
  const con  = CONSTITUTION_DATA[conKey];

  // ヒーロー画像
  const heroImg = document.getElementById("result-hero-image");
  heroImg.src = main.image;
  heroImg.alt = main.name;

  document.getElementById("result-main-name").textContent  = main.name;
  document.getElementById("result-main-theme").textContent = `― ${main.themeWord} ―`;

  document.getElementById("result-desc").textContent = main.desc;

  document.getElementById("result-sub-type").textContent     = sub.name;
  document.getElementById("result-constitution").textContent = con.name;

  document.getElementById("result-strengths").innerHTML =
    main.strengths.map(s => `<span class="tag">${s}</span>`).join("");

  document.getElementById("result-cautions").innerHTML =
    main.cautions.map(c => `<span class="tag">${c}</span>`).join("");

  document.getElementById("result-foods").innerHTML =
    main.foods.map(f => `<span class="food-item">${f}</span>`).join("");

  const t = main.tsubo;
  document.getElementById("result-tsubo").innerHTML = `
    <div class="tsubo-name">${t.name}</div>
    <div class="tsubo-location">📍 ${t.location}</div>
    <div class="tsubo-effect">${t.effect}</div>
  `;

  const conDetail = document.getElementById("result-constitution-detail");
  conDetail.innerHTML = renderConstitutionBlock(con);

  if (relatedConKey) {
    const relCon = CONSTITUTION_DATA[relatedConKey];
    conDetail.innerHTML += `
      <div class="related-con">
        <p class="related-label">関連体質</p>
        ${renderConstitutionBlock(relCon)}
      </div>
    `;
  }

  const maxScore = Math.max(...gogyouRanked.map(([, v]) => v)) || 1;
  const barOrder = ["wood", "fire", "earth", "metal", "water"];
  document.getElementById("bar-chart").innerHTML = barOrder.map(key => {
    const d   = GOGYOU_DATA[key];
    const pct = Math.round((scores.gogyou[key] / maxScore) * 100);
    return `
      <div class="bar-row">
        <span class="bar-label">${d.name.slice(0,1)}</span>
        <div class="bar-track">
          <div class="bar-fill" data-pct="${pct}" style="background:${d.barColor}; width:0%"></div>
        </div>
        <span class="bar-count">${scores.gogyou[key]}</span>
      </div>
    `;
  }).join("");

  showScreen("screen-result");

  setTimeout(() => {
    document.querySelectorAll(".bar-fill").forEach(el => {
      el.style.width = el.dataset.pct + "%";
    });
  }, 120);

  document.getElementById("btn-share").onclick = () => shareResult(main, con, relatedConKey);
}

function renderConstitutionBlock(con) {
  return `
    <div class="con-name">${con.name}</div>
    <div class="con-sub">${con.sub}</div>
    <div class="con-desc">${con.desc}</div>
    <div class="con-tags">${con.features.map(f => `<span class="con-tag">${f}</span>`).join("")}</div>
  `;
}

// =============================================
// 12. シェア
// =============================================
function shareResult(main, con, relatedConKey) {
  const related = relatedConKey ? `／関連体質：${CONSTITUTION_DATA[relatedConKey].name}` : "";
  const text = `【五行体質診断】\n私のタイプは「${main.name}」\nテーマ：${main.themeWord}\n隠れ体質：${con.name}${related}\n\n#五行体質診断 #東洋医学`;

  if (navigator.share) {
    navigator.share({ title: "五行体質診断", text }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById("btn-share");
      const orig = btn.textContent;
      btn.textContent = "コピーしました！";
      setTimeout(() => { btn.textContent = orig; }, 2000);
    });
  } else {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
  }
}

// =============================================
// 13. リセット
// =============================================
function resetApp() {
  currentQ = 0;
  history  = [];
  initScores();
  renderQuestion(0);
  showScreen("screen-quiz");
}

// =============================================
// 14. イベント登録
// =============================================
document.getElementById("btn-start").addEventListener("click", () => {
  initScores();
  currentQ = 0;
  history  = [];
  renderQuestion(0);
  showScreen("screen-quiz");
});

document.getElementById("btn-back").addEventListener("click", goBack);
document.getElementById("btn-retry").addEventListener("click", resetApp);
