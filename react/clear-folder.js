const fs = require('fs');
const files = fs.readdirSync('./src/assets/images/cryptologo/eth');
const targetDir = './src/assets/images/cryptologo';

for (let i = 0; i < files.length; i++) {
  console.log(files[i]);
  fs.unlinkSync(`${targetDir}/${files[i]}`);
}

console.log('done');