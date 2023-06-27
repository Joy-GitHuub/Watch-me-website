const express = require('express');
const Router = express.Router();
const userController = require('../Controllers/User.Controller');


Router.route('/sign-up')
    .patch(userController.signUpUser)

Router.route('/userPostAddToCollection')
    .patch(userController.addToCollection)

Router.route('/me/:email')
    .get(userController.getSingleUser)

Router.route('/userInfo/:id')
    .get(userController.getSingleUserInfo)



module.exports = Router;