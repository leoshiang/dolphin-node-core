# 用 JavaScript 來認識矩陣

---

**Leo Shiang，2022/03/19**

---

[toc]

## 前言

`dolphin-node-core` 是一個 node.js 的套件，由向皓田開發，採用 MIT 授權。

## 建立 node.js 專案

建立專案目錄

```bash
mkdir matrix-test
cd matrix-test
```

建立 node.js 專案

```bash
npm init
```

引用套件

```bash
npm install dolphin-node-core
```

建立 index.js

```bash
echo "const 矩陣 = require('dolphin-node-core')" > index.js
```

後續的範例皆是修改 index.js

執行程式

```bash
node index.js
```

## 建立矩陣

首先引用套件：

```javascript
const 矩陣 = require('dolphin-node-core')
```

接著建立一個 4x3 矩陣，其中 4 代表橫列數目（row），而 3 代表直行數目（column）：

```javascript
const m = new 矩陣(4, 3)
console.log(m)
```

完整程式如下：

```javascript
const 矩陣 = require('dolphin-node-core')
const m = new 矩陣(4, 3)
console.log(m)
```

輸出結果：

> 矩陣(4) [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]

### 賦予初始值

建立矩陣時可以在行列數目的後面加上預設值的參數，如果沒指定，預設值會是 0。如果要建立一個 4x4 的矩陣，裡面元素全部都是 12，可以這樣寫：

```javascript
const 矩陣 = require('dolphin-node-core') 
const m = new 矩陣(4, 4, 12)
console.log(m)
```

輸出結果：

> 矩陣(4) [
>   [ 12, 12, 12, 12 ],
>   [ 12, 12, 12, 12 ],
>   [ 12, 12, 12, 12 ],
>   [ 12, 12, 12, 12 ]
> ]

建立矩陣時可以傳入多個陣列當作初始值，每一個陣列會被當作一個橫列（row）並把值寫入矩陣：

```javascript
const 矩陣 = require('dolphin-node-core') 
const m = new 矩陣(
  								[2, 2, 3, 1], 
  								[4, 5, 6, 3], 
  								[7, 8, 3, 3], 
  								[2, 2, 2, 0])
console.log(m)
```

輸出結果：

> 矩陣(4) [
>   [ 2, 2, 3, 1 ],
>   [ 4, 5, 6, 3 ],
>   [ 7, 8, 3, 3 ],
>   [ 2, 2, 2, 0 ]
> ]

如果傳入的陣列長度不等，缺少的元素會用 0 取代：

```Javascript
const 矩陣 = require('dolphin-node-core') 
const m = new 矩陣(
  								[2, 2],
                  [4, 5, 6, 3],
                 	[7], 
                 	[2, 2, 2, 0])
console.log(m)
```

輸出結果：

> 矩陣(4) [
>   [ 2, 2, 0, 0 ],
>   [ 4, 5, 6, 3 ],
>   [ 7, 0, 0, 0 ],
>   [ 2, 2, 2, 0 ]
> ]

### 存取元素

矩陣本身就是一個陣列，可以用陣列存取方式去取得元素：

> 請注意：因為與陣列相容，因此元素編號是從 0 開始。

```javascript
const 矩陣 = require('dolphin-node-core') 
const m = new 矩陣([8, 0, 1], [0, 3, 5])
```

以下的程式碼將改變 [0,0] 位置的元素：

```javascript
m[0][0] = 3 // 原本是 8
```

### 維度

矩陣的維度可以從 `橫列數`（rows） 和 `直行數`（columns）去取得：

```javascript
const 矩陣 = require('dolphin-node-core') 
const m = new 矩陣([8, 0, 1], [0, 3, 5])
console.log(`橫列數:${m.橫列數}`)
console.log(`直行數:${m.直行數}`)
```

輸出結果：

> 橫列數:2
> 直行數:3

### 橫列與直行

橫列與直行的編號是從 0 開始：

```javascript
const 矩陣 = require('dolphin-node-core') 
let m = new 矩陣([1, 2], [3, 4])
console.log(m)
for (let 橫列編號 = 0; 橫列編號 < m.橫列數; 橫列編號++) {
    console.log(m.橫列(橫列編號))
}
for (let 直行編號 = 0; 直行編號 < m.直行數; 直行編號++) {
    console.log(m.直行(直行編號))
}
```

輸出結果：

> 矩陣(2) [ [ 1, 2 ], [ 3, 4 ] ]
> 向量(2) [ 1, 2 ]
> 向量(2) [ 3, 4 ]
> 向量(2) [ 1, 3 ]
> 向量(2) [ 2, 4 ]

