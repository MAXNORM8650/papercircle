# Research Papers: computational efficiency optimization techniques large language models

Updated: 2026-01-01 21:45
Total: 118 papers

---

## 1. Towards Efficient Mixture of Experts: A Holistic Study of Compression Techniques

**Authors:** Shwai He, Daize Dong, Liang Ding, Ang Li

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Scaling large language models has driven remarkable advancements across various
domains, yet the continual increase in model size presents significant challenges
for real-world deployment. The Mixture of Experts (MoE) architecture offers a
promising solution by dynamically selecting and activating only a subset of experts
during inference, thus substantially reducing computational costs while pres...

---

## 2. P-BERT: Hardware-Aware Optimization of BERT Using Evolutionary Techniques

**Authors:** Lim Sze Ying, Zhehui Wang, Rick Siow Mong Goh, Tao Luo

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Transformer-based models have emerged as the go-to standards in Natural Language Processing (NLP), revolutionizing the landscape of NLP applications. As complex models continue to proliferate, the need for more efficient computational processing becomes increasingly imperative. This has led to the rise of model compression techniques, implemented to target computational inefficiencies. Expounding ...

---

## 3. LLMCBench: Benchmarking Large Language Model Compression for Efficient Deployment

**Authors:** Ge Yang, Changyi He, Jinyang Guo, Jianyu Wu, Yifu Ding

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=wmO7z57wNK) | > Although large language models (LLMs) have demonstrated their strong intelligence ability, the high demand for computation and storage hinders their practical application. To this end, many model compression techniques are proposed to increase the efficiency of LLMs. However, current researches only validate their methods on limited models, datasets, metrics, etc, and still lack a comprehensive ev...

---

## 4. Finite-State Autoregressive Entropy Coding for Efficient Learned Lossless Compression

**Authors:** Yufeng Zhang, Hang Yu, Jianguo Li, Weiyao Lin

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=D5mJSNtUtv) | > Learned lossless data compression has garnered significant attention recently due to its superior compression ratios compared to traditional compressors. However, the computational efficiency of these models jeopardizes their practicality. This paper proposes a novel system for improving the compression ratio while maintaining computational efficiency for learned lossless data compression. Our app...

---

## 5. ZSMerge: Zero-Shot KV Cache Compression for Memory-Efficient Long-Context LLMs

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> The linear growth of key-value (KV) cache memory and quadratic computational complexity in attention mechanisms pose significant bottlenecks for large language models (LLMs) in long-context processing. While existing KV cache optimization methods address these challenges through token pruning or feature merging, they often incur irreversible information loss or require costly retraining. To this e...

---

## 6. Fusion Token: Enhancing Compression and Efficiency in Language Model Tokenization

**Authors:** Robert Kwiatkowski, Zijian Wang, Robert Giaquinto, Varun Kumar, Xiaofei Ma

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> In the realm of language models, data encoding is pivotal, influencing efficiency and effectiveness of model training. Byte Pair Encoding (BPE) is a well-established subword tokenization technique that balances computational efficiency and linguistic expressiveness by merging frequent byte or character pairs.
As language model training requires substantial computational resources, we propose Fusio...

---

## 7. Thanos: A Block-wise Pruning Algorithm for Efficient Large Language Model Compression

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> This paper presents Thanos, a novel weight-pruning algorithm designed to reduce the memory footprint and enhance the computational efficiency of large language models (LLMs) by removing redundant weights while maintaining accuracy. Thanos introduces a block-wise pruning strategy with adaptive masks that dynamically adjust to weight importance, enabling flexible sparsity patterns and structured for...

---

## 8. Dense2MoE: Unifying Pruning and Upcycling for Efficient Large Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> The Mixture of Experts (MoE) architecture has become a mainstream design in Large Language Models (LLMs) for its ability to flexibly scale parameters while maintaining inference efficiency. However, training MoE models from scratch remains prohibitively expensive due to their high computational demands. Existing upcycling methods reduce costs by converting dense LLMs into MoEs through layer duplic...

---

## 9. PV-Tuning: Beyond Straight-Through Estimation for Extreme LLM Compression

**Authors:** Vladimir Malinovskii, Denis Mazur, Ivan Ilin, Denis Kuznedelev, Konstantin Pavlovich Burlachenko

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=YvA8UF0I37) | > There has been significant interest in "extreme" compression of large language models (LLMs), i.e. to 1-2 bits per parameter, which allows such models to be executed efficiently on resource-constrained devices.  
Existing work focused on improved one-shot quantization techniques and weight representations; yet, purely post-training  approaches are reaching diminishing returns in terms of the accur...

---

## 10. No Loss, No Gain: Gated Refinement and Adaptive Compression for Prompt Optimization

**Authors:** Wenhang Shi, Yiren Chen, Shuqing Bian, Xinyi Zhang, Kai Tang

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Prompt engineering is crucial for leveraging the full potential of large language models (LLMs). While automatic prompt optimization offers a scalable alternative to costly manual design, generating effective prompts remains challenging. Existing methods often struggle to stably generate improved prompts, leading to low efficiency, and overlook that prompt optimization easily gets trapped in local...

---

## 11. Efficient Multi-modal Large Language Models via Progressive Consistency Distillation

**Authors:** Zichen Wen, Shaobo Wang, Yufa Zhou, Junyuan Zhang, Qintong Zhang

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Visual tokens consume substantial computational resources in multi-modal large models (MLLMs), significantly compromising their efficiency. Recent works have attempted to improve efficiency by compressing visual tokens during training, either through modifications to model components or by introducing additional parameters. However, they often overlook the increased learning difficulty caused by s...

---

## 12. SLIM: Structure-aware Low-rank Inference Model

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> This paper introduces a new method for the low-rank compression of large language models. Existing techniques typically compress the weights individually, overlooking the internal dependencies within a transformer block. To address this limitation, we formulate a joint optimization problem to find the optimal low-rank weights for an entire transformer block, thereby minimizing the output reconstru...

---

## 13. LaCo: Efficient Layer-wise Compression of Visual Tokens for Multimodal Large Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Existing visual token compression methods for Multimodal Large Language Models (MLLMs) predominantly operate as post-encoder modules, limiting efficiency.
% limiting their potential for efficiency gains.
To address this limitation, we propose LaCo (Layer-wise Visual Token Compression), a novel framework for effective token compression within the vision encoder's intermediate layers. LaCo introduce...

---

## 14. Less Is More, but Where? Dynamic Token Compression via LLM-Guided Keyframe Prior

**Authors:** Yulin Li, Haokun GUI, Ziyang Fan, Junjie Wang, Bin Kang

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Recent advances in Video Large Language Models (VLLMs) have achieved remarkable video understanding capabilities, yet face critical efficiency bottlenecks due to quadratic computational growth with lengthy visual token sequences of long videos. While existing keyframe sampling methods can improve temporal modeling efficiency, additional computational cost is introduced before feature encoding, and...

---

## 15. Gradient-Constrained Training for Distributed Large Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Computational constraints make distributed architectures essential for working with large-Language models (LLMs), while inter-node gradient synchronization often becomes a major bottleneck in the distributed parallel training. Current compression techniques mainly aim to reduce communication volume for the computed gradients, instead of generating gradients with inherent sparsity directly during t...

---

## 16. Efficient Low-rank and Sparse Approximation and Adaptation for Large Language Models

**Authors:** Haoxian Chen, Likang Wu, Ming He, Jianping Fan, Limin Wang

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) have recently emerged as a significant advancement in natural language processing; however, their large scale and computational complexity make deployment a challenge. Model pruning has emerged as a post-training strategy to reduce LLMs' memory and computation needs. Despite notable progress, these techniques show a reduction in performance and necessitate post-pruning...

---

