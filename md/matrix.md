# Matrix

Matrix 是一個二維矩陣，其索引從0開始。Matrix 具備陣列的特性，因此可以用陣列的方式去存取，例如：

```javascript
let m = new Matrix(3,3)
m[2][2] = 1
```

## 建立矩陣

使用 `new Matrix()`可以建立一個矩陣，你可以傳入陣列的維度與預設值：

```javascript
const { Matrix } = require('node-dophin')
const m1 = new Matrix()         // 空矩陣
console.log('m1\r\n', m1)

const m2 = new Matrix(4, 3)     // 4x3 矩陣(4 rows, 3 columns)
console.log(m2)

const m3 = new Matrix(3, 3, 1)  // 3x3 矩陣，用預設值 1 填滿
console.log(m3)

const m4 = new Matrix([1,2,3],  // | 1 2 3 |
                      [4,5,6],  // | 4 5 6 |
                      [7,8,9])  // | 7 8 9 |
console.log(m4)
```

如果傳入的陣列維度不一樣，會自動調整大小為最大的陣列維度，例如：

```javascript
const { Matrix } = require('node-dophin')
const m = new Matrix([1, 2],    // | 1 2 0 |
                     [3, 4, 5], // | 3 4 5 |
                     [6])       // | 6 0 0 |
```

矩陣可以置入任何型態的資料：

```javascript
const { Matrix } = require('node-dophin')
const m = new Matrix(['a', 1, new Date()],
                     [(x)=>{console.log(x)}, 4, 'c'])
```

若要建立單位矩陣（identity matrix），可以使用 identity()：

```javascript
const { Matrix } = require('node-dophin')
const m = new Matrix(3, 3)
m.identity()  // | 1 0 0 |
              // | 0 1 0 |
              // | 0 0 1 |
```

## 複製

clone() 可以複製一個矩陣，新矩陣的維度與所有元素均與原本的矩陣相同。

```javascript
const { Matrix } = require('node-dophin')
const m1 = new Matrix([1,2,3],  // | 1 2 3 | 
                      [4,5,6],  // | 4 5 6 |
                      [7,8,9])  // | 7 8 9 |
const m2 = m1.clone() // | 1 2 3 | 
                      // | 4 5 6 |
                      // | 7 8 9 |
```

## 改變維度

呼叫 resize 可以改變維度，如果新的維度較大，新的元素會以預設值 0 填入：

```javascript
const { Matrix } = require('node-dophin')
const m1 = new Matrix([1,2,3],  // | 1 2 3 | 
                      [4,5,6],  // | 4 5 6 |
                      [7,8,9])  // | 7 8 9 |
m1.resize(3, 1) // | 1 |
                // | 4 |
                // | 7 |
const m2 = new Matrix([1, 2, 3])
m2.resize(3, 3) // | 1 2 3 |
                // | 0 0 0 |
                // | 0 0 0 |
```

## 資料處理

### 取得行（column）的值

用 column() 可以取得某個 column 所有的值，結果是以陣列方式回傳：

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix([1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9])
let c = m.column(0) // [1, 4, 4]
```

### 取得列（row）的值

用 row() 可以取得某個 row 所有的值，結果是以陣列方式回傳：

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix([1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9])
let c = m[2]  // [7, 8, 9]
```

### 取得行（column）的數量

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix([1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9])
console.log(m.columns) // 3
```

### 取得列（row）的數量

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix([1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9])
console.log(m.rows) // 3
```

### 填滿

如果要讓整個陣列都是同一個值，可以用 fill()

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix(3, 3).fill(1) // | 1 1 1 |
                                 // | 1 1 1 |
                                 // | 1 1 1 |
let n = new Matrix(3, 3).fill('a') // | a a a |
                                   // | a a a |
                                   // | a a a |
```

### 取得元素

你可以使用 row 和 column 編號來取得某一個元素：

> row 與 column 編號是從 0 開始。

```javascript
const { Matrix } = require('node-dophin')
const m = new Matrix([1,2,3],  // | 1 2 3 | 
                     [4,5,6],  // | 4 5 6 |
                     [7,8,9])  // | 7 8 9 |
