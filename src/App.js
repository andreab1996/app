import React, { Component } from "react";
import Navbar from "./components/NavBar";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import AssignPermission from "./components/AssignPermission";
import CreatePermission from "./components/CreatePermission";
import PermissionList from "./components/PermissionList";

export default function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <div>
                    <Routes>
                        <Route path="/create-user" element={<CreateUser />} />
                        <Route exact path="/" element={<UserList />} />
                        <Route exact path="/:post_id" element={<EditUser />} />
                        <Route exact path="/assign/:post_id" element={<AssignPermission />} />
                        <Route path="/create-permission" element={<CreatePermission />} />
                        <Route exact path="/permissions" element={<PermissionList />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}
