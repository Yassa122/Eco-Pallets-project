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

const PlasticPalletsInfo: React.FC = () => {
  return (
    <Section id="plastic-pallets-info">
      <Title>Plastic Pallets: Lightweight, Durable, and Cost-Effective</Title>
      <Description>Plastic pallets offer a range of benefits, including being lightweight, durable, and cost-effective. They are ideal for various applications, ensuring easy handling and long-term reliability. Here are the key benefits and uses of our plastic pallets:</Description>

      <Subtitle>Lightweight</Subtitle>
      <Text>Our plastic pallets are lightweight, making them easy to handle and transport. This reduces the overall weight of shipments and can help lower shipping costs.</Text>

      <Subtitle>Durability</Subtitle>
      <Text>Plastic pallets are resistant to moisture, chemicals, and impacts. This durability ensures they have a long lifespan and can withstand the rigors of frequent use.</Text>

      <Subtitle>Hygienic</Subtitle>
      <Text>Plastic pallets are easy to clean and do not absorb liquids, making them suitable for industries with strict hygiene standards. Their smooth surfaces prevent the accumulation of dirt and contaminants.</Text>

      <Subtitle>Recyclability</Subtitle>
      <Text>Our plastic pallets are recyclable, making them an environmentally friendly choice. They can be reprocessed into new pallets or other plastic products, contributing to sustainability efforts.</Text>

      <Subtitle>Why Choose Our Plastic Pallets?</Subtitle>
      <BenefitsList>
        <BenefitItem>Lightweight: Easy to handle and transport.</BenefitItem>
        <BenefitItem>Durability: Resistant to moisture, chemicals, and impacts.</BenefitItem>
        <BenefitItem>Hygienic: Easy to clean and non-absorbent.</BenefitItem>
        <BenefitItem>Recyclability: Environmentally friendly and recyclable.</BenefitItem>
      </BenefitsList>

      <FinalText>Choose our plastic pallets for a lightweight, durable, and sustainable solution for your transportation and storage needs.</FinalText>
    </Section>
  );
}

export default PlasticPalletsInfo;
