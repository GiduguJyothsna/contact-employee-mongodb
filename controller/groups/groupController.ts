import {Request, Response} from "express";
import GroupTable from "../../database/schemas/groupSchema";
import {IGroup} from "../../database/models/IGroup";
import mongoose from "mongoose";

/**
 @usage : create a Group
 @method : POST
 @body : name
 @url : http://localhost:9999/groups/
 */
export const createGroup = async (request: Request, response: Response) => {
    try {
        const {name} = request.body;
        // check if the name exists
        const group = await GroupTable.findOne({name: name}); // select * from groups where name = "asdfsf";
        if (group) {
            return response.status(401).json({msg: "Group is already exists!"});
        }
        const newGroup: IGroup = {
            name: name
        };
        const createdObject = await new GroupTable(newGroup).save(); // INSERT
        if (createdObject) {
            return response.status(201).json(createdObject)
        }
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};

/**
 @usage : to get all groups
 @method : GET
 @body : no-params
 @url : http://localhost:9999/groups
 */
export const getAllGroups = async (request: Request, response: Response) => {
    try {
        const groups: IGroup[] = await GroupTable.find(); // select * from groups
        return response.status(200).json(groups);
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};

/**
 @usage : to get a group
 @method : GET
 @body : no-params
 @url : http://localhost:9999/groups/:groupId
 */
export const getGroup = async (request: Request, response: Response) => {
    try {
        const {groupId} = request.params;
        if (groupId) {
            const mongoGroupId = new mongoose.Types.ObjectId(groupId);
            console.log(mongoGroupId);
            const group = await GroupTable.findById(mongoGroupId); // select * from groups where group_id = "";
            if (!group) {
                return response.status(404).json({msg: 'Group is not found'});
            }
            return response.status(200).json(group);
        }
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};