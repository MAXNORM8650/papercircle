# Research Papers: efficient finetuning

Updated: 2026-01-02 16:08
Total: 79 papers

---

## 1. QLoRA: Efficient Finetuning of Quantized LLMs

**Authors:** Tim Dettmers, Artidoro Pagnoni, Ari Holtzman, Luke Zettlemoyer

**Year:** 2023 | **Venue:** Neural Information Processing Systems | **Citations:** 3602 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2305.14314) | [DOI](https://doi.org/10.48550/arXiv.2305.14314)

> We present QLoRA, an efficient finetuning approach that reduces memory usage enough to finetune a 65B parameter model on a single 48GB GPU while preserving full 16-bit finetuning task performance. QLoRA backpropagates gradients through a frozen, 4-bit quantized pretrained language model into Low Rank Adapters~(LoRA). Our best model family, which we name Guanaco, outperforms all previous openly rel...

---

## 2. Multilingual Speech Translation from Efficient Finetuning of Pretrained Models

**Authors:** Xian Li, Changhan Wang, Yun Tang, C. Tran, Yuqing Tang

**Year:** 2021 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 163 | **Score:** 0.000

[PDF](https://aclanthology.org/2021.acl-long.68.pdf) | [DOI](https://doi.org/10.18653/v1/2021.acl-long.68)

> We present a simple yet effective approach to build multilingual speech-to-text (ST) translation through efficient transfer learning from a pretrained speech encoder and text decoder. Our key finding is that a minimalistic LNA (LayerNorm and Attention) finetuning can achieve zero-shot crosslingual and cross-modality transfer ability by only finetuning 10 50% of the pretrained parameters. This effe...

---

## 3. Convolution Meets LoRA: Parameter Efficient Finetuning for Segment Anything Model

**Authors:** Zihan Zhong, Zhiqiang Tang, Tong He, Haoyang Fang, Chun Yuan

**Year:** 2024 | **Venue:** International Conference on Learning Representations | **Citations:** 78 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2401.17868)

> The Segment Anything Model (SAM) stands as a foundational framework for image segmentation. While it exhibits remarkable zero-shot generalization in typical scenarios, its advantage diminishes when applied to specialized domains like medical imagery and remote sensing. To address this limitation, this paper introduces Conv-LoRA, a simple yet effective parameter-efficient fine-tuning approach. By i...

---

## 4. Data-Efficient Finetuning Using Cross-Task Nearest Neighbors

**Authors:** Hamish Ivison, Noah A. Smith, Hannaneh Hajishirzi, Pradeep Dasigi

**Year:** 2022 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 30 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2212.00196) | [DOI](https://doi.org/10.48550/arXiv.2212.00196)

> Obtaining labeled data to train a model for a task of interest is often expensive. Prior work shows training models on multitask data augmented with task descriptions (prompts) effectively transfers knowledge to new tasks. Towards efficiently building task-specific models, we assume access to a small number (32-1000) of unlabeled target-task examples and use those to retrieve the most similar labe...

---

## 5. Parameter-Efficient Finetuning of Transformers for Source Code

**Authors:** Shamil Ayupov, Nadezhda Chirkova

**Year:** 2022 | **Venue:** arXiv.org | **Citations:** 22 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2212.05901) | [DOI](https://doi.org/10.48550/arXiv.2212.05901)

> Pretrained Transformers achieve state-of-the-art performance in various code-processing tasks but may be too large to be deployed. As software development tools often incorporate modules for various purposes which may potentially use a single instance of the pretrained model, it appears relevant to utilize parameter-efficient fine-tuning for the pretrained models of code. In this work, we test two...

---

## 6. KnowLA: Enhancing Parameter-efficient Finetuning with Knowledgeable Adaptation

**Authors:** Xindi Luo, Zequn Sun, Jing Zhao, Zhe Zhao, Wei Hu

**Year:** 2024 | **Venue:** North American Chapter of the Association for Computational Linguistics | **Citations:** 15 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2403.14950)

> Parameter-efficient finetuning (PEFT) is a key technique for adapting large language models (LLMs) to downstream tasks. In this paper, we study leveraging knowledge graph embeddings to improve the effectiveness of PEFT. We propose a knowledgeable adaptation method called KnowLA. It inserts an adaptation layer into an LLM to integrate the embeddings of entities appearing in the input text. The adap...

---

## 7. Reducing Communication Overhead in Federated Learning for Pre-trained Language Models Using Parameter-Efficient Finetuning

**Authors:** Shubham Malaviya, Manish Shukla, S. Lodha

**Year:** 2023 | **Venue:** CoLLAs | **Citations:** 14 | **Score:** 0.000

> ...

---

## 8. Time Sensitive Knowledge Editing through Efficient Finetuning

**Authors:** Xiou Ge, Ali Mousavi, Edouard Grave, Armand Joulin, Kun Qian

**Year:** 2024 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 11 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2406.04496)

