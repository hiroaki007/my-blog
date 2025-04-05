export const dynamic = 'force-dynamic'

import { connectToDatabase } from '@/lib/db'
import Post from '@/models/post'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

// GET: 投稿取得
export async function GET(req: NextRequest, context: any) {
  try {
    const id = context.params?.id
    if (!id) {
      return NextResponse.json({ message: 'IDがありません' }, { status: 400 })
    }

    await connectToDatabase()
    const post = await Post.findById(id)

    if (!post) {
      return NextResponse.json({ message: '見つかりません' }, { status: 404 })
    }


    return NextResponse.json(post)
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json({ message: '取得に失敗しました' }, { status: 500 })
  }
}

// PUT: 投稿更新
export async function PUT(req: NextRequest, context: any) {
  try {
    const id = context.params?.id
    const { title, content } = await req.json()

    if (!id || !title || !content) {
      return NextResponse.json({ message: '不正な入力' }, { status: 400 })
    }

    await connectToDatabase()
    const post = await Post.findById(id)
    if (!post) {
      return NextResponse.json({ message: '見つかりません' }, { status: 404 })
    }

    // ✅ 投稿者とログインユーザーの一致をチェック
    const session = await getServerSession(authOptions)
    if (!session || post.author !== session.user?.name) {
      return NextResponse.json({ message: '認証エラー' }, { status: 403 })
    }

    // ✅ 編集OK → 更新
    const updated = await Post.findByIdAndUpdate(
      id,
      { title, content, updatedAt: new Date() },
      { new: true }
    )

    return NextResponse.json(updated)
  } catch (error) {
    console.error('PUT error:', error)
    return NextResponse.json({ message: '更新に失敗しました' }, { status: 500 })
  }
}


export async function DELETE(req: NextResponse, context: any ) {
    try {
        const id = context.params?.id 
        if(!id) {
            return NextResponse.json({ message: 'IDがありません'}, { status: 400 })

        }

        await connectToDatabase()
        const post = await Post.findById(id)
        if(!post) {
            return NextResponse.json({ message: '見つかりません'}, { status: 404 })
        }

        const session = await getServerSession(authOptions)
        if(!session || post.author?.trim() !== session.user?.name?.trim()) {
            return NextResponse.json({ message: '認証エラー'}, { status: 403 })
        }

        await Post.findByIdAndDelete(id)
        return NextResponse.json({ message: '削除に成功しました'})
    } catch (error) {
        console.error('DELETE error', error)
        return NextResponse.json({ message: '削除に失敗しました'}, { status: 500 })
    }
}