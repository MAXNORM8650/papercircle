# Paper Circle System Diagrams

## 0. Visual System Concept (Sketch Visualization)

Below is a high-fidelity visual sketch illustrating the core concept of the Paper Circle ecosystem, including the AI Orchestrator, Community Circles, and the Data Core.

![Paper Circle Architecture Sketch](paper_circle_architecture_sketch_1767535806880.png)

---

## 1. Master System Architecture (Detailed Sketch)

This comprehensive diagram maps the entire application code structure, data flow, and infrastructure.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#f4f4f4', 'fontFamily': 'Comic Sans MS'}, 'look': 'handDrawn'} }%%
graph TB
    subgraph Client_Side ["🖥️ Client Side (React/Vite)"]
        direction TB
        
        subgraph Routing ["Router Layer"]
            App[App.tsx]
            AuthCtx[AuthContext]
        end
        
        subgraph Views ["Main Views"]
            Dashboard[DashboardView]
            Discovery[AIDiscoveryView]
            AnalysisHub[AnalysisHubView]
            CommPapers[CommunityPapersTab]
        end
        
        subgraph Components ["Critical Components"]
            GraphViz[InteractiveGraph.tsx]
            MermaidViz[PaperAnalysisView\n(Mermaid Renderer)]
            PaperCard[PaperCard.tsx]
            SearchTags[SearchTagsSelector]
        end
        
        subgraph Hooks ["Data Hooks"]
            useEngagement[usePaperEngagement]
            useSession[useSessionAnalysis]
        end
    end

    subgraph Server_Side ["⚙️ Server Side (FastAPI/Python)"]
        direction TB
        
        subgraph API_Gateway ["API Endpoints"]
            FastDiscoveryApi["fast_discovery_api.py\n/discover\n/enhance"]
            AnalysisApi["paper_analysis_api.py\n/analyze/paper"]
            PipelineApi["research_pipeline_api.py\n/pipeline/status"]
            CommApi["community_papers_api.py\n/community/papers"]
        end

        subgraph Core_Agents ["AI Agent Layer"]
            PMG["Paper Mind Graph\n(paper_mind_graph/)"]
            PCA["Pipeline Control\n(discovery/pca.py)"]
            Reviewer["Review Agent\n(paper_review_agents/)"]
        end
        
        subgraph Agent_Logic ["Agent Logic"]
            Ingest[ingestion.py]
            Extract[extraction.py]
            Verify[verification.py]
            Export[export.py]
            Orchestrator[orchestrator.py]
        end
    end

    subgraph Storage ["💾 Data Persistence (Supabase)"]
        direction TB
        
        Table_Papers[("Table: papers\n(id, title, abstract,\nvector_embedding)")]
        Table_Analysis[("Table: paper_analysis\n(nodes, edges,\nmermaid_syntax)")]
        Table_Users[("Table: users\n(auth_id, preferences)")]
        Table_Engage[("Table: paper_engagement\n(likes, views, saves)")]
        Table_Comm[("Table: community_papers_global")]
    end

    subgraph External ["🌐 External World"]
        ArXiv[ArXiv API]
        S2[Semantic Scholar]
        LLM[LLM Inference\n(Ollama/Gemini)]
    end

    %% Client Interactions
    App --> AuthCtx
    AuthCtx --> Dashboard
    
    Dashboard --> CommPapers
    Dashboard --> Discovery
    
    Discovery --> SearchTags
    Discovery --> PaperCard
    
    CommPapers --> AnalysisHub
    AnalysisHub --> MermaidViz
    AnalysisHub --> GraphViz
    
    %% Hook Data Flow
    PaperAnalysisView --> useEngagement
    
    %% Network Calls
    Discovery --"/discover"--> FastDiscoveryApi
    AnalysisHub --"/analyze/paper"--> AnalysisApi
    CommPapers --"/community/papers"--> CommApi
    
    %% Backend Flow
    FastDiscoveryApi --> PCA
    PCA --> ArXiv
    PCA --> S2
    
    AnalysisApi --> PMG
    PMG --> Ingest
    Ingest --> Extract
    Extract --> Verify
    Verify --> Export
    
    CommApi --> Table_Comm
    
    %% AI Processing
    Extract --"Prompt"--> LLM
    Verify --"Check"--> LLM
    
    %% Data Persistence
    useEngagement --"RPC: toggle_engagement"--> Table_Engage
    
    PCA --"Upsert Papers"--> Table_Papers
    Export --"Save Graph"--> Table_Analysis
    Reviewer --> Orchestrator
    
    Table_Papers -.-> Table_Analysis
    Table_Users -.-> Table_Engage
```

---

## 2. Full General Research Pipeline

The end-to-end flow of how research is discovered, analyzed, and synthesized.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#f4f4f4', 'fontFamily': 'Comic Sans MS'}, 'look': 'handDrawn'} }%%
flowchart LR
    User([User Query]) --> Discovery[Discovery Phase]
    
    subgraph Discovery ["Discovery Phase"]
        direction TB
        Search[Search Tools\n(ArXiv/S2)]
        Sort[Sorting Agent\n(Relevance/Novelty)]
        Filter[Filter Agent]
    end
    
    Discovery --> Analysis[Analysis Phase]
    
    subgraph Analysis ["Analysis Phase"]
        direction TB
        PDF[PDF Retrieval]
        MindGraph[Mind Graph Generation]
        Review[Critical Review]
    end
    
    Analysis --> Synthesis[Synthesis Phase]
    
    subgraph Synthesis ["Synthesis Phase"]
        direction TB
        Report[Report Generation]
        Dashboard[Interactive Dashboard]
        Viz[Visualization\n(Mermaid/D3)]
    end
    
    Synthesis --> Output([Final Insight])
    
    Search --> Sort
    Sort --> Filter
    Filter --> PDF
    PDF --> MindGraph
    PDF --> Review
    MindGraph --> Viz
    Review --> Report
    Report --> Dashboard
```

