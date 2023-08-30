import CompanionForm from '@/components/companion-form'
import prismadb from '@/lib/prismadb'
import { auth, redirectToSignIn } from '@clerk/nextjs'
import React from 'react'

interface CompanionIdPageProps {
  params : {
    companionId: string // match with route [companionId]
  }
}

async function CompanionIdPage({ params }: CompanionIdPageProps) { //edit or create companion page
  const {userId} = auth()

  if (!userId){
    return redirectToSignIn()
  }
  //TODO: check sub

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId, //if click on sidebar, companionId will be "new", not an "id"
      // to show either create companion page or edit page
      userId  //if userId is not the same as the user who created the companion
    }
  })

  const categories = await prismadb.category.findMany()

  return (
    <CompanionForm
      initialData= {companion}
      categories= {categories}/>
  )
}

export default CompanionIdPage