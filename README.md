# <div align="center">🐙 Octus</div>

<div align="center">
  <h2>AI-Powered Intelligent Project Management & QA Platform</h2>
  <p><i>Predict Delays. Generate Tests. Validate UI. Shipping software has never been this intelligent.</i></p>
  
  [![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.100-green?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
  [![Gemini Pro](https://img.shields.io/badge/AI-Gemini%20Pro-blue?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)
  [![Firebase](https://img.shields.io/badge/Firebase-Host%20%26%20DB-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
</div>

---

## 🏗️ System Architecture

A clean, modular architecture driving four intelligent engines. Each module operates independently but shares a unified data layer.

```mermaid
graph TD
    Client[⚛️ React Frontend]
    API[⚡ FastAPI Backend]
    DB[(🔥 Firestore)]
    AI[✨ Gemini AI]
    
    Client -->|REST API| API
    API <-->|Persist| DB
    
    subgraph "Core AI Modules"
        Planning[📅 Planning Module]
        TestGen[🧪 Test Gen Module]
        Vision[👁️ Vision QA Module]
        Insights[📊 Insights Module]
    end
    
    API --> Planning
    API --> TestGen
    API --> Vision
    API --> Insights
    
    Planning -->|Text Analysis| AI
    TestGen -->|Code Generation| AI
    Vision -->|Image Analysis| AI
    Insights -->|Pattern Rec| AI
```

---

## ⚡ Tech Stack

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)

### Backend
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

### AI & ML
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google%20bard&logoColor=white)
![OpenCV](https://img.shields.io/badge/opencv-%23white.svg?style=for-the-badge&logo=opencv&logoColor=white)
![LangChain](https://img.shields.io/badge/🦜🔗%20LangChain-1C3C3C?style=for-the-badge)

### Infrastructure & Services
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)


---

## 🔄 The Agentic Loop
**Autonomous Self-Correction, Not Just Automation.**

Octus operates on a continuous **Agentic Loop** that mimics a senior engineer's thought process. It doesn't just execute tasks; it verifies the output and visualizes the result before considering the job done.

```mermaid
stateDiagram-v2
    [*] --> Perception
    
    state "👀 Perception" as Perception
    Perception --> Analysis : User Input / GitHub Event
    
    state "🧠 Analysis & Planning" as Analysis
    Analysis --> Execution : Plan Formulated
    
    state "⚡ Execution" as Execution
    Execution --> Verification : Code/Test Generated
    
    state "✅ Verification" as Verification
    Verification --> Success : Tests Pass / UI Valid
    Verification --> Correction : Failure Detected
    
    state "🛠️ Self-Correction" as Correction
    Correction --> Execution : Refined Prompt/Context
    
    Success --> [*]
```

### How the Loop Works
1.  **Perception**: The agent listens for User Stories, GitHub Push events, or Figma design updates.
2.  **Analysis**: using Gemini Pro, it breaks down the requirement into technical steps (e.g., "Create Login Component", "Add Auth Service").
3.  **Execution**: It generates the code, test cases, or risk analysis report.
4.  **Verification**:
    *   *For Tests*: It creates the tests.
    *   *For UI*: It compares the developed UI against the design using Computer Vision.
5.  **Self-Correction**: If the verification fails (e.g., UI mismatch > 5%), the agent analyzes the diff and suggests a fix loop.


---

## 🚀 Core Features — Deep Dive

### 1. AI-Assisted Planning
**Because deadlines shouldn't be a surprise.**
This module continuously monitors project task data, team velocity, and dependency chains. A Gemini NLP model interprets structured JSON task payloads and produces human-readable risk summaries, priority recommendations, and predictive timelines. It surfaces which tasks are likely to slip and which team members are overloaded *before* the sprint review.

| Aspect | Description |
| :--- | :--- |
| **INPUT** | Task list, sprint velocity history, team capacity, dependency graph. |
| **OUTPUT** | Risk score (0–100), predicted delay days, overload heatmap, priority recommendations. |
| **ARCH** | FastAPI receives task JSON → Gemini NLP prompt → Structured Pydantic models → Stored in Firestore. |

### 2. Intelligent Test Generation
**Stop writing boilerplate. Start testing features.**
Converts user stories written in plain English into structured, executable test cases — including happy paths, edge cases, and negative scenarios. It uses a Retrieval-Augmented Generation (RAG) approach to fetch relevant code context from the repository, ensuring the tests match the actual implementation. No blank test files. Just describe the feature and get a full test suite.

| Aspect | Description |
| :--- | :--- |
| **INPUT** | User story text, acceptance criteria, component context (e.g., 'Login Page'). |
| **OUTPUT** | Full test case set: Happy paths, Edge cases, Security scenarios. Exportable as `.feature` or `.json`. |
| **ARCH** | User story → RAG (Fetch Repo Context) → Gemini Few-Shot Prompt → Generated Test Suite. |

### 3. Vision-Based UI QA
**Pixel-perfect design implementation, guaranteed.**
Uses Gemini Vision and OpenCV to perform pixel-level comparisons between your localized build and the reference designs. It goes beyond simple image diffing by adding semantic understanding — it knows a "Submit button" from a "Cancel button" and flags layout shifts, missing elements, or colour anomalies that might affect user experience.

| Aspect | Description |
| :--- | :--- |
| **INPUT** | Baseline screenshot (v1), Comparison screenshot (v2), element labels. |
| **OUTPUT** | Visual diff overlay, element shift report, layout anomaly detection. |
| **ARCH** | React Upload → OpenCV Processing → Gemini Multimodal Analysis → Annotated Diff Image. |

### 4. End-to-End Quality Insights
**The "Go/No-Go" decision, automlated.**
Aggregates data from all three other modules to compute a holistic **Release Readiness Score**. A Gemini NLP analytics layer ingests defect counts, test pass rates, and visual regression scores to identify trend lines and recurring failure hotspots. It emits a plain-English release recommendation so engineering leads can make data-driven decisions.

| Aspect | Description |
| :--- | :--- |
| **INPUT** | Defect logs, test pass rates, visual regression scores, risk signals. |
| **OUTPUT** | Release Readiness Score (0–100), defect trend charts, localized hot-spot analysis. |
| **ARCH** | Cross-module Aggregation → Gemini Data Analysis → Narrative Summary → Dashboard render. |

---

## 🚀 Getting Started

1.  **Clone**
    ```bash
    git clone https://github.com/your-org/octus.git
    cd octus
    ```

2.  **Install**
    ```bash
    npm install
    ```

3.  **Run**
    ```bash
    npm run dev
    ```

---

## 👥 Team
Built by **Team Rudrax**.
