import React, { Component } from 'react';
import classes from './SignUpModal.module.css';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Button from '../../shared/Button/Button';
import { signUp } from '../../../services/UserService';

class SignUpModal extends Component {
    constructor(props) {
        super();
        this.state = {
            open: props.open,
            window: 1,
            kind: '',
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }

        this.closeModal = this.closeModal.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.changeWindow = this.changeWindow.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            this.setState({ open: this.props.open });
        }
    }

    openModal = () => {
        this.props.switchSignUpModal();
    }

    closeModal = () => {
        this.props.switchSignUpModal();
    }

    switchToLogin = () => {
        this.props.switchSignUpModal();
        this.props.openLogin();
    }

    changeWindow = () => {
        const currentWindow = this.state.window;
        this.setState({ window: (currentWindow === 1) ? 2 : 1 });
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    changeKindRadio = (e) => {
        this.setState({ kind: e.target.value });
    }

    submitForm = async () => {
        if (!this.state.email) {
            alert(`Please fill out your email.`);
        } else if (!this.state.password) {
            alert(`Please fill out your password.`);
        } else {
            const data = {
                type: this.state.type,
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            }
            console.log(data)
            signUp(data)
                .then(data => {
                    this.props.processLogin(data.userKind);
                })
                .catch(e => {
                    console.log(e);
                    alert('You cannot be signed up at this time.')
                })
        }
    }

    render() {
        const singleWindow = <>
            <RadioGroup aria-label="kind" name={'kind'} value={this.state.kind} onChange={this.changeInput}>
                <div className={classes.kindArea}>
                    <div className={classes.kindLabel}>I am a:</div>
                    <FormControlLabel value="User" control={<Radio color="primary" />} label="User" />
                    <FormControlLabel value="Interpreter" control={<Radio color="primary" />} label="Interpreter" />
                </div>
            </RadioGroup>

            <Grid container spacing={2} justify='center'>
                <Grid item xs={6}>
                    <TextField label="Name"
                        name="name"
                        required
                        value={this.props.title}
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput} />
                    <TextField label="Email"
                        name="email"
                        required
                        value={this.props.title}
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput} />
                </Grid>

                <Grid item xs={6}>
                    <TextField label="Password"
                        name="password"
                        type="password"
                        required
                        margin="dense"
                        value={this.props.location}
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput} />
                    <TextField label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        required
                        margin="dense"
                        value={this.props.location}
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput} />
                </Grid>
            </Grid>
        </>;
        const singleBack = <Button content={'Back'} inverted click={this.switchToLogin} />;
        const singleNext = <Button content={'Sign Up'} click={this.submitForm} />;

        const doubleWindow = (this.state.window === 1) ?
            singleWindow
            : <h1>window 2</h1>;
        const doubleBack = (this.state.window === 1) ?
            singleBack
            : <Button content={'Back'} inverted click={this.changeWindow} />;
        const doubleNext = (this.state.window === 1) ?
            <Button content={'Next'} click={this.changeWindow} />
            : singleNext;

        const window = (this.state.kind === 'User') ? singleWindow : doubleWindow;
        const backButton = (this.state.kind === 'User') ? singleBack : doubleBack;
        const nextButton = (this.state.kind === 'User') ? singleNext : doubleNext;

        return (
            <Modal className={classes.Modal}
                open={this.state.open}
                onClose={this.closeModal}
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 200 }}>
                <Fade in={this.state.open}>
                    <div className={classes.card}>
                        <div className={classes.title}>Sign Up</div>
                        <form encType="multipart/form-data">
                            {window}

                            <div className={classes.footer}>
                                <div className={classes.buttons}>
                                    {backButton}
                                    {nextButton}
                                </div>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        )
    }
}

export default SignUpModal;
