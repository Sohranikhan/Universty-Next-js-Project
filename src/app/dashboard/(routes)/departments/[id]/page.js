import Headings from "../../../../../Components/Headings/Headings"
import NewForm from "../Components/NewForm"
import Department from "../../../../../models/Faculty/Department"

const departmentPage = async ({ params }) => {
  const id = params.id
  if (id === 'new') {
    return (
      <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
        <div className="w-full mx-auto mt-4">
          <Headings title={'Create New Department'} des={''} />
          <NewForm id="new"/>
        </div>
      </div>
    )
  } else {
    const department = await Department.findOne({ _id: id })
    if (!department) {
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
          <Headings title={'Updata department'} des={''} />
          <NewForm name={department.name}  hod={department.hod} faculty={`${department.faculty}`} description={department.description} id={`${department._id}`} />
        </div>
      </div>
    )
  }
}

export default departmentPage
