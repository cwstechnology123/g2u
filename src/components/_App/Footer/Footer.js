import React from 'react';
import Testimonials from './Testimonials';
import ZipCodeFormFooter from './ZipCodeFormFooter';
import BottonNav from './BottonNav';
import BottomFooter from './BottomFooter';
import FranchiseRequest from '../FranchiseRequest';

const Footer = ({ testimonials, siteSettings }) => {
  return (
    <div id="footer">
      <div className="container-fluid no-padding" id="footer">

        <Testimonials testimonials={testimonials} />

        <div id="enterZipCode" />

        <ZipCodeFormFooter phoneNumberLabel={siteSettings.phone_number_label}/>

        <BottonNav siteSettings={siteSettings} /> {/* footer naviagtion */}

        <BottomFooter siteSettings={siteSettings} /> {/* buttom naviagtion */}

      </div>
      <div id="overlay" />
      <div id="videoModal">
        <a href="#" id="videoModalClose">Close X</a>
      </div>
      <div id="mobile-bottom-nav">
        <div className="location-update-wrap">
          <a href="#" className="location-edit-link"><span className="ti-sprite location-pin" /> (
            <span className="mobile-underline">change location</span> )</a>
          <span className="update-location">
            <span className="close-btn" />
            <form method="post" id="frmMobileFooter" name="frmMobileFooter" action="/">
              <input type="hidden" id="franchiseNameMobFooter" name="franchiseName" defaultValue />
              <div className="ti-input">
                <input id="mobileZipFooter" name="mobileZipFooter" placeholder="Enter Your Zip Code" className="zip-code-input mobile-bottom-nav-input" type="tel" />
              </div>
              <button id="btnMobileZipFooter" className="ti-yellow-button">Go!</button>
            </form>
          </span>
        </div>
        <div><a href="#footerContact"><span className="ti-sprite envelope" /> Request Info</a></div>
        <div><a href="tel:18007142637"><span className="ti-sprite phone" /> Give Us a Call!</a></div>
      </div>
      <div className="mobile-menu-overlay" />
    </div>
  )
}

export default Footer;