> Large Language Models (LLMs) have demonstrated impressive capability in different tasks and are bringing transformative changes to many domains. However, keeping the knowledge in LLMs up-to-date remains a challenge once pretraining is complete. It is thus essential to design effective methods to both update obsolete knowledge and induce new knowledge into LLMs. Existing locate-and-edit knowledge e...

---

## 9. Parameter-Efficient Finetuning for Robust Continual Multilingual Learning

**Authors:** Kartikeya Badola, Shachi Dave, P. Talukdar

**Year:** 2022 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 11 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2209.06767) | [DOI](https://doi.org/10.48550/arXiv.2209.06767)

> We introduce and study the problem of Continual Multilingual Learning (CML) where a previously trained multilingual model is periodically updated using new data arriving in stages. If the new data is present only in a subset of languages, we find that the resulting model shows improved performance only on the languages included in the latest update (and a few closely related languages) while its p...

---

## 10. Parameter Efficient Finetuning for Speech Emotion Recognition and Domain Adaptation

**Authors:** Nineli Lashkarashvili, Wen Wu, Guangzhi Sun, P. Woodland

**Year:** 2024 | **Venue:** IEEE International Conference on Acoustics, Speech, and Signal Processing | **Citations:** 10 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2402.11747) | [DOI](https://doi.org/10.1109/ICASSP48485.2024.10446272)

> Foundation models have shown superior performance for speech emotion recognition (SER). However, given the limited data in emotion corpora, finetuning all parameters of large pre-trained models for SER can be both resource-intensive and susceptible to overfitting. This paper investigates parameter-efficient finetuning (PEFT) for SER. Various PEFT adaptors are systematically studied for both classi...

---

## 11. Customizing Large Language Model Generation Style using Parameter-Efficient Finetuning

**Authors:** Xinyue Liu, Harshita Diddee, Daphne Ippolito

**Year:** 2024 | **Venue:** International Conference on Natural Language Generation | **Citations:** 9 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2409.04574)

> One-size-fits-all large language models (LLMs) are increasingly being used to help people with their writing. However, the style these models are trained to write in may not suit all users or use cases. LLMs would be more useful as writing assistants if their idiolect could be customized to match each user. In this paper, we explore whether parameter-efficient finetuning (PEFT) with Low-Rank Adapt...

---

## 12. PEFT-Ref: A Modular Reference Architecture and Typology for Parameter-Efficient Finetuning Techniques

**Authors:** Mohammed Sabry, Anya Belz

**Year:** 2023 | **Venue:** arXiv.org | **Citations:** 9 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2304.12410) | [DOI](https://doi.org/10.48550/arXiv.2304.12410)

> Recent parameter-efficient finetuning (PEFT) techniques aim to improve over the considerable cost of fully finetuning large pretrained language models (PLM). As different PEFT techniques proliferate, it is becoming difficult to compare them, in particular in terms of (i) the structure and functionality they add to the PLM, (ii) the different types and degrees of efficiency improvements achieved, (...

---

## 13. ETHER: Efficient Finetuning of Large-Scale Models with Hyperplane Reflections

**Authors:** Massimo Bini, Karsten Roth, Zeynep Akata, A. Khoreva

**Year:** 2024 | **Venue:** International Conference on Machine Learning | **Citations:** 8 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.20271)

> Parameter-efficient finetuning (PEFT) has become ubiquitous to adapt foundation models to downstream task requirements while retaining their generalization ability. However, the amount of additionally introduced parameters and compute for successful adaptation and hyperparameter searches can explode quickly, especially when deployed at scale to serve numerous individual requests. To ensure effecti...

---

## 14. Efficient Finetuning Large Language Models For Vietnamese Chatbot

**Authors:** Vu-Thuan Doan, Quoc-Truong Truong, Duc-Vu Nguyen, Vinh-Tiep Nguyen, Thuy-Ngan Nguyen Luu

**Year:** 2023 | **Venue:** International Conference on Multimedia Analysis and Pattern Recognition | **Citations:** 8 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2309.04646) | [DOI](https://doi.org/10.1109/MAPR59823.2023.10288647)

> Large language models (LLMs), such as GPT-4, PaLM, and LLaMa, have been shown to achieve remarkable performance across a variety of natural language tasks. Recent advancements in instruction tuning bring LLMs with ability in following user’s instructions and producing human-like responses. However, the high costs associated with training and implementing LLMs pose challenges to academic research. ...

---

## 15. Dr2Net: Dynamic Reversible Dual-Residual Networks for Memory-Efficient Finetuning

**Authors:** Chen Zhao, Shuming Liu, K. Mangalam, Guocheng Qian, Fatimah Zohra

**Year:** 2024 | **Venue:** Computer Vision and Pattern Recognition | **Citations:** 7 | **Score:** 0.000

[DOI](https://doi.org/10.1109/CVPR52733.2024.01499)

> Large pretrained models are increasingly crucial in modern computer vision tasks. These models are typically used in downstream tasks by end-to-end finetuning, which is highly memory-intensive for tasks with high-resolution data, e.g., video understanding, small object detection, and point cloud analysis. In this paper, we propose Dynamic Reversible Dual-Residual Networks, or Dr2Net, a novel famil...

---

## 16. Trans-LoRA: towards data-free Transferable Parameter Efficient Finetuning

**Authors:** Runqian Wang, Soumya Ghosh, David Cox, Diego Antognini, Aude Oliva

**Year:** 2024 | **Venue:** Neural Information Processing Systems | **Citations:** 7 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.17258)

> Low-rank adapters (LoRA) and their variants are popular parameter-efficient fine-tuning (PEFT) techniques that closely match full model fine-tune performance while requiring only a small number of additional parameters. These additional LoRA parameters are specific to the base model being adapted. When the base model needs to be deprecated and replaced with a new one, all the associated LoRA modul...

---

## 17. MAPLE: Multilingual Evaluation of Parameter Efficient Finetuning of Large Language Models

**Authors:** Divyanshu Aggarwal, Ashutosh Sathe, Ishaan Watts, Sunayana Sitaram

**Year:** 2024 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 4 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2401.07598)

