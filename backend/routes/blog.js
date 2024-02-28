import express from "express";
import time from "../controllers/blog.mjs";

const router = express.Router()

router.get('/', time);

// router.get('/index', (req, res) => {
//     res.send('THis is an another site')
// });

export default router;