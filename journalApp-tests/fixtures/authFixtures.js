export const initialState = {
    status: 'checking',  //* || authenticated || not authenticated 
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,  
}

export const authenticatedState = {
    status: 'authenticated',  //* || authenticated || not authenticated 
    uid: 'joecam21',
    email: 'joe21@gmail.com',
    displayName: 'Joanna Lauren',
    photoURL: 'https://demo.jpg',
    errorMessage: null,  
}

export const notAuthenticatedStateWithoutErrorMessage = {
    status: 'not-authenticated',  //* || authenticated || not authenticated 
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: undefined, 
}
export const notAuthenticatedStateWithErrorMessage = {
    status: 'not-authenticated',  //* || authenticated || not authenticated 
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: 'Error in credentials', 
}

export const demoUser = {
    uid: 'joecam21',
    email: 'joe21@gmail.com',
    displayName: 'Joanna Lauren',
    photoURL: 'https://demo.jpg'

}