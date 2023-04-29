'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            onClick={() => router.push('/')}
            priority={true}
            alt='Logo'
            className="hidden sm:block cursor-pointer w-auto h-auto"
            height={100}
            width={100}
            src="/images/logo.png"
        />
    )
}

export default Logo