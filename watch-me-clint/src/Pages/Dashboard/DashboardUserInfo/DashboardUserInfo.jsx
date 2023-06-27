import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import './DashboardUserInfo.css';

const DashboardUserInfo = () => {

    const {dbUser} = useAuth();

    return (
        <section className='dashboard_user_info_section'>
            
            <div className="dashboard_user_info_wrap">
                <div className="dashboard_user_image_wrap">
                    <img src={dbUser?.dbUser?.photoURL} alt="" />
                </div>

                <div className="dashboard_user_info_name">
                    <div className='name_edit_btn-wrap'>
                    <h3>{dbUser?.dbUser?.displayName}</h3>
                    <button>Edit Profile</button>
                    </div>
                    <p>{`Download free, beautiful high-quality photos curated by ${dbUser?.dbUser?.displayName}.`}</p>
                </div>
            </div>

        </section>
    );
};

export default DashboardUserInfo;