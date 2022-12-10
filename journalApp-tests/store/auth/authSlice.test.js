import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedStateWithErrorMessage, notAuthenticatedStateWithoutErrorMessage } from "../../fixtures/authFixtures";


describe('tests on authSlice.js', () => { 


    test('should return initialState and be named "auth" ', () => { 
        
        expect( authSlice.name ).toBe('auth');

        const state = authSlice.reducer( initialState, {} );
        expect( state ).toEqual(initialState);
     });

     test('should do/run the authentication/login',  () => { 
        
         const state = authSlice.reducer( initialState, login(demoUser) );
         expect(state).toEqual(authenticatedState);
      });

     test('should do/run the not authenticated/logout without errorMessage prop ',  () => { 
        
         const state = authSlice.reducer( authenticatedState, logout() );
         
         expect(state).toEqual(notAuthenticatedStateWithoutErrorMessage);
        });
        
     test('should do/run the not authenticated/logout with errorMessage prop ',  () => { 

         const errorMessage = 'Error in credentials';
         const state = authSlice.reducer( authenticatedState, logout({ errorMessage}) );
         
         expect(state).toEqual(notAuthenticatedStateWithErrorMessage);
         
        });

     test('should do/run the auth/checkingCredentials',  () => { 

         const state = authSlice.reducer( authenticatedState, checkingCredentials() );
         
         expect(state.status).toBe('checking');
         
        });
        
 })



        

