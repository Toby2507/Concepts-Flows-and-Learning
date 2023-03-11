import React from 'react'
import styled from 'styled-components'
import Section from './Section'

const Home = () => {
    return (
        <Container>
            <Section title="Model S" desc="Order Online for Touchless Delivery" bgImg="model-s.jpg" lbText="Custom order" rbText="Existing Inventory" />
            <Section title="Model Y" desc="Order Online for Touchless Delivery" bgImg="model-y.jpg" lbText="Custom order" rbText="Existing Inventory" />
            <Section title="Model 3" desc="Order Online for Touchless Delivery" bgImg="model-3.jpg" lbText="Custom order" rbText="Existing Inventory" />
            <Section title="Model X" desc="Order Online for Touchless Delivery" bgImg="model-x.jpg" lbText="Custom order" rbText="Existing Inventory" />
            <Section title="Lowest Cost Solar Panels in America" desc="Money-back guarantee" bgImg="solar-panel.jpg" lbText="Order now" rbText="Learn more" />
            <Section title="Solar for New Roofs" desc="Solar Roof Costs Less Than a New Roof Plus Solar Panels" bgImg="solar-roof.jpg" lbText="Order now" rbText="Learn more" />
            <Section title="Accessories" desc="" bgImg="accessories.jpg" lbText="shop now" />
        </Container>
    )
}

export default Home

const Container = styled.div`
    height: 100vh;

`