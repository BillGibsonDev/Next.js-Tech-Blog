// styled
import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables.js';

// components
import Link from 'next/link';
import Image from 'next/image.js';

//images
import Edit from '../public/editIconWhite.png';

// redux
import { useSelector } from 'react-redux';

export default function Intro({article, splitDate, creator}) {
    
    const user = useSelector((state) => state.user);
    
    return (
        <StyledIntro>
            <div className="title-container">
                <h4>{article.postTitle}</h4>
                <div className="icon-container">
                    <Link href={`/tags/${article.tag}`}>{article.tag}</Link>
                    {
                        user.role === process.env.NEXT_PUBLIC_ADMIN_SECRET || user.user === article.authorUsername 
                        ? <Link href={`/editArticle/${article._id}`}><a className="edit-icon"><Image layout='fill' src={Edit} alt="" /></a></Link>
                        : <></>
                    }
                </div>
            </div>
            <div className="thumbnail-container">
                <Image layout="fill" src={article.thumbnail} alt="" />
            </div>
            <div className="info-container">
                <div className="author-container">
                    <div className="avatar-container">
                        <Image src={creator.avatar} layout="fill" alt="" />
                    </div>
                    <Link href={`/creators/${article.authorUsername}`}>{article.author}</Link>
                </div>
                <h5>{splitDate}</h5>
            </div>   
        </StyledIntro>
    )
}

const StyledIntro = styled.section`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: auto;
    border-radius: 20px;
    .title-container {
        width: 100%;
        height: 100%;
        margin: 10px auto;
        h4 {
            font-size: 30px;
            margin-bottom: 10px;
            color: #ffffff;
            @media (max-width: 750px){
                font-size: 1.5em;
            }
        }
        .icon-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 300px;
            margin-bottom: 10px;
            position: relative;
            @media (max-width: 750px){
                width: 100%;
                margin-bottom: 20px; 
            }
            a {
                display: flex;
                align-items: center;
                font-size: 18px;
                color: ${pallette.helperGrey};
                &:hover {
                    text-decoration: underline;
                }
            }
            .edit-icon {
                display: block;
                position: relative;
                width: 35px;
                height: 35px;
                img {
                    width: 35px;
                    height: 35px;
                }
            }
            
        }
    }
    .thumbnail-container {
        display: block;
        width: 100%;
        max-width: 900px;
        height: 100%;
        min-height: 500px;
        position: relative;
        @media (max-width: 750px){
            min-height: 300px;
        }
        @media (max-width: 750px){
            min-height: 200px;
        }
        img {
            width: 100%;
            height: 100%;
        }
    }
    .info-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin: 10px 0 10px 0;
        .author-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            .avatar-container {
                display: block;
                height: 35px;
                width: 35px;
                position: relative;
            }
            img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
                object-fit: cover;
            }
            a {
                font-size: 16px;
                margin-left: 6px;
                color: ${pallette.helperGrey};
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        h5 {
            color: ${pallette.helperGrey};
            font-weight: 400;
        }
    }
    #intro-para {
        color: ${pallette.helperGrey};
        margin-bottom: 20px;
        font-weight: 400;
        font-size: 20px;
    }
    
`;