## $A+B=B+A$

矩陣的加法具有交換律：

```javascript
const 矩陣 = require('dolphin-node-core') 
const a = new 矩陣([1, 2],[3, 4])
const b = new 矩陣([4, 5],[6, 7])
console.log(a.加(b).相等(b.加(a)))
```

輸出結果：

> true

## $A-B\neq B-A$

減法不具有交換律，因此 $A - B$ 不等於 $B - A$：

```javascript
const 矩陣 = require('dolphin-node-core') 
const a = new 矩陣([1, 2],[3, 4])
const b = new 矩陣([4, 5],[6, 7])
console.log(a.減(b).相等(b.減(a)))
```

輸出結果：

> false

## $A\left(B+C\right)=\left(A+B\right)+C$

```Javascript
const 矩陣 = require('dolphin-node-core') 
const a = new 矩陣([4, 1], [2, 7])
const b = new 矩陣([6, 7], [8, 9])
const c = new 矩陣([0, 4], [3, 59])
console.log(a.加(b.加(c)).相等(a.加(b).加(c)))
```

輸出結果：

> true

## 與純量相乘

```javascript
const 矩陣 = require('dolphin-node-core') 
const m = new 矩陣([4, 1], [2, 7])
console.log(m.乘(3))
```

輸出結果：

> 矩陣(2) [ [ 12, 3 ], [ 6, 21 ] ]

## $A \times (BC) = (AB) \times C$

```javascript
const 矩陣 = require('dolphin-node-core') 
const a = new 矩陣([1, 2], [3, 4])
const b = new 矩陣([4, 5], [6, 7])
const c = new 矩陣([8, 3], [9, 0])
console.log(a.乘(b.乘(c)).相等(a.乘(b).乘(c)))
```

輸出結果：

> true

## 矩陣相乘 $A_{m\times p}\times B_{p\times n}={(AB)}_{m\times n}$


```javascript
let a = new 矩陣([1, 2], [3, 4], [5, 6])
let b = new 矩陣([1, 2, 3, 4], [5, 6, 7, 8])
console.log(a.乘(b))
```

輸出結果：

> 矩陣(3) [ [ 11, 14, 17, 20 ], [ 23, 30, 37, 44 ], [ 35, 46, 57, 68 ] ]

詳細計算步驟：


$$
\begin{flalign}
\left(\begin{matrix}
1 & 2 \\
3 & 4 \\
5 & 6
\end{matrix}\right)
*
\left(\begin{matrix}
1 & 2 & 3 & 4 \\
5 & 6 & 7 & 8
\end{matrix}\right)
& = \left(\begin{matrix}
1*1+2*5 & 1*2+2*6 & 1*3+2*7 & 1*4+2*8 \\
3*1+4*5 & 3*2+4*6 & 3*3+4*7 & 3*4+4*8 \\
5*1+6*5 & 5*2+6*6 & 5*3+6*7 & 5*4+6*8
\end{matrix}\right)\\
&= \left(\begin{matrix}
11 & 14 & 17 & 20 \\
23 & 30 & 37 & 44 \\
35 & 46 & 57 & 68
\end{matrix}\right)
\end{flalign}
$$

## 單位矩陣

```javascript
const 矩陣 = require('dolphin-node-core') 
let m = 矩陣.單位矩陣(4)
console.log(m)
```

輸出結果：

> 矩陣(4) [
>   [ 1, 0, 0, 0 ],
>   [ 0, 1, 0, 0 ],
>   [ 0, 0, 1, 0 ],
>   [ 0, 0, 0, 1 ]
> ]

## 轉置矩陣

```javascript
const 矩陣 = require('dolphin-node-core') 
let m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 2, 9])
console.log(m.轉置())
```

輸出結果：

> 矩陣(3) [ [ 1, 4, 7 ], [ 2, 5, 2 ], [ 3, 6, 9 ] ]

### $det(M)=\left|\begin{matrix}M^T\\\end{matrix}\right|=\left|\begin{matrix}M\\\end{matrix}\right|$

一個矩陣的行列式等於它的轉置矩陣的行列式：

```Javascript
const 矩陣 = require('dolphin-node-core') 
const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 2, 9])
const 轉置矩陣的行列式 = m.轉置().行列式()
const 矩陣的行列式 = m.行列式()
console.log(轉置矩陣的行列式)
console.log(矩陣的行列式)
console.log(轉置矩陣的行列式 === 矩陣的行列式)
```

