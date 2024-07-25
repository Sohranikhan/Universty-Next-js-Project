import Headings from "@/Components/Headings/Headings"
import NewForm from "../Components/NewForm"
import OfficeStaff from "@/models/administration/OfficeStaff"

const officePage = async ({ params }) => {
  const id = params.id
  if (id === 'new') {
    return (
      <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
        <div className="w-full mx-auto mt-4 max-w-[550px]">
          <Headings title={'Create New Administration Staff'} des={''} />
          <NewForm id="new"/>
        </div>
      </div>
    )
  } else {
    const newOfficeStaff = await OfficeStaff.findOne({ _id: id })
    if (!newOfficeStaff) {
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
        <div className="w-full mx-auto mt-4 max-w-[450px]">
          <Headings title={'Updata Administration Staff'} des={''} />
          <NewForm name={newOfficeStaff?.name} image={newOfficeStaff?.image} position={newOfficeStaff?.position} email={newOfficeStaff?.email} phone={newOfficeStaff?.phone} office={`${newOfficeStaff.office}`} socialMedia={JSON.stringify(newOfficeStaff.socialMedia)} id={`${newOfficeStaff?._id}`} />
        </div>
      </div>
    )
  }
}

export default officePage