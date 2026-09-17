
import React from 'react';
import { Question } from './types';

export const COLORS = {
  ATP: '#fbbf24', 
  NADH: '#3b82f6', 
  FADH2: '#10b981', 
  ELECTRON: '#ef4444', 
  GLUCOSE: '#8b5cf6', 
  PYRUVATE: '#f97316', 
};

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Where does glycolysis take place in the cell?",
    options: ["Mitochondrial Matrix", "Cytosol", "Cristae", "Chloroplast"],
    correctAnswer: 1,
    explanation: "Glycolysis occurs in the cytosol (cytoplasm), which allows it to function even in anaerobic conditions."
  },
  {
    id: 2,
    text: "How many ATP molecules are used during the 'investment phase' of glycolysis?",
    options: ["0", "1", "2", "4"],
    correctAnswer: 2,
    explanation: "Two ATP are used to phosphorylate glucose, destabilizing it so it can be split into two 3-carbon molecules."
  },
  {
    id: 3,
    text: "What is the final electron acceptor in the Electron Transport Chain?",
    options: ["NADH", "Pyruvate", "Oxygen", "Water"],
    correctAnswer: 2,
    explanation: "Oxygen is the terminal electron acceptor. It pulls electrons through the chain and combines with protons to form water."
  },
  {
    id: 4,
    text: "Which enzyme uses a proton gradient to synthesize ATP?",
    options: ["ATP Synthase", "Hexokinase", "Pyruvate Dehydrogenase", "Citrate Synthase"],
    correctAnswer: 0,
    explanation: "ATP Synthase acts like a molecular turbine, using the flow of H+ ions (protons) to turn ADP and Pi into ATP."
  },
  {
    id: 5,
    text: "During fermentation in humans, pyruvate is converted into...",
    options: ["Ethanol", "Glucose", "Lactic Acid", "Citrate"],
    correctAnswer: 2,
    explanation: "When oxygen is low, humans perform lactic acid fermentation to regenerate NAD+ for glycolysis."
  },
  {
    id: 6,
    text: "How many carbons are lost as CO2 during one full turn of the Krebs Cycle?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    explanation: "Two carbons are released as CO2 per turn, corresponding to the two carbons that entered as Acetyl-CoA."
  },
  {
    id: 7,
    text: "Which carrier molecule produces more ATP during the ETC?",
    options: ["NADH", "FADH2", "They produce the same", "Glucose"],
    correctAnswer: 0,
    explanation: "NADH enters at Complex I and pumps more protons than FADH2, which enters later at Complex II."
  },
  {
    id: 8,
    text: "What is the role of Coenzyme A (CoA) in the Link Reaction?",
    options: ["To release oxygen", "To carry the acetyl group into the Krebs cycle", "To split glucose", "To make ATP"],
    correctAnswer: 1,
    explanation: "CoA attaches to the 2-carbon acetyl group to form Acetyl-CoA, acting as a 'ticket' to enter the mitochondrial matrix."
  },
  {
    id: 9,
    text: "The total theoretical yield of ATP from one glucose molecule is approximately...",
    options: ["2", "4", "30-32", "100+"],
    correctAnswer: 2,
    explanation: "Most biologists agree on a net yield of 30-32 ATP, accounting for the energy costs of moving molecules into the mitochondria."
  },
  {
    id: 10,
    text: "Why is the inner mitochondrial membrane (cristae) highly folded?",
    options: ["To look pretty", "To protect the DNA", "To increase surface area for the ETC", "To store glucose"],
    correctAnswer: 2,
    explanation: "Folding increases the surface area, allowing more Electron Transport Chains and ATP Synthase complexes to fit in the organelle."
  }
];
