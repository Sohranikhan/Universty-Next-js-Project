import Headings from "../../../../../Components/Headings/Headings"
import NewForm from "../Components/NewForm"
import CampusLife from "../../../../../models/campusLife/CampusLife"

const aboutPage = async ({ params }) => {
  const id = params.id
  if (id === 'new') {
    return (
      <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
        <div className="w-full mx-auto mt-4">
          <Headings title={'Create New Campus Life Page'} des={''} />
          <NewForm id="new"/>
        </div>
      </div>
    )
  } else {
    const campusLife = await CampusLife.findOne({ _id: id })
    if (!campusLife) {
      return (
        <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
          <div className="w-full mx-auto max-w-[450px] mt-4">
            <Headings title={'Invalid Route'} image={campusLife?.image} des={'Please make sure you are at the right path'} />
          </div>
        </div>
      )
    }
    return (
      <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
        <div className="w-full mx-auto mt-4">
          <Headings title={'Updata About Page'} des={''} />
          <NewForm title={campusLife?.title} description={campusLife?.description} id={`${campusLife?._id}`} />
        </div>
      </div>
    )
  }
}

export default aboutPage