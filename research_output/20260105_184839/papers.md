# Research Papers: hyperparameters or hypernetworks in LLMs and Transformers

Updated: 2026-01-05 18:49
Total: 50 papers

---

## 1. Parameter-efficient Multi-task Fine-tuning for Transformers via Shared Hypernetworks

**Authors:** Rabeeh Karimi Mahabadi, Sebastian Ruder, Mostafa Dehghani, James Henderson

**Year:** 2021 | **Venue:** ACL 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2021.acl-long.47.pdf) | > State-of-the-art parameter-efficient fine-tuning methods rely on introducing adapter modules between the layers of a pretrained language model. However, such modules are trained separately for each task and thus do not enable sharing information across tasks. In this paper, we show that we can learn adapter parameters for all layers and tasks by generating them using shared hypernetworks, which co...

---

## 2. Carrying over Algorithm in Transformers

**Authors:** Jorrit Kruthoff

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Addition is perhaps one of the simplest arithmetic tasks one can think of and is usually performed using the carrying over algorithm. This algorithm consists of two tasks: adding digits in the same position and carrying over a one whenever necessary. We study how transformer models implement this algorithm and how the two aforementioned tasks are allocated to different parts of the network. We fir...

---

## 3. Transformers As Meta-Learners for Implicit Neural Representations

**Authors:** Yinbo Chen, Xiaolong Wang

**Year:** 2022 | **Venue:** ECCV 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.ecva.net/papers/eccv_2022/papers_ECCV/papers/136770173.pdf) | > "Implicit Neural Representations (INRs) have emerged and shown their benefits over discrete representations in recent years. However, fitting an INR to the given observations usually requires optimization with gradient descent from scratch, which is inefficient and does not generalize well with sparse observations. To address this problem, most of the prior works train a hypernetwork that generate...

---

## 4. Molecule Property Prediction and Classification with Graph Hypernetworks

**Authors:** Eliya Nachmani, Lior Wolf

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Graph neural networks are currently leading the performance charts in learning-based molecule property prediction and classification. Computational chemistry has, therefore, become the a prominent testbed for generic graph neural networks, as well as for specialized message passing methods. In this work, we demonstrate that the replacement of the underlying networks with hypernetworks leads to a b...

---

## 5. Hypernetworks in Meta-Reinforcement Learning

**Authors:** Jacob Beck, Matthew Thomas Jackson, Risto Vuorio, Shimon Whiteson

**Year:** 2022 | **Venue:** CORL 2022 | **Citations:** N/A | **Score:** 0.000

> Training a reinforcement learning (RL) agent on a real-world robotics task remains generally impractical due to sample inefficiency. Multi-task RL and meta-RL aim to improve sample efficiency by generalizing over a distribution of related tasks. However, doing so is difficult in practice: In multi-task RL, state of the art methods often fail to outperform a degenerate solution that simply learns e...

---

## 6. Exploring the Sensitivity of LLMs' Decision-Making Capabilities: Insights from Prompt Variations and Hyperparameters

**Authors:** Manikanta Loya, Divya Anand Sinha, Richard Futrell

**Year:** 2023 | **Venue:** EMNLP 2023 | **Citations:** N/A | **Score:** 0.000

> The advancement of Large Language Models (LLMs) has led to their widespread use across a broad spectrum of tasks, including decision-making. Prior studies have compared the decision-making abilities of LLMs with those of humans from a psychological perspective. However, these studies have not always properly accounted for the sensitivity of LLMs’ behavior to hyperparameters and variations in the p...

---

## 7. Principled Weight Initialization for Hypernetworks

**Authors:** Oscar Chang, Lampros Flokas, Hod Lipson

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Hypernetworks are meta neural networks that generate weights for a main neural network in an end-to-end differentiable manner. Despite extensive applications ranging from multi-task learning to Bayesian deep learning, the problem of optimizing hypernetworks has not been studied to date. We observe that classical weight initialization methods like Glorot & Bengio (2010) and He et al. (2015), when a...

---

## 8. HyperEditor: Achieving Both Authenticity and Cross-Domain Capability in Image Editing via Hypernetworks

**Authors:** Hai Zhang, Chunwei Wu, Guitao Cao, Hailing Wang, Wenming Cao

