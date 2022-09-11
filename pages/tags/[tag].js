import { useState } from 'react';
import axios from 'axios';

import styled from 'styled-components';

// components
import Blogsnip from '../../components/Blogsnip';
import Filter from '../../components/Filter';

import { useRouter } from 'next/router';

export default function TagsPage ({articles}) {

     const router = useRouter();

    const { tag } = router.query

    const [ value, setValue ] = useState(10);

    const handleShowMore = () => {
      let i = 10;
      setValue(value + i)
    }

    return (
        <StyledFilterPage>
            <h1>{tag} Articles</h1>
            <Filter />
            <div className="blog">
                <div className="blog-wrapper">
                    { 
                        articles.filter(post => post.tag === `${tag}`).length === 0 
                        ? <div className="placeholder">
                            <h2>Sorry, No articles found for {tag}</h2>    
                        </div>
                        : <>
                            {
                                articles.filter(articles => articles.tag === `${tag}`).slice(0, value).map((article, index) =>  {
                                    return(
                                        <Blogsnip
                                            article={article}
                                            key={index}
                                        />
                                    )
                                })
                            }
                        </>
                    }
                </div>
            </div>
            {
                articles.filter(articles => articles.tag === `${tag}`).length >= 10 
                ? <button id="showmore" onClick={() => { handleShowMore() }}>Show More</button>
                : <></>
                
            }
        </StyledFilterPage >
        )
    }

const StyledFilterPage = styled.div`
    height: 100%;
    width: 70%;
    margin: 1em auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    @media (max-width: 750px){
        width: 95%;
    }
    #showmore {
        height: 35px;
        width: 200px;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1px;
    }
    h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        color: #fff;
        font-size: 2em;
        font-weight: 700;
        span {
            margin-left: 3px;
        }
    }
    .tag-container {
        display: flex;
        width: 60%;
        margin: 20px auto 50px auto;
        justify-content: center;
        #tag {
            color: #c9c9c9;
            font-size: 2em;
            margin: 0 20px;
        }
    }
    .blog {
        display: flex;
        width: 100%;
        height: 100%;
        margin: 1em auto;
        .blog-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 100%;
            margin: 0 auto;
            border-radius: 12px;
            .placeholder {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-height: 40vh;
                h2 {
                    color: white;
                    text-align: center;
                }
            }
            .loadingContainer{
                display: flex;
                width: 100%;
                height: 50vh;
                justify-content: center;
                align-items: center;
                .loader {
                    border: 16px solid #f3f3f3;
                    border-top: 16px solid #000000;
                    border-radius: 50%;
                    width: 250px;
                    height: 250px;
                    animation: spin 2s linear infinite;
                    img {
                        width: 120px;
                    }
                }
            }
        }
        @keyframes spin {
            0%  { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    }
`;

    export const getServerSideProps = async () => {
    const articleData = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_GET_POSTS_URL}`);
    return {
        props: {
          articles: articleData.data,
        },
    }
}