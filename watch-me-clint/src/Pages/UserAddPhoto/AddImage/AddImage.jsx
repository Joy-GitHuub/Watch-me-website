import React from 'react';
import swal from 'sweetalert';
import './AddImage.css';
import useAuth from '../../../Hooks/useAuth';


const AddImage = () => {

  const {firebase} = useAuth();
  const {user} = firebase;
  const [getUser, setGetUser] = React.useState({});

  const fetchUserData = async() => {
    const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/user/me/${user?.email}`
    const res = await fetch(url)
    const data = await res.json()
    setGetUser(data);
  };

  React.useEffect(() => {
    fetchUserData();
  } , [user?.email]);


    const hiddenFileInput = React.useRef(null);
    const [selectImage, setSelectImage] = React.useState({
        file:[],
        filepreview:null,
       });

       const [selectImageFile, setSelectImageFile] = React.useState(null);

    const handleClick = event => {
      hiddenFileInput.current.click();
    };

    const handleChange = event => {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('image', image);
      setSelectImageFile(formData)



    setSelectImage({
        ...selectImage,
        file:event.target.files[0],
        filepreview:URL.createObjectURL(event.target.files[0]),
      });
  
    


       // FOR BUG IN CHROME
    event.target.value = "";
    };

    function deleteHandler() {

       setSelectImage({
        file:[],
        filepreview:null,
       })};


      const handleSubmit = (e) => {
        e.preventDefault();


        let form = e.target;
        let title = form.title.value;
        let pin = form.pinTitle.value;
        let category = form.category.value;
        if (!title || !pin || category=== 'Select Category----') {
         swal('Some Thing is Wrong',"You clicked the button!", "error");
         return;
        }
       


            const imageHostKey =  `3e7f73d275b6c80897687653fc297be3`;
            const imageUrl =  `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
             fetch(imageUrl, {
              method: 'POST',
              body: selectImageFile,
            }).then((res) => res.json())
            .then(imgData => {
              if(imgData.success){
                swal("SuccessFully Add Your Image", "You clicked the button!", "success");
              const post = {
                postedBy: getUser?.data?._id,
                title: title,
                pin: pin,
                category: category,
                photoURL: imgData.data.url,
              };
              const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/posts/post-upload`;
              fetch(url, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
              }).then((res) => res.json())
              .then((data) => {
                if(data.status){
                  form.title.value = '';
                  form.pinTitle.value = '';
                  form.category.value = 'Select Category----'; 
                  setSelectImage({
                    file:[],
                    filepreview:null,
                   });
                  }
              })}
            })
          


      }

    return (
        <>
           <form onSubmit={handleSubmit}> 
        <div className='add_image_container'>
      {selectImage.filepreview !== null ? 
       <div className='previewImage_show_container'>
         <img className="previewImage"  src={selectImage.filepreview} alt="UploadImage" />
         <div className="delete_icon_image" onClick={deleteHandler} >
         <img src="https://toppng.com/uploads/preview/edit-delete-icon-delete-icon-11553444925vxge0bju5o.png" alt="" />
         </div>
       </div>
        :
        <div onClick={handleClick} className='image-uploader-container'>
        <img src="https://t4.ftcdn.net/jpg/02/17/88/73/360_F_217887350_mDfLv2ootQNeffWXT57VQr8OX7IvZKvB.jpg" alt="" />

        <div className="image_uploader_warning">
            <h4>Select Your Image Here</h4>
            <h6>Supports: JPG,PNG,</h6>
        </div>
        </div>}


      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        // style={{display: 'none'}} 
        hidden
        accept="image/*"
      />
        </div>


    
        <div className="add_image_section_title_category_name">

        <div className='add_image_profile_container'>
          <img src={user?.photoURL} alt="" />
          <span>{user?.displayName}</span>
        </div>

           <div className="add_image_name_wrap">
          <input type="text" name='title' placeholder='Add your image title' />
        </div>

           <div className="add_image_name_wrap">
          <input type="text" name='pinTitle' placeholder='Tell everyone what your Pin in about' />
        </div>

        <div className="add_image_category_wrap">
          <h4>Select Your Image Category.</h4>

          <select name="category" id="">
            <option >Select Category----</option>
            {/* <option value="Nature">Nature</option> */}
            <option value="Wallpapers">Wallpapers</option>
            <option value="3D Renders">3D Renders</option>
            <option value="Travel">Travel</option>
            <option value="Nature">Nature</option>
            <option value="Street Photography">Street Photography</option>
            <option value="Experimental">Experimental</option>
            <option value="Animation">Animation</option>
            <option value="Textures Patterns">Textures & Patterns</option>
            <option value="Animals">Animals</option>
            <option value="Architecture Interiors">Architecture & Interiors</option>
            <option value="Fashion Beauty">Fashion & Beauty</option>
            <option value="Film">Film</option>
            <option value="Food Drink">Food & Drink</option>
            <option value="People">People</option>
            <option value="Spirituality">Spirituality</option>
            <option value="Business Work">Business & Work</option>
            <option value="Athletics">Athletics</option>
            <option value="Health Wellness">Health & Wellness</option>
            <option value="Current Events">Current Events</option>
            <option value="Arts Culture">Arts & Culture</option>
          </select>
      <input type="submit" className='add_image_submit_btn' value="Submit" />
        </div> 
        </div>

        </form>





        </>
    );
};

export default AddImage;