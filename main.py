import tkinter as tk
from tkinter import messagebox, simpledialog
import random
import json
import os
import math
from datetime import datetime

# ============================================================
# ECE QUEST PRO
# Personal ECE Learning Platform
# Python + Tkinter | No external packages required
# ============================================================

APP_NAME = "ECE QUEST PRO"
DATA_FILE = "ece_quest_pro_data.json"

WIDTH = 1150
HEIGHT = 760

BG = "#07111F"
PANEL = "#0D1B2E"
PANEL2 = "#10243B"
PANEL3 = "#15304D"
TEXT = "#FFFFFF"
MUTED = "#8EA3B8"
ACCENT = "#2F80ED"
ACCENT_DARK = "#1D5FB8"
GREEN = "#27AE60"
RED = "#E05252"
YELLOW = "#F2C94C"
PURPLE = "#9B51E0"
CYAN = "#22D3EE"
BORDER = "#1B3550"

FONT = "Segoe UI"


# ============================================================
# QUESTION BANK
# ============================================================

QUESTIONS = [

    # BASICS
    {
        "q": "What is the SI unit of electrical resistance?",
        "options": ["Volt", "Ampere", "Ohm", "Watt"],
        "answer": 2,
        "topic": "Basics",
        "difficulty": "Easy",
        "exp": "Resistance is measured in Ohms (Ω)."
    },
    {
        "q": "What is the SI unit of electric current?",
        "options": ["Volt", "Ampere", "Ohm", "Watt"],
        "answer": 1,
        "topic": "Basics",
        "difficulty": "Easy",
        "exp": "Electric current is measured in Amperes (A)."
    },
    {
        "q": "What is the SI unit of voltage?",
        "options": ["Volt", "Ampere", "Ohm", "Coulomb"],
        "answer": 0,
        "topic": "Basics",
        "difficulty": "Easy",
        "exp": "Voltage is measured in Volts (V)."
    },
    {
        "q": "What is Ohm's Law?",
        "options": ["P = VI", "V = IR", "Q = It", "P = I/R"],
        "answer": 1,
        "topic": "Basics",
        "difficulty": "Easy",
        "exp": "Ohm's Law is V = I × R."
    },
    {
        "q": "Electrical power is measured in:",
        "options": ["Joule", "Watt", "Ohm", "Henry"],
        "answer": 1,
        "topic": "Basics",
        "difficulty": "Easy",
        "exp": "Electrical power is measured in Watts."
    },
    {
        "q": "If voltage remains constant and resistance increases, current:",
        "options": ["Increases", "Decreases", "Doubles", "Becomes infinite"],
        "answer": 1,
        "topic": "Basics",
        "difficulty": "Medium",
        "exp": "From I = V/R, current decreases when resistance increases."
    },

    # COMPONENTS
    {
        "q": "Which component is mainly used to limit current?",
        "options": ["Resistor", "Capacitor", "Battery", "Switch"],
        "answer": 0,
        "topic": "Components",
        "difficulty": "Easy",
        "exp": "A resistor opposes current and is commonly used for current limiting."
    },
    {
        "q": "Which component stores energy in an electric field?",
        "options": ["Resistor", "Capacitor", "Inductor", "Diode"],
        "answer": 1,
        "topic": "Components",
        "difficulty": "Easy",
        "exp": "A capacitor stores energy in an electric field."
    },
    {
        "q": "Which component stores energy in a magnetic field?",
        "options": ["Inductor", "Capacitor", "LED", "Fuse"],
        "answer": 0,
        "topic": "Components",
        "difficulty": "Easy",
        "exp": "An inductor stores energy in its magnetic field."
    },
    {
        "q": "What does LED stand for?",
        "options": [
            "Light Emitting Diode",
            "Low Energy Device",
            "Linear Electronic Diode",
            "Light Energy Detector"
        ],
        "answer": 0,
        "topic": "Components",
        "difficulty": "Easy",
        "exp": "LED means Light Emitting Diode."
    },
    {
        "q": "A conventional diode primarily allows current:",
        "options": [
            "In both directions",
            "In one direction",
            "Only at night",
            "Never"
        ],
        "answer": 1,
        "topic": "Components",
        "difficulty": "Easy",
        "exp": "A diode primarily conducts current in one direction."
    },
    {
        "q": "Which component protects a circuit from excessive current?",
        "options": ["Fuse", "Capacitor", "LED", "Inductor"],
        "answer": 0,
        "topic": "Components",
        "difficulty": "Easy",
        "exp": "A fuse opens the circuit when excessive current flows."
    },

    # CIRCUITS
    {
        "q": "In a series circuit, current through ideal components is:",
        "options": ["Different", "The same", "Always zero", "Infinite"],
        "answer": 1,
        "topic": "Circuits",
        "difficulty": "Easy",
        "exp": "The same current flows through components connected in series."
    },
    {
        "q": "In a parallel circuit, voltage across ideal branches is:",
        "options": ["The same", "Always zero", "Always different", "Infinite"],
        "answer": 0,
        "topic": "Circuits",
        "difficulty": "Easy",
        "exp": "Parallel branches are connected across the same two nodes."
    },
    {
        "q": "KCL is related to conservation of:",
        "options": ["Energy", "Charge", "Power", "Resistance"],
        "answer": 1,
        "topic": "Circuits",
        "difficulty": "Medium",
        "exp": "Kirchhoff's Current Law follows conservation of electric charge."
    },
    {
        "q": "KVL states that the algebraic sum of voltages around a closed loop is:",
        "options": ["1", "Infinite", "Zero", "Maximum"],
        "answer": 2,
        "topic": "Circuits",
        "difficulty": "Medium",
        "exp": "Kirchhoff's Voltage Law states that the sum is zero."
    },

    # DIGITAL
    {
        "q": "Which gate gives HIGH only when all inputs are HIGH?",
        "options": ["OR", "NOT", "AND", "XOR"],
        "answer": 2,
        "topic": "Digital",
        "difficulty": "Easy",
        "exp": "AND outputs HIGH only when every input is HIGH."
    },
    {
        "q": "Which gate gives HIGH when at least one input is HIGH?",
        "options": ["AND", "OR", "NOT", "NAND"],
        "answer": 1,
        "topic": "Digital",
        "difficulty": "Easy",
        "exp": "OR outputs HIGH when one or more inputs are HIGH."
    },
    {
        "q": "Which gate reverses a binary input?",
        "options": ["AND", "OR", "NOT", "XOR"],
        "answer": 2,
        "topic": "Digital",
        "difficulty": "Easy",
        "exp": "NOT produces the inverse of its input."
    },
    {
        "q": "Binary 10 equals decimal:",
        "options": ["1", "2", "10", "20"],
        "answer": 1,
        "topic": "Digital",
        "difficulty": "Easy",
        "exp": "Binary 10 represents decimal 2."
    },
    {
        "q": "The basic unit of digital information is:",
        "options": ["Byte", "Bit", "Word", "Register"],
        "answer": 1,
        "topic": "Digital",
        "difficulty": "Easy",
        "exp": "A bit can represent 0 or 1."
    },
    {
        "q": "Which is a universal logic gate?",
        "options": ["AND", "OR", "NAND", "XOR"],
        "answer": 2,
        "topic": "Digital",
        "difficulty": "Medium",
        "exp": "NAND can be used to construct other logic gates."
    },
    {
        "q": "Which other gate is universal?",
        "options": ["NOR", "XOR", "AND", "XNOR"],
        "answer": 0,
        "topic": "Digital",
        "difficulty": "Medium",
        "exp": "NOR is also a universal gate."
    },

    # ANALOG
    {
        "q": "An amplifier is primarily used to:",
        "options": [
            "Increase signal amplitude",
            "Store charge",
            "Measure resistance",
            "Reduce frequency always"
        ],
        "answer": 0,
        "topic": "Analog",
        "difficulty": "Easy",
        "exp": "An amplifier increases signal amplitude or power."
    },
    {
        "q": "ADC stands for:",
        "options": [
            "Analog-to-Digital Converter",
            "Automatic Digital Circuit",
            "Analog Data Controller",
            "Advanced Digital Converter"
        ],
        "answer": 0,
        "topic": "Analog",
        "difficulty": "Easy",
        "exp": "ADC converts an analog signal into digital data."
    },
    {
        "q": "DAC stands for:",
        "options": [
            "Digital-to-Analog Converter",
            "Digital Automatic Circuit",
            "Data Analog Controller",
            "Digital Amplifier Circuit"
        ],
        "answer": 0,
        "topic": "Analog",
        "difficulty": "Easy",
        "exp": "DAC converts digital data into an analog output."
    },
    {
        "q": "An ideal op-amp has very high:",
        "options": [
            "Input impedance",
            "Input current",
            "Output resistance",
            "Power loss"
        ],
        "answer": 0,
        "topic": "Analog",
        "difficulty": "Medium",
        "exp": "An ideal op-amp has theoretically infinite input impedance."
    },

    # EMBEDDED
    {
        "q": "Which board is widely used for beginner embedded projects?",
        "options": ["Arduino Uno", "Monitor", "Router", "Printer"],
        "answer": 0,
        "topic": "Embedded",
        "difficulty": "Easy",
        "exp": "Arduino Uno is widely used for beginner electronics projects."
    },
    {
        "q": "Which Arduino function executes once at startup?",
        "options": ["loop()", "setup()", "start()", "run()"],
        "answer": 1,
        "topic": "Embedded",
        "difficulty": "Easy",
        "exp": "setup() runs once when an Arduino program starts."
    },
    {
        "q": "Which Arduino function repeats continuously?",
        "options": ["setup()", "loop()", "repeat()", "cycle()"],
        "answer": 1,
        "topic": "Embedded",
        "difficulty": "Easy",
        "exp": "loop() repeatedly executes after setup()."
    },
    {
        "q": "Which sensor commonly measures distance using ultrasonic waves?",
        "options": ["HC-SR04", "LDR", "DHT11", "LED"],
        "answer": 0,
        "topic": "Embedded",
        "difficulty": "Easy",
        "exp": "HC-SR04 is a common ultrasonic distance sensor."
    },
    {
        "q": "LDR stands for:",
        "options": [
            "Light Dependent Resistor",
            "Low Digital Resistor",
            "Light Digital Relay",
            "Linear Data Receiver"
        ],
        "answer": 0,
        "topic": "Embedded",
        "difficulty": "Easy",
        "exp": "LDR means Light Dependent Resistor."
    },

    # COMMUNICATION
    {
        "q": "AM stands for:",
        "options": [
            "Amplitude Modulation",
            "Analog Measurement",
            "Audio Mode",
            "Amplitude Measurement"
        ],
        "answer": 0,
        "topic": "Communication",
        "difficulty": "Easy",
        "exp": "AM means Amplitude Modulation."
    },
    {
        "q": "FM stands for:",
        "options": [
            "Frequency Modulation",
            "Frequency Measurement",
            "Fast Modulation",
            "Field Modulation"
        ],
        "answer": 0,
        "topic": "Communication",
        "difficulty": "Easy",
        "exp": "FM means Frequency Modulation."
    },
    {
        "q": "Which medium uses light to transmit information?",
        "options": [
            "Optical fiber",
            "Copper resistor",
            "Transformer",
            "Fuse"
        ],
        "answer": 0,
        "topic": "Communication",
        "difficulty": "Easy",
        "exp": "Optical fiber transmits information using light."
    },
    {
        "q": "Wi-Fi primarily provides:",
        "options": [
            "Wireless network communication",
            "Electrical resistance",
            "Mechanical power",
            "Optical amplification"
        ],
        "answer": 0,
        "topic": "Communication",
        "difficulty": "Easy",
        "exp": "Wi-Fi provides wireless network connectivity."
    },

    # MEASUREMENTS
    {
        "q": "Which instrument measures voltage?",
        "options": ["Ammeter", "Voltmeter", "Ohmmeter", "Wattmeter"],
        "answer": 1,
        "topic": "Measurements",
        "difficulty": "Easy",
        "exp": "A voltmeter measures potential difference."
    },
    {
        "q": "Which instrument measures current?",
        "options": ["Voltmeter", "Ammeter", "Oscilloscope", "Thermometer"],
        "answer": 1,
        "topic": "Measurements",
        "difficulty": "Easy",
        "exp": "An ammeter measures electric current."
    },
    {
        "q": "Which instrument displays an electrical signal versus time?",
        "options": ["Oscilloscope", "Fuse", "Battery", "Transformer"],
        "answer": 0,
        "topic": "Measurements",
        "difficulty": "Easy",
        "exp": "An oscilloscope displays electrical waveforms."
    },
    {
        "q": "Frequency is commonly measured in:",
        "options": ["Hertz", "Volt", "Ohm", "Farad"],
        "answer": 0,
        "topic": "Measurements",
        "difficulty": "Easy",
        "exp": "Frequency is measured in Hertz (Hz)."
    },

    # PCB
    {
        "q": "PCB stands for:",
        "options": [
            "Printed Circuit Board",
            "Power Control Box",
            "Primary Circuit Battery",
            "Program Control Board"
        ],
        "answer": 0,
        "topic": "PCB",
        "difficulty": "Easy",
        "exp": "PCB means Printed Circuit Board."
    },
    {
        "q": "The green board commonly carrying electronic components is called:",
        "options": ["PCB", "LED", "ADC", "LDR"],
        "answer": 0,
        "topic": "PCB",
        "difficulty": "Easy",
        "exp": "A PCB provides mechanical support and electrical connections."
    },

    # SIGNALS
    {
        "q": "What is the SI unit of frequency?",
        "options": ["Hertz", "Joule", "Watt", "Tesla"],
        "answer": 0,
        "topic": "Signals",
        "difficulty": "Easy",
        "exp": "Frequency is measured in Hertz."
    },
    {
        "q": "A periodic signal repeats after a:",
        "options": [
            "Time period",
            "Resistance",
            "Voltage drop",
            "Current gain"
        ],
        "answer": 0,
        "topic": "Signals",
        "difficulty": "Easy",
        "exp": "The time required for one complete cycle is the time period."
    }
]


