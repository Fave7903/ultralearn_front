import React from "react";
import ultralearn from '../assets/ultralearn white2.png'

export const Logotext2 = (small = false) => {
    return (
    
        <div className={"flex flex-row" + (( !small)?"m-6 ml-9":" m-2")}>
            <span><img style={{ width: "45px", height: "55px" }} src={ultralearn} className="image-fluid mx-3  -mt-1" alt="Student" /></span> 
            <div style={{ color: "#FFFFFF" }} className="text-3xl  font-semibold mt-2	" >UltraLEARN</div>
        </div>)
}
