import React, { Component } from "react";
import { connect } from 'react-redux';

import classes from './InterpreterInfoModal.module.css';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';

import Button from '../../../shared/Button/Button';
import CertificationItem from '../CertificateItem/CertificateItem';
import ReviewItem from '../ReviewItem/ReviewItem';
import ReviewModal from '../../ReviewModal/ReviewModal';

import { fetchRatingAndReviews } from '../../../../services/InterpreterService';
import { bookmarkInterpreter } from '../../../../services/ClientService';

class InterpreterInfoModal extends Component {
    constructor(props) {
        super();
        this.state = {
            open: false,
            id: props.id,
            name: props.name,
            rating: 0,
            reviews: [],
            certifications: []
        };

        this.reloadDetails = this.reloadDetails.bind(this);
        this.bookmark = this.bookmark.bind(this);
    }

    openModal = () => {
        this.setState({ open: true });
    }

    closeModal = () => {
        this.setState({ open: false });
    }

    fetchDetails = () => {
        fetchRatingAndReviews(this.state.id)
            .then(data => {
                this.setState({
                    rating: data.rating,
                    certifications: data.certifications,
                    reviews: data.reviews
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    expandDetails = () => {
        this.openModal();
        if (!this.state.rating) {
            this.fetchDetails();
        }
    }

    reloadDetails = () => {
        this.fetchDetails();
    }

    bookmark = () => {
        bookmarkInterpreter(this.props.email)
            .then(data => {

            }).catch(e => {
                alert('howdy error');
            })
    }

    render() {
        const languages = this.props.languages.map(lang => <div className={classes.language}>{lang.language}: {lang.fluency} </div>)
        const reviews = (this.state.reviews.length) ?
            this.state.reviews.map(review => <ReviewItem reviewerName={review.reviewerName} rating={review.rating} comment={review.comment} date={review.date} />)
            : <div className={classes.noReviews}>{this.props.name} Has No Reviews Yet.</div>;
        const certifications = this.state.certifications.map(cert => <CertificationItem title={cert.title} image={cert.image} isValidated={cert.isValidated} />)
        // const bookmarkIcon = this.props.bookmarked ?
        //     <BookmarkIcon color="primary" onClick={this.bookmark} />
        //     : <BookmarkBorderIcon color="primary" onClick={this.bookmark} />;

        return (
            <div>
                {this.props.isLoggedIn ?
                    <div className={classes.moreInfo} onClick={this.expandDetails}>more info</div>
                    : null}

                <Modal className={classes.Modal}
                    open={this.state.open}
                    onClose={this.closeModal}
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 200 }}>
                    <Fade in={this.state.open}>
                        <div className={classes.infoCard}>
                            <Grid container spacing={2} justify='center'>
                                <Grid item xs={5} sm={5}>
                                    <div className={classes.avatar}>
                                        <img src={this.props.avatar} width='100%' alt={`avatar-${this.props.id}`} />
                                    </div>
                                </Grid>

                                <Grid item xs={7} sm={7}>
                                    <div className={classes.title}>Your Interpreter</div>
                                    <div className={classes.name}>
                                        {this.props.name}
                                    </div>
                                    <div className={classes.infoItem}>
                                        <Rating value={this.state.rating} readOnly />
                                    </div>
                                    <div className={classes.infoItem}>
                                        <div>Email:</div>
                                        <div>{this.props.email}</div>
                                    </div>
                                    <div className={classes.infoItem}>
                                        <div>Phone Number:</div>
                                        <div>{this.props.phone}</div>
                                    </div>
                                    <div className={classes.infoItem}>
                                        <div>Location:</div>
                                        <div>{this.props.location}</div>
                                    </div>
                                    <div className={classes.infoItem}>
                                        <div>Languages:
                                        <div>{languages}</div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>

                            <div className={classes.horzLine} />

                            <Grid container spacing={2} justify='center'>
                                <Grid item xs={6}>
                                    <div className={classes.title}>Certifications:
                                        <div className={classes.halfArea}>{certifications}</div>
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className={classes.title}>Reviews:
                                        <div className={classes.halfArea}>{reviews}</div>
                                    </div>

                                    <div className={classes.reviewOptions}>
                                        <Button content={'Bookmark'} click={this.bookmark} />
                                        <ReviewModal id={this.state.id} name={this.state.name} reloadDetails={this.reloadDetails} />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Fade>
                </Modal>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn,
    userKind: state.userKind
});

export default connect(mapStateToProps)(InterpreterInfoModal);
