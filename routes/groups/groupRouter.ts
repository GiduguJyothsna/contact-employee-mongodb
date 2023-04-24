import {Router, Request, Response} from 'express';
import {body} from "express-validator";
import * as groupController from "../../controller/groups/groupController";
import {formValidationMiddleware} from "../../middlewares/formValidationMiddleware";

const groupRouter:Router = Router();

/**
 @usage : create a Group
 @method : POST
 @body : name
 @url : http://localhost:9999/groups/
 */
groupRouter.post("/", [
    body('name').not().isEmpty().withMessage("Name is Required")
], formValidationMiddleware, async (request:Request, response:Response) => {
    return await groupController.createGroup(request,response);
})

/**
 @usage : to get all groups
 @method : GET
 @body : no-params
 @url : http://localhost:9999/groups
 */
groupRouter.get("/", async (request:Request, response:Response) => {
    return await groupController.getAllGroups(request,response);
})

/**
 @usage : to get a group
 @method : GET
 @body : no-params
 @url : http://localhost:9999/groups/:groupId
 */
groupRouter.get("/:groupId", async (request:Request, response:Response) => {
    return await groupController.getGroup(request,response);
})

export default groupRouter;