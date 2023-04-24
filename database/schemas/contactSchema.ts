import mongoose from "mongoose";
import {IContact} from "../models/IContact";

const contactSchema = new mongoose.Schema<IContact>({
    name : {type : String, required : true},
    imageUrl : {type : String, required : true},
    mobile : {type : String, required : true, unique : true},
    email : {type : String, required : true},
    company : {type : String, required : true},
    title : {type : String, required : true},
    groupId : {type : String, required : true},
}, {timestamps : true});

const ContactTable = mongoose.model('contacts', contactSchema);
export default ContactTable;