## 17. Glance2Gaze: Efficient Vision-Language Models from Glance Fusion to Gaze Compression

**Authors:** Juan Chen, Honglin liu, Yingying Ao, Ting Zhang, Yan Huang

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Vision-language models heavily rely on visual representations, yet ensuring its efficiency remains a critical challenge. Most existing approaches focus on reducing visual tokens either at the visual encoder phase or during the LLM decoder stage. Inspired by human visual cognition, where an initial global glance precedes focused attention on semantically salient regions, we introduce Glance2Gaze, a...

---

## 18. Layer-wise Sensitivity-aware Sparsity Allocation for Efficient LLM Inference

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Model (LLM) inference presents substantial computational challenges when executed on commodity hardware, thereby necessitating the development of efficient acceleration techniques. While existing approaches predominantly focus on uniform compression strategies, they neglect the heterogeneous sensitivity patterns exhibited across different transformer layers. In this paper, we introd...

---

## 19. Deep Low Rank Projector for KV Cache Compression

**Authors:** Suhyun Kang, Yujee Song, Kyenghun Lee, Hyeonmok Ko

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) have become integral to a wide range of natural language processing tasks. A key component enabling fast autoregressive inference in LLMs is the Key-Value~(KV) cache, which stores hidden states across decoding steps. However, the KV cache imposes substantial memory overhead, especially in long-context generation. While recent studies have proposed various compression t...

---

## 20. Efficient Prompt Compression with Evaluator Heads for Long-Context Transformer Inference

**Authors:** Weizhi Fei, Xueyan Niu, XIE GUOQING, Yingqing Liu, Bo Bai

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Although applications involving long-context inputs are crucial for the effective utilization of large language models (LLMs), they also result in increased computational costs and reduced performance. To address this challenge, we propose an efficient, training-free prompt compression method that retains key information within compressed prompts. We identify specific attention heads in transforme...

---

## 21. KV-Distill: Nearly Lossless Context Compression for Transformers

**Authors:** Vivek Chari, Guanghui Qin, Benjamin Van Durme

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Sequence-to-sequence natural language tasks often benefit greatly from long contexts, but the quadratic complexity of self-attention renders usage of long contexts non-trivial. In particular, during generation, temporary representations (stored in the KV cache) account for a large portion of GPU memory usage, and scale linearly with context length. In this work, we introduce KV-Distill, a flexible...

---

## 22. SVD-LLM: Truncation-aware Singular Value Decomposition for Large Language Model Compression

**Authors:** Xin Wang, Yu Zheng, Zhongwei Wan, Mi Zhang

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=LNYIUouhdt) | > The advancements in Large Language Models (LLMs) have been hindered by
their substantial sizes, which necessitates LLM compression methods for practical
deployment. Singular Value Decomposition (SVD) offers a promising solution for
LLM compression. However, state-of-the-art SVD-based LLM compression meth-
ods have two key limitations: truncating smaller singular values may lead to higher
compressi...

---

## 23. MoDeGPT: Modular Decomposition for Large Language Model Compression

**Authors:** Chi-Heng Lin, Shangqian Gao, James Seale Smith, Abhishek Patel, Shikhar Tuli

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=8EfxjTCg2k) | > Large Language Models (LLMs) have significantly advanced AI with their exceptional performance across a wide range of tasks. However, their extensive computational requirements restrict their use on devices with limited resources.
While recent compression methods based on low-rank matrices show potential
solutions, they often suffer from significant loss of accuracy or introduce substantial
overhe...

---

## 24. HAPPI: Efficient KV cache compression with Hadamard PCA-based Power iteration

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Truncated Singular Value Decomposition (SVD) has recently attracted renewed attention for its effectiveness in model optimizations, such as LoRA initialization and KV-cache compression. However, exact SVD remains computationally expensive, while approximate methods like power iteration often introduce non-negligible errors. In this paper, we present Hadamard PCA-based Power Iteration (HaPPI), a ne...

---

## 25. CompLLM: Compression for Long Context Q&A

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) face significant computational challenges when processing long contexts due to the quadratic complexity of self-attention. While soft context compression methods, which map input text to smaller latent representations, have shown promise, their real-world adoption is limited. Existing techniques typically compress the context as a single unit, which leads to quadratic ...

---

## 26. TGRS: Teacher-Guided Rank-Sensitive Quantization for Large Language Models

**Authors:** Sinuo Fan, Yingjie Lao

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Compression techniques such as quantization and low-rank approximation have enabled large language models (LLMs) to run on resource-constrained hardware, but they often fall short in capturing the heterogeneous sensitivity of model components. In this paper, we propose **Teacher-Guided Rank Sensitivity (TGRS)**, a novel LLM compression framework that uses a data-informed, direction-level sensitivi...

---

## 27. Extreme Language Model Compression with Optimal Subwords and Shared Projections

**Authors:** Sanqiang Zhao, Raghav Gupta, Yang Song, Denny Zhou

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Pre-trained deep neural network language models such as ELMo, GPT, BERT and XLNet have recently achieved state-of-the-art performance on a variety of language understanding tasks. However, their size makes them impractical for a number of scenarios, especially on mobile and edge devices. In particular, the input word embedding matrix accounts for a significant proportion of the model's memory foot...

---

## 28. Cache Me If You Must: Adaptive Key-Value Quantization for Large Language Models

**Authors:** Alina Shutova, Vladimir Malinovskii, Vage Egiazarian, Denis Kuznedelev, Denis Mazur

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=COowwJOAZi) | > Efficient real-world deployments of large language models (LLMs) rely on Key-Value (KV) caching for processing and generating long outputs, reducing the need for repetitive computation. For large contexts, Key-Value caches can take up tens of gigabytes of device memory, as they store vector representations for each token and layer. Recent work has shown that the cached vectors can be compressed th...

---

## 29. VisionSelector: End-to-End Learnable Visual Token Compression for Efficient Multimodal LLMs

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Multimodal Large Language Models (MLLMs) encounter significant computational and memory bottlenecks from the massive number of visual tokens generated by high-resolution images or multi-image inputs. Previous token compression techniques are often constrained by heuristic rules that risk discarding critical information. They may suffer from biases, such as attention sinks, that lead to sharp perfo...

---

## 30. Mixture of Scales: Memory-Efficient Token-Adaptive Binarization for Large Language Models

**Authors:** Dongwon Jo, Taesu Kim, Yulhwa Kim, Jae-Joon Kim

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=pGOBEYcXzs) | > Binarization, which converts weight parameters to binary values, has emerged as an effective strategy to reduce the size of large language models (LLMs). However, typical binarization techniques significantly diminish linguistic effectiveness of LLMs.
To address this issue, we introduce a novel binarization technique called Mixture of Scales (BinaryMoS). Unlike conventional methods, BinaryMoS empl...

---

## 31. Extreme Compression of Large Language Models via Additive Quantization

**Authors:** Vage Egiazarian, Andrei Panferov, Denis Kuznedelev, Elias Frantar, Artem Babenko

**Year:** 2024 | **Venue:** ICML 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=5mCaITRTmO) | > The emergence of accurate open large language models (LLMs) has led to a race towards performant quantization techniques which can enable their execution on end-user devices. In this paper, we revisit the problem of ``extreme'' LLM compression---defined as targeting extremely low bit counts, such as 2 to 3 bits per parameter---from the point of view of classic methods in Multi-Codebook Quantizatio...

---

## 32. Basis Sharing: Cross-Layer Parameter Sharing for Large Language Model Compression

**Authors:** Jingcun Wang, Yu-Guang Chen, Ing-Chao Lin, Bing Li, Grace Li Zhang

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=gp32jvUquq) | > Large Language Models (LLMs) have achieved remarkable breakthroughs. However, the huge number of parameters in LLMs require significant amount of memory storage in inference, which prevents their practical deployment in many applications. To reduce memory storage of LLMs, singular value decomposition (SVD) provides a promising solution to approximate weight matrices for compressing LLMs. In this p...

