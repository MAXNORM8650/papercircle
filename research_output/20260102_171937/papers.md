# Research Papers: LLM post-training

Updated: 2026-01-02 17:22
Total: 263 papers

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

## 7. RiskPO: Risk-based Policy Optimization with Verifiable Reward for LLM Post-Training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning with verifiable reward has recently emerged as a central paradigm for post-training large language models (LLMs); however, prevailing mean-based methods, such as Group Relative Policy Optimization (GRPO), suffer from entropy collapse and limited reasoning gains. We argue that these issues stem from overemphasizing high-probability output sequences while neglecting rare but i...

---

## 8. SVD-LLM: Truncation-aware Singular Value Decomposition for Large Language Model Compression

**Authors:** Xin Wang, Yu Zheng, Zhongwei Wan, Mi Zhang

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=LNYIUouhdt) | > The advancements in Large Language Models (LLMs) have been hindered by
their substantial sizes, which necessitates LLM compression methods for practical
deployment. Singular Value Decomposition (SVD) offers a promising solution for
LLM compression. However, state-of-the-art SVD-based LLM compression meth-
ods have two key limitations: truncating smaller singular values may lead to higher
compressi...

---

## 9. On the Impact of Calibration Data in Post-training Quantization and Pruning

**Authors:** Miles Williams, Nikolaos Aletras

**Year:** 2024 | **Venue:** ACL 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.acl-long.544.pdf) | > Quantization and pruning form the foundation of compression for neural networks, enabling efficient inference for large language models (LLMs). Recently, various quantization and pruning techniques have demonstrated remarkable performance in a post-training setting. They rely upon calibration data, a small set of unlabeled examples that are used to generate layer activations. However, no prior wor...

---

## 10. Achieving binary weight and activation for LLMs using Post-Training Quantization

**Authors:** Siqing Song, Chuang Wang, Rui-Qi Wang, Yi Yang, Xu-Yao Zhang

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.findings-acl.459.pdf) | > Quantizing large language models (LLMs) to 1-bit precision significantly reduces computational costs, but existing quantization techniques suffer from noticeable performance degradation when using weight and activation precisions below 4 bits (W4A4). In this paper, we propose a post-training quantization framework with W(1+1)A(1×4) configuration, where weights are quantized to 1 bit with an additi...

---

## 11. LRQ: Optimizing Post-Training Quantization for Large Language Models by Learning Low-Rank Weight-Scaling Matrices

**Authors:** Jung Hyun Lee, Jeonghoon Kim, June Yong Yang, Se Jung Kwon, Eunho Yang

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> With the commercialization of large language models (LLMs), weight-activation quantization has emerged to compress and accelerate LLMs, achieving high throughput while reducing inference costs. However, existing post-training quantization (PTQ) techniques for quantizing both weights and activations of LLMs still suffer from non-negligible performance drops, especially on massive multitask language...

---

## 12. Improve LLM Pre-training with RL-Guided Annealing

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Training large language models (LLMs) typically proceeds in two distinct stages: pre-training and post-training. However, the question of how to exploit these stages synergistically—particularly how post-trained models can inform and improve pre-training—remains underexplored.

We begin by analyzing training dynamics and identify the annealing (mid-training) phase as a critical turning point for t...

---

## 13. OPTIMA: Optimal One-shot Pruning for LLMs via Quadratic Programming Reconstruction

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training model pruning is a promising solution, yet it faces a trade-off: simple heuristics that zero weights are fast but degrade accuracy, while principled joint optimization methods recover accuracy but are computationally infeasible at modern scale. One-shot methods such as SparseGPT offer a practical trade-off in optimality by applying efficient, approximate heuristic weight updates. To ...

---

## 14. Bridging the Preference Gap: Post-Training Input Rewriting with Large Language Models

**Authors:** ShengKun Tu, Shisong Chen, Zhixu Li, Yanghua Xiao, Liangyue Li

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Pre-trained language models, such as BERT and RoBERTa, have achieved remarkable performance in semantic classification tasks. Yet, their effectiveness varies with different textual expressions due to inherent preferences developed during training. To address this limitation, we propose a framework that leverages large language models (LLMs) to rewrite input texts in ways that better align with a t...

---

## 15. Finding and Reactivating Post-Trained LLMs' Hidden Safety Mechanisms

**Authors:** Mingjie Li, Wai Man Si, Michael Backes, Yang Zhang, Yisen Wang

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Despite the impressive performance of general-purpose large language models (LLMs), they often require fine-tuning or post-training to excel at specific tasks. 
    For instance, large reasoning models (LRMs), such as the DeepSeek-R1 series, demonstrate strong reasoning capabilities after post-training different general large language models on diverse chain-of-thought (CoT) datasets. 
    However...

---

## 16. BCQ: Block Clustered Quantization for 4-bit (W4A4) LLM inference

**Authors:** Reena Elangovan, Charbel Sakr, Anand Raghunathan, Brucek Khailany

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Post-training quantization (PTQ) is a promising approach to reducing the storage and computational requirements of large language models (LLMs) without additional training cost. Recent PTQ studies have primarily focused on quantizing only weights to sub-8-bits while maintaining activations at 8-bits or higher. Accurate sub-8-bit quantization for both weights and activations without relying on quan...

---

## 17. WildChat-50M: A Deep Dive Into the Role of Synthetic Data in Post-Training

**Authors:** Benjamin Feuer, Chinmay Hegde

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=fzmtDDOcJ3) | > Language model (LLM) post-training can refine behaviors and unlock new skills, but the open science supporting these post-training techniques is still in its infancy. One limiting factor has been the difficulty of conducting large-scale comparative analyses of synthetic data generating models and LLM judges. To close this gap, we introduce WildChat-50M, the largest public chat dataset to date. We ...

---

## 18. Expert-Integrated Active Learning for Optimizing LLM Agents

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Recent advances in Large Language Models (LLMs) have created new opportunities for their application in interactive environments. However, these agentic tasks present significant challenges due to the complexity of long and specialized interaction trajectories that are underrepresented in standard training distributions. While Reinforcement Learning (RL) post-training offers a promising approach t...

---

## 19. Learning Grouped Lattice Vector Quantizers for Low-Bit LLM Compression

**Authors:** Xi Zhang, Xiaolin Wu, Jiamang Wang, Weisi Lin

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) have demonstrated remarkable capabilities but typically require extensive computational resources and memory for inference. Post-training quantization (PTQ) can effectively reduce these demands by storing weights in lower bit-width formats. However, standard uniform quantization often leads to notable performance degradation, particularly in low-bit scenarios. In this ...

---

## 20. Adaptive Layer-Wise Transformations for Post-Training Quantization of Large Language Models

**Authors:** Cuong Pham, Dung Anh Hoang, Cuong C. Nguyen, Trung Le, Gustavo Carneiro

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models require significant computational resources for deployment, making quantization essential for practical applications. However, the main obstacle to effective quantization lies in systematic outliers in activations and weights, which cause substantial LLM performance degradation, especially at low-bit settings. While existing transformation-based methods like affine and rotati...

---

## 21. Strategic Generalization Without Interaction: Can Post-Training Alone Induce Multi-Agent Behavior?

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Directly training Large Language Models (LLMs) for Multi-Agent Systems (MAS) remains challenging due to intricate reward modeling, dynamic agent interactions, and demanding generalization requirements.
This paper explores whether post-training techniques can effectively generalize to multi-agent scenarios $\textit{without any interactive multi-agent data}$.
We use economic reasoning as a testbed, ...

---

## 22. LRQuant: Learnable and Robust Post-Training Quantization for Large Language Models

**Authors:** Jiaqi Zhao, Miao Zhang, Chao Zeng, Ming Wang, Xuebo Liu

**Year:** 2024 | **Venue:** ACL 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.acl-long.122.pdf) | > Post-training quantization (PTQ) for large language models (LLMs) significantly accelerates model inference and relieves memory constraints, without incurring model training. A “smoothing paradigm” is commonly used in LLM quantization, which transfers the quantization difficulty of activation to weight quantization using mathematically equivalent transformations. However, existing methods face two...

---

## 23. Style Outweighs Substance: Failure Modes of LLM Judges in Alignment Benchmarking

**Authors:** Benjamin Feuer, Micah Goldblum, Teresa Datta, Sanjana Nambiar, Raz Besaleli

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=MzHNftnAM1) | > The release of ChatGPT in November 2022 sparked an explosion of interest in post-training and an avalanche of new preference optimization (PO) methods. These methods claim superior alignment by virtue of better correspondence with human pairwise preferences, often measured by LLM-judges. In this work, we attempt to answer the following question -- do LLM-judge preferences translate to progress on ...

---

## 24. Can LLMs Serve as Causal Inference Agents? A Study on Post-Training Methods

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Despite the potential of Large Language Models (LLMs) to democratize causal inference, they currently struggle with quantitative reasoning. This paper investigates whether post-training can transform an LLM into a practical and accessible causal inference agent for non-professionals. To facilitate this, we first introduce the DeepCausal dataset, a novel collection of seven computational causal inf...

---

## 25. Pruning Foundation Models for High Accuracy without Retraining

**Authors:** Pu Zhao, Fei Sun, Xuan Shen, Pinrui Yu, Zhenglun Kong

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.findings-emnlp.566.pdf) | > Despite the superior performance, it is challenging to deploy large language models (LLMs) due to their massive parameters and computations. While pruning is a promising technique to reduce model size and accelerate the inference, the traditional pruning techniques can hardly be applied for LLMs as they need to finetune the model on the full dataset with multiple epochs consuming massive data and ...

---

## 26. Spinning Straw into Gold: Relabeling LLM Agent Trajectories in Hindsight for Successful Demonstrations

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language model agents operate in partially observable, long-horizon settings where obtaining supervision remains a major bottleneck. We address this by leveraging a source of supervision overlooked in existing post-training methods: ``unintended yet successful'' goals embedded within agent rollouts. We introduce Hindsight Supervised Learning (HSL), where an auxiliary LLM reviews each complet...

---

## 27. GVPO: Group Variance Policy Optimization for Large Language Model Post-Training

**Authors:** Kaichen Zhang, Yuzhong Hong, Junwei Bao, Hongfei Jiang, yang song

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Post-training plays a crucial role in refining and aligning large language models to meet specific tasks and human preferences. While recent advancements in post-training techniques, such as Group Relative Policy Optimization (GRPO), leverage increased sampling with relative reward scoring to achieve superior performance, these methods often suffer from training instability that limits their pract...

---

## 28. Cuckoo: An IE Free Rider Hatched by Massive Nutrition in LLM’s Nest

**Authors:** Letian Peng, Zilong Wang, Feng Yao, Jingbo Shang

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.66.pdf) | > Massive high-quality data, both pre-training raw texts and post-training annotations, have been carefully prepared to incubate advanced large language models (LLMs). In contrast, for information extraction (IE), pre-training data, such as BIO-tagged sequences, are hard to scale up. We show that IE models can act as free riders on LLM resources by reframing next-token prediction into extraction for...

---

## 29. EfficientLLM: Unified Pruning-Aware Pretraining for Auto-Designed Edge Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Modern large language models (LLMs) driven by scaling laws achieve emergent intelligence in large model sizes. Recently, the increasing concerns about cloud costs, latency and privacy make it an urgent requirement to develop compact edge language models. Distinguished from direct pretraining that bounded by the scaling law, this work proposes the unified pruning-aware pretraining, focusing on reta...

---

## 30. Expanding the Web, Smaller Is Better: A Comprehensive Study in Post-training

**Authors:** Zixuan Ke, Yifei Ming, Xuan-Phi Nguyen, Caiming Xiong, Shafiq Joty

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> General-purpose large language models (GLLMs) like GPT-4 and LLaMA have demonstrated exceptional performance across a wide range of tasks. However, their performance often falls short in domain- or task-specific applications, where deeper, specialized knowledge is essential, while maintaining general knowledge remains crucial for handling broader, unseen tasks. Post-training has been widely applie...

---

## 31. SINQ: Sinkhorn-Normalized Quantization for Calibration-Free Low-Precision LLM Weights

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Post-training quantization has emerged as the most widely used strategy for deploying large language models at low precision. Still, current methods show perplexity degradation at bit-widths $\leq 4$, partly because representing outliers causes precision issues in parameters that share the same scales as these outliers. This problem is especially pronounced for calibration-free, uniform quantizati...

---

## 32. Preserving LLM Capabilities through Calibration Data Curation: From Analysis to Optimization

**Authors:** Bowei He, Lihao Yin, Huiling Zhen, Shuqi LIU, Han Wu

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Post-training compression has been a widely employed approach to scale down large language model (LLM) and facilitate efficient inference. In various proposed compression methods, including pruning and quantization, calibration data plays a vital role by informing the weight importance and activation dynamic ranges. However, how calibration data impacts the LLM capability after compression is less...

---

## 33. S$^{2}$FT: Efficient, Scalable and Generalizable LLM Fine-tuning by Structured Sparsity

**Authors:** Xinyu Yang, Jixuan Leng, Geyang Guo, Jiawei Zhao, Ryumei Nakada

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=lEUle8S4xQ) | > Current PEFT methods for LLMs can achieve high quality, efficient training, or scalable serving, but not all three simultaneously.  
To address this limitation, we investigate sparse fine-tuning and observe a remarkable improvement in generalization ability. 
Utilizing this key insight, we propose a family of Structured Sparse Fine-Tuning (S${^2}$FT) methods for LLMs, which concurrently achieve st...

---

## 34. What Is The Political Content in LLMs' Pre- and Post-Training Data?

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) are known to generate politically biased text, yet how such biases arise remains unclear. A crucial step toward answering this question is the analysis of training data, whose political content remains largely underexplored in current LLM research. To address this gap, we present in this paper an analysis of the pre- and post-training corpora of \textsc{OLMO2}, the lar...

---

## 35. CrossQuant: A Post-Training Quantization Method with Smaller Quantization Kernel for Precise Large Lanugage Model Compression

**Authors:** Wenyuan Liu, Xindian Ma, Peng Zhang, Yan Wang

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Post-Training Quantization (PTQ) is an effective technique for compressing Large Language Models (LLMs). While many studies focus on quantizing both weights and activations, it is still a challenge to maintain the accuracy of LLM after activating quantization. To investigate the primary cause, we extend the concept of kernel from linear algebra to quantization functions to define a new term, "quan...

---

## 36. Trajectory Bellman Residual Minimization: A Simple Value-Based Method for LLM Reasoning

**Authors:** Yurun Yuan, Fan Chen, Zeyu Jia, Alexander Rakhlin, Tengyang Xie

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Policy-based methods currently dominate reinforcement learning (RL) pipelines for large language model (LLM) reasoning, leaving value-based approaches largely unexplored. We revisit the classical paradigm of Bellman Residual Minimization and introduce Trajectory Bellman Residual Minimization (TBRM), an algorithm that naturally adapts this idea to LLMs, yielding a simple yet effective off-policy al...

---

## 37. Chasing the Tail: Effective Rubric-based Reward Modeling for Large Language Model Post-Training

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Reinforcement fine-tuning (RFT) often suffers from reward over-optimization, where a policy model hacks the reward signals to achieve high scores while producing low-quality outputs. Our theoretical analysis shows that the key lies in reward misspecification at the high-reward tail: the inability to reliably distinguish excellent responses from merely great ones. This motivate us to focus on the h...

---

## 38. HyperDPO: Hypernetwork-based Multi-Objective Fine-Tuning Framework

**Authors:** Yinuo Ren, Tesi Xiao, Michael Shavlovsky, Lexing Ying, Holakou Rahmanian

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> In LLM alignment and many other ML applications, one often faces the *Multi-Objective Fine-Tuning (MOFT)* problem, *i.e.* fine-tuning an existing model with datasets labeled w.r.t. different objectives simultaneously. To address the challenge, we propose the *HyperDPO* framework, a conditioned one-shot fine-tuning approach that extends the Direct Preference Optimization (DPO) technique, originally...

---

## 39. Sample-efficient LLM Optimization with Reset Replay

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Recent advancements in post-training Large Language Models (LLMs), particularly through Reinforcement Learning (RL) and preference optimization methods, are key drivers for enhancing their reasoning capabilities. 
However, these methods are often plagued by low sample efficiency and a susceptibility to primacy bias, where overfitting to initial experiences degrades policy quality and damages the l...

---

## 40. LiNeS: Post-training Layer Scaling Prevents Forgetting and Enhances Model Merging

**Authors:** Ke Wang, Nikolaos Dimitriadis, Alessandro Favero, Guillermo Ortiz-Jimenez, François Fleuret

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=J5sUOvlLbQ) | > Fine-tuning pre-trained models has become the standard approach to endow them with specialized knowledge, but it poses fundamental challenges. In particular, (i) fine-tuning often leads to catastrophic forgetting, where improvements on a target domain degrade generalization on other tasks, and (ii) merging fine-tuned checkpoints from disparate tasks can lead to significant performance loss. To add...

---

## 41. BLoB: Bayesian Low-Rank Adaptation by Backpropagation for Large Language Models

**Authors:** Yibin Wang, Haizhou Shi, Ligong Han, Dimitris N. Metaxas, Hao Wang

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=MaDykgj4Ru) | > Large Language Models (LLMs) often suffer from overconfidence during inference, particularly when adapted to downstream domain-specific tasks with limited data. Previous work addresses this issue by employing approximate Bayesian estimation after the LLMs are trained, enabling them to quantify uncertainty. However, such post-training approaches' performance is severely limited by the parameters le...

---

## 42. RoSTE: An Efficient Quantization-Aware Supervised Fine-Tuning Approach for Large Language Models

