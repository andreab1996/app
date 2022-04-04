import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { deleteUser, getUsers } from "../actions";

class UserList extends Component {
    constructor(props) {
        super(props);

        this.onGetUsers();
    }

    componentDidMount() {
        setInterval(this.onGetUsers, 30000);
    }

    onGetUsers = () => {
        this.props.getUsers();
    };

    onTryToDeleteUser = (flag, userId) => {
        if (flag) this.onDeleteUser(userId);
        else this.onGetUsers();
    };

    onDeleteUser = (userId) => {
        this.props.deleteUser(userId);
    };

    render() {
        return (
            <div className="container home">
                {this.props.users?.map((user) => {
                    return (
                        <div class="row" key={user.id}>
                            <div class="col s12 m6">
                                <div class="card blue-grey darken-1">
                                    <div class="card-content white-text">
                                        <span class="card-title">
                                            {user.firstName} {user.lastName}
                                        </span>
                                    </div>
                                    <div class="card-action">
                                        <Link to={"/" + user.id}>Edit user</Link>
                                        <Link to={"/assign/" + user.id}>Assign permission</Link>
                                        <Popup trigger={<a>Delete</a>} position="right center">
                                            <div>Are you sure you want to delete this user?</div>
                                            <button onClick={() => this.onTryToDeleteUser(true, user.id)}>Yes</button>
                                            <button onClick={() => this.onTryToDeleteUser(false, user.id)}>No</button>
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

const mapStateToProps = ({ user }) => {
    return {
        users: user.users,
        deleteUser: user.deleteUser,
        userId: user.userId,
    };
};

export default connect(mapStateToProps, {
    getUsers,
    deleteUser,
})(UserList);
