import { Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduceParagraph } from './../../../app/utilities';
import { editQuestion } from './../questionSlice';

export default function QuestionItem(props) {
    const { detailedQuestion, index } = props;
    const { id, content, } = detailedQuestion;
    const chosenQuestionId = useSelector(state => state.question.chosenQuestionId)
    const dispatch = useDispatch();

    const handleClickQuestion = () => {
        dispatch(editQuestion(detailedQuestion));
    }

    return (
        <React.Fragment>
            <ListItem button onClick={() => { handleClickQuestion() }}>
                <ListItemIcon>
                    {chosenQuestionId === id ? <EditIcon /> : <ListItemText secondary={`Câu ${index}`} />}
                </ListItemIcon>
                <ListItemText primary={reduceParagraph(content, 10)} />
            </ListItem>
            <Divider />
        </React.Fragment>
    );
}
