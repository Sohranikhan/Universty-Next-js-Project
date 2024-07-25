const { default: Link } = require("next/link")

const BtnLink = ({text, href, className}) => {
  return (
    <Link href={href} className={`flex w-fit rounded h-11 px-4 items-center text-background ${className? className : 'bg-primary'}`}>{text}</Link>
  )
}

export default BtnLink