---

## 3. Detailed Individual Pipelines

### 3.1 Discovery Pipeline (Fast Discovery & Agentic Search)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#f4f4f4', 'fontFamily': 'Comic Sans MS'}, 'look': 'handDrawn'} }%%
sequenceDiagram
    participant U as User
    participant API as Fast Discovery API
    participant Search as PaperSearchTool
    participant Sort as PaperSortTool
    participant Analyze as PaperAnalysisTool
    participant Ext as ArXiv/S2
    participant LLM as LLM Service

    U->>API: POST /discover (query="Agentic Coding")
    
    API->>API: Clean & Optimize Query
    
    par Parallel Search
        API->>Search: Search(query, source="arxiv")
        Search->>Ext: Fetch Papers
        API->>Search: Search(query, source="s2")
        Search->>Ext: Fetch Papers
    end
    
    Ext-->>API: Raw Paper List
    
    API->>Sort: Sort(strategy="relevance + novelty")
    Sort->>Sort: Calculate Embeddings (TF-IDF/Vector)
    Sort-->>API: Ranked Papers
    
    API->>Analyze: Analyze(top_k=10)
    Analyze->>LLM: "Summarize trends in these papers"
    LLM-->>Analyze: Key Trends & Insights
    
    API->>API: Generate Dashboard (HTML/JSON)
    
    API-->>U: Return JSON Response + Dashboard Link
```

### 3.2 Paper Mind Graph Pipeline (Analysis)

Logic flow within `paper_mind_graph/ingestion.py` and `extraction.py`.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#f4f4f4', 'fontFamily': 'Comic Sans MS'}, 'look': 'handDrawn'} }%%
flowchart TD
    Start[Start Analysis] --> Check{Has Analysis?}
    Check -->|Yes| Return[Return Cached Data]
    Check -->|No| FetchPDF[Fetch PDF/Content]
    
    FetchPDF --> Extract[Extract Text Structure]
    Extract --> LLM_Process[LLM Processing Node]
    
    subgraph "Paper Mind Graph Agent"
        LLM_Process --> Identify_Concepts[Identify Key Concepts]
        LLM_Process --> Identify_Methods[Identify Methods]
        LLM_Process --> Identify_Exps[Identify Experiments]
        
        Identify_Concepts --> Relate[Find Relationships]
        Identify_Methods --> Relate
        Identify_Exps --> Relate
        
        Relate --> Verify[Verification Step]
        Verify -->|Pass| Graph[Construct Mind Graph]
        Verify -->|Fail| Refine[Refine Extraction]
        Refine --> LLM_Process
    end
    
    Graph --> Gen_Mermaid[Generate Mermaid Syntax]
    Graph --> Gen_Summary[Generate Markdown Summary]
    
    Gen_Mermaid --> SaveDB[(Save to Supabase)]
    Gen_Summary --> SaveDB
    
    SaveDB --> End[Complete]
```

### 3.3 Review Agent Pipeline (Multi-Agent Orchestrator)

Logic flow within `paper_review_agents/orchestrator.py`.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#f4f4f4', 'fontFamily': 'Comic Sans MS'}, 'look': 'handDrawn'} }%%
stateDiagram-v2
    [*] --> Stage1_PDF: Paper URL
    state "Stage 1: Processing" as Stage1_PDF {
        Download --> ExtractText
        ExtractText --> ExtractMetadata
    }
    
    Stage1_PDF --> Stage2_Analysis: Text & Metadata
    
    state "Stage 2: Parallel Analysis" as Stage2_Analysis {
        state "Deep Analyzer Agent" as DA
        state "Critic Agent" as CA
        state "Contribution Agent" as ContA
        state "Reproducibility Agent" as RepA
        state "Summary Agent" as SumA
        
        DA --> [*]
        CA --> [*]
        ContA --> [*]
        RepA --> [*]
        SumA --> [*]
    }
    
    Stage2_Analysis --> Stage3_Lit: Partial Results
    
    state "Stage 3: Literature Search" as Stage3_Lit {
        Search_S2 --> Extract_Citations
        Search_Arxiv --> Extract_Citations
        Extract_Citations --> [*]
    }
    
    Stage3_Lit --> Stage4_Report: All Results
    
    state "Stage 4: Reporting" as Stage4_Report {
        Compile_Sections --> Generate_Markdown
    }
    
    Stage4_Report --> [*]: Final Report
```

### 3.4 Community Sync & Serving Flow

Logic flow within `community_papers_api.py`.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#f4f4f4', 'fontFamily': 'Comic Sans MS'}, 'look': 'handDrawn'} }%%
sequenceDiagram
    participant Scheduler
    participant API as Community API
    participant FS as File System
    participant DB as Supabase
    participant Client

    rect rgb(240, 240, 240)
    note right of Scheduler: Background Sync Process
    Scheduler->>API: Trigger Sync (Run ID)
    API->>FS: Scan `research_output/`
    FS-->>API: List of JSON files
    
    loop For Each Paper
        API->>DB: Check if Title Exists?
        alt Exists
            API->>DB: Update Record
        else New
            API->>DB: Insert into `papers`
        end
        API->>DB: Upsert to `community_papers_global`
    end
    
    API->>DB: Update Sync Run Status (Completed)
    end
    
    rect rgb(245, 255, 245)
    note right of Client: Serving Logic
    Client->>API: GET /community/papers?page=1&sort=likes
    API->>DB: RPC `get_community_papers`
    DB-->>API: Paginated Results
    API-->>Client: JSON Response (Papers + Meta)
    end
```