---

## 33. EvoPress: Accurate Dynamic Model Compression via Evolutionary Search

**Authors:** Oliver Sieberling, Denis Kuznedelev, Eldar Kurtic, Dan Alistarh

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=l7QzcZpjc5) | > The high computational costs of large language models (LLMs) have led to a flurry of research on LLM compression, via methods such as quantization, sparsification, or structured pruning. A new frontier in this area is given by dynamic, non-uniform compression methods, which adjust the compression levels (e.g., sparsity) per-block or even per-layer in order to minimize accuracy loss, while guarante...

---

## 34. PureKV: Plug-and-Play KV Cache Optimization with Spatial-Temporal Sparse Attention for Vision-Language Large Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Vision-Language Large Models (VLLMs) faces significant efficiency challenges when processing high-resolution inputs. The quadratic complexity in attention and autoregressive generation, as well as the constantly growing key value (KV) cache size, severely hinder the prefilling and decoding stages. Recent efforts have attempted to compress KV cache by identifying and pruning KV cache of less import...

---

## 35. Deep Compression of Pre-trained Transformer Models

**Authors:** Naigang Wang, Chi-Chun Liu, Swagath Venkataramani, Sanchari Sen, Chia-Yu Chen

**Year:** 2022 | **Venue:** NIPS 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=EZQnauHn-77) | > Pre-trained transformer models have achieved remarkable success in natural language processing (NLP) and have recently become competitive alternatives to Convolution Neural Networks (CNN) and Recurrent Neural Networks (RNN) in vision and speech tasks, respectively. Due to excellent computational efficiency and scalability, transformer models can be trained on exceedingly large amounts of data; how...

---

## 36. Layer-wise dynamic rank for compressing large language models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) have rapidly scaled in size, bringing severe memory and computational challenges that hinder their deployment. Singular Value Decomposition (SVD)-based compression has emerged as an appealing post-training compression technique for LLMs, yet most existing methods apply a uniform compression ratio across all layers, implicitly assuming homogeneous information included i...

---

## 37. When MLLMs Meets Compression Distortion: A Coding Paradigm Tailored to MLLMs

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> The increasing deployment of powerful Multimodal Large Language Models (MLLMs), typically hosted on cloud platforms, urgently requires effective compression techniques to efficiently transmit signal inputs (e.g., images, videos) from edge devices with minimal bandwidth usage. However, conventional image codecs are optimized for fidelity to serve the Human Visual System (HVS) and ill-suited for MLL...

---

## 38. LAPO: Internalizing Reasoning Efficiency via Length-Adaptive Policy Optimization

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large reasoning models have achieved remarkable performance through extended chain-of-thought sequences, yet this computational freedom leads to excessive token generation even for simple problems. We present Length-Adaptive Policy Optimization (LAPO), a novel framework that transforms reasoning length control from an external constraint into an intrinsic model capability. Unlike existing approach...

---

## 39. Efficient Large Multi-modal Models via Visual Context Compression

**Authors:** Jieneng Chen, Luoxin Ye, Ju He, Zhao-Yang Wang, Daniel Khashabi

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=5ujp72CiYB) | > While significant advancements have been made in compressed representations for text embeddings in large language models (LLMs), the compression of visual tokens in multi-modal LLMs (MLLMs) has remained a largely overlooked area. In this work, we present the study on the analysis of redundancy concerning visual tokens and efficient training within these models. Our initial experiments
show that el...

---

## 40. ACT-IN-LLM: Adaptively Compression Vision Tokens in LLM for High-Resolution Multimodal Large Language Models

**Authors:** Xinpeng Ding, Lewei Yao, Jianhua Han, Lanqing HONG, Hang Xu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> High-resolution inputs empower Multimodal Large Language Models (MLLMs) to capture intricate visual details, thereby enhancing comprehension. However, the self-attention mechanism’s quadratic complexity poses significant computational and memory challenges as image resolution increases, particularly with long-vision tokens. Existing approaches generally alleviate these issues by reducing vision to...

---

## 41. NIRVANA: Structured Pruning Reimagined for Large Language Models Compression

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Structured pruning of large language models (LLMs) offers substantial efficiency improvements by removing entire hidden units, yet current approaches often suffer from significant performance degradation, particularly in zero-shot settings, and necessitate costly recovery techniques such as supervised fine-tuning (SFT) or adapter insertion. To address these critical shortcomings, we introduce NIRV...

---

## 42. Efficient Bayesian DNN Compression through Sparse Quantized Sub-distributions

**Authors:** Ziyi Wang, Guang Lin, Qifan Song

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> This paper presents a novel method that simultaneously achieves model pruning and low-bit quantization through Bayesian variational inference to effectively compress deep neural networks (DNNs) while suffering minimal performance degradation. 
Unlike previous approaches that treat pruning and quantization as separate, sequential tasks, our method explores a unified optimization space, enabling mor...

---

## 43. LayerDecompose: Exploring weight sharing for Large Language Model Compression

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Recent advances in large language model (LLM) compression have predominantly focused on pruning and low-rank factorization, leaving weight sharing—despite its success in classical neural network compression—largely unexplored. We introduce LayerDecompose, a novel framework that reduces parameter redundancy by sharing a core weight matrix across transformer layers and augmenting each layer with lig...

---

## 44. Plug-and-Fold: Weight-Preserving Structured Compression for Large Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) have achieved remarkable performance across a wide range of tasks, but their growing size poses significant challenges for deployment and efficiency. Among existing model compression methods, structured pruning has emerged as a popular approach for reducing model size. However, pruning removes structural components such as layers, heads, or channels, which can disrupt ...

---

## 45. AdaSVD: Adaptive Singular Value Decomposition for Large Language Models

**Authors:** Zhiteng Li, Mingyuan Xia, Jingyuan Zhang, Zheng Hui, Haotong Qin

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) have achieved remarkable success in natural language processing (NLP) tasks, yet their substantial memory requirements present significant challenges for deployment on resource-constrained devices. Singular Value Decomposition (SVD) has emerged as a promising compression technique for LLMs, offering considerable reductions in memory overhead. However, existing SVD-base...

---

## 46. Towards Structured Dynamic Sparse Pre-Training of BERT

**Authors:** Anastasia S. D. Dietrich, Frithjof Gressmann, Douglas Orr, Ivan Chelombiev, Daniel Justus

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> Identifying algorithms for computational efficient unsupervised training of large language models is an important and active area of research. 
In this work, we develop and study a straightforward, dynamic always-sparse pre-training approach for BERT language modeling, which leverages periodic compression steps based on magnitude pruning followed by random parameter re-allocation. 
This approach e...

---

## 47. Radio: Rate–Distortion Optimization for Large Language Model Compression

**Authors:** Sean I. Young

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=ifnxXCCEiM) | > In recent years, the compression of large language models (LLMs) has emerged as a key problem in facilitating LLM deployment on resource-limited devices, reducing compute costs, and mitigating the environmental footprint due to large-scale AI infrastructure. Here, we establish the foundations of LLM quantization from a rate–distortion theory perspective and propose a quantization technique based o...

---

## 48. SOLOS: Sparse Optimization For Long Sequence In Context Compression Enhanced LLMs

**Authors:** Wenhao Li, Mingbao Lin, Yunshan Zhong, Shuicheng YAN, Rongrong Ji

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Recent advances in long-context large language models (LLMs) make them commercially viable, but their standard attention mechanisms' quadratic complexity hinders deployment due to excessive computational costs. To address this, researchers have explored Q-former-like architectures that compress input sequences for LLMs, reducing inference costs. However, these methods often underperform compared t...

