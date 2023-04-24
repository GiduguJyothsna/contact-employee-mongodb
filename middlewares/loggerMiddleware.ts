import {Request, Response, NextFunction} from "express";

interface Logger{
    requestUrl : string;
    method : string;
    requestTime : string;
    requestDate : string;
}

export const loggerMiddleware = (request:Request, response:Response, next:NextFunction) => {

    const logger:Logger = {
        requestUrl : request.url,
        method : request.method,
        requestTime : new Date().toLocaleTimeString(),
        requestDate : new Date().toLocaleDateString()
    };

    console.log(`URL : ${logger.requestUrl} - METHOD : ${logger.method} - DATE : ${logger.requestDate} - TIME : ${logger.requestTime}`)
    next(); // must
};