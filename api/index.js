const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require('./models/user');

const app = express();
const port = 8000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connection MongoDb
mongoose.connect('mongodb+srv://idankzm:idankzm2468@cluster0.purdk.mongodb.net/', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

app.listen(port, "192.168.1.190", function () {
    console.log("raning" + port)
})

// endpoint to register in app
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if all required fields are present
        if (!name || !email || !password) {
            console.log('Missing required fields');
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Email already registered');
            return res.status(400).json({ message: 'Email already registered' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: passwordHash });
        newUser.verificationToken = crypto.randomBytes(20).toString('hex');
        await newUser.save();
        await sendVerificationEmail(newUser.email, newUser.verificationToken);
        res.status(202).json({ message: 'Registration successful. Please check your email for verification' });
    } catch (error) {
        console.error("Error registering user", error);
        res.status(500).json({ message: 'Registration failed' });
    }
});

// sendVerificationEmail
const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'idankzm@gmail.com',
            pass: 'lpob bwpg smdd fhkb',
        },
    });
    const mailOption = {
        from: 'kazam11@bezeqint.net',
        to: email,
        subject: 'Email Verification',
        text: `Please click the following link to verify your email: http://192.168.1.190:8000/verify/${verificationToken}`,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOption);
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending the verification email:', error);
    }
};

// Endpoint to verify email
app.get('/verify/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: 'Invalid verification token' });
        }

        // Mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Email verification failed' });
    }
});

// generateSecretKey 
const generateSecretKey = () => {
    const SecretKey = crypto.randomBytes(32).toString("hex");
    return SecretKey;
}
const SecretKey = generateSecretKey()

// endpoint to login a user.
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user._id }, SecretKey);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: "Login failed" });
    }
});

// Endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
    try {
        const { userId, address } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.addresses.push({ address });
        await user.save();
        res.status(200).json({ message: "Address created Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding address", error: error.message });
    }
});

// Endpoint to get all the addresses of particular user
app.get("/addresses/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const addresses = user.addresses;
        res.status(200).json({ addresses });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the addresses" });
    }
});



//  user.addresses.push(address);
// await user.save();
