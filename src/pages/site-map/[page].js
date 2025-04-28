import React from 'react'
import Header from '@/components/_App/Header'
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { apiBaseUrl, fetchApi } from "@/utils/fetchApi";
import Footer from '@/components/_App/Footer/Footer';

const sitemap = ({ sitemapData, totalPages, currentPage, siteSettingData, testimonialsData }) => {
    console.log('totalPages', totalPages);
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
                        <div className="col-12 default-container text-container">
                            <div className="col-12">
                                <ul className="list-unstyled">
                                    <li key={`siteMap_0`}>
                                        <Link href="/" className="fw-bold text-primary">Games2U Mobile Entertainment</Link>
                                        <ul className="list-unstyled ms-3 mt-2">
                                            <li key={`siteMap_1`}><Link href="/corporate-events">Corporate Events</Link></li>
                                            <li key={`siteMap_3`}><Link href="/about-us">About Us</Link></li>
                                            <li key={`siteMap_4`}><Link href="/contact-us">Contact Us</Link></li>
                                            <li key={`siteMap_5`}><Link href="/faq">Frequently Asked Questions</Link></li>
                                            <li key={`siteMap_6`}><Link href="/become-an-affiliate">Become an Affiliate</Link></li>
                                            <li key={`siteMap_7`}><Link href="/terms-of-use">Terms of Use</Link></li>
                                            <li key={`siteMap_10`}><Link href="/privacy-policy">Privacy Policy</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <hr className="my-4" />

                            <div className="col-12">
                                <h2 className="h4 mb-4">Dynamic Site Map Links (Page {currentPage})</h2>

                                <div className="list-group mb-4">
                                {Object.values(
                                    sitemapData.reduce((acc, item) => {
                                        const territoryKey = item.territory_id;

                                        if (!acc[territoryKey]) {
                                            acc[territoryKey] = {
                                                territory_name: item.territory_name,
                                                state_name: item.state_name,
                                                zipcodes: {}
                                            };
                                        }

                                        if (!acc[territoryKey].zipcodes[item.zipcode]) {
                                            acc[territoryKey].zipcodes[item.zipcode] = {
                                                z_slug: item.z_slug,
                                                activities: []
                                            };
                                        }

                                        acc[territoryKey].zipcodes[item.zipcode].activities.push(item);

                                        return acc;
                                    }, {})
                                ).map((territory) => (
                                    <div key={territory.territory_name}>
                                        <h4>{`${territory.state_name} (${territory.territory_name})`}</h4>
                                        <div className="ms-3">
                                            {Object.entries(territory.zipcodes).map(([zipcode, data]) => (
                                                <div key={zipcode}>
                                                    <h5>{zipcode}</h5>
                                                    <ul className="list-unstyled">
                                                        {data.activities.map((activity) => (
                                                            <li key={`${zipcode}-${activity.activity_id}`}>
                                                                <Link
                                                                    href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}${activity.activity_slug}`}
                                                                    className="list-group-item list-group-item-action"
                                                                >
                                                                    {process.env.NEXT_PUBLIC_DOMAIN_URL}{activity.activity_slug}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                </div>

                                {/* Pagination */}
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center">
                                        {currentPage > 1 && (
                                            <li className="page-item" key={`prev_${currentPage}`}>
                                                <Link href={`/site-map/${currentPage - 1}`} className="page-link">
                                                    Previous
                                                </Link>
                                            </li>
                                        )}
                                        {currentPage < totalPages && (
                                            <li className="page-item" key={`next_${currentPage}`}>
                                                <Link href={`/site-map/${currentPage + 1}`} className="page-link">
                                                    Next
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* content section end */}

            < Footer
                testimonials={testimonialsData}
                siteSettings={siteSettingData}
            />
        </>)
}

export default sitemap

export async function getServerSideProps(context) {
    try {
    const siteSettingsPayload = { url: `${apiBaseUrl}/site-settings`, method: "GET"};
    const siteSettingContent = await fetchApi(siteSettingsPayload);
    const siteSettingData = siteSettingContent.data.settings;

    const testimonialsPayload = { url: `${apiBaseUrl}/testimonials`, method: 'POST', data: { page_limit: 20, page_record: 1 } }
    const testimonialsContent = await fetchApi(testimonialsPayload);
    const testimonialsData = testimonialsContent.data.testimonials;

    const page = parseInt(context.params?.page || '1', 10);
    console.log('page', page);
    const response = await fetchApi({url: `${apiBaseUrl}/site-map/${page}/200`, method: "GET"});
    
    const sitemapData = response.data.data;
    const totalPages = response.data.totalPages;
    //console.log('totalPages', sitemapData);
    return {
        props: {
            sitemapData: sitemapData??[],
            totalPages: totalPages ?? 0,
            currentPage: parseInt(page),
            siteSettingData: siteSettingData ?? {},
            testimonialsData: testimonialsData ?? [],
        },
    };
    
    } catch (error) {
        console.error(error);
        return {
            props: {
                sitemapData: [],
                totalPages: 0,
                currentPage: 1,
                siteSettingData: {},
                testimonialsData: [],
            },
        };
    }
}