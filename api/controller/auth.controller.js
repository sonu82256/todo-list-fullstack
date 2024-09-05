import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "abc123";

export const test = (req, res) => {
    console.log("hello from test");
    res.send("helllo from test");
};

export const signup = async (req, res) => {
    const { name : username, email, password } = req.body;
    console.log(username, email, password)
    const hassedPasswod = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hassedPasswod,
    });

    try {
        await newUser.save();
        console.log("user created successfully");
        res.status(201).json("user created successfully");
    } catch (error) {
        console.log("error singup" + error);
        res.status(409).json("error signup" + error);
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        const validUser = await User.findOne({ email });
        if (!validUser) res.status(404).json("User no found");
        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword) res.status(401).json("Invalid credentials");
        var token = jwt.sign({ id: validUser._id }, JWT_SECRET);
        // console.log(token)
        const { password: pass, ...userWithoutPassword } = validUser._doc;
        // console.log(userWithoutPassword);
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(userWithoutPassword);
    } catch (error) {
        console.log("error signin " + error);
    }
};

export const signout = async (req, res) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json("user has been logged out");
    } catch (error) {
        res.send(error);
    }
}