import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import useAuth from './../../../Hooks/useAuth';
import ShowImage from '../ShowImage/ShowImage';
import './ImageCategory.css';

const ImageCategory = () => {
  const [value, setValue] = React.useState(0);

  let x =  ['All','Wallpapers', '3D Renders', 'Travel', 'Nature', 'Street Photography', 'Experimental', 'Textures Patterns', 'Animals','Animation', 'Architecture & Interiors', 'Fashion & Beauty', 'Film', 'Food & Drink', 'People', 'Spirituality', 'Business & Work', 'Athletics', 'Health & Wellness', 'Current Events', 'Arts & Culture'];


  const {useImages, } = useAuth();
  const {images, setImages} = useImages;



  // const y = images?.map((photo) =>  { return photo.like});
//  const a = y?.filter(like => like.length)


  const handleChange = (event, newValue) => {
    setValue(newValue)
    const select = x[newValue];
    let url;
    if (select === 'All') {
      url =`https://watch-me-server-gamma.vercel.app/api/watch-me/v1/posts/post-upload`;
      fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setImages(data.data);
    })
    }
   else{
      url =`https://watch-me-server-gamma.vercel.app/api/watch-me/v1/posts/post-upload?category=${select}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setImages(data.data);
    })
    }
  };







    return (
        <>
          <Box sx={{ bgcolor: 'background.paper' }} className='image_category_section'>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {
           x.map((category,index) => 
             <Tab label={category} key
             ={index}>
           </Tab>)
        }
      </Tabs>
    </Box>


    {!images?.length ? 
    <section className='loading-gif-image'>
      <div className="loader-gif">
    <img src="https://doctors-portal-react.firebaseapp.com/static/media/Preloader.3e54c692.gif" alt="" />
      </div>
    </section>
   
     :
        <section className='image_container'>
        <div className="show_image_container_wrap">
          {
            images?.map((image, index) => <ShowImage
            key={index}
            image={image}
            ></ShowImage>)
          }
        </div>
        </section>      }

        </>
    );
};

export default ImageCategory;