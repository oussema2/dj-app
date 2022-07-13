import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import checkEmailValid from "../../helpers/EmailChecker";
import checkPhoneNumber from "../../helpers/PhoneNumberCheck";
import DateInput from "../../Molecules/DateInput";
import DropDownData from "../../Molecules/DropDownData";
import Input from "../../Molecules/Input";
import { clientProfile } from "../../StaticData/clientProfile";
import { serviceLength } from "../../StaticData/ServiceLength";
import { timesArray } from "../../StaticData/TimesArray";
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
  const [partyData, setPartyData] = useState({ djId: params.id });
  const [errorInput, setErrorInput] = useState("");
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
    if (!partyData.date) {
      setErrorInput("date");
      return false;
    }
    if (!partyData.venue) {
      setErrorInput("venue");
      return false;
    }
    if (!partyData.numberOfGuest) {
      setErrorInput("numberOfGuest");
      return false;
    }
    if (!partyData.state) {
      setErrorInput("state");
      return false;
    }
    if (!partyData.city) {
      setErrorInput("city");
      return false;
    }
    if (!partyData.partyTime) {
      setErrorInput("partyTime");
      return false;
    }
    if (!partyData.partyLength) {
      setErrorInput("partyLength");
      return false;
    }

    if (!partyData.firstName) {
      setErrorInput("firstName");
      return false;
    }
    if (!partyData.lastName) {
      setErrorInput("lastName");
      return false;
    }
    if (!partyData.clientProfile) {
      setErrorInput("clientProfile");
      return false;
    }
    if (!partyData.email) {
      setErrorInput("email");
      return false;
    }

    if (!partyData.confirmEmail || partyData.confirmEmail !== partyData.email) {
      setErrorInput("confirmEmail");
      return false;
    }
    if (!partyData.phoneNumber) {
      setErrorInput("phoneNumber");
      return false;
    }
    if (!checkPhoneNumber(partyData.phoneNumber)) {
      setErrorInput("phoneNumber");
      return false;
    }
    setErrorInput("");
    return true;
  };

  const setDataParty = (key, value) => {
    const prevData = partyData;
    prevData[key] = value;
    setPartyData(prevData);
  };
  const submiForm = (e) => {
    e.preventDefault();

    const res = verifForm();
    return res;
  };
  // console.log(checkEmailValid(partyData.email));
  return (
    <div className="step1-top-form">
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
                  src="//media-api.xogrp.com/images/d5047862-fdad-4b86-9d1f-05f0b67c69fc~cr_26.40.937.954-rs_50.50.fit"
                />
              </div>
              <div className="dj-details-container">
                <h3 className="dj-name-reserve">Silver Lining Entertainment</h3>
                <p className="dj-location-reserve">DJ FROM HOBOKEN, NJ</p>
              </div>
            </div>
          </div>
          <div className="reserce-service-requested-input">
            <DropDownData
              placeHolder={"Dj"}
              label={"PRIMARY SERVICE REQUESTED"}
              onChangeDateInput={setDataParty}
              name="service"
              errorMsj="Service is Not Choosen"
              errShown={errorInput}
            />
          </div>
        </div>
        <div className="step1-top-inputs">
          <div className="reserce-service-requested-input">
            <DropDownData
              placeHolder={"Corporate function"}
              label={"EVENT TYPE"}
              onChangeDropDown={setDataParty}
              name="partyType"
              errorMsj="Corporate is Not Choosen"
              errShown={errorInput}
            />
          </div>
          <div className="reserce-service-requested-input">
            <DateInput
              onChangeDateInput={setDataParty}
              name="date"
              label={"DATE OF EVENT"}
              errorMsj={"Party Date is Empty"}
              errShown={errorInput}
            />
          </div>
        </div>
        <div className="step1-top-inputs">
          <div className="reserce-service-requested-input">
            <Input
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
    </div>
  );
};

export default Step1;
