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
                                            {/* {(!loading && games && games?.activities.list != undefined && games?.affiliate != undefined && games?.activities.list.length > 0)
                                                ?
                                                <li><Link href="/our-games">Our Games</Link>
                                                    <br /><br />
                                                    <ul className="sitemap">
                                                        {games.activities.list.map(item => <li><Link href={`/game/${item.slug}`} key={`game-cat-${item.id}`}>{item.activity_name}</Link></li>)}
                                                    </ul>
                                                </li>
                                                :
                                                null
                                            } */}

                                            {
                                                events && events.length > 0
                                                    ?
                                                    <li><Link href="/theg2udifference">The Games2U Difference</Link>
                                                        <br /><br />
                                                        <ul className="sitemap">
                                                            {
                                                                events.map(item => <li><Link href={`event/${item.slug}`} key={item.id}>{item.event_name}</Link></li>)
                                                            }


                                                        </ul>
                                                    </li>
                                                    :
                                                    null
                                            }

                                            <li><Link href="/corporate-events">Corporate Events</Link></li>
                                            <li><Link href="/about-us">About Us</Link></li>
                                            <li><Link href="/contact-us">Contact Us</Link></li>
                                            <li><Link href="/faq">Frequently Asked Questions</Link></li>
                                            <li><Link href="/franchise-information">Own a Franchise</Link></li>
                                            <li><Link href="/terms-of-use">Terms of Use</Link></li>
                                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                                            <li><Link href="/cancelation-policy">Our Cancelation Policy</Link></li>
                                            <li><Link href="/your-party-could-be-free">Your Party Could be Free!</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                                {/* <br /><br /> */}
                                {/* <ul className="sitemap">
                            <li><Link href="/austintexas"><b>Games2U Austin, Texas</b></Link>
                                <br /><br />
                                <ul className="sitemap">
                                    <li><Link href="/austintexas/ourgames">Our Games</Link>
                                        <br /><br />
                                        <ul className="sitemap">
                                            <li><Link href="/austintexas/game/videogametruck">Video Game Truck</Link></li>
                                            <li><Link href="/austintexas/game/lasertag">Laser Tag</Link></li>
                                            <li><Link href="/austintexas/game/hamsterball">Hamster Ball</Link></li>
                                            <li><Link href="/austintexas/game/hamsterballwracetrack">Hamster Ball with Race Track</Link></li>
                                            <li><Link href="/austintexas/game/bumperballs">Bumper Balls</Link></li>
                                            <li><Link href="/austintexas/game/bubblesoccer">Bubble Soccer</Link></li>
                                            <li><Link href="/austintexas/game/boogerwars">Booger Wars</Link></li>
                                            <li><Link href="/austintexas/game/foammachine">Foam Machine</Link></li>
                                            <li><Link href="/austintexas/game/bouncehouses">Bounce Houses</Link></li>
                                            <li><Link href="/austintexas/game/candycannon">Candy Cannon</Link></li>
                                            <li><Link href="/austintexas/game/socialphotobooth">Social Photo Booth</Link></li>
                                            <li><Link href="/austintexas/game/ulauncher">U:launcher</Link></li>
                                            <li><Link href="/austintexas/game/bungeejoust">Bungee Joust</Link></li>
                                            <li><Link href="/austintexas/game/gaga">Gaga</Link></li>
                                            <li><Link href="/austintexas/game/beatthebucket">Beat the Bucket</Link></li>
                                            <li><Link href="/austintexas/game/nerfwar">Nerf War</Link></li>
                                            <li><Link href="/austintexas/game/watertag">Water Tag</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="/austintexas/theg2udifference">The Games2U Difference</Link>
                                        <br /><br />
                                        <ul className="sitemap">
                                            <li><Link href="/austintexas/event/kidsparties">Kid's Parties</Link></li>
                                            <li><Link href="/austintexas/event/teenparties">Teen Parties</Link></li>
                                            <li><Link href="/austintexas/event/birthdayparties">Birthday Parties</Link></li>
                                            <li><Link href="/austintexas/event/graduationparties">Graduation Parties</Link></li>
                                            <li><Link href="/austintexas/event/barmitzvahsbatmitzvahs">Bar and Bat Mitzvahs</Link></li>
                                            <li><Link href="/austintexas/event/festivalsandcarnivals">Festivals and Carnivals</Link></li>
                                            <li><Link href="/austintexas/event/summercamps">Summer Camps</Link></li>
                                            <li><Link href="/austintexas/event/communityevents">Community Events</Link></li>
                                            <li><Link href="/austintexas/event/schoolfundraisers">School Fundraisers</Link></li>
                                            <li><Link href="/austintexas/event/churchfundraisers">Church Fundraisers</Link></li>
                                            <li><Link href="/austintexas/event/charityevents">Charity Events</Link></li>
                                            <li><Link href="/austintexas/event/companyparties">Company Parties</Link></li>
                                            <li><Link href="/austintexas/event/customeremployeeappreciation">Customer Appreciation</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="/austintexas/corporateevents">Corporate Events</Link></li>
                                </ul>
                            </li>
                            <li><Link href="/dallastexas"><b>Games2U Dallas, TX </b></Link>
                                <br /><br />
                                <ul className="sitemap">
                                    <li><Link href="/dallastexas/ourgames">Our Games</Link>
                                        <br /><br />
                                        <ul className="sitemap">
                                            <li><Link href="/dallastexas/game/videogametruck">Video Game Truck</Link></li>
                                            <li><Link href="/dallastexas/game/lasertag">Laser Tag</Link></li>
                                            <li><Link href="/dallastexas/game/hamsterball">Hamster Ball</Link></li>
                                            <li><Link href="/dallastexas/game/hamsterballwracetrack">Hamster Ball with Race Track</Link></li>
                                            <li><Link href="/dallastexas/game/bumperballs">Bumper Balls</Link></li>
                                            <li><Link href="/dallastexas/game/boogerwars">Booger Wars</Link></li>
                                            <li><Link href="/dallastexas/game/foammachine">Foam Machine</Link></li>
                                            <li><Link href="/dallastexas/game/candycannon">Candy Cannon</Link></li>
                                            <li><Link href="/dallastexas/game/socialphotobooth">Social Photo Booth</Link></li>
                                            <li><Link href="/dallastexas/game/ulauncher">U:launcher</Link></li>
                                            <li><Link href="/dallastexas/game/gaga">Gaga</Link></li>
                                            <li><Link href="/dallastexas/game/beatthebucket">Beat the Bucket</Link></li>
                                            <li><Link href="/dallastexas/game/nerfwar">Nerf War</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="/dallastexas/theg2udifference">The Games2U Difference</Link>
                                        <br /><br />
                                        <ul className="sitemap">
                                            <li><Link href="/dallastexas/event/kidsparties">Kid's Parties</Link></li>
                                            <li><Link href="/dallastexas/event/teenparties">Teen Parties</Link></li>
                                            <li><Link href="/dallastexas/event/birthdayparties">Birthday Parties</Link></li>
                                            <li><Link href="/dallastexas/event/graduationparties">Graduation Parties</Link></li>
                                            <li><Link href="/dallastexas/event/barmitzvahsbatmitzvahs">Bar and Bat Mitzvahs</Link></li>
                                            <li><Link href="/dallastexas/event/festivalsandcarnivals">Festivals and Carnivals</Link></li>
                                            <li><Link href="/dallastexas/event/summercamps">Summer Camps</Link></li>
                                            <li><Link href="/dallastexas/event/communityevents">Community Events</Link></li>
                                            <li><Link href="/dallastexas/event/schoolfundraisers">School Fundraisers</Link></li>
                                            <li><Link href="/dallastexas/event/churchfundraisers">Church Fundraisers</Link></li>
                                            <li><Link href="/dallastexas/event/charityevents">Charity Events</Link></li>
                                            <li><Link href="/dallastexas/event/companyparties">Company Parties</Link></li>
                                            <li><Link href="/dallastexas/event/customeremployeeappreciation">Customer Appreciation</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="/dallastexas/corporateevents">Corporate Events</Link></li>
                                </ul>
                            </li>
                            <li><Link href="/dcmarylandnorthernvirginia"><b>Games2U DC, Maryland, Virginia </b></Link>
                                <br /><br />
                                <ul className="sitemap">
                                    <li><Link href="/dcmarylandnorthernvirginia/ourgames">Our Games</Link>
                                        <br /><br />
                                        <ul className="sitemap">
                                            <li><Link href="/dcmarylandnorthernvirginia/game/videogametruck">Video Game Truck</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/game/lasertag">Laser Tag</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/game/hamsterball">Hamster Ball</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/game/hamsterballwracetrack">Hamster Ball with Race Track</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/game/bumperballs">Bumper Balls</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/game/bubblesoccer">Bubble Soccer</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/game/boogerwars">Booger Wars</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/game/foammachine">Foam Machine</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/game/bouncehouses">Bounce Houses</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/game/candycannon">Candy Cannon</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/game/ulauncher">U:launcher</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/game/gaga">Gaga</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="/dcmarylandnorthernvirginia/theg2udifference">The Games2U Difference</Link>
                                        <br /><br />
                                        <ul className="sitemap">
                                            <li><Link href="/dcmarylandnorthernvirginia/event/kidsparties">Kid's Parties</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/event/teenparties">Teen Parties</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/event/birthdayparties">Birthday Parties</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/event/graduationparties">Graduation Parties</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/event/barmitzvahsbatmitzvahs">Bar and Bat Mitzvahs</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/event/festivalsandcarnivals">Festivals and Carnivals</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/event/summercamps">Summer Camps</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/event/communityevents">Community Events</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/event/schoolfundraisers">School Fundraisers</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/event/churchfundraisers">Church Fundraisers</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/event/charityevents">Charity Events</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/event/companyparties">Company Parties</Link></li>
                                            <li><Link href="/dcmarylandnorthernvirginia/event/customeremployeeappreciation">Customer Appreciation</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="/dcmarylandnorthernvirginia/corporateevents">Corporate Events</Link></li>
                                </ul>
                            </li>
                            <li><Link href="/sanantoniotexas"><b>Games2U San Antonio, TX</b></Link>
                                <br /><br />
                                <ul className="sitemap">
                                    <li><Link href="/sanantoniotexas/ourgames">Our Games</Link>
                                        <br /><br />
                                        <ul className="sitemap">
                                            <li><Link href="/sanantoniotexas/game/videogametruck">Video Game Truck</Link></li>
                                            <li><Link href="/sanantoniotexas/game/lasertag">Laser Tag</Link></li>
                                            <li><Link href="/sanantoniotexas/game/hamsterballwracetrack">Hamster Ball with Race Track</Link></li>
                                            <li><Link href="/sanantoniotexas/game/boogerwars">Booger Wars</Link></li>
                                            <li><Link href="/sanantoniotexas/game/foammachine">Foam Machine</Link></li>
                                            <li><Link href="/sanantoniotexas/game/bouncehouses">Bounce Houses</Link></li>
                                            <li><Link href="/sanantoniotexas/game/candycannon">Candy Cannon</Link></li>
                                            <li><Link href="/sanantoniotexas/game/ulauncher">U:launcher</Link></li>
                                            <li><Link href="/sanantoniotexas/game/giantwaterslide">Giant Water Slide</Link></li>
                                            <li><Link href="/sanantoniotexas/game/obstaclecourse">Obstacle Course</Link></li>
                                            <li><Link href="/sanantoniotexas/game/bungeejoust">Bungee Joust</Link></li>
                                            <li><Link href="/sanantoniotexas/game/rockwall">Rock Wall</Link></li>
                                            <li><Link href="/sanantoniotexas/game/gaga">Gaga</Link></li>
                                            <li><Link href="/sanantoniotexas/game/beatthebucket">Beat the Bucket</Link></li>
                                            <li><Link href="/sanantoniotexas/game/videogamestation">Video Game Station</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="/sanantoniotexas/theg2udifference">The Games2U Difference</Link>
                                        <br /><br />
                                        <ul className="sitemap">
                                            <li><Link href="/sanantoniotexas/event/kidsparties">Kid's Parties</Link></li>
                                            <li><Link href="/sanantoniotexas/event/teenparties">Teen Parties</Link></li>
                                            <li><Link href="/sanantoniotexas/event/birthdayparties">Birthday Parties</Link></li>
                                            <li><Link href="/sanantoniotexas/event/graduationparties">Graduation Parties</Link></li>
                                            <li><Link href="/sanantoniotexas/event/barmitzvahsbatmitzvahs">Bar and Bat Mitzvahs</Link></li>
                                            <li><Link href="/sanantoniotexas/event/festivalsandcarnivals">Festivals and Carnivals</Link></li>
                                            <li><Link href="/sanantoniotexas/event/summercamps">Summer Camps</Link></li>
                                            <li><Link href="/sanantoniotexas/event/communityevents">Community Events</Link></li>
                                            <li><Link href="/sanantoniotexas/event/schoolfundraisers">School Fundraisers</Link></li>
                                            <li><Link href="/sanantoniotexas/event/churchfundraisers">Church Fundraisers</Link></li>
                                            <li><Link href="/sanantoniotexas/event/charityevents">Charity Events</Link></li>
                                            <li><Link href="/sanantoniotexas/event/companyparties">Company Parties</Link></li>
                                            <li><Link href="/sanantoniotexas/event/customeremployeeappreciation">Customer Appreciation</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="/sanantoniotexas/corporateevents">Corporate Events</Link></li>
                                </ul>
                            </li>
                            <li><Link href="/seattlewashington"><b>Games2U Seattle, WA</b></Link>
                                <br /><br />
                                <ul className="sitemap">
                                    <li><Link href="/seattlewashington/ourgames">Our Games</Link>
                                        <br /><br />
                                        <ul className="sitemap">
                                            <li><Link href="/seattlewashington/game/videogametruck">Video Game Truck</Link></li>
                                            <li><Link href="/seattlewashington/game/lasertag">Laser Tag</Link></li>
                                            <li><Link href="/seattlewashington/game/hamsterball">Hamster Ball</Link></li>
                                            <li><Link href="/seattlewashington/game/hamsterballwracetrack">Hamster Ball with Race Track</Link></li>
                                            <li><Link href="/seattlewashington/game/bubblesoccer">Bubble Soccer</Link></li>
                                            <li><Link href="/seattlewashington/game/boogerwars">Booger Wars</Link></li>
                                            <li><Link href="/seattlewashington/game/foammachine">Foam Machine</Link></li>
                                            <li><Link href="/seattlewashington/game/candycannon">Candy Cannon</Link></li>
                                            <li><Link href="/seattlewashington/game/ulauncher">U:launcher</Link></li>
                                            <li><Link href="/seattlewashington/game/beatthebucket">Beat the Bucket</Link></li>
                                            <li><Link href="/seattlewashington/game/megascreen">Mega Screen</Link></li>
                                            <li><Link href="/seattlewashington/game/videogamestation">Video Game Station</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="/seattlewashington/theg2udifference">The Games2U Difference</Link>
                                        <br /><br />
                                        <ul className="sitemap">
                                            <li><Link href="/seattlewashington/event/kidsparties">Kid's Parties</Link></li>
                                            <li><Link href="/seattlewashington/event/teenparties">Teen Parties</Link></li>
                                            <li><Link href="/seattlewashington/event/birthdayparties">Birthday Parties</Link></li>
                                            <li><Link href="/seattlewashington/event/graduationparties">Graduation Parties</Link></li>
                                            <li><Link href="/seattlewashington/event/barmitzvahsbatmitzvahs">Bar and Bat Mitzvahs</Link></li>
                                            <li><Link href="/seattlewashington/event/festivalsandcarnivals">Festivals and Carnivals</Link></li>
                                            <li><Link href="/seattlewashington/event/summercamps">Summer Camps</Link></li>
                                            <li><Link href="/seattlewashington/event/communityevents">Community Events</Link></li>
                                            <li><Link href="/seattlewashington/event/schoolfundraisers">School Fundraisers</Link></li>
                                            <li><Link href="/seattlewashington/event/churchfundraisers">Church Fundraisers</Link></li>
                                            <li><Link href="/seattlewashington/event/charityevents">Charity Events</Link></li>
                                            <li><Link href="/seattlewashington/event/companyparties">Company Parties</Link></li>
                                            <li><Link href="/seattlewashington/event/customeremployeeappreciation">Customer Appreciation</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="/seattlewashington/corporateevents">Corporate Events</Link></li>
                                </ul>
                            </li>
                        </ul> */}
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