**Authors:** Quan Wei, Chung-Yiu Yau, Hoi To Wai, Yang Zhao, Dongyeop Kang

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=h30EzoI3s0) | > Supervised fine-tuning is a standard method for adapting pre-trained large language models (LLMs) to downstream tasks. Quantization has been recently studied as a post-training technique for efficient LLM deployment. To obtain quantized fine-tuned LLMs, conventional pipelines would first fine-tune the pre-trained models, followed by post-training quantization. This often yields suboptimal performa...

---

## 43. Surprising Effectiveness of pretraining Ternary Language Model at Scale

**Authors:** Ayush Kaushal, Tejas Vaidhya, Arnab Kumar Mondal, Tejas Pandey, Aaryan Bhagat

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=TJo6aQb7mK) | > Rapid advancements in GPU computational power has outpaced memory capacity and bandwidth growth, creating bottlenecks in Large Language Model (LLM) inference. Post-training quantization is the leading method for addressing memory-related bottlenecks in LLM inference, but it suffers from significant performance degradation below 4-bit precision. This paper addresses these challenges by investigatin...

---

## 44. UniPTS: A Unified Framework for Proficient Post-Training Sparsity

**Authors:** JingJing Xie, Yuxin Zhang, Mingbao Lin, ZhiHang Lin, Liujuan Cao

**Year:** 2024 | **Venue:** CVPR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2024/papers/Xie_UniPTS_A_Unified_Framework_for_Proficient_Post-Training_Sparsity_CVPR_2024_paper.pdf) | > ...

---

## 45. SPA: Enhancing 3D Multimodal LLMs with Mask-based Streamlining Preference Alignment

**Authors:** Weiyang Jin, Baihan Yang, Huan-ang Gao, Jingwei Zhao, Kangliang Chen

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Integrating 3D features into Large Language Models (LLMs) is a rapidly evolving field, with models like 3D-LLM, Point-Bind LLM, and PointLLM making notable strides. PointLLM, pre-trained and fine-tuned on the Objaverse dataset, enhances understanding by optimizing the projector, boosting resource efficiency and consistency. However, we observed a persistent bottleneck: increasing the LLM backbone ...

---

## 46. Plug-and-Play: An Efficient Post-training Pruning Method for Large Language Models

**Authors:** Yingtao Zhang, Haoli Bai, Haokun Lin, Jialin Zhao, Lu Hou

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=Tr0lPx9woF) | > With the rapid growth of large language models (LLMs), there is increasing demand for memory and computation in LLMs. Recent efforts on post-training pruning of LLMs aim to reduce the model size and computation requirements, yet the performance is still sub-optimal. 
In this paper, we present a plug-and-play solution for post-training pruning of LLMs.
The proposed solution has two innovative compo...

---

## 47. Quadratic Coreset Selection: Certifying and Reconciling Sequence and Token Mining for Efficient Instruction Tuning

**Authors:** Ziliang Chen, Yongsen Zheng, Zhao-Rong Lai, Zhanfu Yang, Cuixi Li

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Instruction-Tuning (IT) was recently found the impressive data efficiency in post-training large language models (LLMs). While the pursuit of efficiency predominantly focuses on sequence-level curation, often overlooking the nuanced impact of critical tokens and the inherent risks of token noise and biases. Drawing inspiration from bi-level coreset selection, our work provides the principled view ...

---

## 48. Satori: Reinforcement Learning with Chain-of-Action-Thought Enhances LLM Reasoning via Autoregressive Search

**Authors:** Maohao Shen, Guangtao Zeng, Zhenting Qi, Zhang-Wei Hong, Zhenfang Chen

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=j4FXxMiDjL) | > Large language models (LLMs) have demonstrated remarkable reasoning capabilities across diverse domains. Recent studies have shown that increasing test-time computation enhances LLMs' reasoning capabilities. This typically involves extensive sampling at inference time guided by an external LLM verifier, resulting in a two-player system. Despite external guidance, the effectiveness of this system d...

---

## 49. QuIP$\#$: Even Better LLM Quantization with Hadamard Incoherence and Lattice Codebooks

**Authors:** Albert Tseng, Jerry Chee, Qingyao Sun, Volodymyr Kuleshov, Christopher De Sa

**Year:** 2024 | **Venue:** ICML 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=9BrydUVcoe) | > Post-training quantization (PTQ) reduces the memory footprint of LLMs by quantizing their weights to low-precision. In this work, we introduce QuIP#, a weight-only PTQ method that achieves state-of-the-art results in extreme compression regimes ($\le$ 4 bits per weight) using three novel techniques. First, QuIP# improves QuIP's (Chee et al., 2023) incoherence processing by using the randomized Had...

---

## 50. NoisyQuant: Noisy Bias-Enhanced Post-Training Activation Quantization for Vision Transformers

**Authors:** Yijiang Liu, Huanrui Yang, Zhen Dong, Kurt Keutzer, Li Du

**Year:** 2023 | **Venue:** CVPR 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2023/papers/Liu_NoisyQuant_Noisy_Bias-Enhanced_Post-Training_Activation_Quantization_for_Vision_Transformers_CVPR_2023_paper.pdf) | > The complicated architecture and high training cost of vision transformers urge the exploration of post-training quantization. However, the heavy-tailed distribution of vision transformer activations hinders the effectiveness of previous post-training quantization methods, even with advanced quantizer designs. Instead of tuning the quantizer to better fit the complicated activation distribution, t...

---

## 51. Can Compressed LLMs Truly Act? An Empirical Evaluation of Agentic Capabilities in LLM Compression

**Authors:** Peijie Dong, Zhenheng Tang, Xiang Liu, Lujun Li, Xiaowen Chu

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=rkwXYSDKso) | > Post-training compression reduces the computational and memory costs of large language models (LLMs), enabling resource-efficient deployment. However, existing compression benchmarks focus narrowly on language modeling (e.g., perplexity) and natural language understanding tasks (e.g., GLUE accuracy), ignoring the agentic capabilities—workflow, tool use/function call, long-context understanding and...

---

## 52. Q-Palette: Fractional-Bit Quantizers Toward Optimal Bit Allocation for Efficient LLM Deployment

**Authors:** Deokjae Lee, Hyun Oh Song

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> We study weight-only post-training quantization (PTQ), which quantizes the weights of a large language model (LLM) without retraining, using little or no calibration data. Weight-only PTQ is crucial for reducing the memory footprint and latency of LLM inference, especially in memory-bound, small-batch inference scenarios, such as personalized inference on edge devices. Despite its importance, irre...

---

## 53. Merge-Friendly Post-Training Quantization for Multi-Target Domain Adaptation

**Authors:** Juncheol Shin, Minsang Seok, Seonggon Kim, Eunhyeok Park

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=aCBd1FeE5Z) | > Model merging has emerged as a powerful technique for combining task-specific weights, achieving superior performance in multi-target domain adaptation. However, when applied to practical scenarios, such as quantized models, new challenges arise. In practical scenarios, quantization is often applied to target-specific data, but this process restricts the domain of interest and introduces discretiz...

---

## 54. Eliciting Reasoning in Language Models with Cognitive Tools

**Authors:** Brown Ebouky, Andrea Bartezzaghi, Mattia Rigotti

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> The recent advent of reasoning models like OpenAI's o1 was met with excited speculation by the AI community about the mechanisms underlying these capabilities in closed models, followed by a rush of replication efforts, particularly from the open source community.
These speculations were largely settled by the demonstration from DeepSeek-R1 that chain-of-thought and reinforcement learning (RL) can...

---

## 55. Compressing Large Language Models using Low Rank and Low Precision Decomposition

**Authors:** Rajarshi Saha, Naomi Sagan, Varun Srivastava, Andrea Goldsmith, Mert Pilanci

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=lkx3OpcqSZ) | > The prohibitive sizes of Large Language Models (LLMs) today make it difficult to deploy them on memory-constrained edge devices. This work introduces $\rm CALDERA$ -- a new post-training LLM compression algorithm that harnesses the inherent low-rank structure of a weight matrix $\mathbf{W}$ by approximating it via a low-rank, low-precision decomposition as $\mathbf{W} \approx \mathbf{Q} + \mathbf{...

---

## 56. Pixel-Space Post-Training of Latent-Diffusion Models

**Authors:** Christina Zhang, Simran Motwani, Matthew Yu, Ji Hou, Felix Juefei-Xu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Latent diffusion models (LDMs) have made significant advancements in the field of image generation in recent years. One major advantage of LDMs is their ability to operate in a compressed latent space, allowing for more efficient training and deployment. However, despite these advantages, challenges with LDMs still remain. For example, it has been observed that LDMs often generate high-frequency d...

---

## 57. MagR: Weight Magnitude Reduction for Enhancing Post-Training Quantization

**Authors:** Aozhong Zhang, Naigang Wang, Yanxia Deng, Xin Li, Zi Yang

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=UARTFgkTqW) | > In this paper, we present a simple optimization-based preprocessing technique called Weight Magnitude Reduction (MagR) to improve the performance of post-training quantization. For each linear layer, we adjust the pre-trained floating-point weights by solving an $\ell_\infty$-regularized optimization problem. This process greatly diminishes the maximum magnitude of the weights and smooths out outl...

---

## 58. Hardware-Friendly Post-Training Quantization: Input- and Output-Channelwise Scale and Offset

**Authors:** Geunjae Choi, Kamin Lee, KiYoon Yoo, Nojun Kwak

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Post-training quantization enables swift quantization of neural networks using a minimal calibration dataset.
Specifically, these methods tend to underperform dramatically on hardware with fixed integer bit width, particularly in extremely low-bit quantization scenarios.
In response, we introduce an optimized method for uniform channel-wise quantization, which is compatible with existing hardware....

---

## 59. SPARQ: Outlier-free SpeechLM with Fast Adaptation and Robust Quantization

**Authors:** Shang Wu, Yen-Ju Lu, Haozheng Luo, Maojiang Su, Jerry Yao-Chieh Hu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> We propose SpARQ (outlier-free SpeechLM for Fast Adaptation and Robust Quantization) to address the outlier problem in Speech and Language multi-modal Models (SpeechLMs). Our primary observation is that outliers stemming from cross-modal (speech and text) low-rank adaptation and post-training quantization stages affect the performance of the current SpeechLMs. Methodologically, SpARQ leverages a p...

---

## 60. Q-VLM: Post-training Quantization for Large Vision-Language Models

**Authors:** Changyuan Wang, Ziwei Wang, Xiuwei Xu, Yansong Tang, Jie Zhou

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=gxMfNArldP) | > In this paper, we propose a post-training quantization framework of large vision-language models (LVLMs) for efficient multi-modal inference. Conventional quantization methods sequentially search the layer-wise rounding functions by minimizing activation discretization errors, which fails to acquire optimal quantization strategy without considering cross-layer dependency. On the contrary, we mine ...

---

## 61. Steering Information Utility in Key-Value Memory for Language Model Post-Training

**Authors:** Chunyuan Deng, Ruidi Chang, Hanjie Chen

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Recent advancements in language models (LMs) have marked a shift toward the growing importance of post-training. Yet, post-training approaches such as supervised fine-tuning (SFT) do not guarantee the effective use of knowledge acquired during pretraining. We therefore introduce infosteer, a lightweight method that encourages parametric information utilization in LMs during post-training. Specific...

---

## 62. Contrastive Post-training Large Language Models on Data Curriculum

**Authors:** Canwen Xu, Corby Rosset, Luciano Del Corro, Shweti Mahajan, Julian McAuley

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Alignment serves as an important step to steer large language models (LLMs) towards human preferences. In this paper, we explore contrastive post-training techniques for alignment by automatically constructing preference pairs from multiple models of varying strengths (e.g., InstructGPT, ChatGPT and GPT-4). We carefully compare the contrastive techniques of SLiC and DPO to SFT baselines and find t...

---

## 63. Towards a Theoretical Understanding of Synthetic Data in LLM Post-Training: A Reverse-Bottleneck Perspective

**Authors:** Zeyu Gan, Yong Liu

**Year:** 2024 | **Venue:** International Conference on Learning Representations | **Citations:** 13 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2410.01720)

> Synthetic data has become a pivotal resource in post-training tasks for large language models (LLMs) due to the scarcity of high-quality, specific data. While various methods have been developed to generate synthetic data, there remains a discernible gap between the practical effects of synthetic data and our theoretical comprehension. To address this challenge, we commence by presenting a detaile...

---

## 64. LLM Post-Training: A Deep Dive into Reasoning Large Language Models

**Authors:** Komal Kumar, Tajamul Ashraf, Omkar Thawakar, R. Anwer, Hisham Cholakkal

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 65 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2502.21321)

> Large Language Models (LLMs) have transformed the natural language processing landscape and brought to life diverse applications. Pretraining on vast web-scale data has laid the foundation for these models, yet the research community is now increasingly shifting focus toward post-training techniques to achieve further breakthroughs. While pretraining provides a broad linguistic foundation, post-tr...

---

## 65. TesseraQ: Ultra Low-Bit LLM Post-Training Quantization with Block Reconstruction

**Authors:** Yuhang Li, P. Panda

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2410.19103)

> Large language models (LLMs) have revolutionized natural language processing, albeit at the cost of immense memory and computation requirements. Post-training quantization (PTQ) is becoming the de facto method to reduce the memory footprint and improve the inference throughput of LLMs. In this work, we aim to push the upper limit of LLM PTQ by optimizing the weight rounding parameters with the blo...

---

## 66. DUMP: Automated Distribution-Level Curriculum Learning for RL-based LLM Post-training

**Authors:** Zhenting Wang, Guofeng Cui, Kun Wan, Wentian Zhao

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 15 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2504.09710)

> Recent advances in reinforcement learning (RL)-based post-training have led to notable improvements in large language models (LLMs), particularly in enhancing their reasoning capabilities to handle complex tasks. However, most existing methods treat the training data as a unified whole, overlooking the fact that modern LLM training often involves a mixture of data from diverse distributions-varyin...

---

## 67. Trajectory Balance with Asynchrony: Decoupling Exploration and Learning for Fast, Scalable LLM Post-Training

**Authors:** Brian R. Bartoldson, S. Venkatraman, James Diffenderfer, Moksh Jain, Tal Ben-Nun

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 11 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2503.18929)

> Reinforcement learning (RL) is a critical component of large language model (LLM) post-training. However, on-policy algorithms used for post-training are not naturally robust to a diversified content of experience replay buffers, which asynchronous off-policy actors can efficiently populate in parallel to training. We propose efficiently learning on such off-policy data via Trajectory Balance with...

---

## 68. DataSculpt: Crafting Data Landscapes for LLM Post-Training through Multi-objective Partitioning

**Authors:** Keer Lu, Zheng Liang, Xiaonan Nie, Da Pan, Shusen Zhang

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2409.00997)

> ...

---

## 69. AsyncFlow: An Asynchronous Streaming RL Framework for Efficient LLM Post-Training

**Authors:** Zhenyu Han, Ansheng You, Haibo Wang, Kui Luo, Guang Yang

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 12 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2507.01663)

> Reinforcement learning (RL) has become a pivotal technology in the post-training phase of large language models (LLMs). Traditional task-colocated RL frameworks suffer from significant scalability bottlenecks, while task-separated RL frameworks face challenges in complex dataflows and the corresponding resource idling and workload imbalance. Moreover, most existing frameworks are tightly coupled w...

---

## 70. Q♯: Provably Optimal Distributional RL for LLM Post-Training

**Authors:** Jin Peng Zhou, Kaiwen Wang, Jonathan D. Chang, Zhaolin Gao, Nathan Kallus

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 10 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2502.20548)

> Reinforcement learning (RL) post-training is crucial for LLM alignment and reasoning, but existing policy-based methods, such as PPO and DPO, can fall short of fixing shortcuts inherited from pre-training. In this work, we introduce $Q\sharp$, a value-based algorithm for KL-regularized RL that guides the reference policy using the optimal regularized $Q$ function. We propose to learn the optimal $...

---

## 71. DistFlow: A Fully Distributed RL Framework for Scalable and Efficient LLM Post-Training

**Authors:** Zhixin Wang, Tianyi Zhou, Liming Liu, Ao Li, Jiarui Hu

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 6 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2507.13833)

> Reinforcement learning (RL) has become the pivotal post-training technique for large language model (LLM). Effectively scaling reinforcement learning is now the key to unlocking advanced reasoning capabilities and ensuring safe, goal-aligned behavior in the most powerful LLMs. Mainstream frameworks usually employ a hybrid-controller architecture where a single-controller dispatches the overall exe...

---

## 72. Prompt Curriculum Learning for Efficient LLM Post-Training

**Authors:** Zhaolin Gao, Joongwon Kim, Wen Sun, Thorsten Joachims, Sid Wang

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 4 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2510.01135)

> We introduce Prompt Curriculum Learning (PCL), a lightweight reinforcement learning (RL) algorithm that selects intermediate-difficulty prompts using a learned value model to post-train language models. Since post-training LLMs via RL remains sensitive to batching and prompt selection strategies, we first conduct a series of systematic experiments where we (1) determine the optimal training batch ...

---

## 73. PITA: Preference-Guided Inference-Time Alignment for LLM Post-Training

**Authors:** Sarat Chandra Bobbili, Ujwal Dinesha, D. Narasimha, Srinivas Shakkottai

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2507.20067)

> Inference-time alignment enables large language models (LLMs) to generate outputs aligned with end-user preferences without further training. Recent post-training methods achieve this by using small guidance models to modify token generation during inference. These methods typically optimize a reward function KL-regularized by the original LLM taken as the reference policy. A critical limitation, ...

