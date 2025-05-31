export const RadioInput = ({
    name,
    value,
    onInputChange,
    isRequired = false,
    label,
    options = []
}) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm text-black">
                {label}
                {isRequired && <span className="text-red">*</span>}
            </label>

            <div className="flex items-center gap-4">
                {options.map((option) => (
                    <div key={option.value} className="flex items-center gap-1">
                        <input
                            className="h-4 w-4 cursor-pointer"
                            name={name}
                            type="radio"
                            required={isRequired}
                            value={option.value}
                            onChange={onInputChange}
                            id={name + '-' + option.value}
                            checked={value === option.value}
                        />

                        <label
                            htmlFor={name + '-' + option.value}
                            className="cursor-pointer font-assistant text-base text-black"
                        >
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}
