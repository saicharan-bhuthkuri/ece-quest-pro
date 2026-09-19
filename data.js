// ECE QUEST PRO - Complete Dataset (Questions, Lessons, Formulas, Badges)

export const QUESTIONS = [
  // BASICS
  {
    q: "What is the SI unit of electrical resistance?",
    options: ["Volt", "Ampere", "Ohm", "Watt"],
    answer: 2,
    topic: "Basics",
    difficulty: "Easy",
    exp: "Resistance is measured in Ohms (Ω)."
  },
  {
    q: "What is the SI unit of electric current?",
    options: ["Volt", "Ampere", "Ohm", "Watt"],
    answer: 1,
    topic: "Basics",
    difficulty: "Easy",
    exp: "Electric current is measured in Amperes (A)."
  },
  {
    q: "What is the SI unit of voltage?",
    options: ["Volt", "Ampere", "Ohm", "Coulomb"],
    answer: 0,
    topic: "Basics",
    difficulty: "Easy",
    exp: "Voltage is measured in Volts (V)."
  },
  {
    q: "What is Ohm's Law?",
    options: ["P = VI", "V = IR", "Q = It", "P = I/R"],
    answer: 1,
    topic: "Basics",
    difficulty: "Easy",
    exp: "Ohm's Law is V = I × R."
  },
  {
    q: "Electrical power is measured in:",
    options: ["Joule", "Watt", "Ohm", "Henry"],
    answer: 1,
    topic: "Basics",
    difficulty: "Easy",
    exp: "Electrical power is measured in Watts."
  },
  {
    q: "If voltage remains constant and resistance increases, current:",
    options: ["Increases", "Decreases", "Doubles", "Becomes infinite"],
    answer: 1,
    topic: "Basics",
    difficulty: "Medium",
    exp: "From I = V/R, current decreases when resistance increases."
  },

  // COMPONENTS
  {
    q: "Which component is mainly used to limit current?",
    options: ["Resistor", "Capacitor", "Battery", "Switch"],
    answer: 0,
    topic: "Components",
    difficulty: "Easy",
    exp: "A resistor opposes current and is commonly used for current limiting."
  },
  {
    q: "Which component stores energy in an electric field?",
    options: ["Resistor", "Capacitor", "Inductor", "Diode"],
    answer: 1,
    topic: "Components",
    difficulty: "Easy",
    exp: "A capacitor stores energy in an electric field."
  },
  {
    q: "Which component stores energy in a magnetic field?",
    options: ["Inductor", "Capacitor", "LED", "Fuse"],
    answer: 0,
    topic: "Components",
    difficulty: "Easy",
    exp: "An inductor stores energy in its magnetic field."
  },
  {
    q: "What does LED stand for?",
    options: [
      "Light Emitting Diode",
      "Low Energy Device",
      "Linear Electronic Diode",
      "Light Energy Detector"
    ],
    answer: 0,
    topic: "Components",
    difficulty: "Easy",
    exp: "LED means Light Emitting Diode."
  },
  {
    q: "A conventional diode primarily allows current:",
    options: [
      "In both directions",
      "In one direction",
      "Only at night",
      "Never"
    ],
    answer: 1,
    topic: "Components",
    difficulty: "Easy",
    exp: "A diode primarily conducts current in one direction."
  },
  {
    q: "Which component protects a circuit from excessive current?",
    options: ["Fuse", "Capacitor", "LED", "Inductor"],
    answer: 0,
    topic: "Components",
    difficulty: "Easy",
    exp: "A fuse opens the circuit when excessive current flows."
  },

  // CIRCUITS
  {
    q: "In a series circuit, current through ideal components is:",
    options: ["Different", "The same", "Always zero", "Infinite"],
    answer: 1,
    topic: "Circuits",
    difficulty: "Easy",
    exp: "The same current flows through components connected in series."
  },
  {
    q: "In a parallel circuit, voltage across ideal branches is:",
    options: ["The same", "Always zero", "Always different", "Infinite"],
    answer: 0,
    topic: "Circuits",
    difficulty: "Easy",
    exp: "Parallel branches are connected across the same two nodes."
  },
  {
    q: "KCL is related to conservation of:",
    options: ["Energy", "Charge", "Power", "Resistance"],
    answer: 1,
    topic: "Circuits",
    difficulty: "Medium",
    exp: "Kirchhoff's Current Law follows conservation of electric charge."
  },
  {
    q: "KVL states that the algebraic sum of voltages around a closed loop is:",
    options: ["1", "Infinite", "Zero", "Maximum"],
    answer: 2,
    topic: "Circuits",
    difficulty: "Medium",
    exp: "Kirchhoff's Voltage Law states that the sum is zero."
  },

  // DIGITAL
  {
    q: "Which gate gives HIGH only when all inputs are HIGH?",
    options: ["OR", "NOT", "AND", "XOR"],
    answer: 2,
    topic: "Digital",
    difficulty: "Easy",
    exp: "AND outputs HIGH only when every input is HIGH."
  },
  {
    q: "Which gate gives HIGH when at least one input is HIGH?",
    options: ["AND", "OR", "NOT", "NAND"],
    answer: 1,
    topic: "Digital",
    difficulty: "Easy",
    exp: "OR outputs HIGH when one or more inputs are HIGH."
  },
  {
    q: "Which gate reverses a binary input?",
    options: ["AND", "OR", "NOT", "XOR"],
    answer: 2,
    topic: "Digital",
    difficulty: "Easy",
    exp: "NOT produces the inverse of its input."
  },
  {
    q: "Binary 10 equals decimal:",
    options: ["1", "2", "10", "20"],
    answer: 1,
    topic: "Digital",
    difficulty: "Easy",
    exp: "Binary 10 represents decimal 2."
  },
  {
    q: "The basic unit of digital information is:",
    options: ["Byte", "Bit", "Word", "Register"],
    answer: 1,
    topic: "Digital",
    difficulty: "Easy",
    exp: "A bit can represent 0 or 1."
  },
  {
    q: "Which is a universal logic gate?",
    options: ["AND", "OR", "NAND", "XOR"],
    answer: 2,
    topic: "Digital",
    difficulty: "Medium",
    exp: "NAND can be used to construct other logic gates."
  },
  {
    q: "Which other gate is universal?",
    options: ["NOR", "XOR", "AND", "XNOR"],
    answer: 0,
    topic: "Digital",
    difficulty: "Medium",
    exp: "NOR is also a universal gate."
  },

  // ANALOG
  {
    q: "An amplifier is primarily used to:",
    options: [
      "Increase signal amplitude",
      "Store charge",
      "Measure resistance",
      "Reduce frequency always"
    ],
    answer: 0,
    topic: "Analog",
    difficulty: "Easy",
    exp: "An amplifier increases signal amplitude or power."
  },
  {
    q: "ADC stands for:",
    options: [
      "Analog-to-Digital Converter",
      "Automatic Digital Circuit",
      "Analog Data Controller",
      "Advanced Digital Converter"
    ],
    answer: 0,
    topic: "Analog",
    difficulty: "Easy",
    exp: "ADC converts an analog signal into digital data."
  },
  {
    q: "DAC stands for:",
    options: [
      "Digital-to-Analog Converter",
      "Digital Automatic Circuit",
      "Data Analog Controller",
      "Digital Amplifier Circuit"
    ],
    answer: 0,
    topic: "Analog",
    difficulty: "Easy",
    exp: "DAC converts digital data into an analog output."
  },
  {
    q: "An ideal op-amp has very high:",
    options: [
      "Input impedance",
      "Input current",
      "Output resistance",
      "Power loss"
    ],
    answer: 0,
    topic: "Analog",
    difficulty: "Medium",
    exp: "An ideal op-amp has theoretically infinite input impedance."
  },

  // EMBEDDED
  {
    q: "Which board is widely used for beginner embedded projects?",
    options: ["Arduino Uno", "Monitor", "Router", "Printer"],
    answer: 0,
    topic: "Embedded",
    difficulty: "Easy",
    exp: "Arduino Uno is widely used for beginner electronics projects."
  },
  {
    q: "Which Arduino function executes once at startup?",
    options: ["loop()", "setup()", "start()", "run()"],
    answer: 1,
    topic: "Embedded",
    difficulty: "Easy",
    exp: "setup() runs once when an Arduino program starts."
  },
  {
    q: "Which Arduino function repeats continuously?",
    options: ["setup()", "loop()", "repeat()", "cycle()"],
    answer: 1,
    topic: "Embedded",
    difficulty: "Easy",
    exp: "loop() repeatedly executes after setup()."
  },
  {
    q: "Which sensor commonly measures distance using ultrasonic waves?",
    options: ["HC-SR04", "LDR", "DHT11", "LED"],
    answer: 0,
    topic: "Embedded",
    difficulty: "Easy",
    exp: "HC-SR04 is a common ultrasonic distance sensor."
  },
  {
    q: "LDR stands for:",
    options: [
      "Light Dependent Resistor",
      "Low Digital Resistor",
      "Light Digital Relay",
      "Linear Data Receiver"
    ],
    answer: 0,
    topic: "Embedded",
    difficulty: "Easy",
    exp: "LDR means Light Dependent Resistor."
  },

  // COMMUNICATION
  {
    q: "AM stands for:",
    options: [
      "Amplitude Modulation",
      "Analog Measurement",
      "Audio Mode",
      "Amplitude Measurement"
    ],
    answer: 0,
    topic: "Communication",
    difficulty: "Easy",
    exp: "AM means Amplitude Modulation."
  },
  {
    q: "FM stands for:",
    options: [
      "Frequency Modulation",
      "Frequency Measurement",
      "Fast Modulation",
      "Field Modulation"
    ],
    answer: 0,
    topic: "Communication",
    difficulty: "Easy",
    exp: "FM means Frequency Modulation."
  },
  {
    q: "Which medium uses light to transmit information?",
    options: [
      "Optical fiber",
      "Copper resistor",
      "Transformer",
      "Fuse"
    ],
    answer: 0,
    topic: "Communication",
    difficulty: "Easy",
    exp: "Optical fiber transmits information using light."
  },
  {
    q: "Wi-Fi primarily provides:",
    options: [
      "Wireless network communication",
      "Electrical resistance",
      "Mechanical power",
      "Optical amplification"
    ],
    answer: 0,
    topic: "Communication",
    difficulty: "Easy",
    exp: "Wi-Fi provides wireless network connectivity."
  },

  // MEASUREMENTS
  {
    q: "Which instrument measures voltage?",
    options: ["Ammeter", "Voltmeter", "Ohmmeter", "Wattmeter"],
    answer: 1,
    topic: "Measurements",
    difficulty: "Easy",
    exp: "A voltmeter measures potential difference."
  },
  {
    q: "Which instrument measures current?",
    options: ["Voltmeter", "Ammeter", "Oscilloscope", "Thermometer"],
    answer: 1,
    topic: "Measurements",
    difficulty: "Easy",
    exp: "An ammeter measures electric current."
  },
  {
    q: "Which instrument displays an electrical signal versus time?",
    options: ["Oscilloscope", "Fuse", "Battery", "Transformer"],
    answer: 0,
    topic: "Measurements",
    difficulty: "Easy",
    exp: "An oscilloscope displays electrical waveforms."
  },
  {
    q: "Frequency is commonly measured in:",
    options: ["Hertz", "Volt", "Ohm", "Farad"],
    answer: 0,
    topic: "Measurements",
    difficulty: "Easy",
    exp: "Frequency is measured in Hertz (Hz)."
  },

  // PCB
  {
    q: "PCB stands for:",
    options: [
      "Printed Circuit Board",
      "Power Control Box",
      "Primary Circuit Battery",
      "Program Control Board"
    ],
    answer: 0,
    topic: "PCB",
    difficulty: "Easy",
    exp: "PCB means Printed Circuit Board."
  },
  {
    q: "The green board commonly carrying electronic components is called:",
    options: ["PCB", "LED", "ADC", "LDR"],
    answer: 0,
    topic: "PCB",
    difficulty: "Easy",
    exp: "A PCB provides mechanical support and electrical connections."
  },

  // SIGNALS
  {
    q: "What is the SI unit of frequency?",
    options: ["Hertz", "Joule", "Watt", "Tesla"],
    answer: 0,
    topic: "Signals",
    difficulty: "Easy",
    exp: "Frequency is measured in Hertz."
  },
  {
    q: "A periodic signal repeats after a:",
    options: [
      "Time period",
      "Resistance",
      "Voltage drop",
      "Current gain"
    ],
    answer: 0,
    topic: "Signals",
    difficulty: "Easy",
    exp: "The time required for one complete cycle is the time period."
  }
];