---

## 49. On the Efficiency-Safety Dilemma in Large Reasoning Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large reasoning models (LRMs) excel in complex reasoning tasks but incur high inference costs, and efficiency techniques like quantization, pruning and KV Cache compression are widely used to reduce these costs. However, the impact of these techniques on model safety has been largely unexplored. This study offers the first comprehensive analysis of the relationship between efficiency, safety and r...

---

## 50. MARC: Memory-Augmented RL Token Compression for Efficient Video Understanding

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> The rapid progress of large language models (LLMs) has laid the foundation for multimodal models. Nevertheless, visual language models (VLMs) still face significant computational overhead when scaled from images to the video domain.
When video data is too large (due to high frame rates and long durations), the inference cost of models increases sharply. This severely hinders their deployment and a...

---

## 51. ERC-SVD: Error-Controlled SVD for Large Language Model Compression

**Authors:** Haolei Bai, Siyong Jian, Tuo Liang, Yu Yin, Huan Wang

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) have demonstrated impressive capabilities in a wide range of downstream natural language processing tasks. 
Nevertheless, their considerable sizes and memory demands hinder practical deployment, underscoring the importance of developing efficient compression strategies. 
Singular value decomposition (SVD) decomposes a matrix into orthogonal components, enabling efficie...

---

## 52. Task-Agnostic and Adaptive-Size BERT Compression

**Authors:** Jin Xu, Xu Tan, Renqian Luo, Kaitao Song, Li Jian

**Year:** 2021 | **Venue:** ICLR 2021 | **Citations:** N/A | **Score:** 0.000

> While pre-trained language models such as BERT and RoBERTa have achieved impressive results on various natural language processing tasks, they have huge numbers of parameters and suffer from huge computational and memory costs, which make them difficult for real-world deployment. Hence, model compression should be performed in order to reduce the computation and memory cost of pre-trained models. ...

---

## 53. DLP: Dynamic Layerwise Pruning in Large Language Models

**Authors:** Yuli Chen, Bo Cheng, Jiale Han, Yingying Zhang, Yingting Li

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=11id5ppGZ8) | > Pruning has recently been widely adopted to reduce the parameter scale and improve the inference efficiency of Large Language Models (LLMs). Mainstream pruning techniques often rely on uniform layerwise pruning strategies, which can lead to severe performance degradation at high sparsity levels. Recognizing the varying contributions of different layers in LLMs, recent studies have shifted their fo...

---

## 54. ARC-Encoder: learning compressed text representations for large language models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Recent techniques such as retrieval-augmented generation or chain-of-thought reasoning have led to longer contexts and increased inference costs. Context compression techniques can reduce these costs, but the most effective approaches require fine-tuning the target model or even modifying its architecture. This can degrade its general abilities when not used for this specific purpose. Here we expl...

---

## 55. Projected Compression: Trainable Projections for Efficient Transformer Compression

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models have steadily increased in size to achieve improved performance; however, this growth has also led to greater inference time and computational demands. Consequently, there is rising interest in model size reduction methods. To address this issue, we propose \textbf{Projected Compression}, a novel model compression technique, that reduces model weights by utilizing projection ...

---

## 56. ChunkKV: Semantic-Preserving KV Cache Compression for Efficient Long-Context LLM Inference

**Authors:** Xiang Liu, Zhenheng Tang, Peijie Dong, Zeyu Li, Liuyue

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) require significant GPU memory when processing long texts, with the key value (KV) cache consuming up to 70\% of total memory during inference. Although existing compression methods reduce memory by evaluating the importance of individual tokens, they overlook critical semantic relationships between tokens, resulting in fragmented context and degraded performance. We i...

---

## 57. Solving Sparse \& High-Dimensional-Output Regression via Compression

**Authors:** Renyuan Li, Zhehui Chen, Guanyi Wang

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=kPGNE4CrTq) | > Multi-Output Regression (MOR) has been widely used in scientific data analysis for decision-making. Unlike traditional regression models, MOR aims to simultaneously predict multiple real-valued outputs given an input. However, the increasing dimensionality of the outputs poses significant challenges regarding interpretability and computational scalability for modern MOR applications. As a first st...

---

## 58. Train Big, Then Compress: Rethinking Model Size for Efficient Training and Inference of Transformers

**Authors:** Zhuohan Li, Eric Wallace, Sheng Shen, Kevin Lin, Kurt Keutzer

**Year:** 2020 | **Venue:** ICML 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v119/li20m/li20m.pdf) | > Since hardware resources are limited, the objective of training deep learning models is typically to maximize accuracy subject to the time and memory constraints of training and inference. We study the impact of model size in this setting, focusing on Transformer models for NLP tasks that are limited by compute: self-supervised pretraining and high-resource machine translation. We first show that ...

---

## 59. L4Q: Parameter Efficient Quantization-Aware Fine-Tuning on Large Language Models

**Authors:** Hyesung Jeon, Yulhwa Kim, Jae-Joon Kim

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Due to the high memory and computational costs associated with large language models (LLMs), model compression techniques such as quantization, which reduces inference costs, and parameter-efficient fine-tuning (PEFT) methods like Low-Rank Adaptation (LoRA), which reduce training costs, have gained significant popularity. This trend has spurred active research into quantization-aware PEFT techniqu...

---

## 60. COMCAT: Towards Efficient Compression and Customization of Attention-Based Vision Models

**Authors:** Jinqi Xiao, Miao Yin, Yu Gong, Xiao Zang, Jian Ren

**Year:** 2023 | **Venue:** ICML 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=LrDkno4B3u) | > Attention-based vision models, such as Vision Transformer (ViT) and its variants, have shown promising performance in various computer vision tasks. However, these emerging architectures suffer from large model sizes and high computational costs, calling for efficient model compression solutions. To date, pruning ViTs has been well studied, while other compression strategies that have been widely ...

---

## 61. Bilevel ZOFO: Bridging Parameter-Efficient and Zeroth-Order Techniques for Efficient LLM Fine-Tuning and Meta-Training

**Authors:** Reza Shirkavand, Qi He, Peiran Yu, Heng Huang

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Fine-tuning pre-trained Large Language Models (LLMs) for downstream tasks using First-Order (FO) optimizers presents significant computational challenges. Parameter-Efficient Fine-Tuning (PEFT) methods have been proposed to address these challenges by freezing most model parameters and training only a small subset. While PEFT is efficient, it may not outperform full fine-tuning when high task-spec...

---

## 62. AmoebaLLM: Constructing Any-Shape Large Language Models for Efficient and Instant Deployment

**Authors:** Yonggan Fu, Zhongzhi Yu, Junwei Li, Jiayi Qian, Yongan Zhang

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=G0yxFmP87g) | > Motivated by the transformative capabilities of large language models (LLMs) across various natural language tasks, there has been a growing demand to deploy these models effectively across diverse real-world applications and platforms. However, the challenge of efficiently deploying LLMs has become increasingly pronounced due to the varying application-specific performance requirements and the ra...

---

## 63. VoCo-LLaMA: Towards Vision Compression with Large Language Models

**Authors:** Xubing Ye, Yukang Gan, Xiaoke Huang, Yixiao Ge, Yansong Tang

**Year:** 2025 | **Venue:** CVPR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Ye_VoCo-LLaMA_Towards_Vision_Compression_with_Large_Language_Models_CVPR_2025_paper.pdf) | > Vision-Language Models (VLMs) have achieved remarkable success in various multi-modal tasks, but they are often bottlenecked by the limited context window and high computational cost of processing high-resolution image inputs and videos. Vision compression can alleviate this problem by reducing the vision token count. Previous approaches compress vision tokens with external modules and force LLMs ...

