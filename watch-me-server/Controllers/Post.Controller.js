const { postUploadService, postGetService, getSinglePostService, updateUserCommentPostService, photoLikeService, photoDownloadCountService } = require("../Services/Post.Service");

exports.postUpload = async (req, res) => {
    try {
        const post = await postUploadService(req.body);

        res.status(200).json({
            status: true,
            message: 'SuccessFully Create Your Post',
            data: post,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};


exports.getPost = async (req, res) => {
    try {

        const allQuery = {}
        if (req.query.titleSearch) {
            allQuery.titleSearch = req.query.titleSearch;
        }
        if (req.query.category) {
            allQuery.category = req.query.category;
        }
        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            console.log(skip, parseInt(limit));
            allQuery.skip = skip;
            allQuery.limit = parseInt(limit);
        };

        const post = await postGetService(allQuery)
        res.status(200).json({
            status: true,
            message: 'SuccessFully Get Your Post',
            data: post,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};


exports.getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await getSinglePostService(id);

        res.status(200).json({
            status: true,
            message: 'SuccessFully Get Your Post',
            data: post,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message,
        });
    }
}

exports.updateUserCommentPost = async (req, res) => {
    try {
        const commentData = req.body;
        const result = await updateUserCommentPostService(commentData);

        res.status(200).json({
            status: true,
            message: 'SuccessFully Comment Your Post',
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};


exports.photoLike = async (req, res) => {
    try {
        const result = await photoLikeService(req.body);
        res.status(200).json({
            status: true,
            message: 'Like Success Fully',
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message,
        })
    }
}

exports.photoDownloadCount = async (req, res) => {
    try {
        const result = await photoDownloadCountService(req.body)
        res.status(200).json({
            status: true,
            message: 'Download Image SuccessFully',
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message,
        })
    }
}


exports.fileUpload = async (req, res) => {
    try {
        res.status(200).json({
            status: true,
            file: req.file,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message,
        })
    }
};