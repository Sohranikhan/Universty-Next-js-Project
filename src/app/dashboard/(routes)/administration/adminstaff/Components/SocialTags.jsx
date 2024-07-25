import { useState } from "react"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../Components/ui/select"
import { Input } from "../../../../../../Components/ui/input"
import { Button } from "../../../../../../Components/ui/button"

const SocialTags = ({tags, setTags}) => {
    const [input, setInput] = useState('')
    const [provider, setProvider] = useState('Facebook')

    const handleAddTag = () => {
        if (input.length > 5) {
          setTags([...tags, { provider: provider, url: input.trim() }])
          setInput('')
        }
      }

  return (
    <div className="w-full h-auto flex items-center gap-2 justify-center">
    <Select onValueChange={setProvider} defaultValue={provider} className="w-fit max-w-[90px]">
      <SelectTrigger>
        <SelectValue placeholder="Select a provider" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='Facebook'><div className="w-full bg-background rounded px-1 h-6 flex items-center">
          <FaFacebook color="rgb(9, 93, 202)" size={20} className="bg-primary/20" />
        </div>
        </SelectItem>
        <SelectItem value='Instagram'><div className="w-full bg-background rounded px-1 h-6 flex items-center">
          <FaInstagram color="rgb(239, 0, 100)" size={20} className="bg-primary/20" />
        </div>
        </SelectItem>
        <SelectItem value='Twitter'><div className="w-full bg-background rounded px-1 h-6 flex items-center">
          <FaTwitter color="rgb(59, 129, 199)" size={20} className="bg-primary/20" />
        </div>
        </SelectItem>
        <SelectItem value='LinkedIn'><div className="w-full bg-background rounded px-1 h-6 flex items-center">
          <FaLinkedin color="rgb(59, 129, 199)" size={20} className="bg-primary/20" />
        </div>
        </SelectItem>
      </SelectContent>
    </Select>
    <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter Your Social Account URL" />
    <Button type="button" onClick={handleAddTag}>Add</Button>
  </div>
  )
}

export default SocialTags