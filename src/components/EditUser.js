import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../actions";
import { Navigate } from "react-router-dom";
import { updateUser, userEmailChanged, userFirstNameChanged, userLastNameChanged, statusChanged } from "../actions";

class EditUser extends Component {
    constructor(props) {
        super(props);

        this.onGetUser();
    }

    onGetUser = () => {
        this.props.getUser(window.location.href);
    };

    onFirstNameChanged(e) {
        this.props.userFirstNameChanged(e.target.value);
    }

    onLastNameChanged(e) {
        this.props.userLastNameChanged(e.target.value);
    }

    onEmailChanged(e) {
        this.props.userEmailChanged(e.target.value);
    }

    onStatusChanged(e) {
        if (this.props.user.status) this.props.statusChanged(false);
        else this.props.statusChanged(true);
    }

    onSaveUser() {
        this.props.updateUser(this.props.user);
    }

    redirection() {
        if (this.props.redirectTo) {
            return <Navigate to={this.props.redirectTo} />;
        }
    }

    render() {
        return (
            <div className="container">
                <h4>Edit User</h4>
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
                            <div class="input-field col s6">
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
                            <div class="input-field col s6">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.props.user.status}
                                        value={this.props.user.status}
                                        onChange={(e) => {
                                            this.onStatusChanged(e);
                                        }}
                                    />
                                    <span>Status</span>
                                </label>
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
    return {
        user: user.user,
    };
};

export default connect(mapStateToProps, {
    getUser,
    userFirstNameChanged,
    userLastNameChanged,
    userEmailChanged,
    statusChanged,
    updateUser,
})(EditUser);
