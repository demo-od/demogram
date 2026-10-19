import mongoose from "mongoose";

export default async function connectDB() {
    try {
        mongoose.connection.on('connected', () => console.log('Connected to the database'))
        await mongoose.connect(`${process.env.MONGODB_URL}/demogram`)
    } catch (error) {
        console.log(error.message)
    }
}