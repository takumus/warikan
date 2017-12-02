const config = require('./config');
const siharais = [];
// 支払いの初期化
config.forEach((siharai) => {
    siharais.push({
        morau:[],
        harau:[],
        name: siharai.name,
        value: siharai.value === void 0 ? 0 : siharai.value
    });
});
// 合計を出す
let goukei = 0;
siharais.forEach((siharai) => goukei += siharai.value);
// 平均を出す
const heikin = goukei / siharais.length;
// 平均を引いた合計を出す
let heikin_wo_hiita_goukei = 0;
siharais.forEach((s) => {
    s.value -= heikin;
    if (s.value > 0) heikin_wo_hiita_goukei += s.value;
});
// 支払うべき人視点での計算
// from:支払う人, to:受け取る人
siharais.forEach((from) => {
    // すでに払っている人を除外
    if (from.value >= 0) return;
    siharais.forEach((to) => {
        // まだ払っていない人を除外
        if (to.value <= 0) return;
        const pay = Math.round((to.value / heikin_wo_hiita_goukei) * -from.value);
        // 受け取り, 支払いを保存
        to.morau.push({name: from.name, value: pay});
        from.harau.push({name: to.name, value: pay});
    });
});
// 出力
// 円の出力
const yen = (value) => Math.round(value).toLocaleString('ja-JP') + '円';
//色テーブル
const c = '\u001b[36m';
const b = '\u001b[34m';
const g = '\u001b[32m';
const y = '\u001b[33m';
const r = '\u001b[0m';
const log = (...args) => process.stdout.write(args.join(', '));
log(`🤗 今回のイベントの集計結果🤗\n`);
log(`参加者は\n`);
config.forEach((me) => {
    log(`    ${c}${me.name}${r}さん\n`)
});
log(`    計${y}${config.length}人${r}で、\n`);
log(`発生した支払いは\n`);
config.forEach((me) => {
    if (me.value > 0) log(`    ${c}${me.name}${r}さんが${y}${yen(me.value)}${r}\n`);
});
log(`    計${y}${yen(goukei)}${r}でした。\n`);
log(`================================\n`);
siharais.forEach((me) => {
    log(`${c}${me.name}${r}さんは`);
    if (me.morau.length > 0) {
        me.morau.forEach((from) => {
            log(`\n    ${c}${from.name}${r}さんから${g}${yen(from.value)}${r}`);
        });
        log(`\n    の合計${g}${yen(me.value)}${r}を受け取ります。\n`);
    }else if (me.harau.length > 0) {
        me.harau.forEach((to) => {
            log(`\n    ${c}${to.name}${r}さんに${y}${yen(to.value)}${r}`);
        });
        log(`\n    の合計${y}${yen(-me.value)}${r}を支払います。\n`);
    }else {
        log(`何もしません。\n`);
    }
    log(`--------------------------------\n`);
});
log(`${y}金の切れ目が縁の切れ目🤔 ${r}と言います。\n支払いを忘れないように。`);