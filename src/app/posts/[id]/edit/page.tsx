'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function EditPostPage() {
    const { id } = useParams()
    const router = useRouter()
    const { data: session, status } = useSession()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(`/api/posts/${id}`)
            if(res.ok) {
                const data = await res.json()
                setTitle(data.title)
                setContent(data.content)
            } else {
                alert('投稿の読み込みに失敗しました')
                router.push('/posts')
            }
            setLoading(false)
        }

        fetchPost()
    }, [id, router])


    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!title || !content) {
            alert('全ての項目を入力してください')
            return
        }

        const res = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        })

        if(res.ok) {
            router.push('/posts')
        } else {
            alert('更新に失敗しました')
        }

        if(status === 'loading' || loading) {
            return <div className="p-6">読み込み中...</div>
        }

        return (
            <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow"> 
                <h1 className="text-2xl font-bold mb-4">記事編集</h1>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block font-semibold">タイトル</label>
                        <input type="text" 
                               className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                               value={title}
                               onChange={(e) => setTitle(e.target.value)} 
                        />
                    </div>
                    
                    <div>
                        <label className="block font-semibold">本文</label>
                        <input type="text" 
                               className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                               value={content}
                               onChange={(e) => setContent(e.target.value)} 
                        />
                    </div>

                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        更新する
                    </button>
                </form>
            </div>
        )




    }




}