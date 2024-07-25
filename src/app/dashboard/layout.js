import NavLeft from '../../Components/NavLeft/NavLeft'
import './dash.css'

const layout = async({children}) => {

  return (
    <div className="dashlayout w-full h-full min-h-screen flex">
      <NavLeft />
      <div className="w-full h-full lg:mt-0 mt-5">
      {children}
      </div>
    </div>
  )
}
export default layout