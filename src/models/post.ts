import mongoose, { Schema, Document, models, model } from "mongoose";

//TypeScriptの型定義
export interface IPost extends Document {
    title: string
    content: string
    author: string
    createdAt: Date
    updatedAt: Date
    tags?: string[]
    isPublished: boolean
}


//スキーマ定義
const PostSchema: Schema = new Schema<IPost>(
    {
        title: { type: String, required: true, trin: true },
        content: { type: String, required: true },
        author: { type: String, required: true },
        tags: [{ type: String }],
        isPublished: { type: Boolean, default: true },
    },

    {
        timestamps: true,
    }
)

//モデルの重複定義を防ぐ
const Post = models.Post || model<IPost>('Post', PostSchema)
export default Post