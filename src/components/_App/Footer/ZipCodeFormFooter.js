import React, { useState } from 'react'
import useGamesData from '@/states/stores/games-data';
import Map from '../../Map';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import "yup-phone-lite";
import { apiBaseUrl, fetchApi } from "@/utils/fetchApi";

const BookanEventSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your name.'),
    email: Yup.string().email('Please enter valid email.').required('Please enter your email.'),
    phone_number: Yup.string()
        .phone("US", "Please enter a valid phone number")
        .required("A phone number is required"),
    zipcode: Yup.string().required('Please enter zip code.'),
})

const ZipCodeFormFooter = ({ phoneNumberLabel }) => {
    const [showSuccessMsg, setShowSuccessMsg] = useState(false)
    const [submitBtnText, setSubmitBtnText] = useState("Submit Query")
    const [isLoader, setIsLoader] = useState(false)
    const { zipcode, games, loading, error } = useGamesData();
    //const address = '1600 Amphitheatre Parkway, Mountain View, CA';
    //const address = "00501"

    const bookAnEventFormOptions = { resolver: yupResolver(BookanEventSchema) }
    const { register, setValue, formState: { errors, isSubmitting }, handleSubmit, reset } = useForm(bookAnEventFormOptions);
    //submit handler
    const onSubmit = async formValue => {
        formValue.affiliate_id = games.affiliate.id
        formValue.zipcode = games.affiliate.zipcode
        setIsLoader(true)
        setSubmitBtnText("Submiting...")
        try {
            const payload = { url: `${apiBaseUrl}/games/request-info`, method: 'POST', data: formValue }
            const res = await fetchApi(payload)
            setIsLoader(false)
            if (res && res.type == 'error') handleError(res.message)
            if (res && res.type == 'success') handleSuccess(res.message)
        } catch (error) {
            setIsLoader(false)
            handleError('Something went wrong! Please try again.')
            return false;
        };

    }

    const handleError = (msg) => {
        setSubmitBtnText("Submit Query")
    }
    const handleSuccess = (msg) => {
        reset(); // reset the form values
        setShowSuccessMsg(true) // show success message div
        setSubmitBtnText("Submit Query") // change submit btn text
        setTimeout(() => {
            setShowSuccessMsg(false)
        }, 5000)
    }
    // if (!loading && games && games.affiliate != undefined && zipcode != '0000') {
    //     setValue('zipcode', zipcode)
    // }

    return (
        <>
            {
                (!loading && games && games.affiliate != undefined && zipcode != '0000')
                    ?
                    <div id="mapAndContact" className="row">
                        <div className="google-maps">
                            {/* <div id="map" /> */}
                            <Map address={games.affiliate.zipcode} />
                        </div>
                        <div className="col-md-5 pull-right" id="footerContact">
                            <a name="frmBookEvent" />
                            <div id="divFrmRequestUpdateZip" className="hide">
                                <p>&nbsp;</p>
                                <p>&nbsp;</p>
                                <p>&nbsp;</p>
                                <form id="frmLocRequestInfo" name="frmLocRequestInfo" method="post" action="/#frmBookEvent">
                                    <p>Present zip: 78737<br />
                                        Present location: Austin &amp; Surrounding
                                    </p>
                                    <input type="hidden" id="franchiseNameFrm" name="franchiseName" defaultValue />
                                    <div className="ti-input">
                                        <label htmlFor="frmRequestInfoZip">Enter New Zip Code</label>
                                        <input type="tel" id="frmRequestInfoZip" name="frmRequestInfoZip" />
                                    </div>
                                    <div className="ti-input ti-input-btn">
                                        <input id="btnUpdateZip" name="btnUpdateZip" type="submit" defaultValue="Update Zip" className="ti-yellow-button" />
                                    </div>
                                </form>
                            </div>

                            {
                                showSuccessMsg
                                    ?
                                    <div id="divBookEventSuccess">
                                        <p>&nbsp;</p>
                                        <p>&nbsp;</p>
                                        <p>&nbsp;</p>
                                        <h3>Thanks!</h3>
                                        <p>Your request has been sent. A member of our team will contact you shortly to help you organize your event.<br /><br />You can also reach us at {phoneNumberLabel ? phoneNumberLabel : "1-800-71"}-GAMES from 9am - 6pm.</p>
                                    </div>
                                    :
                                    <div id="divFrmBookEvent">
                                        <h3>Book Your Event!</h3>
                                        <p>Call us today at
                                            <span className="ti-orange-text"><strong> {phoneNumberLabel ? phoneNumberLabel : "1-800-71"}-GAMES </strong></span>
                                            to book your event today or submit the form below and one of our friendly event planners will be in touch shortly.</p>
                                        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                                            <div className="ti-input  col-xs-12 required">
                                                <input {...register("name")} type="text" className={`form-control ${errors.name ? 'is-invalid' : 'is-valid'} `} placeholder='Your Name' />
                                                <span style={{ color: 'red' }}>{errors.name?.message}</span>
                                                <span className={`ti-sprite ${errors.name ? 'input-error-icon' : ''}`}></span>
                                            </div>
                                            <div className="ti-input col-xs-12 required">
                                                <input {...register("email")} type="email" className={`form-control ${errors.email ? 'is-invalid' : 'is-valid'} `} placeholder='Your email address' />
                                                <span style={{ color: 'red' }}>{errors.email?.message}</span>
                                                <span className={`ti-sprite ${errors.email ? 'input-error-icon' : ''}`}></span>
                                            </div>
                                            <div className="ti-input col-md-6 col-xs-12 required">
                                                <input
                                                    {...register("phone_number")}
                                                    className={`form-control ${errors.phone_number ? 'is-invalid' : 'is-valid'} `}
                                                    type="tel"
                                                    maxLength={14}
                                                    placeholder='(213) 213-1312'
                                                    id="phone"
                                                    onKeyUp={(e) => {
                                                        let val = e.target.value;
                                                        e.target.value = val.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                                                    }}
                                                />
                                                <span style={{ color: 'red' }}>{errors.phone_number?.message}</span>
                                                <span className={`ti-sprite ${errors.phone_number ? 'input-error-icon' : ''}`}></span>
                                            </div>
                                            <div className="ti-input col-md-6 col-xs-12 required">
                                                <input {...register("zipcode")} type="text" defaultValue={zipcode} className="jsFrmZipcode form-control" data-ov={zipcode} placeholder='Zip Code' readOnly />
                                                <span style={{ color: 'red' }}>{errors.zipcode?.message}</span>
                                                <span className={`ti-sprite ${errors.zipcode ? 'input-error-icon' : ''}`}></span>
                                            </div>
                                            <div className="ti-textarea col-xs-12">
                                                <textarea className='form-control' {...register("about_event")} rows={4} placeholder='Tell us more about your event' />
                                            </div>
                                            <input id="btnBook" name="btnBook" type="submit" defaultValue="Request Info" className="ti-yellow-button pull-right" disabled={isSubmitting} />
                                        </form>
                                    </div>
                            }
                        </div>
                    </div>

                    :
                    <div className="row no-zipcode" id="mapAndContact">
                        <div className="col-md-5 pull-right" id="footerContact">
                            <h3>Find a Location to Book Your Event!</h3>
                            <p>Call us today at
                                <strong><span className="ti-orange-text">{phoneNumberLabel ? phoneNumberLabel : "1-800-71"}-GAMES</span></strong> or enter your ZIP Code below
                                to find a location near you.
                            </p>
                            <form method="post" id="frmFooterZip" name="frmFooterZip" action="/">
                                <input type="hidden" id="franchiseNameFooter" name="franchiseName" defaultValue />
                                <div className="ti-input col-xs-12">
                                    <label htmlFor="footerZipcode">Enter Your ZIP Code</label>
                                    <input type="tel" id="footerZipcode" />
                                    <button id="btnFooter" type='button' className="ti-yellow-button pull-right">GO!</button>
                                </div>
                            </form>
                        </div>
                    </div>
            }
        </>
    )
}

export default ZipCodeFormFooter