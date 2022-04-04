import React, { Component } from "react";
import { connect } from "react-redux";
import { codeChanged, descriptionChanged, savePermission } from "../actions";

class CreatePermission extends Component {
    constructor(props) {
        super(props);
    }

    onCodeChanged(e) {
        this.props.codeChanged(e.target.value);
    }

    onDescriptionChanged(e) {
        this.props.descriptionChanged(e.target.value);
    }

    onSavePermission() {
        this.props.savePermission(this.props.permission);
    }

    render() {
        return (
            <div className="container">
                <h4>Create Permission</h4>
                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s6">
                                <input
                                    placeholder="Code"
                                    id="code"
                                    type="text"
                                    class="validate"
                                    value={this.props.permission.code}
                                    onChange={(e) => {
                                        this.onCodeChanged(e);
                                    }}
                                />
                            </div>
                            <div class="input-field col s6">
                                <input
                                    placeholder="Description"
                                    id="last_name"
                                    type="text"
                                    class="validate"
                                    value={this.props.permission.description}
                                    onChange={(e) => {
                                        this.onDescriptionChanged(e);
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <a class="waves-effect waves-light btn" onClick={() => this.onSavePermission()}>
                    Save permission
                </a>
            </div>
        );
    }
}
const mapStateToProps = ({ permission }) => {
    return {
        permission: permission.permission,
    };
};

export default connect(mapStateToProps, {
    codeChanged,
    descriptionChanged,
    savePermission,
})(CreatePermission);
