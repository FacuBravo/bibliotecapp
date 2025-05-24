import { useEffect, useMemo } from 'react'

import { useUiStore } from '../../hooks/useUiStore'
import successIcon from '../../assets/images/icons/Check.svg'
import warningIcon from '../../assets/images/icons/Warning.svg'
import errorIcon from '../../assets/images/icons/Error.svg'

export const Alert = () => {
    const { onHideAlert, show, type, message } = useUiStore()

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                onHideAlert()
            }, 3000)
        }
    }, [show])

    const config = useMemo(() => {
        switch (type) {
            case 'error':
                return {
                    icon: errorIcon,
                    bgColor: 'bg-pink_400',
                    textColor: 'text-pink_600',
                    borderColor: 'border-pink_600'
                }
            case 'success':
                return {
                    icon: successIcon,
                    bgColor: 'bg-green_400',
                    textColor: 'text-green_600',
                    borderColor: 'border-green_600'
                }
            case 'warning':
                return {
                    icon: warningIcon,
                    bgColor: 'bg-yellow_400',
                    textColor: 'text-yellow_600',
                    borderColor: 'border-yellow_600'
                }
            default:
                return {
                    icon: successIcon,
                    bgColor: 'bg-green_400',
                    textColor: 'text-green_600',
                    borderColor: 'border-green_600'
                }
        }
    }, [type])

    return (
        <>
            {show && (
                <div
                    onClick={onHideAlert}
                    className={`${config.bgColor} ${config.textColor} ${config.borderColor} fixed right-4 top-[114px] z-50 flex min-w-64 cursor-pointer items-center justify-start gap-2 rounded-sm border-l-4 border-solid px-2 py-3 font-assistant text-base font-semibold shadow-md`}
                >
                    <img src={config.icon} alt="Alert Icon" />
                    <h3>{message}</h3>
                </div>
            )}
        </>
    )
}
