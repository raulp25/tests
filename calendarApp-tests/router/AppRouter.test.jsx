







import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";



jest.mock("../../src/hooks/useAuthStore");
jest.mock("../../src/calendar", () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}));


describe('tests on AppRouter', () => { 


    const mockCheckAuthToken = jest.fn();

    test('should render Loading h3 and should call checkAuthToken', () => { 
        

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken,
        })

        render( <AppRouter />)
        screen.debug()
        expect(screen.getByText('Cargando...')).toBeTruthy();
        expect( mockCheckAuthToken ).toHaveBeenCalled();
    });

    test('should render login auth if user is not authenticated', () => { 
        

        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken,
        })

        const {container} = render( 
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        )
        screen.debug()
        expect( mockCheckAuthToken ).toHaveBeenCalled();
        expect(screen.getByText('Ingreso')).toBeTruthy();
        expect(container).toMatchSnapshot();
        
    });

    test('should render the <Calendar /> if user is not authenticated', () => { 
        

        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken,
        })

        render( 
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        )
        screen.debug()
        expect(screen.getByText('CalendarPage')).toBeTruthy();
        
        
    });



 })