import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

export class Service {
    client;
    databases;
    bucket;
    account;

    constructor() {
        if (
            !conf.appwriteUrl ||
            !conf.appwriteProjectId ||
            !conf.appwriteDatabaseId ||
            !conf.appwriteCollectionId ||
            !conf.appwriteBucketId
        ) {
            throw new Error("Appwrite configuration is missing required values. Check conf.js.");
        }

        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        this.account = new Account(this.client);
    }

    // Create a new post
    async createPost({ title, slug, content, featuredImage, status, userId, userName }) {
        if (!title || !slug || !content || !userId || !userName) {
            console.error("Appwrite service :: createPost :: Missing required fields");
            return null;
        }

        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    userName,
                }
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error.message || error);
            return null;
        }
    }

    // Update an existing post
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error.message || error);
            return null;
        }
    }

    // Delete a post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error", error.message || error);
            return false;
        }
    }

    // Get a single post by slug
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error.message || error);
            return null;
        }
    }

    // Get multiple posts (defaults to status=active)
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error", error.message || error);
            return null;
        }
    }

    // Upload a file to storage bucket
    async uploadFile(file) {
        if (!file) {
            console.error("Appwrite service :: uploadFile :: No file provided.");
            return null;
        }

        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error.message || error);
            return null;
        }
    }

    // Delete a file from storage bucket
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deleteFile :: error", error.message || error);
            return false;
        }
    }

    // Get a file preview URL
    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.error("Appwrite service :: getFilePreview :: error", error.message || error);
            return null;
        }
    }

    // Get currently logged-in user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error.message || error);
            return null;
        }
    }
}

// Export a singleton instance
const service = new Service();
export default service;
