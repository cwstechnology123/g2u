import React from 'react'

const RequestInfo = (props) => {
    const { content, classNameStyle } = props
    return (
        <div className={`row ${classNameStyle} ti-row ti-small-banner no-margin`}>
            <div className="col-xs-12">
                <h2>{content}</h2>
                <a href="#footerContact" className="ti-yellow-button">Request Info</a>
            </div>
        </div>
    )
}

export default RequestInfo