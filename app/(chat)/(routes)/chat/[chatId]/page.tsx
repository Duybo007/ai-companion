import prismadb from '@/lib/prismadb'
import { auth, redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import ChatClient from './components/client'

interface ChatIdPagePros {
    params: {   //not searchParams (?name=something)
        chatId: string // companion's ID
    }
}

async function ChatIdPage({params}: ChatIdPagePros) { //chat page
    const {userId} = auth()

    if(!userId) {
      return redirectToSignIn()
    }

    const companion = await prismadb.companion.findUnique({ //find companion => pass to chat
      where:{
        id : params.chatId
      },
      include: {
        messages:{
          orderBy: {
            createdAt: "asc"
          },
          where: {
            userId  // only messages by this user
          }
        },
        _count: {
          select:{
            messages: true //all messages from all users
          }
        }
      }
    })

    if(!companion) {
      return redirect("/dashboard")
    }
  return (
    <ChatClient companion={companion}/>
  )
}

export default ChatIdPage