輸出結果：

> -36
> -36
> true

### $(M^T)^T=M$

轉置是自身逆運算：

```javascript
const 矩陣 = require('dolphin-node-core') 
const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 9, 8])
m.轉置().轉置().相等(m)
```

輸出結果：

> true

### $(A+B)^T=A^T+B^T$

轉置是從 $m \times n$ 矩陣的向量空間到所有 $n \times m$ 矩陣的向量空間的線性映射：

```javascript
const 矩陣 = require('dolphin-node-core') 
const A = new 矩陣([1, 2, 3], [4, 5, 6], [7, 9, 8])
const B = new 矩陣([3, 2, 1], [9, 1, 2], [5, 0, 3])
console.log(A.加(B).轉置().相等(A.轉置().加(B.轉置())))
```

輸出結果：

> true
>

### $\left(cM\right)^T=cM^T$

純量的轉置是同樣的純量。

```javascript
const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 9, 8])
console.log(m.乘(3).轉置().相等(m.轉置().乘(3)))
```

輸出結果：

> true

### $\left(A\times B\right)^T=B^T\times A^T$

```javascript
const 矩陣 = require('dolphin-node-core') 
const A = new 矩陣([1, 2, 3], [4, 5, 6], [7, 9, 8])
const B = new 矩陣([3, 2, 1], [9, 1, 2], [5, 0, 3])
console.log(A.乘(B).轉置().相等(B.轉置().乘(A.轉置())))
```

輸出結果：

> true

### $A^T=-A$

反對稱矩陣（或稱斜對稱矩陣）是一個方形矩陣，其轉置矩陣和自身的加法反元素相等。

```javascript
const 矩陣 = require('dolphin-node-core') 
const m = new 矩陣([0, 2, -1], [-2, 0, -4], [1, 4, 0])
console.log(m.轉置().相等(m.乘(-1)))
```

輸出結果：

> true

### $A^T=A$

對稱矩陣是一個方形矩陣，其轉置矩陣和自身相等。

```javascript
const 矩陣 = require('dolphin-node-core') 
const m = new 矩陣([1, 2, 3], [2, 4, -5], [3, -5, 6])
console.log(m.轉置().相等(m))
```

輸出結果：

> true

## 冪 $A^n=A \times A... \times A$

### $A^2 B^2=A(AB)B$

```Javascript
const 矩陣 = require('dolphin-node-core') 
const a = new 矩陣([4, 0], [-3, 7])
const b = new 矩陣([1, 3], [6, -6])
console.log(a.冪(2).乘(b.冪(2)).相等(a.乘(a.乘(b)).乘(b)))
```

輸出結果：

> true

### $A^r A^s = A^{(r+s)}$

```javascript
const 矩陣 = require('dolphin-node-core') 
const a = new 矩陣([4, 0], [-3, 7])
console.log(a.冪(2).乘(a.冪(3)).相等(a.冪(2 + 3)))
```

輸出結果：

> true

### $\left(A^r\right)^s=A^{r \times s}$

```Javascript
const 矩陣 = require('dolphin-node-core') 
const a = new 矩陣([2, 1], [3, 7])
console.log(a.冪(2).冪(3).相等(a.冪(2 * 3)))
```

輸出結果：

> true

## 逆矩陣 $A^{-1}$

逆矩陣（inverse matrix），又稱乘法反方陣、反矩陣。在線性代數中，給定一個 $n$ 階方陣，若存在一 $n$ 階方陣 $B$，使得 $AB=BA=I_n$ ，其中 $I_n$ 為 $n$ 階單位矩陣，則稱 $A$ 是可逆的，且 $B$ 是 $A$ 的逆矩陣，記作 $A^{-1}$。 

以下列的矩陣為例，最右邊為逆矩陣的結果：
$$
\left(\begin{matrix}
2 & 2 & 3 & 1 \\
4 & 5 & 6 & 3 \\
7 & 8 & 3 & 3 \\
2 & 2 & 2 & 0
\end{matrix}\right)^{-1}
=
\left(\begin{matrix}
3 & \frac{-4}{3} & \frac{1}{3} & -1 \\
-3 & \frac{7}{6} & \frac{-1}{6} & \frac{5}{4} \\
0 & \frac{1}{6} & \frac{-1}{6} & \frac{1}{4} \\
1 & \frac{-1}{6} & \frac{1}{6} & \frac{-5}{4}
\end{matrix}\right)
=\left(\begin{matrix}
3 & -1.33333 & 0.33333 & -1 \\
-3 & 1.16667 & -0.16667 & 1.25 \\
0 & 0.16667 & -0.16667 & 0.25 \\
1 & -0.16667 & 0.16667 & -1.25
\end{matrix}\right)
$$

