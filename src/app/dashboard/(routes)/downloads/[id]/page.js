import Headings from "../../../../../Components/Headings/Headings";
import NewForm from "../Components/NewForm";
import Download from "../../../../../models/downloads/Downloads"; // Import the Download model

const downloadPage = async ({ params }) => {
  const id = params.id;
  
  if (id === 'new') {
    return (
      <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3">
        <div className="w-full mx-auto mt-4">
          <Headings title={'Create New Download'} des={''} />
          <NewForm id="new" />
        </div>
      </div>
    );
  } else {
    const download = await Download.findOne({ _id: id }).exec(); // Use exec() to return a promise

    if (!download) {
      return (
        <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3">
          <div className="w-full mx-auto max-w-[450px] mt-4">
            <Headings title={'Invalid Route'} des={'Please make sure you are at the right path'} />
          </div>
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3">
        <div className="w-full mx-auto mt-4">
          <Headings title={'Update Download'} des={''} />
          <NewForm 
            title={download.title} 
            url={download.url}  
            id={`${download._id}`} 
          />
        </div>
      </div>
    );
  }
};

export default downloadPage;