---

## 64. RazorAttention: Efficient KV Cache Compression Through Retrieval Heads

**Authors:** Hanlin Tang, Yang Lin, Jing Lin, Qingsen Han, Danning Ke

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=tkiZQlL04w) | > The memory and computational demands of Key-Value (KV) cache present significant challenges for deploying long-context language models. Previous approaches attempt to mitigate this issue by selectively dropping tokens, which irreversibly erases critical information that might be needed for future queries. In this paper, we propose a novel compression technique for KV cache that preserves all token...

---

## 65. BitStack: Any-Size Compression of Large Language Models in Variable Memory Environments

**Authors:** Xinghao Wang, Pengyu Wang, Bo Wang, Dong Zhang, Yunhua Zhou

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=lBntjGbyv0) | > Large language models (LLMs) have revolutionized numerous applications, yet their deployment remains challenged by memory constraints on local devices. While scaling laws have enhanced LLM capabilities, the primary bottleneck has shifted from $\textit{capability}$ to $\textit{availability}$, emphasizing the need for efficient memory management. Traditional compression methods, such as quantization...

---

## 66. Large Language Model Compression with Global Rank and Sparsity Optimization

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> \begin{abstract}
Low-rank and sparse composite approximation is a natural idea to compress Large Language Models (LLMs). However, such an idea faces two primary challenges that adversely affect the performance of existing methods. The first challenge relates to the interaction and cooperation between low-rank and sparse matrices, while the second involves determining weight allocation across diffe...

---

## 67. Exploring Redundancy and Shared Representations for Transformer Models Optimization

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) deliver state-of-the-art performance but at the cost of extreme computational and energy demands, raising the question of how much of their capacity is truly necessary. This paper explores structural and weight redundancies in Transformer-based architectures, aiming to identify inefficiencies and leverage them through targeted compression techniques.
A central focus is...

---

## 68. IntelLLM: Little Hints Make a Big Difference for LLM KV Cache Compression

**Authors:** TingLong Li, Qiuyu Shao

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) have demonstrated exceptional capabilities in integrating contextual knowledge, but their deployment is often constrained by the substantial computational resources required for long text sequences. To mitigate the inference time cost associated with attention mechanisms, LLMs utilize key-value embedding caching techniques (KV cache), which introduce significant storag...

---

## 69. Survey on Efficient Large Language Models: Principles, Algorithms, Applications, and Open Issues.

**Authors:** Jian Cheng, Haidong Kang, Yuxin Shao, Nan Li, Pengjun Chen

**Year:** 2025 | **Venue:** IEEE Transactions on Neural Networks and Learning Systems | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/TNNLS.2025.3628671)

> With the rapid advancement of large language models (LLMs) in both academia and industry, their growing size and complexity have introduced significant challenges in terms of computational cost and deployment efficiency. To address these issues, a wide range of inference optimization techniques-including but not limited to model compression-have been proposed to accelerate LLM inference while pres...

---

## 70. Language-Specific Pruning for Efficient Reduction of Large Language Models

**Authors:** Maksym Shamrai

**Year:** 2024 | **Venue:** UNLP | **Citations:** N/A | **Score:** 0.000

> ...

---

## 71. Optimization Strategies for Enhancing Resource Efficiency in Transformers & Large Language Models

**Authors:** Tom Wallace, Beatrice Ombuki-Berman, Naser Ezzati-Jivan

**Year:** 2025 | **Venue:** International Conference on Performance Engineering | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.1145/3676151.3719379)

> Advancements in Natural Language Processing are heavily reliant on Transformer architectures, whose improvements come at substantial resource costs due to ever-growing model sizes. This study explores optimization techniques, including quantization, knowledge distillation, and pruning, focusing on energy and computational efficiency while retaining performance. Among standalone methods, 4-Bit quan...

---

## 72. Decoding Efficiency: A Comprehensive Review of Knowledge Distillation Techniques in Large Language Model

**Authors:** Dr. Goldi Soni

**Year:** 2025 | **Venue:** International Journal for Research in Applied Science and Engineering Technology | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.22214/ijraset.2025.73930)

> Knowledge distillation has emerged as a pivotal technique for optimizing large language models (LLMs) across diverse
applications, enabling efficient knowledge transfer, model compression, and improved task performance. This review
systematically explores advancements in knowledge distillation methodologies applied to LLMs, covering a broad spectrum of
research areas, such as federated learning, m...

---

## 73. TACO-RL: Task Aware Prompt Compression Optimization with Reinforcement Learning

**Authors:** Shivam Shandilya, Menglin Xia, Supriyo Ghosh, Huiqiang Jiang, Jue Zhang

**Year:** 2024 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 11 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2409.13035)

> The increasing prevalence of large language models (LLMs) such as GPT-4 in various applications has led to a surge in the size of prompts required for optimal performance, leading to challenges in computational efficiency. Prompt compression aims to reduce the inference cost by minimizing input tokens without compromising on the task performance. However, existing prompt compression techniques eit...

---

## 74. LLM Serving Optimization Techniques: A Comprehensive Analysis

**Authors:** V. Siva, Prasad Bharathula

**Year:** 2025 | **Venue:** Journal of Computer Science and Technology Studies | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.32996/jcsts.2025.7.5.23)

> This article presents a comprehensive analysis of optimization techniques for serving Large Language Models (LLMs), addressing the critical challenges posed by their exponential growth in size and computational requirements. This paper examines four key areas of optimization: hardware acceleration, serving architecture design, model compression, and dynamic scaling strategies. The article synthesi...

---

## 75. The Current Application Status and Prospects of Pruning Methods in natural language Processing

**Authors:** Tao Fang

**Year:** 2025 | **Venue:** Applied and Computational Engineering | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.54254/2755-2721/2025.ast26375)

> The rapid development of Natural Language Processing (NLP), driven by large-scale pre-trained models like BERT and GPT, has led to surging model parameters and computational complexity, resulting in high resource consumption and slow inference speed. Pruning, as an efficient model compression method, can significantly improve inference efficiency while maintaining model performance by removing red...

---

## 76. FlightLLM: Efficient Large Language Model Inference with a Complete Mapping Flow on FPGAs

**Authors:** Shulin Zeng, Jun Liu, Guohao Dai, Xinhao Yang, Tianyu Fu

**Year:** 2024 | **Venue:** Symposium on Field Programmable Gate Arrays | **Citations:** 108 | **Score:** 0.000

[PDF](https://dl.acm.org/doi/pdf/10.1145/3626202.3637562) | [DOI](https://doi.org/10.1145/3626202.3637562)

> Transformer-based Large Language Models (LLMs) have made a significant impact on various domains. However, LLMs' efficiency suffers from both heavy computation and memory overheads. Compression techniques like sparsification and quantization are commonly used to mitigate the gap between LLM's computation/memory overheads and hardware capacity. However, existing GPU and transformer-based accelerato...

---

## 77. Synergized Data Efficiency and Compression (SEC) Optimization for Large Language Models

**Authors:** Xinjin Li, Yu Ma, Yangchen Huang, Xingqi Wang, Yuzhen Lin

**Year:** 2024 | **Venue:** 2024 4th International Conference on Electronic Information Engineering and Computer Science (EIECS) | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.1109/EIECS63941.2024.10800533)

> The rapid advancements in large language models (LLMs) have propelled natural language processing but pose significant challenges related to extensive data requirements, high computational demands, and more training times. While current approaches have demonstrated powerful capabilities, they often fall short of achieving an optimal balance between model size reduction and performance preservation...

---

## 78. A Survey on Efficient Inference for Large Language Models

**Authors:** Zixuan Zhou, Xuefei Ning, Ke Hong, Tianyu Fu, Jiaming Xu

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 167 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2404.14294)

