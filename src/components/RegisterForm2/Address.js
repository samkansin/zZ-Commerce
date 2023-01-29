import React, {useState, useEffect, useRef} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Address.css';
import thaiProvince from '../Province.json';
import thaiAddress from '../Address.json';

const Address = ({}) => {
    
    var districtID = [];
    var subDistrictID = [];
    

    const selectProvince = () => {
        const province = document.querySelector('#province');
        const district = document.querySelector('#district');
        const subDistrict = document.querySelector('#sub_district');
        const postalCode = document.querySelector('#postalCode');

        districtID = [];
        subDistrictID = [];

        province.classList.add('selected');
        district.innerHTML = '<option value="" disabled selected>District</option>';
        subDistrict.innerHTML = '<option value="" disabled selected>Sub-district</option>';
        postalCode.value = "";

        if(district.classList.contains('selected')){
            district.classList.remove('selected');
            if(subDistrict.classList.contains('selected')){
                subDistrict.classList.remove('selected');
            }
        } 

        if(province.value != ""){
            for(var i=0; i<thaiAddress.length; i++){
                if(thaiAddress[i].province == province.value){
                    if(!districtID.includes(thaiAddress[i].amphoe_code)){
                        district.innerHTML += '<option value="' + thaiAddress[i].amphoe + '">' + thaiAddress[i].amphoe + '</option>';
                        districtID.push(thaiAddress[i].amphoe_code);
                    }
                }
            } 
        }
    }

    const selectDistrict = () => {
        const province = document.querySelector('#province');
        const district = document.querySelector('#district');
        const subDistrict = document.querySelector('#sub_district');
        const postalCode = document.querySelector('#postalCode');

        district.classList.add('selected');
        subDistrict.innerHTML = '<option value="" disabled selected>Sub-district</option>';
        postalCode.value = "";

        if(subDistrict.classList.contains('selected')){
            subDistrict.classList.remove('selected');
        }

        if(district != ""){
            for(var i=0; i<thaiAddress.length; i++){
                if(thaiAddress[i].province == province.value && thaiAddress[i].amphoe == district.value){
                    if(!subDistrictID.includes(thaiAddress[i].district_code)){
                        subDistrict.innerHTML += '<option value="' + thaiAddress[i].district + '">' + thaiAddress[i].district + '</option>';
                        subDistrictID.push(thaiAddress[i].district_code);
                    }
                }
            } 
        }
    }

    const selectSubDistrict = () => {
        const province = document.querySelector('#province');
        const district = document.querySelector('#district');
        const subDistrict = document.querySelector('#sub_district');
        const postalCode = document.querySelector('#postalCode');

        subDistrict.classList.add('selected');
        postalCode.value = "";

        for(var i=0; i<thaiAddress.length; i++){
            if(thaiAddress[i].province == province.value && thaiAddress[i].amphoe == district.value && thaiAddress[i].district == subDistrict.value){
                postalCode.value = thaiAddress[i].zipcode;
            }
        }
    }

    useEffect(() => {
        const postalCode = document.querySelector('#postalCode');
        const province = document.querySelector('#province');
        province.innerHTML = '<option value="" disabled selected hidden>Province</option>';
        for(var i=0; i<thaiProvince.length; i++){
            province.innerHTML += '<option value="' + thaiProvince[i] + '">' + thaiProvince[i] + '</option>';
        }

        postalCode.addEventListener('keyup', (e) => {
            if(!`${postalCode.value}${e.key}`.match(/^[0-9]+$/)){
                e.preventDefault();
                e.stopPropagation();
            }
        });

        postalCode.addEventListener('input', (e) => {
            console.log(postalCode.value)
            console.log(
                thaiAddress.filter((data) => {
                    return data.zipcode.toString().startsWith(postalCode.value)
                })
            )
        })
    }, []);

    return(
        <div className="Address">
            <div className="header">
                <p className="head">Add new shipping address</p>
                <p className="sub-head">You can always change them later</p>
            </div>

            <div className="content">

                <div className="line1">
                    <textarea type="text" placeholder="Address" id="address"/>
                </div>

                <div className="line2">
                    <div className="input road">
                        <input type="text" placeholder="Road" id="road"/>
                    </div>
                    <div className="input postal">
                        <input type="text" placeholder="Postal Code" id="postalCode" maxLength={5}/>
                    </div>
                </div>

                <div className="dropdown_2">
                    <select className="form-control" id="province" onChange={selectProvince}></select>
                </div>
                
                <div className="dropdown_1">
                    <div className="sub-district">
                        <select className="form-control" id="sub_district" onChange={selectSubDistrict}>
                            <option value="" disabled selected hidden>Sub-district</option>
                        </select>
                    </div>

                    <div className="district">
                        <select className="form-control" id="district" onChange={selectDistrict}>
                            <option value="" disabled selected hidden>District</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default Address;