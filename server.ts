import express , {Request, Response, Application} from 'express';
import contactRouter from "./routes/contacts/contactRouter";
import groupRouter from "./routes/groups/groupRouter";
import dotEnv from "dotenv";
import {loggerMiddleware} from "./middlewares/loggerMiddleware";
import {DBConnectionUtil} from "./database/connections/DBConnectionUtil";

const app:Application = express();

// configure dotenv
dotEnv.config({path : "./.env"})

const port:number | undefined | string = process.env.PORT || 6000;
const databaseUrl:string | undefined = process.env.MONGO_DB_CLOUD_URL;
const databaseName:string | undefined = process.env.DATABASE_NAME;

// configure express to read form data
app.use(express.json());

// configure the logger middleware
app.use(loggerMiddleware);

app.get("/", (request:Request, response:Response) => {
    response.status(200);
    response.json({
        msg : "Welcome to Express JS"
    });
});

// configure the routes
app.use('/contacts', contactRouter);
app.use('/groups', groupRouter);

if(port && databaseUrl && databaseName){
    app.listen(Number(port), () => {
        DBConnectionUtil.connectToMongoDB(databaseUrl, databaseName).then((response) => {
            if(response){
                console.log("Connected to DB Successfully");
            }
        }).catch((error) => {
            console.log(error, "Unable to Connect!");
            process.exit(0); // force stop node server
        });
        console.log(`Express server is Started at ${port}`);
    });
}
