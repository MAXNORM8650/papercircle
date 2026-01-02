# Research Papers: LLM post-training survey review natural language processing

Updated: 2026-01-02 17:56
Total: 146 papers

---

## 1. Mitigating Forgetting in LLM Supervised Fine-Tuning and Preference Learning

**Authors:** Heshan Devaka Fernando, Han Shen, Parikshit Ram, Yi Zhou, Horst Samulowitz

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Post-training of pre-trained LLMs, which typically consists of the supervised fine-tuning (SFT) stage and the preference learning (RLHF or DPO) stage, is crucial to effective and safe LLM applications. The widely adopted approach in post-training popular open-source LLMs is to sequentially perform SFT and RLHF/DPO. However, sequential training is sub-optimal in terms of SFT and RLHF/DPO trade-off:...

---

## 2. A Survey on Efficient Large Language Model Training: From Data-centric Perspectives

**Authors:** Junyu Luo, Bohan Wu, Xiao Luo, Zhiping Xiao, Yiqiao Jin

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.1493.pdf) | > Post-training of Large Language Models (LLMs) is crucial for unlocking their task generalization potential and domain-specific capabilities. However, the current LLM post-training paradigm faces significant data challenges, including the high costs of manual annotation and diminishing marginal returns on data scales. Therefore, achieving data-efficient post-training has become a key research quest...

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

## 7. Trajectory Balance with Asynchrony: Decoupling Exploration and Learning for Fast, Scalable LLM Post-Training

**Authors:** Brian R. Bartoldson, Siddarth Venkatraman, James Diffenderfer, Moksh Jain, Tal Ben-Nun

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning (RL) is a critical component of large language model (LLM) post-training. However, on-policy algorithms used for post-training are not naturally robust to a diversified content of experience replay buffers, which asynchronous off-policy actors can efficiently populate in parallel to training. We propose efficiently learning on such off-policy data via Trajectory Balance with...

---

## 8. BiLLM: Pushing the Limit of Post-Training Quantization for LLMs

**Authors:** Wei Huang, Yangdong Liu, Haotong Qin, Ying Li, Shiming Zhang

**Year:** 2024 | **Venue:** ICML 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=qOl2WWOqFg) | > Pretrained large language models (LLMs) exhibit exceptional general language processing capabilities but come with significant demands on memory and computational resources. As a powerful compression technology, binarization can extremely reduce model weights to a mere 1 bit, lowering the expensive computation and memory requirements. However, existing quantization techniques fall short of maintai...

---

## 9. Fixing It in Post: A Comparative Study of LLM Post-Training Data Quality and Model Performance

**Authors:** Aladin Djuhera, Swanand Ravindra Kadhe, Syed Zawad, Farhan Ahmed, Heiko Ludwig

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Recent work on large language models (LLMs) has increasingly focused on post-training and alignment with datasets curated to enhance instruction following, world knowledge, and specialized skills. However, most post-training datasets used in leading open- and closed-source LLMs remain inaccessible to the public, with limited information about their construction process. This lack of transparency h...

---

## 10. RiskPO: Risk-based Policy Optimization with Verifiable Reward for LLM Post-Training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning with verifiable reward has recently emerged as a central paradigm for post-training large language models (LLMs); however, prevailing mean-based methods, such as Group Relative Policy Optimization (GRPO), suffer from entropy collapse and limited reasoning gains. We argue that these issues stem from overemphasizing high-probability output sequences while neglecting rare but i...

---

## 11. SVD-LLM: Truncation-aware Singular Value Decomposition for Large Language Model Compression

**Authors:** Xin Wang, Yu Zheng, Zhongwei Wan, Mi Zhang

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=LNYIUouhdt) | > The advancements in Large Language Models (LLMs) have been hindered by
their substantial sizes, which necessitates LLM compression methods for practical
deployment. Singular Value Decomposition (SVD) offers a promising solution for
LLM compression. However, state-of-the-art SVD-based LLM compression meth-
ods have two key limitations: truncating smaller singular values may lead to higher
compressi...

---

## 12. TesseraQ: Ultra Low-Bit LLM Post-Training Quantization with Block Reconstruction

**Authors:** Yuhang Li, Priyadarshini Panda

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) have revolutionized natural language processing, albeit at the cost of immense memory and computation requirements. Post-training quantization (PTQ) is becoming the \emph{de facto} method to reduce the memory footprint and improve the inference throughput of LLMs.
In this work, we aim to push the upper limit of LLM PTQ by optimizing the weight rounding parameters with ...

---

## 13. On the Impact of Calibration Data in Post-training Quantization and Pruning

**Authors:** Miles Williams, Nikolaos Aletras

**Year:** 2024 | **Venue:** ACL 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.acl-long.544.pdf) | > Quantization and pruning form the foundation of compression for neural networks, enabling efficient inference for large language models (LLMs). Recently, various quantization and pruning techniques have demonstrated remarkable performance in a post-training setting. They rely upon calibration data, a small set of unlabeled examples that are used to generate layer activations. However, no prior wor...

---

## 14. Tuning without Peeking: Provable Privacy and Generalization Bounds for LLM Post-Training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Gradient-based optimization is the workhorse of deep learning, offering efficient and scalable training via backpropagation. However, exposing gradients during training can leak sensitive information about the underlying data, raising privacy and security concerns such as susceptibility to data poisoning attacks. In contrast, black box optimization methods, which treat the model as an opaque funct...

---

## 15. Value Drifts: Tracing Value Alignment During LLM Post-Training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> As LLMs occupy an increasingly important role in society, they are more and more confronted with questions that require them not only to draw on their general knowledge but also to align with certain human value systems.
Therefore, studying the alignment of LLMs with human values has become a crucial field of inquiry. Prior work, however, mostly focuses on evaluating the alignment of fully trained...

---

## 16. Achieving binary weight and activation for LLMs using Post-Training Quantization

**Authors:** Siqing Song, Chuang Wang, Rui-Qi Wang, Yi Yang, Xu-Yao Zhang

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.findings-acl.459.pdf) | > Quantizing large language models (LLMs) to 1-bit precision significantly reduces computational costs, but existing quantization techniques suffer from noticeable performance degradation when using weight and activation precisions below 4 bits (W4A4). In this paper, we propose a post-training quantization framework with W(1+1)A(1×4) configuration, where weights are quantized to 1 bit with an additi...

---

## 17. Improve LLM Pre-training with RL-Guided Annealing

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Training large language models (LLMs) typically proceeds in two distinct stages: pre-training and post-training. However, the question of how to exploit these stages synergistically—particularly how post-trained models can inform and improve pre-training—remains underexplored.

We begin by analyzing training dynamics and identify the annealing (mid-training) phase as a critical turning point for t...

---

## 18. OPTIMA: Optimal One-shot Pruning for LLMs via Quadratic Programming Reconstruction

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training model pruning is a promising solution, yet it faces a trade-off: simple heuristics that zero weights are fast but degrade accuracy, while principled joint optimization methods recover accuracy but are computationally infeasible at modern scale. One-shot methods such as SparseGPT offer a practical trade-off in optimality by applying efficient, approximate heuristic weight updates. To ...

---

## 19. Bridging the Preference Gap: Post-Training Input Rewriting with Large Language Models

**Authors:** ShengKun Tu, Shisong Chen, Zhixu Li, Yanghua Xiao, Liangyue Li

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Pre-trained language models, such as BERT and RoBERTa, have achieved remarkable performance in semantic classification tasks. Yet, their effectiveness varies with different textual expressions due to inherent preferences developed during training. To address this limitation, we propose a framework that leverages large language models (LLMs) to rewrite input texts in ways that better align with a t...

---

## 20. Finding and Reactivating Post-Trained LLMs' Hidden Safety Mechanisms

**Authors:** Mingjie Li, Wai Man Si, Michael Backes, Yang Zhang, Yisen Wang

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Despite the impressive performance of general-purpose large language models (LLMs), they often require fine-tuning or post-training to excel at specific tasks. 
    For instance, large reasoning models (LRMs), such as the DeepSeek-R1 series, demonstrate strong reasoning capabilities after post-training different general large language models on diverse chain-of-thought (CoT) datasets. 
    However...

---

## 21. Prompt Curriculum Learning for Efficient LLM Post-Training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning (RL) is widely used to post-train large language models for tasks such as mathematical reasoning and coding. However, the convergence of RL training remains sensitive to batching and prompt selection strategies. We investigate the factors that affect convergence, including batch size and prompt difficulty. Through large-scale experiments across multiple models and datasets, ...

---

## 22. BCQ: Block Clustered Quantization for 4-bit (W4A4) LLM inference

**Authors:** Reena Elangovan, Charbel Sakr, Anand Raghunathan, Brucek Khailany

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Post-training quantization (PTQ) is a promising approach to reducing the storage and computational requirements of large language models (LLMs) without additional training cost. Recent PTQ studies have primarily focused on quantizing only weights to sub-8-bits while maintaining activations at 8-bits or higher. Accurate sub-8-bit quantization for both weights and activations without relying on quan...

---

## 23. WildChat-50M: A Deep Dive Into the Role of Synthetic Data in Post-Training

**Authors:** Benjamin Feuer, Chinmay Hegde

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=fzmtDDOcJ3) | > Language model (LLM) post-training can refine behaviors and unlock new skills, but the open science supporting these post-training techniques is still in its infancy. One limiting factor has been the difficulty of conducting large-scale comparative analyses of synthetic data generating models and LLM judges. To close this gap, we introduce WildChat-50M, the largest public chat dataset to date. We ...

---

