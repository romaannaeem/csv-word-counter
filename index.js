const csv = require('csv-parse');
const fs = require('fs');

const array = [];
const inputFile = 'data.csv';
const outputFile = 'output.txt';

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    // console.log(row[0]);
    array.push(row[0]);
  })
  .on('end', () => {
    console.log('CSV file processed');
    let massiveString = array.join();
    let splitWords = splitByWords(massiveString);
    let wordsMap = createWordMap(splitWords);
    let finalWordsArray = sortByCount(wordsMap);

    fs.writeFile(outputFile, JSON.stringify(finalWordsArray), (err) => {
      console.log(err);
    });
  });

const splitByWords = (text) => {
  var wordsArray = text.split(/\s+/);
  return wordsArray;
};

const createWordMap = (wordsArray) => {
  var wordsMap = {};

  wordsArray.forEach(function (key) {
    if (wordsMap.hasOwnProperty(key)) {
      wordsMap[key]++;
    } else {
      wordsMap[key] = 1;
    }
  });

  return wordsMap;
};

const sortByCount = (wordsMap) => {
  var finalWordsArray = [];
  finalWordsArray = Object.keys(wordsMap).map(function (key) {
    return {
      name: key,
      total: wordsMap[key],
    };
  });

  finalWordsArray.sort(function (a, b) {
    return b.total - a.total;
  });

  return finalWordsArray;
};
