import UniAds from "../../../Components/UniAds/UniAds";
import Link from "next/link";

const getMeritLists = async () => {
  try {
    const res = await fetch(`https://mcut.vercel.app/api/admission/meritlist`, {
      cache:'no-cache'
    });
    const data = await res.json();
    return {
      data,
      success: true
    };    
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }

};

const MeritListPage = async() => {
  const meritLists = await getMeritLists();
  return (
    <div className="w-full h-auto mt-6">
      <div className="flex flex-col sm:flex-row gap-x-5">
      <div className="flex-[4] flex-col mt-2">
      <h1>Merit Lists</h1>
        {meritLists.success && meritLists?.data?.data?.map((meritList) => (
          <div key={`${meritList._id}`} className="flex items-center py-2">
            <Link href={meritList?.pdfUrl} className="text-blue-600 underline text-base my-2">{meritList?.program?.name}</Link>
          </div>
        ))}
      </div>
      <UniAds />
        </div>
      </div>
  );
};

export default MeritListPage;
