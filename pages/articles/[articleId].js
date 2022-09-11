import { useState, useEffect } from 'react';
import axios from 'axios';
import { marked } from 'marked';

// components
import Intro from '../../components/Intro';
import Head from 'next/head'; 
import Link from 'next/link';

// styled
import styled from 'styled-components';
import * as pallette from '../../styled/ThemeVariables';

const Article = ({article}) => {

    const [ splitDate, setSplitDate ] = useState('');
    const [ creator, setCreator ] = useState({});

    useEffect(() => {
      const handleCreator = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_GET_CREATOR_URL}/${article.authorUsername}`)
        .then(function(response){
          setCreator(response.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      if(article){
        const [ year, month, day ] = article.postDate.split('-');
        setSplitDate(`${month}-${day}-${year}`);
        handleCreator();
      }
    }, [article])
    
    return (
      <StyledArticle>
        <Head>
          <title>{article.postTitle}</title>
          <meta name="description" content={article.content.slice(0, 100)} />
          <meta property="og:url" content="https://dainty-trifle-b85068.netlify.app/" />
          <meta property="og:site_name" content="Tech Blog" />
          <meta property="og:title" content={article.postTitle} />
          <meta property="og:description" content={article.content.slice(0, 100)} />
          <meta property="og:image" content={article.thumbnail} />
          <meta property="twitter:image" content={article.thumbnail} />
          <meta property="twitter:description" content={article.content.slice(0, 100)} />
          <meta property="twitter:title" content={article.postTitle} />
        </Head>
        {
          article === undefined
          ? <></>
          :<div className="article-content">
              <Intro 
                article={article}
                creator={creator}
                splitDate={splitDate}
              />
              <div className="content-container"
                dangerouslySetInnerHTML={{
                  __html: marked(article.content),
                }}
              >
            </div>  
            <div className="bottom-author-container">
              <img src={creator.avatar} alt="" />
              <div className="author-info-wrapper">
                <Link href={`/creators/${article.authorUsername}`}>{article.author}</Link>
                <p>{creator.bio}</p>
              </div>
            </div>
          </div>
        }
      </StyledArticle>
    )
}

export const getServerSideProps = async ({params}) => {
    const articleId = params.articleId;
    const articleData = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_GET_POST_URL}/${articleId}`);
   return {
        props: {
          article: articleData.data,
        },
    }
}

const StyledArticle = styled.div`
  min-height: 20vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 20px auto;
  align-items: center;
  width: 95%;
  max-width: 900px;
  position: relative;
  .article-content {
    position: relative;
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: auto;
    .content-container {
      ul {
        list-style: square inside;
      }
      img {
        width: 100%;
        margin-bottom: 10px;
      }
      p, li {
        font-size: 1rem;
        margin-bottom: 1.5em;
        letter-spacing: .5px;
        line-height: 1.7;
        color: #fff;
      }
      a {
        color: #9acdff;
        font-size: 1rem;
        text-decoration: underline;
      }
      h4 {
        color: ${pallette.titleColor};
        margin: 30px 0 6px 0;
        font-size: 2rem;
      }
      h5 {
        color: ${pallette.titleColor};
        margin: 10px 0;
        font-size: 1.7rem;
      }
      h6 {
        color: ${pallette.titleColor};
        margin: 10px 0 6px 0;
        font-size: 1.5rem;
      }
      code {
        display: flex;
        background: white;
        padding: 10px;
        font-size: 1rem;
        margin: 10px 0;
        white-space: pre-wrap;
      }
    }
    .bottom-author-container {
      display: flex;
      align-items: center;
      border-top: 2px solid #ffffff;
      border-bottom: 2px solid #ffffff;
      padding: 10px 0;
      img {
        width: 50px;
      }
      .author-info-wrapper {
        margin-left: 6px;
        a {
          font-size: 16px;
          color: #fff;
        }
        p {
          font-size: 12px;
          color: ${pallette.helperGrey};
        }
      }
    }
  }
`;

export default Article;