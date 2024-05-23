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

const MetalPalletsInfo: React.FC = () => {
  return (
    <Section id="metal-pallets-info">
      <Title>Metal Pallets: Strong, Durable, and Long-Lasting</Title>
      <Description>Metal pallets are designed to handle heavy loads and withstand harsh environments, offering a range of features that ensure robust handling and longevity. Here are the key benefits and uses of our metal pallets:</Description>

      <Subtitle>Heavy Load Capacity</Subtitle>
      <Text>Our metal pallets are built to carry heavy loads with ease, making them ideal for industrial applications where weight and strength are critical factors. They provide reliable support for large and heavy items, ensuring safe transportation and storage.</Text>

      <Subtitle>Durability</Subtitle>
      <Text>Metal pallets are known for their exceptional durability. Made from high-quality steel or aluminum, they are resistant to damage, corrosion, and wear, making them suitable for long-term use in tough environments.</Text>

      <Subtitle>Fire Resistance</Subtitle>
      <Text>Unlike wooden or plastic pallets, metal pallets are non-combustible and can withstand high temperatures. This fire resistance makes them a safer choice for industries where fire hazards are a concern.</Text>

      <Subtitle>Hygiene</Subtitle>
      <Text>Metal pallets are easy to clean and sanitize, making them ideal for industries with strict hygiene standards, such as food and pharmaceuticals. Their smooth surfaces prevent the accumulation of dirt and contaminants.</Text>

      <Subtitle>Why Choose Our Metal Pallets?</Subtitle>
      <BenefitsList>
        <BenefitItem>Heavy Load Capacity: Built to carry heavy loads with ease.</BenefitItem>
        <BenefitItem>Durability: Resistant to damage, corrosion, and wear.</BenefitItem>
        <BenefitItem>Fire Resistance: Non-combustible and high-temperature resistant.</BenefitItem>
        <BenefitItem>Hygiene: Easy to clean and sanitize.</BenefitItem>
      </BenefitsList>

      <FinalText>Choose our metal pallets for strength, durability, and safety in your industrial applications.</FinalText>
    </Section>
  );
}

export default MetalPalletsInfo;