> Parameter Efficient Finetuning (PEFT) has emerged as a viable solution for improving the performance of Large Language Models (LLMs) without requiring massive resources and compute. Prior work on multilingual evaluation has shown that there is a large gap between the performance of LLMs on English and other languages. Further, there is also a large gap between the performance of smaller open-sourc...

---

## 18. SubTuning: Efficient Finetuning for Multi-Task Learning

**Authors:** Gal Kaplun, Andrey Gurevich, Tal Swisa, Mazor David, Shai Shalev-Shwartz

**Year:** 2023 | **Venue:** arXiv.org | **Citations:** 4 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2302.06354) | [DOI](https://doi.org/10.48550/arXiv.2302.06354)

> ...

---

## 19. Evaluating Parameter-Efficient Finetuning Approaches for Pre-trained Models on the Financial Domain

**Authors:** Isabella Olariu, Cedric Lothritz, Jacques Klein, Tégawendé F. Bissyandé, Siwen Guo

**Year:** 2023 | **Venue:** Conference on Empirical Methods in Natural Language Processing | **Citations:** 4 | **Score:** 0.000

[PDF](https://aclanthology.org/2023.findings-emnlp.1035.pdf) | [DOI](https://doi.org/10.18653/v1/2023.findings-emnlp.1035)

> ,...

---

## 20. Parameter efficient finetuning of text-to-image models with trainable self-attention layer

**Authors:** Zhuoyuan Li, Yi Sun

**Year:** 2024 | **Venue:** Image and Vision Computing | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.1016/j.imavis.2024.105296)

> ...

---

## 21. SELFprot: Effective and Efficient Multitask Finetuning Methods for Protein Parameter Prediction

**Authors:** Marltan Wilson, Thomas Coudrat, Andrew Warden

**Year:** 2025 | **Venue:** J. Chem. Inf. Model. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1021/ACS.JCIM.4C02230)

> ...

---

## 22. Few-Shot Parameter Efficient Finetuning for SAM in Salient Steel Surface Defect Detection

**Authors:** Jiaojiao Su, Qiwu Luo, Weihua Gui 0001, Chunhua Yang 0001

**Year:** 2025 | **Venue:** IEEE Trans. Ind. Informatics | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/TII.2025.3574815)

> ...

---

## 23. From PEFT to DEFT: Parameter Efficient Finetuning for Reducing Activation Density in Transformers

**Authors:** Bharat Runwal, Tejaswini Pedapati, Pin-Yu Chen

**Year:** 2025 | **Venue:** AAAI | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1609/AAAI.V39I19.34227)

> ...

---

## 24. RoCoFT: Efficient Finetuning of Large Language Models with Row-Column Updates

**Authors:** Md. Kowsher, Tara Esmaeilbeig, Chun-Nam Yu, Chen Chen, Mojtaba Soltanalian

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

> ...

---

## 25. ClusComp: A Simple Paradigm for Model Compression and Efficient Finetuning

**Authors:** Baohao Liao, Christian Herold, Seyyed Hadi Hashemi, Stefan Vasilev, Shahram Khadivi

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

> ...

---

## 26. Smarter, Better, Faster, Longer: A Modern Bidirectional Encoder for Fast, Memory Efficient, and Long Context Finetuning and Inference

**Authors:** Benjamin Warner, Antoine Chaffin, Benjamin Clavié, Orion Weller, Oskar Hallström

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

> ...

---

## 27. VEEF-Multi-LLM: Effective Vocabulary Expansion and Parameter Efficient Finetuning Towards Multilingual Large Language Models

**Authors:** Jiu Sha, Mengxiao Zhu 0004, Chong Feng, Yuming Shang

**Year:** 2025 | **Venue:** COLING | **Citations:** N/A | **Score:** 0.000

> ...

---

## 28. Efficient Finetuning for Dimensional Speech Emotion Recognition in the Age of Transformers

**Authors:** Aneesha Sampath, James Tavernor, Emily Mower Provost

