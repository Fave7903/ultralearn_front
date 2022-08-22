import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import avatarImage from "../assets/avatar.jpg"
import camera from "../assets/Camera.png"
import uploadphoto from "../assets/Upload Photo.png"
import uploadfile from "../assets/Upload File.png"
import addlocation from "../assets/Add Location.png"

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function DropdownComponent() {
    return (
        <div>
                    <div className="flex mb-4">
             <Menu as="div" className="col-span-4 relative inline-block text-left">
            <div className="">
                <Menu.Button className="invisible sm:visible post-bgpurple text-white sm:ml-12 -ml-0 inline-flex justify-center w-full px-6 py-4 text-sm font-medium text-2xl  border border-gray-300 rounded-md shadow-sm  ">
                    Explore
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 ml-2 mt-2 -mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className=" ml-16 absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/"
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    Account settings
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/"
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    Support
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/"
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    License
                                </a>
                            )}
                        </Menu.Item>
                        <form method="POST" action="#">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        type="submit"
                                        className={classNames(
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                            "block w-full text-left px-4 py-2 text-sm"
                                        )}
                                    >
                                        Sign out
                                    </button>
                                )}
                            </Menu.Item>
                        </form>
                    </div>
 
                </Menu.Items>
            </Transition>
        </Menu>
        <div className="col-span-8">
                <input type="text" style={{ width:"59vw"}}className=" w-80 sm:w-auto sm:ml-20 -ml-36 px-4 py-5 text-1xl bg-neutral-900 border rounded-md" placeholder="What are your interests?"></input>
            </div>
        </div>
        <div className="mb-3">
                <h1 className="text-3xl ml-4 sm:ml-14">Welcome Back Berah! </h1>
            </div>
            <div className="flex ml-12">
                <img style={{ width: "100px", height: "100px" }} className="invisible sm:visible rounded-full border border-gray-100 shadow-sm image-fluid mx-1 mt-0" src ={avatarImage} alt="user"></img>
                <input type="text" style={{ width:"62vw"}}className="bg-slate-400 h-16 -ml-36 sm:ml-2 px-6 py-5 text-1xl  border rounded-md" placeholder="Tell us something"></input>
                 <button className=" w-78 post-bgpurple h-16 text-white ml- inline-flex justify-center  px-6 py-4 text-sm font-medium text-2xl  border border-gray-300 rounded-md shadow-sm  ">Post</button>
            </div>
            <div className="ml-4 sm:ml-44 flex -mt-6 mb-4">
                 <img src={camera}alt ="UploadImage"className="mr-2 w-4 h-5"/>
                 <img src ={uploadphoto} className = "mr-2 w-5 h-5"alt="UploadPhoto"/>
                 <img src ={uploadfile} className = "mr-2 w-5 h-5" alt="UploadFile"/>
                 <img src ={addlocation} className = "mr-2 w-5 h-5"alt="Add Location"/>
                 </div>
        </div>



       
    );
}