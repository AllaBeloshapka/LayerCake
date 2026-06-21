const sharp = require("sharp");

async function convertToWebP(buffer) {
  return sharp(buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
}

module.exports = { convertToWebP };
