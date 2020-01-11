import React, { Component } from 'react'
import { Trans } from "react-i18next";

export class Details extends Component {
    render() {
        const {data} = this.props;
        return (
            <div>
                      {
                        data ?
                        
                            <div className="card card-profile shadow">
                                <div className="card-body">
                                        <div>
                                            <h3>
                                                <Trans>{data.title}</Trans>
                                            </h3>
                                            <h5>
                                                <Trans>{data.text}</Trans>
                                            </h5>
                                            <div className="h6 mt-4">
                                                <Trans>{data.description}</Trans>
                                            </div>
                                            <div className="h6 mt-4">
                                                AMOUNT: {data.value}
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            :
                            <div className="card card-profile shadow">
                                <div className="card-body">
                                    <h5>
                                        <span><i className="fa fa-hand-o-left"></i>
                                            <Trans>
                                                Select a tile to view details
                                            </Trans>
                                        </span>
                                    </h5>
                                </div>
                            </div>
                      }
                
            </div>

        )
    }
}

export default Details
