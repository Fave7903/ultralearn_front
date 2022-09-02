import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SharePost from "../assets/Share post.png"
import EditPost from "../assets/Edit post.png"
import DeletePost from "../assets/Delete.png"
import  ReportPost from "../assets/Repost.png"
import { Link } from 'react-router-dom'



const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className=''>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: '#460273',right: "0%" ,bottom:"30px" ,float: "right"}} 
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}

        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {

            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      > 
      {/* <Link to="/share"> <MenuItem style={{ color: '#460273' }}        className="bg-purple-100">
            <div  className="flex">Share Post <img alt="Icon"className="mx-2"style={{width:"20px",height:"20px"}}src={SharePost}/></div>
          </MenuItem></Link> */}
          <Link to="/edit">
          <MenuItem style={{ color: '#460273' }}id="">
            <div className="flex">Edit Post <img alt="Icon" className="mx-5" style={{width:"20px",height:"20px"}}src={EditPost}/></div>
          </MenuItem>
          </Link>
          <Link to="/delete"> <MenuItem style={{ color: '#460273' }}id="delete"data-dropdown-toggle="popupdelete">
            <div className="flex">Delete Post <img alt="Icon" className="mx-2" style={{width:"20px",height:"20px"}}src={DeletePost}/></div>
          </MenuItem></Link>
          {/* <Link> <MenuItem style={{ color: '#460273' }}>
            <div className="flex">Report Post <img alt="Icon" className="mx-2" style={{width:"20px",height:"20px"}}src={ReportPost}/></div>
          </MenuItem></Link> */}
      </Menu>
    </div>
  );
}

