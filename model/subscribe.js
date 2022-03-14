import mongoose from "mongoose";

const SubscriberSchema = mongoose.Schema({
    email:{
        type:String,
        requred:true,
    },
    date:{
        type:Date,
        default:new Date(),
    }
});

const Subscriber = mongoose.model("Subscriber",SubscriberSchema);



export default Subscriber ;
