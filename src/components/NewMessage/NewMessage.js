
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


// import './NewMessage.css';
// import '../../App.css';
import '../../main.css'; 
import { addMessgaeToDB } from '../../store/actions/MessagesActions';

class NewMessage extends Component {
    state = {
        messageEditor : null,
    }

    componentDidMount() {
        let isMobile = false;
        if(window.innerWidth <= 768)
            isMobile = true;
        if(!isMobile)
        {
            console.log("Creating editor");
            ClassicEditor
                .create( document.querySelector( '#editor' ), {
                    // configuration documentation: https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html
                    fontFamily: {
                        options: [
                            'default',
                            'Ubuntu, Arial, sans-serif',
                            'Ubuntu Mono, Courier New, Courier, monospace'
                        ]
                    },
                    fontSize: {
                        options: [
                            8,
                            9,
                            10,
                            11,
                            12,
                            14,
                            18,
                            24,
                            30
                        ]
                    },
                    language: {
                        content: ['he','us']
                    },
                    alignment: {
                        options: [ 'left', 'right' ]
                    },
                    toolbar: 
                        // To add more options like fontFamily & fontSize we need to re-build CKEditor5 with additional plugins: https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/installing-plugins.html
                        // [ 'fontFamily', 'heading', 'bulletedList', 'numberedList', 'fontFamily', 'undo', 'redo']
                        // complete list: https://ckeditor.com/old/forums/CKEditor/Complete-list-of-toolbar-items
                        ['heading', '|', 'bold', 'italic', 'underline', 'link', '|', 'bulletedList', 'numberedList', 'outdent', 'indent', '|',  'undo', 'redo']
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
                            const errors = {};
                            if (!values.to) {
                                errors.to = 'Required';
                            } else if 
                                (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.to)) {
                                errors.to = 'Invalid email address';
                            }
                            if(!values.subject)
                                errors.subject = 'Required';

                            return errors;
                        }} 

                        onSubmit={ (values) => {
                            this.props.onAddMessage(this.props.mailSlurp, values.to, values.subject, this.state.messageEditor.getData());
                            this.props.history.push("/");
                        }}
                    >
                        <Form className="InputForm">
                            {/* <label htmlFor="toElm" className="InputFormLabel">To</label> */}
                            <div className="ToContainer">
                                <div className="ToPlaceholder">To</div>
                                <Field type="text" name="to" id="toElm" className="InputTextNoBorder"></Field>
                            </div>
                            <ErrorMessage name="to" component="div" className="InputFormErrorMessage"></ErrorMessage>
                            {/* <label htmlFor="subjectElm" className="InputFormLabel">Subject</label> */}
                            <Field type="text" name="subject" id="subjectElm" className="InputTextNoBorder" autocomplete="off" placeholder="Subject"></Field>
                            <ErrorMessage name="subject" component="div" className="InputFormErrorMessage"></ErrorMessage>
                            <span id="seperator"> </span>
                            <Field id="editor"  
                                    component="textarea" name="message" className="TextArea" placeholder="Write your message here"></Field>
                            <ErrorMessage name="message" component="div" className="InputFormErrorMessage"></ErrorMessage>
                            <div className="ActionsBar">
                                <button type="submit" className="MainCTAButton" style={{marginRight: "10px"}}>Send</button>
                                <Link to="/">
                                    <button className="Button">Discard</button>
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
