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
const subscriber = mongoose.model("subscriber", userSchema);
export {subscriber};
