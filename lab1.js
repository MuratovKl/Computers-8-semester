'use strict';

const groupSizes = [7, 2];

class Matrix {
  constructor() {
    // this.groups = [ [0, 1], [2, 3, 4], [5, 6, 7] ];
    this.groups = []; // groups of nodes
    this.selectedNodes = []; // nodes that already grouped
    // this.m = [
    //   [0, 0, 0, 0, 0, 1, 0, 0],
    //   [0, 0, 0, 1, 0, 0, 0, 1],
    //   [0, 0, 0, 0, 1, 0, 1, 0],
    //   [0, 1, 0, 0, 0, 1, 0, 1],
    //   [0, 0, 1, 0, 0, 0, 1, 0],
    //   [1, 0, 0, 1, 0, 0, 0, 0],
    //   [0, 0, 1, 0, 1, 0, 0, 1],
    //   [0, 1, 0, 1, 0, 0, 1, 0]
    // ];
    // this.m = [
    //   [0, 2, 3, 0, 0, 0, 0],
    //   [2, 0, 1, 0, 0, 0, 0],
    //   [3, 1, 0, 1, 0, 1, 0],
    //   [0, 0, 1, 0, 1, 3, 0],
    //   [0, 0, 0, 1, 0, 0, 3],
    //   [0, 0, 1, 3, 0, 0, 1],
    //   [0, 0, 0, 0, 3, 1, 0]
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
    // this.m = [
    //   [0, 0, 3, 0, 2, 0, 0, 0, 2, 3, 0, 1, 4, 0, 3, 2, 2, 0, 4, 0, 4, 2, 2, 0, 0, 0, 0, 0, 2, 2],
    //   [0, 0, 1, 0, 2, 0, 0, 4, 0, 2, 0, 4, 1, 0, 3, 1, 0, 0, 4, 4, 0, 1, 0, 3, 3, 0, 0, 0, 0, 4],
    //   [3, 1, 0, 0, 2, 2, 3, 3, 0, 0, 4, 0, 3, 0, 4, 2, 3, 0, 0, 0, 0, 0, 4, 1, 4, 4, 3, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 1, 0, 4, 4, 0, 4, 1, 0, 0, 1, 0, 0, 3, 4, 2, 3, 0, 0, 3, 0, 0, 0, 0, 1, 2],
    //   [2, 2, 2, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 0, 0, 0, 4, 3, 3, 4, 0, 4, 0, 4, 4],
    //   [0, 0, 2, 1, 1, 0, 4, 0, 1, 3, 0, 0, 0, 3, 0, 0, 2, 0, 0, 1, 0, 0, 1, 1, 3, 0, 0, 3, 0, 0],
    //   [0, 0, 3, 0, 2, 4, 0, 3, 4, 1, 0, 0, 0, 3, 0, 4, 0, 0, 0, 4, 0, 0, 3, 0, 1, 0, 4, 0, 3, 0],
    //   [0, 4, 3, 4, 0, 0, 3, 0, 0, 3, 0, 4, 3, 1, 0, 0, 0, 0, 1, 3, 0, 4, 0, 3, 3, 2, 1, 0, 3, 0],
    //   [2, 0, 0, 4, 0, 1, 4, 0, 0, 2, 1, 0, 2, 3, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 4, 0, 0, 4, 1, 1],
    //   [3, 2, 0, 0, 0, 3, 1, 3, 2, 0, 2, 0, 1, 0, 0, 3, 0, 0, 1, 0, 0, 3, 0, 2, 0, 0, 0, 3, 0, 1],
    //   [0, 0, 4, 4, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 4, 0, 0, 0, 4, 0, 0, 1, 0, 0],
    //   [1, 4, 0, 1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 3, 0, 2, 2, 2, 0, 0, 1, 4, 0, 0, 2, 3, 0, 0, 0],
    //   [4, 1, 3, 0, 0, 0, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 3, 3, 1, 3, 0, 0, 4, 0, 0, 2, 0, 0, 0, 3, 0, 0, 3, 0, 3, 3, 0, 0, 4, 3, 1],
    //   [3, 3, 4, 1, 1, 0, 0, 0, 1, 0, 0, 3, 0, 2, 0, 1, 2, 4, 0, 3, 2, 2, 4, 0, 2, 0, 0, 0, 0, 0],
    //   [2, 1, 2, 0, 0, 0, 4, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 2, 0, 1, 1, 1, 0, 4, 0, 2, 1, 1, 1, 3],
    //   [2, 0, 3, 0, 4, 2, 0, 0, 0, 0, 1, 2, 0, 0, 2, 0, 0, 2, 1, 0, 1, 0, 3, 3, 4, 2, 3, 0, 1, 0],
    //   [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 4, 2, 2, 0, 0, 0, 2, 0, 3, 1, 4, 1, 0, 0, 0, 1],
    //   [4, 4, 0, 4, 0, 0, 0, 1, 0, 1, 3, 2, 0, 3, 0, 0, 1, 0, 0, 2, 4, 3, 0, 0, 4, 1, 2, 2, 2, 0],
    //   [0, 4, 0, 2, 0, 1, 4, 3, 2, 0, 0, 0, 0, 0, 3, 1, 0, 0, 2, 0, 3, 0, 1, 1, 0, 0, 0, 4, 2, 0],
    //   [4, 0, 0, 3, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 2, 1, 1, 2, 4, 3, 0, 0, 4, 1, 0, 1, 1, 4, 0, 0],
    //   [2, 1, 0, 0, 4, 0, 0, 4, 0, 3, 0, 1, 3, 3, 2, 1, 0, 0, 3, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0],
    //   [2, 0, 4, 0, 3, 1, 3, 0, 0, 0, 0, 4, 0, 0, 4, 0, 3, 3, 0, 1, 4, 0, 0, 1, 4, 0, 0, 0, 4, 0],
    //   [0, 3, 1, 3, 3, 1, 0, 3, 0, 2, 0, 0, 1, 3, 0, 4, 3, 1, 0, 1, 1, 1, 1, 0, 0, 2, 0, 2, 0, 0],
    //   [0, 3, 4, 0, 4, 3, 1, 3, 4, 0, 4, 0, 0, 3, 2, 0, 4, 4, 4, 0, 0, 1, 4, 0, 0, 1, 3, 2, 0, 3],
    //   [0, 0, 4, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 2, 1, 1, 0, 1, 0, 0, 2, 1, 0, 4, 0, 1, 0],
    //   [0, 0, 3, 0, 4, 0, 4, 1, 0, 0, 0, 3, 0, 0, 0, 1, 3, 0, 2, 0, 1, 2, 0, 0, 3, 4, 0, 3, 0, 3],
    //   [0, 0, 0, 0, 0, 3, 0, 0, 4, 3, 1, 0, 0, 4, 0, 1, 0, 0, 2, 4, 4, 0, 0, 2, 2, 0, 3, 0, 2, 0],
    //   [2, 0, 0, 1, 4, 0, 3, 3, 1, 0, 0, 0, 0, 3, 0, 1, 1, 0, 2, 2, 0, 0, 4, 0, 0, 1, 0, 2, 0, 0],
    //   [2, 4, 0, 2, 4, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0]
    // ];
  }