---

## 74. Value Drifts: Tracing Value Alignment During LLM Post-Training

**Authors:** Mehar Bhatia, Shravan Nayak, Gaurav Kamath, Marius Mosbach, Karolina Sta'nczak

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2510.26707)

> As LLMs occupy an increasingly important role in society, they are more and more confronted with questions that require them not only to draw on their general knowledge but also to align with certain human value systems. Therefore, studying the alignment of LLMs with human values has become a crucial field of inquiry. Prior work, however, mostly focuses on evaluating the alignment of fully trained...

---

## 75. Tuning without Peeking: Provable Privacy and Generalization Bounds for LLM Post-Training

**Authors:** Ismail Labiad, Mathurin Videau, M. Kowalski, Marc Schoenauer, A. Leite

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2507.01752)

> Gradient-based optimization is the workhorse of deep learning, offering efficient and scalable training via backpropagation. However, exposing gradients during training can leak sensitive information about the underlying data, raising privacy and security concerns such as susceptibility to data poisoning attacks. In contrast, black box optimization methods, which treat the model as an opaque funct...

---

## 76. DVPO: Distributional Value Modeling-based Policy Optimization for LLM Post-Training

**Authors:** Dingwei Zhu, Zhiheng Xi, Shihan Dou, Yuhui Wang, Sixian Li

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> Reinforcement learning (RL) has shown strong performance in LLM post-training, but real-world deployment often involves noisy or incomplete supervision. In such settings, complex and unreliable supervision signals can destabilize training and harm generalization. While existing approaches such as worst-case optimization (e.g., RFQI, CQL) and mean-based methods (e.g., PPO, GRPO) can improve stabili...

---

## 77. Fast LLM Post-training via Decoupled and Fastest-of-N Speculation

**Authors:** Rongxin Cheng, Kai Zhou, Xingda Wei, Siyuan Liu, Mingcong Han

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> Rollout dominates the training time in large language model (LLM) post-training, where the trained model is used to generate tokens given a batch of prompts. This work, SpecActor, achieves fast rollout with speculative decoding that deploys a fast draft path to accelerate the unparallelizable generation, while the correctness is guaranteed by fast parallel verification of the outputs with the orig...

---

## 78. PT$^2$-LLM: Post-Training Ternarization for Large Language Models

**Authors:** Xianglong Yan, Chengzhu Bao, Zhiteng Li, Tianao Zhang, Kaicheng Yang

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) have shown impressive capabilities across diverse tasks, but their large memory and compute demands hinder deployment. Ternarization has gained attention as a promising compression technique, delivering substantial size reduction and high computational efficiency. However, its potential in the post-training quantization (PTQ) setting remains underexplored, due to the c...

---

## 79. Rethinking Expert Trajectory Utilization in LLM Post-training

**Authors:** Bowen Ding, Yuhan Chen, Jiayang Lv, Jiyao Yuan, Qi Zhu

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> While effective post-training integrates Supervised Fine-Tuning (SFT) and Reinforcement Learning (RL), the optimal mechanism for utilizing expert trajectories remains unresolved. We propose the Plasticity-Ceiling Framework to theoretically ground this landscape, decomposing performance into foundational SFT performance and the subsequent RL plasticity. Through extensive benchmarking, we establish ...

---

## 80. Fixing It in Post: A Comparative Study of LLM Post-Training Data Quality and Model Performance

**Authors:** Aladin Djuhera, S. Kadhe, Syed Zawad, Farhan Ahmed, Heiko Ludwig

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2506.06522)

> Recent work on large language models (LLMs) has increasingly focused on post-training and alignment with datasets curated to enhance instruction following, world knowledge, and specialized skills. However, most post-training datasets used in leading open- and closed-source LLMs remain inaccessible to the public, with limited information about their construction process. This lack of transparency h...

---

## 81. RedOne: Revealing Domain-specific LLM Post-Training in Social Networking Services

**Authors:** Fei Zhao, Chonggang Lu, Yue Wang, Zheyong Xie, Ziyan Liu

**Year:** 2025 | **Venue:** Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing: Industry Track | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2507.10605)

> As a primary medium for modern information dissemination, social networking services (SNS) have experienced rapid growth, which has proposed significant challenges for platform content management and interaction quality improvement. Recently, the development of large language models (LLMs) has offered potential solutions but existing studies focus on isolated tasks, which not only encounter dimini...

---

## 82. BiLLM: Pushing the Limit of Post-Training Quantization for LLMs

**Authors:** Wei Huang, Yangdong Liu, Haotong Qin, Ying Li, Shiming Zhang

**Year:** 2024 | **Venue:** International Conference on Machine Learning | **Citations:** 126 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2402.04291)

> Pretrained large language models (LLMs) exhibit exceptional general language processing capabilities but come with significant demands on memory and computational resources. As a powerful compression technology, binarization can extremely reduce model weights to a mere 1 bit, lowering the expensive computation and memory requirements. However, existing quantization techniques fall short of maintai...

---

## 83. SmoothQuant: Accurate and Efficient Post-Training Quantization for Large Language Models

**Authors:** Guangxuan Xiao, Ji Lin, Mickael Seznec, Julien Demouth, Song Han

**Year:** 2022 | **Venue:** International Conference on Machine Learning | **Citations:** 1167 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2211.10438) | [DOI](https://doi.org/10.48550/arXiv.2211.10438)

> Large language models (LLMs) show excellent performance but are compute- and memory-intensive. Quantization can reduce memory and accelerate inference. However, existing methods cannot maintain accuracy and hardware efficiency at the same time. We propose SmoothQuant, a training-free, accuracy-preserving, and general-purpose post-training quantization (PTQ) solution to enable 8-bit weight, 8-bit a...

---

## 84. VPTQ: Extreme Low-bit Vector Post-Training Quantization for Large Language Models

**Authors:** Yifei Liu, Jicheng Wen, Yang Wang, Shengyu Ye, L. Zhang

**Year:** 2024 | **Venue:** Conference on Empirical Methods in Natural Language Processing | **Citations:** 23 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2409.17066)

> Scaling model size significantly challenges the deployment and inference of Large Language Models (LLMs). Due to the redundancy in LLM weights, recent research has focused on pushing weight-only quantization to extremely low-bit (even down to 2 bits). It reduces memory requirements, optimizes storage costs, and decreases memory bandwidth needs during inference. However, due to numerical representa...

---

## 85. SmoothQuant+: Accurate and Efficient 4-bit Post-Training WeightQuantization for LLM

**Authors:** Jiayi Pan, Chengcan Wang, Kaifu Zheng, Yangguang Li, Zhenyu Wang

**Year:** 2023 | **Venue:** arXiv.org | **Citations:** 7 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2312.03788)

> Large language models (LLMs) have shown remarkable capabilities in various tasks. However their huge model size and the consequent demand for computational and memory resources also pose challenges to model deployment. Currently, 4-bit post-training quantization (PTQ) has achieved some success in LLMs, reducing the memory footprint by approximately 75% compared to FP16 models, albeit with some acc...

---

## 86. ShiftAddLLM: Accelerating Pretrained LLMs via Post-Training Multiplication-Less Reparameterization

**Authors:** Haoran You, Yipin Guo, Yichao Fu, Wei Zhou, Huihong Shi

**Year:** 2024 | **Venue:** Neural Information Processing Systems | **Citations:** 25 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2406.05981)

> Large language models (LLMs) have shown impressive performance on language tasks but face challenges when deployed on resource-constrained devices due to their extensive parameters and reliance on dense multiplications, resulting in high memory demands and latency bottlenecks. Shift-and-add reparameterization offers a promising solution by replacing costly multiplications with hardware-friendly pr...

---

## 87. Vulcan: Instance-Optimal Systems Heuristics Through LLM-Driven Search

**Authors:** Rohit Dwivedula, Divyanshu Saxena, Sujay Yadalam, Daehyeok Kim, Aditya Akella

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25065v1) | > Resource-management tasks in modern operating and distributed systems continue to rely primarily on hand-designed heuristics for tasks such as scheduling, caching, or active queue management. Designing performant heuristics is an expensive, time-consuming process that we are forced to continuously go through due to the constant flux of hardware, workloads and environments.
  We propose a new alter...

---

## 88. Reliable and Resilient Collective Communication Library for LLM Training and Serving

**Authors:** Wei Wang, Nengneng Yu, Sixian Xiong, Zaoxing Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25059v1) | > Modern ML training and inference now span tens to tens of thousands of GPUs, where network faults can waste 10--15\% of GPU hours due to slow recovery. Common network errors and link fluctuations trigger timeouts that often terminate entire jobs, forcing expensive checkpoint rollback during training and request reprocessing during inference. We present R$^2$CCL, a fault-tolerant communication libr...

---

## 89. Context-aware LLM-based AI Agents for Human-centered Energy Management Systems in Smart Buildings

**Authors:** Tianzhi He, Farrokh Jazizadeh

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25055v1) | > This study presents a conceptual framework and a prototype assessment for Large Language Model (LLM)-based Building Energy Management System (BEMS) AI agents to facilitate context-aware energy management in smart buildings through natural language interaction. The proposed framework comprises three modules: perception (sensing), central control (brain), and action (actuation and user interaction),...

---

## 90. MAMA-Memeia! Multi-Aspect Multi-Agent Collaboration for Depressive Symptoms Identification in Memes

**Authors:** Siddhant Agarwal, Adya Dhuler, Polly Ruhnke, Melvin Speisman, Md Shad Akhtar

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25015v1) | > Over the past years, memes have evolved from being exclusively a medium of humorous exchanges to one that allows users to express a range of emotions freely and easily. With the ever-growing utilization of memes in expressing depressive sentiments, we conduct a study on identifying depressive symptoms exhibited by memes shared by users of online social media platforms. We introduce RESTOREx as a v...

---

## 91. Efficiently Estimating Data Efficiency for Language Model Fine-tuning

**Authors:** Gyung Hyun Je, Colin Raffel

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24991v1) | > While large language models (LLMs) demonstrate reasonable zero-shot capability across many downstream tasks, fine-tuning is a common practice to improve their performance. However, a task's data efficiency--i.e., the number of fine-tuning examples needed to achieve a desired level of performance--is often unknown, resulting in costly cycles of incremental annotation and retraining. Indeed, we demo...

---

## 92. PhysTalk: Language-driven Real-time Physics in 3D Gaussian Scenes

**Authors:** Luca Collorone, Mert Kiray, Indro Spinelli, Fabio Galasso, Benjamin Busam

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24986v1) | > Realistic visual simulations are omnipresent, yet their creation requires computing time, rendering, and expert animation knowledge. Open-vocabulary visual effects generation from text inputs emerges as a promising solution that can unlock immense creative potential. However, current pipelines lack both physical realism and effective language interfaces, requiring slow offline optimization. In con...

---

## 93. Large language models and the entropy of English

**Authors:** Colin Scheibner, Lindsay M. Smith, William Bialek

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24969v1) | > We use large language models (LLMs) to uncover long-ranged structure in English texts from a variety of sources. The conditional entropy or code length in many cases continues to decrease with context length at least to $N\sim 10^4$ characters, implying that there are direct dependencies or interactions across these distances. A corollary is that there are small but significant correlations betwee...

---

## 94. The Impact of LLMs on Online News Consumption and Production

**Authors:** Hangcheng Zhao, Ron Berman

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24968v1) | > Large language models (LLMs) change how consumers acquire information online; their bots also crawl news publishers' websites for training data and to answer consumer queries; and they provide tools that can lower the cost of content creation. These changes lead to predictions of adverse impact on news publishers in the form of lowered consumer demand, reduced demand for newsroom employees, and an...

---

## 95. CPJ: Explainable Agricultural Pest Diagnosis via Caption-Prompt-Judge with LLM-Judged Refinement

**Authors:** Wentao Zhang, Tao Fang, Lina Lu, Lifei Wang, Weihe Zhong

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24947v1) | > Accurate and interpretable crop disease diagnosis is essential for agricultural decision-making, yet existing methods often rely on costly supervised fine-tuning and perform poorly under domain shifts. We propose Caption--Prompt--Judge (CPJ), a training-free few-shot framework that enhances Agri-Pest VQA through structured, interpretable image captions. CPJ employs large vision-language models to ...

---

## 96. RAIR: A Rule-Aware Benchmark Uniting Challenging Long-Tail and Visual Salience Subset for E-commerce Relevance Assessment

**Authors:** Chenji Lu, Zhuo Chen, Hui Zhao, Zhenyi Wang, Pengjie Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24943v1) | > Search relevance plays a central role in web e-commerce. While large language models (LLMs) have shown significant results on relevance task, existing benchmarks lack sufficient complexity for comprehensive model assessment, resulting in an absence of standardized relevance evaluation metrics across the industry. To address this limitation, we propose Rule-Aware benchmark with Image for Relevance ...

---

## 97. Iterative Deployment Improves Planning Skills in LLMs

**Authors:** Augusto B. Corrêa, Yoav Gelberg, Luckeciano C. Melo, Ilia Shumailov, André G. Pereira

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24940v1) | > We show that iterative deployment of large language models (LLMs), each fine-tuned on data carefully curated by users from the previous models' deployment, can significantly change the properties of the resultant models. By testing this mechanism on various planning domains, we observe substantial improvements in planning skills, with later models displaying emergent generalization by discovering ...

---

## 98. Vibe Coding, Interface Flattening

**Authors:** Hongrui Jin

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24939v1) | > Large language models are reshaping programming by enabling 'vibe coding': the development of softwares through natural-language interaction with model-driven toolchains. This article argues that vibe coding is best understood as interface flattening, a reconfiguration in which previously distinct modalities (GUI, CLI, and API) appear to converge into a single conversational surface, even as the u...

---

## 99. Adaptive Dependency-aware Prompt Optimization Framework for Multi-Step LLM Pipeline

**Authors:** Minjun Zhao, Xinyu Zhang, Shuai Zhang, Deyang Li, Ruifeng Shi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24933v1) | > Multi-step LLM pipelines invoke large language models multiple times in a structured sequence and can effectively solve complex tasks, but their performance heavily depends on the prompts used at each step. Jointly optimizing these prompts is difficult due to missing step-level supervision and inter-step dependencies. Existing end-to-end prompt optimization methods struggle under these conditions ...

---

## 100. Semi-Supervised Diversity-Aware Domain Adaptation for 3D Object detection

**Authors:** Bartłomiej Olber, Jakub Winter, Paweł Wawrzyński, Andrii Gamalii, Daniel Górniak

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24922v1) | > 3D object detectors are fundamental components of perception systems in autonomous vehicles. While these detectors achieve remarkable performance on standard autonomous driving benchmarks, they often struggle to generalize across different domains - for instance, a model trained in the U.S. may perform poorly in regions like Asia or Europe. This paper presents a novel lidar domain adaptation metho...

---

## 101. Let It Flow: Agentic Crafting on Rock and Roll, Building the ROME Model within an Open Agentic Learning Ecosystem

**Authors:** Weixun Wang, XiaoXiao Xu, Wanhe An, Fangwen Dai, Wei Gao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24873v1) | > Agentic crafting requires LLMs to operate in real-world environments over multiple turns by taking actions, observing outcomes, and iteratively refining artifacts. Despite its importance, the open-source community lacks a principled, end-to-end ecosystem to streamline agent development. We introduce the Agentic Learning Ecosystem (ALE), a foundational infrastructure that optimizes the production p...

---

## 102. Encyclo-K: Evaluating LLMs with Dynamically Composed Knowledge Statements

**Authors:** Yiming Liang, Yizhi Li, Yantao Du, Ge Zhang, Jiayi Zhou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24867v1) | > Benchmarks play a crucial role in tracking the rapid advancement of large language models (LLMs) and identifying their capability boundaries. However, existing benchmarks predominantly curate questions at the question level, suffering from three fundamental limitations: vulnerability to data contamination, restriction to single-knowledge-point assessment, and reliance on costly domain expert annot...

---

## 103. Advances in Agentic AI: Back to the Future

**Authors:** Sergio Alvarez-Telena, Marta Diez-Fernandez

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24856v1) | > In light of the recent convergence between Agentic AI and our field of Algorithmization, this paper seeks to restore conceptual clarity and provide a structured analytical framework for an increasingly fragmented discourse. First, (a) it examines the contemporary landscape and proposes precise definitions for the key notions involved, ranging from intelligence to Agentic AI. Second, (b) it reviews...

---

## 104. VLN-MME: Diagnosing MLLMs as Language-guided Visual Navigation agents

**Authors:** Xunyi Zhao, Gengze Zhou, Qi Wu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24851v1) | > Multimodal Large Language Models (MLLMs) have demonstrated remarkable capabilities across a wide range of vision-language tasks. However, their performance as embodied agents, which requires multi-round dialogue spatial reasoning and sequential action prediction, needs further exploration. Our work investigates this potential in the context of Vision-and-Language Navigation (VLN) by introducing a ...

---

## 105. Triangulation as an Acceptance Rule for Multilingual Mechanistic Interpretability

**Authors:** Yanan Long

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24842v1) | > Multilingual language models achieve strong aggregate performance yet often behave unpredictably across languages, scripts, and cultures. We argue that mechanistic explanations for such models should satisfy a \emph{causal} standard: claims must survive causal interventions and must \emph{cross-reference} across environments that perturb surface form while preserving meaning. We formalize \emph{re...

---

## 106. GenZ: Foundational models as latent variable generators within traditional statistical models

**Authors:** Marko Jojic, Nebojsa Jojic

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24834v1) | > We present GenZ, a hybrid model that bridges foundational models and statistical modeling through interpretable semantic features. While large language models possess broad domain knowledge, they often fail to capture dataset-specific patterns critical for prediction tasks. Our approach addresses this by discovering semantic feature descriptions through an iterative process that contrasts groups o...

