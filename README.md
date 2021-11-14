# pasumn

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## About

- パスワード管理ツール
- フロントがNuxt.js、バックエンド（API）はLaravel8になっています
- バックエンド（API）は別リポジトリの「pasumn-api」です

## How to

- 検索ページ
  - インプットフィールドに文字を入力するとリアクティブに登録データが現れます
  - セルをクリックすると値がコピーされます
  - 右端に編集と削除ボタンがあります
- 生成ページ
  - COPYボタンを押すと生成されている文字をコピーします
  - REGISTボタンを押すと生成されている文字を持って登録ページに遷移します
- 登録ページ
  - パスワードと付随する項目を入力して登録します
- ログインページ
  - マルチユーザー対応です
  - ユーザーの追加編集は、別リポジトリで公開している「pasumn-api」にて行います

## Demo User

https://pasumn-front.ryukyuhub.co.jp/  
ID: guest  
PASSWORD: 5nuspvin  
※実際に登録などOK！