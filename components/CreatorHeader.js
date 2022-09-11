// components
import Socials from './Socials.js';

import Dot from '../public/dot.png';

export default function CreatorHeader ({creator, articles}) {

    return (
        <div className="header-wrapper">
            <img id="avatar" src={creator.avatar} alt="" />
            <h4>{creator}</h4>
            <p>{creator.bio}</p>
            <div className="info-container">
                <h6>{creator.location}</h6>
                <img className="dot" src={Dot} alt="" /> 
                <h6>{articles.length} Posts</h6>
                <img className="dot" id="dot2" src={Dot} alt="" />
                <Socials
                    creator={creator}
                />
            </div>
        </div>
    )
}
