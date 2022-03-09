import  mongoose  from "mongoose";
const schema = mongoose.Schema;

const subscribeSchema = new schema(
    {
     
        email: {
            type: String,
            required: true,
            min: 3,
            max: 30,
        },
        date: {
            type: Date,
            default: Date.now,
        }

    },
    {
        timestamps: true,
    }
);
const subsciber = mongoose.model("User", userSchema);
export {subsciber};