---

## 107. Unregularized Linear Convergence in Zero-Sum Game from Preference Feedback

**Authors:** Shulun Chen, Runlong Zhou, Zihan Zhang, Maryam Fazel, Simon S. Du

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24818v1) | > Aligning large language models (LLMs) with human preferences has proven effective for enhancing model capabilities, yet standard preference modeling using the Bradley-Terry model assumes transitivity, overlooking the inherent complexity of human population preferences. Nash learning from human feedback (NLHF) addresses this by framing non-transitive preferences as a two-player zero-sum game, where...

---

## 108. LeanCat: A Benchmark Suite for Formal Category Theory in Lean (Part I: 1-Categories)

**Authors:** Rongge Xu, Hui Dai, Yiming Fu, Jiedong Jiang, Tianjiao Nie

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24796v1) | > Large language models (LLMs) have made rapid progress in formal theorem proving, yet current benchmarks under-measure the kind of abstraction and library-mediated reasoning that organizes modern mathematics. In parallel with FATE's emphasis on frontier algebra, we introduce LeanCat, a Lean benchmark for category-theoretic formalization -- a unifying language for mathematical structure and a core l...

---

## 109. Gradient Descent as Implicit EM in Distance-Based Neural Models

**Authors:** Alan Oursland

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24780v1) | > Neural networks trained with standard objectives exhibit behaviors characteristic of probabilistic inference: soft clustering, prototype specialization, and Bayesian uncertainty tracking. These phenomena appear across architectures -- in attention mechanisms, classification heads, and energy-based models -- yet existing explanations rely on loose analogies to mixture models or post-hoc architectur...

---

## 110. Compute-Accuracy Pareto Frontiers for Open-Source Reasoning Large Language Models

**Authors:** Ákos Prucs, Márton Csutora, Mátyás Antal, Márk Marosi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24776v1) | > Large Language Models (LLMs) are demonstrating rapid improvements on complex reasoning benchmarks, particularly when allowed to utilize intermediate reasoning steps before converging on a final solution. However, current literature often overlooks the significant computational burden associated with generating long reasoning sequences. For industrial applications, model selection depends not only ...

---

## 111. OpenOneRec Technical Report

**Authors:** Guorui Zhou, Honghui Bao, Jiaming Huang, Jiaxin Deng, Jinghao Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24762v1) | > While the OneRec series has successfully unified the fragmented recommendation pipeline into an end-to-end generative framework, a significant gap remains between recommendation systems and general intelligence. Constrained by isolated data, they operate as domain specialists-proficient in pattern matching but lacking world knowledge, reasoning capabilities, and instruction following. This limitat...

---

## 112. RedOne 2.0: Rethinking Domain-specific LLM Post-Training in Social Networking Services

**Authors:** Fei Zhao, Chonggang Lu, Haofu Qian, Fangcheng Shi, Zijie Meng

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> As a key medium for human interaction and information exchange, social networking services (SNS) pose unique challenges for large language models (LLMs): heterogeneous workloads, fast-shifting norms and slang, and multilingual, culturally diverse corpora that induce sharp distribution shift. Supervised fine-tuning (SFT) can specialize models but often triggers a ``seesaw''between in-distribution g...

---

## 113. Fine-Grained Safety Neurons with Training-Free Continual Projection to Reduce LLM Fine Tuning Risks

**Authors:** Bing Han, Feifei Zhao, Dongcheng Zhao, Guobin Shen, Ping Wu

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2508.09190)

> Fine-tuning as service injects domain-specific knowledge into large language models (LLMs), while challenging the original alignment mechanisms and introducing safety risks. A series of defense strategies have been proposed for the alignment, fine-tuning, and post-fine-tuning phases, where most post-fine-tuning defenses rely on coarse-grained safety layer mapping. These methods lack a comprehensiv...

---

## 114. Understanding Forgetting in LLM Supervised Fine-Tuning and Preference Learning - A Convex Optimization Perspective

**Authors:** Heshan Fernando, Han Shen, Parikshit Ram, Yi Zhou, Horst Samulowitz

**Year:** 2024 | **Venue:**  | **Citations:** 9 | **Score:** 0.000

> The post-training of LLMs, which typically consists of the supervised fine-tuning (SFT) stage and the preference learning stage (RLHF or DPO), is crucial to effective and safe LLM applications. The widely adopted approach in post-training popular open-source LLMs is to sequentially perform SFT and RLHF/DPO. However, this is suboptimal in terms of SFT and RLHF/DPO trade-off: the LLM gradually forge...

---

## 115. Safety Fine-Tuning at (Almost) No Cost: A Baseline for Vision Large Language Models

**Authors:** Yongshuo Zong, Ondrej Bohdal, Tingyang Yu, Yongxin Yang, Timothy M. Hospedales

**Year:** 2024 | **Venue:** International Conference on Machine Learning | **Citations:** 110 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2402.02207)

> Current vision large language models (VLLMs) exhibit remarkable capabilities yet are prone to generate harmful content and are vulnerable to even the simplest jailbreaking attacks. Our initial analysis finds that this is due to the presence of harmful data during vision-language instruction fine-tuning, and that VLLM fine-tuning can cause forgetting of safety alignment previously learned by the un...

---

## 116. ReALLM: A general framework for LLM compression and fine-tuning

**Authors:** Louis Leconte, Lisa Bedin, Van Minh Nguyen, Éric Moulines

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.13155)

> We introduce ReALLM, a novel approach for compression and memory-efficient adaptation of pre-trained language models that encompasses most of the post-training quantization and fine-tuning methods for a budget of<4 bits. Pre-trained matrices are decomposed into a high-precision low-rank component and a vector-quantized latent representation (using an autoencoder). During the fine-tuning step, only...

---

## 117. EoRA: Fine-tuning-free Compensation for Compressed LLM with Eigenspace Low-Rank Approximation

**Authors:** Shih-Yang Liu, Huck Yang, Chein-Yi Wang, Nai Chit Fung, Hongxu Yin

**Year:** 2024 | **Venue:**  | **Citations:** 2 | **Score:** 0.000

> While post-training compression techniques effectively reduce the memory footprint, latency, and power consumption of Large Language Models (LLMs), they often result in noticeable accuracy degradation and remain limited by hardware and kernel constraints that restrict supported compression formats ultimately reducing flexibility across a wide range of deployment scenarios. In this work, we propose...

---

## 118. PV-Tuning: Beyond Straight-Through Estimation for Extreme LLM Compression

**Authors:** Vladimir Malinovskii, D. Mazur, Ivan Ilin, Denis Kuznedelev, Konstantin Burlachenko

**Year:** 2024 | **Venue:** Neural Information Processing Systems | **Citations:** 36 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.14852)

> There has been significant interest in"extreme"compression of large language models (LLMs), i.e., to 1-2 bits per parameter, which allows such models to be executed efficiently on resource-constrained devices. Existing work focused on improved one-shot quantization techniques and weight representations; yet, purely post-training approaches are reaching diminishing returns in terms of the accuracy-...

---

## 119. Scalable Reinforcement Post-Training Beyond Static Human Prompts: Evolving Alignment via Asymmetric Self-Play

**Authors:** Ziyu Ye, Rishabh Agarwal, Tianqi Liu, Rishabh Joshi, Sarmishta Velury

**Year:** 2024 | **Venue:**  | **Citations:** 12 | **Score:** 0.000

> Current reinforcement learning (RL) frameworks for large language models (LLM) post-training typically assume a fixed prompt distribution, which is sub-optimal and bottlenecks scalability. Prior works have explored prompt evolving, but are often limited to the supervised fine-tuning stage, and prompts are sampled and evolved uniformly without signals. This empirical work presents a paradigm shift:...

---

## 120. LiteMoE: Customizing On-device LLM Serving via Proxy Submodel Tuning

**Authors:** Zhuang Yan, Zhenzhe Zheng, Fan Wu, Guihai Chen

**Year:** 2024 | **Venue:** ACM International Conference on Embedded Networked Sensor Systems | **Citations:** 14 | **Score:** 0.000

[PDF](https://dl.acm.org/doi/pdf/10.1145/3666025.3699355) | [DOI](https://doi.org/10.1145/3666025.3699355)

> Considering limited on-device resources, current practices are attempting to deploy a system-level mixture-of-experts (MoE)-based foundation LLM shared by multiple mobile apps on a device to support mobile intelligence. However, mobile apps are hard to customize their services that require tuning adapters associated with the LLM using private in-app data. The difficulty arises due to both the limi...

---

## 121. SPP: Sparsity-Preserved Parameter-Efficient Fine-Tuning for Large Language Models

**Authors:** Xudong Lu, Aojun Zhou, Yuhui Xu, Renrui Zhang, Peng Gao

**Year:** 2024 | **Venue:** International Conference on Machine Learning | **Citations:** 10 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.16057)

> Large Language Models (LLMs) have become pivotal in advancing the field of artificial intelligence, yet their immense sizes pose significant challenges for both fine-tuning and deployment. Current post-training pruning methods, while reducing the sizes of LLMs, often fail to maintain their original performance. To address these challenges, this paper introduces SPP, a Sparsity-Preserved Parameter-...

---

## 122. A Practice of Post-Training on Llama-3 70B with Optimal Selection of Additional Language Mixture Ratio

**Authors:** Ningyuan Xi, Yetao Wu, Kun Fan, Teng Chen, Qingqing Gu

**Year:** 2024 | **Venue:** Pacific-Asia Conference on Knowledge Discovery and Data Mining | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2409.06624)

> Large Language Models (LLM) often need to be Continual Pre-Trained (CPT) to obtain unfamiliar language skills or adapt to new domains. The huge training cost of CPT often asks for cautious choice of key hyper-parameters such as the mixture ratio of extra language or domain corpus. However, there is no systematic study that bridges the gap between the optimal mixture ratio and the actual model perf...

---

## 123. LaMDAgent: An Autonomous Framework for Post-Training Pipeline Optimization via LLM Agents

**Authors:** Taro Yano, Yoichi Ishibashi, M. Oyamada

**Year:** 2025 | **Venue:** Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2505.21963)

> Large Language Models (LLMs) have demonstrated exceptional performance across a wide range of tasks. To further tailor LLMs to specific domains or applications, post-training techniques such as Supervised Fine-Tuning (SFT), Preference Learning, and model merging are commonly employed. While each of these methods has been extensively studied in isolation, the automated construction of complete post...

---

## 124. Post-training an LLM for RAG? Train on Self-Generated Demonstrations

**Authors:** Matthew Finlayson, Ilia Kulikov, Daneil M. Bikel, Barlas Oğuz, Xilun Chen

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2502.10596)

> Large language models (LLMs) often struggle with knowledge intensive NLP tasks, such as answering"Who won the latest World Cup?"because the knowledge they learn during training may be insufficient or outdated. Conditioning generation on retrieved documents -- a technique known as retrieval augmented generation (RAG) -- mitigates these shortcomings by allowing the model to leverage in-context infor...

---

## 125. Randomization Times under Quantum Chaotic Hamiltonian Evolution

**Authors:** Souradeep Ghosh, Nicholas Hunter-Jones, Joaquin F. Rodriguez-Nieva

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25074v1) | > Randomness generation through quantum-chaotic evolution underpins foundational questions in statistical mechanics and applications across quantum information science, including benchmarking, tomography, metrology, and demonstrations of quantum computational advantage. While statistical mechanics successfully captures the temporal averages of local observables, understanding randomness at the level...

---

## 126. Parity order as a fundamental driver of bosonic topology

**Authors:** Ashirbad Padhan, Harsh Nigam

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25011v1) | > Symmetry-protected topological (SPT) phases in interacting bosonic systems have been extensively studied, yet most realizations rely on fine-tuned interactions or enlarged symmetries. Here we show that a qualitatively different mechanism--parity order coupled to bond dimerization--acts as a fundamental driver of bosonic topology. Using density matrix renormalization group simulations, we identify ...

---

## 127. AMAP Agentic Planning Technical Report

**Authors:** Yulan Hu, Xiangwen Zhang, Sheng Ouyang, Hao Yi, Lu Xu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24957v1) | > We present STAgent, an agentic large language model tailored for spatio-temporal understanding, designed to solve complex tasks such as constrained point-of-interest discovery and itinerary planning. STAgent is a specialized model capable of interacting with ten distinct tools within spatio-temporal scenarios, enabling it to explore, verify, and refine intermediate steps during complex reasoning. ...

---

## 128. OFL-SAM2: Prompt SAM2 with Online Few-shot Learner for Efficient Medical Image Segmentation

**Authors:** Meng Lan, Lefei Zhang, Xiaomeng Li

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24861v1) | > The Segment Anything Model 2 (SAM2) has demonstrated remarkable promptable visual segmentation capabilities in video data, showing potential for extension to medical image segmentation (MIS) tasks involving 3D volumes and temporally correlated 2D image sequences. However, adapting SAM2 to MIS presents several challenges, including the need for extensive annotated medical data for fine-tuning and h...

---

## 129. AstroReview: An LLM-driven Multi-Agent Framework for Telescope Proposal Peer Review and Refinement

**Authors:** Yutong Wang, Yunxiang Xiao, Yonglin Tian, Junyong Li, Jing Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24754v1) | > Competitive access to modern observatories has intensified as proposal volumes outpace available telescope time, making timely, consistent, and transparent peer review a critical bottleneck for the advancement of astronomy. Automating parts of this process is therefore both scientifically significant and operationally necessary to ensure fair allocation and reproducible decisions at scale. We pres...

---

## 130. Analyzing Communication Predictability in LLM Training

**Authors:** Wenxue Li, Xiangzhou Liu, Yuxuan Li, Yilun Jin, Zhenghang Ren

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24750v1) | > Effective communication is essential in distributed training, with predictability being one of its most significant characteristics. However, existing studies primarily focus on exploiting predictability through online profiling for runtime optimization, without a systematic understanding of it. In this work, we aim to systematically formulate communication predictability in distributed training, ...

---

## 131. BIOME-Bench: A Benchmark for Biomolecular Interaction Inference and Multi-Omics Pathway Mechanism Elucidation from Scientific Literature

**Authors:** Sibo Wei, Peng Chen, Lifeng Dong, Yin Luo, Lei Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24733v1) | > Multi-omics studies often rely on pathway enrichment to interpret heterogeneous molecular changes, but pathway enrichment (PE)-based workflows inherit structural limitations of pathway resources, including curation lag, functional redundancy, and limited sensitivity to molecular states and interventions. Although recent work has explored using large language models (LLMs) to improve PE-based inter...

---

## 132. FPGA Co-Design for Efficient N:M Sparse and Quantized Model Inference

**Authors:** Fen-Yu Hsieh, Yun-Chang Teng, Ding-Yong Hong, Jan-Jan Wu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24713v1) | > Large language models (LLMs) have demonstrated remarkable performance across a wide range of language processing tasks. However, this success comes at the cost of substantial computation and memory requirements, which significantly impedes their deployment in resource-constrained environments. To address this challenge, this work introduces an automation framework that leverages weight pruning and...

---

## 133. MEIC-DT: Memory-Efficient Incremental Clustering for Long-Text Coreference Resolution with Dual-Threshold Constraints

**Authors:** Kangyang Luo, Shuzheng Si, Yuzhuo Bai, Cheng Gao, Zhitong Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24711v1) | > In the era of large language models (LLMs), supervised neural methods remain the state-of-the-art (SOTA) for Coreference Resolution. Yet, their full potential is underexplored, particularly in incremental clustering, which faces the critical challenge of balancing efficiency with performance for long texts. To address the limitation, we propose \textbf{MEIC-DT}, a novel dual-threshold, memory-effi...

---

## 134. MUSIC: MUlti-Step Instruction Contrast for Multi-Turn Reward Models

**Authors:** Wenzhe Li, Shujian Zhang, Wenxuan Zhou, John Lambert, Chi Jin

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24693v1) | > Evaluating the quality of multi-turn conversations is crucial for developing capable Large Language Models (LLMs), yet remains a significant challenge, often requiring costly human evaluation. Multi-turn reward models (RMs) offer a scalable alternative and can provide valuable signals for guiding LLM training. While recent work has advanced multi-turn \textit{training} techniques, effective automa...

---

## 135. BatteryAgent: Synergizing Physics-Informed Interpretation with LLM Reasoning for Intelligent Battery Fault Diagnosis

**Authors:** Songqi Zhou, Ruixue Liu, Boman Su, Jiazhou Wang, Yixing Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24686v1) | > Fault diagnosis of lithium-ion batteries is critical for system safety. While existing deep learning methods exhibit superior detection accuracy, their "black-box" nature hinders interpretability. Furthermore, restricted by binary classification paradigms, they struggle to provide root cause analysis and maintenance recommendations. To address these limitations, this paper proposes BatteryAgent, a...

---

## 136. R-Debater: Retrieval-Augmented Debate Generation through Argumentative Memory

**Authors:** Maoyuan Li, Zhongsheng Wang, Haoyuan Li, Jiamou Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24684v1) | > We present R-Debater, an agentic framework for generating multi-turn debates built on argumentative memory. Grounded in rhetoric and memory studies, the system views debate as a process of recalling and adapting prior arguments to maintain stance consistency, respond to opponents, and support claims with evidence. Specifically, R-Debater integrates a debate knowledge base for retrieving case-like ...

---

## 137. Do Large Language Models Know What They Are Capable Of?