## 24. Expert-Integrated Active Learning for Optimizing LLM Agents

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Recent advances in Large Language Models (LLMs) have created new opportunities for their application in interactive environments. However, these agentic tasks present significant challenges due to the complexity of long and specialized interaction trajectories that are underrepresented in standard training distributions. While Reinforcement Learning (RL) post-training offers a promising approach t...

---

## 25. Learning Grouped Lattice Vector Quantizers for Low-Bit LLM Compression

**Authors:** Xi Zhang, Xiaolin Wu, Jiamang Wang, Weisi Lin

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) have demonstrated remarkable capabilities but typically require extensive computational resources and memory for inference. Post-training quantization (PTQ) can effectively reduce these demands by storing weights in lower bit-width formats. However, standard uniform quantization often leads to notable performance degradation, particularly in low-bit scenarios. In this ...

---

## 26. LRQ: Optimizing Post-Training Quantization for Large Language Models by Learning Low-Rank Weight-Scaling Matrices

**Authors:** Jung Hyun Lee, Jeonghoon Kim, June Yong Yang, Se Jung Kwon, Eunho Yang

**Year:** 2025 | **Venue:** NAACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.naacl-long.393.pdf) | > With the commercialization of large language models (LLMs), weight-activation quantization has emerged to compress and accelerate LLMs, achieving high throughput while reducing inference costs. However, existing post-training quantization (PTQ) techniques for quantizing weights and activations of LLMs still suffer from non-negligible accuracy drops, especially on massive multitask language underst...

---

## 27. Adaptive Layer-Wise Transformations for Post-Training Quantization of Large Language Models

**Authors:** Cuong Pham, Dung Anh Hoang, Cuong C. Nguyen, Trung Le, Gustavo Carneiro

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models require significant computational resources for deployment, making quantization essential for practical applications. However, the main obstacle to effective quantization lies in systematic outliers in activations and weights, which cause substantial LLM performance degradation, especially at low-bit settings. While existing transformation-based methods like affine and rotati...

---

## 28. Strategic Generalization Without Interaction: Can Post-Training Alone Induce Multi-Agent Behavior?

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Directly training Large Language Models (LLMs) for Multi-Agent Systems (MAS) remains challenging due to intricate reward modeling, dynamic agent interactions, and demanding generalization requirements.
This paper explores whether post-training techniques can effectively generalize to multi-agent scenarios $\textit{without any interactive multi-agent data}$.
We use economic reasoning as a testbed, ...

---

## 29. LRQuant: Learnable and Robust Post-Training Quantization for Large Language Models

**Authors:** Jiaqi Zhao, Miao Zhang, Chao Zeng, Ming Wang, Xuebo Liu

**Year:** 2024 | **Venue:** ACL 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.acl-long.122.pdf) | > Post-training quantization (PTQ) for large language models (LLMs) significantly accelerates model inference and relieves memory constraints, without incurring model training. A “smoothing paradigm” is commonly used in LLM quantization, which transfers the quantization difficulty of activation to weight quantization using mathematically equivalent transformations. However, existing methods face two...

---

## 30. Style Outweighs Substance: Failure Modes of LLM Judges in Alignment Benchmarking

**Authors:** Benjamin Feuer, Micah Goldblum, Teresa Datta, Sanjana Nambiar, Raz Besaleli

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=MzHNftnAM1) | > The release of ChatGPT in November 2022 sparked an explosion of interest in post-training and an avalanche of new preference optimization (PO) methods. These methods claim superior alignment by virtue of better correspondence with human pairwise preferences, often measured by LLM-judges. In this work, we attempt to answer the following question -- do LLM-judge preferences translate to progress on ...

---

## 31. Can LLMs Serve as Causal Inference Agents? A Study on Post-Training Methods

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Despite the potential of Large Language Models (LLMs) to democratize causal inference, they currently struggle with quantitative reasoning. This paper investigates whether post-training can transform an LLM into a practical and accessible causal inference agent for non-professionals. To facilitate this, we first introduce the DeepCausal dataset, a novel collection of seven computational causal inf...

---

## 32. Spinning Straw into Gold: Relabeling LLM Agent Trajectories in Hindsight for Successful Demonstrations

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language model agents operate in partially observable, long-horizon settings where obtaining supervision remains a major bottleneck. We address this by leveraging a source of supervision overlooked in existing post-training methods: ``unintended yet successful'' goals embedded within agent rollouts. We introduce Hindsight Supervised Learning (HSL), where an auxiliary LLM reviews each complet...

---

## 33. GVPO: Group Variance Policy Optimization for Large Language Model Post-Training

**Authors:** Kaichen Zhang, Yuzhong Hong, Junwei Bao, Hongfei Jiang, yang song

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Post-training plays a crucial role in refining and aligning large language models to meet specific tasks and human preferences. While recent advancements in post-training techniques, such as Group Relative Policy Optimization (GRPO), leverage increased sampling with relative reward scoring to achieve superior performance, these methods often suffer from training instability that limits their pract...

---

## 34. EfficientLLM: Unified Pruning-Aware Pretraining for Auto-Designed Edge Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Modern large language models (LLMs) driven by scaling laws achieve emergent intelligence in large model sizes. Recently, the increasing concerns about cloud costs, latency and privacy make it an urgent requirement to develop compact edge language models. Distinguished from direct pretraining that bounded by the scaling law, this work proposes the unified pruning-aware pretraining, focusing on reta...

---

## 35. Pruning Foundation Models for High Accuracy without Retraining

**Authors:** Pu Zhao, Fei Sun, Xuan Shen, Pinrui Yu, Zhenglun Kong

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.findings-emnlp.566.pdf) | > Despite the superior performance, it is challenging to deploy large language models (LLMs) due to their massive parameters and computations. While pruning is a promising technique to reduce model size and accelerate the inference, the traditional pruning techniques can hardly be applied for LLMs as they need to finetune the model on the full dataset with multiple epochs consuming massive data and ...

---

## 36. P2 Law: Scaling Law for Post-Training After Model Pruning

**Authors:** Xiaodong Chen, Yuxuan Hu, Xiaokang Zhang, Yanling Wang, Cuiping Li

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.283.pdf) | > Pruning has become a widely adopted technique for reducing the hardware requirements of large language models (LLMs). To recover model performance after pruning, post-training is commonly employed to mitigate the resulting performance degradation. While post-training benefits from larger datasets, once the dataset size is already substantial, increasing the training data provides only limited perf...

---

## 37. VPTQ: Extreme Low-bit Vector Post-Training Quantization for Large Language Models

**Authors:** Yifei Liu, Jicheng Wen, Yang Wang, Shengyu Ye, Li Lyna Zhang

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.emnlp-main.467.pdf) | > Scaling model size significantly challenges the deployment and inference of Large Language Models (LLMs). Due to the redundancy in LLM weights, recent research has focused on pushing weight-only quantization to extremely low-bit (even down to 2 bits). It reduces memory requirements, optimizes storage costs, and decreases memory bandwidth needs during inference. However, due to numerical representa...

---

## 38. SmoothQuant: Accurate and Efficient Post-Training Quantization for Large Language Models

**Authors:** Guangxuan Xiao, Ji Lin, Mickael Seznec, Hao Wu, Julien Demouth

**Year:** 2023 | **Venue:** ICML 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=sHfSV8eYEp) | > Large language models (LLMs) show excellent performance but are compute- and memory-intensive. Quantization can reduce memory and accelerate inference. However, existing methods cannot maintain accuracy and hardware efficiency at the same time. We propose SmoothQuant, a training-free, accuracy-preserving, and general-purpose post-training quantization (PTQ) solution to enable 8-bit weight, 8-bit a...

---

## 39. Expanding the Web, Smaller Is Better: A Comprehensive Study in Post-training

**Authors:** Zixuan Ke, Yifei Ming, Xuan-Phi Nguyen, Caiming Xiong, Shafiq Joty

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> General-purpose large language models (GLLMs) like GPT-4 and LLaMA have demonstrated exceptional performance across a wide range of tasks. However, their performance often falls short in domain- or task-specific applications, where deeper, specialized knowledge is essential, while maintaining general knowledge remains crucial for handling broader, unseen tasks. Post-training has been widely applie...

---

## 40. SINQ: Sinkhorn-Normalized Quantization for Calibration-Free Low-Precision LLM Weights

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training quantization has emerged as the most widely used strategy for deploying large language models at low precision. Still, current methods show perplexity degradation at bit-widths $\leq 4$, partly because representing outliers causes precision issues in parameters that share the same scales as these outliers. This problem is especially pronounced for calibration-free, uniform quantizati...

---

## 41. Preserving LLM Capabilities through Calibration Data Curation: From Analysis to Optimization

**Authors:** Bowei He, Lihao Yin, Huiling Zhen, Shuqi LIU, Han Wu

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Post-training compression has been a widely employed approach to scale down large language model (LLM) and facilitate efficient inference. In various proposed compression methods, including pruning and quantization, calibration data plays a vital role by informing the weight importance and activation dynamic ranges. However, how calibration data impacts the LLM capability after compression is less...

---

## 42. Cuckoo: An IE Free Rider Hatched by Massive Nutrition in LLM’s Nest

**Authors:** Letian Peng, Zilong Wang, Feng Yao, Jingbo Shang

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.66.pdf) | > Massive high-quality data, both pre-training raw texts and post-training annotations, have been carefully prepared to incubate advanced large language models (LLMs). In contrast, for information extraction (IE), pre-training data, such as BIO-tagged sequences, are hard to scale up. We show that IE models can act as free riders on LLM resources by reframing next-token prediction into extraction for...

---

