import React, { useState } from 'react';
import GamesSlider from '../../GamesSlider';
import Link from 'next/link';
import BrandLogo from '../../BrandLogo';
import { apiBaseUrl, fetchApi } from "@/utils/fetchApi";
import LoadMoreButton from '@/components/LoadMoreButton';
import Image from 'next/image';

const Theg2udifferenceContent = ({ content, eventList: { events, pagination }, investors }) => {
    const [isLoading, setisLoading] = useState(false);
    const [loadingBtnText, setLoadingBtnText] = useState('Load More');
    const [page, setPage] = useState(pagination && pagination.next ? pagination.next : 1);
    const [eventsData, setEventsData] = useState(events);

    // function for get more events data
    const getMoreEvents = async () => {
        setisLoading(true)
        setLoadingBtnText('Loading...')
        const enevtPayload = { url: `${apiBaseUrl}/events`, method: 'POST', data: { page_limit: 15, page_record: page } }
        const response = await fetchApi(enevtPayload); // call event list API
        const responseData = response.data;
        //merging two arrays
        if (responseData && responseData.events != '' && responseData.events.length > 0) {
            setEventsData([...eventsData, ...responseData.events])
            setPage(responseData.pagination && responseData.pagination?.next)
            setisLoading(false)
            setLoadingBtnText('Load More')
        } else {
            setEventsData(eventsData)
            setisLoading(false)
            setLoadingBtnText('Load More')
        }
    };

    return (
        <>
            {/* content section start */}
            <div className="container-fluid" id="contentParent">
                <div className="row ti-row content-padding">
                    <div className="limited-width">
                        <div className="col-xs-12 default-container text-container">
                            <div className="col-sm-12 col-md-12">
                                {content && <div className="col-sm-12 col-md-12" dangerouslySetInnerHTML={{ __html: content }}></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* content section end */}
            {/* Perfect for Any Event! section start  */}
            <div className="container-fluid" id="allEventsParent">
                <div className="row ti-row ti-orange-background" id="anyEvent">
                    <div className="limited-width">
                        <h2>Perfect for Any Event!</h2>
                        <div className="row">
                            {
                                eventsData && (eventsData.length > 0)
                                    ?
                                    eventsData.map(item => {
                                        return (
                                            <Link className="col-md-4 col-sm-6" href={`event/${item.slug}`} key={item.id}>
                                                <div><Image src={`${item.icon}`} width={500} height={500} alt={item.slug} /></div>
                                                <div>{item.event_name}</div>
                                            </Link>
                                        )
                                    })
                                    :
                                    <div className='text-center'>
                                        <p>No records found!</p>
                                    </div>
                            }
                        </div>
                        {
                            (eventsData && pagination && (eventsData.length != pagination.total))
                                ?
                                <LoadMoreButton
                                    getMoreData={getMoreEvents}
                                    isLoading={isLoading}
                                    loadingBtnText={loadingBtnText}
                                />
                                : null
                        }

                    </div>
                </div>
                <div className="row ti-dark-orange-background ti-row ti-small-banner no-margin">
                    <div className="col-xs-12" id="testimonialContent">
                        <h2><strong>Book Today</strong> and be the Hero of Your Next Event!</h2>
                        <a href="#footerContact" className="ti-yellow-button">Request Info</a>
                    </div>
                </div>
                <div className="row" id="allEventsSlider">
                    <h2 className="blue-border ti-dark-blue-text">Games They'll Love!</h2>
                    <div className="row ti-row no-padding no-side-margin remove-overflow">
                        <div className="ti-slider-parents">
                            <GamesSlider />
                        </div>
                    </div>
                </div>
                <div className="row ti-blue-background as-seen-banner mobile-wrap not-home">
                    <div className="limited-width">
                        {/* <div className="scroll-arrow left" /> */}
                        <div className="as-seen-images as-seen-mobile">
                            <BrandLogo investors={investors} />
                        </div>
                        <div className="as-seen-images as-seen-desktop">
                            <BrandLogo investors={investors} />
                        </div>
                        {/* <div className="scroll-arrow right" /> */}
                    </div>
                </div>
            </div>
            {/* Perfect for Any Event! section end  */}

        </>
    )
}

export default Theg2udifferenceContent