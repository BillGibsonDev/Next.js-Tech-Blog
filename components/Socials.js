import styled from 'styled-components';

// public
import Linkedin from '../public/linkedinBlack.png';
import Twitter from '../public/twitterBlack.png';
import Insta from '../public/instaBlack.png';
import Globe from '../public/globe.png';
import Youtube from '../public/youtubeBlack.png';
import Github from '../public/githubBlack.png';

import Image from 'next/image'

const Socials = ({creator}) => {

    return (
    <StyledSocials>
        {
            creator.twitter === "" 
            ? <></>
            : <a href={creator.twitter} target="_blank" rel="noreferrer"><Image src={Twitter} alt="" /></a>  
        }
        {
            creator.youtube === "" 
            ? <></>
            :<a href={creator.youtube} target="_blank" rel="noreferrer"><Image src={Youtube} alt="" /></a>
        }
        {
            creator.linkedin === "" 
            ? <></>
            : <a href={creator.linkedin} target="_blank" rel="noreferrer"><Image src={Linkedin} alt="" /></a>
        }
        {
            creator.instagram === "" 
            ? <></>
            : <a href={creator.instagram} target="_blank" rel="noreferrer"><Image src={Insta} alt="" /></a>
        }
        {
            creator.github === "" 
            ? <></>
            : <a href={creator.github} target="_blank" rel="noreferrer"><Image src={Github} alt="" /></a>
        }
        {
            creator.other === "" 
            ? <></>
            : <a href={creator.other} target="_blank" rel="noreferrer"><Image src={Globe} alt="" /></a>
        }
    </StyledSocials >
    )
}

const StyledSocials = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
    @media (max-width: 450px){
        margin-top: 20px;
    }
    a {
        width: 35px;
        height: 35px;
        margin: 0 6px;
        img {
            height: 100%;
            width: 100%;
        }
    }  
`;

export default Socials