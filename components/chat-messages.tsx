"use client"

import { Companion } from '@prisma/client'
import React, { ElementRef, useEffect, useRef, useState } from 'react'
import ChatMessage, { ChatMessageProps } from './chat-message'

interface ChatMessagesProps {
    messages: ChatMessageProps[]
    isLoading: boolean
    companion: Companion
}

function ChatMessages({ messages=[], isLoading, companion }: ChatMessagesProps) {
    const scrollRef = useRef<ElementRef<"div">>(null)
    const [fakeLoading, setFakeLoading] = useState(messages.length === 0? true : false)

    useEffect(() => {   //first time chat with this AI => fake loading for 1s
        const timeout = setTimeout(() => {
            setFakeLoading(false)
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    useEffect(() => {   //everytime the message's length changes, sroll down to the bottom
        scrollRef?.current?.scrollIntoView({behavior: "smooth"})
    }, [messages.length])

  return (
    <div className='flex-1 pr-4 overflow-y-auto'>
        <ChatMessage
            isLoading={fakeLoading} //first time chat with this AI => fake loading for 1s
            src={companion.src}
            role="system"
            content={`Hello, I am ${companion.name}, ${companion.description}`}
        />
        {messages.map((message) => (
            <ChatMessage 
                key={message.content}
                src={companion.src}
                content={message.content}
                role={message.role}
            />
        ))}
        {isLoading && (     //AI is generating a message
            <ChatMessage 
                role="system"
                src={companion.src}
                isLoading
            />
        )}
        <div ref={scrollRef}/>
    </div>
  )
}

export default ChatMessages