import React, { useState, useEffect } from "react";
import "./EditCategory.css";
import emptyImage from "../../assets/emptyImage.jpg";
import { Input } from "antd";
import { storage } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { openModal, userLogout } from "../../features/userSlice";
import Categories from "../Categories/Categories";
import toast, { Toaster } from "react-hot-toast";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import { whiteNotNeededPage } from "../../features/userSlice";
import {
  createCategory,
  getCategory,
  categoryReset,
  updateCategory,
  deleteCategory,
} from "../../features/categorySlice";
import { v4 } from "uuid";

const { TextArea } = Input;

const EditCategory = () => {
  const dispatch = useDispatch();
  const { screen, user } = useSelector((state) => state.user);
  const [opend, setOpend] = React.useState(false);
  const [imageUpload, setImageUpload] = React.useState(null);
  const [deleteCategoryData, setDeleteCategoryData] = React.useState({
    _id: "",
    categoryTitle: "",
  });
  const [updateCategoryId, setUpdateCategoryId] = React.useState("");
  const {
    categoryLoading,
    categoryError,
    categorySuccess,
    categoryErrorMessage,
    categoryArray,
    categorySaveSuccess,
    categoryUpdateSuccess,
    categoryDeleteSuccess,
  } = useSelector((state) => state.category);

  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [categoryData, setCategoryData] = useState({
    categoryTitle: "",
    categoryDes: "",
    categoryUrl: "",
  });

  React.useEffect(() => {
    dispatch(getCategory());
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const imageUploadChange = (event) => {
    // console.log("inside imageUploadChange function ", event.target.files[0]);
    setImageUpload(event?.target?.files[0]);
  };

  const uploadImage = () => {
    if (imageUpload === null) return;
    setUploadLoading(true);
    const imageRef = ref(storage, `images/${imageUpload + v4()}`);
    // uploadBytes(imageRef, imageUpload).then((result) => {
    //   console.log(result)
    // }).catch((error) => {
    //   console.log(error)
    // })
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        // Get the download URL after successful upload
        return getDownloadURL(imageRef);
      })
      .then((downloadURL) => {
        // console.log("File available at", downloadURL);
        setUploadLoading(false);
        //setUrl(downloadURL)
        setCategoryData((prevState) => {
          return {
            ...prevState,
            categoryUrl: downloadURL,
          };
        });
        // Use the downloadURL as needed, such as saving it to a database or displaying it to the user
      })
      .catch((error) => {
        console.error(error);
        setUploadLoading(false);
      });
  };

  console.log(categoryData);

  const onSaveClick = () => {
    if (
      categoryData.categoryTitle !== "" &&
      categoryData.categoryDes !== "" &&
      categoryData.categoryUrl !== ""
    ) {
      dispatch(
        createCategory({
          token: user?.token,
          categoryTitle: categoryData.categoryTitle.toLowerCase().trim(),
          categoryDes: categoryData.categoryDes.trim(),
          categoryUrl: categoryData.categoryUrl,
        })
      );
    } else {
      toast.error("All fields are required !");
    }
  };

  React.useEffect(() => {
    if (categoryLoading === false) {
      if (categorySaveSuccess === true) {
        dispatch(getCategory());
        dispatch(categoryReset());
        setCategoryData({
          categoryTitle: "",
          categoryDes: "",
          categoryUrl: "",
        });
        setImageUpload(null);
        toast.success("Added Successfully !");
      } else if (categoryErrorMessage === "Not authorized") {
        dispatch(userLogout());
        dispatch(openModal());
        dispatch(categoryReset());
      }
    }
  }, [categoryLoading]);

  const editCategoryIconClick = (
    id,
    categoryTitle,
    categoryDes,
    categoryUrl
  ) => {
    setUpdateCategoryId(id);
    setImageUpload(null);
    setCategoryData({
      categoryTitle: categoryTitle.toLowerCase().trim(),
      categoryDes: categoryDes,
      categoryUrl: categoryUrl,
    });
  };

  const updateCategoryClick = () => {
    if (
      categoryData.categoryTitle !== "" &&
      categoryData.categoryDes !== "" &&
      categoryData.categoryUrl !== "" &&
      updateCategoryId !== ""
    ) {
      dispatch(
        updateCategory({
          token: user?.token,
          _id: updateCategoryId,
          categoryTitle: categoryData.categoryTitle.toLowerCase().trim(),
          categoryDes: categoryData.categoryDes,
          categoryUrl: categoryData.categoryUrl,
        })
      );
    } else {
      toast.error("All fields are required !");
    }
  };

  React.useEffect(() => {
    if (categoryLoading === false) {
      if (categoryUpdateSuccess === true) {
        setImageUpload(null);
        toast.success("Updated Successfully !");
        dispatch(categoryReset());
        dispatch(getCategory());
        setCategoryData({
          categoryTitle: "",
          categoryDes: "",
          categoryUrl: "",
        });
        setUpdateCategoryId("");
      }
    } else if (categoryErrorMessage === "Not authorized") {
      dispatch(openModal());
      dispatch(userLogout());
      dispatch(categoryReset());
    }
  }, [categoryLoading]);

  const deleteCategoryIconClick = (id, categoryTitle) => {
    setDeleteCategoryData({ _id: id, categoryTitle: categoryTitle });
  //  console.log(id, categoryTitle);
    setOpend(true);
  };
  const handleClosed = () => {
    setOpend(false);
  };
  React.useEffect(() => {
 
    dispatch(whiteNotNeededPage());
  }, []);

  const deleteCategoryButtonClick = () => {
    const token = user?.token;
    const _id = deleteCategoryData._id;
    setOpend(false);
    dispatch(deleteCategory({ token, _id }));
  };

  React.useEffect(() => {
    if (categoryLoading === false) {
      if (categoryDeleteSuccess === true) {
        
        setDeleteCategoryData({_id: "",
        categoryTitle: "",})
        dispatch(categoryReset());
        dispatch(getCategory());
        toast.success("Deleted Successfully !")
      }
    }else if(categoryErrorMessage==="Not authorized"){
      dispatch(userLogout());
      dispatch(openModal());
      dispatch(categoryReset());

    }
  }, [categoryLoading]);

  const categoryDisplay = categoryArray?.map((item) => {
    return (
      <Categories
        key={item._id}
        {...item}
        usersHomePage={false}
        editCategoryIconClick={editCategoryIconClick}
        deleteCategoryIconClick={deleteCategoryIconClick}
      />
    );
  });

  return (
    <>
      <div className="edit-category" id="category-input">
      <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "5px",
              padding: screen < 671 ? "0 5px 0 30px" : "0px",
              marginTop:"20px",
            }}
          >
            <p
              style={{
                fontSize: screen < 451 ? "2rem" : "3rem",
                color: "#736f78",
                fontFamily: "'Ubuntu', sans-serif",
        
                fontWeight: "bold",
                letterSpacing: "3px",
              }}
            >
            Customize your categories
            </p>
          </div>
        {/* 779 */}
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
            flexDirection: screen < 779 ? "column" : "row",
          }}
        >
          <section
          
            style={{
              width: screen < 779 ? "100%" : "400px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              //  justifyContent: "center",
            }}
          >
            <div>
              <p
                style={{
                  marginBottom: "3px",
                  fontSize: "1.2rem",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                }}
              >
                Category Title
              </p>
              <Input
                value={categoryData.categoryTitle}
                onChange={handleInputChange}
                name="categoryTitle"
                style={{
                  marginBottom: "10px",
                  width: screen < 361 ? "85vw" : "300px",
                }}
                placeholder="Category Title"
              />

              <p
                style={{
                  marginBottom: "3px",
                  fontSize: "1.2rem",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                }}
              >
                Category Description
              </p>
              <TextArea
                value={categoryData.categoryDes}
                onChange={handleInputChange}
                rows={4}
                name="categoryDes"
                style={{
                  marginBottom: "10px",
                  width: screen < 361 ? "85vw" : "300px",
                }}
                placeholder="Category Description"
              />
            </div>

            <label
              className="image-upload-service"
              style={{ marginTop: "20px" }}
              onClick={() => {
                setCategoryData((prevState) => {
                  return { ...prevState, categoryUrl: "" };
                });
              }}
            >
              <input type="file" onChange={imageUploadChange} />
              Choose an image
            </label>

            {imageUpload && (
              <p
                style={{
                  overflow: "auto",
                  maxWidth: "90%",
                  marginBottom: "20px",
                  marginTop: "40px",
                }}
              >
                {imageUpload?.name}
              </p>
            )}

            {categoryData?.categoryUrl === "" && (
              <button
                onClick={uploadImage}
                className="button-upload-service"
                style={{ marginBottom: "20px", marginTop: "20px" }}
              >
                <span className="button_lg">
                  <span className="button_sl"></span>
                  <span className="button_text">UPLOAD</span>
                </span>
              </button>
            )}

            {updateCategoryId === "" && (
              <button
                onClick={onSaveClick}
                className="save-service"
                style={{
                  marginTop: "5px",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
              >
                <span
                  className="save-service-span"
                  style={{
                    fontFamily: " 'Ubuntu', sans-serif ",
                    letterSpacing: "2px",
                    fontWeight: "bold",
                  }}
                >
                  SAVE
                </span>
              </button>
            )}

            {updateCategoryId !== "" && (
              <button
                onClick={updateCategoryClick}
                className="save-service"
                style={{
                  marginTop: "30px",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
              >
                <span
                  className="save-service-span"
                  style={{
                    fontFamily: " 'Ubuntu', sans-serif ",
                    letterSpacing: "2px",
                    fontWeight: "bold",
                  }}
                >
                  UPDATE
                </span>
              </button>
            )}
          </section>

          <section
            style={{
              width: screen < 779 ? "100%" : "60%",
              // background:"orange",
              // minHeight:"100vh",
              display: "flex",
              // alignItems: "center",
               justifyContent: "center",
            }}
          >
            <img
              style={{
                width: screen < 487 ? "88vw" : "450px",
                borderRadius: "10px",
              }}
              src={
                categoryData?.categoryUrl !== ""
                  ? categoryData?.categoryUrl
                  : emptyImage
              }
            />
          </section>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          {categoryDisplay}
        </div>
      </div>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            fontFamily: " 'Ubuntu', sans-serif ",
            fontSize: "1rem",
            letterSpacing: "2px",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
            style: {
              fontFamily: " 'Ubuntu', sans-serif ",
              fontSize: "1rem",
              letterSpacing: "2px",
            },
          },
        }}
      />
      <Backdrop sx={{ color: "gold" }} open={categoryLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Backdrop sx={{ color: "#fff" }} open={uploadLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={opend}
        onClose={handleClosed}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                letterSpacing: "2px",
                marginBottom: "6px",
                fontFamily: " 'Ubuntu', sans-serif",
                color: "black",
              }}
            >
              Delete category ?
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                letterSpacing: "2px",
                marginBottom: "2px",
                fontFamily: "'Poppins', sans-serif",
                color: "#6f7075",
              }}
            >
              Are you sure
            </p>

            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                letterSpacing: "2px",
                marginBottom: "2px",
                fontFamily: "'Poppins', sans-serif",
                color: "#6f7075",
              }}
            >
              You want to delete "
             {deleteCategoryData && deleteCategoryData?.categoryTitle!=="" && <span
                style={{
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                  color: "black",
                }}
              >
                {deleteCategoryData?.categoryTitle[0].toUpperCase()+deleteCategoryData?.categoryTitle.slice(1)}
              </span>}
              "?
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                letterSpacing: "2px",
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
                color: "#6f7075",
              }}
            >
              You can't undo this action
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosed} variant="contained">
            <p
              style={{
                fontSize: "1rem",
                letterSpacing: "2px",
                fontFamily: " 'Ubuntu', sans-serif",
              }}
            >
              Cancel
            </p>
          </Button>

          <Button
            onClick={deleteCategoryButtonClick}
            variant="contained"
            color="error"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <DeleteForeverIcon />
              <p
                style={{
                  marginLeft: "3px",
                  fontSize: "1rem",
                  letterSpacing: "2px",
                  fontFamily: " 'Ubuntu', sans-serif",
                }}
              >
                Delete
              </p>
            </div>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCategory;
