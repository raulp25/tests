import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";


describe('tests on calendarSlice.js', () => { 
    

    test('should return initialState', () => { 
        
        const state = calendarSlice.getInitialState();
        expect(state).toStrictEqual(initialState);

     });

    test('should execute onSetActiveEvent action', () => { 
        

        const state = calendarSlice.reducer( calendarWithEventsState ,onSetActiveEvent( events[0] ) );
        expect(state.activeEvent).toStrictEqual(events[0]);
        expect(state).toStrictEqual(calendarWithActiveEventsState);

     });

    test('should execute onAddNewEvent action', () => { 
        
        const newEvent = {
            id: '3',
            start: new Date('2022-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: 'Pick up Ferrari',
            notes: 'buy tires'
        }
        const state = calendarSlice.reducer( calendarWithEventsState ,onAddNewEvent( newEvent ) );
        expect(state.events).toStrictEqual([ ...events, newEvent ]);
        
    });
    
    test('should execute onUpdate action', () => { 
        
        const updatedEvent = {
            id: '1',
            start: new Date('2022-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: 'UDPATED With Joanna',
            notes: 'Bring THE UDPDATES'
        }
        const state = calendarSlice.reducer( calendarWithEventsState ,onUpdateEvent( updatedEvent ) );
        expect(state.events).toContain( updatedEvent );
        
     });

    test('should execute onDeleteEvent action deleting active event', () => { 
        
        const state = calendarSlice.reducer( calendarWithActiveEventsState, onDeleteEvent() );
        expect(state.events).not.toContain( events[0] );
        expect(state.activeEvent).toBe( null );
        expect(state.events).toStrictEqual([ events[1] ]);
        
     });
     
     test('should execute onLoadEvents action loading the events', () => { 
         
         const newEvent = {
            id: '3',
            start: new Date('2022-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: 'Pick up Ferrari',
            notes: 'buy tires'
        }

        const dbEvents = [...events, newEvent ];
        const state = calendarSlice.reducer( initialState ,onLoadEvents(dbEvents) );
        expect(state.events).toStrictEqual( dbEvents );
        expect(state.isLoadingEvents).toBe( false );

        const newState = calendarSlice.reducer( state, onLoadEvents(dbEvents) )
        expect( state.events.length ).toBe( dbEvents.length );
    });
    
    
    test('should execute onLogoutCalendar action and restart state to initialState', () => { 
        
        const state = calendarSlice.reducer( calendarWithEventsState , onLogoutCalendar() );
        expect(state).toStrictEqual( initialState );

    });
    
})
