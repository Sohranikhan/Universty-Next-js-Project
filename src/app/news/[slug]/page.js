import BtnLink from "../../../Components/BtnLink/BtnLink";
import FacltyHero from "../../../Components/FacltyHero/FacltyHero";
import Marq from "../../../Components/Marque/Marque";
import UniAds from "../../../Components/UniAds/UniAds";
import { Facebook, Link2, Mail, Phone, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Function to fetch news data by slug
const getNewsBySlug = async (slug) => {
  try {
  const res = await fetch(`http://localhost:3000/api/news/${slug}`, {
    next: {
      revalidate: 1,
    },
  });
  const data = await res.json();
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
};

const NewsPage = async ({ params }) => {
  const { slug } = params;
  const data = await getNewsBySlug(slug);

  if (data.success && data.newsItem) {
    return (
      <div className="w-full flex flex-col mt-5 px-2">
<FacltyHero />
<Marq />
        <div className="flex flex-col sm:flex-row w-full mt-4">
          <div className="flex-[4] flex-col">
          <h1 className="max-w-[70%]">{data.newsItem.title}</h1>
          <h4 className="text-primary">{data?.newsItem?.category?.name}</h4>
          <div
            className="dangeroushtml flex flex-col w-full mt-4"
            dangerouslySetInnerHTML={{ __html: data.newsItem.description }}
          />
          </div>
          <UniAds />
        </div>
       
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center text-foreground">
        <h2>Sorry! We are trying to fix this error</h2>
        <p className="text-red-600">{data.message || "No news data found"}</p>
        <h3>Back To Home</h3>
        <BtnLink href="/" text="Home" />
      </div>
    );
  }
};

export default NewsPage;