**Year:** 2024 | **Venue:** AAAI 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://ojs.aaai.org/index.php/AAAI/article/view/28532/29037) | > Editing real images authentically while also achieving cross-domain editing remains a challenge. Recent studies have focused on converting real images into latent codes and accomplishing image editing by manipulating these codes. However, merely manipulating the latent codes would constrain the edited images to the generator's image domain, hindering the attainment of diverse editing goals. In res...

---

## 9. Delta-STN: Efficient Bilevel Optimization for Neural Networks using Structured Response Jacobians

**Authors:** Juhan Bae, Roger B Grosse

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/f754186469a933256d7d64095e963594-Paper.pdf) | > Hyperparameter optimization of neural networks can be elegantly formulated as a bilevel optimization problem. While research on bilevel optimization of neural networks has been dominated by implicit differentiation and unrolling, hypernetworks such as Self-Tuning Networks (STNs) have recently gained traction due to their ability to amortize the optimization of the inner objective. In this paper, w...

---

## 10. HyperPosePDF - Hypernetworks Predicting the Probability Distribution on SO(3)

**Authors:** Timon Höfer, Benjamin Kiefer, Martin Messmer, Andreas Zell

**Year:** 2023 | **Venue:** WACV 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/WACV2023/papers/Hofer_HyperPosePDF_-_Hypernetworks_Predicting_the_Probability_Distribution_on_SO3_WACV_2023_paper.pdf) | > Pose estimation of objects in images is an essential problem in virtual and augmented reality and robotics. Traditional solutions use depth cameras, which are expensive, and working solutions require long processing times. This work focuses on the more difficult task when only RGB information is available. To this end, we predict not only the pose of an object but the complete probability density ...

---

## 11. Depthwise Hyperparameter Transfer in Residual Networks: Dynamics and Scaling Limit

**Authors:** Blake Bordelon, Lorenzo Noci, Mufan Bill Li, Boris Hanin, Cengiz Pehlevan

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=KZJehvRKGD) | > The cost of hyperparameter tuning in deep learning has been rising with model sizes, prompting practitioners to find new tuning methods using a proxy of smaller networks. One such proposal uses $\mu$P parameterized networks, where the optimal hyperparameters for small width networks *transfer* to networks with arbitrarily large width. However, in this scheme, hyperparameters do not transfer across...

---

## 12. Hypernetworks for Zero-Shot Transfer in Reinforcement Learning

**Authors:** Sahand Rezaei-Shoshtari, Charlotte Morissette, Francois R. Hogan, Gregory Dudek, David Meger

**Year:** 2023 | **Venue:** AAAI 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://ojs.aaai.org/index.php/AAAI/article/view/26146/25918) | > In this paper, hypernetworks are trained to generate behaviors across a range of unseen task conditions, via a novel TD-based training objective and data from a set of near-optimal RL solutions for training tasks. This work relates to meta RL, contextual RL, and transfer learning, with a particular focus on  zero-shot performance at test time, enabled by knowledge of the task parameters (also know...

---

## 13. HYPERTTS: Parameter Efficient Adaptation in Text to Speech Using Hypernetworks

**Authors:** Yingting Li, Rishabh Bhardwaj, Ambuj Mehrish, Bo Cheng, Soujanya Poria

**Year:** 2024 | **Venue:** COLING 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.lrec-main.747.pdf) | > Neural speech synthesis, or text-to-speech (TTS), aims to transform a signal from the text domain to the speech domain. While developing TTS architectures that train and test on the same set of speakers has seen significant improvements, out-of-domain speaker performance still faces enormous limitations. Domain adaptation on a new set of speakers can be achieved by fine-tuning the whole model for ...

---

## 14. LLM can Achieve Self-Regulation via Hyperparameter Aware Generation

**Authors:** Siyin Wang, Shimin Li, Tianxiang Sun, Jinlan Fu, Qinyuan Cheng

**Year:** 2024 | **Venue:** ACL 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.findings-acl.396.pdf) | > In the realm of Large Language Models (LLMs), users commonly employ diverse decoding strategies and adjust hyperparameters to control the generated text. However, a critical question emerges: Are LLMs conscious of the existence of these decoding strategies and capable of regulating themselves? The current decoding generation process often relies on empirical and heuristic manual adjustments to hyp...

