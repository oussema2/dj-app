import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PartyCard from "../Molecules/PartyCard";
import { ConnectContext } from "../StateManagement/ConnectContext/ConnectContext";

const DjPartys = () => {
  const { connectState, dispatchConnect } = useContext(ConnectContext);
  const [snack, setSnack] = useState({ open: false, message: "" });
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.type === "pendings");
  const [partys, setPartys] = useState([]);
  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:5000/dj/getUserNormal/${params.id}`
      );
      console.log(response);
      if (response.data.status === 200) {
        switch (params.type) {
          case "pendings":
            console.log("entered pe");
            setPartys(response.data.dj.pendingPartys);
            break;
          case "previous":
            console.log("entered pr");
            setPartys(response.data.dj.previousPartys);
            break;
          case "upcoming":
            console.log("entered up");
            setPartys(response.data.dj.upcomingPartys);
            break;
          default:
            break;
        }
      }
    })();
  }, [params.type]);
  console.log(partys);

  const acceptOffer = async (id, dj) => {
    console.log(id, dj);
    const response = await axios.get(
      `http://localhost:5000/dj/acceptParty/${dj}/${id}`
    );
    if (response.data.status === 200) {
      setSnack({
        open: true,
        message:
          "Party Has Accepted Go to Upcoming Partys to keep track on your schedule",
      });
      setTimeout(() => {
        navigate(`/djs/${params.id}/upcoming`);
      }, 3000);
    }
  };
  const declineOffer = async (id, dj) => {
    console.log(id, dj);
    const response = await axios.get(
      `http://localhost:5000/dj/declineParty/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);

    if (response.data.status === 200) {
      setSnack({
        open: true,
        message:
          "Party Has Been Declined Go to Upcoming Partys to keep track on your schedule",
      });
      setTimeout(() => {
        navigate(`/djs/${params.id}/upcoming`);
      }, 3000);
    }
  };
  return (
    <div>
      {" "}
      <div className="inscri-dj-top">
        <h1 className="reserve-dj-top-title">
          Your <span>{params.type}</span> Partys
        </h1>
      </div>
      <div className="dj-form-container">
        <div className="stepper-container">
          <p>Partys :</p>
          {partys?.length > 0 ? (
            partys?.map((item) => (
              <PartyCard
                declineOffer={() => declineOffer(item._id, item.dj)}
                acceptOffer={() => acceptOffer(item._id, item.dj)}
                type={params.type}
                party={item}
              />
            ))
          ) : (
            <h1 className="no-event-yet">No Event Yet</h1>
          )}
        </div>
      </div>
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

export default DjPartys;
