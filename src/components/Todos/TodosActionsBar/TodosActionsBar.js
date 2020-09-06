import React, { Component } from 'react';
// import './TodosActionsBar.css';
import '../../../main.css';
 
class TodosActionsBar extends Component {
    state = {
        text: ''
    } 
    
    handleSubmit = e => {
        const text = e.target.value.trim();
        if (e.which === 13) {
          this.props.addHandler(text);
        //   if (this.props.newTodo) {
            this.setState({ text: '' })}
        // }
    }
    handleChange = e => {
        this.setState({ text: e.target.value })
    }
 
    /* Add filter & sort */
    
    render() {
        return (
            <div className="TodosActionsBar">
                <input className="NewTodo" 
                    type="text"
                    placeholder="What needs to be done?"
                    maxLength="50"
                    autoFocus={true}
                    value={this.state.text}
//                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    onKeyDown={this.handleSubmit} />
                <span className="TodoInputCharCounter">{50 - this.state.text.length}</span>
            </div>
        );
    }
}

export default TodosActionsBar;