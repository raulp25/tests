











import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";


    const store = configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        // preloadedState:{

        // }
    })



describe('tests on LoginPage.jsx', () => { 
    

    test('should render the LoginPage Component', () => { 
    

        render(
        <Provider store={ store } >
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        </Provider>
        
        );

        // screen-debug();

        expect(screen.getAllByAltText('Login')).toBeGreaterThanOrEqual(1);



     });




 })