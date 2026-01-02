# Research Papers: LLMs and diffusion models

Updated: 2026-01-02 02:20
Total: 249 papers

---

## 1. Latent Diffusion with LLMs for Reasoning

**Authors:** Yi Hung Lim, Mohammad Mohammadi Amiri

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Despite the widespread adoption of large language models with hundreds of billions of parameters, these models still struggle on complex reasoning benchmarks. In this paper, we argue that the autoregressive nature of current language models are not suited for reasoning due to fundamental limitations, and that reasoning requires slow accumulation of knowledge through time. We show that combining la...

---

## 2. ParallelBench: Understanding the Trade-offs of Parallel Decoding in Diffusion LLMs

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> While most autoregressive LLMs are constrained to one-by-one decoding, diffusion LLMs (dLLMs) have attracted growing interest for their potential to dramatically accelerate inference through parallel decoding. Despite this promise, the conditional independence assumption in dLLMs causes parallel decoding to ignore token dependencies, inevitably degrading generation quality when these dependencies ...

---

## 3. Private Synthetic Text Generation with Diffusion Models

**Authors:** Sebastian Ochs, Ivan Habernal

**Year:** 2025 | **Venue:** NAACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.naacl-long.532.pdf) | > How capable are diffusion models of generating synthetics texts? Recent research shows their strengths, with performance reaching that of auto-regressive LLMs. But are they also good in generating synthetic data if the training was under differential privacy? Here the evidence is missing, yet the promises from private image generation look strong. In this paper we address this open question by ext...

---

## 4. Are LLMs Aware that Some Questions are not Open-ended?

**Authors:** Dongjie Yang, Hai Zhao

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.findings-emnlp.117.pdf) | > Large Language Models (LLMs) have shown the impressive capability of answering questions in a wide range of scenarios. However, when LLMs face different types of questions, it is worth exploring whether LLMs are aware that some questions have limited answers and need to respond more deterministically but some do not. We refer to this as question awareness of LLMs. The lack of question awareness in...

---

## 5. Beyond Autoregression: Fast LLMs via Self-Distillation Through Time

**Authors:** Justin Deschenaux, Caglar Gulcehre

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=uZ5K4HeNwd) | > Autoregressive (AR) Large Language Models (LLMs) have demonstrated significant success across numerous tasks. However, the AR modeling paradigm presents certain limitations; for instance, contemporary autoregressive LLMs are trained to generate one token at a time, which can result in noticeable latency. Recent advances have indicated that search and repeated sampling can enhance performance in va...

---

## 6. Language Model Beats Diffusion - Tokenizer is key to visual generation

**Authors:** Lijun Yu, Jose Lezama, Nitesh Bharadwaj Gundavarapu, Luca Versari, Kihyuk Sohn

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=gzqrANCF4g) | > While Large Language Models (LLMs) are the dominant models for generative tasks in language, they do not perform as well as diffusion models on image and video generation. To effectively use LLMs for visual generation, one crucial component is the visual tokenizer that maps pixel-space inputs to discrete tokens appropriate for LLM learning. In this paper, we introduce \modelname{}, a video tokeniz...

---

## 7. Not All Noises Are Created Equally: Diffusion Noise Selection and Optimization

**Authors:** Zipeng Qi, Bai LiChen, Haoyi Xiong, Zeke Xie

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Diffusion models that can generate high-quality data from randomly sampled Gaussian noises have become the mainstream generative method in academia and industry. Are randomly sampled Gaussian noises equally effective for diffusion models? Some methods explore the impact of noise variations on the results, but they either do not operate in the pure noise space, requiring additional evaluation model...

---

## 8. Pragmatic Norms Are All You Need – Why The Symbol Grounding Problem Does Not Apply to LLMs

**Authors:** Reto Gubelmann

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.emnlp-main.651.pdf) | > Do LLMs fall prey to Harnad’s symbol grounding problem (SGP), as it has recently been claimed? We argue that this is not the case. Starting out with countering the arguments of Bender and Koller (2020), we trace the origins of the SGP to the computational theory of mind (CTM), and we show that it only arises with natural language when questionable theories of meaning are presupposed. We conclude b...

---

## 9. Prediction Hubs are Context-Informed Frequent Tokens in LLMs

**Authors:** Beatrix Miranda Ginn Nielsen, Iuri Macocco, Marco Baroni

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.acl-long.1156.pdf) | > Hubness, the tendency for a few points to be among the nearest neighbours of a disproportionate number of other points, commonly arises when applying standard distance measures to high-dimensional data, often negatively impacting distance-based analysis. As autoregressive large language models (LLMs) operate on high-dimensional representations, we ask whether they are also affected by hubness. We ...

---

## 10. Large Language Models Assume People are More Rational than We Really are

**Authors:** Ryan Liu, Jiayi Geng, Joshua Peterson, Ilia Sucholutsky, Thomas L. Griffiths

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=dAeET8gxqg) | > In order for AI systems to communicate effectively with people, they must understand how we make decisions. However, people's decisions are not always rational, so the implicit internal models of human decision-making in Large Language Models (LLMs) must account for this. Previous empirical evidence seems to suggest that these implicit models are accurate --- LLMs offer believable proxies of human...

---

## 11. Unnatural Languages Are Not Bugs but Features for LLMs

**Authors:** Keyu Duan, Yiran Zhao, Zhili Feng, Jinjie Ni, Tianyu Pang

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=jv7bF50spq) | > Large Language Models (LLMs) have been observed to process non-human-readable text sequences, such as jailbreak prompts, often viewed as a bug for aligned LLMs. In this work, we present a systematic investigation challenging this perception, demonstrating that unnatural languages - strings that appear incomprehensible to humans but maintain semantic meanings for LLMs - contain latent features usab...

---

## 12. Diffusion Models are Kelly Gamblers

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> We draw a connection between diffusion models and the Kelly criterion for maximizing returns in betting games. A signal that is correlated with the outcome of such a game can be used to focus the bets on a narrow range of high probability predictions. Diffusion models share the same paradigm in that they gradually concentrate the probability mass to fit the training data. We show that the informat...

---

## 13. Constrained Decoding of Diffusion LLMs with Context-Free Grammars

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) have shown promising performance across diverse domains. Many practical applications of LLMs, such as code completion and structured data extraction, require adherence to syntactic constraints specified by a formal language. Yet, due to their probabilistic nature, LLM output is not guaranteed to adhere to such formal languages. To address this, prior work has proposed ...

---

## 14. Training Diffusion Models with Reinforcement Learning

**Authors:** Kevin Black, Michael Janner, Yilun Du, Ilya Kostrikov, Sergey Levine

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=YCWjhGrJFD) | > Diffusion models are a class of flexible generative models trained with an approximation to the log-likelihood objective. However, most use cases of diffusion models are not concerned with likelihoods, but instead with downstream objectives such as human-perceived image quality or drug effectiveness. In this paper, we investigate reinforcement learning methods for directly optimizing diffusion mod...

---

## 15. Does Safety Training of LLMs Generalize to Semantically Related Natural Prompts?

**Authors:** Sravanti Addepalli, Yerram Varun, Arun Suggala, Karthikeyan Shanmugam, Prateek Jain

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=LO4MEPoqrG) | > Large Language Models (LLMs) are known to be susceptible to crafted adversarial attacks or jailbreaks that lead to the generation of objectionable content despite being aligned to human preferences using safety fine-tuning methods. While the large dimensionality of input token space makes it inevitable to find *adversarial* prompts that can jailbreak these models, we aim to evaluate whether safety...

---

## 16. Making Multimodal Generation Easier: When Diffusion Models Meet LLMS

**Authors:** Xiangyu Zhao, Bo LIU, Qijiong Liu, Guangyuan SHI, Xiao-Ming Wu

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> We present EasyGen, an efficient model designed to enhance multimodal understanding and generation by harnessing the capabilities of diffusion models and large language models (LLMs). Unlike existing multimodal models that predominately depend on encoders like CLIP or ImageBind and need ample amounts of training data to bridge the gap between modalities, EasyGen is built upon a bidirectional condi...

---

## 17. Autoregressive Diffusion Models

**Authors:** Emiel Hoogeboom, Alexey A. Gritsenko, Jasmijn Bastings, Ben Poole, Rianne van den Berg

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=Lm8T39vLDTE) | > We introduce Autoregressive Diffusion Models (ARDMs), a model class encompassing and generalizing order-agnostic autoregressive models (Uria et al., 2014) and absorbing discrete diffusion (Austin et al., 2021), which we show are special cases of ARDMs under mild assumptions. ARDMs are simple to implement and easy to train. Unlike standard ARMs, they do not require causal masking of model represent...

---

## 18. On Inductive Biases That Enable Generalization in Diffusion Transformers

**Authors:** Jie An, De Wang, Pengsheng Guo, Jiebo Luo, Alex Schwing

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Recent work studying the generalization of diffusion models with UNet-based denoisers reveals inductive biases that can be expressed via geometry-adaptive harmonic bases. However, in practice, more recent denoising networks are often based on transformers, e.g., the diffusion transformer (DiT). This raises the question: do transformer-based denoising networks exhibit inductive biases that can also...

---

## 19. Large-scale Reinforcement Learning for Diffusion Models

**Authors:** Yinan Zhang*, Eric Tzeng, Yilun Du, Dmitry Kislyuk*

**Year:** 2024 | **Venue:** ECCV 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/07968.pdf) | > "Text-to-image diffusion models are cutting-edge deep generative models that have demonstrated impressive capabilities in generating high-quality images. However, these models are susceptible to implicit biases originating from web-scale text-image training pairs, potentially leading to inaccuracies in modeling image attributes. This susceptibility can manifest as suboptimal samples, model bias, a...

---

## 20. InfoDiffusion: Representation Learning Using Information Maximizing Diffusion Models

**Authors:** Yingheng Wang, Yair Schiff, Aaron Gokaslan, Weishen Pan, Fei Wang

**Year:** 2023 | **Venue:** ICML 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=ycZSQdo2F9) | > While diffusion models excel at generating high-quality samples, their latent variables typically lack semantic meaning and are not suitable for representation learning. Here, we propose InfoDiffusion, an algorithm that augments diffusion models with low-dimensional latent variables that capture high-level factors of variation in the data. InfoDiffusion relies on a learning objective regularized w...

---

## 21. Principled and Tractable RL for Reasoning with Diffusion Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Diffusion large language models (dLLMs) are a new paradigm of non-autoregressive language models that are trained to predict multiple tokens in parallel and generate text via iterative unmasking. Recent works have successfully pretrained dLLMs to parity with autoregressive LLMs at the 8B scale, but dLLMs have yet to benefit from modern post-training techniques, e.g. reinforcement learning (RL), th...

---

## 22. Predicated Diffusion: Predicate Logic-Based Attention Guidance for Text-to-Image Diffusion Models

**Authors:** Kota Sueyoshi, Takashi Matsubara

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Diffusion models have achieved remarkable results in generating high-quality, diverse, and creative images. However, when it comes to text-based image generation, they often fail to capture the intended meaning presented in the text. For instance, a specified object may not be generated, an unnecessary object may be generated, and an adjective may alter objects it was not intended to modify. Moreo...

---

## 23. Stable Signature is Unstable: Removing Image Watermark from Diffusion Models

**Authors:** Yuepeng Hu, Zhengyuan Jiang, Moyang Guo, Neil Zhenqiang Gong

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Watermark has been widely deployed by industry to detect AI-generated images. A recent watermarking framework called Stable Signature (proposed by Meta) roots watermark into the parameters of a diffusion model's decoder such that its generated images are inherently watermarked. Stable Signature makes it possible to watermark images generated by open-source diffusion models and was claimed to be ro...

---

## 24. Diffusion Models are Evolutionary Algorithms

**Authors:** Yanbo Zhang, Benedikt Hartl, Hananel Hazan, Michael Levin

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=xVefsBbG2O) | > In a convergence of machine learning and biology, we reveal that diffusion models are evolutionary algorithms. By considering evolution as a denoising process and reversed evolution as diffusion, we mathematically demonstrate that diffusion models inherently perform evolutionary algorithms, naturally encompassing selection, mutation, and reproductive isolation. Building on this equivalence, we pro...

---

## 25. Are explicit belief representations necessary? A comparison between Large Language Models and Bayesian probabilistic models

**Authors:** Dingyi Pan, Ben Bergen

**Year:** 2025 | **Venue:** NAACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.naacl-long.572.pdf) | > Large language models (LLMs) have exhibited certain indirect pragmatic capabilities, including interpreting indirect requests and non-literal meanings. Yet, it is unclear whether the success of LLMs on pragmatic tasks generalizes to phenomena that directly probe inferences about the beliefs of others. Indeed, LLMs’ performance on Theory of Mind (ToM) tasks is mixed. To date, the most successful co...

---

## 26. Flow Autoencoders are Effective Protein Tokenizers

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Protein structure tokenizers enable the creation of multimodal models of protein structure, sequence, and function. Current approaches to protein structure tokenization rely on bespoke components that are invariant to spatial symmetries, but that are challenging to optimize and scale. We present Kanzi, a flow-based tokenizer for tokenization and generation of protein structures. Kanzi consists of ...

---

## 27. BlockSpec: Blockwise Speculative Decoding for Diffusion LLMs

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> In diffusion-based Large Language Models (dLLMs), parallel decoding is usually realized through threshold-based or top-k strategies. While effective in high-confidence tokens, these strategies often collapse on low-confidence tokens, forcing the model into inefficient single-token decoding. To address this limitation, we propose Block Speculation (BlockSpec), a novel training-free blockwise specul...

---

## 28. Does Fine-Tuning LLMs on New Knowledge Encourage Hallucinations?

**Authors:** Zorik Gekhman, Gal Yona, Roee Aharoni, Matan Eyal, Amir Feder

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.emnlp-main.444.pdf) | > When large language models are aligned via supervised fine-tuning, they may encounter new factual information that was not acquired through pre-training. It is often conjectured that this can teach the model the behavior of hallucinating factually incorrect responses, as the model is trained to generate facts that are not grounded in its pre-existing knowledge. In this work, we study the impact of...

---

## 29. LLMs Are Not Intelligent Thinkers: Introducing Mathematical Topic Tree Benchmark for Comprehensive Evaluation of LLMs

**Authors:** Arash Gholami Davoodi, Seyed Pouyan Mousavi Davoudi, Pouya Pezeshkpour

**Year:** 2025 | **Venue:** NAACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.naacl-long.161.pdf) | > Large language models (LLMs) demonstrate impressive capabilities in mathematical reasoning. However, despite these achievements, current evaluations are mostly limited to specific mathematical topics, and it remains unclear whether LLMs are genuinely engaging in reasoning. To address these gaps, we present the Mathematical Topics Tree (MaTT) benchmark, a challenging and structured benchmark that o...

---

## 30. Diffusion Models are Secretly Exchangeable: Parallelizing DDPMs via Auto Speculation

**Authors:** Hengyuan Hu, Aniket Das, Dorsa Sadigh, Nima Anari

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=n08niE37ku) | > Denoising Diffusion Probabilistic Models (DDPMs) have emerged as powerful tools for generative modeling. However, their sequential computation requirements lead to significant inference-time bottlenecks. In this work, we utilize the connection between DDPMs and Stochastic Localization to prove that, under an appropriate reparametrization, the increments of DDPM satisfy an exchangeability property....

---

## 31. Are LLMs Better Formalizers than Solvers on Complex Problems?

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> A trending line of recent work advocates for using large language models (LLMs) as formalizers instead of as end-to-end solvers for logical reasoning problems. Instead of generating the solution, the LLM generates a formal program that derives a solution via an external solver. While performance gain of the seemingly scalable LLM-as-formalizer over the seemingly unscalable LLM-as-solver has been w...

---

## 32. DiffusER: Diffusion via Edit-based Reconstruction

**Authors:** Machel Reid, Vincent Josua Hellendoorn, Graham Neubig

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=nG9RF9z1yy3) | > In text generation, models that generate text from scratch one token at a time are currently the dominant paradigm. Despite being performant, these models lack the ability to revise existing text, which limits their usability in many practical scenarios. We look to address this, with DiffusER (Diffusion via Edit-based Reconstruction), a new edit-based generative model for text based on denoising d...

---

## 33. LLM-grounded Video Diffusion Models

**Authors:** Long Lian, Baifeng Shi, Adam Yala, Trevor Darrell, Boyi Li

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=exKHibougU) | > Text-conditioned diffusion models have emerged as a promising tool for neural video generation. However, current models still struggle with intricate spatiotemporal prompts and often generate restricted or incorrect motion. To address these limitations, we introduce LLM-grounded Video Diffusion (LVD). Instead of directly generating videos from the text inputs, LVD first leverages a large language ...

