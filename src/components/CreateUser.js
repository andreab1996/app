import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { saveUser, userEmailChanged, userFirstNameChanged, userLastNameChanged } from "../actions";

class CreateUser extends Component {
    constructor(props) {
        super(props);
    }

    onFirstNameChanged(e) {
        this.props.userFirstNameChanged(e.target.value);
    }

    onLastNameChanged(e) {
        this.props.userLastNameChanged(e.target.value);
    }

    onEmailChanged(e) {
        this.props.userEmailChanged(e.target.value);
    }

    onSaveUser() {
        this.props.saveUser(this.props.user);
    }

    redirection() {
        if (this.props.redirectTo) {
            return <Navigate to={this.props.redirectTo} />;
        }
    }
    render() {
        return (
            <div className="container">
                <h4>Create User</h4>
                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s6">
                                <input
                                    placeholder="First Name"
                                    id="first_name"
                                    type="text"
                                    class="validate"
                                    value={this.props.user.firstName}
                                    onChange={(e) => {
                                        this.onFirstNameChanged(e);
                                    }}
                                />
                            </div>
                            <div class="input-field col s6">
                                <input
                                    placeholder="Last Name"
                                    id="last_name"
                                    type="text"
                                    class="validate"
                                    value={this.props.user.lastName}
                                    onChange={(e) => {
                                        this.onLastNameChanged(e);
                                    }}
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input
                                    placeholder="Email"
                                    id="email"
                                    type="email"
                                    class="validate"
                                    value={this.props.user.email}
                                    onChange={(e) => {
                                        this.onEmailChanged(e);
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <a class="waves-effect waves-light btn" onClick={() => this.onSaveUser()}>
                    Save user
                </a>
                {this.redirection()}
            </div>
        );
    }
}
const mapStateToProps = ({ user }) => {
    console.log(user.user);
    return {
        user: user.user,
        redirectTo: user.redirectTo,
    };
};

export default connect(mapStateToProps, {
    userFirstNameChanged,
    userLastNameChanged,
    userEmailChanged,
    saveUser,
})(CreateUser);
