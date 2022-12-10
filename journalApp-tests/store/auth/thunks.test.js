import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth';
import { checkingAuthentication } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

//* Esto hace un mock completo de todas las exportaciones de ese archivo por lo que 
//* en automatico todas sus funciones se convierten en mocks y no es necesario crear 
//* una jest.fn para mockearlas y simulamos el evento de haber registrado al usuario en firebase
//* a diferencia del test del thunk del journal o del fileupload.js donde si utilizamos el sdk
// *para subir la data a la base de datos y despues borrar los archivos inmediatamente
jest.mock('../../../src/firebase/providers');

const dispatch = jest.fn();

afterEach( () => jest.clearAllMocks() );

describe('tests on authThunks.js', () => { 
    
    test('should dispatch checkingCredentials() when checkingAuthentication fn thunk is invoked', async() => { 
        
        // const v = checkingCredentials();
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
     });


    test('should call [ checkingCredentials and login with user data ] when startGoogleSignIn is invoked', async() => { 
        
        const loginData= { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );
        // thunk 
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

     });

    test('should call [ checkingCredentials and logout with errorMessage & errorCode ] when startGoogleSignIn is invoked', async() => { 
        
        const error = {
            errorMessage: 'Credentials not found 401',
            errorCode: 401,
        }
   
        const loginData= { ok: false, ...error };
        // mock provider fn 
        await signInWithGoogle.mockResolvedValue( loginData );
        // thunk 
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));

     });

     test('should [ call checkingCredentials and login ] when startCreatingUserWithEmailPassword is invoked', async() => { 
        
        const loginData = { ok: true, ...demoUser };
        await registerUserWithEmailPassword.mockResolvedValue( loginData );

        await startCreatingUserWithEmailPassword( loginData )(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( login(loginData) );

      });


      test('should [ call checkingCredentials and logout with errorMessage & errorCode ] when startCreatingUserWithEmailPassword is invoked', async() => { 
      
        const error = { errorMessage: 'Credentials not found 401', errorCode: 401 };
        const { errorMessage, errorCode } = error;
        const formData = { email: demoUser.email, password: 'joe21' };
        const loginData = { ok:false, errorMessage, errorCode };

        await registerUserWithEmailPassword.mockResolvedValue( loginData );

        await startCreatingUserWithEmailPassword( formData )(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( logout({ ok:false, errorMessage, errorCode }) );
        
      });


     test('should [ call checkingCredentials and login ] when startLoginWithEmailPassword is invoked', async() => { 

        const loginData = { ok: true, ...demoUser };

        const formData = {email: demoUser.email, password: 'joe21'};

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)(dispatch);


        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( login( loginData ) );

      });

     test('should call [ checkingCredentials and logout with errorMessage & errorCode ] when startLoginWithEmailPassword is invoked', async() => { 

        const error = { errorMessage:'Credentials not found 401', errorCode: 401 }
        const loginData = { ok: false, ...error};

        const formData = {email: demoUser.email, password: 'joe21'};

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)(dispatch);


        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( logout( loginData ) );

      });

      test('should call logoutFirebase, clearNotes and logout when startLogout is invoked', async() => { 
        
        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
       });


       //* startCretinguserwithemailpassword

 })