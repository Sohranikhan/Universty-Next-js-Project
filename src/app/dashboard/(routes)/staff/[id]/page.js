import Headings from "../../../../../Components/Headings/Headings"
import NewForm from "../Components/NewForm"
import Staff from "@/models/Faculty/Staff"

const newStaffPage = async ({ params }) => {
  const id = params.id
  if (id === 'new') {
    return (
      <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
        <div className="w-full max-w-[450px] mx-auto mt-4">
          <Headings title={'Create New Staff'} des={''} />
          <NewForm id="new"/>
        </div>
      </div>
    )
  } else {
    const staff = await Staff.findOne({ _id: id })
    if (!staff) {
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
        <div className="w-full max-w-[450px] mx-auto mt-4">
          <Headings title={'Updata Staff'} des={''} />
          <NewForm name={staff?.name} pic={staff?.pic} email={staff?.email} position={staff?.position} id={`${staff?._id}`} department={`${staff?.department}`} socialMedia={JSON.stringify(staff.socialMedia)} researchPapers={JSON.stringify(staff.researchPapers)} />
        </div>
      </div>
    )
  }
}

export default newStaffPage

