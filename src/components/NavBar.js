import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="nav-wrapper red darken-3">
            <div className="container">
                <a className="brand-logo">User management</a>
                <ul className="right">
                    <li>
                        <Link to="/">User List</Link>
                    </li>
                    <li>
                        <Link to="/create-user">Create User</Link>
                    </li>
                    <li>
                        <Link to="/permissions">List Permissions</Link>
                    </li>
                    <li>
                        <Link to="/create-permission">Create Permission</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
