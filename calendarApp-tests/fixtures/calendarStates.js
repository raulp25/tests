export const events = [
    {
            id: '1',
            start: new Date('2022-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: 'Drink Coffee Expresso With Joanna',
            notes: 'Bring info for the investors'
    },

    {
            id: '2',
            start: new Date('2022-11-21 13:00:00'),
            end: new Date('2022-11-21 15:00:00'),
            title: 'Fernanda Birthday',
            notes: 'Bring Tequila'
    }
]


export const initialState = {
    isLoadingEvents: true,
        events: [],
        activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
        events: [ ...events ],
        activeEvent: null
}

export const calendarWithActiveEventsState = {
    isLoadingEvents: false,
        events: [ ...events ],
        activeEvent: { ...events[0] }
}






