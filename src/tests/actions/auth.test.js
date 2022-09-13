import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {};

const store = mockStore( initState );

describe('Pruebas en auth-actions', () => {

    beforeEach( () => {

        store.clearActions();

    });

    test('login y logout deben crear las acciones respectivas', () => {
        
        expect( login( '', '' ) ).toEqual({
            type: types.login,
        
            payload: {
                uid: '',
                displayName: ''
            }
        });

        expect( logout() ).toEqual({ type: types.logout });
    });

    test('debe realizar el startLogout', async () => {

        await store.dispatch( startLogout() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });

    });

    test('debe de iniciar el startLoginEmailPassword', async () => {

        await store.dispatch( startLoginEmailPassword( 'test@test.com', 'testing' ) );

        const actions = store.getActions();

        expect( actions[1] ).toEqual({
            type: types.login,
        
            payload: {
                uid: 'fBZ8x370cEWNr7B7pIFna9muHv13',
                displayName: null
            }
        });

    });

});