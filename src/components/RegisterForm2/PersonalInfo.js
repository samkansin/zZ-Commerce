import React, { useEffect } from 'react';
import '../css/RegisterForm2.css';

const PersonalInfo = () => {

    useEffect(() => {
        const date = document.querySelector('#birthday');

        date.addEventListener('focus', () => {
            date.setAttribute("type", "date");
        });

        date.addEventListener('focusout', () => {
            date.removeAttribute('type');
        })
    }, []);
    return (
        <div className="Information">
            <div className="header">
                <p className="head">Welcome! First things first...</p>
                <p className="sub-head">You can always change them later</p>
            </div>

            <div className="f_name form">
                <div className="tool">Must be English-Alphabet and not more than 20 character</div>
                <input type="text"  className="form-control" placeholder="Full Name" id="fullName"/>
            </div>

            <div className="d_display form">
                <div className="tool">Must be English-Alphabet and not more than 20 character</div>
                <input type="text" className="form-control" placeholder="Display name" id="displayName"/>
            </div>
            <div className="dropdown form">
                <div className="tool">Select your Gender</div>
                <select className="form-control" id="gender">
                    <option >Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="LGBTQ+">LGBTQ+</option>
                </select>
            </div>

            <div className="phone form">
                <div className="tool">Enter your 10 digit phone number</div>
                <input type="text" className="form-control" id="phoneNumber" placeholder="Phone number"/>
            </div>

            <div className="date form">
                <div className="tool">Must be 8 or above but not more than 100</div>
                <input placeholder="birthday" className="form-control" id='birthday'/>
            </div>
        </div>
    );
}


export default PersonalInfo;