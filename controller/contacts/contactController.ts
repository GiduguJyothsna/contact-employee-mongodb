import {Request, Response} from "express";
import ContactTable from "../../database/schemas/contactSchema";
import {IContact} from "../../database/models/IContact";
import mongoose from "mongoose";

/**
 @usage : create a contact
 @method : POST
 @body : name, imageUrl, email, mobile, company, title, groupId
 @url : http://localhost:9000/contacts/
 */
export const createContact = async (request: Request, response: Response) => {
    try {
        const {name, imageUrl, email, mobile, company, title, groupId} = request.body;
        // check if the mobile number is exists
        const contact = await ContactTable.findOne({mobile: mobile});
        if (contact) {
            return response.status(401).json({msg: "Contact is exist with the mobile number"});
        }
        const newContact: IContact = {
            name: name,
            imageUrl: imageUrl,
            email: email,
            mobile: mobile,
            company: company,
            title: title,
            groupId: groupId
        };
        const createdContact = await new ContactTable(newContact).save(); // INSERT
        if (createdContact) {
            return response.status(201).json(createdContact);
        }
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};

/**
 @usage : to get all contacts
 @method : GET
 @body : no-params
 @url : http://localhost:9000/contacts
 */
export const getAllContacts = async (request: Request, response: Response) => {
    try {
        const contacts: IContact[] = await ContactTable.find().sort({createdAt: "desc"});
        return response.status(200).json(contacts);
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};

/**
 @usage : get a contact
 @method : GET
 @body : no-params
 @url : http://localhost:9000/contacts/:contactId
 */
export const getContact = async (request: Request, response: Response) => {
    try {
        const {contactId} = request.params;
        if (contactId) {
            const mongoContactId = new mongoose.Types.ObjectId(contactId);
            const contact = await ContactTable.findById(mongoContactId);
            if (!contact) {
                return response.status(404).json({msg: "The Contact is not found!"});
            }
            return response.status(200).json(contact);
        }
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};

/**
 @usage : update a contact
 @method : PUT
 @body : name, imageUrl, email, mobile, company, title, groupId
 @url : http://localhost:9000/contacts/:contactId
 */
export const updateContact = async (request: Request, response: Response) => {
    try {
        const {name, imageUrl, email, mobile, company, title, groupId} = request.body;
        const {contactId} = request.params;
        if (contactId) {
            const mongoContactId = new mongoose.Types.ObjectId(contactId);
            // check if the contact is exists
            const contact = await ContactTable.findById(mongoContactId);
            if (!contact) {
                return response.status(404).json({msg: "Contact is not found to update"});
            }
            const newContact: IContact = {
                name: name,
                imageUrl: imageUrl,
                email: email,
                mobile: mobile,
                company: company,
                title: title,
                groupId: groupId
            };
            const updatedContact = await ContactTable.findByIdAndUpdate(mongoContactId, {
                $set: newContact
            }, {new: true});

            if (updatedContact) {
                return response.status(200).json(updatedContact);
            }
        }
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};

/**
 @usage : delete a contact
 @method : DELETE
 @body : no-params
 @url : http://localhost:9999/contacts/:contactId
 */
export const deleteContact = async (request: Request, response: Response) => {
    try {
        const {contactId} = request.params;
        if (contactId) {
            const mongoContactId = new mongoose.Types.ObjectId(contactId);
            const contact = await ContactTable.findById(mongoContactId);
            if (!contact) {
                return response.status(404).json({msg: "The Contact is not found!"});
            }
            // delete the contact
            const deletedContact = await ContactTable.findByIdAndDelete(mongoContactId);
            if (deletedContact) {
                return response.status(200).json({});
            }
        }
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};