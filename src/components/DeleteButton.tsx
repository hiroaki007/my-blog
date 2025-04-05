'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type Props = {
    postId: string
    author: string
}

export default function DeleteButton({ postId, author }: Props) {
    const { data: session } = useSession()
    const router = useRouter()

    const handleDelete = async () => {
        if(!confirm('本当に削除しますか？')) return

        const res = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
        })

        if(res.ok) {
            router.push('/posts')
        } else {
            alert('削除に失敗しました')
        }
    }

    // ログインしていて、投稿者本人でなければ表示しない
    if(session?.user?.name !== author) return null

    return (
        <button onClick={handleDelete} className="mt-6 px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition">
            削除する
        </button>
    )

}