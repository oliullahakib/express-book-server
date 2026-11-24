import { pool } from "../../db";
import { IBooks } from "./book.interface";

const createBooksIntoDB = async (payload: IBooks) => {
  const { title, description, author, isbn, total_copies, available_copies } =
    payload;
    try {
        const result = await pool.query(`
            INSERT INTO books (title, description, author, isbn, total_copies, available_copies) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
            `,[title, description, author, isbn, total_copies, available_copies])
            return result.rows[0]
    } catch (error:any) {
      throw new Error(error.message);  
    }
};

const getAllBooksFromDB = async () => {
  try {
    const result = await pool.query(`
        SELECT * FROM books 
        `);
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const bookService = {
  getAllBooksFromDB,
  createBooksIntoDB
};
