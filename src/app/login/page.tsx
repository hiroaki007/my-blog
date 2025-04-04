'use client'

import { signIn, useSession } from "next-auth/react"
import { useEffect} from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect (() => {
        if(status === 'authenticated') {
            router.push('/')
        }
    }, [status, router])


    return (
        <div>
            <div>
                <h1>ログイン</h1>
                <button onClick={() => signIn('github', { callbackUrl: '/' })}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    GitHubでログイン
                </button>
            </div>
        </div>
    )



}
