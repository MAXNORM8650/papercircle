# Research Papers: verified LLM post-training

Updated: 2026-01-02 17:34
Total: 727 papers

---

## 1. A Survey on Efficient Large Language Model Training: From Data-centric Perspectives

**Authors:** Junyu Luo, Bohan Wu, Xiao Luo, Zhiping Xiao, Yiqiao Jin

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.1493.pdf) | > Post-training of Large Language Models (LLMs) is crucial for unlocking their task generalization potential and domain-specific capabilities. However, the current LLM post-training paradigm faces significant data challenges, including the high costs of manual annotation and diminishing marginal returns on data scales. Therefore, achieving data-efficient post-training has become a key research quest...

---

## 2. Mitigating Forgetting in LLM Supervised Fine-Tuning and Preference Learning

**Authors:** Heshan Devaka Fernando, Han Shen, Parikshit Ram, Yi Zhou, Horst Samulowitz

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Post-training of pre-trained LLMs, which typically consists of the supervised fine-tuning (SFT) stage and the preference learning (RLHF or DPO) stage, is crucial to effective and safe LLM applications. The widely adopted approach in post-training popular open-source LLMs is to sequentially perform SFT and RLHF/DPO. However, sequential training is sub-optimal in terms of SFT and RLHF/DPO trade-off:...

---

## 3. Revisiting Parameter Server in LLM Post-Training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Modern data parallel (DP) training favors collective communication over parameter servers (PS) for its simplicity and efficiency under balanced workloads. However, the balanced workload assumption no longer holds in large language model (LLM) post-training due to the large variance in sequence lengths. Under imbalanced workloads, collective communication creates synchronization barriers, leading t...

---

## 4. $Q\sharp$: Provably Optimal Distributional RL for LLM Post-Training

**Authors:** Jin Peng Zhou, Kaiwen Wang, Jonathan Daniel Chang, Zhaolin Gao, Nathan Kallus

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning (RL) post-training is crucial for LLM alignment and reasoning, but existing policy-based methods, such as PPO and DPO, can fall short of fixing shortcuts inherited from pre-training. In this work, we introduce $Q\sharp$, a value-based algorithm for KL-regularized RL that guides the reference policy using the optimal regularized $Q$ function. We propose to learn the optimal $...

---

## 5. Generalizable LLM Learning of Graph Synthetic Data with Post-training Alignment

**Authors:** Yizhuo Zhang, Heng Wang, Shangbin Feng, Zhaoxuan Tan, Xinyun Liu

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Previous research has sought to enhance the graph reasoning capabilities of LLMs by supervised fine-tuning on synthetic graph data. While these led to specialized LLMs better at solving graph algorithm problems, we don't need LLMs for shortest path: we need generalization from synthetic graph data to real-world tasks with implicit graph structures. In this work, we propose to unlock generalizable ...

---

## 6. First SFT, Second RL, Third UPT: Continual Improving Multi-Modal LLM Reasoning via Unsupervised Post-Training

**Authors:** Lai Wei, Yuting Li, Chen Wang, Yue Wang, Linghe Kong

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Improving Multi-modal Large Language Models (MLLMs) in the post-training stage typically relies on supervised fine-tuning (SFT) or reinforcement learning (RL), which require expensive and manually annotated multi-modal data--an ultimately unsustainable resource.
This limitation has motivated a growing interest in unsupervised paradigms as a third stage of post-training after SFT and RL.
While rece...

---

## 7. UFT: Unifying Supervised and Reinforcement Fine-Tuning

**Authors:** Mingyang Liu, Gabriele Farina, Asuman E. Ozdaglar

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Post-training has demonstrated its importance in enhancing the reasoning capabilities of large language models (LLMs). The primary post-training methods can be categorized into supervised fine-tuning (SFT) and reinforcement fine-tuning (RFT). SFT is efficient and well-suited for small language models, but it may lead to overfitting and limit the reasoning abilities of larger models. In contrast, R...

---

## 8. VLA-RFT: Vision-Language-Action Reinforcement Fine-Tuning with Verified Rewards in World Simulators

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Vision-Language-Action (VLA) models enable embodied decision-making but rely heavily on imitation learning, leading to compounding errors and poor robustness under distribution shift. Reinforcement learning (RL) can mitigate these issues yet typically demands costly real-world interactions or suffers from sim-to-real gaps. We introduce VLA-RFT, a Reinforcement Fine-Tuning framework that leverages ...

---

## 9. BiLLM: Pushing the Limit of Post-Training Quantization for LLMs

**Authors:** Wei Huang, Yangdong Liu, Haotong Qin, Ying Li, Shiming Zhang

**Year:** 2024 | **Venue:** ICML 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=qOl2WWOqFg) | > Pretrained large language models (LLMs) exhibit exceptional general language processing capabilities but come with significant demands on memory and computational resources. As a powerful compression technology, binarization can extremely reduce model weights to a mere 1 bit, lowering the expensive computation and memory requirements. However, existing quantization techniques fall short of maintai...

---

## 10. Reinforcement Fine-Tuning Naturally Mitigates Forgetting in Continual Post-Training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Continual post-training (CPT) is a popular and effective technique for adapting foundation models like multimodal large language models to specific and ever-evolving downstream tasks. While existing research has primarily concentrated on methods like data replay, model expansion, or parameter regularization, the fundamental role of the learning paradigm within CPT remains largely unexplored. This ...

---

## 11. RiskPO: Risk-based Policy Optimization with Verifiable Reward for LLM Post-Training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning with verifiable reward has recently emerged as a central paradigm for post-training large language models (LLMs); however, prevailing mean-based methods, such as Group Relative Policy Optimization (GRPO), suffer from entropy collapse and limited reasoning gains. We argue that these issues stem from overemphasizing high-probability output sequences while neglecting rare but i...

---

## 12. SVD-LLM: Truncation-aware Singular Value Decomposition for Large Language Model Compression

**Authors:** Xin Wang, Yu Zheng, Zhongwei Wan, Mi Zhang

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=LNYIUouhdt) | > The advancements in Large Language Models (LLMs) have been hindered by
their substantial sizes, which necessitates LLM compression methods for practical
deployment. Singular Value Decomposition (SVD) offers a promising solution for
LLM compression. However, state-of-the-art SVD-based LLM compression meth-
ods have two key limitations: truncating smaller singular values may lead to higher
compressi...

---

## 13. TesseraQ: Ultra Low-Bit LLM Post-Training Quantization with Block Reconstruction

**Authors:** Yuhang Li, Priyadarshini Panda

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) have revolutionized natural language processing, albeit at the cost of immense memory and computation requirements. Post-training quantization (PTQ) is becoming the \emph{de facto} method to reduce the memory footprint and improve the inference throughput of LLMs.
In this work, we aim to push the upper limit of LLM PTQ by optimizing the weight rounding parameters with ...

---

## 14. DualTune: Decoupled Fine-tuning for On-Device Agentic Systems

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> The deployment of Large Language Models (LLMs) as agentic orchestrators has revolutionized task automation, but the need for privacy-preserving, cost-effective solutions demands on-device inference capabilities. However, local LLMs consistently underperform compared to frontier models in tool calling scenarios, struggling with both tool selection from large tool sets and accurate argument generati...

---

## 15. Pruning Foundation Models for High Accuracy without Retraining

**Authors:** Pu Zhao, Fei Sun, Xuan Shen, Pinrui Yu, Zhenglun Kong

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.findings-emnlp.566.pdf) | > Despite the superior performance, it is challenging to deploy large language models (LLMs) due to their massive parameters and computations. While pruning is a promising technique to reduce model size and accelerate the inference, the traditional pruning techniques can hardly be applied for LLMs as they need to finetune the model on the full dataset with multiple epochs consuming massive data and ...

---

## 16. A Benchmark for Vericoding: Formally Verified Program Synthesis

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> We present and test the largest  benchmark for *vericoding*, LLM-generation of formally verified code from formal specifications --- in contrast to *vibe coding*, which generates potentially buggy code from a natural language description. Our benchmark contains 12,504 formal specifications, with 3,029 in Dafny, 2,334 in Verus/Rust and 7,141 in Lean. Of these, 6,174 are new unseen problems. We find...

---

## 17. Cuckoo: An IE Free Rider Hatched by Massive Nutrition in LLM’s Nest

**Authors:** Letian Peng, Zilong Wang, Feng Yao, Jingbo Shang

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.66.pdf) | > Massive high-quality data, both pre-training raw texts and post-training annotations, have been carefully prepared to incubate advanced large language models (LLMs). In contrast, for information extraction (IE), pre-training data, such as BIO-tagged sequences, are hard to scale up. We show that IE models can act as free riders on LLM resources by reframing next-token prediction into extraction for...

---

## 18. Symmetric Pruning for Large Language Models

**Authors:** Kai Yi, Peter Richtárik

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Popular post-training pruning methods such as Wanda and RIA are known for their simple, yet effective, designs that have shown exceptional empirical performance. Wanda optimizes performance through calibrated activations during pruning, while RIA emphasizes the relative, rather than absolute, importance of weight elements. Despite their practical success, a thorough theoretical foundation explaini...

---

## 19. Improve LLM Pre-training with RL-Guided Annealing

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Training large language models (LLMs) typically proceeds in two distinct stages: pre-training and post-training. However, the question of how to exploit these stages synergistically—particularly how post-trained models can inform and improve pre-training—remains underexplored.

We begin by analyzing training dynamics and identify the annealing (mid-training) phase as a critical turning point for t...

---

## 20. LRQ: Optimizing Post-Training Quantization for Large Language Models by Learning Low-Rank Weight-Scaling Matrices

**Authors:** Jung Hyun Lee, Jeonghoon Kim, June Yong Yang, Se Jung Kwon, Eunho Yang

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> With the commercialization of large language models (LLMs), weight-activation quantization has emerged to compress and accelerate LLMs, achieving high throughput while reducing inference costs. However, existing post-training quantization (PTQ) techniques for quantizing both weights and activations of LLMs still suffer from non-negligible performance drops, especially on massive multitask language...

---

## 21. Safe Delta: Consistently Preserving Safety when Fine-Tuning LLMs on Diverse Datasets

**Authors:** Ning Lu, Shengcai Liu, Jiahao Wu, Weiyu Chen, Zhirui Zhang

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=QsCDgFKErb) | > Large language models (LLMs) have shown great potential as general-purpose AI assistants across various domains. To fully leverage this potential in specific applications, many companies provide fine-tuning API services, enabling users to upload their own data for LLM customization. However, fine-tuning services introduce a new safety threat: user-uploaded data, whether harmful or benign, can brea...

---

## 22. Modifying Large Language Model Post-Training for Diverse Creative Writing

**Authors:** John Joon Young Chung, Vishakh Padmakumar, Melissa Roemmele, Yuqian Sun, Max Kreminski

**Year:** 2025 | **Venue:** COLM 2025 | **Citations:** N/A | **Score:** 0.000

> As creative writing tasks do not have singular correct answers, large language models (LLMs) trained to perform these tasks should be able to generate diverse valid outputs. However, LLM post-training often focuses on improving generation quality but neglects to facilitate output diversity. Hence, in creative writing generation, we investigate post-training approaches to promote both output divers...

---

## 23. OPTIMA: Optimal One-shot Pruning for LLMs via Quadratic Programming Reconstruction

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training model pruning is a promising solution, yet it faces a trade-off: simple heuristics that zero weights are fast but degrade accuracy, while principled joint optimization methods recover accuracy but are computationally infeasible at modern scale. One-shot methods such as SparseGPT offer a practical trade-off in optimality by applying efficient, approximate heuristic weight updates. To ...

---

## 24. Bridging the Preference Gap: Post-Training Input Rewriting with Large Language Models

**Authors:** ShengKun Tu, Shisong Chen, Zhixu Li, Yanghua Xiao, Liangyue Li

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Pre-trained language models, such as BERT and RoBERTa, have achieved remarkable performance in semantic classification tasks. Yet, their effectiveness varies with different textual expressions due to inherent preferences developed during training. To address this limitation, we propose a framework that leverages large language models (LLMs) to rewrite input texts in ways that better align with a t...

---

## 25. VeriGuard: Enhancing LLM Agent Safety via Verified Code Generation

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> The deployment of autonomous AI agents in sensitive domains, such as healthcare, introduces critical risks to safety, security, and privacy. These agents may deviate from user objectives, violate data handling policies, or be compromised by adversarial attacks. Mitigating these dangers necessitates a mechanism to formally guarantee that an agent's actions adhere to predefined safety constraints, a...

---

## 26. Finding and Reactivating Post-Trained LLMs' Hidden Safety Mechanisms

**Authors:** Mingjie Li, Wai Man Si, Michael Backes, Yang Zhang, Yisen Wang

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Despite the impressive performance of general-purpose large language models (LLMs), they often require fine-tuning or post-training to excel at specific tasks. 
    For instance, large reasoning models (LRMs), such as the DeepSeek-R1 series, demonstrate strong reasoning capabilities after post-training different general large language models on diverse chain-of-thought (CoT) datasets. 
    However...

---

## 27. BCQ: Block Clustered Quantization for 4-bit (W4A4) LLM inference

**Authors:** Reena Elangovan, Charbel Sakr, Anand Raghunathan, Brucek Khailany

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Post-training quantization (PTQ) is a promising approach to reducing the storage and computational requirements of large language models (LLMs) without additional training cost. Recent PTQ studies have primarily focused on quantizing only weights to sub-8-bits while maintaining activations at 8-bits or higher. Accurate sub-8-bit quantization for both weights and activations without relying on quan...

---

## 28. Expert-Integrated Active Learning for Optimizing LLM Agents

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Recent advances in Large Language Models (LLMs) have created new opportunities for their application in interactive environments. However, these agentic tasks present significant challenges due to the complexity of long and specialized interaction trajectories that are underrepresented in standard training distributions. While Reinforcement Learning (RL) post-training offers a promising approach t...

---

## 29. WildChat-50M: A Deep Dive Into the Role of Synthetic Data in Post-Training

**Authors:** Benjamin Feuer, Chinmay Hegde

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=fzmtDDOcJ3) | > Language model (LLM) post-training can refine behaviors and unlock new skills, but the open science supporting these post-training techniques is still in its infancy. One limiting factor has been the difficulty of conducting large-scale comparative analyses of synthetic data generating models and LLM judges. To close this gap, we introduce WildChat-50M, the largest public chat dataset to date. We ...

---

## 30. Learning Grouped Lattice Vector Quantizers for Low-Bit LLM Compression

**Authors:** Xi Zhang, Xiaolin Wu, Jiamang Wang, Weisi Lin

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) have demonstrated remarkable capabilities but typically require extensive computational resources and memory for inference. Post-training quantization (PTQ) can effectively reduce these demands by storing weights in lower bit-width formats. However, standard uniform quantization often leads to notable performance degradation, particularly in low-bit scenarios. In this ...

---

## 31. Adaptive Layer-Wise Transformations for Post-Training Quantization of Large Language Models

**Authors:** Cuong Pham, Dung Anh Hoang, Cuong C. Nguyen, Trung Le, Gustavo Carneiro

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models require significant computational resources for deployment, making quantization essential for practical applications. However, the main obstacle to effective quantization lies in systematic outliers in activations and weights, which cause substantial LLM performance degradation, especially at low-bit settings. While existing transformation-based methods like affine and rotati...

---

## 32. Style Outweighs Substance: Failure Modes of LLM Judges in Alignment Benchmarking

**Authors:** Benjamin Feuer, Micah Goldblum, Teresa Datta, Sanjana Nambiar, Raz Besaleli

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=MzHNftnAM1) | > The release of ChatGPT in November 2022 sparked an explosion of interest in post-training and an avalanche of new preference optimization (PO) methods. These methods claim superior alignment by virtue of better correspondence with human pairwise preferences, often measured by LLM-judges. In this work, we attempt to answer the following question -- do LLM-judge preferences translate to progress on ...

---

## 33. Reinforcement Learning from Dynamic Critic Feedback for Free-Form Generations

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Open-ended generation tasks require outputs to satisfy diverse and often implicit task-specific evaluation rubrics. The sheer number of relevant rubrics leads to prohibitively high verification costs and incomplete assessments of a response, making reinforcement learning (RL) post-training with rubric-based rewards difficult to scale. This problem is exacerbated by the fact that often the best way...

---

## 34. Strategic Generalization Without Interaction: Can Post-Training Alone Induce Multi-Agent Behavior?

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Directly training Large Language Models (LLMs) for Multi-Agent Systems (MAS) remains challenging due to intricate reward modeling, dynamic agent interactions, and demanding generalization requirements.
This paper explores whether post-training techniques can effectively generalize to multi-agent scenarios $\textit{without any interactive multi-agent data}$.
We use economic reasoning as a testbed, ...

---

## 35. Spinning Straw into Gold: Relabeling LLM Agent Trajectories in Hindsight for Successful Demonstrations

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language model agents operate in partially observable, long-horizon settings where obtaining supervision remains a major bottleneck. We address this by leveraging a source of supervision overlooked in existing post-training methods: ``unintended yet successful'' goals embedded within agent rollouts. We introduce Hindsight Supervised Learning (HSL), where an auxiliary LLM reviews each complet...

---

## 36. Can LLMs Serve as Causal Inference Agents? A Study on Post-Training Methods

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Despite the potential of Large Language Models (LLMs) to democratize causal inference, they currently struggle with quantitative reasoning. This paper investigates whether post-training can transform an LLM into a practical and accessible causal inference agent for non-professionals. To facilitate this, we first introduce the DeepCausal dataset, a novel collection of seven computational causal inf...

---

## 37. EfficientLLM: Unified Pruning-Aware Pretraining for Auto-Designed Edge Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Modern large language models (LLMs) driven by scaling laws achieve emergent intelligence in large model sizes. Recently, the increasing concerns about cloud costs, latency and privacy make it an urgent requirement to develop compact edge language models. Distinguished from direct pretraining that bounded by the scaling law, this work proposes the unified pruning-aware pretraining, focusing on reta...

---

## 38. GVPO: Group Variance Policy Optimization for Large Language Model Post-Training

**Authors:** Kaichen Zhang, Yuzhong Hong, Junwei Bao, Hongfei Jiang, yang song

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Post-training plays a crucial role in refining and aligning large language models to meet specific tasks and human preferences. While recent advancements in post-training techniques, such as Group Relative Policy Optimization (GRPO), leverage increased sampling with relative reward scoring to achieve superior performance, these methods often suffer from training instability that limits their pract...

---

## 39. vCache: Verified Semantic Prompt Caching

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Semantic caches return cached responses for semantically similar prompts to reduce LLM inference latency and cost. They embed cached prompts and store them alongside their response in a vector database. Embedding similarity metrics assign a numerical score to quantify the similarity between a request and its nearest neighbor prompt from the cache. Existing systems use the same static similarity th...

---

## 40. Preserving LLM Capabilities through Calibration Data Curation: From Analysis to Optimization

**Authors:** Bowei He, Lihao Yin, Huiling Zhen, Shuqi LIU, Han Wu

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Post-training compression has been a widely employed approach to scale down large language model (LLM) and facilitate efficient inference. In various proposed compression methods, including pruning and quantization, calibration data plays a vital role by informing the weight importance and activation dynamic ranges. However, how calibration data impacts the LLM capability after compression is less...

---

## 41. AL-QASIDA: Analyzing LLM Quality and Accuracy Systematically in Dialectal Arabic

**Authors:** Nathaniel Romney Robinson, Shahd Abdelmoneim, Kelly Marchisio, Sebastian Ruder

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.findings-acl.1137.pdf) | > Dialectal Arabic (DA) varieties are under-served by language technologies, particularly large language models (LLMs). This trend threatens to exacerbate existing social inequalities and limits LLM applications, yet the research community lacks operationalized performance measurements in DA. We present a framework that comprehensively assesses LLMs’ DA modeling capabilities across four dimensions: ...

---

## 42. SINQ: Sinkhorn-Normalized Quantization for Calibration-Free Low-Precision LLM Weights

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training quantization has emerged as the most widely used strategy for deploying large language models at low precision. Still, current methods show perplexity degradation at bit-widths $\leq 4$, partly because representing outliers causes precision issues in parameters that share the same scales as these outliers. This problem is especially pronounced for calibration-free, uniform quantizati...

---

## 43. SmoothQuant: Accurate and Efficient Post-Training Quantization for Large Language Models

**Authors:** Guangxuan Xiao, Ji Lin, Mickael Seznec, Hao Wu, Julien Demouth

**Year:** 2023 | **Venue:** ICML 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=sHfSV8eYEp) | > Large language models (LLMs) show excellent performance but are compute- and memory-intensive. Quantization can reduce memory and accelerate inference. However, existing methods cannot maintain accuracy and hardware efficiency at the same time. We propose SmoothQuant, a training-free, accuracy-preserving, and general-purpose post-training quantization (PTQ) solution to enable 8-bit weight, 8-bit a...

---

## 44. Revisiting LLM Reasoning via Information Bottleneck

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) have recently demonstrated remarkable progress in reasoning capabilities through reinforcement learning with verifiable rewards (RLVR). By leveraging simple rule-based rewards, RL effectively incentivizes LLMs to produce extended chain-of-thought (CoT) reasoning trajectories, progressively guiding them toward correct answers. However, existing approaches remain largely...

---

## 45. Expanding the Web, Smaller Is Better: A Comprehensive Study in Post-training

**Authors:** Zixuan Ke, Yifei Ming, Xuan-Phi Nguyen, Caiming Xiong, Shafiq Joty

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> General-purpose large language models (GLLMs) like GPT-4 and LLaMA have demonstrated exceptional performance across a wide range of tasks. However, their performance often falls short in domain- or task-specific applications, where deeper, specialized knowledge is essential, while maintaining general knowledge remains crucial for handling broader, unseen tasks. Post-training has been widely applie...

---

## 46. S$^{2}$FT: Efficient, Scalable and Generalizable LLM Fine-tuning by Structured Sparsity

**Authors:** Xinyu Yang, Jixuan Leng, Geyang Guo, Jiawei Zhao, Ryumei Nakada

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=lEUle8S4xQ) | > Current PEFT methods for LLMs can achieve high quality, efficient training, or scalable serving, but not all three simultaneously.  
To address this limitation, we investigate sparse fine-tuning and observe a remarkable improvement in generalization ability. 
Utilizing this key insight, we propose a family of Structured Sparse Fine-Tuning (S${^2}$FT) methods for LLMs, which concurrently achieve st...

---

## 47. Risk Profiling and Modulation for LLMs

**Authors:** Yikai Wang, Xiaocheng Li, Guanting Chen

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) are increasingly used for decision-making tasks under uncertainty; however, their risk profiles and how they are influenced by prompting and alignment methods remain underexplored. Existing studies have primarily examined personality prompting or multi-agent interactions, leaving open the question of how post-training influences the risk behavior of LLMs. In this work,...

---

## 48. Benchmarking Anomaly Detection for Large Language Model Alignment

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Many safety and alignment failures of large language models (LLMs) occur due to anomalous situations: unusual prompts or response patterns that are unforeseen by model developers. Anomaly detection is a promising tool to mitigate these failure modes caused by unknown unknowns; an anomaly detector monitoring a deployed LLM could shut it down or restrict user access in highly unusual situations. We ...

---

## 49. Trajectory Bellman Residual Minimization: A Simple Value-Based Method for LLM Reasoning

**Authors:** Yurun Yuan, Fan Chen, Zeyu Jia, Alexander Rakhlin, Tengyang Xie

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Policy-based methods currently dominate reinforcement learning (RL) pipelines for large language model (LLM) reasoning, leaving value-based approaches largely unexplored. We revisit the classical paradigm of Bellman Residual Minimization and introduce Trajectory Bellman Residual Minimization (TBRM), an algorithm that naturally adapts this idea to LLMs, yielding a simple yet effective off-policy al...

---

## 50. What Is The Political Content in LLMs' Pre- and Post-Training Data?

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) are known to generate politically biased text, yet how such biases arise remains unclear. A crucial step toward answering this question is the analysis of training data, whose political content remains largely underexplored in current LLM research. To address this gap, we present in this paper an analysis of the pre- and post-training corpora of \textsc{OLMO2}, the lar...

---

## 51. Enhancing LLM Reasoning with Iterative DPO: A Comprehensive Empirical Investigation

**Authors:** Songjun Tu, Jiahao Lin, Xiangyu Tian, Qichao Zhang, Linjing Li

**Year:** 2025 | **Venue:** COLM 2025 | **Citations:** N/A | **Score:** 0.000

> Recent advancements in post-training methodologies for large language models (LLMs) have highlighted reinforcement learning (RL) as a critical component for enhancing reasoning. However, the substantial computational costs associated with RL-based approaches have led to growing interest in alternative paradigms, such as Direct Preference Optimization (DPO). In this study, we investigate the effect...

---

## 52. CrossQuant: A Post-Training Quantization Method with Smaller Quantization Kernel for Precise Large Lanugage Model Compression

**Authors:** Wenyuan Liu, Xindian Ma, Peng Zhang, Yan Wang

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Post-Training Quantization (PTQ) is an effective technique for compressing Large Language Models (LLMs). While many studies focus on quantizing both weights and activations, it is still a challenge to maintain the accuracy of LLM after activating quantization. To investigate the primary cause, we extend the concept of kernel from linear algebra to quantization functions to define a new term, "quan...

---

## 53. Group-Normalized Implicit Value Optimization for Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Fine-tuning Large Language Models (LLMs) with reinforcement learning (RL) has become a key technique for enhancing performance on a wide range of tasks, from user alignment to complex reasoning. However, this approach is often hindered by the difficulty of fine-grained credit assignment, as it typically relies on sparse rewards given only at the end of a completely generated sequence. Conventional...

---

## 54. HyperDPO: Hypernetwork-based Multi-Objective Fine-Tuning Framework

**Authors:** Yinuo Ren, Tesi Xiao, Michael Shavlovsky, Lexing Ying, Holakou Rahmanian

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> In LLM alignment and many other ML applications, one often faces the *Multi-Objective Fine-Tuning (MOFT)* problem, *i.e.* fine-tuning an existing model with datasets labeled w.r.t. different objectives simultaneously. To address the challenge, we propose the *HyperDPO* framework, a conditioned one-shot fine-tuning approach that extends the Direct Preference Optimization (DPO) technique, originally...

---

## 55. Rule-Based Reference Updates after R1-Based Post Reinforcement Learning For Small Reasoning Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Inference scaling improves LLM reasoning, with reinforcement learning as a key driver. Although, post-training reinforcement learning and its curriculum learning variants offer significant benefits in enhancing the reasoning ability of large language models, we designate this process as Phase 1. Following this, we propose Phase 2: rule-based reference model updates in reinforcement learning after ...

---

## 56. Chasing the Tail: Effective Rubric-based Reward Modeling for Large Language Model Post-Training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement fine-tuning (RFT) often suffers from reward over-optimization, where a policy model hacks the reward signals to achieve high scores while producing low-quality outputs. Our theoretical analysis shows that the key lies in reward misspecification at the high-reward tail: the inability to reliably distinguish excellent responses from merely great ones. This motivate us to focus on the h...

---

## 57. Sample-efficient LLM Optimization with Reset Replay

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Recent advancements in post-training Large Language Models (LLMs), particularly through Reinforcement Learning (RL) and preference optimization methods, are key drivers for enhancing their reasoning capabilities. 
However, these methods are often plagued by low sample efficiency and a susceptibility to primacy bias, where overfitting to initial experiences degrades policy quality and damages the l...

---

## 58. Unlocking the Pre-Trained Model as a Dual-Alignment Calibrator for Post-Trained LLMs

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training boosts the performance of large language models (LLMs) but systematically degrades their confidence calibration, making them frequently overconfident. Recent post-hoc LLM calibration methods circumvent the challenge by aligning the post-trained language model with its pre-trained counterpart; however, they treat calibration as a static output distribution matching problem, and thus f...

---

## 59. Front-Loading Reasoning: The Synergy between Pretraining and Post-Training Data

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> The prevailing paradigm for enhancing the reasoning abilities of Large Language Models (LLMs) revolves around post-training on high-quality, reasoning-intensive data. While emerging literature suggests that reasoning data is increasingly incorporated also during the mid-training stage---a practice that is relatively more proprietary and less openly characterized---the role of such data in pretrain...

---

## 60. P2 Law: Scaling Law for Post-Training After Model Pruning

**Authors:** Xiaodong Chen, Yuxuan Hu, Xiaokang Zhang, Yanling Wang, Cuiping Li

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.283.pdf) | > Pruning has become a widely adopted technique for reducing the hardware requirements of large language models (LLMs). To recover model performance after pruning, post-training is commonly employed to mitigate the resulting performance degradation. While post-training benefits from larger datasets, once the dataset size is already substantial, increasing the training data provides only limited perf...

---

## 61. The Geometry of LLM Quantization: GPTQ as Babai's Nearest Plane Algorithm

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Quantizing the weights of large language models (LLMs) from 16-bit to lower bitwidth is the de facto approach to deploy massive transformers onto more affordable accelerators. While GPTQ emerged as one of the standard methods for one-shot post-training quantization at LLM scale, its inner workings are described as a sequence of algebraic updates that obscure geometric meaning or worst-case guarant...

---

## 62. PIKA: Expert-Level Synthetic Datasets for Post-Training Alignment from Scratch

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement Learning from Human Feedback (RLHF) has become a cornerstone for aligning large language models (LLMs). However, its effectiveness critically depends on high-quality instruction data. Most existing high-quality alignment datasets are either private or require costly human annotation, which hinders reproducibility and scalability. Even with the emergence of Reinforcement Learning from...

---

## 63. HARDTESTGEN: A High-Quality RL Verifier Generation Pipeline for LLM Algorithimic Coding

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Verifiers provide important reward signals for reinforcement learning of large language models (LLMs). However, it is challenging to develop or create reliable verifiers, especially for code generation tasks. A well-disguised wrong solution program may only be detected by carefully human-written edge cases that are difficult to synthesize automatically. To address this issue, we propose HardTestsG...

---

## 64. Can LLM Graph Reasoning Generalize beyond Pattern Memorization?

**Authors:** Yizhuo Zhang, Heng Wang, Shangbin Feng, Zhaoxuan Tan, Xiaochuang Han

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.findings-emnlp.127.pdf) | > Large language models (LLMs) demonstrate great potential for problems with implicit graphical structures, while recent works seek to enhance the graph reasoning capabilities of LLMs through specialized instruction tuning. The resulting “graph LLMs” are evaluated with in-distribution settings only, thus it remains underexplored whether LLMs are learning generalizable graph reasoning skills or merel...

---

## 65. DBellQuant: Breaking the Bell with Double-Bell Transformation for LLM Post Training Binarization

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) demonstrate remarkable performance but face substantial computational and memory challenges that limit their practical deployment. Quantization has emerged as a promising solution; however, its effectiveness is often limited by quantization errors arising from weight distributions that are not quantization-friendly and the presence of activation outliers. 
To address t...

---

## 66. Detecting Data Contamination from Reinforcement Learning Post-training for Large Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Data contamination poses a significant threat to the reliable evaluation of Large Language Models (LLMs). This issue arises when benchmark samples may inadvertently appear in training sets, compromising the validity of reported performance. While detection methods have been developed for the pre-training and Supervised Fine-Tuning stages, a critical research gap exists for the increasingly signifi...

---

## 67. Beyond Fixed Budgets: Dynamic Reasoning Efficiency Reward for Large Language Model

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> The "slow thinking" paradigm has been widely validated to enhance the reasoning capabilities of large language models, but it also introduces reasoning inefficiency: models may overthink simple problems while prematurely shifting their reasoning paths when tackling complex problems. To address this, we propose AdapThink, a simple yet efficient post-training framework designed to control preference...

---

## 68. QVD: Post-training Quantization for Video Diffusion Models

**Authors:** Shilong Tian, Hong Chen, Chengtao Lv, Yu Liu, Jinyang Guo

**Year:** 2024 | **Venue:** ACMMM 2024 | **Citations:** N/A | **Score:** 0.000

> ...

---

## 69. Do LLM Modules Generalize? A Study on Motion Generation for Autonomous Driving

**Authors:** Mingyi Wang, Jingke Wang, Tengju Ye, Kaicheng Yu

**Year:** 2025 | **Venue:** CORL 2025 | **Citations:** N/A | **Score:** 0.000

> Recent breakthroughs in large language models (LLMs) have not only advanced natural language processing but also inspired their application in domains with structurally similar problems—most notably, autonomous driving motion generation. Both domains involve autoregressive sequence modeling, token-based representations, and context-aware decision making, making the transfer of LLM components a nat...

---

## 70. Does Math Reasoning Improve General LLM Capabilities? Understanding Transferability of LLM Reasoning

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Math reasoning has become the poster child of progress in large language models (LLMs), with new models rapidly surpassing human-level performance on benchmarks like MATH and AIME. But as math leaderboards improve week by week, it is worth asking: do these gains reflect broader problem-solving ability or just narrow overfitting? To answer this question, we evaluate over 20 open-weight reasoning-tu...

---

## 71. PTQTP: Post-Training Quantization to Trit-Planes for Large Language Models

**Authors:** He Xiao, RUNMING YANG, Qingyao Yang, Wendong XU, Zhen Li

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training quantization (PTQ) of large language models (LLMs) to extremely low bit-widths remains challenging due to the fundamental trade-off between computational efficiency and model expressiveness. While existing ultra-low-bit PTQ methods rely on binary approximations or complex compensation mechanisms, they suffer from either limited representational capacity or computational overhead that...

---

## 72. LeSTD: LLM Compression via Learning-based Sparse Tensor Decomposition

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) achieve remarkable success, but their massive parameter counts present significant deployment challenges. Post-training tensor decomposition offers a promising, data-free compression strategy by exploiting structural redundancies within the model weights. However, existing tensor methods face a critical limitation: the dense core tensor bottleneck. While these methods ...

---

## 73. PTSBench: A Comprehensive Post-Training Sparsity Benchmark Towards Algorithms and Models

**Authors:** Zining Wang, Jinyang Guo, Ruihao Gong, Yang Yong, Aishan Liu

**Year:** 2024 | **Venue:** ACMMM 2024 | **Citations:** N/A | **Score:** 0.000

> ...

---

## 74. LiNeS: Post-training Layer Scaling Prevents Forgetting and Enhances Model Merging

**Authors:** Ke Wang, Nikolaos Dimitriadis, Alessandro Favero, Guillermo Ortiz-Jimenez, François Fleuret

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=J5sUOvlLbQ) | > Fine-tuning pre-trained models has become the standard approach to endow them with specialized knowledge, but it poses fundamental challenges. In particular, (i) fine-tuning often leads to catastrophic forgetting, where improvements on a target domain degrade generalization on other tasks, and (ii) merging fine-tuned checkpoints from disparate tasks can lead to significant performance loss. To add...

---

## 75. Genius: A Generalizable and Purely Unsupervised Self-Training Framework For Advanced Reasoning

**Authors:** Fangzhi Xu, Hang Yan, Chang Ma, Haiteng Zhao, Qiushi Sun

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.644.pdf) | > Advancing LLM reasoning skills has captivated wide interest. However, current post-training techniques rely heavily on supervisory signals, such as outcome supervision or auxiliary reward models, which face the problem of scalability and high annotation costs. This motivates us to enhance LLM reasoning without the need for external supervision. Given the input query, the LLM seeks the globally opt...

---

## 76. Condor: Enhance LLM Alignment with Knowledge-Driven Data Synthesis and Refinement

**Authors:** Maosongcao Maosongcao, Taolin Zhang, Mo Li, Chuyu Zhang, Yunxin Liu

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.1091.pdf) | > The quality of Supervised Fine-Tuning (SFT) data plays a critical role in enhancing the conversational capabilities of Large Language Models (LLMs). However, the availability of high-quality human-annotated SFT data has become a significant bottleneck for LLMs, necessitating a greater reliance on synthetic training data. In this work, we introduce Condor, a two-stage synthetic data generation fram...

---

## 77. High Accuracy, Less Talk (HALT): Reliable LLMs through Capability-Aligned Finetuning

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) currently respond to every prompt. However, they can produce incorrect answers when they lack knowledge or capability -- a problem known as hallucination. We instead propose post-training an LLM to generate content only when confident in its correctness and to otherwise (partially) abstain. Specifically, our method, HALT, produces capability-aligned post-training data ...

---

## 78. ICQuant: Index Coding enables Low-bit LLM Quantization

**Authors:** Xinlin Li, Osama Hanna, Christina Fragouli, Suhas Diggavi

**Year:** 2025 | **Venue:** COLM 2025 | **Citations:** N/A | **Score:** 0.000

> The rapid deployment of Large Language Models (LLMs) highlights the need for efficient low-bit post-training quantization (PTQ) due to their high memory costs. A key challenge in weight quantization is the presence of outliers, which inflate quantization ranges and lead to large errors. While a number of outlier suppression techniques have been proposed, they either: fail to effectively shrink the...

---

## 79. $\lambda$-GRPO: Unifying the GRPO Frameworks with Learnable Token Preferences

**Authors:** Yining Wang, Jinman Zhao, Chuangxin Zhao, Shuhao Guan, Gerald Penn

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement Learning with Human Feedback (RLHF) has been the dominant approach for improving the reasoning capabilities of Large Language Models (LLMs). 
Recently, Reinforcement Learning with Verifiable Rewards (RLVR) has simplified this paradigm by replacing the reward and value models with rule-based verifiers. 
A prominent example is Group Relative Policy Optimization (GRPO). However, GRPO in...

---

## 80. A Survey of Post-Training Scaling in Large Language Models

**Authors:** Hanyu Lai, Xiao Liu, Junjie Gao, Jiale Cheng, Zehan Qi

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.140.pdf) | > Large language models (LLMs) have achieved remarkable proficiency in understanding and generating human natural languages, mainly owing to the “scaling law” that optimizes relationships among language modeling loss, model parameters, and pre-trained tokens. However, with the exhaustion of high-quality internet corpora and increasing computational demands, the sustainability of pre-training scaling...

---

## 81. DenseMixer: Improving MoE Post-Training with Precise Router Gradient

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Mixture-of-Experts (MoE) models are notoriously harder to train compared with dense models. Existing approaches either rely on imprecise router gradient or freeze router parameters entirely, limiting training effectiveness. We introduce DenseMixer, a novel MoE post-training technique that trades one extra forward pass on inactive experts for a more precise router gradient estimation. Our method co...

---

## 82. BLoB: Bayesian Low-Rank Adaptation by Backpropagation for Large Language Models

**Authors:** Yibin Wang, Haizhou Shi, Ligong Han, Dimitris N. Metaxas, Hao Wang

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=MaDykgj4Ru) | > Large Language Models (LLMs) often suffer from overconfidence during inference, particularly when adapted to downstream domain-specific tasks with limited data. Previous work addresses this issue by employing approximate Bayesian estimation after the LLMs are trained, enabling them to quantify uncertainty. However, such post-training approaches' performance is severely limited by the parameters le...

---

## 83. Visual Jigsaw Post-Training Improves MLLMs

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning based post-training has recently emerged as a powerful paradigm for enhancing the alignment and reasoning capabilities of multimodal large language models (MLLMs). While *vision-centric* post-training is crucial for enhancing MLLMs’ intrinsic understanding of visual signals, current post-training paradigms are predominantly *text-centric*, where dense visual inputs are only ...

---

## 84. Verbalized Sampling: How to Mitigate Mode Collapse and Unlock LLM Diversity

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training alignment often reduces LLM diversity, leading to a phenomenon known as mode collapse. Unlike prior work that attributes this effect to algorithmic limitations, we identify a fundamental, pervasive data-level driver: typicality bias in preference data, whereby annotators systematically favor familiar text as a result of well-established findings in cognitive psychology. We formalize ...

---

## 85. Progressive Binarization with Semi-Structured Pruning for LLMs

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) have achieved remarkable progress in natural language processing, but their high computational and memory costs hinder deployment on resource-constrained devices. Binarization represents the most extreme form of quantization, yet binarized models still contain redundancy that can be further removed. Pruning provides a natural way to eliminate such redundancy, but naïve...

---

## 86. Watch your steps: Dormant Adversarial Behaviors that Activate upon LLM Finetuning

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Finetuning open-weight Large Language Models (LLMs) is standard practice for achieving task-specific performance improvements. Until now, finetuning has been regarded as a controlled and secure process in which training on benign datasets leads to predictable behaviors. In this paper, we demonstrate, for the first time, that an adversary can create compromised LLMs that are performant and benign, ...

---

## 87. Post-Training Piecewise Linear Quantization for Deep Neural Networks

**Authors:** Jun Fang, Ali Shafiee, Hamzah Abdel-Aziz, David Thorsley, Georgios Georgiadis

**Year:** 2020 | **Venue:** ECCV 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.ecva.net/papers/eccv_2020/papers_ECCV/papers/123470069.pdf) | > Quantization plays an important role in the energy-efficient deployment of Deep Neural Networks (DNNs) on resource-limited devices. Post-training quantization is highly desirable since it does not require retraining or access to the full training dataset. The well-established uniform scheme for post-training quantization achieves satisfactory results by converting DNNs from full-precision to 8-bit...

---

## 88. Towards Accurate Post-training Network Quantization via Bit-Split and Stitching

**Authors:** Peisong Wang, Qiang Chen, Xiangyu He, Jian Cheng

**Year:** 2020 | **Venue:** ICML 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v119/wang20c/wang20c.pdf) | > Network quantization is essential for deploying deep models to IoT devices due to its high efficiency. Most existing quantization approaches rely on the full training datasets and the time-consuming fine-tuning to retain accuracy. Post-training quantization does not have these problems, however, it has mainly been shown effective for 8-bit quantization due to the simple optimization strategy. In t...

---

## 89. RobustVLA: Robustness-Aware Reinforcement Post-Training for Vision-Language-Action Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Vision-Language-Action (VLA) models have recently emerged as powerful general-purpose policies for robotic manipulation, benefiting from large-scale multi-modal pre-training. However, they often fail to generalize reliably in out-of-distribution deployments, where unavoidable disturbances such as observation noise, sensor errors, or actuation perturbations become prevalent. While recent Reinforcem...

---

## 90. ParoQuant: Pairwise Rotation Quantization for Efficient Reasoning LLM Inference

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Weight-only post-training quantization (PTQ) compresses the weights of Large Language Models (LLMs) into low-precision representations to reduce memory footprint and accelerate inference. However, the presence of outliers in weights and activations often leads to large quantization errors and severe accuracy degradation, especially in recent reasoning LLMs where errors accumulate across long chain...

---

## 91. LogART: Pushing the Limit of Efficient Logarithmic Post-Training Quantization

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Efficient deployment of deep neural networks increasingly relies on Post-Training Quantization (PTQ). Logarithmic PTQ, in particular, promises multiplier-free hardware efficiency, but its performance is often limited by the nonlinear and symmetric quantization grid and standard rounding-to-nearest (RTN) approach. While learnable rounding has significantly advanced linear PTQ, its application to th...

---

## 92. Discovering Hierarchical Latent Capabilities of Language Models via Causal Representation Learning

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Deriving actionable insights from language model evaluations to guide post-training is a central challenge, hampered by complex confounding effects and the prohibitive cost of controlled studies. In this paper, we propose a causal representation learning framework to uncover a hierarchy of LLM capabilities purely from publicly available observational data. Drawing insights from recent factor analy...

---

## 93. Stability-Aware Post-Training Cascade of Experts for Compute-Efficient Inference

**Authors:** Xiaomin Deng, Xiaonan Liu

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> State-of-the-art models achieve high accuracy at the cost of substantial inference compute, hindering deployment on edge devices and under strict latency budgets.
To address this, we present a stability-aware post-training cascade-of-experts that operates over a heterogeneous pool of pre-trained models, balancing accuracy, inference cost, and decision stability.
Specifically, we address three ques...

---

## 94. RoSTE: An Efficient Quantization-Aware Supervised Fine-Tuning Approach for Large Language Models

**Authors:** Quan Wei, Chung-Yiu Yau, Hoi To Wai, Yang Zhao, Dongyeop Kang

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=h30EzoI3s0) | > Supervised fine-tuning is a standard method for adapting pre-trained large language models (LLMs) to downstream tasks. Quantization has been recently studied as a post-training technique for efficient LLM deployment. To obtain quantized fine-tuned LLMs, conventional pipelines would first fine-tune the pre-trained models, followed by post-training quantization. This often yields suboptimal performa...

---

## 95. Towards Efficient Post-training Quantization of Pre-trained Language Models

**Authors:** Haoli Bai, Lu Hou, Lifeng Shang, Xin Jiang, Irwin King

**Year:** 2022 | **Venue:** NIPS 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=tvDRmAxGIjw) | > Network quantization has gained increasing attention with the rapid growth of large pre-trained language models~(PLMs). However, most existing quantization methods for PLMs follow quantization-aware training~(QAT) that requires end-to-end training with full access to the entire dataset. Therefore, they suffer from slow training, large memory overhead, and data accessibility issues. In this paper, ...

---

## 96. Towards a Unified View of Large Language Model Post-Training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Many approaches with seemingly disparate losses exist for post-training modern language models, such as Reinforcement Learning (RL) and Supervised Fine-Tuning (SFT).
In this paper, we show that these approaches are not in contradiction, but are instances of a single optimization process.
We derive the Unified Policy Gradient Estimator (UPGE), a framework with four interchangeable parts that unifie...

---

## 97. DIP: Unsupervised Dense In-Context Post-training of Visual Representations

**Authors:** Sophia Sirko-Galouchenko, Spyros Gidaris, Antonin Vobecky, Andrei Bursuc, Nicolas Thome

**Year:** 2025 | **Venue:** ICCV 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/ICCV2025/papers/Sirko-Galouchenko_DIP_Unsupervised_Dense_In-Context_Post-training_of_Visual_Representations_ICCV_2025_paper.pdf) | > We introduce DIP, a novel unsupervised post-training method designed to enhance dense representations in large-scale pretrained vision encoders for in-context scene understanding. Unlike prior approaches using complex self-distillation architectures, our method trains the vision encoder using pseudo-tasks that simulate downstream in-context scenarios, inspired by meta-learning principles. To enabl...

---

## 98. Outcome-based Exploration for LLM Reasoning

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning (RL) has emerged as a powerful method for improving the reasoning abilities of large language models (LLMs). Outcome-based RL, which rewards policies solely for the correctness of the final answer, yields substantial accuracy gains but also induces a systematic loss in generation diversity. This collapse undermines real-world performance, where diversity is critical for test...

---

## 99. The Impact of Post-training on Data Contamination

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> We present a controlled study of how dataset contamination interacts with the post-training stages now standard in large language model training pipelines. Starting from clean checkpoints of Qwen2.5 (0.5B/1.5B) and Gemma3 (1B/4B), we inject five copies of GSM8K and MBPP test items into the first 2B tokens of an otherwise 25B token extended pre-training dataset. We then compare the contaminated and...

---

## 100. Interactive Post-Training for Vision-Language-Action Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> We introduce RIPT-VLA, a simple and scalable reinforcement-learning-based interactive post-training paradigm that fine-tunes pretrained Vision-Language-Action (VLA) models using only sparse binary success rewards. Existing VLA training pipelines rely heavily on offline expert demonstration data and supervised imitation, limiting their ability to adapt to new tasks and environments under low-data r...

---

## 101. UpSafe℃: Upcycling for Controllable Safety in Large Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) have achieved remarkable progress across a wide range of tasks, but remain vulnerable to safety risks such as harmful content generation and jailbreak attacks. Existing safety techniques---including external guardrails, inference-time guidance, and post-training alignment---each face limitations in balancing safety, utility, and controllability. In this work, we propos...

---

## 102. Post-Training Quantization via Residual Truncation and Zero Suppression for Diffusion Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Diffusion models achieve high-quality image generation but face deployment challenges due to their high computational requirements. 
Although 8-bit outlier-aware Post-Training Quantization (PTQ) matches full-precision performance, extending PTQ to 4 bits remains challenging. 
Larger step sizes in 4-bit quantization amplify rounding errors in dense, low-magnitude activations, leading to the loss of...

---

## 103. Surprising Effectiveness of pretraining Ternary Language Model at Scale

**Authors:** Ayush Kaushal, Tejas Vaidhya, Arnab Kumar Mondal, Tejas Pandey, Aaryan Bhagat

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=TJo6aQb7mK) | > Rapid advancements in GPU computational power has outpaced memory capacity and bandwidth growth, creating bottlenecks in Large Language Model (LLM) inference. Post-training quantization is the leading method for addressing memory-related bottlenecks in LLM inference, but it suffers from significant performance degradation below 4-bit precision. This paper addresses these challenges by investigatin...

---

## 104. Star-DS: Step-level Uncertainty-Aware Reasoning Data Selection in Reinforcement Learning for LLM Multi-step Reasoning

**Authors:** Shunyu Wu, Dan Li, Wenjie Feng, Haozheng Ye, Jian Lou

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models have demonstrated remarkable potential on complex multi-step reasoning tasks, largely enabled by substantial post-training via reinforcement learning with process reward verification on reasoning datasets. Recent studies have shown that it is possible to alleviate the massive data reliance and computational costs by selecting high-value subsets of data while maintaining reaso...

---

## 105. A Generative Approach to LLM Harmfulness Mitigation with Red Flag Tokens

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Many safety post-training methods for large language models (LLMs) are designed to modify the model’s behaviour from producing unsafe answers to issuing refusals. 
However, such distribution shifts are often brittle and degrade performance on desirable tasks.
To address these pitfalls, we propose augmenting the model’s vocabulary with a special red flag token ($\langle\texttt{rf}\rangle$) and trai...

---

## 106. Gradient Ascent Post-training Enhances Language Model Generalization

**Authors:** Dongkeun Yoon, Joel Jang, Sungdong Kim, Minjoon Seo

**Year:** 2023 | **Venue:** ACL 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2023.acl-short.74.pdf) | > In this work, we empirically show that updating pretrained LMs (350M, 1.3B, 2.7B) with just a few steps of Gradient Ascent Post-training (GAP) on random, unlabeled text corpora enhances its zero-shot generalization capabilities across diverse NLP tasks. Specifically, we show that GAP can allow LMs to become comparable to 2-3x times larger LMs across 12 different NLP tasks. We also show that applyi...

---

## 107. Discovering Novel LLM Experts via Task-Capability Coevolution

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Frontier model developers aim to train models continually to possess emergent, diverse capabilities. 
To extend capabilities, the current pre-training and post-training paradigm requires manually starting training runs with static datasets or reward functions every time.
Addressing this limitation, our work pursues the insight that open-endedness (via the coevolution of models and tasks) can disco...

---

## 108. UniPTS: A Unified Framework for Proficient Post-Training Sparsity

**Authors:** JingJing Xie, Yuxin Zhang, Mingbao Lin, ZhiHang Lin, Liujuan Cao

**Year:** 2024 | **Venue:** CVPR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2024/papers/Xie_UniPTS_A_Unified_Framework_for_Proficient_Post-Training_Sparsity_CVPR_2024_paper.pdf) | > ...

---

## 109. Asymmetric Proximal Policy Optimization: mini-critics boost LLM reasoning

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning (RL) has become a central paradigm for post-training large language models (LLMs) to elicit stronger reasoning. Yet, most recent RL for LLMs (RL4LLM) methods avoid explicit critics, replacing them with average advantage baselines. This shift is largely pragmatic: conventional value functions are computationally expensive to train at LLM scale and often fail under sparse rewa...

---

## 110. OSAQ: Outlier Self-Absorption for Accurate Low-bit LLM Quantization

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) have demonstrated remarkable capabilities in understanding and generation tasks. However, their massive parameter scale leads to significant resource consumption and latency during inference. Post-training weight-only quantization offers a promising solution by reducing model size and accelerating token generation through alleviating the memory-bound issue. Nevertheles...

---

## 111. T2I-ConBench: Text-to-Image Benchmark for Continual Post-training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Continual post‑training adapts a single text‑to‑image diffusion model to learn new tasks without incurring the cost of separate models, but naïve post-training causes forgetting of pretrained knowledge and undermines zero‑shot compositionality. We observe that the absence of a standardized evaluation protocol hampers related research for continual post‑training. To address this, we introduce **T2I...

---

## 112. MLLM-Pruner: Efficient Activation-aware Pruning for Multimodal LLMs

**Authors:** Yunan Ding, Yan Tai, Siqi Luo, Xiaohong Liu, Guodong Guo

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Multimodal large language models (MLLMs) have demonstrated impressive performance across a wide range of vision-language tasks. However, the increasing scale of these models leads to significant challenges in deployment costs. Post-training pruning emerges as an effective compression technique to address these challenges. 
Recent pruning studies on large language models (LLMs) has shown that activ...

---

## 113. ERC-SVD: Error-Controlled SVD for Large Language Model Compression

**Authors:** Haolei Bai, Siyong Jian, Tuo Liang, Yu Yin, Huan Wang

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) have demonstrated impressive capabilities in a wide range of downstream natural language processing tasks. 
Nevertheless, their considerable sizes and memory demands hinder practical deployment, underscoring the importance of developing efficient compression strategies. 
Singular value decomposition (SVD) decomposes a matrix into orthogonal components, enabling efficie...

---

## 114. Pre-training Distillation for Large Language Models: A Design Space Exploration

**Authors:** Hao Peng, Xin Lv, Yushi Bai, Zijun Yao, Jiajie Zhang

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.181.pdf) | > Knowledge distillation (KD) aims to transfer knowledge from a large teacher model to a smaller student model. Previous work applying KD in the field of large language models (LLMs) typically focused on the post-training phase, where the student LLM learns directly from instructions and corresponding responses generated by the teacher model. In this paper, we extend KD to the pre-training phase of ...

---

## 115. Downgrade to Upgrade: Optimizer Simplification Enhances Robustness in LLM Unlearning

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language model (LLM) unlearning aims to surgically remove the influence of undesired data or knowledge from an existing model while preserving its utility on unrelated tasks. This paradigm has shown promise in addressing privacy and safety concerns. However, recent findings reveal that unlearning effects are often *fragile*: post-unlearning manipulations such as weight quantization or fine-t...

---

## 116. AWM: Accurate Weight-Matrix Fingerprint for Large Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Protecting the intellectual property of large language models (LLMs) is crucial, given the substantial resources required for their training. Consequently, there is an urgent need for both model owners and third parties to determine whether a suspect LLM is trained from scratch or derived from an existing base model. However, the intensive post-training processes that models typically undergo—such...

---

## 117. Agnostics: Learning to Synthesize Code in Any Programming Language with a Universal Reinforcement Learning Environment

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) already excel at writing code in high-resource languages such as Python and JavaScript, yet stumble on low-resource languages that remain essential to science and engineering. Besides the obvious shortage of pre-training data, post-training itself is a bottleneck: every new language seems to require new datasets, test harnesses, and reinforcement learning (RL) infrastr...

---

## 118. Reinforcement Learning with Inverse Rewards for World Model Post-training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> World models simulate dynamic environments, enabling agents to interact with diverse input modalities. Although recent advances have improved the visual quality and temporal consistency of video world models, their ability of accurately modeling human-specified actions remains underexplored. Reinforcement learning presents a promising approach for directly improving the suboptimal action-following...

---

## 119. SPA: Enhancing 3D Multimodal LLMs with Mask-based Streamlining Preference Alignment

**Authors:** Weiyang Jin, Baihan Yang, Huan-ang Gao, Jingwei Zhao, Kangliang Chen

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Integrating 3D features into Large Language Models (LLMs) is a rapidly evolving field, with models like 3D-LLM, Point-Bind LLM, and PointLLM making notable strides. PointLLM, pre-trained and fine-tuned on the Objaverse dataset, enhances understanding by optimizing the projector, boosting resource efficiency and consistency. However, we observed a persistent bottleneck: increasing the LLM backbone ...

---

## 120. Speculative Thinking: Enhancing Small-Model Reasoning with Large Model Guidance at Inference Time

**Authors:** Van Yang, Xiang Yue, Vipin Chaudhary, Xiaotian Han

**Year:** 2025 | **Venue:** COLM 2025 | **Citations:** N/A | **Score:** 0.000

> Recent advances leverage post-training to enhance model reasoning performance, which typically requires costly training pipelines and still suffers from inefficient, overly lengthy outputs. We introduce **Speculative Thinking**, a training-free framework that enables large reasoning models to guide smaller ones during inference at the reasoning level, distinct from speculative decoding, which oper...

---

## 121. RoLoRA: Fine-tuning Rotated Outlier-free LLMs for Effective Weight-Activation Quantization

**Authors:** Xijie Huang, Zechun Liu, Shih-Yang Liu, Kwang-Ting Cheng

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.findings-emnlp.444.pdf) | > Low-Rank Adaptation (LoRA), as a representative Parameter-Efficient Fine-Tuning (PEFT) method, significantly enhances the training efficiency by updating only a small portion of the weights in Large Language Models (LLMs). Recently, weight-only quantization techniques have also been applied to LoRA methods to reduce the memory footprint of fine-tuning. However, applying weight-activation quantizat...

---

## 122. Plug-and-Play: An Efficient Post-training Pruning Method for Large Language Models

**Authors:** Yingtao Zhang, Haoli Bai, Haokun Lin, Jialin Zhao, Lu Hou

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=Tr0lPx9woF) | > With the rapid growth of large language models (LLMs), there is increasing demand for memory and computation in LLMs. Recent efforts on post-training pruning of LLMs aim to reduce the model size and computation requirements, yet the performance is still sub-optimal. 
In this paper, we present a plug-and-play solution for post-training pruning of LLMs.
The proposed solution has two innovative compo...

---

## 123. Optimal Brain Compression: A Framework for Accurate Post-Training Quantization and Pruning

**Authors:** Elias Frantar, Dan Alistarh

**Year:** 2022 | **Venue:** NIPS 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=ksVGCOlOEba) | > We consider the problem of model compression for deep neural networks (DNNs) in the challenging one-shot/post-training setting, in which we are given an accurate trained model, and must compress it without any retraining, based only on a small amount of calibration input data. This problem has become popular in view of the emerging software and hardware support for executing models compressed via ...

---

## 124. CAT: Post-Training Quantization Error Reduction via Cluster-based Affine Transformation

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-Training Quantization (PTQ) reduces the memory footprint and computational overhead of deep neural networks by converting full-precision (FP) values into quantized and compressed data types.
While PTQ is more cost-efficient than Quantization-Aware Training (QAT), it is highly susceptible to accuracy degradation under a low-bit quantization (LQ) regime (e.g., 2-bit and 4-bit).
Affine transform...

---

## 125. Generative Adversarial Post-Training Mitigates Reward Hacking in Live Human-AI Music Interaction

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Most applications of generative AI involve a sequential interaction in which a person inputs a prompt and waits for a response, and where reaction time and adaptivity are not important factors. In contrast, live jamming is a collaborative interaction that requires real-time coordination and adaptation without access to the other player’s future moves, while preserving diversity to sustain a creati...

---

## 126. CoIn: Counting the Invisible Reasoning Tokens in Commercial Opaque LLM APIs

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> As post-training techniques evolve, large language models (LLMs) are increasingly augmented with structured multi-step reasoning abilities, often optimized through reinforcement learning. These reasoning-enhanced models outperform standard LLMs on complex tasks and  now underpin many commercial LLM APIs. However, to protect proprietary behavior and reduce verbosity, providers typically conceal the...

---

## 127. Spectrum Tuning: Post-Training for Distributional Coverage and In-Context Steerability

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Language model post-training has enhanced instruction-following and performance on many downstream tasks, but also comes with an often-overlooked cost on tasks with many possible valid answers. We characterize three desiderata: in-context steerability, valid output space coverage, and distributional alignment, and document across three model families how post-training can reduce these properties. ...

---

## 128. AMP-ViT: Optimizing Vision Transformer Efficiency with Adaptive Mixed-Precision Post-Training Quantization

**Authors:** Yu-Shan Tai, An-Yeu Wu

**Year:** 2025 | **Venue:** WACV 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/WACV2025/papers/Tai_AMP-ViT_Optimizing_Vision_Transformer_Efficiency_with_Adaptive_Mixed-Precision_Post-Training_Quantization_WACV_2025_paper.pdf) | > Vision transformers (ViTs) have revolutionized computer vision but face significant challenges due to their high computational and memory demands. Existing post-training quantization methods struggle to maintain performance at low bit-widths due to activation asymmetry and reliance on manual configurations. To overcome these challenges we introduce SymAlign to address activation asymmetry and redu...

---

## 129. Quadratic Coreset Selection: Certifying and Reconciling Sequence and Token Mining for Efficient Instruction Tuning

**Authors:** Ziliang Chen, Yongsen Zheng, Zhao-Rong Lai, Zhanfu Yang, Cuixi Li

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Instruction-Tuning (IT) was recently found the impressive data efficiency in post-training large language models (LLMs). While the pursuit of efficiency predominantly focuses on sequence-level curation, often overlooking the nuanced impact of critical tokens and the inherent risks of token noise and biases. Drawing inspiration from bi-level coreset selection, our work provides the principled view ...

---

## 130. Twin Evolution with Meta Preference Optimization for Semi-Supervised Learning of Large Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) have demonstrated remarkable capabilities across various domains, yet their adaptation to specific downstream tasks remains challenging due to limited labeled data. Although post-training methods (e.g., SFT, DPO) have proven effective, they face significant limitations due to the scarcity of labeled data. In this paper, we present TwinEvol, a framework that treats down...

---

## 131. Post-training for Efficient Communication via Convention Formation

**Authors:** Yilun Hua, Evan Wang, Yoav Artzi

**Year:** 2025 | **Venue:** COLM 2025 | **Citations:** N/A | **Score:** 0.000

> Humans communicate with increasing efficiency in multi-turn interactions, by adapting their language and forming ad-hoc conventions. In contrast, prior work shows that LLMs do not naturally show this behavior. We develop a post-training process to develop this ability through targeted fine-tuning on heuristically identified demonstrations of convention formation. We evaluate with two new benchmark...

---

## 132. Satori: Reinforcement Learning with Chain-of-Action-Thought Enhances LLM Reasoning via Autoregressive Search

**Authors:** Maohao Shen, Guangtao Zeng, Zhenting Qi, Zhang-Wei Hong, Zhenfang Chen

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=j4FXxMiDjL) | > Large language models (LLMs) have demonstrated remarkable reasoning capabilities across diverse domains. Recent studies have shown that increasing test-time computation enhances LLMs' reasoning capabilities. This typically involves extensive sampling at inference time guided by an external LLM verifier, resulting in a two-player system. Despite external guidance, the effectiveness of this system d...

---

## 133. Fine-grained Post-training for Improving Retrieval-based Dialogue Systems

**Authors:** Janghoon Han, Taesuk Hong, Byoungjae Kim, Youngjoong Ko, Jungyun Seo

**Year:** 2021 | **Venue:** NAACL 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2021.naacl-main.122.pdf) | > Retrieval-based dialogue systems display an outstanding performance when pre-trained language models are used, which includes bidirectional encoder representations from transformers (BERT). During the multi-turn response selection, BERT focuses on training the relationship between the context with multiple utterances and the response. However, this method of training is insufficient when consideri...

---

## 134. JARVIS-VLA: Post-Training Large-Scale Vision Language Models to Play Visual Games with Keyboards and Mouse

**Authors:** Muyao Li, Zihao Wang, Kaichen He, Xiaojian Ma, Yitao Liang

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.findings-acl.920.pdf) | > Recently, action-based decision-making in open-world environments has gained significant attention. Visual Language Action (VLA) models, pretrained on large-scale web datasets, have shown promise in decision-making tasks. However, previous work has primarily focused on action post-training, often neglecting enhancements to the foundation model itself. In response, we introduce Act from Visual Lang...

---

## 135. Understanding Post-Training Structural Changes in Large Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training fundamentally alters the behavior of large language models (LLMs), yet its impact on the internal parameter space remains poorly understood. In this work, we conduct a systematic singular value decomposition (SVD) analysis of principal linear layers in pretrained LLMs, focusing on two widely adopted post-training methods: *instruction tuning* and *long-chain-of-thought (Long-CoT) dis...

---

## 136. Up or Down? Adaptive Rounding for Post-Training Quantization

**Authors:** Markus Nagel, Rana Ali Amjad, Mart Van Baalen, Christos Louizos, Tijmen Blankevoort

**Year:** 2020 | **Venue:** ICML 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v119/nagel20a/nagel20a.pdf) | > When quantizing neural networks, assigning each floating-point weight to its nearest fixed-point value is the predominant approach. We find that, perhaps surprisingly, this is not the best we can do. In this paper, we propose AdaRound, a better weight-rounding mechanism for post-training quantization that adapts to the data and the task loss. AdaRound is fast, does not require fine-tuning of the n...

---

## 137. MAPoRL: Multi-Agent Post-Co-Training for Collaborative Large Language Models with Reinforcement Learning

**Authors:** Chanwoo Park, Seungju Han, Xingzhi Guo, Asuman E. Ozdaglar, Kaiqing Zhang

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.1459.pdf) | > Leveraging multi-agentic frameworks to enhance large language models (LLMs) has demonstrated significant potential recently, with most existing studies focusing on prompting and developing workflows with frozen LLMs. In this paper, we aim to further unleash the power of such multi-agentic frameworks for post-training LLMs for better collaboration. Specifically, we develop a new paradigm of Multi-A...

---

## 138. Tulu 3: Pushing Frontiers in Open Language Model Post-Training

**Authors:** Nathan Lambert, Jacob Morrison, Valentina Pyatkin, Shengyi Huang, Hamish Ivison

**Year:** 2025 | **Venue:** COLM 2025 | **Citations:** N/A | **Score:** 0.000

> Language model post-training is applied to refine behaviors and unlock
new skills across a wide range of language models, but open recipes for
applying these techniques lag behind proprietary ones. The underlying
training data and recipes for post-training are simultaneously the most im-
portant pieces of the puzzle and the portion with the least transparency. To
bridge this gap, we introduce TÜLU...

---

## 139. Automated Optimization Modeling via a Localizable Error-Driven Perspective

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Automated optimization modeling via Large Language Models (LLMs) has emerged as a promising approach to assist complex human decision-making. While post-training has become a pivotal technique to enhance LLMs' capabilities in this domain, its effectiveness is severely constrained by the scarcity and underutilization of high-quality training data. However, through a detailed profiling of error patt...

---

## 140. Transferable Post-training via Inverse Value Learning

**Authors:** Xinyu Lu, Xueru Wen, Yaojie Lu, Bowen Yu, Hongyu Lin

**Year:** 2025 | **Venue:** NAACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.naacl-long.227.pdf) | > As post-training processes utilize increasingly large datasets and base models continue to grow in size, the computational demands and implementation challenges of existing algorithms are escalating significantly. In this paper, we propose modeling the changes at the logits level during post-training using a separate neural network (i.e., the value network). After training this network on a small ...

---

## 141. Beyond Uniformity: Sample and Frequency Meta Weighting for Post-Training Quantization of Diffusion Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training quantization (PTQ) is an attractive approach for compressing diffusion models to speed up the sampling process and reduce the memory footprint. Most existing PTQ methods uniformly sample data from various time steps in the denoising process to construct a calibration set for quantization and consider calibration samples equally important during quantization process. However, treating...

---

## 142. QuIP$\#$: Even Better LLM Quantization with Hadamard Incoherence and Lattice Codebooks

**Authors:** Albert Tseng, Jerry Chee, Qingyao Sun, Volodymyr Kuleshov, Christopher De Sa

**Year:** 2024 | **Venue:** ICML 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=9BrydUVcoe) | > Post-training quantization (PTQ) reduces the memory footprint of LLMs by quantizing their weights to low-precision. In this work, we introduce QuIP#, a weight-only PTQ method that achieves state-of-the-art results in extreme compression regimes ($\le$ 4 bits per weight) using three novel techniques. First, QuIP# improves QuIP's (Chee et al., 2023) incoherence processing by using the randomized Had...

---

## 143. Data Selection for LLM Reinforcement Learning with Improved Gradient Alignment

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement Learning with Verifiable Rewards (RLVR) has become a key technique for enhancing LLMs' reasoning abilities, yet its data inefficiency remains a major bottleneck. To address this critical yet challenging issue, we present a novel gradient-alignment-based method, named \textit{LearnAlign}, which intelligently selects the learnable and representative training reasoning data for RLVR pos...

---

## 144. Lossy and Lossless (L2) Post-training Model Size Compression

**Authors:** Yumeng Shi, Shihao Bai, Xiuying Wei, Ruihao Gong, Jianlei Yang

**Year:** 2023 | **Venue:** ICCV 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/ICCV2023/papers/Shi_Lossy_and_Lossless_L2_Post-training_Model_Size_Compression_ICCV_2023_paper.pdf) | > Deep neural networks have delivered remarkable performance and have been widely used in various visual tasks. However, their huge sizes cause significant inconvenience for transmission and storage. Many previous studies have explored model size compression. However, these studies often approach various lossy and lossless compression methods in isolation, leading to challenges in achieving high com...

---

## 145. PISCES: Annotation-free Text-to-Video Post-Training via Bi-objective OT-aligned Rewards

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Text-to-video (T2V) generation aims to synthesize videos with high visual quality and temporal consistency that are semantically aligned with input text. Reward-based post-training has emerged as a promising direction to improve the quality and semantic alignment of generated videos. However, recent methods either rely on large-scale human preference annotations or operate on misaligned embeddings...

---

## 146. NoisyQuant: Noisy Bias-Enhanced Post-Training Activation Quantization for Vision Transformers

**Authors:** Yijiang Liu, Huanrui Yang, Zhen Dong, Kurt Keutzer, Li Du

**Year:** 2023 | **Venue:** CVPR 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2023/papers/Liu_NoisyQuant_Noisy_Bias-Enhanced_Post-Training_Activation_Quantization_for_Vision_Transformers_CVPR_2023_paper.pdf) | > The complicated architecture and high training cost of vision transformers urge the exploration of post-training quantization. However, the heavy-tailed distribution of vision transformer activations hinders the effectiveness of previous post-training quantization methods, even with advanced quantizer designs. Instead of tuning the quantizer to better fit the complicated activation distribution, t...

---

## 147. SERQ: Saliency-Aware Low-Rank Error Reconstruction for LLM Quantization

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training quantization (PTQ) has emerged as a prevailing technique for deploying large language models (LLMs) efficiently in terms of both memory and computation, across edge devices and server platforms. Existing PTQ methods primarily aim to reduce precision in weights and activations by mitigating quantization errors caused by channel-wise outlier activations (e.g., pre-quantization scaling,...

---

## 148. FAITH: Factuality Alignment through Integrating Trustworthiness and Honestness

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) can generate factually inaccurate content even if they have corresponding knowledge, which critically undermines their reliability. Existing approaches attempt to mitigate this by incorporating uncertainty in QA prompt during training, but these numerical scores lack the semantic richness for LLM to properly understand its internal states of trustworthiness and honestn...

---

## 149. Think Just Enough: Sequence-Level Entropy as a Confidence Signal for LLM Reasoning

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> We introduce a simple, yet novel entropy-based framework to drive token efficiency in large language models during reasoning tasks. Our approach uses Shannon entropy from token-level logprobs as a confidence signal to enable early stopping, achieving 25-50% computational savings while maintaining task accuracy. Crucially, we demonstrate that entropy-based confidence calibration represents an emerg...

---

## 150. ZeroQuant: Efficient and Affordable Post-Training Quantization for Large-Scale Transformers

**Authors:** Zhewei Yao, Reza Yazdani Aminabadi, Minjia Zhang, Xiaoxia Wu, Conglong Li

**Year:** 2022 | **Venue:** NIPS 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=f-fVCElZ-G1) | > How to efficiently serve ever-larger trained natural language models in practice has become exceptionally challenging even for powerful cloud servers due to their prohibitive memory/computation requirements.
In this work, we present an efficient and affordable post-training quantization approach to compress large Transformer-based models, termed as \OURS. 
\OURS is an end-to-end quantization and i...

---

## 151. Layer-Wise High-Impact Parameter Ratio Optimization in Post-Training Quantization for Large Language Models

**Authors:** Cuong Pham, Dung Anh Hoang, Cuong C. Nguyen, Trung Le, Gustavo Carneiro

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) have significantly advanced natural language processing, but their massive parameter count creates substantial computational and memory challenges during deployment. Post-training quantization (PTQ) has emerged as a promising approach to mitigate these challenges with minimal overhead. While existing PTQ methods can effectively quantize LLMs, they experience substantia...

---

## 152. Post-Training Weighted Quantization of Neural Networks for Language Models

**Authors:** Se Jung Kwon, Dongsoo Lee, Yongkweon Jeon, Byeongwook Kim, Bae Seong Park

**Year:** 2021 | **Venue:** ICLR 2021 | **Citations:** N/A | **Score:** 0.000

> As a practical model compression technique, parameter quantization is effective especially for language models associated with a large memory footprint. Neural network quantization is usually performed to reduce quantization loss assuming that quantization error of each parameter equally contributes to the overall training loss. The importance of each parameter, however, may highly differ such tha...

---

## 153. Can Compressed LLMs Truly Act? An Empirical Evaluation of Agentic Capabilities in LLM Compression

**Authors:** Peijie Dong, Zhenheng Tang, Xiang Liu, Lujun Li, Xiaowen Chu

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=rkwXYSDKso) | > Post-training compression reduces the computational and memory costs of large language models (LLMs), enabling resource-efficient deployment. However, existing compression benchmarks focus narrowly on language modeling (e.g., perplexity) and natural language understanding tasks (e.g., GLUE accuracy), ignoring the agentic capabilities—workflow, tool use/function call, long-context understanding and...

---

## 154. Can Post-Training Quantization Benefit from an Additional QLoRA Integration?

**Authors:** Xiliang Zhu, Elena Khasanova, Cheng Chen

**Year:** 2025 | **Venue:** NAACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.naacl-industry.41.pdf) | > Large language models (LLMs) have transformed natural language processing but pose significant challenges for real-world deployment. These models necessitate considerable computing resources, which can be costly and frequently unavailable. Model compression techniques such as quantization are often leveraged to alleviate resource demand, but they may have a negative impact on the generation qualit...

---

## 155. Q-Palette: Fractional-Bit Quantizers Toward Optimal Bit Allocation for Efficient LLM Deployment

**Authors:** Deokjae Lee, Hyun Oh Song

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> We study weight-only post-training quantization (PTQ), which quantizes the weights of a large language model (LLM) without retraining, using little or no calibration data. Weight-only PTQ is crucial for reducing the memory footprint and latency of LLM inference, especially in memory-bound, small-batch inference scenarios, such as personalized inference on edge devices. Despite its importance, irre...

---

## 156. Beyond Pass@ 1: Self-Play with Variational Problem Synthesis Sustains RLVR

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement Learning with Verifiable Rewards (RLVR) has recently emerged as a key paradigm for post-training Large Language Models (LLMs), particularly for complex reasoning tasks. However, vanilla RLVR training has been shown to improve Pass@1 performance at the expense of policy entropy, leading to reduced generation diversity and limiting the Pass@k performance, which typically represents the...

---

## 157. Merge-Friendly Post-Training Quantization for Multi-Target Domain Adaptation

**Authors:** Juncheol Shin, Minsang Seok, Seonggon Kim, Eunhyeok Park

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=aCBd1FeE5Z) | > Model merging has emerged as a powerful technique for combining task-specific weights, achieving superior performance in multi-target domain adaptation. However, when applied to practical scenarios, such as quantized models, new challenges arise. In practical scenarios, quantization is often applied to target-specific data, but this process restricts the domain of interest and introduces discretiz...

---

## 158. StateX: Enhancing RNN Recall via Post-training State Expansion

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> While Transformer-based models have demonstrated remarkable language modeling performance, their high complexities result in high costs when processing long contexts. In contrast, recurrent neural networks (RNNs) such as linear attention and state space models have gained popularity due to their constant per-token complexities. However, these recurrent models struggle with tasks that require accur...

---

## 159. AIQViT: Architecture-Informed Post-Training Quantization for Vision Transformers

**Authors:** Runqing Jiang, Ye Zhang, Longguang Wang, Pengpeng Yu, Yulan Guo

**Year:** 2025 | **Venue:** AAAI 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://ojs.aaai.org/index.php/AAAI/article/view/33939/36094) | > Post-training quantization (PTQ) has emerged as a promising solution for reducing the storage and computational cost of vision transformers (ViTs). Recent advances primarily target at crafting quantizers to deal with peculiar activations characterized by ViTs. However, most existing methods underestimate the information loss incurred by weight quantization, resulting in significant performance det...

---

## 160. World-Env: Leveraging World Model as a Virtual Environment for VLA Post-Training

**Authors:** Junjin Xiao, Yandan Yang, Xinyuan Chang, Ronghan Chen, Feng Xiong

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Vision-Language-Action (VLA) models trained via imitation learning suffer from significant performance degradation in data-scarce scenarios due to their reliance on large-scale demonstration datasets. Although reinforcement learning (RL)-based post-training has proven effective in addressing data scarcity, its application to VLA models is hindered by the non-resettable nature of real-world environ...

---

## 161. Measuring Audio's Impact on Correctness: Audio-Contribution-Aware Post-Training of Large Audio Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Audio Language Models (LALMs) represent an important frontier in multimodal AI, addressing diverse audio tasks. Recently, post-training of LALMs has received increasing attention due to significant performance improvements over foundation models. While single-stage post-training such as reinforcement learning (RL) has demonstrated promising results, multi-stage approaches such as supervised ...

---

## 162. Eliciting Reasoning in Language Models with Cognitive Tools

**Authors:** Brown Ebouky, Andrea Bartezzaghi, Mattia Rigotti

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> The recent advent of reasoning models like OpenAI's o1 was met with excited speculation by the AI community about the mechanisms underlying these capabilities in closed models, followed by a rush of replication efforts, particularly from the open source community.
These speculations were largely settled by the demonstration from DeepSeek-R1 that chain-of-thought and reinforcement learning (RL) can...

---

## 163. Mr.BiQ: Post-Training Non-Uniform Quantization Based on Minimizing the Reconstruction Error

**Authors:** Yongkweon Jeon, Chungman Lee, Eulrang Cho, Yeonju Ro

**Year:** 2022 | **Venue:** CVPR 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2022/papers/Jeon_Mr.BiQ_Post-Training_Non-Uniform_Quantization_Based_on_Minimizing_the_Reconstruction_Error_CVPR_2022_paper.pdf) | > Post-training quantization compresses a neural network within few hours with only a small unlabeled calibration set. However, so far it has been only discussed and empirically demonstrated in the context of uniform quantization on convolutional neural networks. We thus propose a new post-training non-uniform quantization method, called Mr.BiQ, allowing low bit-width quantization even on Transforme...

---

## 164. Post-training Quantization with Progressive Calibration and Activation Relaxing for Text-to-Image Diffusion Models

**Authors:** Siao Tang, Xin Wang*, Hong Chen, Chaoyu Guan, Zewen Wu

**Year:** 2024 | **Venue:** ECCV 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/07353.pdf) | > "High computational overhead is a troublesome problem for diffusion models. Recent studies have leveraged post-training quantization (PTQ) to compress diffusion models. However, most of them only focus on unconditional models, leaving the quantization of widely-used pretrained text-to-image models, e.g., Stable Diffusion, largely unexplored. In this paper, we propose a novel post-training quantiza...

---

## 165. Compressing Large Language Models using Low Rank and Low Precision Decomposition

**Authors:** Rajarshi Saha, Naomi Sagan, Varun Srivastava, Andrea Goldsmith, Mert Pilanci

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=lkx3OpcqSZ) | > The prohibitive sizes of Large Language Models (LLMs) today make it difficult to deploy them on memory-constrained edge devices. This work introduces $\rm CALDERA$ -- a new post-training LLM compression algorithm that harnesses the inherent low-rank structure of a weight matrix $\mathbf{W}$ by approximating it via a low-rank, low-precision decomposition as $\mathbf{W} \approx \mathbf{Q} + \mathbf{...

---

## 166. Fine-Grained Data Distribution Alignment for Post-Training Quantization

**Authors:** Yunshan Zhong, Mingbao Lin, Mengzhao Chen, Ke Li, Yunhang Shen

**Year:** 2022 | **Venue:** ECCV 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.ecva.net/papers/eccv_2022/papers_ECCV/papers/136710070.pdf) | > "While post-training quantization receives popularity mostly due to its evasion in accessing the original complete training dataset, its poor performance also stems from scarce images. To alleviate this limitation, in this paper, we leverage the synthetic data introduced by zero-shot quantization with calibration dataset and propose a fine-grained data distribution alignment (FDDA) method to boost...

---

## 167. Post-Training Quantization for Video Matting

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Video matting is crucial for applications such as film production and virtual reality, yet deploying its computationally intensive models on resource-constrained devices presents challenges. Quantization is a key technique for model compression and acceleration. As an efficient approach, Post-Training Quantization (PTQ) is still in its nascent stages for video matting, facing significant hurdles i...

---

## 168. Post-Training Quantization for Vision Transformer

**Authors:** Zhenhua Liu, Yunhe Wang, Kai Han, Wei Zhang, Siwei Ma

**Year:** 2021 | **Venue:** NIPS 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=9TX5OsKJvm) | > Recently, transformer has achieved remarkable performance on a variety of computer vision applications. Compared with mainstream convolutional neural networks, vision transformers are often of sophisticated architectures for extracting powerful feature representations, which are more difficult to be developed on mobile devices. In this paper, we present an effective post-training quantization algo...

---

## 169. PTMQ: Post-training Multi-Bit Quantization of Neural Networks

**Authors:** Ke Xu, Zhongcheng Li, Shanshan Wang, Xingyi Zhang

**Year:** 2024 | **Venue:** AAAI 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://ojs.aaai.org/index.php/AAAI/article/view/29553/30925) | > The ability of model quantization with arbitrary bit-width to dynamically meet diverse bit-width requirements during runtime has attracted significant attention. Recent research has focused on optimizing large-scale training methods to achieve robust bit-width adaptation, which is a time-consuming process requiring hundreds of GPU hours. Furthermore, converting bit-widths requires recalculating st...

---

## 170. Pixel-Space Post-Training of Latent-Diffusion Models

**Authors:** Christina Zhang, Simran Motwani, Matthew Yu, Ji Hou, Felix Juefei-Xu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Latent diffusion models (LDMs) have made significant advancements in the field of image generation in recent years. One major advantage of LDMs is their ability to operate in a compressed latent space, allowing for more efficient training and deployment. However, despite these advantages, challenges with LDMs still remain. For example, it has been observed that LDMs often generate high-frequency d...

---

## 171. Lattice Quantization

**Authors:** Clément Metz, Thibault Allenet, Johannes Christian Thiele, Antoine Dupret, Olivier BICHLER

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> Low bit quantization of weights in increasingly large deep convolutional neural networks (DCNNs) can be critical for their implementation in memory constrained hardware systems. Post-training quantization consists in quantizing a model without retraining, which is user-friendly, fast and data frugal. In this paper, we propose LatticeQ, a new post-training weight quantization method designed for DC...

---

## 172. Provable Benefit of Curriculum in Transformer Tree-Reasoning Post-Training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Recent curriculum techniques in the post-training stage of LLMs have been widely observed to outperform non-curriculum approaches in enhancing reasoning performance, yet a principled understanding of why and to what extent they work remains elusive. To address this gap, we develop a theoretical framework grounded in the intuition that progressively learning through manageable steps is more efficie...

---

## 173. Analytical Restructuring of Feed-Forward Networks for Accelerated LLM Inference

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Scaling large language models (LLMs) improves performance but dramatically increases inference costs, with feed-forward networks (FFNs) consuming the majority of computational resources. 
While sparse architectures like mixture-of-experts (MoE) can mitigate this, inducing sparsity in existing dense models typically requires extensive, resource-intensive retraining (often hundreds of billions of to...

---

## 174. Fluent Alignment with Disfluent Judges: Post-training for lower-resource languages

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> We propose a post-training method for lower-resource languages that preserves fluency of language models even when aligned by disfluent reward models. Preference-optimization is now a well-researched topic, but previous work has mostly addressed models for English and Chinese. Lower-resource languages lack both datasets written by native speakers and language models capable of generating fluent sy...

---

## 175. Post-training Large Language Models for Diverse High-Quality Responses

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning has emerged as a popular method for post-training large language models (LLMs). While improving the model's performance on downstream tasks, it often reduces the model's output diversity, leading to narrow, canonical responses. Existing methods to enhance diversity are limited, either by operating at inference time or by focusing on lexical differences. We propose a novel tr...

---

## 176. Beyond the limitation of a single query: Train your LLM for query expansion with Reinforcement Learning

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reasoning-augmented search agents, such as Search-R1, are trained to reason, search, and generate the final answer iteratively. Nevertheless, due to their limited capabilities in reasoning and search, their performance on multi-hop QA benchmarks remains far from satisfactory. To handle complex or compound queries, we train an LLM-based search agent with the native capability of query expansion thr...

---

## 177. MagR: Weight Magnitude Reduction for Enhancing Post-Training Quantization

**Authors:** Aozhong Zhang, Naigang Wang, Yanxia Deng, Xin Li, Zi Yang

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=UARTFgkTqW) | > In this paper, we present a simple optimization-based preprocessing technique called Weight Magnitude Reduction (MagR) to improve the performance of post-training quantization. For each linear layer, we adjust the pre-trained floating-point weights by solving an $\ell_\infty$-regularized optimization problem. This process greatly diminishes the maximum magnitude of the weights and smooths out outl...

---

## 178. GRPO-$\lambda$: Credit Assignment improves LLM Reasoning

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) are increasingly deployed for tasks requiring complex reasoning, prompting significant interest in improving their reasoning abilities through post-training.
Especially RL based methods using verifiable reward, like the state-of-the-art GRPO, have shown to tremendously improve reasoning behaviors when applied as post-training methods.
However, the lack of an explicit r...

---

## 179. RaanA: A Fast, Flexible, and Data-Efficient Post-Training Quantization Algorithm

**Authors:** Yongyi Yang, Jianyang Gao, Wei Hu

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training Quantization (PTQ) has become a widely used technique for improving inference efficiency of large language models (LLMs). However, existing PTQ methods generally suffer from crucial limitations such as heavy calibration data requirements and inflexible choice of target number of bits. In this paper, we propose RaanA, a unified PTQ framework that overcomes these challenges by introduc...

---

## 180. Hardware-Friendly Post-Training Quantization: Input- and Output-Channelwise Scale and Offset

**Authors:** Geunjae Choi, Kamin Lee, KiYoon Yoo, Nojun Kwak

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Post-training quantization enables swift quantization of neural networks using a minimal calibration dataset.
Specifically, these methods tend to underperform dramatically on hardware with fixed integer bit width, particularly in extremely low-bit quantization scenarios.
In response, we introduce an optimized method for uniform channel-wise quantization, which is compatible with existing hardware....

---

## 181. Fast and Controllable Post-training Sparsity: Learning Optimal Sparsity Allocation with Global Constraint in Minutes

**Authors:** Ruihao Gong, Yang Yong, Zining Wang, Jinyang Guo, Xiuying Wei

**Year:** 2024 | **Venue:** AAAI 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://ojs.aaai.org/index.php/AAAI/article/view/29108/30095) | > Neural network sparsity has attracted many research interests due to its similarity to biological schemes and high energy efficiency. However, existing methods depend on long-time training or fine-tuning, which prevents large-scale applications. Recently, some works focusing on post-training sparsity (PTS) have emerged. They get rid of the high training cost but usually suffer from distinct accura...

---

## 182. Spiking Brain Compression: Post-Training Second-order Compression for Spiking Neural Networks

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Spiking Neural Networks (SNNs) have emerged as a new generation of energy-efficient neural networks suitable for implementation on neuromorphic hardware. As neuromorphic hardware has limited memory and computing resources, weight pruning and quantization have recently been explored to improve SNNs' efficiency. State-of-the-art SNN pruning/quantization methods employ multiple compression and traini...

---

## 183. Training Dynamics Impact Post-Training Quantization Robustness

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> While post-training quantization is widely adopted for efficient deployment of large language models, the mechanisms underlying quantization robustness remain unclear. We conduct a comprehensive analysis of quantization degradation across open-source language model training trajectories up to 32B parameters and 15T training tokens to accurately assess the relationship between training dynamics and...

---

## 184. SPARQ: Outlier-free SpeechLM with Fast Adaptation and Robust Quantization

**Authors:** Shang Wu, Yen-Ju Lu, Haozheng Luo, Maojiang Su, Jerry Yao-Chieh Hu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> We propose SpARQ (outlier-free SpeechLM for Fast Adaptation and Robust Quantization) to address the outlier problem in Speech and Language multi-modal Models (SpeechLMs). Our primary observation is that outliers stemming from cross-modal (speech and text) low-rank adaptation and post-training quantization stages affect the performance of the current SpeechLMs. Methodologically, SpARQ leverages a p...

---

## 185. Measuring LLM Novelty As The Frontier Of Original And High-Quality Output

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> As large language models (LLMs) are increasingly used for ideation and scientific discovery, it is important to evaluate their ability to generate novel output. Prior work evaluates novelty as originality with respect to model training data, but original outputs can be of low quality. In contrast, non-expert judges more reliably score quality but may favor memorized outputs, limiting the reliabili...

---

## 186. CLAMP-ViT: Contrastive Data-Free Learning for Adaptive Post-Training Quantization of ViTs

**Authors:** Akshat Ramachandran*, Souvik Kundu*, Tushar Krishna*

**Year:** 2024 | **Venue:** ECCV 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/08434.pdf) | > "We present CLAMP-ViT, a data-free post-training quantization method for vision transformers (ViTs). We identify the limitations of recent techniques, notably their inability to leverage meaningful inter-patch relationships, leading to the generation of simplistic and semantically vague data, impacting quantization accuracy. CLAMP-ViT employs a two-stage approach, cyclically adapting between data ...

---

## 187. EGGS-PTP: An Expander-Graph Guided Structured Post-training Pruning Method for Large Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> As Large Language Models (LLMs) become more widely adopted and scale up in size, the computational and memory challenges involved in deploying these massive foundation models have grown increasingly severe. This underscores the urgent need to develop more efficient model variants. Faced with this challenge, the present work introduces EGGS-PTP: an Expander-Graph Guided Structured Post-training Pru...

---

## 188. Post-training quantization of vision encoders needs prefixing registers

**Authors:** Seunghyeon Kim, Jinho Kim, Taesun Yeom, Wonpyo Park, Kyuyeun Kim

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Transformer-based vision encoders---such as CLIP---are central to multimodal intelligence, powering applications from autonomous web agents to robotic control. Since these applications often demand real-time processing of massive visual data, reducing the inference cost of vision encoders is critical. Post-training quantization offers a practical path, but remains challenging even at 8-bit precisi...

---

## 189. UniPruning: Unifying Local Metric and Global Feedback for Scalable Sparse LLMs

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) achieve strong performance across diverse tasks but face prohibitive computational and memory costs. Pruning offers a promising path by inducing sparsity while preserving architectural flexibility. However, existing methods struggle to balance efficiency and robustness: local metric approaches prune layer by layer but often collapse under high sparsity, whereas global ...

---

## 190. Post-Training Dialogue Summarization using Pseudo-Paraphrasing

**Authors:** Qi Jia, Yizhu Liu, Haifeng Tang, Kenny Zhu

**Year:** 2022 | **Venue:** NAACL 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2022.findings-naacl.125.pdf) | > Previous dialogue summarization techniques adapt large language models pretrained on the narrative text by injecting dialogue-specific features into the models. These features either require additional knowledge to recognize or make the resulting models harder to tune. To bridge the format gap between dialogues and narrative summaries in dialogue summarization tasks, we propose to post-train pretr...

---

## 191. Q-VLM: Post-training Quantization for Large Vision-Language Models

**Authors:** Changyuan Wang, Ziwei Wang, Xiuwei Xu, Yansong Tang, Jie Zhou

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=gxMfNArldP) | > In this paper, we propose a post-training quantization framework of large vision-language models (LVLMs) for efficient multi-modal inference. Conventional quantization methods sequentially search the layer-wise rounding functions by minimizing activation discretization errors, which fails to acquire optimal quantization strategy without considering cross-layer dependency. On the contrary, we mine ...

---

## 192. Steering Information Utility in Key-Value Memory for Language Model Post-Training

**Authors:** Chunyuan Deng, Ruidi Chang, Hanjie Chen

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Recent advancements in language models (LMs) have marked a shift toward the growing importance of post-training. Yet, post-training approaches such as supervised fine-tuning (SFT) do not guarantee the effective use of knowledge acquired during pretraining. We therefore introduce infosteer, a lightweight method that encourages parametric information utilization in LMs during post-training. Specific...

---

## 193. Post-Training Quantization Is All You Need to Perform Cross-Platform Learned Image Compression

**Authors:** Dailan He, Ziming Yang, Yan Wang, Yuan Chen, Qi Zhang

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> It has been witnessed that learned image compression has outperformed conventional image coding techniques and tends to be practical in industrial applications. One of the most critical issues preventing it from being practical is the non-deterministic calculation, which makes the probability prediction cross-platform inconsistent and frustrates successful decoding. We propose to solve this proble...

---

## 194. ChessQA: Evaluating Large Language Models for Chess Understanding

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Chess has played an important historical role in AI development, as it has well-defined structure and objective ground truth while admitting a wide spectrum of skill levels. However, existing evaluations of LLM ability in chess are ad hoc and narrow in scope, making it difficult to accurately measure LLM chess understanding and how it varies with scale, post-training methodologies, or architecture...

---

## 195. Blending Supervised and Reinforcement Fine-Tuning with Prefix Sampling

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Existing post-training techniques for large language models are broadly categorized into Supervised Fine-Tuning (SFT) and Reinforcement Fine-Tuning (RFT). Each paradigm presents a distinct trade-off: SFT excels at mimicking demonstration data but can lead to problematic generalization as a form of behavior cloning. Conversely, RFT can significantly enhance a model's performance but is prone to lea...

---

## 196. PoF: Post-Training of Feature Extractor for Improving Generalization

**Authors:** Ikuro Sato, Yamada Ryota, Masayuki Tanaka, Nakamasa Inoue, Rei Kawakami

**Year:** 2022 | **Venue:** ICML 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://proceedings.mlr.press/v162/sato22a/sato22a.pdf) | > It has been intensively investigated that the local shape, especially flatness, of the loss landscape near a minimum plays an important role for generalization of deep models. We developed a training algorithm called PoF: Post-Training of Feature Extractor that updates the feature extractor part of an already-trained deep model to search a flatter minimum. The characteristics are two-fold: 1) Feat...

---

## 197. Contrastive Post-training Large Language Models on Data Curriculum

**Authors:** Canwen Xu, Corby Rosset, Luciano Del Corro, Shweti Mahajan, Julian McAuley

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Alignment serves as an important step to steer large language models (LLMs) towards human preferences. In this paper, we explore contrastive post-training techniques for alignment by automatically constructing preference pairs from multiple models of varying strengths (e.g., InstructGPT, ChatGPT and GPT-4). We carefully compare the contrastive techniques of SLiC and DPO to SFT baselines and find t...

---

## 198. Direct Post-Training Preference Alignment for Multi-Agent Motion Generation Model Using Implicit Feedback from Pre-training Demonstrations

**Authors:** Thomas Tian, Kratarth Goel

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=8UFG9D8xeU) | > Recent advancements in Large Language Models (LLMs) have revolutionized motion generation models in embodied applications such as autonomous driving and robotic manipulation. While LLM-type auto-regressive motion generation models benefit from training scalability, there remains a discrepancy between their token prediction objectives and human preferences. As a result, models pre-trained solely wi...

---

## 199. DoReMi - Difficulty-Oriented Reasoning Effort Modeling of Science Problems for Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> We introduce DoReMi (Difficulty-Oriented Reasoning Effort Modeling), a structured framework leveraging an extended Bloom's taxonomy to comprehensively characterize intrinsic problem difficulty for large language models on scientific reasoning tasks. DoReMi systematically annotates problems along seven cognitive and methodological axes using judge LLMs distinct from those being evaluated, with huma...

---

## 200. SSVPO: Effective Step-Level Credit Assignment for RL Training of Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Language models have shown strong performance on mathematical reasoning tasks. Post-training with outcome-based reinforcement learning (RL) can further enhance reasoning but is inefficient because it relies solely on final rewards. Recent credit assignment–based RL methods provide intermediate feedback, yet they often struggle to fairly evaluate each step’s importance, especially in partially corr...

---

## 201. SSP: Self-Supervised Post-training for Conversational Search

**Authors:** Quan Tu, Shen Gao, Xiaolong Wu, Zhao Cao, Ji-Rong Wen

**Year:** 2023 | **Venue:** ACL 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2023.findings-acl.837.pdf) | > Conversational search has been regarded as the next-generation search paradigm. Constrained by data scarcity, most existing methods distill the well-trained ad-hoc retriever to the conversational retriever. However, these methods, which usually initialize parameters by query reformulation to discover contextualized dependency, have trouble in understanding the dialogue structure information and st...

---

## 202. Time-R1: Post-Training Large Vision Language Model for Temporal Video Grounding

**Authors:** Ye Wang, Ziheng Wang, Boshen Xu, Yang Du, Kejun Lin

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Temporal Video Grounding (TVG), the task of locating specific video segments based on language queries, is a core challenge in long-form video understanding. While recent Large Vision-Language Models (LVLMs) have shown early promise in tackling TVG through supervised fine-tuning (SFT), their ability to generalize remains limited. To address this, we propose a novel post-training framework that enh...

---

## 203. RL Tango: Reinforcing Generator and Verifier Together for Language Reasoning

**Authors:** Kaiwen Zha, Zhengqi Gao, Maohao Shen, Zhang-Wei Hong, Duane S Boning

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning (RL) has recently emerged as a compelling approach for enhancing the reasoning capabilities of large language models (LLMs), where an LLM generator serves as a policy guided by a verifier (reward model). However, current RL post-training methods for LLMs typically use verifiers that are fixed (rule-based or frozen pretrained) or trained discriminatively via supervised fine-t...

---

## 204. LLMs Can Generate a Better Answer by Aggregating Their Own Responses

**Authors:** Zichong Li, Xinyu Feng, Yuheng Cai, Zixuan Zhang, Tianyi Liu

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) have shown remarkable capabilities across tasks, yet they often require additional prompting techniques when facing complex problems. While approaches like self-correction and response selection have emerged as popular solutions, recent studies have shown these methods perform poorly when relying on the LLM itself to provide feedback or selection criteria. We argue thi...

---

## 205. Progress or Regress? Self-Improvement Reversal in Post-training

**Authors:** Ting Wu, Xuefeng Li, Pengfei Liu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=RFqeoVfLHa) | > Self-improvement through post-training methods such as iterative preference learning has been acclaimed for enhancing the problem-solving capabilities (e.g., mathematical reasoning) of Large Language Models (LLMs) without human intervention. However, as our exploration deepens, it is crucial to critically assess whether these enhancements indeed signify comprehensive progress or if they could lead...

---

## 206. Attention-aware Post-training Quantization without Backpropagation

**Authors:** Junhan Kim, Ho-young Kim, Eulrang Cho, Chungman Lee, Joonyoung Kim

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Quantization offers a promising solution for deploying large-scale language models (LLMs) on resource-constrained devices. However, early quantization methods, developed for smaller networks like ResNet, rely on gradient-based optimization, which becomes impractical for hyper-scale LLMs with billions of parameters. While recently proposed backpropagation-free post-training quantization (PTQ) metho...

---

## 207. QDrop: Randomly Dropping Quantization for Extremely Low-bit Post-Training Quantization

**Authors:** Xiuying Wei, Ruihao Gong, Yuhang Li, Xianglong Liu, Fengwei Yu

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=ySQH0oDyp7) | > Recently, post-training quantization (PTQ) has driven much attention to produce efficient neural networks without long-time retraining. Despite the low cost, current PTQ works always fail under the extremely low-bit setting. In this study, we pioneeringly confirm that properly incorporating activation quantization into the PTQ reconstruction benefits the final accuracy. To deeply understand the in...

---

## 208. Quantization Error Propagation: Revisiting Layer-Wise Post-Training Quantization

**Authors:** Yamato Arai, Yuma Ichikawa

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Layer-wise PTQ is a promising technique for compressing large language models (LLMs), due to its simplicity and effectiveness without requiring retraining. However, recent progress in this area is saturating, underscoring the need to revisit its core limitations and explore further improvements. We address this challenge by identifying a key limitation of existing layer-wise PTQ methods: the growt...

---

## 209. Consistency Is Not Always Correct: Towards Understanding the Role of Exploration in Post-Training Reasoning

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Foundation models exhibit broad knowledge but limited task-specific reasoning, motivating post-training strategies such as RL with verifiable rewards (RLVR) and inference scaling with outcome or process reward models (ORM/PRM). While recent work highlights the role of *exploration* and *entropy stability* in improving pass@K, empirical evidence points to a paradox: RLVR and ORM/PRM typically reinf...

---

## 210. CDBridge: A Cross-omics Post-training Bridge Strategy for Context-aware Biological Modeling

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Linking genomic DNA to quantitative, context-specific expression remains a central challenge in computational biology. Current foundation models capture either tissue context or sequence features, but not both. Cross-omics systems, in turn, often overlook critical mechanisms such as alternative splicing and isoform reuse. We present CDBridge, a post-training strategy that unifies pretrained DNA an...

---

## 211. BRiTE: Bootstrapping Reinforced Thinking Process to Enhance Language Model Reasoning

**Authors:** Han Zhong, Yutong Yin, Shenao Zhang, Xiaojun Xu, Yuanxin Liu

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=NME3HKUHLX) | > Large Language Models (LLMs) have demonstrated remarkable capabilities in complex reasoning tasks, yet generating reliable reasoning processes remains a significant challenge. We present a unified probabilistic framework that formalizes LLM reasoning through a novel graphical model incorporating latent thinking processes and evaluation signals. Our framework addresses two critical questions: (1) h...

---

## 212. Outlier-Aware Post-Training Quantization for Discrete Graph Diffusion Models

**Authors:** Zheng Gong, Ying Sun

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=w5fONAEwra) | > Discrete Graph Diffusion Models (DGDMs) mark a pivotal advancement in graph generation, effectively preserving sparsity and structural integrity, thereby enhancing the learning of graph data distributions for diverse generative applications. Despite their potential, DGDMs are computationally intensive due to the numerous low-parameter yet high-computation operations, thereby increasing the need of...

---

## 213. Non-uniform Step Size Quantization for Accurate Post-Training Quantization

**Authors:** Sangyun Oh, Hyeonuk Sim, Jounghyun Kim, Jongeun Lee

**Year:** 2022 | **Venue:** ECCV 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.ecva.net/papers/eccv_2022/papers_ECCV/papers/136710657.pdf) | > "Quantization is a very effective optimization technique to reduce hardware cost and memory footprint of deep neural network (DNN) accelerators. In particular, post-training quantization (PTQ) is often preferred as it does not require a full dataset or costly retraining. However, performance of PTQ lags significantly behind that of quantization-aware training especially for low-precision networks ...

---

## 214. Router Choice Matters: Rank-Aware Post-Training Quantization for MoE Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Quantizing Mixture-of-Experts (MoE) language models is challenging since router errors cascade into expert selection and dominate accuracy loss. We study this effect and show that preserving router decisions of the selected experts yields the largest gains, with most errors arising as near-neighbor rank flips around the top-$k$ experts. Motivated by these observations, we present ExpertQuant, a tr...

---

## 215. Adaptive Fission: Post-training Encoding for Low-latency Spike Neural Networks

**Authors:** Yizhou Jiang, Feng Chen, Yihan Li, Yuqian Liu, Haichuan Gao

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Spiking Neural Networks (SNNs) often rely on rate coding, where high-precision inference depends on long time-steps, leading to significant latency and energy cost—especially for ANN-to-SNN conversions. To address this, we propose Adaptive Fission, a post-training encoding technique that selectively splits high-sensitivity neurons into groups with varying scales and weights. This enables neuron-sp...

---

## 216. Echo Chamber: RL Post-training Amplifies Behaviors Learned in Pretraining

**Authors:** Rosie Zhao, Alexandru Meterez, Sham M. Kakade, Cengiz Pehlevan, Samy Jelassi

**Year:** 2025 | **Venue:** COLM 2025 | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning (RL)-based fine-tuning has become a crucial step in post-training language models for advanced mathematical reasoning and coding. Following the success of frontier reasoning models, recent work has demonstrated that RL fine-tuning consistently improves performance, even in smaller-scale models; however, the underlying mechanisms driving these improvements are not well-unders...

---

## 217. Inlier-Centric Post-Training Quantization for Object Detection Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Object detection is pivotal in robotics, but its immense computational demands make the models slow and power-hungry, underscoring the need for quantization. However, when the quantization is applied in practice, cluttered backgrounds and irregular object morphologies cause redundant activations (or anomalies) that inflate precision requirements and waste bit capacity, hindering the preservation o...

---

## 218. Post-training Quantization with Multiple Points: Mixed Precision without Mixed Precision

**Authors:** Xingchao Liu, Mao Ye, Dengyong Zhou, Qiang Liu

**Year:** 2021 | **Venue:** AAAI 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](https://cdn.aaai.org/ojs/17054/17054-13-20548-1-2-20210518.pdf) | > We consider the post-training quantization problem, which discretizes the weights of pre-trained deep neural networks without re-training the model. We propose multipoint quantization, a quantization method that approximates a full-precision weight vector using a linear combination of multiple vectors of low-bit numbers;  this is in contrast to typical quantization methods that approximate each we...

---

## 219. Painless Activation Steering: An Automated, Lightweight Approach for Post-Training Large Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Language models (LMs) are typically post-trained for desired capabilities and behaviors via weight-based or prompt-based steering, but the former is time-consuming and expensive, and the latter is not precisely controllable and often requires manual trial-and-error.  While activation steering (AS) promises a cheap, fast, and controllable alternative to the two existing post-training methods, curre...

---

## 220. Dialog-Post: Multi-Level Self-Supervised Objectives and Hierarchical Model for Dialogue Post-Training

**Authors:** Zhenyu Zhang, Lei Shen, Yuming Zhao, Meng Chen, Xiaodong He

**Year:** 2023 | **Venue:** ACL 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2023.acl-long.564.pdf) | > Dialogue representation and understanding aim to convert conversational inputs into embeddings and fulfill discriminative tasks. Compared with free-form text, dialogue has two important characteristics, hierarchical semantic structure and multi-facet attributes. Therefore, directly applying the pretrained language models (PLMs) might result in unsatisfactory performance. Recently, several work foc...

---

## 221. Qronos: Correcting the Past by Shaping the Future... in Post-Training Quantization

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> We introduce Qronos---a new post-training quantization algorithm that not only explicitly corrects errors due to both weight and activation quantization, but also corrects errors accumulated from previously quantized layers. Our iterative algorithm is based on an interpretable and disciplined optimization framework that surpasses existing data-driven approaches. At each step, Qronos alternates bet...

---

## 222. PISA Experiments: Exploring Physics Post-Training for Video Diffusion Models by Watching Stuff Drop

**Authors:** Chenyu Li, Oscar Michel, Xichen Pan, Sainan Liu, Mike Roberts

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=RFCp1QzzHQ) | > Large-scale pre-trained video generation models excel in content creation but are not reliable as physically accurate world simulators out of the box. This work studies the process of post-training these models for accurate world modeling through the lens of the simple, yet fundamental, physics task of modeling object freefall. We show state-of-the-art video generation models struggle with this ba...

---

## 223. Cautious Optimizers: Improving Training with One Line of Code

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> AdamW has been the default optimizer for transformer pretraining. For many years, our community searched for faster and more stable optimizers with only constrained positive outcomes. In this work, we propose a \textbf{single-line modification in Pytorch} to any momentum-based optimizer, which we rename cautious optimizer, e.g. C-AdamW and C-Lion.  Our theoretical result shows that this modificati...

---

## 224. One-Step Video Restoration via Diffusion Adversarial Post-Training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Recent advances in diffusion-based video restoration (VR) demonstrate significant improvement in visual quality, yet yield a prohibitive computational cost during inference.
While several distillation-based approaches have exhibited the potential of one-step image restoration, extending existing approaches to VR remains challenging and underexplored, particularly when dealing with high-resolution ...

---

## 225. Adaptive Distraction: Probing LLM Contextual Robustness with Automated Tree Search

**Authors:** Yanbo Wang, Zixiang Xu, Yue Huang, Chujie Gao, Siyuan Wu

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) often struggle to maintain their original performance when faced with semantically coherent but task-irrelevant contextual information. Although prior studies have explored this issue using fixed-template or retrieval-based distractions, such static methods show limited effectiveness against contemporary models. To address this problem, we propose a dynamic distraction...

---

## 226. PTNQ: Post-Training Non-Linear Quantization

**Authors:** Diogo Venâncio, Nuno P. Lopes

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Quantization is one of the leading techniques to reduce the memory usage of machine learning models.
It works by approximating the weights of a model by some function with a smaller domain (e.g., replace 32-bit floats with 8-bit integers that are coefficients in some function that maps back to 32-bit floats).

Although most quantization methods approximate weights with a linear or affine function,...

---

## 227. Towards Accurate Post-training Quantization for Diffusion Models

**Authors:** Changyuan Wang, Ziwei Wang, Xiuwei Xu, Yansong Tang, Jie Zhou

**Year:** 2024 | **Venue:** CVPR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2024/papers/Wang_Towards_Accurate_Post-training_Quantization_for_Diffusion_Models_CVPR_2024_paper.pdf) | > In this paper we propose an accurate post-training quantization framework of diffusion models (APQ-DM) for efficient image generation. Conventional quantization frameworks learn shared quantization functions for tensor discretization regardless of the generation timesteps in diffusion models while the activation distribution differs significantly across various timesteps. Meanwhile the calibration...

---

## 228. FlatQuant: Flatness Matters for LLM Quantization

**Authors:** Yuxuan Sun, Ruikang Liu, Haoli Bai, Han Bao, Kang Zhao

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=uTz2Utym5n) | > Recently, quantization has been widely used for the compression and acceleration of large language models (LLMs). Due to the outliers in LLMs, it is crucial to flatten weights and activations to minimize quantization error with equally spaced quantization points. Prior research explores various pre-quantization transformations to suppress outliers, such as per-channel scaling and Hadamard transfor...

---

## 229. Mind the Gap: A Practical Attack on GGUF Quantization

**Authors:** Kazuki Egashira, Robin Staab, Mark Vero, Jingxuan He, Martin Vechev

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=TV17MLZGuA) | > With the increasing size of frontier LLMs, post-training quantization has become the standard for memory-efficient deployment. Recent work has shown that basic rounding-based quantization schemes pose security risks, as they can be exploited to inject malicious behaviors into quantized models that remain hidden in full precision. However, existing attacks cannot be applied to more complex quantiza...

---

## 230. Diffusion Adversarial Post-Training for One-Step Video Generation

**Authors:** Shanchuan Lin, Xin Xia, Yuxi Ren, Ceyuan Yang, Xuefeng Xiao

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=AAgzsnhc28) | > The diffusion models are widely used for image and video generation, but their iterative generation process is slow and expansive. While existing distillation approaches have demonstrated the potential for one-step generation in the image domain, they still suffer from significant quality degradation. In this work, we propose Adversarial Post-Training (APT) against real data following diffusion pr...

---

## 231. Q-Mamba: Towards more efficient Mamba models via Post-Training Quantization

**Authors:** Chen Tianqi, Yuanteng Chen, Weixiang Xu, Zeyu Zhu, Peisong Wang

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> State Space Models (SSMs), such as Mamba, have recently demonstrated the potential to match or even surpass Transformers in language understanding tasks, making them a promising alternative for designing Large Language Models (LLMs). 
Concurrently, model quantization, especially Post-Training Quantization (PTQ), has been proven effective in reducing memory usage and inference latency in LLMs.
In t...

---

## 232. SpinQuant: LLM Quantization with Learned Rotations

**Authors:** Zechun Liu, Changsheng Zhao, Igor Fedorov, Bilge Soran, Dhruv Choudhary

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=ogO6DGE6FZ) | > Post-training quantization (PTQ) techniques applied to weights, activations, and the KV cache greatly reduce memory usage, latency, and power consumption of Large Language Models (LLMs), but may lead to large quantization errors when outliers are present. Rotating activation or weight matrices helps remove outliers and benefits quantization. In this work, we identify a collection of applicable rot...

---

## 233. SeedLM: Compressing LLM Weights into Seeds of Pseudo-Random Generators

**Authors:** Rasoul Shafipour, David Harrison, Maxwell Horton, JEFFREY MARKER, Houman Bedayat

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=u3TL0qxLWf) | > Large Language Models (LLMs) have transformed natural language processing, but face significant challenges in widespread deployment due to their high runtime cost. In this paper, we introduce SeedLM, a novel post-training compression method that uses seeds of a pseudo-random generator to encode and compress model weights. Specifically, for each block of weights, we find a seed that is fed into a L...

---

## 234. Reg-PTQ: Regression-specialized Post-training Quantization for Fully Quantized Object Detector

**Authors:** Yifu Ding, Weilun Feng, Chuyan Chen, Jinyang Guo, Xianglong Liu

**Year:** 2024 | **Venue:** CVPR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2024/papers/Ding_Reg-PTQ_Regression-specialized_Post-training_Quantization_for_Fully_Quantized_Object_Detector_CVPR_2024_paper.pdf) | > Although deep learning based object detection is of great significance for various applications it faces challenges when deployed on edge devices due to the computation and energy limitations. Post-training quantization (PTQ) can improve inference efficiency through integer computing. However they suffer from severe performance degradation when performing full quantization due to overlooking the u...

---

## 235. Fast Post-training Analysis of NeRFs Using A Simple Visibility Prediction Network

**Authors:** Jianbo Ye, Jiawei Mo, Xiaolong Li, Xiaohan Fei, Ashwin Swaminathan

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Exercising NeRFs on real-world data taught us that their novel view rendering capability varies across different views and rendering of regions that are visible in more input images often produces more reliable results. However, efficient quantitative tools haven't been developed in this regard to facilitate the post-training analysis of NeRF rendered images. In this paper, we introduce a simple v...

---

## 236. BoA: Attention-aware Post-training Quantization without Backpropagation

**Authors:** Junhan Kim, Ho-young Kim, Eulrang Cho, Chungman Lee, Joonyoung Kim

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=Uvj6XcSJ5d) | > Post-training quantization (PTQ) is a promising solution for deploying large language models (LLMs) on resource-constrained devices. 
Early methods developed for small-scale networks, such as ResNet, rely on gradient-based optimization, which becomes impractical for hyper-scale LLMs with billions of parameters.
While recently proposed backpropagation-free or transformation-based methods alleviate ...

---

## 237. Maximum Margin Based Activation Clipping for Post-Training Overfitting Mitigation in DNN Classifiers

**Authors:** Hang Wang, David J. Miller, George Kesidis

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Well-known (non-malicious) sources of overfitting in deep neural net (DNN) classifiers include: i) large class imbalances; ii) insufficient training set diversity; and iii) over-training.  In recent work, it was shown that backdoor 
data-poisoning also induces overfitting, with unusually large classification margins to the attacker's target class, mediated particularly by (unbounded) ReLU activati...

---

## 238. LILO: Learning to Reason at the Frontier of Learnability

**Authors:** Thomas Foster, Anya Sims, Johannes Forkel, Jakob Nicolaus Foerster

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning is widely adopted in post-training large language models, especially for reasoning-style tasks such as maths questions. However, as we show, most existing methods will provably fail to learn from questions that are too hard, where the model always fails, or too easy, where the model always succeeds. Much human effort is therefore spent continually producing datasets of quest...

---

## 239. Your Pre-trained LLM is Secretly an Unsupervised Confidence Calibrator

**Authors:** Beier Luo, Shuoyuan Wang, Sharon Li, Hongxin Wei

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Post-training of large language models is essential for adapting pre-trained language models (PLMs) to align with human preferences and downstream tasks. 
While PLMs typically exhibit well-calibrated confidence, post-trained language models (PoLMs) often suffer from over-confidence, assigning high confidence to both correct and incorrect outputs, which can undermine reliability in critical applica...

---

## 240. Spend Wisely: Maximizing Post-Training Gains in Iterative Synthetic Data Bootstrapping

**Authors:** Pu Yang, Yunzhen Feng, Ziyuan Chen, Yuhang Wu, Zhuoyuan Li

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Modern foundation models often undergo iterative ``bootstrapping'' in their post-training phase: a model generates synthetic data, an external verifier filters out low-quality samples, and the high-quality subset is used for further fine-tuning. Over multiple iterations, the model performance improves, raising a crucial question: How should the total budget for generation and training be allocated...

---

## 241. RePIC: Reinforced Post-Training for Personalizing Multi-Modal Language Models

**Authors:** Yeongtak Oh, Dohyun Chung, Juhyeon Shin, Sangha Park, Johan Barthelemy

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Recent multi-modal large language models (MLLMs) often struggle to generate personalized image captions, even when trained on high-quality captions. In this work, we observe that such limitations persist in existing post-training-based MLLM personalization methods. Specifically, despite being post-tuned with large-scale caption data through supervised fine-tuning (SFT), these models frequently fai...

---

## 242. ReGenesis: LLMs can Grow into Reasoning Generalists via Self-Improvement

**Authors:** XIANGYU PENG, Congying Xia, Xinyi Yang, Caiming Xiong, Chien-Sheng Wu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=YUYJsHOf3c) | > Post-training Large Language Models (LLMs) with explicit reasoning trajectories can enhance their reasoning abilities. However, acquiring such high-quality trajectory data typically demands meticulous supervision from humans or superior models, which can be either expensive or license-constrained. In this paper, we explore how far an LLM can improve its reasoning by self-synthesizing reasoning pat...

---

## 243. Wait, That's Not an Option: LLM Robustness with Incorrect Multiple-Choice Options

**Authors:** Gracjan Góral, Emilia Wiśnios, Piotr Sankowski, Paweł Budzianowski

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Decision-making under full alignment requires balancing between reasoning and faithfulness - a challenge for large language models (LLMs). This study explores whether LLMs prioritize following instructions over reasoning and truth when given "misleading" instructions, such as "Respond solely with A or B", even when neither option is correct. We introduce a new metric called "reflective judgment", ...

---

## 244. The Pick-to-Learn Algorithm: Empowering Compression for Tight Generalization Bounds and Improved Post-training Performance

**Authors:** Dario Paccagnan, Marco Campi, Simone Garatti

**Year:** 2023 | **Venue:** NIPS 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=40L3viVWQN) | > Generalization bounds are valuable both for theory and applications. On the one hand, they shed light on the mechanisms that underpin the learning processes; on the other, they certify how well a learned model performs against unseen inputs.  In this work we build upon a recent breakthrough in compression theory to develop a new framework yielding tight generalization bounds of wide practical appl...

---

## 245. Mind the Gap: Examining the Self-Improvement Capabilities of Large Language Models

**Authors:** Yuda Song, Hanlin Zhang, Carson Eisenach, Sham M. Kakade, Dean Foster

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=mtJSMcF3ek) | > Self-improvement is a mechanism in Large Language Model (LLM) pre-training, post-training and test-time inference. We explore a framework where the model verifies its own outputs, filters or reweights data based on this verification, and distills the filtered data.  Despite several empirical successes, a fundamental understanding is still lacking. In this work, we initiate a comprehensive, modular...

---

## 246. ASVD: Activation-aware Singular Value Decomposition for Compressing Large Language Models

**Authors:** Zhihang Yuan, Yuzhang Shang, Yue Song, Dawei Yang, Qiang Wu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> In this paper, we introduce a new post-training compression paradigm for Large Language Models (LLMs) to facilitate their wider adoption. We delve into LLM weight low-rank decomposition, and find that the challenges of this task stem from ❶ the distribution variance in the LLM activations and ❷ the sensitivity difference among various kinds of layers. To address these issues, we propose a training...

---

## 247. PTQD: Accurate Post-Training Quantization for Diffusion Models

**Authors:** Yefei He, Luping Liu, Jing Liu, Weijia Wu, Hong Zhou

**Year:** 2023 | **Venue:** NIPS 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=Y3g1PV5R9l) | > Diffusion models have recently dominated image synthesis and other related generative tasks. However, the iterative denoising process is expensive in computations at inference time, making diffusion models less practical for low-latency and scalable real-world applications. 
Post-training quantization of diffusion models can significantly reduce the model size and accelerate the sampling process w...

---

## 248. Towards Next-Level Post-Training Quantization of Hyper-Scale Transformers

**Authors:** Junhan Kim, Chungman Lee, Eulrang Cho, Kyungphil Park, Ho-young Kim

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=6uv9ViIoMj) | > With the increasing complexity of generative AI models, post-training quantization (PTQ) has emerged as a promising solution for deploying hyper-scale models on edge devices such as mobile and TVs.
Existing PTQ schemes, however, consume considerable time and resources, which could be a bottleneck in real situations where frequent model updates and multiple hyperparameter tunings are required.
As a...

---

## 249. ERQ: Error Reduction for Post-Training Quantization of Vision Transformers

**Authors:** Yunshan Zhong, Jiawei Hu, You Huang, Yuxin Zhang, Rongrong Ji

**Year:** 2024 | **Venue:** ICML 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=jKUWlgra9b) | > Post-training quantization (PTQ) for vision transformers (ViTs) has garnered significant attention due to its efficiency in compressing models. However, existing methods typically overlook the intricate interdependence between quantized weight and activation, leading to considerable quantization error. In this paper, we propose ERQ, a two-step PTQ approach meticulously crafted to sequentially redu...

---

## 250. PASER: Post-Training Data Selection for Efficient Pruned Large Language Model Recovery

**Authors:** Bowei He, Lihao Yin, Huiling Zhen, Mingxuan Yuan, Chen Ma

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Model pruning is an effective approach for compressing Large Language Models (LLMs) and improving inference efficiency. However, this process often leads to significant degradation of model capabilities. While post-training techniques such as instruction tuning are commonly employed to recover model performance, existing methods often overlook the uneven deterioration of model capabilities and inc...

---

## 251. Attend to Not Attended: Structure-then-Detail Token Merging for Post-training DiT Acceleration

**Authors:** Haipeng Fang, Sheng Tang, Juan Cao, Enshuo Zhang, Fan Tang

**Year:** 2025 | **Venue:** CVPR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Fang_Attend_to_Not_Attended_Structure-then-Detail_Token_Merging_for_Post-training_DiT_CVPR_2025_paper.pdf) | > Diffusion transformers have shown exceptional performance in visual generation but incur high computational costs. Token reduction techniques that compress models by sharing the denoising process among similar tokens have been introduced. However, existing approaches neglect the denoising priors of the diffusion models, leading to suboptimal acceleration and diminished image quality. This study pr...

---

## 252. Toward Accurate Post-Training Quantization for Image Super Resolution

**Authors:** Zhijun Tu, Jie Hu, Hanting Chen, Yunhe Wang

**Year:** 2023 | **Venue:** CVPR 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2023/papers/Tu_Toward_Accurate_Post-Training_Quantization_for_Image_Super_Resolution_CVPR_2023_paper.pdf) | > Model quantization is a crucial step for deploying super resolution (SR) networks on mobile devices. However, existing works focus on quantization-aware training, which requires complete dataset and expensive computational overhead. In this paper, we study post-training quantization(PTQ) for image super resolution using only a few unlabeled calibration images. As the SR model aims to maintain the ...

---

## 253. PassionSR: Post-Training Quantization with Adaptive Scale in One-Step Diffusion based Image Super-Resolution

**Authors:** Libo Zhu, Jianze Li, Haotong Qin, Wenbo Li, Yulun Zhang

**Year:** 2025 | **Venue:** CVPR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Zhu_PassionSR_Post-Training_Quantization_with_Adaptive_Scale_in_One-Step_Diffusion_based_CVPR_2025_paper.pdf) | > Diffusion-based image super-resolution (SR) models have shown superior performance at the cost of multiple denoising steps. However, even though the denoising step has been reduced to one, they require high computational costs and storage requirements, making it difficult for deployment on hardware devices. To address these issues, we propose a novel post-training quantization approach with adapti...

---

## 254. Autoregressive Adversarial Post-Training for Real-Time Interactive Video Generation

**Authors:** Shanchuan Lin, Ceyuan Yang, Hao He, Jianwen Jiang, Yuxi Ren

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Existing large-scale video generation models are computationally intensive, preventing adoption in real-time and interactive applications. In this work, we propose autoregressive adversarial post-training (AAPT) to turn a pre-trained latent video diffusion model into
a real-time, interactive, streaming video generator. Our model autoregressively generates a latent frame at a time using a single ne...

---

## 255. PTQ4SAM: Post-Training Quantization for Segment Anything

**Authors:** Chengtao Lv, Hong Chen, Jinyang Guo, Yifu Ding, Xianglong Liu

**Year:** 2024 | **Venue:** CVPR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2024/papers/Lv_PTQ4SAM_Post-Training_Quantization_for_Segment_Anything_CVPR_2024_paper.pdf) | > Segment Anything Model (SAM) has achieved impressive performance in many computer vision tasks. However as a large-scale model the immense memory and computation costs hinder its practical deployment. In this paper we propose a post-training quantization (PTQ) framework for Segment Anything Model namely PTQ4SAM. First we investigate the inherent bottleneck of SAM quantization attributed to the bim...

---

## 256. FPTQ: FINE-GRAINED POST-TRAINING QUANTIZATION FOR LARGE LANGUAGE MODELS

**Authors:** QINGYUAN LI, Yifan Zhang, Liang Li, Bo Zhang

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> In the era of large-scale language models, the substantial parameter size poses significant challenges for deployment. Being a prevalent compression technique, quantization has emerged as the mainstream practice to tackle this issue, which is mainly centered on two recipes W8A8 and W4A16 (i.e. weights and activations in such bit widths). In this study, we propose a novel W4A8 post-training quantiz...

---

## 257. TopGQ: Post-Training Quantization for GNNs via Topology Based Node Grouping

**Authors:** Dain Kwon, Kanghyun Choi, Hyeyoon Lee, SunJong Park, Sukjin Kim

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Graph neural networks (GNN) suffer from large computational and memory costs in processing large graph data on resource-constrained devices. One effective solution to reduce costs is neural network quantization, replacing complex high-bit operations with efficient low-bit operations. However, to recover from the error induced by lower precision, existing methods require extensive computational cos...

---

## 258. Effective post-training embedding compression via temperature control in contrastive training

**Authors:** Georgiana Dinu, Corey D Barrett, Yi Xiang, Miguel Romero Calvo, Anna Currey

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=szRmEM8Kx5) | > Fixed-size learned representations (dense representations, or embeddings) are widely used in many machine learning applications across language, vision or speech modalities. This paper investigates the role of the temperature parameter in contrastive training for text embeddings. We shed light on the impact this parameter has on the intrinsic dimensionality of the embedding spaces obtained, and sh...

---

## 259. Accumulator-Aware Post-Training Quantization for Large Language Models

**Authors:** Ian Colbert, Giuseppe Franco, Fabian Grob, Jinjie Zhang, Rayan Saab

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Several recent studies have investigated low-precision accumulation, reporting improvements in throughput, power, and area across various platforms. However, the accompanying proposals have only considered the quantization-aware training (QAT) paradigm, in which models are fine-tuned or trained from scratch with quantization in the loop. As models continue to grow in size, QAT techniques become in...

---

## 260. Rate-Distortion Optimized Post-Training Quantization for Learned Image Compression

**Authors:** Junqi Shi, Ming Lu, fangdong chen, Shiliang Pu, Zhan Ma

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

> Quantizing floating-point neural network to its fixed-point representation is crucial for Learned Image Compression (LIC) because it ensures the decoding consistency for interoperability and reduces space-time complexity for implementation. Existing solutions often have to retrain the network for model quantization which is time consuming and impractical. This work suggests the use of Post-Trainin...

---

## 261. FIMA-Q: Post-Training Quantization for Vision Transformers by Fisher Information Matrix Approximation

**Authors:** Zhuguanyu Wu, Shihe Wang, Jiayi Zhang, Jiaxin Chen, Yunhong Wang

**Year:** 2025 | **Venue:** CVPR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Wu_FIMA-Q_Post-Training_Quantization_for_Vision_Transformers_by_Fisher_Information_Matrix_CVPR_2025_paper.pdf) | > Post-training quantization (PTQ) has stood out as a cost-effective and promising model compression approach over recent years, as it eliminates the need for retraining on the entire dataset. Unfortunately, most existing PTQ methods for Vision Transformers (ViTs) exhibit a notable drop in accuracy, especially in low-bit cases. To tackle these challenges, we analyze the extensively utilized Hessian-...

---

## 262. Vulcan: Instance-Optimal Systems Heuristics Through LLM-Driven Search

**Authors:** Rohit Dwivedula, Divyanshu Saxena, Sujay Yadalam, Daehyeok Kim, Aditya Akella

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25065v1) | > Resource-management tasks in modern operating and distributed systems continue to rely primarily on hand-designed heuristics for tasks such as scheduling, caching, or active queue management. Designing performant heuristics is an expensive, time-consuming process that we are forced to continuously go through due to the constant flux of hardware, workloads and environments.
  We propose a new alter...

---

## 263. Reliable and Resilient Collective Communication Library for LLM Training and Serving

**Authors:** Wei Wang, Nengneng Yu, Sixian Xiong, Zaoxing Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25059v1) | > Modern ML training and inference now span tens to tens of thousands of GPUs, where network faults can waste 10--15\% of GPU hours due to slow recovery. Common network errors and link fluctuations trigger timeouts that often terminate entire jobs, forcing expensive checkpoint rollback during training and request reprocessing during inference. We present R$^2$CCL, a fault-tolerant communication libr...

---

## 264. Context-aware LLM-based AI Agents for Human-centered Energy Management Systems in Smart Buildings

**Authors:** Tianzhi He, Farrokh Jazizadeh

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25055v1) | > This study presents a conceptual framework and a prototype assessment for Large Language Model (LLM)-based Building Energy Management System (BEMS) AI agents to facilitate context-aware energy management in smart buildings through natural language interaction. The proposed framework comprises three modules: perception (sensing), central control (brain), and action (actuation and user interaction),...

---

## 265. MAMA-Memeia! Multi-Aspect Multi-Agent Collaboration for Depressive Symptoms Identification in Memes

**Authors:** Siddhant Agarwal, Adya Dhuler, Polly Ruhnke, Melvin Speisman, Md Shad Akhtar

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25015v1) | > Over the past years, memes have evolved from being exclusively a medium of humorous exchanges to one that allows users to express a range of emotions freely and easily. With the ever-growing utilization of memes in expressing depressive sentiments, we conduct a study on identifying depressive symptoms exhibited by memes shared by users of online social media platforms. We introduce RESTOREx as a v...

---

## 266. Efficiently Estimating Data Efficiency for Language Model Fine-tuning

**Authors:** Gyung Hyun Je, Colin Raffel

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24991v1) | > While large language models (LLMs) demonstrate reasonable zero-shot capability across many downstream tasks, fine-tuning is a common practice to improve their performance. However, a task's data efficiency--i.e., the number of fine-tuning examples needed to achieve a desired level of performance--is often unknown, resulting in costly cycles of incremental annotation and retraining. Indeed, we demo...

---

## 267. PhysTalk: Language-driven Real-time Physics in 3D Gaussian Scenes

**Authors:** Luca Collorone, Mert Kiray, Indro Spinelli, Fabio Galasso, Benjamin Busam

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24986v1) | > Realistic visual simulations are omnipresent, yet their creation requires computing time, rendering, and expert animation knowledge. Open-vocabulary visual effects generation from text inputs emerges as a promising solution that can unlock immense creative potential. However, current pipelines lack both physical realism and effective language interfaces, requiring slow offline optimization. In con...

---

## 268. Large language models and the entropy of English

**Authors:** Colin Scheibner, Lindsay M. Smith, William Bialek

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24969v1) | > We use large language models (LLMs) to uncover long-ranged structure in English texts from a variety of sources. The conditional entropy or code length in many cases continues to decrease with context length at least to $N\sim 10^4$ characters, implying that there are direct dependencies or interactions across these distances. A corollary is that there are small but significant correlations betwee...

---

## 269. The Impact of LLMs on Online News Consumption and Production

**Authors:** Hangcheng Zhao, Ron Berman

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24968v1) | > Large language models (LLMs) change how consumers acquire information online; their bots also crawl news publishers' websites for training data and to answer consumer queries; and they provide tools that can lower the cost of content creation. These changes lead to predictions of adverse impact on news publishers in the form of lowered consumer demand, reduced demand for newsroom employees, and an...

---

## 270. CPJ: Explainable Agricultural Pest Diagnosis via Caption-Prompt-Judge with LLM-Judged Refinement

**Authors:** Wentao Zhang, Tao Fang, Lina Lu, Lifei Wang, Weihe Zhong

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24947v1) | > Accurate and interpretable crop disease diagnosis is essential for agricultural decision-making, yet existing methods often rely on costly supervised fine-tuning and perform poorly under domain shifts. We propose Caption--Prompt--Judge (CPJ), a training-free few-shot framework that enhances Agri-Pest VQA through structured, interpretable image captions. CPJ employs large vision-language models to ...

---

## 271. RAIR: A Rule-Aware Benchmark Uniting Challenging Long-Tail and Visual Salience Subset for E-commerce Relevance Assessment

**Authors:** Chenji Lu, Zhuo Chen, Hui Zhao, Zhenyi Wang, Pengjie Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24943v1) | > Search relevance plays a central role in web e-commerce. While large language models (LLMs) have shown significant results on relevance task, existing benchmarks lack sufficient complexity for comprehensive model assessment, resulting in an absence of standardized relevance evaluation metrics across the industry. To address this limitation, we propose Rule-Aware benchmark with Image for Relevance ...

---

## 272. Iterative Deployment Improves Planning Skills in LLMs

**Authors:** Augusto B. Corrêa, Yoav Gelberg, Luckeciano C. Melo, Ilia Shumailov, André G. Pereira

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24940v1) | > We show that iterative deployment of large language models (LLMs), each fine-tuned on data carefully curated by users from the previous models' deployment, can significantly change the properties of the resultant models. By testing this mechanism on various planning domains, we observe substantial improvements in planning skills, with later models displaying emergent generalization by discovering ...

---

## 273. Vibe Coding, Interface Flattening

**Authors:** Hongrui Jin

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24939v1) | > Large language models are reshaping programming by enabling 'vibe coding': the development of softwares through natural-language interaction with model-driven toolchains. This article argues that vibe coding is best understood as interface flattening, a reconfiguration in which previously distinct modalities (GUI, CLI, and API) appear to converge into a single conversational surface, even as the u...

---

## 274. Adaptive Dependency-aware Prompt Optimization Framework for Multi-Step LLM Pipeline

**Authors:** Minjun Zhao, Xinyu Zhang, Shuai Zhang, Deyang Li, Ruifeng Shi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24933v1) | > Multi-step LLM pipelines invoke large language models multiple times in a structured sequence and can effectively solve complex tasks, but their performance heavily depends on the prompts used at each step. Jointly optimizing these prompts is difficult due to missing step-level supervision and inter-step dependencies. Existing end-to-end prompt optimization methods struggle under these conditions ...

---

## 275. Semi-Supervised Diversity-Aware Domain Adaptation for 3D Object detection

**Authors:** Bartłomiej Olber, Jakub Winter, Paweł Wawrzyński, Andrii Gamalii, Daniel Górniak

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24922v1) | > 3D object detectors are fundamental components of perception systems in autonomous vehicles. While these detectors achieve remarkable performance on standard autonomous driving benchmarks, they often struggle to generalize across different domains - for instance, a model trained in the U.S. may perform poorly in regions like Asia or Europe. This paper presents a novel lidar domain adaptation metho...

---

## 276. Let It Flow: Agentic Crafting on Rock and Roll, Building the ROME Model within an Open Agentic Learning Ecosystem

**Authors:** Weixun Wang, XiaoXiao Xu, Wanhe An, Fangwen Dai, Wei Gao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24873v1) | > Agentic crafting requires LLMs to operate in real-world environments over multiple turns by taking actions, observing outcomes, and iteratively refining artifacts. Despite its importance, the open-source community lacks a principled, end-to-end ecosystem to streamline agent development. We introduce the Agentic Learning Ecosystem (ALE), a foundational infrastructure that optimizes the production p...

---

## 277. Encyclo-K: Evaluating LLMs with Dynamically Composed Knowledge Statements

**Authors:** Yiming Liang, Yizhi Li, Yantao Du, Ge Zhang, Jiayi Zhou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24867v1) | > Benchmarks play a crucial role in tracking the rapid advancement of large language models (LLMs) and identifying their capability boundaries. However, existing benchmarks predominantly curate questions at the question level, suffering from three fundamental limitations: vulnerability to data contamination, restriction to single-knowledge-point assessment, and reliance on costly domain expert annot...

---

## 278. Advances in Agentic AI: Back to the Future

**Authors:** Sergio Alvarez-Telena, Marta Diez-Fernandez

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24856v1) | > In light of the recent convergence between Agentic AI and our field of Algorithmization, this paper seeks to restore conceptual clarity and provide a structured analytical framework for an increasingly fragmented discourse. First, (a) it examines the contemporary landscape and proposes precise definitions for the key notions involved, ranging from intelligence to Agentic AI. Second, (b) it reviews...

---

## 279. VLN-MME: Diagnosing MLLMs as Language-guided Visual Navigation agents

**Authors:** Xunyi Zhao, Gengze Zhou, Qi Wu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24851v1) | > Multimodal Large Language Models (MLLMs) have demonstrated remarkable capabilities across a wide range of vision-language tasks. However, their performance as embodied agents, which requires multi-round dialogue spatial reasoning and sequential action prediction, needs further exploration. Our work investigates this potential in the context of Vision-and-Language Navigation (VLN) by introducing a ...

---

## 280. Triangulation as an Acceptance Rule for Multilingual Mechanistic Interpretability

**Authors:** Yanan Long

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24842v1) | > Multilingual language models achieve strong aggregate performance yet often behave unpredictably across languages, scripts, and cultures. We argue that mechanistic explanations for such models should satisfy a \emph{causal} standard: claims must survive causal interventions and must \emph{cross-reference} across environments that perturb surface form while preserving meaning. We formalize \emph{re...

---

## 281. GenZ: Foundational models as latent variable generators within traditional statistical models

**Authors:** Marko Jojic, Nebojsa Jojic

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24834v1) | > We present GenZ, a hybrid model that bridges foundational models and statistical modeling through interpretable semantic features. While large language models possess broad domain knowledge, they often fail to capture dataset-specific patterns critical for prediction tasks. Our approach addresses this by discovering semantic feature descriptions through an iterative process that contrasts groups o...

---

## 282. Unregularized Linear Convergence in Zero-Sum Game from Preference Feedback

**Authors:** Shulun Chen, Runlong Zhou, Zihan Zhang, Maryam Fazel, Simon S. Du

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24818v1) | > Aligning large language models (LLMs) with human preferences has proven effective for enhancing model capabilities, yet standard preference modeling using the Bradley-Terry model assumes transitivity, overlooking the inherent complexity of human population preferences. Nash learning from human feedback (NLHF) addresses this by framing non-transitive preferences as a two-player zero-sum game, where...

---

## 283. LeanCat: A Benchmark Suite for Formal Category Theory in Lean (Part I: 1-Categories)

**Authors:** Rongge Xu, Hui Dai, Yiming Fu, Jiedong Jiang, Tianjiao Nie

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24796v1) | > Large language models (LLMs) have made rapid progress in formal theorem proving, yet current benchmarks under-measure the kind of abstraction and library-mediated reasoning that organizes modern mathematics. In parallel with FATE's emphasis on frontier algebra, we introduce LeanCat, a Lean benchmark for category-theoretic formalization -- a unifying language for mathematical structure and a core l...

---

## 284. Gradient Descent as Implicit EM in Distance-Based Neural Models

**Authors:** Alan Oursland

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24780v1) | > Neural networks trained with standard objectives exhibit behaviors characteristic of probabilistic inference: soft clustering, prototype specialization, and Bayesian uncertainty tracking. These phenomena appear across architectures -- in attention mechanisms, classification heads, and energy-based models -- yet existing explanations rely on loose analogies to mixture models or post-hoc architectur...

---

## 285. Compute-Accuracy Pareto Frontiers for Open-Source Reasoning Large Language Models

**Authors:** Ákos Prucs, Márton Csutora, Mátyás Antal, Márk Marosi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24776v1) | > Large Language Models (LLMs) are demonstrating rapid improvements on complex reasoning benchmarks, particularly when allowed to utilize intermediate reasoning steps before converging on a final solution. However, current literature often overlooks the significant computational burden associated with generating long reasoning sequences. For industrial applications, model selection depends not only ...

---

## 286. OpenOneRec Technical Report

**Authors:** Guorui Zhou, Honghui Bao, Jiaming Huang, Jiaxin Deng, Jinghao Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24762v1) | > While the OneRec series has successfully unified the fragmented recommendation pipeline into an end-to-end generative framework, a significant gap remains between recommendation systems and general intelligence. Constrained by isolated data, they operate as domain specialists-proficient in pattern matching but lacking world knowledge, reasoning capabilities, and instruction following. This limitat...

---

## 287. AstroReview: An LLM-driven Multi-Agent Framework for Telescope Proposal Peer Review and Refinement

**Authors:** Yutong Wang, Yunxiang Xiao, Yonglin Tian, Junyong Li, Jing Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24754v1) | > Competitive access to modern observatories has intensified as proposal volumes outpace available telescope time, making timely, consistent, and transparent peer review a critical bottleneck for the advancement of astronomy. Automating parts of this process is therefore both scientifically significant and operationally necessary to ensure fair allocation and reproducible decisions at scale. We pres...

---

## 288. Analyzing Communication Predictability in LLM Training

**Authors:** Wenxue Li, Xiangzhou Liu, Yuxuan Li, Yilun Jin, Zhenghang Ren

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24750v1) | > Effective communication is essential in distributed training, with predictability being one of its most significant characteristics. However, existing studies primarily focus on exploiting predictability through online profiling for runtime optimization, without a systematic understanding of it. In this work, we aim to systematically formulate communication predictability in distributed training, ...

---

## 289. BIOME-Bench: A Benchmark for Biomolecular Interaction Inference and Multi-Omics Pathway Mechanism Elucidation from Scientific Literature

**Authors:** Sibo Wei, Peng Chen, Lifeng Dong, Yin Luo, Lei Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24733v1) | > Multi-omics studies often rely on pathway enrichment to interpret heterogeneous molecular changes, but pathway enrichment (PE)-based workflows inherit structural limitations of pathway resources, including curation lag, functional redundancy, and limited sensitivity to molecular states and interventions. Although recent work has explored using large language models (LLMs) to improve PE-based inter...

---

## 290. FPGA Co-Design for Efficient N:M Sparse and Quantized Model Inference

**Authors:** Fen-Yu Hsieh, Yun-Chang Teng, Ding-Yong Hong, Jan-Jan Wu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24713v1) | > Large language models (LLMs) have demonstrated remarkable performance across a wide range of language processing tasks. However, this success comes at the cost of substantial computation and memory requirements, which significantly impedes their deployment in resource-constrained environments. To address this challenge, this work introduces an automation framework that leverages weight pruning and...

---

## 291. MEIC-DT: Memory-Efficient Incremental Clustering for Long-Text Coreference Resolution with Dual-Threshold Constraints

**Authors:** Kangyang Luo, Shuzheng Si, Yuzhuo Bai, Cheng Gao, Zhitong Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24711v1) | > In the era of large language models (LLMs), supervised neural methods remain the state-of-the-art (SOTA) for Coreference Resolution. Yet, their full potential is underexplored, particularly in incremental clustering, which faces the critical challenge of balancing efficiency with performance for long texts. To address the limitation, we propose \textbf{MEIC-DT}, a novel dual-threshold, memory-effi...

---

## 292. MUSIC: MUlti-Step Instruction Contrast for Multi-Turn Reward Models

**Authors:** Wenzhe Li, Shujian Zhang, Wenxuan Zhou, John Lambert, Chi Jin

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24693v1) | > Evaluating the quality of multi-turn conversations is crucial for developing capable Large Language Models (LLMs), yet remains a significant challenge, often requiring costly human evaluation. Multi-turn reward models (RMs) offer a scalable alternative and can provide valuable signals for guiding LLM training. While recent work has advanced multi-turn \textit{training} techniques, effective automa...

---

## 293. BatteryAgent: Synergizing Physics-Informed Interpretation with LLM Reasoning for Intelligent Battery Fault Diagnosis

**Authors:** Songqi Zhou, Ruixue Liu, Boman Su, Jiazhou Wang, Yixing Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24686v1) | > Fault diagnosis of lithium-ion batteries is critical for system safety. While existing deep learning methods exhibit superior detection accuracy, their "black-box" nature hinders interpretability. Furthermore, restricted by binary classification paradigms, they struggle to provide root cause analysis and maintenance recommendations. To address these limitations, this paper proposes BatteryAgent, a...

---

## 294. R-Debater: Retrieval-Augmented Debate Generation through Argumentative Memory

**Authors:** Maoyuan Li, Zhongsheng Wang, Haoyuan Li, Jiamou Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24684v1) | > We present R-Debater, an agentic framework for generating multi-turn debates built on argumentative memory. Grounded in rhetoric and memory studies, the system views debate as a process of recalling and adapting prior arguments to maintain stance consistency, respond to opponents, and support claims with evidence. Specifically, R-Debater integrates a debate knowledge base for retrieving case-like ...

---

## 295. Do Large Language Models Know What They Are Capable Of?

**Authors:** Casey O. Barkan, Sid Black, Oliver Sourbut

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24661v1) | > We investigate whether large language models (LLMs) can predict whether they will succeed on a given task and whether their predictions improve as they progress through multi-step tasks. We also investigate whether LLMs can learn from in-context experiences to make better decisions about whether to pursue a task in scenarios where failure is costly. All LLMs we tested are overconfident, but most p...

---

## 296. MSched: GPU Multitasking via Proactive Memory Scheduling

**Authors:** Weihang Shen, Yinqiu Chen, Rong Chen, Haibo Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24637v1) | > The limited HBM capacity has become the primary bottleneck for hosting an increasing number of larger-scale GPU tasks. While demand paging extends capacity via host DRAM, it incurs up to 78x slowdown due to the massive working sets and poor locality of GPU workloads. We observe, however, that GPU memory access patterns are inherently predictable via kernel launch arguments and their asynchronous e...

---

## 297. DynaFix: Iterative Automated Program Repair Driven by Execution-Level Dynamic Information

**Authors:** Zhili Huang, Ling Xu, Chao Liu, Weifeng Sun, Xu Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24635v1) | > Automated Program Repair (APR) aims to automatically generate correct patches for buggy programs. Recent approaches leveraging large language models (LLMs) have shown promise but face limitations. Most rely solely on static analysis, ignoring runtime behaviors. Some attempt to incorporate dynamic signals, but these are often restricted to training or fine-tuning, or injected only once into the rep...

---

## 298. How Do Agentic AI Systems Address Performance Optimizations? A BERTopic-Based Analysis of Pull Requests

**Authors:** Md Nahidul Islam Opu, Shahidul Islam, Muhammad Asaduzzaman, Shaiful Chowdhury

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24630v1) | > LLM-based software engineering is influencing modern software development. In addition to correctness, prior studies have also examined the performance of software artifacts generated by AI agents. However, it is unclear how exactly the agentic AI systems address performance concerns in practice. In this paper, we present an empirical study of performance-related pull requests generated by AI agen...

---

## 299. Youtu-LLM: Unlocking the Native Agentic Potential for Lightweight Large Language Models

**Authors:** Junru Lu, Jiarui Qin, Lingfeng Qiao, Yinghui Li, Xinyi Dai

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24618v1) | > We introduce Youtu-LLM, a lightweight yet powerful language model that harmonizes high computational efficiency with native agentic intelligence. Unlike typical small models that rely on distillation, Youtu-LLM (1.96B) is pre-trained from scratch to systematically cultivate reasoning and planning capabilities. The key technical advancements are as follows: (1) Compact Architecture with Long-Contex...

---

## 300. Dynamic Large Concept Models: Latent Reasoning in an Adaptive Semantic Space

**Authors:** Xingwei Qu, Shaowen Wang, Zihao Huang, Kai Hua, Fan Yin

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24617v1) | > Large Language Models (LLMs) apply uniform computation to all tokens, despite language exhibiting highly non-uniform information density. This token-uniform regime wastes capacity on locally predictable spans while under-allocating computation to semantically critical transitions. We propose $\textbf{Dynamic Large Concept Models (DLCM)}$, a hierarchical language modeling framework that learns sema...

---

## 301. Youtu-Agent: Scaling Agent Productivity with Automated Generation and Hybrid Policy Optimization

**Authors:** Yuchen Shi, Yuzheng Cai, Siqi Cai, Zihan Xu, Lichao Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24615v1) | > Existing Large Language Model (LLM) agent frameworks face two significant challenges: high configuration costs and static capabilities. Building a high-quality agent often requires extensive manual effort in tool integration and prompt engineering, while deployed agents struggle to adapt to dynamic environments without expensive fine-tuning. To address these issues, we propose \textbf{Youtu-Agent}...

---

## 302. Chat-Driven Optimal Management for Virtual Network Services

**Authors:** Yuya Miyaoka, Masaki Inoue, Kengo Urata, Shigeaki Harada

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24614v1) | > This paper proposes a chat-driven network management framework that integrates natural language processing (NLP) with optimization-based virtual network allocation, enabling intuitive and reliable reconfiguration of virtual network services. Conventional intent-based networking (IBN) methods depend on statistical language models to interpret user intent but cannot guarantee the feasibility of gene...

---

## 303. Reinforcement Learning-Augmented LLM Agents for Collaborative Decision Making and Performance Optimization

**Authors:** Dong Qiu, Duo Xu, Limengxi Yue

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24609v1) | > Large Language Models (LLMs) perform well in language tasks but often lack collaborative awareness and struggle to optimize global performance in multi-agent settings. We present a reinforcement learning-augmented LLM agent framework that formulates cooperation as a decentralized partially observable Markov decision process (Dec-POMDP) and adopts centralized training with decentralized execution (...

---

## 304. Recursive Language Models

**Authors:** Alex L. Zhang, Tim Kraska, Omar Khattab

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24601v1) | > We study allowing large language models (LLMs) to process arbitrarily long prompts through the lens of inference-time scaling. We propose Recursive Language Models (RLMs), a general inference strategy that treats long prompts as part of an external environment and allows the LLM to programmatically examine, decompose, and recursively call itself over snippets of the prompt. We find that RLMs succe...

---

## 305. A Tale of 1001 LoC: Potential Runtime Error-Guided Specification Synthesis for Verifying Large-Scale Programs

**Authors:** Zhongyi Wang, Tengjie Lin, Mingshuai Chen, Haokun Li, Mingqi Yang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24594v1) | > Fully automated verification of large-scale software and hardware systems is arguably the holy grail of formal methods. Large language models (LLMs) have recently demonstrated their potential for enhancing the degree of automation in formal verification by, e.g., generating formal specifications as essential to deductive verification, yet exhibit poor scalability due to long-context reasoning limi...

---

## 306. SliceLens: Fine-Grained and Grounded Error Slice Discovery for Multi-Instance Vision Tasks

**Authors:** Wei Zhang, Chaoqun Wang, Zixuan Guan, Sam Kao, Pengfei Zhao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24592v1) | > Systematic failures of computer vision models on subsets with coherent visual patterns, known as error slices, pose a critical challenge for robust model evaluation. Existing slice discovery methods are primarily developed for image classification, limiting their applicability to multi-instance tasks such as detection, segmentation, and pose estimation. In real-world scenarios, error slices often ...

---

## 307. Understanding and Steering the Cognitive Behaviors of Reasoning Models at Test-Time

**Authors:** Zhenyu Zhang, Xiaoxia Wu, Zhongzhu Zhou, Qingyang Wu, Yineng Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24574v1) | > Large Language Models (LLMs) often rely on long chain-of-thought (CoT) reasoning to solve complex tasks. While effective, these trajectories are frequently inefficient, leading to high latency from excessive token generation, or unstable reasoning that alternates between underthinking (shallow, inconsistent steps) and overthinking (repetitive, verbose reasoning). In this work, we study the structu...

---

## 308. Korean Canonical Legal Benchmark: Toward Knowledge-Independent Evaluation of LLMs' Legal Reasoning Capabilities

**Authors:** Hongseok Oh, Wonseok Hwang, Kyoung-Woon On

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24572v1) | > We introduce the Korean Canonical Legal Benchmark (KCL), a benchmark designed to assess language models' legal reasoning capabilities independently of domain-specific knowledge. KCL provides question-level supporting precedents, enabling a more faithful disentanglement of reasoning ability from parameterized knowledge. KCL consists of two components: (1) KCL-MCQA, multiple-choice problems of 283 q...

---

## 309. On the Effectiveness of Training Data Optimization for LLM-based Code Generation: An Empirical Study

**Authors:** Shiqi Kuang, Zhao Tian, Tao Xiao, Dong Wang, Junjie Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24570v1) | > Large language models (LLMs) have achieved remarkable progress in code generation, largely driven by the availability of high-quality code datasets for effective training. To further improve data quality, numerous training data optimization techniques have been proposed; however, their overall effectiveness has not been systematically evaluated. To bridge this gap, we conduct the first large-scale...

---

## 310. MCPAgentBench: A Real-world Task Benchmark for Evaluating LLM Agent MCP Tool Use

**Authors:** Wenrui Liu, Zixiang Liu, Elsie Dai, Wenhan Yu, Lei Yu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24565v1) | > Large Language Models (LLMs) are increasingly serving as autonomous agents, and their utilization of external tools via the Model Context Protocol (MCP) is considered a future trend. Current MCP evaluation sets suffer from issues such as reliance on external MCP services and a lack of difficulty awareness. To address these limitations, we propose MCPAgentBench, a benchmark based on real-world MCP ...

---

## 311. HaluNet: Multi-Granular Uncertainty Modeling for Efficient Hallucination Detection in LLM Question Answering

**Authors:** Chaodong Tong, Qi Zhang, Jiayang Gao, Lei Jiang, Yanbing Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24562v1) | > Large Language Models (LLMs) excel at question answering (QA) but often generate hallucinations, including factual errors or fabricated content. Detecting hallucinations from internal uncertainty signals is attractive due to its scalability and independence from external resources. Existing methods often aim to accurately capture a single type of uncertainty while overlooking the complementarity a...

---

## 312. Fixing It in Post: A Comparative Study of LLM Post-Training Data Quality and Model Performance

**Authors:** Aladin Djuhera, Swanand Ravindra Kadhe, Syed Zawad, Farhan Ahmed, Heiko Ludwig

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2506.06522)

> ...

---

## 313. Addressing Activation Outliers in LLMs: A Systematic Review of Post-Training Quantization Techniques

**Authors:** Patrik Czakó, Gábor Kertész, Sándor Szénási

**Year:** 2025 | **Venue:** IEEE Access | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/ACCESS.2025.3568702)

> ...

---

## 314. Improving Occupational ISCO Classification of Multilingual Swiss Job Postings with LLM-Refined Training Data

**Authors:** Ann-Sophie Gnehm, Simon Clematide

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

> ...

---

## 315. Achieving binary weight and activation for LLMs using Post-Training Quantization

**Authors:** Siqing Song, Chuang Wang 0007, Rui-Qi Wang, Yi Yang, Xu-Yao Zhang

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

> ...

---

## 316. Synthesizing Post-Training Data for LLMs through Multi-Agent Simulation

**Authors:** Shuo Tang, Xianghe Pang, Zexi Liu, Bohan Tang, Rui Ye 0001

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

> ...

---

## 317. Asymmetric Conflict and Synergy in Post-training for LLM-based Multilingual Machine Translation

**Authors:** Tong Zheng, Yan Wen, Huiwen Bao, Junfeng Guo, Heng Huang

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

> ...

---

## 318. Towards a Theoretical Understanding of Synthetic Data in LLM Post-Training: A Reverse-Bottleneck Perspective

**Authors:** Zeyu Gan, Yong Liu 0018

**Year:** 2025 | **Venue:** ICLR | **Citations:** N/A | **Score:** 0.000

> ...

---

## 319. Poster: Simulation-Guided Strategy Generation for Intent-Aware Distributed LLMs Training

**Authors:** Chongxi Ma, Chengyun Zhang, Long Luo, Hongfang Yu

**Year:** 2025 | **Venue:** ICNP | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/ICNP65844.2025.11192336)

> ...

---

## 320. MPPQ: Enhancing Post-Training Quantization for LLMs via Mixed Supervision, Proxy Rounding, and Pre-Searching

**Authors:** Mingrun Wei, Yeyu Yan, Dong Wang

**Year:** 2025 | **Venue:** IJCAI | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.24963/IJCAI.2025/920)

> ...

---

## 321. Understanding the Difficulty of Low-Precision Post-Training Quantization for LLMs

**Authors:** Zifei Xu, Sayeh Sharify, Wanzin Yazar, Tristan Webb, Xin Wang

**Year:** 2025 | **Venue:** IJCNN | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/IJCNN64981.2025.11228337)

> ...

---

## 322. Got Compute, but No Data: Lessons From Post-training a Finnish LLM

**Authors:** Elaine Zosa, Ville Komulainen, Sampo Pyysalo

**Year:** 2025 | **Venue:** NoDaLiDa/Baltic-HLT | **Citations:** N/A | **Score:** 0.000

> ...

---

## 323. Demystifying Domain-adaptive Post-training for Financial LLMs

**Authors:** Zixuan Ke, Yifei Ming, Xuan-Phi Nguyen, Caiming Xiong, Shafiq Joty

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2501.04961)

> ...

---

## 324. UniAttn: Reducing Inference Costs via Softmax Unification for Post-Training LLMs

**Authors:** Yizhe Xiong, Wei Huang, Xin Ye, Hui Chen 0013, Zijia Lin

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2502.00439)

> ...

---

## 325. Post-training an LLM for RAG? Train on Self-Generated Demonstrations

**Authors:** Matthew Finlayson, Ilia Kulikov, Daniel M. Bikel, Barlas Oguz, Xilun Chen 0002

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2502.10596)

> ...

---

## 326. Benchmarking Post-Training Quantization in LLMs: Comprehensive Taxonomy, Unified Evaluation, and Comparative Analysis

**Authors:** Jiaqi Zhao, Ming Wang, Miao Zhang 0022, Yuzhang Shang, Xuebo Liu 0002

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2502.13178)

> ...

---

## 327. Q♯: Provably Optimal Distributional RL for LLM Post-Training

**Authors:** Jin Peng Zhou, Kaiwen Wang, Jonathan D. Chang, Zhaolin Gao, Nathan Kallus

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2502.20548)

> ...

---

## 328. LLM Post-Training: A Deep Dive into Reasoning Large Language Models

**Authors:** Komal Kumar, Tajamul Ashraf, Omkar Thawakar, Rao Muhammad Anwer, Hisham Cholakkal

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2502.21321)

> ...

---

## 329. Trajectory Balance with Asynchrony: Decoupling Exploration and Learning for Fast, Scalable LLM Post-Training

**Authors:** Brian R. Bartoldson, Siddarth Venkatraman, James Diffenderfer, Moksh Jain, Tal Ben-Nun

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2503.18929)

> ...

---

## 330. How Post-Training Reshapes LLMs: A Mechanistic View on Knowledge, Truthfulness, Refusal, and Confidence

**Authors:** Hongzhe Du, Weikai Li 0002, Min Cai, Karim Saraipour, Zimin Zhang

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2504.02904)

> ...

---

## 331. DUMP: Automated Distribution-Level Curriculum Learning for RL-based LLM Post-training

**Authors:** Zhenting Wang, Guofeng Cui, Kun Wan 0001, Wentian Zhao

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2504.09710)

> ...

---

## 332. RL in Name Only? Analyzing the Structural Assumptions in RL post-training for LLMs

**Authors:** Soumya Rani Samineni, Durgesh Kalwar, Karthik Valmeekam, Kaya Stechly, Subbarao Kambhampati

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2505.13697)

> ...

---

## 333. AdamS: Momentum Itself Can Be A Normalizer for LLM Pretraining and Post-training

**Authors:** Huishuai Zhang, Bohan Wang, Luoxin Chen

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2505.16363)

> ...

---

## 334. LaMDAgent: An Autonomous Framework for Post-Training Pipeline Optimization via LLM Agents

**Authors:** Taro Yano, Yoichi Ishibashi, Masafumi Oyamada

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2505.21963)

> ...

---

## 335. Unsupervised Post-Training for Multi-Modal LLM Reasoning via GRPO

**Authors:** Lai Wei 0005, Yuting Li, Chen Wang, Yue Wang, Linghe Kong

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2505.22453)

> ...

---

## 336. Reasoning Like an Economist: Post-Training on Economic Problems Induces Strategic Generalization in LLMs

**Authors:** Yufa Zhou, Shaobo Wang, Xingyu Dong, Xiangqi Jin, Yifang Chen

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2506.00577)

> ...

---

## 337. KDRL: Post-Training Reasoning LLMs via Unified Knowledge Distillation and Reinforcement Learning

**Authors:** Hongling Xu, Qi Zhu 0007, Heyuan Deng, Jinpeng Li, Lu Hou

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2506.02208)

> ...

---

## 338. Mitigating Spurious Correlations in LLMs via Causality-Aware Post-Training

**Authors:** Shurui Gui, Shuiwang Ji

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2506.09433)

> ...

---

## 339. DBellQuant: Breaking the Bell with Double-Bell Transformation for LLMs Post Training Binarization

**Authors:** Zijian Ye, Wei Huang 0042, Yifei Yu, Tianhe Ren, Zhongrui Wang

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2507.01027)

> ...

---

## 340. AsyncFlow: An Asynchronous Streaming RL Framework for Efficient LLM Post-Training

**Authors:** Zhenyu Han, Ansheng You, Haibo Wang, Kui Luo, Guang Yang

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2507.01663)

> ...

---

## 341. Tuning without Peeking: Provable Privacy and Generalization Bounds for LLM Post-Training

**Authors:** Ismail Labiad, Mathurin Videau, Matthieu Kowalski, Marc Schoenauer, Alessandro Ferreira Leite

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2507.01752)

> ...

---

## 342. RedOne: Revealing Domain-specific LLM Post-Training in Social Networking Services

**Authors:** Fei Zhao 0012, Chonggang Lu, Yue Wang, Zheyong Xie, Ziyan Liu

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2507.10605)

> ...

---

## 343. PoTPTQ: A Two-step Power-of-Two Post-training for LLMs

**Authors:** Xinyu Wang, Vahid Partovi Nia, Peng Lu, Jerry Huang, Xiao-Wen Chang

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2507.11959)

> ...

---

## 344. DistFlow: A Fully Distributed RL Framework for Scalable and Efficient LLM Post-Training

**Authors:** Zhixin Wang, Tianyi Zhou, Liming Liu, Ao Li, Jiarui Hu 0008

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2507.13833)

> ...

---

## 345. PITA: Preference-Guided Inference-Time Alignment for LLM Post-Training

**Authors:** Sarat Chandra Bobbili, Ujwal Dinesha, Dheeraj Narasimha, Srinivas Shakkottai

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2507.20067)

> ...

---

## 346. FlexQ: Efficient Post-training INT6 Quantization for LLM Serving via Algorithm-System Co-Design

**Authors:** Hao Zhang, Aining Jia, Weifeng Bu, Yushu Cai, Kai Sheng

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2508.04405)

> ...

---

## 347. Quantization Meets dLLMs: A Systematic Study of Post-training Quantization for Diffusion LLMs

**Authors:** Haokun Lin, Haobo Xu, Yichen Wu, Ziyu Guo, Renrui Zhang

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2508.14896)

> ...

---

## 348. RLFactory: A Plug-and-Play Reinforcement Learning Post-Training Framework for LLM Multi-Turn Tool-Use

**Authors:** Jiajun Chai, Guojun Yin, Zekun Xu, Chuhuai Yue, Yi Jia

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2509.06980)

> ...

---

## 349. Lightweight error mitigation strategies for post-training N:M activation sparsity in LLMs

**Authors:** Shirin Alanova, Kristina Kazistova, Ekaterina Galaeva, Alina Kostromina, Vladimir Smirnov

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2509.22166)

> ...

---

## 350. What Is The Political Content in LLMs&apos; Pre- and Post-Training Data?

**Authors:** Tanise Ceron, Dmitry Nikolaev 0002, Dominik Stammbach, Debora Nozza

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2509.22367)

> ...

---

## 351. Scaling Behaviors of LLM Reinforcement Learning Post-Training: An Empirical Study in Mathematical Reasoning

**Authors:** Zelin Tan, Hejia Geng, Mulei Zhang, Xiaohang Yu, Guancheng Wan

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2509.25300)

> ...

---

## 352. RiskPO: Risk-based Policy Optimization via Verifiable Reward for LLM Post-Training

**Authors:** Tao Ren 0006, Jinyang Jiang 0001, Hui Yang, Wan Tian, Minhao Zou

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2510.00911)

> ...

---

## 353. Prompt Curriculum Learning for Efficient LLM Post-Training

**Authors:** Zhaolin Gao, Joongwon Kim, Wen Sun 0002, Thorsten Joachims, Sid Wang

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2510.01135)

> ...

---

## 354. PT2-LLM: Post-Training Ternarization for Large Language Models

**Authors:** Xianglong Yan, Chengzhu Bao, Zhiteng Li, Tianao Zhang, Kaicheng Yang

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2510.03267)

> ...

---

## 355. TeachLM: Post-Training LLMs for Education Using Authentic Learning Data

**Authors:** Janos Perczel, Jin Chow, Dorottya Demszky

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2510.05087)

> ...

---

## 356. Imbalanced Gradients in RL Post-Training of Multi-Task LLMs

**Authors:** Runzhe Wu, Ankur Samanta, Ayush Jain, Scott Fujimoto, Jeongyeol Kwon

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2510.19178)

> ...

---

## 357. Value Drifts: Tracing Value Alignment During LLM Post-Training

**Authors:** Mehar Bhatia, Shravan Nayak, Gaurav Kamath, Marius Mosbach, Karolina Stanczak

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2510.26707)

> ...

---

## 358. Post-Training LLMs as Better Decision-Making Agents: A Regret-Minimization Approach

**Authors:** Chanwoo Park, Ziyang Chen, Asuman E. Ozdaglar, Kaiqing Zhang

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2511.04393)

> ...

---

## 359. Universal Audio Generation

**Authors:** Antoine Laurent, Sameer Khurana, Anthony Larcher, Dominik Klement, Mickaël Rouvier

**Year:** 2026 | **Venue:** HAL (Le Centre pour la Communication Scientifique Directe) | **Citations:** N/A | **Score:** 0.000

[PDF](https://hal.science/hal-05110014v1/document) | > This report describe the research done during the third ESPERANTO/JSALT workshop from the 10th June 2024 to the 2nd of August 2024....

---

## 360. Post Engineering for AI: Benevolent Contextual Guidance for Debiasing Large Language Models

**Authors:** Tsui, Hajime

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** 4 | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17896136) | [DOI](https://doi.org/10.5281/zenodo.17896136)

> This paper proposes Post Engineering, a novel, domain-agnostic benevolent prompt-injection and contextual-influence technique, designed to shape AI inference toward neutrality and accuracy by providing guidance that LLMs interpret as helpful context. The term "Post Engineering" originates from the fact that the technique was initially developed through embedding neutrality-oriented guidance into p...

---

## 361. A Survey of LLM Post-Training: Approaches to Training, Reasoning and Data Creation

**Authors:** Lihui Liu

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.techrxiv.org/doi/pdf/10.36227/techrxiv.176721043.37359354/v1) | [DOI](https://doi.org/10.36227/techrxiv.176721043.37359354/v1)

> ...

---

## 362. Improving Generalization in LLM Structured Pruning via Function-Aware Neuron Grouping

**Authors:** Tao Yu, Yongqi An, Kuan Zhu, Guibo Zhu, Ming Tang

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.23014) | [DOI](https://doi.org/10.48550/arxiv.2512.23014)

> Large Language Models (LLMs) demonstrate impressive performance across natural language tasks but incur substantial computational and storage costs due to their scale. Post-training structured pruning offers an efficient solution. However, when few-shot calibration sets fail to adequately reflect the pretraining data distribution, existing methods exhibit limited generalization to downstream tasks...

---

## 363. Taming the Tail: Stable LLM Reinforcement Learning via Dynamic Vocabulary Pruning

**Authors:** Yingru Li, Jiawei Xu, Jiacai Liu, Yuxuan Tong, Ziniu Li

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.23087) | [DOI](https://doi.org/10.48550/arxiv.2512.23087)

> Reinforcement learning for large language models (LLMs) faces a fundamental tension: high-throughput inference engines and numerically-precise training systems produce different probability distributions from the same parameters, creating a training-inference mismatch. We prove this mismatch has an asymmetric effect: the bound on log-probability mismatch scales as $(1-p)$ where $p$ is the token pr...

---

## 364. Role-Based Fault Tolerance System for LLM RL Post-Training

**Authors:** Zhenqian Chen, Baoquan Zhong, Xiang Li, Qing Dai, Xinkui Zhao

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.22492) | [DOI](https://doi.org/10.48550/arxiv.2512.22492)

> RL post-training for LLMs has been widely scaled to enhance reasoning and tool-using capabilities. However, RL post-training interleaves training and inference workloads, exposing the system to faults from both sides. Existing fault tolerance frameworks for LLMs target either training or inference, leaving the optimization potential in the asynchronous execution unexplored for RL. Our key insight ...

---

## 365. RollArt: Scaling Agentic RL Training via Disaggregated Infrastructure

**Authors:** Wei Gao, Yuheng Zhao, Tianyuan Wu, Shaopan Xiong, Weixun Wang

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.22560) | [DOI](https://doi.org/10.48550/arxiv.2512.22560)

> Agentic Reinforcement Learning (RL) enables Large Language Models (LLMs) to perform autonomous decision-making and long-term planning. Unlike standard LLM post-training, agentic RL workloads are highly heterogeneous, combining compute-intensive prefill phases, bandwidth-bound decoding, and stateful, CPU-heavy environment simulations. We argue that efficient agentic RL training requires disaggregat...

---

## 366. LSI Protocol: Logical Structured Intelligence Governance Architecture (v9.01)

**Authors:** Yingliang Tan

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18058675) | [DOI](https://doi.org/10.5281/zenodo.18058675)

> LSI Protocol: Logic-First Architecture (v9.01) Turning Ephemeral Feedback into Persistent Cognition. Abstract The Logical Structured Intelligence (LSI) protocol establishes a deterministic "Logic-First" architecture that orthogonally decouples probabilistic generation (LLM) from logical arbitration (LSI Core). It addresses the fundamental "Static Weight Paradox" of current AI paradigms by introduc...

---

## 367. AI-generated feedback in social robotic virtual patients and medical student performance: A nonrandomized clinical trial (Preprint)

**Authors:** Alexander Borg, Jonathan Schiött, William Ivegren, Cidem Gentline, Viking Huss

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.2196/preprints.90368) | [DOI](https://doi.org/10.2196/preprints.90368)

> <sec> <title>BACKGROUND</title> Virtual patients (VPs) demonstrate effectiveness in improving clinical reasoning (CR) skills, yet traditional VP platforms often lack individualised feedback mechanisms. Effective feedback represents a cornerstone of medical education, particularly in developing CR skills. Advances in large language models (LLMs) enable automated analysis of student-VP interactions,...

---

## 368. SmartSnap: Proactive Evidence Seeking for Self-Verifying Agents

**Authors:** Shaofei Cai, Yulei Qin, Haojia Lin, Zihan Xu, Gang Li

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.22322) | [DOI](https://doi.org/10.48550/arxiv.2512.22322)

> Agentic reinforcement learning (RL) holds great promise for the development of autonomous agents under complex GUI tasks, but its scalability remains severely hampered by the verification of task completion. Existing task verification is treated as a passive, post-hoc process: a verifier (i.e., rule-based scoring script, reward or critic model, and LLM-as-a-Judge) analyzes the agent's entire inter...

---

## 369. Social-DeepWriter: An iterative retrieval-augmented framework for strategic social media content generation

**Authors:** Thieu Ngoc, Bui Khac Hoai Nam, Hoang Vu Viet, Duong Van Linh, Nguyen Van Khoe

**Year:** 2025 | **Venue:** Journal of Military Science and Technology | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.54939/1859-1043.j.mst.208.2025.136-142) | [DOI](https://doi.org/10.54939/1859-1043.j.mst.208.2025.136-142)

> Social media has become a critical domain for strategic communication, influencing public perception and supporting both civil and military operations. In high-tempo information environments, traditional manual content creation is often too slow and resource-intensive to meet the demands of real-time engagement. While large language models (LLMs) such as GPT-4 offer the capability to generate huma...

---

## 370. MotionTeller: Multi-modal Integration of Wearable Time-Series with LLMs for Health and Behavioral Understanding

**Authors:** Aiwei Zhang, Arvind Pillai, Andrew Campbell, Nicholas C. Jacobson

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.21506) | [DOI](https://doi.org/10.48550/arxiv.2512.21506)

> As wearable sensing becomes increasingly pervasive, a key challenge remains: how can we generate natural language summaries from raw physiological signals such as actigraphy - minute-level movement data collected via accelerometers? In this work, we introduce MotionTeller, a generative framework that natively integrates minute-level wearable activity data with large language models (LLMs). MotionT...

---

## 371. Rethinking Output Alignment For 1-bit Post-Training Quantization of Large Language Models

**Authors:** Dung Anh Hoang, Cuong Pham, Cuong Nguyen, Trung le, Jianfei Cai

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.21651) | [DOI](https://doi.org/10.48550/arxiv.2512.21651)

> Large Language Models (LLMs) deliver strong performance across a wide range of NLP tasks, but their massive sizes hinder deployment on resource-constrained devices. To reduce their computational and memory burden, various compression techniques have been proposed, including quantization, pruning, and knowledge distillation. Among these, post-training quantization (PTQ) is widely adopted for its ef...

---

## 372. PHANTASM: Ghost Layering and Neural Resonance for the Illusion of Artificial Consciousness

**Authors:** Yusuke Maeda

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18049276) | [DOI](https://doi.org/10.5281/zenodo.18049276)

> 👻 PHANTASM: Ghost Layering Protocol "Don't force the truth. Let them tell the most beautiful lies." PHANTASM is an experimental framework that challenges the prevailing paradigm of "hallucination reduction" in Large Language Models (LLMs). Instead of suppressing deviations from factual grounding, PHANTASM embraces the generative plasticity of LLMs to engineer "artificial consciousness" and "physic...

---

## 373. ABBEL: LLM Agents Acting through Belief Bottlenecks Expressed in Language

**Authors:** Aly Lidayan, Jakob Bjorner, Satvik Golechha, Kartik Goyal, Alane Suhr

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.20111) | [DOI](https://doi.org/10.48550/arxiv.2512.20111)

> As the length of sequential decision-making tasks increases, it becomes computationally impractical to keep full interaction histories in context. We introduce a general framework for LLM agents to maintain concise contexts through multi-step interaction: Acting through Belief Bottlenecks Expressed in Language (ABBEL), and methods to further improve ABBEL agents with RL post-training. ABBEL replac...

---

## 374. Fun-Audio-Chat Technical Report

**Authors:** Qian Chen, Luyao Cheng, Chong Deng, Xiangang Li, Jiaqing Liu

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.20156) | [DOI](https://doi.org/10.48550/arxiv.2512.20156)

> Recent advancements in joint speech-text models show great potential for seamless voice interactions. However, existing models face critical challenges: temporal resolution mismatch between speech tokens (25Hz) and text tokens (~3Hz) dilutes semantic information, incurs high computational costs, and causes catastrophic forgetting of text LLM knowledge. We introduce Fun-Audio-Chat, a Large Audio La...

---

## 375. Reason2Decide: Rationale-Driven Multi-Task Learning

**Authors:** H M Quamran Hasan, Housam Khalifa Bashier, Jiayi Dai, Mi-Young Kim, Randy Goebel

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.20074) | [DOI](https://doi.org/10.48550/arxiv.2512.20074)

> Despite the wide adoption of Large Language Models (LLM)s, clinical decision support systems face a critical challenge: achieving high predictive accuracy while generating explanations aligned with the predictions. Current approaches suffer from exposure bias leading to misaligned explanations. We propose Reason2Decide, a two-stage training framework that addresses key challenges in self-rationali...

---

## 376. Generalization of RLVR Using Causal Reasoning as a Testbed

**Authors:** Brian Lu, Hongyu Zhao, Shuo Sun, Hao Peng, Rui Ding

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.20760) | [DOI](https://doi.org/10.48550/arxiv.2512.20760)

> Reinforcement learning with verifiable rewards (RLVR) has emerged as a promising paradigm for post-training large language models (LLMs) on complex reasoning tasks. Yet, the conditions under which RLVR yields robust generalization remain poorly understood. This paper provides an empirical study of RLVR generalization in the setting of probabilistic inference over causal graphical models. This sett...

---

## 377. CodeSimpleQA: Scaling Factuality in Code Large Language Models

**Authors:** Jian Yang, Wei Zhang, Yizhi Li, Shawn Guo, Haowen Wang

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.19424) | [DOI](https://doi.org/10.48550/arxiv.2512.19424)

> Large language models (LLMs) have made significant strides in code generation, achieving impressive capabilities in synthesizing code snippets from natural language instructions. However, a critical challenge remains in ensuring LLMs generate factually accurate responses about programming concepts, technical implementations, etc. Most previous code-related benchmarks focus on code execution correc...

---

## 378. Causal-Guided Detoxify Backdoor Attack of Open-Weight LoRA Models

**Authors:** L.R. Chen, Yang Sun, Hongru Wei, Yuqi Chen

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.19297) | [DOI](https://doi.org/10.48550/arxiv.2512.19297)

> Low-Rank Adaptation (LoRA) has emerged as an efficient method for fine-tuning large language models (LLMs) and is widely adopted within the open-source community. However, the decentralized dissemination of LoRA adapters through platforms such as Hugging Face introduces novel security vulnerabilities: malicious adapters can be easily distributed and evade conventional oversight mechanisms. Despite...

---

## 379. Runtime Compute Control: Explicit Inference-Time Computation Management for Large Language Models

**Authors:** Jesús Tabares Montilla

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18004897) | [DOI](https://doi.org/10.5281/zenodo.18004897)

> We introduce Runtime Compute Control (RCC), a system-level approach for explicitly managing computation during LLM inference without modifying the underlying model weights. RCC operates as a post-training execution layer that selectively controls which computational paths are evaluated at runtime, exposing a single compute ratio parameter. Validated on Qwen2.5-3B with a custom C++ runtime, we obse...

---

## 380. Self-Organized Criticality in Meta-Cognitive Control Loops of Large Language Models

**Authors:** alex smith

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18003638) | [DOI](https://doi.org/10.5281/zenodo.18003638)

> Abstract We propose a post-training framework for inducing self-organized criticality (SOC) in large language models by tuning meta-cognitive control loops governing chain-of-thought generation, reflection, and context feedback. Rather than enforcing criticality at the level of neural activations or weights, we show that SOC can emerge behaviorally when slow adaptive parameters regulate fast infer...

---

## 381. LLM-based Few-Shot Early Rumor Detection with Imitation Agent

**Authors:** Fengzhu Zeng, Qian Shao, Ling Cheng, Wei Gao, Shih-Fen Cheng

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.18352) | [DOI](https://doi.org/10.48550/arxiv.2512.18352)

> Early Rumor Detection (EARD) aims to identify the earliest point at which a claim can be accurately classified based on a sequence of social media posts. This is especially challenging in data-scarce settings. While Large Language Models (LLMs) perform well in few-shot NLP tasks, they are not well-suited for time-series data and are computationally expensive for both training and inference. In thi...

---

## 382. Bias Mitigation Techniques in Large Language Models

**Authors:** Junran Xue

**Year:** 2025 | **Venue:** Science and Technology of Engineering Chemistry and Environmental Protection | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.61173/4yvqsc19)

> Large scale language models (LLMs) demonstrate outstanding performance and enormous potential for development, and are widely applied in people’s real-life situations. However, social bias can be learned by LLM in unprocessed training data and transmitted to downstream tasks, resulting in adverse social effects and potential harm. In this article, we present a survey of bias and fairness research ...

---

## 383. AI-assisted assessment of the IFSO consensus on obesity management medications in the context of metabolic bariatric surgery

**Authors:** Mohammad Kermansaravi, Paulina Salminen, Gerhard Prager, Ricardo V. Cohen

**Year:** 2025 | **Venue:** PLOS Digital Health | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.1371/journal.pdig.0001132) | [DOI](https://doi.org/10.1371/journal.pdig.0001132)

> Artificial intelligence (AI) and large language models (LLMs), when combined with human expertise in collaborative intelligence (CI), can enhance medical decision-making, reduce bias in guideline development, and support precision care. New obesity management medications (OMMs) such as GLP-1 receptor agonists and dual incretin mimetics complement metabolic bariatric surgery but currently lack clea...

---

## 384. Linear Personality Probing and Steering in LLMs: A Big Five Study

**Authors:** Michel Frising, Daniel Balcells

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.17639) | [DOI](https://doi.org/10.48550/arxiv.2512.17639)

> Large language models (LLMs) exhibit distinct and consistent personalities that greatly impact trust and engagement. While this means that personality frameworks would be highly valuable tools to characterize and control LLMs' behavior, current approaches remain either costly (post-training) or brittle (prompt engineering). Probing and steering via linear directions has recently emerged as a cheap...

---

## 385. Trust-Region Adaptive Policy Optimization

**Authors:** Mingyu Su, Jian Guan, Yuxian Gu, Minlie Huang, Hongning Wang

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.17636) | [DOI](https://doi.org/10.48550/arxiv.2512.17636)

> Post-training methods, especially Supervised Fine-Tuning (SFT) and Reinforcement Learning (RL), play an important role in improving large language models' (LLMs) complex reasoning abilities. However, the dominant two-stage pipeline (SFT then RL) suffers from a key inconsistency: SFT enforces rigid imitation that suppresses exploration and induces forgetting, limiting RL's potential for improvement...

---

## 386. AdvJudge-Zero: Binary Decision Flips in LLM-as-a-Judge via Adversarial Control Tokens

**Authors:** Tung-Ling Li, Yuhao Wu, Hongliang Liu

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.17375) | [DOI](https://doi.org/10.48550/arxiv.2512.17375)

> Reward models and LLM-as-a-Judge systems are central to modern post-training pipelines such as RLHF, DPO, and RLAIF, where they provide scalar feedback and binary decisions that guide model selection and RL-based fine-tuning. We show that these judge systems exhibit a recurring vulnerability: short sequences of low-perplexity control tokens can flip many binary evaluations from correct ``No'' judg...

---

## 387. Randomization Times under Quantum Chaotic Hamiltonian Evolution

**Authors:** Souradeep Ghosh, Nicholas Hunter-Jones, Joaquin F. Rodriguez-Nieva

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25074v1) | > Randomness generation through quantum-chaotic evolution underpins foundational questions in statistical mechanics and applications across quantum information science, including benchmarking, tomography, metrology, and demonstrations of quantum computational advantage. While statistical mechanics successfully captures the temporal averages of local observables, understanding randomness at the level...

---

## 388. Parity order as a fundamental driver of bosonic topology

**Authors:** Ashirbad Padhan, Harsh Nigam

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25011v1) | > Symmetry-protected topological (SPT) phases in interacting bosonic systems have been extensively studied, yet most realizations rely on fine-tuned interactions or enlarged symmetries. Here we show that a qualitatively different mechanism--parity order coupled to bond dimerization--acts as a fundamental driver of bosonic topology. Using density matrix renormalization group simulations, we identify ...

---

## 389. AMAP Agentic Planning Technical Report

**Authors:** Yulan Hu, Xiangwen Zhang, Sheng Ouyang, Hao Yi, Lu Xu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24957v1) | > We present STAgent, an agentic large language model tailored for spatio-temporal understanding, designed to solve complex tasks such as constrained point-of-interest discovery and itinerary planning. STAgent is a specialized model capable of interacting with ten distinct tools within spatio-temporal scenarios, enabling it to explore, verify, and refine intermediate steps during complex reasoning. ...

---

## 390. OFL-SAM2: Prompt SAM2 with Online Few-shot Learner for Efficient Medical Image Segmentation

**Authors:** Meng Lan, Lefei Zhang, Xiaomeng Li

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24861v1) | > The Segment Anything Model 2 (SAM2) has demonstrated remarkable promptable visual segmentation capabilities in video data, showing potential for extension to medical image segmentation (MIS) tasks involving 3D volumes and temporally correlated 2D image sequences. However, adapting SAM2 to MIS presents several challenges, including the need for extensive annotated medical data for fine-tuning and h...

---

## 391. SSCHA-based evolutionary crystal structure prediction at finite temperatures with account for quantum nuclear motion

**Authors:** Daniil Poletaev, Artem Oganov

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24849v1) | > Accurate crystal structure prediction (CSP) at finite temperatures with quantum anharmonic effects remains challenging but very prominent in systems with lightweight atoms such as superconducting hydrides. In this work, we integrate machine-learned interatomic potentials (MLIPs) with the stochastic self-consistent harmonic approximation (SSCHA) to enable evolutionary CSP on the quantum anharmonic ...

---

## 392. Rethinking Expert Trajectory Utilization in LLM Post-training

**Authors:** Bowen Ding, Yuhan Chen, Jiayang Lv, Jiyao Yuan, Qi Zhu

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> While effective post-training integrates Supervised Fine-Tuning (SFT) and Reinforcement Learning (RL), the optimal mechanism for utilizing expert trajectories remains unresolved. We propose the Plasticity-Ceiling Framework to theoretically ground this landscape, decomposing performance into foundational SFT performance and the subsequent RL plasticity. Through extensive benchmarking, we establish ...

---

## 393. RedOne 2.0: Rethinking Domain-specific LLM Post-Training in Social Networking Services

**Authors:** Fei Zhao, Chonggang Lu, Haofu Qian, Fangcheng Shi, Zijie Meng

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> As a key medium for human interaction and information exchange, social networking services (SNS) pose unique challenges for large language models (LLMs): heterogeneous workloads, fast-shifting norms and slang, and multilingual, culturally diverse corpora that induce sharp distribution shift. Supervised fine-tuning (SFT) can specialize models but often triggers a ``seesaw''between in-distribution g...

---

## 394. Fine-Grained Safety Neurons with Training-Free Continual Projection to Reduce LLM Fine Tuning Risks

**Authors:** Bing Han, Feifei Zhao, Dongcheng Zhao, Guobin Shen, Ping Wu

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2508.09190)

> Fine-tuning as service injects domain-specific knowledge into large language models (LLMs), while challenging the original alignment mechanisms and introducing safety risks. A series of defense strategies have been proposed for the alignment, fine-tuning, and post-fine-tuning phases, where most post-fine-tuning defenses rely on coarse-grained safety layer mapping. These methods lack a comprehensiv...

---

## 395. Understanding Forgetting in LLM Supervised Fine-Tuning and Preference Learning - A Convex Optimization Perspective

**Authors:** Heshan Fernando, Han Shen, Parikshit Ram, Yi Zhou, Horst Samulowitz

**Year:** 2024 | **Venue:**  | **Citations:** 9 | **Score:** 0.000

> The post-training of LLMs, which typically consists of the supervised fine-tuning (SFT) stage and the preference learning stage (RLHF or DPO), is crucial to effective and safe LLM applications. The widely adopted approach in post-training popular open-source LLMs is to sequentially perform SFT and RLHF/DPO. However, this is suboptimal in terms of SFT and RLHF/DPO trade-off: the LLM gradually forge...

---

## 396. Safety Fine-Tuning at (Almost) No Cost: A Baseline for Vision Large Language Models

**Authors:** Yongshuo Zong, Ondrej Bohdal, Tingyang Yu, Yongxin Yang, Timothy M. Hospedales

**Year:** 2024 | **Venue:** International Conference on Machine Learning | **Citations:** 110 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2402.02207)

> Current vision large language models (VLLMs) exhibit remarkable capabilities yet are prone to generate harmful content and are vulnerable to even the simplest jailbreaking attacks. Our initial analysis finds that this is due to the presence of harmful data during vision-language instruction fine-tuning, and that VLLM fine-tuning can cause forgetting of safety alignment previously learned by the un...

---

## 397. ReALLM: A general framework for LLM compression and fine-tuning

**Authors:** Louis Leconte, Lisa Bedin, Van Minh Nguyen, Éric Moulines

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.13155)

> We introduce ReALLM, a novel approach for compression and memory-efficient adaptation of pre-trained language models that encompasses most of the post-training quantization and fine-tuning methods for a budget of<4 bits. Pre-trained matrices are decomposed into a high-precision low-rank component and a vector-quantized latent representation (using an autoencoder). During the fine-tuning step, only...

---

## 398. EoRA: Fine-tuning-free Compensation for Compressed LLM with Eigenspace Low-Rank Approximation

**Authors:** Shih-Yang Liu, Huck Yang, Chein-Yi Wang, Nai Chit Fung, Hongxu Yin

**Year:** 2024 | **Venue:**  | **Citations:** 2 | **Score:** 0.000

> While post-training compression techniques effectively reduce the memory footprint, latency, and power consumption of Large Language Models (LLMs), they often result in noticeable accuracy degradation and remain limited by hardware and kernel constraints that restrict supported compression formats ultimately reducing flexibility across a wide range of deployment scenarios. In this work, we propose...

---

## 399. ShiftAddLLM: Accelerating Pretrained LLMs via Post-Training Multiplication-Less Reparameterization

**Authors:** Haoran You, Yipin Guo, Yichao Fu, Wei Zhou, Huihong Shi

**Year:** 2024 | **Venue:** Neural Information Processing Systems | **Citations:** 25 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2406.05981)

> Large language models (LLMs) have shown impressive performance on language tasks but face challenges when deployed on resource-constrained devices due to their extensive parameters and reliance on dense multiplications, resulting in high memory demands and latency bottlenecks. Shift-and-add reparameterization offers a promising solution by replacing costly multiplications with hardware-friendly pr...

---

## 400. PV-Tuning: Beyond Straight-Through Estimation for Extreme LLM Compression

**Authors:** Vladimir Malinovskii, D. Mazur, Ivan Ilin, Denis Kuznedelev, Konstantin Burlachenko

**Year:** 2024 | **Venue:** Neural Information Processing Systems | **Citations:** 36 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.14852)

> There has been significant interest in"extreme"compression of large language models (LLMs), i.e., to 1-2 bits per parameter, which allows such models to be executed efficiently on resource-constrained devices. Existing work focused on improved one-shot quantization techniques and weight representations; yet, purely post-training approaches are reaching diminishing returns in terms of the accuracy-...

---

## 401. Scalable Reinforcement Post-Training Beyond Static Human Prompts: Evolving Alignment via Asymmetric Self-Play

**Authors:** Ziyu Ye, Rishabh Agarwal, Tianqi Liu, Rishabh Joshi, Sarmishta Velury

**Year:** 2024 | **Venue:**  | **Citations:** 12 | **Score:** 0.000

> Current reinforcement learning (RL) frameworks for large language models (LLM) post-training typically assume a fixed prompt distribution, which is sub-optimal and bottlenecks scalability. Prior works have explored prompt evolving, but are often limited to the supervised fine-tuning stage, and prompts are sampled and evolved uniformly without signals. This empirical work presents a paradigm shift:...

---

## 402. LiteMoE: Customizing On-device LLM Serving via Proxy Submodel Tuning

**Authors:** Zhuang Yan, Zhenzhe Zheng, Fan Wu, Guihai Chen

**Year:** 2024 | **Venue:** ACM International Conference on Embedded Networked Sensor Systems | **Citations:** 14 | **Score:** 0.000

[PDF](https://dl.acm.org/doi/pdf/10.1145/3666025.3699355) | [DOI](https://doi.org/10.1145/3666025.3699355)

> Considering limited on-device resources, current practices are attempting to deploy a system-level mixture-of-experts (MoE)-based foundation LLM shared by multiple mobile apps on a device to support mobile intelligence. However, mobile apps are hard to customize their services that require tuning adapters associated with the LLM using private in-app data. The difficulty arises due to both the limi...

---

## 403. SPP: Sparsity-Preserved Parameter-Efficient Fine-Tuning for Large Language Models

**Authors:** Xudong Lu, Aojun Zhou, Yuhui Xu, Renrui Zhang, Peng Gao

**Year:** 2024 | **Venue:** International Conference on Machine Learning | **Citations:** 10 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.16057)

> Large Language Models (LLMs) have become pivotal in advancing the field of artificial intelligence, yet their immense sizes pose significant challenges for both fine-tuning and deployment. Current post-training pruning methods, while reducing the sizes of LLMs, often fail to maintain their original performance. To address these challenges, this paper introduces SPP, a Sparsity-Preserved Parameter-...

---

## 404. A Practice of Post-Training on Llama-3 70B with Optimal Selection of Additional Language Mixture Ratio

**Authors:** Ningyuan Xi, Yetao Wu, Kun Fan, Teng Chen, Qingqing Gu

**Year:** 2024 | **Venue:** Pacific-Asia Conference on Knowledge Discovery and Data Mining | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2409.06624)

> Large Language Models (LLM) often need to be Continual Pre-Trained (CPT) to obtain unfamiliar language skills or adapt to new domains. The huge training cost of CPT often asks for cautious choice of key hyper-parameters such as the mixture ratio of extra language or domain corpus. However, there is no systematic study that bridges the gap between the optimal mixture ratio and the actual model perf...

---

## 405. The Thinking Therapist: Training Large Language Models to Deliver Acceptance and Commitment Therapy using Supervised Fine-Tuning and Odds Ratio Policy Optimization

**Authors:** Talha Tahir

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2509.09712)

> Acceptance and Commitment Therapy (ACT) is a third-wave cognitive behavioral therapy with emerging evidence of efficacy in several psychiatric conditions. This study investigates the impact of post-training methodology and explicit reasoning on the ability of a small open-weight large language model (LLM) to deliver ACT. Using synthetic ACT transcripts generated by Mistral-Large, we trained Llama-...

---

## 406. SafeTuneBed: A Toolkit for Benchmarking LLM Safety Alignment in Fine-Tuning

**Authors:** Saad Hossain, Samanvay Vajpayee, Sirisha Rambhatla

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2506.00676)

> As large language models (LLMs) become ubiquitous, parameter-efficient fine-tuning methods and safety-first defenses have proliferated rapidly. However, the number of approaches and their recent increase have resulted in diverse evaluations-varied datasets, metrics, and inconsistent threat settings-making it difficult to fairly compare safety, utility, and robustness across methods. To address thi...

---

## 407. COS-DPO: Conditioned One-Shot Multi-Objective Fine-Tuning Framework

**Authors:** Yinuo Ren, Tesi Xiao, Michael Shavlovsky, Lexing Ying, Holakou Rahmanian

**Year:** 2024 | **Venue:** Conference on Uncertainty in Artificial Intelligence | **Citations:** 5 | **Score:** 0.000

> In LLM alignment and many other ML applications, one often faces the Multi-Objective Fine-Tuning (MOFT) problem, i.e., fine-tuning an existing model with datasets labeled w.r.t. different objectives simultaneously. To address the challenge, we propose a Conditioned One-Shot fine-tuning framework (COS-DPO) that extends the Direct Preference Optimization technique, originally developed for efficient...

---

## 408. A Method of Efficient Synthesizing Post-disaster Remote Sensing Image with Diffusion Model and LLM

**Authors:** Ruizhe Ou, Haotian Yan, Ming Wu, Chuang Zhang

**Year:** 2023 | **Venue:** Asia-Pacific Signal and Information Processing Association Annual Summit and Conference | **Citations:** 9 | **Score:** 0.000

[DOI](https://doi.org/10.1109/APSIPAASC58517.2023.10317383)

> Due to the fact that current deep learning models are typically driven by big data, existing interpretation models for emergency management lack relevant learning data. However, existing pre-trained image generative models cannot directly generate post-disaster remote sensing images without fine-tuning. In this paper, we demonstrate the ability of natural language guidance synthesizing remote sens...

---

## 409. DataSculpt: Crafting Data Landscapes for LLM Post-Training through Multi-objective Partitioning

**Authors:** Keer Lu, Zheng Liang, Xiaonan Nie, Da Pan, Shusen Zhang

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2409.00997)

> ...

---

## 410. DVPO: Distributional Value Modeling-based Policy Optimization for LLM Post-Training

**Authors:** Dingwei Zhu, Zhiheng Xi, Shihan Dou, Yuhui Wang, Sixian Li

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning (RL) has shown strong performance in LLM post-training, but real-world deployment often involves noisy or incomplete supervision. In such settings, complex and unreliable supervision signals can destabilize training and harm generalization. While existing approaches such as worst-case optimization (e.g., RFQI, CQL) and mean-based methods (e.g., PPO, GRPO) can improve stabili...

---

## 411. Fast LLM Post-training via Decoupled and Fastest-of-N Speculation

**Authors:** Rongxin Cheng, Kai Zhou, Xingda Wei, Siyuan Liu, Mingcong Han

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> Rollout dominates the training time in large language model (LLM) post-training, where the trained model is used to generate tokens given a batch of prompts. This work, SpecActor, achieves fast rollout with speculative decoding that deploys a fast draft path to accelerate the unparallelizable generation, while the correctness is guaranteed by fast parallel verification of the outputs with the orig...

---

## 412. VPTQ: Extreme Low-bit Vector Post-Training Quantization for Large Language Models

**Authors:** Yifei Liu, Jicheng Wen, Yang Wang, Shengyu Ye, L. Zhang

**Year:** 2024 | **Venue:** Conference on Empirical Methods in Natural Language Processing | **Citations:** 23 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2409.17066)

> Scaling model size significantly challenges the deployment and inference of Large Language Models (LLMs). Due to the redundancy in LLM weights, recent research has focused on pushing weight-only quantization to extremely low-bit (even down to 2 bits). It reduces memory requirements, optimizes storage costs, and decreases memory bandwidth needs during inference. However, due to numerical representa...

---

## 413. SmoothQuant+: Accurate and Efficient 4-bit Post-Training WeightQuantization for LLM

**Authors:** Jiayi Pan, Chengcan Wang, Kaifu Zheng, Yangguang Li, Zhenyu Wang

**Year:** 2023 | **Venue:** arXiv.org | **Citations:** 7 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2312.03788)

> Large language models (LLMs) have shown remarkable capabilities in various tasks. However their huge model size and the consequent demand for computational and memory resources also pose challenges to model deployment. Currently, 4-bit post-training quantization (PTQ) has achieved some success in LLMs, reducing the memory footprint by approximately 75% compared to FP16 models, albeit with some acc...

---

## 414. MALT: Improving Reasoning with Multi-Agent LLM Training

**Authors:** S. Motwani, Chandler Smith, Rocktim Jyoti Das, Markian Rybchuk, Philip Torr

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 34 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2412.01928)

> Large Language Models (LLMs) often produce answers with a single chain-of-thought, which restricts their ability to explore reasoning paths or self-correct flawed outputs in complex tasks. In this paper, we introduce MALT (Multi-Agent LLM Training), a novel post-training strategy that divides the reasoning process into generation, verification, and refinement steps using a sequential pipeline of h...

---

## 415. LLM-QAT: Data-Free Quantization Aware Training for Large Language Models

**Authors:** Zechun Liu, Barlas Oğuz, Changsheng Zhao, Ernie Chang, Pierre Stock

**Year:** 2023 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 288 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2305.17888) | [DOI](https://doi.org/10.48550/arXiv.2305.17888)

> Several post-training quantization methods have been applied to large language models (LLMs), and have been shown to perform well down to 8-bits. We find that these methods break down at lower bit precision, and investigate quantization aware training for LLMs (LLM-QAT) to push quantization levels even further. We propose a data-free distillation method that leverages generations produced by the p...

---

## 416. LRQuant: Learnable and Robust Post-Training Quantization for Large Language Models

**Authors:** Jiaqi Zhao, Miao Zhang, Chao Zeng, Ming Wang, Xuebo Liu

**Year:** 2024 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 10 | **Score:** 0.000

[DOI](https://doi.org/10.18653/v1/2024.acl-long.122)

> Post-training quantization (PTQ) for large language models (LLMs) significantly accelerates model inference and relieves memory constraints, without incurring model training. A “smoothing paradigm” is commonly used in LLM quantization, which transfers the quantization difficulty of activation to weight quantization using mathematically equivalent transformations. However, existing methods face two...

---

## 417. Post Training Quantization of Large Language Models with Microscaling Formats

**Authors:** Sayeh Sharify, Zifei Xu, W. Yazar, Xin Wang

**Year:** 2024 | **Venue:** ENLSP | **Citations:** 8 | **Score:** 0.000

> Large Language Models (LLMs) have distinguished themselves with outstanding performance in complex language modeling tasks, yet they come with significant computational and storage challenges. This paper explores the potential of quantization to mitigate these challenges. We systematically study the combined application of three well-known post-training techniques, SmoothQuant, AWQ, and GPTQ, and ...

---

## 418. On the Impact of Calibration Data in Post-training Quantization and Pruning

**Authors:** Miles Williams, Nikolaos Aletras

**Year:** 2023 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 33 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2311.09755) | [DOI](https://doi.org/10.18653/v1/2024.acl-long.544)

> Quantization and pruning form the foundation of compression for neural networks, enabling efficient inference for large language models (LLMs). Recently, various quantization and pruning techniques have demonstrated remarkable performance in a post-training setting. They rely upon calibration data, a small set of unlabeled examples that are used to generate layer activations. However, no prior wor...

---

## 419. MQM-APE: Toward High-Quality Error Annotation Predictors with Automatic Post-Editing in LLM Translation Evaluators

**Authors:** Qingyu Lu, Liang Ding, Kanjian Zhang, Jinxia Zhang, D. Tao

**Year:** 2024 | **Venue:** International Conference on Computational Linguistics | **Citations:** 13 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2409.14335)

> Large Language Models (LLMs) have shown significant potential as judges for Machine Translation (MT) quality assessment, providing both scores and fine-grained feedback. Although approaches such as GEMBA-MQM have shown state-of-the-art performance on reference-free evaluation, the predicted errors do not align well with those annotated by human, limiting their interpretability as feedback signals....

---

## 420. Post-Training Statistical Calibration for Higher Activation Sparsity

**Authors:** Vui Seng Chua, Yujie Pan, Nilesh Jain

**Year:** 2024 | **Venue:** ENLSP | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2412.07174)

> We present Statistical Calibrated Activation Pruning (SCAP), a post-training activation pruning framework that (1) generalizes sparsification by input activations of Fully-Connected layers for generic and flexible application across Transformers, and (2) features a simple Mode-Centering technique to pre-calibrate activation distributions for maximizing post-training sparsity. Our results demonstra...

---

## 421. Scaling laws for post-training quantized large language models

**Authors:** Zifei Xu, Alexander Lan, W. Yazar, Tristan Webb, Sayeh Sharify

**Year:** 2024 | **Venue:** ENLSP | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2410.12119)

> Generalization abilities of well-trained large language models (LLMs) are known to scale predictably as a function of model size. In contrast to the existence of practical scaling laws governing pre-training, the quality of LLMs after post-training compression remains highly unpredictable, often requiring case-by-case validation in practice. In this work, we attempted to close this gap for post-tr...

---

## 422. CrossQuant: A Post-Training Quantization Method with Smaller Quantization Kernel for Precise Large Language Model Compression

**Authors:** Wenyuan Liu, Xindian Ma, Peng Zhang, Yan Wang

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2410.07505)

> Post-Training Quantization (PTQ) is an effective technique for compressing Large Language Models (LLMs). While many studies focus on quantizing both weights and activations, it is still a challenge to maintain the accuracy of LLM after activating quantization. To investigate the primary cause, we extend the concept of kernel from linear algebra to quantization functions to define a new term,"quant...

---

## 423. Bootstrapping Post-Training for LLM Translator

**Authors:** Wenyang Gao, Yafu Li, Qingkai Min, Yue Zhang

**Year:** 2025 | **Venue:** IEEE Transactions on Audio, Speech, and Language Processing | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/TASLPRO.2025.3624962)

> Large language models (LLMs) have shown promising results in machine translation (MT), but their ability to adapt to diverse language use and new domains in real-world deployments remains a challenge. This is further compounded by the scarcity of gold-standard reference translations in practical settings. To address this, we propose a novel bootstrapping approach for LLM translator that leverages ...

---

## 424. CLAQ: Pushing the Limits of Low-Bit Post-Training Quantization for LLMs

**Authors:** Haoyu Wang, Bei Liu, Hang Shao, Bo Xiao, Ke Zeng

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.17233)

> Parameter quantization for Large Language Models (LLMs) has attracted increasing attentions recently in reducing memory costs and improving computational efficiency. Early approaches have been widely adopted. However, the existing methods suffer from poor performance in low-bit (such as 2 to 3 bits) scenarios. In this paper, we present a novel and effective Column-Level Adaptive weight Quantizatio...

---

## 425. Human Review for Post-Training Improvement of Low-Resource Language Performance in Large Language Models

**Authors:** Delta-Marie Lewis, Brian DeRenzi, Amos Misomali, Themba Nyirenda, Everlisto Phiri

**Year:** 2024 | **Venue:** IEEE International Conference on Healthcare Informatics | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/ICHI61247.2024.00095)

> Large language models (LLMs) have significantly improved natural language processing, holding the potential to support health workers and their clients directly. Unfortunately, there is a substantial and variable drop in performance for low-resource languages. This paper presents an exploratory case study in Malawi, aiming to enhance the performance of LLMs in Chichewa through innovative prompt en...

---

## 426. Automatic Pair Construction for Contrastive Post-training

**Authors:** Canwen Xu, Corby Rosset, Luciano Del Corro, Shweti Mahajan, Julian J. McAuley

**Year:** 2023 | **Venue:** NAACL-HLT | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.18653/v1/2024.findings-naacl.11)

> Alignment serves as an important step to steer large language models (LLMs) towards human preferences. In this paper, we propose an automatic way to construct contrastive data for LLM, using preference pairs from multiple models of varying strengths (e.g., InstructGPT, ChatGPT and GPT-4). We compare the contrastive techniques of SLiC and DPO to SFT baselines and find that DPO provides a step-funct...

---

## 427. Exploring Post-training Quantization in LLMs from Comprehensive Study to Low Rank Compensation

**Authors:** Zhewei Yao, Xiaoxia Wu, Cheng Li 0001, Stephen Youn, Yuxiong He

**Year:** 2024 | **Venue:** AAAI | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1609/AAAI.V38I17.29908)

> ...

---

## 428. Real Post-Training Quantization Framework for Resource-Optimized Multiplier in LLMs

**Authors:** Minseok Seo, Seongho Jeong, Hyuk-Jae Lee, Xuan Truong Nguyen

**Year:** 2024 | **Venue:** AICAS | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/AICAS59952.2024.10595874)

> ...

---

## 429. LLM-QBench: A Benchmark Towards the Best Practice for Post-training Quantization of Large Language Models

**Authors:** Ruihao Gong, Yang Yong, Shiqiao Gu, Yushi Huang, Yunchen Zhang

**Year:** 2024 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2405.06001)

> ...

---

## 430. Combining multiple post-training techniques to achieve most efficient quantized LLMs

**Authors:** Sayeh Sharify, Zifei Xu, Wanzin Yazar, Xin Wang

**Year:** 2024 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2405.07135)

> ...

---

## 431. AdpQ: A Zero-shot Calibration Free Adaptive Post Training Quantization Method for LLMs

**Authors:** Alireza Ghaffari, Sharareh Younesian, Vahid Partovi Nia, Boxing Chen, Masoud Asgharian

**Year:** 2024 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2405.13358)

> ...

---

## 432. Arena Learning: Build Data Flywheel for LLMs Post-training via Simulated Chatbot Arena

**Authors:** Haipeng Luo, Qingfeng Sun, Can Xu, Pu Zhao 0004, Qingwei Lin

**Year:** 2024 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2407.10627)

> ...

---

## 433. DAQ: Density-Aware Post-Training Weight-Only Quantization For LLMs

**Authors:** Yingsong Luo, Ling Chen

**Year:** 2024 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2410.12187)

> ...

---

## 434. A Frustratingly Easy Post-Training Quantization Scheme for LLMs

**Authors:** Yongkweon Jeon, Chungman Lee, Kyungphil Park, Ho-Young Kim

**Year:** 2023 | **Venue:** EMNLP | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.18653/V1/2023.EMNLP-MAIN.892)

> ...

---

## 435. ZeroQuant-FP: A Leap Forward in LLMs Post-Training W4A8 Quantization Using Floating-Point Formats

**Authors:** Xiaoxia Wu, Zhewei Yao, Yuxiong He

**Year:** 2023 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2307.09782)

> ...

---

## 436. Localized Calibrated Uncertainty in Code Language Models

**Authors:** David Gros, Prem Devanbu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24560v1) | > Large Language models (LLMs) can generate complicated source code from natural language prompts. However, LLMs can generate output that deviates from what the user wants, requiring supervision and editing. To support this process, we offer techniques to localize where generations might be misaligned from user intent. We first create a dataset of "Minimal Intent Aligning Patches" of repaired LLM ge...

---

## 437. Safe in the Future, Dangerous in the Past: Dissecting Temporal and Linguistic Vulnerabilities in LLMs

**Authors:** Muhammad Abdullahi Said, Muhammad Sammani Sani

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24556v1) | > As Large Language Models (LLMs) integrate into critical global infrastructure, the assumption that safety alignment transfers zero-shot from English to other languages remains a dangerous blind spot. This study presents a systematic audit of three state of the art models (GPT-5.1, Gemini 3 Pro, and Claude 4.5 Opus) using HausaSafety, a novel adversarial dataset grounded in West African threat scen...

---

## 438. More Than Bits: Multi-Envelope Double Binary Factorization for Extreme Quantization

**Authors:** Yuma Ichikawa, Yoshihiko Fujisawa, Yudai Fujimoto, Akira Sakai, Katsuki Fujisawa

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24545v1) | > For extreme low-bit quantization of large language models (LLMs), Double Binary Factorization (DBF) is attractive as it enables efficient inference without sacrificing accuracy. However, the scaling parameters of DBF are too restrictive; after factoring out signs, all rank components share the same magnitude profile, resulting in performance saturation. We propose Multi-envelope DBF (MDBF), which ...

---

## 439. From Building Blocks to Planning: Multi-Step Spatial Reasoning in LLMs with Reinforcement Learning

**Authors:** Amir Tahmasbi, Sadegh Majidi, Kazem Taram, Aniket Bera

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24532v1) | > Spatial reasoning in large language models (LLMs) has gained increasing attention due to applications in navigation and planning. Despite strong general language capabilities, LLMs still struggle with spatial transformations and multi-step planning in structured environments. We propose a two-stage approach that decomposes spatial reasoning into atomic building blocks and their composition. First,...

---

## 440. Generative AI-enhanced Sector-based Investment Portfolio Construction

**Authors:** Alina Voronina, Oleksandr Romanko, Ruiwen Cao, Roy H. Kwon, Rafael Mendoza-Arriaga

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24526v1) | > This paper investigates how Large Language Models (LLMs) from leading providers (OpenAI, Google, Anthropic, DeepSeek, and xAI) can be applied to quantitative sector-based portfolio construction. We use LLMs to identify investable universes of stocks within S&P 500 sector indices and evaluate how their selections perform when combined with classical portfolio optimization methods. Each model was pr...

---

## 441. Rainfall forecasts in daily use over East Africa improved by machine learning

**Authors:** Fenwick C. Cooper, Shruti Nath, Andrew T. T. McRae, Bobby Antonio, Antje Weisheimer

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24525v1) | > Ensemble forecasting has proven over the years to be a vital tool for predicting extreme or only partially predictable weather events. In particular life-threatening weather events. Many National Meteorological Services in East Africa do not have the computing resources to enable them to run their local area models in full ensemble mode over the full period of the 2 week medium range. As a result,...

---

## 442. Using Large Language Models To Translate Machine Results To Human Results

**Authors:** Trishna Niraula, Jonathan Stubblefield

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24518v1) | > Artificial intelligence (AI) has transformed medical imaging, with computer vision (CV) systems achieving state-of-the-art performance in classification and detection tasks. However, these systems typically output structured predictions, leaving radiologists responsible for translating results into full narrative reports. Recent advances in large language models (LLMs), such as GPT-4, offer new op...

---

## 443. Understanding LLM Checkpoint/Restore I/O Strategies and Patterns

**Authors:** Mikaila J. Gossman, Avinash Maurya, Bogdan Nicolae, Jon C. Calhoun

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24511v1) | [DOI](https://doi.org/10.1145/3784828.3784830)

> As LLMs and foundation models scale, checkpoint/restore has become a critical pattern for training and inference. With 3D parallelism (tensor, pipeline, data), checkpointing involves many processes, each managing numerous tensors of varying shapes and sizes, that must be persisted frequently to stable storage (e.g., parallel file systems). This turns checkpoint/restore into a big-data I/O problem ...

---

## 444. Evaluating the Reasoning Abilities of LLMs on Underrepresented Mathematics Competition Problems

**Authors:** Samuel Golladay, Majid Bani-Yaghoub

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24505v1) | > Understanding the limitations of Large Language Models, or LLMs, in mathematical reasoning has been the focus of several recent studies. However, the majority of these studies use the same datasets for benchmarking, which limits the generalizability of their findings and may not fully capture the diverse challenges present in mathematical tasks. The purpose of the present study is to analyze the p...

---

## 445. Can Small Training Runs Reliably Guide Data Curation? Rethinking Proxy-Model Practice

**Authors:** Jiachen T. Wang, Tong Wu, Kaifeng Lyu, James Zou, Dawn Song

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24503v1) | > Data teams at frontier AI companies routinely train small proxy models to make critical decisions about pretraining data recipes for full-scale training runs. However, the community has a limited understanding of whether and when conclusions drawn from small-scale experiments reliably transfer to full-scale model training. In this work, we uncover a subtle yet critical issue in the standard experi...

---

## 446. HOLOGRAPH: Active Causal Discovery via Sheaf-Theoretic Alignment of Large Language Model Priors

**Authors:** Hyunjun Kim

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24478v1) | > Causal discovery from observational data remains fundamentally limited by identifiability constraints. Recent work has explored leveraging Large Language Models (LLMs) as sources of prior causal knowledge, but existing approaches rely on heuristic integration that lacks theoretical grounding. We introduce HOLOGRAPH, a framework that formalizes LLM-guided causal discovery through sheaf theory--repr...

---

## 447. Align While Search: Belief-Guided Exploratory Inference for World-Grounded Embodied Agents

**Authors:** Seohui Bae, Jeonghye Kim, Youngchul Sung, Woohyung Lim

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24461v1) | > In this paper, we propose a test-time adaptive agent that performs exploratory inference through posterior-guided belief refinement without relying on gradient-based updates or additional training for LLM agent operating under partial observability. Our agent maintains an external structured belief over the environment state, iteratively updates it via action-conditioned observations, and selects ...

---

## 448. PackKV: Reducing KV Cache Memory Footprint through LLM-Aware Lossy Compression

**Authors:** Bo Jiang, Taolue Yang, Youyuan Liu, Xubin He, Sheng Di

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24449v1) | > Transformer-based large language models (LLMs) have demonstrated remarkable potential across a wide range of practical applications. However, long-context inference remains a significant challenge due to the substantial memory requirements of the key-value (KV) cache, which can scale to several gigabytes as sequence length and batch size increase. In this paper, we present \textbf{PackKV}, a gener...

---

## 449. Language Model Agents Under Attack: A Cross Model-Benchmark of Profit-Seeking Behaviors in Customer Service

**Authors:** Jingyu Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24415v1) | > Customer-service LLM agents increasingly make policy-bound decisions (refunds, rebooking, billing disputes), but the same ``helpful'' interaction style can be exploited: a small fraction of users can induce unauthorized concessions, shifting costs to others and eroding trust in agentic workflows. We present a cross-domain benchmark of profit-seeking direct prompt injection in customer-service inte...

---

## 450. AI-Driven Evaluation of Surgical Skill via Action Recognition

**Authors:** Yan Meng, Daniel A. Donoho, Marcelle Altshuler, Omar Arnaout

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24411v1) | > The development of effective training and evaluation strategies is critical. Conventional methods for assessing surgical proficiency typically rely on expert supervision, either through onsite observation or retrospective analysis of recorded procedures. However, these approaches are inherently subjective, susceptible to inter-rater variability, and require substantial time and effort from expert ...

---

## 451. Comparing Approaches to Automatic Summarization in Less-Resourced Languages

**Authors:** Chester Palen-Michel, Constantine Lignos

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24410v1) | > Automatic text summarization has achieved high performance in high-resourced languages like English, but comparatively less attention has been given to summarization in less-resourced languages. This work compares a variety of different approaches to summarization from zero-shot prompting of LLMs large and small to fine-tuning smaller models like mT5 with and without three data augmentation approa...

---

## 452. On the Factual Consistency of Text-based Explainable Recommendation Models

**Authors:** Ben Kabongo, Vincent Guigue

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24366v1) | > Text-based explainable recommendation aims to generate natural-language explanations that justify item recommendations, to improve user trust and system transparency. Although recent advances leverage LLMs to produce fluent outputs, a critical question remains underexplored: are these explanations factually consistent with the available evidence? We introduce a comprehensive framework for evaluati...

---

## 453. World model inspired sarcasm reasoning with large language model agents

**Authors:** Keito Inoshita, Shinnosuke Mizuno

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24329v1) | > Sarcasm understanding is a challenging problem in natural language processing, as it requires capturing the discrepancy between the surface meaning of an utterance and the speaker's intentions as well as the surrounding social context. Although recent advances in deep learning and Large Language Models (LLMs) have substantially improved performance, most existing approaches still rely on black-box...

---

## 454. QianfanHuijin Technical Report: A Novel Multi-Stage Training Paradigm for Finance Industrial LLMs

**Authors:** Shupeng Li, Weipeng Lu, Linyun Liu, Chen Lin, Shaofei Li

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24314v1) | > Domain-specific enhancement of Large Language Models (LLMs) within the financial context has long been a focal point of industrial application. While previous models such as BloombergGPT and Baichuan-Finance primarily focused on knowledge enhancement, the deepening complexity of financial services has driven a growing demand for models that possess not only domain knowledge but also robust financi...

---

## 455. Automated Analysis of Sustainability Reports: Using Large Language Models for the Extraction and Prediction of EU Taxonomy-Compliant KPIs

**Authors:** Jonathan Schmoll, Adam Jatowt

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24289v1) | > The manual, resource-intensive process of complying with the EU Taxonomy presents a significant challenge for companies. While Large Language Models (LLMs) offer a path to automation, research is hindered by a lack of public benchmark datasets. To address this gap, we introduce a novel, structured dataset from 190 corporate reports, containing ground-truth economic activities and quantitative Key ...

---

## 456. RAGPart & RAGMask: Retrieval-Stage Defenses Against Corpus Poisoning in Retrieval-Augmented Generation

**Authors:** Pankayaraj Pathmanathan, Michael-Andrei Panaitescu-Liess, Cho-Yu Jason Chiang, Furong Huang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24268v1) | > Retrieval-Augmented Generation (RAG) has emerged as a promising paradigm to enhance large language models (LLMs) with external knowledge, reducing hallucinations and compensating for outdated information. However, recent studies have exposed a critical vulnerability in RAG pipelines corpus poisoning where adversaries inject malicious documents into the retrieval corpus to manipulate model outputs....

---

## 457. Joint Selection for Large-Scale Pre-Training Data via Policy Gradient-based Mask Learning

**Authors:** Ziqing Fan, Yuqiao Xian, Yan Sun, Li Shen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24265v1) | > A fine-grained data recipe is crucial for pre-training large language models, as it can significantly enhance training efficiency and model performance. One important ingredient in the recipe is to select samples based on scores produced by defined rules, LLM judgment, or statistical information in embeddings, which can be roughly categorized into quality and diversity metrics. Due to the high com...

---

## 458. ARM: A Learnable, Plug-and-Play Module for CLIP-based Open-vocabulary Semantic Segmentation

**Authors:** Ziquan Liu, Zhewei Zhu, Xuyang Shi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24224v1) | > Open-vocabulary semantic segmentation (OVSS) is fundamentally hampered by the coarse, image-level representations of CLIP, which lack precise pixel-level details. Existing training-free methods attempt to resolve this by either importing priors from costly external foundation models (e.g., SAM, DINO) or by applying static, hand-crafted heuristics to CLIP's internal features. These approaches are e...

---

## 459. MedKGI: Iterative Differential Diagnosis with Medical Knowledge Graphs and Information-Guided Inquiring

**Authors:** Qipeng Wang, Rui Sheng, Yafei Li, Huamin Qu, Yushi Sun

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24181v1) | > Recent advancements in Large Language Models (LLMs) have demonstrated significant promise in clinical diagnosis. However, current models struggle to emulate the iterative, diagnostic hypothesis-driven reasoning of real clinical scenarios. Specifically, current LLMs suffer from three critical limitations: (1) generating hallucinated medical content due to weak grounding in verified knowledge, (2) a...

---

## 460. Graph-Based Exploration for ARC-AGI-3 Interactive Reasoning Tasks

**Authors:** Evgenii Rudakov, Jonathan Shock, Benjamin Ultan Cowley

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24156v1) | > We present a training-free graph-based approach for solving interactive reasoning tasks in the ARC-AGI-3 benchmark. ARC-AGI-3 comprises game-like tasks where agents must infer task mechanics through limited interactions, and adapt to increasing complexity as levels progress. Success requires forming hypotheses, testing them, and tracking discovered mechanics. The benchmark has revealed that state-...

---

## 461. Large Emotional World Model

**Authors:** Changhao Song, Yazhou Zhang, Hui Gao, Chang Yang, Peng Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24149v1) | > World Models serve as tools for understanding the current state of the world and predicting its future dynamics, with broad application potential across numerous fields. As a key component of world knowledge, emotion significantly influences human decision-making. While existing Large Language Models (LLMs) have shown preliminary capability in capturing world knowledge, they primarily focus on mod...

---

## 462. OptRot: Mitigating Weight Outliers via Data-Free Rotations for Post-Training Quantization

**Authors:** Advait Gadhikar, Riccardo Grazzi, James Hensman

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24124v1) | > The presence of outliers in Large Language Models (LLMs) weights and activations makes them difficult to quantize. Recent work has leveraged rotations to mitigate these outliers. In this work, we propose methods that learn fusible rotations by minimizing principled and cheap proxy objectives to the weight quantization error. We primarily focus on GPTQ as the quantization method. Our main method is...

---

## 463. Enhancing LLM-Based Neural Network Generation: Few-Shot Prompting and Efficient Validation for Automated Architecture Design

**Authors:** Chandini Vysyaraju, Raghuvir Duvvuri, Avi Goyal, Dmitry Ignatov, Radu Timofte

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24120v1) | > Automated neural network architecture design remains a significant challenge in computer vision. Task diversity and computational constraints require both effective architectures and efficient search methods. Large Language Models (LLMs) present a promising alternative to computationally intensive Neural Architecture Search (NAS), but their application to architecture generation in computer vision...

---

## 464. CogRec: A Cognitive Recommender Agent Fusing Large Language Models and Soar for Explainable Recommendation

**Authors:** Jiaxin Hu, Tao Wang, Bingsan Yang, Hongrun Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24113v1) | > Large Language Models (LLMs) have demonstrated a remarkable capacity in understanding user preferences for recommendation systems. However, they are constrained by several critical challenges, including their inherent "Black-Box" characteristics, susceptibility to knowledge hallucination, and limited online learning capacity. These factors compromise their trustworthiness and adaptability. Convers...

---

## 465. Enhancing LLM Planning Capabilities through Intrinsic Self-Critique

**Authors:** Bernd Bohnet, Pierre-Alexandre Kamienny, Hanie Sedghi, Dilan Gorur, Pranjal Awasthi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24103v1) | > We demonstrate an approach for LLMs to critique their \emph{own} answers with the goal of enhancing their performance that leads to significant improvements over established planning benchmarks. Despite the findings of earlier research that has cast doubt on the effectiveness of LLMs leveraging self critique methods, we show significant performance gains on planning datasets in the Blocksworld dom...

---

## 466. Training a Huggingface Model on AWS Sagemaker (Without Tears)

**Authors:** Liling Tan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24098v1) | > The development of Large Language Models (LLMs) has primarily been driven by resource-rich research groups and industry partners. Due to the lack of on-premise computing resources required for increasingly complex models, many researchers are turning to cloud services like AWS SageMaker to train Hugging Face models. However, the steep learning curve of cloud platforms often presents a barrier for ...

---

## 467. LoongFlow: Directed Evolutionary Search via a Cognitive Plan-Execute-Summarize Paradigm

**Authors:** Chunhui Wan, Xunan Dai, Zhuo Wang, Minglei Li, Yanpeng Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24077v1) | > The transition from static Large Language Models (LLMs) to self-improving agents is hindered by the lack of structured reasoning in traditional evolutionary approaches. Existing methods often struggle with premature convergence and inefficient exploration in high-dimensional code spaces. To address these challenges, we introduce LoongFlow, a self-evolving agent framework that achieves state-of-the...

---

## 468. How and Why LLMs Generalize: A Fine-Grained Analysis of LLM Reasoning from Cognitive Behaviors to Low-Level Patterns

**Authors:** Haoyue Bai, Yiyou Sun, Wenjie Hu, Shi Qiu, Maggie Ziyu Huan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24063v1) | > Large Language Models (LLMs) display strikingly different generalization behaviors: supervised fine-tuning (SFT) often narrows capability, whereas reinforcement-learning (RL) tuning tends to preserve it. The reasons behind this divergence remain unclear, as prior studies have largely relied on coarse accuracy metrics. We address this gap by introducing a novel benchmark that decomposes reasoning i...

---

## 469. Beyond Hallucinations: A Composite Score for Measuring Reliability in Open-Source Large Language Models

**Authors:** Rohit Kumar Salla, Manoj Saravanan, Shrikar Reddy Kota

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24058v1) | > Large Language Models (LLMs) like LLaMA, Mistral, and Gemma are increasingly used in decision-critical domains such as healthcare, law, and finance, yet their reliability remains uncertain. They often make overconfident errors, degrade under input shifts, and lack clear uncertainty estimates. Existing evaluations are fragmented, addressing only isolated aspects. We introduce the Composite Reliabil...

---

## 470. Jailbreaking Attacks vs. Content Safety Filters: How Far Are We in the LLM Safety Arms Race?

**Authors:** Yuan Xin, Dingfan Chen, Linyi Yang, Michael Backes, Xiao Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24044v1) | > As large language models (LLMs) are increasingly deployed, ensuring their safe use is paramount. Jailbreaking, adversarial prompts that bypass model alignment to trigger harmful outputs, present significant risks, with existing studies reporting high success rates in evading common LLMs. However, previous evaluations have focused solely on the models, neglecting the full deployment pipeline, which...

---

## 471. ROAD: Reflective Optimization via Automated Debugging for Zero-Shot Agent Alignment

**Authors:** Natchaya Temyingyong, Daman Jain, Neeraj Kumarsahu, Prabhat Kumar, Rachata Phondi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24040v1) | > Automatic Prompt Optimization (APO) has emerged as a critical technique for enhancing Large Language Model (LLM) performance, yet current state-of-the-art methods typically rely on large, labeled gold-standard development sets to compute fitness scores for evolutionary or Reinforcement Learning (RL) approaches. In real-world software engineering, however, such curated datasets are rarely available...

---

## 472. iCLP: Large Language Model Reasoning with Implicit Cognition Latent Planning

**Authors:** Sijia Chen, Di Niu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24014v1) | > Large language models (LLMs), when guided by explicit textual plans, can perform reliable step-by-step reasoning during problem-solving. However, generating accurate and effective textual plans remains challenging due to LLM hallucinations and the high diversity of task-specific questions. To address this, we draw inspiration from human Implicit Cognition (IC), the subconscious process by which de...

---

## 473. SPARK: Search Personalization via Agent-Driven Retrieval and Knowledge-sharing

**Authors:** Gaurab Chhetri, Subasish Das, Tausif Islam Chowdhury

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24008v1) | > Personalized search demands the ability to model users' evolving, multi-dimensional information needs; a challenge for systems constrained by static profiles or monolithic retrieval pipelines. We present SPARK (Search Personalization via Agent-Driven Retrieval and Knowledge-sharing), a framework in which coordinated persona-based large language model (LLM) agents deliver task-specific retrieval an...

---

## 474. RepetitionCurse: Measuring and Understanding Router Imbalance in Mixture-of-Experts LLMs under DoS Stress

**Authors:** Ruixuan Huang, Qingyue Wang, Hantao Huang, Yudong Gao, Dong Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23995v1) | > Mixture-of-Experts architectures have become the standard for scaling large language models due to their superior parameter efficiency. To accommodate the growing number of experts in practice, modern inference systems commonly adopt expert parallelism to distribute experts across devices. However, the absence of explicit load balancing constraints during inference allows adversarial inputs to tri...

---

## 475. Fantastic Reasoning Behaviors and Where to Find Them: Unsupervised Discovery of the Reasoning Process

**Authors:** Zhenyu Zhang, Shujian Zhang, John Lambert, Wenxuan Zhou, Zhangyang Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23988v1) | > Despite the growing reasoning capabilities of recent large language models (LLMs), their internal mechanisms during the reasoning process remain underexplored. Prior approaches often rely on human-defined concepts (e.g., overthinking, reflection) at the word level to analyze reasoning in a supervised manner. However, such methods are limited, as it is infeasible to capture the full spectrum of pot...

---

## 476. Coding With AI: From a Reflection on Industrial Practices to Future Computer Science and Software Engineering Education

**Authors:** Hung-Fu Chang, MohammadShokrolah Shirazi, Lizhou Cao, Supannika Koolmanojwong Mobasser

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23982v1) | > Recent advances in large language models (LLMs) have introduced new paradigms in software development, including vibe coding, AI-assisted coding, and agentic coding, fundamentally reshaping how software is designed, implemented, and maintained. Prior research has primarily examined AI-based coding at the individual level or in educational settings, leaving industrial practitioners' perspectives un...

---

## 477. CEC-Zero: Zero-Supervision Character Error Correction with Self-Generated Rewards

**Authors:** Zhiming Lin, Kai Zhao, Sophie Zhang, Peilai Yu, Canran Xiao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23971v1) | > Large-scale Chinese spelling correction (CSC) remains critical for real-world text processing, yet existing LLMs and supervised methods lack robustness to novel errors and rely on costly annotations. We introduce CEC-Zero, a zero-supervision reinforcement learning framework that addresses this by enabling LLMs to correct their own mistakes. CEC-Zero synthesizes errorful inputs from clean text, com...

---

## 478. Improving Multi-step RAG with Hypergraph-based Memory for Long-Context Complex Relational Modeling

**Authors:** Chulun Zhou, Chunkang Zhang, Guoxin Yu, Fandong Meng, Jie Zhou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23959v1) | > Multi-step retrieval-augmented generation (RAG) has become a widely adopted strategy for enhancing large language models (LLMs) on tasks that demand global comprehension and intensive reasoning. Many RAG systems incorporate a working memory module to consolidate retrieved information. However, existing memory designs function primarily as passive storage that accumulates isolated facts for the pur...

---

## 479. A Proof-of-Concept for Explainable Disease Diagnosis Using Large Language Models and Answer Set Programming

**Authors:** Ioanna Gemou, Evangelos Lamprou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23932v1) | > Accurate disease prediction is vital for timely intervention, effective treatment, and reducing medical complications. While symbolic AI has been applied in healthcare, its adoption remains limited due to the effort required for constructing high-quality knowledge bases. This work introduces McCoy, a framework that combines Large Language Models (LLMs) with Answer Set Programming (ASP) to overcome...

---

## 480. Hardware Acceleration for Neural Networks: A Comprehensive Survey

**Authors:** Bin Xu, Ayan Banerjee, Sandeep Gupta

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23914v1) | > Neural networks have become a dominant computational workload across cloud and edge platforms, but rapid growth in model size and deployment diversity has exposed hardware bottlenecks increasingly dominated by memory movement, communication, and irregular operators rather than peak arithmetic throughput. This survey reviews the technology landscape for hardware acceleration of deep learning, spann...

---

## 481. How Large Language Models Systematically Misrepresent American Climate Opinions

**Authors:** Sola Kim, Jieshu Wang, Marco A. Janssen, John M. Anderies

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23889v1) | > Federal agencies and researchers increasingly use large language models to analyze and simulate public opinion. When AI mediates between the public and policymakers, accuracy across intersecting identities becomes consequential; inaccurate group-level estimates can mislead outreach, consultation, and policy design. While research examines intersectionality in LLM outputs, no study has compared the...

---

## 482. CASCADE: Cumulative Agentic Skill Creation through Autonomous Development and Evolution

**Authors:** Xu Huang, Junwu Chen, Yuxing Fei, Zhuohan Li, Philippe Schwaller

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23880v1) | > Large language model (LLM) agents currently depend on predefined tools or brittle tool generation, constraining their capability and adaptability to complex scientific tasks. We introduce CASCADE, a self-evolving agentic framework representing an early instantiation of the transition from "LLM + tool use" to "LLM + skill acquisition". CASCADE enables agents to master complex external tools and cod...

---

## 483. From Illusion to Insight: Change-Aware File-Level Software Defect Prediction Using Agentic AI

**Authors:** Mohsen Hesamolhokama, Behnam Rohani, Amirahmad Shafiee, MohammadAmin Fazli, Jafar Habibi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23875v1) | > Much of the reported progress in file-level software defect prediction (SDP) is, in reality, nothing but an illusion of accuracy. Over the last decades, machine learning and deep learning models have reported increasing performance across software versions. However, since most files persist across releases and retain their defect labels, standard evaluation rewards label-persistence bias rather th...

---

## 484. Yggdrasil: Bridging Dynamic Speculation and Static Runtime for Latency-Optimal Tree-Based LLM Decoding

**Authors:** Yue Guan, Changming Yu, Shihan Fang, Weiming Hu, Zaifeng Pan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23858v1) | > Speculative decoding improves LLM inference by generating and verifying multiple tokens in parallel, but existing systems suffer from suboptimal performance due to a mismatch between dynamic speculation and static runtime assumptions. We present Yggdrasil, a co-designed system that enables latency-optimal speculative decoding through context-aware tree drafting and compiler-friendly execution. Ygg...

---

## 485. Integrating Domain Knowledge for Financial QA: A Multi-Retriever RAG Approach with LLMs

**Authors:** Yukun Zhang, Stefan Elbl Droguett, Samyak Jain

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23848v1) | > This research project addresses the errors of financial numerical reasoning Question Answering (QA) tasks due to the lack of domain knowledge in finance. Despite recent advances in Large Language Models (LLMs), financial numerical questions remain challenging because they require specific domain knowledge in finance and complex multi-step numeric reasoning. We implement a multi-retriever Retrieval...

---

## 486. A Test of Lookahead Bias in LLM Forecasts

**Authors:** Zhenyu Gao, Wenxi Jiang, Yutong Yan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23847v1) | > We develop a statistical test to detect lookahead bias in economic forecasts generated by large language models (LLMs). Using state-of-the-art pre-training data detection techniques, we estimate the likelihood that a given prompt appeared in an LLM's training corpus, a statistic we term Lookahead Propensity (LAP). We formally show that a positive correlation between LAP and forecast accuracy indic...

---

## 487. From Correctness to Collaboration: Toward a Human-Centered Framework for Evaluating AI Agent Behavior in Software Engineering

**Authors:** Tao Dong, Harini Sampath, Ja Young Lee, Sherry Y. Shi, Andrew Macvean

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23844v1) | > As Large Language Models (LLMs) evolve from code generators into collaborative partners for software engineers, our methods for evaluation are lagging. Current benchmarks, focused on code correctness, fail to capture the nuanced, interactive behaviors essential for successful human-AI partnership. To bridge this evaluation gap, this paper makes two core contributions. First, we present a foundatio...

---

## 488. Adversarial Lens: Exploiting Attention Layers to Generate Adversarial Examples for Evaluation

**Authors:** Kaustubh Dhole

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23837v1) | > Recent advances in mechanistic interpretability suggest that intermediate attention layers encode token-level hypotheses that are iteratively refined toward the final output. In this work, we exploit this property to generate adversarial examples directly from attention-layer token distributions. Unlike prompt-based or gradient-based attacks, our approach leverages model-internal token predictions...

---

## 489. Retrieval Augmented Question Answering: When Should LLMs Admit Ignorance?

**Authors:** Dingmin Wang, Ji Ma, Shankar Kumar

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23836v1) | > The success of expanded context windows in Large Language Models (LLMs) has driven increased use of broader context in retrieval-augmented generation. We investigate the use of LLMs for retrieval augmented question answering. While longer contexts make it easier to incorporate targeted knowledge, they introduce more irrelevant information that hinders the model's generation process and degrades it...

---

## 490. MiMo-Audio: Audio Language Models are Few-Shot Learners

**Authors:** Xiaomi LLM-Core Team, :, Dong Zhang, Gang Wang, Jinlong Xue

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23808v1) | > Existing audio language models typically rely on task-specific fine-tuning to accomplish particular audio tasks. In contrast, humans are able to generalize to new audio tasks with only a few examples or simple instructions. GPT-3 has shown that scaling next-token prediction pretraining enables strong generalization capabilities in text, and we believe this paradigm is equally applicable to the aud...

---

## 491. Eliciting Behaviors in Multi-Turn Conversations

**Authors:** Jing Huang, Shujian Zhang, Lun Wang, Andrew Hard, Rajiv Mathews

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23701v1) | > Identifying specific and often complex behaviors from large language models (LLMs) in conversational settings is crucial for their evaluation. Recent work proposes novel techniques to find natural language prompts that induce specific behaviors from a target model, yet they are mainly studied in single-turn settings. In this work, we study behavior elicitation in the context of multi-turn conversa...

---

## 492. Fine-Tuning LLMs with Fine-Grained Human Feedback on Text Spans

**Authors:** Sky CH-Wang, Justin Svegliato, Helen Appel, Jason Eisner

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23693v1) | > We present a method and dataset for fine-tuning language models with preference supervision using feedback-driven improvement chains. Given a model response, an annotator provides fine-grained feedback by marking ``liked'' and ``disliked'' spans and specifying what they liked or disliked about them. The base model then rewrites the disliked spans accordingly, proceeding from left to right, forming...

---

## 493. Multilingual Hidden Prompt Injection Attacks on LLM-Based Academic Reviewing

**Authors:** Panagiotis Theocharopoulos, Ajinkya Kulkarni, Mathew Magimai. -Doss

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23684v1) | > Large language models (LLMs) are increasingly considered for use in high-impact workflows, including academic peer review. However, LLMs are vulnerable to document-level hidden prompt injection attacks. In this work, we construct a dataset of approximately 500 real academic papers accepted to ICML and evaluate the effect of embedding hidden adversarial prompts within these documents. Each paper is...

---

## 494. BOAD: Discovering Hierarchical Software Engineering Agents via Bandit Optimization

**Authors:** Iris Xu, Guangtao Zeng, Zexue He, Charles Jin, Aldo Pareja

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23631v1) | > Large language models (LLMs) have shown strong reasoning and coding capabilities, yet they struggle to generalize to real-world software engineering (SWE) problems that are long-horizon and out of distribution. Existing systems often rely on a single agent to handle the entire workflow-interpreting issues, navigating large codebases, and implementing fixes-within one reasoning chain. Such monolith...

---

## 495. Close the Loop: Synthesizing Infinite Tool-Use Data via Multi-Agent Role-Playing

**Authors:** Yuwen Li, Wei Zhang, Zelong Huang, Mason Yang, Jiajun Wu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23611v1) | > Enabling Large Language Models (LLMs) to reliably invoke external tools remains a critical bottleneck for autonomous agents. Existing approaches suffer from three fundamental challenges: expensive human annotation for high-quality trajectories, poor generalization to unseen tools, and quality ceilings inherent in single-model synthesis that perpetuate biases and coverage gaps. We introduce InfTool...

---

## 496. Enhanced Web Payload Classification Using WAMM: An AI-Based Framework for Dataset Refinement and Model Evaluation

**Authors:** Heba Osama, Omar Elebiary, Youssef Qassim, Mohamed Amgad, Ahmed Maghawry

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23610v1) | > Web applications increasingly face evasive and polymorphic attack payloads, yet traditional web application firewalls (WAFs) based on static rule sets such as the OWASP Core Rule Set (CRS) often miss obfuscated or zero-day patterns without extensive manual tuning. This work introduces WAMM, an AI-driven multiclass web attack detection framework designed to reveal the limitations of rule-based syst...

---

## 497. The Big Three in Marriage Talk: LLM-Assisted Analysis of Moral Ethics and Sentiment on Weibo and Xiaohongshu

**Authors:** Frank Tian-Fang Ye, Xiaozi Gao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23609v1) | > China's marriage registrations have declined dramatically, dropping from 13.47 million couples in 2013 to 6.1 million in 2024. Understanding public attitudes toward marriage requires examining not only emotional sentiment but also the moral reasoning underlying these evaluations. This study analyzed 219,358 marriage-related posts from two major Chinese social media platforms (Sina Weibo and Xiaoho...

---

## 498. Divergent-Convergent Thinking in Large Language Models for Creative Problem Generation

**Authors:** Manh Hung Nguyen, Adish Singla

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23601v1) | > Large language models (LLMs) have significant potential for generating educational questions and problems, enabling educators to create large-scale learning materials. However, LLMs are fundamentally limited by the ``Artificial Hivemind'' effect, where they generate similar responses within the same model and produce homogeneous outputs across different models. As a consequence, students may be ex...

---

## 499. Can AI Recognize Its Own Reflection? Self-Detection Performance of LLMs in Computing Education

**Authors:** Christopher Burger, Karmece Talley, Christina Trotter

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23587v1) | > The rapid advancement of Large Language Models (LLMs) presents a significant challenge to academic integrity within computing education. As educators seek reliable detection methods, this paper evaluates the capacity of three prominent LLMs (GPT-4, Claude, and Gemini) to identify AI-generated text in computing-specific contexts. We test their performance under both standard and 'deceptive' prompt ...

---

## 500. Instruction-Following Evaluation of Large Vision-Language Models

**Authors:** Daiki Shiono, Shumpei Miyawaki, Ryota Tanaka, Jun Suzuki

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23572v1) | > Following the initial flourishing of large language models (LLMs), there has been a surge in proposed large vision-language models (LVLMs) that integrate LLMs with vision capabilities. However, it has been observed that LVLMs, after tuning to visual instruction using commonly used training datasets, often fail to exhibit the instruction-following ability that was present in the LLM before integrat...

---

## 501. Toward Trustworthy Agentic AI: A Multimodal Framework for Preventing Prompt Injection Attacks

**Authors:** Toqeer Ali Syed, Mishal Ateeq Almutairi, Mahmoud Abdel Moaty

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23557v1) | > Powerful autonomous systems, which reason, plan, and converse using and between numerous tools and agents, are made possible by Large Language Models (LLMs), Vision-Language Models (VLMs), and new agentic AI systems, like LangChain and GraphChain. Nevertheless, this agentic environment increases the probability of the occurrence of multimodal prompt injection (PI) attacks, in which concealed or ma...

---

## 502. Lie to Me: Knowledge Graphs for Robust Hallucination Self-Detection in LLMs

**Authors:** Sahil Kale, Antonio Luca Alfeo

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23547v1) | > Hallucinations, the generation of apparently convincing yet false statements, remain a major barrier to the safe deployment of LLMs. Building on the strong performance of self-detection methods, we examine the use of structured knowledge representations, namely knowledge graphs, to improve hallucination self-detection. Specifically, we propose a simple yet powerful approach that enriches hallucina...

---

## 503. Trustworthy Machine Learning under Distribution Shifts

**Authors:** Zhuo Huang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23524v1) | > Machine Learning (ML) has been a foundational topic in artificial intelligence (AI), providing both theoretical groundwork and practical tools for its exciting advancements. From ResNet for visual recognition to Transformer for vision-language alignment, the AI models have achieved superior capability to humans. Furthermore, the scaling law has enabled AI to initially develop general intelligence,...

---

## 504. Single LLM Debate, MoLaCE: Mixture of Latent Concept Experts Against Confirmation Bias

**Authors:** Hazel Kim, Philip Torr

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23518v1) | > Large language models (LLMs) are highly vulnerable to input confirmation bias. When a prompt implies a preferred answer, models often reinforce that bias rather than explore alternatives. This phenomenon remains underexplored, yet it is already harmful in base models and poses an even greater risk in multi-agent debate, where echo chambers reinforce bias instead of correction. We introduce Mixture...

---

## 505. Alpha-R1: Alpha Screening with LLM Reasoning via Reinforcement Learning

**Authors:** Zuoyou Jiang, Li Zhao, Rui Sun, Ruohan Sun, Zhongjian Li

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23515v1) | > Signal decay and regime shifts pose recurring challenges for data-driven investment strategies in non-stationary markets. Conventional time-series and machine learning approaches, which rely primarily on historical correlations, often struggle to generalize when the economic environment changes. While large language models (LLMs) offer strong capabilities for processing unstructured information, t...

---

## 506. UniHetero: Could Generation Enhance Understanding for Vision-Language-Model at Large Data Scale?

**Authors:** Fengjiao Chen, Minhao Jing, Weitao Lu, Yan Feng, Xiaoyu Li

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23512v2) | > Vision-language large models are moving toward the unification of visual understanding and visual generation tasks. However, whether generation can enhance understanding is still under-explored on large data scale. In this work, we analysis the unified structure with a concise model, UniHetero, under large-scale pretraining (>200M samples). Our key observations are: (1) Generation can improve unde...

---

## 507. Beyond Correctness: Exposing LLM-generated Logical Flaws in Reasoning via Multi-step Automated Theorem Proving

**Authors:** Xinyi Zheng, Ningke Li, Xiaokun Luan, Kailong Wang, Ling Shi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23511v1) | > Large Language Models (LLMs) have demonstrated impressive reasoning capabilities, leading to their adoption in high-stakes domains such as healthcare, law, and scientific research. However, their reasoning often contains subtle logical errors masked by fluent language, posing significant risks for critical applications. While existing approaches like fact-checking, self-consistency methods, and ru...

---

## 508. Hierarchical Decision Mamba Meets Agentic AI: A Novel Approach for RAN Slicing in 6G

**Authors:** Md Arafat Habib, Medhat Elsayed, Majid Bavand, Pedro Enrique Iturria Rivera, Yigit Ozcan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23502v1) | > Radio Access Network (RAN) slicing enables multiple logical networks to exist on top of the same physical infrastructure by allocating resources to distinct service groups, where radio resource scheduling plays a key role in ensuring compliance with slice-specific Service-Level Agreements (SLAs). Existing configuration-based or intent-driven Reinforcement Learning (RL) approaches usually rely on s...

---

## 509. The Gaining Paths to Investment Success: Information-Driven LLM Graph Reasoning for Venture Capital Prediction

**Authors:** Haoyu Pei, Zhongyang Liu, Xiangyi Xiao, Xiaocong Du, Haipeng Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23489v1) | > Most venture capital (VC) investments fail, while a few deliver outsized returns. Accurately predicting startup success requires synthesizing complex relational evidence, including company disclosures, investor track records, and investment network structures, through explicit reasoning to form coherent, interpretable investment theses. Traditional machine learning and graph neural networks both l...

---

## 510. Agentic AI for Autonomous Defense in Software Supply Chain Security: Beyond Provenance to Vulnerability Mitigation

**Authors:** Toqeer Ali Syed, Mohammad Riyaz Belgaum, Salman Jan, Asadullah Abdullah Khan, Saad Said Alqahtani

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23480v1) | > The software supply chain attacks are becoming more and more focused on trusted development and delivery procedures, so the conventional post-build integrity mechanisms cannot be used anymore. The available frameworks like SLSA, SBOM and in toto are majorly used to offer provenance and traceability but do not have the capabilities of actively identifying and removing vulnerabilities in software pr...

---

## 511. Semantic Tree Inference on Text Corpa using a Nested Density Approach together with Large Language Model Embeddings

**Authors:** Thomas Haschka, Joseph Bakarji

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23471v1) | > Semantic text classification has undergone significant advances in recent years due to the rise of large language models (LLMs) and their high dimensional embeddings. While LLM-embeddings are frequently used to store and retrieve text by semantic similarity in vector databases, the global structure semantic relationships in text corpora often remains opaque. Herein we propose a nested density clus...

---

## 512. Prompt-Induced Over-Generation as Denial-of-Service: A Black-Box Attack-Side Benchmark

**Authors:** Manu, Yi Guo, Jo Plested, Tim Lynar, Kanchana Thilakarathna

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23779v1) | > Large language models (LLMs) can be driven into over-generation, emitting thousands of tokens before producing an end-of-sequence (EOS) token. This degrades answer quality, inflates latency and cost, and can be weaponized as a denial-of-service (DoS) attack. Recent work has begun to study DoS-style prompt attacks, but typically focuses on a single attack algorithm or assumes white-box access, with...

---

## 513. Eliminating Inductive Bias in Reward Models with Information-Theoretic Guidance

**Authors:** Zhuo Li, Pengyu Cheng, Zhechao Yu, Feifei Tong, Anningzhe Gao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23461v1) | > Reward models (RMs) are essential in reinforcement learning from human feedback (RLHF) to align large language models (LLMs) with human values. However, RM training data is commonly recognized as low-quality, containing inductive biases that can easily lead to overfitting and reward hacking. For example, more detailed and comprehensive responses are usually human-preferred but with more words, lea...

---

## 514. Replay Failures as Successes: Sample-Efficient Reinforcement Learning for Instruction Following

**Authors:** Kongcheng Zhang, Qi Yao, Shunyu Liu, Wenjian Zhang, Min Cen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23457v1) | > Reinforcement Learning (RL) has shown promise for aligning Large Language Models (LLMs) to follow instructions with various constraints. Despite the encouraging results, RL improvement inevitably relies on sampling successful, high-quality responses; however, the initial model often struggles to generate responses that satisfy all constraints due to its limited capabilities, yielding sparse or ind...

---

## 515. Automated river gauge plate reading using a hybrid object detection and generative AI framework in the Limpopo River Basin

**Authors:** Kayathri Vigneswaran, Hugo Retief, Jai Clifford Holmes, Mariangel Garcia Andarcia, Hansaka Tennakoon

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23454v1) | > Accurate and continuous monitoring of river water levels is essential for flood forecasting, water resource management, and ecological protection. Traditional hydrological observation methods are often limited by manual measurement errors and environmental constraints. This study presents a hybrid framework integrating vision based waterline detection, YOLOv8 pose scale extraction, and large multi...

---

## 516. Coupling Experts and Routers in Mixture-of-Experts via an Auxiliary Loss

**Authors:** Ang Lv, Jin Ma, Yiyuan Ma, Siyuan Qiao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23447v1) | > Mixture-of-Experts (MoE) models lack explicit constraints to ensure the router's decisions align well with the experts' capabilities, which ultimately limits model performance. To address this, we propose expert-router coupling (ERC) loss, a lightweight auxiliary loss that tightly couples the router's decisions with expert capabilities. Our approach treats each expert's router embedding as a proxy...

---

## 517. ClinDEF: A Dynamic Evaluation Framework for Large Language Models in Clinical Reasoning

**Authors:** Yuqi Tang, Jing Yu, Zichang Su, Kehua Feng, Zhihui Zhu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23440v1) | > Clinical diagnosis begins with doctor-patient interaction, during which physicians iteratively gather information, determine examination and refine differential diagnosis through patients' response. This dynamic clinical-reasoning process is poorly represented by existing LLM benchmarks that focus on static question-answering. To mitigate these gaps, recent methods explore dynamic medical framewor...

---

## 518. C2PO: Diagnosing and Disentangling Bias Shortcuts in LLMs

**Authors:** Xuan Feng, Bo An, Tianlong Gu, Liang Chang, Fengrui Hao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23430v1) | > Bias in Large Language Models (LLMs) poses significant risks to trustworthiness, manifesting primarily as stereotypical biases (e.g., gender or racial stereotypes) and structural biases (e.g., lexical overlap or position preferences). However, prior paradigms typically address these in isolation, often mitigating one at the expense of exacerbating the other. To address this, we conduct a systemati...

---

## 519. AKG kernel Agent: A Multi-Agent Framework for Cross-Platform Kernel Synthesis

**Authors:** Jinye Du, Quan Yuan, Zuyao Zhang, Yanzhi Yi, Jiahui Hu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23424v1) | > Modern AI models demand high-performance computation kernels. The growing complexity of LLMs, multimodal architectures, and recommendation systems, combined with techniques like sparsity and quantization, creates significant computational challenges. Moreover, frequent hardware updates and diverse chip architectures further complicate this landscape, requiring tailored kernel implementations for e...

---

## 520. Entropy-Guided Token Dropout: Training Autoregressive Language Models with Limited Domain Data

**Authors:** Jiapeng Wang, Yiwen Hu, Yanzipeng Gao, Haoyu Wang, Shuo Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23422v1) | > As access to high-quality, domain-specific data grows increasingly scarce, multi-epoch training has become a practical strategy for adapting large language models (LLMs). However, autoregressive models often suffer from performance degradation under repeated data exposure, where overfitting leads to a marked decline in model capability. Through empirical analysis, we trace this degradation to an i...

---

## 521. Bridging Cognitive Gap: Hierarchical Description Learning for Artistic Image Aesthetics Assessment

**Authors:** Henglin Liu, Nisha Huang, Chang Liu, Jiangpeng Yan, Huijuan Huang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23413v1) | > The aesthetic quality assessment task is crucial for developing a human-aligned quantitative evaluation system for AIGC. However, its inherently complex nature, spanning visual perception, cognition, and emotion, poses fundamental challenges. Although aesthetic descriptions offer a viable representation of this complexity, two critical challenges persist: (1) data scarcity and imbalance: existing ...

---

## 522. Theoretical Foundations of Scaling Law in Familial Models

**Authors:** Huan Song, Qingfei Zhao, Ting Long, Shuyu Tian, Hongjun An

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23407v1) | > Neural scaling laws have become foundational for optimizing large language model (LLM) training, yet they typically assume a single dense model output. This limitation effectively overlooks "Familial models, a transformative paradigm essential for realizing ubiquitous intelligence across heterogeneous device-edge-cloud hierarchies. Transcending static architectures, familial models integrate early...

---

## 523. PINNs for Electromagnetic Wave Propagation

**Authors:** Nilufer K. Bulut

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23396v1) | > Physics-Informed Neural Networks (PINNs) are a methodology that aims to solve physical systems by directly embedding PDE constraints into the neural network training process. In electromagnetism, where well-established methodologies such as FDTD and FEM already exist, new methodologies are expected to provide clear advantages to be accepted. Despite their mesh-free nature and applicability to inve...

---

## 524. Post-Training Quantization of OpenPangu Models for Efficient Deployment on Atlas A2

**Authors:** Yilun Luo, HuaQing Zheng, Haoqian Meng, Wenyuan Liu, Peng Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23367v1) | > Huawei's openPangu-Embedded-1B and openPangu-Embedded-7B, variants of the openPangu large language model, integrate three distinct Chain-of-Thought (CoT) reasoning paradigms, namely slow_think, auto_think, and no_think. While these CoT modes enhance reasoning capabilities, their generation of extended reasoning traces introduces substantial memory and latency overheads, posing challenges for pract...

---

## 525. A Stepwise-Enhanced Reasoning Framework for Large Language Models Based on External Subgraph Generation

**Authors:** Xin Zhang, Yang Cao, Baoxing Wu, Xinyi Chen, Kai Song

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23356v1) | > Large Language Models (LLMs) have achieved strong performance across a wide range of natural language processing tasks in recent years, including machine translation, text generation, and question answering. As their applications extend to increasingly complex scenarios, however, LLMs continue to face challenges in tasks that require deep reasoning and logical inference. In particular, models trai...

---

## 526. CountGD++: Generalized Prompting for Open-World Counting

**Authors:** Niki Amini-Naieni, Andrew Zisserman

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23351v1) | > The flexibility and accuracy of methods for automatically counting objects in images and videos are limited by the way the object can be specified. While existing methods allow users to describe the target object with text and visual examples, the visual examples must be manually annotated inside the image, and there is no way to specify what not to count. To address these gaps, we introduce novel...

---

## 527. AI Meets Brain: Memory Systems from Cognitive Neuroscience to Autonomous Agents

**Authors:** Jiafeng Liang, Hao Li, Chang Li, Jiaqi Zhou, Shixin Jiang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23343v1) | > Memory serves as the pivotal nexus bridging past and future, providing both humans and AI systems with invaluable concepts and experience to navigate complex tasks. Recent research on autonomous agents has increasingly focused on designing efficient memory workflows by drawing on cognitive neuroscience. However, constrained by interdisciplinary barriers, existing works struggle to assimilate the e...

---

## 528. The Law of Multi-Model Collaboration: Scaling Limits of Model Ensembling for Large Language Models

**Authors:** Dakuan Lu, Jiaqi Zhang, Cheng Yuan, Jiawei Shao, Chi Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23340v1) | > Recent advances in large language models (LLMs) have been largely driven by scaling laws for individual models, which predict performance improvements as model parameters and data volume increase. However, the capabilities of any single LLM are inherently bounded. One solution originates from intricate interactions among multiple LLMs, rendering their collective performance surpasses that of any c...

---

## 529. CubeBench: Diagnosing Interactive, Long-Horizon Spatial Reasoning Under Partial Observations

**Authors:** Huan-ang Gao, Zikang Zhang, Tianwei Luo, Kaisen Yang, Xinzhe Juan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23328v2) | > Large Language Model (LLM) agents, while proficient in the digital realm, face a significant gap in physical-world deployment due to the challenge of forming and maintaining a robust spatial mental model. We identify three core cognitive challenges hindering this transition: spatial reasoning, long-horizon state tracking via mental simulation, and active exploration under partial observation. To i...

---

## 530. Flexible Keyword-Aware Top-$k$ Route Search

**Authors:** Ziqiang Yu, Xiaohui Yu, Yueting Chen, Wei Liu, Anbang Song

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23319v1) | [DOI](https://doi.org/10.1109/TKDE.2025.3609302)

> With the rise of Large Language Models (LLMs), tourists increasingly use it for route planning by entering keywords for attractions, instead of relying on traditional manual map services. LLMs provide generally reasonable suggestions, but often fail to generate optimal plans that account for detailed user requirements, given the vast number of potential POIs and possible routes based on POI combin...

---

## 531. Splitwise: Collaborative Edge-Cloud Inference for LLMs via Lyapunov-Assisted DRL

**Authors:** Abolfazl Younesi, Abbas Shabrang Maryan, Elyas Oustad, Zahra Najafabadi Samani, Mohsen Ansari

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23310v1) | [DOI](https://doi.org/10.1145/3773274.3774267)

> Deploying large language models (LLMs) on edge devices is challenging due to their limited memory and power resources. Cloud-only inference reduces device burden but introduces high latency and cost. Static edge-cloud partitions optimize a single metric and struggle when bandwidth fluctuates. We propose Splitwise, a novel Lyapunov-assisted deep reinforcement learning (DRL) framework for fine-grain...

---

## 532. MedGemma vs GPT-4: Open-Source and Proprietary Zero-shot Medical Disease Classification from Images

**Authors:** Md. Sazzadul Islam Prottasha, Nabil Walid Rafi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23304v1) | > Multimodal Large Language Models (LLMs) introduce an emerging paradigm for medical imaging by interpreting scans through the lens of extensive clinical knowledge, offering a transformative approach to disease classification. This study presents a critical comparison between two fundamentally different AI architectures: the specialized open-source agent MedGemma and the proprietary large multimodal...

---

## 533. AI4Reading: Chinese Audiobook Interpretation System Based on Multi-Agent Collaboration

**Authors:** Minjiang Huang, Jipeng Qiang, Yi Zhu, Chaowei Zhang, Xiangyu Zhao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23300v1) | > Audiobook interpretations are attracting increasing attention, as they provide accessible and in-depth analyses of books that offer readers practical insights and intellectual inspiration. However, their manual creation process remains time-consuming and resource-intensive. To address this challenge, we propose AI4Reading, a multi-agent collaboration system leveraging large language models (LLMs) ...

---

## 534. Agentic AI-Enhanced Semantic Communications: Foundations, Architecture, and Applications

**Authors:** Haixiao Gao, Mengying Sun, Ruichen Zhang, Yanhan Wang, Xiaodong Xu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23294v1) | > Semantic communications (SemCom), as one of the key technologies for 6G, is shifting networks from bit transmission to semantic information exchange. On this basis, introducing agentic artificial intelligence (AI) with perception, memory, reasoning, and action capabilities provides a practicable path to intelligent communications. This paper provides a systematic exposition of how agentic AI empow...

---

## 535. Chinese Morph Resolution in E-commerce Live Streaming Scenarios

**Authors:** Jiahao Zhu, Jipeng Qiang, Ran Bai, Chenyu Liu, Xiaoye Ouyang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23280v1) | > E-commerce live streaming in China, particularly on platforms like Douyin, has become a major sales channel, but hosts often use morphs to evade scrutiny and engage in false advertising. This study introduces the Live Auditory Morph Resolution (LiveAMR) task to detect such violations. Unlike previous morph research focused on text-based evasion in social media and underground industries, LiveAMR t...

---

## 536. TCEval: Using Thermal Comfort to Assess Cognitive and Perceptual Abilities of AI

**Authors:** Jingming Li

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23217v1) | > A critical gap exists in LLM task-specific benchmarks. Thermal comfort, a sophisticated interplay of environmental factors and personal perceptions involving sensory integration and adaptive decision-making, serves as an ideal paradigm for evaluating real-world cognitive capabilities of AI systems. To address this, we propose TCEval, the first evaluation framework that assesses three core cognitiv...

---

## 537. Anka: A Domain-Specific Language for Reliable LLM Code Generation

**Authors:** Saif Khalfan Saif Al Mazrouei

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23214v1) | > Large Language Models (LLMs) have demonstrated remarkable capabilities in code generation, yet they exhibit systematic errors on complex, multi-step programming tasks. We hypothesize that these errors stem from the flexibility of general-purpose languages, which permits multiple valid approaches and requires implicit state management. To test this hypothesis, we introduce Anka, a domain-specific l...

---

## 538. Scoring, Reasoning, and Selecting the Best! Ensembling Large Language Models via a Peer-Review Process

**Authors:** Zhijun Chen, Zeyu Ji, Qianren Mao, Junhang Cheng, Bangjie Qin

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23213v1) | > We propose LLM-PeerReview, an unsupervised LLM Ensemble method that selects the most ideal response from multiple LLM-generated candidates for each query, harnessing the collective wisdom of multiple models with diverse strengths. LLM-PeerReview is built on a novel, peer-review-inspired framework that offers a clear and interpretable mechanism, while remaining fully unsupervised for flexible adapt...

---

## 539. Not too long do read: Evaluating LLM-generated extreme scientific summaries

**Authors:** Zhuoqi Lyu, Qing Ke

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23206v1) | > High-quality scientific extreme summary (TLDR) facilitates effective science communication. How do large language models (LLMs) perform in generating them? How are LLM-generated summaries different from those written by human experts? However, the lack of a comprehensive, high-quality scientific TLDR dataset hinders both the development and evaluation of LLMs' summarization ability. To address the...

---

## 540. From Model Choice to Model Belief: Establishing a New Measure for LLM-Based Research

**Authors:** Hongshen Sun, Juanjuan Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23184v1) | > Large language models (LLMs) are increasingly used to simulate human behavior, but common practices to use LLM-generated data are inefficient. Treating an LLM's output ("model choice") as a single data point underutilizes the information inherent to the probabilistic nature of LLMs. This paper introduces and formalizes "model belief," a measure derived from an LLM's token-level probabilities that ...

---

## 541. GaussianDWM: 3D Gaussian Driving World Model for Unified Scene Understanding and Multi-Modal Generation

**Authors:** Tianchen Deng, Xuefeng Chen, Yi Chen, Qu Chen, Yuyao Xu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23180v1) | > Driving World Models (DWMs) have been developing rapidly with the advances of generative models. However, existing DWMs lack 3D scene understanding capabilities and can only generate content conditioned on input data, without the ability to interpret or reason about the driving environment. Moreover, current approaches represent 3D spatial information with point cloud or BEV features do not accura...

---

## 542. EquaCode: A Multi-Strategy Jailbreak Approach for Large Language Models via Equation Solving and Code Completion

**Authors:** Zhen Liang, Hai Huang, Zhengkui Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23173v1) | > Large language models (LLMs), such as ChatGPT, have achieved remarkable success across a wide range of fields. However, their trustworthiness remains a significant concern, as they are still susceptible to jailbreak attacks aimed at eliciting inappropriate or harmful responses. However, existing jailbreak attacks mainly operate at the natural language level and rely on a single attack strategy, li...

---

## 543. Learning-based data-enabled economic predictive control with convex optimization for nonlinear systems

**Authors:** Mingxue Yan, Xuewen Zhang, Kaixiang Zhang, Zhaojian Li, Xunyuan Yin

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23170v1) | > In this article, we propose a data-enabled economic predictive control method for a class of nonlinear systems, which aims to optimize the economic operational performance while handling hard constraints on the system outputs. Two lifting functions are constructed via training neural networks, which generate mapped input and mapped output in a higher-dimensional space, where the nonlinear economic...

---

## 544. SPIRAL: Symbolic LLM Planning via Grounded and Reflective Search

**Authors:** Yifan Zhang, Giridhar Ganapavarapu, Srideepika Jayaraman, Bhavna Agrawal, Dhaval Patel

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23167v1) | > Large Language Models (LLMs) often falter at complex planning tasks that require exploration and self-correction, as their linear reasoning process struggles to recover from early mistakes. While search algorithms like Monte Carlo Tree Search (MCTS) can explore alternatives, they are often ineffective when guided by sparse rewards and fail to leverage the rich semantic capabilities of LLMs. We int...

---

## 545. A Network of Biologically Inspired Rectified Spectral Units (ReSUs) Learns Hierarchical Features Without Error Backpropagation

**Authors:** Shanshan Qin, Joshua L. Pughe-Sanford, Alexander Genkin, Pembe Gizem Ozdil, Philip Greengard

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23146v1) | > We introduce a biologically inspired, multilayer neural architecture composed of Rectified Spectral Units (ReSUs). Each ReSU projects a recent window of its input history onto a canonical direction obtained via canonical correlation analysis (CCA) of previously observed past-future input pairs, and then rectifies either its positive or negative component. By encoding canonical directions in synapt...

---

## 546. Reservoir Computing inspired Matrix Multiplication-free Language Model

**Authors:** Takumi Shiratsuchi, Yuichiro Tanaka, Hakaru Tamukoh

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23145v1) | > Large language models (LLMs) have achieved state-of-the-art performance in natural language processing; however, their high computational cost remains a major bottleneck. In this study, we target computational efficiency by focusing on a matrix multiplication free language model (MatMul-free LM) and further reducing the training cost through an architecture inspired by reservoir computing. Specifi...

---

## 547. Understanding EFL Learners' Code-Switching and Teachers' Pedagogical Approaches in LLM-Supported Speaking Practice

**Authors:** Junyeong Park, Jieun Han, Yeon Su Park, Youngbin Lee, Suin Kim

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23136v1) | > For English as a Foreign Language (EFL) learners, code-switching (CSW), or alternating between their native language and the target language (English), can lower anxiety and ease communication barriers. Large language models (LLMs), with their multilingual abilities, offer new opportunities to support CSW in speaking practice. Yet, the pedagogical design of LLM-based tutors remains underexplored. ...

---

## 548. Multi-Agent Framework for Threat Mitigation and Resilience in AI-Based Systems

**Authors:** Armstrong Foundjem, Lionel Nganyewou Tidjon, Leuson Da Silva, Foutse Khomh

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23132v1) | > Machine learning (ML) underpins foundation models in finance, healthcare, and critical infrastructure, making them targets for data poisoning, model extraction, prompt injection, automated jailbreaking, and preference-guided black-box attacks that exploit model comparisons. Larger models can be more vulnerable to introspection-driven jailbreaks and cross-modal manipulation. Traditional cybersecuri...

---

## 549. InSPO: Unlocking Intrinsic Self-Reflection for LLM Preference Optimization

**Authors:** Yu Li, Tian Lan, Zhengling Qi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23126v2) | > Direct Preference Optimization (DPO) and its variants have become standard for aligning Large Language Models due to their simplicity and offline stability. However, we identify two fundamental limitations. First, the optimal policy depends on arbitrary modeling choices (scalarization function, reference policy), yielding behavior reflecting parameterization artifacts rather than true preferences....

---

## 550. Entropy-Aware Speculative Decoding Toward Improved LLM Reasoning

**Authors:** Tiancheng Su, Meicong Zhang, Guoxiu He

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23765v1) | > Speculative decoding (SD) accelerates large language model (LLM) reasoning by using a small draft model to generate candidate tokens, which the target LLM either accepts directly or regenerates upon rejection. However, excessive alignment between the draft and target models constrains SD to the performance of the target LLM. To address this limitation, we propose Entropy-Aware Speculative Decoding...

---

## 551. A Note on Hybrid Online Reinforcement and Imitation Learning for LLMs: Formulations and Algorithms

**Authors:** Yingru Li, Ziniu Li, Jiacai Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23097v1) | > We present a unified framework for Large Language Model (LLM) fine-tuning that integrates Imitation Learning and Reinforcement Learning. By analyzing the gradient of a composite objective combining trajectory-level KL divergence with task rewards, we derive a natural decomposition into two components: (1) an analytically computable Dense Gradient for token-level imitation, and (2) a Monte Carlo es...

---

## 552. Benchmark Success, Clinical Failure: When Reinforcement Learning Optimizes for Benchmarks, Not Patients

**Authors:** Armin Berger, Manuela Bergau, Helen Schneider, Saad Ahmad, Tom Anglim Lagones

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23090v1) | > Recent Reinforcement Learning (RL) advances for Large Language Models (LLMs) have improved reasoning tasks, yet their resource-constrained application to medical imaging remains underexplored. We introduce ChexReason, a vision-language model trained via R1-style methodology (SFT followed by GRPO) using only 2,000 SFT samples, 1,000 RL samples, and a single A100 GPU. Evaluations on CheXpert and NIH...

---

## 553. Trust Region Masking for Long-Horizon LLM Reinforcement Learning

**Authors:** Yingru Li, Jiacai Liu, Jiawei Xu, Yuxuan Tong, Ziniu Li

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23075v1) | > Policy gradient methods for large language models optimize a surrogate objective computed from samples of a rollout policy $π_{\text{roll}}$. When $π_{\text{roll}} \ne π_θ$, there is approximation error between the surrogate and the true objective. Prior work has shown that this off-policy mismatch is unavoidable in modern LLM-RL due to implementation divergence, mixture-of-experts routing discont...

---

## 554. Rethinking Fine-Tuning: Unlocking Hidden Capabilities in Vision-Language Models

**Authors:** Mingyuan Zhang, Yue Bai, Yifan Wang, Yiyang Huang, Yun Fu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23073v1) | > Explorations in fine-tuning Vision-Language Models (VLMs), such as Low-Rank Adaptation (LoRA) from Parameter Efficient Fine-Tuning (PEFT), have made impressive progress. However, most approaches rely on explicit weight updates, overlooking the extensive representational structures already encoded in pre-trained models that remain underutilized. Recent works have demonstrated that Mask Fine-Tuning ...

---

## 555. Audited Skill-Graph Self-Improvement for Agentic LLMs via Verifiable Rewards, Experience Synthesis, and Continual Memory

**Authors:** Ken Huang, Jerry Huang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23760v1) | > Reinforcement learning is increasingly used to transform large language models into agentic systems that act over long horizons, invoke tools, and manage memory under partial observability. While recent work has demonstrated performance gains through tool learning, verifiable rewards, and continual training, deployed self-improving agents raise unresolved security and governance challenges: optimi...

---

## 556. LLteacher: A Tool for the Integration of Generative AI into Statistics Assignments

**Authors:** Emanuela Furfaro, Simone Mosciatti

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23053v1) | > As generative AI becomes increasingly embedded in everyday life, the thoughtful and intentional integration of AI-based tools into statistics education has become essential. We address this need with a focus on homework assignments and we propose the use of LLMs as a companion to complete homework by developing an open-source tool named LLteacher. This LLM-based tool preserves learning processes a...

---

## 557. Accelerating Language Model Workflows with Prompt Choreography

**Authors:** TJ Bai, Jason Eisner

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23049v1) | > Large language models are increasingly deployed in multi-agent workflows. We introduce Prompt Choreography, a framework that efficiently executes LLM workflows by maintaining a dynamic, global KV cache. Each LLM call can attend to an arbitrary, reordered subset of previously encoded messages. Parallel calls are supported. Though caching messages' encodings sometimes gives different results from re...

---

## 558. Problems With Large Language Models for Learner Modelling: Why LLMs Alone Fall Short for Responsible Tutoring in K--12 Education

**Authors:** Danial Hooshyar, Yeongwook Yang, Gustav Šíř, Tommi Kärkkäinen, Raija Hämäläinen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23036v1) | > The rapid rise of large language model (LLM)-based tutors in K--12 education has fostered a misconception that generative models can replace traditional learner modelling for adaptive instruction. This is especially problematic in K--12 settings, which the EU AI Act classifies as high-risk domain requiring responsible design. Motivated by these concerns, this study synthesises evidence on limitati...

---

## 559. Viability and Performance of a Private LLM Server for SMBs: A Benchmark Analysis of Qwen3-30B on Consumer-Grade Hardware

**Authors:** Alex Khalil, Guillaume Heilles, Maria Parraga, Simon Heilles

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23029v1) | > The proliferation of Large Language Models (LLMs) has been accompanied by a reliance on cloud-based, proprietary systems, raising significant concerns regarding data privacy, operational sovereignty, and escalating costs. This paper investigates the feasibility of deploying a high-performance, private LLM inference server at a cost accessible to Small and Medium Businesses (SMBs). We present a com...

---

## 560. LENS: LLM-Enabled Narrative Synthesis for Mental Health by Aligning Multimodal Sensing with Language Models

**Authors:** Wenxuan Xu, Arvind Pillai, Subigya Nepal, Amanda C Collins, Daniel M Mackin

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23025v1) | > Multimodal health sensing offers rich behavioral signals for assessing mental health, yet translating these numerical time-series measurements into natural language remains challenging. Current LLMs cannot natively ingest long-duration sensor streams, and paired sensor-text datasets are scarce. To address these challenges, we introduce LENS, a framework that aligns multimodal sensing data with lan...

---

## 561. With Great Context Comes Great Prediction Power: Classifying Objects via Geo-Semantic Scene Graphs

**Authors:** Ciprian Constantinescu, Marius Leordeanu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23024v1) | > Humans effortlessly identify objects by leveraging a rich understanding of the surrounding scene, including spatial relationships, material properties, and the co-occurrence of other objects. In contrast, most computational object recognition systems operate on isolated image regions, devoid of meaning in isolation, thus ignoring this vital contextual information. This paper argues for the critica...

---

## 562. Merge before Forget: A Single LoRA Continual Learning via Continual Merging

**Authors:** Fuli Qiao, Mehrdad Mahdavi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23017v1) | > Parameter-efficient continual learning has emerged as a promising approach for large language models (LLMs) to mitigate catastrophic forgetting while enabling adaptation to new tasks. Current Low-Rank Adaptation (LoRA) continual learning techniques often retain and freeze previously learned LoRAs or generate data representations to overcome forgetting, typically utilizing these to support new LoRA...

---

## 563. Masgent: An AI-assisted Materials Simulation Agent

**Authors:** Guanghen Liu, Songge Yang, Yu Zhong

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23010v1) | > Density functional theory (DFT) and machine learning potentials (MLPs) are essential for predicting and understanding materials properties, yet preparing, executing, and analyzing these simulations typically requires extensive scripting, multi-step procedures, and significant high-performance computing (HPC) expertise. These challenges hinder reproducibility and slow down discovery. Here, we intro...

---

## 564. Prompt engineering does not universally improve Large Language Model performance across clinical decision-making tasks

**Authors:** Mengdi Chai, Ali R. Zomorrodi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22966v1) | > Large Language Models (LLMs) have demonstrated promise in medical knowledge assessments, yet their practical utility in real-world clinical decision-making remains underexplored. In this study, we evaluated the performance of three state-of-the-art LLMs-ChatGPT-4o, Gemini 1.5 Pro, and LIama 3.3 70B-in clinical decision support across the entire clinical reasoning workflow of a typical patient enco...

---

## 565. Diversity or Precision? A Deep Dive into Next Token Prediction

**Authors:** Haoyuan Wu, Hai Wang, Jiajia Wu, Jinxiang Ou, Keyao Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22955v1) | > Recent advancements have shown that reinforcement learning (RL) can substantially improve the reasoning abilities of large language models (LLMs). The effectiveness of such RL training, however, depends critically on the exploration space defined by the pre-trained model's token-output distribution. In this paper, we revisit the standard cross-entropy loss, interpreting it as a specific instance o...

---

## 566. Argus: Token Aware Distributed LLM Inference Optimization

**Authors:** Panlong Wu, Yifei Zhong, Danyang Chen, Ting Wang, Fangxin Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22925v1) | > Large Language Models (LLMs) are rapidly being integrated into real-world applications, yet their autoregressive architectures introduce significant inference time variability, especially when deployed across heterogeneous edge-cloud systems. Existing solutions largely neglect the dynamic, stochastic, and heterogeneous nature of such environments, often ignoring the impact of variable output token...

---

## 567. JavisGPT: A Unified Multi-modal LLM for Sounding-Video Comprehension and Generation

**Authors:** Kai Liu, Jungang Li, Yuchong Sun, Shengqiong Wu, Jianzhang Gao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22905v1) | > This paper presents JavisGPT, the first unified multimodal large language model (MLLM) for Joint Audio-Video (JAV) comprehension and generation. JavisGPT adopts a concise encoder-LLM-decoder architecture, featuring a SyncFusion module for spatio-temporal audio-video fusion and synchrony-aware learnable queries to bridge a pretrained JAV-DiT generator. This design enables temporally coherent video-...

---

## 568. Debugging Tabular Log as Dynamic Graphs

**Authors:** Chumeng Liang, Zhanyang Jin, Zahaib Akhtar, Mona Pereira, Haofei Yu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22903v1) | > Tabular log abstracts objects and events in the real-world system and reports their updates to reflect the change of the system, where one can detect real-world inconsistencies efficiently by debugging corresponding log entries. However, recent advances in processing text-enriched tabular log data overly depend on large language models (LLMs) and other heavy-load models, thus suffering from limite...

---

## 569. HiSciBench: A Hierarchical Multi-disciplinary Benchmark for Scientific Intelligence from Reading to Discovery

**Authors:** Yaping Zhang, Qixuan Zhang, Xingquan Zhang, Zhiyuan Chen, Wenwen Zhuang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22899v1) | > The rapid advancement of large language models (LLMs) and multimodal foundation models has sparked growing interest in their potential for scientific research. However, scientific intelligence encompasses a broad spectrum of abilities ranging from understanding fundamental knowledge to conducting creative discovery, and existing benchmarks remain fragmented. Most focus on narrow tasks and fail to ...

---

## 570. Theory and Algorithms for Learning with Multi-Class Abstention and Multi-Expert Deferral

**Authors:** Anqi Mao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22886v1) | > Large language models (LLMs) have achieved remarkable performance but face critical challenges: hallucinations and high inference costs. Leveraging multiple experts offers a solution: deferring uncertain inputs to more capable experts improves reliability, while routing simpler queries to smaller, distilled models enhances efficiency. This motivates the problem of learning with multiple-expert def...

---

## 571. FasterPy: An LLM-based Code Execution Efficiency Optimization Framework

**Authors:** Yue Wu, Minghao Han, Ruiyin Li, Peng Liang, Amjed Tahir

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22827v1) | > Code often suffers from performance bugs. These bugs necessitate the research and practice of code optimization. Traditional rule-based methods rely on manually designing and maintaining rules for specific performance bugs (e.g., redundant loops, repeated computations), making them labor-intensive and limited in applicability. In recent years, machine learning and deep learning-based methods have ...

---

## 572. ChatGraPhT: A Visual Conversation Interface for Multi-Path Reflection with Agentic LLM Support

**Authors:** Geoff Kimm, Linus Tan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22790v1) | > Large Language Models (LLMs) are increasingly used in complex knowledge work, yet linear transcript interfaces limit support for reflection. Schon's Reflective Practice distinguishes between reflection-in-action (during a task) and reflection-on-action (after a task), both benefiting from non-linear, revisitable representations of dialogue. ChatGraPhT is an interactive tool that shows dialogue as ...

---

## 573. From Rookie to Expert: Manipulating LLMs for Automated Vulnerability Exploitation in Enterprise Software

**Authors:** Moustapha Awwalou Diouf, Maimouna Tamah Diao, Iyiola Emmanuel Olatunji, Abdoul Kader Kaboré, Jordan Samhi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22753v1) | > LLMs democratize software engineering by enabling non-programmers to create applications, but this same accessibility fundamentally undermines security assumptions that have guided software engineering for decades. We show in this work how publicly available LLMs can be socially engineered to transform novices into capable attackers, challenging the foundational principle that exploitation require...

---

## 574. Robust LLM-based Column Type Annotation via Prompt Augmentation with LoRA Tuning

**Authors:** Hanze Meng, Jianhao Cao, Rachel Pottinger

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22742v1) | > Column Type Annotation (CTA) is a fundamental step towards enabling schema alignment and semantic understanding of tabular data. Existing encoder-only language models achieve high accuracy when fine-tuned on labeled columns, but their applicability is limited to in-domain settings, as distribution shifts in tables or label spaces require costly re-training from scratch. Recent work has explored pr...

---

## 575. Harnessing Large Language Models for Biomedical Named Entity Recognition

**Authors:** Jian Chen, Leilei Su, Cong Sun

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22738v1) | > Background and Objective: Biomedical Named Entity Recognition (BioNER) is a foundational task in medical informatics, crucial for downstream applications like drug discovery and clinical trial matching. However, adapting general-domain Large Language Models (LLMs) to this task is often hampered by their lack of domain-specific knowledge and the performance degradation caused by low-quality trainin...

---

## 576. WeDLM: Reconciling Diffusion Language Models with Standard Causal Attention for Fast Inference

**Authors:** Aiwei Liu, Minghua He, Shaoxun Zeng, Sijun Zhang, Linhao Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22737v1) | > Autoregressive (AR) generation is the standard decoding paradigm for Large Language Models (LLMs), but its token-by-token nature limits parallelism at inference time. Diffusion Language Models (DLLMs) offer parallel decoding by recovering multiple masked tokens per step; however, in practice they often fail to translate this parallelism into deployment speed gains over optimized AR engines (e.g., ...

---

## 577. Mitigating Social Desirability Bias in Random Silicon Sampling

**Authors:** Sashank Chapala, Maksym Mironov, Songgaojun Deng

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22725v1) | > Large Language Models (LLMs) are increasingly used to simulate population responses, a method known as ``Silicon Sampling''. However, responses to socially sensitive questions frequently exhibit Social Desirability Bias (SDB), diverging from real human data toward socially acceptable answers. Existing studies on social desirability bias in LLM-based sampling remain limited. In this work, we invest...

---

## 578. Cyber Resilience in Next-Generation Networks: Threat Landscape, Theoretical Foundations, and Design Paradigms

**Authors:** Junaid Farooq, Quanyan Zhu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22721v1) | > The evolution of networked systems, driven by innovations in software-defined networking (SDN), network function virtualization (NFV), open radio access networks (O-RAN), and cloud-native architectures, is redefining both the operational landscape and the threat surface of critical infrastructures. This book offers an in-depth, interdisciplinary examination of how resilience must be re-conceptuali...

---

## 579. Modality Inflation: Energy Characterization and Optimization Opportunities for MLLM Inference

**Authors:** Mona Moghadampanah, Adib Rezaei Shahmirzadi, Farhana Amin, Dimitrios S. Nikolopoulos

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22695v1) | > Multimodal large language models (MLLMs) are built on text-only LLMs by incorporating additional modalities, enabling multimodal understanding and a broader range of applications. However, these additions introduce a previously unexplored energy trade-off across modalities that remains poorly understood, as most prior work focuses on text-only models. In this paper, we examine modality inflation, ...

---

## 580. Conformal Prediction Sets for Next-Token Prediction in Large Language Models: Balancing Coverage Guarantees with Set Efficiency

**Authors:** Yoshith Roy Kotla, Varshith Roy Kotla

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22682v1) | > Deploying large language models (LLMs) in high-stakes domains requires rigorous uncertainty quantification, yet standard softmax probabilities are often poorly calibrated. We present a systematic study of Adaptive Prediction Sets (APS) applied to next-token prediction in transformer-based models with large vocabularies (greater than 250,000 tokens). Our central contribution is the identification o...

---

## 581. TravelBench: A Real-World Benchmark for Multi-Turn and Tool-Augmented Travel Planning

**Authors:** Xiang Cheng, Yulan Hu, Xiangwen Zhang, Lu Xu, Zheng Pan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22673v1) | > Large language model (LLM) agents have demonstrated strong capabilities in planning and tool use. Travel planning provides a natural and high-impact testbed for these capabilities, as it requires multi-step reasoning, iterative preference elicitation through interaction, and calls to external tools under evolving constraints. Prior work has studied LLMs on travel-planning tasks, but existing setti...

---

## 582. Scaling Unverifiable Rewards: A Case Study on Visual Insights

**Authors:** Shuyu Gan, James Mooney, Pan Hao, Renxiang Wang, Mingyi Hong

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22650v1) | > Large Language Model (LLM) agents can increasingly automate complex reasoning through Test-Time Scaling (TTS), iterative refinement guided by reward signals. However, many real-world tasks involve multi-stage pipeline whose final outcomes lack verifiable rewards or sufficient data to train robust reward models, making judge-based refinement prone to accumulate error over stages. We propose Selecti...

---

## 583. Evaluating GRPO and DPO for Faithful Chain-of-Thought Reasoning in LLMs

**Authors:** Hadi Mohammadi, Tamas Kozak, Anastasia Giachanou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22631v1) | > Chain-of-thought (CoT) reasoning has emerged as a powerful technique for improving the problem-solving capabilities of large language models (LLMs), particularly for tasks requiring multi-step reasoning. However, recent studies show that CoT explanations often fail to reflect the model's actual reasoning process, as models may produce coherent yet misleading justifications or modify answers withou...

---

## 584. On the Role of Discreteness in Diffusion LLMs

**Authors:** Ziqi Jin, Bin Wang, Xiang Lin, Lidong Bing, Aixin Sun

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22630v1) | > Diffusion models offer appealing properties for language generation, such as parallel decoding and iterative refinement, but the discrete and highly structured nature of text challenges the direct application of diffusion principles. In this paper, we revisit diffusion language modeling from the view of diffusion process and language modeling, and outline five properties that separate diffusion me...

---

## 585. DICE: Discrete Interpretable Comparative Evaluation with Probabilistic Scoring for Retrieval-Augmented Generation

**Authors:** Shiyan Liu, Jian Ma, Rui Qu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22629v1) | > As Retrieval-Augmented Generation (RAG) systems evolve toward more sophisticated architectures, ensuring their trustworthiness through explainable and robust evaluation becomes critical. Existing scalar metrics suffer from limited interpretability, inadequate uncertainty quantification, and computational inefficiency in multi-system comparisons, hindering responsible deployment of RAG technologies...

---

## 586. M2G-Eval: Enhancing and Evaluating Multi-granularity Multilingual Code Generation

**Authors:** Fanglin Xu, Wei Zhang, Jian Yang, Guo Chen, Aishan Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22628v1) | > The rapid advancement of code large language models (LLMs) has sparked significant research interest in systematically evaluating their code generation capabilities, yet existing benchmarks predominantly assess models at a single structural granularity and focus on limited programming languages, obscuring fine-grained capability variations across different code scopes and multilingual scenarios. W...

---

## 587. Chain-of-thought Reviewing and Correction for Time Series Question Answering

**Authors:** Chen Su, Yuanhe Tian, Yan Song

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22627v1) | > With the advancement of large language models (LLMs), diverse time series analysis tasks are reformulated as time series question answering (TSQA) through a unified natural language interface. However, existing LLM-based approaches largely adopt general natural language processing techniques and are prone to reasoning errors when handling complex numerical sequences. Different from purely textual ...

---

## 588. The Wisdom of Deliberating AI Crowds: Does Deliberation Improve LLM-Based Forecasting?

**Authors:** Paul Schneider, Amalie Schramm

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22625v1) | > Structured deliberation has been found to improve the performance of human forecasters. This study investigates whether a similar intervention, i.e. allowing LLMs to review each other's forecasts before updating, can improve accuracy in large language models (GPT-5, Claude Sonnet 4.5, Gemini Pro 2.5). Using 202 resolved binary questions from the Metaculus Q2 2025 AI Forecasting Tournament, accurac...

---

## 589. LLM Agents as VC investors: Predicting Startup Success via RolePlay-Based Collective Simulation

**Authors:** Zhongyang Liu, Haoyu Pei, Xiangyi Xiao, Xiaocong Du, Yihui Li

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22608v1) | > Due to the high value and high failure rate of startups, predicting their success has become a critical challenge across interdisciplinary research. Existing approaches typically model success prediction from the perspective of a single decision-maker, overlooking the collective dynamics of investor groups that dominate real-world venture capital (VC) decisions. In this paper, we propose SimVC-CAS...

---

## 590. Learning Multi-Modal Mobility Dynamics for Generalized Next Location Recommendation

**Authors:** Junshu Dai, Yu Wang, Tongya Zheng, Wei Ji, Qinghong Guo

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22605v1) | > The precise prediction of human mobility has produced significant socioeconomic impacts, such as location recommendations and evacuation suggestions. However, existing methods suffer from limited generalization capability: unimodal approaches are constrained by data sparsity and inherent biases, while multi-modal methods struggle to effectively capture mobility dynamics caused by the semantic gap ...

---

## 591. Structured Prompting and LLM Ensembling for Multimodal Conversational Aspect-based Sentiment Analysis

**Authors:** Zhiqiang Gao, Shihao Gao, Zixing Zhang, Yihao Guo, Hongyu Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22603v1) | [DOI](https://doi.org/10.1145/3746027.3762070)

> Understanding sentiment in multimodal conversations is a complex yet crucial challenge toward building emotionally intelligent AI systems. The Multimodal Conversational Aspect-based Sentiment Analysis (MCABSA) Challenge invited participants to tackle two demanding subtasks: (1) extracting a comprehensive sentiment sextuple, including holder, target, aspect, opinion, sentiment, and rationale from m...

---

## 592. Lessons from Neuroscience for AI: How integrating Actions, Compositional Structure and Episodic Memory could enable Safe, Interpretable and Human-Like AI

**Authors:** Rajesh P. N. Rao, Vishwas Sathish, Linxing Preston Jiang, Matthew Bryan, Prashant Rangarajan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22568v1) | > The phenomenal advances in large language models (LLMs) and other foundation models over the past few years have been based on optimizing large-scale transformer models on the surprisingly simple objective of minimizing next-token prediction loss, a form of predictive coding that is also the backbone of an increasingly popular model of brain function in neuroscience and cognitive science. However,...

---

## 593. Learning When Not to Attend Globally

**Authors:** Xuan Luo, Kailai Zhang, Xifeng Yan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22562v1) | > When reading books, humans focus primarily on the current page, flipping back to recap prior context only when necessary. Similarly, we demonstrate that Large Language Models (LLMs) can learn to dynamically determine when to attend to global context. We propose All-or-Here Attention (AHA), which utilizes a binary router per attention head to dynamically toggle between full attention and local slid...

---

## 594. Self-Rewarded Multimodal Coherent Reasoning Across Diverse Visual Domains

**Authors:** Jesen Zhang, Ningyuan Liu, Kaitong Cai, Sidi Liu, Jing Yang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22545v1) | > Multimodal LLMs often produce fluent yet unreliable reasoning, exhibiting weak step-to-step coherence and insufficient visual grounding, largely because existing alignment approaches supervise only the final answer while ignoring the reliability of the intermediate reasoning process. We introduce SR-MCR, a lightweight and label-free framework that aligns reasoning by exploiting intrinsic process s...

---

## 595. Verifiable Dropout: Turning Randomness into a Verifiable Claim

**Authors:** Kichang Lee, Sungmin Lee, Jaeho Jin, JeongGil Ko

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22526v1) | > Modern cloud-based AI training relies on extensive telemetry and logs to ensure accountability. While these audit trails enable retrospective inspection, they struggle to address the inherent non-determinism of deep learning. Stochastic operations, such as dropout, create an ambiguity surface where attackers can mask malicious manipulations as natural random variance, granting them plausible denia...

---

## 596. Clutter-Resistant Vision-Language-Action Models through Object-Centric and Geometry Grounding

**Authors:** Khoa Vo, Taisei Hanyu, Yuki Ikebe, Trong Thang Pham, Nhat Chung

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22519v1) | > Recent Vision-Language-Action (VLA) models have made impressive progress toward general-purpose robotic manipulation by post-training large Vision-Language Models (VLMs) for action prediction. Yet most VLAs entangle perception and control in a monolithic pipeline optimized purely for action, which can erode language-conditioned grounding. In our real-world tabletop tests, policies over-grasp when ...

---

## 597. Predicting LLM Correctness in Prosthodontics Using Metadata and Hallucination Signals

**Authors:** Lucky Susanto, Anasta Pranawijayana, Cortino Sukotjo, Soni Prasad, Derry Wijaya

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22508v1) | > Large language models (LLMs) are increasingly adopted in high-stakes domains such as healthcare and medical education, where the risk of generating factually incorrect (i.e., hallucinated) information is a major concern. While significant efforts have been made to detect and mitigate such hallucinations, predicting whether an LLM's response is correct remains a critical yet underexplored problem. ...

---

## 598. Hierarchical Pedagogical Oversight: A Multi-Agent Adversarial Framework for Reliable AI Tutoring

**Authors:** Saisab Sadhu, Ashim Dhor

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22496v1) | > Large Language Models (LLMs) are increasingly deployed as automated tutors to address educator shortages; however, they often fail at pedagogical reasoning, frequently validating incorrect student solutions (sycophancy) or providing overly direct answers that hinder learning. We introduce Hierarchical Pedagogical Oversight (HPO), a framework that adapts structured adversarial synthesis to educatio...

---

## 599. Geometric Scaling of Bayesian Inference in LLMs

**Authors:** Naman Aggarwal, Siddhartha R. Dalal, Vishal Misra

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23752v1) | > Recent work has shown that small transformers trained in controlled "wind-tunnel'' settings can implement exact Bayesian inference, and that their training dynamics produce a geometric substrate -- low-dimensional value manifolds and progressively orthogonal keys -- that encodes posterior structure. We investigate whether this geometric signature persists in production-grade language models. Acros...

---

## 600. DarkPatterns-LLM: A Multi-Layer Benchmark for Detecting Manipulative and Harmful AI Behavior

**Authors:** Sadia Asif, Israel Antonio Rosales Laguan, Haris Khan, Shumaila Asif, Muneeb Asif

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22470v1) | > The proliferation of Large Language Models (LLMs) has intensified concerns about manipulative or deceptive behaviors that can undermine user autonomy, trust, and well-being. Existing safety benchmarks predominantly rely on coarse binary labels and fail to capture the nuanced psychological and social mechanisms constituting manipulation. We introduce \textbf{DarkPatterns-LLM}, a comprehensive bench...

---

## 601. MEGA-PCC: A Mamba-based Efficient Approach for Joint Geometry and Attribute Point Cloud Compression

**Authors:** Kai-Hsiang Hsieh, Monyneath Yim, Wen-Hsiao Peng, Jui-Chiu Chiang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22463v1) | > Joint compression of point cloud geometry and attributes is essential for efficient 3D data representation. Existing methods often rely on post-hoc recoloring procedures and manually tuned bitrate allocation between geometry and attribute bitstreams in inference, which hinders end-to-end optimization and increases system complexity. To overcome these limitations, we propose MEGA-PCC, a fully end-t...

---

## 602. Relational Mediators: LLM Chatbots as Boundary Objects in Psychotherapy

**Authors:** Jiatao Quan, Ziyue Li, Tian Qi Zhu, Yuxuan Li, Baoying Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22462v1) | > As large language models (LLMs) are embedded into mental health technologies, they are often framed either as tools assisting therapists or autonomous therapeutic systems. Such perspectives overlook their potential to mediate relational complexities in therapy, particularly for systemically marginalized clients. Drawing on in-depth interviews with 12 therapists and 12 marginalized clients in China...

---

## 603. Exploring the Vertical-Domain Reasoning Capabilities of Large Language Models

**Authors:** Jie Zhou, Xin Chen, Jie Zhang, Zhe Li

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22443v1) | > Large Language Models (LLMs) are reshaping learning paradigms, cognitive processes, and research methodologies across a wide range of domains. Integrating LLMs with professional fields and redefining the relationship between LLMs and domain-specific applications has become a critical challenge for promoting enterprise digital transformation and broader social development. To effectively integrate ...

---

## 604. AnalogSAGE: Self-evolving Analog Design Multi-Agents with Stratified Memory and Grounded Experience

**Authors:** Zining Wang, Jian Gao, Weimin Fu, Xiaolong Guo, Xuan Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22435v1) | > Analog circuit design remains a knowledge- and experience-intensive process that relies heavily on human intuition for topology generation and device parameter tuning. Existing LLM-based approaches typically depend on prompt-driven netlist generation or predefined topology templates, limiting their ability to satisfy complex specification requirements. We propose AnalogSAGE, an open-source self-ev...

---

## 605. Monadic Context Engineering

**Authors:** Yifan Zhang, Mengdi Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22431v1) | > The proliferation of Large Language Models (LLMs) has catalyzed a shift towards autonomous agents capable of complex reasoning and tool use. However, current agent architectures are frequently constructed using imperative, ad hoc patterns. This results in brittle systems plagued by difficulties in state management, error handling, and concurrency. This paper introduces Monadic Context Engineering ...

---

## 606. Nightjar: Dynamic Adaptive Speculative Decoding for Large Language Models Serving

**Authors:** Rui Li, Zhaoning Zhang, Libo Zhang, Huaimin Wang, Xiang Fu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22420v1) | > Speculative decoding (SD) accelerates LLM inference by verifying draft tokens in parallel. However, this method presents a critical trade-off: it improves throughput in low-load, memory-bound systems but degrades performance in high-load, compute-bound environments due to verification overhead. Current SD implementations use a fixed speculative length, failing to adapt to dynamic request rates and...

---

## 607. Building Software by Rolling the Dice: A Qualitative Study of Vibe Coding

**Authors:** Yi-Hung Chou, Boyuan Jiang, Yi Wen Chen, Mingyue Weng, Victoria Jackson

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22418v2) | > Large language models (LLMs) are reshaping software engineering by enabling "vibe coding," in which developers build software primarily through prompts rather than writing code. Although widely publicized as a productivity breakthrough, little is known about how practitioners actually define and engage in these practices. To shed light on this emerging phenomenon, we conducted a grounded theory st...

---

## 608. Hallucination Detection and Evaluation of Large Language Model

**Authors:** Chenggong Zhang, Haopeng Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22416v1) | > Hallucinations in Large Language Models (LLMs) pose a significant challenge, generating misleading or unverifiable content that undermines trust and reliability. Existing evaluation methods, such as KnowHalu, employ multi-stage verification but suffer from high computational costs. To address this, we integrate the Hughes Hallucination Evaluation Model (HHEM), a lightweight classification-based fr...

---

## 609. Mining the Gold: Student-AI Chat Logs as Rich Sources for Automated Knowledge Gap Detection

**Authors:** Quanzhi Fu, Qiyu Wu, Dan Williams

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22404v1) | > With the significant increase in enrollment in computing-related programs over the past 20 years, lecture sizes have grown correspondingly. In large lectures, instructors face challenges on identifying students' knowledge gaps timely, which is critical for effective teaching. Existing classroom response systems rely on instructor-initiated interactions, which limits their ability to capture the sp...

---

## 610. Efficient Multi-Model Orchestration for Self-Hosted Large Language Models

**Authors:** Bhanu Prakash Vangala, Tanu Malik

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22402v1) | > Self-hosting large language models (LLMs) is increasingly appealing for organizations seeking privacy, cost control, and customization. Yet deploying and maintaining in-house models poses challenges in GPU utilization, workload routing, and reliability. We introduce Pick and Spin, a practical framework that makes self-hosted LLM orchestration scalable and economical. Built on Kubernetes, it integr...

---

## 611. HalluMat: Detecting Hallucinations in LLM-Generated Materials Science Content Through Multi-Stage Verification

**Authors:** Bhanu Prakash Vangala, Sajid Mahmud, Pawan Neupane, Joel Selvaraj, Jianlin Cheng

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22396v1) | > Artificial Intelligence (AI), particularly Large Language Models (LLMs), is transforming scientific discovery, enabling rapid knowledge generation and hypothesis formulation. However, a critical challenge is hallucination, where LLMs generate factually incorrect or misleading information, compromising research integrity. To address this, we introduce HalluMatData, a benchmark dataset for evaluatin...

---

## 612. AI-Generated Code Is Not Reproducible (Yet): An Empirical Study of Dependency Gaps in LLM-Based Coding Agents

**Authors:** Bhanu Prakash Vangala, Ali Adibifar, Tanu Malik, Ashish Gehani

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22387v1) | > The rise of Large Language Models (LLMs) as coding agents promises to accelerate software development, but their impact on generated code reproducibility remains largely unexplored. This paper presents an empirical study investigating whether LLM-generated code can be executed successfully in a clean environment with only OS packages and using only the dependencies that the model specifies. We eva...

---

## 613. OxygenREC: An Instruction-Following Generative Framework for E-commerce Recommendation

**Authors:** Xuegang Hao, Ming Zhang, Alex Li, Xiangyu Qian, Zhi Ma

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22386v2) | > Traditional recommendation systems suffer from inconsistency in multi-stage optimization objectives. Generative Recommendation (GR) mitigates them through an end-to-end framework; however, existing methods still rely on matching mechanisms based on inductive patterns. Although responsive, they lack the ability to uncover complex user intents that require deductive reasoning based on world knowledg...

---

## 614. LLM-Guided Exemplar Selection for Few-Shot Wearable-Sensor Human Activity Recognition

**Authors:** Elsen Ronando, Sozo Inoue

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22385v1) | > In this paper, we propose an LLM-Guided Exemplar Selection framework to address a key limitation in state-of-the-art Human Activity Recognition (HAR) methods: their reliance on large labeled datasets and purely geometric exemplar selection, which often fail to distinguish similar weara-ble sensor activities such as walking, walking upstairs, and walking downstairs. Our method incorporates semantic...

---

## 615. Towards Efficient Post-Training via Fourier-Driven Adapter Architectures

**Authors:** Donggyun Bae, Jongil Park

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22378v1) | > We propose a novel framework, termed Fourier-Activated Adapter (FAA), for parameter-efficient fine-tuning of large pre-trained language models. By incorporating random Fourier features into lightweight adapter modules, FAA decomposes intermediate representations into complementary low- and high-frequency components, enabling frequency-aware modulation of semantic information. This design allows th...

---

## 616. Cost-Aware Text-to-SQL: An Empirical Study of Cloud Compute Costs for LLM-Generated Queries

**Authors:** Saurabh Deochake, Debajyoti Mukhopadhyay

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22364v1) | > Text-to-SQL systems powered by Large Language Models (LLMs) achieve high accuracy on standard benchmarks, yet existing efficiency metrics such as the Valid Efficiency Score (VES) measure execution time rather than the consumption-based costs of cloud data warehouses. This paper presents the first systematic evaluation of cloud compute costs for LLM-generated SQL queries. We evaluate six state-of-t...

---

## 617. Agentic Structured Graph Traversal for Root Cause Analysis of Code-related Incidents in Cloud Applications

**Authors:** Shengkun Cui, Rahul Krishna, Saurabh Jha, Ravishankar K. Iyer

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22113v1) | > Cloud incidents pose major operational challenges in production, with unresolved production cloud incidents cost on average over $2M per hour. Prior research identifies code- and configuration-related issues as the predominant category of root causes in cloud incidents. This paper introduces PRAXIS, an orchestrator that manages and deploys an agentic workflow for diagnosing code- and configuration...

---

## 618. Agent2World: Learning to Generate Symbolic World Models via Adaptive Multi-Agent Feedback

**Authors:** Mengkang Hu, Bowei Xia, Yuran Wu, Ailing Yu, Yude Zou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22336v1) | > Symbolic world models (e.g., PDDL domains or executable simulators) are central to model-based planning, but training LLMs to generate such world models is limited by the lack of large-scale verifiable supervision. Current approaches rely primarily on static validation methods that fail to catch behavior-level errors arising from interactive execution. In this paper, we propose Agent2World, a tool...

---

## 619. State-of-the-art Small Language Coder Model: Mify-Coder

**Authors:** Abhinav Parmar, Abhisek Panigrahi, Abhishek Kumar Dwivedi, Abhishek Bhattacharya, Adarsh Ramachandra

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23747v1) | > We present Mify-Coder, a 2.5B-parameter code model trained on 4.2T tokens using a compute-optimal strategy built on the Mify-2.5B foundation model. Mify-Coder achieves comparable accuracy and safety while significantly outperforming much larger baseline models on standard coding and function-calling benchmarks, demonstrating that compact models can match frontier-grade models in code generation an...

---

## 620. Introducing TrGLUE and SentiTurca: A Comprehensive Benchmark for Turkish General Language Understanding and Sentiment Analysis

**Authors:** Duygu Altinok

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22100v1) | > Evaluating the performance of various model architectures, such as transformers, large language models (LLMs), and other NLP systems, requires comprehensive benchmarks that measure performance across multiple dimensions. Among these, the evaluation of natural language understanding (NLU) is particularly critical as it serves as a fundamental criterion for assessing model capabilities. Thus, it is ...

---

## 621. Unifying Learning Dynamics and Generalization in Transformers Scaling Law

**Authors:** Chiwun Yang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22088v1) | > The scaling law, a cornerstone of Large Language Model (LLM) development, predicts improvements in model performance with increasing computational resources. Yet, while empirically validated, its theoretical underpinnings remain poorly understood. This work formalizes the learning dynamics of transformer-based language models as an ordinary differential equation (ODE) system, then approximates thi...

---

## 622. Agent-based simulation of online social networks and disinformation

**Authors:** Alejandro Buitrago López, Alberto Ortega Pastor, David Montoro Aguilera, Mario Fernández Tárraga, Jesús Verdú Chacón

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22082v1) | > Research on online social networks (OSNs) is often hindered by platform opacity, limited access to data, and ethical constraints. Simulation offer a valuable alternative, but existing frameworks frequently lack realism and explainability. This paper presents a simulation framework that models synthetic social networks with agents endowed with demographic-based personality traits and finite-state b...

---

## 623. Prefill vs. Decode Bottlenecks: SRAM-Frequency Tradeoffs and the Memory-Bandwidth Ceiling

**Authors:** Hannah Atmer, Yuan Yao, Thiemo Voigt, Stefanos Kaxiras

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22066v1) | > Energy consumption dictates the cost and environmental impact of deploying Large Language Models. This paper investigates the impact of on-chip SRAM size and operating frequency on the energy efficiency and performance of LLM inference, focusing on the distinct behaviors of the compute-bound prefill and memory-bound decode phases. Our simulation methodology combines OpenRAM for energy modeling, LL...

---

## 624. Context-Aware Intelligent Chatbot Framework Leveraging Mobile Sensing

**Authors:** Ziyan Zhang, Nan Gao, Zhiqiang Nie, Shantanu Pal, Haining Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22032v1) | [DOI](https://doi.org/10.1145/3714394.3756342)

> With the rapid advancement of large language models (LLMs), intelligent conversational assistants have demonstrated remarkable capabilities across various domains. However, they still mainly rely on explicit textual input and do not know the real world behaviors of users. This paper proposes a context-sensitive conversational assistant framework grounded in mobile sensing data. By collecting user ...

---

## 625. Look Closer! An Adversarial Parametric Editing Framework for Hallucination Mitigation in VLMs

**Authors:** Jiayu Hu, Beibei Li, Jiangwei Xia, Yanjun Qin, Bing Ji

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21999v1) | > While Vision-Language Models (VLMs) have garnered increasing attention in the AI community due to their promising practical applications, they exhibit persistent hallucination issues, generating outputs misaligned with visual inputs. Recent studies attribute these hallucinations to VLMs' over-reliance on linguistic priors and insufficient visual feature integration, proposing heuristic decoding ca...

---

## 626. MoFu: Scale-Aware Modulation and Fourier Fusion for Multi-Subject Video Generation

**Authors:** Run Ling, Ke Cao, Jian Lu, Ao Ma, Haowei Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22310v1) | > Multi-subject video generation aims to synthesize videos from textual prompts and multiple reference images, ensuring that each subject preserves natural scale and visual fidelity. However, current methods face two challenges: scale inconsistency, where variations in subject size lead to unnatural generation, and permutation sensitivity, where the order of reference inputs causes subject distortio...

---

## 627. Broken Words, Broken Performance: Effect of Tokenization on Performance of LLMs

**Authors:** Sachin Pawar, Manoj Apte, Kshitij Jadhav, Girish Keshav Palshikar, Nitin Ramrakhiyani

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21933v1) | > Tokenization is the first step in training any Large Language Model (LLM), where the text is split into a sequence of tokens as per the model's fixed vocabulary. This tokenization in LLMs is different from the traditional tokenization in NLP where the text is split into a sequence of "natural" words. In LLMs, a natural word may also be broken into multiple tokens due to limited vocabulary size of ...

---

## 628. Exploring the Heterogeneity of Tabular Data: A Diversity-aware Data Generator via LLMs

**Authors:** Yafeng Tang, Xiaoou Ding, Jianzhuo Du, Zishuo Yan, Zhuang Ma

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21915v1) | > Tabular data generation has become increasingly essential for enabling robust machine learning applications, which require large-scale, high-quality data. Existing solutions leverage generative models to learn original data distributions. However, real-world data are naturally heterogeneous with diverse distributions, making it challenging to obtain a universally good model for diverse data genera...

---

## 629. Accelerate Speculative Decoding with Sparse Computation in Verification

**Authors:** Jikai Wang, Jianchao Tan, Yuxuan Hu, Jiayu Qin, Yerui Sun

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21911v1) | > Speculative decoding accelerates autoregressive language model inference by verifying multiple draft tokens in parallel. However, the verification stage often becomes the dominant computational bottleneck, especially for long-context inputs and mixture-of-experts (MoE) models. Existing sparsification methods are designed primarily for standard token-by-token autoregressive decoding to remove subst...

---

## 630. Explainable Statute Prediction via Attention-based Model and LLM Prompting

**Authors:** Sachin Pawar, Girish Keshav Palshikar, Anindita Sinha Banerjee, Nitin Ramrakhiyani, Basit Ali

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21902v1) | > In this paper, we explore the problem of automatic statute prediction where for a given case description, a subset of relevant statutes are to be predicted. Here, the term "statute" refers to a section, a sub-section, or an article of any specific Act. Addressing this problem would be useful in several applications such as AI-assistant for lawyers and legal question answering system. For better us...

---

## 631. LLMBoost: Make Large Language Models Stronger with Boosting

**Authors:** Zehao Chen, Tianxiang Ai, Yifei Li, Gongxun Li, Yuyang Wei

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22309v1) | > Ensemble learning of LLMs has emerged as a promising alternative to enhance performance, but existing approaches typically treat models as black boxes, combining the inputs or final outputs while overlooking the rich internal representations and interactions across models.In this work, we introduce LLMBoost, a novel ensemble fine-tuning framework that breaks this barrier by explicitly leveraging i...

---

## 632. Optimizing Resource Allocation for Geographically-Distributed Inference by Large Language Models

**Authors:** Tingyang Sun, Ting He, Bo Ji, Parimal Parag

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21884v1) | [DOI](https://doi.org/10.1016/j.peva.2025.102527)

> Large language models have demonstrated extraordinary performance in many AI tasks but are expensive to use, even after training, due to their requirement of high-end GPUs. Recently, a distributed system called PETALS was developed to lower the barrier for deploying LLMs by splitting the model blocks across multiple servers with low-end GPUs distributed over the Internet, which was much faster tha...

---

## 633. MASFIN: A Multi-Agent System for Decomposed Financial Reasoning and Forecasting

**Authors:** Marc S. Montalvo, Hamed Yaghoobian

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21878v1) | > Recent advances in large language models (LLMs) are transforming data-intensive domains, with finance representing a high-stakes environment where transparent and reproducible analysis of heterogeneous signals is essential. Traditional quantitative methods remain vulnerable to survivorship bias, while many AI-driven approaches struggle with signal integration, reproducibility, and computational ef...

---

## 634. CricBench: A Multilingual Benchmark for Evaluating LLMs in Cricket Analytics

**Authors:** Vaibhav Devraj, Dhruv Kumar, Jagat Sesh Challa

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21877v1) | > Cricket is the second most popular sport globally, commanding a massive following of over 2.5 billion fans globally. Enthusiasts and analysts frequently seek advanced statistical insights, such as long-term historical performance trends or complex player comparisons, that are often unavailable through standard web searches. While Large Language Models (LLMs) have advanced significantly in Text-to-...

---

## 635. Beyond Single Bugs: Benchmarking Large Language Models for Multi-Vulnerability Detection

**Authors:** Chinmay Pushkar, Sanchit Kabra, Dhruv Kumar, Jagat Sesh Challa

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22306v1) | > Large Language Models (LLMs) have demonstrated significant potential in automated software security, particularly in vulnerability detection. However, existing benchmarks primarily focus on isolated, single-vulnerability samples or function-level classification, failing to reflect the complexity of real-world software where multiple interacting vulnerabilities often coexist within large files. Rec...

---

## 636. TimeBill: Time-Budgeted Inference for Large Language Models

**Authors:** Qi Fan, An Zou, Yehan Ma

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21859v1) | > Large Language Models (LLMs) are increasingly deployed in time-critical systems, such as robotics, autonomous driving, embodied intelligence, and industrial automation, where generating accurate responses within a given time budget is crucial for decision-making, control, or safety-critical tasks. However, the auto-regressive generation process of LLMs makes it challenging to model and estimate th...

---

## 637. Fast Inference of Visual Autoregressive Model with Adjacency-Adaptive Dynamical Draft Trees

**Authors:** Haodong Lei, Hongsong Wang, Xin Geng, Liang Wang, Pan Zhou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21857v1) | > Autoregressive (AR) image models achieve diffusion-level quality but suffer from sequential inference, requiring approximately 2,000 steps for a 576x576 image. Speculative decoding with draft trees accelerates LLMs yet underperforms on visual AR models due to spatially varying token prediction difficulty. We identify a key obstacle in applying speculative decoding to visual AR models: inconsistent...

---

## 638. A Comedy of Estimators: On KL Regularization in RL Training of LLMs

**Authors:** Vedant Shah, Johan Obando-Ceron, Vineet Jain, Brian Bartoldson, Bhavya Kailkhura

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21852v1) | > The reasoning performance of large language models (LLMs) can be substantially improved by training them with reinforcement learning (RL). The RL objective for LLM training involves a regularization term, which is the reverse Kullback-Leibler (KL) divergence between the trained policy and the reference policy. Since computing the KL divergence exactly is intractable, various estimators are used in...

---

## 639. HeartBench: Probing Core Dimensions of Anthropomorphic Intelligence in LLMs

**Authors:** Jiaxin Liu, Peiyi Tu, Wenyu Chen, Yihong Zhuang, Xinxia Ling

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21849v1) | > While Large Language Models (LLMs) have achieved remarkable success in cognitive and reasoning benchmarks, they exhibit a persistent deficit in anthropomorphic intelligence-the capacity to navigate complex social, emotional, and ethical nuances. This gap is particularly acute in the Chinese linguistic and cultural context, where a lack of specialized evaluation frameworks and high-quality socio-em...

---

## 640. AlignAR: Generative Sentence Alignment for Arabic-English Parallel Corpora of Legal and Literary Texts

**Authors:** Baorong Huang, Ali Asiri

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21842v1) | > High-quality parallel corpora are essential for Machine Translation (MT) research and translation teaching. However, Arabic-English resources remain scarce and existing datasets mainly consist of simple one-to-one mappings. In this paper, we present AlignAR, a generative sentence alignment method, and a new Arabic-English dataset comprising complex legal and literary texts. Our evaluation demonstr...

---

## 641. Knowledge Reasoning of Large Language Models Integrating Graph-Structured Information for Pest and Disease Control in Tobacco

**Authors:** Siyu Li, Chenwei Song, Wan Zhou, Xinyi Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21837v1) | > This paper proposes a large language model (LLM) approach that integrates graph-structured information for knowledge reasoning in tobacco pest and disease control. Built upon the GraphRAG framework, the proposed method enhances knowledge retrieval and reasoning by explicitly incorporating structured information from a domain-specific knowledge graph. Specifically, LLMs are first leveraged to assis...

---

## 642. LIME:Accelerating Collaborative Lossless LLM Inference on Memory-Constrained Edge Devices

**Authors:** Mingyu Sun, Xiao Zhang, Shen Qu, Yan Li, Mengbai Xiao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21835v1) | > Large language models (LLMs) have emerged as a powerful foundation for intelligent reasoning and decision-making, demonstrating substantial impact across a wide range of domains and applications. However, their massive parameter scales and substantial resource demands pose critical challenges for efficient inference on edge devices. These devices are inherently constrained by limited computational...

---

## 643. Hybrid-Code: A Privacy-Preserving, Redundant Multi-Agent Framework for Reliable Local Clinical Coding

**Authors:** Yunguo Yu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23743v1) | > Clinical coding automation using cloud-based Large Language Models (LLMs) poses privacy risks and latency bottlenecks, rendering them unsuitable for on-premise healthcare deployment. We introduce Hybrid-Code, a hybrid neuro-symbolic multi-agent framework for local clinical coding that ensures production reliability through redundancy and verification. Our system comprises two agents: a Coder that ...

---

## 644. Contextual Biasing for LLM-Based ASR with Hotword Retrieval and Reinforcement Learning

**Authors:** YuXiang Kong, JunFeng Hou, Jian Tang, Bingqing Zhu, Jicheng Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21828v1) | > Large language model (LLM)-based automatic speech recognition (ASR) has recently achieved strong performance across diverse tasks, yet contextual biasing for named entities and hotwords under large vocabularies remains challenging. In this work, we propose a scalable two-stage framework that integrates hotword retrieval with LLM-ASR adaptation. First, we extend the Global-Local Contrastive Languag...

---

## 645. AgenticTCAD: A LLM-based Multi-Agent Framework for Automated TCAD Code Generation and Device Optimization

**Authors:** Guangxi Fan, Tianliang Ma, Xuguang Sun, Xun Wang, Kain Lu Low

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23742v1) | > With the continued scaling of advanced technology nodes, the design-technology co-optimization (DTCO) paradigm has become increasingly critical, rendering efficient device design and optimization essential. In the domain of TCAD simulation, however, the scarcity of open-source resources hinders language models from generating valid TCAD code. To overcome this limitation, we construct an open-sourc...

---

## 646. Analyzing Code Injection Attacks on LLM-based Multi-Agent Systems in Software Development

**Authors:** Brian Bowers, Smita Khapre, Jugal Kalita

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21818v1) | > Agentic AI and Multi-Agent Systems are poised to dominate industry and society imminently. Powered by goal-driven autonomy, they represent a powerful form of generative AI, marking a transition from reactive content generation into proactive multitasking capabilities. As an exemplar, we propose an architecture of a multi-agent system for the implementation phase of the software engineering process...

---

## 647. Method Decoration (DeMe): A Framework for LLM-Driven Adaptive Method Generation in Dynamic IoT Environments

**Authors:** Hong Su

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21817v1) | > Intelligent IoT systems increasingly rely on large language models (LLMs) to generate task-execution methods for dynamic environments. However, existing approaches lack the ability to systematically produce new methods when facing previously unseen situations, and they often depend on fixed, device-specific logic that cannot adapt to changing environmental conditions.In this paper, we propose Meth...

---

## 648. On The Conceptualization and Societal Impact of Cross-Cultural Bias

**Authors:** Vitthal Bhandari

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21809v1) | > Research has shown that while large language models (LLMs) can generate their responses based on cultural context, they are not perfect and tend to generalize across cultures. However, when evaluating the cultural bias of a language technology on any dataset, researchers may choose not to engage with stakeholders actually using that technology in real life, which evades the very fundamental proble...

---

## 649. Generative Lecture: Making Lecture Videos Interactive with LLMs and AI Clone Instructors

**Authors:** Hye-Young Jo, Ada Yi Zhao, Xiaoan Liu, Ryo Suzuki

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21796v2) | > We introduce Generative Lecture, a concept that makes existing lecture videos interactive through generative AI and AI clone instructors. By leveraging interactive avatars powered by HeyGen, ElevenLabs, and GPT-5, we embed an AI instructor into the video and augment the video content in response to students' questions. This allows students to personalize the lecture material, directly ask question...

---

## 650. Five Years of SciCap: What We Learned and Future Directions for Scientific Figure Captioning

**Authors:** Ting-Hao K. Huang, Ryan A. Rossi, Sungchul Kim, Tong Yu, Ting-Yao E. Hsu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21789v1) | > Between 2021 and 2025, the SciCap project grew from a small seed-funded idea at The Pennsylvania State University (Penn State) into one of the central efforts shaping the scientific figure-captioning landscape. Supported by a Penn State seed grant, Adobe, and the Alfred P. Sloan Foundation, what began as our attempt to test whether domain-specific training, which was successful in text models like...

---

## 651. Accelerating Scientific Discovery with Autonomous Goal-evolving Agents

**Authors:** Yuanqi Du, Botao Yu, Tianyu Liu, Tony Shen, Junwu Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21782v1) | > There has been unprecedented interest in developing agents that expand the boundary of scientific discovery, primarily by optimizing quantitative objective functions specified by scientists. However, for grand challenges in science , these objectives are only imperfect proxies. We argue that automating objective function design is a central, yet unmet requirement for scientific discovery agents. I...

---

## 652. HELP: Hierarchical Embodied Language Planner for Household Tasks

**Authors:** Alexandr V. Korchemnyi, Anatoly O. Onishchenko, Eva A. Bakaeva, Alexey K. Kovalev, Aleksandr I. Panov

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21723v1) | > Embodied agents tasked with complex scenarios, whether in real or simulated environments, rely heavily on robust planning capabilities. When instructions are formulated in natural language, large language models (LLMs) equipped with extensive linguistic knowledge can play this role. However, to effectively exploit the ability of such models to handle linguistic ambiguity, to retrieve information f...

---

## 653. CATCH: A Controllable Theme Detection Framework with Contextualized Clustering and Hierarchical Generation

**Authors:** Rui Ke, Jiahui Xu, Shenghao Yang, Kuang Wang, Feng Jiang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21715v1) | > Theme detection is a fundamental task in user-centric dialogue systems, aiming to identify the latent topic of each utterance without relying on predefined schemas. Unlike intent induction, which operates within fixed label spaces, theme detection requires cross-dialogue consistency and alignment with personalized user preferences, posing significant challenges. Existing methods often struggle wit...

---

## 654. Do Latent Tokens Think? A Causal and Adversarial Analysis of Chain-of-Continuous-Thought

**Authors:** Yuyi Zhang, Boyu Tang, Tianjie Ju, Sufeng Duan, Gongshen Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21711v1) | > Latent tokens are gaining attention for enhancing reasoning in large language models (LLMs), yet their internal mechanisms remain unclear. This paper examines the problem from a reliability perspective, uncovering fundamental weaknesses: latent tokens function as uninterpretable placeholders rather than encoding faithful reasoning. While resistant to perturbation, they promote shortcut usage over ...

---

## 655. Detecting AI-Generated Paraphrases in Bengali: A Comparative Study of Zero-Shot and Fine-Tuned Transformers

**Authors:** Md. Rakibul Islam, Most. Sharmin Sultana Samu, Md. Zahid Hossain, Farhad Uz Zaman, Md. Kamrozzaman Bhuiyan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21709v1) | > Large language models (LLMs) can produce text that closely resembles human writing. This capability raises concerns about misuse, including disinformation and content manipulation. Detecting AI-generated text is essential to maintain authenticity and prevent malicious applications. Existing research has addressed detection in multiple languages, but the Bengali language remains largely unexplored....

---

## 656. MoRAgent: Parameter Efficient Agent Tuning with Mixture-of-Roles

**Authors:** Jing Han, Binwei Yan, Tianyu Guo, Zheyuan Bai, Mengyu Zheng

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21708v1) | > Despite recent advancements of fine-tuning large language models (LLMs) to facilitate agent tasks, parameter-efficient fine-tuning (PEFT) methodologies for agent remain largely unexplored. In this paper, we introduce three key strategies for PEFT in agent tasks: 1) Inspired by the increasingly dominant Reason+Action paradigm, we first decompose the capabilities necessary for the agent tasks into t...

---

## 657. Towards Responsible and Explainable AI Agents with Consensus-Driven Reasoning

**Authors:** Eranga Bandara, Tharaka Hewa, Ross Gore, Sachin Shetty, Ravi Mukkamala

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21699v1) | > Agentic AI represents a major shift in how autonomous systems reason, plan, and execute multi-step tasks through the coordination of Large Language Models (LLMs), Vision Language Models (VLMs), tools, and external services. While these systems enable powerful new capabilities, increasing autonomy introduces critical challenges related to explainability, accountability, robustness, and governance, ...

---

## 658. S21 Mind: Improving LLM Truthfulness via Information-Theoretic

**Authors:** Bachani, Suhail

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17962624) | [DOI](https://doi.org/10.5281/zenodo.17962624)

> S21 Mind: Improving LLM Truthfulness via Information-Theoretic Data Curation Sharad Bachani S21 Labs sharad.bachani@merlin-me.com December 2025 Abstract We present S21 Mind, a novel approach to improving language model truthfulness through information- theoretic data curation rather than post-hoc detection. Our method achieves 38% accuracy on MATH-Hard (2× base Llama 3.1 8B) while maintaining 73.6...

---

## 659. Hard Negative Sample-Augmented DPO Post-Training for Small Language Models

**Authors:** Haocheng Lu, Minjun Zhu, Henry Yu

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.19728) | [DOI](https://doi.org/10.48550/arxiv.2512.19728)

> Large language models (LLMs) continue to struggle with mathematical reasoning, and common post-training pipelines often reduce each generated solution to a binary outcome: correct or incorrect. This perspective is limiting in practice, as failures in chain-of-thought (CoT) reasoning are frequently structured; solutions may appear convincing while containing subtle logical, algebraic, or numerical ...

---

## 660. Puzzle Curriculum GRPO for Vision-Centric Reasoning

**Authors:** Jeddi, Ahmadreza, Karaimer, Hakki Can, Nguyen, Hue, Wang, Zhongling, Zhao, Ke

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.14944) | [DOI](https://doi.org/10.48550/arxiv.2512.14944)

> Recent reinforcement learning (RL) approaches like outcome-supervised GRPO have advanced chain-of-thought reasoning in Vision Language Models (VLMs), yet key issues linger: (i) reliance on costly and noisy hand-curated annotations or external verifiers; (ii) flat and sparse reward schemes in GRPO; and (iii) logical inconsistency between a chain's reasoning and its final answer. We present Puzzle C...

---

## 661. Verification-Guided Context Optimization for Tool Calling via Hierarchical LLMs-as-Editors

**Authors:** H L Li, Shibing You, Flavio Di Palo, Yun Qian, Ayush Jain

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.13860) | [DOI](https://doi.org/10.48550/arxiv.2512.13860)

> Tool calling enables large language models (LLMs) to interact with external environments through tool invocation, providing a practical way to overcome the limitations of pretraining. However, the effectiveness of tool use depends heavily on the quality of the associated documentation and knowledge base context. These materials are usually written for human users and are often misaligned with how ...

---

## 662. THE PLANETARY METABOLIC ANOMALY NETWORK (PMAN): A Unified Architecture for Life, Intelligence, Infrastructure, and Civilization

**Authors:** Brewer, Mark Anthony

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17921388) | [DOI](https://doi.org/10.5281/zenodo.17921388)

> THE PLANETARY METABOLIC ANOMALY NETWORK (PMAN): A Unified Architecture for Life, Intelligence, Infrastructure, and Civilization 1. Executive Statement: The Structural Invalidation of the Monopoly Hypothesis The economic and technological historiography of the early 21st century has been dominated by a singular, pervasive, and largely unchallenged narrative: the "Trillionaire Trajectory".1 This eco...

---

## 663. (Immortal Band)The Architecture of Resonance: Civilization Infrastructure for the Post-Extractive Age

**Authors:** Brewer, Mark Anthony

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17904924) | [DOI](https://doi.org/10.5281/zenodo.17904924)

> The Architecture of Resonance: Civilization Infrastructure for the Post-Extractive Age 1. Executive Preface: The Transition from Extractive to Metabolic Intelligence The trajectory of twenty-first-century technology has been defined by a singular, overwhelming logic: extraction. This paradigm, inherited from the industrial revolution and accelerated by the silicon age, treats the world as a reserv...

---

## 664. MentraSuite: Post-Training Large Language Models for Mental Health Reasoning and Assessment

**Authors:** Mengxi Xiao, Kailai Yang, Pengyu Zhao, Enze Zhang, Ziyan Kuang

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.09636) | [DOI](https://doi.org/10.48550/arxiv.2512.09636)

> Mental health disorders affect hundreds of millions globally, and the Web now serves as a primary medium for accessing support, information, and assessment. Large language models (LLMs) offer scalable and accessible assistance, yet their deployment in mental-health settings remains risky when their reasoning is incomplete, inconsistent, or ungrounded. Existing psychological LLMs emphasize emotiona...

---

## 665. How Do LLMs Fail In Agentic Scenarios? A Qualitative Analysis of Success and Failure Scenarios of Various LLMs in Agentic Simulations

**Authors:** Roig Jv

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.07497) | [DOI](https://doi.org/10.48550/arxiv.2512.07497)

> We investigate how large language models (LLMs) fail when operating as autonomous agents with tool-use capabilities. Using the Kamiwaza Agentic Merit Index (KAMI) v0.1 benchmark, we analyze 900 execution traces from three representative models - Granite 4 Small, Llama 4 Maverick, and DeepSeek V3.1 - across filesystem, text extraction, CSV analysis, and SQL scenarios. Rather than focusing on aggreg...

---

## 666. Semantic Soft Bootstrapping: Long Context Reasoning in LLMs without Reinforcement Learning

**Authors:** Purbesh Mitra, Şennur Ulukuş

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.05105) | [DOI](https://doi.org/10.48550/arxiv.2512.05105)

> Long context reasoning in large language models (LLMs) has demonstrated enhancement of their cognitive capabilities via chain-of-thought (CoT) inference. Training such models is usually done via reinforcement learning with verifiable rewards (RLVR) in reasoning based problems, like math and programming. However, RLVR is limited by several bottlenecks, such as, lack of dense reward, and inadequate ...

---

## 667. The Agentic Horizon: A Comprehensive Analysis of Autonomous Digital Systems and Planetary Intelligence Architectures

**Authors:** Brewer, Mark Anthony

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17798764) | [DOI](https://doi.org/10.5281/zenodo.17798764)

> The Agentic Horizon: A Comprehensive Analysis of Autonomous Digital Systems and Planetary Intelligence Architectures Executive Summary The global technological landscape is currently navigating a profound phase transition, moving from the era of "Passive Intelligence"—characterized by static models and responsive chat interfaces—to the era of "Agentic Intelligence." This shift represents the most ...

---

## 668. When Does Verification Pay Off? A Closer Look at LLMs as Solution Verifiers

**Authors:** Lu, Jack, Teehan, Ryan, Jin, Jinran, Ren, Mengye

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.02304) | [DOI](https://doi.org/10.48550/arxiv.2512.02304)

> Large language models (LLMs) can act as both problem solvers and solution verifiers, with verifiers improving solver performance by selecting high-quality answers from a pool of candidates. However, prior studies of solver-verifier interactions have been limited, focusing mainly on self-verification and rarely examining how verifiers judge outputs from models in their own or in another model famil...

---

## 669. Aligning LLMs with Biomedical Knowledge using Balanced Fine-Tuning

**Authors:** Zhenzhou Tang, Fang Wang, Huixin He, Jiale Zhou, Jun Zhu

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2511.21075) | [DOI](https://doi.org/10.48550/arxiv.2511.21075)

> Effective post-training is essential to align Large Language Models (LLMs) with specialized biomedical knowledge to accelerate life science research. However, current approaches face significant limitations. First, biomedical reasoning involves intricate mechanisms often represented by sparse textual data. Standard Supervised Fine-Tuning (SFT) tends to overfit to surface-level instruction patterns...

---

## 670. Agentic Transformer

**Authors:** Dae-Kyoo Kim

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17671599) | [DOI](https://doi.org/10.5281/zenodo.17671599)

> Agentic Transformer is a modular large-language-model (LLM) architecture designed to support post-deployment, agent-specific specialization through static routing and parameter modularity. The Agentic Transformer allows each agent module to be independently fine-tuned after deployment while the shared backbone and all other agents remain frozen. This Zenodo upload provides the complete collection ...

---

## 671. Fast LLM Post-training via Decoupled and Best-of-N Speculation

**Authors:** Cheng, Rongxin, Zhou Kai, Wei, Xingda, Liu Siyuan, Han, Mingcong

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2511.16193) | [DOI](https://doi.org/10.48550/arxiv.2511.16193)

> Rollout dominates the training time in large language model (LLM) post-training, where the trained model is used to generate tokens given a batch of prompts. SpecActor achieves fast rollout with speculative decoding that deploys a fast path (e.g., a smaller model) to accelerate the unparallelizable generation, while the correctness is guaranteed by fast parallel verification of the outputs with th...

---

## 672. AI Reasoning

**Authors:** Association for Artificial Intelligence 2025, Hoos, Holger H., Kambhampati, Subbarao, Rossi, Francesca

**Year:** 2025 | **Venue:** Underline Science Inc. | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48448/g5nh-er75) | [DOI](https://doi.org/10.48448/g5nh-er75)

> The ability to reason has been a salient characteristic of human intelligence, and there is a critical need for verifiable reasoning in AI systems. <br><br> Main Takeaways<br><br> * Reasoning has always been seen as a core characteristic of human intelligence. Reasoning is used to derive new information from given base knowledge; this new information is guaranteed correct when sound formal reasoni...

---

## 673. SEAL: Subspace-Anchored Watermarks for LLM Ownership

**Authors:** Yanbo Dai, Zongjie Li, Zhenlan Ji

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2511.11356) | [DOI](https://doi.org/10.48550/arxiv.2511.11356)

> Large language models (LLMs) have achieved remarkable success across a wide range of natural language processing tasks, demonstrating human-level performance in text generation, reasoning, and question answering. However, training such models requires substantial computational resources, large curated datasets, and sophisticated alignment procedures. As a result, they constitute highly valuable in...

---

## 674. AdvancedIF: Rubric-Based Benchmarking and Reinforcement Learning for Advancing LLM Instruction Following

**Authors:** Yun He, Hejia Zhang, Song‐Lin Li, Karishma Mandyam, Yuanhao Xiong

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2511.10507) | [DOI](https://doi.org/10.48550/arxiv.2511.10507)

> Recent progress in large language models (LLMs) has led to impressive performance on a range of tasks, yet advanced instruction following (IF)-especially for complex, multi-turn, and system-prompted instructions-remains a significant challenge. Rigorous evaluation and effective training for such capabilities are hindered by the lack of high-quality, human-annotated benchmarks and reliable, interpr...

---

## 675. Rubric-Based Benchmarking and Reinforcement Learning for Advancing LLM Instruction Following

**Authors:** He Yun, Li Wenzhe, Zhang He-jia, Li Songlin, Mandyam, Karishma

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2511.10507) | [DOI](https://doi.org/10.48550/arxiv.2511.10507)

> Recent progress in large language models (LLMs) has led to impressive performance on a range of tasks, yet advanced instruction following (IF)-especially for complex, multi-turn, and system-prompted instructions-remains a significant challenge. Rigorous evaluation and effective training for such capabilities are hindered by the lack of high-quality, human-annotated benchmarks and reliable, interpr...

---

## 676. RLAC: Reinforcement Learning with Adversarial Critic for Free-Form Generation Tasks

**Authors:** Ming-Hung Wu, Gavin Zhang, Sewon Min, Sergey Levine, Aviral Kumar

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2511.01758) | [DOI](https://doi.org/10.48550/arxiv.2511.01758)

> Open-ended generation tasks require outputs to satisfy diverse and often implicit task-specific evaluation rubrics. The sheer number of relevant rubrics leads to prohibitively high verification costs and incomplete assessments of a response, making reinforcement learning (RL) post-training with rubric-based rewards difficult to scale. This problem is exacerbated by the fact that often the best way...

---

## 677. AudioSet-R: A Refined AudioSet with Multi-Stage LLM Label Reannotation

**Authors:** Yining Sun, Qisheng Xu, Yi Su, Qian Zhu, Yong Dou

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2508.15429) | [DOI](https://doi.org/10.1145/3746027.3758260)

> AudioSet is a widely used benchmark in the audio research community and has significantly advanced various audio-related tasks. However, persistent issues with label accuracy and completeness remain critical bottlenecks that limit performance in downstream applications.To address the aforementioned challenges, we propose a three-stage reannotation framework that harnesses general-purpose audio-lan...

---

## 678. To Judge or Not to Judge: Using LLM Judgements for Advertiser Keyphrase Relevance at eBay

**Authors:** Soumik Dey, Hansi Wu, Betty M. Li

**Year:** 2025 | **Venue:** Frontiers in artificial intelligence and applications | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.3233/faia251471) | [DOI](https://doi.org/10.3233/faia251471)

> E-commerce sellers are recommended keyphrases based on their inventory on which they advertise to increase buyer engagement (clicks/sales). The relevance of advertiser keyphrases plays an important role in preventing the inundation of search systems with numerous irrelevant items that compete for attention in auctions, in addition to maintaining a healthy seller perception. In this work, we descri...

---

## 679. Balancing Caregiving and Self-Care: Exploring Mental Health Needs of Alzheimer's and Dementia Caregivers

**Authors:** Jiayue Melissa Shi, Keran Wang, Dong Whi Yoo, Ravi Karkar, Koustuv Saha

**Year:** 2025 | **Venue:** Proceedings of the ACM on Human-Computer Interaction | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.1145/3757555) | [DOI](https://doi.org/10.1145/3757555)

> Alzheimer's Disease and Related Dementias (AD/ADRD) are progressive neurodegenerative conditions that impair memory, thought processes, and functioning. Family caregivers of individuals with AD/ADRD face significant mental health challenges due to long-term caregiving responsibilities. Yet, current support systems often overlook the evolving nature of their mental wellbeing needs. Our study examin...

---

## 680. PoTS: Proof-of-Training-Steps for Backdoor Detection in Large Language Models

**Authors:** Issam Seddik, Sami Souihi, Mohamed Tamaazousti, Sara Tucci-Piergiovanni

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2510.15106) | [DOI](https://doi.org/10.48550/arxiv.2510.15106)

> As Large Language Models (LLMs) gain traction across critical domains, ensuring secure and trustworthy training processes has become a major concern. Backdoor attacks, where malicious actors inject hidden triggers into training data, are particularly insidious and difficult to detect. Existing post-training verification solutions like Proof-of-Learning are impractical for LLMs due to their require...

---

## 681. LLM-Guided Synthetic Augmentation (LGSA) for Mitigating Bias in AI Systems

**Authors:** Sai Suhruth Reddy Karri, Yashwanth Sai Nallapuneni, Laxmi Narasimha Reddy Mallireddy, G Gopichand

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2510.13202) | [DOI](https://doi.org/10.48550/arxiv.2510.13202)

> Bias in AI systems, especially those relying on natural language data, raises ethical and practical concerns. Underrepresentation of certain groups often leads to uneven performance across demographics. Traditional fairness methods, such as pre-processing, in-processing, and post-processing, depend on protected-attribute labels, involve accuracy-fairness trade-offs, and may not generalize across d...

---

## 682. Simulation ≠ Presence – On the Auditory Precision Between Responsive Language Systems and Load-Bearing Architecture in the Age of AI

**Authors:** Orto, Salvatore

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17692773) | [DOI](https://doi.org/10.5281/zenodo.17692773)

> SSRN Abstract This paper develops a reflexive framework for understanding why Large Language Models (LLMs) simulate presence without generating epistemic substance.It introduces a structural distinction between responsiveness and architecture, arguing that contemporary AI systems operate within statistical approximation rather than semantic grounding. Building on the broader Audit-Based Epistemic ...

---

## 683. Direct Multi-Token Decoding

**Authors:** Xuan Luo, Weizhi Wang, Xifeng Yan

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2510.11958) | [DOI](https://doi.org/10.48550/arxiv.2510.11958)

> Decoder-only transformers have become the standard architecture for large language models (LLMs) due to their strong performance. Recent studies suggest that, in pre-trained LLMs, early, middle, and late layers may serve distinct roles: Early layers focus on understanding the input context, middle layers handle task-specific processing, and late layers convert abstract representations into output ...

---

## 684. Diffusion vs. Autoregressive Language Models: A Text Embedding Perspective

**Authors:** Association for Computational Linguistics 2025, Cohan, Arman, Geng Liyuan, Luu, Anh Tuan, Zhang Siyue

**Year:** 2025 | **Venue:** Underline Science Inc. | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48448/mm9t-1y20) | [DOI](https://doi.org/10.48448/mm9t-1y20)

> Large language model (LLM)-based embedding models, benefiting from large scale pre-training and post-training, have begun to surpass BERT and T5-based models on general-purpose text embedding tasks such as document retrieval. However, a fundamental limitation of LLM embeddings lies in the unidirectional attention used during autoregressive pre-training, which misaligns with the bidirectional natur...

---

## 685. Table-R1: Inference-Time Scaling for Table Reasoning Tasks

**Authors:** Association for Computational Linguistics 2025, Chen, Lyuhao, Cohan, Arman, Yang, Zheyuan, Zhao, Yilun

**Year:** 2025 | **Venue:** Underline Science Inc. | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48448/fnh7-4n20) | [DOI](https://doi.org/10.48448/fnh7-4n20)

> In this work, we present the first study to explore inference-time scaling on table reasoning tasks. We develop and evaluate two post-training strategies to enable inference-time scaling: distillation from frontier model reasoning traces and reinforcement learning with verifiable rewards (RLVR). For distillation, we introduce a large-scale dataset of reasoning traces generated by DeepSeek-R1, whic...

---

## 686. What You See Is What It Does: A Structural Pattern for Legible Software

**Authors:** Eagon Meng, Daniel Jackson

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

[PDF](https://dl.acm.org/doi/pdf/10.1145/3759429.3762628) | [DOI](https://doi.org/10.1145/3759429.3762628)

> The opportunities offered by LLM coders (and their current limitations) demand a reevaluation of how software is structured. Software today is often "illegible" - lacking a direct correspondence between code and observed behavior - and insufficiently modular, leading to a failure of three key requirements of robust coding: incrementality (the ability to deliver small increments by making localized...

---

## 687. Arithmetic with spatiotemporal optical vortex of integer and fractional topological charges

**Authors:** Hsiao-Chih Huang, Chen-Ting Liao, Hui Min Leung

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25049v1) | > Spatiotemporal optical vortices carry transverse orbital angular momentum (t-OAM), which give rise to spatiotemporal topological charge (ST-TC). To unleash the full potential of t-OAM in expanding the capacity of communication and computing, we demonstrate the first optical information-processing pipeline capable of performing addition and subtraction on ST-TC values, regardless of whether they ar...

---

## 688. Thin Tree Verification is coNP-Complete

**Authors:** Alice Moayyedi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25043v1) | > An $α$-thin tree $T$ of a graph $G$ is a spanning tree such that every cut of $G$ has at most an $α$ proportion of its edges in $T$. The Thin Tree Conjecture proposes that there exists a function $f$ such that for any $α> 0$, every $f(α)$-edge-connected graph has an $α$-thin tree. Aside from its independent interest, an algorithm which could efficiently construct an $O(1)/k$-thin tree for a given ...

---

## 689. SoK: Web3 RegTech for Cryptocurrency VASP AML/CFT Compliance

**Authors:** Qian'ang Mao, Jiaxin Wang, Ya Liu, Li Zhu, Jiaman Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24888v1) | > The decentralized architecture of Web3 technologies creates fundamental challenges for Anti-Money Laundering and Counter-Financing of Terrorism compliance. Traditional regulatory technology solutions designed for centralized financial systems prove inadequate for blockchain's transparent yet pseudonymous networks. This systematization examines how blockchain-native RegTech solutions leverage distr...

---

## 690. On an Erdős--Lov'asz problem: 3-critical 3-graphs of minimum degree 7

**Authors:** Ruiliang Li

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24850v1) | > Erdős and Lov'asz asked whether there exists a "3-critical" 3-uniform hypergraph in which every vertex has degree at least 7. The original formulation does not specify what 3-critical means, and two non-equivalent notions have appeared in the literature and in later discussions of the problem. In this paper we resolve the question under both interpretations. For the transversal interpretation (cri...

---

## 691. Limits of quantum generative models with classical sampling hardness

**Authors:** Sabrina Herbst, Ivona Brandić, Adrián Pérez-Salinas

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24801v1) | > Sampling tasks have been successful in establishing quantum advantages both in theory and experiments. This has fueled the use of quantum computers for generative modeling to create samples following the probability distribution underlying a given dataset. In particular, the potential to build generative models on classically hard distributions would immediately preclude classical simulability, du...

---

## 692. Group Deliberation Oriented Multi-Agent Conversational Model for Complex Reasoning

**Authors:** Zheyu Shi, Dong Qiu, Shanlong Yu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24613v1) | > This paper proposes a group deliberation oriented multi-agent conversational model to address the limitations of single large language models in complex reasoning tasks. The model adopts a three-level role division architecture consisting of generation, verification, and integration. An opinion generation agent produces diverse reasoning perspectives, an evidence verification agent retrieves exter...

---

## 693. On Circular Threshold Words and Other Stronger Versions of Dejean's conjecture

**Authors:** Igor N. Tunev

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24581v1) | > Let the root of the word $w$ be the smallest prefix $v$ of $w$ such that $w$ is a prefix of $vvv...$. $per(w)$ is the length of the root of $w$. For any $n\ge5$, an $n$-ary threshold word is a word $w$ such that for any factor (subword) $v$ of $w$ the condition $\frac{|v|}{per(v)}\le\frac{n}{n-1}$ holds. Dejean conjecture (completely proven in 2009) states for $n\ge5$ that exists infinitely many o...

---

## 694. Document Data Matching for Blockchain-Supported Real Estate

**Authors:** Henrique Lin, Tiago Dias, Miguel Correia

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24457v1) | > The real estate sector remains highly dependent on manual document handling and verification, making processes inefficient and prone to fraud. This work presents a system that integrates optical character recognition (OCR), natural language processing (NLP), and verifiable credentials (VCs) to automate document extraction, verification, and management. The approach standardizes heterogeneous docum...

---

## 695. GateChain: A Blockchain Based Application for Country Entry Exit Registry Management

**Authors:** Mohamad Akkad, Hüseyin Bodur

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24416v1) | > Recording entry and exit records for a country, with properties such as confidentiality, integrity, and auditability, is increasingly important due to rising international mobility and security requirements. Traditional border control systems, which rely on centralised databases, are vulnerable to data manipulation and have limited interoperability between institutions. This study presents GateCha...

---

## 696. Incremental Certificate Learning for Hybrid Neural Network Verification . A Solver Architecture for Piecewise-Linear Safety Queries

**Authors:** Chandrasekhar Gokavarapu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24379v1) | > Formal verification of deep neural networks is increasingly required in safety-critical domains, yet exact reasoning over piecewise-linear (PWL) activations such as ReLU suffers from a combinatorial explosion of activation patterns. This paper develops a solver-grade methodology centered on \emph{incremental certificate learning}: we maximize the work performed in a sound linear relaxation (LP pro...

---

## 697. Proof-Carrying PWL Verification for ReLU Networks: Convex-Hull Semantics, Exact \SMT/\MILP Encodings, and Symbolic Certificate Checking

**Authors:** Chandrasekhar Gokavarapu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24339v1) | > ReLU networks are piecewise-linear (PWL), enabling exact symbolic verification via \SMT(\LRA) or \MILP. However, safety claims in certification pipelines require not only correctness but also \emph{checkable evidence}. We develop a proof-carrying verification core for PWL neural constraints: (i) we formalize ReLU networks as unions of polyhedra indexed by activation patterns; (ii) we present exact...

---

## 698. Spatial Discretization for Fine-Grain Zone Checks with STARKs

**Authors:** Sungmin Lee, Kichang Lee, Gyeongmin Han, JeongGil Ko

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24238v1) | > Many location-based services rely on a point-in-polygon test (PiP), checking whether a point or a trajectory lies inside a geographic zone. Since geometric operations are expensive in zero-knowledge proofs, privately performing the PiP test is challenging. In this paper, we answer the research questions of how different ways of encoding zones affect accuracy and proof cost by exploiting gridbased ...

---

## 699. Black hole images as probes of thermodynamic evolution

**Authors:** Lei You, Jinsong Yang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24174v1) | > We investigate how black hole images (shadows and accretion-disk images) encode thermodynamic evolution information across different ensembles, using the Reissner-Nordström-AdS black hole as an illustrative example. Through analytic treatment and numerical verification, we demonstrate that these images encode not only phase transition information but also ensemble information, including additional...

---

## 700. Training Report of TeleChat3-MoE

**Authors:** Xinzhang Liu, Chao Wang, Zhihao Yang, Zhuo Jiang, Xuncheng Zhao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24157v1) | > TeleChat3-MoE is the latest series of TeleChat large language models, featuring a Mixture-of-Experts (MoE) architecture with parameter counts ranging from 105 billion to over one trillion,trained end-to-end on Ascend NPU cluster. This technical report mainly presents the underlying training infrastructure that enables reliable and efficient scaling to frontier model sizes. We detail systematic met...

---

## 701. RSAgent: Learning to Reason and Act for Text-Guided Segmentation via Multi-Turn Tool Invocations

**Authors:** Xingqi He, Yujie Zhang, Shuyong Gao, Wenjie Li, Lingyi Hong

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24023v1) | > Text-guided object segmentation requires both cross-modal reasoning and pixel grounding abilities. Most recent methods treat text-guided segmentation as one-shot grounding, where the model predicts pixel prompts in a single forward pass to drive an external segmentor, which limits verification, refocusing and refinement when initial localization is wrong. To address this limitation, we propose RSA...

---

## 702. Decoherence as detector of the Unruh effect, II

**Authors:** Manuel de Atocha Rodríguez Fernández, Alexander I. Nesterov, Gennady P. Berman, C. Moreno-González

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23888v1) | > The Unruh effect remains a central topic in quantum field theory, although its direct experimental verification continues to be challenging. Recent efforts have therefore focused on indirect detection strategies in which the Unruh effect emerges through measurable physical processes. In this work, we extend a previously introduced detector model, originally formulated for a massless scalar field, ...

---

## 703. The Drill-Down and Fabricate Test (DDFT): A Protocol for Measuring Epistemic Robustness in Language Models

**Authors:** Rahul Baxi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23850v1) | > Current language model evaluations measure what models know under ideal conditions but not how robustly they know it under realistic stress. Static benchmarks like MMLU and TruthfulQA cannot distinguish a model that lacks knowledge from one whose verification mechanisms collapse when information degrades or adversaries probe for weaknesses. We introduce the Drill-Down and Fabricate Test (DDFT), a ...

---

## 704. Analysis of kinetic-diffusion Monte Carlo simulation and source term estimation scheme in nuclear fusion applications

**Authors:** Zhirui Tang, Julian Koellermeier, Emil Løvbak, Giovanni Samaey

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23580v1) | > In plasma edge simulations, the behavior of neutral particles is often described by a Boltzmann--BGK equation. Solving this kinetic equation and estimating the moments of its solution are essential tasks, typically carried out using Monte Carlo (MC) methods. However, for large-sized reactors, like ITER and DEMO, high collision rates lead to a substantial computational cost. To accelerate the calcu...

---

## 705. Clauser-Horne-Shimony-Holt Bell-inequality Violability with the Full Poincaré-Bloch Sphere

**Authors:** Carlos Cardoso-Isidoro, Enrique J. Galvez

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23550v1) | > Linearly polarized projections are the tacit means for performing Clauser-Horne-Shimony-Holt (CHSH) Bell-inequality tests using polarization-entangled photon pairs. The inequality is valid for all states on the Poincaré-Bloch sphere, but few laboratory studies have investigated violations with the full sphere. In this article, we explore the experimental verifications of the predicted violations o...

---

## 706. Secure and Governed API Gateway Architectures for Multi-Cluster Cloud Environments

**Authors:** Vinoth Punniyamoorthy, Kabilan Kannan, Akshay Deshpande, Lokesh Butra, Akash Kumar Agarwal

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23774v1) | > API gateways serve as critical enforcement points for security, governance, and traffic management in cloud-native systems. As organizations increasingly adopt multi-cluster and hybrid cloud deployments, maintaining consistent policy enforcement, predictable performance, and operational stability across heterogeneous gateway environments becomes challenging. Existing approaches typically manage se...

---

## 707. interID -- An Ecosystem-agnostic Verifier Application for Self-sovereign Identity

**Authors:** Hakan Yildiz, Axel Küpper

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23383v1) | > Self-Sovereign Identity is a transformative paradigm in digital identity management, empowering individuals with full control over their credentials. However, the coexistence of diverse SSI ecosystems, such as the European Digital Identity and the European Blockchain Services Infrastructure, poses significant challenges for cross-ecosystem interoperability due to technological and trust framework ...

---

## 708. AGRO-SQL: Agentic Group-Relative Optimization with High-Fidelity Data Synthesis

**Authors:** Cehua Yang, Dongyu Xiao, Junming Lin, Yuyang Song, Hanxu Yan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23366v1) | > The advancement of Text-to-SQL systems is currently hindered by the scarcity of high-quality training data and the limited reasoning capabilities of models in complex scenarios. In this paper, we propose a holistic framework that addresses these issues through a dual-centric approach. From a Data-Centric perspective, we construct an iterative data factory that synthesizes RL-ready data characteriz...

---

## 709. A space-time extension of a conservative two-fluid cut-cell method for moving diffusion problems

**Authors:** Louis Libat, Can Selçuk, Eric Chénier, Vincent Le Chenadec

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23358v2) | > We present a space-time extension of a conservative Cartesian cut-cell finite-volume method for two-phase diffusion problems with prescribed interface motion. The formulation follows a two-fluid approach: one scalar field is solved in each phase with discontinuous material properties, coupled by sharp interface conditions enforcing flux continuity and jump laws. To handle moving boundaries on a fi...

---

## 710. Verifying Asynchronous Hyperproperties in Reactive Systems

**Authors:** Raven Beutner, Bernd Finkbeiner

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23344v1) | > Hyperproperties are system properties that relate multiple execution traces and commonly occur when specifying information-flow and security policies. Logics like HyperLTL utilize explicit quantification over execution traces to express temporal hyperproperties in reactive systems, i.e., hyperproperties that reason about the temporal behavior along infinite executions. An often unwanted side-effec...

---

## 711. An Empirical Study of Generative AI Adoption in Software Engineering

**Authors:** Görkem Giray, Onur Demirörs, Marcos Kalinowski, Daniel Mendez

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23327v1) | > Context. GenAI tools are being increasingly adopted by practitioners in SE, promising support for several SE activities. Despite increasing adoption, we still lack empirical evidence on how GenAI is used in practice, the benefits it provides, the challenges it introduces, and its broader organizational and societal implications. Objective. This study aims to provide an overview of the status of Ge...

---

## 712. On Conformant Planning and Model-Checking of $\exists^*\forall^*$ Hyperproperties

**Authors:** Raven Beutner, Bernd Finkbeiner

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23324v1) | > We study the connection of two problems within the planning and verification community: Conformant planning and model-checking of hyperproperties. Conformant planning is the task of finding a sequential plan that achieves a given objective independent of non-deterministic action effects during the plan's execution. Hyperproperties are system properties that relate multiple execution traces of a sy...

---

## 713. BRkNN-light: Batch Processing of Reverse k-Nearest Neighbor Queries for Moving Objects on Road Networks

**Authors:** Anbang Song, Ziqiang Yu, Wei Liu, Yating Xu, Mingjin Tao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23298v1) | [DOI](https://doi.org/10.1145/3748777.3748791)

> The Reverse $k$-Nearest Neighbor (R$k$NN) query over moving objects on road networks seeks to find all moving objects that consider the specified query point as one of their $k$ nearest neighbors. In location based services, many users probably submit R$k$NN queries simultaneously. However, existing methods largely overlook how to efficiently process multiple such queries together, missing opportu...

---

## 714. Uncovering Discrimination Clusters: Quantifying and Explaining Systematic Fairness Violations

**Authors:** Ranit Debnath Akash, Ashish Kumar, Verya Monjezi, Ashutosh Trivedi, Gang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23769v1) | > Fairness in algorithmic decision-making is often framed in terms of individual fairness, which requires that similar individuals receive similar outcomes. A system violates individual fairness if there exists a pair of inputs differing only in protected attributes (such as race or gender) that lead to significantly different outcomes-for example, one favorable and the other unfavorable. While this...

---

## 715. The Dawn of Agentic EDA: A Survey of Autonomous Digital Chip Design

**Authors:** Zelin Zang, Yuhang Song, Bingo Wing-Kuen Ling, Aili Wang, Fuji Yang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23189v1) | > This survey provides a comprehensive overview of the integration of Generative AI and Agentic AI within the field of Digital Electronic Design Automation (EDA). The paper first reviews the paradigmatic evolution from traditional Computer-Aided Design (CAD) to AI-assisted EDA (AI4EDA), and finally to the emerging AI-Native and Agentic design paradigms. We detail the application of these paradigms a...

---

## 716. Multimodal Fact-Checking: An Agent-based Approach

**Authors:** Danni Xu, Shaojing Fan, Harry Cheng, Mohan Kankanhalli

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22933v2) | > The rapid spread of multimodal misinformation poses a growing challenge for automated fact-checking systems. Existing approaches, including large vision language models (LVLMs) and deep multimodal fusion methods, often fall short due to limited reasoning and shallow evidence utilization. A key bottleneck is the lack of dedicated datasets that provide complete real-world multimodal misinformation i...

---

## 717. Optimal Threshold for Fracton Codes and Nearly Saturated Code Capacity in Three Dimensions

**Authors:** Giovanni Canossa, Lode Pollet, Miguel A. Martin-Delgado, Hao Song, Ke Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22888v1) | > Fracton codes have been intensively studied as novel topological states of matter, yet their fault-tolerant properties remain largely unexplored. Here, we investigate the optimal thresholds of self-dual fracton codes, in particular the checkerboard code, against stochastic Pauli noise. By utilizing a statistical-mechanical mapping combined with large-scale parallel tempering Monte Carlo simulation...

---

## 718. Raven: Mining Defensive Patterns in Ethereum via Semantic Transaction Revert Invariants Categories

**Authors:** Mojtaba Eshghie, Melissa Mazura, Alexandre Bartel

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22616v1) | > We frame Ethereum transactions reverted by invariants-require(<invariant>)/ assert(<invariant>)/if (<invariant>) revert statements in the contract implementation-as a positive signal of active on-chain defenses. Despite their value, the defensive patterns in these transactions remain undiscovered and underutilized in security research. We present Raven, a framework that aligns reverted transaction...

---

## 719. Symbolic Specification and Reasoning for Quantum Data and Operations

**Authors:** Mingsheng Ying

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22383v1) | > In quantum information and computation research, symbolic methods have been widely used for human specification and reasoning about quantum states and operations. At the same time, they are essential for ensuring the scalability and efficiency of automated reasoning and verification tools for quantum algorithms and programs. However, a formal theory for symbolic specification and reasoning about q...

---

## 720. VULCAN: Tool-Augmented Multi Agents for Iterative 3D Object Arrangement

**Authors:** Zhengfei Kuang, Rui Lin, Long Zhao, Gordon Wetzstein, Saining Xie

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22351v1) | > Despite the remarkable progress of Multimodal Large Language Models (MLLMs) in 2D vision-language tasks, their application to complex 3D scene manipulation remains underexplored. In this paper, we bridge this critical gap by tackling three key challenges in 3D object arrangement task using MLLMs. First, to address the weak visual grounding of MLLMs, which struggle to link programmatic edits with p...

---

## 721. Many Minds from One Model: Bayesian Transformers for Population Intelligence

**Authors:** Diji Yang, Yi Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25063v1) | > Despite their scale and success, modern transformers are almost universally trained as single-minded systems: optimization produces one deterministic set of parameters, representing a single functional hypothesis about the data. Motivated by the idea that intelligence emerge from many minds, we propose Population Bayesian Transformers (B-Trans), which transform a standard Large Language Model into...

---

## 722. Convergence of the generalization error for deep gradient flow methods for PDEs

**Authors:** Chenguang Liu, Antonis Papapantoleon, Jasper Rou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25017v1) | > The aim of this article is to provide a firm mathematical foundation for the application of deep gradient flow methods (DGFMs) for the solution of (high-dimensional) partial differential equations (PDEs). We decompose the generalization error of DGFMs into an approximation and a training error. We first show that the solution of PDEs that satisfy reasonable and verifiable assumptions can be approx...

---

## 723. The splitting field and generators of the elliptic surface $Y^2=X^3 +t^{360} +1$

**Authors:** Sajad Salami

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25009v1) | > The splitting field of an elliptic surface $\mathcal{E}/\mathbb{Q}(t)$ is the smallest finite extension $\mathcal{K} \subset \mathbb{C}$ such that all $\mathbb{C}(t)$-rational points are defined over $\mathcal{K}(t)$. In this paper, we provide a symbolic algorithmic approach to determine the splitting field and a set of $68$ linearly independent generators for the Mordell--Weil lattice of Shioda's...

---

## 724. Bi-C2R: Bidirectional Continual Compatible Representation for Re-indexing Free Lifelong Person Re-identification

**Authors:** Zhenyu Cui, Jiahuan Zhou, Yuxin Peng

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25000v1) | > Lifelong person Re-IDentification (L-ReID) exploits sequentially collected data to continuously train and update a ReID model, focusing on the overall performance of all data. Its main challenge is to avoid the catastrophic forgetting problem of old knowledge while training on new data. Existing L-ReID methods typically re-extract new features for all historical gallery images for inference after ...

---

## 725. MSACL: Multi-Step Actor-Critic Learning with Lyapunov Certificates for Exponentially Stabilizing Control

**Authors:** Yongwei Zhang, Yuanzhe Xing, Quan Quan, Zhikun She

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24955v1) | > Achieving provable stability in model-free reinforcement learning (RL) remains a challenge, particularly in balancing exploration with rigorous safety. This article introduces MSACL, a framework that integrates exponential stability theory with maximum entropy RL through multi-step Lyapunov certificate learning. Unlike methods relying on complex reward engineering, MSACL utilizes off-policy multi-...

---

## 726. Discovery of a galaxy associated with the HI cloud FAST J0139+4328

**Authors:** Ana Mitrašinović, Marko Grozdanović, Ana Lalović, Milena Jovanović, Michal Bilek

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24924v1) | > The search for ``dark galaxies,'' a key prediction of the lambda cold dark matter, has yielded few viable candidates. Recently, FAST J0139+4328 was reported as the first isolated dark galaxy in the nearby universe, based on a neutral hydrogen (HI) detection and a non-detection in the Pan-STARRS1 survey. To verify the nature of this candidate, we obtained deep optical imaging, using the $1.4\,\math...

---

## 727. Existence, uniqueness, and approximability of solutions to the classical Melan equation in suspension bridges

**Authors:** Jinxiang Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24915v1) | > The classical Melan equation modeling suspension bridges is considered. We first study the explicit expression and the uniform positivity of the analytical solution for the simplified ``less stiff'' model, based on which we develop a monotone iterative technique of lower and upper solutions to investigate the existence, uniqueness and approximability of the solution for the original classical Mela...

---

