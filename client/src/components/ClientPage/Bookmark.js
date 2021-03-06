import React, { useState } from 'react';
import { withSnackbar } from 'notistack';

import classes from './css/Bookmark.module.css';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Rating from '@material-ui/lab/Rating';

import Avatar from '../shared/Avatar';
import { bookmarkInterpreter, unbookmarkInterpreter } from '../../services/ClientService';

const Bookmark = (props) => {
    const [bookmarked, setBookmarked] = useState(true);
    const languages = props.languages.map((lang, index) =>
        (index !== props.languages.length - 1) ? <span key={`bookmark-lang-${index}`}>{lang.language}, </span> : <span key={`bookmark-lang-${index}`}>{lang.language}</span>
    )
    const bookmarkIcon = bookmarked ?
        <IconButton onClick={e => unbookmark(e, props.email)}>
            <BookmarkIcon color="primary" />
        </IconButton>
        : <IconButton onClick={e => bookmark(e, props.email)} >
            <BookmarkBorderIcon color="primary" />
        </IconButton>;


    const bookmark = (e, email) => {
        bookmarkInterpreter(email)
            .then(data => {
                setBookmarked(true);
                props.enqueueSnackbar("Success! You have bookmarked this interpreter.", { variant: 'success' });
            })
            .catch(e => props.enqueueSnackbar("This interpreter cannot be bookmarked at the moment.", { variant: 'error' }))
    }

    const unbookmark = (e, email) => {
        unbookmarkInterpreter(email)
            .then(data => {
                setBookmarked(false);
                props.enqueueSnackbar("You have unbookmarked this interpreter.", { variant: 'info' });
            })
            .catch(e => props.enqueueSnackbar("This interpreter cannot be unbookmarked at the moment.", { variant: 'error' }))
    }

    return <div key={`props-${props.objectID}`} className={classes.Bookmark}>
        <div className={classes.avatar}>
            <Avatar name={props.name} avatar={props.avatar} size={14} />
        </div>
        <div className={classes.content}>
            <div className={classes.name}>
                {props.name}
                <div className={classes.bookmark}>
                    {bookmarkIcon}
                </div>
            </div>
            <Rating value={props.rating} readOnly size='small' />

            <div className={classes.languages}>
                {languages}
            </div>
            <div className={classes.email}>
                {props.email}
            </div>
            <div className={classes.location}>
                {props.location}
            </div>
            <div className={classes.phone}>
                {props.phone}
            </div>
        </div>
    </div>;
}

export default withSnackbar(Bookmark);
