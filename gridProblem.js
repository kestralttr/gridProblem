


// 9,8,4
// 3,2,5
// 1,6,7

const grid1 = [
  [7,2,10],
  [2,7,10],
  [10,10,10]
];

let compass = [
  [-1,0],
  [-1,1],
  [0,1],
  [1,1],
  [1,0],
  [1,-1],
  [0,-1],
  [-1,-1]
];

// [1,2,3,[4,5]]
// [1,2,3,[4,5]]

// making an array equality checker
let arrayEqualityDetector = function(arr1,arr2) {
  let isEqual = true;
  arr1.forEach(function(el,idx) {
    if(typeof el.constructor == Array && typeof arr2[idx].constructor == Array) {
      isEqual = arrayEqualityDetector(el,arr2[idx]);
    } else if(el !== arr2[idx]) {
      isEqual = false;
    }
  });
  return isEqual;
};

let sampleLists =  [
  [[1,2],[1,1]],
  [[2,2],[2,1]]
];

let sampleNew = [
  [1,1],[1,3]
];

//Should look to loop through the indexLists and loop through each array
//comparing to see if all elements of the array can be found in the
//newList.  If so, you know they are duplicates.
let dupChecker = function(indexLists,newList) {
  let outerMatch = false;
  let innerMatch = false;
  for(i=0;i<indexLists.length;i++) {
    for(j=0;j<indexLists[i].length;j++) {
      for(k=0;k<newList.length;k++) {
        if(arrayEqualityDetector(indexLists[i][j],newList[k]) === true) {
          innerMatch = true;
          break;
        }
      }
      if(innerMatch === true) {
        outerMatch = true;
        innerMatch = false;
      } else {
        outerMatch = false;
      }
      if(outerMatch === false) {
        break;
      }
    }
    if(outerMatch === true) {
      return true;
    }
  }
  return false;
};

console.log(dupChecker(sampleLists,sampleNew));

// console.log(arrayEqualityDetector([1,2],[1,3]));

let gridIterator = function(grid) {
  let solutionIdxs = [];
  let solutions = [];
  let currentVals = [];
  let currentIdxs = [];

  Array.prototype.doesInclude = function(arr) {
    let result = false;
    let foundMatch = true;
    this.forEach(function(el,idx) {
      if(el.length === arr.length) {
        foundMatch = true;
        for (let i = 0; i < arr.length; i++) {
          if(arr[i] !== el[i]) {
            foundMatch = false;
            break;
          }
        }
        if(foundMatch === true) {
          result = true;
        }
      }
    });
    return result;
  };

  grid.forEach(function(outerVal,outerIdx) {
    outerVal.forEach(function(innerVal,innerIdx) {
      currentVals.push(innerVal);
      currentIdxs.push([outerIdx,innerIdx]);
      // console.log(currentVals);
      // console.log(currentIdxs);

      let gridSolver = function(outerIdx,innerIdx) {
        compass.forEach(function(dir) {

          let newOuterIdx = outerIdx + dir[0];
          let newInnerIdx = innerIdx + dir[1];

          if(newOuterIdx >= 0 &&
            newOuterIdx < grid1.length &&
            newInnerIdx >= 0 &&
            newInnerIdx < grid1[0].length &&
            !currentIdxs.doesInclude([newOuterIdx,newInnerIdx])) {
              // console.log(!currentIdxs.includes([newOuterIdx,newInnerIdx]));
              // console.log("new idx: ",[newOuterIdx,newInnerIdx]);
              // console.log("currentIdxs: ",currentIdxs);

              currentVals.push(grid1[newOuterIdx][newInnerIdx]);
              currentIdxs.push([newOuterIdx,newInnerIdx]);

              let currentTotalVal = currentVals.reduce(function(el,sum) {
                return el + sum;
              },0);

              let gridSpaces = grid.length * grid[0].length;

              // NEED TO KEEP TRACK OF CELL INDICES AND ONLY ADD ANSWERS
              // TO SOLUTIONS IF THE CELLS ARE NOT THE EXACT SAME (EVEN
              // IF THE ORDER IS DIFFERENT!!!!)

              if(currentTotalVal === gridSpaces) {
                if(!solutions.doesInclude(currentVals) && dupChecker(solutionIdxs,currentIdxs) === false) {
                  solutions.push([]);
                  solutionIdxs.push([]);
                  currentVals.forEach(function(el) {
                    solutions[solutions.length-1].push(el);
                  });
                  currentIdxs.forEach(function(el) {
                    solutionIdxs[solutionIdxs.length-1].push(el);
                  });
                }
                // console.log(currentVals);
                // console.log("new solution: ",solutions[solutions.length-1][0]);
                // console.log("current values: ",currentVals);
                // console.log("current indices: ",currentIdxs);
                // console.log("solutions: ",solutions);
                currentVals.pop(1);
                currentIdxs.pop(1);
              }
              if(currentTotalVal > gridSpaces) {
                currentVals.pop(1);
                currentIdxs.pop(1);
              }
              if(currentTotalVal < gridSpaces) {
                gridSolver(newOuterIdx,newInnerIdx);
                currentVals.pop(1);
                currentIdxs.pop(1);
              }

            // console.log("val is ", grid1[outerIdx + dir[0]][innerIdx + dir[1]]);
            // console.log("coords are: ", outerIdx + dir[0], innerIdx + dir[1]);
            }
        });
        return;
      };

      gridSolver(outerIdx,innerIdx);
      currentVals = [];
      currentIdxs = [];
    });
  });

  // console.log("INCOMING SOLUTIONS");
  // solutions.forEach(function(el) {
  //   console.log(el[0]);
  // });
  console.log(solutions);
  console.log(solutionIdxs);

};




gridIterator(grid1);
