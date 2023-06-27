import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import './PhotoDetailsPage.css'
import { saveAs } from 'file-saver';
import useHandleCollection from '../../Hooks/useHandleCollection';
import usePhotoLike from '../../Hooks/usePhotoLike';
import ShowImage from '../HOME/ShowImage/ShowImage';

const PhotoDetailsPage = () => {
    const {photoID} = useParams();
    const [singlePost, setSinglePost] = React.useState({});
    const [images, setImages] = React.useState([]);
    const {title, pin, category,  comments, postedBy, _id, like, photoURL} =singlePost;
    const { dbUser} = useAuth();


   
    const fetchGetSinglePost = async() => {
        const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/posts/singlePost/${photoID}`;
        const res = await fetch(url)
        const data = await res.json();
        if (data.status) {
            setSinglePost(data.data);
        }
    };

    const fetchSameCategoryPost = async() => {
        const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/posts/post-upload?category=${category}`
        const res = await fetch(url);
        const data = await res.json();
        setImages(data.data);
    }


    React.useEffect(() => {
        fetchGetSinglePost();
    }, [photoID]);

    React.useEffect(() =>{
        fetchSameCategoryPost();
    } , [category]);

    const handleDownloadImage = (photoURL, photoID) => {
        saveAs(photoURL, 'photo.jpg');

        const photoInfo = {
            id: photoID,
        };
        const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/posts/photoDownload`
        fetch(url, {
            method: "PATCH",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(photoInfo)
        }).then((res) => res.json())
        .then((data) => {
        })
      };



    const likePhoto = like?.find((id) => id === dbUser?.dbUser?._id)

      const handleComment = (event) => {
       event.preventDefault();
       const form = event.target;
       const commentBox = form.comment_box.value;
       const commentInfo = {
        photoID: singlePost._id,
        commentData: {
            commentBy: dbUser?.dbUser?._id,
            comment: commentBox,
        }
       }
       const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/posts/userComment`;
        fetch(url,{
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(commentInfo),
        } ).then((res) => res.json())
        .then((data) =>{
            form.comment_box.value = ''
            fetchGetSinglePost();
        })
      };

      const {handleAddToCollection} = useHandleCollection()

      const handleCollection = async (id) => {
        const addInfo = {
           userEmail: dbUser?.dbUser?.email,
           id: id,     
        };
        handleAddToCollection(addInfo)
      };

      const {handleLikePhoto} = usePhotoLike();

      const handleUserLikePhoto = (id) => {
        const photoInfo = {
            photoID: id,
            userID: dbUser?.dbUser?._id,
        };
       handleLikePhoto(photoInfo)
       .then((data) => {

        fetchGetSinglePost();
    });}

    const navigate = useNavigate();
    const handleUserInfo = (id) => {
        navigate(`/user-profile/${id}`)
       }
      

    return (
        <>
    { dbUser && photoURL && 
        <section className='photoDetails_section'>

        {!photoURL ?
             <section className='loading-gif-image'>
             <div className="loader-gif">
           <img title={title} src="https://doctors-portal-react.firebaseapp.com/static/media/Preloader.3e54c692.gif" alt="" />
             </div>
           </section>
           :
            <div className="photoDetails_container">
            <div className="photoDetails_image_wrap">
                <img src={photoURL} alt="" />
            </div>

            <div className="photoDetails_content">

                <span
                onClick={() =>handleDownloadImage(photoURL, _id)}
                className='photoDetails_download_icon'>
                <i className="fa fa-download" aria-hidden="true"></i>
                </span>

                {!likePhoto && <span
                onClick={() => handleUserLikePhoto(_id)}
                className='photoDetails_download_icon'>
                    <i className="fa-solid fa-heart"></i>
                </span>}

                {likePhoto && <span
                onClick={() => handleUserLikePhoto(_id)}
                className='photoDetails_download_icon icon-red'>
                    <i className="fa-solid fa-heart"></i>
                </span>}
                <span className='photoDetails_download_icon'>
                <i
                onClick={() => handleCollection(_id)}
                 className="fa fa-plus" aria-hidden="true"></i>
                </span>

                <h4>{title} </h4>
                <h5>"{pin}"</h5>

                <div style={{cursor: 'pointer'}}
                className="user_info"
                onClick={() => handleUserInfo(postedBy?._id)}
                >
                    <span>
                        <img src={postedBy?.photoURL} alt="" />
                    </span>
                    <span>
                        {postedBy?.displayName}
                    </span>
                </div>

                <div className='user_comment_section'>
                    <h4>Comments</h4>


                    {comments.length ?
                        <div className="user_comments_content_wrap">

                        {
                            comments.map((comment, index) => <div
                            key={index}
                            className='user_single_comment_wrap'>
                                 <img src={comment.commentBy.photoURL? comment.commentBy.photoURL : 'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg'} alt="" />
                                 <div className="user_name_comment_wrap">
                                <h5>{comment?.commentBy.displayName}</h5>
                                <h6>{comment?.comment}</h6>
                            </div>
                            </div>)
                        }</div>
                :
                <></>    
                }

                    <div className="comment_input_box">
                        <form onSubmit={handleComment}>
                        <input type="text" placeholder='Write a comment...' name='comment_box' />
                        <input type="submit" value="Comment" className='submit_btn' />
                        </form>
                    </div>
                </div>
            </div>
            </div>}



       {!images.length ? 
        <section className='loading-gif-image'>
      <div className="loader-gif">
    <img src="https://doctors-portal-react.firebaseapp.com/static/media/Preloader.3e54c692.gif" alt="" />
      </div>
         </section>
    :
        <div className="moreImage_container_wrap">
        <section className='morePhoto_container'>
            {
                images.slice(0,10).map((image, index) => <ShowImage
                key={index}
                image={image}
                />)
            }
        </section>
        </div>
        }
        
        </section>
    }
        </>    
    );
};

export default PhotoDetailsPage;