## 43. S$^{2}$FT: Efficient, Scalable and Generalizable LLM Fine-tuning by Structured Sparsity

**Authors:** Xinyu Yang, Jixuan Leng, Geyang Guo, Jiawei Zhao, Ryumei Nakada

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=lEUle8S4xQ) | > Current PEFT methods for LLMs can achieve high quality, efficient training, or scalable serving, but not all three simultaneously.  
To address this limitation, we investigate sparse fine-tuning and observe a remarkable improvement in generalization ability. 
Utilizing this key insight, we propose a family of Structured Sparse Fine-Tuning (S${^2}$FT) methods for LLMs, which concurrently achieve st...

---

## 44. What Is The Political Content in LLMs' Pre- and Post-Training Data?

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) are known to generate politically biased text, yet how such biases arise remains unclear. A crucial step toward answering this question is the analysis of training data, whose political content remains largely underexplored in current LLM research. To address this gap, we present in this paper an analysis of the pre- and post-training corpora of \textsc{OLMO2}, the lar...

---

## 45. Trajectory Bellman Residual Minimization: A Simple Value-Based Method for LLM Reasoning

**Authors:** Yurun Yuan, Fan Chen, Zeyu Jia, Alexander Rakhlin, Tengyang Xie

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Policy-based methods currently dominate reinforcement learning (RL) pipelines for large language model (LLM) reasoning, leaving value-based approaches largely unexplored. We revisit the classical paradigm of Bellman Residual Minimization and introduce Trajectory Bellman Residual Minimization (TBRM), an algorithm that naturally adapts this idea to LLMs, yielding a simple yet effective off-policy al...

---

## 46. CrossQuant: A Post-Training Quantization Method with Smaller Quantization Kernel for Precise Large Lanugage Model Compression

**Authors:** Wenyuan Liu, Xindian Ma, Peng Zhang, Yan Wang

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Post-Training Quantization (PTQ) is an effective technique for compressing Large Language Models (LLMs). While many studies focus on quantizing both weights and activations, it is still a challenge to maintain the accuracy of LLM after activating quantization. To investigate the primary cause, we extend the concept of kernel from linear algebra to quantization functions to define a new term, "quan...

---

## 47. LiNeS: Post-training Layer Scaling Prevents Forgetting and Enhances Model Merging

**Authors:** Ke Wang, Nikolaos Dimitriadis, Alessandro Favero, Guillermo Ortiz-Jimenez, François Fleuret

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=J5sUOvlLbQ) | > Fine-tuning pre-trained models has become the standard approach to endow them with specialized knowledge, but it poses fundamental challenges. In particular, (i) fine-tuning often leads to catastrophic forgetting, where improvements on a target domain degrade generalization on other tasks, and (ii) merging fine-tuned checkpoints from disparate tasks can lead to significant performance loss. To add...

---

## 48. Chasing the Tail: Effective Rubric-based Reward Modeling for Large Language Model Post-Training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement fine-tuning (RFT) often suffers from reward over-optimization, where a policy model hacks the reward signals to achieve high scores while producing low-quality outputs. Our theoretical analysis shows that the key lies in reward misspecification at the high-reward tail: the inability to reliably distinguish excellent responses from merely great ones. This motivate us to focus on the h...

---

## 49. HyperDPO: Hypernetwork-based Multi-Objective Fine-Tuning Framework

**Authors:** Yinuo Ren, Tesi Xiao, Michael Shavlovsky, Lexing Ying, Holakou Rahmanian

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> In LLM alignment and many other ML applications, one often faces the *Multi-Objective Fine-Tuning (MOFT)* problem, *i.e.* fine-tuning an existing model with datasets labeled w.r.t. different objectives simultaneously. To address the challenge, we propose the *HyperDPO* framework, a conditioned one-shot fine-tuning approach that extends the Direct Preference Optimization (DPO) technique, originally...

---

## 50. Sample-efficient LLM Optimization with Reset Replay

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Recent advancements in post-training Large Language Models (LLMs), particularly through Reinforcement Learning (RL) and preference optimization methods, are key drivers for enhancing their reasoning capabilities. 
However, these methods are often plagued by low sample efficiency and a susceptibility to primacy bias, where overfitting to initial experiences degrades policy quality and damages the l...

---

## 51. Unlocking the Pre-Trained Model as a Dual-Alignment Calibrator for Post-Trained LLMs

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training boosts the performance of large language models (LLMs) but systematically degrades their confidence calibration, making them frequently overconfident. Recent post-hoc LLM calibration methods circumvent the challenge by aligning the post-trained language model with its pre-trained counterpart; however, they treat calibration as a static output distribution matching problem, and thus f...

---

## 52. SPP: Sparsity-Preserved Parameter-Efficient Fine-Tuning for Large Language Models

**Authors:** Xudong Lu, Aojun Zhou, Yuhui Xu, Renrui Zhang, Peng Gao

**Year:** 2024 | **Venue:** ICML 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=9Rroj9GIOQ) | > Large Language Models (LLMs) have become pivotal in advancing the field of artificial intelligence, yet their immense sizes pose significant challenges for both fine-tuning and deployment. Current post-training pruning methods, while reducing the sizes of LLMs, often fail to maintain their original performance. To address these challenges, this paper introduces SPP, a **S**parsity-**P**reserved **...

---

## 53. PIKA: Expert-Level Synthetic Datasets for Post-Training Alignment from Scratch

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement Learning from Human Feedback (RLHF) has become a cornerstone for aligning large language models (LLMs). However, its effectiveness critically depends on high-quality instruction data. Most existing high-quality alignment datasets are either private or require costly human annotation, which hinders reproducibility and scalability. Even with the emergence of Reinforcement Learning from...

---

## 54. Detecting Data Contamination from Reinforcement Learning Post-training for Large Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Data contamination poses a significant threat to the reliable evaluation of Large Language Models (LLMs). This issue arises when benchmark samples may inadvertently appear in training sets, compromising the validity of reported performance. While detection methods have been developed for the pre-training and Supervised Fine-Tuning stages, a critical research gap exists for the increasingly signifi...

---

## 55. The Geometry of LLM Quantization: GPTQ as Babai's Nearest Plane Algorithm

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Quantizing the weights of large language models (LLMs) from 16-bit to lower bitwidth is the de facto approach to deploy massive transformers onto more affordable accelerators. While GPTQ emerged as one of the standard methods for one-shot post-training quantization at LLM scale, its inner workings are described as a sequence of algebraic updates that obscure geometric meaning or worst-case guarant...

---

## 56. Towards a Theoretical Understanding of Synthetic Data in LLM Post-Training: A Reverse-Bottleneck Perspective

**Authors:** Zeyu Gan, Yong Liu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=UxkznlcnHf) | > Synthetic data has become a pivotal resource in post-training tasks for large language models (LLMs) due to the scarcity of high-quality, specific data. While various methods have been developed to generate synthetic data, there remains a discernible gap between the practical effects of synthetic data and our theoretical comprehension. To address this challenge, we commence by presenting a detaile...

---

## 57. Rethinking Output Alignment for 1-bit Post-Training Quantization of Large Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) deliver strong performance across a wide range of NLP tasks, but their massive sizes hinder deployment on resource-constrained devices. To reduce their computational and memory burden, various compression techniques have been proposed, including quantization, pruning, and knowledge distillation. Among these, post-training quantization (PTQ) is widely adopted for its ef...

---

## 58. BLoB: Bayesian Low-Rank Adaptation by Backpropagation for Large Language Models

**Authors:** Yibin Wang, Haizhou Shi, Ligong Han, Dimitris N. Metaxas, Hao Wang

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=MaDykgj4Ru) | > Large Language Models (LLMs) often suffer from overconfidence during inference, particularly when adapted to downstream domain-specific tasks with limited data. Previous work addresses this issue by employing approximate Bayesian estimation after the LLMs are trained, enabling them to quantify uncertainty. However, such post-training approaches' performance is severely limited by the parameters le...

---

## 59. Beyond Fixed Budgets: Dynamic Reasoning Efficiency Reward for Large Language Model

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> The "slow thinking" paradigm has been widely validated to enhance the reasoning capabilities of large language models, but it also introduces reasoning inefficiency: models may overthink simple problems while prematurely shifting their reasoning paths when tackling complex problems. To address this, we propose AdapThink, a simple yet efficient post-training framework designed to control preference...

---

## 60. ShiftAddLLM: Accelerating Pretrained LLMs via Post-Training Multiplication-Less Reparameterization

**Authors:** Haoran You, Yipin Guo, Yichao Fu, Wei Zhou, Huihong Shi

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=JNl6h3U3oW) | > Large language models (LLMs) have shown impressive performance on language tasks but face challenges when deployed on resource-constrained devices due to their extensive parameters and reliance on dense multiplications, resulting in high memory demands and latency bottlenecks. Shift-and-add reparameterization offers a promising solution by replacing costly multiplications with hardware-friendly pr...

---

## 61. PTQTP: Post-Training Quantization to Trit-Planes for Large Language Models

**Authors:** He Xiao, RUNMING YANG, Qingyao Yang, Wendong XU, Zhen Li

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training quantization (PTQ) of large language models (LLMs) to extremely low bit-widths remains challenging due to the fundamental trade-off between computational efficiency and model expressiveness. While existing ultra-low-bit PTQ methods rely on binary approximations or complex compensation mechanisms, they suffer from either limited representational capacity or computational overhead that...

---

## 62. A Survey of Post-Training Scaling in Large Language Models

