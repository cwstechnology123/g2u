// import React, { useState, useEffect } from 'react';
// import { NextSeo } from 'next-seo';
// import Header from '@/components/_App/Header';
// import dynamic from 'next/dynamic';
// import CommonSlider from '@/components/_App/Slider';
// import GamesSlider from '@/components/_App/GamesSlider';
// import TopBanner from '@/components/GameDetails/TopBanner';
// const OwlCarousel = dynamic(import('react-owl-carousel'), { ssr: false });
// import { useRouter } from 'next/router';
// import { apiBaseUrl, fetchApi } from "@/utils/fetchApi";
// import Footer from '@/components/_App/Footer/Footer';
// import BrandLogo from '@/components/_App/BrandLogo';
// import ErrorPage from 'next/error';
// import useSWR from "swr";

// const options = {
//   loop: true,
//   nav: true,
//   navText:
//     [
//       '<div class="ti-left-slider slick-arrow" style="display: block;"><span class="ti-sprite blue-arrow-left"></span></div>',
//       '<div class="ti-right-slider slick-arrow" style="display: block;"><span class="ti-sprite blue-arrow-right"></span></div>'
//     ],
//   dots: false,
//   smartSpeed: 500,
//   //margin: 0,
//   autoWidth: false,
//   merge:true,
//   autoplayHoverPause: true,
//   autoplay: true,
//   responsive: {
//     0: {
//       items: 1
//     },
//     576: {
//       items: 1
//     },
//     768: {
//       items: 3
//     },
//     1200: {
//       items: 4
//     }
//   }
// };

// const GamesDetails = ({ activityDetails, testimonialsData, investorsData, siteSettingData }) => {
//   const router = useRouter();
//   if (!activityDetails.activity_name || Object.keys(activityDetails).length == 0) {
//     return <ErrorPage statusCode={404} withDarkMode={false} />
//   }

//   const { id, banner_image, icon, activity_name, activity_caption, activity_description, video, price_per_hour, min_age, max_age, min_participants, max_participants, } = activityDetails //extract data from activity detals

//   const fetcher = (url) => fetchApi({ url, method: 'GET' });
//   const { data, error, loading } = useSWR(`${apiBaseUrl}/games/slider-images/${id}`, fetcher);
//   const [display, setDisplay] = useState(false);
//   useEffect(() => {
//     setDisplay(true);
//   }, [])

//   const SEO = {
//     title: "Game Truck Video Games Parties | #1 Rated from Games2U",
//     description: "America's most trusted provider of video game trucks for birthday parties, school carnivals and fairs, summer camps, corporate team-building events and more!",
//     canonical: "https://www.g2u.com",
//     openGraph: {
//       type: 'website',
//       url: 'https://www.g2u.com/',
//       title: "Game Truck Video Games Parties | #1 Rated from Games2U",
//       description: "America's most trusted provider of video game trucks for birthday parties, school carnivals and fairs, summer camps, corporate team-building events and more!"
//       // images: [
//       //     {
//       //       url: '/images/banner-two/banner_main.jpg',
//       //       width: 800,
//       //       height: 600,
//       //       alt: 'Og Image Alt',
//       //     },
//       //     {
//       //       url: '/images/banner-two/banner_main.jpg',
//       //       width: 800,
//       //       height: 600,
//       //       alt: 'Og Image Alt 2',
//       //     },
//       //   ],
//     },
//     twitter: {
//       handle: '@g2u',
//       site: '@g2u',
//       cardType: 'summary_large_image'
//     },
//   }

//   return (
//     <>
//       <div className="modal" id="priceModal" tabIndex={-1} role="dialog">
//         <div className="modal-dialog modal-dialog-centered" role="document">
//           <div className="modal-content">
//             <div className="modal-body">
//               <p>Rate quoted is for weekday, off-peak, zero-travel, multiple-hour events. Other rates may be higher.</p>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
//             </div>
//           </div>{/* /.modal-content */}
//         </div>{/* /.modal-dialog */}
//       </div>{/* /.modal */}
//       <NextSeo {...SEO} />
//       {/* <!-- top header and banner with mobile menu section start --> */}
//       <div className="container-fluid">
//         {/* <!-- header section start with mobile naviagtion  --> */}
//         <Header siteSettings={siteSettingData} />
//         {/* <!-- header section end with mobile naviagtion  --> */}

//         {activityDetails && <TopBanner
//           banner={banner_image}
//           icon={icon}
//           title={activity_name}
//           caption={activity_caption}
//           video={video}
//         />}

//       </div >
//       {/* <!-- top header and banner with mobile menu section start --> */}

//       {/* Get the Stats! include seven section start */}
//       <div className="container-fluid" id="gamePage">
//         <div className="row ti-dark-orange-background ti-row ti-small-banner no-margin">
//           <div className="col-xs-12">
//             <h2>Ready to book the most epic video game truck party?</h2>
//             <a href="#footerContact" className="ti-yellow-button">Request Info</a>
//           </div>
//         </div>
//         <div className="row ti-row ti-orange-background ti-box-container">
//           <div className="limited-width">
//             <h2>Get the Stats! <p className="ti-white-text">Check out these stats to see if the Video Game Truck Party is a
//               great fit for your next event.</p>
//             </h2>
//             <div className="row ti-box-row">
//               <div className="ti-box">
//                 <img src="https://www.g2u.com/assets/img/ico-starting-price-2x.png" />
//                 <div>
//                   <h3 className="text-uppercase">Starting Price</h3>
//                   <p>as low as <strong> {price_per_hour && "$" + `${price_per_hour}`}</strong>
//                     per hour <button type="button" className="btn btn-link"><i className="fa fa-question-circle-o" data-toggle="modal" data-target="#priceModal" /></button>
//                   </p>
//                 </div>
//               </div>