**Authors:** Casey O. Barkan, Sid Black, Oliver Sourbut

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24661v1) | > We investigate whether large language models (LLMs) can predict whether they will succeed on a given task and whether their predictions improve as they progress through multi-step tasks. We also investigate whether LLMs can learn from in-context experiences to make better decisions about whether to pursue a task in scenarios where failure is costly. All LLMs we tested are overconfident, but most p...

---

## 138. MSched: GPU Multitasking via Proactive Memory Scheduling

**Authors:** Weihang Shen, Yinqiu Chen, Rong Chen, Haibo Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24637v1) | > The limited HBM capacity has become the primary bottleneck for hosting an increasing number of larger-scale GPU tasks. While demand paging extends capacity via host DRAM, it incurs up to 78x slowdown due to the massive working sets and poor locality of GPU workloads. We observe, however, that GPU memory access patterns are inherently predictable via kernel launch arguments and their asynchronous e...

---

## 139. DynaFix: Iterative Automated Program Repair Driven by Execution-Level Dynamic Information

**Authors:** Zhili Huang, Ling Xu, Chao Liu, Weifeng Sun, Xu Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24635v1) | > Automated Program Repair (APR) aims to automatically generate correct patches for buggy programs. Recent approaches leveraging large language models (LLMs) have shown promise but face limitations. Most rely solely on static analysis, ignoring runtime behaviors. Some attempt to incorporate dynamic signals, but these are often restricted to training or fine-tuning, or injected only once into the rep...

---

## 140. How Do Agentic AI Systems Address Performance Optimizations? A BERTopic-Based Analysis of Pull Requests

**Authors:** Md Nahidul Islam Opu, Shahidul Islam, Muhammad Asaduzzaman, Shaiful Chowdhury

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24630v1) | > LLM-based software engineering is influencing modern software development. In addition to correctness, prior studies have also examined the performance of software artifacts generated by AI agents. However, it is unclear how exactly the agentic AI systems address performance concerns in practice. In this paper, we present an empirical study of performance-related pull requests generated by AI agen...

---

## 141. Youtu-LLM: Unlocking the Native Agentic Potential for Lightweight Large Language Models

**Authors:** Junru Lu, Jiarui Qin, Lingfeng Qiao, Yinghui Li, Xinyi Dai

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24618v1) | > We introduce Youtu-LLM, a lightweight yet powerful language model that harmonizes high computational efficiency with native agentic intelligence. Unlike typical small models that rely on distillation, Youtu-LLM (1.96B) is pre-trained from scratch to systematically cultivate reasoning and planning capabilities. The key technical advancements are as follows: (1) Compact Architecture with Long-Contex...

---

## 142. Dynamic Large Concept Models: Latent Reasoning in an Adaptive Semantic Space

**Authors:** Xingwei Qu, Shaowen Wang, Zihao Huang, Kai Hua, Fan Yin

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24617v1) | > Large Language Models (LLMs) apply uniform computation to all tokens, despite language exhibiting highly non-uniform information density. This token-uniform regime wastes capacity on locally predictable spans while under-allocating computation to semantically critical transitions. We propose $\textbf{Dynamic Large Concept Models (DLCM)}$, a hierarchical language modeling framework that learns sema...

---

## 143. Youtu-Agent: Scaling Agent Productivity with Automated Generation and Hybrid Policy Optimization

**Authors:** Yuchen Shi, Yuzheng Cai, Siqi Cai, Zihan Xu, Lichao Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24615v1) | > Existing Large Language Model (LLM) agent frameworks face two significant challenges: high configuration costs and static capabilities. Building a high-quality agent often requires extensive manual effort in tool integration and prompt engineering, while deployed agents struggle to adapt to dynamic environments without expensive fine-tuning. To address these issues, we propose \textbf{Youtu-Agent}...

---

## 144. Chat-Driven Optimal Management for Virtual Network Services

**Authors:** Yuya Miyaoka, Masaki Inoue, Kengo Urata, Shigeaki Harada

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24614v1) | > This paper proposes a chat-driven network management framework that integrates natural language processing (NLP) with optimization-based virtual network allocation, enabling intuitive and reliable reconfiguration of virtual network services. Conventional intent-based networking (IBN) methods depend on statistical language models to interpret user intent but cannot guarantee the feasibility of gene...

---

## 145. Reinforcement Learning-Augmented LLM Agents for Collaborative Decision Making and Performance Optimization

**Authors:** Dong Qiu, Duo Xu, Limengxi Yue

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24609v1) | > Large Language Models (LLMs) perform well in language tasks but often lack collaborative awareness and struggle to optimize global performance in multi-agent settings. We present a reinforcement learning-augmented LLM agent framework that formulates cooperation as a decentralized partially observable Markov decision process (Dec-POMDP) and adopts centralized training with decentralized execution (...

---

## 146. Recursive Language Models

**Authors:** Alex L. Zhang, Tim Kraska, Omar Khattab

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24601v1) | > We study allowing large language models (LLMs) to process arbitrarily long prompts through the lens of inference-time scaling. We propose Recursive Language Models (RLMs), a general inference strategy that treats long prompts as part of an external environment and allows the LLM to programmatically examine, decompose, and recursively call itself over snippets of the prompt. We find that RLMs succe...

---

## 147. A Tale of 1001 LoC: Potential Runtime Error-Guided Specification Synthesis for Verifying Large-Scale Programs

**Authors:** Zhongyi Wang, Tengjie Lin, Mingshuai Chen, Haokun Li, Mingqi Yang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24594v1) | > Fully automated verification of large-scale software and hardware systems is arguably the holy grail of formal methods. Large language models (LLMs) have recently demonstrated their potential for enhancing the degree of automation in formal verification by, e.g., generating formal specifications as essential to deductive verification, yet exhibit poor scalability due to long-context reasoning limi...

---

## 148. SliceLens: Fine-Grained and Grounded Error Slice Discovery for Multi-Instance Vision Tasks

**Authors:** Wei Zhang, Chaoqun Wang, Zixuan Guan, Sam Kao, Pengfei Zhao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24592v1) | > Systematic failures of computer vision models on subsets with coherent visual patterns, known as error slices, pose a critical challenge for robust model evaluation. Existing slice discovery methods are primarily developed for image classification, limiting their applicability to multi-instance tasks such as detection, segmentation, and pose estimation. In real-world scenarios, error slices often ...

---

## 149. Understanding and Steering the Cognitive Behaviors of Reasoning Models at Test-Time

**Authors:** Zhenyu Zhang, Xiaoxia Wu, Zhongzhu Zhou, Qingyang Wu, Yineng Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24574v1) | > Large Language Models (LLMs) often rely on long chain-of-thought (CoT) reasoning to solve complex tasks. While effective, these trajectories are frequently inefficient, leading to high latency from excessive token generation, or unstable reasoning that alternates between underthinking (shallow, inconsistent steps) and overthinking (repetitive, verbose reasoning). In this work, we study the structu...

---

## 150. Korean Canonical Legal Benchmark: Toward Knowledge-Independent Evaluation of LLMs' Legal Reasoning Capabilities

**Authors:** Hongseok Oh, Wonseok Hwang, Kyoung-Woon On

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24572v1) | > We introduce the Korean Canonical Legal Benchmark (KCL), a benchmark designed to assess language models' legal reasoning capabilities independently of domain-specific knowledge. KCL provides question-level supporting precedents, enabling a more faithful disentanglement of reasoning ability from parameterized knowledge. KCL consists of two components: (1) KCL-MCQA, multiple-choice problems of 283 q...

---

## 151. On the Effectiveness of Training Data Optimization for LLM-based Code Generation: An Empirical Study

**Authors:** Shiqi Kuang, Zhao Tian, Tao Xiao, Dong Wang, Junjie Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24570v1) | > Large language models (LLMs) have achieved remarkable progress in code generation, largely driven by the availability of high-quality code datasets for effective training. To further improve data quality, numerous training data optimization techniques have been proposed; however, their overall effectiveness has not been systematically evaluated. To bridge this gap, we conduct the first large-scale...

---

## 152. MCPAgentBench: A Real-world Task Benchmark for Evaluating LLM Agent MCP Tool Use

**Authors:** Wenrui Liu, Zixiang Liu, Elsie Dai, Wenhan Yu, Lei Yu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24565v1) | > Large Language Models (LLMs) are increasingly serving as autonomous agents, and their utilization of external tools via the Model Context Protocol (MCP) is considered a future trend. Current MCP evaluation sets suffer from issues such as reliance on external MCP services and a lack of difficulty awareness. To address these limitations, we propose MCPAgentBench, a benchmark based on real-world MCP ...

---

## 153. HaluNet: Multi-Granular Uncertainty Modeling for Efficient Hallucination Detection in LLM Question Answering

**Authors:** Chaodong Tong, Qi Zhang, Jiayang Gao, Lei Jiang, Yanbing Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24562v1) | > Large Language Models (LLMs) excel at question answering (QA) but often generate hallucinations, including factual errors or fabricated content. Detecting hallucinations from internal uncertainty signals is attractive due to its scalability and independence from external resources. Existing methods often aim to accurately capture a single type of uncertainty while overlooking the complementarity a...

---

## 154. Localized Calibrated Uncertainty in Code Language Models

**Authors:** David Gros, Prem Devanbu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24560v1) | > Large Language models (LLMs) can generate complicated source code from natural language prompts. However, LLMs can generate output that deviates from what the user wants, requiring supervision and editing. To support this process, we offer techniques to localize where generations might be misaligned from user intent. We first create a dataset of "Minimal Intent Aligning Patches" of repaired LLM ge...

---

## 155. Safe in the Future, Dangerous in the Past: Dissecting Temporal and Linguistic Vulnerabilities in LLMs

**Authors:** Muhammad Abdullahi Said, Muhammad Sammani Sani

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24556v1) | > As Large Language Models (LLMs) integrate into critical global infrastructure, the assumption that safety alignment transfers zero-shot from English to other languages remains a dangerous blind spot. This study presents a systematic audit of three state of the art models (GPT-5.1, Gemini 3 Pro, and Claude 4.5 Opus) using HausaSafety, a novel adversarial dataset grounded in West African threat scen...

---

## 156. More Than Bits: Multi-Envelope Double Binary Factorization for Extreme Quantization

**Authors:** Yuma Ichikawa, Yoshihiko Fujisawa, Yudai Fujimoto, Akira Sakai, Katsuki Fujisawa

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24545v1) | > For extreme low-bit quantization of large language models (LLMs), Double Binary Factorization (DBF) is attractive as it enables efficient inference without sacrificing accuracy. However, the scaling parameters of DBF are too restrictive; after factoring out signs, all rank components share the same magnitude profile, resulting in performance saturation. We propose Multi-envelope DBF (MDBF), which ...

---

## 157. From Building Blocks to Planning: Multi-Step Spatial Reasoning in LLMs with Reinforcement Learning

**Authors:** Amir Tahmasbi, Sadegh Majidi, Kazem Taram, Aniket Bera

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24532v1) | > Spatial reasoning in large language models (LLMs) has gained increasing attention due to applications in navigation and planning. Despite strong general language capabilities, LLMs still struggle with spatial transformations and multi-step planning in structured environments. We propose a two-stage approach that decomposes spatial reasoning into atomic building blocks and their composition. First,...

---

## 158. Generative AI-enhanced Sector-based Investment Portfolio Construction

**Authors:** Alina Voronina, Oleksandr Romanko, Ruiwen Cao, Roy H. Kwon, Rafael Mendoza-Arriaga

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24526v1) | > This paper investigates how Large Language Models (LLMs) from leading providers (OpenAI, Google, Anthropic, DeepSeek, and xAI) can be applied to quantitative sector-based portfolio construction. We use LLMs to identify investable universes of stocks within S&P 500 sector indices and evaluate how their selections perform when combined with classical portfolio optimization methods. Each model was pr...

---

## 159. Rainfall forecasts in daily use over East Africa improved by machine learning

**Authors:** Fenwick C. Cooper, Shruti Nath, Andrew T. T. McRae, Bobby Antonio, Antje Weisheimer

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24525v1) | > Ensemble forecasting has proven over the years to be a vital tool for predicting extreme or only partially predictable weather events. In particular life-threatening weather events. Many National Meteorological Services in East Africa do not have the computing resources to enable them to run their local area models in full ensemble mode over the full period of the 2 week medium range. As a result,...

---

## 160. Using Large Language Models To Translate Machine Results To Human Results

**Authors:** Trishna Niraula, Jonathan Stubblefield

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24518v1) | > Artificial intelligence (AI) has transformed medical imaging, with computer vision (CV) systems achieving state-of-the-art performance in classification and detection tasks. However, these systems typically output structured predictions, leaving radiologists responsible for translating results into full narrative reports. Recent advances in large language models (LLMs), such as GPT-4, offer new op...

---

## 161. Understanding LLM Checkpoint/Restore I/O Strategies and Patterns

**Authors:** Mikaila J. Gossman, Avinash Maurya, Bogdan Nicolae, Jon C. Calhoun

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24511v1) | [DOI](https://doi.org/10.1145/3784828.3784830)

> As LLMs and foundation models scale, checkpoint/restore has become a critical pattern for training and inference. With 3D parallelism (tensor, pipeline, data), checkpointing involves many processes, each managing numerous tensors of varying shapes and sizes, that must be persisted frequently to stable storage (e.g., parallel file systems). This turns checkpoint/restore into a big-data I/O problem ...

---

## 162. Evaluating the Reasoning Abilities of LLMs on Underrepresented Mathematics Competition Problems

**Authors:** Samuel Golladay, Majid Bani-Yaghoub

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24505v1) | > Understanding the limitations of Large Language Models, or LLMs, in mathematical reasoning has been the focus of several recent studies. However, the majority of these studies use the same datasets for benchmarking, which limits the generalizability of their findings and may not fully capture the diverse challenges present in mathematical tasks. The purpose of the present study is to analyze the p...

---

## 163. Can Small Training Runs Reliably Guide Data Curation? Rethinking Proxy-Model Practice

**Authors:** Jiachen T. Wang, Tong Wu, Kaifeng Lyu, James Zou, Dawn Song

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24503v1) | > Data teams at frontier AI companies routinely train small proxy models to make critical decisions about pretraining data recipes for full-scale training runs. However, the community has a limited understanding of whether and when conclusions drawn from small-scale experiments reliably transfer to full-scale model training. In this work, we uncover a subtle yet critical issue in the standard experi...

---

## 164. HOLOGRAPH: Active Causal Discovery via Sheaf-Theoretic Alignment of Large Language Model Priors

**Authors:** Hyunjun Kim

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24478v1) | > Causal discovery from observational data remains fundamentally limited by identifiability constraints. Recent work has explored leveraging Large Language Models (LLMs) as sources of prior causal knowledge, but existing approaches rely on heuristic integration that lacks theoretical grounding. We introduce HOLOGRAPH, a framework that formalizes LLM-guided causal discovery through sheaf theory--repr...

---

## 165. Align While Search: Belief-Guided Exploratory Inference for World-Grounded Embodied Agents

**Authors:** Seohui Bae, Jeonghye Kim, Youngchul Sung, Woohyung Lim

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24461v1) | > In this paper, we propose a test-time adaptive agent that performs exploratory inference through posterior-guided belief refinement without relying on gradient-based updates or additional training for LLM agent operating under partial observability. Our agent maintains an external structured belief over the environment state, iteratively updates it via action-conditioned observations, and selects ...

---

## 166. PackKV: Reducing KV Cache Memory Footprint through LLM-Aware Lossy Compression

**Authors:** Bo Jiang, Taolue Yang, Youyuan Liu, Xubin He, Sheng Di

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24449v1) | > Transformer-based large language models (LLMs) have demonstrated remarkable potential across a wide range of practical applications. However, long-context inference remains a significant challenge due to the substantial memory requirements of the key-value (KV) cache, which can scale to several gigabytes as sequence length and batch size increase. In this paper, we present \textbf{PackKV}, a gener...

---

## 167. Language Model Agents Under Attack: A Cross Model-Benchmark of Profit-Seeking Behaviors in Customer Service

**Authors:** Jingyu Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24415v1) | > Customer-service LLM agents increasingly make policy-bound decisions (refunds, rebooking, billing disputes), but the same ``helpful'' interaction style can be exploited: a small fraction of users can induce unauthorized concessions, shifting costs to others and eroding trust in agentic workflows. We present a cross-domain benchmark of profit-seeking direct prompt injection in customer-service inte...

---

## 168. AI-Driven Evaluation of Surgical Skill via Action Recognition

**Authors:** Yan Meng, Daniel A. Donoho, Marcelle Altshuler, Omar Arnaout

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24411v1) | > The development of effective training and evaluation strategies is critical. Conventional methods for assessing surgical proficiency typically rely on expert supervision, either through onsite observation or retrospective analysis of recorded procedures. However, these approaches are inherently subjective, susceptible to inter-rater variability, and require substantial time and effort from expert ...

---

## 169. Comparing Approaches to Automatic Summarization in Less-Resourced Languages

**Authors:** Chester Palen-Michel, Constantine Lignos

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24410v1) | > Automatic text summarization has achieved high performance in high-resourced languages like English, but comparatively less attention has been given to summarization in less-resourced languages. This work compares a variety of different approaches to summarization from zero-shot prompting of LLMs large and small to fine-tuning smaller models like mT5 with and without three data augmentation approa...

---

## 170. On the Factual Consistency of Text-based Explainable Recommendation Models

