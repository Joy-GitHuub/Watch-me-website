import React from 'react';
import './ShowImage.css'
import useAuth from './../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {saveAs} from 'file-saver';
import useHandleCollection from '../../../Hooks/useHandleCollection';
import usePhotoLike from '../../../Hooks/usePhotoLike';


const ShowImage = ({image}) => {
    const {firebase, dbUser} = useAuth();
    const {user}= firebase;
    const { _id, like, photoURL, title, postedBy} = image;
    const [colorChange, setColorChange] = React.useState(false);


    const navigate = useNavigate();
    const handlePhotoDetails = (id) => {
     navigate(`/photoDetails/${id}`)
    };


    const handleDownloadImage = (photoURL) => {
      saveAs(photoURL, 'photo.jpg');
    }

    const {handleAddToCollection} = useHandleCollection()

    const handleCollection = (id) => {
      const addInfo = {
         userEmail: user?.email,
         id: id,     
      };
      handleAddToCollection(addInfo)
    };


   
    const {handleLikePhoto} = usePhotoLike();
    const handleUserLikePhoto = (image) => {
      const photoInfo = {
          photoID: image._id,
          userID: dbUser?.dbUser?._id,
      };
     handleLikePhoto(photoInfo)
     .then((data) => {
      if (!colorChange) {
         setColorChange(true)
      }else{
         setColorChange(false);
      }
  });}


  let likePhoto = like?.find((id) => id === dbUser?.dbUser?._id);

  const handleUserInfo = (id) => {
   navigate(`/user-profile/${id}`);
  }


    return (

      <section className='image_grid'>

            <img
            onClick={() => handlePhotoDetails(_id)}
            className='post-img' src={photoURL} alt="" />
            
            <div
            onClick={() => handleUserInfo(postedBy?._id)}
            className='photo_owner_details' title={title}>
               <img src={image?.postedBy?.photoURL} alt="" />
               <h5>{image?.postedBy?.displayName}</h5>
            </div>

         <div className="photo_icon_container">
         {!likePhoto &&<span
         onClick={() => handleUserLikePhoto(image)}
         className= {`${colorChange ? 'love-icon user-like': 'love-icon'}`}
         >
            <svg width="12" height="12" className="TrVF8" viewBox="0 0 32 32" version="1.1" aria-hidden="false"><desc lang="en-US">A heart</desc><path d="M17.4 29c-.8.8-2 .8-2.8 0l-12.3-12.8c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.3 0l2.4 2.8 2.3-2.8c3.1-3.1 8.2-3.1 11.3 0 3.1 3.1 3.1 8.2 0 11.4l-12.2 12.8z"></path></svg>
            </span>}

         {likePhoto &&<span
         onClick={() => handleUserLikePhoto(image)}
         className= {`${!colorChange ? 'love-icon user-like': 'love-icon'}`}>
            <svg width="12" height="12" className="TrVF8" viewBox="0 0 32 32" version="1.1" aria-hidden="false"><desc lang="en-US">A heart</desc><path d="M17.4 29c-.8.8-2 .8-2.8 0l-12.3-12.8c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.3 0l2.4 2.8 2.3-2.8c3.1-3.1 8.2-3.1 11.3 0 3.1 3.1 3.1 8.2 0 11.4l-12.2 12.8z"></path></svg>
            </span>}


           <span
           onClick={() => handleCollection(_id)}
           className='add-collection-icon'>
           <svg width="12" height="12" className="utUL6" viewBox="0 0 32 32" version="1.1" aria-hidden="false"><desc lang="en-US">A plus sign</desc><path d="M14 3h4v26h-4zM29 14v4h-26v-4z"></path></svg>
           </span>

            <span className='download-icon'
            onClick={() =>handleDownloadImage(`https://watch-me-server-gamma.vercel.app/images/${photoURL}`)}
            >
            <svg width="12" height="12" className="c_c7b" viewBox="0 0 32 32" version="1.1" aria-hidden="false"><desc lang="en-US">Arrow pointing down</desc><path d="M25.8 15.5l-7.8 7.2v-20.7h-4v20.7l-7.8-7.2-2.7 3 12.5 11.4 12.5-11.4z"></path></svg>
            </span>
         </div>

       </section>

    );
};

export default ShowImage;