import React from "react";
import "./Home.css";
import Sliderr from "./Sliderr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../../admin/Categories/Categories";
import { getSlider, sliderReset } from "../../features/sliderSlice";
import { getCategory } from "../../features/categorySlice";
import { whiteNotNeededPage } from "../../features/userSlice";
import { Helmet } from "react-helmet-async";
import { getVideo } from "../../features/videoSlice";
import ReactPlayer from "react-player";

const Home = () => {
  // console.log("catego", categorydata);
  const navigate = useNavigate();
  const { categoryArray } = useSelector((state) => state.category);
  const {videoArray}=useSelector((state)=>state.video);
  const { slider, sliderLoading, sliderSuccess } = useSelector(
    (state) => state.slider
  );
  const dispatch = useDispatch();
  const { screen, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(getSlider());
dispatch(getVideo());
    dispatch(getCategory());
  }, []);
  React.useEffect(() => {
    dispatch(whiteNotNeededPage());
  }, []);

  React.useEffect(() => {
    if (sliderSuccess === true) {
      dispatch(sliderReset());
    }
  }, [sliderLoading]);

  const categoryDisplay = categoryArray?.map((item) => {
    return <Categories key={item._id} {...item} usersHomePage={true} />;
  });

 // console.log(categoryDisplay);

  return (
    <>

    <Helmet>
<title>Thisara Salon</title>
<meta name="description" content="Welcome to Thisara Salon - Your ultimate destination for top-notch men's grooming services. We offer a range of services including haircuts, beard grooming, relaxing massages, and grooming packages. Our expert stylists are dedicated to providing you with the best grooming experience. Book an appointment now and look your best!"/>
<link rel="canonical" href="/" />
    </Helmet>

    <div className="home">
    
      <div
        style={{
          display: "flex",
          marginBottom: "10px",
          flexDirection: screen < 820 ? "column" : "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      
      </div>

     
 <div
 style={{
   marginBottom: "30px",
 }}
>
<Sliderr />
</div>
      

     
{categoryArray?.length<1 && <div className="wifi-loader-master">
<div id="wifi-loader">
    <svg className="circle-outer" viewBox="0 0 86 86">
        <circle className="back" cx="43" cy="43" r="40"></circle>
        <circle className="front" cx="43" cy="43" r="40"></circle>
        <circle className="new" cx="43" cy="43" r="40"></circle>
    </svg>
    <svg className="circle-middle" viewBox="0 0 60 60">
        <circle className="back" cx="30" cy="30" r="27"></circle>
        <circle className="front" cx="30" cy="30" r="27"></circle>
    </svg>
    <svg className="circle-inner" viewBox="0 0 34 34">
        <circle className="back" cx="17" cy="17" r="14"></circle>
        <circle className="front" cx="17" cy="17" r="14"></circle>
    </svg>
    {/* <div class="text" data-text="Loading..."></div> */}
</div>
</div>}
     

     

      <div className="typing-container">
      <p className="typing-text">
        Elevate Your Style with Our Premier Salon Services
      </p>
    </div>

      <div className="category-container">{categoryDisplay}</div>

{videoArray?.length>=1 && <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"1.5rem"}}>
<p style={{letterSpacing:"0.1rem",fontSize:"2rem",
fontFamily:" 'Ubuntu', sans-serif", }}>Our Work</p>
</div>}

     {videoArray?.length>=1 && <div style={{width:"100%",display:"flex",
      flexDirection:"column",marginBottom:"2rem",
      alignItems:"center",marginTop:"2rem",padding:"1rem",}}>

        {
          videoArray?.map((item,index)=>{
            const len=videoArray?.length;
            const lastVideoNumber=len-1;
            const rindex=lastVideoNumber-2;
            if(index>=rindex){
              return (
                <div style={{width:screen<850?"100%":"800px",marginBottom:"2.5rem",padding:"1rem",
                boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px  ",borderRadius:"8px"  }} key={item?._id}>
                <ReactPlayer url={item?.url} controls width="100%" height="auto" />
              {item?.title!=="" &&  <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"0.5rem"}} >
                    <p>{item?.title}</p>
                </div>}
                </div>
              )
            }
               
          })
        }
         
      </div>}

{videoArray?.length>=1  &&  <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"2rem"}}>
<button className="see-more-btn" onClick={()=>navigate("/video-page")}>See more</button>
      </div>}


    </div>

    </>
  );
};

export default Home;
