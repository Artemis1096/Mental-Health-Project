import mongoose from "mongoose";
import Conversation from "../Models/conversation.js";
import Message from "../Models/message.js";
import {io, getReceiverSocketId} from '../socket/socket.js';

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverid } = req.params;
    const senderid = req.user._id;
    const msg=message;
    
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
      message:msg,
    });

    if (newmessage) {
      conversation.message.push(newmessage._id);
    }

    await Promise.all([conversation.save(), newmessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverid);
    if(receiverSocketId){
      // console.log("wroking");
      io.to(receiverSocketId).emit("newMessage", newmessage);
    }

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


export const getMessage = async (req, res) => {
  try {
    const { id: receiverid } = req.params;
    const senderid = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderid, receiverid },
        { senderid: receiverid, receiverid: senderid },
      ],
    });

    res.status(200).json({
      messages: messages,
    });
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};