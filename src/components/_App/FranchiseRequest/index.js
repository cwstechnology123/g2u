import React, { useState } from 'react'
import useGamesData from '@/states/stores/games-data';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import "yup-phone-lite";
import { apiBaseUrl, fetchApi } from "@/utils/fetchApi";

const FranchiseReqSchema = Yup.object().shape({
    first_name: Yup.string().required('Please enter your first name.'),
    last_name: Yup.string().required('Please enter your last name.'),
    phone_number: Yup.string()
        .phone("US", "Please enter a valid phone number.")
        .required("A phone number is required."),
    email: Yup.string().email('Please enter valid email.').required('Please enter your email.'),
    hear_form: Yup.string().required("Select option field is required."),
    comments: Yup.string().required('Please enter your comment.'),
    acceptTerms: Yup.bool()
        .oneOf([true], 'Accept Ts & Cs is required')
})

const FranchiseRequest = ({ investors }) => {
    const [showSuccessMsg, setShowSuccessMsg] = useState(false)
    const [submitBtnText, setSubmitBtnText] = useState("Contact Us Now!")
    const [isLoader, setIsLoader] = useState(false)
    const { zipcode, games, loading, error } = useGamesData();

    const FranchiseReqFormOptions = { resolver: yupResolver(FranchiseReqSchema) }
    const { register, setValue, formState: { errors, isSubmitting }, handleSubmit, reset } = useForm(FranchiseReqFormOptions);
    //submit handler
    // console.log("errors", errors)
    const onSubmit = async formValue => {
        formValue.affiliate_id = games.affiliate.id
        setIsLoader(true)
        setSubmitBtnText("Submiting...")
        delete formValue.acceptTerms // delete acceptTerms key
        delete formValue.hear_form // delete acceptTerms key
        console.log("formValue", formValue)
        try {
            const payload = { url: `${apiBaseUrl}/franchise/request-info`, method: 'POST', data: formValue }
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
        setSubmitBtnText("Contact Us Now!")
    }
    const handleSuccess = (msg) => {
        reset(); // reset the form values
        setShowSuccessMsg(true) // show success message div
        setSubmitBtnText("Contact Us Now!") // change submit btn text
        setTimeout(() => {
            setShowSuccessMsg(false)
        }, 5000)
    }

    return (
        <div className="row" id="alternativeContact">
            <div className="limited-width">
                <div id="divFormFranchiseEnquiry">
                    <div className="col-md-5">
                        <h2>Request Information About G2U Franchise Opportunities</h2>
                    </div>
                    {
                        showSuccessMsg
                            ?
                            <div id="divFranchiseEnquirySuccess">
                                <h3 id="text-white">Thanks!</h3>
                                <p id="text-white">Your request has been sent. A member of our team will contact you shortly to help you organize you event<br /><br />You can also reach us at 1-800-71-GAMES from 9am - 6pm.</p>
                            </div>
                            :
                            <div className="col-md-7" id="footerContact">
                                <form id="" name="frmFranchiseEnquiry" onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                                    <div className="row">
                                        <div className="ti-input col-sm-6 required">
                                            <input
                                                {...register("first_name")}
                                                className={`form-control ${errors.first_name ? 'is-invalid' : 'is-valid'} `}
                                                placeholder='First Name *'
                                                id="firstname"
                                                type="text"
                                            />
                                            <span style={{ color: 'red' }}>{errors.first_name?.message}</span>
                                            <span className={`ti-sprite ${errors.first_name ? 'input-error-icon' : ''}`}></span>
                                        </div>
                                        <div className="ti-input col-sm-6 required">
                                            <input
                                                {...register("last_name")}
                                                className={`form-control ${errors.last_name ? 'is-invalid' : 'is-valid'} `}
                                                placeholder='Last Name *'
                                                id="lastname"
                                                type="text"
                                            />
                                            <span style={{ color: 'red' }}>{errors.last_name?.message}</span>
                                            <span className={`ti-sprite ${errors.last_name ? 'input-error-icon' : ''}`}></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="ti-input col-sm-6 required">
                                            <input
                                                {...register("phone_number")}
                                                className={`form-control ${errors.phone_number ? 'is-invalid' : 'is-valid'} `}
                                                placeholder='Your Phone Number *'
                                                id="phoneNumber"
                                                type="tel"
                                                name="phone_number"
                                                onKeyUp={(e) => {
                                                    let val = e.target.value;
                                                    e.target.value = val.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                                                }}
                                            />
                                            <span style={{ color: 'red' }}>{errors.phone_number?.message}</span>
                                            <span className={`ti-sprite ${errors.phone_number ? 'input-error-icon' : ''}`}></span>
                                        </div>
                                        <div className="ti-input col-sm-6 required">
                                            <input
                                                {...register("email")}
                                                className={`form-control ${errors.email ? 'is-invalid' : 'is-valid'} `}
                                                placeholder='Email Address *'
                                                id="email"
                                                type="email"
                                                name="email"
                                            />
                                            <span style={{ color: 'red' }}>{errors.email?.message}</span>
                                            <span className={`ti-sprite ${errors.email ? 'input-error-icon' : ''}`}></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="ti-input col-xs-12 required">
                                            <select id="hearAboutUs" className="inactive" {...register("hear_form")}>
                                                <option value="">Please Select option</option>
                                                <option value="How did you hear about us?">How did you hear about us?*</option>
                                            </select>
                                            <span className="ti-sprite select-arrows" />
                                            <span style={{ color: 'red' }}>{errors.hear_form?.message}</span>
                                            {/* <span className={`ti-sprite ${errors.hear_form ? 'input-error-icon' : ''}`}></span> */}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="ti-textarea col-xs-12 required">
                                            <textarea
                                                {...register("comments")}
                                                className={`form-control ${errors.comments ? 'is-invalid' : 'is-valid'} `}
                                                placeholder='Comment *'
                                                rows={4}
                                                id="comments"
                                                name="comments"
                                                defaultValue={""}
                                            />
                                            <span style={{ color: 'red' }}>{errors.comments?.message}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="checkbox-parent">
                                            <input
                                                name="acceptTerms"
                                                type="checkbox"
                                                {...register('acceptTerms')}
                                                id="userUnderstands"
                                                className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
                                            />

                                        </div>
                                        <div className="checkbox-text">I understand that this is not a contract and supplying or completing this form incurs no obligation on either party.
                                            <div style={{ color: 'red' }}>{errors.acceptTerms?.message}</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <div className="button-parent">
                                                <button type="submit" className="ti-yellow-button">Contact Us Now!</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="privacy-parent">
                                            <p><span className="ti-sprite lock-icon" /> Your privacy is our top priority. All submissions are confidential.</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                    }

                </div>
                {
                    !showSuccessMsg
                        ?
                        <div className="ti-bottom">
                            <div className="as-seen-banner franchise-banner clearfix">
                                <div className="col-xs-12 col-sm-3 col-md-12 col-lg-6 as-seen-franchise-title-container"><div className="as-seen-franchise-title">As Seen On:</div></div>

                                {
                                    investors && investors.length > 0
                                        ?
                                        investors.map(item => {
                                            return (
                                                <div className="col-xs-6 col-sm-3 col-md-6 col-lg-6" key={item.id}>
                                                    <span className="space-helper" />
                                                    <img src={item.logo} alt={item.investor_name} />)
                                                </div>
                                            )
                                        })

                                        :
                                        <p>No data found!</p>
                                }
                            </div>
                        </div>
                        :
                        null
                }

            </div>
        </div >

    )
}

export default FranchiseRequest