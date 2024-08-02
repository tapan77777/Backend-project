
import dotenv from "dotenv";
import express from 'express';
import connectDB from "./db/index.js";

const app = express()

dotenv.config({
    path : './env'
})



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`server is running on port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGODB connection FAILD!!!", err)
})





















// import express from express;

// const app = express()

// (async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

//         app.on("error", (error)=>{
//             console.log("ERROR : ", error);
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`app is listing onport: ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.log("ERROR:",error)
//         throw error
//     }
// })()