---

## 15. HyperDynamics: Meta-Learning Object and Agent Dynamics with Hypernetworks

**Authors:** Zhou Xian, Shamit Lal, Hsiao-Yu Tung, Emmanouil Antonios Platanios, Katerina Fragkiadaki

**Year:** 2021 | **Venue:** ICLR 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=pHXfe1cOmA) | > We propose HyperDynamics, a dynamics meta-learning framework that conditions on an agent’s interactions with the environment and optionally its visual observations, and generates the parameters of neural dynamics models based on inferred properties of the dynamical system. Physical and visual properties of the environment that are not part of the low-dimensional state yet affect its temporal dynam...

---

## 16. Transformers for Recognition in Overhead Imagery: A Reality Check

**Authors:** Francesco Luzi, Aneesh Gupta, Leslie Collins, Kyle Bradbury, Jordan Malof

**Year:** 2023 | **Venue:** WACV 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/WACV2023/papers/Luzi_Transformers_for_Recognition_in_Overhead_Imagery_A_Reality_Check_WACV_2023_paper.pdf) | > There is evidence that transformers offer state-of-the-art recognition performance on tasks involving overhead imagery (e.g., satellite imagery). However, it is difficult to make unbiased empirical comparisons between competing deep learning models, making it unclear whether, and to what extent, transformer-based models are beneficial. In this paper we systematically compare the impact of adding t...

---

## 17. On Infinite-Width Hypernetworks

**Authors:** Etai Littwin, Tomer Galanti, Lior Wolf, Greg Yang

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/999df4ce78b966de17aee1dc87111044-Paper.pdf) | > {\em Hypernetworks} are architectures that produce the weights of a task-specific {\em primary network}. A notable application of hypernetworks in the recent literature involves learning to output functional representations. In these scenarios, the hypernetwork learns a representation corresponding to the weights of a shallow MLP, which typically encodes shape or image information. While such repr...

---

## 18. Continual Model-Based Reinforcement Learning with Hypernetworks

**Authors:** Yizhou Huang, Kevin Xie, Homanga Bharadhwaj, Florian Shkurti, Yizhou Huang

**Year:** 2021 | **Venue:** ICRA 2021 | **Citations:** N/A | **Score:** 0.000

> Effective planning in model-based reinforcement learning (MBRL) and model-predictive control (MPC) relies on the accuracy of the learned dynamics model. In many instances of MBRL and MPC, this model is assumed to be stationary and is periodically re-trained from scratch on state transition experience collected from the beginning of environment interactions. This implies that the time required to t...

---

## 19. On the Modularity of Hypernetworks

**Authors:** Tomer Galanti, Lior Wolf

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/75c58d36157505a600e0695ed0b3a22d-Paper.pdf) | > In the context of learning to map an input $I$ to a function $h_I:\mathcal{X}\to \mathbb{R}$, two alternative methods are compared: (i) an embedding-based method, which learns a fixed function in which $I$ is encoded as a conditioning signal $e(I)$ and the learned function takes the form $h_I(x) = q(x,e(I))$, and (ii) hypernetworks, in which the weights $\theta_I$ of the function $h_I(x) = g(x;\th...

---

## 20. Do LLMs dream of elephants (when told not to)? Latent concept association and associative memory in transformers

**Authors:** Yibo Jiang, Goutham Rajendran, Pradeep Kumar Ravikumar, Bryon Aragam

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=WJ04ZX8txM) | > Large Language Models (LLMs) have the capacity to store and recall facts. Through experimentation with open-source models, we observe that this ability to retrieve facts can be easily manipulated by changing contexts, even without altering their factual meanings. These findings highlight that LLMs might behave like an associative memory model where certain tokens in the contexts serve as clues to ...

---

## 21. Personalized Federated Hypernetworks for Privacy Preservation in Multi-Task Reinforcement Learning

**Authors:** Doseok Jang, Larry Yan, Lucas Spangher, Selvaprabu Nadarajah, Costas Spanos

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

> Multi-Agent Reinforcement Learning currently focuses on implementations where all data and training can be centralized to one machine. But what if local agents are split across multiple tasks, and need to keep data private between each? We develop the first application of Personalized Federated Hypernetworks (PFH) to Reinforcement Learning (RL). We then present a novel application of PFH to few-sh...

