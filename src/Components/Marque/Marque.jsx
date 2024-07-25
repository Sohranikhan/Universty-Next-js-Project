import Link from 'next/link';
import './Marque.css';

const fetchNews = async () => {
  try {
    const res = await fetch('https://mcut.vercel.app/api/news', {
      next: {
        revalidate: 1, // Revalidate data every 1 minute for faster updates
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch');
    }
    if (data.success && data.data.length > 0) {
      return {
        success: true,
        news: data.data[0],
      };
    } else {
      return {
        success: false,
        message: 'No news available',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const Marq = async () => {
  const news = await fetchNews();

  return (
    <div className="w-full h-auto marquee-container relative bg-green-200">
      <marquee behavior="fast" direction="left" className="h-12 flex items-center justify-center">
        {news.success ? (
          <Link href={`/news/${news?.news?.slug}`}>{news?.news?.title}</Link>
        ) : (
          <p>{news.message}</p>
        )}
      </marquee>
      <div className="aniBtn absolute h-full top-0 left-0 z-10 flex items-center justify-center px-4 text-background bg-base-100 rounded-none">
        News
      </div>
    </div>
  );
};

export default Marq;
