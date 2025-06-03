import dotenv from "dotenv";
dotenv.config(
    { path: './.env' }
)

import connectDB from "./config/db.config.js";
import { app } from "./app.js";

const port = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(port, () => {
            console.log(`⚙️  Server is listening on port ${port}`);
        })
    })
    .catch((err) => {
        console.error("MongoDB Connection Failed: ", err);
        process.exit(1);
    })