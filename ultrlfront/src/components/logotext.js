import React from "react";
import ultralearn from '../assets/Logo.png'

export const Logotext = (small = false) => {
    return (
    
        <div className={"flex flex-row" + (( !small)?"m-1 ml-1":" m-1")}>
            <span><img style={{ width: "65px", height: "55px" }} src={ultralearn} className="image-fluid mx-1 mt-0" alt="Student" /></span> 
            <div style={{ color: "#460273" }}className="text-3xl font-semibold mt-2	" >UltraLEARN</div>
        </div>)
}
