import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;
    if (!userName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    //profilePic
    const profilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;

    await User.create({
      userName,
      email,
      password: hashedPassword,
      profilePic: profilePhoto,
    });
    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    const tokenData = {
      id: existingUser._id,
      email: existingUser.email,
      userName: existingUser.userName,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000,
        sameSite: "strict",
      })
      .json({
        message: "User logged in successfully",
        success: true,
        _id: existingUser._id,
        userName: existingUser.userName,
        profilePic: existingUser.profilePic,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        maxAge: 0,
      })
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id)// Exclude password
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

export const getUserProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).select("-password"); ;
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  