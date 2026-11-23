import { config } from "../../config";
import { pool } from "../../db";
import { IUser } from "./auth.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUserIntoDB = async (payload: IUser) => {
  try {
    const { name, email, password, role } = payload;
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `
        INSERT INTO users (name,email,password,role)
        VALUES ($1, $2, $3, COALESCE($4,'member')) RETURNING *
        `,
      [name, email, hashPassword, role ?? null],
    );
    delete result.rows[0].password;
    return result.rows[0];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  try {
    const user = await pool.query(
      `
    SELECT * FROM users WHERE email = $1
    `,
      [email],
    );
    if (user.rowCount === 0) {
      throw new Error("User does't exist");
    }
    const isPasswordValid = bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credantial");
    }
    const jwtPayload = {
      id: user.rows[0].id,
      eamil: user.rows[0].email,
      name: user.rows[0].name,
    };
    const accessToken = jwt.sign(jwtPayload, config.access_token_secret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(jwtPayload, config.refresh_token_secret, {
      expiresIn: "10d",
    });

    delete user.rows[0].password;
    return {accessToken,refreshToken, user:user.rows[0]};
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const authService = {
  registerUserIntoDB,
  loginUserIntoDB,
};