> Large Language Models (LLMs) have attracted extensive attention due to their remarkable performance across various tasks. However, the substantial computational and memory requirements of LLM inference pose challenges for deployment in resource-constrained scenarios. Efforts within the field have been directed towards developing techniques aimed at enhancing the efficiency of LLM inference. This p...

---

## 79. Beyond Efficiency: A Systematic Survey of Resource-Efficient Large Language Models

**Authors:** Guangji Bai, Zheng Chai, Chen Ling, Shiyu Wang, Jiaying Lu

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 75 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2401.00625)

> The burgeoning field of Large Language Models (LLMs), exemplified by sophisticated models like OpenAI's ChatGPT, represents a significant advancement in artificial intelligence. These models, however, bring forth substantial challenges in the high consumption of computational, memory, energy, and financial resources, especially in environments with limited resource capabilities. This survey aims t...

---

## 80. Search for Efficient Large Language Models

**Authors:** Xuan Shen, Pu Zhao, Yifan Gong, Zhenglun Kong, Zheng Zhan

**Year:** 2024 | **Venue:** Neural Information Processing Systems | **Citations:** 13 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2409.17372)

> Large Language Models (LLMs) have long held sway in the realms of artificial intelligence research. Numerous efficient techniques, including weight pruning, quantization, and distillation, have been embraced to compress LLMs, targeting memory reduction and inference acceleration, which underscore the redundancy in LLMs. However, most model compression techniques concentrate on weight optimization,...

---

## 81. Sliding Window Attention Training for Efficient Large Language Models

**Authors:** Zichuan Fu, Wentao Song, Yejing Wang, Xian Wu, Yefeng Zheng

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 8 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2502.18845)

> Recent advances in transformer-based Large Language Models (LLMs) have demonstrated remarkable capabilities across various tasks. However, their quadratic computational complexity concerning sequence length remains a significant bottleneck for processing long documents. As a result, many efforts like sparse attention and state space models have been proposed to improve the efficiency of LLMs over ...

---

## 82. Prompt Compression for Large Language Models: A Survey

**Authors:** Zongqian Li, Yinhong Liu, Yixuan Su, Nigel Collier

**Year:** 2024 | **Venue:** North American Chapter of the Association for Computational Linguistics | **Citations:** 40 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2410.12388)

> Leveraging large language models (LLMs) for complex natural language tasks typically requires long-form prompts to convey detailed requirements and information, which results in increased memory usage and inference costs. To mitigate these challenges, multiple efficient methods have been proposed, with prompt compression gaining significant research interest. This survey provides an overview of pr...

---

## 83. EDGE-LLM: Enabling Efficient Large Language Model Adaptation on Edge Devices via Unified Compression and Adaptive Layer Voting

**Authors:** Zhongzhi Yu, Zheng Wang, Yuhan Li, Ruijie Gao, Xiaoya Zhou

**Year:** 2024 | **Venue:** Design Automation Conference | **Citations:** 39 | **Score:** 0.000

[DOI](https://doi.org/10.1145/3649329.3658473)

> Efficient adaption of large language models (LLMs) on edge devices is essential for applications requiring continuous and privacy-preserving adaptation and inference. However, existing tuning techniques fall short because of the high computation and memory overhead. To this end, we introduce a computation- and memory-efficient LLM tuning framework, called Edge-LLM, to facilitate affordable and eff...

---

## 84. Enabling On-Device Inference of Large Language Models : Challenges, Techniques, and Applications

**Authors:** Athul Ramkumar

**Year:** 2024 | **Venue:** International Journal of Scientific Research in Computer Science Engineering and Information Technology | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.32628/cseit241061100) | [DOI](https://doi.org/10.32628/cseit241061100)

> This comprehensive article explores the cutting-edge techniques and challenges associated with on-device inference of Large Language Models (LLMs), a transformative approach that brings advanced AI capabilities directly to mobile and edge devices. The article delves into the intricate balance between the computational demands of LLMs and the resource constraints of mobile hardware, presenting a de...

---

## 85. Efficient Large Language Model Fine-Tuning with Joint Structural Pruning and Parameter Sharing

**Authors:** Rui Wang, Yumin Chen, Mengmeng Liu, Guiran Liu, Binrong Zhu

**Year:** 2025 | **Venue:** 2025 6th International Conference on Computer Vision and Data Mining (ICCVDM) | **Citations:** 14 | **Score:** 0.000

[DOI](https://doi.org/10.1109/ICCVDM66874.2025.11290442)

> This paper addresses the challenges of high computational cost and severe parameter redundancy in the fine-tuning of large language models. It proposes an efficient fine-tuning algorithm that integrates structural pruning with parameter sharing. The method operates from both the architectural and optimization perspectives. It prunes redundant connections dynamically while keeping the core model fr...

---

## 86. Efficiency Optimization of Large-Scale Language Models Based on Deep Learning in Natural Language Processing Tasks

**Authors:** Taiyuan Mei, Yun Zi, X. Cheng, Zijun Gao, Qi Wang

**Year:** 2024 | **Venue:** 2024 IEEE 2nd International Conference on Sensors, Electronics and Computer Engineering (ICSECE) | **Citations:** 25 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2405.11704) | [DOI](https://doi.org/10.1109/ICSECE61636.2024.10729518)

> The internal structure and operation mechanism of large-scale language models are analyzed theoretically, especially how Transformer and its derivative architectures can restrict computing efficiency while capturing long-term dependencies. Further, we dig deep into the efficiency bottleneck of the training phase, and evaluate in detail the contribution of adaptive optimization algorithms (such as ...

---

## 87. LongRecipe: Recipe for Efficient Long Context Generalization in Large Language Models

**Authors:** Zhiyuan Hu, Yuliang Liu, Jinman Zhao, Suyuchen Wang, Yan Wang

**Year:** 2024 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 18 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2409.00509)

> Large language models (LLMs) face significant challenges in handling long-context tasks because of their limited effective context window size during pretraining, which restricts their ability to generalize over extended sequences. Meanwhile, extending the context window in LLMs through post-pretraining is highly resource-intensive. To address this, we introduce LongRecipe, an efficient training s...

---

## 88. Hybrid and Unitary PEFT for Resource-Efficient Large Language Models

**Authors:** Haomin Qi, Zihan Dai, Chengbo Huang

**Year:** 2025 | **Venue:** American Journal of Computer Science and Technology | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.11648/j.ajcst.20250804.17)

> Fine-tuning large language models (LLMs) remains a computational bottleneck due to their scale and memory demands. This paper presents a comprehensive evaluation of parameter-efficient fine-tuning (PEFT) techniques, including LoRA, BOFT, LoRA-GA, and uRNN, and introduces a novel hybrid strategy that dynamically integrates BOFT’s orthogonal stability with LoRA-GA’s gradient-aligned rapid convergenc...

---

## 89. Mini-GPTs: Efficient Large Language Models through Contextual Pruning

**Authors:** Tim Valicenti, Justice Vidal, Ritik Patnaik

**Year:** 2023 | **Venue:** arXiv.org | **Citations:** 10 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2312.12682)

> In AI research, the optimization of Large Language Models (LLMs) remains a significant challenge, crucial for advancing the field's practical applications and sustainability. Building upon the foundational work of Professor Song Han's lab at MIT, this paper introduces a novel approach in developing Mini-GPTs via contextual pruning. Our methodology strategically prunes the computational architectur...

---

## 90. ALPS: Improved Optimization for Highly Sparse One-Shot Pruning for Large Language Models

**Authors:** Xiang Meng, Kayhan Behdin, Haoyue Wang, Rahul Mazumder

**Year:** 2024 | **Venue:** Neural Information Processing Systems | **Citations:** 13 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2406.07831)

