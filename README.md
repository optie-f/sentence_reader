# sentence reader

長い文章を読んでいると、ふと今まで読んでいた行を見失い、どこを読んでいたかどうかわからなくなることがあります。

これは、その対策として作られている、句読点やカンマ単位で文章をハイライトしながら読むためのChrome拡張です。

[![Image from Gyazo](https://i.gyazo.com/031675afc4f081e4db5fa0a003bd517a.gif)](https://gyazo.com/031675afc4f081e4db5fa0a003bd517a)

nキーで次の文に進み、bキーで戻る。

## How To Build and Use

```
yarn build
```

によって生成される`dist` フォルダごと、Chrome拡張一覧ページの「パッケージ化されていない拡張機能を読み込む」で読み込んでください。


## TODO

- UI
  - 色変えられるようにする
  - deliminator の操作