**Year:** 2025 | **Venue:** ICASSP | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/ICASSP49660.2025.10889878)

> ...

---

## 29. LLMProto: A Hardware-Efficient Finetuning Model for Few-Shot Relation Extraction with Large Language Model

**Authors:** Longyi Ye, Huaping Zhang

**Year:** 2025 | **Venue:** ICASSP | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/ICASSP49660.2025.10889770)

> ...

---

## 30. HERO: Human-Feedback Efficient Reinforcement Learning for Online Diffusion Model Finetuning

**Authors:** Ayano Hiranaka, Shang-Fu Chen, Chieh-Hsin Lai, Dongjun Kim, Naoki Murata

**Year:** 2025 | **Venue:** ICLR | **Citations:** N/A | **Score:** 0.000

> ...

---

## 31. GPTAQ: Efficient Finetuning-Free Quantization for Asymmetric Calibration

**Authors:** Yuhang Li 0001, Ruokai Yin, Donghyun Lee 0002, Shiting Xiao, Priyadarshini Panda

**Year:** 2025 | **Venue:** ICML | **Citations:** N/A | **Score:** 0.000

> ...

---

## 32. Efficient Multilingual ASR Finetuning via LoRA Language Experts

**Authors:** Jiahong Li, Yiwen Shao, Jianheng Zhuo, Chenda Li, Liliang Tang

**Year:** 2025 | **Venue:** INTERSPEECH | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.21437/INTERSPEECH.2025-1374)

> ...

---

## 33. MiLoRA: Harnessing Minor Singular Components for Parameter-Efficient LLM Finetuning

**Authors:** Hanqing Wang 0003, Yixia Li, Shuo Wang 0013, Guanhua Chen 0001, Yun Chen 0007

**Year:** 2025 | **Venue:** NAACL | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.18653/V1/2025.NAACL-LONG.248)

> ...

---

## 34. Efficient Zero-Order Federated Finetuning of Language Models for Resource-Constrained Devices

**Authors:** Mohamed Aboelenien Ahmed, Kilian Pfeiffer, Ramin Khalili, Heba Khdr, Jörg Henkel

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2502.10239)

> ...

---

## 35. ProtoBERT-LoRA: Parameter-Efficient Prototypical Finetuning for Immunotherapy Study Identification

**Authors:** Shijia Zhang, Xiyu Ding, Kai Ding, Jacob Zhang, Kevin Galinsky

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2503.20179)

> ...

---

## 36. GPTQv2: Efficient Finetuning-Free Quantization for Asymmetric Calibration

**Authors:** Yuhang Li 0001, Ruokai Yin, Donghyun Lee 0002, Shiting Xiao, Priyadarshini Panda

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2504.02692)

> ...

---

## 37. Efficient Reinforcement Finetuning via Adaptive Curriculum Learning

**Authors:** Taiwei Shi, Yiyang Wu, Linxin Song, Tianyi Zhou 0001, Jieyu Zhao 0001

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2504.05520)

> ...

---

## 38. PT-MoE: An Efficient Finetuning Framework for Integrating Mixture-of-Experts into Prompt Tuning

**Authors:** Zongqian Li, Yixuan Su, Nigel Collier

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2505.09519)

> ...

---

## 39. Follow-Your-Motion: Video Motion Transfer via Efficient Spatial-Temporal Decoupled Finetuning

**Authors:** Yue Ma, Yulong Liu, Qiyuan Zhu, Ayden Yang, Kunyu Feng

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2506.05207)

> ...

---

## 40. PLoP: Precise LoRA Placement for Efficient Finetuning of Large Models

**Authors:** Soufiane Hayou, Nikhil Ghosh, Bin Yu 0001

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2506.20629)

> ...

---

## 41. Coordinated Humanoid Manipulation with Choice Policies

**Authors:** Haozhi Qi, Yen-Jen Wang, Toru Lin, Brent Yi, Yi Ma

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25072v1) | > Humanoid robots hold great promise for operating in human-centric environments, yet achieving robust whole-body coordination across the head, hands, and legs remains a major challenge. We present a system that combines a modular teleoperation interface with a scalable learning framework to address this problem. Our teleoperation design decomposes humanoid control into intuitive submodules, which i...

---

## 42. Melting curve of correlated iron at Earth's core conditions from machine-learned DFT+DMFT

**Authors:** Rishi Rao, Li Zhu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25061v1) | > Reliable constraints on iron's melting curve at Earth's inner-core boundary require accurate finite-temperature electronic correlations, yet DFT+DMFT calculations remain too costly for large-scale thermodynamic sampling. Here, we develop a machine-learning accelerator for charge self-consistent DFT+DMFT by training E(3)-equivariant graph neural networks to predict the local self-energy and Fermi l...

---

## 43. Sequential Bayesian parameter-state estimation in dynamical systems with noisy and incomplete observations via a variational framework