---

## 22. Frozen Transformers in Language Models Are Effective Visual Encoder Layers

**Authors:** Ziqi Pang, Ziyang Xie, Yunze Man, Yu-Xiong Wang

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=t0FI3Q66K5) | > This paper reveals that large language models (LLMs), despite being trained solely on text data, are surprisingly}strong encoders for purely visual tasks in the absence of language. Even more intriguingly, this can be achieved by a simple yet previously overlooked strategy -- employing a frozen transformer block from pre-trained LLMs as a constituent encoder layer to directly process visual tokens...

---

## 23. Wide Attention is the Way Forward for Transformers

**Authors:** Jason Ross Brown, Yiren Zhao, Ilia Shumailov, Robert D. Mullins

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

> The Transformer is an extremely powerful and prominent deep learning architecture. In this work, we challenge the commonly held belief in deep learning that going deeper is better, and show an alternative design approach that is building wider attention Transformers. We demonstrate that wide single layer Transformer models can compete with or outperform deeper ones in a variety of Natural Language...

---

## 24. Continual Learning With Dependency Preserving Hypernetworks

**Authors:** Dupati Srikar Chandra, Sakshi Varshney, P. K. Srijith, Sunil Gupta

**Year:** 2023 | **Venue:** WACV 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/WACV2023/papers/Chandra_Continual_Learning_With_Dependency_Preserving_Hypernetworks_WACV_2023_paper.pdf) | > Humans learn continually throughout their lifespan by accumulating diverse knowledge and fine-tuning it for future tasks. When presented with a similar goal, neural networks suffer from catastrophic forgetting if data distributions across sequential tasks are not stationary over the course of learning. An effective approach to address such continual learning (CL) problems is to use hypernetworks w...

---

## 25. Contextual HyperNetworks for Novel Feature Adaptation

**Authors:** Angus Lamb, Evgeny Saveliev, Yingzhen Li, Sebastian Tschiatschek, Camilla Longden

**Year:** 2021 | **Venue:** ICLR 2021 | **Citations:** N/A | **Score:** 0.000

> While deep learning has obtained state-of-the-art results in many applications, the adaptation of neural network architectures to incorporate new features remains a research challenge. This issue is particularly severe in online learning settings, where new features are added continually with few or no associated observations. As such, methods for adapting neural networks to novel features which a...

---

## 26. Understanding In-Context Learning in Transformers and LLMs by Learning to Learn Discrete Functions

**Authors:** Satwik Bhattamishra, Arkil Patel, Phil Blunsom, Varun Kanade

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=ekeyCgeRfC) | > In order to understand the in-context learning phenomenon, recent works have adopted a stylized experimental framework and demonstrated that Transformers can match the performance of gradient-based learning algorithms for various classes of real-valued functions. However, the limitations of Transformers in implementing learning algorithms, and their ability to learn other forms of algorithms are n...

---

## 27. HyperMAML: Few-Shot Adaptation of Deep Models with Hypernetworks

**Authors:** Marcin Przewięźlikowski, Przemysław Przybysz, Jacek Tabor, Maciej Zieba, Przemysław Spurek

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

> The aim of Few-Shot learning methods is to train models which can easily adapt to previously unseen tasks, based on small amounts of data. One of the most popular and elegant Few-Shot learning approaches is Model-Agnostic Meta-Learning (MAML). The main idea behind this method is to learn the general weights of the meta-model, which are further adapted to specific problems in a small number of grad...

---

## 28. HyperDreamBooth: HyperNetworks for Fast Personalization of Text-to-Image Models

**Authors:** Nataniel Ruiz, Yuanzhen Li, Varun Jampani, Wei Wei, Tingbo Hou

**Year:** 2024 | **Venue:** CVPR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2024/papers/Ruiz_HyperDreamBooth_HyperNetworks_for_Fast_Personalization_of_Text-to-Image_Models_CVPR_2024_paper.pdf) | > Personalization has emerged as a prominent aspect within the field of generative AI enabling the synthesis of individuals in diverse contexts and styles while retaining high-fidelity to their identities. However the process of personalization presents inherent challenges in terms of time and memory requirements. Fine-tuning each personalized model needs considerable GPU time investment and storing...

