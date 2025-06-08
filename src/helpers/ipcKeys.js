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
    },
    LOAN: {
        ADD: 'add-loan',
        UPDATE: 'update-loan',
        SET_STATE: 'set-loan-state',
        GET: 'get-loan',
        GET_ALL: 'get-loans',
        DELETE_ALL: 'delete-all-loans',
        ADD_MULTIPLE: 'add-multiple-loans'
    },
    REPORTS: {
        GET_AUTHORS_WITH_MORE_BOOKS: 'get-authors-with-more-books',
        GET_MOST_BORROWED_BOOKS: 'get-most-borrowed-books',
        GET_MOST_POPULAR_THEMES: 'get-most-popular-themes',
        GET_MOST_READER_SECTION: 'get-most-reader-section'
    }
}