---

## 34. Diffusion Models as Artists: Are we Closing the Gap between Humans and Machines?

**Authors:** Victor Boutin, Thomas FEL, Lakshya Singhal, Rishav Mukherji, Akash Nagaraj

**Year:** 2023 | **Venue:** ICML 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=Aev7tepsqx) | > An important milestone for AI is the development of algorithms that can produce drawings that are indistinguishable from those of humans. Here, we adapt the ''diversity vs. recognizability'' scoring framework from Boutin et al (2022) and find that one-shot diffusion models have indeed started to close the gap between humans and machines. However, using a finer-grained measure of the originality of...

---

## 35. Are LLMs Really Not Knowledgeable? Mining the Submerged Knowledge in LLMs' Memory

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) have shown promise as parametric knowledge bases, but often underperform on question answering (QA) tasks due to hallucinations and uncertainty. While prior work attributes these failures to knowledge gaps in the model’s parameters, we uncover a complementary phenomenon: LLMs frequently retain correct knowledge even when generating incorrect or \``unsure'' answers.
By ...

---

## 36. Generalization in diffusion models arises from geometry-adaptive harmonic representations

**Authors:** Zahra Kadkhodaie, Florentin Guth, Eero P Simoncelli, Stéphane Mallat

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=ANvmVS2Yr0) | > Deep neural networks (DNNs) trained for image denoising are able to generate high-quality samples with score-based reverse diffusion algorithms. These impressive capabilities seem to imply an escape from the curse of dimensionality, but recent reports of memorization of the training set raise the question of whether these networks are learning the "true" continuous density of the data. Here, we sh...

---

## 37. The Deficit of New Information in Diffusion Models: A Focus on Diverse Samples

**Authors:** Lakshmikar Reddy Polamreddy, Youshan Zhang

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Diffusion models are renowned for their state-of-the-art performance in generating high-quality images. Identifying samples with new information beyond the training data is essential for data augmentation, especially for enhancing model performance in diverse and unforeseen real-world scenarios. However, the investigation of new information in the generated samples has not been well explored. Our ...

---

## 38. BRIDGE: Bootstrapping Text to Guide Time-Series Generation via Multi-Agent Iterative Optimisation and Diffusion Modelling

**Authors:** Hao Li, Yu-Hao Huang, Chang Xu, Viktor Schlegel, Jiang Bian

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Time-series Generation (TSG) is an impactful research direction, as generating realistic sequences can be used to create educational materials, in simulations and for counterfactual analysis in decision making. It has further the potential to alleviate the resource bottleneck that arises from a lack of diverse time-series data required to train large time-series foundational models. However, most ...

---

## 39. Masked Autoencoders Are Effective Tokenizers for Diffusion Models

**Authors:** Hao Chen, Yujin Han, Fangyi Chen, Xiang Li, Yidong Wang

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=dzwUOiBlQW) | > Recent advances in latent diffusion models have demonstrated their effectiveness for high-resolution image synthesis. However, the properties of the latent space from tokenizer for better learning and generation of diffusion models remain under-explored. Theoretically and empirically, we find that improved generation quality is closely tied to the latent distributions with better structure, such a...

---

## 40. How I Warped Your Noise: a Temporally-Correlated Noise Prior for Diffusion Models

**Authors:** Pascal Chang, Jingwei Tang, Markus Gross, Vinicius C. Azevedo

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=pzElnMrgSD) | > Video editing and generation methods often rely on pre-trained image-based diffusion models. During the diffusion process, however, the reliance on rudimentary noise sampling techniques that do not preserve correlations present in subsequent frames of a video is detrimental to the quality of the results. This either produces high-frequency flickering, or texture-sticking artifacts that are not ame...

---

## 41. Be Tangential to Manifold: Discovering Riemannian Metric for Diffusion Models

**Authors:** Shinnosuke Saito, Takashi Matsubara

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Diffusion models are powerful deep generative models (DGMs) that generate high-fidelity, diverse content. However, unlike classical DGMs, they lack an explicit, tractable low-dimensional latent space that parameterizes the data manifold. This absence limits manifold-aware analysis and operations, such as interpolation and editing. Existing interpolation methods for diffusion models typically follo...

---

## 42. Shrinking Proteins with Diffusion

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Many proteins useful in modern medicine or bioengineering are challenging to make in the lab, fuse with other proteins in cells, or deliver to tissues in the body because their sequences are too long.
Shortening these sequences typically involves costly, time-consuming experimental campaigns.
Ideally, we could instead use modern models of massive databases of sequences from nature to learn how to ...

---

## 43. RAG LLMs are Not Safer: A Safety Analysis of Retrieval-Augmented Generation for Large Language Models

**Authors:** Bang An, Shiyue Zhang, Mark Dredze

**Year:** 2025 | **Venue:** NAACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.naacl-long.281.pdf) | > Efforts to ensure the safety of large language models (LLMs) include safety fine-tuning, evaluation, and red teaming.However, despite the widespread use of the Retrieval-Augmented Generation (RAG) framework, AI safety work focuses on standard LLMs, which means we know little about how RAG use cases change a model’s safety profile. We conduct a detailed comparative analysis of RAG and non-RAG frame...

---

## 44. On Natural Ways to Generate and Their Provable Power

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Diffusion language models have recently emerged as a competitive alternative to autoregressive language models. Beyond next-token generation, they are more efficient and flexible by enabling parallel and any-order token generation. However, despite empirical successes, their computational power and fundamental limitations remain poorly understood. In this paper, we formally study whether non-autor...

---

## 45. Incoherent Beliefs & Inconsistent Actions In Language Models

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Real-world tasks and environments exhibit differences from the static datasets that large language models (LLMs) are typically evaluated on. Such tasks can involve sequential interaction, requiring coherent updating of beliefs in light of new evidence, and making appropriate decisions based on those beliefs. Predicting how LLMs will perform in such dynamic environments is important, but can be tri...

---

## 46. Are Large Language Model Temporally Grounded?

**Authors:** Yifu Qiu, Zheng Zhao, Yftah Ziser, Anna Korhonen, Edoardo Ponti

**Year:** 2024 | **Venue:** NAACL 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.naacl-long.391.pdf) | > Are Large Language Models (LLMs) temporally grounded? Since LLMs cannot perceive and interact with the environment, it is impossible to answer this question directly. Instead, we provide LLMs with textual narratives and probe them with respect to their common-sense knowledge of the structure and duration of events, their ability to order events along a timeline, and self-consistency within their t...

---

## 47. Quasi-Taylor Samplers for Diffusion Generative Models based on Ideal Derivatives

**Authors:** Hideyuki Tachibana, Mocho Go, Muneyoshi Inahara, Yotaro Katayama, Yotaro Watanabe

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

> Diffusion generative models have emerged as a new challenger to popular deep neural generative models such as GANs, but have the drawback that they often require a huge number of neural function evaluations (NFEs) during synthesis unless some sophisticated sampling strategies are employed. This paper proposes new efficient samplers based on the numerical schemes derived by the familiar Taylor expa...

---

## 48. Stronger Models are Not Always Stronger Teachers for Instruction Tuning

**Authors:** Zhangchen Xu, Fengqing Jiang, Luyao Niu, Bill Yuchen Lin, Radha Poovendran

**Year:** 2025 | **Venue:** NAACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.naacl-long.224.pdf) | > Instruction tuning has been widely adopted to ensure large language models (LLMs) follow user instructions and engage with users meaningfully. The resulting instruction-following capabilities of LLMs heavily rely on the instruction datasets used for tuning. Recently, synthetic instruction datasets have emerged as an economically viable solution to provide LLMs diverse and high-quality instructions...

---

## 49. Large Language Models are Not Yet Human-Level Evaluators for Abstractive Summarization

**Authors:** Chenhui Shen, Liying Cheng, Xuan-Phi Nguyen, Yang You, Lidong Bing

**Year:** 2023 | **Venue:** EMNLP 2023 | **Citations:** N/A | **Score:** 0.000

> With the recent undeniable advancement in reasoning abilities in large language models (LLMs) like ChatGPT and GPT-4, there is a growing trend for using LLMs on various tasks. One area where LLMs can be employed is as an alternative evaluation metric for complex generative tasks, which generally demands expensive human judges to complement the traditional automatic metrics for various evaluation d...

---

## 50. Large Language Diffusion Models

**Authors:** Shen Nie, Fengqi Zhu, Zebin You, Xiaolu Zhang, Jingyang Ou

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

> Autoregressive models (ARMs) are widely regarded as the cornerstone of large language models (LLMs). We challenge this notion by introducing $\textbf{LLaDA}$, a diffusion model trained from scratch under the pre-training and supervised fine-tuning (SFT) paradigm. LLaDA models distributions through a forward data masking process and a reverse process, parameterized by a vanilla Transformer to predi...

---

## 51. Motion Artifact Removal in Pixel-Frequency Domain via Alternate Masks and Diffusion Model

**Authors:** Jiahua Xu, Dawei Zhou, Lei Hu, Jianfeng Guo, Feng Yang

**Year:** 2025 | **Venue:** AAAI 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://ojs.aaai.org/index.php/AAAI/article/view/32960/35115) | > Motion artifacts present in magnetic resonance imaging (MRI) can seriously interfere with clinical diagnosis. Removing motion artifacts is a straightforward solution and has been extensively studied. However, paired data are still heavily relied on in recent works and the perturbations in k-space (frequency domain) are not well considered, which limits their applications in the clinical field. To ...

---

## 52. Test-Time Stain Adaptation with Diffusion Models for Histopathology Image Classification

**Authors:** Cheng-Chang Tsai*, Yuan-Chih Chen, Chun-Shien Lu*

**Year:** 2024 | **Venue:** ECCV 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/05175.pdf) | > "Stain shifts are prevalent in histopathology images, and typically dealt with by normalization or augmentation. Considering training-time methods are limited in dealing with unseen stains, we propose a test-time stain adaptation method (TT-SaD) with diffusion models that achieves stain adaptation by solving a nonlinear inverse problem during testing. TT-SaD is promising in that it only needs a si...

---

## 53. CoInD: Enabling Logical Compositions in Diffusion Models

**Authors:** Sachit Gaudi, Gautam Sreekumar, Vishnu Boddeti

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=cCRlEvjrx4) | > How can we learn generative models to sample data with arbitrary logical compositions of statistically independent attributes? The prevailing solution is to sample from distributions expressed as a composition of attributes' conditional marginal distributions under the assumption that they are statistically independent. This paper shows that standard conditional diffusion models violate this assum...

---

## 54. Simple Guidance Mechanisms for Discrete Diffusion Models

**Authors:** Yair Schiff, Subham Sekhar Sahoo, Hao Phung, Guanghan Wang, Sam Boshar

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=i5MrJ6g5G1) | > Diffusion models for continuous data gained widespread adoption owing to their high quality generation and control mechanisms. However, controllable diffusion on discrete data faces challenges given that continuous guidance methods do not directly apply to discrete diffusion. Here, we provide a straightforward derivation of classifier-free and classifier-based guidance for discrete diffusion, as w...

---

## 55. Derivative-Free Diffusion Manifold-Constrained Gradient for Unified XAI

**Authors:** Won Jun Kim, Hyungjin Chung, Jaemin Kim, Sangmin Lee, Byeongsu Sim

**Year:** 2025 | **Venue:** CVPR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Kim_Derivative-Free_Diffusion_Manifold-Constrained_Gradient_for_Unified_XAI_CVPR_2025_paper.pdf) | > Gradient-based methods are a prototypical family of "explainability for AI" (XAI) techniques, especially for image-based models. However, they (1) require white-box access to models, (2) are vulnerable to adversarial attacks, and (3) produce attributions that lie off the image manifold, leading to explanations that are not amenable to human perception. To overcome these challenges, we introduce De...

---

## 56. Believing is Seeing: Unobserved Object Detection using Generative Models

**Authors:** Subhransu S. Bhattacharjee, Dylan Campbell, Rahul Shome

**Year:** 2025 | **Venue:** CVPR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Bhattacharjee_Believing_is_Seeing_Unobserved_Object_Detection_using_Generative_Models_CVPR_2025_paper.pdf) | > Can objects that are not visible in an image---but are in the vicinity of the camera---be detected? This study introduces the novel tasks of 2D, 2.5D and 3D unobserved object detection for predicting the location of nearby objects that are occluded or lie outside the image frame.  We adapt several state-of-the-art pre-trained generative models to address this task, including 2D and 3D diffusion mo...

---

## 57. Efficient Adversarial Detection and Purification with Diffusion Models

**Authors:** Xuelong Dai, Dong Wang, Duan Mingxing, Bin Xiao

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Adversarial training and adversarial purification are two effective and practical defense methods to enhance a model's robustness against adversarial attacks. However, adversarial training necessitates additional training, while adversarial purification suffers from low time efficiency. More critically, current defenses are designed under the perturbation-based adversarial threat model, which is i...

---

## 58. LLMs are Biased Evaluators But Not Biased for Fact-Centric Retrieval Augmented Generation

**Authors:** Yen-Shan Chen, Jing Jin, Peng-Ting Kuo, Chao-Wei Huang, Yun-Nung Chen

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.findings-acl.1369.pdf) | > Recent studies have demonstrated that large language models (LLMs) exhibit significant biases in evaluation tasks, particularly in preferentially rating and favoring self-generated content. However, the extent to which this bias manifests in fact-oriented tasks, especially within retrieval-augmented generation (RAG) frameworks—where keyword extraction and factual accuracy take precedence over styl...

---

## 59. Large Language Model Is Not a Good Few-shot Information Extractor, but a Good Reranker for Hard Samples!

**Authors:** Yubo Ma, Yixin Cao, Yong Ching Hong, Aixin Sun

**Year:** 2023 | **Venue:** EMNLP 2023 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) have made remarkable strides in various tasks. Whether LLMs are competitive few-shot solvers for information extraction (IE) tasks, however, remains an open problem. In this work, we aim to provide a thorough answer to this question. Through extensive experiments on nine datasets across four IE tasks, we demonstrate that current advanced LLMs consistently exhibit infer...

---

## 60. Assessing the Reasoning Capabilities of LLMs in the context of Evidence-based Claim Verification

**Authors:** John Dougrez-Lewis, Mahmud Elahi Akhter, Federico Ruggeri, Sebastian Löbbers, Yulan He

**Year:** 2025 | **Venue:** ACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.findings-acl.1059.pdf) | > Although LLMs have shown great performance on Mathematics and Coding related reasoning tasks, the reasoning capabilities of LLMs regarding other forms of reasoning are still an open problem. Here, we examine the issue of reasoning from the perspective of claim verification. We propose a framework designed to break down any claim paired with evidence into atomic reasoning types that are necessary f...

---

## 61. Can LLMs Help Uncover Insights about LLMs? A Large-Scale, Evolving Literature Analysis of Frontier LLMs

**Authors:** Jungsoo Park, Junmo Kang, Gabriel Stanovsky, Alan Ritter

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

> ...

---

## 62. silp_nlp at LLMs4OL 2025 Tasks A, B, C, and D: Clustering-Based Ontology Learning Using LLMs

**Authors:** Pankaj Kumar Goyal, Sumit Singh, Uma Shanker Tiwary

**Year:** 2025 | **Venue:** LLMs4OL@ISWC | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.52825/OCP.V6I.2900)

> ...

---

## 63. SBU-NLP at LLMs4OL 2025 Tasks A, B, and C: Stage-Wise Ontology Construction Through LLMs Without any Training Procedure

**Authors:** Rashin Rahnamoun, Mehrnoush Shamsfard

**Year:** 2025 | **Venue:** LLMs4OL@ISWC | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.52825/OCP.V6I.2887)

> ...

---

## 64. DREAM-LLMs at LLMs4OL 2025 Task B: A Deliberation-Based Reasoning Ensemble Approach With Multiple Large Language Models for Term Typing in Low-Resource Domains

**Authors:** Patipon Wiangnak, Thin Prabhong, Thiti Phuttaamart, Natthawut Kertkeidkachorn, Kiyoaki Shirai

**Year:** 2025 | **Venue:** LLMs4OL@ISWC | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.52825/OCP.V6I.2892)

> ...

---

## 65. silp_nlp at LLMs4OL 2024 Tasks A, B, and C: Ontology Learning through Prompts with LLMs

**Authors:** Pankaj Kumar Goyal, Sumit Singh, Uma Shanker Tiwary

**Year:** 2024 | **Venue:** LLMs4OL@ISWC | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.52825/OCP.V4I.2485)

> ...

---

## 66. LLMStinger: Jailbreaking LLMs using RL fine-tuned LLMs

**Authors:** Piyush Jha, Arnav Arora, Vijay Ganesh 0001