**Authors:** Hanyu Lai, Xiao Liu, Junjie Gao, Jiale Cheng, Zehan Qi

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.140.pdf) | > Large language models (LLMs) have achieved remarkable proficiency in understanding and generating human natural languages, mainly owing to the “scaling law” that optimizes relationships among language modeling loss, model parameters, and pre-trained tokens. However, with the exhaustion of high-quality internet corpora and increasing computational demands, the sustainability of pre-training scaling...

---

## 63. Plug-and-Play: An Efficient Post-training Pruning Method for Large Language Models

**Authors:** Yingtao Zhang, Haoli Bai, Haokun Lin, Jialin Zhao, Lu Hou

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=Tr0lPx9woF) | > With the rapid growth of large language models (LLMs), there is increasing demand for memory and computation in LLMs. Recent efforts on post-training pruning of LLMs aim to reduce the model size and computation requirements, yet the performance is still sub-optimal. 
In this paper, we present a plug-and-play solution for post-training pruning of LLMs.
The proposed solution has two innovative compo...

---

## 64. RoSTE: An Efficient Quantization-Aware Supervised Fine-Tuning Approach for Large Language Models

**Authors:** Quan Wei, Chung-Yiu Yau, Hoi To Wai, Yang Zhao, Dongyeop Kang

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=h30EzoI3s0) | > Supervised fine-tuning is a standard method for adapting pre-trained large language models (LLMs) to downstream tasks. Quantization has been recently studied as a post-training technique for efficient LLM deployment. To obtain quantized fine-tuned LLMs, conventional pipelines would first fine-tune the pre-trained models, followed by post-training quantization. This often yields suboptimal performa...

---

## 65. Surprising Effectiveness of pretraining Ternary Language Model at Scale

**Authors:** Ayush Kaushal, Tejas Vaidhya, Arnab Kumar Mondal, Tejas Pandey, Aaryan Bhagat

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=TJo6aQb7mK) | > Rapid advancements in GPU computational power has outpaced memory capacity and bandwidth growth, creating bottlenecks in Large Language Model (LLM) inference. Post-training quantization is the leading method for addressing memory-related bottlenecks in LLM inference, but it suffers from significant performance degradation below 4-bit precision. This paper addresses these challenges by investigatin...

---

## 66. SPA: Enhancing 3D Multimodal LLMs with Mask-based Streamlining Preference Alignment

**Authors:** Weiyang Jin, Baihan Yang, Huan-ang Gao, Jingwei Zhao, Kangliang Chen

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Integrating 3D features into Large Language Models (LLMs) is a rapidly evolving field, with models like 3D-LLM, Point-Bind LLM, and PointLLM making notable strides. PointLLM, pre-trained and fine-tuned on the Objaverse dataset, enhances understanding by optimizing the projector, boosting resource efficiency and consistency. However, we observed a persistent bottleneck: increasing the LLM backbone ...

---

## 67. Gradient Ascent Post-training Enhances Language Model Generalization

**Authors:** Dongkeun Yoon, Joel Jang, Sungdong Kim, Minjoon Seo

**Year:** 2023 | **Venue:** ACL 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2023.acl-short.74.pdf) | > In this work, we empirically show that updating pretrained LMs (350M, 1.3B, 2.7B) with just a few steps of Gradient Ascent Post-training (GAP) on random, unlabeled text corpora enhances its zero-shot generalization capabilities across diverse NLP tasks. Specifically, we show that GAP can allow LMs to become comparable to 2-3x times larger LMs across 12 different NLP tasks. We also show that applyi...

---

## 68. Merge-Friendly Post-Training Quantization for Multi-Target Domain Adaptation

**Authors:** Juncheol Shin, Minsang Seok, Seonggon Kim, Eunhyeok Park

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=aCBd1FeE5Z) | > Model merging has emerged as a powerful technique for combining task-specific weights, achieving superior performance in multi-target domain adaptation. However, when applied to practical scenarios, such as quantized models, new challenges arise. In practical scenarios, quantization is often applied to target-specific data, but this process restricts the domain of interest and introduces discretiz...

---

## 69. Towards Accurate Post-training Network Quantization via Bit-Split and Stitching

**Authors:** Peisong Wang, Qiang Chen, Xiangyu He, Jian Cheng

**Year:** 2020 | **Venue:** ICML 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v119/wang20c/wang20c.pdf) | > Network quantization is essential for deploying deep models to IoT devices due to its high efficiency. Most existing quantization approaches rely on the full training datasets and the time-consuming fine-tuning to retain accuracy. Post-training quantization does not have these problems, however, it has mainly been shown effective for 8-bit quantization due to the simple optimization strategy. In t...

---

## 70. Quadratic Coreset Selection: Certifying and Reconciling Sequence and Token Mining for Efficient Instruction Tuning

**Authors:** Ziliang Chen, Yongsen Zheng, Zhao-Rong Lai, Zhanfu Yang, Cuixi Li

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Instruction-Tuning (IT) was recently found the impressive data efficiency in post-training large language models (LLMs). While the pursuit of efficiency predominantly focuses on sequence-level curation, often overlooking the nuanced impact of critical tokens and the inherent risks of token noise and biases. Drawing inspiration from bi-level coreset selection, our work provides the principled view ...

---

## 71. Pixel-Space Post-Training of Latent-Diffusion Models

**Authors:** Christina Zhang, Simran Motwani, Matthew Yu, Ji Hou, Felix Juefei-Xu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Latent diffusion models (LDMs) have made significant advancements in the field of image generation in recent years. One major advantage of LDMs is their ability to operate in a compressed latent space, allowing for more efficient training and deployment. However, despite these advantages, challenges with LDMs still remain. For example, it has been observed that LDMs often generate high-frequency d...

---

## 72. Towards Efficient Post-training Quantization of Pre-trained Language Models

**Authors:** Haoli Bai, Lu Hou, Lifeng Shang, Xin Jiang, Irwin King

**Year:** 2022 | **Venue:** NIPS 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=tvDRmAxGIjw) | > Network quantization has gained increasing attention with the rapid growth of large pre-trained language models~(PLMs). However, most existing quantization methods for PLMs follow quantization-aware training~(QAT) that requires end-to-end training with full access to the entire dataset. Therefore, they suffer from slow training, large memory overhead, and data accessibility issues. In this paper, ...

---

## 73. MagR: Weight Magnitude Reduction for Enhancing Post-Training Quantization

**Authors:** Aozhong Zhang, Naigang Wang, Yanxia Deng, Xin Li, Zi Yang

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=UARTFgkTqW) | > In this paper, we present a simple optimization-based preprocessing technique called Weight Magnitude Reduction (MagR) to improve the performance of post-training quantization. For each linear layer, we adjust the pre-trained floating-point weights by solving an $\ell_\infty$-regularized optimization problem. This process greatly diminishes the maximum magnitude of the weights and smooths out outl...

---

## 74. Hardware-Friendly Post-Training Quantization: Input- and Output-Channelwise Scale and Offset

**Authors:** Geunjae Choi, Kamin Lee, KiYoon Yoo, Nojun Kwak

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Post-training quantization enables swift quantization of neural networks using a minimal calibration dataset.
Specifically, these methods tend to underperform dramatically on hardware with fixed integer bit width, particularly in extremely low-bit quantization scenarios.
In response, we introduce an optimized method for uniform channel-wise quantization, which is compatible with existing hardware....

---

## 75. Fine-grained Post-training for Improving Retrieval-based Dialogue Systems

**Authors:** Janghoon Han, Taesuk Hong, Byoungjae Kim, Youngjoong Ko, Jungyun Seo

**Year:** 2021 | **Venue:** NAACL 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2021.naacl-main.122.pdf) | > Retrieval-based dialogue systems display an outstanding performance when pre-trained language models are used, which includes bidirectional encoder representations from transformers (BERT). During the multi-turn response selection, BERT focuses on training the relationship between the context with multiple utterances and the response. However, this method of training is insufficient when consideri...

---

## 76. JARVIS-VLA: Post-Training Large-Scale Vision Language Models to Play Visual Games with Keyboards and Mouse

**Authors:** Muyao Li, Zihao Wang, Kaichen He, Xiaojian Ma, Yitao Liang

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.findings-acl.920.pdf) | > Recently, action-based decision-making in open-world environments has gained significant attention. Visual Language Action (VLA) models, pretrained on large-scale web datasets, have shown promise in decision-making tasks. However, previous work has primarily focused on action post-training, often neglecting enhancements to the foundation model itself. In response, we introduce Act from Visual Lang...

---

## 77. Satori: Reinforcement Learning with Chain-of-Action-Thought Enhances LLM Reasoning via Autoregressive Search

**Authors:** Maohao Shen, Guangtao Zeng, Zhenting Qi, Zhang-Wei Hong, Zhenfang Chen

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=j4FXxMiDjL) | > Large language models (LLMs) have demonstrated remarkable reasoning capabilities across diverse domains. Recent studies have shown that increasing test-time computation enhances LLMs' reasoning capabilities. This typically involves extensive sampling at inference time guided by an external LLM verifier, resulting in a two-player system. Despite external guidance, the effectiveness of this system d...

---

## 78. SPARQ: Outlier-free SpeechLM with Fast Adaptation and Robust Quantization

**Authors:** Shang Wu, Yen-Ju Lu, Haozheng Luo, Maojiang Su, Jerry Yao-Chieh Hu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> We propose SpARQ (outlier-free SpeechLM for Fast Adaptation and Robust Quantization) to address the outlier problem in Speech and Language multi-modal Models (SpeechLMs). Our primary observation is that outliers stemming from cross-modal (speech and text) low-rank adaptation and post-training quantization stages affect the performance of the current SpeechLMs. Methodologically, SpARQ leverages a p...

---