//               <div className="ti-box-spacer" />
//               <div className="ti-box">
//                 <img src="/assets/img/ico-ages-2x.png" />
//                 <div>
//                   <h3 className="text-uppercase">Recommended Age Range</h3>
//                   <p><strong>{(min_age && max_age) ? (max_age > 40) ? `${min_age} & Older` : `${min_age} to ${max_age}` : null} </strong></p>
//                 </div>
//               </div>
//               <div className="ti-box-spacer" />
//               <div className="ti-box">
//                 <img src="/assets/img/ico-participants-2x.png" />
//                 <div>
//                   <h3 className="text-uppercase">Number of Participants</h3>
//                   <p><strong>{(min_participants && max_participants) ? `${min_participants} - ${max_participants} players at a time!` : null} </strong></p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row ti-row no-padding no-side-margin remove-overflow" id="tiImageSlider">
//           <div className="ti-slider-parents ti-slider-gallery">
//             {
//               (!loading && data && data.data?.slider_images != undefined && data.data?.slider_images != "")
//                 ?
//                 display ?
//                   <OwlCarousel className="clients-slides owl-carousel owl-theme " {...options} >
//                     <CommonSlider images={data.data.slider_images} />
//                   </OwlCarousel> : ''
//                 :
//                 null
//             }
//           </div>
//         </div>
//         <div className="row ti-row game-content">
//           <div className="limited-width">
//             <h2 className="orange-border ti-dark-blue-text">{activityDetails && activity_name}</h2>
//             <div className="row">
//               <div className="col-md-12">
//                 {activityDetails && <div dangerouslySetInnerHTML={{ __html: activity_description }}></div>}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row ti-blue-gradient-background ti-row ti-small-banner no-margin">
//           <div className="col-xs-12">
//             <h2>Sound like a perfect fit for your group?</h2>
//             <a href="#footerContact" className="ti-yellow-button">Request Info</a>
//           </div>
//         </div>
//         <div className="row" id="recentlyViewed">
//           <div className="limited-width">
//             <h2 className="orange-border ti-dark-blue-text">You May Also Enjoy</h2>
//           </div>
//           <div className="row ti-row no-top-padding no-side-margin remove-overflow">
//             <div className="ti-slider-parents">

//               <GamesSlider />

//             </div>
//           </div>
//         </div>
//         <div className="row ti-blue-background as-seen-banner mobile-wrap not-home">
//           <div className="limited-width">
//             <div className="as-seen-images as-seen-mobile">
//               <BrandLogo investors={investorsData} />
//             </div>
//             <div className="as-seen-images as-seen-desktop">
//               <BrandLogo investors={investorsData} />
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Get the Stats! include seven section end */}

//       <Footer
//         testimonials={testimonialsData}
//         siteSettings={siteSettingData}
//       />
//     </>

//   )
// }
const GamesDetails = () => {
  return(<></>)
}
export default GamesDetails

// export const getStaticPaths = async () => {
//   try {
//     const payload = { url: `${apiBaseUrl}/activity/get-all-slug`, method: 'GET' }
//     let activities = await fetchApi(payload);
//     activities = activities.data.slug
//     if (activities && activities.length > 0) {
//       const slugs = activities.map(activity => activity.slug);
//       const paths = slugs.map(slug => ({ params: { slug } }));
//       return {
//         paths,
//         fallback: false
//       };
//     } else {
//       return { paths: [], fallback: false };
//     }
//   } catch (error) {
//     return { paths: [], fallback: false };
//   }
// };

// export const getStaticProps = async ({ params: { slug } }) => {
//   try {
//     const payload = { url: `${apiBaseUrl}/activity/activity-details/${slug}`, method: 'GET' }
//     const testimonialsPayload = { url: `${apiBaseUrl}/testimonials`, method: 'POST', data: { page_limit: 20, page_record: 1 } }
//     const investorsPayload = { url: `${apiBaseUrl}/investors`, method: "POST", data: { page_limit: 20, page_record: 1 } };
//     const siteSettingsPayload = { url: `${apiBaseUrl}/site-settings`, method: "GET", };

//     const activities = await fetchApi(payload);
//     const testimonialsContent = await fetchApi(testimonialsPayload); // call testimonials API
//     const investorsContent = await fetchApi(investorsPayload); // call investors API
//     const siteSettingContent = await fetchApi(siteSettingsPayload); // call site setting API

//     const testimonialsData = testimonialsContent.data.testimonials;
//     const activitiesData = activities.data
//     const investorsData = investorsContent.data.investors;
//     const siteSettingData = siteSettingContent.data.settings;

//     const { activityDetails } = activitiesData
//     return {
//       props: {
//         activityDetails,
//         testimonialsData,
//         investorsData,
//         siteSettingData,
//       },
//       revalidate: 10,
//     };
//   } catch (error) {
//     console.log('error in detail api call', error)
//   }

// };


