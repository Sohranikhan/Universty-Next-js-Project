import Headings from "../../../../../Components/Headings/Headings"
import NewForm from "../Components/NewForm"
import Office from "../../../../../models/administration/Office"

const officePage = async ({ params }) => {
  const id = params.id
  if (id === 'new') {
    return (
      <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
        <div className="w-full mx-auto mt-4">
          <Headings title={'Create New Administration'} des={''} />
          <NewForm id="new"/>
        </div>
      </div>
    )
  } else {
    const newOffice = await Office.findOne({ _id: id })
    if (!newOffice) {
      return (
        <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
          <div className="w-full mx-auto max-w-[450px] mt-4">
            <Headings title={'Invalid Route'} image={newOffice?.image} des={'Please make sure you are at the right path'} />
          </div>
        </div>
      )
    }
    return (
      <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
        <div className="w-full mx-auto mt-4">
          <Headings title={'Updata Administration'} des={''} />
          <NewForm title={newOffice?.title} head={newOffice?.head} description={newOffice?.description} id={`${newOffice?._id}`} />
        </div>
      </div>
    )
  }
}

export default officePage