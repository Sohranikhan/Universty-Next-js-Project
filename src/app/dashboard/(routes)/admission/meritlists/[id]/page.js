import Headings from "../../../../../../Components/Headings/Headings"
import NewForm from "../Components/NewForm"
import MeritList from "../../../../../../models/meritlist/MeritList"

const meritEditPage = async ({ params }) => {
  const id = params.id
  if (id === 'new') {
    return (
      <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
        <div className="w-full mx-auto mt-4 max-w-[550px]">
          <Headings title={'Create New Merit List'} des={''} />
          <NewForm id="new"/>
        </div>
      </div>
    )
  } else {
    const newMerit = await MeritList.findOne({ _id: id })
    if (!newMerit) {
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
        <div className="w-full mx-auto mt-4 max-w-[550px]">
          <Headings title={'Updata Merit List'} des={''} />
          <NewForm program={newMerit?.program} prevPdfUrl={newMerit?.pdfUrl} id={`${newMerit?._id}`} />
        </div>
      </div>
    )
  }
}

export default meritEditPage