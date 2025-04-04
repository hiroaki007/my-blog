'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function NewPostPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content) {
      alert('タイトルと本文は必須です')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          author: session?.user?.name ?? 'Anonymous',
        }),
      })

      if (res.ok) {
        router.push('/posts')
      } else {
        alert('投稿に失敗しました')
      }
    } catch (err) {
      alert('エラーが発生しました')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return <div className="p-6">セッション確認中...</div>
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">新規投稿</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">タイトル</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold">本文</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 h-40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '投稿中...' : '投稿する'}
        </button>
      </form>
    </div>
  )
}