```javascript
const 矩陣 = require('dolphin-node-core') 
const m = new 矩陣(
  							 [2, 2, 3, 1], 
                 [4, 5, 6, 3], 
  							 [7, 8, 3, 3],
   							 [2, 2, 2, 0])
const r = m.逆矩陣()
console.log(r.文字表示())
```

輸出結果：

> [
>   [ 3  -1.33333333  0.33333333  -1 ]
>   [ -3  1.16666667  -0.16666667  1.25 ]
>   [ 0  0.16666667  -0.16666667  0.25 ]
>   [ 1  -0.16666667  0.16666667  -1.25 ]
> ]

### $A \times A^{-1} = I$

如果把矩陣乘以逆矩陣應等於單位矩陣：

```javascript
const 矩陣 = require('dolphin-node-core') 
const m = new 矩陣(
    [2, 2, 3, 1],
    [4, 5, 6, 3],
    [7, 8, 3, 3],
    [2, 2, 2, 0])
const r = m.逆矩陣()
console.log(m.乘(r).文字表示())
```

輸出結果：

> [
>   [ 1  0  0  0 ]
>   [ 0  1  0  0 ]
>   [ 0  0  1  0 ]
>   [ 0  0  0  1 ]
> ]

### $(A^{T})^{-1} = (A^{-1})T$

```javascript
const 矩陣 = require('dolphin-node-core') 
const m = new 矩陣(
                  [2, 2, 3, 1],
                  [4, 5, 6, 3],
                  [7, 8, 3, 3],
                  [2, 2, 2, 0])
const r1 = m.轉置().逆矩陣()
const r2 = m.逆矩陣().轉置()
console.log(r1.文字表示())
console.log(r2.文字表示())
```

輸出結果：

> r1= [
>   [ 3  -3  0  1 ]
>   [ -1.33333333  1.16666667  0.16666667  -0.16666667 ]
>   [ 0.33333333  -0.16666667  -0.16666667  0.16666667 ]
>   [ -1  1.25  0.25  -1.25 ]
> ]
>
> r2= [
>   [ 3  -3  0  1 ]
>   [ -1.33333333  1.16666667  0.16666667  -0.16666667 ]
>   [ 0.33333333  -0.16666667  -0.16666667  0.16666667 ]
>   [ -1  1.25  0.25  -1.25 ]
> ]

### $det(A^{-1}) = {{1} \over {det(A)}}$

```javascript
const m = new 矩陣(
                  [2, 2, 3, 1],
                  [4, 5, 6, 3],
                  [7, 8, 3, 3],
                  [2, 2, 2, 0])
const d1 = m.逆矩陣().行列式()
const d2 = 1 / m.行列式()
console.log('d1=', d1)
console.log('d2=', d2)
```

輸出結果：

> r1= 0.08333333333333333
> r2= 0.08333333333333333

### $(AB)^{-1} = B^{-1} A^{-1}$

```javascript
const 矩陣 = require('dolphin-node-core') 
const a = new 矩陣(
    [2, 2, 3, 1],
    [4, 5, 6, 3],
    [7, 8, 3, 3],
    [2, 2, 2, 0])
const b = new 矩陣(
    [3, 2, 3, 0],
    [4, 5, 6, 3],
    [4, 1, 3, 3],
    [2, 6, 9, 0])
const r1 = a.乘(b).逆矩陣()
const r2 = b.逆矩陣().乘(a.逆矩陣())
console.log('r1=', r1.文字表示())
console.log('r2=', r2.文字表示())
```

輸出結果：

> r1= [
>   [ 1.14285714  -0.54761905  0.11904762  -0.25 ]
>   [ -1.28571429  0.3452381  0.01190476  0.625 ]
>   [ 0.71428571  -0.12698413  -0.01587302  -0.5 ]
>   [ -1.80952381  0.79761905  -0.20238095  0.70833333 ]
> ]
>
> r2= [
>   [ 1.14285714  -0.54761905  0.11904762  -0.25 ]
>   [ -1.28571429  0.3452381  0.01190476  0.625 ]
>   [ 0.71428571  -0.12698413  -0.01587302  -0.5 ]
>   [ -1.80952381  0.79761905  -0.20238095  0.70833333 ]
> ]
