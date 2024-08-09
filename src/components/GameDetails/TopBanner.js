import React, { useState } from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const TopBanner = ({ banner, icon, title, caption, video }) => {
    const [open, setOpen] = useState(false);
    const onCloseModal = () => setOpen(false);

    return (
        <>
            <div
                className="row no-padding not-home-additional content-banner"
                id="headerBanner"
                style={{
                    backgroundImage: `url(${banner && banner != '' ? banner : '/assets/img/game-banner.jpg'})`
                }}
            >
                <div className="ti-page-header row clearfix">
                    <div className="row ti-row">
                        <div className="limited-width">
                            <div className="text-center">
                                <img src={icon ? icon : "https://www.g2u.com/assets/img/ico-video-theater-2x.png"} />
                            </div>
                            <h1>{title}</h1>
                            <p>{caption}</p>
                            {
                                video && video != ''
                                    ?
                                    <div className="text-center padding-from">
                                        <button type='button' className="ti-yellow-button green-button video-trigger" data-video="https://www.g2u.com/assets/video/g2u-hamster-ball.mp4" onClick={() => setOpen(true)}><i className="fa fa-lg fa-play-circle-o" aria-hidden="true"></i> SEE IT IN ACTION!</button>
                                    </div>
                                    :
                                    null
                            }

                        </div>
                    </div>
                </div>
            </div>
            {
                open && <Modal
                    open={open}
                    onClose={onCloseModal}
                    closeOnOverlayClick={false}
                >
                    <div id="videoModal" style={{ display: 'block', cursor: 'pointer' }}>
                        <span id="videoModalClose" onClick={() => onCloseModal()}>Close X</span>
                        <video preload="preload" id="video" autoplay="autoplay" loop="loop" controls muted="muted" >
                            <source src={video} type="video/mp4" />
                        </video>
                    </div>

                </Modal>
            }

        </>

    )
}

export default TopBanner