
// const WInCO3oPxm3SnMFU
const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_CONN;

  const connectDB = async () => {
    try {
        await mongoose.connect(mongo_url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log(" MongoDB Connected");
    } catch (error) {
        console.error(" MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = {connectDB}