import {Pool} from "pg"
import { config } from "../config";

export const pool = new Pool({connectionString:config.connection_string})
const dbinit = ()=>{
try {
    pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR (255) NOT NULL,
        email VARCHAR (255) UNIQUE NOT NULL,
        password VARCHAR (255) NOT NULL,
        role VARCHAR(25) CHECK (role IN ('admin', 'member')) DEFAULT  'member',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `)
        pool.query(`
            CREATE TABLE IF NOT EXISTS books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            author VARCHAR (50) NOT NULL,
            isbn VARCHAR (50) UNIQUE NOT NULL,
            total_copies INT NOT NULL CHECK(total_copies>=0), 
            available_copies INT NOT NULL CHECK(available_copies>=0),

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `)
        console.log("Database connected successfully")
} catch (error) {
   console.log(error) 
}

}

export default dbinit 