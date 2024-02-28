import User from "../models/user.js";
import shortId from "shortid";

const signup = (req, res) => {
    //Check the user exists or not
    User
        .findOne({email: req.body.email})
        .then((err) => {
        if(err) {
            return err.status(400).json({
                error: "Email is taken"
            })
        }})

        const {name, email, password} = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL/profile/username}`;
        let newUser = new User({name, email, password, profile, username});
        console.log(newUser);
        newUser.save().then(() => {
            res.json({
                message: 'Signup success! Please signin.'
            })
        }) .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
            // res.json({
            //     message: 'Signup success! please singin'
            // })
        }

// const signup = (req, res) => {
//     const {name, email, password} = req.body;
//     res.json({
//         user: { name, email, password }
//     });
// }
export default signup;




