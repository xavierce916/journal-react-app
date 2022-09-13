import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';

jest.mock( '../../../actions/notes', () => ({
    activeNote: jest.fn()
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
            id: '',
            body: '',
            title: ''
        },

        notes: []
    }
};

const store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
            <NoteScreen />
    </Provider>
);

describe('Pruebas en <NoteScreen />', () => {

    test('debe de mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    });

    test('debe disparar el active note', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola'
            }
        });

        expect( activeNote ).toHaveBeenLastCalledWith(
            '',
            {
                body: '',
                title: 'Hola',
                id: '',
            }
        )
    });
});