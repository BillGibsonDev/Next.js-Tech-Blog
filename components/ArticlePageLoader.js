// styled
import styled from 'styled-components';

const ArticlePageLoader = () => {
    return (
      <StyledPlaceholder>
        <div className="ghost-text"></div>
        <div className="ghost-text"></div>
        <div className="ghost-image"></div>
        <div className="ghost-text"></div>
        <div className="ghost-text"></div>
        <div className="ghost-text"></div>
        <div className="ghost-text"></div>
      </StyledPlaceholder>
    )
}

const StyledPlaceholder = styled.div`
    min-height: 80vh;
    width: 100%;
    margin: 20px auto;
    animation: opacity 2s linear infinite;
    position: relative;
    border-radius: 12px;
    .ghost-image {
      background: #00000039;
      height: 400px;
      width: 90%;
      margin: 1vh auto 2vh auto;
      position: relative;
      border-radius: 12px;
      box-shadow: 4px 4px 4px #00000044;
    }
    .ghost-text {
      background: #00000021;
      height: 6vh;
      width: 90%;
      margin: 10px auto ;
      position: relative;
      border-radius: 12px;
      box-shadow: 4px 4px 4px #00000044;
    }
    @keyframes opacity {
        0%  { opacity: 1; }
        25% { opacity: .8; }
        50% { opacity: .5; }
        75% { opacity: .8; }
        100% { opacity: 1; }
    }
`;

export default ArticlePageLoader;