**Authors:** Ben Kabongo, Vincent Guigue

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24366v1) | > Text-based explainable recommendation aims to generate natural-language explanations that justify item recommendations, to improve user trust and system transparency. Although recent advances leverage LLMs to produce fluent outputs, a critical question remains underexplored: are these explanations factually consistent with the available evidence? We introduce a comprehensive framework for evaluati...

---

## 171. World model inspired sarcasm reasoning with large language model agents

**Authors:** Keito Inoshita, Shinnosuke Mizuno

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24329v1) | > Sarcasm understanding is a challenging problem in natural language processing, as it requires capturing the discrepancy between the surface meaning of an utterance and the speaker's intentions as well as the surrounding social context. Although recent advances in deep learning and Large Language Models (LLMs) have substantially improved performance, most existing approaches still rely on black-box...

---

## 172. QianfanHuijin Technical Report: A Novel Multi-Stage Training Paradigm for Finance Industrial LLMs

**Authors:** Shupeng Li, Weipeng Lu, Linyun Liu, Chen Lin, Shaofei Li

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24314v1) | > Domain-specific enhancement of Large Language Models (LLMs) within the financial context has long been a focal point of industrial application. While previous models such as BloombergGPT and Baichuan-Finance primarily focused on knowledge enhancement, the deepening complexity of financial services has driven a growing demand for models that possess not only domain knowledge but also robust financi...

---

## 173. Automated Analysis of Sustainability Reports: Using Large Language Models for the Extraction and Prediction of EU Taxonomy-Compliant KPIs

**Authors:** Jonathan Schmoll, Adam Jatowt

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24289v1) | > The manual, resource-intensive process of complying with the EU Taxonomy presents a significant challenge for companies. While Large Language Models (LLMs) offer a path to automation, research is hindered by a lack of public benchmark datasets. To address this gap, we introduce a novel, structured dataset from 190 corporate reports, containing ground-truth economic activities and quantitative Key ...

---

## 174. RAGPart & RAGMask: Retrieval-Stage Defenses Against Corpus Poisoning in Retrieval-Augmented Generation

**Authors:** Pankayaraj Pathmanathan, Michael-Andrei Panaitescu-Liess, Cho-Yu Jason Chiang, Furong Huang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24268v1) | > Retrieval-Augmented Generation (RAG) has emerged as a promising paradigm to enhance large language models (LLMs) with external knowledge, reducing hallucinations and compensating for outdated information. However, recent studies have exposed a critical vulnerability in RAG pipelines corpus poisoning where adversaries inject malicious documents into the retrieval corpus to manipulate model outputs....

---

## 175. Joint Selection for Large-Scale Pre-Training Data via Policy Gradient-based Mask Learning

**Authors:** Ziqing Fan, Yuqiao Xian, Yan Sun, Li Shen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24265v1) | > A fine-grained data recipe is crucial for pre-training large language models, as it can significantly enhance training efficiency and model performance. One important ingredient in the recipe is to select samples based on scores produced by defined rules, LLM judgment, or statistical information in embeddings, which can be roughly categorized into quality and diversity metrics. Due to the high com...

---

## 176. ARM: A Learnable, Plug-and-Play Module for CLIP-based Open-vocabulary Semantic Segmentation

**Authors:** Ziquan Liu, Zhewei Zhu, Xuyang Shi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24224v1) | > Open-vocabulary semantic segmentation (OVSS) is fundamentally hampered by the coarse, image-level representations of CLIP, which lack precise pixel-level details. Existing training-free methods attempt to resolve this by either importing priors from costly external foundation models (e.g., SAM, DINO) or by applying static, hand-crafted heuristics to CLIP's internal features. These approaches are e...

---

## 177. MedKGI: Iterative Differential Diagnosis with Medical Knowledge Graphs and Information-Guided Inquiring

**Authors:** Qipeng Wang, Rui Sheng, Yafei Li, Huamin Qu, Yushi Sun

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24181v1) | > Recent advancements in Large Language Models (LLMs) have demonstrated significant promise in clinical diagnosis. However, current models struggle to emulate the iterative, diagnostic hypothesis-driven reasoning of real clinical scenarios. Specifically, current LLMs suffer from three critical limitations: (1) generating hallucinated medical content due to weak grounding in verified knowledge, (2) a...

---

## 178. Graph-Based Exploration for ARC-AGI-3 Interactive Reasoning Tasks

**Authors:** Evgenii Rudakov, Jonathan Shock, Benjamin Ultan Cowley

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24156v1) | > We present a training-free graph-based approach for solving interactive reasoning tasks in the ARC-AGI-3 benchmark. ARC-AGI-3 comprises game-like tasks where agents must infer task mechanics through limited interactions, and adapt to increasing complexity as levels progress. Success requires forming hypotheses, testing them, and tracking discovered mechanics. The benchmark has revealed that state-...

---

## 179. Large Emotional World Model

**Authors:** Changhao Song, Yazhou Zhang, Hui Gao, Chang Yang, Peng Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24149v1) | > World Models serve as tools for understanding the current state of the world and predicting its future dynamics, with broad application potential across numerous fields. As a key component of world knowledge, emotion significantly influences human decision-making. While existing Large Language Models (LLMs) have shown preliminary capability in capturing world knowledge, they primarily focus on mod...

---

## 180. OptRot: Mitigating Weight Outliers via Data-Free Rotations for Post-Training Quantization

**Authors:** Advait Gadhikar, Riccardo Grazzi, James Hensman

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24124v1) | > The presence of outliers in Large Language Models (LLMs) weights and activations makes them difficult to quantize. Recent work has leveraged rotations to mitigate these outliers. In this work, we propose methods that learn fusible rotations by minimizing principled and cheap proxy objectives to the weight quantization error. We primarily focus on GPTQ as the quantization method. Our main method is...

---

## 181. Enhancing LLM-Based Neural Network Generation: Few-Shot Prompting and Efficient Validation for Automated Architecture Design

**Authors:** Chandini Vysyaraju, Raghuvir Duvvuri, Avi Goyal, Dmitry Ignatov, Radu Timofte

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24120v1) | > Automated neural network architecture design remains a significant challenge in computer vision. Task diversity and computational constraints require both effective architectures and efficient search methods. Large Language Models (LLMs) present a promising alternative to computationally intensive Neural Architecture Search (NAS), but their application to architecture generation in computer vision...

---

## 182. CogRec: A Cognitive Recommender Agent Fusing Large Language Models and Soar for Explainable Recommendation

**Authors:** Jiaxin Hu, Tao Wang, Bingsan Yang, Hongrun Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24113v1) | > Large Language Models (LLMs) have demonstrated a remarkable capacity in understanding user preferences for recommendation systems. However, they are constrained by several critical challenges, including their inherent "Black-Box" characteristics, susceptibility to knowledge hallucination, and limited online learning capacity. These factors compromise their trustworthiness and adaptability. Convers...

---

## 183. Enhancing LLM Planning Capabilities through Intrinsic Self-Critique

**Authors:** Bernd Bohnet, Pierre-Alexandre Kamienny, Hanie Sedghi, Dilan Gorur, Pranjal Awasthi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24103v1) | > We demonstrate an approach for LLMs to critique their \emph{own} answers with the goal of enhancing their performance that leads to significant improvements over established planning benchmarks. Despite the findings of earlier research that has cast doubt on the effectiveness of LLMs leveraging self critique methods, we show significant performance gains on planning datasets in the Blocksworld dom...

---

## 184. Training a Huggingface Model on AWS Sagemaker (Without Tears)

**Authors:** Liling Tan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24098v1) | > The development of Large Language Models (LLMs) has primarily been driven by resource-rich research groups and industry partners. Due to the lack of on-premise computing resources required for increasingly complex models, many researchers are turning to cloud services like AWS SageMaker to train Hugging Face models. However, the steep learning curve of cloud platforms often presents a barrier for ...

---

## 185. LoongFlow: Directed Evolutionary Search via a Cognitive Plan-Execute-Summarize Paradigm

**Authors:** Chunhui Wan, Xunan Dai, Zhuo Wang, Minglei Li, Yanpeng Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24077v1) | > The transition from static Large Language Models (LLMs) to self-improving agents is hindered by the lack of structured reasoning in traditional evolutionary approaches. Existing methods often struggle with premature convergence and inefficient exploration in high-dimensional code spaces. To address these challenges, we introduce LoongFlow, a self-evolving agent framework that achieves state-of-the...

---

## 186. How and Why LLMs Generalize: A Fine-Grained Analysis of LLM Reasoning from Cognitive Behaviors to Low-Level Patterns

**Authors:** Haoyue Bai, Yiyou Sun, Wenjie Hu, Shi Qiu, Maggie Ziyu Huan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24063v1) | > Large Language Models (LLMs) display strikingly different generalization behaviors: supervised fine-tuning (SFT) often narrows capability, whereas reinforcement-learning (RL) tuning tends to preserve it. The reasons behind this divergence remain unclear, as prior studies have largely relied on coarse accuracy metrics. We address this gap by introducing a novel benchmark that decomposes reasoning i...

---

## 187. Beyond Hallucinations: A Composite Score for Measuring Reliability in Open-Source Large Language Models

**Authors:** Rohit Kumar Salla, Manoj Saravanan, Shrikar Reddy Kota

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24058v1) | > Large Language Models (LLMs) like LLaMA, Mistral, and Gemma are increasingly used in decision-critical domains such as healthcare, law, and finance, yet their reliability remains uncertain. They often make overconfident errors, degrade under input shifts, and lack clear uncertainty estimates. Existing evaluations are fragmented, addressing only isolated aspects. We introduce the Composite Reliabil...

---

## 188. Jailbreaking Attacks vs. Content Safety Filters: How Far Are We in the LLM Safety Arms Race?

**Authors:** Yuan Xin, Dingfan Chen, Linyi Yang, Michael Backes, Xiao Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24044v1) | > As large language models (LLMs) are increasingly deployed, ensuring their safe use is paramount. Jailbreaking, adversarial prompts that bypass model alignment to trigger harmful outputs, present significant risks, with existing studies reporting high success rates in evading common LLMs. However, previous evaluations have focused solely on the models, neglecting the full deployment pipeline, which...

---

## 189. ROAD: Reflective Optimization via Automated Debugging for Zero-Shot Agent Alignment

**Authors:** Natchaya Temyingyong, Daman Jain, Neeraj Kumarsahu, Prabhat Kumar, Rachata Phondi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24040v1) | > Automatic Prompt Optimization (APO) has emerged as a critical technique for enhancing Large Language Model (LLM) performance, yet current state-of-the-art methods typically rely on large, labeled gold-standard development sets to compute fitness scores for evolutionary or Reinforcement Learning (RL) approaches. In real-world software engineering, however, such curated datasets are rarely available...

---

## 190. iCLP: Large Language Model Reasoning with Implicit Cognition Latent Planning

**Authors:** Sijia Chen, Di Niu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24014v1) | > Large language models (LLMs), when guided by explicit textual plans, can perform reliable step-by-step reasoning during problem-solving. However, generating accurate and effective textual plans remains challenging due to LLM hallucinations and the high diversity of task-specific questions. To address this, we draw inspiration from human Implicit Cognition (IC), the subconscious process by which de...

---

## 191. SPARK: Search Personalization via Agent-Driven Retrieval and Knowledge-sharing

**Authors:** Gaurab Chhetri, Subasish Das, Tausif Islam Chowdhury

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24008v1) | > Personalized search demands the ability to model users' evolving, multi-dimensional information needs; a challenge for systems constrained by static profiles or monolithic retrieval pipelines. We present SPARK (Search Personalization via Agent-Driven Retrieval and Knowledge-sharing), a framework in which coordinated persona-based large language model (LLM) agents deliver task-specific retrieval an...

---

## 192. RepetitionCurse: Measuring and Understanding Router Imbalance in Mixture-of-Experts LLMs under DoS Stress

**Authors:** Ruixuan Huang, Qingyue Wang, Hantao Huang, Yudong Gao, Dong Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23995v1) | > Mixture-of-Experts architectures have become the standard for scaling large language models due to their superior parameter efficiency. To accommodate the growing number of experts in practice, modern inference systems commonly adopt expert parallelism to distribute experts across devices. However, the absence of explicit load balancing constraints during inference allows adversarial inputs to tri...

---

## 193. Fantastic Reasoning Behaviors and Where to Find Them: Unsupervised Discovery of the Reasoning Process

**Authors:** Zhenyu Zhang, Shujian Zhang, John Lambert, Wenxuan Zhou, Zhangyang Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23988v1) | > Despite the growing reasoning capabilities of recent large language models (LLMs), their internal mechanisms during the reasoning process remain underexplored. Prior approaches often rely on human-defined concepts (e.g., overthinking, reflection) at the word level to analyze reasoning in a supervised manner. However, such methods are limited, as it is infeasible to capture the full spectrum of pot...

---

## 194. Coding With AI: From a Reflection on Industrial Practices to Future Computer Science and Software Engineering Education

**Authors:** Hung-Fu Chang, MohammadShokrolah Shirazi, Lizhou Cao, Supannika Koolmanojwong Mobasser

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23982v1) | > Recent advances in large language models (LLMs) have introduced new paradigms in software development, including vibe coding, AI-assisted coding, and agentic coding, fundamentally reshaping how software is designed, implemented, and maintained. Prior research has primarily examined AI-based coding at the individual level or in educational settings, leaving industrial practitioners' perspectives un...

---

## 195. CEC-Zero: Zero-Supervision Character Error Correction with Self-Generated Rewards

**Authors:** Zhiming Lin, Kai Zhao, Sophie Zhang, Peilai Yu, Canran Xiao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23971v1) | > Large-scale Chinese spelling correction (CSC) remains critical for real-world text processing, yet existing LLMs and supervised methods lack robustness to novel errors and rely on costly annotations. We introduce CEC-Zero, a zero-supervision reinforcement learning framework that addresses this by enabling LLMs to correct their own mistakes. CEC-Zero synthesizes errorful inputs from clean text, com...

---

## 196. Improving Multi-step RAG with Hypergraph-based Memory for Long-Context Complex Relational Modeling

**Authors:** Chulun Zhou, Chunkang Zhang, Guoxin Yu, Fandong Meng, Jie Zhou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23959v1) | > Multi-step retrieval-augmented generation (RAG) has become a widely adopted strategy for enhancing large language models (LLMs) on tasks that demand global comprehension and intensive reasoning. Many RAG systems incorporate a working memory module to consolidate retrieved information. However, existing memory designs function primarily as passive storage that accumulates isolated facts for the pur...

---

## 197. A Proof-of-Concept for Explainable Disease Diagnosis Using Large Language Models and Answer Set Programming

**Authors:** Ioanna Gemou, Evangelos Lamprou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23932v1) | > Accurate disease prediction is vital for timely intervention, effective treatment, and reducing medical complications. While symbolic AI has been applied in healthcare, its adoption remains limited due to the effort required for constructing high-quality knowledge bases. This work introduces McCoy, a framework that combines Large Language Models (LLMs) with Answer Set Programming (ASP) to overcome...

---

## 198. Hardware Acceleration for Neural Networks: A Comprehensive Survey

**Authors:** Bin Xu, Ayan Banerjee, Sandeep Gupta

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23914v1) | > Neural networks have become a dominant computational workload across cloud and edge platforms, but rapid growth in model size and deployment diversity has exposed hardware bottlenecks increasingly dominated by memory movement, communication, and irregular operators rather than peak arithmetic throughput. This survey reviews the technology landscape for hardware acceleration of deep learning, spann...

---

## 199. How Large Language Models Systematically Misrepresent American Climate Opinions

**Authors:** Sola Kim, Jieshu Wang, Marco A. Janssen, John M. Anderies

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23889v1) | > Federal agencies and researchers increasingly use large language models to analyze and simulate public opinion. When AI mediates between the public and policymakers, accuracy across intersecting identities becomes consequential; inaccurate group-level estimates can mislead outreach, consultation, and policy design. While research examines intersectionality in LLM outputs, no study has compared the...

---

## 200. CASCADE: Cumulative Agentic Skill Creation through Autonomous Development and Evolution

**Authors:** Xu Huang, Junwu Chen, Yuxing Fei, Zhuohan Li, Philippe Schwaller

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23880v1) | > Large language model (LLM) agents currently depend on predefined tools or brittle tool generation, constraining their capability and adaptability to complex scientific tasks. We introduce CASCADE, a self-evolving agentic framework representing an early instantiation of the transition from "LLM + tool use" to "LLM + skill acquisition". CASCADE enables agents to master complex external tools and cod...

---

## 201. From Illusion to Insight: Change-Aware File-Level Software Defect Prediction Using Agentic AI

**Authors:** Mohsen Hesamolhokama, Behnam Rohani, Amirahmad Shafiee, MohammadAmin Fazli, Jafar Habibi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23875v1) | > Much of the reported progress in file-level software defect prediction (SDP) is, in reality, nothing but an illusion of accuracy. Over the last decades, machine learning and deep learning models have reported increasing performance across software versions. However, since most files persist across releases and retain their defect labels, standard evaluation rewards label-persistence bias rather th...

---

## 202. Yggdrasil: Bridging Dynamic Speculation and Static Runtime for Latency-Optimal Tree-Based LLM Decoding

**Authors:** Yue Guan, Changming Yu, Shihan Fang, Weiming Hu, Zaifeng Pan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23858v1) | > Speculative decoding improves LLM inference by generating and verifying multiple tokens in parallel, but existing systems suffer from suboptimal performance due to a mismatch between dynamic speculation and static runtime assumptions. We present Yggdrasil, a co-designed system that enables latency-optimal speculative decoding through context-aware tree drafting and compiler-friendly execution. Ygg...

---

