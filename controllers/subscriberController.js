/** @format */

import Subscriber from "../model/subscribe.js";
import { subscriberValidation } from "../validation.js";


//SUBSCRIBE

export const subscribeToNewsletter = async (req, res) => {
	const { error } = subscriberValidation(req.email);
	if (error) return res.status(400).json({ message: error.details[0].message });

	let subscriber = await Subscriber.findOne({
		email: req.email,
	});
	if (subscriber) {
		return res.status(400).json({
			error: true,
			message: "Sorry , you are already subscribed to our newsletter",
		});
	}
	subscriber = req.email;
	const newSubscriber = new Subscriber(subscriber);
	await newSubscriber.save();
	res.status(201).json({ success: true, data: newSubscriber });
};

//ALL SUBSCRIBERS

export const getAllSubscribers = async (req, res) => {
	const subscribers = await Subscriber.find();
	res.status(200).json({ success: true, data: subscribers });
};

//UNSUBSCRIBE

export const unsubscribeToNewsletter = async (req, res) => {
	const { error } = subscriberValidation(req.email);
	if (error) return res.status(400).json({ message: error.details[0].message });

	let subscriber = await Subscriber.findOne({
		email: req.email,
	});
	if (subscriber) {
		await Subscriber.findByIdAndDelete(subscriber.id);
		res.status(200).json({
			success: true,
			message: "Successfully unsubscribed from our newsletter",
		});
	}
	return res.status(404).json({ success: false, message: "No record found for your email" });
};
