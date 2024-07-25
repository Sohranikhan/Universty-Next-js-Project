import Data from'./Components/Data'
const NewsPage = async () => {
    return (
      <div className="w-full flex flex-col mt-10 px-2">
        <h1 className="my-4 text-accent">News</h1>
        <Data />
      </div>
    );
};

export default NewsPage;
