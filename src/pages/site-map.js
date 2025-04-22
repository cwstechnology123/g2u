import React, { useEffect, useState } from 'react'
import Header from '@/components/_App/Header'
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { apiBaseUrl, fetchApi } from "@/utils/fetchApi";
import Footer from '@/components/_App/Footer/Footer';
import useGamesData from '@/states/stores/games-data';


const sitemap = ({ eventListData: { events, pagination }, testimonialsData, siteSettingData }) => {
    const { zipcode, games, loading, error } = useGamesData();

    const SEO = {
        title: "Site Map | Games2U Mobile Entertainment",
        description: "View the site map for the website for Games2U, America's most trusted provider of mobile entertainment including video game trucks, laser tag equipment, human hamster balls, and more!",
        canonical: "/site-map",
        openGraph: {
            type: 'website',
            title: 'Site Map | Games2U Mobile Entertainment',
            description: "View the site map for the website for Games2U, America's most trusted provider of mobile entertainment including video game trucks, laser tag equipment, human hamster balls, and more!",
            url: 'https://www.g2u.com',
            images: [
                {
                    url: "https://www.g2u.com/assets/img/g2u-logo.png",
                    width: 800,
                    height: 600,
                    alt: 'Og Image Alt',
                }
            ],
        },
        twitter: {
            handle: '@g2u',
            site: '@g2u',
            cardType: 'summary_large_image'
        },
    }
    return (
        <>
            <NextSeo {...SEO} />
            {/* <!-- top header and banner with mobile menu section start --> */}
            <div className="container-fluid">
                {/* <!-- header section start with mobile naviagtion  --> */}
                <Header siteSettings={siteSettingData} />
                {/* <!-- header section end with mobile naviagtion  --> */}

                <div className="row no-padding not-home all-events-page" id="headerBanner">
                    <div className="ti-page-header row clearfix">
                        <div className="row ti-row">
                            <div className="limited-width">
                                <h1>Site Map</h1>
                            </div>
                        </div>
                    </div>
                </div>


            </div >
            {/* <!-- top header and banner with mobile menu section start --> */}

            {/* content section start */}

            <div className="container-fluid" id="contentParent">
                <div className="row ti-row content-padding">
                    <div className="limited-width">
                        <div className="col-xs-12 default-container text-container">
                            <div className="col-sm-12 col-md-12">
                                <ul className="sitemap">
                                    <li><Link href="/"><b>Games2U Mobile Entertainment</b></Link>
                                        <br /><br />
                                        <ul className="sitemap">
                                            <li><Link href="/corporate-events">Corporate Events</Link></li>
                                            <li><Link href="/about-us">About Us</Link></li>
                                            <li><Link href="/contact-us">Contact Us</Link></li>
                                            <li><Link href="/faq">Frequently Asked Questions</Link></li>
                                            <li><Link href="/become-an-affiliate">BECOME AN AFFILIATE</Link></li>
                                            <li><Link href="/terms-of-use">Terms of Use</Link></li>
                                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div >
            </div >


            {/* content section end */}

            < Footer
                testimonials={testimonialsData}
                siteSettings={siteSettingData}
            />
        </>)
}

export default sitemap

export async function getStaticProps() {
    try {
        const enevtListPayload = { url: `${apiBaseUrl}/events`, method: 'POST', data: { page_limit: 9, page_record: 1 } }
        const testimonialsPayload = { url: `${apiBaseUrl}/testimonials`, method: 'POST', data: { page_limit: 20, page_record: 1 } }
        const siteSettingsPayload = { url: `${apiBaseUrl}/site-settings`, method: "GET", };

        const eventList = await fetchApi(enevtListPayload); // call event list API
        const testimonialsContent = await fetchApi(testimonialsPayload); // call testimonials API
        const siteSettingContent = await fetchApi(siteSettingsPayload); // call investors API

        const eventListData = eventList.data;
        const testimonialsData = testimonialsContent.data.testimonials;
        const siteSettingData = siteSettingContent.data.settings;

        return {
            props: {
                eventListData,
                testimonialsData,
                siteSettingData,
            },
            revalidate: 10, // In seconds
        };
    } catch (error) {
        console.log('error in testimonials api call', error)
    }
}