**Authors:** Liliang Wang, Alex Gorodetsky

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25056v1) | > Online joint estimation of unknown parameters and states in a dynamical system with uncertainty quantification is crucial in many applications. For example, digital twins dynamically update their knowledge of model parameters and states to support prediction and decision-making. Reliability and computational speed are vital for DTs. Online parameter-state estimation ensures computational efficienc...

---

## 44. Context-aware LLM-based AI Agents for Human-centered Energy Management Systems in Smart Buildings

**Authors:** Tianzhi He, Farrokh Jazizadeh

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25055v1) | > This study presents a conceptual framework and a prototype assessment for Large Language Model (LLM)-based Building Energy Management System (BEMS) AI agents to facilitate context-aware energy management in smart buildings through natural language interaction. The proposed framework comprises three modules: perception (sensing), central control (brain), and action (actuation and user interaction),...

---

## 45. All optical Lithography for Spatiotemporal Patterning of Azopolymer Microreliefs

**Authors:** I Komang Januariyasa, Francesco Reda, Nikolai Liubimtsev, Marina Saphiannikova, Fabio Borbone

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25048v1) | > Microstructured surfaces are central to photonics, biointerfaces, and functional coatings, yet they are typically fabricated through multi-step lithographic workflows requiring masks or molds and post-processing. Azopolymers provide an alternative route by converting structured optical fields into surface reliefs via light-induced mass migration, but existing approaches have been limited to smooth...

---

## 46. Thin Tree Verification is coNP-Complete

**Authors:** Alice Moayyedi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25043v1) | > An $α$-thin tree $T$ of a graph $G$ is a spanning tree such that every cut of $G$ has at most an $α$ proportion of its edges in $T$. The Thin Tree Conjecture proposes that there exists a function $f$ such that for any $α> 0$, every $f(α)$-edge-connected graph has an $α$-thin tree. Aside from its independent interest, an algorithm which could efficiently construct an $O(1)/k$-thin tree for a given ...

---

## 47. Modeling Language as a Sequence of Thoughts

**Authors:** Nasim Borazjanizadeh, James McClelland

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25026v1) | > Transformer language models can generate strikingly natural text by modeling language as a sequence of tokens. Yet, by relying primarily on surface-level co-occurrence statistics, they fail to form globally consistent latent representations of entities and events, lack of which contributes to brittleness in relational direction (e.g., reversal curse), contextualization errors, and data inefficienc...

---

## 48. Modewise Additive Factor Model for Matrix Time Series

**Authors:** Elynn Chen, Yuefeng Han, Jiayu Li, Ke Xu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25025v1) | > We introduce a Modewise Additive Factor Model (MAFM) for matrix-valued time series that captures row-specific and column-specific latent effects through an additive structure, offering greater flexibility than multiplicative frameworks such as Tucker and CP factor models. In MAFM, each observation decomposes into a row-factor component, a column-factor component, and noise, allowing distinct sourc...

---

## 49. ResponseRank: Data-Efficient Reward Modeling through Preference Strength Learning

**Authors:** Timo Kaufmann, Yannick Metz, Daniel Keim, Eyke Hüllermeier

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25023v1) | > Binary choices, as often used for reinforcement learning from human feedback (RLHF), convey only the direction of a preference. A person may choose apples over oranges and bananas over grapes, but which preference is stronger? Strength is crucial for decision-making under uncertainty and generalization of preference models, but hard to measure reliably. Metadata such as response times and inter-an...

---

## 50. Diffusion Language Models are Provably Optimal Parallel Samplers

**Authors:** Haozhe Jiang, Nika Haghtalab, Lijie Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25014v1) | > Diffusion language models (DLMs) have emerged as a promising alternative to autoregressive models for faster inference via parallel token generation. We provide a rigorous foundation for this advantage by formalizing a model of parallel sampling and showing that DLMs augmented with polynomial-length chain-of-thought (CoT) can simulate any parallel sampling algorithm using an optimal number of sequ...

---

## 51. At the intersection of Numerical Analysis and Spectral Geometry

**Authors:** Nilima Nigam

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25012v1) | > How do the geometric properties of a domain impact the spectrum of an operator defined on it? How do we compute accurate and reliable approximations of these spectra? The former question is studied in spectral geometry, and the latter is a central concern in numerical analysis. In this short expository survey we revisit the process of eigenvalue approximation, from the perspective of computational...

---

## 52. Fast Poisson brackets and constraint algebras in canonical gravity

**Authors:** Will Barker

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25007v1) | > In the study of alternative or extended theories of gravity, Dirac's Hamiltonian constraint algorithm is invaluable for enumerating the propagating modes and gauge symmetries. For gravity, this canonical approach is frequently applied as a means for finding pathologies such as strongly coupled modes; more generally it facilitates the reconstruction of gauge symmetries and the quantization of gauge...

---

## 53. Strategies for Overcoming Gradient Troughs in the ADAPT-VQE Algorithm

