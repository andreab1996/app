import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { updateUser, getUser, getPermissions, permissionStatusChanged, savePermissions, deletePermissions } from "../actions";

class AssignPermission extends Component {
    constructor(props) {
        super(props);

        this.onGetPermissions();
        this.onGetUser();
    }

    onGetUser = () => {
        this.props.getUser(window.location.href);
    };

    onGetPermissions = () => {
        this.props.getPermissions();
    };

    onPermissionStatusChanged(e, permission) {
        this.props.permissionStatusChanged(permission);
    }

    onSaveAssignedPermissions() {
        let addPermissions = this.props.permissions.filter((p) => p.status);
        let removePermissions = this.props.permissions.filter((p) =>
            this.props.user.permissions.find((per) => per.permissionId == p.id && !p.status)
        );
        console.log("ADD = ", addPermissions);
        console.log("DELETE = ", removePermissions);
        this.props.savePermissions(
            this.props.user.id,
            addPermissions.filter((p) => !this.props.user.permissions?.find((per) => per.permissionId == p.id && p.status))
        );
        this.props.deletePermissions(this.props.user.id, removePermissions);
    }

    redirection() {
        if (this.props.redirectTo) {
            return <Navigate to={this.props.redirectTo} />;
        }
    }

    render() {
        return (
            <div className="container">
                <h4>Assign Permission</h4>
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
                                />
                            </div>
                            <div class="input-field col s6">
                                <input
                                    placeholder="Last Name"
                                    id="last_name"
                                    type="text"
                                    class="validate"
                                    value={this.props.user.lastName}
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input placeholder="Email" id="email" type="email" class="validate" value={this.props.user.email} />
                            </div>
                            <div class="input-field col s6">
                                <label>
                                    <input type="checkbox" checked={this.props.user.status} value={this.props.user.status} />
                                    <span>Status</span>
                                </label>
                            </div>
                        </div>
                        <h6>Permissions:</h6>
                        <div class="row">
                            {this.props.permissions.map((p) => {
                                return (
                                    <div class="input-field col s6">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={p?.status}
                                                value={p.code}
                                                onChange={(e) => {
                                                    this.onPermissionStatusChanged(e, p);
                                                }}
                                            />
                                            <span>{p.code}</span>
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </form>
                </div>
                <a class="waves-effect waves-light btn" onClick={() => this.onSaveAssignedPermissions()}>
                    Save assigned permissions
                </a>
                {this.redirection()}
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => {
    console.log(user.permissions);
    return {
        user: user.user,
        permissions: user.permissions,
    };
};

export default connect(mapStateToProps, {
    getUser,
    updateUser,
    getPermissions,
    permissionStatusChanged,
    savePermissions,
    deletePermissions,
})(AssignPermission);
