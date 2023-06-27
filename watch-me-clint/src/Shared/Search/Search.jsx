import React from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import useAuth from './../../Hooks/useAuth';
import logoutImg from '../../Assets/vector60-5847-01.jpg';
import addImage from '../../Assets/plus-icon-13062.png';
import dashboardImg from '../../Assets/kisspng-computer-icons-dashboard-management-business-compa-abroad-5ad903d48b0b05.7390679315241717325695.png';





const logo = 'https://watchmevetriyt.netlify.app/static/media/watchme_white.b6e7b76eaee4089951d2.png';



const Search = () => {

    const [toggle, setToggle] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    // const [pageNum, setPageNum] = React.useState(1);




    const handleToggle = () => {
        if (toggle) {
            setToggle(false)
        }else {
            setToggle(true);
        }
    }



    const {firebase, useImages,} = useAuth();
    const {user, logout} = firebase;

    const {setImages} = useImages;

    const handleSearch = async (event) => {
        await setSearchText(event.target.value);
    };

    const handleCategory = (event) => {
       const input = document.getElementById('searchCategoryID');
      setSearchText(input.value);
    }

    const fetchGetImage = async () => {
        if (searchText.length) {
        const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/posts/post-upload?titleSearch=${searchText}`;
        const res = await fetch(url);
        const data = await res.json()
        setImages(data.data);
        }else{
            const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/posts/post-upload?`;
            const res = await fetch(url);
            const data = await res.json()
            setImages(data.data);
            // setImages((prev) => [...prev, ...data.data])
        }
    };

    // let currentUrl = window.location.href;
    // console.log(currentUrl);

    React.useEffect(() => {
        fetchGetImage();
    } , [searchText?.length]);

/*     React.useEffect(() => {
        window.addEventListener('scroll', handleInFiniteScroll)
        return () => window.removeEventListener("scroll", handleInFiniteScroll)
    }, []) */

/*     const handleInFiniteScroll = async () => {
        try {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setPageNum((prev) => prev + 1)
            }
        } catch (error) {
            console.log(error);
        }
    } */

    return (
        <>
        <section className='search_section_container'>

        <div className="search_section_wrap">

<div className="logo_search_input_box_wrap">
    <Link to={'/'} className="logo_image_wrap">
        <img src={logo} alt="" />
    </Link>

    <div className="search_box_wrap">
        <input type="text" onChange={handleSearch}  placeholder='Search Free High-Resolution Photos.....'  />
        <span><svg width="22" height="32" className="VdNCI nT46U VETef" viewBox="0 0 32 32" version="1.1" aria-hidden="false"><desc lang="en-US">Visual search</desc><path d="M6.7 25.3H12V28H6.7C5.2 28 4 26.8 4 25.3V20h2.7v5.3zm0-18.6H12V4H6.7C5.2 4 4 5.2 4 6.7V12h2.7V6.7zM25.3 4H20v2.7h5.3V12H28V6.7C28 5.2 26.8 4 25.3 4zm0 21.3H20V28h5.3c1.5 0 2.7-1.2 2.7-2.7V20h-2.7v5.3zm-4-9.3c0 2.9-2.4 5.3-5.3 5.3s-5.3-2.4-5.3-5.3 2.4-5.3 5.3-5.3 5.3 2.4 5.3 5.3zm-2.6 0c0-1.5-1.2-2.7-2.7-2.7s-2.7 1.2-2.7 2.7 1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7z"></path></svg></span>
    </div>

</div>

<div className="advertise_blog_watchME_profile_wrap">
        <nav>
            <ul>
                <li><Link to={'/'}>Advertise</Link></li>
                <li><Link to={'/'}>Blog</Link></li>
                <li><Link to={'/'}>Watch-Me+</Link></li>
            </ul>

        <div className="submit_image_btn">
            <button>Submit Image</button>
        </div>

       
            <div className="profile_image">
            <img onClick={handleToggle} src={user?.photoURL} alt="" />
            {toggle &&
            <div className="sub-menu-wrap sub-menu-mobile">
                <div className="sub_menu">
                    <div className="user_info">
                        <img src={user.photoURL} alt="" />
                        <h3>{user?.displayName}</h3>
                    </div>
                    <hr />

                    <Link to={'/profile'} className ='sub-menu-link'>
                        <img src={user.photoURL} alt="" />
                        <p>{user.displayName.split(' ')[0]} Profile</p>
                        <span>{`>`}</span>
                    </Link>

                    <Link to={'/dashboard'} className ='sub-menu-link'>
                        <img src={dashboardImg} alt="" />
                        <p>Dashboard</p>
                        <span>{`>`}</span>
                    </Link>
                    {/* <Link to={'/'} className ='sub-menu-link'>
                        <img src='https://www.shutterstock.com/image-vector/settings-isolated-flat-vector-icon-260nw-1928739098.jpg' alt="" />
                        <p>Edit Profile</p>
                        <span>{`>`}</span>
                    </Link> */}

                    <Link to={'/addImage'} className ='sub-menu-link'>
                        <img src={addImage} alt="" />
                        <p>Add Image</p>
                        <span>{`>`}</span>
                    </Link>
                    
                    <div onClick={logout}  className ='sub-menu-link'>
                        <img src={logoutImg} alt="" />
                        <p>Log-Out</p>
                        <span>{`>`}</span>
                    </div>
                   
                </div>
            </div>}
        </div>

        <div className='log_out_btn'>
            {/* <button>Log-Out</button> */}
        </div>
        </nav>
</div>
        </div>
   
         </section>
         <section className='banner_section'>
            <div className="banner_container">
                {/* <img src="https://images.unsplash.com/photo-1671723521246-a6710cfafc70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=1&auto=format%2Ccompress&fit=crop&w=1399&h=594" alt="" /> */}
                <img src="https://source.unsplash.com/1600x900/?nature,photography,technology" alt="" />

                <div className="banner_container_content">
                    <h3>WatchMe</h3>
                    <div className="">
                        <h5>The Internets's Source For Visuals.</h5>
                        <h5>Powered By Creators Everywhere.</h5>
                    </div>

                    <div className="banner_container_input_box">
                        <span className='search-icon'>
                        <svg width="20" height="20" className="DFW_E nT46U NIGLg" viewBox="0 0 32 32" version="1.1" aria-hidden="false"><desc lang="en-US">A magnifying glass</desc><path d="M22 20c1.2-1.6 2-3.7 2-6 0-5.5-4.5-10-10-10S4 8.5 4 14s4.5 10 10 10c2.3 0 4.3-.7 6-2l6.1 6 1.9-2-6-6zm-8 1.3c-4 0-7.3-3.3-7.3-7.3S10 6.7 14 6.7s7.3 3.3 7.3 7.3-3.3 7.3-7.3 7.3z"></path></svg>
                        </span>
                        <input
                        id='searchCategoryID'
                        type="text" placeholder='Search free high-resolution photos.' />

                        <span onClick={handleCategory} className='zoom-icon'>
                        <svg width="20" height="20" className="VdNCI nT46U NIGLg" viewBox="0 0 32 32" version="1.1" aria-hidden="false"><desc lang="en-US">Visual search</desc><path d="M6.7 25.3H12V28H6.7C5.2 28 4 26.8 4 25.3V20h2.7v5.3zm0-18.6H12V4H6.7C5.2 4 4 5.2 4 6.7V12h2.7V6.7zM25.3 4H20v2.7h5.3V12H28V6.7C28 5.2 26.8 4 25.3 4zm0 21.3H20V28h5.3c1.5 0 2.7-1.2 2.7-2.7V20h-2.7v5.3zm-4-9.3c0 2.9-2.4 5.3-5.3 5.3s-5.3-2.4-5.3-5.3 2.4-5.3 5.3-5.3 5.3 2.4 5.3 5.3zm-2.6 0c0-1.5-1.2-2.7-2.7-2.7s-2.7 1.2-2.7 2.7 1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7z"></path></svg>
                        </span>
                    </div>
                </div>
            </div>
        </section>
        </>

    );
};

export default Search;