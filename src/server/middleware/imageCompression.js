const sharp = require("sharp");

const compressImages = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.buffer)
        .resize(640, 320)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toBuffer()
        .then((data) => {
          // TODO: limit size of file
          req.body.images.push(data);
        })
        .catch((err) => console.log(err));
    })
  );
  next();
};

module.exports = compressImages;
