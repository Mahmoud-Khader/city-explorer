import React, { Component } from 'react';
import { Alert } from 'react-bootstrap'
export class ErrorMsg extends Component {
    render() {
        return (
            <div>
                {this.props.alert && <Alert variant={'warning'}>
                    {this.props.error}</Alert>}
            </div>
        )
    }
}

export default ErrorMsg
