import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import checkPhoneNumber from "../../helpers/PhoneNumberCheck";
import DateInput from "../../Molecules/DateInput";
import DropDownData from "../../Molecules/DropDownData";
import Input from "../../Molecules/Input";
import { clientProfile } from "../../StaticData/clientProfile";
import { serviceLength } from "../../StaticData/ServiceLength";
import { timesArray } from "../../StaticData/TimesArray";
import ReactLoading from "react-loading";
import { Alert, Snackbar } from "@mui/material";
import { focusOnInput } from "../../helpers/focusOnInput";
const guestsNumbering = [
  { title: "< 25" },
  { title: "24-49" },
  { title: "50-99" },
  { title: "100-199" },
  { title: "200-299" },
  { title: "300-499" },
  { title: "500+" },
];

const Step1 = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const params = useParams();
  const [partyData, setPartyData] = useState({ dj: params.id });
  const [errorInput, setErrorInput] = useState("");
  const [dj, setDj] = useState({});
  const [eventTypes, setEventTypes] = useState([]);
  const [snack, setSnack] = useState({ open: false, message: "" });
  const navigate = useNavigate();
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
        `http://localhost:5000/eventType/getAllEventTypes`
      );
      if (response.data.status === 200) {
        setEventTypes(response.data.eventType);
      }
    })();
  }, []);
  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:5000/dj/getDjByBussinessName/${params.id}`
      );
      if (response.data.status === 200) {
        setDj(response.data.dj);
      }
    })();
  }, []);

  async function getCities() {
    setPartyData({ ...partyData, state: arguments[1] });
    const response = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      { country: "Tunisia", state: arguments[1] }
    );

    setCities(
      response.data.data.map((item) => ({
        title: item,
      }))
    );
  }

  const verifForm = () => {
    if (!partyData.service) {
      setErrorInput("service");
      focusOnInput("service");
      return false;
    }
    if (!partyData.partyType) {
      setErrorInput("partyType");
      focusOnInput("partyType");
      return false;
    }
    if (!partyData.date) {
      setErrorInput("date");
      focusOnInput("date");

      return false;
    }
    if (!partyData.venue) {
      setErrorInput("venue");
      focusOnInput("venue");

      return false;
    }
    if (!partyData.numberOfGuest) {
      setErrorInput("numberOfGuest");
      focusOnInput("numberOfGuest");

      return false;
    }
    if (!partyData.state) {
      setErrorInput("state");
      focusOnInput("state");

      return false;
    }
    if (!partyData.city) {
      setErrorInput("city");
      focusOnInput("city");

      return false;
    }
    if (!partyData.partyTime) {
      setErrorInput("partyTime");
      focusOnInput("partyTime");

      return false;
    }
    if (!partyData.partyLength) {
      setErrorInput("partyLength");
      focusOnInput("partyLength");
      return false;
    }

    if (!partyData.firstName) {
      setErrorInput("firstName");
      focusOnInput("firstName");
      return false;
    }
    if (!partyData.lastName) {
      setErrorInput("lastName");
      focusOnInput("lastName");
      return false;
    }
    if (!partyData.clientProfile) {
      setErrorInput("clientProfile");
      focusOnInput("clientProfile");
      return false;
    }
    if (!partyData.email) {
      setErrorInput("email");
      focusOnInput("email");
      return false;
    }

    if (!partyData.confirmEmail || partyData.confirmEmail !== partyData.email) {
      setErrorInput("confirmEmail");
      focusOnInput("confirmEmail");
      return false;
    }
    if (!partyData.phoneNumber) {
      setErrorInput("phoneNumber");
      focusOnInput("confirmEmail");
      return false;
    }
    if (!checkPhoneNumber(partyData.phoneNumber)) {
      setErrorInput("phoneNumber");
      focusOnInput("phoneNumber");
      return false;
    }
    setErrorInput("");
    return true;
  };

  const setDataParty = (key, value) => {
    console.log(key, value);
    const prevData = partyData;
    prevData[key] = value;
    setPartyData(prevData);
  };
  const submiForm = async (e) => {
    e.preventDefault();
    console.log(partyData);
    const isFormValid = verifForm();
    console.log(isFormValid);
    if (isFormValid) {
      setPartyData({ ...partyData, dj: dj._id });
      const addPArtyResponse = await axios.post(
        "http://localhost:5000/party/addParty",
        partyData
      );
      console.log(addPArtyResponse);
      if (addPArtyResponse.data.status === 200) {
        console.log("entered");
        setSnack({
          open: true,
          message:
            "You Party is Successfully Registred , wait for the Dj acceptance of your offer You will be redirected to The Home Page",
        });
        setTimeout(() => {
          navigate("/djs");
        }, 3000);
      }
    }
  };
  return (
    <div className="step1-top-form">
      {dj._id ? (
        <form onSubmit={(e) => submiForm(e)}>
          <div className="step1-top-inputs">
            <div className="dj-container-reserve">
              <div className="reserve-step1-youve-select">YOU'VE SELECTED</div>
              <div className="dj-pic-detail-container">
                <div className="dj-pic-container">
                  {" "}
                  <img
                    alt="test"
                    className="dj-pic-reserve"
                    src={`http://localhost:5000/djImages/${dj?._id}/${dj?.profilePicture}`}
                  />
                </div>
                <div className="dj-details-container">
                  <h3 className="dj-name-reserve">{dj.businessName}</h3>
                  <p className="dj-location-reserve">DJ FROM {dj.state}</p>
                </div>
              </div>
            </div>
            <div className="reserce-service-requested-input">
              <DropDownData
                id="service"
                placeHolder={"Dj"}
                label={"PRIMARY SERVICE REQUESTED"}
                onChangeDropDown={setDataParty}
                name="service"
                errorMsj="Service is Not Choosen"
                errShown={errorInput}
                data={dj.otherTypes.map((it) => ({ title: it }))}
              />
            </div>
          </div>
          <div className="step1-top-inputs">
            <div className="reserce-service-requested-input">
              <DropDownData
                id="partyType"
                placeHolder={"Corporate function"}
                label={"EVENT TYPE"}
                onChangeDropDown={setDataParty}
                name="partyType"
                errorMsj="Event Type is Not Choosen"
                errShown={errorInput}
                data={eventTypes.map((ite) => ({ title: ite.label }))}
              />
            </div>
            <div className="reserce-service-requested-input">
              <DateInput
                onChangeDateInput={setDataParty}
                name="date"
                id="date"
                label={"DATE OF EVENT"}
                errorMsj={"Party Date is Empty"}
                errShown={errorInput}
              />
            </div>
          </div>
          <div className="step1-top-inputs">
            <div className="reserce-service-requested-input">
              <Input
                id="venue"
                onChageInput={setDataParty}
                label={"EVENT VENUE"}
                placeHolder={"House, Hall, Office..."}
                name="venue"
                errorMsj={"Venue Is Empty"}
                errShown={errorInput}
              />
            </div>
            <div className="reserce-service-requested-input">
              <DropDownData
                id="numberOfGuest"
                label={"number of guests"}
                placeHolder={"24-49"}
                data={guestsNumbering}
                onChangeDropDown={setDataParty}
                name="numberOfGuest"
                errorMsj="Number Of Guests is Not Choosen"
                errShown={errorInput}
              />
            </div>
          </div>
          <div className="step1-top-inputs">
            <div className="reserce-service-requested-input">
              <DropDownData
                id="state"
                label={"state"}
                data={states}
                placeHolder={"Pick a State"}
                onChangeDropDown={getCities}
                name="state"
                errorMsj="State is Not Choosen"
                errShown={errorInput}
              />
            </div>
            <div className="reserce-service-requested-input">
              <DropDownData
                id="city"
                onChangeDropDown={setDataParty}
                label={"City"}
                placeHolder={"Pick a City"}
                data={cities}
                name="city"
                errorMsj="City is Not Choosen"
                errShown={errorInput}
              />
            </div>
          </div>
          <div className="step1-top-inputs">
            <div className="reserce-service-requested-input">
              <DropDownData
                id="partyTime"
                label={"VENDOR START TIME"}
                data={timesArray}
                placeHolder={"12:30 PM"}
                onChangeDropDown={setDataParty}
                name="partyTime"
                errorMsj="Party Time is Not Choosen"
                errShown={errorInput}
              />
            </div>
            <div className="reserce-service-requested-input">
              <DropDownData
                id="partyLength"
                label={"VENDOR SERVICE LENGTH"}
                data={serviceLength}
                placeHolder={"1 hour"}
                name="partyLength"
                onChangeDropDown={setDataParty}
                errorMsj="Party Length is Not Choosen"
                errShown={errorInput}
              />
            </div>
          </div>
          <div className="step1-top-inputs">
            <div className="reserce-service-requested-input">
              <Input
                id="firstName"
                type={"text"}
                placeHolder={"eg : Jhon..."}
                label={"first name"}
                name="firstName"
                onChageInput={setDataParty}
                errorMsj="First Name is Empty"
                errShown={errorInput}
              />
            </div>
            <div className="reserce-service-requested-input">
              <Input
                id="lastName"
                type={"text"}
                placeHolder={"eg : Doe..."}
                label={"last name"}
                name="lastName"
                onChageInput={setDataParty}
                errorMsj="Last Name is Empty"
                errShown={errorInput}
              />
            </div>
          </div>
          <div className="step1-top-inputs">
            <div className="reserce-service-requested-input">
              <DropDownData
                id="clientProfile"
                data={clientProfile}
                label={"i am a "}
                onChangeDropDown={setDataParty}
                name="clientProfile"
                placeHolder={"Other"}
                errorMsj="Client Profile is Not Choosen"
                errShown={errorInput}
              />
            </div>
            <div className="reserce-service-requested-input">
              <Input
                id="email"
                placeHolder="eg : jhon.Doe@gmail.com"
                type={"email"}
                label="Email Adress"
                name="email"
                onChageInput={setDataParty}
                errorMsj="Adress email is Empty or Invalid"
                errShown={errorInput}
              />
            </div>
          </div>
          <div className="step1-top-inputs">
            <div className="reserce-service-requested-input">
              <Input
                id="confirmEmail"
                placeHolder="eg : jhon.Doe@gmail.com"
                type={"email"}
                label="Confirm Email Adress"
                errorMsj="Emails are not the same"
                onChageInput={setDataParty}
                name="confirmEmail"
                errShown={errorInput}
              />
            </div>
            <div className="reserce-service-requested-input">
              <Input
                id="phoneNumber"
                placeHolder="eg : 5049...."
                type={"text"}
                label="phone number"
                name="phoneNumber"
                onChageInput={setDataParty}
                errorMsj="Phone Number is Empty or Not Valid"
                errShown={errorInput}
              />
            </div>
          </div>
          <div className="btns-stepper-container">
            <input
              type={"submit"}
              className="reserve-stepper-nextBtn"
              value={"SUBMIT"}
            />
          </div>
        </form>
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Step1;
