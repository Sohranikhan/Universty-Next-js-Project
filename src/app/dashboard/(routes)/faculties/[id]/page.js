import Headings from "../../../../../Components/Headings/Headings"
import NewForm from "../Components/NewForm"
import Faculty from "../../../../../models/Faculty/Faculty"

const facultyPage = async({params}) => {
    const id = params.id   
          if (id === 'new') {
            return (
                <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
            <div className="w-full mx-auto max-w-full mt-4">
            <Headings title={'Create New Faculty'} des={''} />
            <NewForm id="new" />
            </div>
</div>
)
          }else{
            const faculty = await Faculty.findOne({_id: id})
            if (!faculty) {
                return(
                    <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
                <div className="w-full mx-auto max-w-[450px] mt-4">
                <Headings title={'Invalid Route'} des={'Please make sure you are at the right path'} />
                </div>
    </div> 
                )
            }
            return (
                <div className="w-full flex flex-col items-start justify-start h-auto sm:p-6 p-3 ">
            <div className="w-full mx-auto max-w-auto mt-4">
            <Headings title={'Updata Faculty'} des={''} />
            <NewForm name={faculty.name} dean={faculty.dean} description={faculty.description} id={`${faculty._id}`} />
            </div>
</div>
)
          }
}

export default facultyPage