## 79. Asymmetric Conflict and Synergy in Post-training for LLM-based Multilingual Machine Translation

**Authors:** Tong Zheng, Yan Wen, Huiwen Bao, Junfeng Guo, Heng Huang

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.findings-acl.944.pdf) | > The emergence of Large Language Models (LLMs) has advanced the multilingual machine translation (MMT), yet the Curse of Multilinguality (CoM) remains a major challenge. Existing work in LLM-based MMT typically mitigates this issue via scaling up training and computation budget, which raises a critical question: Is scaling up the training and computation budget truly necessary for high-quality MMT,...

---

## 80. Q-VLM: Post-training Quantization for Large Vision-Language Models

**Authors:** Changyuan Wang, Ziwei Wang, Xiuwei Xu, Yansong Tang, Jie Zhou

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=gxMfNArldP) | > In this paper, we propose a post-training quantization framework of large vision-language models (LVLMs) for efficient multi-modal inference. Conventional quantization methods sequentially search the layer-wise rounding functions by minimizing activation discretization errors, which fails to acquire optimal quantization strategy without considering cross-layer dependency. On the contrary, we mine ...

---

## 81. Transferable Post-training via Inverse Value Learning

**Authors:** Xinyu Lu, Xueru Wen, Yaojie Lu, Bowen Yu, Hongyu Lin

**Year:** 2025 | **Venue:** NAACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.naacl-long.227.pdf) | > As post-training processes utilize increasingly large datasets and base models continue to grow in size, the computational demands and implementation challenges of existing algorithms are escalating significantly. In this paper, we propose modeling the changes at the logits level during post-training using a separate neural network (i.e., the value network). After training this network on a small ...

---

## 82. Steering Information Utility in Key-Value Memory for Language Model Post-Training

**Authors:** Chunyuan Deng, Ruidi Chang, Hanjie Chen

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Recent advancements in language models (LMs) have marked a shift toward the growing importance of post-training. Yet, post-training approaches such as supervised fine-tuning (SFT) do not guarantee the effective use of knowledge acquired during pretraining. We therefore introduce infosteer, a lightweight method that encourages parametric information utilization in LMs during post-training. Specific...

---

## 83. QuIP$\#$: Even Better LLM Quantization with Hadamard Incoherence and Lattice Codebooks

**Authors:** Albert Tseng, Jerry Chee, Qingyao Sun, Volodymyr Kuleshov, Christopher De Sa

**Year:** 2024 | **Venue:** ICML 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=9BrydUVcoe) | > Post-training quantization (PTQ) reduces the memory footprint of LLMs by quantizing their weights to low-precision. In this work, we introduce QuIP#, a weight-only PTQ method that achieves state-of-the-art results in extreme compression regimes ($\le$ 4 bits per weight) using three novel techniques. First, QuIP# improves QuIP's (Chee et al., 2023) incoherence processing by using the randomized Had...

---

## 84. Contrastive Post-training Large Language Models on Data Curriculum

**Authors:** Canwen Xu, Corby Rosset, Luciano Del Corro, Shweti Mahajan, Julian McAuley

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Alignment serves as an important step to steer large language models (LLMs) towards human preferences. In this paper, we explore contrastive post-training techniques for alignment by automatically constructing preference pairs from multiple models of varying strengths (e.g., InstructGPT, ChatGPT and GPT-4). We carefully compare the contrastive techniques of SLiC and DPO to SFT baselines and find t...

---

## 85. Direct Post-Training Preference Alignment for Multi-Agent Motion Generation Model Using Implicit Feedback from Pre-training Demonstrations

**Authors:** Thomas Tian, Kratarth Goel

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=8UFG9D8xeU) | > Recent advancements in Large Language Models (LLMs) have revolutionized motion generation models in embodied applications such as autonomous driving and robotic manipulation. While LLM-type auto-regressive motion generation models benefit from training scalability, there remains a discrepancy between their token prediction objectives and human preferences. As a result, models pre-trained solely wi...

---

## 86. Time-R1: Post-Training Large Vision Language Model for Temporal Video Grounding

**Authors:** Ye Wang, Ziheng Wang, Boshen Xu, Yang Du, Kejun Lin

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Temporal Video Grounding (TVG), the task of locating specific video segments based on language queries, is a core challenge in long-form video understanding. While recent Large Vision-Language Models (LVLMs) have shown early promise in tackling TVG through supervised fine-tuning (SFT), their ability to generalize remains limited. To address this, we propose a novel post-training framework that enh...

---

## 87. Can Post-Training Quantization Benefit from an Additional QLoRA Integration?

**Authors:** Xiliang Zhu, Elena Khasanova, Cheng Chen

**Year:** 2025 | **Venue:** NAACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.naacl-industry.41.pdf) | > Large language models (LLMs) have transformed natural language processing but pose significant challenges for real-world deployment. These models necessitate considerable computing resources, which can be costly and frequently unavailable. Model compression techniques such as quantization are often leveraged to alleviate resource demand, but they may have a negative impact on the generation qualit...

---

## 88. Can Compressed LLMs Truly Act? An Empirical Evaluation of Agentic Capabilities in LLM Compression

**Authors:** Peijie Dong, Zhenheng Tang, Xiang Liu, Lujun Li, Xiaowen Chu

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=rkwXYSDKso) | > Post-training compression reduces the computational and memory costs of large language models (LLMs), enabling resource-efficient deployment. However, existing compression benchmarks focus narrowly on language modeling (e.g., perplexity) and natural language understanding tasks (e.g., GLUE accuracy), ignoring the agentic capabilities—workflow, tool use/function call, long-context understanding and...

---

## 89. A Frustratingly Easy Post-Training Quantization Scheme for LLMs

**Authors:** Yongkweon Jeon, Chungman Lee, Kyungphil Park, Ho-young Kim

**Year:** 2023 | **Venue:** EMNLP 2023 | **Citations:** N/A | **Score:** 0.000

> Efficient inference has become crucial for hyper-scale AI models, including large language models, as their parameter count continues to increase for enhanced performance.
This necessity holds true regardless of the computing environment, whether it be mobile devices or cloud servers.
Quantization emerges as a solution to alleviate the computational burden during inference.
By representing models ...

---

## 90. Automatic Pair Construction for Contrastive Post-training

**Authors:** Canwen Xu, Corby Rosset, Ethan Chau, Luciano Corro, Shweti Mahajan

**Year:** 2024 | **Venue:** NAACL 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.findings-naacl.11.pdf) | > Alignment serves as an important step to steer large language models (LLMs) towards human preferences. In this paper, we propose an automatic way to construct contrastive data for LLM, using preference pairs from multiple models of varying strengths (e.g., InstructGPT, ChatGPT and GPT-4). We compare the contrastive techniques of SLiC and DPO to SFT baselines and find that DPO provides a step-funct...

---

## 91. Eliciting Reasoning in Language Models with Cognitive Tools

**Authors:** Brown Ebouky, Andrea Bartezzaghi, Mattia Rigotti

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> The recent advent of reasoning models like OpenAI's o1 was met with excited speculation by the AI community about the mechanisms underlying these capabilities in closed models, followed by a rush of replication efforts, particularly from the open source community.
These speculations were largely settled by the demonstration from DeepSeek-R1 that chain-of-thought and reinforcement learning (RL) can...

---

## 92. Compressing Large Language Models using Low Rank and Low Precision Decomposition

**Authors:** Rajarshi Saha, Naomi Sagan, Varun Srivastava, Andrea Goldsmith, Mert Pilanci

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=lkx3OpcqSZ) | > The prohibitive sizes of Large Language Models (LLMs) today make it difficult to deploy them on memory-constrained edge devices. This work introduces $\rm CALDERA$ -- a new post-training LLM compression algorithm that harnesses the inherent low-rank structure of a weight matrix $\mathbf{W}$ by approximating it via a low-rank, low-precision decomposition as $\mathbf{W} \approx \mathbf{Q} + \mathbf{...

---

## 93. Progress or Regress? Self-Improvement Reversal in Post-training

**Authors:** Ting Wu, Xuefeng Li, Pengfei Liu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=RFqeoVfLHa) | > Self-improvement through post-training methods such as iterative preference learning has been acclaimed for enhancing the problem-solving capabilities (e.g., mathematical reasoning) of Large Language Models (LLMs) without human intervention. However, as our exploration deepens, it is crucial to critically assess whether these enhancements indeed signify comprehensive progress or if they could lead...

---

## 94. Optimal Brain Compression: A Framework for Accurate Post-Training Quantization and Pruning

**Authors:** Elias Frantar, Dan Alistarh

**Year:** 2022 | **Venue:** NIPS 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=ksVGCOlOEba) | > We consider the problem of model compression for deep neural networks (DNNs) in the challenging one-shot/post-training setting, in which we are given an accurate trained model, and must compress it without any retraining, based only on a small amount of calibration input data. This problem has become popular in view of the emerging software and hardware support for executing models compressed via ...

---

## 95. Attention-aware Post-training Quantization without Backpropagation

**Authors:** Junhan Kim, Ho-young Kim, Eulrang Cho, Chungman Lee, Joonyoung Kim

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Quantization offers a promising solution for deploying large-scale language models (LLMs) on resource-constrained devices. However, early quantization methods, developed for smaller networks like ResNet, rely on gradient-based optimization, which becomes impractical for hyper-scale LLMs with billions of parameters. While recently proposed backpropagation-free post-training quantization (PTQ) metho...

---

## 96. Q-Palette: Fractional-Bit Quantizers Toward Optimal Bit Allocation for Efficient LLM Deployment

