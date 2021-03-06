import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { useSelector } from 'react-redux';
import './SessionItem.css';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: '20px',
    },
    rootActive: {
        maxWidth: 345,
        margin: '20px',
        background: red[100],
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatarActive: {
        backgroundColor: red[500],
    },
    avatar: {
        backgroundColor: '#757575',
    },
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    let listExams = useSelector(state => state.exam.listExams)

    let { detailedContestSession, handleToggleContestSession, handleDeleteContestSession, handleEditContestSession } = props;
    const { id, name, exam_id, is_active, type } = detailedContestSession;

    console.log(type);

    let index = listExams.findIndex((exam) => exam.id === exam_id);
    let exam_name = index > -1 ? listExams[index].exam_name : "";

    const AvatarActive = () => {
        return (
            <Avatar aria-label="recipe" className={classes.avatarActive} />
        )
    }
    const AvatarNonActive = () => {
        return (
            <Avatar aria-label="recipe" className={classes.avatar} />
        )
    }

    return (
        <Card className={is_active ? classes.rootActive : classes.root}>
            <CardHeader
                avatar={
                    is_active ? <AvatarActive /> : <AvatarNonActive />
                }
                title={is_active ? "Đang diễn ra" : "Đã đóng"}
            />
            <CardContent>
                <Typography variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {`Tên đề: ${exam_name}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {`${type === 1 ? "Bảng cá nhân" : "Bảng đội"}`}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites"
                    onClick={() => { handleEditContestSession(detailedContestSession) }}
                >
                    <EditIcon
                    />
                </IconButton>
                <IconButton
                    onClick={() => { handleDeleteContestSession(id) }}
                    aria-label="share">
                    <DeleteIcon />
                </IconButton>
                <div style={{ width: '100%', justifyContent: 'right' }}>
                    <Switch
                        style={{ float: 'right' }}
                        checked={is_active}
                        onChange={() => { handleToggleContestSession(is_active, id) }}
                        name="checkedB"
                        color="secondary"
                    />
                </div>

            </CardActions>
        </Card>
    );
}


// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FolderIcon from '@material-ui/icons/Folder';
// import React from 'react';
// import OpenInNewIcon from '@material-ui/icons/OpenInNew';
// import SettingsIcon from '@material-ui/icons/Settings';
// import Tooltip from '@material-ui/core/Tooltip';

// export default function ContestSessionItem(props) {
//     const { detailedContestSession, handleDeleteContestSession, handleEditContestSession, handleOpenContestSession } = props;
//     const { id, contestSession_name, question, available_question, total_score } = detailedContestSession;

//     const more_contestSession_info = `Đã soạn: ${available_question}/${question}    Tổng điểm: ${total_score}`
//     return (
//         <div>
//             <ListItem>
//                 <ListItemAvatar>
//                     <Avatar>
//                         <FolderIcon />
//                     </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                     primary={contestSession_name}
//                     secondary={more_contestSession_info}

//                 />
//                 <ListItemSecondaryAction>
//                     <Tooltip title="Xem, chỉnh sửa câu hỏi" placement="top-end">
//                         <IconButton
//                             onClick={() => { handleOpenContestSession(detailedContestSession) }}
//                             edge="end"
//                             aria-label="delete">
//                             <OpenInNewIcon />
//                         </IconButton>
//                     </Tooltip>

//                     <Tooltip title="Chỉnh sửa đề thi" placement="top-end">
//                         <IconButton
//                             onClick={() => { handleEditContestSession(detailedContestSession) }}
//                             edge="end"
//                             aria-label="delete">
//                             <SettingsIcon />
//                         </IconButton>
//                     </Tooltip>

//                     <Tooltip title="Xóa đề thi" placement="top-end">
//                         <IconButton edge="end" aria-label="delete"
//                             onClick={() => { handleDeleteContestSession(id) }}
//                         >
//                             <DeleteIcon />
//                         </IconButton>
//                     </Tooltip>
//                 </ListItemSecondaryAction>
//             </ListItem>
//         </div>
//     )
// }
