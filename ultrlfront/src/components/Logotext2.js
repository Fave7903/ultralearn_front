import React from "react";
import ultralearn from '../assets/ultralearnpurple.png'

export const Logotext2 = (small = false) => {
    return (
    
        <div className={"flex flex-row" + (( !small)?"m-6 ml-9":" m-2")}>
            <span><img style={{ width: "40px", height: "40px" }} src={ultralearn} className="image-fluid mx-1 mt-0" alt="Student" /></span> 
            <div className="text-3xl text-purple-900 font-semibold mt-1	" >UltraLEARN</div>
        </div>)
}
