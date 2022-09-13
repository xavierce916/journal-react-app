

export const fileUpload = async ( file ) => {
    
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dzvqf3tqj/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);
    
    const resp = await fetch( cloudUrl, {
        method: 'POST',
        body: formData
    });
    try {
        
        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;

        } else {
            return null
        }

    } catch (err) {
        throw err;
    }
}