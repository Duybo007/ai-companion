import Categories from "@/components/categories";
import Companions from "@/components/companions";
import SearchInput from "@/components/search-input";
import prismadb from "@/lib/prismadb";
import React from "react";

interface RootPageProps {
  searchParams : { //available in every server component
    categoryId: string
    name: string
  }
}

async function  DashBoardPage({searchParams}: RootPageProps) {
  //get all companions and messages it has
  const data = await prismadb.companion.findMany({
    where:{
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      _count: {
        select: {
          messages: true
        }
      }
    }
  })

  // get all categories from db
  const categories = await prismadb.category.findMany()

  return (
  <div className="p-4 h-full space-y-2">
    <SearchInput />
    <Categories data={categories} />
    <Companions data={data}/>
  </div>)
}

export default DashBoardPage;
