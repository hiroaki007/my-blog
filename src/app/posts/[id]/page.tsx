import { connectToDatabase } from "@/lib/db";
import Post from "@/models/post";
import { notFound } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";
import Link from "next/link";


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

                <Link
                    href={`/posts/${post._id}/edit`}
                    className="inline-block mr-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    編集する
                </Link>

                <DeleteButton postId={post._id.toString()} author={post.author} />
            </div>
        ) 
        
        } catch (err) {
            console.error('記事詳細エラー:', err)
            return notFound()
        
    }
}