**Year:** 2024 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2411.08862)

> ...

---

## 67. A few Thoughts on the Use of ChatGPT, GPT 3.5, GPT-4 and LLMs in Parliaments: Reflecting on the results of experimenting with LLMs in the parliamentarian context

**Authors:** Jörn von Lucke, Sander Frank

**Year:** 2025 | **Venue:** Digit. Gov. Res. Pract. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1145/3665333)

> ...

---

## 68. LLM Stinger: Jailbreaking LLMs Using RL Fine-Tuned LLMs (Student Abstract)

**Authors:** Piyush Jha, Arnav Arora, Vijay Ganesh 0001

**Year:** 2025 | **Venue:** AAAI | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1609/AAAI.V39I28.35263)

> ...

---

## 69. How LLMs Comprehend Temporal Meaning in Narratives: A Case Study in Cognitive Evaluation of LLMs

**Authors:** Karin de Langis, Jong Inn Park, Andreas Schramm, Bin Hu, Khanh Chi Le

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

> ...

---

## 70. Improving Automatic Evaluation of Large Language Models (LLMs) in Biomedical Relation Extraction via LLMs-as-the-Judge

**Authors:** Md. Tahmid Rahman Laskar, Israt Jahan, Elham Dolatabadi, Chun Peng, Enamul Hoque

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

> ...

---

## 71. Can LLMs Reason About Program Semantics? A Comprehensive Evaluation of LLMs on Formal Specification Inference

**Authors:** Thanh Le-Cong, Bach Le 0001, Toby Murray

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

> ...

---

## 72. LLMs + Persona-Plug = Personalized LLMs

**Authors:** Jiongnan Liu, Yutao Zhu 0001, Shuting Wang 0002, Xiaochi Wei, Erxue Min

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

> ...

---

## 73. Can LLMs Understand Unvoiced Speech? Exploring EMG-to-Text Conversion with LLMs

**Authors:** Payal Mohapatra, Akash Pandey, Xiaoyuan Zhang, Qi Zhu 0002

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.18653/V1/2025.ACL-SHORT.56)

> ...

---

## 74. LlamaDuo: LLMOps Pipeline for Seamless Migration from Service LLMs to Small-Scale Local LLMs

**Authors:** Chansung Park, Juyong Jiang, Fan Wang 0041, Sayak Paul, Jing Tang 0004

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

> ...

---

## 75. Are LLMs Rational Investors? A Study on the Financial Bias in LLMs

**Authors:** Yuhang Zhou, Yuchen Ni, Zhiheng Xi, Zhangyue Yin, Yu He

**Year:** 2025 | **Venue:** ACL | **Citations:** N/A | **Score:** 0.000

> ...

---

## 76. LLMs as Workers in Human-Computational Algorithms? Replicating Crowdsourcing Pipelines with LLMs

**Authors:** Tongshuang Wu, Haiyi Zhu, Maya Albayrak, Alexis Axon, Amanda Bertsch

**Year:** 2025 | **Venue:** CHI Extended Abstracts | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1145/3706599.3706690)

> ...

---

## 77. Can Multimodal LLMs Reason About Stability? An Exploratory Study with Insights from the LLMs4PCG Challenge

**Authors:** Mury F. Dewantoro, Febri Abdullah, Yi Xia, Ibrahim Khan, Ruck Thawonmas

**Year:** 2025 | **Venue:** CoG | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/COG64752.2025.11114183)

> ...

---

## 78. Do LLMs Dream of Electric Emotions? Towards Quantifying Metacognition and Generalizing the Teacher-Student Model Using Ensembles of LLMs

**Authors:** Ricky J. Sethi, Hefei Qiu, Charles Courchaine, Joshua Iacoboni

**Year:** 2025 | **Venue:** CIKM | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1145/3746252.3760839)

> ...

---

## 79. Can LLMs Verify Arabic Claims? Evaluating the Arabic Fact-Checking Abilities of Multilingual LLMs

**Authors:** Ayushman Gupta, Aryan Singhal, Thomas Law, Veekshith Rao, Evan Duan

**Year:** 2025 | **Venue:** COLING Workshops | **Citations:** N/A | **Score:** 0.000

> ...

---

## 80. Efficient Solutions For An Intriguing Failure of LLMs: Long Context Window Does Not Mean LLMs Can Analyze Long Sequences Flawlessly

**Authors:** Peyman Hosseini, Ignacio Castro, Iacopo Ghinassi, Matthew Purver

**Year:** 2025 | **Venue:** COLING | **Citations:** N/A | **Score:** 0.000

> ...

---

## 81. Adapting Multilingual LLMs to Low-Resource Languages using Continued Pre-training and Synthetic Corpus: A Case Study for Hindi LLMs

**Authors:** Raviraj Joshi, Kanishk Singla, Anusha Kamath, Raunak Kalani, Rakesh Paul

**Year:** 2025 | **Venue:** COLING Workshops | **Citations:** N/A | **Score:** 0.000

> ...

---

## 82. Generative FrameNet: Scalable and Adaptive Frames for Interpretable Knowledge Storage and Retrieval for LLMs Powered by LLMs

**Authors:** Harish Tayyar Madabushi, Taylor Hudson, Claire Bonial

**Year:** 2025 | **Venue:** COLING Workshops | **Citations:** N/A | **Score:** 0.000

> ...

---

## 83. LLMsAgainstHate@NLU of Devanagari Script Languages 2025: Hate Speech Detection and Target Identification in Devanagari Languages via Parameter Efficient Fine-Tuning of LLMs

**Authors:** Rushendra Sidibomma, Pransh Patwa, Parth Patwa, Aman Chadha, Vinija Jain

**Year:** 2025 | **Venue:** COLING Workshops | **Citations:** N/A | **Score:** 0.000

> ...

---

## 84. Playing the Fool: Jailbreaking LLMs and Multimodal LLMs with Out-of-Distribution Strategy

**Authors:** Joonhyun Jeong, Seyun Bae, Yeonsung Jung, Jaeryong Hwang, Eunho Yang

**Year:** 2025 | **Venue:** CVPR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/CVPR52734.2025.02786)

> ...

---

## 85. LLMs for Software Architecture Knowledge: A Comparative Analysis Among Seven LLMs

**Authors:** Mohamed Soliman 0001, Elia Ashraf, Kamel M. K. Abdelsalam, Jan Keim, Ashwin Prasad Shivarpatna Venkatesh

**Year:** 2025 | **Venue:** ECSA | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1007/978-3-032-02138-0_7)

> ...

---

## 86. Does Context Size Matter? Context Structure and Integration Effort in Agent Pull Requests

**Authors:** Anonymous, Anonymous

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17970242) | [DOI](https://doi.org/10.5281/zenodo.17970242)

> This is the replication package for the paper: Does Context Size Matter? An Empirical Study of Agent-Authored Pull Requests All experiments are provided as Python notebooks and were run on Google Colaboratory. Requires: Huggingface API key OpenAI API key Connection to Google Drive with required files (to run the categorization and evaluations) GitHub token (to fetch commit dates, although we provi...

---

## 87. Fostering Engagement through a Latency-Optimized LLM-based Dialogue System for Multimodal ECA Responses - Supplemental Material

**Authors:** Kühlem, Konstantin W., Ehret, Jonathan, Kuhlen, Torsten W., Bönsch, Andrea

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17963819) | [DOI](https://doi.org/10.5281/zenodo.17963819)

> ...

---

## 88. Protocol for Prospective Evaluation of Screening Algorithms integrated in NeutrinoReview

**Authors:** Sandner, Elias, Fontana Luca, Simniceanu, Alice, Jakovljevic, Igor, Henriques, André

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17513215) | [DOI](https://doi.org/10.5281/zenodo.17513215)

> Protocol for Prospective Evaluation of Screening Algorithms integrated in NeutrinoReview Abstract: The screening phase of systematic reviews is labor-intensive and often represents a major bottleneck in evidence synthesis. To support automation, two large language model (LLM)-based screening algorithms—the 5-Tier and CAL-X approaches—were developed and integrated into the NeutrinoReview web applic...

---

## 89. Universal Audio Generation

**Authors:** Antoine Laurent, Sameer Khurana, Anthony Larcher, Dominik Klement, Mickaël Rouvier

**Year:** 2026 | **Venue:** HAL (Le Centre pour la Communication Scientifique Directe) | **Citations:** N/A | **Score:** 0.000

[PDF](https://hal.science/hal-05110014v1/document) | > This report describe the research done during the third ESPERANTO/JSALT workshop from the 10th June 2024 to the 2nd of August 2024....

---

## 90. APOLLO: an open platform for LLM-based multi-agent interaction research

**Authors:** Abel Johny, Eike Schneiders, Jérémie Clos

**Year:** 2026 | **Venue:** ePrints Soton (University of Southampton) | **Citations:** N/A | **Score:** 0.000

[PDF](https://eprints.soton.ac.uk/504928/1/Pers_Tech_APOLLO-2.pdf) | [DOI](https://doi.org/10.1007/978-3-031-97177-8_10)

> ...

---

## 91. Large Language Model-Augmented Model Predictive Control for Marine Vessels in Uncertain Marine Environments

**Authors:** Zhang, Yao, Zeng, TIANYI

**Year:** 2026 | **Venue:** UCL Discovery (University College London) | **Citations:** N/A | **Score:** 0.000

> ...

---

## 92. Synthetic Personas for Enhanced Customer Interaction in Innovation: An LLM-Based Approach

**Authors:** Christian Uldal Graulund, Niklas Engelstock Andersen, Torben Tambo

**Year:** 2026 | **Venue:** Research Portal (King's College London) | **Citations:** N/A | **Score:** 0.000

> This paper investigates the potential of large language models (LLMs) to generate synthetic personas for enhancing customer interaction in innovation processes. Building on existing literature in persona-based design and agent-based simulation, we identify a gap regarding the use of LLMs as interactive customer surrogates. We address this through a prototype system that creates and operationalizes...

---

## 93. A Multi-LLM Agent System for Modular Ontology Population: A Case Study on ADHD

**Authors:** Ibrahim Traore

**Year:** 2026 | **Venue:** HAL (Le Centre pour la Communication Scientifique Directe) | **Citations:** N/A | **Score:** 0.000

[PDF](https://hal.science/hal-05427201) | > International audience...

---

## 94. Local Causal Reasoning in Multiagent Systems

**Authors:** Chakraborty, Pinaki, Caulfield, Tristan, Pym, David

**Year:** 2026 | **Venue:** UCL Discovery (University College London) | **Citations:** N/A | **Score:** 0.000

> ...

---

## 95. Extraction d’informations dans des rapports d’incidents du réseau électrique à l’aide de LLMs open source

**Authors:** Gagnant, Maxence, Belfadel, Abdelhadi, Dussartre, Matthieu, Gagnant, Maxence, Belfadel, Abdelhadi

**Year:** 2026 | **Venue:** HAL (Le Centre pour la Communication Scientifique Directe) | **Citations:** N/A | **Score:** 0.000

> Effective management of an organization’s knowledge requires processing numerous textual documents. In the context of French power grid incident reports, this task is particularly challenging due to the specificity of the texts and the complexity of the information to be extracted. This study explores the use of large language models (LLMs) to automatically extract relevant information with minima...

---

## 96. [From Referral to Reporting: The Potential of Large Language Models in the Radiological Workflow].

**Authors:** Anna Maria Fink, Stephan Rau, Kai Falko Kästingschäfer, Fabian Bamberg, Maximilian Frederik Russe

**Year:** 2026 | **Venue:** PubMed | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1055/a-2641-3059)

> Large language models (LLMs) hold great promise for optimizing and supporting radiology workflows amidst rising workloads. This review examines potential applications in daily radiology practice, as well as remaining challenges and potential solutions.Presentation of potential applications and challenges, illustrated with practical examples and concrete optimization suggestions.LLM-based assistanc...

---

## 97. LITHE: A Query Rewrite Advisor using LLMs

**Authors:** Dharwada, Sriram, Devrani, Himanshu, Haritsa, Jayant R, Doraiswamy, Harish

**Year:** 2026 | **Venue:** OpenProceedings | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48786/edbt.2026.20) | [DOI](https://doi.org/10.48786/edbt.2026.20)

> ...

---

## 98. El impacto de la conectividad digital constante en la salud cognitiva y la responsabilidad social

**Authors:** Nikolaeva Evgeniya, Kotliar, Polina, Kamaleeva Aisylu, Soldatova, Nataliya

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17642878) | [DOI](https://doi.org/10.5281/zenodo.17642878)

> La conectividad digital constante y la expansión de los medios de comunicación, así como de los modelos de lenguaje (LLM, por ejemplo, ChatGPT), están cambiando los ritmos de aprendizaje, aumentando el tecnoestrés y los riesgos para el sueño y el bienestar de los estudiantes. Los servicios de trabajo social prestan cada vez más atención a este problema. Sin embargo, para desarrollar programas que ...

---

## 99. BPMN Model Generation with Instruction Tuned LLM

**Authors:** Gokberk Celikmasat, Aydemir, Fatma Başak, Ozgovde, Atay

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17776444) | [DOI](https://doi.org/10.5281/zenodo.17776444)

> BPMN-IT: Instruction-Tuned Language Model and Dataset for Business Process Modeling This repository contains the supplementary materials for the paper: Generating Business Process Models with Open Source Large Language Models using Instruction Tuning (link to paper). Overview We introduce an instruction-tuned large language model fine-tuned on a custom dataset for generating and understanding BPMN...

---

## 100. ASNO-LLM: Large Language Model based Algorithm Selection Framework for 6G Network Service Optimization & Automation

**Authors:** Dalgkitsis, Anestis, Hsu, Cyril Shih-Huan, Papagianni, Chrysa, Grosso Paola

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17801705) | [DOI](https://doi.org/10.5281/zenodo.17801705)

> ...

---

## 101. Flexible Metadata Harvesting for Ecology Using Large Language Models

**Authors:** Lu, Zehao, van der Plas, Thijs L., Rashidi, Parinaz, Kissling, W.D., Athanasiadis, Ioannis N.

**Year:** 2026 | **Venue:** Wageningen University and Researchcenter Publications (Wageningen University & Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://edepot.wur.nl/703556) | [DOI](https://doi.org/10.1007/978-3-032-06136-2_32)

> ...

---

## 102. AI LLM dataset

**Authors:** Anonymous

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17851255) | [DOI](https://doi.org/10.5281/zenodo.17851255)

> ...

---

## 103. Linguistic annotation of Byzantine book epigrams : revisited

**Authors:** Swaelens, Colin, De Vos, Ilse, Lefever, Els

**Year:** 2026 | **Venue:** Ghent University Academic Bibliography (Ghent University) | **Citations:** N/A | **Score:** 0.000

> In the current surge of interest in large language models (LLM) within the field of natural language processing (NLP), the automatic assignment of linguistic information may seem straightforward. However, tasks like part-of-speech tagging, morphological analysis, and lemmatisation pose significant challenges for ancient languages such as Greek, Latin, and Sanskrit. A major issue with these languag...

---

## 104. DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning

**Authors:** DeepSeek-AI, Daya Guo, Dejian Yang, Haowei Zhang, Jun-Mei Song

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 5325 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2501.12948)

> We introduce our first-generation reasoning models, DeepSeek-R1-Zero and DeepSeek-R1. DeepSeek-R1-Zero, a model trained via large-scale reinforcement learning (RL) without supervised fine-tuning (SFT) as a preliminary step, demonstrates remarkable reasoning capabilities. Through RL, DeepSeek-R1-Zero naturally emerges with numerous powerful and intriguing reasoning behaviors. However, it encounters...

---

## 105. QLoRA: Efficient Finetuning of Quantized LLMs

**Authors:** Tim Dettmers, Artidoro Pagnoni, Ari Holtzman, Luke Zettlemoyer

**Year:** 2023 | **Venue:** Neural Information Processing Systems | **Citations:** 3602 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2305.14314) | [DOI](https://doi.org/10.48550/arXiv.2305.14314)

> We present QLoRA, an efficient finetuning approach that reduces memory usage enough to finetune a 65B parameter model on a single 48GB GPU while preserving full 16-bit finetuning task performance. QLoRA backpropagates gradients through a frozen, 4-bit quantized pretrained language model into Low Rank Adapters~(LoRA). Our best model family, which we name Guanaco, outperforms all previous openly rel...

---

## 106. Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference

**Authors:** Wei-Lin Chiang, Lianmin Zheng, Ying Sheng, Anastasios Nikolas Angelopoulos, Tianle Li

**Year:** 2024 | **Venue:** International Conference on Machine Learning | **Citations:** 950 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2403.04132)

> Large Language Models (LLMs) have unlocked new capabilities and applications; however, evaluating the alignment with human preferences still poses significant challenges. To address this issue, we introduce Chatbot Arena, an open platform for evaluating LLMs based on human preferences. Our methodology employs a pairwise comparison approach and leverages input from a diverse user base through crowd...

---

## 107. VideoLLaMA 2: Advancing Spatial-Temporal Modeling and Audio Understanding in Video-LLMs

**Authors:** Zesen Cheng, Sicong Leng, Hang Zhang, Yifei Xin, Xin Li

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 545 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2406.07476)

> In this paper, we present the VideoLLaMA 2, a set of Video Large Language Models (Video-LLMs) designed to enhance spatial-temporal modeling and audio understanding in video and audio-oriented tasks. Building upon its predecessor, VideoLLaMA 2 incorporates a tailor-made Spatial-Temporal Convolution (STC) connector, which effectively captures the intricate spatial and temporal dynamics of video data...

---

## 108. Cambrian-1: A Fully Open, Vision-Centric Exploration of Multimodal LLMs

**Authors:** Shengbang Tong, Ellis Brown, Penghao Wu, Sanghyun Woo, Manoj Middepogu

**Year:** 2024 | **Venue:** Neural Information Processing Systems | **Citations:** 620 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2406.16860)

> We introduce Cambrian-1, a family of multimodal LLMs (MLLMs) designed with a vision-centric approach. While stronger language models can enhance multimodal capabilities, the design choices for vision components are often insufficiently explored and disconnected from visual representation learning research. This gap hinders accurate sensory grounding in real-world scenarios. Our study uses LLMs and...

---

## 109. Eyes Wide Shut? Exploring the Visual Shortcomings of Multimodal LLMs

**Authors:** Shengbang Tong, Zhuang Liu, Yuexiang Zhai, Yi Ma, Yann LeCun

**Year:** 2024 | **Venue:** Computer Vision and Pattern Recognition | **Citations:** 544 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2401.06209) | [DOI](https://doi.org/10.1109/CVPR52733.2024.00914)

> Is vision good enough for language? Recent advancements in multimodal models primarily stem from the powerful reasoning abilities of large language models (LLMs). However, the visual component typically depends only on the instance-level contrastive language-image pre-training (CLIP). Our research reveals that the visual capabilities in recent MultiModal LLMs (MLLMs) still exhibit systematic short...

---

## 110. The Era of 1-bit LLMs: All Large Language Models are in 1.58 Bits

**Authors:** Shuming Ma, Hongyu Wang, Lingxiao Ma, Lei Wang, Wenhui Wang

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 317 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2402.17764)

> Recent research, such as BitNet, is paving the way for a new era of 1-bit Large Language Models (LLMs). In this work, we introduce a 1-bit LLM variant, namely BitNet b1.58, in which every single parameter (or weight) of the LLM is ternary {-1, 0, 1}. It matches the full-precision (i.e., FP16 or BF16) Transformer LLM with the same model size and training tokens in terms of both perplexity and end-t...

---

## 111. QuaRot: Outlier-Free 4-Bit Inference in Rotated LLMs

**Authors:** Saleh Ashkboos, Amirkeivan Mohtashami, Maximilian L. Croci, Bo Li, Pashmina Cameron

**Year:** 2024 | **Venue:** Neural Information Processing Systems | **Citations:** 311 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2404.00456)

