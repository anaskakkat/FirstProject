const express = require("express");
const route = express();
const userController = require("../controller/user/userController");
const cartController = require("../controller/user/cartController");
const userAccountController = require("../controller/user/userAccountController");
 const checkoutController=require("../controller/user/checkoutController")
const auth = require("../middlewares/authUser");
const path = require("path");
const session = require("express-session");
const { request } = require("http");
require("dotenv").config();

  


route.use( 
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
); 
route.use(auth.isBlocked)
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



//forgot password page render
route.get("/forgotPassword",auth.isLogout, userController.forgotPassword);
//forgot password page render
route.post("/forgotPassword",userController.forgetEmailCheck);
//forgot otp post
route.post("/forgetVerifyOtpPage",userController.forgetVerifyOtpPage);
//newPasswordVerify
route.post("/newPassword",auth.isLogout, userController.newPasswordVerify);









// user registation 
route.get('/registration',auth.isLogout, userController.signupUser);
// post registration /
route.post('/registration', userController.createUser);

 


// verify otp 
route.post("/otp",userController.verifyOtpPage);
// sign out 
route.get("/userLogout", auth.isLogin,userController.userLogout);
// resend otp 
route.post("/resentOtp",userController.resentOtp);



//show products page----------------.>
route.get("/showProducts", userController.showProducts);
// sigleproduct shwing 
route.get("/showProducts/singleProducts",userController.singleProducts);
// selected category showing
route.get("/catShowProducts/:id", userController.catShowProducts);
 
//add to cart page
route.post("/addToCart/:id", cartController.addToCart); 
//show cart 
route.get('/cart',auth.isBlocked,auth.isLogin, cartController.showCart);
// delete single cart item 
route.get('/cart/deleteCartItem/:id',auth.isLogin, cartController.deleteCart);
//update cart //
route.post('/updateCartItem', cartController.updateCart); 
 


//checkout page  
route.get('/checkout',auth.isBlocked,auth.isLogin, checkoutController.checkout);
// place to order
route.post('/PlaceToOrder',auth.isLogin, checkoutController.PlaceToOrder);
// address save
route.post("/checkoutAddAddress",checkoutController.checkoutAddAddress);
//success page 
route.get('/successPage/:id',auth.isLogin, checkoutController.successPage);
//success page
route.get('/successPage',auth.isLogin, checkoutController.successPage);

//user profile---------->
route.get('/userProfile',auth.isLogin, userAccountController.userProfile);
//user profile update---------->
route.post('/updateProfile', userAccountController.updateProfile);
//user profile update---------->
route.get('/changePassword',auth.isLogin, userAccountController.changePassword);
route.post('/changePassword', userAccountController.saveChangePassword);

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
route.get("/deleteAddress/:id",auth.isLogin,userAccountController.deleteAddress);

// show order page user
route.get("/ordePageUser",auth.isLogin,userAccountController.ordePageUser);
// show user order  details 
route.get("/ordePageUser/userOrderDetails/:orderID",auth.isLogin,userAccountController.userOrderDetails);

//return reason 
route.post("/ordePageUser/userOrderDetails",userAccountController.returnProduct);
//product calceled 
route.post("/ordePageUser/userOrderDetails",userAccountController.canceledProduct);



module.exports = route;
