import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { authUser } from '../../store/actions/AuthActions';
import Spinner from '../UI/Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import errorMessages from '../../store/errors';
import { Redirect, withRouter } from 'react-router-dom';
 
// Firebase authentication Rest API docs: https://firebase.google.com/docs/reference/rest/auth#section-sign-in-anonymously

class Auth extends Component {
    state = {
        signIn: true
    }
    toggleMode = () => {
        // we must use this form of setState() as we rely on the previous state value
        this.setState((state,props) => ({
            signIn : !state.signIn
        }));
    } 
    componentDidUpdate() {
        // Uncomment once implementing sign out 
        if(this.props.authenticated === true)
            this.props.history.push("/u/inbox");
    }

    render() {
        if(this.props.authInProgress)
            return <Spinner />

        let successRedirect = null;
        if(this.props.authenticated)
            successRedirect = <Redirect to="/u/inbox"/>

        return (
            <div className="AuthContainer">
                {successRedirect}

                <FontAwesomeIcon icon={faEnvelope} className="AuthAppLogo"/>
                <p className="AuthPageTitle">{this.state.signIn? 'Sign in' : 'Sign up'}</p>

                <Formik validateOnChange={false} validateOnBlur={false}
                    initialValues={{ email: '', password: '' }}

                    validate={ values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }
                        if(!values.password)
                            errors.password = 'Required';
                        else if(values.password.length < 6)
                            errors.password = errorMessages.AUTH_SIGN_UP_WEAK_PASSWORD;
                            // TBD: validate complexity

                        // if errors were found
                        if((errors.email !== undefined) || (errors.password !== undefined)) 
                            document.getElementById("generalError").innerHTML = '';

                        return errors;
                    }}

                    onSubmit={ (values) => {
                        this.props.auth(values.email, values.password, this.state.signIn);
                    }} 
                >  
                    <Form className="InputFormStretched AuthForm"> 
                        <Field type="text" name="email" placeholder="email" className="InputText"></Field>
                        <ErrorMessage name="email" component="div" className="InputFormErrorMessage"></ErrorMessage>

                        <Field type="password" name="password" placeholder="password" className="InputText"></Field>
                        <ErrorMessage name="password" component="div" className="InputFormErrorMessage"></ErrorMessage>

                        <p id="generalError" className="FormGeneralErrorMessage">{this.props.error}</p>
                        <button type="submit" className="MainCTAButton">{this.state.signIn? 'Sign in' : 'Sign up'}</button>
                    </Form>
                </Formik>
                <p>{this.state.signIn? 'Don\'t have an account?   ' : 'Already have an account?   '}
                    <span className="EmphasizedLink" onClick={this.toggleMode}>{this.state.signIn? 'Sign up' : 'Sign in'}</span>
                </p>
            </div>
        )
    } 
}

const mapStateToProps = state => {
    return {
        authenticated: state.authReducer.authenticated,
        authInProgress: state.authReducer.authInProgress, 
        error: state.authReducer.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, signIn) => dispatch(authUser(email,password,signIn))  
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Auth)); 