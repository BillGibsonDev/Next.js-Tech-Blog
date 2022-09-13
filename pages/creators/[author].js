import { useState, useEffect } from 'react';
import axios from 'axios';

// components
import Blogsnip from '../../components/Blogsnip';
import CreatorHeader from '../../components/CreatorHeader.js';
import { useRouter } from 'next/router';
import Head from 'next/head';
import CreatorPageLoader from '../../components/CreatorPageLoader';

const Creator =  ({creator}) => {

    const router = useRouter();
    const { author } = router.query

    const [ articles, setArticles ] = useState([]);
    const [ value, setValue ] = useState(10);

    useEffect(() => {
        window.scrollTo(0, 0);
        const getArticles = () => {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_GET_POSTS_URL}`)
            .then(function(response){
                setArticles(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        };
        getArticles(); 
    }, [ author ])

    const handleShowMore = () =>{
      let i = 10;
      setValue(value + i);
    }

    return (
        <>
            <Head>
                <title>{`Tech Blog | ${creator[0].creator}`}</title>
                <meta name="description" content={creator[0].bio} />
                <meta property="og:url" content="https://next-js-tech-blog-c1ckshbvi-gibbybreakstech.vercel.app/" />
                <meta property="og:site_name" content={`Tech Blog | ${creator[0].creator}`} />
                <meta property="og:title" content={`Tech Blog | ${creator[0].creator}`} />
                <meta property="og:description" content={creator[0].bio} />
                <meta property="og:image" content={creator[0].avatar} />
                <meta property="twitter:image" content={creator[0].avatar} /> 
                <meta property="twitter:description" content={creator[0].bio} />
                <meta property="twitter:title" content={`Tech Blog | ${creator[0].creator}`} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@gibbybreakstech" />
            </Head>
            {
                !creator
                ? <CreatorPageLoader />
                : <>
                    <CreatorHeader
                        bio={creator[0].bio}
                        location={creator[0].location}
                        avatar={creator[0].avatar}
                        authorUsername={creator[0].authorUsername}
                        creator={creator[0].creator}
                        articles={articles}
                    />
                    <div className="blog">
                        <div className="blogWrapper">
                            {
                                articles.filter(articles => articles.authorUsername === `${author}`).slice().reverse().map((article, index) => {
                                    return (
                                        <Blogsnip
                                            article={article}
                                            key={index}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    {
                        articles.filter(articles => articles.authorUsername === `${author}`).length >= 10 
                        ? <button id="showmore" onClick={() => { handleShowMore() }}>Show More</button>
                        : <></>
                    }
                </>
            }
        </>
    )
}

export const getServerSideProps = async ({params}) => {
    const author = params.author;
    const creatorData = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_GET_CREATOR_URL}/${author}`);
   return {
        props: {
          creator: creatorData.data,
        },
    }
}

export default Creator;