## 203. Integrating Domain Knowledge for Financial QA: A Multi-Retriever RAG Approach with LLMs

**Authors:** Yukun Zhang, Stefan Elbl Droguett, Samyak Jain

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23848v1) | > This research project addresses the errors of financial numerical reasoning Question Answering (QA) tasks due to the lack of domain knowledge in finance. Despite recent advances in Large Language Models (LLMs), financial numerical questions remain challenging because they require specific domain knowledge in finance and complex multi-step numeric reasoning. We implement a multi-retriever Retrieval...

---

## 204. MALT: Improving Reasoning with Multi-Agent LLM Training

**Authors:** S. Motwani, Chandler Smith, Rocktim Jyoti Das, Markian Rybchuk, Philip Torr

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 34 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2412.01928)

> Large Language Models (LLMs) often produce answers with a single chain-of-thought, which restricts their ability to explore reasoning paths or self-correct flawed outputs in complex tasks. In this paper, we introduce MALT (Multi-Agent LLM Training), a novel post-training strategy that divides the reasoning process into generation, verification, and refinement steps using a sequential pipeline of h...

---

## 205. LLM-QAT: Data-Free Quantization Aware Training for Large Language Models

**Authors:** Zechun Liu, Barlas Oğuz, Changsheng Zhao, Ernie Chang, Pierre Stock

**Year:** 2023 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 288 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2305.17888) | [DOI](https://doi.org/10.48550/arXiv.2305.17888)

> Several post-training quantization methods have been applied to large language models (LLMs), and have been shown to perform well down to 8-bits. We find that these methods break down at lower bit precision, and investigate quantization aware training for LLMs (LLM-QAT) to push quantization levels even further. We propose a data-free distillation method that leverages generations produced by the p...

---

## 206. Post Training Quantization of Large Language Models with Microscaling Formats

**Authors:** Sayeh Sharify, Zifei Xu, W. Yazar, Xin Wang

**Year:** 2024 | **Venue:** ENLSP | **Citations:** 8 | **Score:** 0.000

> Large Language Models (LLMs) have distinguished themselves with outstanding performance in complex language modeling tasks, yet they come with significant computational and storage challenges. This paper explores the potential of quantization to mitigate these challenges. We systematically study the combined application of three well-known post-training techniques, SmoothQuant, AWQ, and GPTQ, and ...

---

## 207. MQM-APE: Toward High-Quality Error Annotation Predictors with Automatic Post-Editing in LLM Translation Evaluators

**Authors:** Qingyu Lu, Liang Ding, Kanjian Zhang, Jinxia Zhang, D. Tao

**Year:** 2024 | **Venue:** International Conference on Computational Linguistics | **Citations:** 13 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2409.14335)

> Large Language Models (LLMs) have shown significant potential as judges for Machine Translation (MT) quality assessment, providing both scores and fine-grained feedback. Although approaches such as GEMBA-MQM have shown state-of-the-art performance on reference-free evaluation, the predicted errors do not align well with those annotated by human, limiting their interpretability as feedback signals....

---

## 208. Scaling laws for post-training quantized large language models

**Authors:** Zifei Xu, Alexander Lan, W. Yazar, Tristan Webb, Sayeh Sharify

**Year:** 2024 | **Venue:** ENLSP | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2410.12119)

> Generalization abilities of well-trained large language models (LLMs) are known to scale predictably as a function of model size. In contrast to the existence of practical scaling laws governing pre-training, the quality of LLMs after post-training compression remains highly unpredictable, often requiring case-by-case validation in practice. In this work, we attempted to close this gap for post-tr...

---

## 209. Post-Training Statistical Calibration for Higher Activation Sparsity

**Authors:** Vui Seng Chua, Yujie Pan, Nilesh Jain

**Year:** 2024 | **Venue:** ENLSP | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2412.07174)

> We present Statistical Calibrated Activation Pruning (SCAP), a post-training activation pruning framework that (1) generalizes sparsification by input activations of Fully-Connected layers for generic and flexible application across Transformers, and (2) features a simple Mode-Centering technique to pre-calibrate activation distributions for maximizing post-training sparsity. Our results demonstra...

---

## 210. CrossQuant: A Post-Training Quantization Method with Smaller Quantization Kernel for Precise Large Language Model Compression

**Authors:** Wenyuan Liu, Xindian Ma, Peng Zhang, Yan Wang

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2410.07505)

> Post-Training Quantization (PTQ) is an effective technique for compressing Large Language Models (LLMs). While many studies focus on quantizing both weights and activations, it is still a challenge to maintain the accuracy of LLM after activating quantization. To investigate the primary cause, we extend the concept of kernel from linear algebra to quantization functions to define a new term,"quant...

---

## 211. RLFactory: A Plug-and-Play Reinforcement Learning Post-Training Framework for LLM Multi-Turn Tool-Use

**Authors:** Jiajun Chai, Guojun Yin, Zekun Xu, Chuhuai Yue, Yi Jia

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 8 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2509.06980)

> Large language models excel at basic reasoning but struggle with tasks that require interaction with external tools. We present RLFactory, a plug-and-play reinforcement learning post-training framework for multi-round tool use. RLFactory tackles (i) tool-call stability and adaptability amid tool heterogeneity and interface issues via an asyncio-based asynchronous caller and a decoupled tool/traini...

---

## 212. AdamS: Momentum Itself Can Be A Normalizer for LLM Pretraining and Post-training

**Authors:** Huishuai Zhang, Bohan Wang, Luoxin Chen

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2505.16363)

> We introduce AdamS, a simple yet effective alternative to Adam for large language model (LLM) pretraining and post-training. By leveraging a novel denominator, i.e., the root of weighted sum of squares of the momentum and the current gradient, AdamS eliminates the need for second-moment estimates. Hence, AdamS is efficient, matching the memory and compute footprint of SGD with momentum while deliv...

---

## 213. Asymmetric Conflict and Synergy in Post-training for LLM-based Multilingual Machine Translation

**Authors:** Tong Zheng, Yan Wen, Huiwen Bao, Junfeng Guo, Heng Huang

**Year:** 2025 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2502.11223)

> The emergence of Large Language Models (LLMs) has advanced the multilingual machine translation (MMT), yet the Curse of Multilinguality (CoM) remains a major challenge. Existing work in LLM-based MMT typically mitigates this issue via scaling up training and computation budget, which raises a critical question: Is scaling up the training and computation budget truly necessary for high-quality MMT,...

---

## 214. Got Compute, but No Data: Lessons From Post-training a Finnish LLM

**Authors:** Elaine Zosa, Ville Komulainen, Sampo Pyysalo

**Year:** 2025 | **Venue:** NoDaLiDa/Baltic-HLT | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2503.09407)

> As LLMs gain more popularity as chatbots and general assistants, methods have been developed to enable LLMs to follow instructions and align with human preferences. These methods have found success in the field, but their effectiveness has not been demonstrated outside of high-resource languages. In this work, we discuss our experiences in post-training an LLM for instruction-following for English...

---

## 215. Scaling Behaviors of LLM Reinforcement Learning Post-Training: An Empirical Study in Mathematical Reasoning

**Authors:** Zelin Tan, Hejia Geng, Mulei Zhang, Xiaohan Yu, Guancheng Wan

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2509.25300)

> While scaling laws for large language models (LLMs) during pre-training have been extensively studied, their behavior under reinforcement learning (RL) post-training remains largely unexplored. This paper presents a systematic empirical investigation of scaling behaviors in RL-based post-training, with a particular focus on mathematical reasoning. Based on a set of experiments across the full Qwen...

---

## 216. Role-Based Fault Tolerance System for LLM RL Post-Training

**Authors:** Zhenqian Chen, Baoquan Zhong, Xiang Li, Qing Dai, Xinkui Zhao

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> RL post-training for LLMs has been widely scaled to enhance reasoning and tool-using capabilities. However, RL post-training interleaves training and inference workloads, exposing the system to faults from both sides. Existing fault tolerance frameworks for LLMs target either training or inference, leaving the optimization potential in the asynchronous execution unexplored for RL. Our key insight ...

---

## 217. Bootstrapping Post-Training for LLM Translator

**Authors:** Wenyang Gao, Yafu Li, Qingkai Min, Yue Zhang

**Year:** 2025 | **Venue:** IEEE Transactions on Audio, Speech, and Language Processing | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/TASLPRO.2025.3624962)

> Large language models (LLMs) have shown promising results in machine translation (MT), but their ability to adapt to diverse language use and new domains in real-world deployments remains a challenge. This is further compounded by the scarcity of gold-standard reference translations in practical settings. To address this, we propose a novel bootstrapping approach for LLM translator that leverages ...

---

## 218. CLAQ: Pushing the Limits of Low-Bit Post-Training Quantization for LLMs

**Authors:** Haoyu Wang, Bei Liu, Hang Shao, Bo Xiao, Ke Zeng

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.17233)

> Parameter quantization for Large Language Models (LLMs) has attracted increasing attentions recently in reducing memory costs and improving computational efficiency. Early approaches have been widely adopted. However, the existing methods suffer from poor performance in low-bit (such as 2 to 3 bits) scenarios. In this paper, we present a novel and effective Column-Level Adaptive weight Quantizatio...

---

## 219. Human Review for Post-Training Improvement of Low-Resource Language Performance in Large Language Models

**Authors:** Delta-Marie Lewis, Brian DeRenzi, Amos Misomali, Themba Nyirenda, Everlisto Phiri

**Year:** 2024 | **Venue:** IEEE International Conference on Healthcare Informatics | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/ICHI61247.2024.00095)

> Large language models (LLMs) have significantly improved natural language processing, holding the potential to support health workers and their clients directly. Unfortunately, there is a substantial and variable drop in performance for low-resource languages. This paper presents an exploratory case study in Malawi, aiming to enhance the performance of LLMs in Chichewa through innovative prompt en...

---

## 220. Automatic Pair Construction for Contrastive Post-training

**Authors:** Canwen Xu, Corby Rosset, Luciano Del Corro, Shweti Mahajan, Julian J. McAuley

**Year:** 2023 | **Venue:** NAACL-HLT | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.18653/v1/2024.findings-naacl.11)

> Alignment serves as an important step to steer large language models (LLMs) towards human preferences. In this paper, we propose an automatic way to construct contrastive data for LLM, using preference pairs from multiple models of varying strengths (e.g., InstructGPT, ChatGPT and GPT-4). We compare the contrastive techniques of SLiC and DPO to SFT baselines and find that DPO provides a step-funct...

---

## 221. SpinQuant: LLM quantization with learned rotations

**Authors:** Zechun Liu, Changsheng Zhao, Igor Fedorov, Bilge Soran, Dhruv Choudhary

**Year:** 2024 | **Venue:** International Conference on Learning Representations | **Citations:** 227 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.16406)

> Post-training quantization (PTQ) techniques applied to weights, activations, and the KV cache greatly reduce memory usage, latency, and power consumption of Large Language Models (LLMs), but may lead to large quantization errors when outliers are present. Rotating activation or weight matrices helps remove outliers and benefits quantization. In this work, we identify a collection of applicable rot...

---

## 222. CosyVoice 3: Towards In-the-wild Speech Generation via Scaling-up and Post-training

**Authors:** Zhihao Du, Changfeng Gao, Yuxuan Wang, Fan Yu, Tianyu Zhao

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 51 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2505.17589)

> In our prior works, we introduced a scalable streaming speech synthesis model, CosyVoice 2, which integrates a large language model (LLM) and a chunk-aware flow matching (FM) model, and achieves low-latency bi-streaming speech synthesis and human-parity quality. Despite these advancements, CosyVoice 2 exhibits limitations in language coverage, domain diversity, data volume, text formats, and post-...

---

## 223. Modifying Large Language Model Post-Training for Diverse Creative Writing

**Authors:** John Joon Young Chung, Vishakh Padmakumar, Melissa Roemmele, Yuqian Sun, Max Kreminski

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 17 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2503.17126)

> As creative writing tasks do not have singular correct answers, large language models (LLMs) trained to perform these tasks should be able to generate diverse valid outputs. However, LLM post-training often focuses on improving generation quality but neglects to facilitate output diversity. Hence, in creative writing generation, we investigate post-training approaches to promote both output divers...

---

## 224. How Instruction and Reasoning Data shape Post-Training: Data Quality through the Lens of Layer-wise Gradients

**Authors:** Ming Li, Yanhong Li, Ziyue Li, Tianyi Zhou

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 7 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2504.10766)

> As the post-training of large language models (LLMs) advances from instruction-following to complex reasoning tasks, understanding how different data affect finetuning dynamics remains largely unexplored. In this paper, we present a spectral analysis of layer-wise gradients induced by low/high-quality instruction and reasoning data for LLM post-training. Our analysis reveals that widely-studied me...

---

## 225. KDRL: Post-Training Reasoning LLMs via Unified Knowledge Distillation and Reinforcement Learning

**Authors:** Hongling Xu, Qi Zhu, Heyuan Deng, Jinpeng Li, Lu Hou

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 6 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2506.02208)

> Recent advances in large language model (LLM) post-training have leveraged two distinct paradigms to enhance reasoning capabilities: reinforcement learning (RL) and knowledge distillation (KD). While RL enables the emergence of complex reasoning behaviors, it often suffers from low sample efficiency when the initial policy struggles to explore high-reward trajectories. Conversely, KD improves lear...

---

## 226. Reasoning Like an Economist: Post-Training on Economic Problems Induces Strategic Generalization in LLMs

**Authors:** Yufa Zhou, Shaobo Wang, Xingyu Dong, Xiangqi Jin, Yifang Chen

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2506.00577)

> Directly training Large Language Models (LLMs) for Multi-Agent Systems (MAS) remains challenging due to intricate reward modeling, dynamic agent interactions, and demanding generalization requirements. This paper explores whether post-training techniques, specifically Supervised Fine-Tuning (SFT) and Reinforcement Learning with Verifiable Rewards (RLVR), can effectively $\textit{generalize}$ to mu...

---

## 227. A Method of Efficient Synthesizing Post-disaster Remote Sensing Image with Diffusion Model and LLM

**Authors:** Ruizhe Ou, Haotian Yan, Ming Wu, Chuang Zhang

**Year:** 2023 | **Venue:** Asia-Pacific Signal and Information Processing Association Annual Summit and Conference | **Citations:** 9 | **Score:** 0.000

[DOI](https://doi.org/10.1109/APSIPAASC58517.2023.10317383)

> Due to the fact that current deep learning models are typically driven by big data, existing interpretation models for emergency management lack relevant learning data. However, existing pre-trained image generative models cannot directly generate post-disaster remote sensing images without fine-tuning. In this paper, we demonstrate the ability of natural language guidance synthesizing remote sens...

---

## 228. Sailing AI by the Stars: A Survey of Learning from Rewards in Post-Training and Test-Time Scaling of Large Language Models

**Authors:** Xiaobao Wu

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 8 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2505.02686)

> ...

---

## 229. RL in Name Only? Analyzing the Structural Assumptions in RL post-training for LLMs

**Authors:** S. R. Samineni, Durgesh Kalwar, Karthik Valmeekam, Kaya Stechly, Subbarao Kambhampati

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 6 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2505.13697)

> Reinforcement learning-based post-training of large language models (LLMs) has recently gained attention, particularly following the release of DeepSeek R1, which applied GRPO for fine-tuning. Amid the growing hype around improved reasoning abilities attributed to RL post-training, we critically examine the formulation and assumptions underlying these methods. We start by highlighting the popular ...

---

## 230. Post-Training Large Language Models via Reinforcement Learning from Self-Feedback

**Authors:** Carel van Niekerk, Renato Vukovic, Benjamin Matthias Ruppik, Hsien-Chin Lin, Milica Gavsi'c

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2507.21931)

> Large Language Models (LLMs) often produce plausible but poorly-calibrated answers, limiting their reliability on reasoning-intensive tasks. We present Reinforcement Learning from Self-Feedback (RLSF), a post-training stage that uses the model's own confidence as an intrinsic reward, mimicking how humans learn in the absence of external feedback. After a frozen LLM generates several chain-of-thoug...

---

## 231. Addressing Activation Outliers in LLMs: A Systematic Review of Post-Training Quantization Techniques

**Authors:** Patrik Czakó, Gábor Kertész, S. Szénási

**Year:** 2025 | **Venue:** IEEE Access | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.1109/ACCESS.2025.3568702)

> Large Language Models (LLMs) have transformed natural language processing, yet their deployment remains challenging due to substantial computational, memory, and energy demands. Post-training quantization has emerged as a key strategy for enabling efficient inference, particularly in resource-constrained settings. This systematic review focuses on weight-activation quantization, with a unique emph...

---

## 232. Front-Loading Reasoning: The Synergy between Pretraining and Post-Training Data

**Authors:** Syeda Nahida Akter, Shrimai Prabhumoye, Eric Nyberg, M. Patwary, M. Shoeybi

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 4 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2510.03264)

> The prevailing paradigm for enhancing the reasoning abilities of LLMs revolves around post-training on high-quality, reasoning-intensive data. While emerging literature suggests that reasoning data is increasingly incorporated also during the mid-training stage-a practice that is relatively more proprietary and less openly characterized-the role of such data in pretraining remains unclear. In part...

---

## 233. UniAttn: Reducing Inference Costs via Softmax Unification for Post-Training LLMs

**Authors:** Yizhe Xiong, Wei Huang, Xin Ye, Hui Chen, Zijia Lin

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 4 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2502.00439)

> Post-training is essential for adapting Large Language Models (LLMs) to real-world applications. Deploying post-trained models faces significant challenges due to substantial memory overhead and noticeable inference latency. Existing work has identified significant redundancies in LLMs and proposed efficient architectures, namely intra-layer KV sharing and cross-layer KV sharing. However, intra-la...