**Authors:** Deokjae Lee, Hyun Oh Song

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> We study weight-only post-training quantization (PTQ), which quantizes the weights of a large language model (LLM) without retraining, using little or no calibration data. Weight-only PTQ is crucial for reducing the memory footprint and latency of LLM inference, especially in memory-bound, small-batch inference scenarios, such as personalized inference on edge devices. Despite its importance, irre...

---

## 97. Quantization Error Propagation: Revisiting Layer-Wise Post-Training Quantization

**Authors:** Yamato Arai, Yuma Ichikawa

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Layer-wise PTQ is a promising technique for compressing large language models (LLMs), due to its simplicity and effectiveness without requiring retraining. However, recent progress in this area is saturating, underscoring the need to revisit its core limitations and explore further improvements. We address this challenge by identifying a key limitation of existing layer-wise PTQ methods: the growt...

---

## 98. AL-QASIDA: Analyzing LLM Quality and Accuracy Systematically in Dialectal Arabic

**Authors:** Nathaniel Romney Robinson, Shahd Abdelmoneim, Kelly Marchisio, Sebastian Ruder

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.findings-acl.1137.pdf) | > Dialectal Arabic (DA) varieties are under-served by language technologies, particularly large language models (LLMs). This trend threatens to exacerbate existing social inequalities and limits LLM applications, yet the research community lacks operationalized performance measurements in DA. We present a framework that comprehensively assesses LLMs’ DA modeling capabilities across four dimensions: ...

---

## 99. Outlier-Aware Post-Training Quantization for Discrete Graph Diffusion Models

**Authors:** Zheng Gong, Ying Sun

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=w5fONAEwra) | > Discrete Graph Diffusion Models (DGDMs) mark a pivotal advancement in graph generation, effectively preserving sparsity and structural integrity, thereby enhancing the learning of graph data distributions for diverse generative applications. Despite their potential, DGDMs are computationally intensive due to the numerous low-parameter yet high-computation operations, thereby increasing the need of...

---

## 100. Adaptive Fission: Post-training Encoding for Low-latency Spike Neural Networks

**Authors:** Yizhou Jiang, Feng Chen, Yihan Li, Yuqian Liu, Haichuan Gao

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Spiking Neural Networks (SNNs) often rely on rate coding, where high-precision inference depends on long time-steps, leading to significant latency and energy cost—especially for ANN-to-SNN conversions. To address this, we propose Adaptive Fission, a post-training encoding technique that selectively splits high-sensitivity neurons into groups with varying scales and weights. This enables neuron-sp...

---

## 101. Synthesizing Post-Training Data for LLMs through Multi-Agent Simulation

**Authors:** Shuo Tang, Xianghe Pang, Zexi Liu, Bohan Tang, Rui Ye

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.1136.pdf) | > Post-training is essential for enabling large language models (LLMs) to follow human instructions. However, its effectiveness depends on high-quality instruction data, which is challenging to obtain in the real world due to privacy concerns, data scarcity, and high annotation costs. To fill this gap, inspired by the recent success of using LLMs to simulate human society, we propose MATRIX, a multi...

---

## 102. Up or Down? Adaptive Rounding for Post-Training Quantization

**Authors:** Markus Nagel, Rana Ali Amjad, Mart Van Baalen, Christos Louizos, Tijmen Blankevoort

**Year:** 2020 | **Venue:** ICML 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v119/nagel20a/nagel20a.pdf) | > When quantizing neural networks, assigning each floating-point weight to its nearest fixed-point value is the predominant approach. We find that, perhaps surprisingly, this is not the best we can do. In this paper, we propose AdaRound, a better weight-rounding mechanism for post-training quantization that adapts to the data and the task loss. AdaRound is fast, does not require fine-tuning of the n...

---

## 103. PISA Experiments: Exploring Physics Post-Training for Video Diffusion Models by Watching Stuff Drop

**Authors:** Chenyu Li, Oscar Michel, Xichen Pan, Sainan Liu, Mike Roberts

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=RFCp1QzzHQ) | > Large-scale pre-trained video generation models excel in content creation but are not reliable as physically accurate world simulators out of the box. This work studies the process of post-training these models for accurate world modeling through the lens of the simple, yet fundamental, physics task of modeling object freefall. We show state-of-the-art video generation models struggle with this ba...

---

## 104. ZeroQuant: Efficient and Affordable Post-Training Quantization for Large-Scale Transformers

**Authors:** Zhewei Yao, Reza Yazdani Aminabadi, Minjia Zhang, Xiaoxia Wu, Conglong Li

**Year:** 2022 | **Venue:** NIPS 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=f-fVCElZ-G1) | > How to efficiently serve ever-larger trained natural language models in practice has become exceptionally challenging even for powerful cloud servers due to their prohibitive memory/computation requirements.
In this work, we present an efficient and affordable post-training quantization approach to compress large Transformer-based models, termed as \OURS. 
\OURS is an end-to-end quantization and i...

---

## 105. PTNQ: Post-Training Non-Linear Quantization

**Authors:** Diogo Venâncio, Nuno P. Lopes

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Quantization is one of the leading techniques to reduce the memory usage of machine learning models.
It works by approximating the weights of a model by some function with a smaller domain (e.g., replace 32-bit floats with 8-bit integers that are coefficients in some function that maps back to 32-bit floats).

Although most quantization methods approximate weights with a linear or affine function,...

---

## 106. Post-Training Dialogue Summarization using Pseudo-Paraphrasing

**Authors:** Qi Jia, Yizhu Liu, Haifeng Tang, Kenny Zhu

**Year:** 2022 | **Venue:** NAACL 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2022.findings-naacl.125.pdf) | > Previous dialogue summarization techniques adapt large language models pretrained on the narrative text by injecting dialogue-specific features into the models. These features either require additional knowledge to recognize or make the resulting models harder to tune. To bridge the format gap between dialogues and narrative summaries in dialogue summarization tasks, we propose to post-train pretr...

---

## 107. Post-Training Weighted Quantization of Neural Networks for Language Models

**Authors:** Se Jung Kwon, Dongsoo Lee, Yongkweon Jeon, Byeongwook Kim, Bae Seong Park

**Year:** 2021 | **Venue:** ICLR 2021 | **Citations:** N/A | **Score:** 0.000

> As a practical model compression technique, parameter quantization is effective especially for language models associated with a large memory footprint. Neural network quantization is usually performed to reduce quantization loss assuming that quantization error of each parameter equally contributes to the overall training loss. The importance of each parameter, however, may highly differ such tha...

---

## 108. PV-Tuning: Beyond Straight-Through Estimation for Extreme LLM Compression

**Authors:** Vladimir Malinovskii, Denis Mazur, Ivan Ilin, Denis Kuznedelev, Konstantin Pavlovich Burlachenko

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=YvA8UF0I37) | > There has been significant interest in "extreme" compression of large language models (LLMs), i.e. to 1-2 bits per parameter, which allows such models to be executed efficiently on resource-constrained devices.  
Existing work focused on improved one-shot quantization techniques and weight representations; yet, purely post-training  approaches are reaching diminishing returns in terms of the accur...

---

## 109. SSP: Self-Supervised Post-training for Conversational Search

**Authors:** Quan Tu, Shen Gao, Xiaolong Wu, Zhao Cao, Ji-Rong Wen

**Year:** 2023 | **Venue:** ACL 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2023.findings-acl.837.pdf) | > Conversational search has been regarded as the next-generation search paradigm. Constrained by data scarcity, most existing methods distill the well-trained ad-hoc retriever to the conversational retriever. However, these methods, which usually initialize parameters by query reformulation to discover contextualized dependency, have trouble in understanding the dialogue structure information and st...

---

## 110. Diffusion Adversarial Post-Training for One-Step Video Generation

**Authors:** Shanchuan Lin, Xin Xia, Yuxi Ren, Ceyuan Yang, Xuefeng Xiao

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=AAgzsnhc28) | > The diffusion models are widely used for image and video generation, but their iterative generation process is slow and expansive. While existing distillation approaches have demonstrated the potential for one-step generation in the image domain, they still suffer from significant quality degradation. In this work, we propose Adversarial Post-Training (APT) against real data following diffusion pr...

---

## 111. Post-Training Quantization for Vision Transformer

**Authors:** Zhenhua Liu, Yunhe Wang, Kai Han, Wei Zhang, Siwei Ma

**Year:** 2021 | **Venue:** NIPS 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=9TX5OsKJvm) | > Recently, transformer has achieved remarkable performance on a variety of computer vision applications. Compared with mainstream convolutional neural networks, vision transformers are often of sophisticated architectures for extracting powerful feature representations, which are more difficult to be developed on mobile devices. In this paper, we present an effective post-training quantization algo...

---

## 112. Fast Post-training Analysis of NeRFs Using A Simple Visibility Prediction Network

**Authors:** Jianbo Ye, Jiawei Mo, Xiaolong Li, Xiaohan Fei, Ashwin Swaminathan

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Exercising NeRFs on real-world data taught us that their novel view rendering capability varies across different views and rendering of regions that are visible in more input images often produces more reliable results. However, efficient quantitative tools haven't been developed in this regard to facilitate the post-training analysis of NeRF rendered images. In this paper, we introduce a simple v...

---

## 113. Lattice Quantization

**Authors:** Clément Metz, Thibault Allenet, Johannes Christian Thiele, Antoine Dupret, Olivier BICHLER

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> Low bit quantization of weights in increasingly large deep convolutional neural networks (DCNNs) can be critical for their implementation in memory constrained hardware systems. Post-training quantization consists in quantizing a model without retraining, which is user-friendly, fast and data frugal. In this paper, we propose LatticeQ, a new post-training weight quantization method designed for DC...

