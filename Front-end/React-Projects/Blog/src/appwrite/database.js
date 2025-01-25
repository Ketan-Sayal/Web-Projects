import { Client, Databases, ID, Query } from "appwrite";
import config from "../config/config";

export class DatabaseService{
    client = new Client();
    databases;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createDocument({title, userId, featuredImg, content, status, slug}){
        try{
            let  result = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                {
                    title, 
                    userId,
                    featuredImg,
                    content,
                    status,
                    slug,
                }
            );
            if(result){
                return true;
            }
            return false
        }catch(err){
            console.log(err);
        }
    }

    async listDocuments(query = [Query.equal('status', 'active')]){
        try{

            let result = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                query
            )

            if(result) return result;
            return null;

        }catch(err){
            console.log(err);
            
        }
    }

    async getDocument(fileId){
        try{
            let result = await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId, 
                fileId, 
            );
            if(result){
                return result;
            }
            return null;
        }catch(err){
            console.log(err);
        }
    }

    async updateDocument(fileId, {title, featuredImg, content, status, slug}){
        try{
            const result = await this.databases.updateDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                fileId, // documentId
                {
                    title,
                    featuredImg,
                    content,
                    status,
                    slug,
                }
            );
            if(result)return true;
            return false;
        }catch(err){
            console.log(err);
        }
    }
    
    async deleteDocument(fileId){
        try{
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                fileId // documentId
            );
        }catch(err){
            console.log(err);
            
        }
    }

}

const databaseService = new DatabaseService;

export default databaseService;