import React from "react";
import "./Home.css";
import Sliderr from "./Sliderr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../../admin/Categories/Categories";
import { getSlider, sliderReset } from "../../features/sliderSlice";
import { getCategory } from "../../features/categorySlice";
import { whiteNotNeededPage } from "../../features/userSlice";

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

  console.log(categoryDisplay);

  return (
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
        {/* <p style={{
          marginTop: "10px",
          fontWeight: "bold",
          fontSize: screen < 621 ? "20px" : "45px",
          marginBottom: "10px",
          letterSpacing: "3px",
          fontFamily: " 'Ubuntu', sans-serif "
        }}>Welcome to Thisara Salon</p> */}

        {/* {user && user?.userType === "admin" && <div style={{ marginLeft: screen < 820 ? "0px" : "20px", letterSpacing: "2px" }}>
          <p className="add-button" onClick={() => navigate("/slider-images")}>ADD IMAGES</p>
        </div>} */}
      </div>

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <Sliderr />
      </div>

     

      <div className="typing-container">
      <p className="typing-text">
        Elevate Your Style with Our Premier Salon Services
      </p>
    </div>

      <div className="category-container">{categoryDisplay}</div>
    </div>
  );
};

export default Home;
