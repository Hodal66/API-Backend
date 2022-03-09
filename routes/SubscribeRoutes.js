import {
    createNewSubscriber,
    subscriberDetails,
    allSubscribes,
    deleteSubscriber,
} from "../controllers/subscribe.controler";
const router = router();
//get All subscribers
router.get("/", allSubscribes);

// new subscuber
router.post("/subscriber", createNewSubscriber);

//get one subscuber
router.get("/:id", subscriberDetails);

//Delete a subsriber
router.delete("/:id",deleteSubscriber);

export default router;
