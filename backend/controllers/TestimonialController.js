// Import necessary modules and models
const connectdb = require('../db.js');
const Testimonial = require('../models/TestimonialModel.js');
const Profile = require('../models/ProfileModel.js');
const mongoose = require('mongoose');
const express=require('express')
const app=express()
app.use(express.json())
const getAllTestimonials = async (req, res) => {
    try {
        await connectdb();
        const testimonials = await Testimonial.find({});
        
        // Enrich testimonials with current profile pictures/names if available
        const enriched = await Promise.all(testimonials.map(async (t) => {
            if (!t.email) return t.toObject();
            const profile = await Profile.findOne({ email: t.email.toLowerCase() });
            return {
                ...t.toObject(),
                fullname: profile?.name || t.fullname,
                picture: profile?.avatar || t.picture || '/user.svg'
            };
        }));
        
        res.status(200).json({ success: true, testimonials: enriched });
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ success: false, message: 'Error fetching testimonials', error: error.message });
    }
};

const createTestimonial = async (req, res) => {
    try {
        const { fullname, email, message, picture } = req.body;

        // console.log("Received data:", { fullname, email, message, picture }); // Log received data

        await connectdb();
        await Testimonial.create({ fullname, email, message ,picture});
        res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errorList = [];
            for (let e in error.errors) {
                errorList.push(error.errors[e].message);
            }
            res.status(400).json({ success: false, errors: errorList });
        } else {
            console.error('Error creating testimonial:', error);
            res.status(500).json({ success: false, message: "Unable to send message." });
        }
    }
};

module.exports = { getAllTestimonials, createTestimonial };
