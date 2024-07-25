import Headings from "../../../../../Components/Headings/Headings"
import NewForm from "../Components/NewForm"
import Admission from "../../../../../models/admission/Admission"

const admissionSubPage = async ({ params }) => {
  const id = params.id
  if (id === 'new') {
    return (
      <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
        <div className="w-full mx-auto mt-4">
          <Headings title={'Create New Admission Page'} des={''} />
          <NewForm id="new"/>
        </div>
      </div>
    )
  } else {
    const newAdmission = await Admission.findOne({ _id: id })
    if (!newAdmission) {
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
          <Headings title={'Updata Admission Page'} des={''} />
          <NewForm title={newAdmission?.title} description={newAdmission?.description} id={`${newAdmission?._id}`} />
        </div>
      </div>
    )
  }
}

export default admissionSubPage