import React from 'react'
import Link from 'next/link'

const BottonNav = ({ siteSettings }) => {
    return (
        <div className="row ti-orange-background" id="bottomNav">
            <div className="ti-content col-xs-12">
                <div className="row limited-width">
                    <div className="page-links col-md-9 col-sm-8 col-xs-12">
                        <ul className="page-link-columns">
                            <li className="ti-nav-content"><Link href="/our-games">Our Games</Link></li>
                            <li className="ti-nav-content"><Link href="/corporate-events">Corporate Events</Link></li>
                        </ul>
                        <ul className="page-link-columns">
                            <li className="ti-nav-content"><Link href="/become-an-affiliate">Become An Affiliate</Link></li>
                            <li className="ti-nav-content"><Link href="/contact-us">Contact Us</Link></li>
                            <li className="ti-nav-content"><Link href="/about-us">About Us</Link></li>
                            <li className="ti-nav-content"><Link href="/faq">FAQ</Link></li>
                            <li className="ti-nav-content"><Link href="/site-map">Site Map</Link></li>
                        </ul>
                    </div>
                    <div className="social-media-links col-md-3 col-sm-4 col-xs-12">
                        <Link href={siteSettings?.facebook_urll ?? "https://www.facebook.com/Games2UEntertainment"} target="_blank" aria-label="Facebook"><span className="ti-sprite facebook-icon" /></Link>
                        <Link href={siteSettings?.twitter_url ?? "https://twitter.com/Games2U"} target="_blank" aria-label="Twitter"><span className="ti-sprite twitter-icon"  /></Link>
                        <Link href={siteSettings?.youtube_url ?? "https://www.youtube.com/user/webmin007g2u"} target="_blank" aria-label="Youtube"><span className="ti-sprite youtube-icon" /></Link>
                        <Link href={siteSettings?.instagram_url ?? "https://www.instagram.com/games2u_usa/?hl=en"} target="_blank" aria-label="Instagram"><span className="ti-sprite instagram-icon" /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BottonNav