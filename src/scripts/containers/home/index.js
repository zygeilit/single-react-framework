import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ActionCreators from './../../redux/actions/index'

import './index.scss'

class HomeView extends React.Component {

    constructor(props) {
        super(props);
        this.inputChangeHander = this.inputChangeHander.bind(this);
    }

    inputChangeHander(e) {
        this.props.actions.inputChange(e.target.value);
    }

    render() {
        return (
            <div className="container">
                <div className="selector">
                    <input type="text" className="inputer" onChange={this.inputChangeHander}/>
                </div>
                <div className="items">
                    {this.props.home.items.map((item) =>
                        <div key={item.id} className="item">{item.text}</div>
                    )}
                </div>
                <div class="counter">{this.props.home.items.length}</div>
            </div>
        )
    }
}

export default connect(
    (state) => { return state }, 
    (dispatch) => { return { actions: bindActionCreators(ActionCreators, dispatch) } }
)(HomeView);