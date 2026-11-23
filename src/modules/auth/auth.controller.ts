import { RequestHandler } from "express";
import { authService } from "./auth.service";

const registerUser: RequestHandler = async (req, res) => {
  try {
    const result = await authService.registerUserIntoDB(req.body);
    res.status(201).json({
      status: true,
      message: "Create user successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
};
const loginUser: RequestHandler = async (req, res) => {
  res.status(200).json({ status: true, message: "Login successfully" });
};

export const authController = {
  loginUser,
  registerUser,
};
