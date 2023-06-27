import React from 'react';

const useImage = () => {

    const [images, setImages] = React.useState([]);


    return { images, setImages };
};

export default useImage;