> We introduce QuaRot, a new Quantization scheme based on Rotations, which is able to quantize LLMs end-to-end, including all weights, activations, and KV cache in 4 bits. QuaRot rotates LLMs in a way that removes outliers from the hidden state without changing the output, making quantization easier. This computational invariance is applied to the hidden state (residual) of the LLM, as well as to th...

---

## 112. How Johnny Can Persuade LLMs to Jailbreak Them: Rethinking Persuasion to Challenge AI Safety by Humanizing LLMs

**Authors:** Yi Zeng, Hongpeng Lin, Jingwen Zhang, Diyi Yang, Ruoxi Jia

**Year:** 2024 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 469 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2401.06373)

> Most traditional AI safety research has approached AI models as machines and centered on algorithm-focused attacks developed by security experts. As large language models (LLMs) become increasingly common and competent, non-expert users can also impose risks during daily interactions. This paper introduces a new perspective to jailbreak LLMs as human-like communicators, to explore this overlooked ...

---

## 113. NV-Embed: Improved Techniques for Training LLMs as Generalist Embedding Models

**Authors:** Chankyu Lee, Rajarshi Roy, Mengyao Xu, Jonathan Raiman, M. Shoeybi

**Year:** 2024 | **Venue:** International Conference on Learning Representations | **Citations:** 371 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.17428)

> Decoder-only LLM-based embedding models are beginning to outperform BERT or T5-based embedding models in general-purpose text embedding tasks, including dense vector-based retrieval. In this work, we introduce NV-Embed, incorporating architectural designs, training procedures, and curated datasets to significantly enhance the performance of LLM as a versatile embedding model, while maintaining its...

---

## 114. MInference 1.0: Accelerating Pre-filling for Long-Context LLMs via Dynamic Sparse Attention

**Authors:** Huiqiang Jiang, Yucheng Li, Chengruidong Zhang, Qianhui Wu, Xufang Luo

**Year:** 2024 | **Venue:** Neural Information Processing Systems | **Citations:** 222 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2407.02490)

> The computational challenges of Large Language Model (LLM) inference remain a significant barrier to their widespread deployment, especially as prompt lengths continue to increase. Due to the quadratic complexity of the attention computation, it takes 30 minutes for an 8B LLM to process a prompt of 1M tokens (i.e., the pre-filling stage) on a single A100 GPU. Existing methods for speeding up prefi...

---

## 115. Jailbreaking Leading Safety-Aligned LLMs with Simple Adaptive Attacks

**Authors:** Maksym Andriushchenko, Francesco Croce, Nicolas Flammarion

**Year:** 2024 | **Venue:** International Conference on Learning Representations | **Citations:** 359 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2404.02151)

> We show that even the most recent safety-aligned LLMs are not robust to simple adaptive jailbreaking attacks. First, we demonstrate how to successfully leverage access to logprobs for jailbreaking: we initially design an adversarial prompt template (sometimes adapted to the target LLM), and then we apply random search on a suffix to maximize a target logprob (e.g., of the token"Sure"), potentially...

---

## 116. INSIDE: LLMs' Internal States Retain the Power of Hallucination Detection

**Authors:** Chao Chen, Kai Liu, Ze Chen, Yi Gu, Yue Wu

**Year:** 2024 | **Venue:** International Conference on Learning Representations | **Citations:** 198 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2402.03744)

> Knowledge hallucination have raised widespread concerns for the security and reliability of deployed LLMs. Previous efforts in detecting hallucinations have been employed at logit-level uncertainty estimation or language-level self-consistency evaluation, where the semantic information is inevitably lost during the token-decoding procedure. Thus, we propose to explore the dense semantic informatio...

---

## 117. RouteLLM: Learning to Route LLMs with Preference Data

**Authors:** Isaac Ong, Amjad Almahairi, Vincent Wu, Wei-Lin Chiang, Tianhao Wu

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 209 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2406.18665)

> Large language models (LLMs) exhibit impressive capabilities across a wide range of tasks, yet the choice of which model to use often involves a trade-off between performance and cost. More powerful models, though effective, come with higher expenses, while less capable models are more cost-effective. To address this dilemma, we propose several efficient router models that dynamically select betwe...

---

## 118. Spotting LLMs With Binoculars: Zero-Shot Detection of Machine-Generated Text

**Authors:** Abhimanyu Hans, Avi Schwarzschild, Valeriia Cherepanova, Hamid Kazemi, Aniruddha Saha

**Year:** 2024 | **Venue:** International Conference on Machine Learning | **Citations:** 200 | **Score:** 0.000

> Detecting text generated by modern large language models is thought to be hard, as both LLMs and humans can exhibit a wide range of complex behaviors. However, we find that a score based on contrasting two closely related language models is highly accurate at separating human-generated and machine-generated text. Based on this mechanism, we propose a novel LLM detector that only requires simple ca...

---

## 119. TOFU: A Task of Fictitious Unlearning for LLMs

**Authors:** Pratyush Maini, Zhili Feng, Avi Schwarzschild, Zachary Chase Lipton, J. Kolter

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 303 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2401.06121)

> Large language models trained on massive corpora of data from the web can memorize and reproduce sensitive or private data raising both legal and ethical concerns. Unlearning, or tuning models to forget information present in their training data, provides us with a way to protect private data after training. Although several methods exist for such unlearning, it is unclear to what extent they resu...

---

## 120. Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing

**Authors:** Zhangchen Xu, Fengqing Jiang, Luyao Niu, Yuntian Deng, R. Poovendran

**Year:** 2024 | **Venue:** International Conference on Learning Representations | **Citations:** 245 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2406.08464)

> High-quality instruction data is critical for aligning large language models (LLMs). Although some models, such as Llama-3-Instruct, have open weights, their alignment data remain private, which hinders the democratization of AI. High human labor costs and a limited, predefined scope for prompting prevent existing open-source data creation methods from scaling effectively, potentially limiting the...

---

## 121. HuatuoGPT-o1, Towards Medical Complex Reasoning with LLMs

**Authors:** Junying Chen, Zhenyang Cai, Ke Ji, Xidong Wang, Wanlong Liu

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 154 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2412.18925)

> The breakthrough of OpenAI o1 highlights the potential of enhancing reasoning to improve LLM. Yet, most research in reasoning has focused on mathematical tasks, leaving domains like medicine underexplored. The medical domain, though distinct from mathematics, also demands robust reasoning to provide reliable answers, given the high standards of healthcare. However, verifying medical reasoning is c...

---

## 122. Skywork-Reward: Bag of Tricks for Reward Modeling in LLMs

**Authors:** Chris Liu, Liang Zeng, Jiacai Liu, Rui Yan, Jujie He

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 213 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2410.18451)

> In this report, we introduce a collection of methods to enhance reward modeling for LLMs, focusing specifically on data-centric techniques. We propose effective data selection and filtering strategies for curating high-quality open-source preference datasets, culminating in the Skywork-Reward data collection, which contains only 80K preference pairs -- significantly smaller than existing datasets....

---

## 123. TempCompass: Do Video LLMs Really Understand Videos?

**Authors:** Yuanxin Liu, Shicheng Li, Yi Liu, Yuxiang Wang, Shuhuai Ren

**Year:** 2024 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 216 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2403.00476)

> Recently, there is a surge in interest surrounding video large language models (Video LLMs). However, existing benchmarks fail to provide a comprehensive feedback on the temporal perception ability of Video LLMs. On the one hand, most of them are unable to distinguish between different temporal aspects (e.g., speed, direction) and thus cannot reflect the nuanced performance on these specific aspec...

---

## 124. BABILong: Testing the Limits of LLMs with Long Context Reasoning-in-a-Haystack

**Authors:** Yuri Kuratov, A. Bulatov, Petr Anokhin, Ivan Rodkin, Dmitry Sorokin

**Year:** 2024 | **Venue:** Neural Information Processing Systems | **Citations:** 134 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2406.10149)

> In recent years, the input context sizes of large language models (LLMs) have increased dramatically. However, existing evaluation methods have not kept pace, failing to comprehensively assess the efficiency of models in handling long contexts. To bridge this gap, we introduce the BABILong benchmark, designed to test language models' ability to reason across facts distributed in extremely long doc...

---

## 125. BiLLM: Pushing the Limit of Post-Training Quantization for LLMs

**Authors:** Wei Huang, Yangdong Liu, Haotong Qin, Ying Li, Shiming Zhang

**Year:** 2024 | **Venue:** International Conference on Machine Learning | **Citations:** 126 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2402.04291)

> Pretrained large language models (LLMs) exhibit exceptional general language processing capabilities but come with significant demands on memory and computational resources. As a powerful compression technology, binarization can extremely reduce model weights to a mere 1 bit, lowering the expensive computation and memory requirements. However, existing quantization techniques fall short of maintai...

---

## 126. A Survey on RAG Meeting LLMs: Towards Retrieval-Augmented Large Language Models

**Authors:** Wenqi Fan, Yujuan Ding, Liang-bo Ning, Shijie Wang, Hengyun Li

**Year:** 2024 | **Venue:** Knowledge Discovery and Data Mining | **Citations:** 577 | **Score:** 0.000

[DOI](https://doi.org/10.1145/3637528.3671470)

> As one of the most advanced techniques in AI, Retrieval-Augmented Generation (RAG) can offer reliable and up-to-date external knowledge, providing huge convenience for numerous tasks. Particularly in the era of AI-Generated Content (AIGC), the powerful capacity of retrieval in providing additional knowledge enables RAG to assist existing generative AI in producing high-quality outputs. Recently, L...

---

## 127. MiniCheck: Efficient Fact-Checking of LLMs on Grounding Documents

**Authors:** Liyan Tang, Philippe Laban, Greg Durrett

**Year:** 2024 | **Venue:** Conference on Empirical Methods in Natural Language Processing | **Citations:** 169 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2404.10774)

> Recognizing if LLM output can be grounded in evidence is central to many tasks in NLP: retrieval-augmented generation, summarization, document-grounded dialogue, and more. Current approaches to this kind of fact-checking are based on verifying each piece of a model generation against potential evidence using an LLM. However, this process can be very computationally expensive, requiring many calls ...

---

## 128. Can LLMs Express Their Uncertainty? An Empirical Evaluation of Confidence Elicitation in LLMs

**Authors:** Miao Xiong, Zhiyuan Hu, Xinyang Lu, Yifei Li, Jie Fu

**Year:** 2023 | **Venue:** International Conference on Learning Representations | **Citations:** 668 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2306.13063) | [DOI](https://doi.org/10.48550/arXiv.2306.13063)

> Empowering large language models to accurately express confidence in their answers is essential for trustworthy decision-making. Previous confidence elicitation methods, which primarily rely on white-box access to internal model information or model fine-tuning, have become less suitable for LLMs, especially closed-source commercial APIs. This leads to a growing need to explore the untapped area o...

---

## 129. Vulcan: Instance-Optimal Systems Heuristics Through LLM-Driven Search

**Authors:** Rohit Dwivedula, Divyanshu Saxena, Sujay Yadalam, Daehyeok Kim, Aditya Akella

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25065v1) | > Resource-management tasks in modern operating and distributed systems continue to rely primarily on hand-designed heuristics for tasks such as scheduling, caching, or active queue management. Designing performant heuristics is an expensive, time-consuming process that we are forced to continuously go through due to the constant flux of hardware, workloads and environments.
  We propose a new alter...

---

## 130. Reliable and Resilient Collective Communication Library for LLM Training and Serving

**Authors:** Wei Wang, Nengneng Yu, Sixian Xiong, Zaoxing Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25059v1) | > Modern ML training and inference now span tens to tens of thousands of GPUs, where network faults can waste 10--15\% of GPU hours due to slow recovery. Common network errors and link fluctuations trigger timeouts that often terminate entire jobs, forcing expensive checkpoint rollback during training and request reprocessing during inference. We present R$^2$CCL, a fault-tolerant communication libr...

---

## 131. Context-aware LLM-based AI Agents for Human-centered Energy Management Systems in Smart Buildings

**Authors:** Tianzhi He, Farrokh Jazizadeh

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25055v1) | > This study presents a conceptual framework and a prototype assessment for Large Language Model (LLM)-based Building Energy Management System (BEMS) AI agents to facilitate context-aware energy management in smart buildings through natural language interaction. The proposed framework comprises three modules: perception (sensing), central control (brain), and action (actuation and user interaction),...

---

## 132. MAMA-Memeia! Multi-Aspect Multi-Agent Collaboration for Depressive Symptoms Identification in Memes

**Authors:** Siddhant Agarwal, Adya Dhuler, Polly Ruhnke, Melvin Speisman, Md Shad Akhtar

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25015v1) | > Over the past years, memes have evolved from being exclusively a medium of humorous exchanges to one that allows users to express a range of emotions freely and easily. With the ever-growing utilization of memes in expressing depressive sentiments, we conduct a study on identifying depressive symptoms exhibited by memes shared by users of online social media platforms. We introduce RESTOREx as a v...

---

## 133. Efficiently Estimating Data Efficiency for Language Model Fine-tuning

**Authors:** Gyung Hyun Je, Colin Raffel

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24991v1) | > While large language models (LLMs) demonstrate reasonable zero-shot capability across many downstream tasks, fine-tuning is a common practice to improve their performance. However, a task's data efficiency--i.e., the number of fine-tuning examples needed to achieve a desired level of performance--is often unknown, resulting in costly cycles of incremental annotation and retraining. Indeed, we demo...

