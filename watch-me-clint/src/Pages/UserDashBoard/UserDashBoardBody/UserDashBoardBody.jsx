import React from 'react';
import './UserDashBoardBody.css';
import useAuth from './../../../Hooks/useAuth';
import UserDashBoardImage from '../UserDashBoardImage/UserDashBoardImage';

const UserDashBoardBody = () => {

    const {dbUser} = useAuth();
    const [user, setUser] = React.useState({});
    const [images, setImages] = React.useState([]);
    const [selectOption, setSelectOption] = React.useState('Upload Image');


    const fetchGetSingleUser = async () => {
        const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/user/me/${dbUser?.dbUser?.email}`;
        const res = await fetch(url);
        const data = await res.json();
        setUser(data?.data);
    };

    React.useEffect(() => {
        fetchGetSingleUser();
    }, [dbUser?.dbUser?.email]);

    React.useEffect(() => {
        if (user?.email) {
           const {addToCollection, imagePost, saveImage} = user;
          if (selectOption === 'Upload Image') {
            console.log(selectOption);
            setImages(imagePost);
          }else if (selectOption === 'Image Collection') {
            setImages(addToCollection)
            console.log(addToCollection);
          }else if (selectOption === 'Saved Image') {
            setImages(saveImage)
          }
        };
    } , [user, selectOption]);



    let totalView = 0;
    if (user?.email) {
        const {imagePost} = user;
        for (const image of imagePost) {
            totalView = totalView + image.view;
        }
    };


    const handleSelectOption = e => {
        setSelectOption(e.target.value);
    }
    

    return (

        <section className='userDashboard_section_container'>
            <div className='userDashboard_header_banner'>
                    <img src="https://source.unsplash.com/1600x900/?photography,technology" alt="" />
            </div>


        { user.email  ?
        <div className="userDashboard_container_wrap">
                <div className="userDashboard_info_wrap">
                    <img src={dbUser?.dbUser?.photoURL} alt="" />
                    <h2>{dbUser?.dbUser?.displayName}</h2>
                </div>

                <div className="userDashboard_image_upload_info_wrap">
                    <div className="total_image_box box">
                        <h5>{user?.imagePost?.length}</h5>
                        <h4>Upload Image</h4>
                    </div>
                    <div className="imageCollection box">
                        <h5>{user?.addToCollection?.length}</h5>
                        <h4>Image Collection</h4>
                    </div>
                    <div className="savedImage box">
                        <h5>{user?.saveImage?.length}</h5>
                        <h4>Saved Image</h4>
                    </div>
                    <div className="totalView box">
                        <h5>{totalView}</h5>
                        <h4>Total View</h4>
                    </div>
                </div>

        </div>
        :
        <div className='loading-gif'>
        <div className="loader">
          <img src="https://doctors-portal-react.firebaseapp.com/static/media/Preloader.3e54c692.gif" alt="" />
        </div>
        </div>    
        }

        {user.email ?
        <section className="image_show_collection_container">

      <div className="image_show_select_option_wrap">
          <form onChange={handleSelectOption}>
          <select name="" id="" className='select-option-dashboard'>
              <option 
              selected value={'Upload Image'} >Upload Image</option>
              <option
              value={'Image Collection'}
              >Image  Collection</option>
              <option
              value={'Saved Image'} 
              >Saved Image</option>
          </select>
          </form>
      </div>

      <div className="show_image_container_wrap" style={{paddingBottom: '30px'}}>
      {
          images?.map((image, index) => <UserDashBoardImage
          key={index}
          image={image}
          /> )
      }
      </div>
        </section>
        :
        <div className='loading-gif'>
        <div className="loader">
          <img src="https://doctors-portal-react.firebaseapp.com/static/media/Preloader.3e54c692.gif" alt="" />
        </div>
        </div>
        }
        </section>
    );
};

export default UserDashBoardBody;