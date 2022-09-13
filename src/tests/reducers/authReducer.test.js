import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


describe('Pruebas en authReducer', () => {
    
    test('debe hacer el login', () => {

        const action = {
            
            type: types.login,
            payload: {
                uid: '123',
                displayName: 'Xavier'
            }

        };

        const user = authReducer( {}, action );

        expect( user ).toEqual({
            uid: '123',
            name: 'Xavier'
        });

    });

    test('debe hacer el logout', () => {

        const state = authReducer({
            uid: '123',
            name: 'Xavier'
        }, { type: types.logout });

        expect( state ).toEqual( {} );

    });

    test('debe retornar el estado por defecto', () => {

        const state = authReducer( { name: 'Xavier' }, {} );

        expect( state ).toEqual( { name: 'Xavier' } );

    });
});