  // check if element not in selectedNodes
  notSelected(el) {
    return this.selectedNodes.indexOf(el) === -1 ? true : false;
  }

  calcRowSum(row) {
    return this.m[row].reduce((acc, el, i) => {
      if(this.notSelected(i)) {
        acc += el;
      }
      return acc;
    });
  }

  // select element with smallest row sum
  selectElement() {
    let selectedIndex;
    let maxSum = Infinity;
    this.m.forEach((el, i) => {
      if(this.notSelected(i)) {
        let rowSum = this.calcRowSum(i);
        if(rowSum < maxSum) {
          selectedIndex = i;
          maxSum = rowSum;
        }
      }
    });
    return selectedIndex;
  }

  // create group from elements related to row
  groupRelated(row, n) {
    let group = [row];
    let related = [];
    this.m[row].forEach((el, i) => {
      if(this.notSelected(i) && el !== 0) {
        related.push(i);
      }
    });
    if(related.length < n-1) {
      for(let i = 0; (i < related.length) && (related.length < n-1); i++) {
        for(let j = 0; (j < this.m[related[i]].length) && (related.length < n-1); j++) {
          if(this.notSelected(j) && this.m[related[i]][j] !== 0) {
            if(related.indexOf(j) === -1 && j != row) {
              related.push(j);
            }
          }
        }
      }
    }
    group.push(...related);
    return group;
  }

