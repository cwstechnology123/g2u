import React, { useEffect, useState, useRef } from 'react'
import Header from '@/components/_App/Header'
import { NextSeo } from 'next-seo';
import useGamesData from '@/states/stores/games-data';
import Footer from '@/components/_App/Footer/Footer';
import { apiBaseUrl, fetchApi } from "@/utils/fetchApi";
import BrandLogo from '@/components/_App/BrandLogo';
import LoadMoreButton from '@/components/LoadMoreButton';
import GamesCard from '@/components/GamesCard';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import seo from '@/utils/seo';

const viewSuggestionsSchema = Yup.object().shape({
  sAgeRange: Yup.string().required('Age range name is required.'),
  sGroupSize: Yup.string().required('Participants is required.'),
})

const ourgames = ({ testimonialsData, investorsData, siteSettingData, gamesSelectOptionData }) => {
  const { zipcode, games, loading, error } = useGamesData(); // ftech initail games data  

  const [isLoading, setisLoading] = useState(false);
  const [isDisablebtn, setisDisablebtn] = useState(false);
  const [isSuggestedGamesLoading, setIsSuggestedGamesLoading] = useState(false);
  const [isLoadingViewSuggestion, setisLoadingViewSuggestion] = useState(false);
  const [loadingBtnText, setLoadingBtnText] = useState('Load More');
  const [loadingSuggGameBtnText, setLoadingSuggGameBtnText] = useState('Load More');
  const [viewSuggestionBtnText, setViewSuggestionBtnText] = useState('View Suggestion');
  const [page, setPage] = useState(1);
  const [suggGamepage, setSuggGamePage] = useState(1);
  const [gamesData, setGamesData] = useState([]);
  const [showSuggestionData, setShowSuggestionData] = useState(false)
  const [suggestionData, setSuggestionData] = useState([]);
  const [suggestionDataPagination, setSuggestionDataPagination] = useState({});
  const [ageRangeArr, setAgeRangeArr] = useState(null)
  const [participantsRangeArr, setParticipantsRangeArr] = useState(null)
  const ref = useRef(null);

  const suggestionFormOptions = { resolver: yupResolver(viewSuggestionsSchema) }
  const { register, setValue, formState: { errors, isSubmitting, isDirty, isValid }, handleSubmit } = useForm(suggestionFormOptions);

  // scroll to view all catelog
  const scrollToAllCatelog = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // for complete game catalog
  useEffect(() => {
    if (!loading && games && games.activities.list.length > 0) {
      setGamesData(games.activities.list)
      setPage(games.activities.pagination.next)
    }
  }, [games])

  // for suggested games
  useEffect(() => {
    if (suggestionDataPagination && Object.keys(suggestionDataPagination).length > 0) {
      setSuggestionDataPagination(suggestionDataPagination.total)
      setSuggGamePage(suggestionDataPagination?.next ?? 1)
    }
  }, [suggestionDataPagination])



  // load more suggested  games
  const getMoreSuggestedGames = async () => {
    if (ageRangeArr.length > 0 && participantsRangeArr.length > 0) {
      setIsSuggestedGamesLoading(true)
      setLoadingSuggGameBtnText('Loading...')
      const payload = {
        url: `${apiBaseUrl}/games/search`, method: 'POST', data: { "zipcode": zipcode, "min_age": ageRangeArr[0], max_age: ageRangeArr[1], "min_participants": participantsRangeArr[0], max_participants: participantsRangeArr[1], "page_limit": 9, "page_record": suggGamepage }
      }
      const response = await fetchApi(payload); // call event list API
      const responseData = response.data.games;
      //merging two arrays
      if (responseData && responseData.activities.list.length > 0) {
        setSuggestionData([...suggestionData, ...responseData.activities.list])
        setSuggestionDataPagination(responseData.activities.pagination)
        setSuggGamePage(page + 1)
        setIsSuggestedGamesLoading(false)
        setLoadingSuggGameBtnText('Load More')
      } else {
        setSuggestionData(suggestionData)
        setIsSuggestedGamesLoading(false)
        setLoadingSuggGameBtnText('Load More')
      }
    } else {
      console.log("Pagenation: select options is null, please section any option first")
    }
  }

  // get more games data
  const getMoreGames = async () => {
    setisLoading(true)
    setLoadingBtnText('Loading...')
    const payload = { url: `${apiBaseUrl}/games/${zipcode}/${page}/24`, method: 'GET' }
    const response = await fetchApi(payload); // call event list API
    const responseData = response.data.games;
    //merging two arrays
    if (responseData && responseData.activities.list.length > 0) {
      setGamesData([...gamesData, ...responseData.activities.list])
      setPage(page + 1)
      setisLoading(false)
      setLoadingBtnText('Load More')
    } else {
      setGamesData(gamesData)
      setisLoading(false)
      setLoadingBtnText('Load More')
    }
  };

  // filter suggested games
  const onSubmit = async (data) => {
    const { sAgeRange, sGroupSize } = data
    let ageRangeArr = sAgeRange.split("-");
    let sGroupSizeArr = sGroupSize.split("-");
    if (ageRangeArr.length > 0 && sGroupSizeArr.length > 0) {
      setAgeRangeArr(ageRangeArr)
      setParticipantsRangeArr(sGroupSizeArr)
      setisLoadingViewSuggestion(true)
      setisDisablebtn(true)
      setViewSuggestionBtnText("Loading...")
      const payload = {
        url: `${apiBaseUrl}/games/search`, method: 'POST', data: { "zipcode": zipcode, "min_age": ageRangeArr[0], max_age: ageRangeArr[1], "min_participants": sGroupSizeArr[0], max_participants: sGroupSizeArr[1], "page_limit": 9, "page_record": 1 }
      }
      const response = await fetchApi(payload); //call filter API
      const responseData = response.data.games;
      console.log(responseData)
      if (responseData && responseData.activities.list.length > 0) {
        setSuggestionData(responseData.activities.list)
        setSuggestionDataPagination(responseData.activities.pagination)
        setisLoadingViewSuggestion(false)
        setViewSuggestionBtnText("View Suggestion")
        setShowSuggestionData(true)
        setisDisablebtn(false)
      } else {
        setSuggestionData([])
        setSuggestionDataPagination({})
        setisLoadingViewSuggestion(false)
        setViewSuggestionBtnText("View Suggestion")
        setShowSuggestionData(true)
        setisDisablebtn(false)
      }
    } else {
      console.log("select options is null, please section any option first")
    }
  }

  const SEO = seo({
    title: "Our Games | Video Game Trucks, Laser Tag & More | Games2U",
    description: "See a complete listing of games and activities from America's #1 Rated provider of video game trucks, laser tag equipment, human hamster balls, and more! Book today for an experience they'll never forget!",
    canonical: "https://www.g2u.com/ourgames",
    openGraph: {
      type: 'website',
      title: 'Our Games | Video Game Trucks, Laser Tag & More | Games2U',
      description: "See a complete listing of games and activities from America's #1 Rated provider of video game trucks, laser tag equipment, human hamster balls, and more! Book today for an experience they'll never forget!",
      url: 'https://www.g2u.com',
      images: [
        {
          url: "https://www.g2u.com/assets/img/g2u-logo.png",
          width: 800,
          height: 600,
          alt: 'Og Image Alt',
        }
      ],
    },
    twitter: {
      handle: '@g2u',
      site: '@g2u',
      cardType: 'summary_large_image'
    },
  })
  // const SEO = {
  //   title: "Our Games | Video Game Trucks, Laser Tag & More | Games2U",
  //   description: "See a complete listing of games and activities from America's #1 Rated provider of video game trucks, laser tag equipment, human hamster balls, and more! Book today for an experience they'll never forget!",
  //   canonical: "https://www.g2u.com/ourgames",
  //   openGraph: {
  //     type: 'website',
  //     title: 'Our Games | Video Game Trucks, Laser Tag & More | Games2U',
  //     description: "See a complete listing of games and activities from America's #1 Rated provider of video game trucks, laser tag equipment, human hamster balls, and more! Book today for an experience they'll never forget!",
  //     url: 'https://www.g2u.com',
  //     // images: [
  //     //   {
  //     //     url: `${assetsURL}${metaImage}`,
  //     //     width: 800,
  //     //     height: 600,
  //     //     alt: 'Og Image Alt',
  //     //   }
  //     // ],
  //   },
  //   twitter: {
  //     handle: '@g2u',
  //     site: '@g2u',
  //     cardType: 'summary_large_image'
  //   },
  // }

  return (
    <>
      <NextSeo {...SEO} />
      {/* <!-- top header and banner with mobile menu section start --> */}
      <div className="container-fluid">
        {/* <!-- header section start with mobile naviagtion  --> */}
        <Header siteSettings={siteSettingData} />
        {/* <!-- header section end with mobile naviagtion  --> */}

        {/*  Find the Perfect Game section start */}
        <div className="row no-padding not-home all-games-page" id="headerBanner">
          <div className="ti-page-header row clearfix">
            <div className="row ti-row">
              <div className="limited-width">
                <h1>Find the Perfect Game</h1>
                <p>Enter the details below, and we'll give you our suggestions.</p>
                <div className="text-center">
                  <form id="frmSuggestGame" name="frmSuggestGame" onSubmit={handleSubmit(onSubmit)}>
                    <div className="ti-inline-block">
                      <div className="ti-input">
                        <select id="sAgeRange" {...register("sAgeRange")} className={errors && errors.sAgeRange != null && errors.sAgeRange.message ? "ti-error ti-error-text" : null}>
                          <option value=''>Please select...</option>
                          {
                            gamesSelectOptionData && gamesSelectOptionData.age_range_list.length > 0
                              ?
                              gamesSelectOptionData.age_range_list.map(item => <option key={item.id} value={`${item.min_age}-${item.max_age}`}>{item.age_range}</option>)
                              :
                              null
                          }
                        </select>
                        <span className="ti-sprite select-arrows" />
                      </div>
                    </div>
                    <div className="ti-inline-block">
                      <div className="ti-input">
                        <select id="sGroupSize" {...register("sGroupSize")} className={errors && errors.sGroupSize != null && errors.sGroupSize.message ? "ti-error ti-error-text" : null}>
                          <option value=''>Please select...</option>
                          {
                            gamesSelectOptionData && gamesSelectOptionData.participants_range_list.length > 0
                              ?
                              gamesSelectOptionData.participants_range_list.map(item => <option key={item.id} value={`${item.min_participants}-${item.max_participants}`}>{item.participants_range} Attendees</option>)
                              :
                              null
                          }
                        </select>
                        <span className="ti-sprite select-arrows" />
                      </div>
                    </div>
                    <div className="ti-inline-block">
                      <div className="ti-input">
                        <button type="submit" disabled={isDisablebtn} className="ti-yellow-button view-suggestions">   {isLoadingViewSuggestion ? <i className="fa fa-refresh fa-spin"></i> : null} {viewSuggestionBtnText}</button>
                      </div>
                    </div>
                  </form>
                  { /*Filter view suggestions data start */}
                  {
                    showSuggestionData
                      ?
                      <div className="suggested-games">
                        {(suggestionData && suggestionData.length > 0)
                          ?
                          <h2 className="no-border">Our Suggested Games:</h2>
                          :
                          null
                        }

                        <div className="row">
                          {(suggestionData && suggestionData.length > 0)
                            ?
                            suggestionData.map(item => {
                              const { id, slug, image, icon, activity_name } = item
                              return (
                                <GamesCard
                                  key={id}
                                  dynamicClass={"col-md-4 col-xs-6 col-ie-4 ti-box game-10"}
                                  id={id}
                                  link={games.affiliate.city.toLowerCase()}
                                  slug={slug}
                                  imgSrc={image}
                                  icon={icon}
                                  activityName={activity_name}
                                  caption={item.activity_caption}
                                  zSlug={games.affiliate.z_slug}
                                />
                              )
                            })
                            :
                            <div>
                              <h4 className='no-suggestion-found'>No suggestion found!</h4>
                            </div>
                          }
                        </div>
                        {
                          (suggestionData && suggestionDataPagination && (suggestionDataPagination > suggestionData.length))
                            ?
                            <LoadMoreButton
                              getMoreData={getMoreSuggestedGames}
                              isLoading={isSuggestedGamesLoading}
                              loadingBtnText={loadingSuggGameBtnText}
                            />
                            :
                            null
                        }

                        <div className="row ti-view-all-row">
                          <div className="col-xs-12">
                            {/* <Link href={"/our-games#allGamesContent"}> */}
                            <div className="continue-to-site view-all-games" onClick={scrollToAllCatelog}><span className="ti-sprite yellow-chevron-down" /> view entire game catalog <span className="ti-sprite yellow-chevron-down" /></div>
                            {/* </Link> */}
                          </div>
                        </div>
                      </div>
                      :
                      null
                  }

                  { /*Filter view suggestions data end */}

                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  Find the Perfect Game section end */}

      </div >
      {/* <!-- top header and banner with mobile menu section start --> */}

      {/* content section start */}

      {/* Our Complete Game Catalog section start */}
      <div className="container-fluid no-padding">
        <div className="row ti-row ti-orange-background clearfix" id="allGamesContent" ref={ref}>
          <div className="limited-width">
            <h2>Our Complete Game Catalog</h2>
            <div className="row">
              {
                (gamesData && gamesData.length > 0)
                  ?
                  gamesData.map(item => {
                    const { id, slug, image, icon, activity_name } = item
                    return (
                      <GamesCard
                        key={id}
                        dynamicClass={"col-md-4 col-xs-6 col-ie-4 ti-box game-1"}
                        id={id}
                        link={games.affiliate.city.toLowerCase()}
                        slug={slug}
                        imgSrc={image}
                        icon={icon}
                        activityName={activity_name}
                        caption={item.activity_caption}
                        zSlug={games.affiliate.z_slug}
                      />
                    )
                  })
                  :
                  null
              }
            </div>
            {
              (gamesData && games && (gamesData.length != games.activities.pagination.total))
                ?
                <LoadMoreButton
                  getMoreData={getMoreGames}
                  isLoading={isLoading}
                  loadingBtnText={loadingBtnText}
                />
                :
                null
            }

          </div>
        </div>
        <div className="row ti-blue-background as-seen-banner mobile-wrap not-home">
          <div className="limited-width">
            <div className="as-seen-images as-seen-mobile">
              <BrandLogo investors={investorsData} />
            </div>
            <div className="as-seen-images as-seen-desktop">
              <BrandLogo investors={investorsData} />
            </div>
          </div>
        </div>
      </div>
      {/* Our Complete Game Catalog section end */}

      {/* content section end */}

      <Footer
        testimonials={testimonialsData}
        siteSettings={siteSettingData}
      />
    </>
  )
}

