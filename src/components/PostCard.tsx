import { IPost } from '@/models/post'
import Link from 'next/link'

type Props = {
    post: IPost
}

export default function PostCard({ post}: Props) {
    return (
        <div className='bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition'>
            <h2 className='text-xl font-semibold mb-2'>{post.title}</h2>
            <p className='text-sm text-gray-600 line-clamp-3'>{post.content}</p>

            <div className='mt-4 text-sm text-gray-500'>
                著者:{post.author} / {new Date(post.createdAt).toLocaleDateString()}
            </div>

            <Link href={`/post/${post._id}`} className='text-blue-500 text-sm mt-2 inline-block'>
                → 記事を読む
            </Link>
        </div>
    )
}

