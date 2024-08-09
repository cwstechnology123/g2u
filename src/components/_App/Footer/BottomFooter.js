import React from 'react'
import Link from 'next/link'

const BottomFooter = ({ siteSettings }) => {
    return (
        <div className="row no-padding no-margin" id="bottomFooter">
            <div className="ti-content limited-width">
                <div className="pull-left" id="bottomFooterNav">
                    <Link href="/terms-of-use">Terms of Use</Link>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                    <Link href="/site-map">Site Map</Link>
                </div>
                <div className="pull-right" id="bottomFooterCopyright">
                    <span className="pull-right">{siteSettings && siteSettings.copy_right_text ? siteSettings.copy_right_text : "© 2023 Games2U Entertainment, All rights reserved."}</span>
                </div>
            </div>
        </div>
    )
}

export default BottomFooter