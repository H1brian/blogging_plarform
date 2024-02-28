import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';
// bring router
import blogRoutes from "./routes/blog.js";
import authRoutes from "./routes/auth.js";

// app definition
const app = express();

// connect to database
mongoose.connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('Connected to MongoDB!'));

//middleware
app.use(morgan('dev'));
// app.use(bodyParser.json); 
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

//cors
if (process.env.NODE_ENV == "development") {
    app.use(cors({ origin: `${process.env.CLIENT_URL}`}));
}

//routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

//port
const port = process.env.PORT || 8000; // If nothing be found in the .env, use 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});