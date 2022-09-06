import React from "react";
import ultralearn from '../assets/ultralearn white2.png'

export const Logotext = (small = false) => {
    return (
    
        <div className={"flex flex-row" + (( !small)?"m-6 ml-9":" m-2")}>
            <span><img style={{ width: "40px", height: "40px" }} src={ultralearn} className="image-fluid mx-1 mt-0" alt="Student" /></span> 
            <div className="text-3xl text-white font-semibold mt-1	" >UltraLEARN</div>
        </div>)
}
