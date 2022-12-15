const fs = require('fs');
const baseDirectory = '../models';
// const inputPath =
//   '../models/x92cbbd52_79e4_42dc_9076_9220d2d859a9/hasntStartedYet/pointsToMaintain.json';
const landmarkLabelsXY = require('../core/classification/landmarksXY.json');
const glob = require('glob');

var getAllFilesNames = function (src, callback) {
  glob(src + '/**/*', callback);
};
getAllFilesNames(baseDirectory, function (err, res) {
  if (err) {
    console.log('Error', err);
  } else {
    for (let filePath of res) {
      if (filePath.includes('pointsToIgnore.json')) {
        const pointsToMaintain = [0, ...Array.from(Array(28).keys())];
        const landmarksArr = require(filePath);
        let indexes = landmarksArr.map((key) => {
          const index = landmarkLabelsXY.indexOf(key);
          return index;
        });
        indexes.sort((a, b) => a - b);
        for (let i = indexes.length; i >= 0; i--) {
          const index = indexes[i];
          pointsToMaintain.splice(index, 1);
        }
        const jsonObj = JSON.stringify(pointsToMaintain);
        console.log(filePath.slice(0, -19) + 'pointsToMaintain.json');
        console.log(indexes);
        console.log(pointsToMaintain);
        fs.writeFileSync(
          filePath.slice(0, -19) + 'pointsToMaintain.json',
          jsonObj,
          (error) => console.log(error),
        );
      }
    }
  }
});
