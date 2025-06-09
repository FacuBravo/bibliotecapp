import trashIcon from '../../../assets/images/icons/Trash.svg'
import trashWhiteIcon from '../../../assets/images/icons/Trash_white.svg'

export const DeleteButton = ({ action, white = false }) => {
    return (
        <button onClick={() => action()} className="cursor-pointer bg-transparent">
            <img
                className="min-h-8 min-w-8"
                src={white ? trashWhiteIcon : trashIcon}
                alt="Delete Icon"
            />
        </button>
    )
}
