import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";


describe('tests on uiSlice.js', () => { 
    

    test('should return defualt state', () => { 
    
        expect( uiSlice.getInitialState() ).toEqual({ isDateModalOpen: false });
        expect( uiSlice.getInitialState().isDateModalOpen ).toBeFalsy();
        
     });

     test('should change isDateModalOpen to open', () => { 
        
        let state = uiSlice.getInitialState();

        state = uiSlice.reducer(state, onOpenDateModal());

        expect( state ).toEqual({ isDateModalOpen: true });
        expect( state.isDateModalOpen ).not.toBeFalsy();
        expect( state.isDateModalOpen ).toBeTruthy();
        
        state = uiSlice.reducer(state, onCloseDateModal());
        expect( state ).toEqual({ isDateModalOpen: false });
        expect( state.isDateModalOpen ).not.toBeTruthy();
        expect( state.isDateModalOpen ).toBeFalsy();
    
      });

 })