---

## 134. PhysTalk: Language-driven Real-time Physics in 3D Gaussian Scenes

**Authors:** Luca Collorone, Mert Kiray, Indro Spinelli, Fabio Galasso, Benjamin Busam

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24986v1) | > Realistic visual simulations are omnipresent, yet their creation requires computing time, rendering, and expert animation knowledge. Open-vocabulary visual effects generation from text inputs emerges as a promising solution that can unlock immense creative potential. However, current pipelines lack both physical realism and effective language interfaces, requiring slow offline optimization. In con...

---

## 135. Large language models and the entropy of English

**Authors:** Colin Scheibner, Lindsay M. Smith, William Bialek

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24969v1) | > We use large language models (LLMs) to uncover long-ranged structure in English texts from a variety of sources. The conditional entropy or code length in many cases continues to decrease with context length at least to $N\sim 10^4$ characters, implying that there are direct dependencies or interactions across these distances. A corollary is that there are small but significant correlations betwee...

---

## 136. The Impact of LLMs on Online News Consumption and Production

**Authors:** Hangcheng Zhao, Ron Berman

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24968v1) | > Large language models (LLMs) change how consumers acquire information online; their bots also crawl news publishers' websites for training data and to answer consumer queries; and they provide tools that can lower the cost of content creation. These changes lead to predictions of adverse impact on news publishers in the form of lowered consumer demand, reduced demand for newsroom employees, and an...

---

## 137. CPJ: Explainable Agricultural Pest Diagnosis via Caption-Prompt-Judge with LLM-Judged Refinement

**Authors:** Wentao Zhang, Tao Fang, Lina Lu, Lifei Wang, Weihe Zhong

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24947v1) | > Accurate and interpretable crop disease diagnosis is essential for agricultural decision-making, yet existing methods often rely on costly supervised fine-tuning and perform poorly under domain shifts. We propose Caption--Prompt--Judge (CPJ), a training-free few-shot framework that enhances Agri-Pest VQA through structured, interpretable image captions. CPJ employs large vision-language models to ...

---

## 138. RAIR: A Rule-Aware Benchmark Uniting Challenging Long-Tail and Visual Salience Subset for E-commerce Relevance Assessment

**Authors:** Chenji Lu, Zhuo Chen, Hui Zhao, Zhenyi Wang, Pengjie Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24943v1) | > Search relevance plays a central role in web e-commerce. While large language models (LLMs) have shown significant results on relevance task, existing benchmarks lack sufficient complexity for comprehensive model assessment, resulting in an absence of standardized relevance evaluation metrics across the industry. To address this limitation, we propose Rule-Aware benchmark with Image for Relevance ...

---

## 139. Iterative Deployment Improves Planning Skills in LLMs

**Authors:** Augusto B. Corrêa, Yoav Gelberg, Luckeciano C. Melo, Ilia Shumailov, André G. Pereira

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24940v1) | > We show that iterative deployment of large language models (LLMs), each fine-tuned on data carefully curated by users from the previous models' deployment, can significantly change the properties of the resultant models. By testing this mechanism on various planning domains, we observe substantial improvements in planning skills, with later models displaying emergent generalization by discovering ...

---

## 140. Vibe Coding, Interface Flattening

**Authors:** Hongrui Jin

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24939v1) | > Large language models are reshaping programming by enabling 'vibe coding': the development of softwares through natural-language interaction with model-driven toolchains. This article argues that vibe coding is best understood as interface flattening, a reconfiguration in which previously distinct modalities (GUI, CLI, and API) appear to converge into a single conversational surface, even as the u...

---

## 141. Adaptive Dependency-aware Prompt Optimization Framework for Multi-Step LLM Pipeline

**Authors:** Minjun Zhao, Xinyu Zhang, Shuai Zhang, Deyang Li, Ruifeng Shi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24933v1) | > Multi-step LLM pipelines invoke large language models multiple times in a structured sequence and can effectively solve complex tasks, but their performance heavily depends on the prompts used at each step. Jointly optimizing these prompts is difficult due to missing step-level supervision and inter-step dependencies. Existing end-to-end prompt optimization methods struggle under these conditions ...

---

## 142. Let It Flow: Agentic Crafting on Rock and Roll, Building the ROME Model within an Open Agentic Learning Ecosystem

**Authors:** Weixun Wang, XiaoXiao Xu, Wanhe An, Fangwen Dai, Wei Gao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24873v1) | > Agentic crafting requires LLMs to operate in real-world environments over multiple turns by taking actions, observing outcomes, and iteratively refining artifacts. Despite its importance, the open-source community lacks a principled, end-to-end ecosystem to streamline agent development. We introduce the Agentic Learning Ecosystem (ALE), a foundational infrastructure that optimizes the production p...

---

## 143. Encyclo-K: Evaluating LLMs with Dynamically Composed Knowledge Statements

**Authors:** Yiming Liang, Yizhi Li, Yantao Du, Ge Zhang, Jiayi Zhou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24867v1) | > Benchmarks play a crucial role in tracking the rapid advancement of large language models (LLMs) and identifying their capability boundaries. However, existing benchmarks predominantly curate questions at the question level, suffering from three fundamental limitations: vulnerability to data contamination, restriction to single-knowledge-point assessment, and reliance on costly domain expert annot...

---

## 144. Advances in Agentic AI: Back to the Future

**Authors:** Sergio Alvarez-Telena, Marta Diez-Fernandez

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24856v1) | > In light of the recent convergence between Agentic AI and our field of Algorithmization, this paper seeks to restore conceptual clarity and provide a structured analytical framework for an increasingly fragmented discourse. First, (a) it examines the contemporary landscape and proposes precise definitions for the key notions involved, ranging from intelligence to Agentic AI. Second, (b) it reviews...

---

## 145. GenZ: Foundational models as latent variable generators within traditional statistical models

**Authors:** Marko Jojic, Nebojsa Jojic

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24834v1) | > We present GenZ, a hybrid model that bridges foundational models and statistical modeling through interpretable semantic features. While large language models possess broad domain knowledge, they often fail to capture dataset-specific patterns critical for prediction tasks. Our approach addresses this by discovering semantic feature descriptions through an iterative process that contrasts groups o...

---

## 146. Unregularized Linear Convergence in Zero-Sum Game from Preference Feedback

**Authors:** Shulun Chen, Runlong Zhou, Zihan Zhang, Maryam Fazel, Simon S. Du

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24818v1) | > Aligning large language models (LLMs) with human preferences has proven effective for enhancing model capabilities, yet standard preference modeling using the Bradley-Terry model assumes transitivity, overlooking the inherent complexity of human population preferences. Nash learning from human feedback (NLHF) addresses this by framing non-transitive preferences as a two-player zero-sum game, where...

---

## 147. LeanCat: A Benchmark Suite for Formal Category Theory in Lean (Part I: 1-Categories)

**Authors:** Rongge Xu, Hui Dai, Yiming Fu, Jiedong Jiang, Tianjiao Nie

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24796v1) | > Large language models (LLMs) have made rapid progress in formal theorem proving, yet current benchmarks under-measure the kind of abstraction and library-mediated reasoning that organizes modern mathematics. In parallel with FATE's emphasis on frontier algebra, we introduce LeanCat, a Lean benchmark for category-theoretic formalization -- a unifying language for mathematical structure and a core l...

---

## 148. Compute-Accuracy Pareto Frontiers for Open-Source Reasoning Large Language Models

**Authors:** Ákos Prucs, Márton Csutora, Mátyás Antal, Márk Marosi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24776v1) | > Large Language Models (LLMs) are demonstrating rapid improvements on complex reasoning benchmarks, particularly when allowed to utilize intermediate reasoning steps before converging on a final solution. However, current literature often overlooks the significant computational burden associated with generating long reasoning sequences. For industrial applications, model selection depends not only ...

---

## 149. AstroReview: An LLM-driven Multi-Agent Framework for Telescope Proposal Peer Review and Refinement

**Authors:** Yutong Wang, Yunxiang Xiao, Yonglin Tian, Junyong Li, Jing Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24754v1) | > Competitive access to modern observatories has intensified as proposal volumes outpace available telescope time, making timely, consistent, and transparent peer review a critical bottleneck for the advancement of astronomy. Automating parts of this process is therefore both scientifically significant and operationally necessary to ensure fair allocation and reproducible decisions at scale. We pres...

---

## 150. Analyzing Communication Predictability in LLM Training

**Authors:** Wenxue Li, Xiangzhou Liu, Yuxuan Li, Yilun Jin, Zhenghang Ren

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24750v1) | > Effective communication is essential in distributed training, with predictability being one of its most significant characteristics. However, existing studies primarily focus on exploiting predictability through online profiling for runtime optimization, without a systematic understanding of it. In this work, we aim to systematically formulate communication predictability in distributed training, ...

---

## 151. BIOME-Bench: A Benchmark for Biomolecular Interaction Inference and Multi-Omics Pathway Mechanism Elucidation from Scientific Literature

**Authors:** Sibo Wei, Peng Chen, Lifeng Dong, Yin Luo, Lei Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24733v1) | > Multi-omics studies often rely on pathway enrichment to interpret heterogeneous molecular changes, but pathway enrichment (PE)-based workflows inherit structural limitations of pathway resources, including curation lag, functional redundancy, and limited sensitivity to molecular states and interventions. Although recent work has explored using large language models (LLMs) to improve PE-based inter...

---

## 152. FPGA Co-Design for Efficient N:M Sparse and Quantized Model Inference

**Authors:** Fen-Yu Hsieh, Yun-Chang Teng, Ding-Yong Hong, Jan-Jan Wu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24713v1) | > Large language models (LLMs) have demonstrated remarkable performance across a wide range of language processing tasks. However, this success comes at the cost of substantial computation and memory requirements, which significantly impedes their deployment in resource-constrained environments. To address this challenge, this work introduces an automation framework that leverages weight pruning and...

---

## 153. MEIC-DT: Memory-Efficient Incremental Clustering for Long-Text Coreference Resolution with Dual-Threshold Constraints

**Authors:** Kangyang Luo, Shuzheng Si, Yuzhuo Bai, Cheng Gao, Zhitong Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24711v1) | > In the era of large language models (LLMs), supervised neural methods remain the state-of-the-art (SOTA) for Coreference Resolution. Yet, their full potential is underexplored, particularly in incremental clustering, which faces the critical challenge of balancing efficiency with performance for long texts. To address the limitation, we propose \textbf{MEIC-DT}, a novel dual-threshold, memory-effi...

---

## 154. Math-Shepherd: Verify and Reinforce LLMs Step-by-step without Human Annotations

**Authors:** Peiyi Wang, Lei Li, Zhihong Shao, R. Xu, Damai Dai

**Year:** 2023 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 651 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2312.08935)

> In this paper, we present an innovative process-oriented math process reward model called \textbf{Math-Shepherd}, which assigns a reward score to each step of math problem solutions. The training of Math-Shepherd is achieved using automatically constructed process-wise supervision data, breaking the bottleneck of heavy reliance on manual annotation in existing work. We explore the effectiveness of...

---

## 155. DiffSensei: Bridging Multi-Modal LLMs and Diffusion Models for Customized Manga Generation

**Authors:** Jianzong Wu, Chao Tang, Jingbo Wang, Yanhong Zeng, Xiangtai Li

**Year:** 2024 | **Venue:** Computer Vision and Pattern Recognition | **Citations:** 11 | **Score:** 0.000

[DOI](https://doi.org/10.1109/CVPR52734.2025.02671)

> Story visualization, the task of creating visual narratives from textual descriptions, has seen progress with text-to-image generation models. However, these models often lack effective control over character appearances and interactions, particularly in multi-character scenes. To address these limitations, we propose a new task: customized manga generation and introduce DiffSensei, an innovative ...

---

## 156. DataInf: Efficiently Estimating Data Influence in LoRA-tuned LLMs and Diffusion Models

**Authors:** Yongchan Kwon, Eric Wu, Kevin Wu, James Zou

**Year:** 2023 | **Venue:** International Conference on Learning Representations | **Citations:** 91 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2310.00902) | [DOI](https://doi.org/10.48550/arXiv.2310.00902)

> Quantifying the impact of training data points is crucial for understanding the outputs of machine learning models and for improving the transparency of the AI pipeline. The influence function is a principled and popular data attribution method, but its computational cost often makes it challenging to use. This issue becomes more pronounced in the setting of large language models and text-to-image...

---

## 157. Decoder-Only LLMs are Better Controllers for Diffusion Models

**Authors:** Ziyi Dong, Yao Xiao, Pengxu Wei, Liang Lin

**Year:** 2024 | **Venue:** ACM Multimedia | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.1145/3664647.3680725)

> Groundbreaking advancements in text-to-image generation have recently been achieved with the emergence of diffusion models. These models exhibit a remarkable ability to generate highly artistic and intricately detailed images based on textual prompts. However, obtaining desired generation outcomes often necessitates repetitive trials of manipulating text prompts just like casting spells on a magic...

---

## 158. Text-To-3D Cinemagraphs for Generation of Visual Content in Disaster Alerts: A Generative AI Framework with LLMs and Diffusion Models

**Authors:** Ru-Bin Won, Minji Choi, J. Choi, Byungjun Bae

**Year:** 2024 | **Venue:** Journal of Broadcast Engineering | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5909/jbe.2024.29.5.662) | [DOI](https://doi.org/10.5909/jbe.2024.29.5.662)

> The study proposes a novel framework called Text-To-3D Cinemagraph to enhance disaster communication using generative AI technologies. This framework uses a combination of text and image generation along with animation techniques, such as optical flow and 3D camera movements, to create dynamic visual alerts. Unlike current Text-To-Video technologies, which are complex and resource-intensive, the T...

---

## 159. Bifrost-1: Bridging Multimodal LLMs and Diffusion Models with Patch-level CLIP Latents

**Authors:** Han Lin, Jaemin Cho, Amir Zadeh, Chuan Li, Mohit Bansal

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 6 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2508.05954)

> There is growing interest in integrating high-fidelity visual synthesis capabilities into large language models (LLMs) without compromising their strong reasoning capabilities. Existing methods that directly train LLMs or bridge LLMs and diffusion models usually suffer from costly training since the backbone LLMs have not seen image representations during pretraining. We present Bifrost-1, a unifi...

---

## 160. Fusing LLMs and diffusion models: A comprehensive survey of progress, challenges, and future directions in generative AI

**Authors:** Bilel Benjdira, Anas M. Ali, Wadii Boulila, Anis Koubaa

**Year:** 2026 | **Venue:** Computer Science Review | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1016/j.cosrev.2025.100881)

> ...

---

## 161. AI-Generated Fall Data: Assessing LLMs and Diffusion Model for Wearable Fall Detection

**Authors:** Sana Alamgeer, Yasine Souissi, Anne H. H. Ngu

**Year:** 2025 | **Venue:** Italian National Conference on Sensors | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.3390/s25165144)

> Training fall detection systems is challenging due to the scarcity of real-world fall data, particularly from elderly individuals. To address this, we explore the potential of Large Language Models (LLMs) for generating synthetic fall data. This study evaluates text-to-motion (T2M, SATO, and ParCo) and text-to-text models (GPT4o, GPT4, and Gemini) in simulating realistic fall scenarios. We generat...

---

## 162. Generating realistic synthetic tabular data with integrated LLM and diffusion models

**Authors:** Tokimasa Isomura, Ryotaro Shimizu, Masayuki Goto

**Year:** 2025 | **Venue:** Neurocomputing | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1016/j.neucom.2025.131371)

> ...

---

## 163. Efficient Object Placement Via LLM and Diffusion Model

**Authors:** Wei Liu, Liuan Wang, Jun Sun

**Year:** 2025 | **Venue:** IEEE International Conference on Acoustics, Speech, and Signal Processing | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.1109/ICASSP49660.2025.10888099)

> We address the problem of object placement with user instructions using LLM and diffusion model. Traditional methods struggle to find a suitable location for filling the object with a semantically reasonable size. In this work, we leverage the LLM to predict the coordinates of the added object with the help of user instruction. First, We extend the object placement benchmark OPA-INST for object pl...

---

## 164. Generative AI in Healthcare: An Analytical Review of Models, Clinical Applications, and Decision-Support Implications

**Authors:** Naglaa Fadul, Mona Fahad Alaskar, Kamal Bakari Jillahi, Dalia Bassem El-Khaled

