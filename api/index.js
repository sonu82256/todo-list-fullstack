import express from 'express'
import mongoose from 'mongoose';
import userRoutes from './routues/auth.routes.js'
import taskRoutes from './routues/task.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv';


const app = express();
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',  // allow requests from this origin
    credentials: true,  // allow sending cookies with requests
}));


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('mongodb connected')
}).catch((err) => {
    console.log(err)
})

// app.use('/api/test', (req,res)=> {
//     console.log('test successfull');
//     res.send('test working')
// } )

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', userRoutes);
app.use('/api/task', taskRoutes)

app.listen(process.env.PORT || 4001, ()=>{
    console.log(`Server is running on port ${process.env.PORT }`)
})
