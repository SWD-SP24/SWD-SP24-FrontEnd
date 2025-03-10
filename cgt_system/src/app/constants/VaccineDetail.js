export const vaccineDetail = [
  {
    id: 4,
    name: "Hepatitis B",
    description:
      "Contagious viral infection of the liver; spread through contact with infected body fluids such as blood or semen",
    dosesRequired: 3,
    otherNames: ["HBV vaccine"],
    schedule: [
      { age: "Birth (within 24 hours)", doseNumber: 1 },
      { age: "1-2 months", doseNumber: 2 },
      { age: "6-18 months", doseNumber: 3 },
    ],
    dosage: "0.5 mL (infants), 1.0 mL (older children and adults)",
    injectionSite:
      "Intramuscular (thigh for infants, upper arm for older children)",
    ageNotRecommended: "Children with severe allergies to vaccine components",
    sideEffects: ["Soreness at injection site", "Mild fever", "Fatigue"],
  },
  {
    id: 5,
    name: "Rotavirus",
    description:
      "Contagious viral infection of the gut; spread through the mouth from hands and food contaminated with stool",
    dosesRequired: 3,
    otherNames: ["RotaTeq", "Rotarix"],
    schedule: [
      { age: "2 months", doseNumber: 1 },
      { age: "4 months", doseNumber: 2 },
      { age: "6 months (if using RotaTeq)", doseNumber: 3 },
    ],
    dosage: "1.0 - 2.0 mL (oral)",
    injectionSite: "Oral vaccine (not injected)",
    ageNotRecommended: "Children older than 8 months",
    sideEffects: [
      "Mild diarrhea",
      "Irritability",
      "Rare risk of intussusception",
    ],
  },
  {
    id: 6,
    name: "DTaP",
    description:
      "Contagious bacterial infection of the nose, throat, and sometimes lungs; spread through air and direct contact",
    dosesRequired: 5,
    otherNames: ["DTP vaccine"],
    schedule: [
      { age: "2 months", doseNumber: 1 },
      { age: "4 months", doseNumber: 2 },
      { age: "6 months", doseNumber: 3 },
      { age: "15-18 months", doseNumber: 4 },
      { age: "4-6 years", doseNumber: 5 },
    ],
    dosage: "0.5 mL",
    injectionSite:
      "Intramuscular (thigh for infants, upper arm for older children)",
    ageNotRecommended:
      "Children with severe allergic reaction to a previous dose",
    sideEffects: ["Mild fever", "Swelling at injection site", "Irritability"],
  },
  {
    id: 7,
    name: "Hib",
    description:
      "Contagious bacterial infection of the lungs, brain and spinal cord, or bloodstream; spread through air and direct contact",
    dosesRequired: 4,
    otherNames: ["Haemophilus influenzae type B vaccine"],
    schedule: [
      { age: "2 months", doseNumber: 1 },
      { age: "4 months", doseNumber: 2 },
      { age: "6 months", doseNumber: 3 },
      { age: "12-15 months", doseNumber: 4 },
    ],
    dosage: "0.5 mL",
    injectionSite:
      "Intramuscular (thigh for infants, upper arm for older children)",
    ageNotRecommended: "Children older than 5 years (unless at high risk)",
    sideEffects: ["Redness at injection site", "Low fever", "Mild swelling"],
  },
  {
    id: 8,
    name: "Pneumococcal",
    description:
      "Bacterial infections of ears, sinuses, lungs, or bloodstream; spread through direct contact with respiratory droplets like saliva or mucus",
    dosesRequired: 4,
    otherNames: ["PCV13", "PPSV23"],
    schedule: [
      { age: "2 months", doseNumber: 1 },
      { age: "4 months", doseNumber: 2 },
      { age: "6 months", doseNumber: 3 },
      { age: "12-15 months", doseNumber: 4 },
    ],
    dosage: "0.5 mL",
    injectionSite:
      "Intramuscular (thigh for infants, upper arm for older children)",
    ageNotRecommended:
      "Individuals with severe allergies to vaccine components",
    sideEffects: ["Swelling at injection site", "Low fever", "Irritability"],
  },
  {
    id: 9,
    name: "Polio",
    description:
      "Contagious viral infection of nerves and brain; spread through the mouth from stool on contaminated hands, food or liquid, and by air and direct contact",
    dosesRequired: 4,
    otherNames: ["IPV", "OPV"],
    schedule: [
      { age: "2 months", doseNumber: 1 },
      { age: "4 months", doseNumber: 2 },
      { age: "6-18 months", doseNumber: 3 },
      { age: "4-6 years", doseNumber: 4 },
    ],
    dosage: "0.5 mL",
    injectionSite: "Intramuscular or subcutaneous (upper arm or thigh)",
    ageNotRecommended:
      "Children with severe allergic reaction to previous dose",
    sideEffects: ["Pain at injection site", "Mild fever", "Fatigue"],
  },
  {
    id: 10,
    name: "COVID-19",
    description:
      "Contagious viral infection of the nose, throat, or lungs; may feel like a cold or flu. Spread through air and direct contact",
    dosesRequired: 1,
    otherNames: ["SARS-CoV-2 vaccine"],
    schedule: [
      { age: "6 months and older", doseNumber: 1 },
      { age: "After 3-8 weeks", doseNumber: 2 },
      { age: "Booster for 5 years and older", doseNumber: "If needed" },
    ],
    dosage: "0.2 - 0.5 mL (depends on vaccine type)",
    injectionSite: "Intramuscular (upper arm or thigh)",
    ageNotRecommended: "Children under 6 months",
    sideEffects: [
      "Fatigue",
      "Headache",
      "Mild fever",
      "Soreness at injection site",
    ],
  },
  {
    id: 11,
    name: "MMR",
    description:
      "Contagious viral infection that causes high fever, cough, red eyes, runny nose, and rash; spread through air and direct contact",
    dosesRequired: 2,
    otherNames: ["Measles, Mumps, Rubella vaccine"],
    schedule: [
      { age: "12-15 months", doseNumber: 1 },
      { age: "4-6 years", doseNumber: 2 },
    ],
    dosage: "0.5 mL",
    injectionSite: "Subcutaneous (upper arm)",
    ageNotRecommended: "Children under 12 months",
    sideEffects: ["Mild rash", "Low fever", "Swelling at injection site"],
  },
];