---

## 114. RL Tango: Reinforcing Generator and Verifier Together for Language Reasoning

**Authors:** Kaiwen Zha, Zhengqi Gao, Maohao Shen, Zhang-Wei Hong, Duane S Boning

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning (RL) has recently emerged as a compelling approach for enhancing the reasoning capabilities of large language models (LLMs), where an LLM generator serves as a policy guided by a verifier (reward model). However, current RL post-training methods for LLMs typically use verifiers that are fixed (rule-based or frozen pretrained) or trained discriminatively via supervised fine-t...

---

## 115. BoA: Attention-aware Post-training Quantization without Backpropagation

**Authors:** Junhan Kim, Ho-young Kim, Eulrang Cho, Chungman Lee, Joonyoung Kim

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=Uvj6XcSJ5d) | > Post-training quantization (PTQ) is a promising solution for deploying large language models (LLMs) on resource-constrained devices. 
Early methods developed for small-scale networks, such as ResNet, rely on gradient-based optimization, which becomes impractical for hyper-scale LLMs with billions of parameters.
While recently proposed backpropagation-free or transformation-based methods alleviate ...

---

## 116. Maximum Margin Based Activation Clipping for Post-Training Overfitting Mitigation in DNN Classifiers

**Authors:** Hang Wang, David J. Miller, George Kesidis

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Well-known (non-malicious) sources of overfitting in deep neural net (DNN) classifiers include: i) large class imbalances; ii) insufficient training set diversity; and iii) over-training.  In recent work, it was shown that backdoor 
data-poisoning also induces overfitting, with unusually large classification margins to the attacker's target class, mediated particularly by (unbounded) ReLU activati...

---

## 117. BRiTE: Bootstrapping Reinforced Thinking Process to Enhance Language Model Reasoning

**Authors:** Han Zhong, Yutong Yin, Shenao Zhang, Xiaojun Xu, Yuanxin Liu

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=NME3HKUHLX) | > Large Language Models (LLMs) have demonstrated remarkable capabilities in complex reasoning tasks, yet generating reliable reasoning processes remains a significant challenge. We present a unified probabilistic framework that formalizes LLM reasoning through a novel graphical model incorporating latent thinking processes and evaluation signals. Our framework addresses two critical questions: (1) h...

---

## 118. Spend Wisely: Maximizing Post-Training Gains in Iterative Synthetic Data Bootstrapping

**Authors:** Pu Yang, Yunzhen Feng, Ziyuan Chen, Yuhang Wu, Zhuoyuan Li

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Modern foundation models often undergo iterative ``bootstrapping'' in their post-training phase: a model generates synthetic data, an external verifier filters out low-quality samples, and the high-quality subset is used for further fine-tuning. Over multiple iterations, the model performance improves, raising a crucial question: How should the total budget for generation and training be allocated...

---

## 119. Dialog-Post: Multi-Level Self-Supervised Objectives and Hierarchical Model for Dialogue Post-Training

**Authors:** Zhenyu Zhang, Lei Shen, Yuming Zhao, Meng Chen, Xiaodong He

**Year:** 2023 | **Venue:** ACL 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2023.acl-long.564.pdf) | > Dialogue representation and understanding aim to convert conversational inputs into embeddings and fulfill discriminative tasks. Compared with free-form text, dialogue has two important characteristics, hierarchical semantic structure and multi-facet attributes. Therefore, directly applying the pretrained language models (PLMs) might result in unsatisfactory performance. Recently, several work foc...

---

## 120. Can LLM Graph Reasoning Generalize beyond Pattern Memorization?

**Authors:** Yizhuo Zhang, Heng Wang, Shangbin Feng, Zhaoxuan Tan, Xiaochuang Han

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.findings-emnlp.127.pdf) | > Large language models (LLMs) demonstrate great potential for problems with implicit graphical structures, while recent works seek to enhance the graph reasoning capabilities of LLMs through specialized instruction tuning. The resulting “graph LLMs” are evaluated with in-distribution settings only, thus it remains underexplored whether LLMs are learning generalizable graph reasoning skills or merel...

---

## 121. RoLoRA: Fine-tuning Rotated Outlier-free LLMs for Effective Weight-Activation Quantization

**Authors:** Xijie Huang, Zechun Liu, Shih-Yang Liu, Kwang-Ting Cheng

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.findings-emnlp.444.pdf) | > Low-Rank Adaptation (LoRA), as a representative Parameter-Efficient Fine-Tuning (PEFT) method, significantly enhances the training efficiency by updating only a small portion of the weights in Large Language Models (LLMs). Recently, weight-only quantization techniques have also been applied to LoRA methods to reduce the memory footprint of fine-tuning. However, applying weight-activation quantizat...

---

## 122. Condor: Enhance LLM Alignment with Knowledge-Driven Data Synthesis and Refinement

**Authors:** Maosongcao Maosongcao, Taolin Zhang, Mo Li, Chuyu Zhang, Yunxin Liu

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.1091.pdf) | > The quality of Supervised Fine-Tuning (SFT) data plays a critical role in enhancing the conversational capabilities of Large Language Models (LLMs). However, the availability of high-quality human-annotated SFT data has become a significant bottleneck for LLMs, necessitating a greater reliance on synthetic training data. In this work, we introduce Condor, a two-stage synthetic data generation fram...

---

## 123. PTQ1.61: Push the Real Limit of Extremely Low-Bit Post-Training Quantization Methods for Large Language Models

**Authors:** Jiaqi Zhao, Miao Zhang, Ming Wang, Yuzhang Shang, Kaihao Zhang

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.225.pdf) | > Large Language Models (LLMs) suffer severe performance degradation when facing extremely low-bit (sub 2-bit) quantization. Several existing sub 2-bit post-training quantization (PTQ) methods utilize a mix-precision scheme by leveraging an unstructured fine-grained mask to explicitly distinguish salient weights, while which introduces an extra 1-bit or more per weight. To explore the real limit of ...

---

## 124. MAPoRL: Multi-Agent Post-Co-Training for Collaborative Large Language Models with Reinforcement Learning

**Authors:** Chanwoo Park, Seungju Han, Xingzhi Guo, Asuman E. Ozdaglar, Kaiqing Zhang

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.1459.pdf) | > Leveraging multi-agentic frameworks to enhance large language models (LLMs) has demonstrated significant potential recently, with most existing studies focusing on prompting and developing workflows with frozen LLMs. In this paper, we aim to further unleash the power of such multi-agentic frameworks for post-training LLMs for better collaboration. Specifically, we develop a new paradigm of Multi-A...

---

## 125. Genius: A Generalizable and Purely Unsupervised Self-Training Framework For Advanced Reasoning

**Authors:** Fangzhi Xu, Hang Yan, Chang Ma, Haiteng Zhao, Qiushi Sun

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.644.pdf) | > Advancing LLM reasoning skills has captivated wide interest. However, current post-training techniques rely heavily on supervisory signals, such as outcome supervision or auxiliary reward models, which face the problem of scalability and high annotation costs. This motivates us to enhance LLM reasoning without the need for external supervision. Given the input query, the LLM seeks the globally opt...

---

## 126. Dial-MAE: ConTextual Masked Auto-Encoder for Retrieval-based Dialogue Systems

**Authors:** Zhenpeng Su, Xing W, Wei Zhou, Guangyuan Ma, Songlin Hu

**Year:** 2024 | **Venue:** NAACL 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.naacl-long.47.pdf) | > Dialogue response selection aims to select an appropriate response from several candidates based on a given user and system utterance history. Most existing works primarily focus on post-training and fine-tuning tailored for cross-encoders. However, there are no post-training methods tailored for dense encoders in dialogue response selection. We argue that when the current language model, based on...

---

## 127. Re3Syn: A Dependency-Based Data Synthesis Framework for Long-Context Post-training

**Authors:** Zhiyang Zhang, Ziqiang Liu, Huiming Wang, Renke Shan, Li Kuang

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.1518.pdf) | > An important trend in the realm of large language models (LLMs) is the development of longer context windows. However, training LLMs with long context windows to acquire the capability of effectively modeling lengthy inputs is often hindered by the scarcity of naturally long-context data. Existing methods for constructing long-context data by concatenating short documents have overlooked a crucial...

---

## 128. AceMath: Advancing Frontier Math Reasoning with Post-Training and Reward Modeling

**Authors:** Zihan Liu, Yang Chen, Mohammad Shoeybi, Bryan Catanzaro, Wei Ping

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.findings-acl.206.pdf) | > In this paper, we introduce AceMath, a suite of frontier math models that excel in solving complex math problems, along with highly effective reward models capable of evaluating generated solutions and reliably identifying the correct ones. To develop the instruction-tuned math models, we propose a supervised fine-tuning (SFT) process that first achieves competitive performance across general doma...

---

## 129. Q-Mamba: Towards more efficient Mamba models via post-training quantization

**Authors:** Chen Tianqi, Yuanteng Chen, Peisong Wang, Weixiang Xu, Zeyu Zhu

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.findings-acl.551.pdf) | > State Space Models (SSMs), such as Mamba, have recently demonstrated potential in language understanding tasks, positioning them as competitors to transformer architectures. However, our investigations reveal that the Mamba architecture still has room for further optimization—not only in linear projections but also in state caches, which contribute significantly to memory consumption, particularly...

---

## 130. Enhancing Computation Efficiency in Large Language Models through Weight and Activation Quantization

**Authors:** Janghwan Lee, Minsoo Kim, Seungcheol Baek, Seok Joong Hwang, Wonyong Sung

