import React, {useEffect, useState } from "react";
import { FiArrowLeft, FiKey } from "react-icons/fi";
import '../css/ForgotPassword.css';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

var step = 1;
const SendEmail = () => {
    const [email, setEmail] = useState("");
    const history = useHistory();
    const auth = getAuth();

    const nextStep = async () => {   
        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("send it");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    async function BackStep(){
        history.push('/');
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
                <div className="title-subtitle">
                    <h2 className="title">Forgot password?</h2>
                    <span className="subtitle">No worries, we'll send you reset instructions</span>
                </div>
                <div className="fieldInput email">
                    <span>Email</span>
                    <input type="text"  className="form-controler" placeholder="Enter your email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="button">
                        <button className="btn" id="Reset" onClick={nextStep}>Send Email</button>
                </div>

            </section>

            <a className="back-step" onClick={BackStep}>
                    <FiArrowLeft size={24}/>
                    <span className="back">Back to log in</span>
            </a>
        </div>
    );
}

export default SendEmail;