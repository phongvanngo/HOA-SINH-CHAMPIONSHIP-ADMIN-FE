import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import QuestionItem from './QuestionItem';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function InsetList() {
    const classes = useStyles();
    const listQuestions = useSelector(state => state.question.listQuestions)
    return (
        <List component="nav" className={classes.root} aria-label="contacts">
            {listQuestions.map((question, index) => (
                <QuestionItem
                    index={index + 1}
                    key={index}
                    detailedQuestion={question}
                />
            ))}
        </List>
    );
}
