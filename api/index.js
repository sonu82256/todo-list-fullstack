import express from 'express'
import mongoose from 'mongoose';
import userRoutes from './routues/auth.routes.js'
import taskRoutes from './routues/task.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv';
import path from 'path';

const app = express();
dotenv.config();

const __dirname = path.resolve();

app.use(cors({
    origin:  'https://todo-list-fullstack-xxoz.onrender.com' ,  // allow requests from this origin 'https://todo-list-fullstack-xxoz.onrender.com' || 'http://localhost:5173'
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

app.use(express.static(path.join(__dirname, '/client/dist')));

 app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
 })

app.listen(process.env.PORT || 4001, ()=>{
    console.log(`Server is running on port ${process.env.PORT }`)
})
