"use client"

import React from 'react'
import { useToast } from './ui/use-toast'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import {BeatLoader} from "react-spinners"
import BotAvatar from './bot-avatar'
import UserAvatar from './user-avatar'
import { Button } from './ui/button'
import { Copy } from 'lucide-react'

export interface ChatMessageProps{
    role: "system" | "user",
    content?: string,
    isLoading?: boolean,
    src?: string
}

function ChatMessage({ role, content, isLoading, src }: ChatMessageProps) {
    const { toast }= useToast()
    const { theme }= useTheme()

    const onCopy = () => {
        if(!content){
            return;
        }

        navigator.clipboard.writeText(content)
        toast({
            description: "Message copied to clipboard"
        })
    }

  return (
    <div className={cn('group flex items-start gap-x-3 py-4 w-full', role === "user" && 'justify-end')}>
        {role !== "user" && src && <BotAvatar src={src}/>}
        <div className='rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10'>
            {isLoading? 
            <BeatLoader 
                color={theme === "light"? "black" : "white"}
                size={5}/> :
            content}
        </div>
        {role === "user" && <UserAvatar/>}
        {role !== "user" && !isLoading && (
            <Button
            onClick={onCopy}
            size="icon"
            className='opacity-0 group-hover:opacity-100 transition'
            variant="ghost"
            >
                <Copy className='h-4 w-4'/>
            </Button>
        )}
    </div>
  )
}

export default ChatMessage