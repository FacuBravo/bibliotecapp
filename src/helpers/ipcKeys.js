export const IpcKeys = {
    SESSION: {
        REGISTER: 'register',
        LOGIN: 'login',
        LOGOUT: 'logout',
        CHECK_SESSION: 'check-session-token'
    },
    PARTNER: {
        ADD: 'add-partner',
        UPDATE: 'update-partner',
        GET: 'get-partner',
        GET_ALL: 'get-partners',
        DELETE: 'delete-partner',
        DELETE_ALL: 'delete-all-partners',
        ADD_MULTIPLE: 'add-multiple-partners'
    },
    BOOK: {
        ADD: 'add-book',
        UPDATE: 'update-book',
        SET_STATE: 'set-book-state',
        GET: 'get-book',
        GET_ALL: 'get-books',
        DELETE: 'delete-book',
        DELETE_ALL: 'delete-all-books',
        ADD_MULTIPLE: 'add-multiple-books'
    }
}
