import mongoose from "mongoose";
import Conversation from "../Models/conversation.js";
import Message from "../Models/message.js";
import crypto from 'crypto'



const encryptMessage = (text) => {
  const iv = crypto.randomBytes(16); 
  const secretKey = Buffer.from(process.env.CRYPTO_SECRET_KEY, "utf-8").slice(0, 32);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(secretKey, "hex"), iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted; 
};




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


// Decryption function
const decryptMessage = (encryptedText) => {
  try {
    const textParts = encryptedText.split(":");
    if (textParts.length !== 2) throw new Error("Invalid encrypted message format");
    
    const secretKey = Buffer.from(process.env.CRYPTO_SECRET_KEY, "utf-8").slice(0, 32);
    const iv = Buffer.from(textParts[0], "hex");
    const encryptedData = textParts[1];

    const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
    let decrypted = decipher.update(encryptedData, "hex", "utf-8");
    decrypted += decipher.final("utf-8");

    return decrypted;
  } catch (error) {
    console.error("Error decrypting message:", error);
    return "Decryption failed"; // Handle error gracefully
  }
};

// 📩 Get Messages (Decryption Applied)
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

    // 🔓 Decrypt messages before sending to frontend
    // const decryptedMessages = messages.map((msg) => ({
    //   ...msg._doc,
    //   message: decryptMessage(msg.message),
    // }));

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