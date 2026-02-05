import { ipcRenderer } from 'electron'
import { IpcKeys } from '../../helpers'
import { sessionApi } from './sessionApi'

export const loansApi = {
    addLoan: async (loanInfo, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.LOAN.ADD, loanInfo)
        }

        return null
    },
    updateLoan: async (loanInfo, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return await ipcRenderer.invoke(IpcKeys.LOAN.UPDATE, loanInfo)
        } else {
            return null
        }
    },
    getLoans: async (params) => ipcRenderer.invoke(IpcKeys.LOAN.GET_ALL, params),
    getLoan: async (id) => ipcRenderer.invoke(IpcKeys.LOAN.GET, { id }),
    getActiveLoansCount: async () => ipcRenderer.invoke(IpcKeys.LOAN.COUNT_ACTIVE_LOANS),
    deleteLoan: async (id, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.LOAN.DELETE, { id })
        }

        return null
    },
    updateLoanState: async (id, returned, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.LOAN.SET_STATE, { id, returned })
        }

        return null
    },
    addMultipleLoans: async (loans, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.LOAN.ADD_MULTIPLE, loans)
        }

        return null
    },
    deleteAllLoans: async (token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.LOAN.DELETE_ALL)
        }

        return null
    }
}
