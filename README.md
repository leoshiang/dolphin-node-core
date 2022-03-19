# dolphin-node-core

dolphin-node-core 是一個 npm 套件，包含了一些常用的 JavaScript 物件集合，例如：型別處理、向量、矩陣、位元陣列。

## 特色

* Type 是將一些型別判斷的功能的集合。
* Bits 是一個最佳化過的位元陣列，當你需要儲存大量的 Boolean 值時，Bits 所佔用的空間是一班陣列的 1/32。
* Vector 是多維的向量。
* Matrix 是二維矩陣，提供基本的矩陣運算。

## 範例

### 矩陣

```Javascript
const 矩陣 = require('./src/矩陣')

let m1 = new 矩陣([1, 2, 3], [4, 5, 6], [7, 8, 9])
console.log(m1) // 矩陣(3) [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]

let m2 = m1.加(3)
console.log(m1)         // 矩陣(3) [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
console.log(m2)         // 矩陣(3) [ [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10, 11, 12 ] ]
console.log(m2.總和())   // 72
console.log(m2.橫列(0))  // 向量(3) [ 4, 5, 6 ]
console.log(m2.直行(0))  // 向量(3) [ 4, 7, 10 ]

let m3 = m1.乘(m2)
console.log(m3)         // 矩陣(3) [ [ 48, 54, 60 ], [ 111, 126, 141 ], [ 174, 198, 222 ] ]

const m4 = new 矩陣([1, 2, 3], [4, 5, 6])
const t = m4.轉置()
console.log(t)          // 矩陣(3) [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]

const m5 = new 矩陣([0, 2, 3, 4], [5, 0, 7, 8], [9, 19, 0, 1], [34, 4, 3, 0])
console.log(m5.行列式()) // 362
```


$$
\left(\begin{matrix}
2 & 2 & 3 & 1 \\
4 & 5 & 6 & 3 \\
7 & 8 & 3 & 3 \\
2 & 2 & 2 & 0
\end{matrix}\right)
$$

$$
\left(\begin{matrix}
2 & 2 & 3 & 1 & 1 & 0 & 0 & 0 \\
4 & 5 & 6 & 3 & 0 & 1 & 0 & 0 \\
7 & 8 & 3 & 3 & 0 & 0 & 1 & 0 \\
2 & 2 & 2 & 0 & 0 & 0 & 0 & 1
\end{matrix}\right)
$$

$$
\left(\begin{matrix}
1 & 1 & 1.5 & 0.5 & 0.5 & 0 & 0 & 0 \\
4 & 5 & 6 & 3 & 0 & 1 & 0 & 0 \\
7 & 8 & 3 & 3 & 0 & 0 & 1 & 0 \\
2 & 2 & 2 & 0 & 0 & 0 & 0 & 1
\end{matrix}\right)
$$




## 下載
```bash
npm install dolphin-node-core
```

## 測試
```bash
npm run test
```
