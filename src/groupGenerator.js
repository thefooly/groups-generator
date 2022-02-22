const fs = require('fs');
const readline = require('readline');
const seeded = require('seed-random');

module.exports = ({
  inputPath,
  outputPath,
  seed,
  groupsNumber,
}) => {
  const randomNumber = seed ? seeded(seed) : seeded();
  const randomInteger = (min, max) => Math.floor(randomNumber() * max) + min;
  const initializeGroupArray = (size) => {
    const array = [];
    for (let i = 0; i < size; i += 1) {
      array.push([]);
    }
    return array;
  };

  const readFile = (filePath) => new Promise((resolve) => {
    const records = [];
    const fileStream = fs.createReadStream(filePath);

    const reader = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    reader.on('line', (line) => records.push(line));
    reader.on('close', () => resolve(records));
  });

  const randomGroups = (records) => {
    const groups = initializeGroupArray(groupsNumber);

    let currentGroup = 0;
    while (records.length > 0) {
      const position = randomInteger(0, records.length);
      const element = records.splice(position, 1)[0];

      groups[currentGroup].push(element);
      currentGroup += 1;
      if (currentGroup === groupsNumber) {
        currentGroup = 0;
      }
    }

    return groups;
  };

  readFile(inputPath)
    .then(randomGroups)
    .then((groups) => {
      const fileContent = groups.reduce((acc, group) => `${acc} ${group.join(', ')} \n`, '');
      fs.writeFileSync(outputPath, fileContent);
    });
};
