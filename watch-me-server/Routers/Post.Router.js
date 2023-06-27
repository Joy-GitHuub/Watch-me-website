
const express = require('express');
const multer = require('multer');
const path = require("path");
const Router = express.Router();
const postController = require('../Controllers/Post.Controller');
// const uploader = require("../Middleware/uploader");



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/images')
    },
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname).split(",")[0] + "__" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });
const uploadFile = upload.single("image");











Router.route('/post-upload')
    .post(postController.postUpload)
    .get(postController.getPost)


Router.post("/image-upload", uploadFile, postController.fileUpload);


Router.route('/userComment')
    .put(postController.updateUserCommentPost)


Router.route('/photoLike')
    .put(postController.photoLike)


Router.route('/photoDownload')
    .patch(postController.photoDownloadCount)


Router.route('/singlePost/:id')
    .get(postController.getSinglePost)






module.exports = Router;