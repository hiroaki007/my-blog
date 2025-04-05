import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";



export const authOptions = {
    providers: [
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],      

    callbacks: {
        async signIn({ user }) {

            const allowedEmails = ['blackcoff0722@gmail.com']

            if(allowedEmails.includes(user.email!)) {
                return true
            }

            console.warn('ログイン拒否: 許可されていないユーザー', user.email)
            return false
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
}


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }