import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
    
    const dispatch = useDispatch();
    const { active } = useSelector( ({ notes }) => notes );
    
    const handleSave = () => {
        dispatch( startSaveNote( active ) );
    }

    const handlePictureCLick = () => {
        document.querySelector('#fileSelector').click()    
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if ( file ) {
            dispatch( startUploading( file ) );
            document.querySelector('#fileSelector').value = '';
        }
    }

    return (
        <div className="notes__appbar">
            <span>28 de agosto 2022</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureCLick }
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    );
};
