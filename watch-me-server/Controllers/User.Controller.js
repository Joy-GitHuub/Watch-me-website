const { signUpUserService, getSingleUserService, addToCollectionService, getSingleUserInfoService } = require("../Services/User.Service");

module.exports.signUpUser = async (req, res) => {
    try {
        const userInfo = await req.body
        const user = await signUpUserService(userInfo);
        res.status(200).json({
            status: true,
            message: 'SuccessFully Create Your Account',
            data: user,
        });

    } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};


module.exports.getSingleUser = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await getSingleUserService(email);
        res.status(200).json({
            status: true,
            message: 'SuccessFully Get Your Account',
            data: user,
        });

    } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};

module.exports.getSingleUserInfo = async (req, res) => {
    try {
        const { id } = await req.params;
        const user = await getSingleUserInfoService(id);
        res.status(200).json({
            status: true,
            message: 'SuccessFully Get Your Account',
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message,
        });
    }
}


module.exports.addToCollection = async (req, res) => {
    try {
        const photoDetails = await req.body;
        const result = await addToCollectionService(photoDetails);

        res.status(200).json({
            status: true,
            message: "SuccessFully Add To Collection",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message,
        });
    }
};