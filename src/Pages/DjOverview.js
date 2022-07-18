import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import ServicePuce from "../Atomes/ServicePuce";
import Star from "../Atomes/Star";
import EventCartProfile from "../Molecules/EventCartProfile";

const DjOverview = (props) => {
  const [aboutExpanded, setAboutExpanded] = useState(false);
  console.log(props);
  const [dj] = useOutletContext();
  console.log(dj.upcomingPartys);
  return (
    <div>
      <div className="dj-overview-description-container">
        <div className="dj-overview-profile">
          <p className="dj-name-text">{dj.businessName}</p>
          <p className="dj-coordination">
            DJ from {dj.state}, Will travel up to 120 miles
          </p>
        </div>
        <div className="dj-overview-achievment">
          <div className="dj-rates">
            <div className="stars">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <p className="achievement-text">
              Avg <b>5.0</b> | <b>99 reviews</b>
            </p>
          </div>
          <div className="verified-booking">
            <div className="icon-verified"></div>
            <p className="achievement-text">
              <b>{dj.previousPartys?.length + dj.upcomingPartys?.length}</b>{" "}
              Verified Bookings
            </p>
          </div>
          <div className="verified-booking">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="member-since-icon"
              aria-hidden="false"
            >
              <path
                fill="#082278"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 1C7.59874 1 5.33968 1.93407 3.63865 3.63383C1.93761 5.33358 1 7.59462 1 10C1 12.4054 1.93759 14.6663 3.63865 16.3662C5.3397 18.0661 7.59469 19 10 19C12.4053 19 14.6603 18.0659 16.3614 16.3662C18.0624 14.6664 19 12.4054 19 10C19 7.59462 18.0624 5.33374 16.3614 3.63383C14.6603 1.93391 12.4013 1 10 1ZM10 17.7972C5.69173 17.7972 2.18677 14.2974 2.18677 10C2.18677 5.70258 5.69193 2.20279 10 2.20279C14.3081 2.20279 17.8133 5.70258 17.8133 10C17.8133 14.2974 14.3081 17.7972 10 17.7972Z"
              ></path>
              <path
                fill="#082278"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.5142 9.97977V4.79237C10.5142 4.45964 10.2492 4.19104 9.92081 4.19104C9.59245 4.19104 9.32739 4.45964 9.32739 4.79237V10.2766C9.32739 10.465 9.40651 10.6414 9.55289 10.7536L13.1569 13.5599C13.2637 13.644 13.3903 13.6841 13.5169 13.6841C13.6949 13.6841 13.8729 13.604 13.9916 13.4476C14.1894 13.1871 14.142 12.8102 13.8809 12.6058L10.5142 9.97977Z"
              ></path>
            </svg>
            <p className="achievement-text">
              Member Since <b>2010</b>
            </p>
          </div>
          <div className="verified-booking">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="member-since-icon"
              aria-hidden="false"
            >
              <path
                fill="#082278"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.4014 3.62071C19.0179 3.22081 18.5083 3 17.9642 3H2.03173C1.49163 3 0.978037 3.22081 0.59452 3.62071C0.211004 4.01654 0 4.54436 0 5.10582V14.8942C0 15.453 0.211 15.9794 0.59452 16.3793C0.978037 16.7792 1.48763 17 2.03173 17H17.9683C18.5084 17 19.022 16.7792 19.4055 16.3793C19.789 15.9835 20 15.4556 20 14.8942V5.10685C19.996 4.54808 19.785 4.0203 19.4015 3.6204L19.4014 3.62071ZM19.0444 14.8957C19.0444 15.2027 18.929 15.4922 18.7219 15.7089C18.5176 15.923 18.2495 16.0402 17.9642 16.0402H2.03172C1.74641 16.0402 1.47834 15.923 1.27397 15.713C1.06695 15.4962 0.951491 15.2067 0.951491 14.8997V9.76703H19.0487V14.8956L19.0444 14.8957ZM19.0444 8.8058H0.9513V6.77271H19.0485V8.8058H19.0444ZM19.0444 5.81001H0.9513V5.10716C0.9513 4.80018 1.06675 4.51069 1.27377 4.29391C1.47814 4.07983 1.7462 3.96269 2.03153 3.96269H17.9681C18.2534 3.96269 18.5215 4.07983 18.7258 4.29391C18.9329 4.51069 19.0483 4.80019 19.0483 5.10716L19.0444 5.81001Z"
              ></path>
              <path
                fill="#082278"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.7144 15.5263C16.8976 15.5263 17.8572 14.5337 17.8572 13.3165C17.8572 12.0978 16.8949 11.1052 15.7144 11.1052C14.5312 11.1052 13.5715 12.0978 13.5715 13.3151C13.5729 14.5379 14.5353 15.5263 15.7144 15.5263ZM15.7144 12.1118C16.3605 12.1118 16.884 12.651 16.884 13.3165C16.884 13.9819 16.3605 14.5211 15.7144 14.5211C15.0682 14.5211 14.5448 13.9819 14.5448 13.3165C14.5462 12.651 15.0723 12.1118 15.7144 12.1118Z"
              ></path>
              <path
                fill="#082278"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.92605 11.8421H7.35946C7.63327 11.8421 7.85704 11.6766 7.85704 11.4742C7.85704 11.2717 7.63326 11.1063 7.35946 11.1063L1.92605 11.1052C1.65224 11.1052 1.42847 11.2707 1.42847 11.4731C1.42708 11.6787 1.65086 11.8421 1.92605 11.8421V11.8421Z"
              ></path>
              <path
                fill="#082278"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.58615 13.3158H5.27093C5.51489 13.3158 5.71425 13.1501 5.71425 12.9474C5.71425 12.7447 5.51487 12.579 5.27093 12.579H2.58615C2.34219 12.579 2.14283 12.7447 2.14283 12.9474C2.14159 13.1501 2.34097 13.3158 2.58615 13.3158Z"
              ></path>
            </svg>
            <p className="achievement-text">Accepts Online Payment</p>
          </div>
          <div className="verified-booking">
            <div className="icon-tarif"></div>
            <p className="achievement-text">
              Starting at <b>${dj.tarif} per event</b>
            </p>
          </div>
        </div>
        <div className="dj-request-quote">
          <Link to={`/reserve_dj/${dj.businessName}/step/1`}>
            <button className="request-free-quote-btn">
              REQUEST FREE QUOTE
            </button>
          </Link>
        </div>
      </div>

      <div className="about-dj-container">
        <div className="about-dj-leftSide">
          <p className="about-dj-title">About Vendor</p>
          <p className="about-dj-description">
            Learn more about this vendor for your event.
          </p>
        </div>
        <div className="about-dj-rightSide">
          <p
            className={`about-dj-text ${
              aboutExpanded
                ? "about-dj-text-maximise"
                : "about-dj-text-minimise"
            }`}
          >
            {dj.bio}
          </p>
          <p
            className="view-all-less"
            onClick={() => setAboutExpanded(!aboutExpanded)}
          >
            {aboutExpanded ? "VIEW LESS" : "VIEW ALL"}{" "}
            <span>
              <svg
                fill="blue"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-6 -9 24 24"
                class={`${aboutExpanded ? "icon-rotated" : null} icon-expand`}
                aria-hidden="false"
                width={"20"}
              >
                <path
                  fill-rule="evenodd"
                  d="M371 819L370.491 819.412 365 823.868 366.017 825 371 820.956 375.983 825 377 823.868 371.509 819.412z"
                  transform="rotate(-180 188.5 412.5)"
                ></path>
              </svg>
            </span>
          </p>
        </div>
      </div>

      <div className="about-dj-container">
        <div className="about-dj-leftSide">
          <p className="about-dj-title">Services</p>
          <p className="about-dj-description">
            View a list of services offered by this vendor.
          </p>
        </div>
        <div className="dj-services-rightSide">
          {dj.otherTypes?.map((type) => (
            <ServicePuce title={type} />
          ))}
        </div>
      </div>

      <div className="about-dj-container">
        <div className="about-dj-leftSide">
          <p className="about-dj-title">Booked Events</p>
          <p className="dj-bookings-description">
            {" "}
            <div className="icon-verified"></div>: The Bash Verified Bookings
          </p>
        </div>
        <div className="event-upcoming-previous-container">
          <div style={{ marginBottom: 50 }} className="dj-bookings-rightSide">
            <p className="dj-bookings-upcoming-title">Upcoming Events</p>
            <div className="eventCarte-upcoming-container">
              {dj.upcomingPartys?.length > 0 ? (
                dj.upcomingPartys.map((pr) => <EventCartProfile party={pr} />)
              ) : (
                <p className="no-event-in-overview">No Event YEt</p>
              )}
            </div>
          </div>
          <div style={{ marginBottom: 50 }} className="dj-bookings-rightSide">
            <p className="dj-bookings-upcoming-title">Previous Events</p>
            <div className="eventCarte-upcoming-container">
              {dj.upcomingPartys?.length > 0 ? (
                dj.previousPartys.map((pr) => <EventCartProfile party={pr} />)
              ) : (
                <p className="no-event-in-overview">No Event YEt</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DjOverview;
