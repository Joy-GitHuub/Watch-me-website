import React from 'react';
import Banner from '../../Shared/Banner/Banner';
import Search from '../../Shared/Search/Search';
import './Home.css'
import ImageCategory from './ImageCategory/ImageCategory';

const Home = () => {




    return (
        <div className='home-page'>
        <Search/>
        <Banner/>
        <ImageCategory/>
        </div>
    );
};

export default Home;