**Year:** 2025 | **Venue:** Journal of Future Artificial Intelligence and Technologies | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.62411/faith.3048-3719-298) | [DOI](https://doi.org/10.62411/faith.3048-3719-298)

> This review examines the rapidly expanding landscape of Generative Artificial Intelligence (GenAI) in healthcare, focusing on how models such as GANs, VAEs, diffusion models, and large language models are being explored across medical imaging, clinical documentation, synthetic data generation, drug discovery, and decision-support workflows. Despite GenAI's growing influence, persistent challenges,...

---

## 165. Aoi Analyzer — Restricted Documentation Archive (2026): Business, Ethical, and Compliance Reference for a GPTs-Based Art Analysis System

**Authors:** Aoi Ichikawa

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18091280) | [DOI](https://doi.org/10.5281/zenodo.18091280)

> 📦 概要 / Overview 日本語 (JP)Aoi Analyzer は、Stable Diffusion や Midjourney などで生成された作品を対象に、生成ではなく「解釈」を行う GPTs ベースのアート解析システムである。本アーカイブは、Aoi Analyzer に関する 事業設計・倫理方針・コンプライアンス対応 を包括的にまとめた Restricted Documentation Archive である。 本アーカイブには、エグゼクティブサマリー、ホワイトペーパー、利用規約および倫理ポリシー、投資家向け資料、OpenAI 利用規約に関する照会文書、ならびに改ざん検知・真正性確認のためのアーカイブ補助資料が含まれる。これらは、Aoi Analyzer を 人間中心の解釈型 AI システムとして運用するための設計思想と責任範囲を明示するものである。 GPTs は 自然言語イ...

---

## 166. Procedural Story Generation for Visual Novels Using Large Language Models and Text-to-Image Techniques

**Authors:** Dharma Hutama Husen, Wirawan Istiono

**Year:** 2025 | **Venue:** Journal of Games Game Art and Gamification | **Citations:** N/A | **Score:** 0.000

[PDF](https://journal.binus.ac.id/index.php/jggag/article/download/12743/5614) | [DOI](https://doi.org/10.21512/jggag.v10i3.12743)

> Story-based video games have content limitations. A survey conducted among Genshin Impact players, 67% of respondents had reached the end of the avail- able story. The game’s ending may lead to repetitive gameplay. To increase the story content inside video games, this research uses Generative AI for pro- ducing procedural stories. This research also measures the similarity of generated stories us...

---

## 167. Multi-Agent Framework for Threat Mitigation and Resilience in AI-Based Systems

**Authors:** Armstrong Foundjem, Lionel Nganyewou Tidjon, Léuson Da Silva, Foutse Khomh

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.23132) | [DOI](https://doi.org/10.48550/arxiv.2512.23132)

> Machine learning (ML) underpins foundation models in finance, healthcare, and critical infrastructure, making them targets for data poisoning, model extraction, prompt injection, automated jailbreaking, and preference-guided black-box attacks that exploit model comparisons. Larger models can be more vulnerable to introspection-driven jailbreaks and cross-modal manipulation. Traditional cybersecuri...

---

## 168. WeDLM: Reconciling Diffusion Language Models with Standard Causal Attention for Fast Inference

**Authors:** Aiwei Liu, Minghua He, Shaoxun Zeng, Sijun Zhang, L Zhang

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.22737) | [DOI](https://doi.org/10.48550/arxiv.2512.22737)

> Autoregressive (AR) generation is the standard decoding paradigm for Large Language Models (LLMs), but its token-by-token nature limits parallelism at inference time. Diffusion Language Models (DLLMs) offer parallel decoding by recovering multiple masked tokens per step; however, in practice they often fail to translate this parallelism into deployment speed gains over optimized AR engines (e.g., ...

---

## 169. SR-TCM: The Physical Basis of System 1 and System 2 via Spectral-Riemannian Inertial Dynamics

**Authors:** Wang

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18066889) | [DOI](https://doi.org/10.5281/zenodo.18066889)

> Current Large Language Models (LLMs) operate on a Euclidean semantic manifold with uniform temporal dynamics, effectively treating all token interactions as having equal "cognitive weight." This contradicts the fundamental duality of human cognition: System 1 (Fast, Reflexive, Massless) vs. System 2 (Slow, Deliberative, Massive). We propose SR-TCM, a unified physico-geometric architecture that ope...

---

## 170. Enhancing Healthcare Data Interoperability with AI-Driven Synthetic Datasets Using FHIR Standards

**Authors:** Vamshi Paili

**Year:** 2025 | **Venue:** Global Society of Scientific Research and Researchers - International Journal of Computer | **Citations:** N/A | **Score:** 0.000

[PDF](https://ijcjournal.org/InternationalJournalOfComputer/article/download/2474/922) | > This article addresses how one can combine AI-generated synthetic medical datasets as well as FHIR standard semantic standards and APIs to better enable cross-system interoperability between health care providers. In order to create data sets with the desired level of analytical utility, the author have as a study objective to demonstrate how the generation of synthetics in the context of FHIR res...

---

## 171. Specifics of Software Quality Assurance in High-Frequency Trading (HFT) Systems

**Authors:** Khapankou Anton

**Year:** 2025 | **Venue:** Global Society of Scientific Research and Researchers - International Journal of Computer | **Citations:** N/A | **Score:** 0.000

[PDF](https://ijcjournal.org/InternationalJournalOfComputer/article/download/2475/921) | > This article addresses how one can combine AI-generated synthetic medical datasets as well as FHIR standard semantic standards and APIs to better enable cross-system interoperability between health care providers. In order to create data sets with the desired level of analytical utility, the author have as a study objective to demonstrate how the generation of synthetics in the context of FHIR res...

---

## 172. Fast Inference of Visual Autoregressive Model with Adjacency-Adaptive Dynamical Draft Trees

**Authors:** Haodong Lei, Hongsong Wang, Xin Geng, Liang Wang, Pan Zhou

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.21857) | [DOI](https://doi.org/10.48550/arxiv.2512.21857)

> Autoregressive (AR) image models achieve diffusion-level quality but suffer from sequential inference, requiring approximately 2,000 steps for a 576x576 image. Speculative decoding with draft trees accelerates LLMs yet underperforms on visual AR models due to spatially varying token prediction difficulty. We identify a key obstacle in applying speculative decoding to visual AR models: inconsistent...

---

## 173. The Path to Ascension for Large Language Models: The Expansion of the Temporal Dimension

**Authors:** hailong zhu

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18047439) | [DOI](https://doi.org/10.5281/zenodo.18047439)

> Abstract This paper observes the core limitations of current large language models (LLMs) in pursuing general artificial intelligence (AGI)-level capabilities (commonly referred to as "ascension"), and extends the discussion to the necessity of expanding the temporal dimension through phenomena in human cognition. We observe that the bottleneck in LLM development lies not in the physical expansion...

---

## 174. Emotion Diffusion in Real and Simulated Social Graphs: Structural Limits of LLM-Based Social Simulation

**Authors:** Qiqi Qiang

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.21138) | [DOI](https://doi.org/10.48550/arxiv.2512.21138)

> Understanding how emotions diffuse through social networks is central to computational social science. Recently, large language models (LLMs) have been increasingly used to simulate social media interactions, raising the question of whether LLM-generated data can realistically reproduce emotion diffusion patterns observed in real online communities. In this study, we conduct a systematic compariso...

---

## 175. Encrypted Traffic Detection in Resource Constrained IoT Networks: A Diffusion Model and LLM Integrated Framework

**Authors:** Hongjuan Li, Hui Kang, Chenbang Liu, Ruolin Wang, Jiahui Li

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.21144) | [DOI](https://doi.org/10.48550/arxiv.2512.21144)

> The proliferation of Internet-of-things (IoT) infrastructures and the widespread adoption of traffic encryption present significant challenges, particularly in environments characterized by dynamic traffic patterns, constrained computational capabilities, and strict latency constraints. In this paper, we propose DMLITE, a diffusion model and large language model (LLM) integrated traffic embedding ...

---

## 176. EVE: A Generator-Verifier System for Generative Policies

**Authors:** Yusuf Ali, Gryphon Patlin, Karthik Kothuri, Muhammad Zubair Irshad, Wuwei Liang

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.21430) | [DOI](https://doi.org/10.48550/arxiv.2512.21430)

> Visuomotor policies based on generative architectures such as diffusion and flow-based matching have shown strong performance but degrade under distribution shifts, demonstrating limited recovery capabilities without costly finetuning. In the language modeling domain, test-time compute scaling has revolutionized reasoning capabilities of modern LLMs by leveraging additional inference-time compute ...

---

## 177. SpaceTimePilot: Generative Rendering of Dynamic Scenes Across Space and Time

**Authors:** Zhening Huang, Hyeonho Jeong, Xuelin Chen, Yulia Gryaditskaya, Tuanfeng Y. Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25075v1) | > We present SpaceTimePilot, a video diffusion model that disentangles space and time for controllable generative rendering. Given a monocular video, SpaceTimePilot can independently alter the camera viewpoint and the motion sequence within the generative process, re-rendering the scene for continuous and arbitrary exploration across space and time. To achieve this, we introduce an effective animati...

---

## 178. Randomization Times under Quantum Chaotic Hamiltonian Evolution

**Authors:** Souradeep Ghosh, Nicholas Hunter-Jones, Joaquin F. Rodriguez-Nieva

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25074v1) | > Randomness generation through quantum-chaotic evolution underpins foundational questions in statistical mechanics and applications across quantum information science, including benchmarking, tomography, metrology, and demonstrations of quantum computational advantage. While statistical mechanics successfully captures the temporal averages of local observables, understanding randomness at the level...

---

## 179. GaMO: Geometry-aware Multi-view Diffusion Outpainting for Sparse-View 3D Reconstruction

**Authors:** Yi-Chuan Huang, Hao-Jen Chien, Chin-Yang Lin, Ying-Huan Chen, Yu-Lun Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25073v1) | > Recent advances in 3D reconstruction have achieved remarkable progress in high-quality scene capture from dense multi-view imagery, yet struggle when input views are limited. Various approaches, including regularization techniques, semantic priors, and geometric constraints, have been implemented to address this challenge. Latest diffusion-based methods have demonstrated substantial improvements b...

---

## 180. Edit3r: Instant 3D Scene Editing from Sparse Unposed Images

**Authors:** Jiageng Liu, Weijie Lyu, Xueting Li, Yejie Guo, Ming-Hsuan Yang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25071v1) | > We present Edit3r, a feed-forward framework that reconstructs and edits 3D scenes in a single pass from unposed, view-inconsistent, instruction-edited images. Unlike prior methods requiring per-scene optimization, Edit3r directly predicts instruction-aligned 3D edits, enabling fast and photorealistic rendering without optimization or pose estimation. A key challenge in training such a model lies i...

---

## 181. Coordinated Humanoid Manipulation with Choice Policies

**Authors:** Haozhi Qi, Yen-Jen Wang, Toru Lin, Brent Yi, Yi Ma

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25072v1) | > Humanoid robots hold great promise for operating in human-centric environments, yet achieving robust whole-body coordination across the head, hands, and legs remains a major challenge. We present a system that combines a modular teleoperation interface with a scalable learning framework to address this problem. Our teleoperation design decomposes humanoid control into intuitive submodules, which i...

---

## 182. Scaling Open-Ended Reasoning to Predict the Future

**Authors:** Nikhil Chandak, Shashwat Goel, Ameya Prabhu, Moritz Hardt, Jonas Geiping

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25070v1) | > High-stakes decision making involves reasoning under uncertainty about the future. In this work, we train language models to make predictions on open-ended forecasting questions. To scale up training data, we synthesize novel forecasting questions from global events reported in daily news, using a fully automated, careful curation recipe. We train the Qwen3 thinking models on our dataset, OpenFore...

---

## 183. From Inpainting to Editing: A Self-Bootstrapping Framework for Context-Rich Visual Dubbing

**Authors:** Xu He, Haoxian Zhang, Hejia Chen, Changyuan Zheng, Liyang Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25066v1) | > Audio-driven visual dubbing aims to synchronize a video's lip movements with new speech, but is fundamentally challenged by the lack of ideal training data: paired videos where only a subject's lip movements differ while all other visual conditions are identical. Existing methods circumvent this with a mask-based inpainting paradigm, where an incomplete visual conditioning forces models to simulta...

---

## 184. Feeling Blue: Constructing a Robust SALT3 UV Template and Constraining its Redshift Dependency

**Authors:** Qinan Wang, David O. Jones, Justin D. R. Pierel, Matthew R. Siebert, W. D'Arcy Kenworthy

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25064v1) | > Upcoming cosmological surveys will obtain numerous rest-frame ultraviolet (UV) observations of Type Ia supernovae (SNe Ia), yet there is concern about how standardizable SNe Ia are in the UV. In this work, we train a robust optical--UV SED model for SNe Ia (SALT3-UV) with the open-source model-training software $\texttt{SALTshaker}$. We incorporate a spectroscopic UV data sample from HST, includin...

---

## 185. Many Minds from One Model: Bayesian Transformers for Population Intelligence

**Authors:** Diji Yang, Yi Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25063v1) | > Despite their scale and success, modern transformers are almost universally trained as single-minded systems: optimization produces one deterministic set of parameters, representing a single functional hypothesis about the data. Motivated by the idea that intelligence emerge from many minds, we propose Population Bayesian Transformers (B-Trans), which transform a standard Large Language Model into...

---

## 186. Sequential Bayesian parameter-state estimation in dynamical systems with noisy and incomplete observations via a variational framework

**Authors:** Liliang Wang, Alex Gorodetsky

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25056v1) | > Online joint estimation of unknown parameters and states in a dynamical system with uncertainty quantification is crucial in many applications. For example, digital twins dynamically update their knowledge of model parameters and states to support prediction and decision-making. Reliability and computational speed are vital for DTs. Online parameter-state estimation ensures computational efficienc...

---

## 187. Fluid dynamics as intersection problem

**Authors:** Nikita Nekrasov, Paul Wiegmann

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25053v1) | > We formulate the covariant hydrodynamics equations describing the fluid dynamics as the problem of intersection theory on the infinite dimensional symplectic manifold associated with spacetime. This point of view separates the structures related to the equation of state, the geometry of spacetime, and structures related to the (differential) topology of spacetime. We point out a five-dimensional o...

---

## 188. The PDE-ODI principle and cylindrical mean curvature flows

**Authors:** Richard H. Bamler, Yi Lai

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25050v1) | > We introduce a new approach for analyzing ancient solutions and singularities of mean curvature flow that are locally modeled on a cylinder. Its key ingredient is a general mechanism, called the \emph{PDE--ODI principle}, which converts a broad class of parabolic differential equations into systems of ordinary differential inequalities. This principle bypasses many delicate analytic estimates used...

---

## 189. Extreme nonlinear optics in optical fibers

**Authors:** Mario Ferraro, Bertrand Kibler, Pierre Béjot, Frédéric Gérome, Benoit Debord

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25046v1) | > This paper reviews the field of extreme nonlinear optics in optical fibers, highlighting key phenomena and advancements. It discusses multiple ionization effects caused by femtosecond laser pulses that generate plasma and induce permanent material modifications, as well as plasma luminescence and its dependence on material imperfections. The formation and dynamics of plasma filaments, including he...

---

## 190. Bayesian Elastic Net Regression with Structured Prior Dependence

**Authors:** Christopher M. Hans, Ningyi Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25045v1) | > Many regularization priors for Bayesian regression assume the regression coefficients are a priori independent. In particular this is the case for standard Bayesian treatments of the lasso and the elastic net. While independence may be reasonable in some data-analytic settings, incorporating dependence in these prior distributions provides greater modeling flexibility. This paper introduces the or...

---

## 191. Compound Estimation for Binomials

**Authors:** Yan Chen, Lihua Lei

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25042v1) | > Many applications involve estimating the mean of multiple binomial outcomes as a common problem -- assessing intergenerational mobility of census tracts, estimating prevalence of infectious diseases across countries, and measuring click-through rates for different demographic groups. The most standard approach is to report the plain average of each outcome. Despite simplicity, the estimates are no...

---

## 192. Towards precision cosmology with Voids x CMB correlations (I): Roman-Agora mock catalogs and pipeline validation

**Authors:** Mar Pérez Sar, Carlos Hernández Monteagudo, András Kovács, Alice Pisani

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25040v1) | > We construct and validate a set of multi-purpose mock galaxy catalogs designed to capture, to different degrees of accuracy, the main characteristics of the Nancy Grace Roman Space Telescope survey. These catalogs provide a foundation for void statistics and various CMB cross-correlation analyses. Our approach differs from traditional halo occupation or abundance matching methods by directly trans...

---

## 193. Anomalous (3+1)d Fermionic Topological Quantum Field Theories via Symmetry Extension

**Authors:** Zheyan Wan, Juven Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25038v1) | > Discrete finite-group global symmetries may suffer from nonperturbative 't-Hooft anomalies. Such global anomalies can be canceled by anomalous symmetry-preserving topological quantum field theories (TQFTs), which contain no local point operators but only extended excitations such as line and surface operators. In this work, we study mixed gauge-gravitational nonperturbative global anomalies of Wey...

