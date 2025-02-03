import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true,
        maxLength : 20
    },
    content : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
}, {timestamps : true});

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;