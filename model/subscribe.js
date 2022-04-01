import mongoose from 'mongoose'



const SubscriberSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: new Date()
	},
});



const News = mongoose.model('News', newsSchema);
export default News;