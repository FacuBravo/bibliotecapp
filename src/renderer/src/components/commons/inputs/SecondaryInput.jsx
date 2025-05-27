export const SecondaryInput = ({
    name,
    type = 'text',
    value,
    onInputChange,
    isRequired = false,
    label,
    placeholder
}) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm text-black">
                {label}{isRequired && <span className="text-red">*</span>}
            </label>

            <input
                className="rounded-lg bg-green_400 p-2 font-assistant text-base text-black outline-none placeholder:text-grey"
                name={name}
                type={type}
                required={isRequired}
                placeholder={placeholder}
                value={value}
                onChange={onInputChange}
                id={name}
            />
        </div>
    )
}