# ============================================================
# LESSONS
# ============================================================

LESSONS = {

    "Electrical Basics": {
        "icon": "⚡",
        "topic": "Basics",
        "sections": [
            ("Voltage",
             "Voltage is the potential difference between two points. "
             "It is measured in Volts (V)."),

            ("Current",
             "Electric current represents the flow of charge. "
             "It is measured in Amperes (A)."),

            ("Resistance",
             "Resistance opposes current flow and is measured in Ohms (Ω)."),

            ("Ohm's Law",
             "The basic relationship is V = I × R."),

            ("Power",
             "Electrical power is the rate of electrical energy transfer. "
             "For DC circuits, P = V × I.")
        ]
    },

    "Components": {
        "icon": "🔧",
        "topic": "Components",
        "sections": [
            ("Resistor",
             "Used to limit current and create voltage drops."),

            ("Capacitor",
             "Stores energy in an electric field."),

            ("Inductor",
             "Stores energy in a magnetic field."),

            ("Diode",
             "Allows conventional current primarily in one direction."),

            ("LED",
             "A Light Emitting Diode produces light when appropriately forward biased.")
        ]
    },

    "Circuit Theory": {
        "icon": "🔌",
        "topic": "Circuits",
        "sections": [
            ("Series Circuit",
             "Components share one current path. The same current flows through ideal series elements."),

            ("Parallel Circuit",
             "Components are connected across the same two nodes and therefore have the same voltage."),

            ("KCL",
             "Kirchhoff's Current Law is based on conservation of electric charge."),

            ("KVL",
             "Kirchhoff's Voltage Law states that the algebraic sum of voltages around a closed loop is zero.")
        ]
    },

    "Digital Electronics": {
        "icon": "🔢",
        "topic": "Digital",
        "sections": [
            ("Binary",
             "Binary uses two states, normally represented as 0 and 1."),

            ("AND Gate",
             "Produces HIGH only when all inputs are HIGH."),

            ("OR Gate",
             "Produces HIGH when at least one input is HIGH."),

            ("NOT Gate",
             "Produces the inverse of the input."),

            ("Universal Gates",
             "NAND and NOR can be used to implement other logic gates.")
        ]
    },

    "Analog Electronics": {
        "icon": "〰️",
        "topic": "Analog",
        "sections": [
            ("Analog Signal",
             "An analog signal can vary continuously with time."),

            ("Amplifier",
             "An amplifier increases signal amplitude or power."),

            ("ADC",
             "An Analog-to-Digital Converter converts an analog quantity into digital data."),

            ("DAC",
             "A Digital-to-Analog Converter produces an analog output from digital data."),

            ("Op-Amp",
             "An operational amplifier is a high-gain differential amplifier used in many analog circuits.")
        ]
    },

    "Embedded Systems": {
        "icon": "🤖",
        "topic": "Embedded",
        "sections": [
            ("Microcontroller",
             "A microcontroller combines processing, memory and peripherals in a compact device."),

            ("Arduino",
             "Arduino boards are popular for learning embedded systems and rapid prototyping."),

            ("setup()",
             "Runs once when an Arduino program starts."),

            ("loop()",
             "Runs repeatedly after setup()."),

            ("Sensors",
             "Sensors convert physical quantities into electrical signals.")
        ]
    },

    "Communication Systems": {
        "icon": "📡",
        "topic": "Communication",
        "sections": [
            ("AM",
             "Amplitude Modulation varies carrier amplitude according to the information signal."),

            ("FM",
             "Frequency Modulation varies carrier frequency according to the information signal."),

            ("Optical Fiber",
             "Optical fiber uses light to carry information."),

            ("Wireless Communication",
             "Wireless systems transfer information using electromagnetic waves.")
        ]
    },

    "Measurements": {
        "icon": "📏",
        "topic": "Measurements",
        "sections": [
            ("Voltmeter",
             "Used to measure voltage."),

            ("Ammeter",
             "Used to measure current."),

            ("Ohmmeter",
             "Used to measure resistance."),

            ("Oscilloscope",
             "Displays electrical waveforms, usually voltage versus time."),

            ("Multimeter",
             "A multimeter can commonly measure voltage, current and resistance.")
        ]
    },

    "PCB & Hardware": {
        "icon": "🧩",
        "topic": "PCB",
        "sections": [
            ("PCB",
             "Printed Circuit Boards mechanically support components and provide electrical connections."),

            ("Tracks",
             "Copper tracks connect components electrically."),

            ("Components",
             "Resistors, capacitors, ICs and connectors can be mounted on a PCB."),

            ("Soldering",
             "Soldering creates mechanical and electrical connections between components and pads.")
        ]
    },

    "Signals & Systems": {
        "icon": "〽️",
        "topic": "Signals",
        "sections": [
            ("Signal",
             "A signal is a quantity that carries information."),

            ("Frequency",
             "Frequency represents the number of cycles per second and is measured in Hertz."),

            ("Time Period",
             "For a periodic signal, T = 1/f."),

            ("Amplitude",
             "Amplitude represents the magnitude of a signal.")
        ]
    }
}


# ============================================================
# FORMULA HUB
# ============================================================

FORMULAS = [
    ("Ohm's Law", "V = I × R", "Voltage = Current × Resistance"),
    ("Current", "I = V / R", "Current = Voltage / Resistance"),
    ("Power", "P = V × I", "Electrical power"),
    ("Resistive Power", "P = I²R", "Power using current and resistance"),
    ("Capacitor", "Q = C × V", "Charge stored in a capacitor"),
    ("Frequency", "f = 1 / T", "Frequency and time period"),
    ("Time Period", "T = 1 / f", "Time period and frequency"),
    ("Energy", "E = P × t", "Energy from power and time"),
    ("Series Resistance", "R = R₁ + R₂ + ...", "Total resistance in series"),
    ("Parallel Resistance", "1/R = 1/R₁ + 1/R₂ + ...", "Equivalent resistance in parallel"),
]


# ============================================================
# APP CLASS
# ============================================================

