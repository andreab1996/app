import React, { Component } from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { deletePermission, getPermissions } from "../actions";

class PermissionList extends Component {
    constructor(props) {
        super(props);

        this.onGetPermissions();
    }

    componentDidMount() {
        setInterval(this.onGetPermissions, 30000);
    }

    onGetPermissions = () => {
        this.props.getPermissions();
    };

    onTryToDeletePermission = (flag, permissionId) => {
        if (flag) this.onDeletePermission(permissionId);
        else this.onGetPermissions();
    };

    onDeletePermission = (permissionId) => {
        this.props.deletePermission(permissionId);
    };

    render() {
        return (
            <div className="container home">
                {this.props.permissions?.map((permission) => {
                    return (
                        <div class="row" key={permission.id}>
                            <div class="col s12 m6">
                                <div class="card blue-grey darken-1">
                                    <div class="card-content white-text">
                                        <span class="card-title">{permission.code}</span>
                                        <p>{permission.description}</p>
                                    </div>
                                    <div class="card-action">
                                        <Popup trigger={<a>Delete</a>} position="right center">
                                            <div>Are you sure you want to delete this permission?</div>
                                            <button onClick={() => this.onTryToDeletePermission(true, permission.id)}>Yes</button>
                                            <button onClick={() => this.onTryToDeletePermission(false, permission.id)}>No</button>
                                        </Popup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {/* add pagination */}
            </div>
        );
    }
}

const mapStateToProps = ({ user, permission }) => {
    return {
        permissions: user.permissions,
    };
};

export default connect(mapStateToProps, {
    getPermissions,
    deletePermission,
})(PermissionList);