**Authors:** Jonas Stadelmann, Julian Übelher, Mafalda Ramôa, Bharath Sambasivam, Edwin Barnes

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25004v1) | > The adaptive derivative-assembled problem-tailored variational quantum eigensolver (ADAPT-VQE) provides a promising approach for simulating highly correlated quantum systems on quantum devices, as it strikes a balance between hardware efficiency, trainability, and accuracy. Although ADAPT-VQE avoids many of the shortcomings of other VQEs, it is sometimes hindered by a phenomenon known as gradient ...

---

## 54. Bi-C2R: Bidirectional Continual Compatible Representation for Re-indexing Free Lifelong Person Re-identification

**Authors:** Zhenyu Cui, Jiahuan Zhou, Yuxin Peng

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25000v1) | > Lifelong person Re-IDentification (L-ReID) exploits sequentially collected data to continuously train and update a ReID model, focusing on the overall performance of all data. Its main challenge is to avoid the catastrophic forgetting problem of old knowledge while training on new data. Existing L-ReID methods typically re-extract new features for all historical gallery images for inference after ...

---

## 55. Efficiently Estimating Data Efficiency for Language Model Fine-tuning

**Authors:** Gyung Hyun Je, Colin Raffel

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24991v1) | > While large language models (LLMs) demonstrate reasonable zero-shot capability across many downstream tasks, fine-tuning is a common practice to improve their performance. However, a task's data efficiency--i.e., the number of fine-tuning examples needed to achieve a desired level of performance--is often unknown, resulting in costly cycles of incremental annotation and retraining. Indeed, we demo...

---

## 56. Best Practices for Modelling Electrides

**Authors:** Lee A. Burton

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24989v1) | > Materials in which electrons occupy interstitial sites as anions are called electrides and exhibit unusual dimensionality-dependent electronic behavior. These properties make electrides attractive for catalysis, transparent conductors, and emergent quantum phenomena, yet their theoretical treatment remains challenging. In conventional materials, the ground-state atomic structure dictates the elect...

---

## 57. The Supersymmetry of Cuts in Pure Gauge Theory and Gravity

**Authors:** Jacob L. Bourjaily

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24984v1) | > At tree-level, scattering amplitudes involving only gluons or gravitons are unaffected by supersymmetry, allowing them to be efficiently encoded by and extracted from those of maximally supersymmetric (N=4,8) theories. This fails beyond tree-level, of course, but much less than would be expected. We show that all the leading singularities of (sub-maximally or) non-supersymmetric theories can be or...

---

## 58. Optical Spiking Neural Networks via Rogue-Wave Statistics

**Authors:** Bahadır Utku Kesgin, Gülsüm Yaren Durdu, Uğur Teğin

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24983v1) | > Optical computing could reduce the energy cost of artificial intelligence by leveraging the parallelism and propagation speed of light. However, implementing nonlinear activation, essential for machine learning, remains challenging in low-power optical systems dominated by linear wave physics. Here, we introduce an optical spiking neural network that uses optical rogue-wave statistics as a program...

---

## 59. Hierarchical Deformation Planning and Neural Tracking for DLOs in Constrained Environments

**Authors:** Yunxi Tang, Tianqi Yang, Jing Huang, Xiangyu Chu, Kwok Wai Samuel Au

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24974v1) | > Deformable linear objects (DLOs) manipulation presents significant challenges due to DLOs' inherent high-dimensional state space and complex deformation dynamics. The wide-populated obstacles in realistic workspaces further complicate DLO manipulation, necessitating efficient deformation planning and robust deformation tracking. In this work, we propose a novel framework for DLO manipulation in co...

---

## 60. Evaluating the Impact of Compression Techniques on the Robustness of CNNs under Natural Corruptions

**Authors:** Itallo Patrick Castro Alves Da Silva, Emanuel Adler Medeiros Pereira, Erick de Andrade Barboza, Baldoino Fonseca dos Santos Neto, Marcio de Medeiros Ribeiro

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24971v1) | > Compressed deep learning models are crucial for deploying computer vision systems on resource-constrained devices. However, model compression may affect robustness, especially under natural corruption. Therefore, it is important to consider robustness evaluation while validating computer vision systems. This paper presents a comprehensive evaluation of compression techniques - quantization, prunin...

---

## 61. Random Batch Sum-of-Gaussians Method for Molecular Dynamics of Born-Mayer-Huggins Systems

**Authors:** Chen Chen, Jiuyang Liang, Zhenli Xu, Qianru Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24970v1) | > The Born-Mayer-Huggins (BMH) potential, which combines Coulomb interactions with dispersion and short-range exponential repulsion, is widely used for ionic materials such as molten salts. However, large-scale molecular dynamics simulations of BMH systems are often limited by computation, communication, and memory costs. We recently proposed the random batch sum-of-Gaussians (RBSOG) method, which a...

---

## 62. Semi-overlapping Multi-bandit Best Arm Identification for Sequential Support Network Learning

**Authors:** András Antos, András Millinghoffer, Péter Antal

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24959v1) | > Many modern AI and ML problems require evaluating partners' contributions through shared yet asymmetric, computationally intensive processes and the simultaneous selection of the most beneficial candidates. Sequential approaches to these problems can be unified under a new framework, Sequential Support Network Learning (SSNL), in which the goal is to select the most beneficial candidate set of par...

