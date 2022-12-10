export const initialState = {
    
        status: 'checking', //'authenticating', 'not-authenticated' 
        user: {},
        errorMessage: undefined,
    }

export const authenticatedState = {
    
        status: 'authenticated', //'authenticating', 'not-authenticated' 
        user: { 
            uid: 'ABC',
            name: 'Joanna'
        },
        errorMessage: undefined,
    }

export const notAuthenticatedState = {
    
        status: 'not-authenticated', //'authenticating', 'not-authenticated' 
        user: {},
        errorMessage: undefined
    }