'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">
        My Blog
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/posts">記事一覧</Link>
        {session ? (
          <>

            <Link href="/posts/new" className='text-blue-600 hover:underline text-sm'>
              投稿
            </Link>

            <span className="text-sm text-gray-600">こんにちは, {session.user?.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-red-500 hover:underline text-sm"
            >
              ログアウト
            </button>
          </>
        ) : (
          <Link href="/login" className="text-blue-500 hover:underline text-sm">
            ログイン
          </Link>
        )}
      </nav>
    </header>
  )
}
