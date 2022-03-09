import { Contact } from "../model/contactUs.js";
import { subsciber } from "../model/subscribe.js";
import { contactValidation } from "../validation.js";

//!!get All subscibes
export const allSubscribes=  async (res) => {
    Contact.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        return res.status(200).json({ title: "All Subsribes", status: 200, messages: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({status: 500, message: "Internal server error" });
      });
  };
  
  const subsciber = newsubsciber({
    email: req.body.email,
    
  });

  //!!saving asubsciber to database
//   try {
//     const savedsubssubsciber = awaitsubsciber.save();
    // res.send(saved subssubsciber);
//     return res.status(201).json({
//       status: 201,
    
//       email:subsciber.email,
     
//     });
//   } catch (error) {
//     return res.status(400);
//   }
// });


//!!get one 
export const sub_details = async (req, res) =>{
    const id = req.params.id;

    if (!id) return res.status(404).json({status: 404, message: "subscriber not found" });
  
    Contact.findById(id)
      .then((result) => {
        return res
          .status(200)
          .json({
          title: "subscribtion details",
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

//!!Delete a Message
export const sub_remove = async (req, res) =>{
    const id = req.params.id;

    const result = await Contact.findById(id);
    if (!result) return res.status(404).json({status: 404, message: "subscriber not found" });
  
    const contactDelete = await result.delete();
  
    if (contactDelete)
      return res.status(200).json({status: 200, message: "subscriber successfully deleted" });
  
    return res.status(500).json({status: 500, message: "Internal server error" });
}