export const LESSONS = {
  "Electrical Basics": {
    icon: "⚡",
    topic: "Basics",
    sections: [
      { title: "Voltage", content: "Voltage is the potential difference between two points. It is measured in Volts (V)." },
      { title: "Current", content: "Electric current represents the flow of charge. It is measured in Amperes (A)." },
      { title: "Resistance", content: "Resistance opposes current flow and is measured in Ohms (Ω)." },
      { title: "Ohm's Law", content: "The basic relationship is V = I × R." },
      { title: "Power", content: "Electrical power is the rate of electrical energy transfer. For DC circuits, P = V × I." }
    ]
  },
  "Components": {
    icon: "🔧",
    topic: "Components",
    sections: [
      { title: "Resistor", content: "Used to limit current and create voltage drops." },
      { title: "Capacitor", content: "Stores energy in an electric field." },
      { title: "Inductor", content: "Stores energy in a magnetic field." },
      { title: "Diode", content: "Allows conventional current primarily in one direction." },
      { title: "LED", content: "A Light Emitting Diode produces light when appropriately forward biased." }
    ]
  },
  "Circuit Theory": {
    icon: "🔌",
    topic: "Circuits",
    sections: [
      { title: "Series Circuit", content: "Components share one current path. The same current flows through ideal series elements." },
      { title: "Parallel Circuit", content: "Components are connected across the same two nodes and therefore have the same voltage." },
      { title: "KCL", content: "Kirchhoff's Current Law is based on conservation of electric charge." },
      { title: "KVL", content: "Kirchhoff's Voltage Law states that the algebraic sum of voltages around a closed loop is zero." }
    ]
  },
  "Digital Electronics": {
    icon: "🔢",
    topic: "Digital",
    sections: [
      { title: "Binary", content: "Binary uses two states, normally represented as 0 and 1." },
      { title: "AND Gate", content: "Produces HIGH only when all inputs are HIGH." },
      { title: "OR Gate", content: "Produces HIGH when at least one input is HIGH." },
      { title: "NOT Gate", content: "Produces the inverse of the input." },
      { title: "Universal Gates", content: "NAND and NOR can be used to implement other logic gates." }
    ]
  },
  "Analog Electronics": {
    icon: "〰️",
    topic: "Analog",
    sections: [
      { title: "Analog Signal", content: "An analog signal can vary continuously with time." },
      { title: "Amplifier", content: "An amplifier increases signal amplitude or power." },
      { title: "ADC", content: "An Analog-to-Digital Converter converts an analog quantity into digital data." },
      { title: "DAC", content: "A Digital-to-Analog Converter produces an analog output from digital data." },
      { title: "Op-Amp", content: "An operational amplifier is a high-gain differential amplifier used in many analog circuits." }
    ]
  },
  "Embedded Systems": {
    icon: "🤖",
    topic: "Embedded",
    sections: [
      { title: "Microcontroller", content: "A microcontroller combines processing, memory and peripherals in a compact device." },
      { title: "Arduino", content: "Arduino boards are popular for learning embedded systems and rapid prototyping." },
      { title: "setup()", content: "Runs once when an Arduino program starts." },
      { title: "loop()", content: "Runs repeatedly after setup()." },
      { title: "Sensors", content: "Sensors convert physical quantities into electrical signals." }
    ]
  },
  "Communication Systems": {
    icon: "📡",
    topic: "Communication",
    sections: [
      { title: "AM", content: "Amplitude Modulation varies carrier amplitude according to the information signal." },
      { title: "FM", content: "Frequency Modulation varies carrier frequency according to the information signal." },
      { title: "Optical Fiber", content: "Optical fiber uses light to carry information." },
      { title: "Wireless Communication", content: "Wireless systems transfer information using electromagnetic waves." }
    ]
  },
  "Measurements": {
    icon: "📏",
    topic: "Measurements",
    sections: [
      { title: "Voltmeter", content: "Used to measure voltage." },
      { title: "Ammeter", content: "Used to measure current." },
      { title: "Ohmmeter", content: "Used to measure resistance." },
      { title: "Oscilloscope", content: "Displays electrical waveforms, usually voltage versus time." },
      { title: "Multimeter", content: "A multimeter can commonly measure voltage, current and resistance." }
    ]
  },
  "PCB & Hardware": {
    icon: "🧩",
    topic: "PCB",
    sections: [
      { title: "PCB", content: "Printed Circuit Boards mechanically support components and provide electrical connections." },
      { title: "Tracks", content: "Copper tracks connect components electrically." },
      { title: "Components", content: "Resistors, capacitors, ICs and connectors can be mounted on a PCB." },
      { title: "Soldering", content: "Soldering creates mechanical and electrical connections between components and pads." }
    ]
  },
  "Signals & Systems": {
    icon: "〽️",
    topic: "Signals",
    sections: [
      { title: "Signal", content: "A signal is a quantity that carries information." },
      { title: "Frequency", content: "Frequency represents the number of cycles per second and is measured in Hertz." },
      { title: "Time Period", content: "For a periodic signal, T = 1/f." },
      { title: "Amplitude", content: "Amplitude represents the magnitude of a signal." }
    ]
  }
};

