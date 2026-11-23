import { pool } from "../../db";
import { IUser } from "./auth.interface";

const registerUserIntoDB = async(payload:IUser)=>{

try {
    const {name,email,password,role}=payload
    const result = await pool.query(`
        INSERT INTO users (name,email,password,role)
        VALUES ($1, $2, $3, COALESCE($4,'member')) RETURNING *
        `,[name,email,password,role ?? null])
        delete result.rows[0].password
        return result.rows[0]
} catch (error:any) {
  throw new Error(error.message) 
}

}

export const authService = {
    registerUserIntoDB
}