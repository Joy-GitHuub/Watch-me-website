import React from 'react';
import { useNavigate } from 'react-router-dom';

const MorePhotoImage = ({image}) => {
    const { _id,photoURL} = image;

    const navigate = useNavigate();
    
    const handlePhotoDetails = (id) => {
     navigate(`/photoDetails/${id}`)
    };

    return (
<section className='image_grid2'>

<img
onClick={() => handlePhotoDetails(_id)}
className='post-img' src={photoURL} alt="" />
</section>
    );
};

export default MorePhotoImage;