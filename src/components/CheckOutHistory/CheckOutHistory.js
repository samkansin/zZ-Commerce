import React, {useState, useEffect} from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import '../css/CheckOutHistory.css'

let a = 0;

const CheckOutHistory = () =>{

    const auth =getAuth();
    const user = auth.currentUser;
    const db = getDatabase();
    const uid = user.uid;
    
    useEffect(() => {
        get(child(ref(db), `transaction/${uid}`)).then((snapshot) => {
            if(snapshot.exists()){
                Object.keys(snapshot.val()).forEach((key) => {
                    var subtotal = 0;
                    var itemList = 
                        '<div class="list">'
                            + '<div class="content_list">'
                                + '<div class="order_code">'
                                    + '<span>Order Code : <span id="code">' + key + '</span> </span>'
                                + '</div>'
                                + '<div id="line"></div>'
                                + '<span class="date">' + snapshot.val()[key].date + '</span>';
                                
                    Object.keys(snapshot.val()[key]).forEach((val) => {
                        if(val != "date"){
                            itemList +=
                                    '<div class="order_list">'
                                        + '<div class="order">'
                                            + '<div class="order_set">'
                                                + '<div class="order_img">'
                                                    + '<img src="' + snapshot.val()[key][val].picture + '"></img>'
                                                    + '<span class="ea">' + snapshot.val()[key][val].quantity + '</span>'
                                                + '</div>'
                                                + '<div class="item">'
                                                    + '<span class="name">' + snapshot.val()[key][val].name + '</span>'
                                                    + '<span class="description_item">' + snapshot.val()[key][val].description + '</span>'
                                                + '</div>'
                                                + '<span class="price">' + snapshot.val()[key][val].total + ' THB</span>'
                                            + '</div>'
                                        + '</div>'
                                    + '</div>'
                                    + '<div id="line"></div>';
                            subtotal += snapshot.val()[key][val].total;
                        }        
                    });
                    itemList += 
                                '<div class="sub">'
                                    + '<span>Subtotal</span>'
                                    + '<span class="sub_value">' + subtotal + ' THB</span>'
                                + '</div>'
                                + '<div class="vat">'
                                    + '<span>VAT (7%)</span>'
                                    + '<span class="vat_value">' + subtotal*7/100 + ' THB</span>'
                                + '</div>'
                                + '<div class="total">'
                                    + '<span>Total</span>'
                                    + '<span class="total_value">' + subtotal*107/100 + ' THB</span>'
                                + '</div>'
                            + '</div>'
                        + '</div>';

                    document.querySelector('.itemList').innerHTML += itemList;
                    
                });
            }
        });
    }, []);

    const back = () => {
        window.history.back();
    }
   
    return(
        <div className="containerH">
            <div className="History_title">
                <div className="back_home">
                    <a onClick={() => back()} className='back_home'>
                                <FiArrowLeft size={24} style={{stroke:"black" , strokeWidth:"3"}}/>
                    </a>
                </div>
                <div className="title">
                    <span>Checkout History</span>
                </div>
            </div>                

            <div className="itemList">
                
            </div>
        </div>

    );
    
}

export default CheckOutHistory;