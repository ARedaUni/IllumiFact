const sharp = require('sharp');
const fs = require('fs');
const directory = './public/images';

fs.readdirSync(directory).forEach(file => {
  sharp(`${directory}/${file}`)
    .resize(352, 224) // width, height
    .toFile(`${directory}/${file}-desktopimg.jpg`);
  });