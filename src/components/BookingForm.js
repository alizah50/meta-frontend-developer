// import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Lottie from "lottie-react";
import calendarAnimation from "../animations/calendar.json";
import { useNavigate } from "react-router-dom";
import "./BookingForm.css";

const BookingForm = ({ availableTimes, dispatch }) => {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    date: Yup.string().required("Date is required."),
    time: Yup.string().required("Time is required."),
    guests: Yup.number()
      .min(1, "Guests must be at least 1.")
      .max(20, "Guests cannot exceed 20.")
      .required("Number of guests is required."),
    occasion: Yup.string().required("Occasion is required."),
  });

  return (
    <Formik
      initialValues={{
        date: "",
        time: "",
        guests: 1,
        occasion: "Birthday",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const reservationSuccess = submitAPI(values); // Simulated API call
        if (reservationSuccess) {
          navigate("/confirmed", { state: { reservationDetails: values } });
        } else {
          alert("Something went wrong. Please try again.");
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid, setFieldValue }) => (
        <Form className="booking-form">
          <h2>Book a Table</h2>
          <Lottie
            animationData={calendarAnimation}
            loop={true}
            className="lottie-calendar"
          />

          {/* Date Picker */}
          <div className="form-group">
            <label htmlFor="date">Choose Date</label>
            <Field
              type="date"
              id="date"
              name="date"
              min={new Date().toISOString().split("T")[0]} // Prevent past dates
              onChange={(e) => {
                setFieldValue("date", e.target.value);
                dispatch({ type: "UPDATE_TIMES", payload: e.target.value }); // Update available times
              }}
            />
            <ErrorMessage name="date" component="small" className="error-message" />
          </div>

          {/* Time Picker */}
          <div className="form-group">
            <label htmlFor="time">Choose Time</label>
            <Field as="select" id="time" name="time">
              <option value="" disabled>
                Select Time
              </option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Field>
            <ErrorMessage name="time" component="small" className="error-message" />
          </div>

          {/* Number of Guests */}
          <div className="form-group">
            <label htmlFor="guests">Number of Guests</label>
            <Field
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="20"
              placeholder="1-20"
            />
            <ErrorMessage name="guests" component="small" className="error-message" />
          </div>

          {/* Occasion Picker */}
          <div className="form-group">
            <label htmlFor="occasion">Occasion</label>
            <Field as="select" id="occasion" name="occasion">
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage name="occasion" component="small" className="error-message" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-button ${isSubmitting || !isValid ? "disabled" : ""}`}
            disabled={isSubmitting || !isValid}
          >
            Submit Reservation
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BookingForm;
