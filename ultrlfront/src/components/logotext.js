import React from "react";
import ultralearn from '../assets/ultralearn (1).png'

export const Logotext = () => {
    return (
    
        <div className="flex flex-row m-6 ml-9 ">
            <span><img style={{ width: "35px", height: "35px" }} src={ultralearn} className="image-fluid mx-1 mt-0" alt="Student" /></span> 
            <div className="text-3xl ul-purple font-semibold	" >UltraLEARN</div>
        </div>)
}
