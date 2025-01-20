import React, { useState } from 'react';
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const App = () => {
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const cld = new Cloudinary({ cloud: { cloudName: 'dgo8zfdjj' } });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Replace with your upload preset name

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dgo8zfdjj/image/upload`,
        formData
      );
      setUploadedImage(response.data.public_id);
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  const img = uploadedImage
    ? cld
        .image(uploadedImage)
        .format('auto')
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500))
    : cld.image('cld-sample-5').format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <AdvancedImage cldImg={img} />
    </div>
  );
};

export default App;
