import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiKey } from "react-icons/fi";
import "../css/ForgotPassword.css";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import ForgotPassword_Step2 from "./ForgotPassword_Step2";
import firebaseConfig from "../config";

fontawesome.library.add(faEye, faEyeSlash, faCircleXmark, faCircleCheck);

const ForgotPassword_Step1 = () => {
  const auth = getAuth(firebaseConfig);
  const [password, setIconPassword] = useState("eye");
  const [con_password, setIconConPassword] = useState("eye");

  useEffect(() => {
    let pass_word = document.querySelector("#password");
    let information = document.querySelector(".information");
    pass_word.addEventListener("focus", () => {
      information.classList.remove("hidden");
      setTimeout(function () {
        information.classList.add("active");
      }, 200);
    });

    pass_word.addEventListener("blur", () => {
      information.classList.remove("active");
      setTimeout(function () {
        information.classList.add("hidden");
      }, 200);
    });

    const alpha = /^(?=.*[a-z]{2,})/;
    const uppercase = /^(?=.*[A-Z])/;
    const number = /^(?=.*[0-9]{2,})/;
    const lenght = /^(?=.{6,12}$)/;
    pass_word.addEventListener("keyup", () => {
      if (!pass_word.classList.contains("not-pass"))
        pass_word.classList.add("not-pass");

      if (alpha.test(pass_word.value))
        information.children[0].classList.add("complete");
      else information.children[0].classList.remove("complete");
      if (uppercase.test(pass_word.value))
        information.children[1].classList.add("complete");
      else information.children[1].classList.remove("complete");
      if (number.test(pass_word.value))
        information.children[2].classList.add("complete");
      else information.children[2].classList.remove("complete");
      if (lenght.test(pass_word.value))
        information.children[3].classList.add("complete");
      else information.children[3].classList.remove("complete");

      if (document.querySelectorAll(".complete").length == 4) {
        information.classList.add("pass");
        pass_word.classList.add("pass");
      } else {
        information.classList.remove("pass");
        pass_word.classList.remove("pass");
      }
    });
  }, []);

  function nextStep() {
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#con-password").value;
    const valid_password =
      /^(?=.*[0-9]{2,})(?=.*[A-Z])(?=.*[a-z]{2,})[a-zA-Z0-9!@#$%^&*]{6,12}$/;

    if (password == "" || confirmPassword == "") {
      toast.warn("Must enter Password and Confirm Password.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (valid_password.test(password) != true) {
      toast.warn(
        "Password must contain at least 2 alphabet, 2 number and have lenght between 6-12.",
        {
          // รหัสผ่านต้องเป็นภาษาอังกฤษและมี 6-12 ตัว มีอักษร 2 ตัวขึ้นไป ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว และมีตัวเลขอย่างน้อย 2 ตัว
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else if (password != confirmPassword) {
      toast.warn("Password and Confirm Password must be the same.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null) return "";
        else return decodeURIComponent(results[1].replace(/\+/g, " "));
      }

      try {
        const oob = getParameterByName("oobCode");
        console.log(oob);
        confirmPasswordReset(auth, oob, password).then(() => {
          const allStep = document.querySelectorAll("section");
          allStep[0].classList.remove("active");
          allStep[0].classList.add("hide");

          allStep[1].classList.remove("hide");
          allStep[1].classList.add("active");
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  function show_password(keyword) {
    let pass = document.querySelector("#password");
    let con = document.querySelector("#confirmPassword");
    let temp = pass;
    let setIcon = setIconPassword;
    let check = password;

    if (keyword == "con") {
      temp = con;
      setIcon = setIconConPassword;
      check = con_password;
    }
    console.log();

    if (check == "eye-slash") {
      setIcon("eye");
      temp.setAttribute("type", "password");
    } else {
      setIcon("eye-slash");
      temp.setAttribute("type", "text");
    }
  }

  return (
    <div className="container1">
      <section className="active">
        <div className="logo">
          <div className="circle-out">
            <div className="circle-in">
              <FiKey size={30} color="#5FC7AC" />
            </div>
          </div>
        </div>
        <div className="title-subtitle step3">
          <h2 className="title">Set new password</h2>
          <span className="subtitle">
            Your new password must be different to previously used passwords.
          </span>
        </div>
        <div className="fieldInput password">
          <div className="new-password form">
            <span>Password</span>
            <input
              type="password"
              className="form-controler"
              placeholder="Enter your new password"
              id="password"
            />
            <div className="show-password" id="show-password">
              <FontAwesomeIcon
                icon={["far", password]}
                className="pass"
                onClick={() => show_password("pass")}
              />
            </div>
          </div>

          <ul className="information forgot hidden">
            <li>
              {" "}
              <span className="iconCheck"></span>
              <span>At least two alphabets</span>
            </li>
            <li>
              {" "}
              <span className="iconCheck"></span>
              <span>At least one uppercase character</span>{" "}
            </li>
            <li>
              {" "}
              <span className="iconCheck"></span>
              <span>At least two numbers</span>{" "}
            </li>
            <li>
              {" "}
              <span className="iconCheck"></span>
              <span>At least 6 - 12 characters</span>{" "}
            </li>
          </ul>

          <div className="confirm-password form">
            <span>Confirm password</span>
            <input
              type="password"
              className="form-controler"
              placeholder="Enter your new password again"
              id="confirmPassword"
            />
            <div className="show-password" id="show-password">
              <FontAwesomeIcon
                icon={["far", con_password]}
                className="con-pass"
                onClick={() => show_password("con")}
              />
            </div>
          </div>
        </div>
        <div className="button">
          <button className="btn" id="Reset" onClick={nextStep}>
            Reset password
          </button>
        </div>
        <Link className="back-step" to="/">
          <FiArrowLeft size={24} />
          <span className="back">Back to log in</span>
        </Link>
      </section>
      <section className="hide">
        <div disabled>
          <ForgotPassword_Step2 />
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword_Step1;
