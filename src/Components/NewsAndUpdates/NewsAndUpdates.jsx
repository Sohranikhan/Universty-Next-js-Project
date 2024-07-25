import BtnLink from '../../Components/BtnLink/BtnLink'
import { MapPin, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const getNews = async () => {
  try {
    

  const res = await fetch('https://mcut.vercel.app/api/news', {
    next:{
      revalidate: 1,
    }
  })
  const data = await res.json()
  return {
    success: true,
    data
  }
} catch (error) {
  return {
    success: false,
    message: error.message
  }
}
}
const NewsAndUpdates = async() => {
  const news = await getNews()
  return (
    <div className='w-full flex flex-col'>


      <div className=" w-full p-2 items-center justify-center relative">
        <h2 className="md:text-2xl text-xl my-2 mb-4 font-extrabold text-accent">News & Updates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full h-auto mt-1">
        {news?.success && news?.data?.data?.map((item) => (
          <Link href={`/news/${item?.slug}`} key={item?._id} className="w-full my-3 max-w-full flex h-fit min-h-40 p-3 shadow-md shadow-foreground">
            <div className="formatedDate flex h-fit flex-col border-b-4 border-b-primary rounded">
              <span className=" text-3xl my-2 font-extrabold text-primary">{new Date(item.createdAt).getDay()}</span>
              <span className="font-bold mb-1">{new Date(item?.createdAt).toLocaleString('default',{month:'long'})}</span>
            </div>

            <div className="ml-4 w-full">
              <h3 className="text-xl font-bold my-2">{item?.title}</h3>
              <hr className="border-gray-400" />
              <div className="flex items-center py-2 gap-1"><Tag color="green" size={18} /> {item?.category?.name}</div>

            </div>
          </Link>
        ))}
      {!news.success && 
        <div className="">
          {news.message}
          </div>
          }
      </div>
        </div>
        <BtnLink href={'/news'} text={'Read More'} className={'mx-2 bg-primary'} />
    </div>
  )
}

export default NewsAndUpdates