import { configureStore } from "@reduxjs/toolkit"
import { act, renderHook, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { calendarApi } from "../../src/api"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { authSlice } from "../../src/store"
import { notAuthenticatedState, initialState } from "../fixtures/authStates"
import { testUserCredentials } from "../fixtures/testUser"


const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState } //*aqui se puede poner sin los brackets pero para evitar que se conecten referencias en memoria que puedan mutar el store
        }
    })
}


describe('Tests on useAuthStore.js', () => { 
    
    beforeEach(() => localStorage.clear() );

    test('should return default values', () => { 
        
        const mockStore = getMockStore({ status: 'checking', user:{}, errorMessage: undefined });

        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider> 
        } );
        expect(result.current).toStrictEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            startLogout: expect.any(Function),
          })

        });

        test('should execute login when startLogin is invoked', async() => { 
            //* limpiamos localstorage previniendo que en algun otro test se haya grabado sobre la instancia
            //* de localstorage que internamente tiene jest 
            

            const mockStore = getMockStore({...notAuthenticatedState})
            const {result} = renderHook( () => useAuthStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{children}</Provider> 
            } );
            
            await act(async() => await result.current.startLogin( testUserCredentials ));
            console.log(result.current);

            const { errorMessage, status, user }= result.current;

            expect({ errorMessage, status, user }).toStrictEqual({
                status: 'authenticated',
                user: { name: 'Test User', uid: '634304aa0885bedefe0f4b1b' },
                errorMessage: undefined 
            });

            expect( localStorage.getItem('token') ).toEqual(expect.any(String));
            expect( localStorage.getItem('token-init-date') ).toEqual(expect.any(String));

         })
        test('should execute login when startLogin is invoked and fail the authentication', async() => { 
            // limpiamos localstorage previniendo que en algun otro test se haya grabado sobre la instancia
            // de localstorage que internamente tiene jest 
            

            const mockStore = getMockStore({...notAuthenticatedState})
            const {result} = renderHook( () => useAuthStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{children}</Provider> 
            } );
            
            await act(async() => await result.current.startLogin({ user: 'bademail@gmail.com', password: 'cherokonaSRT' }));
            console.log(result.current);

            const { errorMessage, status, user }= result.current;

            console.log({ errorMessage, status, user });
            //* como estamos haciendo prueba de integracion con el backend el errorMessage en el equal podemos dejarlo
            //* como expect.any(String) por si no importara el texto pero en esta caso lo dejamos, queda a discresion
            expect(localStorage.getItem('token')).toBe(null);
            expect({ errorMessage, status, user }).toStrictEqual({
                errorMessage: 'Incorrect Credentials',
                status: 'not-authenticated',
                user: {}
            });

            await waitFor(
                () => expect( result.current.errorMessage).toBe(undefined)
            )
          
         });


         test('should create newUser when startRegister is invoked', async() => { 

            const newUser = { user: 'KAMION@gmail.com', password: 'cherokonaSRT', user: 'BadUser Fernanda' }
            const mockStore = getMockStore({...notAuthenticatedState})
            const {result} = renderHook( () => useAuthStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{children}</Provider> 
            } );

            const spy = jest.spyOn( calendarApi, 'post').mockReturnValue({
                data:
                {   ok: true,
                    uid: '1234343242',
                    name: 'Test User KAMION',
                    token: 'Algun Token'
                }
            })
            
            await act(async() => await result.current.startRegister(newUser));
            console.log(result.current);


            const { errorMessage, status, user } = result.current;

            console.log({errorMessage, status, user})
            expect({errorMessage, status, user}).toStrictEqual({
                errorMessage: undefined,
                status: 'authenticated',
                user: { name: 'Test User KAMION', uid: '1234343242' }
              })

            //*   importante restaurar el spy para que no interfiera con otros tests de aqui
              spy.mockRestore();

          });


          test('should faild creation when startRegister is invoked', async() => {   

            const mockStore = getMockStore({...notAuthenticatedState})
            const {result} = renderHook( () => useAuthStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{children}</Provider> 
            } );
            
            await act(async() => await result.current.startRegister(testUserCredentials));
            console.log(result.current);


            const { errorMessage, status, user } = result.current;

            console.log({errorMessage, status, user})
            expect({errorMessage, status, user}).toStrictEqual({
                errorMessage: 'User Already Registered',
                   status: 'not-authenticated',
                   user: {}
              })

            //*   importante restaurar el spy para que no interfiera con otros tests de aqui
            
           })

          test('should fail JWT authentication if theres no token hen checkAuthToken is invoked', async() => {   

            const mockStore = getMockStore({...initialState})
            const {result} = renderHook( () => useAuthStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{children}</Provider> 
            } );

            console.log('token', localStorage.getItem('token'))
            
            await act(async() => await result.current.checkAuthToken());

            const { errorMessage, status, user } = result.current;

            console.log({errorMessage, status, user})
            expect({errorMessage, status, user}).toStrictEqual({
                errorMessage: undefined,
                   status: 'not-authenticated',
                   user: {}
              })
            
           })

          test('should authenticate user when checkAuthToken is invoked and a JWT is provided', async() => {   

            const { data } = await calendarApi.post('/auth', testUserCredentials);
            localStorage.setItem('token', data.token);

            const mockStore = getMockStore({...initialState})
            const {result} = renderHook( () => useAuthStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{children}</Provider> 
            } );

            console.log('token', localStorage.getItem('token'))
            
            await act(async() => await result.current.checkAuthToken());

            const { errorMessage, status, user } = result.current;

            console.log({errorMessage, status, user})
            expect({errorMessage, status, user}).toStrictEqual({
                errorMessage: undefined,
                status: 'authenticated',
                user: { name: 'Test User', uid: '634304aa0885bedefe0f4b1b' }
              })

            
           })

    })

    
