import express from 'express';
import {
    acceptFriendRequest,
    sendFriendRequest,
    rejectFriendRequest,
    removeFriend,
    getFriendsList,
    pendingRequests,
    // deleteAll
} from '../Controllers/FriendshipController.js';
import {verify} from '../Utils/WebToken.js';

const router = express.Router();

router.get("/:id", verify, getFriendsList)
router.get("/pending/:id", verify, pendingRequests)
router.post("/sendrequest", verify, sendFriendRequest);
router.patch("/acceptrequest/:id", verify, acceptFriendRequest);
router.delete("/rejectrequest/:id", verify, rejectFriendRequest);
router.post("/remove", verify, removeFriend);
// router.delete("/deleteall", verify, deleteAll);

export default router;