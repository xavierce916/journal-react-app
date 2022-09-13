import { types } from "../../types/types";

describe('Pruebas en types.js', () => {

    test('debe ser el objeto correcto', () => {
        
        const typesTest = {
            login: '[Auth] login',
            logout: '[Auth] logout',
        
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
        
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
        
            notesAddNew: '[Notes] New Note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdate: '[Notes] Updated note',
            notesFileURl: '[Notes] Updated image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout Cleaning'        
        };

        expect( types ).toEqual( typesTest );

    });
});