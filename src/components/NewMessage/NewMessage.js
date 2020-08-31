
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import './NewMessage.css';
import '../../App.css';
import { addMessgaeToDB } from '../../store/actions/MessagesActions';

class NewMessage extends Component {
    state = {
        messageEditor : null,
    }

    componentDidMount() {
        // const isMobileDevice = useMediaQuery({
        //     query: '(max-device-width: 768px)'
        //   });
        console.log(window.innerHeight);
        console.log(window.innerWidth);
        let isMobile = false;
        if(window.innerWidth <= 768)
            isMobile = true;
        console.log(isMobile);
        if(!isMobile)
        {
            console.log("Creating editor");
            ClassicEditor
                .create( document.querySelector( '#editor' ), {
                    // configuration documentation: https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html
                    fontFamily: {
                        options: [
                            // ...
                        ],
                        supportAllValues: true
                    },
                    language: {
                        content: ['he','us']
                    },
                    alignment: {
                        options: [ 'left', 'right' ]
                    },
                    toolbar: [
                        // complete list: https://ckeditor.com/old/forums/CKEditor/Complete-list-of-toolbar-items
                        'heading', '|', 'bold', 'italic', 'underline', 'link', '|', 'bulletedList', 'numberedList', 'outdent', 'indent', '|',  'undo', 'redo']
                }) 
                .then( editor => {
                    this.setState( {messageEditor : editor });
                    
                    Array.from( this.messageEditor.ui.componentFactory.names() );
                })
                .catch( error => {
                    console.error( error );
                } );
        }
    }

    render() {
        return (
            <div className="NewMessageContainer">
                <div className="NewMessage">
                    <div className="NewEmailHeader">
                        <span>New Email</span>
                    </div>
                    <Formik
                        initialValues={{ to: '', subject: '', message: '' }}
                    
                        validate={ values => {
                            values.message = this.state.messageEditor.getData()
                            const errors = {};
                            if (!values.to) {
                                errors.to = 'Required';
                            } else if 
                                (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.to)) {
                                errors.to = 'Invalid email address';
                            }
                            if(!values.subject)
                                errors.subject = 'Required';
                            // if(!values.message) - not enforcing having a content (like GMail) 
                            //    errors.message = 'Required';
                            
                            return errors;
                        }}

                        onSubmit={ (values) => {
                            this.props.onAddMessage(this.props.mailSlurp, values.to, values.subject, values.message);
                            this.props.history.push("/");
                        }}
                    >
                        <Form className="NewEmailForm">
                            {/* <label htmlFor="toElm" className="FormLabel">To</label> */}
                            <div className="ToContainer">
                                <div className="ToPlaceholder">To</div>
                                <Field type="text" name="to" id="toElm" className="InputText"></Field>
                            </div>
                            <ErrorMessage name="to" component="div" className="FormErrorMessage"></ErrorMessage>
                            {/* <label htmlFor="subjectElm" className="FormLabel">Subject</label> */}
                            <Field type="text" name="subject" id="subjectElm" className="InputText" autocomplete="off" placeholder="Subject"></Field>
                            <ErrorMessage name="subject" component="div" className="FormErrorMessage"></ErrorMessage>
                            <span id="seperator"> </span>
                            <Field id="editor" 
                                    component="textarea" name="message" className="TextArea" placeholder="Write your message here"></Field>
                            <ErrorMessage name="message" component="div" className="FormErrorMessage"></ErrorMessage>
                            <div className="ActionsBar">
                                <button type="submit" className="MainCTAButton" style={{marginRight: "10px"}}>Send</button>
                                <Link to="/">
                                    <button className="SecondaryCTAButton">Discard</button>
                                </Link>
                            </div>
                        </Form>
                    </Formik>
                </div>                    
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // Standard dispatch
        // onAddMessage: (to, subject, message) => dispatch({  
        //     type: actionTypes.ADD_MESSAGE,
        //     to : to, 
        //     subject : subject, 
        //     message : message }) 
        // with action creator
        onAddMessage: (mailSlurp, to, subject, message) => dispatch(addMessgaeToDB(mailSlurp, to, subject, message)) 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewMessage));
