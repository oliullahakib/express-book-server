import { RequestHandler } from "express";
import { bookService } from "./book.service";

const createBooks:RequestHandler = async(req,res)=>{
try {
    const result = await bookService.createBooksIntoDB(req.body)
    res.status(201).json({
    statu:true,
    message:"Created Book Succussfully",
    data:result
})
} catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}
const getAllBooks:RequestHandler = async(req,res)=>{
try {
    const result = await bookService.getAllBooksFromDB()
    res.status(200).json({
        statu:true,
        message:"Retrive All Books",
        data:result
    })
} catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}

export const bookController = {
    getAllBooks,
    createBooks
}