---

## 194. Large Neutrino-Dark Matter Interactions: From Effective Field Theory to Ultraviolet Completions

**Authors:** K. S. Babu, P. S. Bhupal Dev, Anil Thapa

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25035v1) | > We develop a general effective field theory (EFT) framework for neutrino-dark matter (DM) interactions, and apply it to systematically find all possible gauge-invariant ultraviolet (UV) completions at a given EFT operator dimension. Our goal here is to find simple UV-complete models that can realize potentially large neutrino-DM interactions, while being consistent with all existing theoretical an...

---

## 195. Generative Classifiers Avoid Shortcut Solutions

**Authors:** Alexander C. Li, Ananya Kumar, Deepak Pathak

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25034v1) | > Discriminative approaches to classification often learn shortcuts that hold in-distribution but fail even under minor distribution shift. This failure mode stems from an overreliance on features that are spuriously correlated with the label. We show that generative classifiers, which use class-conditional generative models, can avoid this issue by modeling all features, both core and spurious, ins...

---

## 196. EF(X) Orientations: A Parameterized Complexity Perspective

**Authors:** Sotiris Kanellopoulos, Edouard Nemery, Christos Pergaminelis, Minas Marios Sotiriou, Manolis Vasilakis

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25033v1) | > The concept of fair orientations in graphs was introduced by Christodoulou, Fiat, Koutsoupias, and Sgouritsa in 2023, naturally modeling fair division scenarios in which resources are only contested by neighbors. In this model, vertices represent agents and undirected edges represent goods; edges have to be oriented towards one of their endpoints, i.e., allocated to one of their adjacent agents. A...

---

## 197. Fractal conduction pathways governing ionic transport in a glass

**Authors:** J. L. Iguain, F. O. Sanchez-Varreti, M. A. Frechero

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25031v1) | > We present a systematic characterization of the fractal conduction pathways governing ionic transport in a non-crystalline solid below the glass-transition temperature. Using classical molecular dynamics simulations of lithium metasilicate, we combine mobility-resolved dynamical analysis with a real-space description of the regions explored by lithium ions. Ensemble-averaged velocity autocorrelati...

---

## 198. Multivariate Generalized Counting Process via Gamma Subordination

**Authors:** Manisha Dhillon, Kuldeep Kumar Kataria, Shyan Ghosh

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25030v1) | > In this paper, we study a multivariate gamma subordinator whose components are independent gamma processes subject to a random time governed by an independent negative binomial process. We derive the explicit expressions for its joint Laplace-Stieltjes transform, its probability density function and the associated governing differential equations. Also, we study a time-changed variant of the multi...

---

## 199. Mastering Text-to-Image Diffusion: Recaptioning, Planning, and Generating with Multimodal LLMs

**Authors:** Ling Yang, Zhaochen Yu, Chenlin Meng, Minkai Xu, Stefano Ermon

**Year:** 2024 | **Venue:** International Conference on Machine Learning | **Citations:** 188 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2401.11708)

> Diffusion models have exhibit exceptional performance in text-to-image generation and editing. However, existing methods often face challenges when handling complex text prompts that involve multiple objects with multiple attributes and relationships. In this paper, we propose a brand new training-free text-to-image generation/editing framework, namely Recaption, Plan and Generate (RPG), harnessin...

---

## 200. Prompt-Consistency Image Generation (PCIG): A Unified Framework Integrating LLMs, Knowledge Graphs, and Controllable Diffusion Models

**Authors:** Yichen Sun, Zhixuan Chu, Zhan Qin, Kui Ren

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2406.16333)

> The rapid advancement of Text-to-Image(T2I) generative models has enabled the synthesis of high-quality images guided by textual descriptions. Despite this significant progress, these models are often susceptible in generating contents that contradict the input text, which poses a challenge to their reliability and practical deployment. To address this problem, we introduce a novel diffusion-based...

---

## 201. Self-Play Fine-Tuning of Diffusion Models for Text-to-Image Generation

**Authors:** Huizhuo Yuan, Zixiang Chen, Kaixuan Ji, Quanquan Gu

**Year:** 2024 | **Venue:** Neural Information Processing Systems | **Citations:** 60 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2402.10210)

> Fine-tuning Diffusion Models remains an underexplored frontier in generative artificial intelligence (GenAI), especially when compared with the remarkable progress made in fine-tuning Large Language Models (LLMs). While cutting-edge diffusion models such as Stable Diffusion (SD) and SDXL rely on supervised fine-tuning, their performance inevitably plateaus after seeing a certain volume of data. Re...

---

## 202. Interactive Fashion Content Generation Using LLMs and Latent Diffusion Models

**Authors:** Krishna Sri Ipsit Mantri, Nevasini Sasikumar

**Year:** 2023 | **Venue:** arXiv.org | **Citations:** 2 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2306.05182) | [DOI](https://doi.org/10.48550/arXiv.2306.05182)

> Fashionable image generation aims to synthesize images of diverse fashion prevalent around the globe, helping fashion designers in real-time visualization by giving them a basic customized structure of how a specific design preference would look in real life and what further improvements can be made for enhanced customer satisfaction. Moreover, users can alone interact and generate fashionable ima...

---

## 203. Exploring the Role of Large Language Models in Prompt Encoding for Diffusion Models

**Authors:** Bingqi Ma, Zhuofan Zong, Guanglu Song, Hongsheng Li, Yu Liu

**Year:** 2024 | **Venue:** Neural Information Processing Systems | **Citations:** 37 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2406.11831)

> Large language models (LLMs) based on decoder-only transformers have demonstrated superior text understanding capabilities compared to CLIP and T5-series models. However, the paradigm for utilizing current advanced LLMs in text-to-image diffusion models remains to be explored. We observed an unusual phenomenon: directly using a large language model as the prompt encoder significantly degrades the ...

---

## 204. Chat2SVG: Vector Graphics Generation with Large Language Models and Image Diffusion Models

**Authors:** Rong Wu, Wanchao Su, Jing Liao

**Year:** 2024 | **Venue:** Computer Vision and Pattern Recognition | **Citations:** 15 | **Score:** 0.000

[DOI](https://doi.org/10.1109/CVPR52734.2025.02206)

> Scalable Vector Graphics (SVG) has become the de facto standard for vector graphics in digital design, offering resolution independence and precise control over individual elements. Despite their advantages, creating high-quality SVG content remains challenging, as it demands technical expertise with professional editing software and a considerable time investment to craft complex shapes. Recent t...

---

## 205. Controlling Language and Diffusion Models by Transporting Activations

**Authors:** Pau Rodríguez López, Arno Blaas, Michal Klein, Luca Zappella, N. Apostoloff

**Year:** 2024 | **Venue:** International Conference on Learning Representations | **Citations:** 15 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2410.23054)

> The increasing capabilities of large generative models and their ever more widespread deployment have raised concerns about their reliability, safety, and potential misuse. To address these issues, recent works have proposed to control model generation by steering model activations in order to effectively induce or prevent the emergence of concepts or behaviors in the generated output. In this pap...

---

## 206. Rare-to-Frequent: Unlocking Compositional Generation Power of Diffusion Models on Rare Concepts with LLM Guidance

**Authors:** Dongmin Park, Sebin Kim, Taehong Moon, Minkyu Kim, Kangwook Lee

**Year:** 2024 | **Venue:** International Conference on Learning Representations | **Citations:** 15 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2410.22376)

> State-of-the-art text-to-image (T2I) diffusion models often struggle to generate rare compositions of concepts, e.g., objects with unusual attributes. In this paper, we show that the compositional generation power of diffusion models on such rare concepts can be significantly enhanced by the Large Language Model (LLM) guidance. We start with empirical and theoretical analysis, demonstrating that e...

---

## 207. GlyphDraw2: Automatic Generation of Complex Glyph Posters with Diffusion Models and Large Language Models

**Authors:** Jiancang Ma, Yonglin Deng, Chen Chen, H. Lu, Zhenyu Yang

**Year:** 2024 | **Venue:** AAAI Conference on Artificial Intelligence | **Citations:** 22 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2407.02252)

> Posters serve an essential function in marketing and advertising by improving visual communication and brand visibility, thus significantly contributing to industrial design. With the latest developments in controllable T2I diffusion models, research interest has surged in text rendering within synthesized images. Although text rendering accuracy has seen advancements, automatic poster generation ...

---

## 208. Applied Generative AI for Beginners: Practical Knowledge on Diffusion Models, ChatGPT, and Other LLMs

**Authors:** Akshay Kulkarni, Adarsha Shivananda, Anoosh Kulkarni, Dilip Gudivada

**Year:** 2023 | **Venue:**  | **Citations:** 10 | **Score:** 0.000

[DOI](https://doi.org/10.1007/978-1-4842-9994-4)

> ...

---

## 209. DEEM: Diffusion Models Serve as the Eyes of Large Language Models for Image Perception

**Authors:** Run Luo, Yunshui Li, Longze Chen, Wanwei He, Ting-En Lin

**Year:** 2024 | **Venue:** International Conference on Learning Representations | **Citations:** 33 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.15232)

> The development of large language models (LLMs) has significantly advanced the emergence of large multimodal models (LMMs). While LMMs have achieved tremendous success by promoting the synergy between multimodal comprehension and creation, they often face challenges when confronted with out-of-distribution data, such as which can hardly distinguish orientation, quantity, color, structure, etc. Thi...

---

## 210. ViD-GPT: Introducing GPT-style Autoregressive Generation in Video Diffusion Models

**Authors:** Kaifeng Gao, Jiaxin Shi, Hanwang Zhang, Chunping Wang, Jun Xiao

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 30 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2406.10981)

> With the advance of diffusion models, today's video generation has achieved impressive quality. But generating temporal consistent long videos is still challenging. A majority of video diffusion models (VDMs) generate long videos in an autoregressive manner, i.e., generating subsequent clips conditioned on last frames of previous clip. However, existing approaches all involve bidirectional computa...

---

## 211. SIGGesture: Generalized Co-Speech Gesture Synthesis via Semantic Injection with Large-Scale Pre-Training Diffusion Models

**Authors:** Qingrong Cheng, Xu Li, Xinghui Fu

**Year:** 2024 | **Venue:** ACM SIGGRAPH Conference and Exhibition on Computer Graphics and Interactive Techniques in Asia | **Citations:** 13 | **Score:** 0.000

[PDF](https://dl.acm.org/doi/pdf/10.1145/3680528.3687677) | [DOI](https://doi.org/10.1145/3680528.3687677)

> The automated synthesis of high-quality 3D gestures from speech holds significant value for virtual humans and gaming. Previous methods primarily focus on synchronizing gestures with speech rhythm, often neglecting semantic gestures. These semantic gestures are sparse and follow a long-tailed distribution across the gesture sequence, making them challenging to learn in an end-to-end manner. Additi...

---

## 212. Mimir: Improving Video Diffusion Models for Precise Text Understanding

**Authors:** Shuai Tan, Biao Gong, Yutong Feng, Kecheng Zheng, Dandan Zheng

**Year:** 2024 | **Venue:** Computer Vision and Pattern Recognition | **Citations:** 12 | **Score:** 0.000

[DOI](https://doi.org/10.1109/CVPR52734.2025.02233)

> Text serves as the key control signal in video generation due to its narrative nature. To render text descriptions into video clips, current video diffusion models borrow features from text encoders yet struggle with limited text comprehension. The recent success of large language models (LLMs) showcases the power of decoder-only transformers, which offers three clear benefits for text-to-video (T...

---

## 213. One-Step is Enough: Sparse Autoencoders for Text-to-Image Diffusion Models

**Authors:** Viacheslav Surkov, Chris Wendler, Antonio Mari, Mikhail Terekhov, Justin Deschenaux

**Year:** 2024 | **Venue:**  | **Citations:** 12 | **Score:** 0.000

> For large language models (LLMs), sparse autoencoders (SAEs) have been shown to decompose intermediate representations that often are not interpretable directly into sparse sums of interpretable features, facilitating better control and subsequent analysis. However, similar analyses and approaches have been lacking for text-to-image models. We investigate the possibility of using SAEs to learn int...

---

## 214. I Spy a Metaphor: Large Language Models and Diffusion Models Co-Create Visual Metaphors

**Authors:** Tuhin Chakrabarty, Arkadiy Saakyan, Olivia Winn, Artemis Panagopoulou, Yue Yang

**Year:** 2023 | **Venue:** Annual Meeting of the Association for Computational Linguistics | **Citations:** 62 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2305.14724) | [DOI](https://doi.org/10.48550/arXiv.2305.14724)

> Visual metaphors are powerful rhetorical devices used to persuade or communicate creative ideas through images. Similar to linguistic metaphors, they convey meaning implicitly through symbolism and juxtaposition of the symbols. We propose a new task of generating visual metaphors from linguistic metaphors. This is a challenging task for diffusion-based text-to-image models, such as DALL$\cdot$E 2,...

---

## 215. SUR-adapter: Enhancing Text-to-Image Pre-trained Diffusion Models with Large Language Models

**Authors:** Shan Zhong, Zhongzhan Huang, Wushao Wen, Jinghui Qin, Liang Lin

**Year:** 2023 | **Venue:** ACM Multimedia | **Citations:** 50 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2305.05189) | [DOI](https://doi.org/10.1145/3581783.3611863)

> Diffusion models, which have emerged to become popular text-to-image generation models, can produce high-quality and content-rich images guided by textual prompts. However, there are limitations to semantic understanding and commonsense reasoning in existing models when the input prompts are concise narrative, resulting in low-quality image generation. To improve the capacities for narrative promp...

---

## 216. Generating Synthetic Data with Large Language Models for Low-Resource Sentence Retrieval

**Authors:** Caffagni Davide, Cocchi Federico, Mambelli Anna, Tutrone Fabio, Zanella Marco

**Year:** 2026 | **Venue:** Nova Science Publishers (Nova Science Publishers, Inc.) | **Citations:** N/A | **Score:** 0.000

> Sentence similarity search is a fundamental task in information retrieval, enabling applications such as search engines, question answering, and textual analysis. However, retrieval systems often struggle when training data are scarce, as is the case for low-resource languages or specialized domains such as ancient texts. To address this challenge, we propose a novel paradigm for domain-specific s...

---

## 217. Transformer Models

**Authors:** Libovický, Jindřich, Dušek, Ondřej, Popel, Martin, Kasner, Zdeněk

**Year:** 2026 | **Venue:** Institute of Formal and Applied Linguistics (ÚFAL) | **Citations:** N/A | **Score:** 0.000

> Transformer is a machine learning architecture introduced in 2017 that quickly became very popular, surpassing the state of the art in many areas, including language modeling, machine translation, question answering, and chatbots. This chapter describes the main components of the Transformer architecture, such as tokenization, embeddings, and self-attention, followed by the basics of training Tran...

---

## 218. LLM Estimates of Word Characteristics

**Authors:** Conde Díaz, Javier, Martínez Ruiz, Gonzalo, Arriaga Prieto, Carlos, Trott, Sean, Reviriego Vasallo, Pedro

**Year:** 2026 | **Venue:** Archivo Digital UPM (Universidad Politécnica de Madrid) | **Citations:** N/A | **Score:** 0.000

> Psychological and linguistic characteristics of words (e.g., concreteness) are used to norm experimental stimuli and discover empirical relationships in the lexicon. One potential application of Large Language Models (LLMs) is to estimate these characteristics directly. Indeed, recently published work has shown that LLMs can be used to produce estimates of word features in different languages that...

---

## 219. Outsourcing judgement : a Kantian account of legal judgement and LLMs

**Authors:** Cambi, Alice, Haeck Gormez, Levi

**Year:** 2026 | **Venue:** Ghent University Academic Bibliography (Ghent University) | **Citations:** N/A | **Score:** 0.000

> This paper addresses the question of whether legal judgement can be outsourced to artificial intelligence (AI), and specifically to AI systems based on Large Language Models (LLMs). The issue has attracted international attention, both at the level of theoretical research and of practical application. Moreover, the development of LLM tools specifically designed for lawyers and judges (Legal LLMs) ...

---

## 220. Agricultural named entity recognition technology based on thought chain distillation and counterfactual reasoning

**Authors:** Zezhen Wu, Ye Zhang, Yongbin HUANG, Yubin Lan, Xiangbao MENG

**Year:** 2026 | **Venue:** DOAJ (DOAJ: Directory of Open Access Journals) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doaj.org/article/1a7fa69129aa4d6ab72f7337933f22fc) | [DOI](https://doi.org/10.7671/j.issn.1001-411x.202507003)

> ObjectiveTo address the issues of hallucinations, contextual logical inconsistencies, and inability to run on low-resource devices when large language models perform named entity recognition (NER) in agriculture.MethodUsing DeepSeek with 671 billion parameters (DeepSeek-671B) as the teacher model, domain knowledge was transferred to student models with fewer parameters. The student models selected...

---

## 221. Post Engineering for AI: Benevolent Contextual Guidance for Debiasing Large Language Models

**Authors:** Tsui, Hajime

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** 4 | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17896136) | [DOI](https://doi.org/10.5281/zenodo.17896136)

> This paper proposes Post Engineering, a novel, domain-agnostic benevolent prompt-injection and contextual-influence technique, designed to shape AI inference toward neutrality and accuracy by providing guidance that LLMs interpret as helpful context. The term "Post Engineering" originates from the fact that the technique was initially developed through embedding neutrality-oriented guidance into p...

---

## 222. BiGCAT: A Graph-Based Representation Learning Model with LLM Embeddings for Named Entity Recognition

**Authors:** Hossain, Md Akram, Aziz, Abdul, Azim, Muhammad Anwarul, Chy, Abu Nowshed, Ullah, Md Zia

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

[PDF](https://napier-repository.worktribe.com/file/4685496/1/BiGCAT%3A%20A%20Graph-Based%20Representation%20Learning%20Model%20with%20LLM%20Embeddings%20for%20Named%20Entity%20Recognition%20%28accepted%20version%29) | [DOI](https://doi.org/10.26615/978-954-452-098-4-052)

> Named entity recognition from financial text is challenging because of word ambiguity, huge quantity of unknown corporation names, and word abbreviation compared to nonfinancial text. However, models often treat named entities in a linear sequence fashion, which might obscure the model's ability to capture complex hierarchical relationships among the entities. In this paper, we proposed a novel na...

---

## 223. Developing and Evaluating Generative AI Models for Detection and Mitigation of Security Threats in 5G Networks

**Authors:** Bansal, Mukesh Kumar, Gupta, Mukesh Kumar, Tiwari, Amit

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17875368) | [DOI](https://doi.org/10.5281/zenodo.17875368)

> The rapid advancement of technology has enhanced the connectivity and data exchange but has also introduced challenges of security threats and vulnerabilities. This study explores the development of Generative Artificial Intelligence (GAI) models to detect and mitigate 5G networks threats. The proposed framework integrates Generative Adversarial Networks (GANs), Variational Autoencoders (VAEs), an...

---

## 224. Human and AI Scoring of EFL Writing: The Influence of Rubrics and Genre on Reliability

**Authors:** Samet Taşçı

**Year:** 2025 | **Venue:** Eğitim ve Yeni Yaklaşımlar Dergisi | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.52974/jena.1785369)

> This study investigates the reliability of large language models (LLMs) in assessing English as a Foreign Language (EFL) writing compared to human raters. Specifically, the performances of ChatGPT 4.0 and DeepSeek R1 were examined across three genres; argumentative, opinion, and persuasive essays, under rubric-free and rubric-based scoring conditions. Participants were 65 undergraduate ELT student...

---

## 225. Detecting Suicidal Ideation in Adolescence Using Self-Reported Emotional and Behavioral Patterns: Comparing Machine Learning and Large Language Model Predictions

**Authors:** Davide Marengo, Claudio Longobardi

**Year:** 2025 | **Venue:** Assessment | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1177/10731911251406405)

> Suicidal ideation in adolescents is a critical public health issue requiring early detection. This study examined whether machine learning (ML) and large language models (LLMs) can detect ideation in 1,197 students (ages 10–15) using self-reported Strengths and Difficulties Questionnaire (SDQ) data. Clinically relevant ideation was defined using Suicidal Ideation Questionnaire—Junior (SIQ-JR) cut-...

---

## 226. Using large language models (LLMs) to support simulation-based optimization in supply chain management

**Authors:**  T. Wisniewski

**Year:** 2025 | **Venue:** Advances in Production Engineering & Management | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.14743/apem2025.4.554)

> The emergence of Artificial Intelligence (AI) in Supply Chain Management (SCM) heralds a transformative shift, breaking traditional barriers and unlocking new opportunities for optimization and efficiency. This study explores the impact of artificial intelligence, particularly large language models (LLMs), on simulation-based optimization applications in supply chain management. The novelty of LLM...

---

## 227. R-Debater: Retrieval-Augmented Debate Generation through Argumentative Memory

**Authors:** Maoyuan Li, Zhongsheng Wang, Haoyuan Li, Jiamou Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24684v1) | > We present R-Debater, an agentic framework for generating multi-turn debates built on argumentative memory. Grounded in rhetoric and memory studies, the system views debate as a process of recalling and adapting prior arguments to maintain stance consistency, respond to opponents, and support claims with evidence. Specifically, R-Debater integrates a debate knowledge base for retrieving case-like ...

