import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

let stripePromise;



const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }

  return stripePromise;
};

const Checkout = ({ roomType, roomPrice, roomId, servicePrice}) => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const total = roomPrice + servicePrice;

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const checkInDate = queryParams.get('startDate');
  const checkOutDate = queryParams.get('endDate');
  const PersonsCount = queryParams.get('numberOfPersons');

  const formattedCheckInDate = useMemo(() => {
    return new Date(checkInDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }, [checkInDate]);

  const formattedCheckOutDate = useMemo(() => {
    return new Date(checkOutDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }, [checkOutDate]);

  const checkoutOptions = {
    lineItems: [
      {
        price: "price_1NNuI9Dffa7QJXbQJIvKLfL7",
        quantity: 1,
      }
    ],
    mode: "payment",
    successUrl: `http://localhost:3000/Booking`,
    cancelUrl: `${window.location.origin}/cancel`
  };

  const userEmail = localStorage.getItem('userEmail');

  const ReservationData = {
    noOfPersons: PersonsCount,
    checkInDate: formattedCheckInDate,
    checkOutDate: formattedCheckOutDate,
    roomId: roomId,
    roomPrice: roomPrice,
    roomType: roomType,
    servicePrice: servicePrice,
    totalAmount: total,
    email: userEmail

  }

  const BookRoom = async (ReservationData) => {
    try {
      
      console.log(ReservationData)
  
      const response = await axios.post('http://localhost:8080/booking/create',ReservationData);
      console.log(response.data);
    
    } catch (error) {
      console.error(error);
      // Handle error responses
    }
  };

  const redirectToCheckout = async () => {
     BookRoom(ReservationData);
    setLoading(true);
    console.log("redirectToCheckout");
   
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    else {
      console.log("Payment successful!");
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Rooms are available!',
        showConfirmButton: false,
        timer: 1500
      });
     

       // Call the bookRoom function to send the booking details to the backend
    }

    setLoading(false);
  };

  if (stripeError) alert(stripeError);

  return (
    <div className="checkout">
      <h1 style={{ color: 'skyblue' }}>Suhadha Villa Payment</h1>
      <h2 className="checkout-price">Rs.{total}</h2>
      <div>
        <button
          className="checkout-button"
          onClick={redirectToCheckout}
          disabled={isLoading}
          style={{ width: '200px', height: '50px', backgroundColor: 'skyblue' ,borderRadius:"20px",borderColor:"white" }}
        >
          <div className="grey-circle"></div>
          <div className="text-container">
            <h4 style={{ color: 'white' }} className="text">{isLoading ? "Loading..." : "Pay"}</h4>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Checkout;
