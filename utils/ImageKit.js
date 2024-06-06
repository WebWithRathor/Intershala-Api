const ImageKit = require("imagekit");

exports.InitImageKit = function () {

    const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_END_POINT_URL
    });
    return imagekit;
}