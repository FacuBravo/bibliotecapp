import lensIcon from '../../../assets/images/icons/Lens.svg'

export const SearchInput = ({ name, value, onInputChange }) => {
    return (
        <div className="flex h-9 w-64 justify-between overflow-hidden rounded-lg bg-pink_400 pr-3 shadow-md">
            <input
                className="w-full bg-transparent pl-3 font-assistant text-base text-black outline-none placeholder:text-grey"
                type="text"
                placeholder="Buscar..."
                name={name}
                value={value}
                onChange={onInputChange}
            />
            <img src={lensIcon} alt="Lens" />
        </div>
    )
}
