import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  port: process.env.PORT,
  connection_string:process.env.DATABASE_URL,
  access_token_secret:process.env.ACCESS_TOKEN_SECRET as string,
  refresh_token_secret:process.env.REFRESH_TOKEN_SECRET as string
};
