const express = require("express");
const route = express();
const userController = require("../controller/user/userController");
const cartController = require("../controller/user/cartController");
const userAccountController = require("../controller/user/userAccountController");
const auth = require("../middlewares/authUser");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

 


route.use( 
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
); 

// route.use(auth.isLoggedIn);

route.use(express.static(path.join(__dirname,'..','public','uploads')))
// set view engine
route.set("view engine", "ejs"); 
route.set("views", path.join(__dirname, "..", "views", "user"));

//home page
route.get("/",  userController.sendHome);

// login user 
route.get("/userLogin", auth.isLogout, userController.loginUser);
// login submit 
route.post("/userLogin", userController.login);



// user registation 
route.get('/registration',auth.isLogout, userController.signupUser);
// post registration /
route.post('/registration', userController.createUser);

 

// otp page render 
route.get("/otp",userController.otpPage);
// verify otp 
route.post("/otp",userController.verifyOtpPage);
//  otp resend
// sign out 
route.get("/userLogout", auth.isLogin,userController.userLogout);

//show products page
route.get("/showProducts", userController.showProducts);
// sigleproduct shwing 
route.get("/showProducts/singleProducts", userController.singleProducts);
// selected category showing
route.get("/catShowProducts/:id", userController.catShowProducts);

//add to cart page
route.post("/addToCart/:id", cartController.addToCart);
//show cart
route.get('/cart',auth.isLogin, cartController.showCart);
// delete single cart item 
route.get('/cart/deleteCartItem/:id',auth.isLogin, cartController.deleteCart);
//update cart //
route.post('/updateCartItem', cartController.updateCart);



//checkout page 
route.get('/checkout',auth.isLogin, cartController.checkout);

//user profile
route.get('/userProfile',auth.isLogin, userAccountController.userProfile);
// showadd address page
route.get("/address",auth.isLogin, userAccountController.showAddress);
// add address  page
route.get("/addAddress", auth.isLogin,userAccountController.addAddress);
// save address database 
route.post("/addAddress",userAccountController.saveAddress);
//edite address 
route.get("/editAddress/:id", auth.isLogin,userAccountController.editAddress);
// update address 
route.post("/updateAddress/:id",userAccountController.updateAddress);
//delete address
route.get("/deleteAddress/:id",userAccountController.deleteAddress);



module.exports = route;