> The impressive performance of Large Language Models (LLMs) across various natural language processing tasks comes at the cost of vast computational resources and storage requirements. One-shot pruning techniques offer a way to alleviate these burdens by removing redundant weights without the need for retraining. Yet, the massive scale of LLMs often forces current pruning approaches to rely on heur...

---

## 91. Efficient Compressing and Tuning Methods for Large Language Models: A Systematic Literature Review

**Authors:** Gun Il Kim, Sunga Hwang, Beakcheol Jang

**Year:** 2025 | **Venue:** ACM Computing Surveys | **Citations:** 8 | **Score:** 0.000

[DOI](https://doi.org/10.1145/3728636)

> Efficient compression and tuning techniques have become indispensable in addressing the increasing computational and memory demands of large language models (LLMs). While these models have demonstrated exceptional performance across a wide range of natural language processing tasks, their growing size and resource requirements pose significant challenges to accessibility and sustainability. This s...

---

## 92. A Survey on Model Compression for Large Language Models

**Authors:** Xunyu Zhu, Jian Li, Yong Liu, Can Ma, Weiping Wang

**Year:** 2023 | **Venue:** Transactions of the Association for Computational Linguistics | **Citations:** 347 | **Score:** 0.000

[DOI](https://doi.org/10.1162/tacl_a_00704)

> Abstract Large Language Models (LLMs) have transformed natural language processing tasks successfully. Yet, their large size and high computational needs pose challenges for practical use, especially in resource-limited settings. Model compression has emerged as a key research area to address these challenges. This paper presents a survey of model compression techniques for LLMs. We cover methods ...

---

## 93. Feature Alignment-Based Knowledge Distillation for Efficient Compression of Large Language Models

**Authors:** Shuo Wang, Chihang Wang, Jia Gao, Zhen Qi, Hongye Zheng

**Year:** 2024 | **Venue:** 2025 5th International Conference on Neural Networks, Information and Communication Engineering (NNICE) | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.1109/NNICE64954.2025.11063887)

> This study proposes a knowledge distillation algorithm based on large language models and feature alignment, aiming to effectively transfer the knowledge of large pre-trained models into lightweight student models, thereby reducing computational costs while maintaining high model performance. performance. Different from the traditional soft label distillation method, this method introduces a multi...

---

## 94. SpaceTimePilot: Generative Rendering of Dynamic Scenes Across Space and Time

**Authors:** Zhening Huang, Hyeonho Jeong, Xuelin Chen, Yulia Gryaditskaya, Tuanfeng Y. Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25075v1) | > We present SpaceTimePilot, a video diffusion model that disentangles space and time for controllable generative rendering. Given a monocular video, SpaceTimePilot can independently alter the camera viewpoint and the motion sequence within the generative process, re-rendering the scene for continuous and arbitrary exploration across space and time. To achieve this, we introduce an effective animati...

---

## 95. Randomization Times under Quantum Chaotic Hamiltonian Evolution

**Authors:** Souradeep Ghosh, Nicholas Hunter-Jones, Joaquin F. Rodriguez-Nieva

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25074v1) | > Randomness generation through quantum-chaotic evolution underpins foundational questions in statistical mechanics and applications across quantum information science, including benchmarking, tomography, metrology, and demonstrations of quantum computational advantage. While statistical mechanics successfully captures the temporal averages of local observables, understanding randomness at the level...

---

## 96. GaMO: Geometry-aware Multi-view Diffusion Outpainting for Sparse-View 3D Reconstruction

**Authors:** Yi-Chuan Huang, Hao-Jen Chien, Chin-Yang Lin, Ying-Huan Chen, Yu-Lun Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25073v1) | > Recent advances in 3D reconstruction have achieved remarkable progress in high-quality scene capture from dense multi-view imagery, yet struggle when input views are limited. Various approaches, including regularization techniques, semantic priors, and geometric constraints, have been implemented to address this challenge. Latest diffusion-based methods have demonstrated substantial improvements b...

---

## 97. Edit3r: Instant 3D Scene Editing from Sparse Unposed Images

**Authors:** Jiageng Liu, Weijie Lyu, Xueting Li, Yejie Guo, Ming-Hsuan Yang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25071v1) | > We present Edit3r, a feed-forward framework that reconstructs and edits 3D scenes in a single pass from unposed, view-inconsistent, instruction-edited images. Unlike prior methods requiring per-scene optimization, Edit3r directly predicts instruction-aligned 3D edits, enabling fast and photorealistic rendering without optimization or pose estimation. A key challenge in training such a model lies i...

---

## 98. Coordinated Humanoid Manipulation with Choice Policies

**Authors:** Haozhi Qi, Yen-Jen Wang, Toru Lin, Brent Yi, Yi Ma

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25072v1) | > Humanoid robots hold great promise for operating in human-centric environments, yet achieving robust whole-body coordination across the head, hands, and legs remains a major challenge. We present a system that combines a modular teleoperation interface with a scalable learning framework to address this problem. Our teleoperation design decomposes humanoid control into intuitive submodules, which i...

---

## 99. Scaling Open-Ended Reasoning to Predict the Future

**Authors:** Nikhil Chandak, Shashwat Goel, Ameya Prabhu, Moritz Hardt, Jonas Geiping

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25070v1) | > High-stakes decision making involves reasoning under uncertainty about the future. In this work, we train language models to make predictions on open-ended forecasting questions. To scale up training data, we synthesize novel forecasting questions from global events reported in daily news, using a fully automated, careful curation recipe. We train the Qwen3 thinking models on our dataset, OpenFore...

---

## 100. Classification of Interacting Topological Crystalline Superconductors in Three Dimensions and Beyond

**Authors:** Shang-Qiang Ning, Xing-Yu Ren, Qing-Rui Wang, Yang Qi, Zheng-Cheng Gu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25069v1) | > Although classification for free-fermion topological superconductors (TSC) is established, systematically understanding the classification of 3D interacting TSCs remains difficult, especially those protected by crystalline symmetries like the 230 space groups. We build up a general framework for systematically classifying 3D interacting TSCs protected by crystalline symmetries together with discre...

---

## 101. No-cost Bell Nonlocality Certification from Quantum Tomography and Its Applications in Quantum Magic Witnessing

**Authors:** Pawel Cieslinski, Lukas Knips, Harald Weinfurter, Wieslaw Laskowski

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25068v1) | > Tomographic measurements are the standard tool for characterizing quantum states, yet they are usually regarded only as means for state reconstruction or fidelity measurement. Here, we show that the same Pauli-basis measurements (X, Y, Z) can be directly employed for the certification of nonlocality at no additional experimental cost. Our framework allows any tomographic data - including archival ...

---

## 102. From Inpainting to Editing: A Self-Bootstrapping Framework for Context-Rich Visual Dubbing

**Authors:** Xu He, Haoxian Zhang, Hejia Chen, Changyuan Zheng, Liyang Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25066v1) | > Audio-driven visual dubbing aims to synchronize a video's lip movements with new speech, but is fundamentally challenged by the lack of ideal training data: paired videos where only a subject's lip movements differ while all other visual conditions are identical. Existing methods circumvent this with a mask-based inpainting paradigm, where an incomplete visual conditioning forces models to simulta...

---

## 103. Vulcan: Instance-Optimal Systems Heuristics Through LLM-Driven Search

**Authors:** Rohit Dwivedula, Divyanshu Saxena, Sujay Yadalam, Daehyeok Kim, Aditya Akella

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25065v1) | > Resource-management tasks in modern operating and distributed systems continue to rely primarily on hand-designed heuristics for tasks such as scheduling, caching, or active queue management. Designing performant heuristics is an expensive, time-consuming process that we are forced to continuously go through due to the constant flux of hardware, workloads and environments.
  We propose a new alter...

