"use client"

import qs from "query-string"
import { Search } from 'lucide-react'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouce } from '@/hooks/use-debouce'

function SearchInput() {
    //display search bar filter by name
    const router = useRouter();
    const searchParams = useSearchParams()

    // get name and categoryId from params
    const categoryId = searchParams.get("categoryId")
    const name = searchParams.get("name")

    const [value, setValue] = useState(name || "")
    const deboucedValue = useDebouce<string>(value, 500)

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        const query = {
            name: deboucedValue,
            categoryId: categoryId
        }

        // push "value" into url as "name"
        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, {skipEmptyString: true, skipNull: true}) //skip if category is null

        router.push(url) //push qury into url
    }, [deboucedValue, router, categoryId])
  return (
    <div className='relative'>
        <Search className='absolute w-4 h-4 top-3 left-4 text-muted-foreground'/>
        <Input 
            onChange={onChange}
            value={value}
            placeholder='Search...'
            className='pl-10 bg-primary/10'
        />
    </div>
  )
}

export default SearchInput