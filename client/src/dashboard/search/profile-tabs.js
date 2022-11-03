import { tabClasses } from "@mui/material";
import React from "react";

export default function ProfileTab(props){
    //"country": "US",
//   "currency": "USD",
//   "exchange": "NASDAQ/NMS (GLOBAL MARKET)",
//   "ipo": "1980-12-12",
//   "marketCapitalization": 1415993,
//   "name": "Apple Inc",
//   "phone": "14089961010",
//   "shareOutstanding": 4375.47998046875,
//   "ticker": "AAPL",
//   "weburl": "https://www.apple.com/",
//   "logo": "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
//   "finnhubIndustry":"Technology"

    return(
        <div className="profile-tab">

            <div className="row">
                <ul>
                    <li>country: {props.profile.country}</li>
                    <li>currency: {props.profile.currency}</li>
                    <li>exchange: {props.profile.exchange}</li>
                    <li>ipo: {props.profile.ipo}</li>

                </ul>

            </div>
            <div className="row">
            <ul>
                    <li>marketCapitalizatio: {props.profile.marketCapitalization}</li>
                    <li>name: {props.profile.name}</li>
                    <li>phone: {props.profile.phone}</li>
                    <li>shareOutstanding: {props.profile.shareOutstanding}</li>

                </ul>

            </div>
            <div className="row">
            <ul>
                    <li>ticker: {props.profile.ticker}</li>
                    <li>weburl: {props.profile.weburl}</li>
                    <li>Industry: {props.profile.finnhubIndustry}</li>

                </ul>

            </div>

            
        </div>
    )




}