import mongoose from 'mongoose'


const connectDB = async() => {
   try{
   const connectonInstances = await mongoose.connect(`${process.env.MONGODB_URI}`)
   console.log(`\n MongoDb connected !! DB HOST : ${ connectonInstances.connection.host}`)
   }
   catch(err){
    console.log("MONGODB connection failed",err)
   }
}

export default connectDB