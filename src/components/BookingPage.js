/* global fetchAPI, submitAPI */
import React, { useReducer } from "react";
import BookingForm from "./BookingForm";
import "./BookingPage.css";

// Function to initialize available times using the API for today's date
export const initializeTimes = () => {
  const today = new Date();
  return fetchAPI(today); // Call fetchAPI for today's date
};

// Function to update available times using the API for the selected date
export const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
      return fetchAPI(new Date(action.payload)); // Fetch times for the new date
    default:
      return state;
  }
};

const BookingPage = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  return (
    <div className="booking-page">
      <header className="booking-header">
        <h1>Welcome to Little Lemon</h1>
        <p>Reserve a table and enjoy a memorable dining experience.</p>
      </header>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </div>
  );
};

export default BookingPage;