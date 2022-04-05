import { useSession, signIn, signOut } from 'next-auth/react'

export default function New({  }) {
    const { data: session } = useSession();
    if (session) {
        retrun (
            <>
                Signed in as: {session.user.email} <br />
                <button onClick={() => signOut()}>Sign Out</button>
            </>
        )
    }
    return(
        <main>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign In</button>
        </main>
    )
}