import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import '../css/ForgotPassword.css';
import { useHistory } from 'react-router-dom';

const ForgotPassword_Step2 = ({}) => {
    const history = useHistory();
    const con = () => {
        history.push('/');
    }
    return (
        <div className="container1">
                <div className="logo">
                    <div className="circle-out">
                        <div className="circle-in">
                                <IoMdCheckmarkCircleOutline size={30} color="#5FC7AC"/>
                        </div>
                    </div>
                </div>
                <div className="title-subtitle step4">
                    <h2 className="title">Password reset</h2>
                    <span className="subtitle">Your password has been successfully reset. Click below to log in magically.</span>
                </div>
                <div className="buttonCon">
                        <button className="btn" id="Continue" onClick={con}>Continue</button>
                </div>
        </div>
    );
}

export default ForgotPassword_Step2;