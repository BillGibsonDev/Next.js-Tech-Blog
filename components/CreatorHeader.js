// components
import Socials from './Socials.js';

import Image from 'next/image.js';
import Dot from '../public/dot.png';

import styled from 'styled-components';

export default function CreatorHeader ({avatar, bio, author, creator, authorUsername, location, articles}) {

    return (
        <StyledCreatorHeader>
            <div className="avatar-container">
                <Image src={avatar} layout="fill" alt="" />
            </div>
            <h4>{creator}</h4>
            <p>{bio}</p>
            <div className="info-container">
                <h6>{location}</h6>
                <div className="dot-container">
                    <Image src={Dot} layout="fill" alt="" /> 
                </div>
                <h6>{articles.length} Posts</h6>
                <div className="dot-container" id="dot2">
                    <Image src={Dot} layout="fill" alt="" />
                </div>
                <Socials
                    authorUsername={authorUsername}
                />
            </div>
        </StyledCreatorHeader>
    )
}

const StyledCreatorHeader = styled.header`
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    padding: 10px;
    width: 95%;
    max-width: 875px;
    @media (max-width: 750px){
        width: 90%;
    }
    .avatar-container {
        margin: 0 auto;
        display: block;
        width: 150px;
        height: 100px;
        position: relative;
        img {
            width: 100%;
            height: 100%;
            margin: auto;
        }
    }
    h4 {
        font-size: 1.5em;
        margin: auto;
    }
    p {
        font-size: 16px;
        margin: auto;
        @media (max-width: 750px){
            font-size: 13px;
        }
    }
    .info-container {
        display: grid;
        width: 100%;
        grid-template-columns: 33% 10px 33% 10px 33%;
        align-items: center;
        margin: 10px auto;
         @media (max-width: 750px){
            grid-template-columns: 1fr;
            row-gap: 16px;
        }
        h6 {
            margin: auto;
            font-size: 20px;
            @media (max-width: 750px){
                font-size: 14px;
            }
        }
        .dot-container {
            position: relative;
            height: 10px;
            width: 10px;
            display: block;
            min-height: 10px;
            max-height: 10px;
            min-width: 10px;
            max-width: 10px;
            @media (max-width: 750px){
                width: 6px;
                display: none;
            }
            img {
                width: 100%;
                height: 100%;
                
            }
        }
    }
`;