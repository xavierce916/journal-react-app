import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login } from '../../actions/auth';
import { firebase } from '../../firebase/firebase-config'
import { AppRouter } from '../../routers/AppRouter';

jest.mock( '../../actions/auth', () => ({
    login: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {
    
    auth: {},

    ui: {
        loading: false,
        msgError: null
    },

    notes: {
        active: {
            id: ''
        },

        notes: []
    }
};

const store = mockStore( initState );
store.dispatch = jest.fn();


describe('Pruebas en <AppRouter />', () => {
    
    test('debe de llamar el login si estoy autenticado', async () => {
        
        await act( async () => {
            
            const userCreds = await firebase.auth().signInWithEmailAndPassword( 'test@test.com', 'testing' );
            const user = userCreds.user;
    
            const wrapper = mount(
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );

        });

        expect( login ).toHaveBeenCalledWith('fBZ8x370cEWNr7B7pIFna9muHv13', null );
    });
    
});