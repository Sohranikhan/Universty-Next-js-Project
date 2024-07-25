import { MapPinned } from "lucide-react"
import Image from "next/image"

const McutMap = () => {
  return (
    <div className="border-none w-full flex items-center justify-center h-auto min-h-[450px] mx-auto">
    <MapPinned size={50} />
    </div>
        // <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.2144687704335!2d70.54987257507062!3d30.001997574945026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393aaf18256d9131%3A0x9ae0a7306a05c250!2sMir%20Chakar%20Khan%20Rind%20University%20of%20Technology%20DG%20Khan!5e0!3m2!1sen!2s!4v1720452236155!5m2!1sen!2s" width="1000" height="450" className="border-none w-full h-auto min-h-[450px] mx-auto" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
  )
}

export default McutMap