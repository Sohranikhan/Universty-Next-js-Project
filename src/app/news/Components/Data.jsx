'use client';

import { useState, useEffect } from 'react';
import BtnLink from '../../../Components/BtnLink/BtnLink';
import UniAds from '../../../Components/UniAds/UniAds';
import Loader from '../../../Components/Loader/Loader';
import { Input } from '../../../Components/ui/input';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

const getNewsData = async () => {
  try {
    const res = await fetch('https://mcut.vercel.app/api/news', {
      next:{
        revalidate: 5
      }
    });
    if (!res.ok) {
      throw new Error('Failed to fetch tenders');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

const NewsPageComp = () => {
  const [data, setData] = useState({ success: false, data: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const tenderData = await getNewsData();
      setData(tenderData);
      setFilteredData(tenderData.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = data.data.filter((tender) =>
        tender.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data.data);
    }
  }, [searchQuery, data]);

  if (!mounted) {
    return <Loader />;
  }

  if (loading) {
    return <Loader />;
  }

  if (!data.success) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center text-foreground">
        <h2>Sorry! We are trying to fix this error</h2>
        <p className="text-red-600">{data.message}</p>
        <h3>Back To Home</h3>
        <BtnLink href="/" text="Home" />
      </div>
    );
  }

    return (
        <div className="w-full flex-[4] flex-col mt-1 px-2">
                <div className="flex flex-col sm:flex-row w-full gap-4">
                    <div className="flex-[4] flex-col w-full">
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="max-w-[450px]"
                        />
              {filteredData && filteredData?.length ? (<ul className='mt-3'>
                {filteredData.map((news) => (
                <div key={news._id} className="flex flex-col gap-y-2 mb-1">
                  <li className="underline">
                    <Link href={`/news/${news.slug}`} className="text-blue-700" rel="noopener noreferrer">
                      {news.title}
                    </Link>
                  </li>
                  <div className="flex gap-3 items-center text-sm">
                    <span className="text-primary text-base">{news?.category?.name}</span>
                    <p className="flex items-center gap-2"><Calendar size={18} /> {new Date(news?.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              ))}
                        </ul>) : (
                <div className="flex flex-col sm:flex-row w-full mt-4">
                    <div className="flex-[4] flex-col w-full mt-4">
                        <p>No Data found</p>
                    </div>
                </div>
            )}
                    </div>
            <UniAds />
            </div>
            
        </div>
    );

};

export default NewsPageComp;
