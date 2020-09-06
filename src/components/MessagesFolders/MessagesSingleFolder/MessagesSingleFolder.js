import React from 'react';
// import './MessagesSingleFolder.css';
import '../../../main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faStar } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

const MessagesSingleFolder = (props) => {
    var folderClasses = "MessagesSingleFolder";
    if( props.selected )
        folderClasses = folderClasses.concat(" SelectedFolder");

    return (
            <div    className={folderClasses}
                    onClick={() => props.clicked(props.type)}>
                <div>
                    <FontAwesomeIcon 
                    icon={(props.icon === "faInbox")? 
                            faInbox : 
                            ((props.icon === "faPaperPlane")? 
                                faPaperPlane : 
                                ((props.icon === "faStar")? 
                                    faStar : faCheckSquare))} 
                    className="Icons"/>
                </div>
                { props.name }
            </div>
    )
}


export default MessagesSingleFolder;
