import Image from "next/image";

const GamesForEveryOne = ({ heading, description }) => {
    return (
        <div className="row something-for-everyone no-margin no-padding">
            <div className="col-xs-12 no-padding">
                <div className="row limited-width" id="somethingForEveryone">
                    <div className="col-sm-6 col-xs-9 col-ie-6 top-index">
                        <h2>{heading && heading}</h2>
                        <div className="ti-row-top" dangerouslySetInnerHTML={{ __html: description }}></div>
                        <a href="#footerContact" className="hidden-xs ti-yellow-button">Request Info</a>
                    </div>
                    <div className="col-xs-6 excited-kid-parent">
                        <div className="excited-kid" >
                            <Image src="/assets/img/excited-kid-2x.png" width={500} height={500} style={{ backgroundSize: 'cover', height: '100%', width: '100%', position: 'absolute', bottom: 0, right: 0 }} alt="excited-kid" />
                        </div>
                    </div>
                    <div className="visible-xs col-xs-12 text-center"><a href="#footerContact" className="ti-yellow-button">Request Info</a></div>
                </div>
            </div>
        </div>
    )
}

export default GamesForEveryOne