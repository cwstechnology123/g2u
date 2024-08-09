import React, { useState } from 'react'
import Header from '@/components/_App/Header'
import { NextSeo } from 'next-seo';
import { apiBaseUrl, fetchApi } from "@/utils/fetchApi";
import Footer from '@/components/_App/Footer/Footer';

const faq = ({ faqData, testimonialsData, siteSettingData }) => {
  const [active, setActive] = useState(false)
  const [isItem, setIsItem] = useState(null)
  const SEO = {
    title: "Frequently Asked Questions | Games2U Mobile Entertainment",
    description: "Find answers to the most frequently asked question about Games2U, America's most trusted provider of mobile entertainment including video game trucks, laser tag equipment, human hamster balls, and more!",
    canonical: "https://www.g2u.com/faq",
    openGraph: {
      type: 'website',
      title: 'Frequently Asked Questions | Games2U Mobile Entertainment',
      description: "Find answers to the most frequently asked question about Games2U, America's most trusted provider of mobile entertainment including video game trucks, laser tag equipment, human hamster balls, and more!",
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

        <div className="row no-padding not-home faq-page" id="headerBanner">
          <div className="ti-page-header row clearfix">
            <div className="row ti-row">
              <div className="limited-width">
                <h1>FAQ</h1>
                <p>Answers to our most commonly asked questions</p>
              </div>
            </div>
          </div>
        </div>

      </div >
      {/* <!-- top header and banner with mobile menu section start --> */}

      {/* content section start */}
      <div className="container-fluid" id="faqParent">
        <div className="row" id="faqContent">
          <div className="limited-width">
            {
              faqData
                &&
                (faqData.length > 0) ?
                faqData.map(item => {
                  return (
                    <div onClick={() => { setIsItem(item); setActive(!active) }} className={`faq-container ${isItem == item && active ? 'active' : null}`}>
                      <h2>{item.question}</h2>
                      <p>{item.answer}</p>
                    </div>
                  )
                })
                :
                <div className='text-center'>
                  <p>No records found!</p>
                </div>
            }

          </div>
        </div>
      </div>

      {/* content section end */}

      <Footer
        testimonials={testimonialsData}
        siteSettings={siteSettingData}
      />
    </>)
}

export default faq

export async function getStaticProps() {
  try {
    const faqPayload = { url: `${apiBaseUrl}/faq`, method: 'POST', data: { page_limit: 20, page_record: 1 } }
    const testimonialsPayload = { url: `${apiBaseUrl}/testimonials`, method: 'POST', data: { page_limit: 20, page_record: 1 } }
    const siteSettingsPayload = { url: `${apiBaseUrl}/site-settings`, method: "GET", };

    const faqContent = await fetchApi(faqPayload); // call FAQ API
    const testimonialsContent = await fetchApi(testimonialsPayload); // call testimonials API
    const siteSettingContent = await fetchApi(siteSettingsPayload); // call investors API

    const faqData = faqContent.data.faq;
    const testimonialsData = testimonialsContent.data.testimonials;
    const siteSettingData = siteSettingContent.data.settings;

    return {
      props: {
        faqData,
        testimonialsData,
        siteSettingData,
      },
      revalidate: 10, // In seconds
    };
  } catch (error) {
    console.log('error in faq api call', error)
  }
}