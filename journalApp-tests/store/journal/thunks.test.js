







import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

//* En este test como el FileUpload.js hacemos el envio de data a la base
//* de datos de firebase y despues borramos la Info a diferencia del thunk del 
//* authSlice donde mockeamos todo el provider de firebase porque se pueden mockear los 
//* resolvedValues . 

//* Por ejemeplo el getState es sincrono porque devuelve la store y de ahi podemos obtener el auth o 
//* el journal getState().auth y se le hace el mock.returnvalue en lugar del mock.returnResolvedValue 
//* que es asincrono como en el thunk del auth con el   await signInWithGoogle.mockResolvedValue( loginData );

describe('tests on journal thunks', () => { 

    const dispatch = jest.fn();
    const getState = jest.fn();
    
    beforeEach( () => jest.clearAllMocks() );


    test('should create new empty Note when startNewNote gets invoked  ', async() => { 
        const uid = 'TEST-UID'

        const newNote = {
            body: '',
            title: '',
            imageUrls: [],
            id: expect.any( String ),
            date: expect.any( Number )
        }

        getState.mockReturnValue({ auth: { uid: uid } });    
        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith( savingNewNote() );
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(newNote));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote(newNote));

        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

        const docs = await getDocs( collectionRef );
        // console.log(docs);

        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc(doc.ref) ) );

        await Promise.all( deletePromises );



     });


 })