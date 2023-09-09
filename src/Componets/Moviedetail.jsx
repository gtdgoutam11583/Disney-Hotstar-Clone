import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const YOUTUBE_VIDEO_IDs = ['scNmYjoR-qM','JOddp-nlNvQ','KPLWWIOCOOQ','QotH4xVu0SI','vEmH5Yp_Rtg'];
export default function Moviedetail({ movie, setMovie , setShowAlert }) {
  const navigate = useNavigate();
 const findrandom=()=>{
  const randomIndex = Math.floor(Math.random() * YOUTUBE_VIDEO_IDs.length);

// Fetch the random item from the list
   return YOUTUBE_VIDEO_IDs[randomIndex];
 }
  useEffect(() => {
    const existingData = getExistingUserData();
    const userIndex = existingData.findIndex((user) => user.isLogin === true);
    if (userIndex === -1) {
      setShowAlert({enable:true,alertType:"warning",alertMessage:"Login first to enjoy services"})
      navigate('/login');
      return ;
    }
    else{
        const user = existingData[userIndex];
        if(user.subscription=="no")
       {  navigate("/subscription")
       setShowAlert({enable:true,alertType:"warning",alertMessage:"you have not taken any subscription yet"})
      return;
       }
    }

  });
  function getExistingUserData() {
    const existingData = localStorage.getItem('userData');
   
    return existingData ? JSON.parse(existingData) : [];
  } 
  return (
    <>
      <div className="container align-content-center mx-5 px-5 align-content-sm-center">
        <div className="card mb-3 px-5 mx-5">
          <div className="row g-0 bg-white">
            <div className="col-md-6 d-flex align-items-center">
              { /* Center the YouTube video vertically and increase its dimensions */ }
              <div className="embed-responsive" style={{ width: '800px', height: '600px' }}>
                <iframe
                  className="embed-responsive-item"
                  src={`https://www.youtube.com/embed/${findrandom()}?autoplay=0`}
                  title="YouTube Video"
                  allowFullScreen
                  style={{ width: '100%', height: '100%' }}
                ></iframe>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">{movie.movie.original_title}</h5>
                <p className="card-text">
                  Release date: {movie.movie.release_date}
                </p>
                <p className="card-text">
                  Original Language:{' '}
                  {movie.movie.original_language === 'hi' ? 'HINDI' : 'ENGLISH'}
                </p>
                <p className="card-text my-3">{movie.movie.overview}</p>
                <button
                  className="btn btn-primary bg-primary mx-2"
                  type="submit"
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
