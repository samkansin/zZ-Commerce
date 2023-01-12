import React from "react";
import { FiArrowLeft, FiKey } from "react-icons/fi";
import '../css/ForgotPassword.css';
import {ToastContainer,toast} from 'react-toastify';
import { getAuth, confirmPasswordReset } from "firebase/auth";
import ForgotPassword_Step2 from "./ForgotPassword_Step2";
import firebaseConfig from '../config';

const ForgotPassword_Step1 = () => {
    const auth = getAuth(firebaseConfig);

    function nextStep() {
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#con-password').value;
        const valid_password = /^(?=.*[0-9]{2,})(?=.*[A-Z])(?=.*[a-z]{2,})[a-zA-Z0-9!@#$%^&*]{6,12}$/;

        if(password == "" || confirmPassword == ""){
            toast.warn("Must enter Password and Confirm Password.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if(valid_password.test(password)!=true) {
            toast.warn("Password must contain at least 2 alphabet, 2 number and have lenght between 6-12.", { // รหัสผ่านต้องเป็นภาษาอังกฤษและมี 6-12 ตัว มีอักษร 2 ตัวขึ้นไป ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว และมีตัวเลขอย่างน้อย 2 ตัว
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if(password != confirmPassword){
            toast.warn("Password and Confirm Password must be the same.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else{
            
            function getParameterByName( name ){
                name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
                var regexS = "[\\?&]"+name+"=([^&#]*)";
                var regex = new RegExp( regexS );
                var results = regex.exec( window.location.href );
                if( results == null )
                    return "";
                else
                    return decodeURIComponent(results[1].replace(/\+/g, " "));
            }

            try{
                const oob = getParameterByName('oobCode');
                console.log(oob);
                confirmPasswordReset(auth, oob, password)
                .then(() => {
                    const allStep = document.querySelectorAll("section");
                    allStep[0].classList.remove("active");
                    allStep[0].classList.add("hide");

                    allStep[1].classList.remove("hide");
                    allStep[1].classList.add("active");
                });
            }catch(error){
                console.log(error);
            }
            
        }
    }
    return (
        <div className="container1">
                <section className="active">
                    <div className="logo">
                        <div className="circle-out">
                            <div className="circle-in">
                                    <FiKey size={30} color="#5FC7AC"/>
                            </div>
                        </div>
                    </div>
                    <div className="title-subtitle step3">
                        <h2 className="title">Set new password</h2>
                        <span className="subtitle">Your new password must be different to previously used passwords.</span>
                    </div>
                    <div className="fieldInput password">
                        <div className="new-password form">
                            <div className="tool">Must be 6-20 character, at least 2 a-z, 1 A-Z, 2 0-9 and can contain !@#$%^&*</div>
                            <span>Password</span>
                            <input type="password"  className="form-controler" placeholder="Enter your new password" id="password"/>
                        </div>
                        <div className="confirm-password form">
                            <div className="tool">Must be same password as above</div>
                            <span>Confirm password</span>
                            <input type="password"  className="form-controler" placeholder="Enter your new password again" id="con-password"/>
                        </div>
                    </div>
                    <div className="button">
                            <button className="btn" id="Reset" onClick={nextStep}>Reset password</button>
                    </div>
                    <a className="back-step" href="/signin">
                        <FiArrowLeft size={24}/>
                        <span className="back">Back to log in</span>
                    </a>
                </section>
                <section className="hide">
                    <div disabled>
                        <ForgotPassword_Step2/>
                    </div>
                </section>
                <ToastContainer/>
        </div>
    );
}

export default ForgotPassword_Step1;