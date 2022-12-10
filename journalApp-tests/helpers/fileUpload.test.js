

import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'cloudinary-raul',
    api_key: '493676313838341',
    api_secret: 'ubvBpWACMSwe_VxfK37kZJVWpzI',
    secure: true,
})


describe('test on helper fileUpload.js', () => { 
    

    test('should upload file into Cloudinary', async() => { 
        
        const imageUrl= 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'image.png');

        const url = await fileUpload( file );
        console.log(url)
        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');
        // console.log(segments);
        // console.log({imageId});

        const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
            resource_type: 'image'
        });
        console.log(cloudResp);





     });

    test('should upload file into Cloudinary', async() => { 
        
        const file = new File([], 'image.png');
        const url = await fileUpload( file );
        
        expect( url ).toBe( null );
     });


    
 })