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

const Home = () => {
  // console.log("catego", categorydata);
  const navigate = useNavigate();
  const { categoryArray } = useSelector((state) => state.category);
  const { slider, sliderLoading, sliderSuccess } = useSelector(
    (state) => state.slider
  );
  const dispatch = useDispatch();
  const { screen, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(getSlider());

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
    </div>

    </>
  );
};

export default Home;
