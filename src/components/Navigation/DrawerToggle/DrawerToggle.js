import React from 'react';
import { connect } from 'react-redux';

import '../../../store/actions/actionTypes';
// import './DrawerToggle.css';
import '../../../main.css';

import actionTypes from '../../../store/actions/actionTypes';

const drawerToggle = (props) => (
    <div    className="DrawerToggle" 
            onClick={props.toggleSideDrawer}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

const mapDispatchToProps = dispatch => {
    return {
        toggleSideDrawer: () => dispatch ( 
            {
                type : actionTypes.TOGGLE_SIDE_DRAWER
            } 
        )
    }
};
export default connect(null, mapDispatchToProps)(drawerToggle);