export default ourgames

export async function getStaticProps() {
  try {
    const testimonialsPayload = { url: `${apiBaseUrl}/testimonials`, method: 'POST', data: { page_limit: 20, page_record: 1 } }
    const investorsPayload = { url: `${apiBaseUrl}/investors`, method: "POST", data: { page_limit: 20, page_record: 1 } };
    const siteSettingsPayload = { url: `${apiBaseUrl}/site-settings`, method: "GET", };
    const gamesFilterOptionPlayload = { url: `${apiBaseUrl}/games/select-list`, method: "GET", };

    const testimonialsContent = await fetchApi(testimonialsPayload); // call testimonials API
    const investorsContent = await fetchApi(investorsPayload); // call investors API
    const siteSettingContent = await fetchApi(siteSettingsPayload); // call investors API
    const gamesSelectOptionContent = await fetchApi(gamesFilterOptionPlayload); // call games select option list API

    const testimonialsData = testimonialsContent.data.testimonials;
    const investorsData = investorsContent.data.investors;
    const siteSettingData = siteSettingContent.data.settings;
    const gamesSelectOptionData = gamesSelectOptionContent.data.select_list;

    return {
      props: {
        testimonialsData,
        investorsData,
        siteSettingData,
        gamesSelectOptionData,
      },
      revalidate: 10, // In seconds
    };
  } catch (error) {
    console.log('error in testimonials api call', error)
  }
}