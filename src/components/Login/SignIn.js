import React from "react";
import '../css/RegisterForm1.css';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import firebaseConfig from '../config';
import { useHistory } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';
import { FcGoogle } from "react-icons/fc";

const SignIn = ({}) => {
    var count = 4;
    const auth = getAuth(firebaseConfig);
    const history = useHistory();

    async function ErrorMessage(){
        var element = document.getElementById("error");
        element.style.display = "block";
        document.getElementById("errorSpan").innerHTML = "Your email/password is incorrect. You can try "+count+" more times";
        count--;
        if(count < 0){
            history.push("/");
        }
        var email = document.getElementById("email");
        var password = document.getElementById("password");
        email.style.backgroundColor = "#FBEBEB";
        email.style.outline = "2px solid red";
        password.style.backgroundColor = "#FBEBEB";
        password.style.outline = "2px solid red";
    }
    
    const handleSubmit = async () => {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const valid_email=/^[^@]+@\w+(.\w+)+\w$/;
        const valid_password = /^(?=.*[0-9]{2,})(?=.*[A-Z])(?=.*[a-z]{2,})[a-zA-Z0-9!@#$%^&*]{6,12}$/;
        
        if(email ==="" || password ==="") {
            toast.warn("Must enter Email and Password.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            ErrorMessage();
        }
        else if(valid_email.test(email)!=true) {
            toast.warn("Invalid Email format.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            ErrorMessage();
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
            ErrorMessage();
        }
        else{   
            // sign in
            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                history.push("/shop");
            }).catch((error) => {
                toast.warn("Wrong Email or Password.", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        }
    }

    return (
        <div className="container">
            <div className="navBar"></div>
            <div className="container-con">
                <div className="col-lg-5">
                    <div className="head">
                            <p>Welcome to Zz-Commerce</p>
                    </div>
                    <div className="form-group">
                            <a href="" className="btn-signUp">
                                <div className="icon-img">
                                    <FcGoogle/>
                                </div>
                                <span>Sign In with Google</span>
                            </a>
                    </div>
                    <div className="alternative">
                        <div className="line"></div>
                        <span>Or</span>
                        <div className="line"></div>
                    </div>
                    <div className='error' id="error">
                        <span id="errorSpan"></span>
                    </div>
                    <div className="input Email form">
                        <div className="tool">Enter your Email</div>
                        <input type="email" name="email" placeholder="Email" id="email" required/>
                    </div>
                    <div className="input Pass form">
                        <div className="tool">Must be 6-20 character, at least 2 a-z, 1 A-Z, 2 0-9 and can contain !@#$%^&*</div>
                        <input type="password" name="password" placeholder="Password" id="password" required/>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="form-check">
                            <input className="check" type="checkbox"/>
                            <label className="normalText" >
                                Remember me
                            </label>
                        </div>
                     <a href="/sendemail" className="forgotText">Forgot password?</a>
                    </div>
                        
                    <button className="submit" onClick={handleSubmit}>
                        <span>Sign-in</span>
                    </button>
                    <ToastContainer/>
                    <div className='register'>
                        <a className="normalText">Not registered yet? </a>
                        <a href='/' className="createAccount">Create an Account</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;