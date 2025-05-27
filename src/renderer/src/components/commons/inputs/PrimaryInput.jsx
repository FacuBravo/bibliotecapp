export const PrimaryInput = ({
    name,
    type = 'text',
    value,
    onInputChange,
    isRequired = false,
    label
}) => {
    return (
        <div className="primary_input relative h-8 w-52">
            <input
                className="absolute left-0 top-0 z-[1] h-full w-full bg-transparent pl-2 font-assistant text-base text-white outline-none transition-all"
                name={name}
                type={type}
                value={value}
                onChange={onInputChange}
                required={isRequired}
                id={name}
            />

            <label
                htmlFor={name}
                className="absolute left-2 top-0 z-[2] cursor-text font-assistant text-base text-grey transition-all"
            >
                {label}
            </label>
            <div className="input_background absolute bottom-0 h-full max-h-0.5 w-full rounded-lg bg-blue_500 transition-all"></div>
        </div>
    )
}
