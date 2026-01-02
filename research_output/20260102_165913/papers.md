# Research Papers: token efficiency in LLMs AND (token usage optimization OR token compression OR LLM token efficiency)

Updated: 2026-01-02 17:03
Total: 25 papers

---

## 1. BatchPrompt: Accomplish more with less

**Authors:** Jianzhe Lin, Maurice Diesendruck, Liang Du, Robin Abraham

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.431

[PDF](https://openreview.net/pdf?id=Agyicd577r) | > The ever-increasing token limits of large language models (LLMs) have enabled long context as input. Many LLMs are trained and fine-tuned to perform zero/few-shot inference using instruction-based prompts. Prompts typically include a detailed task instruction, several examples, and a single data point for inference. This baseline is referred to as “SinglePrompt” in this paper. In terms of token co...

---

## 2. Enhancing Uncertainty-Based Hallucination Detection with Stronger Focus

**Authors:** Tianhang Zhang, Lin Qiu, Qipeng Guo, Cheng Deng, Yue Zhang

**Year:** 2023 | **Venue:** EMNLP 2023 | **Citations:** N/A | **Score:** 0.425

> Large Language Models (LLMs) have gained significant popularity for their impressive performance across diverse fields. However, LLMs are prone to hallucinate untruthful or nonsensical outputs that fail to meet user expectations in many real-world applications. Existing works for detecting hallucinations in LLMs either rely on external knowledge for reference retrieval or require sampling multiple...

---

## 3. PYRA: Parallel Yielding Re-Activation for Training-Inference Efficient Task Adaptation

**Authors:** Yizhe Xiong, Hui Chen*, Tianxiang Hao, Zijia Lin, Jungong Han

**Year:** 2024 | **Venue:** ECCV 2024 | **Citations:** N/A | **Score:** 0.454

[PDF](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/01465.pdf) | > "Recently, the scale of transformers has grown rapidly, which introduces considerable challenges in terms of training overhead and inference efficiency in the scope of task adaptation. Existing works, namely Parameter-Efficient Fine-Tuning (PEFT) and model compression, have separately investigated the challenges. However, PEFT cannot guarantee the inference efficiency of the original backbone, esp...

---

## 4. Fusion Token: Enhancing Compression and Efficiency in Language Model Tokenization

**Authors:** Robert Kwiatkowski, Zijian Wang, Robert Giaquinto, Varun Kumar, Xiaofei Ma

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.501

> In the realm of language models, data encoding is pivotal, influencing efficiency and effectiveness of model training. Byte Pair Encoding (BPE) is a well-established subword tokenization technique that balances computational efficiency and linguistic expressiveness by merging frequent byte or character pairs.
As language model training requires substantial computational resources, we propose Fusio...

---

## 5. DiffRate : Differentiable Compression Rate for Efficient Vision Transformers

**Authors:** Mengzhao Chen, Wenqi Shao, Peng Xu, Mingbao Lin, Kaipeng Zhang

**Year:** 2023 | **Venue:** ICCV 2023 | **Citations:** N/A | **Score:** 0.422

[PDF](https://openaccess.thecvf.com/content/ICCV2023/papers/Chen_DiffRate__Differentiable_Compression_Rate_for_Efficient_Vision_Transformers_ICCV_2023_paper.pdf) | > Token compression aims to speed up large-scale vision transformers (e.g. ViTs) by pruning (dropping) or merging tokens. It is an important but challenging task. Although recent advanced approaches achieved great success, they need to carefully handcraft a compression rate (i.e. number of tokens to remove), which is tedious and leads to sub-optimal performance. To tackle this problem, we propose Di...

---

## 6. Divergent Token Metrics: Measuring degradation to prune away LLM components – and optimize quantization

**Authors:** Björn Deiseroth, Max Meuer, Nikolas Gritsch, Constantin Eichenberg, Patrick Schramowski

**Year:** 2024 | **Venue:** NAACL 2024 | **Citations:** N/A | **Score:** 0.455

[PDF](https://aclanthology.org/2024.naacl-long.377.pdf) | > Large Language Models (LLMs) have reshaped natural language processing with their impressive capabilities. However, their ever-increasing size has raised concerns about their effective deployment and the need for LLM compression. This study introduces the Divergent Token Metrics (DTMs), a novel approach to assessing compressed LLMs, addressing the limitations of traditional perplexity or accuracy ...

---

## 7. An Expert is Worth One Token: Synergizing Multiple Expert LLMs as Generalist via Expert Token Routing

**Authors:** Ziwei Chai, Guoyin Wang, Jing Su, Tianjie Zhang, Xuanwen Huang

**Year:** 2024 | **Venue:** ACL 2024 | **Citations:** N/A | **Score:** 0.443

[PDF](https://aclanthology.org/2024.acl-long.614.pdf) | > We present Expert-Token-Routing, a unified generalist framework that facilitates seamless integration of multiple expert LLMs. Our framework represents expert LLMs as special expert tokens within the vocabulary of a meta LLM. The meta LLM can route to an expert LLM like generating new tokens. Expert-Token-Routing not only supports learning the implicit expertise of expert LLMs from existing instru...

---

## 8. A Peek into Token Bias: Large Language Models Are Not Yet Genuine Reasoners

**Authors:** Bowen Jiang, Yangxinyu Xie, Zhuoqun Hao, Xiaomeng Wang, Tanwi Mallick

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.441

[PDF](https://aclanthology.org/2024.emnlp-main.272.pdf) | > This study introduces a hypothesis-testing framework to assess whether large language models (LLMs) possess genuine reasoning abilities or primarily depend on token bias. We go beyond evaluating LLMs on accuracy; rather, we aim to investigate their token bias in solving logical reasoning tasks. Specifically, we develop carefully controlled synthetic datasets, featuring conjunction fallacy and syll...

---

## 9. Aligner: One Global Token is Worth Millions of Parameters When Aligning LLMs

**Authors:** Zhou Ziheng, Ying Nian Wu, Song-Chun Zhu, Demetri Terzopoulos

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.457

> We introduce Aligner, a novel Parameter-Efficient Fine-Tuning (PEFT) method for aligning multi-billion-sized Large Language Models (LLMs). Aligner employs a unique design that constructs a globally shared set of tunable tokens that will change the attention of every layer. Remarkably with this method, even when using one token accounting for a mere 5,000 parameters, Aligner can still perform compa...

---

## 10. Token Compensator: Altering Inference Cost of Vision Transformer without Re-Tuning

**Authors:** Shibo Jie, Yehui Tang, Jianyuan Guo, Zhi-Hong Deng*, Kai Han*

**Year:** 2024 | **Venue:** ECCV 2024 | **Citations:** N/A | **Score:** 0.458

[PDF](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/02429.pdf) | > "Token compression expedites the training and inference of Vision Transformers (ViTs) by reducing the number of the redundant tokens, , pruning inattentive tokens or merging similar tokens. However, when applied to downstream tasks, these approaches suffer from significant performance drop when the compression degrees are mismatched between training and inference stages, which limits the applicati...

---

## 11. MSDS: A Large-Scale Chinese Signature and Token Digit String Dataset for Handwriting Verification

**Authors:** Peirong Zhang, Jiajia Jiang, Yuliang Liu, Lianwen Jin

**Year:** 2022 | **Venue:** NIPS 2022 | **Citations:** N/A | **Score:** 0.389

[PDF](https://openreview.net/pdf?id=EONuSdDjJrp) | > Although online handwriting verification has made great progress recently, the verification performances are still far behind the real usage owing to the small scale of the datasets as well as the limited biometric mediums. Therefore, this paper proposes a new handwriting verification benchmark dataset named Multimodal Signature and Digit String (MSDS), which consists of two subsets: MSDS-ChS (Chi...

---

## 12. Unveiling Selection Biases: Exploring Order and Token Sensitivity in Large Language Models

**Authors:** Sheng-Lun Wei, Cheng-Kuang Wu, Hen-Hsen Huang, Hsin-Hsi Chen

**Year:** 2024 | **Venue:** ACL 2024 | **Citations:** N/A | **Score:** 0.440

[PDF](https://aclanthology.org/2024.findings-acl.333.pdf) | > In this paper, we investigate the phenomena of “selection biases” in Large Language Models (LLMs), focusing on problems where models are tasked with choosing the optimal option from an ordered sequence. We delve into biases related to option order and token usage, which significantly impact LLMs’ decision-making processes. We also quantify the impact of these biases through an extensive empirical ...

---

## 13. LLMs as Zero-shot Graph Learners: Alignment of GNN Representations with LLM Token Embeddings

**Authors:** Duo Wang, Yuan Zuo, Fengzhi Li, Junjie Wu

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.463

[PDF](https://openreview.net/pdf?id=32g9BWTndc) | > Zero-shot graph machine learning, especially with graph neural networks (GNNs), has garnered significant interest due to the challenge of scarce labeled data. While methods like self-supervised learning and graph prompt learning have been extensively explored, they often rely on fine-tuning with task-specific labels, limiting their effectiveness in zero-shot scenarios. Inspired by the zero-shot ca...

---

## 14. ZipCache: Accurate and Efficient KV Cache Quantization with Salient Token Identification

**Authors:** Yefei He, Luoming Zhang, Weijia Wu, Jing Liu, Hong Zhou

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.436

[PDF](https://openreview.net/pdf?id=5t4ZAkPiJs) | > KV cache stores key and value states from previous tokens to avoid re-computation, yet it demands substantial storage space, especially for long sequences. 
  Adaptive KV cache compression seeks to discern the saliency of tokens, preserving vital information while aggressively compressing those of less importance.
  However, previous methods of this approach exhibit significant performance degrada...

---

## 15. Focus on the Core: Efficient Attention via Pruned Token Compression for Document Classification

**Authors:** JungMin Yun, MiHyeon Kim, YoungBin Kim

**Year:** 2023 | **Venue:** EMNLP 2023 | **Citations:** N/A | **Score:** 0.426

> Transformer-based models have achieved dominant performance in numerous NLP tasks. Despite their remarkable successes, pre-trained transformers such as BERT suffer from a computationally expensive self-attention mechanism that interacts with all tokens, including the ones unfavorable to classification performance. To overcome these challenges, we propose integrating two strategies: token pruning a...

---

## 16. TCRA-LLM: Token Compression Retrieval Augmented Large Language Model for Inference Cost Reduction

**Authors:** Junyi Liu, Liangzhi Li, Tong Xiang, Bowen Wang, Yiming Qian

**Year:** 2023 | **Venue:** EMNLP 2023 | **Citations:** N/A | **Score:** 0.503

> Since ChatGPT released its API for public use, the number of applications built on top of commercial large language models (LLMs) increase exponentially. One popular usage of such models is leveraging its in-context learning ability and generating responses given user queries leveraging knowledge obtained by retrieval augmentation. One problem of deploying commercial retrieval-augmented LLMs is th...

---

## 17. Breaking the Ceiling of the LLM Community by Treating Token Generation as a Classification for Ensembling

**Authors:** Yao-Ching Yu, Chun Chih Kuo, Ye Ziqi, Chang Yucheng, Yueh-Se Li

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.447

[PDF](https://aclanthology.org/2024.findings-emnlp.99.pdf) | > Ensembling multiple models has always been an effective approach to push the limits of existing performance and is widely used in classification tasks by simply averaging the classification probability vectors from multiple classifiers to achieve better accuracy. However, in the thriving open-source Large Language Model (LLM) community, ensembling methods are rare and typically limited to ensembli...

---

## 18. Reasoning in Token Economies: Budget-Aware Evaluation of LLM Reasoning Strategies

**Authors:** Junlin Wang, Siddhartha Jain, Dejiao Zhang, Baishakhi Ray, Varun Kumar

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.416

[PDF](https://aclanthology.org/2024.emnlp-main.1112.pdf) | > A diverse array of reasoning strategies has been proposed to elicit the capabilities of large language models. However, in this paper, we point out that traditional evaluations which focus solely on performance metrics miss a key factor: the increased effectiveness due to additional compute. By overlooking this aspect, a skewed view of strategy efficiency is often presented. This paper introduces ...

---

## 19. Adaptive Frequency Filters As Efficient Global Token Mixers

**Authors:** Zhipeng Huang, Zhizheng Zhang, Cuiling Lan, Zheng-Jun Zha, Yan Lu

**Year:** 2023 | **Venue:** ICCV 2023 | **Citations:** N/A | **Score:** 0.409

[PDF](https://openaccess.thecvf.com/content/ICCV2023/papers/Huang_Adaptive_Frequency_Filters_As_Efficient_Global_Token_Mixers_ICCV_2023_paper.pdf) | > Recent vision transformers, large-kernel CNNs and MLPs have attained remarkable successes in broad vision tasks thanks to their effective information fusion in the global scope. However, their efficient deployments, especially on mobile devices, still suffer from noteworthy challenges due to the heavy computational costs of self-attention mechanisms, large kernels, or fully connected layers. In th...

---

## 20. Token Erasure as a Footprint of Implicit Vocabulary Items in LLMs

**Authors:** Sheridan Feucht, David Atkinson, Byron C Wallace, David Bau

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.463

[PDF](https://aclanthology.org/2024.emnlp-main.543.pdf) | > LLMs process text as sequences of tokens that roughly correspond to words, where less common words are represented by multiple tokens. However, individual tokens are often semantically unrelated to the meanings of the words/concepts they comprise. For example, Llama-2-7b’s tokenizer splits the word “patrolling” into two tokens, “pat” and “rolling”, neither of which correspond to semantically meani...

---

## 21. IVTP: Instruction-guided Visual Token Pruning for Large Vision-Language Models

**Authors:** Kai Huang*, Hao Zou, Ye Xi, Bochen Wang, Zhen Xie

**Year:** 2024 | **Venue:** ECCV 2024 | **Citations:** N/A | **Score:** 0.443

[PDF](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/02577.pdf) | > "Inspired by the remarkable achievements of Large Language Models (LLMs), Large Vision-Language Models (LVLMs) have likewise experienced significant advancements. However, the increased computational cost and token budget occupancy associated with lengthy visual tokens pose significant challenge to the practical applications. Considering that not all visual tokens are essential to the final respon...

---

## 22. Instruction Tuning-free Visual Token Complement for Multimodal LLMs

**Authors:** Dongsheng Wang*, Jiequan Cui, Miaoge Li, Wang Lin, Bo Chen

**Year:** 2024 | **Venue:** ECCV 2024 | **Citations:** N/A | **Score:** 0.430

[PDF](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/10652.pdf) | > "As the open community of large language models (LLMs) matures, multimodal LLMs (MLLMs) have promised an elegant bridge between vision and language. However, current research is inherently constrained by challenges such as the need for high-quality instruction pairs and the loss of visual information in image-to-text training objectives. To this end, we propose a Visual Token Complement framework ...

---

## 23. A principled framework for the design and analysis of token algorithms

**Authors:** Hadrien Hendrikx

**Year:** 2023 | **Venue:** AISTATS 2023 | **Citations:** N/A | **Score:** 0.431

[PDF](https://proceedings.mlr.press/v206/hendrikx23a/hendrikx23a.pdf) | > We consider a decentralized optimization problem, in which n nodes collaborate to optimize a global objective function using local communications only. While many decentralized algorithms focus on gossip communications (pairwise averaging), we consider a different scheme, in which a “token” that contains the current estimate of the model performs a random walk over the network, and updates its mod...

---

## 24. Accelerating Transformers with Spectrum-Preserving Token Merging

**Authors:** Hoai-Chau Tran, Duy Minh Ho Nguyen, Manh-Duy Nguyen, TrungTin Nguyen, Ngan Hoang Le

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.419

[PDF](https://openreview.net/pdf?id=PPdJPIO3mV) | > Increasing the throughput of the Transformer architecture, a foundational component used in numerous state-of-the-art models for vision and language tasks (e.g., GPT, LLaVa), is an important problem in machine learning. One recent and effective strategy is to merge token representations within Transformer models, aiming to reduce computational and memory requirements while maintaining accuracy. Pr...

---

## 25. Token Fusion: Bridging the Gap Between Token Pruning and Token Merging

**Authors:** Minchul Kim, Shangqian Gao, Yen-Chang Hsu, Yilin Shen, Hongxia Jin

**Year:** 2024 | **Venue:** WACV 2024 | **Citations:** N/A | **Score:** 0.476

[PDF](https://openaccess.thecvf.com/content/WACV2024/papers/Kim_Token_Fusion_Bridging_the_Gap_Between_Token_Pruning_and_Token_WACV_2024_paper.pdf) | > Vision Transformers (ViTs) have emerged as powerful backbones in computer vision, outperforming many traditional CNNs. However, their computational overhead, largely attributed to the self-attention mechanism, makes deployment on resource-constrained edge devices challenging. Multiple solutions rely on token pruning or token merging. In this paper, we introduce "Token Fusion" (ToFu), a method that...

---

