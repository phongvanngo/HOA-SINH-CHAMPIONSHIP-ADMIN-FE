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

export default function ContestSessionItem(props) {
    const { detailedContestSession, handleDeleteContestSession, handleEditContestSession, handleOpenContestSession } = props;
    const { id, contestSession_name, question, available_question, total_score } = detailedContestSession;

    const more_contestSession_info = `Đã soạn: ${available_question}/${question}    Tổng điểm: ${total_score}`
    return (
        <div>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={contestSession_name}
                    secondary={more_contestSession_info}

                />
                <ListItemSecondaryAction>
                    <Tooltip title="Xem, chỉnh sửa câu hỏi" placement="top-end">
                        <IconButton
                            onClick={() => { handleOpenContestSession(detailedContestSession) }}
                            edge="end"
                            aria-label="delete">
                            <OpenInNewIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Chỉnh sửa đề thi" placement="top-end">
                        <IconButton
                            onClick={() => { handleEditContestSession(detailedContestSession) }}
                            edge="end"
                            aria-label="delete">
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Xóa đề thi" placement="top-end">
                        <IconButton edge="end" aria-label="delete"
                            onClick={() => { handleDeleteContestSession(id) }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    )
}
