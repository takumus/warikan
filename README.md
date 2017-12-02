# Warikan
## これは何
複数人が支払った場合の割り勘を解決するツールです。
## インストール
`npm install warikan --registry http://npm.takumus.com`  
まだコマンドラインツールとかにしてないから`./node_modules/warikan/`で`node .`してください...
## 使い方
config.js
```js
module.exports = [
    {name: "しゅん", value: 1000},
    {name: "たくむ", value: 7000},
    {name: "での", value: 500},
    {name: "とうどう", value: 600},
    {name: "おおはし"},
    {name: "すわ", value: 1200}
];
```
これで`node .`するだけ！