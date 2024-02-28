import express from "express";
import signup from "../controllers/auth.mjs";
// validation
import runValidation from "../validators/index.js";
import userSignupValidator from "../validators/auth.js";

const router = express.Router()

// 1. user hits up the "/signup page"
// 2. validate the req field firstly
// 3. then handling the error, if on error, excute the 'singup‘
router.post('/signup', userSignupValidator, runValidation, signup);
// router.post('/signup', signup);


export default router;