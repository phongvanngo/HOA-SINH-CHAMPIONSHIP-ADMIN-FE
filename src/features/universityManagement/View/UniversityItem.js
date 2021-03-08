import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import React from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import SettingsIcon from '@material-ui/icons/Settings';
import Tooltip from '@material-ui/core/Tooltip';

export default function UniversityItem(props) {
    const { detailedUniversity, handleDeleteUniversity, handleEditUniversity} = props;
    const { id, university_name } = detailedUniversity;

    return (
        <div>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={university_name}

                />
                <ListItemSecondaryAction>
            

                    <Tooltip title="Chỉnh sửa đề thi" placement="top-end">
                        <IconButton
                            onClick={() => { handleEditUniversity(detailedUniversity) }}
                            edge="end"
                            aria-label="delete">
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Xóa đề thi" placement="top-end">
                        <IconButton edge="end" aria-label="delete"
                            onClick={() => { handleDeleteUniversity(id) }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    )
}