---

## 104. Feeling Blue: Constructing a Robust SALT3 UV Template and Constraining its Redshift Dependency

**Authors:** Qinan Wang, David O. Jones, Justin D. R. Pierel, Matthew R. Siebert, W. D'Arcy Kenworthy

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25064v1) | > Upcoming cosmological surveys will obtain numerous rest-frame ultraviolet (UV) observations of Type Ia supernovae (SNe Ia), yet there is concern about how standardizable SNe Ia are in the UV. In this work, we train a robust optical--UV SED model for SNe Ia (SALT3-UV) with the open-source model-training software $\texttt{SALTshaker}$. We incorporate a spectroscopic UV data sample from HST, includin...

---

## 105. Many Minds from One Model: Bayesian Transformers for Population Intelligence

**Authors:** Diji Yang, Yi Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25063v1) | > Despite their scale and success, modern transformers are almost universally trained as single-minded systems: optimization produces one deterministic set of parameters, representing a single functional hypothesis about the data. Motivated by the idea that intelligence emerge from many minds, we propose Population Bayesian Transformers (B-Trans), which transform a standard Large Language Model into...

---

## 106. Melting curve of correlated iron at Earth's core conditions from machine-learned DFT+DMFT

**Authors:** Rishi Rao, Li Zhu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25061v1) | > Reliable constraints on iron's melting curve at Earth's inner-core boundary require accurate finite-temperature electronic correlations, yet DFT+DMFT calculations remain too costly for large-scale thermodynamic sampling. Here, we develop a machine-learning accelerator for charge self-consistent DFT+DMFT by training E(3)-equivariant graph neural networks to predict the local self-energy and Fermi l...

---

## 107. Reliable and Resilient Collective Communication Library for LLM Training and Serving

**Authors:** Wei Wang, Nengneng Yu, Sixian Xiong, Zaoxing Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25059v1) | > Modern ML training and inference now span tens to tens of thousands of GPUs, where network faults can waste 10--15\% of GPU hours due to slow recovery. Common network errors and link fluctuations trigger timeouts that often terminate entire jobs, forcing expensive checkpoint rollback during training and request reprocessing during inference. We present R$^2$CCL, a fault-tolerant communication libr...

---

## 108. Sequential Bayesian parameter-state estimation in dynamical systems with noisy and incomplete observations via a variational framework

**Authors:** Liliang Wang, Alex Gorodetsky

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25056v1) | > Online joint estimation of unknown parameters and states in a dynamical system with uncertainty quantification is crucial in many applications. For example, digital twins dynamically update their knowledge of model parameters and states to support prediction and decision-making. Reliability and computational speed are vital for DTs. Online parameter-state estimation ensures computational efficienc...

---

## 109. Context-aware LLM-based AI Agents for Human-centered Energy Management Systems in Smart Buildings

**Authors:** Tianzhi He, Farrokh Jazizadeh

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25055v1) | > This study presents a conceptual framework and a prototype assessment for Large Language Model (LLM)-based Building Energy Management System (BEMS) AI agents to facilitate context-aware energy management in smart buildings through natural language interaction. The proposed framework comprises three modules: perception (sensing), central control (brain), and action (actuation and user interaction),...

---

## 110. Fluid dynamics as intersection problem

**Authors:** Nikita Nekrasov, Paul Wiegmann

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25053v1) | > We formulate the covariant hydrodynamics equations describing the fluid dynamics as the problem of intersection theory on the infinite dimensional symplectic manifold associated with spacetime. This point of view separates the structures related to the equation of state, the geometry of spacetime, and structures related to the (differential) topology of spacetime. We point out a five-dimensional o...

---

## 111. AdaGReS:Adaptive Greedy Context Selection via Redundancy-Aware Scoring for Token-Budgeted RAG

**Authors:** Chao Peng, Bin Wang, Zhilei Long, Jinfang Sheng

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25052v1) | > Retrieval-augmented generation (RAG) is highly sensitive to the quality of selected context, yet standard top-k retrieval often returns redundant or near-duplicate chunks that waste token budget and degrade downstream generation. We present AdaGReS, a redundancy-aware context selection framework for token-budgeted RAG that optimizes a set-level objective combining query-chunk relevance and intra-s...

---

## 112. The PDE-ODI principle and cylindrical mean curvature flows

**Authors:** Richard H. Bamler, Yi Lai

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25050v1) | > We introduce a new approach for analyzing ancient solutions and singularities of mean curvature flow that are locally modeled on a cylinder. Its key ingredient is a general mechanism, called the \emph{PDE--ODI principle}, which converts a broad class of parabolic differential equations into systems of ordinary differential inequalities. This principle bypasses many delicate analytic estimates used...

---

## 113. Arithmetic with spatiotemporal optical vortex of integer and fractional topological charges

**Authors:** Hsiao-Chih Huang, Chen-Ting Liao, Hui Min Leung

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25049v1) | > Spatiotemporal optical vortices carry transverse orbital angular momentum (t-OAM), which give rise to spatiotemporal topological charge (ST-TC). To unleash the full potential of t-OAM in expanding the capacity of communication and computing, we demonstrate the first optical information-processing pipeline capable of performing addition and subtraction on ST-TC values, regardless of whether they ar...

---

## 114. All optical Lithography for Spatiotemporal Patterning of Azopolymer Microreliefs

**Authors:** I Komang Januariyasa, Francesco Reda, Nikolai Liubimtsev, Marina Saphiannikova, Fabio Borbone

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25048v1) | > Microstructured surfaces are central to photonics, biointerfaces, and functional coatings, yet they are typically fabricated through multi-step lithographic workflows requiring masks or molds and post-processing. Azopolymers provide an alternative route by converting structured optical fields into surface reliefs via light-induced mass migration, but existing approaches have been limited to smooth...

---

## 115. Extreme nonlinear optics in optical fibers

**Authors:** Mario Ferraro, Bertrand Kibler, Pierre Béjot, Frédéric Gérome, Benoit Debord

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25046v1) | > This paper reviews the field of extreme nonlinear optics in optical fibers, highlighting key phenomena and advancements. It discusses multiple ionization effects caused by femtosecond laser pulses that generate plasma and induce permanent material modifications, as well as plasma luminescence and its dependence on material imperfections. The formation and dynamics of plasma filaments, including he...

---

## 116. Bayesian Elastic Net Regression with Structured Prior Dependence

**Authors:** Christopher M. Hans, Ningyi Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25045v1) | > Many regularization priors for Bayesian regression assume the regression coefficients are a priori independent. In particular this is the case for standard Bayesian treatments of the lasso and the elastic net. While independence may be reasonable in some data-analytic settings, incorporating dependence in these prior distributions provides greater modeling flexibility. This paper introduces the or...

---

## 117. Thin Tree Verification is coNP-Complete

**Authors:** Alice Moayyedi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25043v1) | > An $α$-thin tree $T$ of a graph $G$ is a spanning tree such that every cut of $G$ has at most an $α$ proportion of its edges in $T$. The Thin Tree Conjecture proposes that there exists a function $f$ such that for any $α> 0$, every $f(α)$-edge-connected graph has an $α$-thin tree. Aside from its independent interest, an algorithm which could efficiently construct an $O(1)/k$-thin tree for a given ...

---

## 118. Compound Estimation for Binomials

**Authors:** Yan Chen, Lihua Lei

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25042v1) | > Many applications involve estimating the mean of multiple binomial outcomes as a common problem -- assessing intergenerational mobility of census tracts, estimating prevalence of infectious diseases across countries, and measuring click-through rates for different demographic groups. The most standard approach is to report the plain average of each outcome. Despite simplicity, the estimates are no...

---

