import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../css/Addresscheckout.css";
import { BiChevronLeft } from "react-icons/bi";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import thaiProvince from "../Province.json";
import thaiAddress from "../Address.json";
import { commerce } from "../../lib/commerce";

const Addresscheckout = ({ refreshCart, cart, products }) => {
  const [cartId, setCartId] = useState(null);

  var districtID = [];
  var subDistrictID = [];

  const selectProvince = () => {
    districtID = [];
    subDistrictID = [];
    const province = document.querySelector("#province");
    const district = document.querySelector("#district");
    const subDistrict = document.querySelector("#sub_district");
    const postalCode = document.querySelector("#postalCode");

    province.classList.add("selected");
    district.innerHTML = '<option value="" disabled selected>District</option>';
    subDistrict.innerHTML =
      '<option value="" disabled selected>Sub-district</option>';
    postalCode.value = "";

    if (district.classList.contains("selected")) {
      district.classList.remove("selected");
      if (subDistrict.classList.contains("selected")) {
        subDistrict.classList.remove("selected");
      }
    }

    if (province.value != "") {
      for (var i = 0; i < thaiAddress.length; i++) {
        if (thaiAddress[i].province == province.value) {
          if (!districtID.includes(thaiAddress[i].amphoe_code)) {
            district.innerHTML +=
              '<option value="' +
              thaiAddress[i].amphoe +
              '">' +
              thaiAddress[i].amphoe +
              "</option>";
            districtID.push(thaiAddress[i].amphoe_code);
          }
        }
      }
    }
  };

  const selectDistrict = () => {
    const province = document.querySelector("#province");
    const district = document.querySelector("#district");
    const subDistrict = document.querySelector("#sub_district");
    const postalCode = document.querySelector("#postalCode");

    district.classList.add("selected");
    subDistrict.innerHTML =
      '<option value="" disabled selected>Sub-district</option>';
    postalCode.value = "";

    if (subDistrict.classList.contains("selected")) {
      subDistrict.classList.remove("selected");
    }

    if (district != "") {
      for (var i = 0; i < thaiAddress.length; i++) {
        if (
          thaiAddress[i].province == province.value &&
          thaiAddress[i].amphoe == district.value
        ) {
          if (!subDistrictID.includes(thaiAddress[i].district_code)) {
            subDistrict.innerHTML +=
              '<option value="' +
              thaiAddress[i].district +
              '">' +
              thaiAddress[i].district +
              "</option>";
            subDistrictID.push(thaiAddress[i].district_code);
          }
        }
      }
    }
  };

  const selectSubDistrict = () => {
    const province = document.querySelector("#province");
    const district = document.querySelector("#district");
    const subDistrict = document.querySelector("#sub_district");
    const postalCode = document.querySelector("#postalCode");

    subDistrict.classList.add("selected");
    postalCode.value = "";

    for (var i = 0; i < thaiAddress.length; i++) {
      if (
        thaiAddress[i].province == province.value &&
        thaiAddress[i].amphoe == district.value &&
        thaiAddress[i].district == subDistrict.value
      ) {
        postalCode.value = thaiAddress[i].zipcode;
      }
    }
  };

  const auth = getAuth();
  const user = auth.currentUser; // get current user authentication

  const db = getDatabase(); // get database
  const uid = user.uid; // get current user id

  const history = useHistory(); // use to redirect

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  get(child(ref(db), `addressInfo/${uid}`))
    .then((snapshot) => {
      // might change the directory to shippingAddress
      if (snapshot.exists()) {
        const province = document.querySelector("#province");
        const district = document.querySelector("#district");
        const subDistrict = document.querySelector("#sub_district");

        document.querySelector("#address").value = snapshot.val().address;
        document.querySelector("#road").value = snapshot.val().road;

        province.value = snapshot.val().province;
        province.classList.add("selected");
        district.innerHTML =
          '<option value="" disabled selected>District</option>';
        subDistrict.innerHTML =
          '<option value="" disabled selected>Sub-district</option>';
        for (var i = 0; i < thaiAddress.length; i++) {
          if (thaiAddress[i].province == province.value) {
            if (!districtID.includes(thaiAddress[i].amphoe_code)) {
              district.innerHTML +=
                '<option value="' +
                thaiAddress[i].amphoe +
                '">' +
                thaiAddress[i].amphoe +
                "</option>";
              districtID.push(thaiAddress[i].amphoe_code);
            }
          }
        }

        district.value = snapshot.val().district;
        district.classList.add("selected");
        subDistrict.innerHTML =
          '<option value="" disabled selected>Sub-district</option>';
        for (var i = 0; i < thaiAddress.length; i++) {
          if (
            thaiAddress[i].province == province.value &&
            thaiAddress[i].amphoe == district.value
          ) {
            if (!subDistrictID.includes(thaiAddress[i].district_code)) {
              subDistrict.innerHTML +=
                '<option value="' +
                thaiAddress[i].district +
                '">' +
                thaiAddress[i].district +
                "</option>";
              subDistrictID.push(thaiAddress[i].district_code);
            }
          }
        }

        subDistrict.value = snapshot.val().subDistrict;
        subDistrict.classList.add("selected");

        document.querySelector("#postalCode").value = snapshot.val().postalCode;
      } else {
      }
    })
    .catch((error) => {
      console.error(error);
    });

  get(child(ref(db), `personalInfo/${uid}`))
    .then((snapshot) => {
      // might change the directory to shippingAddress
      if (snapshot.exists()) {
        // example
        document.querySelector("#fullname").value = snapshot.val().fullName;
        document.querySelector("#phoneNumber").value =
          snapshot.val().phoneNumber;
      } else {
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const handleSubmit = () => {
    const fullName = document.querySelector("#fullname").value;
    const phoneNumber = document.querySelector("#phoneNumber").value;
    const address = document.querySelector("#address").value;
    const road = document.querySelector("#road").value;
    const postalCode = document.querySelector("#postalCode").value;
    const subDistrict = document.querySelector("#sub_district").value;
    const district = document.querySelector("#district").value;
    const province = document.querySelector("#province").value;

    if (
      fullName == "" ||
      phoneNumber == "" ||
      address == "" ||
      road == "" ||
      postalCode == "" ||
      subDistrict == "" ||
      district == "" ||
      province == ""
    ) {
      toast.warn("All information must be filled", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(fullName) != true) {
      toast.warn("Invalid name", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        phoneNumber
      ) != true
    ) {
      toast.warn("Invalid phone number", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        // write data in firebase's realtime database
        set(ref(db, "addressInfo/" + uid), {
          address: address,
          road: road,
          subDistrict: subDistrict,
          district: district,
          province: province,
          postalCode: postalCode,
        });

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + "/" + dd + "/" + yyyy;

        if (cart.id) {
          set(ref(db, "transaction/" + uid + "/" + cart.id.slice(5)), {
            date: today,
          });
          // keep transaction info
          cart.line_items.forEach((ele) => {
            products.forEach((product) => {
              if (product.id == ele.product_id) {
                const description = product.description;
                //alert(description.slice(10, -11));

                set(
                  ref(
                    db,
                    "transaction/" +
                      uid +
                      "/" +
                      cart.id.slice(5) +
                      "/" +
                      ele.product_id.slice(5)
                  ),
                  {
                    name: ele.product_name,
                    description: description.slice(10, -11),
                    picture: product.media.source,
                    quantity: ele.quantity,
                    total: ele.line_total.raw * 30,
                  }
                );
              }
            });
          });
        }
      } catch (error) {
        alert(error);
      }
      refreshCart();
      history.push("/shop");
    }
  };

  useEffect(() => {
    const province = document.querySelector("#province");
    province.innerHTML = '<option value="" disabled selected>Province</option>';
    for (var i = 0; i < thaiProvince.length; i++) {
      province.innerHTML +=
        '<option value="' +
        thaiProvince[i] +
        '">' +
        thaiProvince[i] +
        "</option>";
    }
  }, []);

  return (
    <div className="main">
      <div className="navbar"></div>
      <div className="container2">
        <div className="outer">
          <a href="/cart" className="back">
            <BiChevronLeft size={24} />
            <span>Back to cart</span>
          </a>
          <div className="header">
            <h2 className="head">Shipping Address</h2>
          </div>
          <div className="content">
            <div className="line1">
              <div className="fullname form">
                <div className="tool">Enter a full name in English or Thai</div>
                <span className="title">Full Name</span>
                <input
                  type="text"
                  className="form-controler"
                  placeholder="Full Name"
                  id="fullname"
                />
              </div>

              <div className="phonenumber form">
                <div className="tool">
                  Enter your phone number in 10-digit numbers
                </div>
                <span className="title">Phone</span>
                <input
                  type="number"
                  className="form-controler"
                  placeholder="Phone Number"
                  id="phoneNumber"
                />
              </div>
            </div>

            <div className="line2">
              <div className="Address form">
                <div className="tool">
                  Enter a detail of your address that is Village, Village No,
                  Building, Apartment, Alley, Lane or Sub-area in English or
                  Thai.
                </div>
                <span className="title">Address</span>
                <textarea
                  type="text"
                  className="form-controler"
                  placeholder="Village,Village No,Alley,Lane,Sub-area"
                  id="address"
                />
              </div>
            </div>

            <div className="line3">
              <div className="road form">
                <div className="tool">
                  Enter the road name in English or Thai that is not the number.
                </div>
                <span className="title">Road</span>
                <input
                  type="text"
                  className="form-controler"
                  placeholder="Road"
                  id="road"
                />
              </div>

              <div className="sub-district form">
                <div className="tool">Select your sub-district</div>
                <span className="title">Sub-district</span>
                <select
                  className="form-controler"
                  id="sub_district"
                  placeholder="Sub-district"
                  onChange={selectSubDistrict}
                >
                  <option value="" disabled selected>
                    Sub-district
                  </option>
                </select>
              </div>

              <div className="district form">
                <div className="tool">Select your district</div>
                <span className="title">District</span>
                <select
                  className="form-controler"
                  id="district"
                  placeholder="District"
                  onChange={selectDistrict}
                >
                  <option value="" disabled selected>
                    District
                  </option>
                </select>
              </div>
            </div>

            <div className="line4">
              <div className="province form">
                <div className="tool">Select your province</div>
                <span className="title">Province</span>
                <select
                  className="form-controler"
                  id="province"
                  placeholder="Province"
                  onChange={selectProvince}
                ></select>
              </div>

              <div className="postal form">
                <div className="tool">Enter the postal code of your area.</div>
                <span className="title">Postal Code</span>
                <input
                  type="number"
                  className="form-controler"
                  placeholder="Postal Code"
                  id="postalCode"
                />
              </div>
            </div>

            <div className="buttonA-check">
              <button className="btn" id="next" onClick={handleSubmit}>
                Next
              </button>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addresscheckout;
