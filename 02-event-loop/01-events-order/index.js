
const fs = require('fs');
const fileName = 'solution.txt';

/* fs.open(fileName, 'w', (err, fd) => {
  //fd - это дескриптор файла
}) */

const logger = fs.createWriteStream('solution.txt', { encoding: "utf-8", flags: "w" });

const intervalId = setInterval(() => {
  console.log('James'); //1
  logger.write('James\n');
}, 10);

setTimeout(() => {
  const promise = new Promise((resolve) => {
    console.log('Richard'); //2
    logger.write('Richard\n');
    //fs.appendFileSync(fileName, 'Richard');
    resolve('Robert'); //3
  });

  promise
    .then((value) => {
      console.log(value); //robert
      logger.write(`${value}\n`);

      setTimeout(() => {
        console.log('Michael');//5
        logger.write('Michael\n');

        clearInterval(intervalId);
      }, 10);
    });

  console.log('John');//4
  logger.write('John\n');
  
}, 10);
