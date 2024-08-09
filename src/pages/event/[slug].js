import React from 'react';
import { NextSeo } from 'next-seo';
import Header from '@/components/_App/Header';
import GamesSlider from '@/components/_App/GamesSlider';
import TopBanner from '@/components/GameDetails/TopBanner';
import { apiBaseUrl, fetchApi } from "@/utils/fetchApi";
import RequestInfo from '@/components/_App/RequestInfo';
import Footer from '@/components/_App/Footer/Footer';
import BrandLogo from '@/components/_App/BrandLogo';
import ErrorPage from 'next/error';


const EventDetails = ({ eventDetails, testimonialsData, investorsData, siteSettingData }) => {
    if (!eventDetails.event_name || Object.keys(eventDetails).length == 0) {
        return <ErrorPage statusCode={404} withDarkMode={false} />
    }
    const SEO = {
        title: "Game Truck Video Games Parties | #1 Rated from Games2U",
        description: "America's most trusted provider of video game trucks for birthday parties, school carnivals and fairs, summer camps, corporate team-building events and more!",
        canonical: "https://www.g2u.com",
        openGraph: {
            type: 'website',
            url: 'https://www.g2u.com/',
            title: "Game Truck Video Games Parties | #1 Rated from Games2U",
            description: "America's most trusted provider of video game trucks for birthday parties, school carnivals and fairs, summer camps, corporate team-building events and more!"
            // images: [
            //     {
            //       url: '/images/banner-two/banner_main.jpg',
            //       width: 800,
            //       height: 600,
            //       alt: 'Og Image Alt',
            //     },
            //     {
            //       url: '/images/banner-two/banner_main.jpg',
            //       width: 800,
            //       height: 600,
            //       alt: 'Og Image Alt 2',
            //     },
            //   ],
        },
        twitter: {
            handle: '@g2u',
            site: '@g2u',
            cardType: 'summary_large_image'
        },
    }

    return (
        <>
            <div className="modal" id="priceModal" tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>Rate quoted is for weekday, off-peak, zero-travel, multiple-hour events. Other rates may be higher.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>{/* /.modal-content */}
                </div>{/* /.modal-dialog */}
            </div>{/* /.modal */}
            <NextSeo {...SEO} />
            {/* <!-- top header and banner with mobile menu section start --> */}
            <div className="container-fluid">
                {/* <!-- header section start with mobile naviagtion  --> */}
                <Header siteSettings={siteSettingData} />
                {/* <!-- header section end with mobile naviagtion  --> */}

                {eventDetails && <TopBanner
                    banner={eventDetails.banner_image}
                    icon={eventDetails.icon}
                    title={eventDetails.event_name}
                    caption={eventDetails.event_caption}
                />}

            </div >
            {/* <!-- top header and banner with mobile menu section start --> */}

            {/* Get the Stats! include seven section start */}
            <div className="container-fluid" id="eventPage">

                <div className="row ti-row ti-blue-background games" id="">
                    <div className="limited-width">
                        <h2 className="">We've got the games they'll love!</h2>
                    </div>
                    <div className="row ti-row no-top-padding no-side-margin remove-overflow">
                        <div className="ti-slider-parents">

                            <GamesSlider />

                        </div>
                    </div>
                </div>
                <RequestInfo
                    content="Ready to host the event they'll never forget?"
                    classNameStyle="ti-light-blue-background"
                />
                <div className="row ti-row game-content">
                    <div className="limited-width">
                        <h2 className="orange-border ti-dark-blue-text">{eventDetails && eventDetails.event_name}</h2>
                        <div className="row">
                            <div className="col-md-12">
                                {eventDetails && <div dangerouslySetInnerHTML={{ __html: eventDetails.event_description }}></div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row ti-blue-background as-seen-banner mobile-wrap not-home">
                    <div className="limited-width">
                        <div className="as-seen-images as-seen-mobile">
                            <BrandLogo investors={investorsData} />
                        </div>
                        <div className="as-seen-images as-seen-desktop">
                            <BrandLogo investors={investorsData} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Get the Stats! include seven section end */}
            <Footer
                testimonials={testimonialsData}
                siteSettings={siteSettingData}
            />
        </>

    )
}

export default EventDetails

// export const getStaticPaths = async () => {
//     try {
//         const payload = { url: `${apiBaseUrl}/events/get-all-slug`, method: 'GET' }
//         let events = await fetchApi(payload);
//         events = events.data.slug
//         if (events && events.length > 0) {
//             const slugs = events.map(activity => activity.slug);
//             const paths = slugs.map(slug => ({ params: { slug } }));
//             // console.log("path!!!!!", paths)
//             return {
//                 paths,
//                 fallback: false
//             };
//         } else {
//             return { paths: [], fallback: false };
//         }
//     } catch (error) {
//         return { paths: [], fallback: false };
//     }

// };

export const getServerSideProps = async ({ params: { slug }, res }) => {
    try {
        res.setHeader(
            'Cache-Control',
            'public, s-maxage=10, stale-while-revalidate=59'
        )
        const payload = { url: `${apiBaseUrl}/events/event-details/${slug}`, method: 'GET' }
        const testimonialsPayload = { url: `${apiBaseUrl}/testimonials`, method: 'POST', data: { page_limit: 20, page_record: 1 } }
        const investorsPayload = { url: `${apiBaseUrl}/investors`, method: "POST", data: { page_limit: 20, page_record: 1 } };
        const siteSettingsPayload = { url: `${apiBaseUrl}/site-settings`, method: "GET", };

        const events = await fetchApi(payload); // call event-details API
        const testimonialsContent = await fetchApi(testimonialsPayload); // call testimonials API
        const investorsContent = await fetchApi(investorsPayload); // call investors API
        const siteSettingContent = await fetchApi(siteSettingsPayload); // call site setting API

        const eventsData = events.data
        const testimonialsData = testimonialsContent.data.testimonials;
        const investorsData = investorsContent.data.investors;
        const siteSettingData = siteSettingContent.data.settings;

        const { eventDetails } = eventsData
        return {
            props: {
                eventDetails,
                testimonialsData,
                investorsData,
                siteSettingData,
            },
        };
    } catch (error) {
        res.statusCode = 404
        return {
            props: {
                eventDetails: {}
            }
        }
    }

};


