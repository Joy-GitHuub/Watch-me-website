import React from 'react'
import { Route, Routes } from "react-router-dom";
import HomeDashboard from './Pages/Dashboard/HomeDashboard/HomeDashboard';
// import useAuth from './Hooks/useAuth';
import Home from "./Pages/HOME/Home";
import PhotoDetails from './Pages/PhotoDetails/PhotoDetails';
import SignUp from "./Pages/SignUP/SignUp";
import AddPhotoPage from './Pages/UserAddPhoto/AddPhotoPage/AddPhotoPage';
import UserDashBoardHome from './Pages/UserDashBoard/UserDashBoardHome';
import UserInfo from './Pages/UserInfo/UserInfo';
import Private from './Private/Private';

function App() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);


  return (
    <>
      {loading ?
        <div className='loading-gif'>
          <div className="loader">
            <img src="https://doctors-portal-react.firebaseapp.com/static/media/Preloader.3e54c692.gif" alt="" />
          </div>
        </div>
        :
        <Routes>
          <Route path="/" element={<Private><Home /></Private>} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<HomeDashboard />} />
          <Route path="/dashboard" element={<UserDashBoardHome />} />
          <Route path="/AddImage" element={<AddPhotoPage />} />
          <Route path="/photoDetails/:photoID" element={<PhotoDetails />} />
          <Route path='user-profile/:userID' element={<UserInfo />} />
        </Routes>}
    </>
  );
}

export default App;
