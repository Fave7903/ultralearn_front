import React from "react";
import ultralearn from '../assets/Logo.png'

export const Logotext2 = (small = false) => {
    return (
    
        <div className={"flex flex-row" + (( !small)?"m-6 ml-9":" m-2")}>
            <span><img style={{ width: "65px", height: "55px" }} src={ultralearn} className="image-fluid mx-1 mt-0" alt="Student" /></span> 
            <div style={{ color: "#460273" }} className="text-3xl  font-semibold mt-1	" >UltraLEARN</div>
        </div>)
}
