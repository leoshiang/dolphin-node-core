# node-dolphin

node-dolphin 是一個 npm 套件，包含了一些常用的 JavaScript 物件集合，例如：型別處理、矩陣、動態矩陣、位元陣列。

## 特色

* Type 是將一些型別判斷的功能的集合。
* Vector 是多維的向量。
* DynamicMatrix 是動態矩陣，行（Column）與列（Row）索引可以是任何型別，且維度會隨著新的索引增加而調整。
* Matrix 是二維矩陣，提供基本的矩陣運算。
* Bits 是一個最佳化過的位元陣列，當你需要儲存大量的 Boolean 值時，Bits 所佔用的空間是一班陣列的 1/32。

## 文件

[詳細的 JSDoc 說明](https://leoshiang.github.io/node-dolphin/)。

簡要的說明：
* [Matrix](md/matrix.md)
## 下載
```bash
npm install node-dolphin
```

## 測試
```bash
npm run test
```
