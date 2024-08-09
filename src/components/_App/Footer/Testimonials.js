
const printStarRating = (rating) => {
    if (rating == 1) {
        return <span className="ti-sprite large-white-star" />
    } else if (rating == 2) {
        return (
            <>
                <span className="ti-sprite large-white-star" />
                <span className="ti-sprite large-white-star" />
            </>
        )
    } else if (rating == 3) {
        return (
            <>
                <span className="ti-sprite large-white-star" />
                <span className="ti-sprite large-white-star" />
                <span className="ti-sprite large-white-star" />
            </>
        )
    }
    else if (rating == 4) {
        return (
            <>
                <span className="ti-sprite large-white-star" />
                <span className="ti-sprite large-white-star" />
                <span className="ti-sprite large-white-star" />
                <span className="ti-sprite large-white-star" />
            </>
        )
    } else {
        return (
            <>
                <span className="ti-sprite large-white-star" />
                <span className="ti-sprite large-white-star" />
                <span className="ti-sprite large-white-star" />
                <span className="ti-sprite large-white-star" />
                <span className="ti-sprite large-white-star" />
            </>
        )
    }
}
const Testimonials = ({ testimonials }) => {
    return (
        <div className="row no-margin no-padding" id="testimonials">
            <div className="col-xs-12 no-padding">
                <div className="img-container col-xs-5 no-padding">
                </div>
                <div className="testimonial-content col-xs-7">
                    {
                        (testimonials && testimonials.length > 0)
                            ?
                            testimonials.map((item, index) => {
                                return (
                                    <div className={`testimonial-cell ${index == 0 ? 'active' : null}`} key={item.id}>
                                        <div className="star-container">
                                            {printStarRating(item.star_rating)}
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: item.testimonial }}></div>
                                        <p className="review-name">{item.reviewer_name}</p>
                                        <p className="review-location">{item.review_location}</p>
                                    </div>
                                )
                            })
                            :
                            <p>No data found!</p>
                    }

                </div>
            </div>
        </div>
    )
}

export default Testimonials