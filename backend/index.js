const express = require('express')
const dotenv = require('dotenv')
const connectdb = require('./db');
const cookieParser = require('cookie-parser');
const NotesRouter = require('./routes/NotesRoutes')
const TestimonialRouter= require('./routes/TestimonialRoutes')
const ProfileRouter= require('./routes/ProfileRoutes')
const cloudinary = require('cloudinary').v2;
const cors = require('cors')

dotenv.config();
connectdb();

const app = express()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
}))

//Middleware
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({extended: false, limit: '500mb'}));
app.use(cookieParser());

//Routes
app.use('/api/notes', NotesRouter);
app.use('/api/testimonials', TestimonialRouter);
app.use('/api/profiles', ProfileRouter);

//server listening
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