class ECEQuestPro:

    def __init__(self, root):

        self.root = root

        self.root.title(APP_NAME)
        self.root.geometry(f"{WIDTH}x{HEIGHT}")
        self.root.resizable(False, False)
        self.root.configure(bg=BG)

        self.data = self.load_data()

        self.quiz_questions = []
        self.quiz_index = 0
        self.quiz_correct = 0
        self.quiz_xp = 0
        self.quiz_difficulty = "Mixed"
        self.quiz_size = 10
        self.timer_seconds = 30
        self.timer_job = None
        self.quiz_buttons = []

        self.show_home()

    # ========================================================
    # DATA
    # ========================================================

    def default_data(self):

        return {
            "profile": {
                "name": "Rushanth",
                "college": "Trinity College of Engineering and Technology",
                "branch": "ECE",
                "year": "2nd Year"
            },

            "xp": 0,
            "streak": 0,
            "total_questions": 0,
            "correct_answers": 0,
            "quizzes": 0,
            "best_score": 0,
            "badges": [],
            "history": [],
            "daily_date": "",
            "daily_done": False,
            "daily_score": 0,
            "completed_lessons": []
        }

    def load_data(self):

        if not os.path.exists(DATA_FILE):
            return self.default_data()

        try:

            with open(
                DATA_FILE,
                "r",
                encoding="utf-8"
            ) as f:

                data = json.load(f)

            default = self.default_data()

            for key, value in default.items():

                if key not in data:
                    data[key] = value

            for key, value in default["profile"].items():

                if key not in data["profile"]:
                    data["profile"][key] = value

            return data

        except Exception:

            return self.default_data()

    def save_data(self):

        try:

            with open(
                DATA_FILE,
                "w",
                encoding="utf-8"
            ) as f:

                json.dump(
                    self.data,
                    f,
                    indent=4,
                    ensure_ascii=False
                )

        except Exception:
            pass

    # ========================================================
    # LEVEL
    # ========================================================

    def level(self):

        return (self.data["xp"] // 500) + 1

    def level_xp(self):

        return self.data["xp"] % 500

    def level_percent(self):

        return self.level_xp() / 500

    # ========================================================
    # UI HELPERS
    # ========================================================

    def clear(self):

        if self.timer_job:

            try:
                self.root.after_cancel(self.timer_job)
            except:
                pass

            self.timer_job = None

        for widget in self.root.winfo_children():
            widget.destroy()

    def make_button(
        self,
        parent,
        text,
        command,
        width=18,
        height=2,
        bg=PANEL2,
        size=10
    ):

        return tk.Button(
            parent,
            text=text,
            command=command,
            width=width,
            height=height,
            font=(FONT, size, "bold"),
            bg=bg,
            fg=TEXT,
            activebackground=ACCENT,
            activeforeground=TEXT,
            relief="flat",
            bd=0,
            cursor="hand2"
        )

    def title_label(
        self,
        parent,
        text,
        size=24
    ):

        return tk.Label(
            parent,
            text=text,
            font=(FONT, size, "bold"),
            bg=BG,
            fg=TEXT
        )

    def header(
        self,
        subtitle=""
    ):

        h = tk.Frame(
            self.root,
            bg=BG,
            height=76
        )

        h.pack(fill="x")
        h.pack_propagate(False)

        tk.Label(
            h,
            text="⚡ ECE QUEST PRO",
            font=(FONT, 21, "bold"),
            bg=BG,
            fg=TEXT
        ).pack(
            side="left",
            padx=28
        )

        if subtitle:

            tk.Label(
                h,
                text=subtitle.upper(),
                font=(FONT, 8, "bold"),
                bg=BG,
                fg=MUTED
            ).pack(
                side="left",
                padx=10
            )

        self.make_button(
            h,
            "⌂ HOME",
            self.show_home,
            width=10,
            height=1,
            bg=PANEL
        ).pack(
            side="right",
            padx=20
        )

        return h

    # ========================================================
    # HOME
    # ========================================================

    def show_home(self):

        self.clear()

        h = tk.Frame(
            self.root,
            bg=BG,
            height=82
        )

        h.pack(fill="x")
        h.pack_propagate(False)

        tk.Label(
            h,
            text="⚡ ECE QUEST PRO",
            font=(FONT, 25, "bold"),
            bg=BG,
            fg=TEXT
        ).pack(
            side="left",
            padx=30
        )

        tk.Label(
            h,
            text="YOUR PERSONAL ECE LEARNING PLATFORM",
            font=(FONT, 8, "bold"),
            bg=BG,
            fg=MUTED
        ).pack(
            side="left",
            padx=10
        )

        stats = tk.Frame(h, bg=BG)
        stats.pack(side="right", padx=22)

        self.top_stat(
            stats,
            "LEVEL",
            str(self.level())
        )

        self.top_stat(
            stats,
            "XP",
            str(self.data["xp"])
        )

        self.top_stat(
            stats,
            "STREAK",
            f"{self.data['streak']} 🔥"
        )

        main = tk.Frame(
            self.root,
            bg=BG
        )

        main.pack(
            fill="both",
            expand=True
        )

        name = self.data["profile"]["name"]

        tk.Label(
            main,
            text=f"Welcome back, {name} 👋",
            font=(FONT, 27, "bold"),
            bg=BG,
            fg=TEXT
        ).pack(pady=(18, 2))

        tk.Label(
            main,
            text="Learn • Practice • Build • Master",
            font=(FONT, 11, "bold"),
            bg=BG,
            fg=ACCENT
        ).pack()

        # Level card

        level_card = tk.Frame(
            main,
            bg=PANEL,
            width=720,
            height=70,
            highlightbackground=BORDER,
            highlightthickness=1
        )

        level_card.pack(pady=12)
        level_card.pack_propagate(False)

        row = tk.Frame(
            level_card,
            bg=PANEL
        )

        row.pack(
            fill="x",
            padx=15,
            pady=(7, 0)
        )

        tk.Label(
            row,
            text=f"LEVEL {self.level()}",
            font=(FONT, 9, "bold"),
            bg=PANEL,
            fg=TEXT
        ).pack(side="left")

        tk.Label(
            row,
            text=f"{self.level_xp()} / 500 XP",
            font=(FONT, 8),
            bg=PANEL,
            fg=MUTED
        ).pack(side="right")

        bar = tk.Frame(
            level_card,
            bg="#14263A",
            height=9
        )

        bar.pack(
            fill="x",
            padx=15,
            pady=8
        )

        bar.pack_propagate(False)

        tk.Frame(
            bar,
            bg=ACCENT,
            width=max(
                1,
                int(
                    688 *
                    self.level_percent()
                )
            ),
            height=9
        ).pack(side="left")

        # Main action buttons

        actions = tk.Frame(
            main,
            bg=BG
        )

        actions.pack(pady=5)

        self.big_action(
            actions,
            "▶",
            "START QUIZ",
            "Challenge your ECE knowledge",
            self.quiz_setup
        ).grid(row=0, column=0, padx=5)

        self.big_action(
            actions,
            "📚",
            "LEARN",
            "Study ECE topics",
            self.show_learn
        ).grid(row=0, column=1, padx=5)

        self.big_action(
            actions,
            "🧪",
            "ECE LAB",
            "Interactive experiments",
            self.show_lab
        ).grid(row=0, column=2, padx=5)

        self.big_action(
            actions,
            "📊",
            "MY JOURNEY",
            "Track your progress",
            self.show_progress
        ).grid(row=0, column=3, padx=5)

        # Second row

        actions2 = tk.Frame(
            main,
            bg=BG
        )

        actions2.pack(pady=5)

        self.small_action(
            actions2,
            "🧮 FORMULA HUB",
            self.show_formulas
        ).grid(row=0, column=0, padx=5)

        self.small_action(
            actions2,
            "📅 DAILY CHALLENGE",
            self.start_daily
        ).grid(row=0, column=1, padx=5)

        self.small_action(
            actions2,
            "🏆 BADGES",
            self.show_badges
        ).grid(row=0, column=2, padx=5)

        self.small_action(
            actions2,
            "👤 PROFILE",
            self.show_profile
        ).grid(row=0, column=3, padx=5)

        # Bottom statistics

        bottom = tk.Frame(
            main,
            bg=BG
        )

        bottom.pack(pady=12)

        accuracy = 0

        if self.data["total_questions"]:

            accuracy = int(
                self.data["correct_answers"] /
                self.data["total_questions"] *
                100
            )

        self.stat_card(
            bottom,
            "QUESTIONS",
            str(self.data["total_questions"])
        ).grid(row=0, column=0, padx=4)

        self.stat_card(
            bottom,
            "CORRECT",
            str(self.data["correct_answers"])
        ).grid(row=0, column=1, padx=4)

        self.stat_card(
            bottom,
            "ACCURACY",
            f"{accuracy}%"
        ).grid(row=0, column=2, padx=4)

        self.stat_card(
            bottom,
            "QUIZZES",
            str(self.data["quizzes"])
        ).grid(row=0, column=3, padx=4)

        tk.Label(
            main,
            text="ECE QUEST PRO  •  Learn electronics through practice",
            font=(FONT, 8),
            bg=BG,
            fg="#526A82"
        ).pack(
            side="bottom",
            pady=5
        )

    def top_stat(
        self,
        parent,
        label,
        value
    ):

        f = tk.Frame(
            parent,
            bg=PANEL,
            width=75,
            height=45,
            highlightbackground=BORDER,
            highlightthickness=1
        )

        f.pack(
            side="left",
            padx=3
        )

        f.pack_propagate(False)

        tk.Label(
            f,
            text=label,
            font=(FONT, 7, "bold"),
            bg=PANEL,
            fg=MUTED
        ).pack(pady=(4, 0))

        tk.Label(
            f,
            text=value,
            font=(FONT, 10, "bold"),
            bg=PANEL,
            fg=TEXT
        ).pack()

    def big_action(
        self,
        parent,
        icon,
        title,
        subtitle,
        command
    ):

        f = tk.Frame(
            parent,
            bg=PANEL,
            width=210,
            height=105,
            highlightbackground=BORDER,
            highlightthickness=1
        )

        f.pack_propagate(False)

        tk.Button(
            f,
            text=icon,
            command=command,
            font=("Segoe UI Emoji", 22),
            bg=PANEL,
            fg=TEXT,
            activebackground=PANEL,
            activeforeground=TEXT,
            relief="flat",
            bd=0,
            cursor="hand2"
        ).pack(pady=(7, 0))

        tk.Button(
            f,
            text=title,
            command=command,
            font=(FONT, 10, "bold"),
            bg=PANEL,
            fg=TEXT,
            activebackground=PANEL2,
            activeforeground=TEXT,
            relief="flat",
            bd=0,
            cursor="hand2"
        ).pack()

        tk.Label(
            f,
            text=subtitle,
            font=(FONT, 7),
            bg=PANEL,
            fg=MUTED
        ).pack()

        return f

    def small_action(
        self,
        parent,
        text,
        command
    ):

        f = tk.Frame(
            parent,
            bg=PANEL2,
            width=210,
            height=42,
            highlightbackground=BORDER,
            highlightthickness=1
        )

        f.pack_propagate(False)

        tk.Button(
            f,
            text=text,
            command=command,
            font=(FONT, 9, "bold"),
            bg=PANEL2,
            fg=TEXT,
            activebackground=ACCENT,
            activeforeground=TEXT,
            relief="flat",
            bd=0,
            cursor="hand2"
        ).pack(
            fill="both",
            expand=True
        )

        return f

    def stat_card(
        self,
        parent,
        label,
        value
    ):

        f = tk.Frame(
            parent,
            bg=PANEL,
            width=145,
            height=60,
            highlightbackground=BORDER,
            highlightthickness=1
        )

        f.pack_propagate(False)

        tk.Label(
            f,
            text=label,
            font=(FONT, 7, "bold"),
            bg=PANEL,
            fg=MUTED
        ).pack(pady=(7, 0))

        tk.Label(
            f,
            text=value,
            font=(FONT, 14, "bold"),
            bg=PANEL,
            fg=TEXT
        ).pack()

        return f

    # ========================================================
    # PROFILE
    # ========================================================

    def show_profile(self):

        self.clear()

        self.header("STUDENT PROFILE")

        main = tk.Frame(
            self.root,
            bg=BG
        )

        main.pack(
            fill="both",
            expand=True
        )

        tk.Label(
            main,
            text="👤 STUDENT PROFILE",
            font=(FONT, 27, "bold"),
            bg=BG,
            fg=TEXT
        ).pack(pady=(35, 20))

        card = tk.Frame(
            main,
            bg=PANEL,
            width=650,
            height=330,
            highlightbackground=BORDER,
            highlightthickness=1
        )

        card.pack()
        card.pack_propagate(False)

        profile = self.data["profile"]

        self.profile_row(
            card,
            "Name",
            profile["name"],
            20
        )

        self.profile_row(
            card,
            "College",
            profile["college"],
            20
        )

        self.profile_row(
            card,
            "Branch",
            profile["branch"],
            20
        )

        self.profile_row(
            card,
            "Year",
            profile["year"],
            20
        )

        self.make_button(
            card,
            "✏ EDIT PROFILE",
            self.edit_profile,
            width=22,
            height=2,
            bg=ACCENT
        ).pack(pady=18)

        tk.Label(
            main,
            text=f"Level {self.level()}  •  {self.data['xp']} XP  •  "
                 f"{len(self.data['badges'])} Badges",
            font=(FONT, 10, "bold"),
            bg=BG,
            fg=MUTED
        ).pack(pady=15)

    def profile_row(
        self,
        parent,
        label,
        value,
        pady
    ):

        f = tk.Frame(
            parent,
            bg=PANEL
        )

        f.pack(
            fill="x",
            padx=35,
            pady=(pady if label == "Name" else 4, 0)
        )

        tk.Label(
            f,
            text=label,
            font=(FONT, 8, "bold"),
            bg=PANEL,
            fg=MUTED,
            width=12,
            anchor="w"
        ).pack(side="left")

        tk.Label(
            f,
            text=value,
            font=(FONT, 10, "bold"),
            bg=PANEL,
            fg=TEXT,
            anchor="w"
        ).pack(side="left")

    def edit_profile(self):

        p = self.data["profile"]

        name = simpledialog.askstring(
            "Profile",
            "Enter your name:",
            initialvalue=p["name"],
            parent=self.root
        )

        if name:
            p["name"] = name.strip()

        college = simpledialog.askstring(
            "Profile",
            "Enter your college:",
            initialvalue=p["college"],
            parent=self.root
        )

        if college:
            p["college"] = college.strip()

        branch = simpledialog.askstring(
            "Profile",
            "Enter your branch:",
            initialvalue=p["branch"],
            parent=self.root
        )

        if branch:
            p["branch"] = branch.strip()

        year = simpledialog.askstring(
            "Profile",
            "Enter your year:",
            initialvalue=p["year"],
            parent=self.root
        )

        if year:
            p["year"] = year.strip()

        self.save_data()
        self.show_profile()

    # ========================================================
    # LEARN
    # ========================================================

    def show_learn(self):

        self.clear()

        self.header("LEARNING HUB")

        main = tk.Frame(
            self.root,
            bg=BG
        )

        main.pack(
            fill="both",
            expand=True,
            padx=25
        )

        tk.Label(
            main,
            text="📚 ECE LEARNING HUB",
            font=(FONT, 27, "bold"),
            bg=BG,
            fg=TEXT
        ).pack(pady=(12, 2))

        tk.Label(
            main,
            text="Choose a topic to study",
            font=(FONT, 10),
            bg=BG,
            fg=MUTED
        ).pack(pady=(0, 12))

        grid = tk.Frame(
            main,
            bg=BG
        )

        grid.pack()

        for i, (name, lesson) in enumerate(
            LESSONS.items()
        ):

            completed = (
                name in self.data["completed_lessons"]
            )

            card = tk.Frame(
                grid,
                bg=PANEL,
                width=250,
                height=125,
                highlightbackground=
                GREEN if completed else BORDER,
                highlightthickness=1
            )

            card.grid(
                row=i // 4,
                column=i % 4,
                padx=5,
                pady=5
            )

            card.pack_propagate(False)

            icon = lesson["icon"]

            tk.Button(
                card,
                text=icon,
                command=lambda n=name: self.open_lesson(n),
                font=("Segoe UI Emoji", 23),
                bg=PANEL,
                fg=TEXT,
                activebackground=PANEL,
                activeforeground=TEXT,
                relief="flat",
                bd=0,
                cursor="hand2"
            ).pack(pady=(7, 0))

            tk.Button(
                card,
                text=name,
                command=lambda n=name: self.open_lesson(n),
                font=(FONT, 9, "bold"),
                bg=PANEL,
                fg=TEXT,
                activebackground=PANEL2,
                activeforeground=TEXT,
                relief="flat",
                bd=0,
                cursor="hand2"
            ).pack()

            status = "✓ COMPLETED" if completed else "START LESSON"

            tk.Label(
                card,
                text=status,
                font=(FONT, 7, "bold"),
                bg=PANEL,
                fg=GREEN if completed else MUTED
            ).pack(pady=3)

    def open_lesson(self, name):

        self.clear()

        lesson = LESSONS[name]

        self.header(
            f"LEARN • {name}"
        )

        main = tk.Frame(
            self.root,
            bg=BG
        )

        main.pack(
            fill="both",
            expand=True,
            padx=80,
            pady=10
        )

        tk.Label(
            main,
            text=f"{lesson['icon']}  {name}",
            font=(FONT, 25, "bold"),
            bg=BG,
            fg=TEXT
        ).pack()

        for title, text in lesson["sections"]:

            card = tk.Frame(
                main,
                bg=PANEL,
                highlightbackground=BORDER,
                highlightthickness=1
            )

            card.pack(
                fill="x",
                pady=4
            )

            tk.Label(
                card,
                text=title,
                font=(FONT, 11, "bold"),
                bg=PANEL,
                fg=ACCENT
            ).pack(
                anchor="w",
                padx=15,
                pady=(7, 1)
            )

            tk.Label(
                card,
                text=text,
                font=(FONT, 9),
                bg=PANEL,
                fg=TEXT,
                wraplength=850,
                justify="left"
            ).pack(
                anchor="w",
                padx=15,
                pady=(0, 7)
            )

        bottom = tk.Frame(
            main,
            bg=BG
        )

        bottom.pack(pady=10)

        self.make_button(
            bottom,
            "✓ MARK COMPLETE",
            lambda: self.complete_lesson(name),
            width=20,
            height=1,
            bg=GREEN
        ).pack(
            side="left",
            padx=5
        )

        self.make_button(
            bottom,
            "🎮 PRACTICE",
            lambda: self.start_topic_quiz(
                lesson["topic"]
            ),
            width=18,
            height=1,
            bg=ACCENT
        ).pack(
            side="left",
            padx=5
        )

        self.make_button(
            bottom,
            "← TOPICS",
            self.show_learn,
            width=15,
            height=1
        ).pack(
            side="left",
            padx=5
        )

    def complete_lesson(self, name):

        if name not in self.data["completed_lessons"]:

            self.data["completed_lessons"].append(name)

            self.data["xp"] += 50

            self.save_data()

            self.update_badges()

            messagebox.showinfo(
                "Lesson Complete",
                "🎉 Lesson completed!\n\n+50 XP"
            )

        self.show_learn()

    # ========================================================
    # QUIZ SETUP
    # ========================================================

    def quiz_setup(self):

        self.clear()

        self.header("QUIZ SETUP")

        main = tk.Frame(
            self.root,
            bg=BG
        )

        main.pack(
            fill="both",
            expand=True
        )

        tk.Label(
            main,
            text="🎮 QUIZ CENTER",
            font=(FONT, 29, "bold"),
            bg=BG,
            fg=TEXT
        ).pack(pady=(30, 5))

        tk.Label(
            main,
            text="Choose your challenge",
            font=(FONT, 10),
            bg=BG,
            fg=MUTED
        ).pack(pady=(0, 18))

        card = tk.Frame(
            main,
            bg=PANEL,
            width=620,
            height=350,
            highlightbackground=BORDER,
            highlightthickness=1
        )

        card.pack()
        card.pack_propagate(False)

        tk.Label(
            card,
            text="DIFFICULTY",
            font=(FONT, 9, "bold"),
            bg=PANEL,
            fg=MUTED
        ).pack(pady=(25, 8))

        difficulty = tk.StringVar(
            value="Mixed"
        )

        row = tk.Frame(
            card,
            bg=PANEL
        )

        row.pack()

        for value in [
            "Easy",
            "Medium",
            "Hard",
            "Mixed"
        ]:

            tk.Radiobutton(
                row,
                text=value,
                variable=difficulty,
                value=value,
                font=(FONT, 9, "bold"),
                bg=PANEL,
                fg=TEXT,
                selectcolor=PANEL2,
                activebackground=PANEL,
                activeforeground=TEXT
            ).pack(
                side="left",
                padx=8
            )

        tk.Label(
            card,
            text="QUESTIONS",
            font=(FONT, 9, "bold"),
            bg=PANEL,
            fg=MUTED
        ).pack(pady=(25, 8))

        size_var = tk.IntVar(
            value=10
        )

        size_row = tk.Frame(
            card,
            bg=PANEL
        )

        size_row.pack()

        for value in [5, 10, 20, 30]:

            tk.Radiobutton(
                size_row,
                text=str(value),
                variable=size_var,
                value=value,
                font=(FONT, 9, "bold"),
                bg=PANEL,
                fg=TEXT,
                selectcolor=PANEL2,
                activebackground=PANEL,
                activeforeground=TEXT
            ).pack(
                side="left",
                padx=12
            )

        self.make_button(
            card,
            "▶ START CHALLENGE",
            lambda: self.start_custom_quiz(
                difficulty.get(),
                size_var.get()
            ),
            width=25,
            height=2,
            bg=ACCENT,
            size=12
        ).pack(pady=30)

    def start_topic_quiz(self, topic):

        available = [
            q for q in QUESTIONS
            if q["topic"] == topic
        ]

        if not available:

            messagebox.showinfo(
                "Quiz",
                "No questions available for this topic yet."
            )

            return

        self.quiz_questions = random.sample(
            available,
            min(10, len(available))
        )

        self.start_quiz_engine()

    def start_custom_quiz(
        self,
        difficulty,
        size
    ):

        if difficulty == "Mixed":

            available = QUESTIONS

        else:

            available = [
                q for q in QUESTIONS
                if q["difficulty"] == difficulty
            ]

        if not available:

            messagebox.showinfo(
                "Quiz",
                "Not enough questions available."
            )

            return

        self.quiz_questions = random.sample(
            available,
            min(size, len(available))
        )

        self.start_quiz_engine()

    def start_quiz_engine(self):

        self.quiz_index = 0
        self.quiz_correct = 0
        self.quiz_xp = 0

        self.show_question()

    # ========================================================
    # QUIZ
    # ========================================================

    def show_question(self):

        self.clear()

        q = self.quiz_questions[
            self.quiz_index
        ]

        h = self.header(
            f"QUESTION {self.quiz_index + 1} / "
            f"{len(self.quiz_questions)}"
        )

        self.timer_label = tk.Label(
            h,
            text="⏱ 30",
            font=(FONT, 10, "bold"),
            bg=BG,
            fg=YELLOW
        )

        self.timer_label.pack(
            side="right",
            padx=25
        )

        self.timer_seconds = 30

        main = tk.Frame(
            self.root,
            bg=BG
        )

        main.pack(
            fill="both",
            expand=True
        )

        tk.Label(
            main,
            text=f"{q['topic'].upper()}  •  "
                 f"{q['difficulty'].upper()}",
            font=(FONT, 9, "bold"),
            bg=BG,
            fg=ACCENT
        ).pack(pady=(12, 5))

        # progress

        progress_bg = tk.Frame(
            main,
            bg="#14263A",
            width=800,
            height=8
        )

        progress_bg.pack(pady=(0, 15))
        progress_bg.pack_propagate(False)

        progress_width = int(
            800 *
            (self.quiz_index + 1) /
            len(self.quiz_questions)
        )

        tk.Frame(
            progress_bg,
            bg=ACCENT,
            width=progress_width,
            height=8
        ).pack(side="left")

        # question card

        qcard = tk.Frame(
            main,
            bg=PANEL,
            width=850,
            height=135,
            highlightbackground=BORDER,
            highlightthickness=1
        )

        qcard.pack()
        qcard.pack_propagate(False)

        tk.Label(
            qcard,
            text=q["q"],
            font=(FONT, 17, "bold"),
            bg=PANEL,
            fg=TEXT,
            wraplength=760,
            justify="center"
        ).pack(expand=True)

        # answers

        options = tk.Frame(
            main,
            bg=BG
        )

        options.pack(pady=16)

        self.quiz_buttons = []

        for i, option in enumerate(
            q["options"]
        ):

            btn = tk.Button(
                options,
                text=f"{chr(65 + i)}   {option}",
                command=lambda x=i: self.answer(x),
                width=38,
                height=2,
                font=(FONT, 10, "bold"),
                bg=PANEL2,
                fg=TEXT,
                activebackground=ACCENT,
                activeforeground=TEXT,
                relief="flat",
                bd=0,
                cursor="hand2"
            )

            btn.grid(
                row=i // 2,
                column=i % 2,
                padx=7,
                pady=5
            )

            self.quiz_buttons.append(btn)

        tk.Label(
            main,
            text="Select one answer",
            font=(FONT, 8),
            bg=BG,
            fg=MUTED
        ).pack()

        self.make_button(
            main,
            "← EXIT",
            self.exit_quiz,
            width=14,
            height=1
        ).pack(pady=9)

        self.update_timer()

    def update_timer(self):

        if self.timer_seconds <= 0:

            self.answer(
                None,
                timeout=True
            )

            return

        self.timer_label.config(
            text=f"⏱ {self.timer_seconds}",
            fg=YELLOW
            if self.timer_seconds > 10
            else RED
        )

        self.timer_seconds -= 1

        self.timer_job = self.root.after(
            1000,
            self.update_timer
        )

    def answer(
        self,
        selected,
        timeout=False
    ):

        if self.timer_job:

            try:
                self.root.after_cancel(
                    self.timer_job
                )
            except:
                pass

            self.timer_job = None

        q = self.quiz_questions[
            self.quiz_index
        ]

        self.data["total_questions"] += 1

        correct = (
            selected is not None
            and selected == q["answer"]
        )

        if correct:

            self.quiz_correct += 1

            self.data["correct_answers"] += 1

            self.data["streak"] += 1

            xp = 100

            if q["difficulty"] == "Medium":
                xp = 125

            elif q["difficulty"] == "Hard":
                xp = 150

            self.data["xp"] += xp
            self.quiz_xp += xp

            title = "✓ CORRECT!"

            msg = (
                f"{q['exp']}\n\n"
                f"+{xp} XP"
            )

        else:

            self.data["streak"] = 0

            correct_text = q[
                "options"
            ][q["answer"]]

            if timeout:
                title = "⏱ TIME'S UP!"
            else:
                title = "✗ NOT QUITE"

            msg = (
                f"Correct answer: {correct_text}\n\n"
                f"{q['exp']}"
            )

        self.save_data()

        messagebox.showinfo(
            title,
            msg
        )

        if self.quiz_index < len(
            self.quiz_questions
        ) - 1:

            self.quiz_index += 1
            self.show_question()

        else:

            self.finish_quiz()

    def exit_quiz(self):

        if messagebox.askyesno(
            "Exit Quiz",
            "Exit this quiz?\nYour current quiz will not be scored."
        ):

            self.show_home()

    # ========================================================
    # QUIZ RESULTS
    # ========================================================

    def finish_quiz(self):

        total = len(
            self.quiz_questions
        )

        score = int(
            self.quiz_correct /
            total *
            100
        )

        if score > self.data["best_score"]:

            self.data["best_score"] = score

        self.data["quizzes"] += 1

        self.data["history"].append({
            "date": datetime.now().strftime(
                "%Y-%m-%d %H:%M"
            ),
            "score": score,
            "correct": self.quiz_correct,
            "total": total
        })

        self.data["history"] = \
            self.data["history"][-20:]

        self.update_badges()

        self.save_data()

        self.show_results(
            score,
            total
        )

    def show_results(
        self,
        score,
        total
    ):

        self.clear()

        main = tk.Frame(
            self.root,
            bg=BG
        )

        main.pack(
            fill="both",
            expand=True
        )

        tk.Label(
            main,
            text="🏆 QUEST COMPLETE!",
            font=(FONT, 31, "bold"),
            bg=BG,
            fg=TEXT
        ).pack(pady=(55, 5))

        if score == 100:

            text = "🔥 PERFECT SCORE!"

        elif score >= 80:

            text = "🚀 Excellent work!"

        elif score >= 60:

            text = "💪 Good job!"

        elif score >= 40:

            text = "📚 Keep practicing!"

        else:

            text = "⚡ Keep learning!"

        tk.Label(
            main,
            text=text,
            font=(FONT, 13, "bold"),
            bg=BG,
            fg=ACCENT
        ).pack()

        card = tk.Frame(
            main,
            bg=PANEL,
            width=550,
            height=190,
            highlightbackground=BORDER,
            highlightthickness=1
        )

        card.pack(pady=25)
        card.pack_propagate(False)

        tk.Label(
            card,
            text=f"{score}%",
            font=(FONT, 45, "bold"),
            bg=PANEL,
            fg=TEXT
        ).pack(pady=(15, 0))

        tk.Label(
            card,
            text=f"{self.quiz_correct} / {total} CORRECT",
            font=(FONT, 11, "bold"),
            bg=PANEL,
            fg=MUTED
        ).pack()

        tk.Label(
            card,
            text=f"+{self.quiz_xp} XP",
            font=(FONT, 11, "bold"),
            bg=PANEL,
            fg=GREEN
        ).pack(pady=5)

        buttons = tk.Frame(
            main,
            bg=BG
        )

        buttons.pack()

        self.make_button(
            buttons,
            "🔄 AGAIN",
            self.quiz_setup,
            width=18,
            height=2,
            bg=ACCENT
        ).grid(row=0, column=0, padx=5)

        self.make_button(
            buttons,
            "📊 PROGRESS",
            self.show_progress,
            width=18,
            height=2
        ).grid(row=0, column=1, padx=5)

        self.make_button(
            buttons,
            "⌂ HOME",
            self.show_home,
            width=18,
            height=2
        ).grid(row=0, column=2, padx=5)

    # ========================================================
    # DAILY CHALLENGE
    # ========================================================

    def start_daily(self):

        today = datetime.now().strftime(
            "%Y-%m-%d"
        )

        if self.data["daily_date"] != today:

            self.data["daily_date"] = today
            self.data["daily_done"] = False
            self.data["daily_score"] = 0

            self.save_data()

        if self.data["daily_done"]:

            messagebox.showinfo(
                "Daily Challenge",
                f"Today's challenge is already complete!\n\n"
                f"Score: {self.data['daily_score']}%"
            )

            return

        random.seed(today)

        selected = random.sample(
            QUESTIONS,
            min(5, len(QUESTIONS))
        )

        random.seed()

        self.quiz_questions = selected
        self.quiz_index = 0
        self.quiz_correct = 0
        self.quiz_xp = 0

        self.daily_mode = True

        self.show_question_daily()

    def show_question_daily(self):

        self.clear()

        q = self.quiz_questions[
            self.quiz_index
        ]

        h = self.header(
            f"DAILY CHALLENGE  •  "
            f"{self.quiz_index + 1}/"
            f"{len(self.quiz_questions)}"
        )

        main = tk.Frame(
            self.root,
            bg=BG
        )

        main.pack(
            fill="both",
            expand=True
        )

        tk.Label(
            main,
            text="📅 DAILY ECE CHALLENGE",
            font=(FONT, 25, "bold"),
            bg=BG,
            fg=YELLOW
        ).pack(pady=(25, 10))

        qcard = tk.Frame(
            main,
            bg=PANEL,
            width=850,
            height=135,
            highlightbackground=BORDER,
            highlightthickness=1
        )

        qcard.pack()
        qcard.pack_propagate(False)

        tk.Label(
            qcard,
            text=q["q"],
            font=(FONT, 17, "bold"),
            bg=PANEL,
            fg=TEXT,
            wraplength=750,
            justify="center"
        ).pack(expand=True)

        options = tk.Frame(
            main,
            bg=BG
        )

        options.pack(pady=20)

        for i, option in enumerate(
            q["options"]
        ):

            tk.Button(
                options,
                text=f"{chr(65+i)}   {option}",
                command=lambda x=i:
                self.daily_answer(x),
                width=38,
                height=2,
                font=(FONT, 10, "bold"),
                bg=PANEL2,
                fg=TEXT,
                activebackground=YELLOW,
                activeforeground=BG,
                relief="flat",
                bd=0,
                cursor="hand2"
            ).grid(
                row=i // 2,
                column=i % 2,
                padx=7,
                pady=5
            )

    def daily_answer(self, selected):

        q = self.quiz_questions[
            self.quiz_index
        ]

        if selected == q["answer"]:

            self.quiz_correct += 1
            self.data["correct_answers"] += 1
            self.data["total_questions"] += 1
            self.data["xp"] += 150
            self.quiz_xp += 150
            self.data["streak"] += 1

            messagebox.showinfo(
                "✓ Correct",
                f"{q['exp']}\n\n+150 XP"
            )

        else:

            self.data["total_questions"] += 1
            self.data["streak"] = 0

            messagebox.showinfo(
                "✗ Incorrect",
                f"Correct answer:\n"
                f"{q['options'][q['answer']]}\n\n"
                f"{q['exp']}"
            )

        self.save_data()

        if self.quiz_index < len(
            self.quiz_questions
        ) - 1:

            self.quiz_index += 1
            self.show_question_daily()

        else:

            self.finish_daily()

    def finish_daily(self):

        score = int(
            self.quiz_correct /
            len(self.quiz_questions) *
            100
        )

        self.data["daily_done"] = True
        self.data["daily_score"] = score

        if score == 100:

            self.data["xp"] += 250

            bonus = (
                "\n\n🔥 PERFECT DAILY BONUS: +250 XP"
            )

        else:

            bonus = ""

        self.update_badges()
        self.save_data()

        messagebox.showinfo(
            "📅 Daily Complete",
            f"Score: {score}%\n"
            f"Correct: {self.quiz_correct}/"
            f"{len(self.quiz_questions)}"
            f"{bonus}"
        )

        self.show_home()

    # ========================================================
    # BADGES
    # ========================================================

    def update_badges(self):

        badges = self.data["badges"]

        total = self.data["total_questions"]
        correct = self.data["correct_answers"]
        quizzes = self.data["quizzes"]
        streak = self.data["streak"]
        xp = self.data["xp"]
        best = self.data["best_score"]

        checks = [
            ("FIRST STEP", total >= 1),
            ("10 CORRECT", correct >= 10),
            ("25 CORRECT", correct >= 25),
            ("50 CORRECT", correct >= 50),
            ("QUIZ WARRIOR", quizzes >= 5),
            ("QUIZ LEGEND", quizzes >= 10),
            ("STREAK MASTER", streak >= 5),
            ("XP HUNTER", xp >= 1000),
            ("ECE SCHOLAR", xp >= 2500),
            ("PERFECT SCORE", best == 100),
            (
                "LEARNER",
                len(self.data["completed_lessons"]) >= 3
            ),
            (
                "KNOWLEDGE MASTER",
                len(self.data["completed_lessons"]) >= 8
            )
        ]

        for name, condition in checks:

            if condition and name not in badges:

                badges.append(name)

                messagebox.showinfo(
                    "🏆 NEW BADGE!",
                    f"You unlocked:\n\n{name}"
                )

    def show_badges(self):

        self.clear()

        self.header("ACHIEVEMENTS")

        main = tk.Frame(
            self.root,
            bg=BG
        )

        main.pack(
            fill="both",
            expand=True
        )

        tk.Label(
            main,
            text="🏆 ACHIEVEMENTS",
            font=(FONT, 28, "bold"),
            bg=BG,
            fg=TEXT
        ).pack(pady=(25, 3))

        tk.Label(
            main,
            text=f"{len(self.data['badges'])} badges unlocked",
            font=(FONT, 10),
            bg=BG,
            fg=MUTED
        ).pack(pady=(0, 18))

        all_badges = [
            ("FIRST STEP", "🎯", "Complete your first question"),
            ("10 CORRECT", "⭐", "Answer 10 correctly"),
            ("25 CORRECT", "🌟", "Answer 25 correctly"),
            ("50 CORRECT", "💫", "Answer 50 correctly"),
            ("QUIZ WARRIOR", "🎮", "Complete 5 quizzes"),
            ("QUIZ LEGEND", "👑", "Complete 10 quizzes"),
            ("STREAK MASTER", "🔥", "Reach a 5 answer streak"),
            ("XP HUNTER", "⚡", "Earn 1000 XP"),
            ("ECE SCHOLAR", "🎓", "Earn 2500 XP"),
            ("PERFECT SCORE", "🏆", "Get 100% in a quiz"),
            ("LEARNER", "📚", "Complete 3 lessons"),
            ("KNOWLEDGE MASTER", "🧠", "Complete 8 lessons")
        ]

        grid = tk.Frame(
            main,
            bg=BG
        )

        grid.pack()

        for i, (name, icon, desc) in enumerate(
            all_badges
        ):

            unlocked = (
                name in self.data["badges"]
            )

            bg = PANEL if unlocked else "#0A1727"
            fg = TEXT if unlocked else "#526A82"

            card = tk.Frame(
                grid,
                bg=bg,
                width=330,
                height=78,
                highlightbackground=
                ACCENT if unlocked else BORDER,
                highlightthickness=1
            )

            card.grid(
                row=i // 3,
                column=i % 3,
                padx=5,
                pady=5
            )

            card.pack_propagate(False)

            tk.Label(
                card,
                text=icon if unlocked else "🔒",
                font=("Segoe UI Emoji", 21),
                bg=bg,
                fg=fg
            ).pack(
                side="left",
                padx=12
            )

            tf = tk.Frame(
                card,
                bg=bg
            )

            tf.pack(
                side="left",
                fill="both",
                expand=True
            )

            tk.Label(
                tf,
                text=name,
                font=(FONT, 9, "bold"),
                bg=bg,
                fg=fg
            ).pack(
                anchor="w",
                pady=(14, 0)
            )

            tk.Label(
                tf,
                text=desc,
                font=(FONT, 7),
                bg=bg,
                fg=MUTED
            ).pack(
                anchor="w"
            )

    # ========================================================
    # PROGRESS
    # ========================================================

    def show_progress(self):

        self.clear()

        self.header(
            "PROGRESS & ANALYTICS"
        )

        main = tk.Frame(
            self.root,
            bg=BG
        )

        main.pack(
            fill="both",
            expand=True,
            padx=40
        )

        tk.Label(
            main,
            text="📊 MY ECE JOURNEY",
            font=(FONT, 28, "bold"),
            bg=BG,
            fg=TEXT
        ).pack(pady=(15, 2))

        accuracy = 0

        if self.data["total_questions"]:

            accuracy = int(
                self.data["correct_answers"] /
                self.data["total_questions"] *
                100
            )

        stats = tk.Frame(
            main,
            bg=BG
        )

        stats.pack(pady=12)

        values = [
            ("LEVEL", self.level()),
            ("XP", self.data["xp"]),
            ("QUESTIONS", self.data["total_questions"]),
            ("CORRECT", self.data["correct_answers"]),
            ("ACCURACY", f"{accuracy}%")
        ]

        for i, (label, value) in enumerate(values):

            self.stat_card(
                stats,
                label,
                value
            ).grid(
                row=0,
                column=i,
                padx=4
            )

        # Progress bar

        card = tk.Frame(
            main,
            bg=PANEL,
            width=850,
            height=80,
            highlightbackground=BORDER,
            highlightthickness=1
        )

        card.pack(pady=5)
        card.pack_propagate(False)

        tk.Label(
            card,
            text=f"LEVEL {self.level()} PROGRESS",
            font=(FONT, 9, "bold"),
            bg=PANEL,
            fg=TEXT
        ).pack(
            anchor="w",
            padx=20,
            pady=(10, 2)
        )

        bar = tk.Frame(
            card,
            bg="#14263A",
            height=12
        )

        bar.pack(
            fill="x",
            padx=20
        )

        bar.pack_propagate(False)

        tk.Frame(
            bar,
            bg=ACCENT,
            width=max(
                1,
                int(
                    810 *
                    self.level_percent()
                )
            ),
            height=12
        ).pack(side="left")

        # History

        tk.Label(
            main,
            text="RECENT QUIZ HISTORY",
            font=(FONT, 11, "bold"),
            bg=BG,
            fg=TEXT
        ).pack(
            anchor="w",
            padx=110,
            pady=(12, 4)
        )

        history = tk.Frame(
            main,
            bg=PANEL,
            width=850,
            height=150,
            highlightbackground=BORDER,
            highlightthickness=1
        )

        history.pack()
        history.pack_propagate(False)

        if not self.data["history"]:

            tk.Label(
                history,
                text="No quiz attempts yet.",
                font=(FONT, 9),
                bg=PANEL,
                fg=MUTED
            ).pack(expand=True)

        else:

            recent = list(
                reversed(
                    self.data["history"][-6:]
                )
            )

            for item in recent:

                line = (
                    f"{item['date']}     "
                    f"{item['correct']}/{item['total']}     "
                    f"{item['score']}%"
                )

                tk.Label(
                    history,
                    text=line,
                    font=(FONT, 8),
                    bg=PANEL,
                    fg=TEXT
                ).pack(
                    anchor="w",
                    padx=20,
                    pady=3
                )

        # Lessons

        tk.Label(
            main,
            text=f"LESSONS COMPLETED: "
                 f"{len(self.data['completed_lessons'])}/"
                 f"{len(LESSONS)}",
            font=(FONT, 10, "bold"),
            bg=BG,
            fg=GREEN
        ).pack(pady=12)

    # ========================================================
    # FORMULA HUB
    # ========================================================

    def show_formulas(self):

        self.clear()

        self.header("FORMULA HUB")

        main = tk.Frame(
            self.root,
            bg=BG
        )

        main.pack(
            fill="both",
            expand=True,
            padx=70,
            pady=10
        )

        tk.Label(
            main,
            text="🧮 ECE FORMULA HUB",
            font=(FONT, 28, "bold"),
            bg=BG,
            fg=TEXT
        ).pack(pady=(10, 3))

        tk.Label(
            main,
            text="Important formulas for quick revision",
            font=(FONT, 9),
            bg=BG,
            fg=MUTED
        ).pack(pady=(0, 12))

        for title, formula, description in FORMULAS:

            row = tk.Frame(
                main,
                bg=PANEL,
                height=48,
                highlightbackground=BORDER,
                highlightthickness=1
            )

            row.pack(
                fill="x",
                pady=2
            )

            row.pack_propagate(False)

            tk.Label(
                row,
                text=title,
                font=(FONT, 9, "bold"),
                bg=PANEL,
                fg=TEXT,
                width=22,
                anchor="w"
            ).pack(
                side="left",
                padx=15
            )

            tk.Label(
                row,
                text=formula,
                font=(FONT, 11, "bold"),
                bg=PANEL,
                fg=ACCENT,
                width=28,
                anchor="w"
            ).pack(side="left")

            tk.Label(
                row,
                text=description,
                font=(FONT, 8),
                bg=PANEL,
                fg=MUTED,
                anchor="w"
            ).pack(side="left")

    # ========================================================
    # ECE LAB
    # ========================================================

    def show_lab(self):

        self.clear()

        self.header("INTERACTIVE ECE LAB")

        main = tk.Frame(
            self.root,
            bg=BG
        )

        main.pack(
            fill="both",
            expand=True
        )

        tk.Label(
            main,
            text="🧪 ECE LAB",
            font=(FONT, 29, "bold"),
            bg=BG,
            fg=TEXT
        ).pack(pady=(20, 3))

        tk.Label(
            main,
            text="Explore basic electronics concepts interactively",
            font=(FONT, 9),
            bg=BG,
            fg=MUTED
        ).pack(pady=(0, 15))

        grid = tk.Frame(
            main,
            bg=BG
        )

        grid.pack()

        labs = [
            (
                "⚡ OHM'S LAW",
                "Calculate V, I and R",
                self.lab_ohm
            ),
            (
                "💡 LED CIRCUIT",
                "Understand LED + resistor",
                self.lab_led
            ),
            (
                "☀ LDR",
                "Explore light sensing",
                self.lab_ldr
            ),
            (
                "📏 ULTRASONIC",
                "Distance sensor demo",
                self.lab_ultrasonic
            ),
            (
                "🔢 LOGIC GATES",
                "Test digital logic",
                self.lab_logic
            ),
            (
                "〰️ RC CIRCUIT",
                "Charging/discharging",
                self.lab_rc
            )
        ]

        for i, (title, desc, command) in enumerate(
            labs
        ):

            card = tk.Frame(
                grid,
                bg=PANEL,
                width=300,
                height=125,
                highlightbackground=BORDER,
                highlightthickness=1
            )

            card.grid(
                row=i // 3,
                column=i % 3,
                padx=6,
                pady=6
            )

            card.pack_propagate(False)

            self.make_button(
                card,
                title,
                command,
                width=24,
                height=2,
                bg=PANEL2
            ).pack(pady=(15, 5))

            tk.Label(
                card,
                text=desc,
                font=(FONT, 8),
                bg=PANEL,
                fg=MUTED
            ).pack()

    def lab_ohm(self):

        self.lab_window(
            "⚡ OHM'S LAW LAB",
            self.ohm_content
        )

    def ohm_content(self, frame):

        tk.Label(
            frame,
            text="Enter any two values",
            font=(FONT, 11, "bold"),
            bg=PANEL,
            fg=TEXT
        ).pack(pady=10)

        v = tk.StringVar()
        i = tk.StringVar()
        r = tk.StringVar()

        self.lab_entry(
            frame,
            "Voltage (V)",
            v
        )

        self.lab_entry(
            frame,
            "Current (A)",
            i
        )

        self.lab_entry(
            frame,
            "Resistance (Ω)",
            r
        )

        result = tk.Label(
            frame,
            text="Result will appear here",
            font=(FONT, 12, "bold"),
            bg=PANEL,
            fg=ACCENT
        )

        result.pack(pady=12)

        def calculate():

            try:

                values = {
                    "v": v.get().strip(),
                    "i": i.get().strip(),
                    "r": r.get().strip()
                }

                filled = [
                    k for k, x in values.items()
                    if x
                ]

                if len(filled) != 2:

                    raise ValueError

                if not values["v"]:

                    voltage = float(i.get()) * float(r.get())

                    result.config(
                        text=f"V = {voltage:.3f} V"
                    )

                elif not values["i"]:

                    current = float(v.get()) / float(r.get())

                    result.config(
                        text=f"I = {current:.3f} A"
                    )

                else:

                    resistance = float(v.get()) / float(i.get())

                    result.config(
                        text=f"R = {resistance:.3f} Ω"
                    )

            except:

                result.config(
                    text="Enter exactly two valid values.",
                    fg=RED
                )

        self.make_button(
            frame,
            "CALCULATE",
            calculate,
            width=20,
            height=2,
            bg=ACCENT
        ).pack()

    def lab_led(self):

        self.lab_window(
            "💡 LED CIRCUIT",
            self.led_content
        )

    def led_content(self, frame):

        tk.Label(
            frame,
            text="LED + Resistor Calculator",
            font=(FONT, 13, "bold"),
            bg=PANEL,
            fg=TEXT
        ).pack(pady=10)

        current = tk.StringVar(
            value="0.02"
        )

        supply = tk.StringVar(
            value="5"
        )

        led_drop = tk.StringVar(
            value="2"
        )

        self.lab_entry(
            frame,
            "Supply Voltage (V)",
            supply
        )

        self.lab_entry(
            frame,
            "LED Forward Voltage (V)",
            led_drop
        )

        self.lab_entry(
            frame,
            "LED Current (A)",
            current
        )

        result = tk.Label(
            frame,
            text="Recommended resistor will appear here",
            font=(FONT, 11, "bold"),
            bg=PANEL,
            fg=ACCENT
        )

        result.pack(pady=15)

        def calculate():

            try:

                vs = float(supply.get())
                vf = float(led_drop.get())
                cur = float(current.get())

                resistance = (
                    vs - vf
                ) / cur

                if resistance <= 0:
                    raise ValueError

                result.config(
                    text=f"R ≈ {resistance:.1f} Ω"
                )

            except:

                result.config(
                    text="Check your values.",
                    fg=RED
                )

        self.make_button(
            frame,
            "CALCULATE",
            calculate,
            width=20,
            height=2,
            bg=ACCENT
        ).pack()

    def lab_ldr(self):

        self.lab_window(
            "☀ LDR LAB",
            self.ldr_content
        )

    def ldr_content(self, frame):

        tk.Label(
            frame,
            text="Light Level Simulator",
            font=(FONT, 13, "bold"),
            bg=PANEL,
            fg=TEXT
        ).pack(pady=10)

        scale = tk.Scale(
            frame,
            from_=0,
            to=100,
            orient="horizontal",
            length=450,
            bg=PANEL,
            fg=TEXT,
            troughcolor=PANEL2,
            highlightthickness=0
        )

        scale.set(50)
        scale.pack(pady=10)

        result = tk.Label(
            frame,
            text="",
            font=(FONT, 14, "bold"),
            bg=PANEL,
            fg=ACCENT
        )

        result.pack(pady=15)

        def update():

            value = scale.get()

            if value < 25:

                state = "🌑 DARK"

            elif value < 60:

                state = "🌥️ MEDIUM LIGHT"

            else:

                state = "☀️ BRIGHT"

            result.config(
                text=f"Light Level: {value}%\n{state}"
            )

        scale.config(
            command=lambda x: update()
        )

        update()

    def lab_ultrasonic(self):

        self.lab_window(
            "📏 ULTRASONIC LAB",
            self.ultrasonic_content
        )

    def ultrasonic_content(self, frame):

        tk.Label(
            frame,
            text="HC-SR04 Distance Simulator",
            font=(FONT, 13, "bold"),
            bg=PANEL,
            fg=TEXT
        ).pack(pady=10)

        scale = tk.Scale(
            frame,
            from_=2,
            to=400,
            orient="horizontal",
            length=450,
            bg=PANEL,
            fg=TEXT,
            troughcolor=PANEL2,
            highlightthickness=0
        )

        scale.set(50)
        scale.pack(pady=10)

        result = tk.Label(
            frame,
            font=(FONT, 13, "bold"),
            bg=PANEL,
            fg=ACCENT
        )

        result.pack(pady=15)

        def update():

            d = scale.get()

            result.config(
                text=f"Distance: {d} cm\n"
                     f"Echo time ≈ {d * 58:.0f} μs"
            )

        scale.config(
            command=lambda x: update()
        )

        update()

    def lab_logic(self):

        self.lab_window(
            "🔢 LOGIC GATE LAB",
            self.logic_content
        )

    def logic_content(self, frame):

        tk.Label(
            frame,
            text="Select inputs A and B",
            font=(FONT, 13, "bold"),
            bg=PANEL,
            fg=TEXT
        ).pack(pady=10)

        a = tk.IntVar(value=0)
        b = tk.IntVar(value=0)

        row = tk.Frame(
            frame,
            bg=PANEL
        )

        row.pack()

        for text, var in [
            ("A", a),
            ("B", b)
        ]:

            tk.Label(
                row,
                text=text,
                font=(FONT, 11, "bold"),
                bg=PANEL,
                fg=TEXT
            ).pack(
                side="left",
                padx=(20, 5)
            )

            tk.OptionMenu(
                row,
                var,
                0,
                1
            ).pack(
                side="left",
                padx=10
            )

        gate = tk.StringVar(
            value="AND"
        )

        tk.Label(
            frame,
            text="Gate",
            font=(FONT, 9, "bold"),
            bg=PANEL,
            fg=MUTED
        ).pack(pady=(15, 3))

        tk.OptionMenu(
            frame,
            gate,
            "AND",
            "OR",
            "NAND",
            "NOR",
            "XOR",
            "XNOR"
        ).pack()

        result = tk.Label(
            frame,
            text="Output: 0",
            font=(FONT, 15, "bold"),
            bg=PANEL,
            fg=ACCENT
        )

        result.pack(pady=20)

        def calculate():

            x = a.get()
            y = b.get()
            g = gate.get()

            if g == "AND":
                out = x & y
            elif g == "OR":
                out = x | y
            elif g == "NAND":
                out = int(not (x & y))
            elif g == "NOR":
                out = int(not (x | y))
            elif g == "XOR":
                out = x ^ y
            else:
                out = int(not (x ^ y))

            result.config(
                text=f"Output: {out}"
            )

        self.make_button(
            frame,
            "RUN GATE",
            calculate,
            width=20,
            height=2,
            bg=ACCENT
        ).pack()

    def lab_rc(self):

        self.lab_window(
            "〰️ RC CIRCUIT LAB",
            self.rc_content
        )

    def rc_content(self, frame):

        tk.Label(
            frame,
            text="RC Charging Simulator",
            font=(FONT, 13, "bold"),
            bg=PANEL,
            fg=TEXT
        ).pack(pady=10)

        voltage = tk.DoubleVar(value=5)
        resistance = tk.DoubleVar(value=1000)
        capacitance = tk.DoubleVar(value=0.001)
        t = tk.DoubleVar(value=1)

        self.lab_entry(
            frame,
            "Supply Voltage (V)",
            voltage
        )

        self.lab_entry(
            frame,
            "Resistance (Ω)",
            resistance
        )

        self.lab_entry(
            frame,
            "Capacitance (F)",
            capacitance
        )

        self.lab_entry(
            frame,
            "Time (s)",
            t
        )

        result = tk.Label(
            frame,
            font=(FONT, 11, "bold"),
            bg=PANEL,
            fg=ACCENT
        )

        result.pack(pady=15)

        def calculate():

            try:

                v = float(voltage.get())
                r = float(resistance.get())
                c = float(capacitance.get())
                time = float(t.get())

                tau = r * c

                vc = v * (
                    1 - math.exp(
                        -time / tau
                    )
                )

                result.config(
                    text=f"Time Constant τ = {tau:.4f} s\n"
                         f"Capacitor Voltage = {vc:.3f} V"
                )

            except:

                result.config(
                    text="Check your values.",
                    fg=RED
                )

        self.make_button(
            frame,
            "CALCULATE",
            calculate,
            width=20,
            height=2,
            bg=ACCENT
        ).pack()

    def lab_window(
        self,
        title,
        content_function
    ):

        win = tk.Toplevel(
            self.root
        )

        win.title(title)
        win.geometry("650x560")
        win.resizable(False, False)
        win.configure(bg=PANEL)

        tk.Label(
            win,
            text=title,
            font=(FONT, 20, "bold"),
            bg=PANEL,
            fg=TEXT
        ).pack(pady=15)

        frame = tk.Frame(
            win,
            bg=PANEL
        )

        frame.pack(
            fill="both",
            expand=True,
            padx=30
        )

        content_function(frame)

    def lab_entry(
        self,
        parent,
        label,
        variable
    ):

        row = tk.Frame(
            parent,
            bg=PANEL
        )

        row.pack(
            pady=4
        )

        tk.Label(
            row,
            text=label,
            width=28,
            anchor="e",
            font=(FONT, 8, "bold"),
            bg=PANEL,
            fg=MUTED
        ).pack(
            side="left",
            padx=5
        )

        tk.Entry(
            row,
            textvariable=variable,
            width=18,
            font=(FONT, 9),
            bg=PANEL2,
            fg=TEXT,
            insertbackground=TEXT,
            relief="flat"
        ).pack(
            side="left"
        )

    # ========================================================
    # SETTINGS
    # ========================================================

    def show_settings(self):

        self.clear()

        self.header("SETTINGS")

        main = tk.Frame(
            self.root,
            bg=BG
        )

        main.pack(
            fill="both",
            expand=True
        )

        tk.Label(
            main,
            text="⚙ SETTINGS",
            font=(FONT, 28, "bold"),
            bg=BG,
            fg=TEXT
        ).pack(pady=(35, 20))

        card = tk.Frame(
            main,
            bg=PANEL,
            width=600,
            height=270,
            highlightbackground=BORDER,
            highlightthickness=1
        )

        card.pack()
        card.pack_propagate(False)

        tk.Label(
            card,
            text="ECE QUEST PRO",
            font=(FONT, 13, "bold"),
            bg=PANEL,
            fg=TEXT
        ).pack(pady=(25, 5))

        tk.Label(
            card,
            text="Your progress is saved locally.",
            font=(FONT, 9),
            bg=PANEL,
            fg=MUTED
        ).pack()

        self.make_button(
            card,
            "👤 EDIT PROFILE",
            self.edit_profile,
            width=24,
            height=2
        ).pack(pady=15)

        self.make_button(
            card,
            "🗑 RESET ALL PROGRESS",
            self.reset_progress,
            width=24,
            height=2,
            bg=RED
        ).pack()

        tk.Label(
            main,
            text=f"Data file: {DATA_FILE}",
            font=(FONT, 8),
            bg=BG,
            fg=MUTED
        ).pack(pady=15)

    def reset_progress(self):

        answer = messagebox.askyesno(
            "Reset Progress",
            "Reset all XP, badges, history and statistics?"
        )

        if not answer:
            return

        profile = self.data["profile"]

        self.data = self.default_data()

        self.data["profile"] = profile

        self.save_data()

        messagebox.showinfo(
            "Reset",
            "Progress reset successfully."
        )

        self.show_home()

    # ========================================================
    # ABOUT
    # ========================================================

    def show_about(self):

        self.clear()

        self.header("ABOUT")

        main = tk.Frame(
            self.root,
            bg=BG
        )

        main.pack(
            fill="both",
            expand=True
        )

        tk.Label(
            main,
            text="⚡ ECE QUEST PRO",
            font=(FONT, 35, "bold"),
            bg=BG,
            fg=TEXT
        ).pack(pady=(65, 5))

        tk.Label(
            main,
            text="Your Personal ECE Learning Platform",
            font=(FONT, 13, "bold"),
            bg=BG,
            fg=ACCENT
        ).pack()

        description = (
            "Learn electronics through lessons, quizzes,\n"
            "interactive experiments, formulas and achievements.\n\n"
            "Topics include Electrical Basics, Components,\n"
            "Circuit Theory, Digital, Analog, Embedded,\n"
            "Communication, Measurements, PCB and Signals."
        )

        tk.Label(
            main,
            text=description,
            font=(FONT, 10),
            bg=BG,
            fg=MUTED,
            justify="center"
        ).pack(pady=25)

        tk.Label(
            main,
            text="Built with Python + Tkinter",
            font=(FONT, 9, "bold"),
            bg=BG,
            fg=TEXT
        ).pack()

        tk.Label(
            main,
            text="ECE QUEST PRO • Version 1.0",
            font=(FONT, 8),
            bg=BG,
            fg=MUTED
        ).pack(pady=5)

    # ========================================================
    # SETTINGS / EXTRA NAV
    # ========================================================

    def show_nav(self):

        pass


# ============================================================
# START APPLICATION
# ============================================================

if __name__ == "__main__":

    root = tk.Tk()

    app = ECEQuestPro(root)

    # keyboard shortcuts
    root.bind(
        "<Escape>",
        lambda event: app.show_home()
    )

    root.mainloop()