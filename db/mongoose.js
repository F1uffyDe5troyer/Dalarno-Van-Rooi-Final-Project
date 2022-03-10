require('dotenv').config()

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
})
.catch(err => {
    console.error("Connection error", err);
    process.exit();
});