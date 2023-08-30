"use client"

interface ImageUploadProps {
    value: string,
    onChange: (src: string) => void,
    disabled?: boolean
}

import React, { useEffect, useState } from 'react'
import {CldUploadButton} from "next-cloudinary"
import Image from 'next/image'

function ImageUpload({value, onChange, disabled}: ImageUploadProps) {

    //hydration error trick
    const [isMounted, setIsMounted]= useState(false)

    useEffect(()=> {
        setIsMounted(true) //only run when finish server side rendering and get to client side rendering
    }, [])

    if( !isMounted){
        return null
    }
    return (
        <div className='space-y-4 w-full flex flex-col items-center justify-center'>
            <CldUploadButton
            onUpload={(result: any) => onChange(result.info.secure_url)}
            options={{maxFiles: 1}}
            uploadPreset='li4uqiow'>
                <div className='p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center'>
                    <div className='relative h-40 w-40'>
                        <Image 
                        fill
                        alt='Upload'
                        src={value || "/placeholder.svg"}
                        className='rounded-lg object-cover'/>
                    </div>
                </div>
            </CldUploadButton>
        </div>
    )
    //hydration error trick
}

export default ImageUpload