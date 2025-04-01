import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Post from "@/models/post";

type Props = {
    params: {
        id: string
    }
}


//サーバー側でデータ取得
export default async function PostDetailPage({ params }: Props) {
    const { id } = params

    try {
        await connectToDatabase()
        const post = await Post.findById(id)

        if(!post) return notFound()

        return (
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <div className="text-gray-500 text-sm mb-6">
                    著者: {post.author} | {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <div className="prose max-w-none">{post.content}</div>
            </div>
        ) 
        
        } catch (err) {
            console.error('記事詳細エラー:', err)
            return notFound()
        
    }
}
