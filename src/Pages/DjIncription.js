import {
  Alert,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DropDownData from "../Molecules/DropDownData";
import Input from "../Molecules/Input";
import InputWithDescription from "../Molecules/InputWithDescription";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import checkPhoneNumber from "../helpers/PhoneNumberCheck";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import TextAreaWithDescription from "../Molecules/TextAreaWithDescription";
import { focusOnInput } from "../helpers/focusOnInput";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const DjIncription = () => {
  const [djData, setDjData] = useState({});
  const [errorInput, setErrInput] = useState({ input: "", message: "" });
  const [states, setStates] = useState([]);
  const [imagesToDisplay, setimagesToDisplay] = useState([]);
  const [chowPassword, setChowPassword] = useState(false);
  const [chowConfirmPassword, setChowConfirmPassword] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "" });
  const navigate = useNavigate();
  const [djCategories, setDjCategories] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        { country: "Tunisia" }
      );

      setStates(
        response.data.data.states.map((item) => ({
          title: item.name,
        }))
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "http://localhost:5000/djCategorie/getAllDjCategories"
      );
      if (response.data.status === 200) {
        setDjCategories(response.data.categories);
      }
    })();
  }, []);

  const setDataDj = (key, value) => {
    const currDjData = djData;
    currDjData[key] = value;
    setDjData(currDjData);
    setErrInput("");
  };
  const verifData = () => {
    if (!djData.firstName) {
      setErrInput({ input: "firstName", message: "First Name is Empty" });
      focusOnInput("firstName");
      return false;
    }
    if (!djData.lastName) {
      setErrInput({ input: "lastName", message: "Last Name is Empty" });
      focusOnInput("lastName");
      return false;
    }
    if (!djData.email) {
      setErrInput({ input: "email", message: "Email is Empty or Invalid" });
      focusOnInput("lastName");

      return false;
    }
    if (!djData.phoneNumber) {
      setErrInput({
        input: "phoneNumber",
        message: "Phone Number is Empty or Invalid",
      });
      focusOnInput("lastName");

      return false;
    }
    if (!checkPhoneNumber(djData.phoneNumber)) {
      setErrInput({
        input: "phoneNumber",
        message: "Phone Number is Invalid",
      });
      focusOnInput("lastName");

      return false;
    }
    if (!djData.password) {
      setErrInput({
        input: "password",
        message: "Password is Empty",
      });
      focusOnInput("email");

      return false;
    }
    if (!djData.confirmPassword || djData.confirmPassword !== djData.password) {
      setErrInput({
        input: "confirmPassword",
        message: "Passwords are not Identical",
      });
      focusOnInput("email");

      return false;
    }

    if (!djData.state) {
      setErrInput({
        input: "state",
        message: "State is Not Choosen",
      });
      focusOnInput("password");

      return false;
    }
    if (!djData.businessName) {
      setErrInput({
        input: "businessName",
        message: "Profile Name is Empty",
      });
      focusOnInput("state");

      return false;
    }
    if (!djData.bio) {
      setErrInput({
        input: "bio",
        message: "Bio is Empty",
      });
      focusOnInput("businessName");

      return false;
    }
    if (!djData.tarif) {
      setErrInput({
        input: "tarif",
        message: "Tarif is Empty",
      });
      focusOnInput("bio");

      return false;
    }
    if (!djData.djType) {
      setErrInput({
        input: "djType",
        message: "Categorie is not Choosen",
      });
      focusOnInput("tarif");

      return false;
    }
    if (!djData.otherCat || djData.otherCat.length === 0) {
      setErrInput({
        input: "otherCat",
        message: "Additional Categories are not Choosen",
      });
      focusOnInput("djType");

      return false;
    }
    if (!djData.profilePicture) {
      setErrInput({
        input: "profilePicture",
        message: "Main Profile Picture is not Choosen",
      });
      focusOnInput("otherCat");

      return false;
    }
    if (imagesToDisplay.length === 0) {
      setErrInput({
        input: "pictures",
        message: "Additional Profile Pictures are not Added",
      });
      focusOnInput("otherCat");
      return false;
    }
    return true;
  };
  const submiForm = async (e) => {
    console.log("clicked");
    e.preventDefault();
    const isDataValid = verifData();
    console.log(isDataValid);
    if (isDataValid) {
      const formData = new FormData();
      formData.append("email", djData.email);
      formData.append("firstName", djData.firstName);
      formData.append("lastName", djData.lastName);
      formData.append("phoneNumber", djData.phoneNumber);
      formData.append("password", djData.password);
      formData.append("state", djData.state);
      formData.append("businessName", djData.businessName);
      formData.append("djType", djData.djType);
      formData.append("otherTypes", djData.otherCat);
      formData.append("pictures", djData.profilePicture.file);
      formData.append("tarif", djData.tarif);
      formData.append("bio", djData.bio);

      imagesToDisplay.forEach((item) => {
        formData.append("pictures", item.img);
      });
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }
      const registerResponse = await axios.post(
        "http://localhost:5000/dj/register",
        formData
      );
      if (registerResponse.data.status === 400) {
        setSnack({ open: true, message: "Register Failed !!!" });
        setErrInput({
          input: registerResponse.data.attr,
          message: registerResponse.data.message,
        });
        focusOnInput(
          registerResponse.data.attr === "email" ? "lastName" : "state"
        );
      }
      if (registerResponse.data.status === 200) {
        navigate("/register/success");
      }
      console.log(registerResponse);
    }
  };
  const categoriePick = (e) => {
    console.log(e.target.value);
    const currState = djData;
    currState["djType"] = e.target.value;
    console.log(currState);
    setDjData(currState);
  };

  const pickDjPhoto = (e) => {
    console.log(e.target.files);

    const imges = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const img = e.target.files[i];
      imges.push({ url: URL.createObjectURL(img), img: img });
    }
    setimagesToDisplay(imges);
    setErrInput("");
  };

  const pickMainDjPhoto = (e) => {
    setDjData({
      ...djData,
      profilePicture: {
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      },
    });
  };

  const deleteImage = (img) => {
    console.log(djData);
    setimagesToDisplay(
      imagesToDisplay.filter((imgs) => imgs.img.name !== img.img.name)
    );
    console.log(imagesToDisplay);
  };
  const addMoreCategories = (e) => {
    console.log(e);
    if (e.target.checked) {
      setDjData({
        ...djData,
        otherCat: djData.otherCat
          ? [...djData.otherCat, e.target.value]
          : [e.target.value],
      });
    } else {
      setDjData({
        ...djData,
        otherCat: djData.otherCat.filter((it) => it !== e.target.value),
      });
    }
  };

  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };
  console.log(djData);
  return (
    <div>
      <div className="inscri-dj-top">
        <h1 className="reserve-dj-top-title">
          connect with party planners and book more events
        </h1>

        <p className="reserve-dj-top-description">
          With 25 years of expertise and more than 30,000 unique daily visitors,
          we’ll help you book the events you’re looking for and grow your
          business.
        </p>
      </div>
      <div className="strip-dj-inscription">
        Start getting booked for more weddings, birthdays, corporate events, and
        other private parties.
      </div>
      <form onSubmit={(e) => submiForm(e)}>
        <div className="dj-form-container">
          <div className="stepper-container">
            <p>
              Ready to book more events as a vendor? Fill out this short form to
              get started.
            </p>

            <p className="form-part-title">Personal Informations</p>

            <div className="step1-top-inputs">
              <div className="reserce-service-requested-input">
                <Input
                  id="firstName"
                  type={"text"}
                  placeHolder={"eg : Jhon..."}
                  label={"first name"}
                  name="firstName"
                  onChageInput={setDataDj}
                  errorMsj={errorInput.message}
                  errShown={errorInput.input}
                />
              </div>
              <div className="reserce-service-requested-input">
                <Input
                  id="lastName"
                  type={"text"}
                  placeHolder={"eg : Doe..."}
                  label={"last name"}
                  name="lastName"
                  onChageInput={setDataDj}
                  errorMsj={errorInput.message}
                  errShown={errorInput.input}
                />
              </div>
            </div>
            <div className="step1-top-inputs">
              <div className="reserce-service-requested-input">
                <Input
                  id="email"
                  type={"email"}
                  placeHolder={"eg : Jhon.doe@gmail.com"}
                  label={"EMail Adress"}
                  name="email"
                  onChageInput={setDataDj}
                  errorMsj={errorInput.message}
                  errShown={errorInput.input}
                />
              </div>
              <div className="reserce-service-requested-input">
                <Input
                  id="phoneNumber"
                  type={"text"}
                  placeHolder={"eg : 50492..."}
                  label={"Phone Number"}
                  name="phoneNumber"
                  onChageInput={setDataDj}
                  errorMsj={errorInput.message}
                  errShown={errorInput.input}
                />
              </div>
            </div>
            <div className="step1-top-inputs">
              <div className="reserce-service-requested-input">
                <Input
                  id="password"
                  type={`${chowPassword ? "text" : "password"}`}
                  placeHolder={"********"}
                  label={"Password"}
                  name="password"
                  onChageInput={setDataDj}
                  errorMsj={errorInput.message}
                  errShown={errorInput.input}
                />
                <div onClick={() => setChowPassword(!chowPassword)}>
                  {" "}
                  <RemoveRedEyeOutlinedIcon className="show-password-icon" />
                </div>
              </div>
              <div className="reserce-service-requested-input">
                <Input
                  id="confirmPassword"
                  type={`${chowConfirmPassword ? "text" : "password"}`}
                  placeHolder={"********"}
                  label={"Confirm Password"}
                  name="confirmPassword"
                  onChageInput={setDataDj}
                  errorMsj={errorInput.message}
                  errShown={errorInput.input}
                />
                <div
                  onClick={() => setChowConfirmPassword(!chowConfirmPassword)}
                >
                  <RemoveRedEyeOutlinedIcon className="show-password-icon" />
                </div>
              </div>
            </div>
            <p className="form-part-title">Business Informations</p>
            <div className="step1-top-inputs">
              <div className=" reserce-service-requested-input width-100">
                <DropDownData
                  id="state"
                  label={"state"}
                  data={states}
                  placeHolder={"Pick a State"}
                  onChangeDropDown={setDataDj}
                  name="state"
                  errorMsj={errorInput.message}
                  errShown={errorInput.input}
                />
              </div>
            </div>
            <div className="step1-top-inputs">
              <div className="reserce-service-requested-input">
                <InputWithDescription
                  id="businessName"
                  label={"Profile name"}
                  data={states}
                  placeHolder={"Business Name"}
                  onChageInput={setDataDj}
                  name="businessName"
                  errorMsj={errorInput.message}
                  errShown={errorInput.input}
                  description={
                    "Your profile name will be the name displayed on your profile and in search results, so choose something that represents your business and stands out to party planners!              "
                  }
                />
              </div>
            </div>
            <div className="step1-top-inputs">
              <div className="reserce-service-requested-input">
                <TextAreaWithDescription
                  id="bio"
                  label={"About Dj"}
                  data={states}
                  placeHolder={
                    "eg : You can talk about yourself and what you are passionate about..."
                  }
                  onChageInput={setDataDj}
                  name="bio"
                  errorMsj={errorInput.message}
                  errShown={errorInput.input}
                  description={
                    "Write a short essai of 10 lines describing your self and your passions to make more powerfull relation and good understanding with clients"
                  }
                />
              </div>
            </div>
            <div className="step1-top-inputs">
              <div className="reserce-service-requested-input">
                <InputWithDescription
                  id="tarif"
                  label={"Tarif"}
                  data={states}
                  placeHolder={"eg : 300"}
                  onChageInput={setDataDj}
                  name="tarif"
                  errorMsj={errorInput.message}
                  errShown={errorInput.input}
                  description={
                    "Tarif will give more information to your client "
                  }
                />
              </div>
            </div>
            <div className="primary-categorie-dj">
              <p className="primary-title">PRIMARY CATEGORY </p>
              <p className="primary-description">
                Select the category that best matches the service you provide.
                You’ll get to choose additional categories related to this one
                later on.
              </p>
              <div className="categorie-container-block">
                <RadioGroup
                  id="djType"
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue=""
                  name="radio-buttons-group"
                  className="radio-group-dj"
                  onChange={(e) => categoriePick(e)}
                >
                  {djCategories ? (
                    djCategories.map((cat) => (
                      <FormControlLabel
                        className="radioEl-categorie"
                        value={cat.label}
                        control={<Radio />}
                        label={cat.label}
                      />
                    ))
                  ) : (
                    <div className="loaderContainer">
                      <ReactLoading
                        type={"bubbles"}
                        color={"green"}
                        height={500}
                        width={250}
                      />
                    </div>
                  )}
                </RadioGroup>
              </div>
              {errorInput.input === "djType" ? (
                <p className="errorMsj">{errorInput.message}</p>
              ) : null}
            </div>

            <div className="primary-categorie-dj">
              <p className="primary-title">Other Categories</p>
              <p className="primary-description">
                choose additional categories that you can perform well in them.
              </p>
              <div className="categorie-container-block">
                <FormGroup
                  id="otherCat"
                  onChange={(e) => addMoreCategories(e)}
                  className="radio-group-dj"
                >
                  {djCategories ? (
                    djCategories.map((cat) => (
                      <FormControlLabel
                        className="radioEl-categorie"
                        control={<Checkbox />}
                        label={cat.label}
                        value={cat.label}
                      />
                    ))
                  ) : (
                    <div className="loaderContainer">
                      <ReactLoading
                        type={"bubbles"}
                        color={"green"}
                        height={500}
                        width={250}
                      />
                    </div>
                  )}
                </FormGroup>
              </div>
              {errorInput.input === "otherCat" ? (
                <p className="errorMsj">{errorInput.message}</p>
              ) : null}
            </div>
            <div className="step1-top-inputs">
              <div className="dj-picture-container">
                <label>Main Profile Picture</label>
                {errorInput.input === "profilePicture" ? (
                  <p className="errorMsj">{errorInput.message}</p>
                ) : null}
                <div
                  style={{
                    marginTop: 20,
                  }}
                  className="dropdown-control-input-description"
                >
                  <div className="dropDown-container">
                    <input
                      id="profilePicture"
                      accept="image/x-png,image/gif,image/jpeg"
                      type={"file"}
                      placeholder="Main Profile Picture"
                      className="dj-picture-input-el"
                      onChange={(e) => pickMainDjPhoto(e)}
                    />
                    <p className="placeholder-input-file-dj">
                      Click in the Box to Choose Main Profile Picture from you
                      Gallery
                    </p>
                    <InsertPhotoOutlinedIcon
                      style={{
                        fontSize: 32,
                        fill: "gray",
                        position: "absolute",
                        left: 20,
                      }}
                    />
                  </div>
                </div>

                <div className="images-dj-container">
                  {djData.profilePicture ? (
                    <div
                      style={{
                        position: "relative",
                        margin: 10,
                      }}
                    >
                      {" "}
                      <img
                        className="imgpicked-forDj"
                        src={djData.profilePicture.url}
                        alt=""
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="step1-top-inputs">
              <div className="dj-picture-container">
                <label>Profile Pictures</label>
                {errorInput.input === "pictures" ? (
                  <p className="errorMsj">{errorInput.message}</p>
                ) : null}
                <div
                  style={{
                    marginTop: 20,
                  }}
                  className="dropdown-control-input-description"
                >
                  <div className="dropDown-container">
                    <input
                      id="pictures"
                      multiple
                      accept="image/x-png,image/gif,image/jpeg"
                      type={"file"}
                      placeholder="Profile-pics"
                      className="dj-picture-input-el"
                      onChange={(e) => pickDjPhoto(e)}
                    />
                    <p className="placeholder-input-file-dj">
                      Click in the Box to Choose Profile Pictures from you
                      Gallery
                    </p>
                    <InsertPhotoOutlinedIcon
                      style={{
                        fontSize: 32,
                        fill: "gray",
                        position: "absolute",
                        left: 20,
                      }}
                    />
                  </div>
                </div>

                <div className="images-dj-container">
                  {imagesToDisplay.length > 0
                    ? imagesToDisplay.map((img) => (
                        <div
                          style={{
                            position: "relative",
                            margin: 10,
                          }}
                        >
                          {" "}
                          <img
                            className="imgpicked-forDj"
                            src={img.url}
                            alt=""
                          />
                          <div
                            onClick={() => deleteImage(img)}
                            className="delete-imageIconCOntainer"
                          >
                            <RemoveCircleOutlineOutlinedIcon />
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <div className="btns-stepper-container">
              <input
                type={"submit"}
                className="reserve-stepper-nextBtn"
                value={"REGISTER"}
              />
            </div>
          </div>
        </div>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DjIncription;
