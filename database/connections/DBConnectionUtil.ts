import mongoose from "mongoose";

export class DBConnectionUtil{

    public static connectToMongoDB(connectionString:string, databaseName : string): Promise<boolean | any>{
        return new Promise((resolve, reject) => {
            mongoose.connect(connectionString, {
                dbName : databaseName
            }).then((response) => {
                if(response){
                    resolve(true);
                }
            }).catch((error) => {
                console.error(error);
                reject(error);
            })
        })
    }
}