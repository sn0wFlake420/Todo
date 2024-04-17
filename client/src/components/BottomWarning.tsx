import { Link } from "react-router-dom"

interface props{
    label: string,
    buttonText: string,
    to: any
}

export function BottomWarning({label , buttonText, to}: props) {
    return <div className="text-gray-400 py-2 text-sm flex justify-center">
      <div>
        {label}
      </div>
      <Link className="text-gray-400 pointer underline pl-1 cursor-pointer mb-5" to={to}>
        {buttonText}
      </Link>
    </div>
}