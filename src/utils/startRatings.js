
const startRatings = (rating) => {
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
export default startRatings