import mongoose from "mongoose";
import Conversation from "../Models/conversation.js";
import Message from "../Models/message.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverid } = req.params;
    const senderid = req.user._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderid, receiverid] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderid, receiverid],
      });
    }

    const newmessage = new Message({
      senderid,
      receiverid,
      message,
    });

    if (newmessage) {
      conversation.message.push(newmessage._id);
    }

    await Promise.all([conversation.save(), newmessage.save()]);

    res.status(200).json({
      message: "Message sent successfully",
      success: true,
      newmessage,
    });
  } catch (error) {
    console.log("error in send message ", error);
    return res.status(500).json({
      error: "internal server error",
    });
  }
};
