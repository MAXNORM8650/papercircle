# Paper Circle Diagrams (Academic Sketch Style)

These diagrams are academic, sketch-style system figures for Paper Circle.
They avoid file names and focus on conceptual modules and flows.

## 1) Overall System Architecture (Sketch)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#f4f4f4', 'fontFamily': 'Comic Sans MS'}, 'look': 'handDrawn'} }%%
graph TB
    subgraph Client["Client Layer"]
        C1[Authentication + Routing]
        C2[Discovery Workspace]
        C3[Analysis Workspace]
        C4[Community + Sessions]
        C5[Visualization Renderer]
    end

    subgraph API["Service Layer"]
        A1[Discovery Service]
        A2[Multi-Agent Pipeline Service]
        A3[Paper Analysis Service]
        A4[Community Service]
        A5[Review Service]
    end

    subgraph Agents["Agent + Pipeline Layer"]
        P1[Direct Tools Workflow]
        P2[Multi-Agent Research Orchestrator]
        P3[Mind Graph Generator]
        P4[Review Orchestrator]
    end

    subgraph Data["Data Layer"]
        D1[(Papers)]
        D2[(Paper Analysis)]
        D3[(Community Papers)]
        D4[(Users + Preferences)]
        D5[(Engagement + Sessions)]
        D6[(Sync Runs)]
        D7[(Run Output Archive)]
        D8[(Paper Cache)]
    end

    subgraph External["External Sources + LLM"]
        E1[arXiv]
        E2[Semantic Scholar]
        E3[LLM Provider]
    end

    Client --> API
    A1 --> P1
    A2 --> P2
    A3 --> P3
    A5 --> P4

    P1 --> E1
    P1 --> E2
    P2 --> E1
    P2 --> E2
    P3 --> E3
    P4 --> E3

    A1 --> D1
    A1 --> D7
    A2 --> D1
    A2 --> D7
    A3 --> D2
    A3 --> D8
    A4 --> D3
    A5 --> D2
    A5 --> D1

    D4 -.-> A1
    D4 -.-> A2
    D4 -.-> A3
    D5 -.-> A4
    D6 -.-> A4
```

## 2) Full General Pipeline (End-to-End)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#f4f4f4', 'fontFamily': 'Comic Sans MS'}, 'look': 'handDrawn'} }%%
flowchart LR
    U([User Goal]) --> Q[Research Query]
    Q --> D[Discovery]
    D --> A[Paper Analysis]
    A --> R[Review + Synthesis]
    R --> C[Community Publishing]
    C --> S[Sessions + Presentation]
    S --> O([Insight + Visual Outputs])
```

## 3) Individual Pipelines (Detailed, General)

### 3.1 Discovery (Direct Tools Workflow)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#f4f4f4', 'fontFamily': 'Comic Sans MS'}, 'look': 'handDrawn'} }%%
flowchart TD
    Req[Discovery Request] --> Clean[Normalize Query + Filters]
    Clean --> Search[Multi-Source Search]
    Search --> Sort[Ranking + Scoring]
    Sort --> Analyze[Trend + Venue + Year Analysis]
    Analyze --> Export[Structured Exports]
    Export --> Viz[Dashboard Visualization]
    Viz --> Diversity[Optional Diversity Re-rank]
    Diversity --> Resp[Results + Dashboard Link]
```

### 3.2 Multi-Agent Research Pipeline (Streaming)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#f4f4f4', 'fontFamily': 'Comic Sans MS'}, 'look': 'handDrawn'} }%%
sequenceDiagram
    participant User
    participant Service as Pipeline Service
    participant LLM as LLM Model
    participant Orchestrator as Multi-Agent Orchestrator
    participant Output as Run Output Archive

    User->>Service: Start pipeline (query + tags)
    Service->>Service: Build enhanced query + constraints
    Service->>Output: Create run directory
    Service-->>User: Stream init (run id)
    Service->>LLM: Initialize model
    Service->>Orchestrator: Create pipeline
    Service->>Orchestrator: Run pipeline (async)
    loop Stream updates
        Service->>Output: Check new papers + step logs
        Service-->>User: Streaming status + partial results
    end
    Service-->>User: Pipeline complete
```

### 3.3 Paper Analysis (Mind Graph)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#f4f4f4', 'fontFamily': 'Comic Sans MS'}, 'look': 'handDrawn'} }%%
flowchart TD
    Req[Analysis Request] --> Policy[Quota + Model Selection]
    Policy --> Cache{Existing Analysis?}
    Cache -->|Yes| Return[Return Cached Result]
    Cache -->|No| Fetch[Fetch PDF + Metadata]
    Fetch --> Parse[Chunk + Structural Parse]
    Parse --> Extract[LLM Concept/Method/Experiment Extraction]
    Extract --> Verify[Verification + Refinement]
    Verify --> Graph[Build Mind Graph]
    Graph --> Export[Generate Flowchart + Mindmap + Summary]
    Export --> Save[(Persist Analysis)]
    Save --> Return
```

### 3.4 Paper Review (Multi-Agent Reviewers)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#f4f4f4', 'fontFamily': 'Comic Sans MS'}, 'look': 'handDrawn'} }%%
stateDiagram-v2
    [*] --> Intake
    Intake --> Processing
    state Processing {
        Download --> TextExtract --> Metadata
    }
    Processing --> ParallelReview
    state ParallelReview {
        DeepAnalysis
        CriticalReview
        ContributionCheck
        Reproducibility
        Summary
    }
    ParallelReview --> LiteratureScan
    state LiteratureScan {
        ExternalSearch --> CitationMatch
    }
    LiteratureScan --> Report
    state Report {
        Compile --> StructuredReport
    }
    Report --> [*]
```

### 3.5 Community Sync + Serving

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#f4f4f4', 'fontFamily': 'Comic Sans MS'}, 'look': 'handDrawn'} }%%
flowchart TD
    Trigger[Sync Trigger] --> Scan[Scan Run Archives]
    Scan --> Parse[Load Paper Records]
    Parse --> Dedup[De-duplicate]
    Dedup --> Upsert[Upsert Papers + Community Index]
    Upsert --> Status[(Sync Run Status)]
    Serve[Community Query] --> Filters[Filter + Sort]
    Filters --> Deliver[Paginated Results]
```

### 3.6 Frontend Discovery → Analysis Path

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#f4f4f4', 'fontFamily': 'Comic Sans MS'}, 'look': 'handDrawn'} }%%
sequenceDiagram
    participant User
    participant UI as Discovery UI
    participant Service as Discovery Service
    participant Analysis as Analysis Service
    participant Store as Data Store

    User->>UI: Enter query + filters
    UI->>Service: Submit discovery request
    Service-->>UI: Results + dashboard
    User->>UI: Open paper analysis
    UI->>Analysis: Analyze selected paper
    Analysis->>Store: Persist analysis
    Analysis-->>UI: Mindmap + flowchart + summary
```

## 4) Usage Notes

- All labels are academic and avoid implementation-specific file names.
- The sketch look is provided via Mermaid "handDrawn" rendering.
