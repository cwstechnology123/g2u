const Video = ({ siteSettings }) => {
    return (
        <video className="fit-image" preload="preload" id="video" autoPlay="autoplay" loop="loop" muted="muted" playsInline poster="assets/img/placeholder-vid.jpg">
            <source src={(siteSettings.video != '' ? siteSettings.video : "assets/video/final_home.mp4")} type="video/mp4" />
        </video>
    )
}
export default Video