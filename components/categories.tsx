"use client"

import qs from "query-string"
import { cn } from '@/lib/utils'
import { Category } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface CategoriesProps {
    data: Category[]
}

function Categories({data} : CategoriesProps) {
    // display categories filter buttons
    const router = useRouter();
    const searchParams = useSearchParams()

    const categoryId = searchParams.get("categoryId")

    const onClick = (id: string | undefined) => {   //filter categories
        const query = { categoryId: id }

        // push "value" into url as "name"
        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true})

        router.push(url) //push query into url
    }
  return (
    <div className='w-full overflow-x-auto space-x-2 flex p-1'>
        <button 
        onClick={() => onClick(undefined)}
        className={cn(`
            flex
            items-center
            text-center
            md:text-sm
            px-2
            md:px-4
            py-2
            md:py-3
            rounded-md
            bg-primary/10
            hover:opacity-75
            transition
        `, !categoryId? "bg-primary/25" : "bg-primary/10")}>
            Newest
        </button>
        {data.map((item) => (
            <button 
            onClick={() => onClick(item.id)}
            key={item.id}
            className={cn(`
                flex
                items-center
                text-center
                md:text-sm
                px-2
                md:px-4
                py-2
                md:py-3
                rounded-md
                bg-primary/10
                hover:opacity-75
                transition
            `, item.id === categoryId? "bg-primary/25" : "bg-primary/10")}>
                {item.name}
            </button>
        ))}
    </div>
  )
}

export default Categories