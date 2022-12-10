








import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useUiStore } from "../../src/hooks/useUiStore";
import { store, uiSlice } from "../../src/store";


//* mockeamos el store y solo ponemos lo que el hook necesite para funcioanr que en este caso 
//* es el uiSlice.reducer 
//* es una funcion que se manda a llamar para crear el store que esta en el provider del test 
const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState } //*aqui se puede poner sin los brackets pero para evitar que se conecten referencias en memoria que puedan mutar el store
        }
    })
}


describe('tests on useUiStore.js', () => { 
    

    test('should render default values', () => { 
        //* el isDateModalOpen lo sacamos del uiSlice del initialState 
        //* con todo este desmadre del mockStore ya podemos poner el estado del store en cualquier forma con cualquier argumento
        const mockStore = getMockStore({ isDateModalOpen: false })

        //* sin el wrapper no funciona el provider afuera o cualquier otra cosa rara que intentemos
        //* siempre se recomienda pasar children aunque no sea nada 
       const {result} = renderHook(() => useUiStore(),{
        wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
       });

    //    console.log(result)
       expect(result.current).toStrictEqual({
        isDateModalOpen: false,
        openDateModal: expect.any(Function),
        closeDateModal: expect.any(Function),
        toggleDateModal: expect.any(Function),
      })

     });


     test('should execute openDateModal and it must change from false to true the isDateModalOpen', () => { 
        
        const mockStore = getMockStore({ isDateModalOpen: false })

        const {result} = renderHook(() => useUiStore(),{
        wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
       });

       //    el isDateModalOpen es un booleano y ese no pasa por referencia es mejor sacarlo directo del result.current 
       //    const { isDateModalOpen, openDateModal } = result.current;
       const { openDateModal } = result.current;
    //    cuando se ejecuta funcion o algo que modifique el state de react se necesita el act 
       act( () => { openDateModal(); } );
       //    console.log({result: result.current, isDateModalOpen})
       expect( result.current.isDateModalOpen ).toBeTruthy();

      });
      
     test('should execute closeDateModal and it must change from false to false the isDateModalOpen', () => { 
        
        const mockStore = getMockStore({ isDateModalOpen: true })

        const {result} = renderHook(() => useUiStore(),{
        wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
       });

       //    el isDateModalOpen es un booleano y ese no pasa por referencia es mejor sacarlo directo del result.current 
       //    const { isDateModalOpen, openDateModal } = result.current;
       const { closeDateModal } = result.current;
    //    cuando se ejecuta funcion o algo que modifique el state de react se necesita el act 
       act( () => { closeDateModal(); } );
       //    console.log({result: result.current, isDateModalOpen})
       expect( result.current.isDateModalOpen ).toBeFalsy();

      });

     test('should execute toggleDateModal and it must change from true to false and viceversa in the isDateModalOpen', () => { 
        
        const mockStore = getMockStore({ isDateModalOpen: true })

        const {result} = renderHook(() => useUiStore(),{
        wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
       });

       //    el isDateModalOpen es un booleano y ese no pasa por referencia es mejor sacarlo directo del result.current 
       //    const { isDateModalOpen, openDateModal } = result.current;
    //    const { toggleDateModal } = result.current;
    //    cuando se ejecuta funcion o algo que modifique el state de react se necesita el act 
       act( () => { result.current.toggleDateModal(); } );
        //   console.log({result: result.current.isDateModalOpen})
       expect( result.current.isDateModalOpen ).toBeFalsy();

       act( () => { result.current.toggleDateModal(); } ); 

       expect( result.current.isDateModalOpen ).toBeTruthy();

      });
      

 })