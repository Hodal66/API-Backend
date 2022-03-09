import { subscriber } from "../model/subscribe.js";
import { subscriberValidation } from "../validation.js";

//!!get All messages
export const allSubscribes =  async (req, res) => {
    subscriber.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        return res.status(200).json({ title: "All Subscribers", status: 200, messages: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({status: 500, message: "Internal server error" });
      });
  };

//!!Posting new message
export const createNewSubscriber = async (req, res) =>{
    const { error } = subscriberValidation(req.email);

    if (error) return res.status(400).json({status: 400, message: error.details[0].message });
  
    //!!creating new subscriber
    var subscriber = new subscriber({
    
      email: req.body.email,
      
    });
  
    //!!save a message to db
    try {
      const savedSubscriber = await subscriber.save();
      console.log(savedSubscriber.id);
      return res.status(201).json({status:"success", message: "Successfully sent, we will talk soon." });
    } catch (error) {
      console.log(error)
      return res.status(500).json({status: 500, message: "Internal server error" });
    }
}

//!!get one message
export const subscriberDetails = async (req, res) =>{
    const id = req.params.id;

    if (!id) return res.status(404).json({status: 404, message: "subscriber not found" });
  
    subscriber.findById(id)
      .then((result) => {
        return res
          .status(200)
          .json({
          title: "Message details",
          status: 200,
          message: result });
      })
      .catch((err) => {
        console.log(err);
        
        return res
        .status(500)
        .json({status: 500,
         message: "Internal server error"
         });
      });
}

//!!Delete a subscriber
export const deleteSubscriber = async (req, res) =>{
    const id = req.params.id;

    const result = await subscriber.findById(id);
    if (!result) return res.status(404).json({status: 404, message: "Subscriber not found" });
  
    const subscriberDelete = await result.delete();
  
    if (subscriberDelete)
      return res.status(200).json({status: 200, message: "Subscriber successfully deleted" });
  
    return res.status(500).json({status: 500, message: "Internal server error" });
}
