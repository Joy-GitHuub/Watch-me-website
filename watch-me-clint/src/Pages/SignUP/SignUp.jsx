import React from 'react';
import video from '../../Assets/watch-me-mp4.mp4';
import './SignUp.css'
import useAuth from './../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUp = () => {

    const {firebase} = useAuth();

    const {handleGoogleSignUp} = firebase;

    const location = useLocation();
    const navigate = useNavigate();
    const handleGoogle = () => {
        handleGoogleSignUp(location, navigate)
    }

    return (
        <section className='sign-up-page-video-wrap bg-blackOverlay'>
            <video src={video}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            ></video>


            <div className="sign_up_content">
                <div className='logo_name'>
                    <img src="https://watchmevetriyt.netlify.app/static/media/watchme_white.b6e7b76eaee4089951d2.png" alt="" />
                </div>

                <div className="sign_up_google_button">
                   <button onClick={handleGoogle}><img src="https://cdn-teams-slug.flaticon.com/google.jpg" alt="" /> <span>Sign in With Google</span></button>
                </div>
            </div>
        </section>
    );
};

export default SignUp;