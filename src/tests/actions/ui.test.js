import { setError, removeError, startLoading, finishLoading, } from '../../actions/ui';
import { types } from '../../types/types';

describe('Pruebas ui-actions', () => {

    test('deben funcionar todas las acciones', () => {


        const setErrorAction = setError('error');
        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();

        expect( setErrorAction ).toEqual({
            type: types.uiSetError,
            payload: 'error'
        });
        expect( removeErrorAction ).toEqual({
            type: types.uiRemoveError
        });
        expect( startLoadingAction ).toEqual({
            type: types.uiStartLoading
        });
        expect( finishLoadingAction ).toEqual({
            type: types.uiFinishLoading
        });

    });

});