---

## 29. Linking In-context Learning in Transformers to Human Episodic Memory

**Authors:** Li Ji-An, Corey Yishan Zhou, Marcus K. Benna, Marcelo G Mattar

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=AYDBFxNon4) | > Understanding connections between artificial and biological intelligent systems can reveal fundamental principles of general intelligence. While many artificial intelligence models have a neuroscience counterpart, such connections are largely missing in Transformer models and the self-attention mechanism. Here, we examine the relationship between interacting attention heads and human episodic memo...

---

## 30. Finding and Editing Multi-Modal Neurons in Pre-Trained Transformers

**Authors:** Haowen Pan, Yixin Cao, Xiaozhi Wang, Xun Yang, Meng Wang

**Year:** 2024 | **Venue:** ACL 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.findings-acl.60.pdf) | > Understanding the internal mechanisms by which multi-modal large language models (LLMs) interpret different modalities and integrate cross-modal representations is becoming increasingly critical for continuous improvements in both academia and industry. In this paper, we propose a novel method to identify key neurons for interpretability — how multi-modal LLMs bridge visual and textual concepts fo...

---

## 31. Improving Faithfulness of Large Language Models in Summarization via Sliding Generation and Self-Consistency

**Authors:** Taiji Li, Zhi Li, Yin Zhang

**Year:** 2024 | **Venue:** COLING 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.lrec-main.771.pdf) | > Despite large language models (LLMs) have demonstrated impressive performance in various tasks, they are still suffering from the factual inconsistency problem called hallucinations. For instance, LLMs occasionally generate content that diverges from source article, and prefer to extract information that appears at the beginning and end of the context, especially in long document summarization. In...

---

## 32. Continual learning with hypernetworks

**Authors:** Johannes von Oswald, Christian Henning, Benjamin F. Grewe, João Sacramento

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Artificial neural networks suffer from catastrophic forgetting when they are sequentially trained on multiple tasks. To overcome this problem, we present a novel approach based on task-conditioned hypernetworks, i.e., networks that generate the weights of a target model based on task identity. Continual learning (CL) is less difficult for this class of models thanks to a simple key feature: instea...

---

## 33. Scale-Space Hypernetworks for Efficient Biomedical Image Analysis

**Authors:** Jose Javier Gonzalez Ortiz, John Guttag, Adrian V Dalca

**Year:** 2023 | **Venue:** NIPS 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=aN0llPIbdg) | > Convolutional Neural Networks (CNNs) are the predominant model used for a variety of medical image analysis tasks. At inference time, these models are computationally intensive, especially with volumetric data.In principle, it is possible to trade accuracy for computational efficiency by manipulating the rescaling factor in the downsample and upsample layers of CNN architectures.However, properly ...

---

## 34. Revisiting Linear Decision Boundaries for Few-Shot Learning with Transformer Hypernetworks

**Authors:** Samrudhdhi B. Rangrej, Kevin J Liang, Xi Yin, Guan Pang, Theofanis Karaletsos

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> Few-shot learning (FSL) methods aim to generalize a model to new unseen classes using only a small number of support examples. In image classification settings, many FSL approaches utilize a similar architecture to standard supervised learning, learning a model composed of a feature extractor followed by a linear classifier head. A common choice for the classifier is ProtoNet-style nearest neighbo...

---

## 35. RepQ-ViT: Scale Reparameterization for Post-Training Quantization of Vision Transformers

**Authors:** Zhikai Li, Junrui Xiao, Lianwei Yang, Qingyi Gu

**Year:** 2023 | **Venue:** ICCV 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/ICCV2023/papers/Li_RepQ-ViT_Scale_Reparameterization_for_Post-Training_Quantization_of_Vision_Transformers_ICCV_2023_paper.pdf) | > Post-training quantization (PTQ), which only requires a tiny dataset for calibration without end-to-end retraining, is a light and practical model compression technique. Recently, several PTQ schemes for vision transformers (ViTs) have been presented; unfortunately, they typically suffer from non-trivial accuracy degradation, especially in low-bit cases. In this paper, we propose RepQ-ViT, a novel...

---

## 36. LLMs Are Zero-Shot Context-Aware Simultaneous Translators

