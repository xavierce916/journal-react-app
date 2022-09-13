import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock( '../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {
    
    auth: {},
    ui: {
        loading: false
    }
};

const store = mockStore( initState );

store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <LoginScreen />', () => {

    beforeEach( () => {

        store.clearActions();
        jest.clearAllMocks();
        
    });

    test('debe mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();
        
    });

    test('debe disparar la acción startGoogleLogin', () => {

        wrapper.find( '.google-btn' ).prop('onClick')();

        expect( startGoogleLogin ).toHaveBeenCalled();
    });

    test('debe disparar la acción startLogin con los respectivos argumentos', () => {

        wrapper.find( 'form' ).prop( 'onSubmit' )({ preventDefault: ()=>{} });

        expect( startLoginEmailPassword ).toHaveBeenCalledWith( 'xavier@gmail.com', '1234' );

    });

});