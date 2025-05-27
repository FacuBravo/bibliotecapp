export const SecondaryButton = ({ children, disabled, bgColor, textColor }) => {
    return (
        <button
            disabled={disabled}
            className={`${bgColor} ${textColor} flex h-12 w-32 items-center justify-center rounded-lg font-barrio text-2xl decoration-0 shadow-md`}
        >
            {children}
        </button>
    )
}