---

## 63. High-performance quantum interconnect between bosonic modules beyond transmission loss constraints

**Authors:** Hongwei Huang, Jie Zhou, Weizhou Cai, Weiting Wang, Yilong Zhou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24926v1) | > Distributed quantum computing architectures require high-performance quantum interconnects between quantum information processing units, while previous implementations have been fundamentally limited by transmission line losses. Here, we demonstrate a low-loss interconnect between two superconducting modules using an aluminum coaxial cable, achieving a bus mode quality factor of 1.7e6. By employin...

---

## 64. Existence, uniqueness, and approximability of solutions to the classical Melan equation in suspension bridges

**Authors:** Jinxiang Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24915v1) | > The classical Melan equation modeling suspension bridges is considered. We first study the explicit expression and the uniform positivity of the analytical solution for the simplified ``less stiff'' model, based on which we develop a monotone iterative technique of lower and upper solutions to investigate the existence, uniqueness and approximability of the solution for the original classical Mela...

---

## 65. AI-Driven Cloud Resource Optimization for Multi-Cluster Environments

**Authors:** Vinoth Punniyamoorthy, Akash Kumar Agarwal, Bikesh Kumar, Abhirup Mazumder, Kabilan Kannan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24914v1) | > Modern cloud-native systems increasingly rely on multi-cluster deployments to support scalability, resilience, and geographic distribution. However, existing resource management approaches remain largely reactive and cluster-centric, limiting their ability to optimize system-wide behavior under dynamic workloads. These limitations result in inefficient resource utilization, delayed adaptation, and...

---

## 66. Videos are Sample-Efficient Supervisions: Behavior Cloning from Videos via Latent Representations

