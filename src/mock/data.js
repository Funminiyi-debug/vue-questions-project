const subjectIds = [
  { subject: "Chemistry/Physics", id: "5ff6dc15cca00e2cd0484aa1" },
  { subject: "Biology/Biochemistry", id: "5ff6dc15cca00e2cd0484aa1" },
  { subject: "CARS", id: "5ff6dc15cca00e2cd0484aa3" },
  { subject: "Psychology/Sociology", id: "5ff6dc15cca00e2cd0484aa4" }
];
const passages = [
  {
    subject: subjectIds[0].id,
    passage: `A chemical bond is a lasting attraction between atoms, ions or molecules that enables the formation of chemical compounds. The bond may result from the electrostatic force of attraction between oppositely charged ions as in ionic bonds or through the sharing of electrons as in covalent bonds. The strength of chemical bonds varies considerably; there are "strong bonds" or "primary bonds" such as covalent, ionic and metallic bonds, and "weak bonds" or "secondary bonds" such as dipole–dipole interactions, the London dispersion force and hydrogen bonding.`,
    passagename: "chemical bond",
    questions: [
      {
        description: "How many moons does the earth have?",
        alternatives: [
          {
            text: "2"
          },
          {
            text: "1",
            isCorrect: true
          },
          {
            text: "4"
          }
        ]
      },
      {
        description: "How many suns does the earth have?",
        alternatives: [
          {
            text: "2",
            isCorrect: true
          },
          {
            text: "1"
          },
          {
            text: "4"
          }
        ]
      },
      {
        description: "How old is the earth?",
        subjectId: "5ff5e219682e064b2474dfe6",
        alternatives: [
          {
            text: "2"
          },
          {
            text: "1",
            isCorrect: true
          },
          {
            text: "4"
          }
        ]
      }
    ]
  },
  {
    subject: subjectIds[0].id,
    passage: `Electromagnetism is a branch of physics involving the study of the electromagnetic force, a type of physical interaction that occurs between electrically charged particles. The electromagnetic force is carried by electromagnetic fields composed of electric fields and magnetic fields, and it is responsible for electromagnetic radiation such as light. It is one of the four fundamental interactions (commonly called forces) in nature, together with the strong interaction, the weak interaction, and gravitation.[1] At high energy the weak force and electromagnetic force are unified as a single electroweak force.`,
    passagename: "electromagnetism",
    questions: [
      {
        description: "How many moons does the earth have?",
        alternatives: [
          {
            text: "2"
          },
          {
            text: "1",
            isCorrect: true
          },
          {
            text: "4"
          }
        ]
      },
      {
        description: "How many suns does the earth have?",
        alternatives: [
          {
            text: "2",
            isCorrect: true
          },
          {
            text: "1"
          },
          {
            text: "4"
          }
        ]
      },
      {
        description: "How old is the earth?",
        subjectId: "5ff5e219682e064b2474dfe6",
        alternatives: [
          {
            text: "2"
          },
          {
            text: "1",
            isCorrect: true
          },
          {
            text: "4"
          }
        ]
      }
    ]
  },
  {
    subject: subjectIds[0].id,
    passage: `An electromagnetic field (also EM field) is a classical (i.e. non-quantum) field produced by accelerating electric charges.[1] It is the field described by classical electrodynamics and is the classical counterpart to the quantized electromagnetic field tensor in quantum electrodynamics. The electromagnetic field propagates at the speed of light (in fact, this field can be identified as light) and interacts with charges and currents. Its quantum counterpart is one of the four fundamental forces of nature (the others are gravitation, weak interaction and strong interaction.)`,
    passagename: "electromagnetic fields",
    questions: [
      {
        description: "How many moons does the earth have?",
        alternatives: [
          {
            text: "2"
          },
          {
            text: "1",
            isCorrect: true
          },
          {
            text: "4"
          }
        ]
      },
      {
        description: "How many suns does the earth have?",
        alternatives: [
          {
            text: "2",
            isCorrect: true
          },
          {
            text: "1"
          },
          {
            text: "4"
          }
        ]
      },
      {
        description: "How old is the earth?",
        subjectId: "5ff5e219682e064b2474dfe6",
        alternatives: [
          {
            text: "2"
          },
          {
            text: "1",
            isCorrect: true
          },
          {
            text: "4"
          }
        ]
      }
    ]
  }
];

export default passages;