**Authors:** Roman Koshkin, Katsuhito Sudoh, Satoshi Nakamura

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.emnlp-main.69.pdf) | > The advent of transformers has fueled progress in machine translation. More recently large language models (LLMs) have come to the spotlight thanks to their generality and strong performance in a wide range of language tasks, including translation. Here we show that open-source LLMs perform on par with or better than some state-of-the-art baselines in simultaneous machine translation (SiMT) tasks,...

---

## 37. Task-Agnostic Amortized Inference of Gaussian Process Hyperparameters

**Authors:** Sulin Liu, Xingyuan Sun, Peter J. Ramadge, Ryan P. Adams

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/f52db9f7c0ae7017ee41f63c2a7353bc-Paper.pdf) | > Gaussian processes (GPs) are flexible priors for modeling functions. However, their success depends on the kernel accurately reflecting the properties of the data. One of the appeals of the GP framework is that the marginal likelihood of the kernel hyperparameters is often available in closed form, enabling optimization and sampling procedures to fit these hyperparameters to data. Unfortunately, p...

---

## 38. Normalized Attention Without Probability Cage

**Authors:** Oliver Paul Richter, Roger Wattenhofer

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> Despite the popularity of attention based architectures like Transformers, the geometrical implications of softmax-attention remain largely unexplored. In this work we highlight the limitations of constraining attention weights to the probability simplex and the resulting convex hull of value vectors. We show that Transformers are biased towards local information at initialization and sensitive to...

---

## 39. Fast Unsupervised Deep Outlier Model Selection with Hypernetworks

**Authors:** Xueying Ding, Yue Zhao, Leman Akoglu

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Outlier detection (OD) has a large literature as it finds many applications in the real world. Deep neural network based OD (DOD) has seen a recent surge of attention thanks to the many advances in deep learning. In this paper, we consider a critical-yet-understudied challenge with unsupervised DOD, that is, effective hyperparameter (HP) tuning or model selection. While prior work report the sensi...

---

## 40. Hyper-CL: Conditioning Sentence Representations with Hypernetworks

**Authors:** Young Yoo, Jii Cha, Changhyeon Kim, Taeuk Kim

**Year:** 2024 | **Venue:** ACL 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.acl-long.41.pdf) | > While the introduction of contrastive learning frameworks in sentence representation learning has significantly contributed to advancements in the field, it still remains unclear whether state-of-the-art sentence embeddings can capture the fine-grained semantics of sentences, particularly when conditioned on specific perspectives.In this paper, we introduce Hyper-CL, an efficient methodology that ...

---

## 41. Learning the Pareto Front with Hypernetworks

**Authors:** Aviv Navon, Aviv Shamsian, Ethan Fetaya, Gal Chechik

**Year:** 2021 | **Venue:** ICLR 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=NjF772F4ZZR) | > Multi-objective optimization (MOO) problems are prevalent in machine learning. These problems have a set of optimal solutions, called the Pareto front, where each point on the front represents a different trade-off between possibly conflicting objectives. Recent MOO methods can target a specific desired ray in loss space however, most approaches still face two grave limitations: (i) A separate mod...

---

## 42. Plansformer: Generating Multi-Domain Symbolic Plans using Transformers

**Authors:** Vishal Pallagani, Bharath Chandra Muppasani, Keerthiram Murugesan, Francesca Rossi, Lior Horesh

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) have been the subject of active research, significantly advancing the field of Natural Language Processing (NLP). From BERT to BLOOM, LLMs have surpassed state-of-the-art results in various natural language tasks such as question answering, summarization, and text generation. Many ongoing efforts are focused on understanding LLMs' capabilities, including their knowledg...

---

## 43. Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse

**Authors:** Lorenzo Noci, Sotiris Anagnostidis, Luca Biggio, Antonio Orvieto, Sidak Pal Singh

**Year:** 2022 | **Venue:** NIPS 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=FxVH7iToXS) | > Transformers have achieved remarkable success in several domains, ranging from natural language processing to computer vision. Nevertheless, it has been recently shown that stacking self-attention layers — the distinctive architectural component of Transformers — can result in rank collapse of the tokens’ representations at initialization. The question of if and how rank collapse affects training ...