**Authors:** Xin Liu, Haoran Li, Dongbin Zhao

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.21586) | [DOI](https://doi.org/10.48550/arxiv.2512.21586)

> Humans can efficiently extract knowledge and learn skills from the videos within only a few trials and errors. However, it poses a big challenge to replicate this learning process for autonomous agents, due to the complexity of visual input, the absence of action or reward signals, and the limitations of interaction steps. In this paper, we propose a novel, unsupervised, and sample-efficient frame...

---

## 67. Universal Transient Stability Analysis: A Large Language Model-Enabled Dynamics Prediction Framework

**Authors:** Chao Shen, Ke Zuo, Mingyang Sun

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.20970) | [DOI](https://doi.org/10.48550/arxiv.2512.20970)

> Existing dynamics prediction frameworks for transient stability analysis (TSA) fail to achieve multi-scenario "universality"--the inherent ability of a single, pre-trained architecture to generalize across diverse operating conditions, unseen faults, and heterogeneous systems. To address this, this paper proposes TSA-LLM, a large language model (LLM)-based universal framework that models multi-var...

---

## 68. dUltra: Ultra-Fast Diffusion Language Models via Reinforcement Learning

**Authors:** Shirui Chen, Jiantao Jiao, Lillian J. Ratliff, Banghua Zhu

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.21446) | [DOI](https://doi.org/10.48550/arxiv.2512.21446)

> Masked diffusion language models (MDLMs) offer the potential for parallel token generation, but most open-source MDLMs decode fewer than 5 tokens per model forward pass even with sophisticated sampling strategies. As a result, their sampling speeds are often comparable to AR + speculative decoding schemes, limiting their advantage over mainstream autoregressive approaches. Existing distillation-ba...

---

## 69. PairFlow: Closed-Form Source-Target Coupling for Few-Step Generation in Discrete Flow Models

**Authors:** Mingue Park, Jisung Hwang, Seungwoo Yoo, Kyeongmin Yeo, Minhyuk Sung

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.20063) | [DOI](https://doi.org/10.48550/arxiv.2512.20063)

> We introduce $\texttt{PairFlow}$, a lightweight preprocessing step for training Discrete Flow Models (DFMs) to achieve few-step sampling without requiring a pretrained teacher. DFMs have recently emerged as a new class of generative models for discrete data, offering strong performance. However, they suffer from slow sampling due to their iterative nature. Existing acceleration methods largely dep...

---

## 70. Emergent temporal abstractions in autoregressive models enable hierarchical reinforcement learning

**Authors:** Seijin Kobayashi, Yanick Schimpf, Maximilian Schlegel, Angelika Steger, Maciej Wolczyk

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.20605) | [DOI](https://doi.org/10.48550/arxiv.2512.20605)

> Large-scale autoregressive models pretrained on next-token prediction and finetuned with reinforcement learning (RL) have achieved unprecedented success on many problem domains. During RL, these models explore by generating new outputs, one token at a time. However, sampling actions token-by-token can result in highly inefficient learning, particularly when rewards are sparse. Here, we show that i...

---

## 71. Distilling to Hybrid Attention Models via KL-Guided Layer Selection

**Authors:** Yanhong Li, Songlin Yang, Shawn Tan, Mayank Mishra, Rameswar Panda

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.20569) | [DOI](https://doi.org/10.48550/arxiv.2512.20569)

> Distilling pretrained softmax attention Transformers into more efficient hybrid architectures that interleave softmax and linear attention layers is a promising approach for improving the inference efficiency of LLMs without requiring expensive pretraining from scratch. A critical factor in the conversion process is layer selection, i.e., deciding on which layers to convert to linear attention var...

---

## 72. Designing Conversational AI for Social Robots in Corporate Contexts: A Case Study on Customizing LLMs through Action Research

**Authors:** Marcel Leichtle, Sven Schultze, Nils Lucas Schönfeld, Nadine Homburg, Ruth Maria Stock-Homburg

**Year:** 2025 | **Venue:** ScholarSpace (University of Hawaii at Manoa) | **Citations:** N/A | **Score:** 0.000

> This paper presents a case study on customizing Large Language Models (LLMs) for social robots in corporate environments. Over a year-long collaboration with an enterprise, we explored how LLMs can be integrated into multimodal assistants that operate across both embodied robot platforms and flexible digital interfaces. Using three iterative action research cycles, we developed and evaluated a sca...

---

## 73. lehmannfa/aurora-lite-decoder: v1.0

**Authors:** Fanny Lehmann

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18009320) | [DOI](https://doi.org/10.5281/zenodo.18009320)

> Extension of the Aurora weather foundation model using lightweight decoders for efficient finetuning...

---

## 74. Delta-LLaVA: Base-then-Specialize Alignment for Token-Efficient Vision-Language Models

**Authors:** Mohamad Zamini, Diksha Shukla

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.18910) | [DOI](https://doi.org/10.48550/arxiv.2512.18910)

> Multimodal Large Language Models (MLLMs) combine visual and textual representations to enable rich reasoning capabilities. However, the high computational cost of processing dense visual tokens remains a major bottleneck. A critical component in this pipeline is the visual projector, which bridges the vision encoder and the language model. Standard designs often employ a simple multi-layer percept...

---

## 75. EcoSplat: Efficiency-controllable Feed-forward 3D Gaussian Splatting from Multi-view Images

**Authors:** Jongmin Park, Minh-Quan Viet Bui, Juan Luis Gonzalez Bello, Jae-Ho Moon, Jihyong Oh

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.18692) | [DOI](https://doi.org/10.48550/arxiv.2512.18692)

> Feed-forward 3D Gaussian Splatting (3DGS) enables efficient one-pass scene reconstruction, providing 3D representations for novel view synthesis without per-scene optimization. However, existing methods typically predict pixel-aligned primitives per-view, producing an excessive number of primitives in dense-view settings and offering no explicit control over the number of predicted Gaussians. To a...

---

## 76. Chorus: Multi-Teacher Pretraining for Holistic 3D Gaussian Scene Encoding

**Authors:** Yue Li, Qi Ma, Runyi Yang, Mengjiao Ma, Bin Ren

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.17817) | [DOI](https://doi.org/10.48550/arxiv.2512.17817)

> While 3DGS has emerged as a high-fidelity scene representation, encoding rich, general-purpose features directly from its primitives remains under-explored. We address this gap by introducing Chorus, a multi-teacher pretraining framework that learns a holistic feed-forward 3D Gaussian Splatting (3DGS) scene encoder by distilling complementary signals from 2D foundation models. Chorus employs a sha...

---

## 77. Factorized Video Generation: Decoupling Scene Construction and Temporal Synthesis in Text-to-Video Diffusion Models

**Authors:** Hassan, Mariam, Van Delft, Bastien, Li, Wuyang, Alahi, Alexandre

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.16371) | [DOI](https://doi.org/10.48550/arxiv.2512.16371)

> State-of-the-art Text-to-Video (T2V) diffusion models can generate visually impressive results, yet they still frequently fail to compose complex scenes or follow logical temporal instructions. In this paper, we argue that many errors, including apparent motion failures, originate from the model's inability to construct a semantically correct or logically consistent initial frame. We introduce Fac...

---

## 78. Posterior Behavioral Cloning: Pretraining BC Policies for Efficient RL Finetuning

**Authors:** Wagenmaker, Andrew, Dong, Perry, Tsao, Raymond, Finn, Chelsea, Levine, Sergey

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.16911) | [DOI](https://doi.org/10.48550/arxiv.2512.16911)

> Standard practice across domains from robotics to language is to first pretrain a policy on a large-scale demonstration dataset, and then finetune this policy, typically with reinforcement learning (RL), in order to improve performance on deployment domains. This finetuning step has proved critical in achieving human or super-human performance, yet while much attention has been given to developing...

---

## 79. 3-in-1: 2D Rotary Adaptation for Efficient Finetuning, Efficient Batching and Composability

**Authors:** Baohao Liao, Christof Monz

**Year:** 2024 | **Venue:** NeurIPS | **Citations:** N/A | **Score:** 0.000

> ...

---

