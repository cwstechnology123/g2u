import React from 'react'
import Header from '@/components/_App/Header'
import { NextSeo } from 'next-seo';
import { apiBaseUrl, fetchApi } from "@/utils/fetchApi";
import FranchiseFooter from '@/components/_App/FooterForFranchise/FranchiseFooter';


const franchiseinformation = ({ page_name, content, page_caption, banner_img, head_title, head_description, bottom_title, bottom_caption, service_one, service_two, service_three, title_after_service, meta_title, meta_description, testimonialsData, investorsData, siteSettingData }) => {
  const SEO = {
    title: meta_title && meta_title != '' ? meta_title : "Own a Franchise | Franchises Available Nationwide | Games2U",
    description: meta_description && meta_description != '' ? meta_description : "Information on opening a new franchise of America's most trusted provider of mobile entertainment including video game trucks, laser tag equipment, human hamster balls, and more!",
    canonical: "https://www.g2u.com/franchise-information",
    openGraph: {
      type: 'website',
      title: meta_title && meta_title != '' ? meta_title : 'Own a Franchise | Franchises Available Nationwide | Games2U',
      description: meta_description && meta_description != '' ? meta_description : "Information on opening a new franchise of America's most trusted provider of mobile entertainment including video game trucks, laser tag equipment, human hamster balls, and more!",
      url: 'https://www.g2u.com',
      // images: [
      //   {
      //     url: `${assetsURL}${metaImage}`,
      //     width: 800,
      //     height: 600,
      //     alt: 'Og Image Alt',
      //   }
      // ],
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
        <div className="row no-padding not-home-additional content-banner franchise-page" id="headerBanner"
          style={{
            backgroundImage: `url(${banner_img && banner_img != '' ? banner_img : 'assets/img/allevents-banner.jpg'})`
          }}
        >
          <div className="ti-page-header row clearfix">
            <div className="row ti-row">
              <div className="limited-width">
                <h1>{page_name && page_name}</h1>
                <p>{page_caption && page_caption}</p>
                {/* <div>
                  <div className="text-center">
                    <a className="ti-seven-wide ti-white-box" href="#">What's New?</a>
                    <a className="ti-seven-wide ti-white-box" href="#">G2U Equipment</a>
                    <a className="ti-seven-wide ti-white-box" href="#">G2U Products</a>
                    <a className="ti-seven-wide ti-white-box" href="#">Why Buy?</a>
                    <a className="ti-seven-wide ti-white-box" href="#">Support</a>
                    <a className="ti-seven-wide ti-white-box" href="#">Ownership Process</a>
                    <a className="ti-seven-wide ti-white-box" href="#">FAQ</a>
                  </div>
                  <div className="ti-input visible-xs">
                    <select>
                      <option disabled selected>Franchise Information</option>
                      <option>What's New?</option>
                      <option>G2U Equipment</option>
                      <option>G2U Produts</option>
                      <option>Why Buy?</option>
                      <option>Support</option>
                      <option>Ownership Process</option>
                      <option>FAQ</option>
                    </select>
                    <span className="ti-sprite select-arrows" />
                  </div>
                </div> */}

              </div>
            </div>
          </div>
        </div>
      </div >
      {/* <!-- top header and banner with mobile menu section start --> */}

      {/* content section start */}
      <div className="container-fluid" id="franchiseParent">
        <div className="row ti-row limited-width" id="floatingBanner">
          <div className="banner-row first">
            <h2 className="no-border">The Games2U Difference:</h2>
          </div>
          <div className="banner-row">
            <span className="ti-break-line"><img src="https://www.g2u.com/assets/img/ico-global-2x.png" /></span>
            <p>Opportunities Worldwide</p>
          </div>
          <div className="banner-row">
            <span className="ti-break-line"><img src="https://www.g2u.com/assets/img/ico-moneybag-2x.png" /></span>
            <p>Tremendous Earning Potential</p>
          </div>
          <div className="banner-row">
            <span className="ti-break-line"><img src="https://www.g2u.com/assets/img/ico-arrows-2x.png" /></span>
            <p>Easy Expansion Opportunities</p>
          </div>
        </div>
        <div className="row ti-row content-padding" id="franchiseContent">
          <div className="limited-width">
            <div className="col-xs-12">
              <h2 className="ti-dark-blue-text orange-border hidden-lg hidden-md">{head_title && head_title}</h2>
              <div className="col-md-6 col-sm-6">
                <h2 className="ti-dark-blue-text orange-border hidden-sm hidden-xs">{head_title && head_title}</h2>

                {head_description && <div className="franchise-text" dangerouslySetInnerHTML={{ __html: head_description }}></div>}

              </div>
              <div className="col-sm-6">
                <div style={{ width: '100%', paddingTop: '56.25%', background: '#333', position: 'relative' }}>
                  <div style={{ position: 'absolute', color: '#fff', top: '50%', transform: 'translateY(-50%)', left: 0, right: 0, textAlign: 'center' }}>
                    <img src={`${banner_img && banner_img != '' ? banner_img : 'assets/img/allevents-banner.jpg'}`} alt="franchise-image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row franchise-banner ti-row ti-small-banner no-margin">
          <div className="col-xs-12">
            <h2><strong>Interested in owning a franchise of your own?</strong></h2>
            <a href="#footerContact" className="ti-yellow-button">Send Me Information!</a>
          </div>
        </div>
        <div className="row ti-row ti-orange-background content-padding">
          <div className="limited-width">
            <div className="col-xs-12">
              <h2>{bottom_title && bottom_title} <span className="ti-white-text">{bottom_caption && bottom_caption}</span></h2>
              <div className="row ti-box-row">
                <div className="ti-box">
                  <img src="https://www.g2u.com/assets/img/ico-development-2x.png" />
                  <div>
                    {service_one && <div dangerouslySetInnerHTML={{ __html: service_one }}></div>}
                  </div>
                </div>
                <div className="ti-box-spacer" />
                <div className="ti-box">
                  <img src="https://www.g2u.com/assets/img/ico-training-2x.png" />
                  <div>
                    {service_two && <div dangerouslySetInnerHTML={{ __html: service_two }}></div>}
                  </div>
                </div>
                <div className="ti-box-spacer" />
                <div className="ti-box">
                  <img src="https://www.g2u.com/assets/img/ico-marketing-2x.png" />
                  <div>
                    {service_three && <div dangerouslySetInnerHTML={{ __html: service_three }}></div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row franchise-banner-orange ti-banner-two-col ti-row ti-small-banner no-margin">
          <div className="col-xs-12">
            <h2>Interested in learning more about opening a franchise of your own?</h2>
            <a href="#footerContact" className="ti-yellow-button">Send Me Information!</a>
          </div>
        </div>
        <div className="row ti-row content-padding">
          <div className="limited-width">
            <div className="col-xs-12">
              <h2 className="orange-border ti-dark-blue-text">{title_after_service && title_after_service}</h2>
              <div className="col-sm-12 col-md-12 franchise-text">

                {content && <div dangerouslySetInnerHTML={{ __html: content }}></div>}

              </div>
            </div>
          </div>
        </div>
        <div className="row franchise-banner visible-xs visible-sm ti-row ti-small-banner no-margin">
          <div className="col-xs-12">
            <h2><strong>Interested in owning a franchise of your own?</strong></h2>
            <a href="#footerContact" className="ti-yellow-button">Send Me Information!</a>
          </div>
        </div>
      </div >

      {/* content section end */}

      < FranchiseFooter
        testimonials={testimonialsData}
        investors={investorsData}
        siteSettings={siteSettingData}
      />
    </>
  )
}

export default franchiseinformation

export async function getStaticProps() {
  try {
    const ownFranchisepayload = { url: `${apiBaseUrl}/content/own-a-franchise`, method: 'GET' }
    const testimonialsPayload = { url: `${apiBaseUrl}/testimonials`, method: 'POST', data: { page_limit: 20, page_record: 1 } }
    const investorsPayload = { url: `${apiBaseUrl}/investors`, method: "POST", data: { page_limit: 20, page_record: 1 } };
    const siteSettingsPayload = { url: `${apiBaseUrl}/site-settings`, method: "GET", };

    const ownFranchiseContent = await fetchApi(ownFranchisepayload); // call own-a-franchise API
    const testimonialsContent = await fetchApi(testimonialsPayload); // call testimonials API
    const investorsContent = await fetchApi(investorsPayload); // call investors API
    const siteSettingContent = await fetchApi(siteSettingsPayload); // call investors API

    const ownFranchiseData = ownFranchiseContent.data.content;
    const testimonialsData = testimonialsContent.data.testimonials;
    const investorsData = investorsContent.data.investors;
    const siteSettingData = siteSettingContent.data.settings;

    const { page_name, content, page_caption, banner_img, head_title, head_description, bottom_title, bottom_caption, service_one, service_two, service_three, title_after_service, meta_title, meta_description } = ownFranchiseData
    return {
      props: {
        page_name,
        content,
        page_caption,
        banner_img,
        head_title,
        head_description,
        bottom_title,
        bottom_caption,
        service_one,
        service_two,
        service_three,
        title_after_service,
        meta_title,
        meta_description,
        testimonialsData,
        investorsData,
        siteSettingData,
      },
      revalidate: 10, // In seconds
    };
  } catch (error) {
    console.log('error in testimonials api call', error)
  }
}