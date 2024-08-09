import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import useGamesData from '@/states/stores/games-data';
import { useRouter } from 'next/router'

const modalSchema = Yup.object().shape({
    zipcode: Yup.string().matches(/^[0-9]{5}$/, 'Zip code must be 5 digits.'),
})

const FindLocation = () => {
    const currentYear = new Date().getFullYear()
    const router = useRouter()
    const [changeLocation, setChangeLocation] = useState(false)
    const [zipCodeServiceStaus, setZipCodeServiceStaus] = useState('Enter your zip code.')
    const { zipcode, setZipcode, games, loading, error, updateGamesData } = useGamesData();

    const modalFormOptions = { resolver: yupResolver(modalSchema) }
    const { register, setValue, formState: { errors, isSubmitting }, handleSubmit, reset } = useForm(modalFormOptions);

    const onSubmitTopBarChangeLocation = async formValue => {
        const { zipcode } = formValue
        try {
            await setZipcode(zipcode).then(
                updateGamesData(zipcode, async function (err, callBackRes) {
                    if (err) {
                        console.log(err?.message)
                        let errorMsg = err?.message != null ? err.message : 'This Zip is not serviced.'
                        setZipCodeServiceStaus(errorMsg)
                        setValue('zipcode', '')
                    } else {
                        setChangeLocation(false)
                        router.push("/")
                        reset()
                    }
                }))
        } catch (e) {
            //error handling logic
            console.log(e)
        }
    };

    if (errors?.zipcode != null) {
        setValue('zipcode', '')
    }

    return (
        <>
            {(!loading && games && games.affiliate != undefined)
                ?
                <div className="location-box">
                    <div className="location-container">
                        <div className="location-holder location-update-wrap" id="locationBox">
                            <div className="selected-location" style={{ display: changeLocation ? 'none' : 'block' }}>
                                <div className="ti-inline-block">
                                    <img src={games && games?.affiliate.logo != '' ? games && games?.affiliate.logo : "https://www.g2u.com/assets/img/franchise/franchise-swa.png"} alt='affiliate-logo' />
                                </div>
                                <div className="ti-inline-block location-holder-place">
                                    <h3> <span id="locationBoxName"><strong>{games && games?.affiliate.company_name}</strong></span></h3>
                                    <span style={{ cursor: 'pointer' }} className="ti-orange-text location-edit-link" onClick={() => setChangeLocation(true)}>( Change location )</span>
                                </div>
                            </div>
                            <div className="update-location" style={{ display: (changeLocation) ? 'block' : 'none' }}>
                                <form
                                    onSubmit={handleSubmit(onSubmitTopBarChangeLocation)}
                                    autoComplete='off'
                                >
                                    <span className="close-btn" onClick={() => setChangeLocation(false)} />
                                    <input type="hidden" id="franchiseNameLocBox" name="franchiseName" defaultValue />
                                    <div className="ti-input">
                                        <input
                                            {...register("zipcode")}
                                            type="text"
                                            placeholder={errors && errors.zipcode != null && errors.zipcode.message ? errors.zipcode.message : zipCodeServiceStaus}
                                            className="zip-code-input"
                                            maxLength={5}
                                        />
                                    </div>
                                    <button className="ti-yellow-button location-button" type="submit">Go!</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="location-information">
                        <h3>Locally Owned &amp; Operated</h3>
                        {/* <p className="ti-orange-text">  {games && games?.affiliate.total_events ? Intl.NumberFormat('en-US').format(games.affiliate.total_events) : 1}+ events since {games.affiliate.start_year != '' ? games.affiliate.start_year : currentYear}</p> */}
                        <p className="ti-orange-text">8,000+ events since 2008</p>
                        <div>
                            {/* <a href="#testimonialContent">
                                <span className={`ti-sprite ${games.affiliate.star_rating >= 1 ? 'large-yellow-star' : null} `} />
                                <span className={`ti-sprite ${games.affiliate.star_rating >= 2 ? 'large-yellow-star' : null} `} />
                                <span className={`ti-sprite ${games.affiliate.star_rating >= 3 ? 'large-yellow-star' : null} `} />
                                <span className={`ti-sprite ${games.affiliate.star_rating >= 4 ? 'large-yellow-star' : null} `} />
                                <span className={`ti-sprite ${games.affiliate.star_rating >= 5 ? 'large-yellow-star' : null} `} />
                            </a> */}
                            <a href="#testimonialContent">
                                <span className={`ti-sprite large-yellow-star `} />
                                <span className={`ti-sprite large-yellow-star `} />
                                <span className={`ti-sprite large-yellow-star `} />
                                <span className={`ti-sprite large-yellow-star `} />
                                <span className={`ti-sprite large-yellow-star`} />
                            </a>
                        </div>
                        <div>
                            <a href="#footerContact" className="ti-yellow-button">Request Info</a>
                        </div>
                    </div>
                </div>

                :
                <div className="location-box no-zipcode-parent" id="locationBox" style={{ height: 370 }}>
                    {/* <div className="location-container">
                        <div className="text-center">
                            <img src="assets/img/no-location-opt.png" className="no-location-icon" />
                        </div>
                        <h2 className="text-center no-border ti-dark-blue-text">Find a Location!</h2>
                        <form
                            method="post"
                       
                        >
                            <div className="banner-zip-input-container">
                                <input type="hidden" id="franchiseNameLocBox" name="franchiseName" defaultValue />
                                <div className="ti-input">
                                    <input
                                        type="tel"
                                        name="locationBoxZip"
                                        id="locationBoxZip"
                                        placeholder="Enter Your ZIP Code"
                                    />
                                </div>
                                <div>
                                    <button id="btn" href="#" type='button' className="ti-yellow-button">GO!</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="location-information">
                        <p className="ti-call-us">or call us at</p>
                        <p className="telNumber"><strong><span className="telephone">1-800-71-</span><span className="ti-orange-text">GAMES</span></strong></p>
                        <a className="view-game-selection" href="#gamesTheyLove">
                            <span className="ti-sprite yellow-chevron-down" /> View our game selection! <span className="ti-sprite yellow-chevron-down" />
                        </a>
                    </div> */}
                </div>
            }

        </>

    )
}

export default FindLocation