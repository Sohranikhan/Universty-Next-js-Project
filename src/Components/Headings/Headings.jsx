const Headings = ({title, des}) => {
  return (
    <div className="flex flex-col gap-y-2">
        <h1>{title}</h1>
        <p>{des}</p>
    </div>
  )
}

export default Headings