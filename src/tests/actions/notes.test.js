/** * @jest-environment node */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileUpload';

jest.mock("../../helpers/fileUpload", () => {
    return {
      fileUpload: () => {
        return Promise.resolve("cualquierlinlk/cualquierimagen.jpg");
      },
    };
  });

// global.scrollTo = jest.fn();
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {
    
    auth: {
        uid: 'TESTING'
    },

    notes: {
        active: {
            id: '111a81GjGfTJ6GsL18vC',
            title: '',
            body: ''
        }
    }

};

let store = mockStore( initState );

describe('Pruebas en notes-actions', () => {

    beforeEach( () => {

        store.clearActions();

    });
    
    afterAll( ()=> {
        db.disableNetwork();

    });
    
    test('debe crear una nueva nota startNewNote', async () => {
        
        await store.dispatch( startNewNote() );

        const actions = store.getActions();

        const payload = {
            id: expect.any( String ),
            title: '',
            body: '',
            date: expect.any( Number )
        };

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                ...payload
            }
        });

        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                ...payload
            }
        });

        const { id: docId } = actions[0].payload
        await db.doc( `TESTING/journal/notes/${ docId }` ).delete();

    });

    
    
    test('startLoadingNotes debe cargar las notas', async () => {
        
        await store.dispatch( startLoadingNotes('TESTING') );
        
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any( Array )
        });
        
        const expected = {
            id: expect.any( String ),
            title: expect.any( String ),
            body: expect.any( String ),
            date: expect.any( Number ),
        };
        
        expect( actions[0].payload[0] ).toMatchObject( expected );
        
        
    });

    test('startSaveNote debe actualizar la nota', async () => {

        const note = {
            id: '111a81GjGfTJ6GsL18vC',
            title: 'titulo',
            body: 'body'
        };

        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdate );

        const docRef = await db.doc( `TESTING/journal/notes/${ note.id }` ).get();

        expect( docRef.data().title ).toBe( note.title );

    });

    test('startUploading debe actualizar el url del entry', async () => {

        const file = [];
        await store.dispatch( startUploading( file ) );

        const docRef = await db.doc( `TESTING/journal/notes/111a81GjGfTJ6GsL18vC` ).get();

        expect( docRef.data().url ).toBe( 'cualquierlinlk/cualquierimagen.jpg' );

    });
    
});

