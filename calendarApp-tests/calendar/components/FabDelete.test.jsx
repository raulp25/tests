import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks";


jest.mock('../../../src/hooks/useCalendarStore');

const mockStartDeletingEvent = jest.fn();

beforeEach(() => jest.clearAllMocks() );

describe('tests on <FabDelete />', () => { 
    

    test('should render component', () => { 

        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        })
        render( <FabDelete /> );

        screen.debug();

        const btn = screen.getByLabelText('btn-delete');

        expect( btn.classList ).toContain('btn');
        expect( btn.classList ).toContain('btn-danger');
        expect( btn.classList ).toContain('fab-danger');
        expect( btn.style.display ).toBe('none');

    });

    test('should render button if theres an active event', () => { 

        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        })
        render( <FabDelete /> );

        screen.debug();

        const btn = screen.getByLabelText('btn-delete');

        expect( btn.style.display ).toBe('');
        

    });

    test('should execute startDeletingEvent fn if theres an activeEvent', () => { 

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        })
        render( <FabDelete /> );

        screen.debug();

        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click( btn );
        
        expect(mockStartDeletingEvent).toHaveBeenCalled();

    });

 })