---

## 228. MSched: GPU Multitasking via Proactive Memory Scheduling

**Authors:** Weihang Shen, Yinqiu Chen, Rong Chen, Haibo Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24637v1) | > The limited HBM capacity has become the primary bottleneck for hosting an increasing number of larger-scale GPU tasks. While demand paging extends capacity via host DRAM, it incurs up to 78x slowdown due to the massive working sets and poor locality of GPU workloads. We observe, however, that GPU memory access patterns are inherently predictable via kernel launch arguments and their asynchronous e...

---

## 229. Align While Search: Belief-Guided Exploratory Inference for World-Grounded Embodied Agents

**Authors:** Seohui Bae, Jeonghye Kim, Youngchul Sung, Woohyung Lim

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24461v1) | > In this paper, we propose a test-time adaptive agent that performs exploratory inference through posterior-guided belief refinement without relying on gradient-based updates or additional training for LLM agent operating under partial observability. Our agent maintains an external structured belief over the environment state, iteratively updates it via action-conditioned observations, and selects ...

---

## 230. Graph-Based Exploration for ARC-AGI-3 Interactive Reasoning Tasks

**Authors:** Evgenii Rudakov, Jonathan Shock, Benjamin Ultan Cowley

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24156v1) | > We present a training-free graph-based approach for solving interactive reasoning tasks in the ARC-AGI-3 benchmark. ARC-AGI-3 comprises game-like tasks where agents must infer task mechanics through limited interactions, and adapt to increasing complexity as levels progress. Success requires forming hypotheses, testing them, and tracking discovered mechanics. The benchmark has revealed that state-...

---

## 231. CEC-Zero: Zero-Supervision Character Error Correction with Self-Generated Rewards

**Authors:** Zhiming Lin, Kai Zhao, Sophie Zhang, Peilai Yu, Canran Xiao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23971v1) | > Large-scale Chinese spelling correction (CSC) remains critical for real-world text processing, yet existing LLMs and supervised methods lack robustness to novel errors and rely on costly annotations. We introduce CEC-Zero, a zero-supervision reinforcement learning framework that addresses this by enabling LLMs to correct their own mistakes. CEC-Zero synthesizes errorful inputs from clean text, com...

---

## 232. Yggdrasil: Bridging Dynamic Speculation and Static Runtime for Latency-Optimal Tree-Based LLM Decoding

**Authors:** Yue Guan, Changming Yu, Shihan Fang, Weiming Hu, Zaifeng Pan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23858v1) | > Speculative decoding improves LLM inference by generating and verifying multiple tokens in parallel, but existing systems suffer from suboptimal performance due to a mismatch between dynamic speculation and static runtime assumptions. We present Yggdrasil, a co-designed system that enables latency-optimal speculative decoding through context-aware tree drafting and compiler-friendly execution. Ygg...

---

## 233. AI Meets Brain: Memory Systems from Cognitive Neuroscience to Autonomous Agents

**Authors:** Jiafeng Liang, Hao Li, Chang Li, Jiaqi Zhou, Shixin Jiang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23343v1) | > Memory serves as the pivotal nexus bridging past and future, providing both humans and AI systems with invaluable concepts and experience to navigate complex tasks. Recent research on autonomous agents has increasingly focused on designing efficient memory workflows by drawing on cognitive neuroscience. However, constrained by interdisciplinary barriers, existing works struggle to assimilate the e...

---

## 234. LLteacher: A Tool for the Integration of Generative AI into Statistics Assignments

**Authors:** Emanuela Furfaro, Simone Mosciatti

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.23053v1) | > As generative AI becomes increasingly embedded in everyday life, the thoughtful and intentional integration of AI-based tools into statistics education has become essential. We address this need with a focus on homework assignments and we propose the use of LLMs as a companion to complete homework by developing an open-source tool named LLteacher. This LLM-based tool preserves learning processes a...

---

## 235. DICE: Discrete Interpretable Comparative Evaluation with Probabilistic Scoring for Retrieval-Augmented Generation

**Authors:** Shiyan Liu, Jian Ma, Rui Qu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22629v1) | > As Retrieval-Augmented Generation (RAG) systems evolve toward more sophisticated architectures, ensuring their trustworthiness through explainable and robust evaluation becomes critical. Existing scalar metrics suffer from limited interpretability, inadequate uncertainty quantification, and computational inefficiency in multi-system comparisons, hindering responsible deployment of RAG technologies...

---

## 236. Role-Based Fault Tolerance System for LLM RL Post-Training

**Authors:** Zhenqian Chen, Baoquan Zhong, Xiang Li, Qing Dai, Xinkui Zhao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22492v1) | > RL post-training for LLMs has been widely scaled to enhance reasoning and tool-using capabilities. However, RL post-training interleaves training and inference workloads, exposing the system to faults from both sides. Existing fault tolerance frameworks for LLMs target either training or inference, leaving the optimization potential in the asynchronous execution unexplored for RL. Our key insight ...

---

## 237. AnalogSAGE: Self-evolving Analog Design Multi-Agents with Stratified Memory and Grounded Experience

**Authors:** Zining Wang, Jian Gao, Weimin Fu, Xiaolong Guo, Xuan Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22435v1) | > Analog circuit design remains a knowledge- and experience-intensive process that relies heavily on human intuition for topology generation and device parameter tuning. Existing LLM-based approaches typically depend on prompt-driven netlist generation or predefined topology templates, limiting their ability to satisfy complex specification requirements. We propose AnalogSAGE, an open-source self-ev...

---

## 238. Mining the Gold: Student-AI Chat Logs as Rich Sources for Automated Knowledge Gap Detection

**Authors:** Quanzhi Fu, Qiyu Wu, Dan Williams

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22404v1) | > With the significant increase in enrollment in computing-related programs over the past 20 years, lecture sizes have grown correspondingly. In large lectures, instructors face challenges on identifying students' knowledge gaps timely, which is critical for effective teaching. Existing classroom response systems rely on instructor-initiated interactions, which limits their ability to capture the sp...

---

## 239. OxygenREC: An Instruction-Following Generative Framework for E-commerce Recommendation

**Authors:** Xuegang Hao, Ming Zhang, Alex Li, Xiangyu Qian, Zhi Ma

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22386v2) | > Traditional recommendation systems suffer from inconsistency in multi-stage optimization objectives. Generative Recommendation (GR) mitigates them through an end-to-end framework; however, existing methods still rely on matching mechanisms based on inductive patterns. Although responsive, they lack the ability to uncover complex user intents that require deductive reasoning based on world knowledg...

---

## 240. LLM-Guided Exemplar Selection for Few-Shot Wearable-Sensor Human Activity Recognition

**Authors:** Elsen Ronando, Sozo Inoue

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22385v1) | > In this paper, we propose an LLM-Guided Exemplar Selection framework to address a key limitation in state-of-the-art Human Activity Recognition (HAR) methods: their reliance on large labeled datasets and purely geometric exemplar selection, which often fail to distinguish similar weara-ble sensor activities such as walking, walking upstairs, and walking downstairs. Our method incorporates semantic...

---

## 241. Agentic Structured Graph Traversal for Root Cause Analysis of Code-related Incidents in Cloud Applications

**Authors:** Shengkun Cui, Rahul Krishna, Saurabh Jha, Ravishankar K. Iyer

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22113v1) | > Cloud incidents pose major operational challenges in production, with unresolved production cloud incidents cost on average over $2M per hour. Prior research identifies code- and configuration-related issues as the predominant category of root causes in cloud incidents. This paper introduces PRAXIS, an orchestrator that manages and deploys an agentic workflow for diagnosing code- and configuration...

---

## 242. MoFu: Scale-Aware Modulation and Fourier Fusion for Multi-Subject Video Generation

**Authors:** Run Ling, Ke Cao, Jian Lu, Ao Ma, Haowei Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.22310v1) | > Multi-subject video generation aims to synthesize videos from textual prompts and multiple reference images, ensuring that each subject preserves natural scale and visual fidelity. However, current methods face two challenges: scale inconsistency, where variations in subject size lead to unnatural generation, and permutation sensitivity, where the order of reference inputs causes subject distortio...

---

## 243. AlignAR: Generative Sentence Alignment for Arabic-English Parallel Corpora of Legal and Literary Texts

**Authors:** Baorong Huang, Ali Asiri

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21842v1) | > High-quality parallel corpora are essential for Machine Translation (MT) research and translation teaching. However, Arabic-English resources remain scarce and existing datasets mainly consist of simple one-to-one mappings. In this paper, we present AlignAR, a generative sentence alignment method, and a new Arabic-English dataset comprising complex legal and literary texts. Our evaluation demonstr...

---

## 244. Generative Lecture: Making Lecture Videos Interactive with LLMs and AI Clone Instructors

**Authors:** Hye-Young Jo, Ada Yi Zhao, Xiaoan Liu, Ryo Suzuki

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21796v2) | > We introduce Generative Lecture, a concept that makes existing lecture videos interactive through generative AI and AI clone instructors. By leveraging interactive avatars powered by HeyGen, ElevenLabs, and GPT-5, we embed an AI instructor into the video and augment the video content in response to students' questions. This allows students to personalize the lecture material, directly ask question...

---

## 245. Accelerating Scientific Discovery with Autonomous Goal-evolving Agents

**Authors:** Yuanqi Du, Botao Yu, Tianyu Liu, Tony Shen, Junwu Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21782v1) | > There has been unprecedented interest in developing agents that expand the boundary of scientific discovery, primarily by optimizing quantitative objective functions specified by scientists. However, for grand challenges in science , these objectives are only imperfect proxies. We argue that automating objective function design is a central, yet unmet requirement for scientific discovery agents. I...

---

## 246. AMS-IO-Bench and AMS-IO-Agent: Benchmarking and Structured Reasoning for Analog and Mixed-Signal Integrated Circuit Input/Output Design

**Authors:** Zhishuai Zhang, Xintian Li, Shilong Liu, Aodong Zhang, Lu Jie

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21613v1) | > In this paper, we propose AMS-IO-Agent, a domain-specialized LLM-based agent for structure-aware input/output (I/O) subsystem generation in analog and mixed-signal (AMS) integrated circuits (ICs). The central contribution of this work is a framework that connects natural language design intent with industrial-level AMS IC design deliverables. AMS-IO-Agent integrates two key capabilities: (1) a str...

---

## 247. Cerberus: Multi-Agent Reasoning and Coverage-Guided Exploration for Static Detection of Runtime Errors

**Authors:** Hridya Dhulipala, Xiaokai Rong, Tien N. Nguyen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21431v1) | > In several software development scenarios, it is desirable to detect runtime errors and exceptions in code snippets without actual execution. A typical example is to detect runtime exceptions in online code snippets before integrating them into a codebase. In this paper, we propose Cerberus, a novel predictive, execution-free coverage-guided testing framework. Cerberus uses LLMs to generate the in...

---

## 248. CoTDeceptor:Adversarial Code Obfuscation Against CoT-Enhanced LLM Code Agents

**Authors:** Haoyang Li, Mingjin Li, Jinxin Zuo, Siqi Li, Xiao Li

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21250v1) | > LLM-based code agents(e.g., ChatGPT Codex) are increasingly deployed as detector for code review and security auditing tasks. Although CoT-enhanced LLM vulnerability detectors are believed to provide improved robustness against obfuscated malicious code, we find that their reasoning chains and semantic abstraction processes exhibit exploitable systematic weaknesses.This allows attackers to covertl...

---

## 249. AutoBaxBuilder: Bootstrapping Code Security Benchmarking

**Authors:** Tobias von Arx, Niels Mündler, Mark Vero, Maximilian Baader, Martin Vechev

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.21132v1) | > As LLMs see wide adoption in software engineering, the reliable assessment of the correctness and security of LLM-generated code is crucial. Notably, prior work has demonstrated that security is often overlooked, exposing that LLMs are prone to generating code with security vulnerabilities. These insights were enabled by specialized benchmarks, crafted through significant manual effort by security...

---

