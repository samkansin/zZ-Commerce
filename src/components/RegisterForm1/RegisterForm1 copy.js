import '../css/original.css'
import '../css/RegisterForm1.css';
import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import firebaseConfig from '../config';
import { UserAuth } from '../Auth';
import { signInWithPopup, GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

//Toast Notification
const empty = () => toast.warn("Must enter Email, Password and Confirm Password.", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});
const invalidEmail = () => toast.warn("Invalid Email.", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});
const invalidPass = () => toast.warn("Invalid Password, Password must contain at least 2 alphabet, 2 number and have lenght between 6-12.", { // รหัสผ่านต้องเป็นภาษาอังกฤษและมี 6-12 ตัว มีอักษร 2 ตัวขึ้นไป ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว และมีตัวเลขอย่างน้อย 2 ตัว
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});
const notMatchPass = () => toast.warn("Invalid Password, Password and Confirm Password must match.", {
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
    const auth = getAuth(firebaseConfig);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();     // Prevent default submit

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirmPassword').value;
        const valid_email=/^[^@]+@\w+(.\w+)+\w$/;
        const valid_password = /^(?=.*[0-9]{2,})(?=.*[A-Z])(?=.*[a-z]{2,})[a-zA-Z0-9!@#$%^&*]{6,12}$/;
        //Validate input
        
        if(email ==="" || password ==="" || confirmPassword ==="") {
            empty();
        }
        else if(valid_email.test(email)!=true) {
            invalidEmail();
        }
        else if(valid_password.test(password)!=true) {
            invalidPass();
        }
        else if(password != confirmPassword) {
            notMatchPass();
        }
        else{
            try {
                // create account
                createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    setCurrentUser(true);
                    history.push("/personalinfo");
                }).catch((error) => {
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
                
            } catch(error) {
                
            }
        }
    }

    const handleGoogleSignIn = async (e) =>{
        e.preventDefault();

        try{
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            history.push("/personalinfo");
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="navBar"></div>

            <div className="container-con">
                <div className="col-lg-5">
                    <div className="head">
                            <p>Get started for free</p>
                    </div>
                    <div className="form-group" onClick={handleGoogleSignIn} >
                            <a href="" className="btn-signUp">
                                <div className="icon-img">
                                    <FcGoogle/>
                                </div>
                                <span>Sign Up with Google</span>
                            </a>
                    </div>
                    <div className="alternative">
                        <div className="line"></div>
                        <span>Or</span>
                        <div className="line"></div>
                    </div>
                    
                    <div className="input Email form">
                        <input type="email" name="email" placeholder="Email" id="email" required/>
                    </div>
                    <div className='input Pass form'>
                        <input type="password" name="password" placeholder="Password" id="password" required/>
                    </div>
                    <div className='input Pass form'>
                        <input type="password" placeholder="Confirm Password" id="confirmPassword" required/> 
                    </div>
                    
                    <button className="submit" onClick={handleSubmit}>
                        <span>Get Started</span>
                    </button>
                    <ToastContainer/>

                    <a href="/signin" className="account">Do you have an account?</a>

                    <span className="about">
                    Signing up for a NAME account means you agree to the <a href="#">Privacy Policy</a> and <a href="#">Term of Service</a> 
                    </span>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm1;