---

## 234. Direct Post-Training Preference Alignment for Multi-Agent Motion Generation Models Using Implicit Feedback from Pre-training Demonstrations

**Authors:** Ran Tian, Kratarth Goel

**Year:** 2025 | **Venue:** International Conference on Learning Representations | **Citations:** 4 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2503.20105)

> Recent advancements in LLMs have revolutionized motion generation models in embodied applications. While LLM-type auto-regressive motion generation models benefit from training scalability, there remains a discrepancy between their token prediction objectives and human preferences. As a result, models pre-trained solely with token-prediction objectives often generate behaviors that deviate from wh...

---

## 235. Detecting Data Contamination from Reinforcement Learning Post-training for Large Language Models

**Authors:** Yongding Tao, Tian Wang, Yihong Dong, Huanyu Liu, Kechi Zhang

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2510.09259)

> Data contamination poses a significant threat to the reliable evaluation of Large Language Models (LLMs). This issue arises when benchmark samples may inadvertently appear in training sets, compromising the validity of reported performance. While detection methods have been developed for the pre-training and Supervised Fine-Tuning stages, a critical research gap exists for the increasingly signifi...

---

## 236. PoTPTQ: A Two-step Power-of-Two Post-training for LLMs

**Authors:** Xinyu Wang, Vahid Partovi Nia, Peng Lu, Jerry Huang, Xiao-Wen Chang

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2507.11959)

> Large Language Models (LLMs) have demonstrated remarkable performance across various natural language processing (NLP) tasks. However, their deployment is challenging due to the substantial computational resources required. Power-of-two (PoT) quantization is a general tool to counteract this difficulty. Albeit previous works on PoT quantization can be efficiently dequantized on CPUs using fixed-po...

---

## 237. VLMQ: Efficient Post-Training Quantization for Large Vision-Language Models via Hessian Augmentation

**Authors:** Yufei Xue, Yushi Huang, Jiawei Shao, Jun Zhang

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2508.03351)

> Post-training quantization (PTQ) has emerged as an effective approach for compressing large models and accelerating their inference without retraining. While PTQ has been extensively studied in the context of large language models (LLMs), its applicability to vision-language models (VLMs) remains underexplored. In this paper, we identify a modality discrepancy (\emph{i.e.}, limited text tokens \em...

---

## 238. Inverse Reinforcement Learning Meets Large Language Model Post-Training: Basics, Advances, and Opportunities

**Authors:** Hao Sun, M. Schaar

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2507.13158)

> In the era of Large Language Models (LLMs), alignment has emerged as a fundamental yet challenging problem in the pursuit of more reliable, controllable, and capable machine intelligence. The recent success of reasoning models and conversational AI systems has underscored the critical role of reinforcement learning (RL) in enhancing these systems, driving increased research interest at the interse...

---

## 239. Small and Fast LLMs on Commodity Hardware: Post-Training Quantization in llama. cpp

**Authors:** Lorenz Sparrenberg, Tobias Deuβer, Armin Berger, R. Sifa

**Year:** 2025 | **Venue:** International Conference on Data Science and Advanced Analytics | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/DSAA65442.2025.11247985)

> Large Language Models (LLMs) have demonstrated remarkable capabilities but their significant computational and memory demands hinder widespread deployment, especially on resource-constrained devices. Quantization, the process of reducing the numerical precision of model parameters, has emerged as a critical technique for compressing LLMs and accelerating inference. This paper provides an overview ...

---

## 240. Lightweight error mitigation strategies for post-training N:M activation sparsity in LLMs

**Authors:** Shirin Alanova, Kristina Kazistova, Ekaterina Galaeva, Alina Kostromina, Vladimir Smirnov

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2509.22166)

> The demand for efficient large language model (LLM) inference has intensified the focus on sparsification techniques. While semi-structured (N:M) pruning is well-established for weights, its application to activation pruning remains underexplored despite its potential for dynamic, input-adaptive compression and reductions in I/O overhead. This work presents a comprehensive analysis of methods for ...

---

## 241. Efficient and Accurate Post-Training Sparsification of Large Language Models with Proximal Operators

**Authors:** Pu Zhao, Dani Gunawan, Xuan Shen, Zheng Zhan, Xuehang Guo

**Year:** 2025 | **Venue:** Proceedings of the 3rd International Workshop on Rich Media With Generative AI | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1145/3746262.3761975)

> Deploying large language models (LLMs) faces great challenges because of their massive parameters and computations. Traditional pruning methods can hardly be applied for LLMs due to their high GPU and data consumption for fine-tuning or retraining on the full dataset. In response, post-training techniques with reduced resource requirements have gained increasing popularity, as it typically does no...

---

## 242. Bias Mitigation Techniques in Large Language Models: An Empirical Evaluation of Post-Training and In-Training Approaches

**Authors:** Suxuan Liu

**Year:** 2025 | **Venue:** Journal of Computer Science and Artificial Intelligence | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.54097/kptt9j67)

> The proliferation of large language models (LLMs) in critical applications has intensified concerns about embedded social biases that can perpetuate discrimination and inequality. While numerous bias mitigation techniques have been proposed, systematic comparison of intervention timing pacifically in-training versus post-training approaches remains limited. This paper presents a comprehensive empi...

---

## 243. TeachLM: Post-Training LLMs for Education Using Authentic Learning Data

**Authors:** Janos Perczel, Jin Chow, Dorottya Demszky

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2510.05087)

> The promise of generative AI to revolutionize education is constrained by the pedagogical limits of large language models (LLMs). A major issue is the lack of access to high-quality training data that reflect the learning of actual students. Prompt engineering has emerged as a stopgap, but the ability of prompts to encode complex pedagogical strategies in rule-based natural language is inherently ...

---

## 244. Can Large Language Models Develop Strategic Reasoning? Post-training Insights from Learning Chess

**Authors:** Dongyoon Hwang, Hojoon Lee, J. Choo, Dongmin Park, Jongho Park

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2507.00726)

> While reinforcement learning (RL) for large language models (LLMs) has shown promise in mathematical reasoning, strategic reasoning for LLMs using RL remains largely unexplored. We investigate whether LLMs can develop strategic reasoning capabilities through RL in chess. To this end, we leverage a chess-pretrained action-value network to provide dense reward on the LLM's output move quality, which...

---

## 245. Beneficial Reasoning Behaviors in Agentic Search and Effective Post-training to Obtain Them

**Authors:** Jiahe Jin, Abhijay Paladugu, Chenyan Xiong

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2510.06534)

> Agentic search leverages LLMs to solve complex user information needs by executing a multi-step process of planning, searching, and synthesizing information to provide answers. This paradigm introduces unique challenges for LLMs'agentic reasoning capabilities when interacting with search systems. In this paper, we propose an LLM-based pipeline to study effective reasoning behavior patterns in agen...

---

## 246. LLM-Pruner: On the Structural Pruning of Large Language Models

**Authors:** Xinyin Ma, Gongfan Fang, Xinchao Wang

**Year:** 2023 | **Venue:** Neural Information Processing Systems | **Citations:** 645 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2305.11627) | [DOI](https://doi.org/10.48550/arXiv.2305.11627)

> Large language models (LLMs) have shown remarkable capabilities in language understanding and generation. However, such impressive capability typically comes with a substantial model size, which presents significant challenges in both the deployment, inference, and training stages. With LLM being a general-purpose task solver, we explore its compression in a task-agnostic manner, which aims to pre...

---

## 247. LlamaRL: A Distributed Asynchronous Reinforcement Learning Framework for Efficient Large-scale LLM Training

**Authors:** Bo Wu, Sid Wang, Yunhao Tang, Jia Ding, Eryk Helenowski

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 16 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2505.24034)

> Reinforcement Learning (RL) has become the most effective post-training approach for improving the capabilities of Large Language Models (LLMs). In practice, because of the high demands on latency and memory, it is particularly challenging to develop an efficient RL framework that reliably manages policy models with hundreds to thousands of billions of parameters. In this paper, we present LlamaRL...

---

## 248. OpenCSG Chinese Corpus: A Series of High-quality Chinese Datasets for LLM Training

**Authors:** Yijiong Yu, Ziyun Dai, Z. Wang, Wei Wang, Ran Chen

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 8 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2501.08197)

> Large language models (LLMs) have demonstrated remarkable capabilities, but their success heavily relies on the quality of pretraining corpora. For Chinese LLMs, the scarcity of high-quality Chinese datasets presents a significant challenge, often limiting their performance. To address this issue, we propose the OpenCSG Chinese Corpus, a series of high-quality datasets specifically designed for LL...

---

## 249. A Survey on LLM Mid-training

**Authors:** Chengying Tu, Xuemiao Zhang, Rongxiang Weng, Rumei Li, Chen Zhang

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2510.23081)

> Recent advances in foundation models have highlighted the significant benefits of multi-stage training, with a particular emphasis on the emergence of mid-training as a vital stage that bridges pre-training and post-training. Mid-training is distinguished by its use of intermediate data and computational resources, systematically enhancing specified capabilities such as mathematics, coding, reason...

---

## 250. Reinforce-Ada: An Adaptive Sampling Framework for Reinforce-Style LLM Training

**Authors:** Wei Xiong, Chen Ye, Baohao Liao, Hanze Dong, Xinxing Xu

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2510.04996)

> ...

---

## 251. Memorization Sinks: Isolating Memorization during LLM Training

**Authors:** Gaurav R. Ghosal, Pratyush Maini, Aditi Raghunathan

**Year:** 2025 | **Venue:** International Conference on Machine Learning | **Citations:** 4 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2507.09937)

> Large language models are susceptible to memorizing repeated sequences, posing privacy and copyright concerns. A popular mitigation strategy is to remove memorized information from specific neurons post-hoc. However, such approaches have shown limited success so far. In a controlled setting, we show that the memorization of natural sequences (those that resemble linguistically plausible text) beco...

---

## 252. GPTVQ: The Blessing of Dimensionality for LLM Quantization

**Authors:** M. V. Baalen, Andrey Kuzmin, Markus Nagel, Peter Couperus, Cédric Bastoul

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 50 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2402.15319)

> In this work we show that the size versus accuracy trade-off of neural network quantization can be significantly improved by increasing the quantization dimensionality. We propose the GPTVQ method, a new fast method for post-training vector quantization (VQ) that scales well to Large Language Models (LLMs). Our method interleaves quantization of one or more columns with updates to the remaining un...

---

## 253. Any-Precision LLM: Low-Cost Deployment of Multiple, Different-Sized LLMs

**Authors:** Yeonhong Park, Jake Hyun, SangLyul Cho, Bonggeun Sim, Jae W. Lee

**Year:** 2024 | **Venue:** International Conference on Machine Learning | **Citations:** 39 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2402.10517)

> Recently, considerable efforts have been directed towards compressing Large Language Models (LLMs), which showcase groundbreaking capabilities across diverse applications but entail significant deployment costs due to their large sizes. Meanwhile, much less attention has been given to mitigating the costs associated with deploying multiple LLMs of varying sizes despite its practical significance. ...

---

## 254. SliM-LLM: Salience-Driven Mixed-Precision Quantization for Large Language Models

**Authors:** Wei Huang, Haotong Qin, Yangdong Liu, Yawei Li, Xianglong Liu

**Year:** 2024 | **Venue:** International Conference on Machine Learning | **Citations:** 33 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.14917)

> Post-training quantization (PTQ) is an effective technique for compressing large language models (LLMs). However, while uniform-precision quantization is computationally efficient, it often compromises model performance. To address this, we propose SliM-LLM, a salience-driven mixed-precision quantization framework that allocates bit-widths at the group-wise. Our approach leverages the observation ...

---

## 255. FlatQuant: Flatness Matters for LLM Quantization

**Authors:** Yuxuan Sun, Ruikang Liu, Haoli Bai, Han Bao, Kang Zhao

**Year:** 2024 | **Venue:** International Conference on Machine Learning | **Citations:** 28 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2410.09426)

> Recently, quantization has been widely used for the compression and acceleration of large language models (LLMs). Due to the outliers in LLMs, it is crucial to flatten weights and activations to minimize quantization error with equally spaced quantization points. Prior research explores various pre-quantization transformations to suppress outliers, such as per-channel scaling and Hadamard transfor...

---

## 256. Citation-Enhanced Generation for LLM-based Chatbots

**Authors:** Weitao Li, Junkai Li, Weizhi Ma, Yang Liu

**Year:** 2024 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 33 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2402.16063) | [DOI](https://doi.org/10.18653/v1/2024.acl-long.79)

> Large language models (LLMs) exhibit powerful general intelligence across diverse scenarios, including their integration into chatbots. However, a vital challenge of LLM-based chatbots is that they may produce hallucinated content in responses, which significantly limits their applicability. Various efforts have been made to alleviate hallucination, such as retrieval augmented generation and reinf...

---

## 257. MAPoRL: Multi-Agent Post-Co-Training for Collaborative Large Language Models with Reinforcement Learning

**Authors:** Chanwoo Park, Seungju Han, Xingzhi Guo, A. Ozdaglar, Kaiqing Zhang

**Year:** 2025 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 35 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2502.18439)

> Leveraging multiple large language models (LLMs) to build collaborative multi-agentic workflows has demonstrated significant potential. However, most previous studies focus on prompting the out-of-the-box LLMs, relying on their innate capability for collaboration, which may not improve LLMs'performance as shown recently. In this paper, we introduce a new post-training paradigm MAPoRL (Multi-Agent ...

---

## 258. ABQ-LLM: Arbitrary-Bit Quantized Inference Acceleration for Large Language Models

**Authors:** Chao Zeng, Songwei Liu, Yusheng Xie, Hong Liu, Xiaojian Wang

**Year:** 2024 | **Venue:** AAAI Conference on Artificial Intelligence | **Citations:** 17 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2408.08554)

> Large Language Models (LLMs) have revolutionized natural language processing tasks. However, their practical application is constrained by substantial memory and computational demands. Post-training quantization (PTQ) is considered an effective method to accelerate LLM inference. Despite its growing popularity in LLM model compression, PTQ deployment faces two major challenges. First, low-bit quan...

---

## 259. ARB-LLM: Alternating Refined Binarizations for Large Language Models

**Authors:** Zhiteng Li, Xianglong Yan, Tianao Zhang, Haotong Qin, Dong Xie

**Year:** 2024 | **Venue:** International Conference on Learning Representations | **Citations:** 18 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2410.03129)

> Large Language Models (LLMs) have greatly pushed forward advancements in natural language processing, yet their high memory and computational demands hinder practical deployment. Binarization, as an effective compression technique, can shrink model weights to just 1 bit, significantly reducing the high demands on computation and memory. However, current binarization methods struggle to narrow the ...

---

## 260. I-LLM: Efficient Integer-Only Inference for Fully-Quantized Low-Bit Large Language Models

**Authors:** Xing Hu, Yuan Cheng, Dawei Yang, Zhihang Yuan, Jiangyong Yu

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 16 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.17849)

> Post-training quantization (PTQ) serves as a potent technique to accelerate the inference of large language models (LLMs). Nonetheless, existing works still necessitate a considerable number of floating-point (FP) operations during inference, including additional quantization and de-quantization, as well as non-linear operators such as RMSNorm and Softmax. This limitation hinders the deployment of...

---

## 261. LLM-FP4: 4-Bit Floating-Point Quantized Transformers

**Authors:** Shih-Yang Liu, Zechun Liu, Xijie Huang, Pingcheng Dong, Kwang-Ting Cheng

**Year:** 2023 | **Venue:** Conference on Empirical Methods in Natural Language Processing | **Citations:** 89 | **Score:** 0.000

[PDF](https://aclanthology.org/2023.emnlp-main.39.pdf) | [DOI](https://doi.org/10.18653/v1/2023.emnlp-main.39)

> We propose LLM-FP4 for quantizing both weights and activations in large language models (LLMs) down to 4-bit floating-point values, in a post-training manner. Existing post-training quantization (PTQ) solutions are primarily integer-based and struggle with bit widths below 8 bits. Compared to integer quantization, floating-point (FP) quantization is more flexible and can better handle long-tail or...

---

## 262. PB-LLM: Partially Binarized Large Language Models

**Authors:** Yuzhang Shang, Zhihang Yuan, Qiang Wu, Zhen Dong

**Year:** 2023 | **Venue:** International Conference on Learning Representations | **Citations:** 76 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2310.00034) | [DOI](https://doi.org/10.48550/arXiv.2310.00034)

> This paper explores network binarization, a radical form of quantization, compressing model weights to a single bit, specifically for Large Language Models (LLMs) compression. Due to previous binarization methods collapsing LLMs, we propose a novel approach, Partially-Binarized LLM (PB-LLM), which can achieve extreme low-bit quantization while maintaining the linguistic reasoning capacity of quant...

---

## 263. MBBo-RPSLD: Training a Multimodal BlenderBot for Rehabilitation in Post-Stroke Language Disorder.

**Authors:** Yangyang Guo, Airu Huang, Bo Peng, Yufeng Li, Wei Gu

**Year:** 2025 | **Venue:** IEEE journal of biomedical and health informatics | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.1109/JBHI.2025.3554331)

> Stroke, a severe cerebrovascular event, can lead to motor deficits and often impairs language, affecting quality of life. Thus, developing effective rehabilitation models is crucial for enhancing language function and well-being in stroke patients. This paper presents the Multi-Blender model, designed to address the challenges of multimodal data processing and the complexity of medical dialogue in...

---

