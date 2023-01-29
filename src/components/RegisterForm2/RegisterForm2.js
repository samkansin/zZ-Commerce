import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/RegisterForm2.css";
import "../css/original.css";
import "react-toastify/dist/ReactToastify.css";
import PersonalInfo from "./PersonalInfo";
import CreditForm from "./CreditCard";
import Address from "./Address";
import firebaseConfig from "../config";
import { AuthContext } from "../Auth";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

//Toast Notification
const invalidAge = () =>
  toast.warn("Invalid age", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const invalidFullName = () =>
  toast.warn("Invalid name", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const invalidDisplayName = () =>
  toast.warn("Invalid display name", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const invalidGender = () =>
  toast.warn("Please select your sex", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const invalidPhoneNum = () =>
  toast.warn("Invalid phone number", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const noInput = () =>
  toast.warn("Please input your Credit Card Info", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const invalidName = () =>
  toast.warn("Please check your input name", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const invalidCardNumber = () =>
  toast.warn("Invalid Card Numbers ", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const invalidCVC = () =>
  toast.warn("Invalid CVC", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const RegisterForm2 = () => {
  //const {currentUser} = useContext(AuthContext);
  const history = useHistory(); // use to redirect
  var success = false;

  const auth = getAuth(firebaseConfig);
  const user = auth.currentUser; // get current user authentication

  const db = getDatabase(); // get database
  const uid = user.uid; // get current user id

  const handleSubmit1 = async () => {
    // get personal data from form
    const fullName = document.querySelector("#fullName").value;
    const displayName = document.querySelector("#displayName").value;
    const gender = document.querySelector("#gender").value;
    const phoneNumber = document.querySelector("#phoneNumber").value;
    const birthday = document.querySelector("#birthday").value;

    //age calculation
    const bDate = new Date(birthday);
    const month_dif = Date.now() - bDate.getTime();
    const age_dif = new Date(month_dif);
    const year = age_dif.getFullYear();
    var age = Math.abs(year - 1970);

    if (/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(fullName) != true) {
      invalidFullName();
    } else if (
      /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(displayName) != true
    ) {
      invalidDisplayName();
    } else if (gender === "Gender") {
      invalidGender();
    } else if (
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        phoneNumber
      ) != true
    ) {
      invalidPhoneNum();
    } else if (age <= 8 || age >= 100 || Number.isNaN(age)) {
      invalidAge();
    } else {
      try {
        // write data in firebase's realtime database
        set(ref(db, "personalInfo/" + uid), {
          uid: uid,
          fullName: fullName,
          displayName: displayName,
          gender: gender,
          phoneNumber: phoneNumber,
          birthday: birthday,
        }).then(() => {
          success = true;
        });
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleSubmit2 = () => {
    const regex_creditCard =
      /^(5[1-5][0-9]{2}) ([0-9]{4}) ([0-9]{4}) ([0-9]{4})$/;
    const regex_cvc = /^[0-9]{3}$/;
    const regex_cardHolder = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
    const creditCard = document.querySelector("#cardNumber").value;
    const cardHolder = document.querySelector("#cardName").value;
    const expMonth = document.querySelector("#cardMonth").value;
    const expYear = document.querySelector("#cardYear").value;
    const cvc = document.querySelector("#cardCVC").value;
    const CryptoJS = require("crypto-js");

    if (
      creditCard == "" ||
      cardHolder == "" ||
      expMonth == "" ||
      expYear == "" ||
      cvc == ""
    ) {
      noInput();
    } else if (regex_creditCard.test(creditCard) != true) {
      invalidCardNumber();
    } else if (regex_cvc.test(cvc) != true) {
      invalidCVC();
    } else if (regex_cardHolder.test(cardHolder) != true) {
      //alert("Please check your input name")
      invalidName();
    } else {
      const hashedCard = CryptoJS.AES.encrypt(
        JSON.stringify(creditCard),
        "sha256"
      ).toString();
      const bytes = CryptoJS.AES.decrypt(hashedCard, "sha256");

      set(ref(db, "creditCardInfo/" + uid), {
        creditCard: hashedCard,
        cardHolder: cardHolder,
        expMonth: expMonth,
        expYear: expYear,
      });
      success = true;
    }
  };

  const handleSubmit3 = () => {
    const address = document.querySelector("#address").value;
    const road = document.querySelector("#road").value;
    const postalCode = document.querySelector("#postalCode").value;
    const subDistrict = document.querySelector("#sub_district").value;
    const district = document.querySelector("#district").value;
    const province = document.querySelector("#province").value;

    if (
      address == "" ||
      road == "" ||
      postalCode == "" ||
      subDistrict == "" ||
      district == "" ||
      province == ""
    ) {
      toast.warn("All information must be filled", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      set(ref(db, "addressInfo/" + uid), {
        address: address,
        road: road,
        subDistrict: subDistrict,
        district: district,
        province: province,
        postalCode: postalCode,
      });
      success = true;
    }
  };

  useEffect(() => {
    const progress = document.querySelector(".progress");
    const prev = document.querySelector("#prev");
    const next = document.querySelector("#next");
    const circles = document.querySelectorAll(".circle");
    const skip = document.querySelector(".skip");
    const select = document.querySelector("select");
    const page1 = document.querySelector(".page1");
    const page2 = document.querySelector(".page2");
    const page3 = document.querySelector(".page3");

    //css progress
    let numActive = 1;

    //css handle
    select.addEventListener("change", () => {
      if (select.value !== "Gender") {
        select.classList.add("selected");
      } else select.classList.remove("selected");
    });

    next.addEventListener("click", nextStep);

    prev.addEventListener("click", prevStep);

    skip.addEventListener("click", skipStep);
    /*skip.addEventListener('click', () => 
            info.classList.add('left-Information')
        );*/

    function update() {
      circles.forEach((circle, index) => {
        if (index < numActive) {
          circle.classList.add("active");
        } else {
          circle.classList.remove("active");
        }
      });

      const actives = document.querySelectorAll(".active");

      progress.style.width =
        ((actives.length - 1) / (circles.length - 1)) * 100 + "%";

      if (numActive === 1) {
        prev.disabled = true;
      } else if (numActive === circles.length) {
        next.innerHTML = "Submit";
        next.classList.add("submit");
      } else {
        if (next.innerHTML === "Submit") {
          next.innerHTML = "Next";
          next.classList.remove("submit");
        }
        prev.disabled = false;
        next.disabled = false;
      }
    }

    function delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    async function prevStep() {
      if (numActive == 2) {
        page2.classList.add("page-right");
        await delay(10);
        page2.classList.add("page-disable");
        await delay(10);
        page1.classList.remove("page-disable");
        await delay(10);
        page1.classList.remove("page-left");
        await delay(10);
        skip.classList.add("skip-hidden");
      } else if (numActive == 3) {
        page3.classList.add("page-right");
        await delay(10);
        page3.classList.add("page-disable");
        await delay(10);
        page2.classList.remove("page-disable");
        await delay(10);
        page2.classList.remove("page-left");
        await delay(10);
      }

      numActive--;
      if (numActive < 1) numActive = 1;
      update();
    }

    async function nextStep() {
      if (numActive == 1) {
        success = false;
        await handleSubmit1();
        await delay(1000);
        if (success) {
          page1.classList.add("page-left");
          page1.classList.add("page-disable");
          page2.classList.remove("page-disable");
          await delay(10);
          page2.classList.remove("page-right");
          skip.classList.remove("skip-hidden");

          numActive++;
          if (numActive > circles.length) numActive = circles.length;
          update();
        }
      } else if (numActive == 2) {
        success = false;
        await handleSubmit2();
        await delay(1000);
        if (success) {
          page2.classList.add("page-left");
          page2.classList.add("page-disable");
          page3.classList.remove("page-disable");
          await delay(10);
          page3.classList.remove("page-right");

          numActive++;
          if (numActive > circles.length) numActive = circles.length;
          update();
        }
      } else if (numActive == 3) {
        success = false;
        await handleSubmit3();
        await delay(1000);
        if (success) {
          history.push("/shop");
        }
      } else if (numActive == 4) {
      }
    }

    async function skipStep() {
      if (numActive == 2) {
        page2.classList.add("page-left");
        page2.classList.add("page-disable");
        page3.classList.remove("page-disable");
        await delay(10);
        page3.classList.remove("page-right");
      } else if (numActive == 3) {
        history.push("/shop");
      }
      numActive++;
      if (numActive > circles.length) numActive = circles.length;
      update();
    }
  }, []);

  return (
    <div className="container">
      <div className="section">
        <div className="section-flex regis2">
          <div className="progress-container">
            <div className="progress"></div>
            <div className="circle active">
              <span className="p one">1</span>
            </div>
            <div className="circle">
              <span className="p two">2</span>
            </div>
            <div className="circle">
              <span className="p three">3</span>
            </div>
          </div>
          <div className="page1 page-right page-disable">
            <PersonalInfo />
          </div>
          <div className="page2 page-right page-disable">
            <CreditForm />
          </div>
          <div className="page3">
            <Address />
          </div>
          <div className="btn-set btn-set-page1">
            <div className="wrap">
              <button className="btn" id="prev" disabled>
                Prev
              </button>
            </div>
            <div className="wrap">
              <button className="btn" id="next">
                Next
              </button>
              <ToastContainer />
            </div>
          </div>

          <a className="skip skip-hidden">Skip</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm2;
