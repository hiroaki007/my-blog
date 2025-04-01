import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db";
import Post from "../../../models/post";


//GET: 全記事取得
export async function GET() {
    try {
        await connectToDatabase()
        const posts = await Post.find().sort({ createdAt: -1 })
        return NextResponse.json(posts)
    } catch (error) {
        console.error('GET /api/posts error:', error)
        return NextResponse.json(
            { message: '投稿の取得に失敗しました'},
            { status: 500 }
        )
    }
}

// POST: 新規投稿作成
export async function POST(req: Request) {
    try {
        const body = await req.json()

        //バリデーション
        if(!body.title || !body.content || !body.author) {
            return NextResponse.json(
                { message: 'タイトル、内容、著者は必須です'},
                { status: 400 }
            )
        }

        await connectToDatabase()
        const newPost = await Post.create(body)
        return NextResponse.json(newPost, { status: 201 })
    } catch (error) {
        console.error('POST /api/posts error', error)
        return NextResponse.json(
            { message: '投稿の作成に失敗しました'},
            { status: 500 }
        )
    }
}
