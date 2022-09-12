// components
import Socials from './Socials.js';

import Image from 'next/image.js';
import Dot from '../public/dot.png';

export default function CreatorHeader ({creator, articles}) {

    return (
        <div className="header-wrapper">
            <Image src={creator.avatar} layout="fill" alt="" />
            <h4>{creator}</h4>
            <p>{creator.bio}</p>
            <div className="info-container">
                <h6>{creator.location}</h6>
                <Image className="dot" src={Dot} alt="" /> 
                <h6>{articles.length} Posts</h6>
                <Image className="dot" id="dot2" src={Dot} alt="" />
                <Socials
                    creator={creator}
                />
            </div>
        </div>
    )
}
