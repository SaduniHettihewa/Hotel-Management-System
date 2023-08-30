import React, { useState } from "react";
import "./ProgressBar.css";
import { TiTick } from "react-icons/ti";
import Rooms from "../Rooms/Rooms";
import EnhanceStay from "../EnhanceStay";
import Payment from "../Payment/Payment";
import Checkout from "../../paymentGatway/Checkout";

const ProgressBar = ({ currentStep, complete, onNext, onBack }) => {
  const steps = ["Choose Your Room", "Enhance Your Stay", "Start Your Payment","Checkout"];

  const handleNext = () => {
    onNext();
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="progress-bar">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`step-item ${currentStep === i + 1 ? "active" : ""} ${
            i + 1 < currentStep || complete ? "complete" : ""
          }`}
        >
          <div className="step">
            {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
          </div>
          <p className="text-gray">{step}</p>
        </div>
      ))}
      {!complete && (
        <div className="btn-group">
        <button className="btn btn-back" onClick={handleBack}>
          Back
        </button>
        <button className="btn btn-next" onClick={handleNext}>
          Next
        </button>
      </div>
      
      )}
      {complete && (
        <button className="btn" disabled>
          Finish
        </button>
      )}
    </div>
  );
};

const Bookings = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedRoomPrice, setSelectedRoomPrice] = useState(0);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState(null);
  const [selectedServicePrice, setSelectedServicePrice] = useState(0);
  const [RoomId, setRoomId] = useState(null);
  const [RoomType, setRoomType] = useState(null);
  const [RoomPrice, setRoomPrice] = useState(0);
  const [ServicePrice, setServicePrice] = useState(0);
  const [checkIN, setCheckIn] = useState(null);
  const [checkOUT, setCheckOut] = useState(null);
  const [NoOfPersons , setNoOFPersons] = useState(0)




  const handleNext = () => {
    if (currentStep === 4) {
      setComplete(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      // Do nothing if on the first step
      return;
    }
    setCurrentStep((prev) => prev - 1);
    setComplete(false);
  };

  const handleRoomSelection = (id, type, price) => {
    setSelectedRoomId(id);
    setSelectedRoomType(type);
    setSelectedRoomPrice(price);
  };

  const handleServiceSelect = (serviceId, serviceTitle, servicePrice) => {
    setSelectedServiceId(serviceId);
    setSelectedServiceTitle(serviceTitle);
    setSelectedServicePrice(servicePrice);
  };

  const handleReservation =(roomType,roomPrice,roomId,servicePrice) => {
    setRoomId(roomId);
    setRoomType(roomType);
    setRoomPrice(roomPrice);
    setServicePrice(servicePrice);
  }
  
  const hndlesendDataBooking =(startDate ,endDate , numberOfPersons) => {
    setCheckIn(startDate);
    setCheckOut(endDate);
    setNoOFPersons(numberOfPersons)
   

  }
  const handlePageChange = () => {
    switch (currentStep) {
      case 1:
        return <Rooms onRoomSelect={handleRoomSelection} />;
      case 2:
        return <EnhanceStay 
        roomId={selectedRoomId} roomType={selectedRoomType} roomPrice={selectedRoomPrice} 
        onServiceSelect={handleServiceSelect}/>; 
      case 3:
        return <Payment   
        roomId={selectedRoomId}
        roomType={selectedRoomType}
        roomPrice={selectedRoomPrice}
        ServiceID={selectedServiceId}
        serviceTitle={selectedServiceTitle}
        servicePrice={selectedServicePrice}
        setReservation={handleReservation}/>;
      case 4:
        return <Checkout 
        roomType = {RoomType}
        roomPrice ={RoomPrice}
        roomId ={RoomId}
        servicePrice={ServicePrice}
        sendDataBooking={hndlesendDataBooking}/>;
      default:
        return null;
    }
  };

  return (
    <div>
      <ProgressBar currentStep={currentStep} complete={complete} onNext={handleNext} onBack={handleBack} />
      {handlePageChange()}
    </div>
  );
};

export default Bookings;
