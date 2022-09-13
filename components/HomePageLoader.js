// styled
import styled from "styled-components";

const HomePageLoader = () => {
  return (
    <StyledPlaceholder>
        <div className="ghost-container"><div className="ghost-image"></div><div className="ghost-text"></div></div>
        <div className="ghost-container"><div className="ghost-image"></div><div className="ghost-text"></div></div>
        <div className="ghost-container"><div className="ghost-image"></div><div className="ghost-text"></div></div>
    </StyledPlaceholder>
  )
}

const StyledPlaceholder = styled.div`
    min-height: 90vh;
    width: 90%;
    margin: 0 auto;
    .ghost-container {
        min-height: 30vh;
        width: 100%;
        padding: 10px;
        margin: 20px auto;
        background: #ffffff1d;
        box-shadow: 4px 4px 4px #00000044;
        animation: opacity 2s linear infinite;
        position: relative;
        border-radius: 12px;
        .ghost-image {
            background: #00000039;
            height: 20vh;
            margin: 1vh auto 2vh auto;
            position: relative;
            border-radius: 12px;
        }
        .ghost-text {
            background: #00000039;
            height: 6vh;
            margin: 0 auto ;
            position: relative;
            border-radius: 12px;
        }
    }
    @keyframes opacity {
    0%  { opacity: 1; }
    25% { opacity: .8; }
    50% { opacity: .5; }
    75% { opacity: .8; }
    100% { opacity: 1; }
    }
`;


export default HomePageLoader
