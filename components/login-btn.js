import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Button() {
  const { data: session } = useSession()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  if (session) {
    return (
      <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();

              fetch('/api/post', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
              });
            }}>
            <div>
              <label>
                Title:
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"></input>
              </label>
            </div>
            <div>
              <label>
                Body:
                <textarea
                  onChange={(e) => setBody(e.target.value)}
                  name="body"></textarea>
              </label>
            </div>
            <button>Submit</button>
          </form>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}