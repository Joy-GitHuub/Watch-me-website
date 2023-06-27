const Post = require('../Schema/Post.Schema');
const User = require('../Schema/User.Schema');

exports.postUploadService = async (postInfo) => {
    const post = await Post.create(postInfo);
    const { _id, postedBy } = post;
    const res = await User.updateOne(
        { _id: postedBy },
        { $push: { imagePost: _id } }
    )
    console.log(res);
    return post;
};

exports.postGetService = async (allQuery) => {
    if (allQuery.titleSearch) {
        const searchText = await allQuery.titleSearch.trim()
        const post = await Post.find({ title: { $regex: new RegExp('^' + searchText + '.*', 'i') } }).populate("postedBy").exec();
        return post
    }
    if (allQuery.category) {
        const post = await Post.find(allQuery).sort({ "photo.size": 1 })
            .sort({ "photo.size": 1 })
            .populate("postedBy")
        return post;
    }
    const post = await Post.find({})
        .skip(allQuery.skip)
        .limit(allQuery.limit)
        .sort({ "photo.size": 1 }).populate("postedBy")
    return post
};


exports.getSinglePostService = async (id) => {
    const post = await Post.findOne({ _id: id })
        .populate("comments.commentBy")
        .populate("postedBy")
        // .populate("like")
        .exec();
    const updateView = await Post.updateOne({ _id: id }, { $inc: { view: 1 } })

    return post;
};

exports.updateUserCommentPostService = async (commentInfo) => {
    const { photoID, commentData } = commentInfo;
    const { commentBy } = commentData
    const findFirstComment = await Post.updateOne(
        { _id: photoID, "comments.commentBy": commentBy },
        { $pull: { comments: { commentBy: commentBy } } },
        { upsert: false }, // Upsert // Multi
    );
    console.log(findFirstComment);

    const result = await Post.updateOne({ _id: photoID }, { $push: { comments: commentData } })
    return result;
};


exports.photoLikeService = async (likeInfo) => {
    const { photoID, userID } = await likeInfo;

    const findFirst = await Post.findOne({ _id: photoID, like: userID });
    if (findFirst !== null) {
        const findFirstLike = await Post.updateOne(
            { _id: photoID, like: userID },
            { $pull: { like: userID } },
            { upsert: false }, // Upsert // Multi
        );
        const removeSaveImage = await User.updateOne({ _id: userID },
            { $pull: { saveImage: photoID } },
            { upsert: false },
        );
    } else {
        const result = await Post.updateOne({ _id: photoID },
            { $push: { like: userID } }
        );

        const saveImage = await User.updateOne({ _id: userID },
            { $push: { saveImage: photoID } }
        );
        return result;
    }



};

exports.photoDownloadCountService = async (photoID) => {
    const { id } = await photoID;
    const updateDownload = await Post.updateOne({ _id: id }, { $inc: { downloadCount: 1 } }).exec();
    return updateDownload;
};