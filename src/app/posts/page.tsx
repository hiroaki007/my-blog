'use client'

import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { IPost } from '@/models/post'
import PostCard from '@/components/PostCard'


export default function PostsPage() {
    const { data: posts, error, isLoading } = useSWR<IPost[]>(`/api/posts`, fetcher)

    if(isLoading) return <div className="p-5">読み込み中...</div>
    if(error) return <div className="p-5 text-red-500">データの取得に失敗しました</div>

    return (
        <div className='max-w-4xl mx-auto p-5'>
            <h1 className='text-2xl font-bold mb-6'>記事一覧</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {posts?.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    )

}