









import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";



describe('tests on authSlice.js', () => { 
    

    test('should return initialState', () => { 
        // console.log(authSlice.getInitialState())
        expect( authSlice.getInitialState() ).toEqual( initialState );

     });

     test('should execute a login (onLogin) action', () => { 
        

        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        // console.log(state)
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        });

      });

          
    test('should execute a logout (onLogout) action with errorMessage', () => { 
        const errorMessage = 'Test User is not authenticated cuh'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        // console.log(state);
        expect(state).toStrictEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: 'Test User is not authenticated cuh'
        })
     });

    test('should execute a logout (onLogout) action without errorMessage = undefined', () => { 
        const errorMessage = 'Test User is not authenticated cuh'
        const state = authSlice.reducer( authenticatedState, onLogout() );
        // console.log(state);
        expect(state).toStrictEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        })
     });

    test('should execute a clearErrorMessage action errorMessage = undefined', () => { 
        const errorMessage = 'Test User is not authenticated cuh'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        // console.log(state);
        const cleanedState = authSlice.reducer( state, clearErrorMessage() );
        expect( cleanedState ).toStrictEqual( notAuthenticatedState );
        expect( cleanedState.errorMessage ).toBe( undefined );
     });

 })