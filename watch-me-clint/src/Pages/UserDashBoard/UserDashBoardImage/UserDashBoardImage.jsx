import React from 'react';
import './UserDashBoardImage.css';

const UserDashBoardImage = ({image}) => {
    const {photoURL} = image;
    return (
        <section className='dashboard_image_wrap'>
            <div className="image_wrap_section">
                <img src={photoURL} alt="" />
            </div>
        </section>
    );
};

export default UserDashBoardImage;