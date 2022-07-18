import React from "react";
import { serviceLength } from "../StaticData/ServiceLength";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const findMinutes = (title) => {
  for (let i = 0; i < serviceLength.length; i++) {
    const ti = serviceLength[i];
    if (ti.title === title) {
      return ti.min;
    }
  }
};
const EventCartProfile = ({ party }) => {
  const partyDate = new Date(party.date);
  const partyTime = party.partyTime.split(" ");
  const partyhoursMin = partyTime[0].split(":");
  console.log(partyhoursMin);
  console.log(partyTime[1].substring(partyTime[1] - 1, 4));

  partyDate.setHours(
    party.partyTime.includes("AM")
      ? Number(partyhoursMin[0])
      : Number(partyhoursMin[0] + 12),
    Number(partyhoursMin[1])
  );
  const endService = new Date(
    partyDate.getTime() + findMinutes(party.partyLength) * 60000
  );
  return (
    <div>
      {" "}
      <div className="top-eventCarteProfile">
        {" "}
        <div className="icon-verified-upcoming"></div>
        <p className="event-details">
          {" "}
          {monthNames[partyDate.getMonth()]} {partyDate.getDate()},{" "}
          {partyDate.getFullYear()} • {party.partyType}
        </p>
      </div>
      <div>
        <p className="event-hour">
          {partyDate.toLocaleString("en-us", { weekday: "short" })} •{" "}
          {partyDate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}{" "}
          -{" "}
          {endService.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}{" "}
          • {party.state}|{party.city}
        </p>
      </div>
    </div>
  );
};

export default EventCartProfile;
