import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Logout } from '@mui/icons-material';
import {
  Tooltip,
  Avatar,
  IconButton,
  Divider,
  ListItemIcon,
  MenuItem,
  Menu,
} from '@mui/material';
import instance from '../../api/axios';
import FollowButton from '../FollowButton/FollowButton';
import { UserContext } from '../../store/userContext';

function Navbar() {
  const user = useContext(UserContext);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const doSearch = () => {
    const searchKey = document.getElementById('search-users').value;
    if (searchKey === '') setSearch(false);
    else {
      instance
        .post('/searchUsers', { searchValue: searchKey })
        .then(({ data }) => {
          setSearch(data);
        });
    }
  };
  return (
    <div>
      <nav>
        <div className="container">
          <h2 className="logo">Social Media</h2>
          <div className="search-bar">
            <i className="uil uil-search" />
            <input
              onChange={() => {
                doSearch();
              }}
              type="search"
              placeholder="Search For Users.."
              id="search-users"
            />
          </div>
          <div className="create">
            <label className="btn btn-primary" htmlFor="create-post">
              Create
            </label>
            <div>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar
                    sx={{ width: 38, height: 38 }}
                    src={user.profileImg}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Link to="/profile" className="link">
                  <MenuItem>
                    <Avatar src={user.profileImg} />
                    Profile
                  </MenuItem>
                </Link>

                <Divider />

                <MenuItem
                  onClick={() => {
                    localStorage.removeItem('Accesstoken');
                    window.location = '/signup';
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </nav>

      <div className={`search-result ${search ? null : 'hide-search-result'}`}>
        {search === 'nothing' ? (
          <h1 className="mt-5">No Result Found</h1>
        ) : search === false ? null : (
          search.map((result) => (
            <div
              key={result._id}
              className="results"
              onClick={() => {
                setSearch(false);
                navigate(`/profile?id=${result._id}`);
              }}
            >
              <div className="search-details">
                <div className="result-profile-image">
                  <img
                    src={
                      result.profileImg
                        ? result.profileImg
                        : 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png'
                    }
                    alt=""
                  />
                </div>
                <div className="result-details">
                  <span>
                    <b>{result.username}</b>
                  </span>
                  {result.firstName || result.lastName ? (
                    <span>{`${result.firstName} ${result.lastName}`}</span>
                  ) : null}
                </div>
              </div>
              <div className="follow-button">
                {result.followed ? (
                  <FollowButton id={result._id} func={doSearch} />
                ) : (
                  <FollowButton type="follow" id={result._id} func={doSearch} />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Navbar;
