import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const socialMediaIcons = {
facebook: <FaFacebook size={18} />,
twitter: <FaTwitter size={18} />,
linkedin: <FaLinkedin size={18} />,
instagram: <FaInstagram size={18} />
}
const IconMaper = ({account}) => {
const icon = socialMediaIcons[account.toLowerCase()] || 'facebook'
  return icon
}

export default IconMaper