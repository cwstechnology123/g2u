import React from 'react'
import Header from '../components/_App/Header';
import Link from 'next/link'
import Footer from '@/components/_App/Footer/Footer';
import { apiBaseUrl, fetchApi } from "@/utils/fetchApi";


const Custom404 = ({ testimonialsData, siteSettingData }) => {
    return (
        <>
            <div className="container-fluid">

                <Header siteSettings={siteSettingData} />

                <div className="row no-padding not-home all-events-page" id="headerBanner">
                    <div className="ti-page-header row clearfix">
                        <div className="row ti-row">
                            <div className="limited-width">
                                <h1>404 Oops! Page Not Found</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>

                <div className="container-fluid" id="contentParent">
                    <div className="row ti-row content-padding">
                        <div className="limited-width">
                            <div className="col-xs-12 default-container text-container">
                                <div className="col-sm-12 col-md-12">
                                    <h2>The Page you are looking for doesn't seem to exists. </h2>
                                    <p>&nbsp;</p>
                                    <p><Link href="/">Return to Games2U</Link></p>
                                    <p>&nbsp;</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer
                testimonials={testimonialsData}
                siteSettings={siteSettingData}
            />
        </>
    )
}

export default Custom404

export async function getStaticProps() {
    try {
        const testimonialsPayload = { url: `${apiBaseUrl}/testimonials`, method: 'POST', data: { page_limit: 20, page_record: 1 } }
        const siteSettingsPayload = { url: `${apiBaseUrl}/site-settings`, method: "GET", };

        const testimonialsContent = await fetchApi(testimonialsPayload); // call testimonials API
        const siteSettingContent = await fetchApi(siteSettingsPayload); // call site setting API

        const testimonialsData = testimonialsContent.data.testimonials;
        const siteSettingData = siteSettingContent.data.settings;

        return {
            props: {
                testimonialsData,
                siteSettingData
            },
            revalidate: 10, // In seconds
        };
    } catch (error) {
        console.log('error in siteSetting api call', error)
    }
}