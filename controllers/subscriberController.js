import Subscriber from "../model/subscribe.js";
import { subscriberValidation } from "../validation.js";

// export const allSubscribers = async (res) => {
//     // const subscribers = await Subscriber.find();
//     // res.status(200).json({ success: true, data: subscribers });
//     return res.Json({status:"tested"})
// };

//SEE ALL SUBSCRIBERS
// export const allSubscribers = async (req, res) => {
//   Subscriber.find()
//     .sort({ createdAt: -1 })
//     .then((res) => {
//       return res.status(200).json({status: 200, title: "All subscribers"});
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500);
//     });
// }

// ///////\\\!!subscribe
// export const newSubscriber = async (req, res) =>{
//     const { error } = subscriberValidation(req.email);

//     if (error) 
//     return res.status(400).json({status: 400, message: error.details[0].message });
  
//     //!!creating new subscriber
//     var subscriber = new Subscriber({
      
//       email: req.body.email,
      
//     });
  
//     //!!save a subscriber to db
//     try {
//      const savedSubscriber = await subscriber.save();
//       return res.status(201).json({status:"success", message: "Successfully Subscribed" });
//     } catch (error) {
      
//       return res.status(500).json({status: 500, message: "Internal server error" });
//     }
// }

// //!!unsubscribe
// export const unsubscribe = async (req, res) =>{
//     const id = req.params.email;

//     const result = await Subscribe.findById(email);
//     if (!result) 
//     return res
//     .status(404)
//     .json({status: 404, message: "User not found" });
  
//     const subDelete = await result.delete();
  
//     if (subDelete)
//       return res
//       .status(200)
//       .json({status: 200, message: "You have successfully Unsubscribed" });
  
//     return res
//     .status(500)
//     .json({status: 500, message: "Internal server error" });
// }




/** @format */

export const subscribeToNewsletter = async (req, res) => {
	const { error } = subscriberValidation(req.body);
	if (error) return res.status(400).json({ message: error.details[0].message });

	let subscriber = await Subscriber.findOne({
		email: req.body.email,
	});
	if (subscriber) {
		return res.status(400).json({
			error: true,
			message: "Sorry , you are already subscribed to our newsletter",
		});
	}
	subscriber = req.body;
	const newSubscriber = new Subscriber(subscriber);
	await newSubscriber.save();
	res.status(201).json({ success: true, data: newSubscriber });
};

export const getAllSubscribers = async (req, res) => {
	const subscribers = await Subscriber.find();
	res.status(200).json({ success: true, data: subscribers });
};

export const unsubscribeToNewsletter = async (req, res) => {
	const { error } = subscriberValidation(req.body);
	if (error) return res.status(400).json({ message: error.details[0].message });

	let subscriber = await Subscriber.findOne({
		email: req.body.email,
	});
	if (subscriber) {
		await Subscriber.findByIdAndDelete(subscriber.id);
		res.status(200).json({
			success: true,
			message: "Successfully unsubscribed from our newsletter",
		});
	}
	return res
		.status(404)
		.json({ success: false, message: "No record found for your email" });
};
