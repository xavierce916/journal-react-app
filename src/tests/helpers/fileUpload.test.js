// import cloudinary from 'cloudinary';

import { fileUpload } from '../../helpers/fileUpload';


// cloudinary.config({ 
//     cloud_name: 'dzvqf3tqj', 
//     api_key: '691424188328472', 
//     api_secret: 'Te_wXv-KEjeSf6U-zuQTpIosWRU',
//     secure: true
// });



describe('Pruebas en fileUpload', () => {

    // test('debe subir la imagen', async (done) => {
        
    //     const resp =  await fetch( 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' );
    //     const blob =  await resp.blob();

    //     const file = new File( [ blob ], 'foto.png' );
    //     const url = await fileUpload( file );

    //     expect( typeof url ).toBe( 'string' );


    //     const segments = url.split('/');
    //     const imageId = segments[ segments.length - 1 ].replace( '.png', '' );
    //     console.log(imageId);
    //     cloudinary.v2.api.delete_resources(imageId, {}, () => {
    //         done();
    //     });

    // });

    test('debe retornar un error', async () => {
        
        

        const file = new File( [], 'foto.png' );
        const url = await fileUpload( file );

        expect( url ).toBe( null );
    });

});