# Gallery App
An art gallery app. The frontend was created with React and MaterialUI. The server was constructed with NodeJS and is connected to a MySQL database.  

## Functionality

The home page presents the options of visiting the art gallery without creating an account or creating one/logging in with an already existing one. 

![Screenshot_1](https://github.com/magdaV24/gallery_app/assets/114444914/0b20e89c-115e-4f4f-93c9-0bda9450e38e)


The gallery page displays the public art works submitted. If logged in, the user can submit a work of art through a form. The photo is saved to Cloudinary and its public id is collected. Along with a title, a description and the visibility ststus, the data is sent to the MySQL database

![Screenshot_4](https://github.com/magdaV24/gallery_app/assets/114444914/9383211f-c5c3-41d2-8806-8848c540860c)
![Screenshot_5](https://github.com/magdaV24/gallery_app/assets/114444914/b747dab4-c2dd-49ba-94f8-676376ba6f70)

![Screenshot_3](https://github.com/magdaV24/gallery_app/assets/114444914/4010eb45-b0e9-4a21-bb62-08cc04673c20)

Clicking on the work's thumbnail, a modal will appear with further information, such as a link to the creator's public page. 
![Screenshot_8](https://github.com/magdaV24/gallery_app/assets/114444914/39af0a85-7d67-4ecf-a079-cba7d19e3948)

The creator's public page displays contact information, provided during the registration proccess.
![Screenshot_9](https://github.com/magdaV24/gallery_app/assets/114444914/6dbf3b7d-f4d2-43af-bd85-ea3854e74d6e)

The user also has their own dashboard, which displays all of their art works, regardless of privacy settings. They have the options of editing or deleting their works.
![Screenshot_6](https://github.com/magdaV24/gallery_app/assets/114444914/d131f53f-a04b-4db0-bfb6-cda86b8ac7bd)
