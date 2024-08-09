import { useEffect, useState } from 'react'
import Image from 'next/image'

export const FallbackImage = ({ src, ...rest }) => {
    //console.log("fallback image data", src, { ...rest })
    const { notfoundimg } = { ...rest }
    const [imgSrc, setImgSrc] = useState(src)

    useEffect(() => {
        setImgSrc(src)
    }, [src])

    return (
        <Image
            {...rest}
            src={imgSrc ? imgSrc : notfoundimg}
            onError={() => {
                setImgSrc(notFoundImg)
            }}
        />
    )
}