export const PrimaryButton = ({ children, disabled, onClick = null }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="relative z-10 h-10 w-full cursor-pointer overflow-hidden rounded-xl bg-blue_500 font-supermercado text-xl text-white transition-all before:absolute before:left-[3px] before:top-[3px] before:-z-10 before:h-[calc(100%-6px)] before:w-[calc(100%-6px)] before:max-w-0 before:rounded-lg before:bg-white before:transition-all before:content-[''] hover:text-blue_500 hover:before:max-w-full disabled:cursor-not-allowed"
        >
            {children}
        </button>
    )
}
