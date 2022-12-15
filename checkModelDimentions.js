const fs = require('fs');
const baseDirectory = '../models';
// const inputPath =
//   '../models/x92cbbd52_79e4_42dc_9076_9220d2d859a9/hasntStartedYet/pointsToMaintain.json';
const landmarkLabelsXY = require('../core/classification/landmarksXY.json');
const glob = require('glob');

const getAllFilesNames = function (src, callback) {
  glob(src + '/**/*', callback);
};
getAllFilesNames(baseDirectory, function (err, res) {
  if (err) {
    console.log('Error', err);
  } else {
    for (let filePath of res) {
      if (filePath.includes('/pointsToMaintain.json')) {
        const pointsToMaintain = require(filePath);
        const model = require(filePath.slice(0, -21) + 'model.json');
        const expectedInputSize =
          model.modelTopology.config.layers[0].config.batch_input_shape[1];
        const actualInputSize = pointsToMaintain.length;
        if (actualInputSize !== expectedInputSize) {
          console.log({actualInputSize, expectedInputSize}, filePath);
        }
      }
    }
  }
});
