import React from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade';

const Section = ({ title, desc, bgImg, lbText, rbText }) => {
    return (
        <Wrap img={bgImg}>
            <Fade bottom>
                <ItemText>
                    <h1>{title}</h1>
                    <p>{desc}</p>
                </ItemText>
            </Fade>
            <Buttons>
                <Fade bottom>
                    <ButtonGroup>
                        <LeftButton>{lbText}</LeftButton>
                        {rbText && <RightButton>{rbText}</RightButton>}
                    </ButtonGroup>
                </Fade>
                <DownArrow src="/images/down-arrow.svg" />
            </Buttons>
        </Wrap>
    )
}

export default Section

const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: ${props => `url("/images/${props.img}") center/cover no-repeat`};
`
const ItemText = styled.div`
    padding-top: 15vh;
    text-align: center;
`
const ButtonGroup = styled.div`
    display: flex;
    width: 100%;
    items-align: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 30px;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`
const LeftButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(23, 26, 32, 0.8);
    height: 40px;
    width: 256px;
    color: white;
    border-radius: 100px;
    opacity: 0.85;
    text-transform: uppercase;
    font-size: 12px;
    cursor: pointer;
`
const RightButton = styled(LeftButton)`
    background-color: white;
    opacity: 0.65;
    color: black;
`
const DownArrow = styled.img`
    height: 40px;
    overflow-x: hidden;
    margin-bottom: 5px;
    animation: animateDown infinite 1.5s;
`
const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`