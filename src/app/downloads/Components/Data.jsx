'use client';

import { useState, useEffect } from 'react';
import BtnLink from '../../../Components/BtnLink/BtnLink';
import UniAds from '../../../Components/UniAds/UniAds';
import Loader from '../../../Components/Loader/Loader';
import { Input } from '../../../Components/ui/input';

const getDownloadData = async () => {
  try {
    const res = await fetch('/api/downloads', {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
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

const DownloadPageComp = () => {
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
      const tenderData = await getDownloadData();
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
                {filteredData?.map((download) => (
              <div key={download._id} className="mb-1">
                <li className="underline ">
                <a href={download.url} className="text-blue-700" target="_blank" rel="noopener noreferrer">
                  {download.title}
                </a>
                </li>
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

export default DownloadPageComp;
