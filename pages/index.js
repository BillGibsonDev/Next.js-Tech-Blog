import axios from "axios";

// styled
import styled from "styled-components";

// components
import Blogsnip from '../components/Blogsnip';
import HomePageLoader from '../components/HomePageLoader';
import Head from "next/head";

import { motion } from "framer-motion";


const Home = ({articles}) => {
  return (
    <StyledHomePage>
      <Head>
				<title>{`Tech Blog`}</title>
				<meta property="og:url" content="https://next-js-tech-blog-c1ckshbvi-gibbybreakstech.vercel.app/" />
				<meta property="og:site_name" content="Tech Blog" />
				<meta property="og:title" content={`Tech Blog`} />
				<meta property="twitter:title" content={`Tech Blog`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@gibbybreakstech" />
        <meta name="description" content="Tech articles aimed at helping learn and improve Web Development skills." />
        <meta name="keywords" content="HTML, CSS, JavaScript, React, React.js, APIs, Web Developer Blog, Frontend Web Developer, Frontend Developer, Front End Developer, Tech Blog, Programming Blog, Web Design Blog, programming" />
			  <meta name="og:description" content="Tech articles aimed at helping learn and improve Web Development skills." />
        <meta name="twitter:description" content="Tech articles aimed at helping learn and improve Web Development skills." />
        <meta name="keywords" content="HTML, CSS, JavaScript, React, React.js, APIs, Web Developer Blog, Frontend Web Developer, Frontend Developer, Front End Developer, Tech Blog, Programming Blog, Web Design Blog, programming" />
      </Head>
      <div className="blog">
        <div className="blog-wrapper">
          <motion.div initial="hidden" animate="visible" exit="hidden"
          transition={{ ease: "easeOut", duration: 1 }}
          variants={{
            hidden: {
              scale: .8,
              opacity: 0
            },
            visible: {
              scale: 1,
              opacity: 1
            },
          }}>
          {
            !articles
            ? <HomePageLoader />
            : articles.slice().reverse().map((article, index) => {
              return(
                <Blogsnip
                  article={article}
                  key={index}
                />
              )
            })
          }
          </motion.div>
        </div>
      </div>
      {
        articles.length >= 10 
        ? <button id="showmore" onClick={() => { handleShowMore() }}>Show More</button>
        : <></>
      }
    </StyledHomePage>
  )
}

const StyledHomePage = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  max-width: 875px;
  #showmore {
    height: 35px;
    width: 200px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1px;
  }
  .blog {
    display: flex;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    .blog-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 100%;
      margin: 0 auto;
      border-radius: 12px;
    }
  }
`;

export const getServerSideProps = async () => {
  const data = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_GET_POSTS_URL}`)
  return {
    props: {
      articles: data.data,
    },
  }
}

export default Home;
