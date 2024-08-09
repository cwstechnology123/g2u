const LoadMoreButton = ({ getMoreData, isLoading, loadingBtnText }) => {
    return (
        <div className="row load-more-btn">
            <div className="limited-width text-center">
                <button type='button' onClick={() => { getMoreData() }} className="ti-yellow-button">
                    {isLoading ? <i className="fa fa-refresh fa-spin"></i> : null} {loadingBtnText}</button>
            </div>
        </div>
    )
}
export default LoadMoreButton