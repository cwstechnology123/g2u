import Image from "next/image"

const TopHomePageBanner = () => {
    return (
        <div className="row ti-row no-margin" id="topHomepageBanner">
            <div className="col-xs-12">
                <div className="row limited-width">
                    <div className="col-md-3 col-sm-12 col-ie-3">
                        <h2 className="ti-dark-blue-text">Experience the <br /> Mobile Entertainment <br />
                            <strong>REVOLUTION!</strong></h2>
                    </div>
                    <div className="col-md-3 col-sm-4 col-ie-3 border-orange-right">
                        <div><Image className="coaches-2x" src="/assets/img/coaches-2x.png" alt="coaches" width={58} height={58} /></div>
                        <p>Highly Trained Game <span className="ti-break-line">Coaches on Site</span></p>
                    </div>
                    <div className="col-md-3 col-sm-4 col-ie-3 border-orange-right">
                        <div><Image className="variety-2x" src="/assets/img/variety-2x.png" alt="variety" width={58} height={58} /></div>
                        <p>More games<span className="ti-break-line">than anyone anywhere</span></p>
                    </div>
                    <div className="col-md-3 col-sm-4 col-ie-3">
                        <div><Image className="smile-2x" src="/assets/img/smile-2x.png" alt="smile" width={58} height={58} /></div>
                        <p>Your Event Will Be a Hit <span className="ti-break-line"><strong>GUARANTEED!</strong></span>
                        </p></div>
                </div>
            </div>
        </div>
    )
}

export default TopHomePageBanner