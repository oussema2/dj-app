import React from "react";
import { Link } from "react-router-dom";

const PartyCard = ({ party, type, declineOffer, acceptOffer }) => {
  console.log(party);
  return (
    <div className="DJ-carte-Container">
      <div className="dj-carte-wrapper">
        <div className="dj-carte-rightSide">
          <div className="dj-carte-rightSide-top">
            <h3 className="dj-title">
              Party Request from : {party.firstName + " " + party.lastName} | ({" "}
              {party.clientProfile} ){" "}
            </h3>
            <p className="dj-service-location">
              ASKING FOR : {party.service} | FOR {party.partyType} |{" "}
              <span className="party-card-subtitle">Guest Number</span> |{" "}
              {party.numberOfGuest} | In : {party.venue}{" "}
            </p>
            <p className="party-card-row ">
              <span className="party-card-title"> Party Start At :</span>{" "}
              {party.partyTime} | Ends after {party.partyLength} | {party.date}
            </p>
            <br></br>
            <p className="party-card-row ">
              <span className="party-card-title">Party Location :</span>{" "}
              <span className="party-card-subtitle">State</span> | {party.state}{" "}
              | <span className="party-card-subtitle">City</span> | {party.city}
            </p>
            <br></br>
            <p className="party-card-row ">
              <span className="party-card-title">Coordinations :</span>{" "}
              <span className="party-card-subtitle">Phine Number</span> |{" "}
              {party.phoneNumber} |{" "}
              <span className="party-card-subtitle">Email</span> | {party.email}
            </p>
          </div>
          {type === "pendings" ? (
            <div className="dj-carte-rightSide-bottom">
              <div className="d-carte-rightSide-bottom-right">
                {" "}
                <button
                  onClick={declineOffer}
                  className="dj-carte-viewProfile-btn"
                >
                  DECLINE OFFER{" "}
                </button>
                <button onClick={acceptOffer} className="dj-carte-book-btn">
                  ACCEPT OFFER
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PartyCard;
