import React from 'react'

const ZipCodePopup = () => {
    return (
        <div className="modal-overlay">
            <div className="modal" id="zipModal" tabIndex={-1} role="dialog" style={{ paddingRight: '0px !important' }}>
                <div className="container-modal">
                    <div className="logo-container">
                        <img data-em="logo" src="assets/img/g2u-logo.png" alt="g2u-logo" />
                    </div>
                    <div className="text-container">
                        <div data-em="text-line-1" className="zip-text-line-1">Please enter your zipcode so we can provide you
                            with local pricing and options:</div>
                        <div className="border-container">
                            <span className="arrow arrow-bg-color" />
                            <form id="frmZipPopUp" name="frmZipPopUp" method="post" action="/">
                                <input type="hidden" id="modalFranchiseName" name="modalFranchiseName" defaultValue />
                                <div className="template-inputs">
                                    <input name="popupZipcode" id="popupZipcode" type="zip" className="required" placeholder="Enter your zip code" data-required="Zip code is required" autoComplete="off" />
                                </div>
                                <div className="buttons-container">
                                    <a data-em="button" type="button" className="submit btn-bg-color jsBtnPopupSubmit" id="submit-button" target>Submit</a>
                                    <div data-em="modal-close-link" data-dismiss="modal" className="close close-link" id="close-link-1">No, Thanks<br /><span>Maybe later.</span></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ZipCodePopup