**Year:** 2023 | **Venue:** EMNLP 2023 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) are proficient in natural language processing tasks, but their deployment is often restricted by extensive parameter sizes and computational demands. This paper focuses on post-training quantization (PTQ) in LLMs, specifically 4-bit weight and 8-bit activation (W4A8) quantization, to enhance computational efficiency—a topic less explored compared to weight-only quantiz...

---

## 131. Pre-training Distillation for Large Language Models: A Design Space Exploration

**Authors:** Hao Peng, Xin Lv, Yushi Bai, Zijun Yao, Jiajie Zhang

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.181.pdf) | > Knowledge distillation (KD) aims to transfer knowledge from a large teacher model to a smaller student model. Previous work applying KD in the field of large language models (LLMs) typically focused on the post-training phase, where the student LLM learns directly from instructions and corresponding responses generated by the teacher model. In this paper, we extend KD to the pre-training phase of ...

---

## 132. Tiny-NewsRec: Effective and Efficient PLM-based News Recommendation

**Authors:** Yang Yu, Fangzhao Wu, Chuhan Wu, Jingwei Yi, Qi Liu

**Year:** 2022 | **Venue:** EMNLP 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2022.emnlp-main.368.pdf) | > News recommendation is a widely adopted technique to provide personalized news feeds for the user. Recently, pre-trained language models (PLMs) have demonstrated the great capability of natural language understanding and benefited news recommendation via improving news modeling. However, most existing works simply finetune the PLM with the news recommendation task, which may suffer from the known ...

---

## 133. Bypass Back-propagation: Optimization-based Structural Pruning for Large Language Models via Policy Gradient

**Authors:** Yuan Gao, Zujing Liu, Weizhong Zhang, Bo Du, Gui-Song Xia

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.1421.pdf) | > Recent Large-Language Models (LLMs) pruning methods typically operate at the post-training phase without the expensive weight finetuning, however, their pruning criteria often rely on **heuristically hand-crafted metrics**, potentially leading to suboptimal performance. We instead propose a novel **optimization-based structural pruning** that learns the pruning masks in a probabilistic space direc...

---

## 134. LLM-QAT: Data-Free Quantization Aware Training for Large Language Models

**Authors:** Zechun Liu, Barlas Oguz, Changsheng Zhao, Ernie Chang, Pierre Stock

**Year:** 2024 | **Venue:** ACL 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.findings-acl.26.pdf) | > Several post-training quantization methods have been applied to large language models (LLMs), and have been shown to perform well down to 8-bits. We find that these methods break down at lower bit precision, and investigate quantization-aware training for LLMs (LLM-QAT) to push quantization levels even further. We propose a data-free distillation method that leverages generations produced by the p...

---

## 135. Rethinking Token Reduction for State Space Models

**Authors:** Zheng Zhan, Yushu Wu, Zhenglun Kong, Changdi Yang, Yifan Gong

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.emnlp-main.100.pdf) | > Recent advancements in State Space Models (SSMs) have attracted significant interest, particularly in models optimized for parallel training and handling long-range dependencies. Architectures like Mamba have scaled to billions of parameters with selective SSM. To facilitate broader applications using Mamba, exploring its efficiency is crucial. While token reduction techniques offer a straightforw...

---

## 136. One fish, two fish, but not the whole sea: Alignment reduces language models’ conceptual diversity

**Authors:** Sonia Krishna Murthy, Tomer Ullman, Jennifer Hu

**Year:** 2025 | **Venue:** NAACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.naacl-long.561.pdf) | > Researchers in social science and psychology have recently proposed using large language models (LLMs) as replacements for humans in behavioral research. In addition to arguments about whether LLMs accurately capture population-level patterns, this has raised questions about whether LLMs capture human-like conceptual diversity. Separately, it is debated whether post-training alignment (RLHF or RLA...

---

## 137. OptiPrune: Effective Pruning Approach for Every Target Sparsity

**Authors:** Khang Nguyen Le, Ryo Sato, Dai Nakashima, Takeshi Suzuki, Minh Le Nguyen

**Year:** 2025 | **Venue:** COLING 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.coling-main.243.pdf) | > Large language models (LLMs) have achieved notable success across various tasks but are hindered by their large size and high computational demands. Post-training pruning (PTP) offers a promising solution by reducing model size through parameter removal while preserving performance. However, current PTP methods perform optimally only within specific sparsity ranges. This paper presents two key fin...

---

## 138. Marco-o1 v2: Towards Widening The Distillation Bottleneck for Reasoning Models

**Authors:** Huifeng Yin, Yu Zhao, Minghao Wu, Xuanfan Ni, Bo Zeng

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.1145.pdf) | > Large Reasoning Models (LRMs) such as OpenAI o1 and DeepSeek-R1 have shown remarkable reasoning capabilities by scaling test-time compute and generating long Chain-of-Thought (CoT). Distillation post-training on LRMs-generated data is a straightforward yet effective method to enhance the reasoning abilities of smaller models, but faces a critical bottleneck: we found that distilled long CoT data p...

---

## 139. DavIR: Data Selection via Implicit Reward for Large Language Models

**Authors:** Haotian Zhou, Tingkai Liu, Qianli Ma, Yufeng Zhang, Jianbo Yuan

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.452.pdf) | > We introduce DavIR, a model-based data selection method for post-training Large Language Models. DavIR generalizes Reducible Holdout Loss to core-set selection problem of causal language modeling, and quantifies the learnability of a given datum with respect to a pre-trained LLM based on relative reduction in loss during fine-tuning, a metric we show to be closely related to the implicit reward mo...

---

## 140. RQT: Hierarchical Residual Quantization for Multi-Model Compression

**Authors:** Chen Tianqi, Peisong Wang, Weixiang Xu, Zeyu Zhu, Jian Cheng

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.findings-acl.554.pdf) | > Delta compression methods focus on efficiently serving multiple uniquely fine-tuned models, each tailored to specific tasks and user requirements. These approaches decompose a fine-tuned LLM into a base model and corresponding delta weights, which are compressed using low-rank or low-bit representations to reduce storage costs. However, their effectiveness is highly sensitive to the magnitude of t...

---

## 141. Large Language and Reasoning Models are Shallow Disjunctive Reasoners

**Authors:** Irtaza Khalid, Amir Masoud Nourollah, Steven Schockaert

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.433.pdf) | > Large Language Models (LLMs) have been found to struggle with systematic reasoning. Even on tasks where they appear to perform well, their performance often depends on shortcuts, rather than on genuine reasoning abilities, leading them to collapse on out-of-distribution (OOD) examples. Post-training strategies based on reinforcement learning and chain-of-thought prompting have recently been hailed...

---

## 142. Understanding and Overcoming the Challenges of Efficient Transformer Quantization

**Authors:** Yelysei Bondarenko, Markus Nagel, Tijmen Blankevoort

**Year:** 2021 | **Venue:** EMNLP 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2021.emnlp-main.627.pdf) | > Transformer-based architectures have become the de-facto standard models for a wide range of Natural Language Processing tasks. However, their memory footprint and high latency are prohibitive for efficient deployment and inference on resource-limited devices. In this work, we explore quantization for transformers. We show that transformers have unique quantization challenges – namely, high dynami...

---

## 143. Attend, Select and Eliminate: Accelerating Multi-turn Response Selection with Dual-attention-based Content Elimination

**Authors:** Jianxin Liang, Chang Liu, Chongyang Tao, Jiazhan Feng, Dongyan Zhao

**Year:** 2023 | **Venue:** ACL 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2023.findings-acl.422.pdf) | > Although the incorporation of pre-trained language models (PLMs) significantly pushes the research frontier of multi-turn response selection, it brings a new issue of heavy computation costs. To alleviate this problem and make the PLM-based response selection model both effective and efficient, we propose an inference framework together with a post-training strategy that builds upon any pre-traine...

---

## 144. Continual Quantization-Aware Pre-Training: When to transition from 16-bit to 1.58-bit pre-training for BitNet language models?

**Authors:** Jacob Nielsen, Peter Schneider-Kamp, Lukas Galke

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.findings-acl.694.pdf) | > Large language models (LLMs) require immense resources for training and inference. Quantization, a technique that reduces the precision of model parameters, offers a promising solution for improving LLM efficiency and sustainability. While post-training quantization methods typically achieve 4-8 bits per parameter, recent research suggests that training LLMs with 1.58 bits per weight parameter fro...

---

## 145. LLM-FP4: 4-Bit Floating-Point Quantized Transformers

**Authors:** Shih-yang Liu, Zechun Liu, Xijie Huang, Pingcheng Dong, Kwang-Ting Cheng

**Year:** 2023 | **Venue:** EMNLP 2023 | **Citations:** N/A | **Score:** 0.000

> We propose LLM-FP4 for quantizing both weights and activations in large language models (LLMs) down to 4-bit floating-point values, in a post-training manner. Existing post-training quantization (PTQ) solutions are primarily integer-based and struggle with bit widths below 8 bits. Compared to integer quantization, floating-point (FP) quantization is more flexible and can better handle long-tail or...

---

## 146. What Happened in LLMs Layers when Trained for Fast vs. Slow Thinking: A Gradient Perspective

**Authors:** Ming Li, Yanhong Li, Tianyi Zhou

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.1545.pdf) | > What makes a difference in the post-training of LLMs? We investigate the training patterns of different layers in large language models (LLMs) through the lens of the gradient. We are specifically interested in how fast vs. slow thinking affects the layer-wise gradients, given the recent popularity of training LLMs on reasoning paths such as chain-of-thoughts (CoT) and process rewards. In our stud...

---

