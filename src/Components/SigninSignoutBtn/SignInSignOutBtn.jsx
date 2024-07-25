"use client"
import { Button } from "../ui/button"
import { useSession, signOut, signIn } from "next-auth/react"
const SigninSignoutBtn = ({className}) => {
    const { data: session } = useSession()
if (session?.user) {

  return (
    <Button variant="outline" className={`${className?className : ''}`} onClick={() => signOut({callbackUrl:"/"})}>Log Out</Button>
  )
}
return (
    <Button variant="outline" className={`${className?className : ''}`} onClick={() => signIn()}>Log In</Button>
     );
}
 
export default SigninSignoutBtn;