import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { updateUser, deleteUserRequest } from './../UserSlice';
import { useDispatch } from 'react-redux';

const ITEM_HEIGHT = 48;

export default function UserItem({ detailedUser, index }) {
    const { id, code, name, score, time, sessionName } = detailedUser;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditUser = () => {
        handleClose();
        dispatch(updateUser(detailedUser));
    }

    const handleDeleteUser = () => {
        handleClose();
        dispatch(deleteUserRequest(id));

    }

    return (
        <React.Fragment>
            <TableRow key={id}>
                <TableCell component="th" scope="row">
                    {index}
                </TableCell>
                <TableCell align="center">
                    {code}
                </TableCell>
                <TableCell align="center">
                    {name}
                </TableCell>
                <TableCell align="center">
                    {sessionName}
                </TableCell>
                <TableCell align="center">
                    {score}
                </TableCell>
                <TableCell align="center">
                    {time}
                </TableCell>
                <TableCell align="center">
                    <div>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            <MenuItem onClick={handleEditUser}>
                                Sửa
                            </MenuItem>
                            <MenuItem onClick={handleDeleteUser}>
                                Xóa
                            </MenuItem>
                        </Menu>
                    </div>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
