"use client"
import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  background-color: #000;
  color: #fff;
  padding: 30px;
  border-radius: 15px;
  max-width: 900px;
  margin: 30px auto;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 1.5s ease-out;
`;

const Title = styled.h2`
  font-size: 3em;
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #00ffff, transparent);
    animation: slideIn 2s infinite;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
`;

const Description = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
  text-align: justify;
  color: #ccc;
`;

const Subtitle = styled.h3`
  font-size: 2em;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #00ffff;
  border-left: 5px solid #00ffff;
  padding-left: 15px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 50px;
    height: 3px;
    background: #00ffff;
  }
`;

const Text = styled.p`
  font-size: 1em;
  margin-bottom: 20px;
  line-height: 1.8;
  color: #ccc;
  text-align: justify;
`;

const BenefitsList = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 1em;
  line-height: 1.8;
  color: #ccc;
`;

const BenefitItem = styled.li`
  margin-bottom: 10px;
  &:before {
    content: '✔';
    margin-right: 10px;
    color: #00ffff;
  }
  font-weight: bold;
`;

const FinalText = styled.p`
  font-size: 1.2em;
  margin-top: 30px;
  color: #ccc;
  text-align: center;
`;

const DrumPalletsInfo: React.FC = () => {
  return (
    <Section id="drum-pallets-info">
      <Title>Drum Pallets: Secure, Durable, and Spill-Resistant</Title>
      <Description>Drum pallets are specially designed to hold drums filled with liquids, offering a range of features that ensure secure handling and transportation. Here are the key benefits and uses of our drum pallets:</Description>

      <Subtitle>Transportation and Export</Subtitle>
      <Text>Our drum pallets make it easy to transport and export liquid products contained in drums. They can accommodate multiple drums at once, facilitating easy lifting and moving with standard equipment like forklifts. Unlike normal pallets, drum pallets are specialized for securing drums and preventing spillage.</Text>

      <Subtitle>Spill Containment</Subtitle>
      <Text>Many of our drum pallets feature integrated spill containment systems. Drums are placed on a grate that allows any spilled liquid to seep through to an enclosed container below. This design ensures that spills are safely contained, making clean-up easier and preventing damage to other products and workplace floors.</Text>

      <Subtitle>Durability and Longevity</Subtitle>
      <Text>Our drum pallets are built to last. Made from durable plastic, they are resistant to fluid damage, rot, and adverse conditions. This plastic construction ensures that the pallets withstand the weight of full drums and the rigors of transportation and warehouse use without coming apart.</Text>

      <Subtitle>Why Choose Our Drum Pallets?</Subtitle>
      <BenefitsList>
        <BenefitItem>Secure Handling: Specially designed to hold drums securely.</BenefitItem>
        <BenefitItem>Spill-Resistant: Built-in containment systems for safe spill management.</BenefitItem>
        <BenefitItem>Durable Construction: Made from robust plastic to withstand harsh conditions.</BenefitItem>
        <BenefitItem>Versatile: Available in various sizes, accommodating from one to eight drums.</BenefitItem>
      </BenefitsList>

      <FinalText>Choose our drum pallets for reliable, safe, and efficient transportation and storage of your liquid products.</FinalText>
    </Section>
  );
}

export default DrumPalletsInfo;