console.log(m[1,1]) // 5
```

### 設定元素

你可以使用 row 和 column 編號來設定某一個元素：

> row 與 column 編號是從 0 開始。

```javascript
const { Matrix } = require('node-dophin')
const m = new Matrix([1,2,3],  // | 1 2 3 | 
                     [4,5,6],  // | 4 5 6 |
                     [7,8,9])  // | 7 8 9 |
m[1][1] = 9 // | 1 2 3 | 
            // | 4 9 6 |
            // | 7 8 9 |
```

## 迭代

### 遍歷每一個元素

用 forEach 可以遍歷每一個元素：

```javascript
const { Matrix } = require('node-dophin')
new Matrix(2, 2).fill(1).forEach((x, row, column) => {
      console.log(`(${row},${column})=${x}`)
    })
// (0,0)=1
// (0,1)=1
// (1,0)=1
// (1,1)=1
```

### 遍歷每一行（column）

用 forEachColumn 可以遍歷每一行：

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix([1, 2],
                   [3, 4],
                   [5, 6])
m.forEachColumn((values, column)=> {
  console.log(`column(${column})=${values}`)
})
// column(0)=1,3,5
// column(1)=2,4,6
```

### 遍歷每一列（row）

用 forEachRow 可以遍歷每一行：

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix([1, 2],
                   [3, 4],
                   [5, 6])
m.forEachRow((values, row)=> {
  console.log(`row(${row})=${values}`)
})
// row(0)=1,2
// row(1)=3,4
// row(2)=5,6
```

## 運算

### 行（column）的總和

columnSum() 可以計算某個行的總和：

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix(3, 3, 1)
console.log(m.columnSum(0)) // 3
```

### 列（row）的總和

rowSum() 可以計算某個列的總和，結果是以陣列方式回傳：

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix([1, 2, 3])
console.log(m.rowSum(0)) // 6
```

### 矩陣相乘

矩陣相乘的結果透過新的陣列回傳：

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix([1, 2],
                   [3, 4],
                   [5, 6])
let n = new Matrix([1, 2, 3, 4],
                   [5, 6, 7, 8])
let result = m.multiply(n) // | 11 14 17 20 |
                           // | 23 30 37 44 |
                           // | 35 46 57 68 |
```

也可以將陣列每一個元素乘上一個值：

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix([1, 2, 3],
                   [2, 3, 4],
                   [3, 4, 5])
m.multiply(3) // | 3  6  9 |
              // | 6  9 12 |
              // | 9 12 15 |
```

### 矩陣相加

兩個矩陣相加會將結果透過新的陣列回傳：

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix([1, 2, 3],
                   [2, 3, 4],
                   [3, 4, 5])
let n = new Matrix(3, 3, 1)
let result = n.add(m) // |  0 -1 -2 |
                      //  | -1 -2 -3 |
                      // | -2 -3 -4 |
```

也可以將陣列每一個元素加上一個值：

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix([1, 2, 3],
                   [2, 3, 4],
                   [3, 4, 5])
m.add(1) // | 0 1 2 |
         // | 1 2 3 |
         // | 2 3 4 |
```

### 矩陣相減

兩個矩陣相減會將結果透過新的陣列回傳：

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix([1, 2, 3],
                   [2, 3, 4],
                   [3, 4, 5])
let n = new Matrix(3, 3, 1)
let result = n.subtract(m) // |  0 -1 -2 |
                           // | -1 -2 -3 |
                           // | -2 -3 -4 |
```

也可以將陣列每一個元素減去一個值：

```javascript
const { Matrix } = require('node-dophin')
let m = new Matrix([1, 2, 3],
                   [2, 3, 4],
                   [3, 4, 5])
m.subtract(1) // | 0 1 2 |
              // | 1 2 3 |
              // | 2 3 4 |
```

