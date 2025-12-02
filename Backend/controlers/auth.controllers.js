import gentoken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Check username
        const checkUserByUserName = await User.findOne({ userName });
        if (checkUserByUserName) {
            return res.status(400).json({ message: "userName already exists" });
        }

        // Check email
        const checkUserByEmail = await User.findOne({ email });
        if (checkUserByEmail) {
            return res.status(400).json({ message: "email already exists" });
        }

        // Password length
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be a minimum of 6 characters" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword
        });

        const token = await gentoken(newUser._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: false
        });

        return res.status(201).json(newUser);

    } catch (error) {
        return res.status(500).json({ message: `signup error ${error}` });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkUserByEmail = await User.findOne({ email });
        if (!checkUserByEmail) {
            return res.status(400).json({ message: "user does not exist" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "password must be a minimum of 6 characters" });
        }

        const isMatch = await bcrypt.compare(password, checkUserByEmail.password);
        if (!isMatch) {
            return res.status(400).json({ message: "incorrect password" });
        }

        const token = await gentoken(checkUserByEmail._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: false
        });

        return res.status(200).json(checkUserByEmail);

    } catch (error) {
        return res.status(500).json({ message: `login error ${error}` });
    }
};
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "logout successfully" });
    } catch (error) {
        return res.status(500).json({ message: `logout error ${error}` });
    }
};
