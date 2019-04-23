'use strict';

class Matrix {
  constructor() {
    this.rowSums = []; // суммы по строкам исходной матрицы (ро)
    this.grouped = [0]; // сгруппированные элементы (изначально группа - первый элемент)
    this.sizeX = 6; // ширина матрицы группировки
    this.sizeY = 5; // высота матрицы группировки
    // this.m = [
    //   [0, 0, 0, 3, 0, 0, 2, 3, 0],
    //   [0, 0, 2, 0, 2, 0, 0, 0, 0],
    //   [0, 2, 0, 1, 0, 0, 0, 0, 0],
    //   [3, 0, 1, 0, 0, 5, 0, 0, 0],
    //   [0, 2, 0, 0, 0, 2, 0, 0, 4],
    //   [0, 0, 0, 5, 2, 0, 5, 0, 0],
    //   [2, 0, 0, 0, 0, 5, 0, 6, 2],
    //   [3, 0, 0, 0, 0, 0, 6, 0, 0],
    //   [0, 0, 0, 0, 4, 0, 2, 0, 0]
    // ];
    this.m = [
      [0, 0, 0, 0, 0, 0, 4, 3, 2, 3, 1, 2, 3, 2, 0, 0, 3, 0, 2, 0, 2, 0, 0, 0, 0, 4, 4, 0, 2, 0],
      [0, 0, 0, 4, 0, 0, 0, 2, 3, 0, 0, 3, 0, 2, 3, 0, 0, 0, 2, 3, 0, 0, 0, 3, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 3, 0, 0, 1, 3, 0, 1, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0],
      [0, 4, 0, 0, 3, 0, 1, 1, 0, 2, 0, 0, 3, 2, 0, 3, 0, 0, 4, 0, 3, 4, 1, 0, 0, 0, 0, 0, 3, 0],
      [0, 0, 0, 3, 0, 2, 4, 4, 0, 0, 0, 4, 2, 0, 1, 0, 2, 4, 3, 0, 2, 0, 0, 1, 0, 0, 2, 0, 3, 0],
      [0, 0, 1, 0, 2, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 1, 2, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0],
      [4, 0, 0, 1, 4, 3, 0, 3, 0, 3, 0, 0, 0, 0, 4, 2, 4, 0, 0, 4, 4, 1, 0, 0, 2, 2, 2, 1, 4, 0],
      [3, 2, 0, 1, 4, 0, 3, 0, 0, 0, 2, 4, 0, 0, 0, 1, 0, 0, 0, 0, 2, 2, 4, 4, 0, 1, 0, 0, 4, 1],
      [2, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 4, 3, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
      [3, 0, 0, 2, 0, 0, 3, 0, 4, 0, 0, 0, 0, 0, 0, 4, 2, 0, 4, 0, 0, 0, 0, 0, 1, 0, 4, 0, 3, 0],
      [1, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 4, 3, 4, 0, 4, 1, 0, 0, 0, 3, 3, 2, 4, 0, 0, 3],
      [2, 3, 3, 0, 4, 0, 0, 4, 0, 0, 0, 0, 4, 2, 0, 2, 3, 0, 0, 0, 3, 3, 0, 0, 0, 4, 0, 3, 3, 3],
      [3, 0, 0, 3, 2, 3, 0, 0, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 4, 0, 0, 0],
      [2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 3, 0, 3, 1, 0, 3, 1, 4, 3, 0, 0, 0, 4, 0, 0],
      [0, 3, 1, 0, 1, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 2, 4, 3, 1, 0, 0, 2, 0, 3, 4, 0, 0, 4],
      [0, 0, 3, 3, 0, 3, 2, 1, 1, 4, 3, 2, 1, 3, 0, 0, 0, 1, 0, 0, 0, 0, 4, 0, 1, 0, 4, 0, 2, 2],
      [3, 0, 0, 0, 2, 0, 4, 0, 4, 2, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 3, 0, 4, 2, 2, 0, 0],
      [0, 0, 1, 0, 4, 0, 0, 0, 3, 0, 0, 0, 0, 3, 2, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 4, 4, 0],
      [2, 2, 0, 4, 3, 1, 0, 0, 1, 4, 4, 0, 0, 1, 4, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 3, 1, 0, 4],
      [0, 3, 0, 0, 0, 2, 4, 0, 0, 0, 1, 0, 2, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 0, 0, 0, 0, 0],
      [2, 0, 0, 3, 2, 0, 4, 2, 0, 0, 0, 3, 0, 3, 1, 0, 2, 2, 0, 1, 0, 0, 0, 2, 3, 1, 0, 1, 0, 0],
      [0, 0, 0, 4, 0, 1, 1, 2, 0, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 0, 0, 4, 0, 3],
      [0, 0, 3, 1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 4, 1, 0, 2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4],
      [0, 3, 0, 0, 1, 0, 0, 4, 0, 0, 3, 0, 2, 3, 2, 0, 3, 0, 0, 3, 2, 3, 4, 0, 3, 0, 0, 0, 4, 3],
      [0, 2, 0, 0, 0, 0, 2, 0, 2, 1, 3, 0, 0, 0, 0, 1, 0, 0, 0, 3, 3, 4, 0, 3, 0, 4, 0, 3, 4, 3],
      [4, 0, 3, 0, 0, 0, 2, 1, 0, 0, 2, 4, 0, 0, 3, 0, 4, 2, 1, 0, 1, 0, 0, 0, 4, 0, 0, 0, 2, 3],
      [4, 0, 0, 0, 2, 0, 2, 0, 0, 4, 4, 0, 4, 0, 4, 4, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
      [0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 3, 0, 4, 0, 0, 2, 4, 1, 0, 1, 4, 0, 0, 3, 0, 0, 0, 0, 1],
      [2, 0, 3, 3, 3, 0, 4, 4, 0, 3, 0, 3, 0, 0, 0, 2, 0, 4, 0, 0, 0, 0, 0, 4, 4, 2, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 0, 0, 4, 2, 0, 0, 4, 0, 0, 3, 4, 3, 3, 3, 2, 1, 1, 0]
    ];
  }

  sumRowLength() {
    this.m.forEach((row, i) => {
      this.rowSums[i] = row.reduce((acc, el, i) => acc += el); // сумма элементов строки
    });
  }

  summarizeK(i) {
    let sumGrouped = 0;
    this.grouped.forEach((el) => {
      sumGrouped += this.m[i][el];
    });
    return 2 * sumGrouped - this.rowSums[i];
  }

  countAllK() {
    let maxK = -Infinity;
    let k = {};
    let indexes = [];

    this.m.forEach((row, i) => {
      if(this.grouped.indexOf(i) === -1) {
        let tmpK = this.summarizeK(i);
        k[i] = tmpK;
        if(tmpK > maxK) {
          maxK = tmpK;
        }
      }
    });
    for(let key in k) {
      if(k[key] === maxK) {
        indexes.push(+key);
      }
    }
    return indexes;
  }

  calcDistance(i, j) {
    let x1 = Math.floor(i % this.sizeX);
    let y1 = Math.floor(i / this.sizeY);
    let x2 = Math.floor(j % this.sizeX);
    let y2 = Math.floor(j / this.sizeY);
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  calcElL(el, i) {
    let l = 1 / this.rowSums[el];
    let acc = 0;
    for(let j = 0; j < this.m.length; j++) {
      let secondIndex = this.grouped.indexOf(j);
      if(i === secondIndex) {
        secondIndex = this.grouped.indexOf(el);
      }
      acc += this.m[el][j] * this.calcDistance(i, secondIndex);
    }
    return l * acc;
  }

  grouping() {
    this.sumRowLength();
    while(this.grouped.length < this.m.length) {
      let indexes = this.countAllK();
      this.grouped.push(...indexes);
    }
  }

  findPretenders(row) {
    let sumx = 0; // координата x
    let sumy = 0; // координата y
    this.m[row].forEach((el, i) => {
      let elGroupedIndex = this.grouped.indexOf(i);
      sumx += el * Math.floor(elGroupedIndex % this.sizeX);
      sumy += el * Math.floor(elGroupedIndex / this.sizeY);
    });
    sumx *= 1 / this.rowSums[row];
    sumy *= 1 / this.rowSums[row];
    let xf = Math.floor(sumx);
    let xc = Math.ceil(sumx);
    let yf = Math.floor(sumy);
    let yc = Math.ceil(sumy);
    let pretenders = new Set();
    pretenders.add(yf * this.sizeX + xf);
    pretenders.add(yf * this.sizeX + xc);
    pretenders.add(yc * this.sizeX + xf);
    pretenders.add(yc * this.sizeX + xc);
    return [...pretenders];
  }

  calcDeltaL(original, pretender) {
    let delta = 0;
    let originalValue = this.grouped[original];
    let pretenderValue = this.grouped[pretender];
    delta += this.calcElL(originalValue, original);
    delta += this.calcElL(pretenderValue, pretender);
    delta -= this.calcElL(originalValue, pretender);
    delta -= this.calcElL(pretenderValue, original);
    return delta;
  }

  switchElements(selected, replacer) {
    let tmp = this.grouped[selected];
    this.grouped[selected] = this.grouped[replacer];
    this.grouped[replacer] = tmp;
  }

  calcQ() {
    let sum = 0;
    this.grouped.forEach((el, i) => {
      for(let j = 0; j < this.m.length; j++) {
        sum += this.m[el][this.grouped[j]] * this.calcDistance(i, j);
      }
    });
    console.log(sum / 2);
  }

  optimize() {
    let allL = [];
    this.grouped.forEach((el, i) => {
      allL.push(this.calcElL(el, i))
    });
    let maxL = Math.max(...allL);
    let selectedIndex = allL.indexOf(maxL);
    let pretenders = this.findPretenders(this.grouped[selectedIndex]);
    let maxDeltaL = -Infinity;
    let maxDeltaIndex;
    pretenders.forEach((el) => {
      let curDeltaL = this.calcDeltaL(selectedIndex, el);
      if(curDeltaL > maxDeltaL) {
        maxDeltaL = curDeltaL;
        maxDeltaIndex = el;
      }
    });
    console.log(maxDeltaL);
    if(maxDeltaL >= 0.5) {
      this.switchElements(selectedIndex, maxDeltaIndex);
      this.calcQ();
      return true;
    }
    return false;
  }
}

const matrix = new Matrix();
matrix.grouping();
matrix.calcQ();
// matrix.optimize();
while(matrix.optimize()) {}
