import trimString from '@/utils/trimString'
import Link from 'next/link'
import Image from 'next/image'

const GamesCard = ({ dynamicClass, link, slug, imgSrc, icon, activityName, caption, zSlug='' }) => {
    return (
        <div className={dynamicClass} data-original="true">
            <Link href={`/${zSlug}/activities/${slug}`}>
                <div className="box-heading video-game-theater" >
                    <Image src={imgSrc != '' ? imgSrc : "/assets/img/ico-video-theater-2x.png"} height={"500"} width={"500"} style={{ width: "100%", height: "100%", objectFit: 'cover' }} alt={activityName} />
                </div>
                <div className="circle-img">
                    <Image src={icon != '' ? icon : "/assets/img/ico-video-theater-2x.png"} width={500} height={500} alt={slug} />
                </div>
                <h3 className='single-line'>{activityName}</h3>
                <p className='multiline-ellipsis games-sub-title'>{trimString(caption, 85)}</p>
                <span className="explore-link single-line">Explore {activityName} »</span>
            </Link>
        </div>
    )
}

export default GamesCard