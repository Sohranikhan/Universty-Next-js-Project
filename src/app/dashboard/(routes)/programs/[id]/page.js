import Headings from "../../../../../Components/Headings/Headings"
import NewForm from "../Components/NewForm"
import Department from "../../../../../models/Faculty/Department"
import Program from "../../../../../models/Faculty/Program"

const programPage = async ({ params }) => {
  const id = params.id
  if (id === 'new') {
    return (
      <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
        <div className="w-full mx-auto mt-4">
          <Headings title={'Create New Program'} des={''} />
          <NewForm id="new"/>
        </div>
      </div>
    )
  } else {
    const program = await Program.findOne({ _id: id })
    if (!program) {
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
          <Headings title={'Updata Program'} des={''} />
          <NewForm name={program.name}  department={`${program.department}`}  description={program.description} id={`${program._id}`} />
        </div>
      </div>
    )
  }
}

export default programPage

