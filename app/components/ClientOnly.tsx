'use client'
import { useEffect, useState } from "react"

interface ClientOnlyProps {
    children: React.ReactNode
}

// Note => This componet of children components is doing after finished server side rendering
//that meaning can not rendering immediately 

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true) //server side just finished that can be mounted
    }, [])

    if (!hasMounted) {
        return null
    }

    return (
        <>
            {children}
        </>
    )
}

export default ClientOnly