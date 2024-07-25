import Headings from "../../../../../Components/Headings/Headings"
import NewForm from "../Components/NewForm"
import Office from "../../../../../models/administration/Office"
import Directory from "../../../../../models/administration/Directory"

const directoryPage = async ({ params }) => {
  const id = params.id
  if (id === 'new') {
    return (
      <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
        <div className="w-full mx-auto mt-4">
          <Headings title={'Create New Directory'} des={''} />
          <NewForm id="new"/>
        </div>
      </div>
    )
  } else {
    const newDirectory = await Directory.findOne({ _id: id })
    if (!newDirectory) {
      return (
        <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
          <div className="w-full mx-auto max-w-[450px] mt-4">
            <Headings title={'Invalid Route'} des={'Please make sure you are at the right path'} />
          </div>
        </div>
      )
    }
    return (
      <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
        <div className="w-full mx-auto mt-4">
          <Headings title={'Updata Directory'} des={''} />
          <NewForm title={newDirectory?.title} head={newDirectory?.head} email={newDirectory?.email} phone={newDirectory?.phone} description={newDirectory?.description} socialMedia={JSON.stringify(newDirectory.socialMedia)} id={`${newDirectory?._id}`} />
        </div>
      </div>
    )
  }
}

export default directoryPage

