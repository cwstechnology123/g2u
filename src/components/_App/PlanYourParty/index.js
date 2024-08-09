import Image from "next/image"

const PlanYourParty = ({ siteSettings, planningYourParty }) => {
    return (
        <div className="row ti-blue-background ti-row-top no-margin" id="planYourParty">
            <div className="col-xs-12">
                <div className="row limited-width">
                    <div className="col-md-6">
                        {planningYourParty && planningYourParty.page_name != '' ? <h2>{planningYourParty.page_name} <span className="force-break">1, 2, 3!</span></h2> : null}

                        <div className="row ti-row-top">
                            {planningYourParty && <div className="col-lg-11 col-sm-10 col-xs-12 col-ie-10" dangerouslySetInnerHTML={{ __html: planningYourParty.content }}></div>}

                        </div>
                       

                        {/* <div className="row ti-row-top">
                            <div className="col-lg-1 col-sm-2 col-xs-12 col-ie-2">
                                <Image src="/assets/img/one-2x.png" alt="one-2x" width={40} height={40} />
                            </div>
                            <div className="col-lg-11 col-sm-10 col-xs-12 col-ie-10">
                                <h3>Choose Your Activities</h3>
                                <p>Games2U offers fully-mobile, on-site entertainment and more than a dozen exhilarating
                                    activities including Video Game Trucks, Giant Human Hamster Balls, Laser Tag, and so
                                    much more!</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-1 col-sm-2 col-xs-12 col-ie-2">
                                <Image src="/assets/img/two-2x.png" alt="two-2x" width={40} height={40} />
                            </div>
                            <div className="col-lg-11 col-sm-10 col-xs-12 col-ie-10">
                                <h3>Schedule Your Party</h3>
                                <p>Call us toll-free at <a href={`tel:${siteSettings?.phone ?? "18007142637"}`} className="linkOnBlue">1-800-71-GAMES</a>
                                    or <a href="#footerContact" className="linkOnBlue">Click Here</a> to request more
                                    information. We can help you plan the perfect event and
                                    we're experts in entertaining groups of any size and people of every age!</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-1 col-sm-2 col-xs-12 col-ie-2">
                                <Image src="/assets/img/three-2x.png" alt="three-2x" width={40} height={40} />
                            </div>
                            <div className="col-lg-11 col-sm-10 col-xs-12 col-ie-10">
                                <h3>RELAX! We'll Handle the Rest</h3>
                                <p>We'll show up on time. Set-up all of the equipment. Provide an experience your guests
                                    will never forget. And we'll clean up and disappear when we're done. Sound easy? It
                                    is.</p>
                            </div>
                        </div> */}
                    </div>
                    <div className="col-sm-6 excited-woman-parent">
                        <div className="excited-woman">
                            {/* Large Girl Image */}
                            {
                                planningYourParty && planningYourParty.banner_img != ''
                                    ?
                                    <Image src={planningYourParty.banner_img} width={500} height={500} style={{ backgroundSize: 'cover', height: '100%', width: '100%', position: 'absolute', bottom: 0, right: 0 }} alt="excited-woman" />
                                    :
                                    <Image src="/assets/img/cheering-woman-2x.png" width={500} height={500} style={{ backgroundSize: 'cover', height: '100%', width: '100%', position: 'absolute', bottom: 0, right: 0 }} alt="excited-woman" />
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanYourParty