import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';


const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {
    
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

const store = mockStore( initState );

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);


describe('Pruebas en <RegisterScreen />', () => {

    beforeEach( () => {

        store.clearActions();
        jest.clearAllMocks();
        
    });

    test('debe mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot()
    });

    test('debe disparar setError', () => {

        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate( 'change', {
            target: {
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').simulate( 'submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
            
        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        });
        
    });

    test('debe de mostrar la caja de alerta con el error', () => {

        const initState = {
    
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email no es correcto'
            }
        };
        
        const store = mockStore( initState );
        
        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect( wrapper.find('.auth__alert-error').exists() ).toBe( true );
        expect( wrapper.find('.auth__alert-error').text().trim() ).toBe( initState.ui.msgError );
        
    });

});