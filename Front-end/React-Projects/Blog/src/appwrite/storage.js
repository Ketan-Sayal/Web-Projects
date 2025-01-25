import { Client, ID, Storage } from "appwrite";
import config from "../config/config";

export class StorageService{
    client = new Client();
    storage;
    
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId); 

        this.storage = new Storage(this.client);
    }

    async createFile(file){
        try{
            const result = await this.storage.createFile(
                config.appwriteStorageId,
                ID.unique(),
                file
            );
            if(result){
                return result;
            }
            return null;
        }catch(err){
            console.log(err);
        }
    }

    async deleteFile(fileId){
        try{
            return await this.storage.deleteFile(
                config.appwriteStorageId,
                fileId
            );
        }catch(err){
            console.log(err);
            
        }
    }
    
    async getFilePreview(fileId){
        let response = this.storage.getFilePreview(
            config.appwriteStorageId,
            fileId
        );
        if(response){
            return response
        }
        return null;
    }

}

const storageService = new StorageService;

export default storageService;