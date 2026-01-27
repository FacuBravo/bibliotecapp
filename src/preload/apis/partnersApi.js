import { ipcRenderer } from 'electron'
import { IpcKeys } from '../../helpers'

export const partnersApi = {
    addPartner: async (partnerInfo, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.PARTNER.ADD, partnerInfo)
        }

        return null
    },
    updatePartner: async (partnerInfo, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return await ipcRenderer.invoke(IpcKeys.PARTNER.UPDATE, partnerInfo)
        } else {
            return null
        }
    },
    getPartners: async (offset, limit) =>
        ipcRenderer.invoke(IpcKeys.PARTNER.GET_ALL, offset, limit),
    getPartner: async (id) => ipcRenderer.invoke(IpcKeys.PARTNER.GET, { id }),
    deletePartner: async (id, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.PARTNER.DELETE, { id })
        }

        return null
    },
    addMultiplePartners: async (partners, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.PARTNER.ADD_MULTIPLE, partners)
        }

        return null
    },
    deleteAllPartners: async (token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.PARTNER.DELETE_ALL)
        }

        return null
    }
}
