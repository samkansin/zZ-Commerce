import React, { useEffect } from "react";
import "../css/original.css";
import "../css/RegisterForm2.css";

const PersonalInfo = () => {
  useEffect(() => {
    const date = document.querySelector("#birthday");
    const phone = document.querySelector("#phoneNumber");

    date.addEventListener("focus", () => {
      date.setAttribute("type", "date");
    });

    date.addEventListener("focusout", () => {
      date.removeAttribute("type");
    });

    phone.addEventListener("keypress", (e) => {
      if (!`${phone.value}${e.key}`.match(/^[0-9]+$/)) {
        e.preventDefault();
      }
    });
  }, []);

  return (
    <div className='Personal Information'>
      <div className='header'>
        <p className='head'>Welcome! First things first...</p>
        <p className='sub-head'>You can always change them later</p>
      </div>

      <div className='f_name form'>
        <div className='tool'>
          Must be English-Alphabet and not more than 20 character
        </div>
        <input type='text' placeholder='Full Name' id='fullName' />
      </div>

      <div className='d_display form'>
        <div className='tool'>
          Must be English-Alphabet and not more than 20 character
        </div>
        <input type='text' placeholder='Display name' id='displayName' />
      </div>
      <div className='dropdown form'>
        <div className='tool'>Select your Gender</div>
        <select id='gender' defaultValue={'DEFAULT'}>
          <option value='DEFAULT' disabled hidden>
            Gender
          </option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='LGBTQ+'>LGBTQ+</option>
        </select>
      </div>

      <div className='phone form'>
        <div className='tool'>Enter your 10 digit phone number</div>
        <input
          type='text'
          inputMode='numeric'
          id='phoneNumber'
          placeholder='Phone number'
          autoComplete='none'
          maxLength={10}
          pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
        />
      </div>

      <div className='date form'>
        <div className='tool'>Must be 8 or above but not more than 100</div>
        <input placeholder='Birthday' id='birthday' />
      </div>
    </div>
  );
};

export default PersonalInfo;