---

## 44. Enhancing Diversity in Bayesian Deep Learning via Hyperspherical Energy Minimization of CKA

**Authors:** David Smerkous, Qinxun Bai, Li Fuxin

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=s2hA6Bz3LE) | > Particle-based Bayesian deep learning often requires a similarity metric to compare two networks. However, naive similarity metrics lack permutation invariance and are inappropriate for comparing networks. Centered Kernel Alignment (CKA) on feature kernels has been proposed to compare deep networks but has not been used as an optimization objective in Bayesian deep learning. In this paper, we expl...

---

## 45. On the Importance of Architectures and Hyperparameters for Fairness in Face Recognition

**Authors:** Rhea Sanjay Sukthanker, Samuel Dooley, John P Dickerson, Colin White, Frank Hutter

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

> Face recognition systems are deployed across the world by government agencies and contractors for sensitive and impactful tasks, such as surveillance and database matching.  Despite their widespread use, these systems are known to exhibit bias across a range of sociodemographic dimensions, such as gender and race.  Nonetheless, an array of works proposing pre-processing, training, and post-process...

---

## 46. Improving Pareto Front Learning via Multi-Sample Hypernetworks

**Authors:** Long P. Hoang, Dung D. Le, Tran Anh Tuan, Tran Ngoc Thang

**Year:** 2023 | **Venue:** AAAI 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://ojs.aaai.org/index.php/AAAI/article/view/25953/25725) | > Pareto Front Learning (PFL) was recently introduced as an effective approach to obtain a mapping function from a given trade-off vector to a solution on the Pareto front, which solves the multi-objective optimization (MOO) problem. Due to the inherent trade-off between conflicting objectives, PFL offers a flexible approach in many scenarios in which the decision makers can not specify the preferen...

---

## 47. HyperShot: Few-Shot Learning by Kernel HyperNetworks

**Authors:** Marcin Sendera, Marcin Przewięźlikowski, Konrad Karanowski, Maciej Zięba, Jacek Tabor

**Year:** 2023 | **Venue:** WACV 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/WACV2023/papers/Sendera_HyperShot_Few-Shot_Learning_by_Kernel_HyperNetworks_WACV_2023_paper.pdf) | > Few-shot models aim at making predictions using a minimal number of labeled examples from a given task. The main challenge in this area is the one-shot setting where only one element represents each class. We propose HyperShot - the fusion of kernels and hypernetwork paradigm. Compared to reference approaches that apply a gradient-based adjustment of the parameters, our model aims to switch the cl...

---

## 48. Federated Learning with Heterogeneous Architectures using Graph HyperNetworks

**Authors:** Or Litany, Haggai Maron, David Acuna, Jan Kautz, Gal Chechik

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> Standard Federated Learning (FL) techniques are limited to clients with identical network architectures. As a result, inter-organizational collaboration is severely restricted when both data privacy and architectural proprietary are required. In this work, we propose a new FL framework that removes this limitation by adopting a graph hypernetwork as a shared knowledge aggregator. A property of the...

---

## 49. Locally Differentially Private In-Context Learning

**Authors:** Chunyan Zheng, Keke Sun, Wenhao Zhao, Haibo Zhou, Lixing Jiang

**Year:** 2024 | **Venue:** COLING 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.lrec-main.935.pdf) | > Large pretrained language models (LLMs) have shown surprising In-Context Learning (ICL) ability. An important application in deploying large language models is to augment LLMs with a private database for some specific task.The main problem with this promising commercial use is that LLMs have been shown to memorize their training data and their prompt data are vulnerable to membership inference att...

---

## 50. DHP: Differentiable Meta Pruning via HyperNetworks

**Authors:** Yawei Li, Shuhang Gu, Kai Zhang, Luc Van Gool, Radu Timofte

**Year:** 2020 | **Venue:** ECCV 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.ecva.net/papers/eccv_2020/papers_ECCV/papers/123530596.pdf) | > Network pruning has been the driving force for the acceleration of neural networks and the alleviation of model storage/transmission burden. With the advent of AutoML and neural architecture search (NAS), pruning has become topical with automatic mechanism and searching based architecture optimization. Yet, current automatic designs rely on either reinforcement learning or evolutionary algorithm. ...

---

