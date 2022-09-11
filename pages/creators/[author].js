import { useState, useEffect } from 'react';
import axios from 'axios';

// components
import Blogsnip from '../../components/Blogsnip';
import CreatorHeader from '../../components/CreatorHeader.js';

import { useRouter } from 'next/router';

const Creator =  ({creator}) => {

    const router = useRouter();
    const { author } = router.query

    const [ articles, setArticles ] = useState([]);
    const [ value, setValue ] = useState(10);

    useEffect(() => {
        window.scrollTo(0, 0);
        const getCreator = () => {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_GET_POSTS_URL}`)
            .then(function(response){
                setArticles(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        };
        getCreator(); 
    }, [ author ])

    const handleShowMore = () =>{
      let i = 10;
      setValue(value + i);
    }

    return (
        <>
            <CreatorHeader
                creator={JSON.stringify(creator)}
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