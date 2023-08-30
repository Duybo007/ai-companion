"use client"

import ChatHeader from '@/components/chat-header'
import { Companion, Message } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCompletion } from 'ai/react'
import React, { FormEvent, useState } from 'react'
import ChatForm from '@/components/chat-form'
import ChatMessages from '@/components/chat-messages'
import { ChatMessageProps } from '@/components/chat-message'

interface ChatClientProps {
    companion: Companion & {
        messages: Message[],
        _count : {
            messages: number
        }
    }
}

function ChatClient({companion}: ChatClientProps) { //chat page comp
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessageProps[]>(companion.messages)

  const {
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput
  } = useCompletion({
    api: `/api/chat/${companion.id}`,
    onFinish(prompt, completion) { //ai message object
      const systemMessage: ChatMessageProps = {
        role: "system",
        content: completion
      }

      setMessages((current) => [...current, systemMessage])
      setInput("")  // clear the mssage

      router.refresh()
    }
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input
    }

    setMessages((current) => [...current, userMessage]);

    handleSubmit(e)
  }

  return (
    <div className='flex flex-col h-full p-4 space-y-2'>
        <ChatHeader
        //show chat header
        companion={companion}/>
        <ChatMessages   //show all messages between user and companion
          isLoading={isLoading}
          companion={companion}
          messages={messages}
        />
        <ChatForm   //user's input message
          isLoading={isLoading}
          input={input}
          handleInputChange={handleInputChange}
          onSubmit={onSubmit}
        />
    </div>
  )
}

export default ChatClient