import React from "react";
import ultralearn from '../assets/ultralearn (1).png'

export const Logotext = () => {
    return (
        <p className="float-start m-4 ">
            <span><img style={{ width: "35px", height: "35px" }} src={ultralearn} className="image-fluid" alt="Student" /></span> UltraLEARN
        </p>)
}
