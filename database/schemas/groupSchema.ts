import mongoose from "mongoose";
import {IContact} from "../models/IContact";

const groupSchema = new mongoose.Schema<IContact>({
    name: {type: String, required: true, unique: true},
}, {timestamps: true});

const GroupTable = mongoose.model('groups', groupSchema);
export default GroupTable;