import "../css/original.css";
import "../css/RegisterForm1.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import fontawesome from "@fortawesome/fontawesome";
import { FcGoogle } from "react-icons/fc";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import firebaseConfig from "../config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

fontawesome.library.add(faEye, faEyeSlash, faCircleXmark, faCircleCheck);

//Toast Notification
const empty = () =>
  toast.warn("Must enter Email, Password and Confirm Password.", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const invalidEmail = () =>
  toast.warn("Invalid Email.", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const invalidPass = () =>
  toast.warn(
    "Invalid Password, Password must contain at least 2 alphabet, 2 number and have lenght between 6-12.",
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
const notMatchPass = () =>
  toast.warn("Invalid Password, Password and Confirm Password must match.", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const RegisterForm1 = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [password, setIconPassword] = useState("eye");
  const [con_password, setIconConPassword] = useState("eye");
  const auth = getAuth(firebaseConfig);
  const history = useHistory();
  var controlInfo;

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default submit

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;
    const valid_email = /^[^@]+@\w+(.\w+)+\w$/;
    const valid_password =
      /^(?=.*[0-9]{2,})(?=.*[A-Z])(?=.*[a-z]{2,})[a-zA-Z0-9!@#$%^&*]{6,12}$/;
    //Validate input

    if (email === "" || password === "" || confirmPassword === "") {
      empty();
    } else if (valid_email.test(email) != true) {
      invalidEmail();
    } else if (valid_password.test(password) != true) {
      invalidPass();
    } else if (password != confirmPassword) {
      notMatchPass();
    } else {
      try {
        // create account
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            setCurrentUser(true);
            history.push("/personalinfo");
          })
          .catch((error) => {
            toast.warn("This Email is already exist.", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      } catch (error) {}
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      history.push("/personalinfo");
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="container">
      <div className="section">
        <div className="section-flex">
          <div className="head">
            <p>Get started for free</p>
          </div>
          <div className="form-group" onClick={handleGoogleSignIn}>
            <a href="" className="btn-signUp">
              <div className="icon-img">
                <FcGoogle />
              </div>
              <span>Sign Up with Google</span>
            </a>
          </div>
          <div className="alternative">
            <div className="line"></div>
            <span>Or</span>
            <div className="line"></div>
          </div>

          <div className="input Email form ">
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              required
            />
          </div>
          <div className="input Pass form focus: bg-light-gray">
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              maxLength={12}
              required
            />
            <div id="show-password">
              <FontAwesomeIcon
                icon={["far", password]}
                className="pass"
                onClick={() => show_password("pass")}
              />
            </div>
          </div>

          <ul className="information hidden">
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

          <div className="input Pass form">
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              maxLength={12}
              required
            />
            <div id="show-password">
              <FontAwesomeIcon
                icon={["far", con_password]}
                className="con-pass"
                onClick={() => show_password("con")}
              />
            </div>
          </div>

          <button className="submit" onClick={handleSubmit}>
            <span>Get Started</span>
          </button>
          <ToastContainer />

          <a href="/" className="account">
            Do you have an account?
          </a>

          <span className="about">
            Signing up for a NAME account means you agree to the{" "}
            <a href="#">Privacy Policy</a> and <a href="#">Term of Service</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm1;
