const cors = require('cors');
const express = require('express'); 
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const taskRouter=require('./Router/taskRouter')
const app = express();
const corsOptions = {
    origin: 'https://task-scheduler-kohl.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


mongoose.connect('mongodb+srv://pratikdayma45:LzJlylhbT6B09Fqd@cluster0.cpq5ooo.mongodb.net/Task_Scheduler')
    .then(() => { 
        console.log('DB Connected Successfully'); 
    })
    .catch((e) => { 
        console.log('Error connecting DB', e); 
    });


app.use('/api/user', taskRouter);


app.listen(8000, () => { 
    console.log('Server is running At port 8000'); 
});