export const FORMULAS = [
  { title: "Ohm's Law", formula: "V = I × R", description: "Voltage = Current × Resistance" },
  { title: "Current", formula: "I = V / R", description: "Current = Voltage / Resistance" },
  { title: "Power", formula: "P = V × I", description: "Electrical power in DC circuits" },
  { title: "Resistive Power", formula: "P = I²R", description: "Power dissipated across resistance" },
  { title: "Capacitor Charge", formula: "Q = C × V", description: "Charge stored in a capacitor" },
  { title: "Frequency", formula: "f = 1 / T", description: "Frequency as inverse of time period" },
  { title: "Time Period", formula: "T = 1 / f", description: "Time period as inverse of frequency" },
  { title: "Energy", formula: "E = P × t", description: "Total energy from power over time" },
  { title: "Series Resistance", formula: "R = R₁ + R₂ + ...", description: "Total equivalent resistance in series" },
  { title: "Parallel Resistance", formula: "1/R = 1/R₁ + 1/R₂ + ...", description: "Equivalent resistance in parallel" }
];

export const BADGES_DEF = [
  { id: "FIRST STEP", icon: "🎯", desc: "Complete your first question", cond: d => d.total_questions >= 1 },
  { id: "10 CORRECT", icon: "⭐", desc: "Answer 10 correctly", cond: d => d.correct_answers >= 10 },
  { id: "25 CORRECT", icon: "🌟", desc: "Answer 25 correctly", cond: d => d.correct_answers >= 25 },
  { id: "50 CORRECT", icon: "💫", desc: "Answer 50 correctly", cond: d => d.correct_answers >= 50 },
  { id: "QUIZ WARRIOR", icon: "🎮", desc: "Complete 5 quizzes", cond: d => d.quizzes >= 5 },
  { id: "QUIZ LEGEND", icon: "👑", desc: "Complete 10 quizzes", cond: d => d.quizzes >= 10 },
  { id: "STREAK MASTER", icon: "🔥", desc: "Reach a 5 answer streak", cond: d => d.streak >= 5 },
  { id: "XP HUNTER", icon: "⚡", desc: "Earn 1000 XP", cond: d => d.xp >= 1000 },
  { id: "ECE SCHOLAR", icon: "🎓", desc: "Earn 2500 XP", cond: d => d.xp >= 2500 },
  { id: "PERFECT SCORE", icon: "🏆", desc: "Get 100% in a quiz", cond: d => d.best_score === 100 },
  { id: "LEARNER", icon: "📚", desc: "Complete 3 lessons", cond: d => (d.completed_lessons || []).length >= 3 },
  { id: "KNOWLEDGE MASTER", icon: "🧠", desc: "Complete 8 lessons", cond: d => (d.completed_lessons || []).length >= 8 }
];
