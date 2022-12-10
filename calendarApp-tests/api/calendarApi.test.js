import calendarApi from "../../src/api/calendarApi";

describe('Tests on calendarApijs', () => { 
    

    test('should run defualt config with the baseURL: VITE_API_URL', () => { 
        
        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL )

     });

     test('should have x-token inside the header in all http requests', async() => { 

        const token = 'ABC-123-XYZ';
        // no importa si es un token valido o no, sino obtenga el token del localStorage
        localStorage.setItem('token',token);
        // no importa el endpoint si existe o no o el tipo de peticion get delete put post etc. 
        // Unicamente Hay que ver que este el x-token
        const resp = await calendarApi.get('/auth');
        expect(resp.config.headers['x-token']).toBe( token );

      });



 })