  // sum links outside group 
  sumOutsideLinks(el, group) {
    let rowSum = this.calcRowSum(el);
    let insideLinks = group.reduce((acc, groupEl) => acc += this.m[el][groupEl], 0);
    return rowSum - insideLinks;
  }

  sumLinksBetweenElAndGroup(el, group) {
    return group.reduce((acc, groupEl) => acc += this.m[el][groupEl], 0);
  }
  
  // reduce group size if bigger than pattern
  reduceGroup(group, n) {
    while(group.length > n) {
      let elToDelete;
      let maxLinks = -1;
      group.forEach((el, i) => {
        let curLinks = this.sumOutsideLinks(el, group);
        if(curLinks > maxLinks) {
          maxLinks = curLinks;
          elToDelete = i;
        }
      });
      group.splice(elToDelete, 1);
    }
  }

  // group elements according to pattern
  makeGroups(pattern) {
    let groups = [];
    for(let n of pattern) {
      let selectedElement = this.selectElement();
      console.log(selectedElement);
      let curGroup = this.groupRelated(selectedElement, n);
      if(curGroup.length !== n) {
        this.reduceGroup(curGroup, n);
      }
      this.selectedNodes.push(...curGroup);
      this.groups.push(curGroup);
    }
  }

  calcDeltaR(colEl, rowEl) {
    let colGroup, rowGroup;
    let sum = 0;
    this.groups.forEach((group) => {
      if(group.indexOf(colEl) !== -1) {
        colGroup = group;
      }
      if(group.indexOf(rowEl) !== -1) {
        rowGroup = group;
      }
    });
    sum += this.sumLinksBetweenElAndGroup(colEl, rowGroup);
    sum -= this.sumLinksBetweenElAndGroup(colEl, colGroup);
    sum += this.sumLinksBetweenElAndGroup(rowEl, colGroup);
    sum -= this.sumLinksBetweenElAndGroup(rowEl, rowGroup);
    sum -= 2 * this.m[colEl][rowEl];
    return sum;
  }

  switchElements(colEl, rowEl) {
    let index;
    this.groups.forEach((group) => {
      if((index = group.indexOf(colEl)) !== -1) {
        group[index] = rowEl;
      } else if((index = group.indexOf(rowEl)) !== -1) {
        group[index] = colEl
      }
    });
  }

  // optimize groups made by makeGroups method
  optimizeGroups() {
    this.groups.forEach((group, i) => {
      while(true) {
        let maxR = -Infinity;
        let colSelected, rowSelected;
        let iterableElements = [];
        this.groups.slice(i+1).forEach((el) => {
          iterableElements.push(...el);
        });
        group.forEach((colEl, j) => {
          iterableElements.forEach((rowEl, k) => {
            let deltaR = this.calcDeltaR(colEl, rowEl);
            if(deltaR > maxR) {
              maxR = deltaR;
              colSelected = colEl;
              rowSelected = rowEl;
            }
          });
        });
        if(maxR > 0) {
          this.switchElements(colSelected, rowSelected);
          console.log(this.groups);
          console.log('=====================')
        } else {
          break;
        }
      }
    });
  }
}

const generateGroups = (sizes, numberOfElements) => {
  let groupSizes = sizes.slice().sort((a, b) => b - a);
  let curPattern = [];
  let patterns = [];
  let curIndex = 0;
  let sum = 0;

  while(curIndex < groupSizes.length) {
    do {
      sum += groupSizes[curIndex];
      curPattern.push(groupSizes[curIndex]);
    } while(sum < numberOfElements)
    if(sum === numberOfElements) {
      patterns.push(curPattern);
      curPattern = [];
      sum = 0;
      curIndex++;
    } else {
      sum -= groupSizes[curIndex];
      curPattern.pop();
      curIndex++;
    }
  }
  return patterns;
};

const matrix = new Matrix();
let patterns = generateGroups(groupSizes, 30);
for(pattern of patterns) {
  matrix.makeGroups(pattern);
  matrix.optimizeGroups();
}
// matrix.makeGroups([5, 5, 5, 5, 5, 5]);
// matrix.optimizeGroups();