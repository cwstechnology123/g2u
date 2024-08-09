import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import Image from 'next/image';
const OwlCarousel = dynamic(import('react-owl-carousel'), { ssr: false });
const options = {
    loop: true,
    nav: true,
    //navElement: 'div',
    startPosition: 0,
    navText:
        [
            '<div class="scroll-arrow left"></div>',
            '<div class="scroll-arrow right"></div>'
        ],
    dots: false,
    smartSpeed: 500,
    margin: 0,
    width: 0,
    autoplayHoverPause: true,
    autoplay: true,
    responsive: {
        0: {
            items: 2
        },
        300: {
            item: 3
        },
        576: {
            items: 3
        },
        768: {
            items: 3
        },
        1200: {
            items: 5
        }
    }
};

const BrandLogo = ({ investors }) => {
    const [display, setDisplay] = useState(false);
    if (investors && investors.length > 0) {
        display ? '' : setDisplay(true)
    }

    return (
        <>
            {
                display
                    ?
                    <OwlCarousel className="clients-slides owl-carousel owl-theme " {...options} >
                        {
                            investors && investors.length > 0
                                ?
                                investors.map(item => <div className="as-seen-img" key={item.id}><Image src={item.logo} alt={item.investor_name} width={200} height={200} blurDataURL="data:..." placeholder="blur" style={{
                                    width: '450px',
                                    height: 'auto',
                                  }} /></div>)
                                :
                                <div className="as-seen-img"> <p>No data found!</p></div>
                        }
                    </OwlCarousel>
                    :
                    null
            }
            {/* {
                investors && investors.length > 0
                    ?
                    investors.map(item => <div className="as-seen-img" key={item.id}><img src={item.logo} alt={item.investor_name} /></div>)
                    :
                    <div className="as-seen-img"> <p>No data found!</p></div>
            } */}

        </>

    )
}

export default BrandLogo