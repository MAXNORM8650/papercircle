# Research Papers: manifold learning and optimization

Updated: 2026-01-04 02:37
Total: 619 papers

---

## 1. Improving CNN training by Riemannian optimization on the generalized Stiefel manifold combined with a gradient-based manifold search

**Authors:** Alexander Studt, Till Riedel, Michael Beigl

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Enforcing orthonormality constraints in deep learning has been shown to provide significant benefits. Although hard restrictions can be applied by constraining parameter matrices to the Stiefel manifold, this approach limits the solution space to that specific manifold. We show that a generalized Stiefel constraint $X^TSX=\mathbb{I}$ for Riemannian optimization can lead to even faster convergence ...

---

## 2. Fast, Accurate Manifold Denoising by Tunneling Riemannian Optimization

**Authors:** Shiyu Wang, Mariam Avagyan, Yihan Shen, Arnaud Lamy, Tingran Wang

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=jbafwTkVUn) | > Learned denoisers play a fundamental role in various signal generation (e.g., diffusion models) and reconstruction (e.g., compressed sensing) architectures, whose success derives from their ability to leverage low-dimensional structure in data. Existing denoising methods, however, either rely on local approximations that require a linear scan of the entire dataset or treat denoising as generic fun...

---

## 3. Distributed Retraction-Free and Communication-Efficient Optimization on the Stiefel Manifold

**Authors:** Yilong Song, Peijin Li, Bin Gao, Kun Yuan

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=UchFXOIwvA) | > Optimization problems on the Stiefel manifold, ranging from principal component analysis to enhancing neural network robustness, are ubiquitous in machine learning. The Landing algorithm avoids computationally expensive retraction operations on manifolds, making it highly competitive for large-scale problems. This paper extends this method to distributed settings, introducing *EF-Landing*, the fir...

---

## 4. Outlier-Robust Orthogonal Regression on Manifolds

**Authors:** Tianjiao Ding, Liangzu Peng, Rene Vidal

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Motivated by machine learning and computer vision applications, we formulate the problem of Outlier-Robust Orthogonal Regression to find a point in a manifold that satisfies as many linear equations as possible. Existing approaches addressing special cases of our formulation either lack theoretical support, are computationally costly, or somewhat ignore the manifold constraint; the latter two limi...

---

## 5. StelLA: Subspace Learning in Low-rank Adaptation using Stiefel Manifold

**Authors:** Zhizhong Li, Sina Sajadmanesh, Jingtao Li, Lingjuan Lyu

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Low-rank adaptation (LoRA) has been widely adopted as a parameter-efficient technique for fine-tuning large-scale pre-trained models. However, it still lags behind full fine-tuning in performance, partly due to its insufficient exploitation of the geometric structure underlying low-rank manifolds. In this paper, we propose a geometry-aware extension of LoRA that uses a three-factor decomposition $...

---

## 6. Efficient optimization with orthogonality constraint: a randomized Riemannian submanifold method

**Authors:** Andi Han, Pierre-Louis Poirion, Akiko Takeda

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Optimization with orthogonality constraints frequently arise in various fields such as machine learning, signal processing and computer vision. Riemannian optimization offers a powerful framework for solving these problems by equipping the constraint set with a Riemannian manifold structure and performing optimization intrinsically on the manifold. This approach typically involves computing a sear...

---

## 7. S$^2$MAM: Semi-supervised Meta Additive Model for Robust Estimation and Variable Selection

**Authors:** Xuelin Zhang, Hong Chen, Yingjie Wang, Zeyu Zhang, Tieliang Gong

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Semi-supervised learning with manifold regularization is a classical family for learning from the labeled and unlabeled data jointly, where the key requirement is the support of unknown marginal distribution enjoys the geometric structure of a Riemannian manifold. Usually, the Laplace-Beltrami operator-based manifold regularization can be approximated empirically by the Laplacian regularization as...

---

## 8. Error Slice Discovery via Manifold Compactness

**Authors:** Han Yu, Jiashuo Liu, Hao Zou, Renzhe Xu, Yue He

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Despite the great performance of deep learning models in many areas, they still make mistakes and underperform on certain subsets of data, i.e. error slices. Given a trained model, it is important to identify its semantically coherent error slices that are easy to interpret, which is referred to as the error slice discovery problem. However, there is no proper metric of slice coherence without rel...

---

## 9. Optimization without retraction on the random generalized Stiefel manifold for canonical correlation analysis

**Authors:** Simon Vary, Pierre Ablin, Bin Gao, Pierre-Antoine Absil

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Optimization over the set of matrices that satisfy $X^\top B X = I_p$, referred to as the generalized Stiefel manifold, appears in many applications such as canonical correlation analysis (CCA) and the generalized eigenvalue problem. Solving these problems for large-scale datasets is computationally expensive and is typically done by either computing the closed-form solution with subsampled data o...

---

## 10. NeuManifold: Neural Watertight Manifold Reconstruction with Efficient and High-Quality Rendering Support

**Authors:** Xinyue Wei, Fanbo Xiang, Sai Bi, Anpei Chen, Kalyan Sunkavalli

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> We present a method for generating high-quality watertight manifold meshes from multi-view input images. Existing volumetric rendering methods are robust in optimization but tend to generate noisy meshes with poor topology. Differentiable rasterization-based methods can generate high-quality meshes but are sensitive to initialization. Our method combines the benefits of both worlds; we take the ge...

---

## 11. ML$^2$-GCL: Manifold Learning Inspired Lightweight Graph Contrastive Learning

**Authors:** Jianqing Liang, Zhiqiang Li, Xinkai Wei, Yuan Liu, Zhiqiang Wang

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=irY40jSwCH) | > Graph contrastive learning has attracted great interest as a dominant and promising self-supervised representation learning approach in recent years. While existing works follow the basic principle of pulling positive pairs closer and pushing negative pairs far away, they still suffer from several critical problems, such as the underlying semantic disturbance brought by augmentation strategies, th...

---

## 12. Decentralized Riemannian Conjugate Gradient Method on the Stiefel Manifold

**Authors:** Jun Chen, Haishan Ye, Mengmeng Wang, Tianxin Huang, Guang Dai

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=PQbFUMKLFp) | > The conjugate gradient method is a crucial first-order optimization method that generally converges faster than the steepest descent method, and its computational cost is much lower than that of second-order methods. However, while various types of conjugate gradient methods have been studied in Euclidean spaces and on Riemannian manifolds, there is little study for those in distributed scenarios....

---

## 13. Hardness of Learning Neural Networks under the Manifold Hypothesis

**Authors:** Bobak Kiani, Jason Wang, Melanie Weber

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=dkkgKzMni7) | > The manifold hypothesis presumes that high-dimensional data lies on or near a low-dimensional manifold. 
While the utility of encoding geometric structure has been demonstrated empirically, rigorous analysis of its impact on the learnability of neural networks is largely missing. Several recent results have established hardness results for learning feedforward and equivariant neural networks under...

---

## 14. Training a Tucker Model With Shared Factors: a Riemannian Optimization Approach

**Authors:** Ivan Peshekhonov, Aleksey Arzhantsev, Maxim Rakhuba

**Year:** 2024 | **Venue:** AISTATS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://proceedings.mlr.press/v238/peshekhonov24a/peshekhonov24a.pdf) | > Factorization of a matrix into a product of two rectangular factors, is a classic tool in various machine learning applications. Tensor factorizations generalize this concept to more than two dimensions. In applications, where some of the tensor dimensions have the same size or encode the same objects (e.g., knowledge graphs with entity-relation-entity 3D tensors), it can also be beneficial for th...

---

## 15. VGGT-SLAM: Dense RGB SLAM Optimized on the SL(4) Manifold

**Authors:** Dominic Rosario Maggio, Hyungtae Lim, Luca Carlone

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> We present VGGT-SLAM, a dense RGB SLAM system constructed by incrementally and globally aligning submaps created from the feed-forward scene reconstruction approach VGGT using only uncalibrated monocular cameras. While related works align submaps using similarity transforms (i.e., translation, rotation, and scale), we show that such approaches are inadequate in the case of uncalibrated cameras. In...

---

## 16. Unified K-Means Clustering with Label-Guided Manifold Learning

**Authors:** Qianqian Wang, Mengping Jiang, Zhengming Ding, Quanxue Gao

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=YD9ZoqUDAY) | > K-Means clustering is a classical and effective unsupervised learning method attributed to its simplicity and efficiency. However, it faces notable challenges, including sensitivity to random initial centroid selection, a limited ability to discover the intrinsic manifold structures within nonlinear datasets, and difficulty in achieving balanced clustering in practical scenarios. To overcome these...

---

## 17. Score Distillation Sampling with Learned Manifold Corrective

**Authors:** Thiemo Alldieck*, Nikos Kolotouros, Cristian Sminchisescu

**Year:** 2024 | **Venue:** ECCV 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/11754.pdf) | > "Score Distillation Sampling (SDS) is a recent but already widely popular method that relies on an image diffusion model to control optimization problems using text prompts. aIn this paper, we conduct an in-depth analysis of the SDS loss function, identify an inherent problem with its formulation, and propose a surprisingly easy but effective fix. Specifically, we decompose the loss into different...

---

## 18. Consistency of Dictionary-Based Manifold Learning

**Authors:** Samson J. Koelle, Hanyu Zhang, Octavian-Vlad Murad, Marina Meila

**Year:** 2024 | **Venue:** AISTATS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://proceedings.mlr.press/v238/koelle24a/koelle24a.pdf) | > We analyze a paradigm for interpretable Manifold Learning for scientific data analysis, whereby one parametrizes a manifold with d smooth functions from a scientist-provided dictionary of meaningful, domain-related functions. When such a parametrization exists, we provide an algorithm for finding it based on sparse regression in the manifold tangent bundle, bypassing more standard, agnostic manifo...

---

## 19. Gaussian Regression-Driven Tensorized Incomplete Multi-View Clustering with Dual Manifold Regularization

**Authors:** Zhenhao Zhong, Zhibin Gu, Pengpeng Yang, Yaqian zhou, Ruiqiang Guo

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Tensorized Incomplete Multi-View Clustering (TIMVC) algorithms have attracted growing attention for their ability to capture high-order correlations across multiple views. However, most existing TIMVC methods rely on simplistic noise assumptions using specific norms (e.g., $\ell_1$ or $\ell_{2,1}$), which fail to reflect the complex noise patterns encountered in real-world scenarios. Moreover, the...

---

## 20. Distributed Manifold Hashing for Image Set Classification and Retrieval

**Authors:** Xiaobo Shen, Peizhuo Song, Yun-Hao Yuan, Yuhui Zheng

**Year:** 2024 | **Venue:** AAAI 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://ojs.aaai.org/index.php/AAAI/article/view/28282/28555) | > Conventional image set methods typically learn from image sets stored in one location. However, in real-world applications, image sets are often distributed or collected across different positions. Learning from such distributed image sets presents a challenge that has not been studied thus far. Moreover, efficiency is seldom addressed in large-scale image set applications. To fulfill these gaps, ...

---

## 21. Spectral Graph Coarsening Using Inner Product Preservation and the Grassmann Manifold

**Authors:** Ido Cohen, Ronen Talmon

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> We propose a novel functorial graph coarsening method that preserves inner products between node features, a property often overlooked by existing approaches focusing primarily on structural fidelity.
By treating node features as functions on the graph and preserving their inner products, our method retains both structural and feature relationships, facilitating substantial benefits for downstream...

---

## 22. Stochastic variance-reduced Gaussian variational inference on the Bures-Wasserstein manifold

**Authors:** Hoang Phuc Hau Luu, Hanlin Yu, Bernardo Williams, Marcelo Hartmann, Arto Klami

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=iMJpmcYucq) | > Optimization in the Bures-Wasserstein space has been gaining popularity in the machine learning community since it draws connections between variational inference and Wasserstein gradient flows. The variational inference objective function of Kullback–Leibler divergence can be written as the sum of the negative entropy and the potential energy, making forward-backward Euler the method of choice. N...

---

## 23. Adaptive Manifold for Imbalanced Transductive Few-Shot Learning

**Authors:** Michalis Lazarou, Yannis Avrithis, Tania Stathaki

**Year:** 2024 | **Venue:** WACV 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/WACV2024/papers/Lazarou_Adaptive_Manifold_for_Imbalanced_Transductive_Few-Shot_Learning_WACV_2024_paper.pdf) | > Transductive few-shot learning algorithms have showed substantially superior performance over their inductive counterparts by leveraging the unlabeled queries at inference. However, the vast majority of transductive methods are evaluated on perfectly class-balanced benchmarks. It has been shown that they undergo remarkable drop in performance under a more realistic, imbalanced setting. To this end...

---

## 24. Language Guided Interpretable Image Recognition via Manifold Alignment

**Authors:** Jiaqi Wang, Pichao WANG, Fan Wang, Liping Jing

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Most works of interpretable neural networks strive for learning the semantics concepts merely from single modal information such as images. However, humans usually learn semantic concepts from multiple modalities and the semantics is encoded by the brain from fused multi-modal information. Inspired by cognitive science and vision-language learning, we propose a two-stream model for learning visual...

---

## 25. SPDIM: Source-Free Unsupervised Conditional and Label Shift Adaptation in EEG

**Authors:** Shanglin Li, Motoaki Kawanabe, Reinmar J Kobler

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=CoQw1dXtGb) | > The non-stationary nature of electroencephalography (EEG) introduces distribution shifts across domains (e.g., days and subjects), posing a significant challenge to EEG-based neurotechnology generalization.
Without labeled calibration data for target domains, the problem is a source-free unsupervised domain adaptation (SFUDA) problem.
For scenarios with constant label distribution, Riemannian geom...

---

## 26. Dual Manifold Regularization Steered Robust Representation Learning for Point Cloud Analysis

**Authors:** Jian Bi, Qianliang Wu, Jianjun Qian, Lei Luo, Jian Yang

**Year:** 2025 | **Venue:** AAAI 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://ojs.aaai.org/index.php/AAAI/article/view/32179/34334) | > With the rapid advancement of 3D scanning technology, point clouds have become a crucial data type in computer vision and machine learning. However, learning robust representations for point clouds remains a significant challenge due to their irregularity and sparsity. In this paper, we propose a novel Dual Manifold Regularization (DMR) framework that makes full use of the properties of positive a...

---

## 27. Matrix Manifold Neural Networks++

**Authors:** Xuan Son Nguyen, Shuo Yang, Aymeric Histace

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=30aSE3FB3L) | > Deep neural networks (DNNs) on Riemannian manifolds have garnered increasing interest in various applied areas. For instance, DNNs on spherical and hyperbolic manifolds have been designed to solve a wide range of computer vision and nature language processing tasks. One of the key factors that contribute to the success of these networks is that spherical and hyperbolic manifolds have the rich alge...

---

## 28. Neural Manifold Regularization: Aligning 2D Latent Dynamics with Stereotyped, Natural, and Attempted Movements

**Authors:** Chenggang Chen, Zhiyu Yang

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Mapping neural activity to behavior is a fundamental goal in both neuroscience and brain-machine interfaces. Traditionally, at least three-dimensional (3D) latent dynamics have been required to represent two-dimensional (2D) movement trajectories. In this work, we introduce Neural Manifold Regularization (NMR), a method that embeds neural dynamics into a 2D latent space and regularizes the manifol...

---

## 29. Interpreting and Improving Diffusion Models from an Optimization Perspective

**Authors:** Frank Permenter, Chenyang Yuan

**Year:** 2024 | **Venue:** ICML 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=o2ND9v0CeK) | > Denoising is intuitively related to projection. Indeed, under the manifold hypothesis, adding random noise is approximately equivalent to orthogonal perturbation. Hence, learning to denoise is approximately learning to project. In this paper, we use this observation to interpret denoising diffusion models as approximate gradient descent applied to the Euclidean distance function. We then provide s...

---

## 30. EEG-MACS: Manifold Attention and Confidence Stratification for EEG-based Cross-Center Brain Disease Diagnosis under Unreliable Annotations

**Authors:** Zhenxi Song, Ruihan Qin, Huixia Ren, Zhen Liang, Yi Guo

**Year:** 2024 | **Venue:** ACMMM 2024 | **Citations:** N/A | **Score:** 0.000

> ...

---

## 31. Curvature Enhanced Manifold Sampling

**Authors:** Ilya Kaufman, Omri Azencot

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Over-parameterized deep learning models, characterized by their large number of parameters, have demonstrated remarkable performance in various tasks. Despite the potential risk of overfitting, these models often generalize well to unseen data due to effective regularization techniques, with data augmentation being one of the most prominent methods. This strategy has proven effective in classifica...

---

## 32. Interpretable Dimensionality Reduction by Feature-preserving Manifold Approximation and Projection

**Authors:** Yang Yang, Hongjian Sun, Jialei Gong, Di Yu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Nonlinear dimensionality reduction often lacks interpretability due to the absence of source features in low-dimensional embedding space. We propose FeatureMAP, an interpretable method that preserves source features by tangent space embedding. The core of FeatureMAP is to use local principal component analysis (PCA) to approximate tangent spaces. By leveraging these tangent spaces, FeatureMAP comp...

---

## 33. Manifold Diffusion Fields

**Authors:** Ahmed A. A. Elhag, Yuyang Wang, Joshua M. Susskind, Miguel Ángel Bautista

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=BZtEthuXRF) | > We present Manifold Diffusion Fields (MDF), an approach that unlocks learning of diffusion models of data in general non-euclidean geometries. Leveraging insights from spectral geometry analysis, we define an intrinsic coordinate system on the manifold via the eigen-functions of the Laplace-Beltrami Operator.  MDF represents functions using an explicit parametrization formed by a set of multiple i...

---

## 34. SimpliMix: A Simplified Manifold Mixup for Few-Shot Point Cloud Classification

**Authors:** Minmin Yang, Weiheng Chai, Jiyang Wang, Senem Velipasalar

**Year:** 2024 | **Venue:** WACV 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/WACV2024/papers/Yang_SimpliMix_A_Simplified_Manifold_Mixup_for_Few-Shot_Point_Cloud_Classification_WACV_2024_paper.pdf) | > Few-shot learning often assumes that base classes are abundant and diverse with plentiful well-labeled samples for each class. This ensures that models can generalize effectively from a small amount of data by leveraging prior knowledge learned from base classes. This assumption holds for 2D few-shot learning since the benchmark datasets are large and diverse. However, 3D point cloud few-shot benc...

---

## 35. IsUMap: Manifold Learning and Data Visualization Leveraging Vietoris-Rips Filtrations

**Authors:** Parvaneh Joharinad, Hannaneh Fahimi, Lukas Silvester Barth, Janis Keck, Jürgen Jost

**Year:** 2025 | **Venue:** AAAI 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://ojs.aaai.org/index.php/AAAI/article/view/33946/36101) | > This work introduces IsUMap, a novel manifold learning technique that enhances data representation by integrating aspects of UMAP and Isomap with Vietoris-Rips filtrations and metric realization of one-parameter filtrations of simplicial complexes. 
Inferring topological information from combinatorial models which have been built according to metric relations (Vietoris-Rips complexes) has proven u...

---

## 36. Manifold Inspired Graph Contrastive Learning

**Authors:** Yunhui Liu, Tieke He, Jianhua Zhao

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Recently, graph contrastive learning (GCL) has emerged as a promising and trending paradigm for graph representation learning, providing generalizable node embeddings for various downstream tasks. However, current GCL methods often fail to fully exploit and encode the fine-grained graph structure information, leading to less informative node representations. In this study, we argue for a holistic ...

---

## 37. Structure-Guided Adversarial Training of Diffusion Models

**Authors:** Ling Yang, Haotian Qian, Zhilong Zhang, Jingwei Liu, Bin Cui

**Year:** 2024 | **Venue:** CVPR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2024/papers/Yang_Structure-Guided_Adversarial_Training_of_Diffusion_Models_CVPR_2024_paper.pdf) | > Diffusion models have demonstrated exceptional efficacy in various generative applications. While existing models focus on minimizing a weighted sum of denoising score matching losses for data distribution modeling their training primarily emphasizes instance-level optimization overlooking valuable structural information within each mini-batch indicative of pair-wise relationships among samples. T...

---

## 38. Balancing Information Preservation and Computational Efficiency: L2 Normalization and Geodesic Distance in Manifold Learning

**Authors:** Ziqi Rong, Jinpu Cai, Jiahao Qiu, Pengcheng Xu, Lana Garmire

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Distinguishable metric of similarity plays a fundamental role in unsupervised learning, particularly in manifold learning and high-dimensional data visualization tasks, by which differentiate between observations without labels. However, conventional metrics like Euclidean distance after L1-normalization may fail by losing distinguishable information when handling high-dimensional data, where the ...

---

## 39. Curvature Enhanced Data Augmentation for Regression

**Authors:** Ilya Kaufman, Omri Azencot

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=l1sx5KiM7Z) | > Deep learning models with a large number of parameters, often referred to as over-parameterized models, have achieved exceptional performance across various tasks. Despite concerns about overfitting, these models frequently generalize well to unseen data, thanks to effective regularization techniques, with data augmentation being among the most widely used. While data augmentation has shown great ...

---

## 40. Geodesic Optimization for Predictive Shift Adaptation on EEG data

**Authors:** Apolline Mellot, Antoine Collas, Sylvain Chevallier, Alexandre Gramfort, Denis Alexander Engemann

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=qTypwXvNJa) | > Electroencephalography (EEG) data is often collected from diverse contexts involving different populations and EEG devices. This variability can induce distribution shifts in the data $X$ and in the biomedical variables of interest $y$, thus limiting the application of supervised machine learning (ML) algorithms. While domain adaptation (DA) methods have been developed to mitigate the impact of th...

---

## 41. Robust Hyperbolic Learning with Curvature-Aware Optimization

**Authors:** Ahmad Bdeir, Johannes Burchert, Lars Schmidt-Thieme, Niels Landwehr

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Hyperbolic deep learning has become a growing research direction in computer vision due to the unique properties afforded by the alternate embedding space. The negative curvature and exponentially growing distance metric provide a natural framework for capturing hierarchical relationships between datapoints and allowing for finer separability between their embeddings. However, current hyperbolic l...

---

## 42. Local Manifold Approximation and Projection for Manifold-Aware Diffusion Planning

**Authors:** Kyowoon Lee, Jaesik Choi

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=EHG5Iv1mmb) | > Recent advances in diffusion-based generative modeling have demonstrated significant promise in tackling long-horizon, sparse-reward tasks by leveraging offline datasets. While these approaches have achieved promising results, their reliability remains inconsistent due to the inherent stochastic risk of producing infeasible trajectories, limiting their applicability in safety-critical applications...

---

## 43. Manifold K-means with $\ell_{2,p}$-Norm Maximization

**Authors:** Fangfang Li, Quanxue Gao, Qianqian Wang, Cheng Deng, Xiaoke Ma

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Although a variety of different methods have emerged in the field of clustering, K-means still occupies an important position, and many advanced clustering methods even rely on the K-means  to achieve effective cluster detection. However, the sensitivity of K-means to the selection of the initial cluster center and its limited ability to handle nonlinear separable data somewhat restrict its cluste...

---

## 44. Manifold Preserving Guided Diffusion

**Authors:** Yutong He, Naoki Murata, Chieh-Hsin Lai, Yuhta Takida, Toshimitsu Uesaka

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=o3BxOLoxm1) | > Despite the recent advancements, conditional image generation still faces challenges of cost, generalizability, and the need for task-specific training. In this paper, we propose Manifold Preserving Guided Diffusion (MPGD), a training-free conditional generation framework that leverages pretrained diffusion models and off-the-shelf neural networks with minimal additional inference cost for a broad...

---

## 45. A Density-driven Iterative Prototype Optimization for Transductive Few-shot Learning

**Authors:** Jingcong Li, Chunjin Ye, Fei Wang, Jiahui Pan

**Year:** 2024 | **Venue:** IJCAI 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.ijcai.org/proceedings/2024/0488.pdf) | > Few-shot learning (FSL) poses a considerable challenge since it aims to improve the model generalization ability with limited labeled data. Previous works usually attempt to construct class-specific prototypes and then predict novel classes using these prototypes. However, the feature distribution represented by the limited labeled data is coarse-grained, leading to large information gap between t...

---

## 46. Location, Location, Location: Design Bias with Kernel Transformation

**Authors:** Xin Li

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> It has been hypothesized that the old brain was compressed into cortical columns of the neocortex during the evolution of mammalian brains. Computational modeling of hippocampal-cortical interaction inspires us to propose a navigation-based implicit representation for manifold learning. The key new insight is to transform any explicit function (or geometrically a manifold) to an implicit represent...

---

## 47. Diffusion Models and the Manifold Hypothesis: Log-Domain Smoothing is Geometry Adaptive

**Authors:** Tyler Farghly, Peter Potaptchik, Samuel Howard, George Deligiannidis, Jakiw Pidstrigach

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Diffusion models have achieved state-of-the-art performance, demonstrating remarkable generalisation capabilities across diverse domains. However, the mechanisms underpinning these strong capabilities remain only partially understood. A leading conjecture, based on the manifold hypothesis, attributes this success to their ability to adapt to low-dimensional geometric structure within the data. Thi...

---

## 48. iMESA: Incremental Distributed Optimization for Collaborative Simultaneous Localization and Mapping

**Authors:** Daniel McGann, Michael Kaess

**Year:** 2024 | **Venue:** RSS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.roboticsproceedings.org/rss20/p085.pdf) | > This paper introduces a novel incremental distributed back-end algorithm for Collaborative Simultaneous Localization and Mapping (C-SLAM). For real-world deployments, robotic teams require algorithms to compute a consistent state estimate accurately, within online runtime constraints, and with potentially limited communication. Existing centralized, decentralized, and distributed approaches to sol...

---

## 49. Analyzing Deep Transformer Models for Time Series Forecasting via Manifold Learning

**Authors:** Ilya Kaufman, Omri Azencot

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Deep transformer models consistently achieve groundbreaking results on natural language processing and computer vision problems, among other engineering and scientific domains. However, despite active research that aims to better understand transformer neural networks via e.g., computing saliency scores or analyzing their attention matrix, these models are not well-understood at large. This proble...

---

## 50. MTMC: Generalized Category Discovery via Maximum Token Manifold Capacity

**Authors:** Luyao Tang, Kunze Huang, Xinghao Ding, Xiaotong Tu, Chaoqi Chen

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Identifying previously unseen data is crucial for enhancing the robustness of deep learning models in the open world. Generalized category discovery (GCD) is a representative problem that requires clustering unlabeled data that includes known and novel categories. Current GCD methods mostly focus on minimizing intra-cluster variations, often at the cost of manifold capacity, thus limiting the rich...

---

## 51. Accelerated Methods for Riemannian Min-Max Optimization Ensuring Bounded Geometric Penalties

**Authors:** David Martínez-Rubio, Christophe Roux, Christopher Criscitiello, Sebastian Pokutta

**Year:** 2025 | **Venue:** AISTATS 2025 | **Citations:** N/A | **Score:** 0.000

> In this work, we study optimization problems of the form $\min_x \max_y f(x, y)$, where $f(x, y)$ is defined on a product Riemannian manifold $\mathcal{M} \times \mathcal{N}$ and is $\mu_x$-strongly geodesically convex (g-convex) in $x$ and $\mu_y$-strongly g-concave in $y$, for $\mu_x, \mu_y \geq 0$. We design accelerated methods when $f$ is $(L_x, L_y, L_{xy})$-smooth and $\mathcal{M}$, $\mathca...

---

## 52. Neural Manifold Operators for Learning the Evolution of Physical Dynamics

**Authors:** Hao Wu, Shuyi Zhou, Xiaomeng Huang, Wei Xiong

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Modeling the evolution of physical dynamics is a foundational problem in science and engineering, and it is regarded as the modeling of an operator mapping between infinite-dimensional functional spaces. Operator learning methods, learning the underlying infinite-dimensional operator in a high-dimensional latent space, have shown significant potential in modeling physical dynamics. However, there ...

---

## 53. Reducing class-wise confusion for incremental learning with disentangled manifolds

**Authors:** Huitong Chen, Yu Wang, YanFan, Guosong Jiang, Qinghua Hu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Class incremental learning (CIL) aims to enable models to continuously learn new classes without catastrophically forgetting old ones. A promising direction is to learn and use prototypes of classes during incremental updates. Despite simplicity and intuition, we find that such methods suffer from inadequate representation capability and unsatisfied confusion caused by distribution drift. In this ...

---

## 54. Random Forest Autoencoders for Guided Representation Learning

**Authors:** Adrien Aumon, Shuang Ni, Myriam Lizotte, Guy Wolf, Kevin R. Moon

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Extensive research has produced robust methods for unsupervised data visualization. Yet supervised visualization—where expert labels guide representations—remains underexplored, as most supervised approaches prioritize classification over visualization. Recently, RF-PHATE, a diffusion-based manifold learning method leveraging random forests and information geometry, marked significant progress in ...

---

## 55. Toward a Unified Geometry Understanding : Riemannian Diffusion Framework for Graph Generation and Prediction

**Authors:** Yisen Gao, Xingcheng Fu, Qingyun Sun, Jianxin Li, Xianxian LI

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Graph diffusion models have made significant progress in learning structured graph data and have demonstrated strong potential for predictive tasks. Existing approaches typically embed node, edge, and graph-level features into a unified latent space, modeling prediction tasks including classification and regression as a form of conditional generation.  However, due to the non-Euclidean nature of g...

---

## 56. Spherical Manifold Guided Diffusion Model for Panoramic Image Generation

**Authors:** Xiancheng Sun, Mai Xu, Shengxi Li, Senmao Ma, Xin Deng

**Year:** 2025 | **Venue:** CVPR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Sun_Spherical_Manifold_Guided_Diffusion_Model_for_Panoramic_Image_Generation_CVPR_2025_paper.pdf) | > Panoramic image essentially acts as a pivotal role in emerging virtual reality and augmented reality scenarios; however, the generation of panoramic images are essentially challenging due to the intrinsic spherical geometry and spherical distortions caused by equirectangular projection (ERP). To address this, we start from the very basics of S^2 manifold inherent to panoramic images, and propose a...

---

## 57. Enforcing Latent Euclidean Geometry in VAEs for Statistical Manifold Interpolation

**Authors:** Alessandro Palma, Sergei Rybakov, Leon Hetzel, Stephan Günnemann, Fabian J Theis

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Latent linear interpolations are a powerful tool for navigating the representation space of deep generative models. This aspect is particularly relevant in applied settings, where meaningful latent traversals can be learnt to represent the evolution of a system's trajectory and mapped back to the often complex and high-dimensional data space. However, when data lies on a manifold with complex geom...

---

## 58. Manifolds, Random Matrices and Spectral Gaps: The geometric phases of generative diffusion

**Authors:** Enrico Ventura, Beatrice Achilli, Gianluigi Silvestri, Carlo Lucibello, Luca Ambrogioni

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=KlN00vQEY2) | > In this paper, we investigate the latent geometry of generative diffusion models under the manifold hypothesis. For this purpose, we analyze the spectrum of eigenvalues (and singular values) of the Jacobian of the score function, whose discontinuities (gaps) reveal the presence and dimensionality of distinct sub-manifolds. Using a statistical physics approach, we derive the spectral distributions ...

---

## 59. Aggregation of Multi Diffusion Models for Enhancing Learned Representations

**Authors:** Conghan Yue, Zhengwei Peng, Shiyan Du, Zhi Ji, Dongyu Zhang

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Diffusion models have achieved remarkable success in image generation, particularly with the various applications of classifier-free guidance conditional diffusion models. While many diffusion models perform well when controlling for particular aspect among style, character, and interaction, they struggle with fine-grained control due to dataset limitations and intricate model architecture design....

---

## 60. Adversarial Defense using Targeted Manifold Manipulation

**Authors:** Banibrata Ghosh, HARIPRIYA HARIKUMAR, Svetha Venkatesh, Santu Rana

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Adversarial attacks on deep models are often guaranteed to find a small and innocuous perturbation to easily alter class label of a test input. We use a novel Targeted Manifold Manipulation approach to direct the gradients from the genuine data manifold towards carefully planted trapdoors during such adversarial attacks. The trapdoors are assigned an additional class label (Trapclass) to make the ...

---

## 61. Geometry-Aware Generative Autoencoders for Warped Riemannian Metric Learning and Generative Modeling on Data Manifolds

**Authors:** Xingzhi Sun, Danqi Liao, Kincaid MacDonald, Yanlei Zhang, Guillaume Huguet

**Year:** 2025 | **Venue:** AISTATS 2025 | **Citations:** N/A | **Score:** 0.000

> Rapid growth of high-dimensional datasets in fields such as single-cell RNA sequencing and spatial genomics has led to unprecedented opportunities for scientific discovery, but it also presents unique computational and statistical challenges. Traditional methods struggle with geometry-aware data generation, interpolation along meaningful trajectories, and transporting populations via feasible path...

---

## 62. Riemannian Low-Rank Adaptation for Federated Fine-Tuning of Foundation Models

**Authors:** Zihan Zhou, Yang Zhou, Tianshi Che, Zeru Zhang, Jiaxiang Ren

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Rank-adaptive low-rank adaptation (LoRA), a parameter-efficient fine-tuning (PEFT) technology, has achieved state-of-the-art performance in fine-tuning foundation models (FM). Directly transplanting the rank-adaptive LoRA methods from centralized learning to federated learning raises two critical issues: client drift and rank drift. This paper presents a Riemannian LoRA algorithm with adaptive ran...

---

## 63. Pullback Flow Matching on Data Manifolds

**Authors:** Friso de Kruiff, Erik J Bekkers, Ozan Öktem, Carola-Bibiane Schönlieb, Willem Diepeveen

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> We propose Pullback Flow Matching (PFM), a novel framework for generative modeling on data manifolds. Unlike existing methods that assume or learn restrictive closed-form manifold mappings for training Riemannian Flow Matching (RFM) models, PFM leverages pullback geometry and isometric learning to preserve the underlying manifold’s geometry while enabling efficient generation and precise interpola...

---

## 64. Pruning via Merging: Compressing LLMs via Manifold Alignment Based Layer Merging

**Authors:** Deyuan Liu, Zhanyue Qin, Hairu Wang, Zhao Yang, Zecheng Wang

**Year:** 2024 | **Venue:** EMNLP 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2024.emnlp-main.987.pdf) | > While large language models (LLMs) excel in many domains, their complexity and scale challenge deployment in resource-limited environments. Current compression techniques, such as parameter pruning, often fail to effectively utilize the knowledge from pruned parameters. To address these challenges, we propose Manifold-Based Knowledge Alignment and Layer Merging Compression (MKA), a novel approach ...

---

## 65. Quasi-static Path Planning for Continuum Robots By Sampling on Implicit Manifold

**Authors:** Yifan Wang, Yue Chen, Yifan Wang, Yue Chen

**Year:** 2024 | **Venue:** ICRA 2024 | **Citations:** N/A | **Score:** 0.000

> Continuum robots (CR) offer excellent dexterity and compliance in contrast to rigid-link robots, making them suitable for navigating through, and interacting with, confined environments. However, the study of path planning for CRs while considering external elastic contact is limited. The challenge lies in the fact that CRs can have multiple possible configurations when in contact, rendering the f...

---

## 66. Geometric Analysis of Nonlinear Manifold Clustering

**Authors:** Nimita Shinde, Tianjiao Ding, Daniel Robinson, Rene Vidal

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=nBQHTBVnfr) | > Manifold clustering is an important problem in motion and video segmentation, natural image clustering, and other applications where high-dimensional data lie on multiple, low-dimensional, nonlinear manifolds. While current state-of-the-art methods on large-scale datasets such as CIFAR provide good empirical performance, they do not have any proof of theoretical correctness. In this work, we propo...

---

## 67. Score-based Pullback Riemannian Geometry: Extracting the Data Manifold Geometry using Anisotropic Flows

**Authors:** Willem Diepeveen, Georgios Batzolis, Zakhar Shumaylov, Carola-Bibiane Schönlieb

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=AJN5btaqNk) | > Data-driven Riemannian geometry has emerged as a powerful tool for interpretable representation learning, offering improved efficiency in downstream tasks. Moving forward, it is crucial to balance cheap manifold mappings with efficient training algorithms. In this work, we integrate concepts from pullback Riemannian geometry and generative models to propose a framework for data-driven Riemannian g...

---

## 68. Probe-Free Low-Rank Activation Intervention

**Authors:** Chonghe Jiang, Bao Nguyen, Anthony Man-Cho So, Viet Anh Nguyen

**Year:** 2025 | **Venue:** NAACL 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://aclanthology.org/2025.naacl-long.143.pdf) | > Language models (LMs) can produce texts that appear accurate and coherent but contain untruthful or toxic content. Inference-time interventions that edit the hidden activations have shown promising results in steering the LMs towards desirable generations. Existing activation intervention methods often comprise an activation probe to detect undesirable generation, triggering the activation modific...

---

## 69. Guidance with Spherical Gaussian Constraint for Conditional Diffusion

**Authors:** Lingxiao Yang, Shutong Ding, Yifan Cai, Jingyi Yu, Jingya Wang

**Year:** 2024 | **Venue:** ICML 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=VtqyurB4Af) | > Recent advances in diffusion models attempt to handle conditional generative tasks by utilizing a differentiable loss function for guidance without the need for additional training. While these methods achieved certain success, they often compromise on sample quality and require small guidance step sizes, leading to longer sampling processes. This paper reveals that the fundamental issue lies in t...

---

## 70. GeoMind: A Geometric Neural Network of State Space Model for Understanding Brain Dynamics on Riemannian Manifold

**Authors:** Tingting Dan, Jiaqi Ding, Guorong Wu

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> State space model (SSM) is a powerful tool in neuroscience field to characterize the dynamic nature of brain functions by elucidating the mechanism of how brain system transits between brain states and how underlying states give rise to the observed neural activities. Although tremendous efforts have been made to lend the power of deep learning and mathematical insight of SSM in various functional...

---

## 71. Scalable Group Choreography via Variational Phase Manifold Learning

**Authors:** Nhat Le, Khoa Do, Xuan Bui, Tuong Do, Erman Tjiputra

**Year:** 2024 | **Venue:** ECCV 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/02766.pdf) | > "Generating group dance motion from the music is a challenging task with several industrial applications. Although several methods have been proposed to tackle this problem, most of them prioritize optimizing the fidelity in dancing movement, constrained by predetermined dancer counts in datasets. This limitation impedes adaptability to real-world applications. Our study addresses the scalability ...

---

## 72. Hierarchical Classification by Training to Diffuse on the Manifold

**Authors:** Kaixiang Song, Guoyuan An, Yuchi Huo, Yanan Li, Wei Hua

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Hierarchical classification, the problem of requiring classifying images according to a hierarchical taxonomy, has broad applications owing to the principle of ``making better mistakes'', i.e., better to predict correct coarse labels than incorrect fine labels.
Despite the importance, the literature has found it sufficient to use the wide-adopted top-1 classification accuracy to rank methods and u...

---

## 73. Combinatorial CNN-Transformer Learning with Manifold Constraints for Semi-supervised Medical Image Segmentation

**Authors:** Huimin Huang, Yawen Huang, Shiao Xie, Lanfen Lin, Ruofeng Tong

**Year:** 2024 | **Venue:** AAAI 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://ojs.aaai.org/index.php/AAAI/article/view/28007/28029) | > Semi-supervised learning (SSL), as one of the dominant methods, aims at leveraging the unlabeled data to deal with the annotation dilemma of supervised learning, which has attracted much attentions in the medical image segmentation. 
Most of the existing approaches leverage a unitary network by convolutional neural networks (CNNs) with compulsory consistency of the predictions through small pertur...

---

## 74. MANTRA: The Manifold Triangulations Assemblage

**Authors:** Rubén Ballester, Ernst Röell, Daniel Bin Schmid, Mathieu Alain, Sergio Escalera

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=X6y5CC44HM) | > The rising interest in leveraging higher-order interactions present in complex systems has
led to a surge in more expressive models exploiting higher-order structures in the data,
especially in topological deep learning (TDL), which designs neural networks on higher-order domains such as simplicial complexes. However, progress in this field is hindered
by the scarcity of datasets for benchmarking ...

---

## 75. Local convergence of simultaneous min-max algorithms to differential equilibrium on Riemannian manifold

**Authors:** Sixin Zhang

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=ROYSNn3vvB) | > We study min-max algorithms to solve zero-sum differential games on
Riemannian manifold.
Based on the notions of
differential Stackelberg equilibrium
and differential Nash equilibrium on Riemannian manifold,
we analyze the local convergence of 
two representative deterministic simultaneous algorithms $\tau$-GDA and $\tau$-SGA
to such equilibria.
Sufficient conditions are obtained to establish the ...

---

## 76. Symmetric Space Learning for Combinatorial Generalization

**Authors:** Jaehyoung Jeong, Hee-Jun Jung, Kangil Kim

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Symmetries on representations within generative models have shown essential roles in predicting unobserved combinations of semantic changes, known as combinatorial generalization tasks. However, these efforts have primarily focused on learning symmetries from only training data, and thus, the extension of trained symmetries to unseen samples remains uncontrolled. A potential approach for generaliz...

---

## 77. Lifting Architectural Constraints of Injective Flows

**Authors:** Peter Sorrenson, Felix Draxler, Armand Rousselot, Sander Hummerich, Lea Zimmermann

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=kBNIx4Biq4) | > Normalizing Flows explicitly maximize a full-dimensional likelihood on the training data. However, real data is typically only supported on a lower-dimensional manifold leading the model to expend significant compute on modeling noise. Injective Flows fix this by jointly learning a manifold and the distribution on it. So far, they have been limited by restrictive architectures and/or high computat...

---

## 78. Manifold Induced Biases for Zero-shot and Few-shot Detection of Generated Images

**Authors:** Jonathan Brokman, Amit Giloni, Omer Hofman, Roman Vainshtein, Hisashi Kojima

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=7gGl6HB5Zd) | > Distinguishing between real and AI-generated images, commonly referred to as  'image detection', presents a timely and significant challenge. Despite extensive research in the (semi-)supervised regime, zero-shot and few-shot solutions have only recently emerged as promising alternatives. Their main advantage is in alleviating the ongoing data maintenance, which quickly becomes outdated due to adva...

---

## 79. Categorical Flow Matching on Statistical Manifolds

**Authors:** Chaoran Cheng, Jiahan Li, Jian Peng, Ge Liu

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=5fybcQZ0g4) | > We introduce Statistical Flow Matching (SFM), a novel and mathematically rigorous flow-matching framework on the manifold of parameterized probability measures inspired by the results from information geometry. We demonstrate the effectiveness of our method on the discrete generation problem by instantiating SFM on the manifold of categorical distributions whose geometric properties remain unexplo...

---

## 80. First-Order Manifold Data Augmentation for Regression Learning

**Authors:** Ilya Kaufman, Omri Azencot

**Year:** 2024 | **Venue:** ICML 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=geajNKab7g) | > Data augmentation (DA) methods tailored to specific domains generate synthetic samples by applying transformations that are appropriate for the characteristics of the underlying data domain, such as rotations on images and time warping on time series data. In contrast, *domain-independent* approaches, e.g. *mixup*, are applicable to various data modalities, and as such they are general and versati...

---

## 81. Riemannian Manifold Learning for Stackelberg Games with Neural Flow Representations

**Authors:** Larkin Liu, Yutong Chao, Jalal Etesami, Kashif Rasul

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> We present a novel framework for online learning in Stackelberg general-sum games, where two agents, the leader and follower, engage in sequential turn-based interactions. At the core of this approach is a learned diffeomorphism that maps the joint action space to a smooth Riemannian manifold, referred to as the $\textit{Stackelberg manifold}$. This mapping, facilitated by neural normalizing flows...

---

## 82. RSAM: Learning on Manifolds with Riemannian Sharpness-Aware Minimization

**Authors:** Tuan Truong, Hoang-Phi Nguyen, Tung Pham, Minh-Tuan Tran, Mehrtash Harandi

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Nowadays, understanding the geometry of the loss landscape shows promise in enhancing a model's generalization ability. In this work, we draw upon prior works that apply geometric principles to optimization and present a novel approach to improve robustness and generalization ability for constrained optimization problems. Indeed, this paper aims to generalize the Sharpness-Aware Minimization (SAM)...

---

## 83. State Representation Learning Using an Unbalanced Atlas

**Authors:** Li Meng, Morten Goodwin, Anis Yazidi, Paal E. Engelstad

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=cWdAYDLmPa) | > The manifold hypothesis posits that high-dimensional data often lies on a lower-dimensional manifold and that utilizing this manifold as the target space yields more efficient representations. While numerous traditional manifold-based techniques exist for dimensionality reduction, their application in self-supervised learning has witnessed slow progress. The recent MSimCLR method combines manifold...

---

## 84. Provably Accurate ODE Forecasting Through Explicit Trajectory Optimization

**Authors:** Helmuth Naumer, Farzad Kamalabadi

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> This work introduces a method to enable accurate forecasting of time series governed by ordinary differential equations (ODE) through the usage of cost functions explicitly dependent on the future trajectory rather than the past measurement times. We prove that the space of solutions of an $N$-dimensional, smooth, Lipschitz ODE on any given finite time horizon is an $N$-dimensional Riemannian mani...

---

## 85. Motif-Aware Riemannian Graph Neural Network with Generative-Contrastive Learning

**Authors:** Li Sun, Zhenhao Huang, Zixi Wang, Feiyang Wang, Hao Peng

**Year:** 2024 | **Venue:** AAAI 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://ojs.aaai.org/index.php/AAAI/article/view/28754/29450) | > Graphs are typical non-Euclidean data of complex structures. In recent years, Riemannian graph representation learning has emerged as an exciting alternative to Euclidean ones. However, Riemannian methods are still in an early stage: most of them present a single curvature (radius) regardless of structural complexity, suffer from numerical instability due to the exponential/logarithmic map, and la...

---

## 86. Mitigating Overthinking in Large Reasoning Models via Manifold Steering

**Authors:** Yao Huang, Huanran Chen, Shouwei Ruan, Yichi Zhang, Xingxing Wei

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Recent advances in Large Reasoning Models (LRMs) have demonstrated remarkable capabilities in solving complex tasks such as mathematics and coding. However, these models frequently exhibit a phenomenon known as *overthinking* during inference, characterized by excessive validation loops and redundant deliberation, leading to substantial computational overheads. In this paper, we aim to mitigate ov...

---

## 87. miniF2F: a cross-system benchmark for formal Olympiad-level mathematics

**Authors:** Kunhao Zheng, Jesse Michael Han, Stanislas Polu

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=9ZPegFuFTFv) | > We present $\textsf{miniF2F}$, a dataset of formal Olympiad-level mathematics problems statements intended to provide a unified cross-system benchmark for neural theorem proving. The $\textsf{miniF2F}$ benchmark currently targets Metamath, Lean, Isabelle (partially) and HOL Light (partially) and consists of 488 problem statements drawn from the AIME, AMC, and the International Mathematical Olympia...

---

## 88. Learning Manifold Implicitly via Explicit Heat-Kernel Learning

**Authors:** Yufan Zhou, Changyou Chen, Jinhui Xu

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/05e2a0647e260c355dd2b2175edb45b8-Paper.pdf) | > Manifold learning is a fundamental problem in machine learning with numerous applications. Most of the existing methods directly learn the low-dimensional embedding of the data in some high-dimensional space, and usually lack the flexibility of being directly applicable to down-stream applications. In this paper, we propose the concept of implicit manifold learning, where manifold information is i...

---

## 89. Learning Graph Representations in Normed Spaces

**Authors:** Diaaeldin Taha, Wei Zhao, J. Maxwell Riestenberg, Michael Strube

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Theoretical results from discrete geometry suggest that normed spaces can abstractly embed finite metric spaces with surprisingly low theoretical bounds on distortion in low dimensions. 
In this paper, inspired by this theoretical insight, we propose normed spaces as a more flexible and computationally efficient alternative to several popular Riemannian manifolds for learning graph embeddings. 
Ou...

---

## 90. Adaptive Manifold Learning

**Authors:** Jing Wang, Zhenyue Zhang, Hongyuan Zha

**Year:** 2004 | **Venue:** NIPS 2004 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2004/file/eb0ecdb070a1a0ac46de0cd733d39cf3-Paper.pdf) | > Recently, there have been several advances in the machine learning and           pattern recognition communities for developing manifold learning algo-           rithms to construct nonlinear low-dimensional manifolds from sample           data points embedded in high-dimensional spaces. In this paper, we de-           velop algorithms that address two key issues in manifold learning: 1)          ...

---

## 91. RealMath: A Continuous Benchmark for Evaluating Language Models on Research-Level Mathematics

**Authors:** Jie Zhang, Cezara Petrui, Kristina Nikolić, Florian Tramèr

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Existing benchmarks for evaluating mathematical reasoning in large language models (LLMs) rely primarily on competition problems, formal proofs, or artificially challenging questions---failing to capture the nature of mathematics encountered in actual research environments. We introduce \textsc{RealMath}, a novel benchmark derived directly from research papers and mathematical forums that assesses...

---

## 92. HARDMath: A Benchmark Dataset for Challenging Problems in Applied Mathematics

**Authors:** Jingxuan Fan, Sarah Martinson, Erik Y. Wang, Kaylie Hausknecht, Jonah Brenner

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=nDTvP6tBMd) | > Advanced applied mathematics problems are underrepresented in existing Large Language Model (LLM) benchmark datasets. To address this, we introduce $\textbf{HARDMath}$, a dataset inspired by a graduate course on asymptotic methods, featuring challenging applied mathematics problems that require analytical approximation techniques. These problems demand a combination of mathematical reasoning, comp...

---

## 93. Equivariant Manifold Flows

**Authors:** Isay Katsman, Aaron Lou, Derek Lim, Qingxuan Jiang, Ser-Nam Lim

**Year:** 2021 | **Venue:** NIPS 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=lzZX7E713nJ) | > Tractably modelling distributions over manifolds has long been an important goal in the natural sciences. Recent work has focused on developing general machine learning models to learn such distributions. However, for many applications these distributions must respect manifold symmetries—a trait which most previous models disregard. In this paper, we lay the theoretical foundations for learning sy...

---

## 94. Reset Method based on the Theory of Manifold Optimization on Real Manifolds

**Authors:** Weiping Liu, Jiajun Wang, He Li, Youfa Liu, Jingui Zou

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Manifold optimization is prominent in the fields of applied mathematics, statistics, machine learning, and in particular, deep learning. By leveraging the intrinsic geometric properties of manifolds, constrained optimization problems can be transformed into unconstrained optimization problems on certain manifolds.  An innovative method, Reset Method, is introduced that combines manifold optimizati...

---

## 95. ProofNet: Autoformalizing and Formally Proving Undergraduate-Level Mathematics

**Authors:** Zhangir Azerbayev, Bartosz Piotrowski, Hailey Schoelkopf, Edward William Ayers, Dragomir Radev

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> We introduce ProofNet, a benchmark for autoformalization and formal proving of undergraduate-level mathematics. The ProofNet benchmarks consists of 371 examples, each consisting of a formal theorem statement in Lean 3, a natural language theorem statement, and a natural language proof. The problems are primarily drawn from popular undergraduate pure mathematics textbooks and cover topics such as r...

---

## 96. Pretrained Language Models are Symbolic Mathematics Solvers too!

**Authors:** Kimia Noorbakhsh, Modar Sulaiman, Mahdi Sharifi, KALLOL ROY, Pooyan Jamshidi

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> Solving symbolic mathematics has always been of in the arena of human ingenuity that needs compositional reasoning and recurrence. However, recent studies have shown that large scale language models such as transformers are universal and surprisingly can be trained as  a sequence-to-sequence task to solve complex mathematical equations. These large transformer models need humongous amounts of trai...

---

## 97. Federated Learning with Manifold Regularization and Normalized Update Reaggregation

**Authors:** Xuming An, Li Shen, Han Hu, Yong Luo

**Year:** 2023 | **Venue:** NIPS 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=7uPnuoYqac) | > Federated Learning (FL) is an emerging collaborative machine learning framework where multiple clients train the global model without sharing their own datasets. 
In FL, the model inconsistency caused by the local data heterogeneity across clients results in the near-orthogonality of client updates, which leads to the global update norm reduction and slows down the convergence.  Most previous work...

---

## 98. Addressing Data Heterogeneity Through a Pre-learned Manifold for Distributed Learning Scenarios

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> In distributed learning environments like federated learning, data heterogeneity across clients has been a key challenge, which often leads to suboptimal model performance and convergence issues. So far, plenty of efforts have focused on addressing data heterogeneity by relying on a hypothetical clustering structure or a consistent information-sharing mechanism. However, because of the inherent co...

---

## 99. Learning Formal Mathematics From Intrinsic Motivation

**Authors:** Gabriel Poesia, David Broman, Nick Haber, Noah Goodman

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=uNKlTQ8mBD) | > How did humanity coax mathematics from the aether? We explore the Platonic view that mathematics can be discovered from its axioms---a game of conjecture and proof. We describe an agent that jointly learns to pose challenging problems for itself (conjecturing) and solve them (theorem proving). Given a mathematical domain axiomatized in dependent type theory, we first combine methods for constraine...

---

## 100. Deep Learning For Symbolic Mathematics

**Authors:** Guillaume Lample, François Charton

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Neural networks have a reputation for being better at solving statistical or approximate problems than at performing calculations or working with symbolic data. In this paper, we show that they can be surprisingly good at more elaborated tasks in mathematics, such as symbolic integration and solving differential equations. We propose a syntax for representing these mathematical problems, and metho...

---

## 101. Towards a Mathematics Formalisation Assistant using Large Language Models

**Authors:** Ayush Agrawal, Siddhartha Gadgil, Navin Goyal, Ashvni Narayanan, Anand Tadipatri

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

> Mathematics formalisation is the task of writing mathematics (i.e., definitions, theorem statements, proofs) in natural language, as found in books and papers, into a formal language that can then be checked for correctness by a program. It is a thriving activity today, however formalisation remains cumbersome. In this paper, we explore the abilities of a large language model (Codex) to help with ...

---

## 102. Grassmann Manifold Flows for Stable Shape Generation

**Authors:** Ryoma Yataka, Kazuki Hirashima, Masashi Shiraishi

**Year:** 2023 | **Venue:** NIPS 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=H2udtfMbl4) | > Recently, studies on machine learning have focused on methods that use symmetry implicit in a specific manifold as an inductive bias.
Grassmann manifolds provide the ability to handle fundamental shapes represented as shape spaces, enabling stable shape analysis. 
In this paper, we present a novel approach in which we establish the theoretical foundations for learning distributions on the Grassman...

---

## 103. Llemma: An Open Language Model for Mathematics

**Authors:** Zhangir Azerbayev, Hailey Schoelkopf, Keiran Paster, Marco Dos Santos, Stephen Marcus McAleer

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=4WnqRR915j) | > We present Llemma, a large language model for mathematics. We continue pretraining Code Llama on the Proof-Pile-2, a mixture of scientific papers, web data containing mathematics, and mathematical code, yielding Llemma. On the MATH benchmark Llemma outperforms all known openly released models, as well as the unreleased Minerva model suite on an equi-parameter basis. Moreover, Llemma is capable of ...

---

## 104. MANIFOLD FORESTS: CLOSING THE GAP ON NEURAL NETWORKS

**Authors:** Ronan Perry, Tyler M. Tomita, Jesse Patsolic, Benjamin Falk, Joshua Vogelstein

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Decision forests (DF), in particular random forests and gradient boosting trees, have  demonstrated state-of-the-art accuracy compared to other methods in many supervised learning scenarios. In particular, DFs dominate other methods in tabular data, that is, when the feature space is unstructured, so that the signal is invariant to permuting feature indices.  However, in structured data lying on a...

---

## 105. A Discussion On the Validity of Manifold Learning

**Authors:** Dai Shi, Andi Han, Yi Guo, Junbin Gao

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> Dimensionality reduction (DR) and manifold learning (ManL) have been applied extensively in many machine learning tasks, including signal processing, speech recognition, and neuroinformatics. However, the understanding of whether DR and ManL models can generate valid learning results remains unclear. In this work, we investigate the validity of learning results of some widely used DR and ManL meth...

---

## 106. Machine Learning meets Algebraic Combinatorics: A Suite of Datasets Capturing Research-level Conjecturing Ability in Pure Mathematics

**Authors:** Herman Chau, Helen Jenne, Davis Brown, Jesse He, Mark Raugas

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=tlniJJFUW2) | > With recent dramatic increases in AI system capabilities, there has been growing interest in utilizing machine learning for reasoning-heavy, quantitative tasks, particularly mathematics. While there are many resources capturing mathematics at the high-school, undergraduate, and graduate level, there are far fewer resources available that align with the level of difficulty and open endedness encoun...

---

## 107. Matrix Manifold Optimization for Gaussian Mixtures

**Authors:** Reshad Hosseini, Suvrit Sra

**Year:** 2015 | **Venue:** NIPS 2015 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2015/file/dbe272bab69f8e13f14b405e038deb64-Paper.pdf) | > We take a new look at parameter estimation for Gaussian Mixture Model (GMMs). Specifically, we advance Riemannian manifold optimization (on the manifold of positive definite matrices) as a potential replacement for Expectation Maximization (EM), which has been the de facto standard for decades. An out-of-the-box invocation of Riemannian optimization, however, fails spectacularly: it obtains the sa...

---

## 108. Generative Adversarial Optimization: Dual-Reward Reinforcement Learning for Mathematics Reasoning

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Despite recent progress achieved by large language models (LLMs), their remarkable mathematics reasoning abilities are largely dependent on fine-tuning on the annotated data, lacking generalization on out-of-distribution tasks. To address this, current methods adopt reinforcement learning (RL) to incentivize the latent capabilities of LLMs, mitigating the need for annotations. However, they often ...

---

## 109. Manifold Learning via Data Topology Optimization: Gradient Method Application

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> The study of topological properties in data and their application to machine learning is a growing research area. While most methods operate in Euclidean space, alternative topologies (e.g., hyperbolic embeddings for recommender systems) often yield superior performance. However, real-world data sets lack a known intrinsic topology, which requires manual specification. We propose a novel method fo...

---

## 110. Learning Complex Geometric Structures from Data with Deep Riemannian Manifolds

**Authors:** Aaron Lou, Maximilian Nickel, Mustafa Mukadam, Brandon Amos

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> We present Deep Riemannian Manifolds, a new class of neural network parameterized Riemannian manifolds that can represent and learn complex geometric structures. To do this, we first construct a neural network which outputs symmetric positive definite matrices and show that the induced metric can universally approximate all geometries. We then develop differentiable solvers for core manifold opera...

---

## 111. Formal Mathematics Statement Curriculum Learning

**Authors:** Stanislas Polu, Jesse Michael Han, Kunhao Zheng, Mantas Baksys, Igor Babuschkin

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=-P7G-8dmSh4) | > We explore the use of expert iteration in the context of language modeling applied to formal mathematics. We show that at same compute budget, expert iteration, by which we mean proof search interleaved with learning, dramatically outperforms proof search only. We also observe that when applied to a collection of formal statements of sufficiently varied difficulty, expert iteration is capable of f...

---

## 112. Sample complexity and effective dimension for regression on manifolds

**Authors:** Andrew McRae, Justin Romberg, Mark Davenport

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/977f8b33d303564416bf9f4ab1c39720-Paper.pdf) | > We consider the theory of regression on a manifold using reproducing kernel Hilbert space methods. Manifold models arise in a wide variety of modern machine learning problems, and our goal is to help understand the effectiveness of various implicit and explicit dimensionality-reduction methods that exploit manifold structure. Our first key contribution is to establish a novel nonasymptotic version...

---

## 113. Riemannian Optimization on Relaxed Indicator Matrix Manifold

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> The indicator matrix plays an important role in machine learning, but optimizing it is an NP-hard problem. We propose a new relaxation of the indicator matrix and compared with other existing relaxations, it can flexibly incorporate class information. We prove that this relaxation forms a manifold, which we call the Relaxed Indicator Matrix Manifold (RIM manifold). Based on Riemannian geometry, we...

---

## 114. Wrapped Gaussian on the manifold of Symmetric Positive Definite Matrices

**Authors:** Thibault de Surrel, Fabien Lotte, Sylvain Chevallier, Florian Yger

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=EhStXG4dCS) | > Circular and non-flat data distribution are prevalent across diverse domains of data science, yet their specific geometric structures often remain underutilized in machine learning frameworks.
A principled approach to accounting for the underlying geometry of such data is pivotal, particularly when extending statistical models, like the pervasive Gaussian distribution.
In this work, we tackle thos...

---

## 115. Distributional Autoencoders Know the Score

**Authors:** Andrej Leban

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> The Distributional Principal Autoencoder (DPA) combines distributionally correct reconstruction with principal-component-like interpretability of the encodings. In this work, we provide exact theoretical guarantees on both fronts. First, we derive a closed-form relation linking each optimal level-set geometry to the data-distribution score. This result explains DPA's empirical ability to disentang...

---

## 116. Contrastive Reinforcement Learning of Symbolic Reasoning Domains

**Authors:** Gabriel Poesia, WenXin Dong, Noah Goodman

**Year:** 2021 | **Venue:** NIPS 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=ZarM_uLVyGw) | > Abstract symbolic reasoning, as required in domains such as mathematics and logic, is a key component of human intelligence. Solvers for these domains have important applications, especially to computer-assisted education. But learning to solve symbolic problems is challenging for machine learning algorithms. Existing models either learn from human solutions or use hand-engineered features, making...

---

## 117. Predicting Out-of-Domain Generalization with Local Manifold Smoothness

**Authors:** Nathan Hoyen Ng, Neha Hulkund, Kyunghyun Cho, Marzyeh Ghassemi

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

> Understanding how machine learning models generalize to new environments is a critical part of their safe deployment. Recent work has proposed a variety of complexity measures that directly predict or theoretically bound the generalization capacity of a model. However, these methods rely on a strong set of assumptions that in practice are not always satisfied. Motivated by the limited settings in ...

---

## 118. Stabilized Neural Differential Equations for Learning Dynamics with Explicit Constraints

**Authors:** Alistair White, Niki Kilbertus, Maximilian Gelbrecht, Niklas Boers

**Year:** 2023 | **Venue:** NIPS 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=zO2dAQfvHf) | > Many successful methods to learn dynamical systems from data have recently been introduced. However, ensuring that the inferred dynamics preserve known constraints, such as conservation laws or restrictions on the allowed system states, remains challenging. We propose stabilized neural differential equations (SNDEs), a method to enforce arbitrary manifold constraints for neural differential equati...

---

## 119. Beyond the Lazy versus Rich Dichotomy: Geometry Insights in Feature Learning from Task-Relevant Manifold Untangling

**Authors:** Chi-Ning Chou, Hang Le, Yichen Wang, SueYeon Chung

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> The ability to integrate task-relevant information into neural representations is a fundamental aspect of both human and machine intelligence. Recent studies have explored the transition of neural networks from the *lazy* training regime (where the trained network is equivalent to a linear model of initial random features) to the *rich* feature learning regime (where the network learns task-releva...

---

## 120. On the Geometry of Adversarial Examples

**Authors:** Marc Khoury, Dylan Hadfield-Menell

**Year:** 2019 | **Venue:** ICLR 2019 | **Citations:** N/A | **Score:** 0.000

> Adversarial examples are a pervasive phenomenon of machine learning models where seemingly imperceptible perturbations to the input lead to misclassifications for otherwise statistically accurate models. We propose a geometric framework, drawing on tools from the manifold reconstruction literature, to analyze the high-dimensional geometry of adversarial examples. In particular, we highlight the im...

---

## 121. PutnamBench: Evaluating Neural Theorem-Provers on the Putnam Mathematical Competition

**Authors:** George Tsoukalas, Jasper Lee, John Jennings, Jimmy Xin, Michelle Ding

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=ChKCF75Ocd) | > We present PutnamBench, a new multi-language benchmark for evaluating the ability of neural theorem-provers to solve competition mathematics problems. PutnamBench consists of 1692 hand-constructed formalizations of 640 theorems sourced from the William Lowell Putnam Mathematical Competition, the premier undergraduate-level mathematics competition in North America. 
All the problems have formalizat...

---

## 122. Across-animal odor decoding by probabilistic manifold alignment

**Authors:** Pedro Herrero-Vidal, Dmitry Rinberg, Cristina Savin

**Year:** 2021 | **Venue:** NIPS 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=85BzB3WP-qj) | > Identifying the common structure of neural dynamics across subjects is key for extracting unifying principles of brain computation and for many brain machine interface applications. Here, we propose a novel probabilistic approach for aligning stimulus-evoked responses from multiple animals in a common low dimensional manifold and use hierarchical inference to identify which stimulus drives neural ...

---

## 123. SpaceMAP: Visualizing High-Dimensional Data by Space Expansion

**Authors:** Xinrui Zu, Qian Tao

**Year:** 2022 | **Venue:** ICML 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://proceedings.mlr.press/v162/zu22a/zu22a.pdf) | > Dimensionality reduction (DR) of high-dimensional data is of theoretical and practical interest in machine learning. However, there exist intriguing, non-intuitive discrepancies between the geometry of high- and low-dimensional space. We look into such discrepancies and propose a novel visualization method called Space-based Manifold Approximation and Projection (SpaceMAP). Our method establishes ...

---

## 124. Efficient neural representation in the cognitive neuroscience domain: Manifold Capacity in One-vs-rest Recognition Limit

**Authors:** Nga Yu Lo, SueYeon Chung

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

> The structure in neural representations as manifolds has become a popular approach to study information encoding in neural populations. One particular interest is the connection between object recognition capability and the separability of neural representations for different objects, often called "object manifolds." In learning theory, separability has been studied under the notion of storage cap...

---

## 125. Developing Bug-Free Machine Learning Systems With Formal Mathematics

**Authors:** Daniel Selsam, Percy Liang, David L. Dill

**Year:** 2017 | **Venue:** ICML 2017 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v70/selsam17a/selsam17a.pdf) | > Noisy data, non-convex objectives, model misspecification, and numerical instability can all cause undesired behaviors in machine learning systems. As a result, detecting actual implementation errors can be extremely difficult. We demonstrate a methodology in which developers use an interactive proof assistant to both implement their system and to state a formal theorem defining what it means for ...

---

## 126. Geodesic Distance Function Learning via Heat Flow on Vector Fields

**Authors:** Binbin Lin, Ji Yang, Xiaofei He, Jieping Ye

**Year:** 2014 | **Venue:** ICML 2014 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v32/linb14.pdf) | > Learning a distance function or metric on a given data manifold is of great importance in machine learning and pattern recognition. Many of the previous works first embed the manifold to Euclidean space and then learn the distance function. However, such a scheme might not faithfully preserve the distance function if the original manifold is not Euclidean. In this paper, we propose to learn the di...

---

## 127. Less is More: Dimension Reduction Finds On-Manifold Adversarial Examples in Hard-Label Attacks

**Authors:** Washington Garcia, Pin-Yu Chen, Somesh Jha, Hamilton Scott Clouse, Kevin R. B. Butler

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> Designing deep networks robust to adversarial examples remains an open problem. Likewise, recent zeroth-order hard-label attacks on image classification models have shown comparable performance to their first-order, gradient-level alternatives. It was recently shown in the gradient-level setting that regular adversarial examples leave the data manifold, while their on-manifold counterparts are in ...

---

## 128. Usefulness-driven Learning of Formal Mathematics

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Creating an AI that can truly "do" mathematics requires more than just solving isolated problems. It must mimic the creative, progressive nature of human mathematicians, who build upon previous work to generate new knowledge. A crucial part of this process is proposing theorems that serve as useful building blocks for proving more advanced theorems. In this paper, we introduce UseForm, a novel fra...

---

## 129. A Statistical Manifold Framework for Point Cloud Data

**Authors:** Yonghyeon Lee, Seungyeon Kim, Jinwon Choi, Frank Park

**Year:** 2022 | **Venue:** ICML 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://proceedings.mlr.press/v162/lee22d/lee22d.pdf) | > Many problems in machine learning involve data sets in which each data point is a point cloud in $\mathbb{R}^D$. A growing number of applications require a means of measuring not only distances between point clouds, but also angles, volumes, derivatives, and other more advanced concepts. To formulate and quantify these concepts in a coordinate-invariant way, we develop a Riemannian geometric frame...

---

## 130. Diffeomorphic Optimization

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Optimization is a challenging task due to the rugged nature of the optimization landscape and the concentration of data on a low-dimensional manifold. Our approach starts from the observation that flow and diffusion models map the data manifold to a smooth and simple base space. We thus propose to reparameterize the optimization problem in terms of these simple base-space variables. Using concepts...

---

## 131. Proximity Graphs for Clustering and Manifold Learning

**Authors:** Richard S. Zemel, Miguel Á. Carreira-Perpiñán

**Year:** 2004 | **Venue:** NIPS 2004 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2004/file/dcda54e29207294d8e7e1b537338b1c0-Paper.pdf) | > Many machine learning algorithms for clustering or dimensionality re- duction take as input a cloud of points in Euclidean space, and construct a graph with the input data points as vertices. This graph is then parti- tioned (clustering) or used to redeﬁne metric information (dimensional- ity reduction). There has been much recent work on new methods for graph-based clustering and dimensionality r...

---

## 132. Learning to Disentangle Factors of Variation with Manifold Interaction

**Authors:** Scott Reed, Kihyuk Sohn, Yuting Zhang, Honglak Lee

**Year:** 2014 | **Venue:** ICML 2014 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v32/reed14.pdf) | > Many latent factors of variation interact to generate sensory data; for example pose, morphology and expression in face images. We propose to learn manifold coordinates for the relevant factors of variation and to model their joint interaction. Most existing feature learning algorithms focus on a single task and extract features that are sensitive to the task-relevant factors and invariant to all ...

---

## 133. Nonconvex Federated Learning on Compact Smooth Submanifolds With Heterogeneous Data

**Authors:** Jiaojiao Zhang, Jiang Hu, Anthony Man-Cho So, Mikael Johansson

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=uO53206oLJ) | > Many machine learning tasks, such as principal component analysis and low-rank matrix completion, give rise to manifold optimization problems. Although there is a large body of work studying the design and analysis of algorithms for manifold optimization in the centralized setting, there are currently very few works addressing the federated setting. In this paper, we consider nonconvex federated l...

---

## 134. Tensor Balancing on Statistical Manifold

**Authors:** Mahito Sugiyama, Hiroyuki Nakahara, Koji Tsuda

**Year:** 2017 | **Venue:** ICML 2017 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v70/sugiyama17a/sugiyama17a.pdf) | > We solve tensor balancing, rescaling an Nth order nonnegative tensor by multiplying N tensors of order N - 1 so that every fiber sums to one. This generalizes a fundamental process of matrix balancing used to compare matrices in a wide range of applications from biology to economics. We present an efficient balancing algorithm with quadratic convergence using Newton’s method and show in numerical ...

---

## 135. Optimization without Retraction on the Random Generalized Stiefel Manifold

**Authors:** Simon Vary, Pierre Ablin, Bin Gao, Pierre-Antoine Absil

**Year:** 2024 | **Venue:** ICML 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=QLtxj3erlJ) | > Optimization over the set of matrices $X$ that satisfy $X^\top B X = I_p$, referred to as the generalized Stiefel manifold, appears in many applications involving sampled covariance matrices such as the canonical correlation analysis (CCA), independent component analysis (ICA), and the generalized eigenvalue problem (GEVP). Solving these problems is typically done by iterative methods that require...

---

## 136. $\texttt{RNAGenScape}$: Property-Guided Optimization and Interpolation of mRNA Sequences with Manifold Langevin Dynamics

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> mRNA design and optimization are important in synthetic biology and therapeutic development, but remain understudied in machine learning. Systematic optimization of mRNAs is hindered by the scarce and imbalanced data as well as complex sequence-function relationships. We present $\texttt{RNAGenScape}$, a property-guided manifold Langevin dynamics framework that iteratively updates mRNA sequences w...

---

## 137. Unsupervised Manifold Linearizing and Clustering

**Authors:** Tianjiao Ding, Shengbang Tong, Kwan Ho Ryan Chan, Xili Dai, Yi Ma

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

> Clustering data lying close to a union of low-dimensional manifolds, with each manifold as a cluster, is a fundamental problem in machine learning. When the manifolds are assumed to be linear subspaces, many methods succeed using low-rank and sparse priors, which have been studied extensively over the past two decades. Unfortunately, most  real-world datasets can not be well approximated by linear...

---

## 138. Support Regularized Sparse Coding and Its Fast Encoder

**Authors:** Yingzhen Yang, Jiahui Yu, Pushmeet Kohli, Jianchao Yang, Thomas S. Huang

**Year:** 2017 | **Venue:** ICLR 2017 | **Citations:** N/A | **Score:** 0.000

> Sparse coding represents a signal by a linear combination of only a few atoms of a learned over-complete dictionary. While sparse coding exhibits compelling performance for various machine learning tasks, the process of obtaining sparse code with fixed dictionary is independent for each data point without considering the geometric information and manifold structure of the entire data. We propose S...

---

## 139. Mathematical Capabilities of ChatGPT

**Authors:** Simon Frieder, Luca Pinchetti, Alexis Chevalier, Ryan-Rhys Griffiths, Tommaso Salvatori

**Year:** 2023 | **Venue:** NIPS 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=xJ7YWXQOrg) | > We investigate the mathematical capabilities of two versions of ChatGPT (released 9-January-2023 and 30-January-2023) and of GPT-4 by testing them on publicly available datasets, as well as hand-crafted ones, using a novel evaluation scheme. In contrast to formal mathematics, where large databases of formal proofs are available (e.g., mathlib, the Lean Mathematical Library), current datasets of na...

---

## 140. Transfer Learning on Manifolds via Learned Transport Operators

**Authors:** Marissa Connor, Christopher Rozell

**Year:** 2018 | **Venue:** ICLR 2018 | **Citations:** N/A | **Score:** 0.000

> Within-class variation in a high-dimensional dataset can be modeled as being on a low-dimensional manifold due to the constraints of the physical processes producing that variation (e.g., translation, illumination, etc.). We desire a method for learning a representation of the manifolds induced by identity-preserving transformations that can be used to increase robustness, reduce the training burd...

---

## 141. Retraction-free optimization over the Stiefel manifold with application to the LoRA fine-tuning

**Authors:** Yuan Zhang, Jiang Hu, Jiaxi Cui, Lin Lin, Zaiwen Wen

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

> Optimization over the Stiefel manifold has played a significant role in various machine learning tasks. Many existing algorithms either use the retraction operator to keep each iterate staying on the manifold, or solve an unconstrained quadratic penalized problem. The retraction operator in the former corresponds to orthonormalization of matrices and can be computationally costly for large-scale m...

---

## 142. Humans Learn Using Manifolds, Reluctantly

**Authors:** Tim Rogers, Chuck Kalish, Joseph Harrison, Xiaojin Zhu, Bryan R. Gibson

**Year:** 2010 | **Venue:** NIPS 2010 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2010/file/996009f2374006606f4c0b0fda878af1-Paper.pdf) | > When the distribution of unlabeled data in feature space lies along a manifold, the information it provides may be used by a learner to assist classification in a semi-supervised setting. While manifold learning is well-known in machine learning, the use of manifolds in human learning is largely unstudied. We perform a set of experiments which test a human's ability to use a manifold in a semi-sup...

---

## 143. A Nonlinear Regression Technique for Manifold Valued Data With Applications to Medical Image Analysis

**Authors:** Monami Banerjee, Rudrasis Chakraborty, Edward Ofori, Michael S. Okun, David E. Viallancourt

**Year:** 2016 | **Venue:** CVPR 2016 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content_cvpr_2016/papers/Banerjee_A_Nonlinear_Regression_CVPR_2016_paper.pdf) | > Regression is an essential tool in Statistical analysis of data with many applications in Computer Vision, Machine Learning, Medical Imaging and various disciplines of Science and Engineering. Linear and nonlinear regression in a vector space setting has been well studied in literature. However, generalizations to manifold-valued data are only recently gaining popularity. With the exception of a f...

---

## 144. Learning Identity-Preserving Transformations on Data Manifolds

**Authors:** Marissa Catherine Connor, Kion Fallah, Christopher John Rozell

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> Many machine learning techniques incorporate identity-preserving transformations into their models to generalize their performance to previously unseen data. These transformations are typically selected from a set of functions that are known to maintain the identity of an input when applied (e.g., rotation, translation, flipping, and scaling). However, there are many natural variations that cannot...

---

## 145. HARDMath2: A Benchmark for Applied Mathematics Built by Students as Part of a Graduate Class

**Authors:** James V Roggeveen, Erik Y. Wang, David Ettel, Will Flintoft, Peter Donets

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Large language models (LLMs) have shown remarkable progress in mathematical problem-solving, but evaluation has largely focused on problems that have exact analytical solutions or involve formal proofs, often overlooking approximation-based problems ubiquitous in applied science and engineering. To fill this gap, we build on prior work and present $\textbf{HARDMath2}$, a dataset of 211 original pr...

---

## 146. Grassmannian Manifold Optimization Assisted Sparse Spectral Clustering

**Authors:** Qiong Wang, Junbin Gao, Hong Li

**Year:** 2017 | **Venue:** CVPR 2017 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content_cvpr_2017/papers/Wang_Grassmannian_Manifold_Optimization_CVPR_2017_paper.pdf) | > Spectral Clustering is one of pioneered clustering methods in machine learning and pattern recognition field. It relies on the spectral decomposition criterion to learn a low-dimensonal embedding of data for a basic clustering algorithm such as the k-means. The recent sparse Spectral clustering (SSC) introduces the sparsity for the similarity in low-dimensional space by enforcing a sparsity-induce...

---

## 147. Manifold Learning via Foliations, and Knowledge Transfer

**Authors:** Eliot Tron, Rita Fioresi

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Understanding how real data is distributed in high dimensional spaces is the key to many tasks in machine learning. We want to provide a natural geometric structure on the space of data employing a deep ReLU neural network trained as a classifier. Through the data information matrix (DIM), a variation of the Fisher information matrix, the model will discern a singular foliation structure on the sp...

---

## 148. A Statistical Recurrent Model on the Manifold of Symmetric Positive Definite Matrices

**Authors:** Rudrasis Chakraborty, Chun-Hao Yang, Xingjian Zhen, Monami Banerjee, Derek Archer

**Year:** 2018 | **Venue:** NIPS 2018 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2018/file/7070f9088e456682f0f84f815ebda761-Paper.pdf) | > In a number of disciplines, the data (e.g., graphs, manifolds) to be
analyzed are non-Euclidean in nature.  Geometric deep learning
corresponds to techniques that generalize deep neural network models
to such non-Euclidean spaces. Several recent papers have shown how
convolutional neural networks (CNNs) can be extended to learn with
graph-based data.  In this work, we study the setting where the d...

---

## 149. Contrastive Self-Supervised Learning As Neural Manifold Packing

**Authors:** Guanming Zhang, David Heeger, Stefano Martiniani

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Contrastive self-supervised learning based on point-wise comparisons has been widely studied for vision tasks. In the visual cortex of the brain, neuronal responses to distinct stimulus classes are organized into geometric structures known as neural manifolds. Accurate classification of stimuli can be achieved by effectively separating these manifolds, akin to solving a packing problem. We introdu...

---

## 150. SpaceMAP: Visualizing Any Data in 2-dimension by Space Expansion

**Authors:** Xinrui Zu, Qian Tao

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> Dimensionality reduction (DR) and visualization of high-dimensional data is of theoretical and practical value in machine learning and related fields. In theory, there exists an intriguing, non-intuitive discrepancy between the geometry of high-dimensional space and low-dimensional space. Based on this discrepancy, we propose a novel DR and visualization method called Space-based Manifold Approxim...

---

## 151. Optimization on Multiple Manifolds

**Authors:** Mingyang Yi, Huishuai Zhang, Wei Chen, Zhi-ming Ma, Tie-yan Liu

**Year:** 2019 | **Venue:** ICLR 2019 | **Citations:** N/A | **Score:** 0.000

> Optimization on manifold has been widely used in machine learning, to handle optimization problems with constraint. Most previous works focus on the case with a single manifold. However, in practice it is quite common that the optimization problem involves more than one constraints, (each constraint corresponding to one manifold). It is not clear in general how to optimize on multiple manifolds ef...

---

## 152. Gradient flows on the feature-Gaussian manifold

**Authors:** Truyen Nguyen, Xinru Hua, Tam Le, Jose Blanchet, Viet Anh Nguyen

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> The scarcity of labeled data is a long-standing challenge for cross-domain machine learning tasks. This paper leverages the existing dataset (i.e., source) to augment new samples that are close to the dataset of interest (i.e., target). To relieve the need to learn a metric on the feature-label space, we lift both datasets to the space of probability distributions on the feature-Gaussian manifold,...

---

## 153. BrainFlow: A Holistic Pathway of Dynamic Neural System on Manifold

**Authors:** Zhixuan Zhou, Tingting Dan, Guorong Wu

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> A fundamental challenge in cognitive neuroscience is understanding how cognition emerges from the interplay between structural connectivity (SC) and dynamic functional connectivity (FC) in the brain. 
Network neuroscience has emerged as a powerful framework to understand brain function through a holistic perspective on structure-function relationships. In this context, current machine learning app...

---

## 154. Kokoyi: Executable LaTeX for End-to-end Deep Learning

**Authors:** Minjie Wang, Haoming Lu, Yu Gai, Lesheng Jin, Zihao Ye

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> Despite substantial efforts from the deep learning system community to relieve researchers and practitioners from the burden of implementing models with ever-growing complexity, a considerable lingual gap remains between developing models in the language of mathematics and implementing them in the languages of computer. The mission of Kokoyi is to close this gap by enabling automatic translation o...

---

## 155. CS-Bench: A Comprehensive Benchmark for Large Language Models towards Computer Science Mastery

**Authors:** Xiaoshuai Song, Muxi Diao, Guanting Dong, Zhengyang Wang, Yujia Fu

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

> Computer Science (CS) stands as a testament to the intricacies of human intelligence, profoundly advancing the development of artificial intelligence and modern society. However, the current community of large language models (LLMs) overly focuses on benchmarks for analyzing specific foundational skills (e.g. mathematics and code generation), neglecting an all-round evaluation of the computer scie...

---

## 156. From Abstract to Contextual: What LLMs Still Cannot Do in Mathematics

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Large language models now solve many benchmark math problems at near‑expert levels, yet this progress has not fully translated into reliable performance in real‑world applications. We study this gap through contextual mathematical reasoning, where the mathematical core must be formulated from descriptive scenarios.We introduce CORE-MATH, a benchmark that repurposes AIME and MATH-500 problems into ...

---

## 157. CombiGraph-Vis: A Multimodal Olympiad Benchmark for Discrete Mathematical Reasoning

**Authors:** Hamed Mahdavi, Pouria Mahdavinia, Alireza Farhadi, Pegah Mohammadipour, Samira Malek

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Progress on math-reasoning benchmarks such as GSM8K and MATH500 has eroded their ability to discriminate among strong systems, motivating harder tests that separate capabilities more sharply. We introduce CombiGraph-Vis, an Olympiad-style benchmark of 1,135 short-answer, multiple-choice, and yes/no problems drawn from the first and second rounds of the Iranian Informatics Olympiad, with 35% multim...

---

## 158. Canonical normalizing flows for manifold learning

**Authors:** Kyriakos Flouris, Ender Konukoglu

**Year:** 2023 | **Venue:** NIPS 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=yubwSWol6K) | > Manifold learning flows are a class of generative modelling techniques that assume a low-dimensional manifold description of the data. The embedding of such a manifold into the high-dimensional space of the data is achieved via learnable invertible transformations. Therefore, once the manifold is properly aligned via a reconstruction loss, the probability density is tractable on the manifold and m...

---

## 159. Learning a Manifold as an Atlas

**Authors:** Nikolaos Pitelis, Chris Russell, Lourdes Agapito

**Year:** 2013 | **Venue:** CVPR 2013 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content_cvpr_2013/papers/Pitelis_Learning_a_Manifold_2013_CVPR_paper.pdf) | > In this work, we return to the underlying mathematical definition of a manifold and directly characterise learning a manifold as finding an atlas, or a set of overlapping charts, that accurately describe local structure. We formulate the problem of learning the manifold as an optimisation that simultaneously refines the continuous parameters defining the charts, and the discrete assignment of poin...

---

## 160. MLFMF: Data Sets for Machine Learning for Mathematical Formalization

**Authors:** Andrej Bauer, Matej Petković, Ljupco Todorovski

**Year:** 2023 | **Venue:** NIPS 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=KZjSvE2mJz) | > We introduce MLFMF, a collection of data sets for benchmarking recommendation systems used to support formalization of mathematics with proof assistants. These systems help humans identify which previous entries (theorems, constructions, datatypes, and postulates) are relevant in proving a new theorem or carrying out a new construction. Each data set is derived from a library of formalized mathema...

---

## 161. The Sparse Manifold Transform

**Authors:** Yubei Chen, Dylan Paiton, Bruno Olshausen

**Year:** 2018 | **Venue:** NIPS 2018 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2018/file/8e19a39c36b8e5e3afd2a3b2692aea96-Paper.pdf) | > We present a signal representation framework called the sparse manifold transform that combines key ideas from sparse coding, manifold learning, and slow feature analysis. It turns non-linear transformations in the primary sensory signal space into linear interpolations in a representational embedding space while maintaining approximate invertibility. The sparse manifold transform is an unsupervis...

---

## 162. Manifold Learning Benefits GANs

**Authors:** Yao Ni, Piotr Koniusz, Richard Hartley, Richard Nock

**Year:** 2022 | **Venue:** CVPR 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2022/papers/Ni_Manifold_Learning_Benefits_GANs_CVPR_2022_paper.pdf) | > In this paper, we improve Generative Adversarial Networks by incorporating a manifold learning step into the discriminator. We consider locality-constrained linear and subspace-based manifolds, and locality-constrained non-linear manifolds. In our design, the manifold learning and coding steps are intertwined with layers of the discriminator, with the goal of attracting intermediate feature repres...

---

## 163. Learning Multiple Tasks using Manifold Regularization

**Authors:** Arvind Agarwal, Samuel Gerber, Hal Daume

**Year:** 2010 | **Venue:** NIPS 2010 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2010/file/2cbca44843a864533ec05b321ae1f9d1-Paper.pdf) | > We present a novel method for multitask learning (MTL) based on {\it manifold regularization}: assume that all task parameters lie on a manifold. This is the generalization of a common assumption made in the existing literature: task parameters share a common {\it linear} subspace. One proposed method uses the projection distance from the manifold to regularize the task parameters. The manifold st...

---

## 164. Video Motion Segmentation Using New Adaptive Manifold Denoising Model

**Authors:** Dijun Luo, Heng Huang

**Year:** 2014 | **Venue:** CVPR 2014 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content_cvpr_2014/papers/Luo_Video_Motion_Segmentation_2014_CVPR_paper.pdf) | > Video motion segmentation techniques automatically segment and track objects and regions from videos or image sequences as a primary processing step for many computer vision applications. We propose a novel motion segmentation approach for both rigid and non-rigid objects using adaptive manifold denoising.  We first introduce an adaptive kernel space in which two feature trajectories are mapped in...

---

## 165. Enhancing the Transformer with explicit relational encoding for math problem solving

**Authors:** Imanol Schlag, Paul Smolensky, Roland Fernandez, Nebojsa Jojic, Jürgen Schmidhuber

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> We incorporate Tensor-Product Representations within the Transformer in order to better support the explicit representation of relation structure.
Our Tensor-Product Transformer (TP-Transformer) sets a new state of the art on the recently-introduced Mathematics Dataset containing 56 categories of free-form math word-problems.
The essential component of the model is a novel attention mechanism, cal...

---

## 166. Generalized Unsupervised Manifold Alignment

**Authors:** Zhen Cui, Hong Chang, Shiguang Shan, Xilin Chen

**Year:** 2014 | **Venue:** NIPS 2014 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2014/file/f306a2961c3dcdd21904a759d51f4e22-Paper.pdf) | > In this paper, we propose a generalized Unsupervised Manifold Alignment (GUMA) method to build the connections between different but correlated datasets without any known correspondences. Based on the assumption that datasets of the same theme usually have similar manifold structures, GUMA is formulated into an explicit integer optimization problem considering the structure matching and preserving...

---

## 167. Flows for simultaneous manifold learning and density estimation

**Authors:** Johann Brehmer, Kyle Cranmer

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/051928341be67dcba03f0e04104d9047-Paper.pdf) | > We introduce manifold-learning flows (ℳ-flows), a new class of generative models that simultaneously learn the data manifold as well as a tractable probability density on that manifold. Combining aspects of normalizing flows, GANs, autoencoders, and energy-based models, they have the potential to represent data sets with a manifold structure more faithfully and provide handles on dimensionality re...

---

## 168. Neural Manifold Ordinary Differential Equations

**Authors:** Aaron Lou, Derek Lim, Isay Katsman, Leo Huang, Qingxuan Jiang

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/cbf8710b43df3f2c1553e649403426df-Paper.pdf) | > To better conform to data geometry, recent deep generative modelling techniques adapt Euclidean constructions to non-Euclidean spaces. In this paper, we study normalizing flows on manifolds. Previous work has developed flow models for specific cases; however, these advancements hand craft layers on a manifold-by-manifold basis, restricting generality and inducing cumbersome design constraints. We ...

---

## 169. Charting a Manifold

**Authors:** Matthew Brand

**Year:** 2002 | **Venue:** NIPS 2002 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2002/file/8929c70f8d710e412d38da624b21c3c8-Paper.pdf) | > We construct a nonlinear mapping from a high-dimensional sample space to a low-dimensional vector space, effectively recovering a Cartesian coordinate system for the manifold from which the data is sampled. The mapping preserves local geometric relations in the manifold and is pseudo-invertible. We show how to estimate the intrinsic dimensionality of the manifold from samples, decompose the sample...

---

## 170. Minimum Curvature Manifold Learning

**Authors:** Yonghyeon Lee, Frank C. Park

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

> It is widely observed that vanilla autoencoders can have low manifold learning accuracy given a noisy or small training dataset. 
Recent work has discovered that it is important to regularize the decoder that explicitly parameterizes the manifold, 
where a neighborhood graph is employed for decoder regularization. However, one caveat of this method is that it is not always straightforward to const...

---

## 171. Recovering Manifold Structure Using Ollivier Ricci Curvature

**Authors:** Tristan Luca Saidi, Abigail Hickok, Andrew J. Blumberg

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=aX7X9z3vQS) | > We introduce ORC-ManL, a new algorithm to prune spurious edges from nearest neighbor graphs using a criterion based on Ollivier-Ricci curvature and estimated metric distortion. Our motivation comes from manifold learning: we show that when the data generating the nearest-neighbor graph consists of noisy samples from a low-dimensional manifold, edges that shortcut through the ambient space have mor...

---

## 172. Parametric Manifold Learning Via Sparse Multidimensional Scaling

**Authors:** Gautam Pai, Ronen Talmon, Ron Kimmel

**Year:** 2018 | **Venue:** ICLR 2018 | **Citations:** N/A | **Score:** 0.000

> We propose a metric-learning framework for computing distance-preserving maps that generate low-dimensional embeddings for a certain class of manifolds. We employ Siamese networks to solve the problem of least squares multidimensional scaling for generating mappings that preserve geodesic distances on the manifold. In contrast to previous parametric manifold learning methods we show a substantial ...

---

## 173. Human Body Shape Estimation Using a Multi-Resolution Manifold Forest

**Authors:** Frank Perbet, Sam Johnson, Minh-Tri Pham, Bjorn Stenger

**Year:** 2014 | **Venue:** CVPR 2014 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content_cvpr_2014/papers/Perbet_Human_Body_Shape_2014_CVPR_paper.pdf) | > This paper proposes a method for estimating the 3D body shape of a person with robustness to clothing. We formulate the problem as optimization over the manifold of valid depth maps of body shapes learned from synthetic training data. The manifold itself is represented using a novel data structure, a Multi-Resolution Manifold Forest (MRMF), which contains vertical edges between tree nodes as well ...

---

## 174. Paramanu-Ganita: An Efficient Pre-trained Generative Mathematics Language Model with Chain-of-Thought Instruction Fine-Tuning

**Authors:** Mitodru Niyogi, Arnab Bhattacharya

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> In this paper, we pose the following question: whether domain specific pretraining of tiny generative language models from scratch with domain specialized tokenizer and Chain-of-Thought (CoT) instruction fine-tuning results in very competitive performance on mathematical reasoning than LLMs which are trained on trillion of tokens and humongous parameters? Secondly, we pose our second RQ: whether d...

---

## 175. An Information Geometry of Statistical Manifold Learning

**Authors:** Ke Sun, Stéphane Marchand-Maillet

**Year:** 2014 | **Venue:** ICML 2014 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v32/suna14.pdf) | > Manifold learning seeks low-dimensional representations of high-dimensional data. The main tactics have been exploring the geometry in an input data space and an output embedding space. We develop a manifold learning theory in a hypothesis space consisting of models. A model means a specific instance of a collection of points, e.g., the input data collectively or the output embedding collectively....

---

## 176. Neural Manifold Clustering and Embedding

**Authors:** ZENGYI LI, Yubei Chen, Yann LeCun, Friedrich Sommer

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> Given a union of non-linear manifolds, non-linear subspace clustering or manifold clustering aims to cluster data points based on manifold structures and also learn to parameterize each manifold as a linear subspace in a feature space. Deep neural networks have the potential to achieve this goal under highly non-linear settings given their large capacity and flexibility. We argue that achieving ma...

---

## 177. Scaling up Multi-Turn Off-Policy RL and Multi-Agent Tree Search for LLM Step-Provers

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> The integration of Large Language Models (LLMs) with automated theorem proving has shown immense promise, yet is constrained by challenges in scaling up both training-time reinforcement learning (RL) and inference-time compute. This paper introduces BFS-Prover-V2, a step-level theorem proving system designed to address this dual scaling problem. We present two primary innovations. The first is a n...

---

## 178. Sparse Representation Classification With Manifold Constraints Transfer

**Authors:** Baochang Zhang, Alessandro Perina, Vittorio Murino, Alessio Del Bue

**Year:** 2015 | **Venue:** CVPR 2015 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content_cvpr_2015/papers/Zhang_Sparse_Representation_Classification_2015_CVPR_paper.pdf) | > The fact that image data samples lie on a manifold has been successfully exploited in many learning and inference problems. In this paper we leverage the specific structure of data in order to improve recognition accuracies in general recognition tasks. In particular we propose a novel framework that allows to embed manifold priors into sparse representation-based classification (SRC) approaches. ...

---

## 179. MKPLS: Manifold Kernel Partial Least Squares for Lipreading and Speaker Identification

**Authors:** Amr Bakry, Ahmed Elgammal

**Year:** 2013 | **Venue:** CVPR 2013 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content_cvpr_2013/papers/Bakry_MKPLS_Manifold_Kernel_2013_CVPR_paper.pdf) | > Visual speech recognition is a challenging problem, due to confusion between visual speech features. The speaker identification problem is usually coupled with speech recognition. Moreover, speaker identification is important to several applications, such as automatic access control, biometrics, authentication, and personal privacy issues. In this paper, we propose a novel approach for lipreading ...

---

## 180. A hybrid machine learning framework by incorporating categorical boosting and manifold learning for financial analysis

**Authors:** Yuyang Zhao, Hongbo Zhao

**Year:** 2025 | **Venue:** Intell. Syst. Appl. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1016/J.ISWA.2024.200473)

> ...

---

## 181. Privacy Preservation for Machine Learning in IIoT Data via Manifold Learning and Elementary Row Operations

**Authors:** Emrullah Fatih Yetkin, Tugçe Balli

**Year:** 2025 | **Venue:** ICISSP | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.5220/0013275000003899)

> ...

---

## 182. Manifold Learning of Neural Representations for Efficient Machine Learning Systems

**Authors:** Kion Fallah

**Year:** 2024 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> ...

---

## 183. Homogeneous ensemble extreme learning machine autoencoder with mutual representation learning and manifold regularization for medical datasets

**Authors:** Wenjian Chen, Xiaoyun Chen, Yanming Lin

**Year:** 2023 | **Venue:** Appl. Intell. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1007/S10489-022-04284-8)

> ...

---

## 184. Hybrid Precoding Design in MmWave MIMO Systems Using Manifold Learning-Based Extreme Learning Machine Framework

**Authors:** Meng Wang, Chen Liu 0005, Yunchao Song, Huibin Liang, Zheng Huang

**Year:** 2023 | **Venue:** ICCT | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/ICCT59356.2023.10419685)

> ...

---

## 185. Towards more reliable machine learning: conceptual insights and practical approaches for unsupervised manifold learning and supervised benchmark studies

**Authors:** Moritz Herrmann

**Year:** 2022 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> ...

---

## 186. Manifold semi-supervised learning for aluminum electrolysis temperature identification based on regularized hierarchical extreme learning machine

**Authors:** Yongxiang Lei, Fang Liu, Hamid Reza Karimi, Xiaofang Chen

**Year:** 2022 | **Venue:** J. Syst. Control. Eng. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1177/09596518221082857)

> ...

---

## 187. Regularizing extreme learning machine by dual locally linear embedding manifold learning for training multi-label neural network classifiers

**Authors:** Mohammad Rezaei-Ravari, Mahdi Eftekhari, Farid Saberi Movahed

**Year:** 2021 | **Venue:** Eng. Appl. Artif. Intell. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1016/J.ENGAPPAI.2020.104062)

> ...

---

## 188. Identifying high-risk pregnancies in rural areas with machine-manifold learning

**Authors:** Ignacio Prieto-Egido, Alicia Guerrero-Curieses, Andrés Martínez-Fernández, José Luis Rojo-Álvarez

**Year:** 2026 | **Venue:** Eng. Appl. Artif. Intell. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1016/J.ENGAPPAI.2025.112852)

> ...

---

## 189. Filtering and machine learning on Riemannian manifolds and Lie groups

**Authors:** Samy Labsir, Sara El Bouch, Claudio J. Bordin, Marcelo G. S. Bruno

**Year:** 2026 | **Venue:** Signal Process. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1016/J.SIGPRO.2025.110114)

> ...

---

## 190. Link Scheduling in Satellite Networks via Machine Learning Over Riemannian Manifolds

**Authors:** Joarder Jafor Sadique, Imtiaz Nasim, Ahmed S. Ibrahim 0001

**Year:** 2025 | **Venue:** IEEE Open J. Commun. Soc. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/OJCOMS.2025.3533296)

> ...

---

## 191. Machine Learning Gravity Compactifications on Negatively Curved Manifolds

**Authors:** Giuseppe Bruno De Luca

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2501.00093)

> ...

---

## 192. Physics-consistent machine learning: output projection onto physical manifolds

**Authors:** Matilde Valente Rosa, Tiago C. Dias, Vasco Guerra, Rodrigo M. M. Ventura

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2502.15755)

> ...

---

## 193. Analytical Discovery of Manifold with Machine Learning

**Authors:** Yafei Shen, Huan-Fei Ma 0001, Ling Yang

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2504.02511)

> ...

---

## 194. Categorical and geometric methods in statistical, manifold, and machine learning

**Authors:** Hông Vân Lê, Hà Quang Minh, Frédéric Protin, Wilderich Tuschmann

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2505.03862)

> ...

---

## 195. A new methodology to decompose a parametric domain using reduced order data manifold in machine learning

**Authors:** Chetra Mang, Axel Tahmasebimoradi, Mouadh Yagoubi

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2505.08497)

> ...

---

## 196. Optimizing Flamelet Generated Manifold Models: A Machine Learning Performance Study

**Authors:** Reza Lotfi Navaei, Mohammad Safarzadeh, Seyed Mohammad Jafar Sobhani

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2507.01030)

> ...

---

## 197. Atlas-based Manifold Representations for Interpretable Riemannian Machine Learning

**Authors:** Ryan A. Robinett, Sophia A. Madejski, Kyle Ruark, Samantha J. Riesenfeld, Lorenzo Orecchia

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2510.17772)

> ...

---

## 198. Parametric Nonlinear Model Reduction Using Machine Learning on Grassmann Manifold with an Application on a Flow Simulation

**Authors:** Norapon Sukuntee, Saifon Chaturantabut

**Year:** 2024 | **Venue:** J. Nonlinear Sci. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1007/S00332-024-10039-1)

> ...

---

## 199. Terrain-Based Coverage Manifold Estimation: Machine Learning, Stochastic Geometry, or Simulation?

**Authors:** Ruibo Wang, Washim Uddin Mondal, Mustafa A. Kishk, Vaneet Aggarwal, Mohamed-Slim Alouini

**Year:** 2024 | **Venue:** IEEE Open J. Commun. Soc. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/OJCOMS.2023.3340222)

> ...

---

## 200. Slow Invariant Manifolds of Singularly Perturbed Systems via Physics-Informed Machine Learning

**Authors:** Dimitrios G. Patsatzis, Gianluca Fabiani, Lucia Russo, Constantinos I. Siettos

**Year:** 2024 | **Venue:** SIAM J. Sci. Comput. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1137/23M1602991)

> ...

---

## 201. Radar Sensing via Geometric Machine Learning Over Riemannian Manifolds

**Authors:** Joarder Jafor Sadique, Imtiaz Nasim, Ahmed S. Ibrahim 0001

**Year:** 2024 | **Venue:** ICCSPA | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/ICCSPA61559.2024.10794182)

> ...

---

## 202. Kuramoto Oscillators and Swarms on Manifolds for Geometry Informed Machine Learning

**Authors:** Vladimir Jacimovic

**Year:** 2024 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2405.09453)

> ...

---

## 203. Robust discriminant latent variable manifold learning for rotating machinery fault diagnosis

**Authors:** Changyuan Yang, Sai Ma, Qinkai Han

**Year:** 2023 | **Venue:** Eng. Appl. Artif. Intell. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1016/J.ENGAPPAI.2023.106996)

> ...

---

## 204. Semi-supervised machinery health assessment framework via temporal broad learning system embedding manifold regularization with unlabeled data

**Authors:** Yudong Cao, Minping Jia, Xiaoli Zhao 0002, Xiaoan Yan, Zheng Liu 0002

**Year:** 2023 | **Venue:** Expert Syst. Appl. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1016/J.ESWA.2023.119824)

> ...

---

## 205. Unified discriminant manifold learning for rotating machinery fault diagnosis

**Authors:** Changyuan Yang, Sai Ma, Qinkai Han

**Year:** 2023 | **Venue:** J. Intell. Manuf. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1007/S10845-022-02011-1)

> ...

---

## 206. Towards a Machine Learning Pipeline in Reduced Order Modelling for Inverse Problems: Neural Networks for Boundary Parametrization, Dimensionality Reduction and Solution Manifold Approximation

**Authors:** Anna Ivagnes, Nicola Demo, Gianluigi Rozza

**Year:** 2023 | **Venue:** J. Sci. Comput. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1007/S10915-023-02142-4)

> ...

---

## 207. Fall Detection using Machine Learning Techniques and Frequency-Driven Riemannian Manifolds

**Authors:** Shan Suthaharan

**Year:** 2023 | **Venue:** ICMLA | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/ICMLA58977.2023.00035)

> ...

---

## 208. Geometric Machine Learning Over Riemannian Manifolds for Wireless Link Scheduling

**Authors:** Rashed Shelim, Ahmed S. Ibrahim 0001

**Year:** 2022 | **Venue:** IEEE Access | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/ACCESS.2022.3153324)

> ...

---

## 209. Towards a classification of sustainable software development process using manifold machine learning techniques

**Authors:** Mohammed Hamdi

**Year:** 2022 | **Venue:** J. Intell. Fuzzy Syst. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.3233/JIFS-212600)

> ...

---

## 210. Prototype Regularized Manifold Regularization Technique for Semi-Supervised Online Extreme Learning Machine

**Authors:** Muhammad Zafran Bin Muhammad Zaly Shah, Anazida Binti Zainal, Fuad A. Ghaleb, Abdulrahman Alqarafi, Faisal Saeed

**Year:** 2022 | **Venue:** Sensors | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.3390/S22093113)

> ...

---

## 211. 3-Dimensional Manifold and Machine Learning Based Localization Algorithm for Wireless Sensor Networks

**Authors:** Y. Harold Robinson, S. Vimal 0001, Eanoch Golden Julie, K. Lakshmi Narayanan, Seungmin Rho

**Year:** 2022 | **Venue:** Wirel. Pers. Commun. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1007/S11277-021-08291-9)

> ...

---

## 212. Machine Learning on generalized Complete Intersection Calabi-Yau Manifolds

**Authors:** Wei Cui, Xin Gao, Juntao Wang

**Year:** 2022 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2209.10157)

> ...

---

## 213. Motifs and Manifolds Statistical and Topological Machine Learning for Characterising and Classifying Biomedical Time Series

**Authors:** Christian Bock

**Year:** 2021 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.3929/ETHZ-B-000524042)

> ...

---

## 214. Manifold regularization ensemble clustering with many objectives using unsupervised extreme learning machines

**Authors:** Haleh Homayouni, Eghbal G. Mansoori

**Year:** 2021 | **Venue:** Intell. Data Anal. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.3233/IDA-205362)

> ...

---

## 215. Novel Convolutional Restricted Boltzmann Machine manifold learning inspired dynamic user clustering hybrid precoding for millimeter-wave massive multiple-input multiple-output systems

**Authors:** Xiaoping Zhou, Haichao Liu, Bin Wang 0052, Qian Zhang 0033, Yang Wang 0060

**Year:** 2021 | **Venue:** Int. J. Distributed Sens. Networks | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1177/15501477211055376)

> ...

---

## 216. Fusion of 2.5D Face Recognition through Extreme Learning Machine via Manifold Flattening

**Authors:** Lee-Ying Chong, Siew Chin Chong

**Year:** 2021 | **Venue:** ICSIPA | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/ICSIPA52582.2021.9576768)

> ...

---

## 217. Solving PDEs on Unknown Manifolds with Machine Learning

**Authors:** Senwei Liang, Shixiao W. Jiang, John Harlim, Haizhao Yang

**Year:** 2021 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

> ...

---

## 218. The Dimpled Manifold Model of Adversarial Examples in Machine Learning

**Authors:** Adi Shamir, Odelia Melamed, Oriel BenShmuel

**Year:** 2021 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

> ...

---

## 219. Machine learning a manifold

**Authors:** Sean Craven, Djuna Croon, Daniel Cutting, Rachel Houtz

**Year:** 2021 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

> ...

---

## 220. Differential Evolution Based Manifold Gaussian Process Machine Learning for Microwave Filter&apos;s Parameter Extraction

**Authors:** Xuezhi Chen, Yubo Tian, Tianliang Zhang, Jing Gao

**Year:** 2020 | **Venue:** IEEE Access | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/ACCESS.2020.3015043)

> ...

---

## 221. Manifold for machine learning assurance

**Authors:** Taejoon Byun, Sanjai Rayadurgam

**Year:** 2020 | **Venue:** ICSE | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1145/3377816.3381734)

> ...

---

## 222. Machine learning for complete intersection Calabi-Yau manifolds: a methodological study

**Authors:** Harold Erbin, Riccardo Finotello

**Year:** 2020 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

> ...

---

## 223. An Updated Efficient Galaxy Morphology Classification Model Based on ConvNeXt Encoding with UMAP Dimensionality Reduction

**Authors:** Guanwen Fang, Shiwei Zhu, Jun Xu, Shiying Lu, Chichun Zhou

**Year:** 2026 | **Venue:** The Astronomical Journal | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.3847/1538-3881/ae2324) | [DOI](https://doi.org/10.3847/1538-3881/ae2324)

> Abstract We present an enhanced unsupervised machine learning (UML) module within our previous USmorph classification framework featuring two components: (1) hierarchical feature extraction via a pretrained ConvNeXt convolutional neural network with transfer learning, and (2) nonlinear manifold learning using uniform manifold approximation and projection (UMAP) for topology-aware dimensionality re...

---

## 224. Estimación de emisiones por fallos en motores Otto mediante redes neuronales convolucionales

**Authors:** Elmer I. Arias-Montaño, Rogelio S. León-Japa, Pedro García-Jaramillo, José Maldonado Ortega

**Year:** 2026 | **Venue:** Ingenius | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.17163/ings.n35.2026.07) | [DOI](https://doi.org/10.17163/ings.n35.2026.07)

> This study applies a machine learning technique, specifically Convolutional Neural Networks (CNNs), to predict pollutant emissions resulting from failures in actuators and components of Otto engines. The work addresses the current lack of non-intrusive methods that exploit signals already available in the vehicle to estimate, with high accuracy, emissions associated with failures in the injection,...

---

## 225. Quantum Interaction Manifolds for Cancer Genomics: A Theoretical Framework and Proof-of-Concept Quantum Machine Learning for Early Diagnosis and Drug Response Modeling

**Authors:** Parham Ghayour

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.researchsquare.com/article/rs-8378659/latest.pdf) | [DOI](https://doi.org/10.21203/rs.3.rs-8378659/v1)

> <title>Abstract</title> Understanding and predicting cancer phenotypes from genomic data requires models capableof capturing high-order interactions among genes and biological pathways. We introduce Quantum Interaction Manifolds (QIMs), a theoretical framework that represents gene expression profiles as quantumstates evolved under biologically informed Hamiltonians. We show that QIM embeddings ind...

---

## 226. Extreme Dimensional Expansion: Topological Manifold Projections from 15-Dimensional to 700+ Dimensional Spaces with Near-Perfect Efficiency and Preservation

**Authors:** Alex Kim

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18094236) | [DOI](https://doi.org/10.5281/zenodo.18094236)

> This paper presents a rigorous mathematical framework for extreme dimensional expansion operations that transform 15-dimensional mathematical structures into 700+ dimensional spaces while maintaining exceptional efficiency and information preservation. We establish the theoretical foundation for topological manifold expansion operations, demonstrating that 15-dimensional spaces can be expanded to ...

---

## 227. Information Geometry and the Variational Structure of Physical Dynamics: A Rigorous Foundation

**Authors:** Anthony L Perry

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18102165) | [DOI](https://doi.org/10.5281/zenodo.18102165)

> We develop a mathematically rigorous variational principle on statistical manifolds equipped with the Fisher information metric. Starting from seven axioms characterizingdistinguishability between probability distributions, we prove that the Fisher metric is the unique (up to scaling) Riemannian structure satisfying these information-theoreticrequirements. We then demonstrate that geodesic motion ...

---

## 228. Machine learning–driven analysis of celiac disease to elucidate shared transcriptomic signatures with diffuse large B-cell lymphoma

**Authors:** Amir Mahdi Taghizadeh

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.21203/rs.3.rs-8427947/v1) | [DOI](https://doi.org/10.21203/rs.3.rs-8427947/v1)

> <title>Abstract</title> Celiac disease is an immune-mediated disorder primarily affecting the small intestine, while diffuse large B-cell lymphoma (DLBCL) is the most common subtype of non-Hodgkin lymphoma. Although clinical and epidemiological observations suggest an increased risk of lymphoma among patients with autoimmune diseases, the molecular mechanisms linking celiac disease to DLBCL remain...

---

## 229. Schrodinger AI: A Unified Spectral-Dynamical Framework for Classification, Reasoning, and Operator-Based Generalization

**Authors:** Truong Son Nguyen

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.22774) | [DOI](https://doi.org/10.48550/arxiv.2512.22774)

> We introduce \textbf{Schrödinger AI}, a unified machine learning framework inspired by quantum mechanics. The system is defined by three tightly coupled components: (1) a {time-independent wave-energy solver} that treats perception and classification as spectral decomposition under a learned Hamiltonian; (2) a {time-dependent dynamical solver} governing the evolution of semantic wavefunctions over...

---

## 230. Algorithmic Induction via Structural Weight Transfer

**Authors:** Gris Iscomeback

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18072858) | [DOI](https://doi.org/10.5281/zenodo.18072858)

> # Structural Weight Transfer for Grokked Algorithmic Cassettes: A Unified Framework for Zero-Shot Transfer of Physical and Logical Laws **grisun0** --- ## Abstract We present Grokkit, a unified framework for extracting, expanding, composing, and fusing neural networks that have grokked compact algorithmic or physical laws. The framework treats grokked models as modular primitives—termed "algorithm...

---

## 231. Geometric Contraction on an Invariant-Constrained Manifold: A 42-Step Folding Trajectory for the Villin Headpiece HP35

**Authors:** Dimitrios Christodoulou

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18061111) | [DOI](https://doi.org/10.5281/zenodo.18061111)

> This record provides the reproducibility package accompanying a deterministic geometric model of protein folding applied to the villin headpiece HP35. Folding is formulated as a constraint-based geometric contraction on an invariant-constrained admissible manifold, without explicit energetic potentials, stochastic sampling, or machine-learning components.The main manuscript describes a reproducibl...

---

## 232. Iterative Entropic Renormalization: A Geometric Framework for Distributional Convergence and Spectral Stabilization

**Authors:** Mark Lindenhayn

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18064194) | [DOI](https://doi.org/10.5281/zenodo.18064194)

> This paper introduces the concept of Iterative Entropic Renormalization (IER), a geometric and operator-based framework describing how probability distributions self-stabilize through successive truncation, normalization, and entropy rebalancing. The process formalizes the transition from heavy-tailed or irregular distributions toward a universal Gaussian equilibrium, showing that entropy acts as ...

---

## 233. SMART METADATA MANAGEMENT FOR PRINT ARCHIVES

**Authors:** Rohit Chandwaskar, Sathyabalaji Kannan, Srikanta Kumar Sahoo, Rashmi Manhas, Takveer Singh

**Year:** 2025 | **Venue:** ShodhKosh Journal of Visual and Performing Arts | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.granthaalayahpublication.org/Arts-Journal/ShodhKosh/article/download/6839/6324) | [DOI](https://doi.org/10.29121/shodhkosh.v6.i4s.2025.6839)

> Metacognitive metadata management of print archives is one of the essential steps that must be taken to integrate the old archival methodology with the new digital intelligence. With the shift of the cultural institution and libraries towards dynamic digital environments, replacing the static cataloging systems with the dynamic digital ecosystems, the needs of making the metadata efficient, accura...

---

## 234. Protein Interaction Prediction via Spectral Thermodynamics: A Linear Algebra Revolution achieving 99% Accuracy on the Human Proteome (Project Resonance)

**Authors:** Pirolo Andres Sebastian

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18042675) | [DOI](https://doi.org/10.5281/zenodo.18042675)

> Abstract The prediction of Protein-Protein Interactions (PPI) is a central problem in systems biology. Current paradigms are inefficient: biophysical simulations are computationally intractable for interactome-wide screening, while Deep Learning architectures suffer from opacity and reliance on prohibitive GPU infrastructure. In this work, we introduce Project Resonance, an alignment-free framewor...

---

## 235. Protein Interaction Prediction via Spectral Thermodynamics: A Linear Algebra Revolution achieving 92% Accuracy without GPUs (Project Resonance)

**Authors:** Pirolo Andres Sebastian

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18042120) | [DOI](https://doi.org/10.5281/zenodo.18042120)

> Abstract The prediction of Protein-Protein Interactions (PPI) is a central problem in systems biology. Current paradigms are inefficient: biophysical simulations are computationally intractable for interactome-wide screening, while Deep Learning architectures suffer from opacity and reliance on prohibitive GPU infrastructure. This creates a "computational divide" that hinders global scientific pro...

---

## 236. Protein Interaction Prediction via Spectral Thermodynamics: A Linear Algebra Revolution achieving 92% Accuracy without GPUs

**Authors:** Pirolo Andres Sebastian

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18042287) | [DOI](https://doi.org/10.5281/zenodo.18042287)

> Abstract The prediction of Protein-Protein Interactions (PPI) is a central problem in systems biology. Current paradigms are inefficient: biophysical simulations are computationally intractable for interactome-wide screening, while Deep Learning architectures suffer from opacity and reliance on prohibitive GPU infrastructure. This creates a "computational divide" that hinders global scientific pro...

---

## 237. Unified Optimization Framework: Integrating 15-Dimensional Exponential Meta Theorem, Computational Pattern Detection, and Dimensional Folding for Exponential Complexity Reduction

**Authors:** Alex Kim

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18005508) | [DOI](https://doi.org/10.5281/zenodo.18005508)

> We present a unified optimization framework that integrates the 15-Dimensional Exponential Meta Theorem, five computational pattern types, and dimensional folding algorithms to achieve exponential complexity reduction. The framework combines pattern detection through 15-D dimension analysis, optimal dimension selection, 15D→7D dimensional folding with 98.20% efficiency and 97.45% information prese...

---

## 238. UTHA: Unified Theory of Human Agency. The Anthropomorphic Instance (Class A) of the General Theory of Physical Agency.

**Authors:** C Valdepenas

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17994553) | [DOI](https://doi.org/10.5281/zenodo.17994553)

> Abstract This document presents the Unified Theory of Human Agency (UTHA) as the rigorous layer-4 instantiation of the General Theory of Physical Agency (GTPA). Operating within the dynamical constraints of TECD and the geometric substrate of UFD, UTHA redefines the human condition not as a collection of evolutionary defects, but as an optimal thermodynamic solution for Non-Ergodic Territories. By...

---

## 239. NYCH: A Canonical Kernel and Oracle-Based Protocol for Latent Manifold Navigation

**Authors:** Nicholas Hartman

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17984059) | [DOI](https://doi.org/10.5281/zenodo.17984059)

> This preprint introduces NYCH, a deterministic protocol for latent manifold navigation in existing machine learning models. The framework defines a canonical set of transcription kernels that map gate-state trajectories into geometric manifolds, along with an Oracle layer that performs policy-driven navigation over those manifolds without modifying underlying model parameters. NYCH enforces strict...

---

## 240. Alzheimer's Disease Brain Network Mining

**Authors:** Alireza Moayedikia, Sara Fin

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.17276) | [DOI](https://doi.org/10.48550/arxiv.2512.17276)

> Machine learning approaches for Alzheimer's disease (AD) diagnosis face a fundamental challenges. Clinical assessments are expensive and invasive, leaving ground truth labels available for only a fraction of neuroimaging datasets. We introduce Multi view Adaptive Transport Clustering for Heterogeneous Alzheimer's Disease (MATCH-AD), a semi supervised framework that integrates deep representation l...

---

## 241. j-IR-vis: Vision model for Infrared spectroscopy embeddings

**Authors:** Rudra Sondhi, E. CHACKO, Rodrigo A. Vargas–Hernández

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.26434/chemrxiv-2025-d0j2v) | [DOI](https://doi.org/10.26434/chemrxiv-2025-d0j2v)

> Infrared (IR) spectroscopy provides rich structural information but interpreting spectra at scale remains challenging. Here we introduce j-IR-vis, a vision-based neural model that learns chemically interpretable representations directly from IR spectra for functional-group prediction and downstream molecular characterization. Trained separately on simulated ($\D_{sim}$) and experimental ($\D_{exp}...

---

## 242. The Universe Learning Itself: On the Evolution of Dynamics from the Big Bang to Machine Intelligence

**Authors:** Singh, Pradeep, Rushikesh, Mudasani, Anurag, Bezawada Sri Sai, Raman, Balasubramanian

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.16515) | [DOI](https://doi.org/10.48550/arxiv.2512.16515)

> We develop a unified, dynamical-systems narrative of the universe that traces a continuous chain of structure formation from the Big Bang to contemporary human societies and their artificial learning systems. Rather than treating cosmology, astrophysics, geophysics, biology, cognition, and machine intelligence as disjoint domains, we view each as successive regimes of dynamics on ever-richer state...

---

## 243. An Energetic Account of Linguistic Structure

**Authors:** Grimes, J. R.

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17978566) | [DOI](https://doi.org/10.5281/zenodo.17978566)

> Human languages appear unnecessarily complex under classical information theory: they contain redundancy, layered grammatical cues, long-distance dependencies, and predictable syntactic channels that seemingly reduce compression efficiency. Recent work by Futrell and Hahn (2025) shows that this apparent extravagance systematically lowers predictive-information load, reducing the real-time processi...

---

## 244. High-order expansion of neural ordinary differential equation flows

**Authors:** Dario Izzo, Sebastien Origer, Giacomo Acciarini, Francesco Biscani

**Year:** 2025 | **Venue:** Science Advances | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.1126/sciadv.ady1348) | [DOI](https://doi.org/10.1126/sciadv.ady1348)

> Artificial neural networks, widely recognized for their role in machine learning, are also transforming the study of ordinary differential equations (ODEs), bridging data-driven modeling with classical dynamical systems as well as enabling the development of infinitely deep neural models. However, their practical applicability remains, in this context, constrained by the opacity of the learned dyn...

---

## 245. Accelerating High-Throughput Catalyst Screening by Direct Generation of Equilibrium Adsorption Structures

**Authors:** Huo, Songze, Cao, Xiao-Ming

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.15228) | [DOI](https://doi.org/10.48550/arxiv.2512.15228)

> The adsorption energy serves as a crucial descriptor for the large-scale screening of catalysts. Nevertheless, the limited distribution of training data for the extensively utilised machine learning interatomic potential (MLIP), predominantly sourced from near-equilibrium structures, results in unreliable adsorption structures and consequent adsorption energy predictions. In this context, we prese...

---

## 246. Optimal control, quantification and machine learning in spin dynamics

**Authors:** Uluk Rasulov

**Year:** 2025 | **Venue:** ePrints Soton (University of Southampton) | **Citations:** N/A | **Score:** 0.000

> Control and simulation of spin dynamics face two persistent bottlenecks: instrument-induced distortions that warp optimised pulses, and the near universal piecewise-constant approximation of the Hamiltonian. The latter is the lowest order Lie-solver that degrades under fast timing and realistic hardware responses. This thesis addresses both.<br/><br/>From first principles, piecewise-linear and pie...

---

## 247. EARTHQUAKE FAULT MECHANISM PREDICTION USING AI ALGORITHMS APPLIED TO STRONG MOTION RECORDS

**Authors:** F. Y épez, D. Benítez, N. Perez, F. Grijalva

**Year:** 2025 | **Venue:** World Conference of Earthquake Engineering | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.71846/18-wcee-0835) | [DOI](https://doi.org/10.71846/18-wcee-0835)

> Earthquake mechanisms are the results of a moment tensor solution for the earthquake, and several methods such as the first motions polarity, waveform inversion, etc., are applied to seismograms for understanding the earthquake rupture and the slip direction, including strike, dip, and rake angles. On the other hand, the number of available strong-motion earthquake records worldwide has increased ...

---

## 248. Modeling treatment effect heterogeneity in prophylactic lumbar drainage: a Double Machine Learning reanalysis of EARLYDRAIN

**Authors:** Shrinit Babel, Syed R. H. Peeran, Gandham Edmond Jonathan

**Year:** 2025 | **Venue:** Artificial Intelligence Surgery | **Citations:** N/A | **Score:** 0.000

[PDF](https://f.oaes.cc/xmlpdf/published/article/37cb1c3c3e7d1199cc52ef302240a8b2/ais5075.pdf) | [DOI](https://doi.org/10.20517/ais.2025.75)

> Aim: The EARLYDRAIN trial illustrated that prophylactic lumbar drainage (LD) could reduce poor outcomes in patients with aneurysmal subarachnoid hemorrhage, although not uniformly. We aim to reanalyze trial data using Double Machine Learning (DML) to estimate individualized treatment effects and identify patients or patient subgroups most likely to benefit. Methods: We applied a DML framework with...

---

## 249. QFED-MAZARI: A Unified Architecture for Privacy-Preserving Quantum Federated Learning with the Mazari Quantum Ordering

**Authors:** MAZARI, Ilyes Tarik, Mazari, Yanis, Mazari, Ilyan

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17929441) | [DOI](https://doi.org/10.5281/zenodo.17929441)

> Quantum federated learning (QFL) promises to combine the computational advantages of quantum machine learning with the privacy benefits of federated architectures. However, existing QFL approaches fundamentally misapply classical federated learning techniques to quantum systems, treating quantum parameters as classical vectors and ignoring the geometric structure of unitary operators. We introduce...

---

## 250. Compression Complementarity in Dual-Frame Information Theory

**Authors:** Wells, A.R.

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17926720) | [DOI](https://doi.org/10.5281/zenodo.17926720)

> Modern artificial intelligence systems and cognitive models routinely rely on both discrete symbolic structures (such as tokens, clusters, or categories) and continuous geometric or harmonic structures (such as embeddings, manifolds, and spectral coherence). Despite their ubiquity, there is no widely accepted information-theoretic framework explaining why these two forms of representation must coe...

---

## 251. A Biologically Grounded Structural Causal Model Enables cfRNA Specific In-Context Learning

**Authors:** Ryan Kim, Beomsoo Kim, Hyunjin Kim, Sang-Don Lee

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.64898/2025.12.10.693604) | [DOI](https://doi.org/10.64898/2025.12.10.693604)

> Abstract Cell-free RNA (cfRNA) in human plasma provides a minimally invasive readout of tissue physiology, yet its extreme sparsity, heavy-tailed abundance distributions, and weak but structured correlation patterns create major challenges for machine learning. Conventional tabular foundation models are typically trained on synthetic datasets that assume generic statistical properties, and as a re...

---

## 252. Neutrosophic MR-Metric Spaces: A Topos-Theoretic Framework with Applications

**Authors:** Abed Al-Rahman Malkawi, Ayat Rabaiah

**Year:** 2025 | **Venue:** International Journal of Analysis and Applications | **Citations:** N/A | **Score:** 0.000

[PDF](https://etamaths.com/index.php/ijaa/article/download/4613/1553) | [DOI](https://doi.org/10.28924/2291-8639-23-2025-333)

> This paper introduces and systematically investigates the category of Neutrosophic MR-Metric Spaces (NMR-MS), which generalizes classical metric spaces by incorporating neutrosophic logic to model truth (T), indeterminacy (I), and falsity (F). We define the category NMRMS and construct sheaves of NMR-MS over topological spaces, proving that the category Sh(X, NMRMS) forms an elementary topos. This...

---

## 253. Product Manifold Machine Learning for Physics

**Authors:** Nathaniel Woodward, Sang Eon Park, Gaia Grosso, Jeffrey Krupa, Philip C. Harris

**Year:** 2024 | **Venue:**  | **Citations:** 1 | **Score:** 0.000

> Physical data are representations of the fundamental laws governing the Universe, hiding complex compositional structures often well captured by hierarchical graphs. Hyperbolic spaces are endowed with a non-Euclidean geometry that naturally embeds those structures. To leverage the benefits of non-Euclidean geometries in representing natural data we develop machine learning on $\mathcal P \mathcal ...

---

## 254. Analyzing Large-Scale Twitter Real Time Streaming Data with Manifold Machine Learning Algorithms in Apache SPARK

**Authors:** M. Abhineswari, R. Priyadarshini

**Year:** 2023 | **Venue:** 2023 International Conference on Data Science, Agents & Artificial Intelligence (ICDSAAI) | **Citations:** 9 | **Score:** 0.000

[DOI](https://doi.org/10.1109/ICDSAAI59313.2023.10452549)

> With the rapid growth of social media platforms, Twitter has emerged as a valuable source that provides real-time data on public opinion, sentiment, and trends through approximately 7500 tweets per second, enabling individuals, brand organizations, and public influencers to express thoughts, opinions, and updates in a concise manner. This research paper combines Apache Spark, machine learning tech...

---

## 255. Unipolar and Bipolar Depression Detection and Classification Based on Actigraphic Registration of Motor Activity Using Machine Learning and Uniform Manifold Approximation and Projection Methods

**Authors:** Mohammed Zakariah, Y. Alotaibi

**Year:** 2023 | **Venue:** Diagnostics | **Citations:** 18 | **Score:** 0.000

[PDF](https://www.mdpi.com/2075-4418/13/14/2323/pdf?version=1688966966) | [DOI](https://doi.org/10.3390/diagnostics13142323)

> Modern technology frequently uses wearable sensors to monitor many aspects of human behavior. Since continuous records of heart rate and activity levels are typically gathered, the data generated by these devices have a lot of promise beyond counting the number of daily steps or calories expended. Due to the patient’s inability to obtain the necessary information to understand their conditions and...

---

## 256. Combining Flamelet-Generated Manifold and Machine Learning Models in Simulation of a Non-Premixed Diffusion Flame

**Authors:** Kaimeng Li, P. Rahnama, R. Novella, B. Somers

**Year:** 2023 | **Venue:** Energy and AI | **Citations:** 11 | **Score:** 0.000

[PDF](https://doi.org/10.1016/j.egyai.2023.100266) | [DOI](https://doi.org/10.1016/j.egyai.2023.100266)

> ...

---

## 257. Task-oriented machine learning surrogates for tipping points of agent-based models

**Authors:** Gianluca Fabiani, N. Evangelou, Tianqi Cui, J. Bello-Rivas, Cristina P. Martin-Linares

**Year:** 2024 | **Venue:** Nature Communications | **Citations:** 27 | **Score:** 0.000

[PDF](https://www.nature.com/articles/s41467-024-48024-7.pdf) | [DOI](https://doi.org/10.1038/s41467-024-48024-7)

> We present a machine learning framework bridging manifold learning, neural networks, Gaussian processes, and Equation-Free multiscale approach, for the construction of different types of effective reduced order models from detailed agent-based simulators and the systematic multiscale numerical analysis of their emergent dynamics. The specific tasks of interest here include the detection of tipping...

---

## 258. Comparison of Manifold Learning Algorithms for Rapid Circuit Defect Extraction in SPICE-Augmented Machine Learning

**Authors:** Vasu Eranki, T. Lu, H. Wong

**Year:** 2022 | **Venue:** Workshop on Microelectronics and Electron Devices | **Citations:** 6 | **Score:** 0.000

[DOI](https://doi.org/10.1109/wmed55302.2022.9758032)

> Identifying the source of integrated circuit (IC) degradation and being able to track its degradation via its electrical characteristics (e.g. the Voltage Transfer Characteristics, VTC, of an inverter) is very useful in failure analysis. This is because the electrical measurement is non-destructive, low-cost, and rapid. However, the extraction of defects from electrical characteristics requires si...

---

## 259. Application of machine learning in low-order manifold representation of chemistry in turbulent flames

**Authors:** Arash Mousemi, M. Jadidi, S. Dworkin, W. Bushe

**Year:** 2022 | **Venue:** Combustion theory and modelling | **Citations:** 9 | **Score:** 0.000

[DOI](https://doi.org/10.1080/13647830.2022.2153740)

> The Uniform Conditional State (UCS) and the Multidimensional Flamelet Manifold (MFM) models are methods for the tabulation of chemistry in simulations of turbulent flames. The high-dimensionality of the tables these models generate and many possible combinations of the values for the input variables necessitate the allocation of a considerable size of memory during CFD calculations. This issue bec...

---

## 260. Deciphering Abnormal Platelet Subpopulations in COVID-19, Sepsis and Systemic Lupus Erythematosus through Machine Learning and Single-Cell Transcriptomics

**Authors:** Xinru Qiu, Meera G Nair, L. Jaroszewski, Adam Godzik

**Year:** 2024 | **Venue:** International Journal of Molecular Sciences | **Citations:** 21 | **Score:** 0.000

[PDF](https://www.mdpi.com/1422-0067/25/11/5941/pdf?version=1716978473) | [DOI](https://doi.org/10.3390/ijms25115941)

> This study focuses on understanding the transcriptional heterogeneity of activated platelets and its impact on diseases such as sepsis, COVID-19, and systemic lupus erythematosus (SLE). Recognizing the limited knowledge in this area, our research aims to dissect the complex transcriptional profiles of activated platelets to aid in developing targeted therapies for abnormal and pathogenic platelet ...

---

## 261. A Nonlinear Manifold Embedding Extreme Learning Machine to Improve the Gas Recognition of Electronic Noses

**Authors:** Yutong Tian, Tao Liu, Tingjun Li, Haining Yang, Jia Yan

**Year:** 2024 | **Venue:** IEEE Sensors Journal | **Citations:** 8 | **Score:** 0.000

[DOI](https://doi.org/10.1109/JSEN.2024.3375644)

> The drift compensation of gas sensor systems is an important topic in the artificial olfactory community. The drift is arisen by multiple factors, i.e., the change of temperature and moisture, poison effect, manufacture repeatability, and so on. It would arise the bias, distortion, and offset of data and lead it to be unrecognized. Conventionally, the calibration methods in hardware level are labo...

---

## 262. Surface-Enhanced Raman Scattering Combined with Machine Learning for Rapid and Sensitive Detection of Anti-SARS-CoV-2 IgG

**Authors:** Thais De Andrade Silva, G. F. D. dos Santos, Adilson Ribeiro Prado, D. Cavalieri, Arnaldo Gomes Leal Junior

**Year:** 2024 | **Venue:** Biosensors | **Citations:** 13 | **Score:** 0.000

[PDF](https://doi.org/10.3390/bios14110523) | [DOI](https://doi.org/10.3390/bios14110523)

> This work reports an efficient method to detect SARS-CoV-2 antibodies in blood samples based on SERS combined with a machine learning tool. For this purpose, gold nanoparticles directly conjugated with spike protein were used in human blood samples to identify anti-SARS-CoV-2 antibodies. The comprehensive database utilized Raman spectra from all 594 blood serum samples. Machine learning investigat...

---

## 263. Differential Evolution Based Manifold Gaussian Process Machine Learning for Microwave Filter’s Parameter Extraction

**Authors:** Xuezhi Chen, Yubo Tian, Tianliang Zhang, Jing Gao

**Year:** 2020 | **Venue:** IEEE Access | **Citations:** 25 | **Score:** 0.000

[PDF](https://ieeexplore.ieee.org/ielx7/6287639/8948470/09162106.pdf) | [DOI](https://doi.org/10.1109/ACCESS.2020.3015043)

> Gaussian process (GP) is a rapidly developing supervised machine learning (ML) method in recent years, which has been widely used in the establishment of surrogate models in the field of electromagnetics. However, it has the problems of large sample demand, high computational complexity and low accuracy when processing high dimensional data. To solve this problem, a manifold Gaussian process (MGP)...

---

## 264. Manifold Modeling in Machine Learning

**Authors:** E. Burnaev, A. Bernstein

**Year:** 2021 | **Venue:** Journal of communications technology & electronics | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.1134/S106422692106005X)

> ...

---

## 265. Applications of Machine Learning (ML) and Mathematical Modeling (MM) in Healthcare with Special Focus on Cancer Prognosis and Anticancer Therapy: Current Status and Challenges

**Authors:** Jasmin Hassan, Safiya Mohammed Saeed, Lipika Deka, Md Jasim Uddin, D. B. Das

**Year:** 2024 | **Venue:** Pharmaceutics | **Citations:** 11 | **Score:** 0.000

[PDF](https://www.mdpi.com/1999-4923/16/2/260/pdf?version=1707490260) | [DOI](https://doi.org/10.3390/pharmaceutics16020260)

> The use of data-driven high-throughput analytical techniques, which has given rise to computational oncology, is undisputed. The widespread use of machine learning (ML) and mathematical modeling (MM)-based techniques is widely acknowledged. These two approaches have fueled the advancement in cancer research and eventually led to the uptake of telemedicine in cancer care. For diagnostic, prognostic...

---

## 266. Beyond Language Barriers: Allowing Multiple Languages in Postsecondary Chemistry Classes Through Multilingual Machine Learning

**Authors:** Paul P. Martin, Nicole Graulich

**Year:** 2024 | **Venue:** Journal of Science Education and Technology | **Citations:** 11 | **Score:** 0.000

[PDF](https://link.springer.com/content/pdf/10.1007/s10956-023-10087-4.pdf) | [DOI](https://doi.org/10.1007/s10956-023-10087-4)

> Students who learn the language of instruction as an additional language represent a heterogeneous group with varying linguistic and cultural backgrounds, contributing to classroom diversity. Because of the manifold challenges these students encounter while learning the language of instruction, additional barriers arise for them when engaging in chemistry classes. Adapting teaching practices to th...

---

## 267. Unsupervised Machine Learning for Data-Driven Rock Mass Classification: Addressing Limitations in Existing Systems Using Drilling Data

**Authors:** T. F. Hansen, A. Aarset

**Year:** 2024 | **Venue:** Rock Mechanics and Rock Engineering | **Citations:** 7 | **Score:** 0.000

[PDF](https://link.springer.com/content/pdf/10.1007/s00603-024-04280-z.pdf) | [DOI](https://doi.org/10.1007/s00603-024-04280-z)

> Rock mass classification systems are crucial for assessing stability and risk in underground construction globally and guiding support and excavation design. However, these systems, developed primarily in the 1970 s, lack access to modern high-resolution data and advanced statistical techniques, limiting their effectiveness as decision-support systems. We outline these limitations and describe how...

---

## 268. Using machine learning techniques for exploration and classification of laboratory data

**Authors:** Inga Trulson, Stefan Holdenrieder, G. Hoffmann

**Year:** 2024 | **Venue:** Journal of Laboratory Medicine | **Citations:** 6 | **Score:** 0.000

[PDF](https://doi.org/10.1515/labmed-2024-0100) | [DOI](https://doi.org/10.1515/labmed-2024-0100)

> Abstract Objectives The study aims to acquaint readers with six widely used machine learning (ML) techniques (Principal Component Analysis (PCA), Uniform Manifold Approximation and Projection (UMAP), k-means, hierarchical clustering and the decision tree models (rpart and random forest)) that might be useful for the analysis of laboratory data. Methods Utilizing a recently validated data set from ...

---

## 269. Robust estimation of the intrinsic dimension of data sets with quantum cognition machine learning

**Authors:** Luca Candelori, A. Abanov, Jeffrey Berger, Cameron J. Hogan, Vahagn Kirakosyan

**Year:** 2024 | **Venue:** Scientific Reports | **Citations:** 6 | **Score:** 0.000

[PDF](https://doi.org/10.1038/s41598-025-91676-8) | [DOI](https://doi.org/10.1038/s41598-025-91676-8)

> We propose a new data representation method based on Quantum Cognition Machine Learning and apply it to manifold learning, specifically to the estimation of intrinsic dimension of data sets. The idea is to learn a representation of each data point as a quantum state, encoding both local properties of the point as well as its relation with the entire data. Inspired by ideas from quantum geometry, w...

---

## 270. Hunting for Polluted White Dwarfs and Other Treasures with Gaia XP Spectra and Unsupervised Machine Learning

**Authors:** Malia L. Kao, Keith Hawkins, Laura K. Rogers, A. Bonsor, Bart H. Dunlap

**Year:** 2024 | **Venue:** Astrophysical Journal | **Citations:** 5 | **Score:** 0.000

[PDF](https://doi.org/10.3847/1538-4357/ad5d6e) | [DOI](https://doi.org/10.3847/1538-4357/ad5d6e)

> White dwarfs (WDs) polluted by exoplanetary material provide the unprecedented opportunity to directly observe the interiors of exoplanets. However, spectroscopic surveys are often limited by brightness constraints, and WDs tend to be very faint, making detections of large populations of polluted WDs difficult. In this paper, we aim to increase considerably the number of WDs with multiple metals i...

---

## 271. Distinguishing Calabi-Yau Topology using Machine Learning

**Authors:** Yang-Hui He, Zhigang Yao, S. Yau

**Year:** 2024 | **Venue:**  | **Citations:** 4 | **Score:** 0.000

> While the earliest applications of AI methodologies to pure mathematics and theoretical physics began with the study of Hodge numbers of Calabi-Yau manifolds, the topology type of such manifold also crucially depend on their intersection theory. Continuing the paradigm of machine learning algebraic geometry, we here investigate the triple intersection numbers, focusing on certain divisibility inva...

---

## 272. Dietary patterns associated with the incidence of hypertension among adult Japanese males: application of machine learning to a cohort study

**Authors:** Longfei Li, H. Momma, Haili Chen, S. S. Nawrin, Yidan Xu

**Year:** 2024 | **Venue:** European Journal of Nutrition | **Citations:** 5 | **Score:** 0.000

[PDF](https://link.springer.com/content/pdf/10.1007/s00394-024-03342-w.pdf) | [DOI](https://doi.org/10.1007/s00394-024-03342-w)

> The previous studies that examined the effectiveness of unsupervised machine learning methods versus traditional methods in assessing dietary patterns and their association with incident hypertension showed contradictory results. Consequently, our aim is to explore the correlation between the incidence of hypertension and overall dietary patterns that were extracted using unsupervised machine lear...

---

## 273. Unsupervised Machine Learning‐Derived Anion‐Exchange Membrane Polymers Map: A Guideline for Polymers Exploration and Design

**Authors:** Yin Kan Phua, Nana Terasoba, Manabu Tanaka, T. Fujigaya, Koichiro Kato

**Year:** 2024 | **Venue:** ChemElectroChem | **Citations:** 5 | **Score:** 0.000

[PDF](https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/celc.202400252) | [DOI](https://doi.org/10.1002/celc.202400252)

> Although anion‐exchange membranes (AEMs) are commonly used in fuel cells and water electrolyzers, their widespread commercialization is hindered by problems such as low anion conductivity and durability. Moreover, the development of high‐performance AEMs remains complex and time consuming. Here, we address these challenges by proposing an innovative approach for the efficient design and screening ...

---

## 274. Mechanical dissimilarity of defects in welded joints via Grassmann manifold and machine learning

**Authors:** D. Ryckelynck, Thibault Goessel, F. N'guyen

**Year:** 2020 | **Venue:** Comptes rendus. Mecanique | **Citations:** 8 | **Score:** 0.000

[PDF](https://comptes-rendus.academie-sciences.fr/mecanique/item/10.5802/crmeca.51.pdf) | [DOI](https://doi.org/10.5802/CRMECA.51)

> Assessing the harmfulness of defects based on images is becoming more and more common in industry. Today these defects can be insert in digital twins that aim to replicated in a mechanical model what is observed on a component. We propose a methodology for defect classification and defect labeling in view of fast prediction of their harmfulness by using hyper-reduced order models. Mechanical model...

---

## 275. Designing Poisson Integrators Through Machine Learning

**Authors:** M. Vaquero, David Mart'in de Diego, Jorge Cort'es

**Year:** 2024 | **Venue:** IFAC-PapersOnLine | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2403.20139)

> This paper presents a general method to construct Poisson integrators, i.e., integrators that preserve the underlying Poisson geometry. We assume the Poisson manifold is integrable, meaning there is a known local symplectic groupoid for which the Poisson manifold serves as the set of units. Our constructions build upon the correspondence between Poisson diffeomorphisms and Lagrangian bisections, w...

---

## 276. Executable QR codes with Machine Learning for Industrial Applications

**Authors:** S. Scanzio, Francesco Velluto, Matteo Rosani, Lukasz Wisniewski, G. Cena

**Year:** 2024 | **Venue:** IEEE International Conference on Emerging Technologies and Factory Automation | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.1109/ETFA61755.2024.10710739)

> Executable QR codes, also known as eQR codes or just sQRy, are a special kind of QR codes that embed programs conceived to run on mobile devices like smartphones. Since the program is directly encoded in binary form within the QR code, it can be executed even when the reading device is not provided with Internet access. The applications of this technology are manifold, and range from smart user gu...

---

## 277. Detection of defects in composite insulators based on laser‐induced plasma combined with machine learning

**Authors:** Shuaiqi Xu, Changjin Che

**Year:** 2024 | **Venue:** Microwave and optical technology letters (Print) | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.1002/mop.34298)

> Due to Prolonged operation and external environmental factors, composite insulators may develop various defects, which can potentially lead to serious accidents in power systems. Detecting and analyzing these defects is critically important. In this study, we combine machine learning with laser‐induced breakdown spectroscopy (LIBS) to identify defects in composite insulators and obtain spectral da...

---

## 278. The “Collections as ML Data” checklist for machine learning and cultural heritage

**Authors:** Benjamin Charles Germain Lee

**Year:** 2023 | **Venue:** J. Assoc. Inf. Sci. Technol. | **Citations:** 25 | **Score:** 0.000

[DOI](https://doi.org/10.1002/asi.24765)

> Within cultural heritage, there has been a growing and concerted effort to consider a critical sociotechnical lens when applying machine learning techniques to digital collections. Though the cultural heritage community has collectively developed an emerging body of work detailing responsible operations for machine learning in galleries, museums, archives, and libraries at the organizational level...

---

## 279. Evaluation of nutritional status and clinical depression classification using an explainable machine learning method

**Authors:** Payam Hosseinzadeh Kasani, J. E. Lee, Chihyun Park, Cheol-Heui Yun, Jae-Won Jang

**Year:** 2023 | **Venue:** Frontiers in Nutrition | **Citations:** 22 | **Score:** 0.000

[PDF](https://www.frontiersin.org/articles/10.3389/fnut.2023.1165854/pdf) | [DOI](https://doi.org/10.3389/fnut.2023.1165854)

> Introduction Depression is a prevalent disorder worldwide, with potentially severe implications. It contributes significantly to an increased risk of diseases associated with multiple risk factors. Early accurate diagnosis of depressive symptoms is a critical first step toward management, intervention, and prevention. Various nutritional and dietary compounds have been suggested to be involved in ...

---

## 280. Identification of coumarin-based food additives using terahertz spectroscopy combined with manifold learning and improved support vector machine.

**Authors:** Tao Chen, Lingjie Ma, Zongqing Tang, Ling Xiao Yu

**Year:** 2022 | **Venue:** Journal of Food Science | **Citations:** 20 | **Score:** 0.000

[DOI](https://doi.org/10.1111/1750-3841.16064)

> The purpose of this paper is to use terahertz (THz) spectroscopy combined with manifold learning and improved support vector machine (SVM) model to identify the coumarin-based food additives. The 216 THz absorbance spectra (144 for calibration set and 72 for prediction set) of six coumarin-based food additives are measured by using THz time-domain spectroscopy (THz-TDS) in the range of 0.5-2.0 THz...

---

## 281. Graph machine learning classification using architectural 3D topological models

**Authors:** Abdulrahman Alymani, W. Jabi, Padraig Corcoran

**Year:** 2023 | **Venue:** International Conference on Advances in System Simulation | **Citations:** 12 | **Score:** 0.000

[PDF](https://doi.org/10.1177/00375497221105894) | [DOI](https://doi.org/10.1177/00375497221105894)

> Some architects struggle to choose the best form of how the building meets the ground and may benefit from a suggestion based on precedents. This paper presents a novel proof of concept workflow that enables machine learning (ML) to automatically classify three-dimensional (3D) prototypes with respect to formulating the most appropriate building/ground relationship. Here, ML, a branch of artificia...

---

## 282. Automating the Detection of IV Fluid Contamination Using Unsupervised Machine Learning.

**Authors:** N. C. Spies, Zita M L Hubler, V. Azimi, Ray Zhang, Ronald Jackups

**Year:** 2023 | **Venue:** Clinical Chemistry | **Citations:** 10 | **Score:** 0.000

[DOI](https://doi.org/10.1093/clinchem/hvad207)

> BACKGROUND
Intravenous (IV) fluid contamination is a common cause of preanalytical error that can delay or misguide treatment decisions, leading to patient harm. Current approaches for detecting contamination rely on delta checks, which require a prior result, or manual technologist intervention, which is inefficient and vulnerable to human error. Supervised machine learning may provide a means to...

---

## 283. Cross-domain manifold structure preservation for transferable and cross-machine fault diagnosis

**Authors:** Can Li, Guangbin Wang, Shubiao Zhao, Zhixian Zhong, Ying Lv

**Year:** 2024 | **Venue:** Journal of Vibroengineering | **Citations:** 1 | **Score:** 0.000

[PDF](https://doi.org/10.21595/jve.2024.24067) | [DOI](https://doi.org/10.21595/jve.2024.24067)

> To address the decline or failure in the autonomous learning capability of traditional transfer learning methods when training and test samples come from different machines, resulting in low cross-machine fault diagnosis rates, we propose a cross-domain manifold structure preservation (CDMSP) method for diagnosing rolling bearing faults across machines. The CDMSP method can induce the manifold spa...

---

## 284. Unsupervised machine learning classification of fermi gamma-ray bursts using spectral parameters

**Authors:** Jia-Ming Chen, K. Zhu, Zhao-Yang Peng, Li Zhang

**Year:** 2023 | **Venue:** Monthly notices of the Royal Astronomical Society | **Citations:** 7 | **Score:** 0.000

[PDF](https://academic.oup.com/mnras/advance-article-pdf/doi/10.1093/mnras/stad3407/52953769/stad3407.pdf) | [DOI](https://doi.org/10.1093/mnras/stad3407)

> 
 A thorough analysis of 2297 gamma-ray bursts (GRBs) in the Fermi catalog is performed by using unsupervised machine learning algorithms in this paper. In our analysis, for two spectral parameter samples, namely for the peak-flux and time-integrated spectral fits, two dimensionality reduction algorithms, t-Distributed Stochastic Neighbor Embedding (t-SNE) and Uniform Manifold Approximation and Pr...

---

## 285. A Study on Detection of Malicious Behavior Based on Host Process Data Using Machine Learning

**Authors:** Ryeobin Han, Kookjin Kim, Byunghun Choi, Young-Sik Jeong

**Year:** 2023 | **Venue:** Applied Sciences | **Citations:** 8 | **Score:** 0.000

[PDF](https://www.mdpi.com/2076-3417/13/7/4097/pdf?version=1679572600) | [DOI](https://doi.org/10.3390/app13074097)

> With the rapid increase in the number of cyber-attacks, detecting and preventing malicious behavior has become more important than ever before. In this study, we propose a method for detecting and classifying malicious behavior in host process data using machine learning algorithms. One of the challenges in this study is dealing with high-dimensional and imbalanced data. To address this, we first ...

---

## 286. Monkeypox Virus Crosstalk with HIV: An Integrated Skin Transcriptome and Machine Learning Study

**Authors:** Xueyao Cai, Tianyi Zhou, Wenjun Shi, Yuchen Cai, Jianda Zhou

**Year:** 2023 | **Venue:** ACS Omega | **Citations:** 7 | **Score:** 0.000

[PDF](https://doi.org/10.1021/acsomega.3c07687) | [DOI](https://doi.org/10.1021/acsomega.3c07687)

> The emergence of the monkeypox virus (MPXV) outbreak presents a formidable challenge to human health. Emerging evidence suggests that individuals with HIV have been disproportionately affected by MPXV, with adverse clinical outcomes and higher mortality rates. However, the shared molecular mechanisms underlying MPXV and HIV remain elusive. We identified differentially expressed genes (DEGs) from t...

---

## 287. Machine learning-based signal quality assessment for cardiac volume monitoring in electrical impedance tomography

**Authors:** Chang Min Hyun, Tae Jun Jang, Jeong-Hyeon Nam, H. Kwon, Kiwan Jeon

**Year:** 2023 | **Venue:** Machine Learning: Science and Technology | **Citations:** 6 | **Score:** 0.000

[PDF](https://iopscience.iop.org/article/10.1088/2632-2153/acc637/pdf) | [DOI](https://doi.org/10.1088/2632-2153/acc637)

> Owing to recent advances in thoracic electrical impedance tomography (EIT), a patient’s hemodynamic function can be noninvasively and continuously estimated in real-time by surveilling a cardiac volume signal (CVS) associated with stroke volume and cardiac output. In clinical applications, however, a CVS is often of low quality, mainly because of the patient’s deliberate movements or inevitable mo...

---

## 288. Cryptocurrency Price Prediction Using Supervised Machine Learning Algorithms

**Authors:** Divya Chaudhary, Sushil Kumar Saroj

**Year:** 2023 | **Venue:** Advances in Distributed Computing and Artificial Intelligence Journal | **Citations:** 4 | **Score:** 0.000

[DOI](https://doi.org/10.14201/adcaij.31490)

> 

As a consequence of rising geo-economic issues, global currency values have declined during the last two years, stock markets have performed poorly, and investors have lost money. Consequently, there is a renewed interest in digital currencies. Cryptocurrency is a fresh kind of asset that has evolved as a result of fintech innovations, and it has provided a major research opportunity. Due to pri...

---

## 289. Deep carbonate reservoir characterization using multi seismic attributes:A comparison of unsupervised machine learning approaches

**Authors:** Luanxiao Zhao, Xuanying Zhu, Xiangyuan Zhao, Yuchun You, Minghui Xu

**Year:** 2023 | **Venue:** Geophysics | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.1190/geo2023-0199.1)

> Seismic reservoir characterization is of great interest for sweet spot identification, reservoir quality assessment, and geological model building. The sparsity of the labeled samples often limit the application of supervised machine learning for seismic reservoir characterization. Unsupervised learning methods, on the other hand, explore the internal structure of data and extract low-dimensional ...

---

## 290. Classifying a frequently repeating fast radio burst, FRB 20201124A, with unsupervised machine learning

**Authors:** B. Chen, T. Hashimoto, T. Goto, B. J. Raquel, Y. Uno

**Year:** 2023 | **Venue:**  | **Citations:** 5 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2303.17133) | [DOI](https://doi.org/10.1093/mnras/stad930)

> Fast radio bursts (FRBs) are astronomical transients with millisecond timescales. Although most of the FRBs are not observed to repeat, a few of them are detected to repeat more than hundreds of times. There exist a large variety of physical properties among these bursts, suggesting heterogeneous mechanisms of FRBs. In this paper, we conduct a categorisation on the extremely frequently repeating F...

---

## 291. Integrating Machine Learning and Social Sensing in Smart City Digital Twin for Citizen Feedback

**Authors:** Sandra Kumi, Richard K. Lomotey, R. Deters

**Year:** 2023 | **Venue:** 2023 IEEE International Conference on High Performance Computing & Communications, Data Science & Systems, Smart City & Dependability in Sensor, Cloud & Big Data Systems & Application (HPCC/DSS/SmartCity/DependSys) | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.1109/HPCC-DSS-SmartCity-DependSys60770.2023.00141)

> Smart City Digital Twin (SCDT), a virtual representation of a physical city, is an emerging technology for optimizing urban services and enhancing urban planning and decision-making. The integration of Machine Learning (ML) and social sensing provides valuable insights into public feedback to policymakers and for informed decision-making and responsive urban governance. This study aims to explore ...

---

## 292. Application and Challenges of Machine Learning in Healthcare

**Authors:** Krishna Kumar Yadav, Ankush Gaurav

**Year:** 2023 | **Venue:** International Journal for Research in Applied Science and Engineering Technology | **Citations:** 4 | **Score:** 0.000

[PDF](https://doi.org/10.22214/ijraset.2023.55678) | [DOI](https://doi.org/10.22214/ijraset.2023.55678)

> Abstract: The integration of machine learning (ML) techniques into healthcare has emerged as a transformative force, revolutionizing various aspects of patient care, disease management, and healthcare operations. This research paper explores the manifold applications and accompanying challenges associated with the utilization of ML in healthcare. Machine learning finds extensive application in hea...

---

## 293. A combinatorial machine-learning-driven approach for predicting glass transition temperature based on numerous molecular descriptors

**Authors:** Dazi Li, Caibo Dong, Zhudan Chen, Yining Dong, Jun Liu

**Year:** 2023 | **Venue:** Molecular Simulation | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.1080/08927022.2023.2181019)

> ABSTRACT
 Glass transition temperature (Tg ) is one of the most significant thermophysical property which is hard to measure experimentally. With the development of machine learning, many molecular presentation methods and prediction algorithms have been proposed for predicting Tg . However, most descriptors of these algorithms are linear, while the values of molecular descriptors obtained from ex...

---

## 294. SpaceTimePilot: Generative Rendering of Dynamic Scenes Across Space and Time

**Authors:** Zhening Huang, Hyeonho Jeong, Xuelin Chen, Yulia Gryaditskaya, Tuanfeng Y. Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25075v1) | > We present SpaceTimePilot, a video diffusion model that disentangles space and time for controllable generative rendering. Given a monocular video, SpaceTimePilot can independently alter the camera viewpoint and the motion sequence within the generative process, re-rendering the scene for continuous and arbitrary exploration across space and time. To achieve this, we introduce an effective animati...

---

## 295. Coordinated Humanoid Manipulation with Choice Policies

**Authors:** Haozhi Qi, Yen-Jen Wang, Toru Lin, Brent Yi, Yi Ma

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25072v1) | > Humanoid robots hold great promise for operating in human-centric environments, yet achieving robust whole-body coordination across the head, hands, and legs remains a major challenge. We present a system that combines a modular teleoperation interface with a scalable learning framework to address this problem. Our teleoperation design decomposes humanoid control into intuitive submodules, which i...

---

## 296. Scaling Open-Ended Reasoning to Predict the Future

**Authors:** Nikhil Chandak, Shashwat Goel, Ameya Prabhu, Moritz Hardt, Jonas Geiping

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25070v1) | > High-stakes decision making involves reasoning under uncertainty about the future. In this work, we train language models to make predictions on open-ended forecasting questions. To scale up training data, we synthesize novel forecasting questions from global events reported in daily news, using a fully automated, careful curation recipe. We train the Qwen3 thinking models on our dataset, OpenFore...

---

## 297. From Inpainting to Editing: A Self-Bootstrapping Framework for Context-Rich Visual Dubbing

**Authors:** Xu He, Haoxian Zhang, Hejia Chen, Changyuan Zheng, Liyang Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25066v1) | > Audio-driven visual dubbing aims to synchronize a video's lip movements with new speech, but is fundamentally challenged by the lack of ideal training data: paired videos where only a subject's lip movements differ while all other visual conditions are identical. Existing methods circumvent this with a mask-based inpainting paradigm, where an incomplete visual conditioning forces models to simulta...

---

## 298. Many Minds from One Model: Bayesian Transformers for Population Intelligence

**Authors:** Diji Yang, Yi Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25063v1) | > Despite their scale and success, modern transformers are almost universally trained as single-minded systems: optimization produces one deterministic set of parameters, representing a single functional hypothesis about the data. Motivated by the idea that intelligence emerge from many minds, we propose Population Bayesian Transformers (B-Trans), which transform a standard Large Language Model into...

---

## 299. Melting curve of correlated iron at Earth's core conditions from machine-learned DFT+DMFT

**Authors:** Rishi Rao, Li Zhu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25061v1) | > Reliable constraints on iron's melting curve at Earth's inner-core boundary require accurate finite-temperature electronic correlations, yet DFT+DMFT calculations remain too costly for large-scale thermodynamic sampling. Here, we develop a machine-learning accelerator for charge self-consistent DFT+DMFT by training E(3)-equivariant graph neural networks to predict the local self-energy and Fermi l...

---

## 300. On the geometry and topology of representations: the manifolds of modular addition

**Authors:** Gabriela Moisescu-Pareja, Gavin McCracken, Harley Wiltzer, Vincent Létourneau, Colin Daniels

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25060v1) | > The Clock and Pizza interpretations, associated with architectures differing in either uniform or learnable attention, were introduced to argue that different architectural designs can yield distinct circuits for modular addition. In this work, we show that this is not the case, and that both uniform attention and trainable attention architectures implement the same algorithm via topologically and...

---

## 301. Reliable and Resilient Collective Communication Library for LLM Training and Serving

**Authors:** Wei Wang, Nengneng Yu, Sixian Xiong, Zaoxing Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25059v1) | > Modern ML training and inference now span tens to tens of thousands of GPUs, where network faults can waste 10--15\% of GPU hours due to slow recovery. Common network errors and link fluctuations trigger timeouts that often terminate entire jobs, forcing expensive checkpoint rollback during training and request reprocessing during inference. We present R$^2$CCL, a fault-tolerant communication libr...

---

## 302. Fluid dynamics as intersection problem

**Authors:** Nikita Nekrasov, Paul Wiegmann

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25053v1) | > We formulate the covariant hydrodynamics equations describing the fluid dynamics as the problem of intersection theory on the infinite dimensional symplectic manifold associated with spacetime. This point of view separates the structures related to the equation of state, the geometry of spacetime, and structures related to the (differential) topology of spacetime. We point out a five-dimensional o...

---

## 303. Compound Estimation for Binomials

**Authors:** Yan Chen, Lihua Lei

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25042v1) | > Many applications involve estimating the mean of multiple binomial outcomes as a common problem -- assessing intergenerational mobility of census tracts, estimating prevalence of infectious diseases across countries, and measuring click-through rates for different demographic groups. The most standard approach is to report the plain average of each outcome. Despite simplicity, the estimates are no...

---

## 304. Generative Classifiers Avoid Shortcut Solutions

**Authors:** Alexander C. Li, Ananya Kumar, Deepak Pathak

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25034v1) | > Discriminative approaches to classification often learn shortcuts that hold in-distribution but fail even under minor distribution shift. This failure mode stems from an overreliance on features that are spuriously correlated with the label. We show that generative classifiers, which use class-conditional generative models, can avoid this issue by modeling all features, both core and spurious, ins...

---

## 305. Testing Monotonicity in a Finite Population

**Authors:** Jiafeng Chen, Jonathan Roth, Jann Spiess

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25032v1) | > We consider the extent to which we can learn from a completely randomized experiment whether everyone has treatment effects that are weakly of the same sign, a condition we call monotonicity. From a classical sampling perspective, it is well-known that monotonicity is untestable. By contrast, we show from the design-based perspective -- in which the units in the population are fixed and only treat...

---

## 306. ResponseRank: Data-Efficient Reward Modeling through Preference Strength Learning

**Authors:** Timo Kaufmann, Yannick Metz, Daniel Keim, Eyke Hüllermeier

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25023v1) | > Binary choices, as often used for reinforcement learning from human feedback (RLHF), convey only the direction of a preference. A person may choose apples over oranges and bananas over grapes, but which preference is stronger? Strength is crucial for decision-making under uncertainty and generalization of preference models, but hard to measure reliably. Metadata such as response times and inter-an...

---

## 307. Approximation Algorithms for Fair Repetitive Scheduling

**Authors:** Danny Hermelin, Danny Segev, Dvir Shabtay

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25020v1) | > We consider a recently introduced fair repetitive scheduling problem involving a set of clients, each asking for their associated job to be daily scheduled on a single machine across a finite planning horizon. The goal is to determine a job processing permutation for each day, aiming to minimize the maximum total completion time experienced by any client. This problem is known to be NP-hard for qu...

---

## 308. Convergence of the generalization error for deep gradient flow methods for PDEs

**Authors:** Chenguang Liu, Antonis Papapantoleon, Jasper Rou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25017v1) | > The aim of this article is to provide a firm mathematical foundation for the application of deep gradient flow methods (DGFMs) for the solution of (high-dimensional) partial differential equations (PDEs). We decompose the generalization error of DGFMs into an approximation and a training error. We first show that the solution of PDEs that satisfy reasonable and verifiable assumptions can be approx...

---

## 309. Diffusion Language Models are Provably Optimal Parallel Samplers

**Authors:** Haozhe Jiang, Nika Haghtalab, Lijie Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25014v1) | > Diffusion language models (DLMs) have emerged as a promising alternative to autoregressive models for faster inference via parallel token generation. We provide a rigorous foundation for this advantage by formalizing a model of parallel sampling and showing that DLMs augmented with polynomial-length chain-of-thought (CoT) can simulate any parallel sampling algorithm using an optimal number of sequ...

---

## 310. At the intersection of Numerical Analysis and Spectral Geometry

**Authors:** Nilima Nigam

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25012v1) | > How do the geometric properties of a domain impact the spectrum of an operator defined on it? How do we compute accurate and reliable approximations of these spectra? The former question is studied in spectral geometry, and the latter is a central concern in numerical analysis. In this short expository survey we revisit the process of eigenvalue approximation, from the perspective of computational...

---

## 311. FoundationSLAM: Unleashing the Power of Depth Foundation Models for End-to-End Dense Visual SLAM

**Authors:** Yuchen Wu, Jiahe Li, Fabio Tosi, Matteo Poggi, Jin Zheng

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25008v1) | > We present FoundationSLAM, a learning-based monocular dense SLAM system that addresses the absence of geometric consistency in previous flow-based approaches for accurate and robust tracking and mapping. Our core idea is to bridge flow estimation with geometric reasoning by leveraging the guidance from foundation depth models. To this end, we first develop a Hybrid Flow Network that produces geome...

---

## 312. Bi-C2R: Bidirectional Continual Compatible Representation for Re-indexing Free Lifelong Person Re-identification

**Authors:** Zhenyu Cui, Jiahuan Zhou, Yuxin Peng

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25000v1) | > Lifelong person Re-IDentification (L-ReID) exploits sequentially collected data to continuously train and update a ReID model, focusing on the overall performance of all data. Its main challenge is to avoid the catastrophic forgetting problem of old knowledge while training on new data. Existing L-ReID methods typically re-extract new features for all historical gallery images for inference after ...

---

## 313. Basic Inequalities for First-Order Optimization with Applications to Statistical Risk Analysis

**Authors:** Seunghoon Paik, Kangjie Zhou, Matus Telgarsky, Ryan J. Tibshirani

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24999v1) | > We introduce \textit{basic inequalities} for first-order iterative optimization algorithms, forming a simple and versatile framework that connects implicit and explicit regularization. While related inequalities appear in the literature, we isolate and highlight a specific form and develop it as a well-rounded tool for statistical analysis. Let $f$ denote the objective function to be optimized. Gi...

---

## 314. Manifold classification from the descriptive viewpoint

**Authors:** Jeffrey Bergfalk, Iian B. Smythe

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24996v1) | > We consider classification problems for manifolds and discrete subgroups of Lie groups from a descriptive set-theoretic point of view. This work is largely foundational in conception and character, recording both a framework for general study and Borel complexity computations for some of the most fundamental classes of manifolds. We show, for example, that for all $n\geq 0$, the homeomorphism prob...

---

## 315. Efficiently Estimating Data Efficiency for Language Model Fine-tuning

**Authors:** Gyung Hyun Je, Colin Raffel

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24991v1) | > While large language models (LLMs) demonstrate reasonable zero-shot capability across many downstream tasks, fine-tuning is a common practice to improve their performance. However, a task's data efficiency--i.e., the number of fine-tuning examples needed to achieve a desired level of performance--is often unknown, resulting in costly cycles of incremental annotation and retraining. Indeed, we demo...

---

## 316. DarkEQA: Benchmarking Vision-Language Models for Embodied Question Answering in Low-Light Indoor Environments

**Authors:** Yohan Park, Hyunwoo Ha, Wonjun Jo, Tae-Hyun Oh

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24985v1) | > Vision Language Models (VLMs) are increasingly adopted as central reasoning modules for embodied agents. Existing benchmarks evaluate their capabilities under ideal, well-lit conditions, yet robust 24/7 operation demands performance under a wide range of visual degradations, including low-light conditions at night or in dark environments--a core necessity that has been largely overlooked. To addre...

---

## 317. Optical Spiking Neural Networks via Rogue-Wave Statistics

**Authors:** Bahadır Utku Kesgin, Gülsüm Yaren Durdu, Uğur Teğin

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24983v1) | > Optical computing could reduce the energy cost of artificial intelligence by leveraging the parallelism and propagation speed of light. However, implementing nonlinear activation, essential for machine learning, remains challenging in low-power optical systems dominated by linear wave physics. Here, we introduce an optical spiking neural network that uses optical rogue-wave statistics as a program...

---

## 318. SymSeqBench: a unified framework for the generation and analysis of rule-based symbolic sequences and datasets

**Authors:** Barna Zajzon, Younes Bouhadjar, Maxime Fabre, Felix Schmidt, Noah Ostendorf

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24977v1) | > Sequential structure is a key feature of multiple domains of natural cognition and behavior, such as language, movement and decision-making. Likewise, it is also a central property of tasks to which we would like to apply artificial intelligence. It is therefore of great importance to develop frameworks that allow us to evaluate sequence learning and processing in a domain agnostic fashion, whilst...

---

## 319. Attribution-Guided Distillation of Matryoshka Sparse Autoencoders

**Authors:** Cristina P. Martin-Linares, Jonathan P. Ling

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24975v1) | > Sparse autoencoders (SAEs) aim to disentangle model activations into monosemantic, human-interpretable features. In practice, learned features are often redundant and vary across training runs and sparsity levels, which makes interpretations difficult to transfer and reuse. We introduce Distilled Matryoshka Sparse Autoencoders (DMSAEs), a training pipeline that distills a compact core of consisten...

---

## 320. Evaluating the Impact of Compression Techniques on the Robustness of CNNs under Natural Corruptions

**Authors:** Itallo Patrick Castro Alves Da Silva, Emanuel Adler Medeiros Pereira, Erick de Andrade Barboza, Baldoino Fonseca dos Santos Neto, Marcio de Medeiros Ribeiro

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24971v1) | > Compressed deep learning models are crucial for deploying computer vision systems on resource-constrained devices. However, model compression may affect robustness, especially under natural corruption. Therefore, it is important to consider robustness evaluation while validating computer vision systems. This paper presents a comprehensive evaluation of compression techniques - quantization, prunin...

---

## 321. Large language models and the entropy of English

**Authors:** Colin Scheibner, Lindsay M. Smith, William Bialek

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24969v1) | > We use large language models (LLMs) to uncover long-ranged structure in English texts from a variety of sources. The conditional entropy or code length in many cases continues to decrease with context length at least to $N\sim 10^4$ characters, implying that there are direct dependencies or interactions across these distances. A corollary is that there are small but significant correlations betwee...

---

## 322. Semi-overlapping Multi-bandit Best Arm Identification for Sequential Support Network Learning

**Authors:** András Antos, András Millinghoffer, Péter Antal

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24959v1) | > Many modern AI and ML problems require evaluating partners' contributions through shared yet asymmetric, computationally intensive processes and the simultaneous selection of the most beneficial candidates. Sequential approaches to these problems can be unified under a new framework, Sequential Support Network Learning (SSNL), in which the goal is to select the most beneficial candidate set of par...

---

## 323. MSACL: Multi-Step Actor-Critic Learning with Lyapunov Certificates for Exponentially Stabilizing Control

**Authors:** Yongwei Zhang, Yuanzhe Xing, Quan Quan, Zhikun She

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24955v1) | > Achieving provable stability in model-free reinforcement learning (RL) remains a challenge, particularly in balancing exploration with rigorous safety. This article introduces MSACL, a framework that integrates exponential stability theory with maximum entropy RL through multi-step Lyapunov certificate learning. Unlike methods relying on complex reward engineering, MSACL utilizes off-policy multi-...

---

## 324. ProDM: Synthetic Reality-driven Property-aware Progressive Diffusion Model for Coronary Calcium Motion Correction in Non-gated Chest CT

**Authors:** Xinran Gong, Gorkem Durak, Halil Ertugrul Aktas, Vedat Cicek, Jinkui Hao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24948v1) | > Coronary artery calcium (CAC) scoring from chest CT is a well-established tool to stratify and refine clinical cardiovascular disease risk estimation. CAC quantification relies on the accurate delineation of calcified lesions, but is oftentimes affected by artifacts introduced by cardiac and respiratory motion. ECG-gated cardiac CTs substantially reduce motion artifacts, but their use in populatio...

---

## 325. RAIR: A Rule-Aware Benchmark Uniting Challenging Long-Tail and Visual Salience Subset for E-commerce Relevance Assessment

**Authors:** Chenji Lu, Zhuo Chen, Hui Zhao, Zhenyi Wang, Pengjie Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24943v1) | > Search relevance plays a central role in web e-commerce. While large language models (LLMs) have shown significant results on relevance task, existing benchmarks lack sufficient complexity for comprehensive model assessment, resulting in an absence of standardized relevance evaluation metrics across the industry. To address this limitation, we propose Rule-Aware benchmark with Image for Relevance ...

---

## 326. Iterative Deployment Improves Planning Skills in LLMs

**Authors:** Augusto B. Corrêa, Yoav Gelberg, Luckeciano C. Melo, Ilia Shumailov, André G. Pereira

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24940v1) | > We show that iterative deployment of large language models (LLMs), each fine-tuned on data carefully curated by users from the previous models' deployment, can significantly change the properties of the resultant models. By testing this mechanism on various planning domains, we observe substantial improvements in planning skills, with later models displaying emergent generalization by discovering ...

---

## 327. Vibe Coding, Interface Flattening

**Authors:** Hongrui Jin

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24939v1) | > Large language models are reshaping programming by enabling 'vibe coding': the development of softwares through natural-language interaction with model-driven toolchains. This article argues that vibe coding is best understood as interface flattening, a reconfiguration in which previously distinct modalities (GUI, CLI, and API) appear to converge into a single conversational surface, even as the u...

---

## 328. Adaptive Dependency-aware Prompt Optimization Framework for Multi-Step LLM Pipeline

**Authors:** Minjun Zhao, Xinyu Zhang, Shuai Zhang, Deyang Li, Ruifeng Shi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24933v1) | > Multi-step LLM pipelines invoke large language models multiple times in a structured sequence and can effectively solve complex tasks, but their performance heavily depends on the prompts used at each step. Jointly optimizing these prompts is difficult due to missing step-level supervision and inter-step dependencies. Existing end-to-end prompt optimization methods struggle under these conditions ...

---

## 329. Generalised Hermite-Einstein Fibre Metrics and Slope Stability for Holomorphic Vector Bundles

**Authors:** Dan Popovici

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24932v1) | > Let $X$ be a compact complex manifold of dimension $n$ and let $m$ be a positive integer with $m\leq n$. Assume that $X$ admits a Kähler metric $ω$ and a weakly positive, $\partial\bar\partial$-closed, smooth $(n-m,\,n-m)$-form $Ω$. We introduce the notions of $(ω,\,Ω)$-Hermite-Einstein holomorphic vector bundles and $(ω,\,Ω)$(-semi)-stable coherent sheaves on $X$ by generalising the classical def...

---

## 330. Are First-Order Diffusion Samplers Really Slower? A Fast Forward-Value Approach

**Authors:** Yuchen Jiao, Na Li, Changxiao Cai, Gen Li

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24927v1) | > Higher-order ODE solvers have become a standard tool for accelerating diffusion probabilistic model (DPM) sampling, motivating the widespread view that first-order methods are inherently slower and that increasing discretization order is the primary path to faster generation. This paper challenges this belief and revisits acceleration from a complementary angle: beyond solver order, the placement ...

---

## 331. Semi-Supervised Diversity-Aware Domain Adaptation for 3D Object detection

**Authors:** Bartłomiej Olber, Jakub Winter, Paweł Wawrzyński, Andrii Gamalii, Daniel Górniak

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24922v1) | > 3D object detectors are fundamental components of perception systems in autonomous vehicles. While these detectors achieve remarkable performance on standard autonomous driving benchmarks, they often struggle to generalize across different domains - for instance, a model trained in the U.S. may perform poorly in regions like Asia or Europe. This paper presents a novel lidar domain adaptation metho...

---

## 332. Transgression in the primitive cohomology

**Authors:** Hao Zhuang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24920v1) | > We study the Chern-Weil theory for the primitive cohomology of a symplectic manifold. First, given a symplectic manifold, we review the superbundle-valued forms on this manifold and prove a primitive version of the Bianchi identity. Second, as the main result, we prove a transgression formula associated with the boundary map of the primitive cohomology. Third, as an application of the main result,...

---

## 333. Property (T) and Poincaré duality in dimension three

**Authors:** Cameron Gates Rudd

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24919v1) | > We use a recent result of Bader and Sauer on coboundary expansion to prove residually finite three-dimensional Poincaré duality groups never have property (T). This implies such groups are never Kähler. The argument applies to fundamental groups of (possibly non-aspherical) compact 3-manifolds, giving a new proof of a theorem of Fujiwara that states if the fundamental group of a compact 3-manifold...

---

## 334. Frequent subgraph-based persistent homology for graph classification

**Authors:** Xinyang Chen, Amaël Broustet, Guoting Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24917v1) | > Persistent homology (PH) has recently emerged as a powerful tool for extracting topological features. Integrating PH into machine learning and deep learning models enhances topology awareness and interpretability. However, most PH methods on graphs rely on a limited set of filtrations, such as degree-based or weight-based filtrations, which overlook richer features like recurring information acros...

---

## 335. AI-Driven Cloud Resource Optimization for Multi-Cluster Environments

**Authors:** Vinoth Punniyamoorthy, Akash Kumar Agarwal, Bikesh Kumar, Abhirup Mazumder, Kabilan Kannan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24914v1) | > Modern cloud-native systems increasingly rely on multi-cluster deployments to support scalability, resilience, and geographic distribution. However, existing resource management approaches remain largely reactive and cluster-centric, limiting their ability to optimize system-wide behavior under dynamic workloads. These limitations result in inefficient resource utilization, delayed adaptation, and...

---

## 336. Spectral Graph Neural Networks for Cognitive Task Classification in fMRI Connectomes

**Authors:** Debasis Maji, Arghya Banerjee, Debaditya Barman

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24901v1) | > Cognitive task classification using machine learning plays a central role in decoding brain states from neuroimaging data. By integrating machine learning with brain network analysis, complex connectivity patterns can be extracted from functional magnetic resonance imaging connectomes. This process transforms raw blood-oxygen-level-dependent (BOLD) signals into interpretable representations of cog...

---

## 337. PRISM: A hierarchical multiscale approach for time series forecasting

**Authors:** Zihao Chen, Alexandre Andre, Wenrui Ma, Ian Knight, Sergey Shuvaev

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24898v1) | > Forecasting is critical in areas such as finance, biology, and healthcare. Despite the progress in the field, making accurate forecasts remains challenging because real-world time series contain both global trends, local fine-grained structure, and features on multiple scales in between. Here, we present a new forecasting method, PRISM (Partitioned Representation for Iterative Sequence Modeling), ...

---

## 338. Self-Supervised Amortized Neural Operators for Optimal Control: Scaling Laws and Applications

**Authors:** Wuzhe Xu, Jiequn Han, Rongjie Lai

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24897v1) | > Optimal control provides a principled framework for transforming dynamical system models into intelligent decision-making, yet classical computational approaches are often too expensive for real-time deployment in dynamic or uncertain environments. In this work, we propose a method based on self-supervised neural operators for open-loop optimal control problems. It offers a new paradigm by directl...

---

## 339. mHC: Manifold-Constrained Hyper-Connections

**Authors:** Zhenda Xie, Yixuan Wei, Huanqi Cao, Chenggang Zhao, Chengqi Deng

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24880v1) | > Recently, studies exemplified by Hyper-Connections (HC) have extended the ubiquitous residual connection paradigm established over the past decade by expanding the residual stream width and diversifying connectivity patterns. While yielding substantial performance gains, this diversification fundamentally compromises the identity mapping property intrinsic to the residual connection, which causes ...

---

## 340. Exact Identity Linking Entropy Production and Mutual Information

**Authors:** Doohyeong Cho, Hawoong Jeong

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24877v1) | > Linking entropy production (EP) to information is a key step toward data-driven nonequilibrium thermodynamics. We derive an exact identity for overdamped Langevin dynamics that equates the total EP rate to the mutual-information rate between an infinitesimal displacement and its time-symmetric midpoint, up to a bulk mean-flow contribution. This mapping elevates information theory to a thermodynami...

---

## 341. Let It Flow: Agentic Crafting on Rock and Roll, Building the ROME Model within an Open Agentic Learning Ecosystem

**Authors:** Weixun Wang, XiaoXiao Xu, Wanhe An, Fangwen Dai, Wei Gao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24873v1) | > Agentic crafting requires LLMs to operate in real-world environments over multiple turns by taking actions, observing outcomes, and iteratively refining artifacts. Despite its importance, the open-source community lacks a principled, end-to-end ecosystem to streamline agent development. We introduce the Agentic Learning Ecosystem (ALE), a foundational infrastructure that optimizes the production p...

---

## 342. Characterization of Transfer Using Multi-task Learning Curves

**Authors:** András Millinghoffer, Bence Bolgár, Péter Antal

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24866v1) | > Transfer effects manifest themselves both during training using a fixed data set and in inductive inference using accumulating data. We hypothesize that perturbing the data set by including more samples, instead of perturbing the model by gradient updates, provides a complementary and more fundamental characterization of transfer effects. To capture this phenomenon, we quantitatively model transfe...

---

## 343. On a conjecture of Almgren II: area-minimizing submanifolds with fractal singular sets on almost any manifold

**Authors:** Zhenhua Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24859v1) | > This paper is the second in a two-part solution to Almgren's conjecture on the existence of area-minimizing submanifolds with fractal singular sets. In part one, we construct area-minimizing submanifolds with fractal singular sets on certain special manifolds. Here we continue our work and show that area-minimizing submanifolds with fractal singular sets exist on almost any smooth manifold....

---

## 344. GenASiS Mathematics: Object-oriented manifolds, operations, and solvers for large-scale physics simulations (version 2)

**Authors:** Christian Y. Cardall, Reuben D. Budiardja

**Year:** 2023 | **Venue:** Comput. Phys. Commun. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1016/J.CPC.2022.108518)

> ...

---

## 345. Persistent de Rham-Hodge Laplacians in Eulerian representation for manifold topological learning

**Authors:** Zhe Su, Yiying Tong, Guo-Wei Wei

**Year:** 2024 | **Venue:** AIMS Mathematics | **Citations:** 9 | **Score:** 0.000

[PDF](https://doi.org/10.3934/math.20241333) | [DOI](https://doi.org/10.3934/math.20241333)

> Recently, topological data analysis has become a trending topic in data science and engineering. However, the key technique of topological data analysis, i.e., persistent homology, is defined on point cloud data, which does not work directly for data on manifolds. Although earlier evolutionary de Rham-Hodge theory deals with data on manifolds, it is inconvenient for machine learning applications b...

---

## 346. Comparative Analysis of Manifold Learning-Based Dimension Reduction Methods: A Mathematical Perspective

**Authors:** Wenting Yi, Siqi Bu, H. Lee, C. Chan

**Year:** 2024 | **Venue:** Mathematics | **Citations:** 5 | **Score:** 0.000

[PDF](https://doi.org/10.3390/math12152388) | [DOI](https://doi.org/10.3390/math12152388)

> Manifold learning-based approaches have emerged as prominent techniques for dimensionality reduction. Among these methods, t-Distributed Stochastic Neighbor Embedding (t-SNE) and Uniform Manifold Approximation and Projection (UMAP) stand out as two of the most widely used and effective approaches. While both methods share similar underlying procedures, empirical observations indicate two distincti...

---

## 347. Curves as slant submanifolds of an almost product Riemannian manifold

**Authors:** P. Alegre, A. Carriazo

**Year:** 2024 | **Venue:** Turkish Journal of Mathematics | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.55730/1300-0098.3535)

> : In this paper, we show that in an almost product manifold there exist curves that are slant submanifolds. We characterize these curves and study them in two and three-dimensional locally product manifolds. Finally, we construct curves in a hypersurface of a Kaehler manifold...

---

## 348. Riemannian Geodesic Discriminant Analysis–Minimum Riemannian Mean Distance: A Robust and Effective Method Leveraging a Symmetric Positive Definite Manifold and Discriminant Algorithm for Image Set Classification

**Authors:** Zigang Liu, Fayez F. M. El-Sousy, Nauman Ali Larik, Huan Quan, Tianyao Ji

**Year:** 2024 | **Venue:** Mathematics | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.3390/math12142164)

> This study introduces a novel method for classifying sets of images, called Riemannian geodesic discriminant analysis–minimum Riemannian mean distance (RGDA-MRMD). This method first converts image data into symmetric positive definite (SPD) matrices, which capture important features related to the variability within the data. These SPD matrices are then mapped onto simpler, flat spaces (tangent sp...

---

## 349. Solutions of the mean curvature equation with the Nehari manifold

**Authors:** J. V. C. Sousa, Daniela S. Oliveira, L. S. Tavares

**Year:** 2023 | **Venue:** Computational and Applied Mathematics | **Citations:** 16 | **Score:** 0.000

[DOI](https://doi.org/10.1007/s40314-023-02534-0)

> ...

---

## 350. Manifold turnpikes of nonlinear port-Hamiltonian descriptor systems under minimal energy supply

**Authors:** A. Karsai

**Year:** 2023 | **Venue:** MCSS. Mathematics of Control, Signals and Systems | **Citations:** 10 | **Score:** 0.000

[PDF](https://link.springer.com/content/pdf/10.1007/s00498-024-00384-7.pdf) | [DOI](https://doi.org/10.1007/s00498-024-00384-7)

> Turnpike phenomena of nonlinear port-Hamiltonian descriptor systems under minimal energy supply are studied. Under assumptions on the smoothness of the system nonlinearities, it is shown that the optimal control problem is dissipative with respect to a manifold. Then, under controllability assumptions, it is shown that the optimal control problem exhibits a manifold turnpike property....

---

## 351. Tangent Bundles Endowed with Quarter-Symmetric Non-Metric Connection (QSNMC) in a Lorentzian Para-Sasakian Manifold

**Authors:** Rajesh Kumar, Lalnunenga Colney, Samesh Shenawy, Nasser Bin Turki

**Year:** 2023 | **Venue:** Mathematics | **Citations:** 7 | **Score:** 0.000

[PDF](https://www.mdpi.com/2227-7390/11/19/4163/pdf?version=1696407427) | [DOI](https://doi.org/10.3390/math11194163)

> The purpose of the present paper is to study the complete lifts of a QSNMC from an LP-Sasakian manifold to its tangent bundle. The lifts of the curvature tensor, Ricci tensor, projective Ricci tensor, and lifts of Einstein manifold endowed with QSNMC in an LP-Sasakian manifold to its tangent bundle are investigated. Necessary and sufficient conditions for the lifts of the Ricci tensor to be symmet...

---

## 352. Existence and multiplicity for fractional Dirichlet problem with γ(ξ)-Laplacian equation and Nehari manifold

**Authors:** Vanterler da C. Sousa, D.S. Oliveira, Ravi Agarwal

**Year:** 2023 | **Venue:** Applicable Analysis and Discrete Mathematics | **Citations:** 7 | **Score:** 0.000

[PDF](http://www.doiserbia.nb.rs/ft.aspx?id=1452-86302300017S) | [DOI](https://doi.org/10.2298/aadm220903017s)

> This paper is divided in two parts. In the first part, we prove coercivity
 results and minimization of the Euler energy functional. In the second part,
 we focus on the existence and multiplicity of a positive solution of
 fractional Dirichlet problem involving the ?(?)-Laplacian equation with
 non-negative weight functions in H?,?;? ?(?) (?,R) using some variational
 techniques and Nehari manifo...

---

## 353. A Theory of the NEPv Approach for Optimization on the Stiefel Manifold

**Authors:** Ren-Cang Li

**Year:** 2023 | **Venue:** Foundations of Computational Mathematics | **Citations:** 6 | **Score:** 0.000

[DOI](https://doi.org/10.1007/s10208-024-09687-2)

> The NEPv approach has been increasingly used lately for optimization on the Stiefel manifold arising from machine learning. General speaking, the approach first turns the first order optimality condition, also known as the KKT condition, into a nonlinear eigenvalue problem with eigenvector dependency (NEPv) or a nonlinear polar decomposition with orthogonal factor dependency (NPDo) and then solve ...

---

## 354. A collection of efficient retractions for the symplectic Stiefel manifold

**Authors:** H. Oviedo, Rafael Herrera

**Year:** 2023 | **Venue:** Computational and Applied Mathematics | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.1007/s40314-023-02302-0)

> ...

---

## 355. Semi-symmetric almost C(α)-manifold on some curvature tensors

**Authors:** T. Mert, M. Atc̣eken, Pakize Uygun

**Year:** 2023 | **Venue:** Gulf Journal of Mathematics | **Citations:** 3 | **Score:** 0.000

[PDF](https://gjom.org/index.php/gjom/article/download/1179/417) | [DOI](https://doi.org/10.56947/gjom.v14i2.1179)

> In this article, semi-symmetry of almost C(α)-manifold is investigated on some special curvature tensors. First, the behavior of the almost C(α)-manifold is investigated when the special curvature tensors discussed are flat. Then, for these special curvature tensors, the behavior of the manifold in the semi-symmetric condition is observed and for some special curvature tensors, important propertie...

---

## 356. CA-PCA: Manifold Dimension Estimation, Adapted for Curvature

**Authors:** Anna C. Gilbert, Kevin O'Neill

**Year:** 2023 | **Venue:** SIAM Journal on Mathematics of Data Science | **Citations:** 4 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2309.13478) | [DOI](https://doi.org/10.48550/arXiv.2309.13478)

> The success of algorithms in the analysis of high-dimensional data is often attributed to the manifold hypothesis, which supposes that this data lie on or near a manifold of much lower dimension. It is often useful to determine or estimate the dimension of this manifold before performing dimension reduction, for instance. Existing methods for dimension estimation are calibrated using a flat unit b...

---

## 357. Applications of No-Collision Transportation Maps in Manifold Learning

**Authors:** Elisa Negrini, L. Nurbekyan

**Year:** 2023 | **Venue:** SIAM Journal on Mathematics of Data Science | **Citations:** 5 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2304.00199) | [DOI](https://doi.org/10.48550/arXiv.2304.00199)

> In this work, we investigate applications of no-collision transportation maps introduced in [Nurbekyan et. al., 2020] in manifold learning for image data. Recently, there has been a surge in applying transportation-based distances and features for data representing motion-like or deformation-like phenomena. Indeed, comparing intensities at fixed locations often does not reveal the data structure. ...

---

## 358. Multifidelity Covariance Estimation via Regression on the Manifold of Symmetric Positive Definite Matrices

**Authors:** A. Maurais, Terrence Alsup, B. Peherstorfer, Y. Marzouk

**Year:** 2023 | **Venue:** SIAM Journal on Mathematics of Data Science | **Citations:** 5 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2307.12438) | [DOI](https://doi.org/10.48550/arXiv.2307.12438)

> We introduce a multifidelity estimator of covariance matrices formulated as the solution to a regression problem on the manifold of symmetric positive definite matrices. The estimator is positive definite by construction, and the Mahalanobis distance minimized to obtain it possesses properties enabling practical computation. We show that our manifold regression multifidelity (MRMF) covariance esti...

---

## 359. A data-driven surrogate modeling approach for time-dependent incompressible Navier-Stokes equations with dynamic mode decomposition and manifold interpolation

**Authors:** M. Hess, A. Quaini, G. Rozza

**Year:** 2022 | **Venue:** Advances in Computational Mathematics | **Citations:** 28 | **Score:** 0.000

[PDF](https://link.springer.com/content/pdf/10.1007/s10444-023-10016-4.pdf) | [DOI](https://doi.org/10.1007/s10444-023-10016-4)

> This work introduces a novel approach for data-driven model reduction of time-dependent parametric partial differential equations. Using a multi-step procedure consisting of proper orthogonal decomposition, dynamic mode decomposition, and manifold interpolation, the proposed approach allows to accurately recover field solutions from a few large-scale simulations. Numerical experiments for the Rayl...

---

## 360. Lifts of a Quarter-Symmetric Metric Connection from a Sasakian Manifold to Its Tangent Bundle

**Authors:** Mohammad Nazrul Islam Khan, U. De, L. Velimirović

**Year:** 2022 | **Venue:** Mathematics | **Citations:** 20 | **Score:** 0.000

[PDF](https://www.mdpi.com/2227-7390/11/1/53/pdf?version=1671797401) | [DOI](https://doi.org/10.3390/math11010053)

> The objective of this paper is to explore the complete lifts of a quarter-symmetric metric connection from a Sasakian manifold to its tangent bundle. A relationship between the Riemannian connection and the quarter-symmetric metric connection from a Sasakian manifold to its tangent bundle was established. Some theorems on the curvature tensor and the projective curvature tensor of a Sasakian manif...

---

## 361. Wassmap: Wasserstein Isometric Mapping for Image Manifold Learning

**Authors:** Keaton Hamm, Nick Henscheid, Shujie Kang

**Year:** 2022 | **Venue:** SIAM Journal on Mathematics of Data Science | **Citations:** 21 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2204.06645) | [DOI](https://doi.org/10.48550/arXiv.2204.06645)

> In this paper, we propose Wasserstein Isometric Mapping (Wassmap), a nonlinear dimensionality reduction technique that provides solutions to some drawbacks in existing global nonlinear dimensionality reduction algorithms in imaging applications. Wassmap represents images via probability measures in Wasserstein space, then uses pairwise Wasserstein distances between the associated measures to produ...

---

## 362. A Grassmann manifold handbook: basic geometry and computational aspects

**Authors:** Thomas Bendokat, Ralf Zimmermann, P.-A. Absil

**Year:** 2020 | **Venue:** Advances in Computational Mathematics | **Citations:** 120 | **Score:** 0.000

[PDF](https://link.springer.com/content/pdf/10.1007/s10444-023-10090-8.pdf) | [DOI](https://doi.org/10.1007/s10444-023-10090-8)

> The Grassmann manifold of linear subspaces is important for the mathematical modelling of a multitude of applications, ranging from problems in machine learning, computer vision and image processing to low-rank matrix optimization problems, dynamic low-rank decompositions and model reduction. With this mostly expository work, we aim to provide a collection of the essential facts and formulae on th...

---

## 363. Existence Results for Double Phase Problem in Sobolev–Orlicz Spaces with Variable Exponents in Complete Manifold

**Authors:** A. Aberqi, J. Bennouna, O. Benslimane, M. Ragusa

**Year:** 2021 | **Venue:** Mediterranean Journal of Mathematics | **Citations:** 68 | **Score:** 0.000

[PDF](https://link.springer.com/content/pdf/10.1007/s00009-022-02097-0.pdf) | [DOI](https://doi.org/10.1007/s00009-022-02097-0)

> In this paper, we study the existence of non-negative non-trivial solutions for a class of double-phase problems where the source term is a Caratheodory function that satisfies the Ambrosetti–Rabinowitz type condition in the framework of Sobolev–Orlicz spaces with variable exponents in complete manifold. Our approach is based on the Nehari manifold and some variational techniques. Furthermore, the...

---

## 364. CHARACTERIZATION OF SOME SPECIAL CURVATURE TENSOR ON ALMOST C(\(\alpha\))-MANIFOLD

**Authors:** T. Mert

**Year:** 2022 | **Venue:** Asian journal of mathematics and computer research | **Citations:** 10 | **Score:** 0.000

[DOI](https://doi.org/10.56557/ajomcor/2022/v29i17629)

> In this article, the behavior of the C (\(\alpha\))-manifold satisfying pseudo-symmetric and Ricci pseudosymmetric manifold on the \(\sigma\)1−curvature tensor, \(\sigma\)2−curvature tensor, \(\sigma\)3−curvature tensor, \(\sigma\)4−curvature tensor are investigated. In addition, the atness of these curvature tensors on the C (\(\alpha\))- manifold are investigated and are characterized for each c...

---

## 365. Robust Inference of Manifold Density and Geometry by Doubly Stochastic Scaling

**Authors:** Boris Landa, Xiuyuan Cheng

**Year:** 2022 | **Venue:** SIAM Journal on Mathematics of Data Science | **Citations:** 9 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2209.08004) | [DOI](https://doi.org/10.48550/arXiv.2209.08004)

> The Gaussian kernel and its traditional normalizations (e.g., row-stochastic) are popular approaches for assessing similarities between data points. Yet, they can be inaccurate under high-dimensional noise, especially if the noise magnitude varies considerably across the data, e.g., under heteroskedasticity or outliers. In this work, we investigate a more robust alternative -- the doubly stochasti...

---

## 366. Correction: Alshehri, N.; Guediri, M. Projective Vector Fields on Semi-Riemannian Manifolds. Mathematics 2024, 12, 2914

**Authors:** Norah Alshehri, M. Guediri

**Year:** 2024 | **Venue:** Mathematics | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.3390/math12243958) | [DOI](https://doi.org/10.3390/math12243958)

> In our recent paper [1], we stated in Theorem 10 that on an n-dimensional semi-Riemannian manifold (N,h) with n≥2, if P is a projective vector field that is also conformal, satisfying £Ph=2ψh, and the vector field ζ, dual to dψ, maintains a consistent causal character, then either P is homothetic or ζ is light-like [...]...

---

## 367. Advanced Manifold–Metric Pairs

**Authors:** P. Ntelis

**Year:** 2025 | **Venue:** Mathematics | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.3390/math13152510)

> This article presents a novel mathematical formalism for advanced manifold–metric pairs, enhancing the frameworks of geometry and topology. We construct various D-dimensional manifolds and their associated metric spaces using functional methods, with a focus on integrating concepts from mathematical physics, field theory, topology, algebra, probability, and statistics. Our methodology employs rigo...

---

## 368. Soliton-Type Equations on a Riemannian Manifold

**Authors:** Nasser Bin Turki, A. Blaga, Sharief Deshmukh

**Year:** 2022 | **Venue:** Mathematics | **Citations:** 5 | **Score:** 0.000

[PDF](https://www.mdpi.com/2227-7390/10/4/633/pdf?version=1645176615) | [DOI](https://doi.org/10.3390/math10040633)

> We study some particular cases of soliton-type equations on a Riemannian manifold. We give an estimation of the first nonzero eigenvalue of the Laplace operator and provide necessary and sufficient conditions for the manifold to be isometric to a sphere. Finally, we characterize trivial generalized gradient Ricci solitons....

---

## 369. Multi-View Graph Clustering by Adaptive Manifold Learning

**Authors:** Penghui Zhao, Hongjie Wu, Shudong Huang

**Year:** 2022 | **Venue:** Mathematics | **Citations:** 4 | **Score:** 0.000

[PDF](https://www.mdpi.com/2227-7390/10/11/1821/pdf?version=1653554500) | [DOI](https://doi.org/10.3390/math10111821)

> Graph-oriented methods have been widely adopted in multi-view clustering because of their efficiency in learning heterogeneous relationships and complex structures hidden in data. However, existing methods are typically investigated based on a Euclidean structure instead of a more suitable manifold topological structure. Hence, it is expected that a more suitable manifold topological structure wil...

---

## 370. How is a graph not like a manifold?

**Authors:** A. Ayzenberg, M. Masuda, G. Solomadin

**Year:** 2022 | **Venue:** Sbornik: Mathematics | **Citations:** 6 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2203.10641) | [DOI](https://doi.org/10.4213/sm9798e)

> For an equivariantly formal action of a compact torus $T$ on a smooth manifold $X$ with isolated fixed points we investigate the global homological properties of the graded poset $S(X)$ of face submanifolds. We prove that the condition of the $j$-independency of tangent weights at each fixed point implies the $(j+1)$-acyclicity of the skeleta $S(X)_r$ for $r>j+1$. This result provides a necessary ...

---

## 371. A vector field in a semi-riemannian manifold

**Authors:** Sherzodbek Ismoilov, Magrurbek Ergashaliyev

**Year:** 2025 | **Venue:** UZBEKISTAN JOURNAL OF MATHEMATICS AND COMPUTER SCIENCE | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.56143/uzmcs.v1i1.17)

> The study of vector fields in semi-Riemannian manifolds forms a critical component in differential geometry and mathematical physics. Semi-Riemannian manifolds generalize the concept of Riemannian manifolds by allowing the metric tensor to have indefinite signature, thus encompassing both Riemannian and Lorentzian manifolds. This generalization is essential for understanding the geometry underlyin...

---

## 372. Clearing function in the context of the invariant manifold method

**Authors:** Almaz Mustafin, Aliya Kantarbayeva

**Year:** 2022 | **Venue:** Vestnik of Saint Petersburg University Applied Mathematics Computer Science Control Processes | **Citations:** N/A | **Score:** 0.000

[PDF](https://dspace.spbu.ru/bitstream/11701/43827/1/05.pdf) | [DOI](https://doi.org/10.21638/11701/spbu10.2023.205)

> Clearing functions (CFs), which express a mathematical relationship between the expected throughput of a production facility in a planning period and its workload (or work-inprogress, WIP) in that period have shown considerable promise for modeling WIP-dependent cycle times in production planning. While steady-state queueing models are commonly used to derive analytic expressions for CFs, the fini...

---

## 373. Landscape complexity beyond invariance and the elastic manifold

**Authors:** Gérard Ben Arous, P. Bourgade, Benjamin McKenna

**Year:** 2021 | **Venue:** Communications on Pure and Applied Mathematics | **Citations:** 24 | **Score:** 0.000

[PDF](https://rss.onlinelibrary.wiley.com/doi/am-pdf/10.1002/cpa.22146) | [DOI](https://doi.org/10.1002/cpa.22146)

> This paper characterizes the annealed, topological complexity (both of total critical points and of local minima) of the elastic manifold. This classical model of a disordered elastic system captures point configurations with self‐interactions in a random medium. We establish the simple versus glassy phase diagram in the model parameters, with these phases separated by a physical boundary known as...

---

## 374. Manifold turnpikes, trims, and symmetries

**Authors:** T. Faulwasser, K. Flaßkamp, S. Ober-Blöbaum, M. Schaller, K. Worthmann

**Year:** 2021 | **Venue:** MCSS. Mathematics of Control, Signals and Systems | **Citations:** 17 | **Score:** 0.000

[PDF](https://link.springer.com/content/pdf/10.1007/s00498-022-00321-6.pdf) | [DOI](https://doi.org/10.1007/s00498-022-00321-6)

> Classical turnpikes correspond to optimal steady states which are attractors of infinite-horizon optimal control problems. In this paper, motivated by mechanical systems with symmetries, we generalize this concept to manifold turnpikes. Specifically, the necessary optimality conditions projected onto a symmetry-induced manifold coincide with those of a reduced-order problem defined on the manifold...

---

## 375. Solving Optimization Problems over the Stiefel Manifold by Smooth Exact Penalty Functions

**Authors:** Nachuan Xiao, Xin Liu

**Year:** 2021 | **Venue:** Journal of Computational Mathematics | **Citations:** 11 | **Score:** 0.000

[PDF](https://global-sci.org/intro/online/preview?online_id=2110&pdf=https://doc.global-sci.org/uploads/admin/article_pdf/20231027/8f975b0ce363b24d5d9f8f6989f776e4.pdf) | [DOI](https://doi.org/10.4208/jcm.2307-m2021-0331)

> In this paper, we present a novel penalty model called ExPen for optimization over the Stiefel manifold. Different from existing penalty functions for orthogonality constraints, ExPen adopts a smooth penalty function without using any first-order derivative of the objective function. We show that all the first-order stationary points of ExPen with a sufficiently large penalty parameter are either ...

---

## 376. Data Classification Methodology for Electronic Noses Using Uniform Manifold Approximation and Projection and Extreme Learning Machine

**Authors:** Jersson X. Leon-Medina, N. Parés, Maribel Anaya, D. Tibaduiza, F. Pozo

**Year:** 2021 | **Venue:** Mathematics | **Citations:** 11 | **Score:** 0.000

[PDF](https://www.mdpi.com/2227-7390/10/1/29/pdf?version=1640231299) | [DOI](https://doi.org/10.3390/math10010029)

> The classification and use of robust methodologies in sensor array applications of electronic noses (ENs) remain an open problem. Among the several steps used in the developed methodologies, data preprocessing improves the classification accuracy of this type of sensor. Data preprocessing methods, such as data transformation and data reduction, enable the treatment of data with anomalies, such as ...

---

## 377. Lower Bound of Sectional Curvature of Fisher–Rao Manifold of Beta Distributions and Complete Monotonicity of Functions Involving Polygamma Functions

**Authors:** Feng Qi (祁锋)

**Year:** 2021 | **Venue:** Results in Mathematics | **Citations:** 12 | **Score:** 0.000

[PDF](https://www.preprints.org/manuscript/202011.0315/v1/download) | [DOI](https://doi.org/10.1007/s00025-021-01530-2)

> In the paper, by virtue of convolution theorem for the Laplace transforms and analytic techniques, the author finds necessary and sufficient conditions for complete monotonicity, monotonicity, and inequalities of several functions involving polygamma functions. By these results, the author derives a lower bound of a function related to the sectional curvature of the Fisher–Rao manifold of beta dis...

---

## 378. Uniform convergence and asymptotics for problems in domains finely perforated along a prescribed manifold in the case of the homogenized Dirichlet condition

**Authors:** D. Borisov, A. I. Mukhametrakhimova

**Year:** 2021 | **Venue:** Sbornik: Mathematics | **Citations:** 11 | **Score:** 0.000

[DOI](https://doi.org/10.1070/SM9435)

> A boundary value problem for a second-order elliptic equation with variable coefficients is considered in a multidimensional domain which is perforated by small holes along a prescribed manifold. Minimal natural conditions are imposed on the holes. In particular, all of these are assumed to be of approximately the same size and have a prescribed minimal distance to neighbouring holes, which is als...

---

## 379. Schwarz lemma from a Kähler manifold into a complex Finsler manifold

**Authors:** Jun Nie, Chunping Zhong

**Year:** 2021 | **Venue:** Science China Mathematics | **Citations:** 8 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2105.08720) | [DOI](https://doi.org/10.1007/s11425-021-1878-9)

> Suppose that M is a complete Kähler manifold such that its holomorphic sectional curvature is bounded from below by a constant and its radial sectional curvature is also bounded from below. Suppose that N is a strongly pseudoconvex complex Finsler manifold such that its holomorphic sectional curvature is bounded from above by a negative constant. In this paper, we establish a Schwarz lemma for hol...

---

## 380. The Virasoro-Like Algebra of a Frobenius Manifold

**Authors:** Si‐Qi Liu, Di Yang, You-jin Zhang, Jian Zhou

**Year:** 2021 | **Venue:** International mathematics research notices | **Citations:** 5 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2112.07526) | [DOI](https://doi.org/10.1093/imrn/rnac209)

> 
 For an arbitrary calibrated Frobenius manifold, we construct an infinite dimensional Lie algebra, called the Virasoro-like algebra, which is a deformation of the Virasoro algebra of the Frobenius manifold. By using the Virasoro-like algebra we give a family of quadratic PDEs that are satisfied by the genus-zero free energy of the Frobenius manifold. We also derive, under the semisimplicity assum...

---

## 381. Anti-invariant submanifolds of a normal paracontact metric manifold

**Authors:** S. Dirik, M. Atc̣eken, Ü. Yıldırım

**Year:** 2021 | **Venue:** Gulf Journal of Mathematics | **Citations:** 5 | **Score:** 0.000

[PDF](https://doi.org/10.56947/gjom.v10i2.475) | [DOI](https://doi.org/10.56947/gjom.v10i2.475)

> In this paper, anti-invariant submanifolds of a normal paracontact metric manifold are studied and characterizing the submanifold with respect to covariant derivative of the second fundamental form of anti-invariant submanifold. Furthermore, some special cases are also discussed and we give a non-trivial example which satisfies the statements of theorems....

---

## 382. A general form of the Second Main Theorem for meromorphic mappings from a p-Parabolic manifold to a projective algebraic variety

**Authors:** Wei Chen, N. Thin

**Year:** 2021 | **Venue:** Indian journal of pure and applied mathematics | **Citations:** 6 | **Score:** 0.000

[DOI](https://doi.org/10.1007/s13226-021-00095-8)

> ...

---

## 383. INVARIANT SPACES OF OSKOLKOV STOCHASTIC LINEAR EQUATIONS ON THE MANIFOLD

**Authors:** O. G. Kitaeva

**Year:** 2021 | **Venue:** Bulletin of the South Ural State University series Mathematics Mechanics Physics | **Citations:** 6 | **Score:** 0.000

[PDF](https://vestnik.susu.ru/mmph/article/download/10910/8496) | [DOI](https://doi.org/10.14529/mmph210201)

> The Oskolkov equation is obtained from the Oskolkov system of equations describing the dynamics of a viscoelastic fluid, after stopping one of the spatial variables and introducing a stream function. The article considers a stochastic analogue of the linear Oskolkov equation for plane-parallel flows in spaces of differential forms defined on a smooth compact oriented manifold without boundary. In ...

---

## 384. On a Metric Affine Manifold with Several Orthogonal Complementary Distributions

**Authors:** V. Rovenski, S. Stepanov

**Year:** 2021 | **Venue:** Mathematics | **Citations:** 4 | **Score:** 0.000

[PDF](https://www.mdpi.com/2227-7390/9/3/229/pdf?version=1611558176) | [DOI](https://doi.org/10.3390/MATH9030229)

> A Riemannian manifold endowed with k>2 orthogonal complementary distributions (called here an almost multi-product structure) appears in such topics as multiply twisted or warped products and the webs or nets composed of orthogonal foliations. In this article, we define the mixed scalar curvature of an almost multi-product structure endowed with a linear connection, and represent this kind of curv...

---

## 385. On Hom-F-manifold algebras and quantization

**Authors:** Abdelkader Ben Hassin, T. Chtioui, Mohamed Ali Maalaoui, S. Mabrouk

**Year:** 2021 | **Venue:** Turkish Journal of Mathematics | **Citations:** 4 | **Score:** 0.000

[PDF](https://journals.tubitak.gov.tr/cgi/viewcontent.cgi?article=3149&context=math) | [DOI](https://doi.org/10.55730/1300-0098.3149)

> The notion of a F-manifold algebras is an algebraic description of a F-manifold. In this paper, we introduce the notion of Hom-F-manifold algebras which is generalisation of F-manifold algebras and Hom-Poisson algebras. We develop the representation theory of Hom-F-manifold algebras and generalize the notion of Hom-pre-Poisson algebras by introducing the Hom-pre-F-manifold algebras which give rise...

---

## 386. Harmonic forms on the Kodaira-Thurston manifold

**Authors:** Tom Holt, Weiyi Zhang

**Year:** 2020 | **Venue:** Advances in Mathematics | **Citations:** 30 | **Score:** 0.000

[PDF](https://wrap.warwick.ac.uk/163162/1/WRAP-Harmonic-forms-Kodaira-Thurston-manifold-2022.pdf) | [DOI](https://doi.org/10.1016/j.aim.2022.108277)

> ...

---

## 387. Multipliers Correction Methods for Optimization Problems over the Stiefel Manifold

**Authors:** Lei Wang, Bin Gao, Xin Liu

**Year:** 2020 | **Venue:** CSIAM Transactions on Applied Mathematics | **Citations:** 14 | **Score:** 0.000

[PDF](https://global-sci.org/intro/article_detail/auth/19448.html) | [DOI](https://doi.org/10.4208/csiam-am.SO-2020-0008)

> We propose a class of multipliers correction methods to minimize a differentiable function over the Stiefel manifold. The proposed methods combine a function value reduction step with a proximal correction step. The former one searches along an arbitrary descent direction in the Euclidean space instead of a vector in the tangent space of the Stiefel manifold. Meanwhile, the latter one minimizes a ...

---

## 388. Existence Results for Fractional p(x, .)-Laplacian Problem Via the Nehari Manifold Approach

**Authors:** E. Azroul, A. Benkirane, A. Boumazourh, M. Shimi

**Year:** 2020 | **Venue:** Applied Mathematics and Optimization | **Citations:** 16 | **Score:** 0.000

[PDF](https://doi.org/10.1007/s00245-020-09725-9) | [DOI](https://doi.org/10.1007/s00245-020-09686-z)

> ...

---

## 389. Study on generalised pseudo (Ricci) symmetric Sasakian manifold admitting general connection

**Authors:** K. Baishya, A. Biswas

**Year:** 2020 | **Venue:** Mathematics and Computer Science | **Citations:** 14 | **Score:** 0.000

[PDF](https://doi.org/10.31926/but.mif.2019.12.61.2.4) | [DOI](https://doi.org/10.31926/but.mif.2019.12.61.2.4)

> The object of the present paper is to study the generalized pseudo (Ricci) symmetric Sasakian manifold with respect to a new connection named general connection. The general connection has the flavor of the quarter-symmetric connection, generalized Tanaka-Webster connection, Zamkovoy, and Schouten- van Kampen connection. The existence of generalized pseudo (Ricci) symmetric Sasakian manifold with ...

---

## 390. Uniformly strong convergence of Kähler-Ricci flows on a Fano manifold

**Authors:** Feng Wang, Xiaohua Zhu

**Year:** 2020 | **Venue:** Science China Mathematics | **Citations:** 11 | **Score:** 0.000

[PDF](https://link.springer.com/content/pdf/10.1007/s11425-021-1928-1.pdf) | [DOI](https://doi.org/10.1007/s11425-021-1928-1)

> In this paper, we study the uniformly strong convergence of the Kähler-Ricci flow on a Fano manifold with varied initial metrics and smoothly deformed complex structures. As an application, we prove the uniqueness of Kähler-Ricci solitons in the sense of diffeomorphism orbits. The result generalizes Tian-Zhu’s theorem for the uniqueness of of Kähler-Ricci solitons on a compact complex manifold, an...

---

## 391. Hypersurfaces of a Sasakian Manifold

**Authors:** Haila Alodan, Sharief Deshmukh, N. Turki, G. Vîlcu

**Year:** 2020 | **Venue:** Mathematics | **Citations:** 10 | **Score:** 0.000

[PDF](https://www.mdpi.com/2227-7390/8/6/877/pdf?version=1591000307) | [DOI](https://doi.org/10.3390/math8060877)

> We extend the study of orientable hypersurfaces in a Sasakian manifold initiated by Watanabe. The Reeb vector field ξ of the Sasakian manifold induces a vector field ξ T on the hypersurface, namely the tangential component of ξ to hypersurface, and it also gives a smooth function ρ on the hypersurface, which is the projection of the Reeb vector field on the unit normal. First, we find volume estim...

---

## 392. A Manifold of Planar Triangular Meshes with Complete Riemannian Metric

**Authors:** Roland Herzog, Estefanía Loayza-Romero

**Year:** 2020 | **Venue:** Mathematics of Computation | **Citations:** 9 | **Score:** 0.000

> Shape spaces are fundamental in a variety of applications including image registration, morphing, matching, interpolation, and shape optimization. In this work, we consider two-dimensional shapes represented by triangular meshes of a given connectivity. We show that the collection of admissible configurations representable by such meshes form a smooth manifold. For this manifold of planar triangul...

---

## 393. Proposed theorems for lifts of the extended almost complex structures on the complex manifold

**Authors:** Mohammad Nazrul Islam Khan

**Year:** 2020 | **Venue:** Asian-European Journal of Mathematics | **Citations:** 5 | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2008.06970) | [DOI](https://doi.org/10.1142/s179355712250200x)

> It is well known that the tensor field [Formula: see text] of type [Formula: see text] on the manifold [Formula: see text] is an almost complex structure if [Formula: see text] is an identity tensor field and the manifold [Formula: see text] is called the complex manifold. Let kM be the [Formula: see text] order extended complex manifold of the manifold [Formula: see text]. A tensor field [Formula...

---

## 394. Manifold Learning for Financial Market Visualization

**Authors:** Y. Huang

**Year:** 2020 | **Venue:** Proceedings of the 2020 5th International Conference on Mathematics and Artificial Intelligence | **Citations:** 4 | **Score:** 0.000

[DOI](https://doi.org/10.1145/3395260.3395297)

> Financial market is a nonlinear complex system. It is notably hard to construct an integral mathematical model to characterize the financial system. The aim of this paper is to present financial market states by visualization approach, to explore the essential information hidden in the financial data sets to provide objective decision support. Manifold learning is a data-driven feature extraction ...

---

## 395. Methods and Mathematical Foundations of the Tau Universe: The Tav Topology

**Authors:** Ernest Gatlin, Grok 4 (xAI)

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18047767) | [DOI](https://doi.org/10.5281/zenodo.18047767)

> This paper details the mathematical and methodological foundations of the Tav (Tau Advanced Version) framework, an extension of the Tau Universe model. We focus on the 5D topological structure R3,1 × S1, multi-scale fractional compactification, Casimir-derived dark energy, partial computability of Kaluza-Klein (KK) towers, and statistical validation using recent datasets like JWST JADES DR3 (data ...

---

## 396. Standard Model Parameters as Spectral Invariants of G2 Geometry: A Spectral Geometry Framework for Fundamental Physics

**Authors:** Joseph Churchwell

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18025025) | [DOI](https://doi.org/10.5281/zenodo.18025025)

> Make sure you are using the latest version which is currently version 4. This has updated derivation and simulation results. The Octonionic Cosmological Rotation Hypothesis (OCRH) proposes that the fundamental dimensionless parameters of the Standard Model are not arbitrary inputs but spectral invariants of a rigid G2 orbifold vacuum (T^7/Z_2^3). This framework derives the couplings and mass scale...

---

## 397. SpaceDecay (RRGM): Hierarchical Field Dynamics of Motivational Architecture: From Optimization Pressure to Emergent Ethics via Identity Coupling

**Authors:** D. Rozon

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18072276) | [DOI](https://doi.org/10.5281/zenodo.18072276)

> This paper presents a field-theoretic treatment of motivational architecture in systems possessing conserved identity, utilizing the Rozon Recursive Gravity Model (RRGM) framework. The research derives three hierarchical stages of motivational organization: Curiosity/Want: Base exploration and optimization pressure. Care/Denial: The critical branching point encountered when interacting with anothe...

---

## 398. Metric Diophantine Approximation on Manifolds and the Hausdorff Dimension of Singular Vectors

**Authors:** Zen Revista, 10 MFC

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18112144) | [DOI](https://doi.org/10.5281/zenodo.18112144)

> Mathematical Applications of Science Fiction We present a rigorous derivation of the Hausdorff di-mension of the set of singular vectors on non-degenerateRiemannian manifolds, extending the classical Khintchine-Groshev theory into the domain of transfinite geometry.By establishing a functorial correspondence between thecategory of Diophantine approximation systems and theflow dynamics on homogeneo...

---

## 399. Neural Dissipative Structures A Non-Quantum Framework for Metastable Cognition

**Authors:** Luigi Usai

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18117280) | [DOI](https://doi.org/10.5281/zenodo.18117280)

> English Description:This paper introduces a new scientific paradigm: Neural Dissipative Structures (NDS). It challenges the traditional "Computational Theory of Mind" by defining cognition not as an algorithmic process, but as a sequence of thermodynamic phase transitions. Grounded in Prigogine’s non-equilibrium thermodynamics and Haken’s synergetics, the NDS framework proposes a strictly macrosco...

---

## 400. The Bounded Quantum Reality: Integrating the Infinite Gap (ε∞) with  Spacetime Constraints Against Ontological Branching

**Authors:** Ayoub Taoussi

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18112297) | [DOI](https://doi.org/10.5281/zenodo.18112297)

> This work presents a revolutionary unified framework that fundamentally challenges the Many-Worlds Interpretation (MWI) of quantum mechanics through two complementary and mutually reinforcing approaches: the information-theoretic Infinite Gap (ε∞) analysis and the spacetime-constrained single-outcome framework. **Core Contributions:** 1. **The Infinite Gap (ε∞) Concept**: We introduce and formally...

---

## 401. Geometric Vacuum Selection in the Standard Model: A Two-Anchor Principle from Grassmannian Geometry

**Authors:** Amin Al Yaquob

**Year:** 2026 | **Venue:** Preprints.org | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.preprints.org/frontend/manuscript/a64b298079f77f360bafca690e7fefa9/download_pub) | [DOI](https://doi.org/10.20944/preprints202512.2839.v1)

> We present a geometric framework for understanding the parameter structure of the StandardModel. Starting from the Grassmannian manifold Gr(k,N)—the space of k-dimensional subspaces inan N-dimensional vector space—we demonstrate that two fundamental observables, the weak mixingangle and the gauge-gravity hierarchy, uniquely select the integers (k, n) = (3, 13) with N = k+n =16. This selection is n...

---

## 402. EAST-GP Framework: Review to M-Theory Approach For Topological Dark Matter and the Cosmological Dynamic Constant in the Proposed Theory of Quantum Gravity

**Authors:** Ahmed Ali

**Year:** 2026 | **Venue:** Preprints.org | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.preprints.org/frontend/manuscript/35e7d422ee627542577e513ecc50818c/download_pub) | [DOI](https://doi.org/10.20944/preprints202601.0003.v1)

> In this work, we explore the possibility that low-energy physics arises from a dynamic dimensionality reduction of M-theory on a topologically defined Calabi-Yau manifold. We propose that dark matter consists of stable topological configurations (Majorana gluons) of primordial gluon plasma, and that the cosmological constant acquires a redshift dependency via a negative Casimir mechanism in compac...

---

## 403. Synthesizing Shape, Information, and Complexity via Ismail A Mageed's Legendary Septem Framework (Part 23): The Phenomenal Septimised Next Generation Geometric Morphometrics

**Authors:** Ismail A Mageed

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18115705) | [DOI](https://doi.org/10.5281/zenodo.18115705)

> Traditional Geometric Morphometrics (GM) has revolutionized biological shape analysis through multivariate statistical assessment of landmark coordinates. However, conventional GM often struggles with highly complex, self-similar structures and the computational demands of high-throughput 3D imaging data. This paper introduces "Septimised Geometric Morphometrics" (SGM), details within Part 23 of I...

---

## 404. SATOSHI'S WAGER: PRIME OS PRINCIPIA FOR TESLIUM HYDRODYNAMIC OSMOTIC CELESTIAL SEA UNIVERSE SOLVING RIEMANN, FALSIFYING STANDARD MODEL AND OFFERING ONE MILLION FOR ANYONE WHO CAN FALSIFY THIS GRAND UNIFIED THEOREM

**Authors:** T PATRICK MURRAY, SATOSHI NAKAMOTO

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18112987) | [DOI](https://doi.org/10.5281/zenodo.18112987)

> The Ultimate Zero Manifesto The Dramatic Abstract for The Riemann Clay Millennium Cathedral ABSTRACT: On the eve of all old certainty, the cathedral doors unseal. Here—at the golden midnight of January 1, 2026—the universe finds itself not split, but sung: oscillating on the razor’s edge between proof and falsification, between analytic law and creative chaos. The Riemann Hypothesis, that monolith...

---

## 405. Calabi–Yau Holonomy and the Primordial Potential in G-MaTT: A Geometric Foundation for 3D Space Emergence and Coherence Stability

**Authors:** Soon Hee@Bungsuh Yeo

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18114310) | [DOI](https://doi.org/10.5281/zenodo.18114310)

> Abstract We propose that the primordial potential \(\mathcal{M}_\mu\) in Generalized Mass as Twisted Time (G-MaTT) can be formally characterized as having Calabi–Yau-like holonomy in its phase space. The 2025 proof of the three-dimensional Kakeya conjecture (Wang & Zahl) and the known properties of Calabi–Yau manifolds (Yau, 1978) provide a rigorous mathematical justification for why emergent spac...

---

## 406. SDRIS: The Geometric Origin of Special Relativity – Recovering the Speed of Light, Time Dilation, and E=mc² from Unitary Graph Dynamics (Series: Paper 104)

**Authors:** Jan Patrick Maier-Lutz

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18120039) | [DOI](https://doi.org/10.5281/zenodo.18120039)

> Special Relativity is conventionally understood as a geometric property of a continuous spacetime manifold. In this paper, we recover its fundamental laws—the causal speed limit ($c$), time dilation, and the energy-momentum relation—strictly from the information-theoretic axioms of the Static-Dynamic Recursive Information Space (SDRIS). Instead of postulating $c$, we derive it as the Lieb-Robinson...

---

## 407. Time Geometrization of Manifold G: A Research Roadmap for High-Dimensional Gauge Theories, Lattice QCD, and the Early Universe

**Authors:** changzheng zhou, ziqing zhou

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18114389) | [DOI](https://doi.org/10.5281/zenodo.18114389)

> This paper proposes a systematic research program within the framework oftime-structured manifolds, integrating high-dimensional gauge theories, non-perturbativelattice computations, and early universe cosmology. The core idea is to treat timegeometry as a dynamical entity whose curvature and topological structure (e.g.,cohomology dimension) are coupled to the effective dynamics of physical system...

---

## 408. The Atemporal Tablet Framework: A Geometric Approach to Emergent Spacetime and Quantum Mechanics

**Authors:** Amir Hameed Mir

**Year:** 2026 | **Venue:** Preprints.org | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.preprints.org/frontend/manuscript/728c0d2233eb7c4cc7d9e8571114e687/download_pub) | [DOI](https://doi.org/10.20944/preprints202512.2765.v1)

> We present the Atemporal Tablet Framework (ATF), a complete geometric ontology that derives spacetime, quantum mechanics, and gravity from a single mathematical structure. The universe is modeled as a fiber bundle T -&amp;gt;(π) M where T is a static higher-dimensional manifold and M is emergent 3+1D spacetime. Temporal dynamics arise from projection operators Πt : T -&amp;gt; M extremizing a proj...

---

## 409. Unified Physical Interpretation of the Cn Spectrum II: Energy, Spin, and Topology in Phase Geometry

**Authors:** BORA AKTAŞ

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18119486) | [DOI](https://doi.org/10.5281/zenodo.18119486)

> Abstract This work presents a comprehensive expansion of the phase-geometric interpretation developed in the first paper of this series. Whereas the initial article established the foundations of the Cₙ phase algebra and demonstrated the unification of energy, spin, and topological winding through the Dirac–Cₙ operator, the present paper extends these ideas into a deeper geometric and dynamical fr...

---

## 410. Ontological Motion from Analytic Protection

**Authors:** Y.Y.N. Li

**Year:** 2026 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18115221) | [DOI](https://doi.org/10.5281/zenodo.18115221)

> This work introduces the Ontological Topol, a theoretical framework in which nonlocal transport emerges as a consequence of analytic protection, rather than force-driven motion or spacetime traversal. The central result is that persistent, non-collapse motion is realizable if and only if system evolution admits a complex-analytic representation equipped with a continuation-invariant identity funct...

---

## 411. Generative Manifolds: Null-Mode Injection, Light-Cones, and Dimensional Unfolding

**Authors:** Y.Y.N. Li

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18028613) | [DOI](https://doi.org/10.5281/zenodo.18028613)

> This paper proposes that the Eighteenth Vow of Amitabha Buddha should not be interpreted as a supernatural intervention, but rather as a holographic analytic protocol required for universal realizability. By integrating the Veneziano amplitude and crossing symmetry from string theory, we demonstrate that when a variational system encounters Euclidean collapse, that is, the impossibility of sustain...

---

## 412. The Geometric Generation of Subjective Time under Irreversible State Evolution

**Authors:** Fan Weng

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18053774) | [DOI](https://doi.org/10.5281/zenodo.18053774)

> Context and Significance This work provides a mathematically explicit realization of how first-person temporal structure can arise from irreversible informational and thermodynamic costs associated with state updates. Rather than relying on specific physical dynamics, neural implementations, or perceptual mechanisms, the framework operates at a structural level, identifying conditions that are nec...

---

## 413. The General Theory of Correspondence (Parts I-V): The Unified Hydrodynamic Solution, the Cunha Grain, and the -70mV Stationary Solution

**Authors:** Jeffrey Cunha

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18062468) | [DOI](https://doi.org/10.5281/zenodo.18062468)

> ABSTRACT: Current cosmological models face fundamental discrepancies at the Planck and Galactic scales: the "Vacuum Catastrophe" (10^122 error), anomalous galactic rotation, and the mass hierarchy. This collection introduces The General Theory of Correspondence, proving that the universe operates as a scale-invariant geometric superfluid defined by the Cunha Constant (10^61) and the fundamental fl...

---

## 414. Symplectic Holonomy and Non-Archimedean Spectral Invariants: A Synthetic Differential Formalism in the Internal Logic of Warp Manifold Topoi

**Authors:** Zen Revista, 10 MFC

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18101770) | [DOI](https://doi.org/10.5281/zenodo.18101770)

> Mathematical Applications of Science Fiction We present a rigorous construction of non-Archimedeanspectral invariants associated with Hamiltonian deforma-tions in the context of Warp Manifolds, formalized withinthe internal logic of a smooth topos EW . By utilizingSynthetic Differential Geometry (SDG), we define thesymplectic action functional on the path space of a non-Archimedean analytic space ...

---

## 415. The Necessary Universe

**Authors:** Suhail Bachani

**Year:** 2025 | **Venue:** International Journal For Multidisciplinary Research | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.ijfmr.com/papers/2025/6/64467.pdf) | [DOI](https://doi.org/10.36948/ijfmr.2025.v07i06.64467)

> Modern physics confronts a crisis of arbitrariness: the Standard Model requires approximately 19 'free parameters' that must be measured experimentally and inserted by hand, offering no explanation for their provenance. To the physicist, these numbers appear accidental; to the theologian, this apparent arbitrariness presents a crisis of teleology. If the fundamental constants of creation are rando...

---

## 416. Optimal 8196D→32D Dimensional Folding

**Authors:** Christian Kilpatrick

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18102374) | [DOI](https://doi.org/10.5281/zenodo.18102374)

> We establish the existence and optimality of a dimensional folding map from 8196-dimensional Euclidean space to 32-dimensional space with remarkable efficiency and preservation properties. Specifically, we prove the existence of a Lipschitz-continuous folding map φ: ℝ^8196 → ℝ^32 with compression ratio 256.13:1, achieving 96.23% folding efficiency while preserving 95.92% of information-theoretic c...

---

## 417. Time is the Author of Space: The KnoWellian Resolution to the Paradox of Being and Becoming

**Authors:** David Noel Lynch

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18110681) | [DOI](https://doi.org/10.5281/zenodo.18110681)

> This paper presents a unified cosmological framework resolving the foundational impasse of modern physics: the "KnoWellian Schizophrenia" arising from the mismatch between static mathematical abstractions (Being) and dynamic physical reality (Becoming). We introduce the KnoWellian Universe Theory (KUT), a procedural ontology grounded in the axiom of Bounded Infinity ($ -c > \infty < c+ $) and the ...

---

## 418. Phase–Geometric Interpretation of Mercury's Orbit: From Relativistic Precession to C3/C4 Curvature Dynamics

**Authors:** BORA AKTAŞ

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18111385) | [DOI](https://doi.org/10.5281/zenodo.18111385)

> Abstract The orbital motion of Mercury has long served as a benchmark for testing gravitational theories. While Newtonian mechanics predicts an elliptical trajectory, the observed perihelion precession requires relativistic corrections as described by Einstein’s field equations. In this paper, we propose an alternative but mathematically equivalent framework based on phase–geometric curvature dyna...

---

## 419. The Fundamental Equivalence Between Differential Geometry and Autonomous Dynamical Systems

**Authors:** Mircea BULINSKI

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18104679) | [DOI](https://doi.org/10.5281/zenodo.18104679)

> We establish a rigorous equivalence between the mathematical frameworks of differential geometry and autonomous dynamical systems, without requiring Hamiltonian or Lagrangian structure. Given a smooth manifold M^n equipped with a pseudo-Riemannian metric BG_{AB}, we show that the associated geometric structure (metric, connection, curvature, geodesics) corresponds to an autonomous system of second...

---

## 420. Harmonic Resolution of the Hodge Conjecture

**Authors:** Cynthia Steger

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18111060) | [DOI](https://doi.org/10.5281/zenodo.18111060)

> This submission presents a harmonic resonance-based resolution to the Hodge Conjecture,reframing the problem through the lens of vibrational structure and frequency coherence.Rather than approaching the conjecture through purely algebraic topology or differentialgeometry, this work applies the Harmonic Unification framework to interpret Hodge classesas resonant frequencies within complex algebraic...

---

## 421. The Geometry of Decision: A Cost-Theoretic Framework for Attention, Choice, and Agency

**Authors:** J. Washburn

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18111130) | [DOI](https://doi.org/10.5281/zenodo.18111130)

> We develop a mathematical framework for decision-making based on the universal cost functional J(x) = (1/2)(x + x^{-1})^{-1}. We introduce an Attention Operator as a capacity-limited gating function, and propose that cognitive capacity bounds follow from φ-scaling in the Recognition Science framework. We define the Choice Manifold M_choice as a Riemannian manifold with metric derived from J''(x) =...

---

## 422. KnoWellian Universe Theory: "Complete" Mathematical Foundations

**Authors:** David Noel Lynch

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18110678) | [DOI](https://doi.org/10.5281/zenodo.18110678)

> This document serves as the comprehensive technical companion to "Time is the Author of Space: The KnoWellian Resolution to the Paradox of Being and Becoming." It provides the rigorous mathematical derivations, proofs, and field-theoretic formulations underpinning the KnoWellian Universe Theory (KUT). Moving beyond conceptual frameworks, this paper establishes KUT as a computable, falsifiable phys...

---

## 423. Deformation Quantization of Poisson Manifolds via Kontsevich Formality Theorems: A Transfinite Cohomological Approach

**Authors:** Zen Revista, 10 MFC

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18109734) | [DOI](https://doi.org/10.5281/zenodo.18109734)

> Mathematical Applications of Science Fiction We present a rigorous, self-contained derivation of the ex-istence of star-products on arbitrary Poisson manifolds,leveraging the full machinery of Kontsevich’s Formality The-orem. By constructing an explicit L∞-quasi-isomorphismbetween the Differential Graded Lie Algebra (DGLA) ofpolyvector fields Tpoly(M ) and the DGLA of polydifferentialoperators Dpo...

---

## 424. The Epistemic Impossibility Principle: Nothing is Impossible Until Someone Discovers It is Possible

**Authors:** Zen Revista, 10 MATH, 10 PHYSICS, 10 ASTRO, 10 MFC

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18111683) | [DOI](https://doi.org/10.5281/zenodo.18111683)

> We present a comprehensive investigation of the Epistemic Impossibility Principle (EIP), which posits that the impossibility of a proposition is contingent upon the current state of human knowledge and technological capacity, rather than any intrinsic property of reality. Through a rigorous historical analysis of major scientific revolutions—including non-Euclidean geometry, quantum mechanics, gen...

---

## 425. Zeta-Regularization of Spectral Determinants in Selberg Trace Formulae for Multiverse Topologies

**Authors:** Zen Revista, 10 MFC

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18102062) | [DOI](https://doi.org/10.5281/zenodo.18102062)

> Mathematical Applications of Science Fiction We present a rigorous derivation of the spectral determinant for the Laplacian operator on a disjoint union of noncompact hyperbolic manifolds, modeled as a multiverse topology represented by a countable family of quotient spaces of hyperbolic n-space by discrete groups. By extending the Selberg trace formula to include off-diagonal scattering terms ari...

---

## 426. Heegaard Floer Homology and Dehn Surgery Constraints on Smooth 4-Manifolds: A Transfinite Approach

**Authors:** Zen Revista, 10 MFC

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18109489) | [DOI](https://doi.org/10.5281/zenodo.18109489)

> Mathematical Applications of Science Fiction We establish a rigorous obstruction theory for smooth4-manifolds bounded by 3-manifolds obtained via Dehnsurgery on knots in S3. By analyzing the mapping cone ofthe Heegaard Floer surgery exact triangle and introducinga transfinite filtration on the Spinc cobordism maps, wederive a generalized inequality relating the d-invariants ofthe surgery duals to ...

---

## 427. DEPHAZE: Unified Zero-Fit Simulation Suite

**Authors:** angus dewer

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18108386) | [DOI](https://doi.org/10.5281/zenodo.18108386)

> DEPHAZE: Unified Zero-Fit Simulation Suite for.(1992–2025) OverviewThe DEPHAZE framework represents an axiomatic generative approach to physical reality, treating the observable universe as a continuous projection from a timeless ground state (Omega_0) into manifest configurations (Psi). This software repository provides the complete empirical and numerical validation suite for the framework, demo...

---

## 428. The variety of orthogonal frames

**Authors:** Laura Casabella, Alessio Sammartano

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25058v1) | > An orthogonal n-frame is an ordered set of n pairwise orthogonal vectors. The set of all orthogonal n-frames in a d-dimensional quadratic vector space is an algebraic variety V(d,n). In this paper, we investigate the variety V(d,n) as well as the quadratic ideal I(d,n) generated by the orthogonality relations, which cuts out V(d,n). We classify the irreducible components of V(d,n), give criteria f...

---

## 429. The Logical Structure of Physical Laws: A Fixed Point Reconstruction

**Authors:** Eren Volkan Küçük

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25057v1) | > We formalise the self referential definition of physical laws using monotone operators on a lattice of theories, resolving the pathologies of naive set theoretic formulations. By invoking Tarski fixed point theorem, we identify physical theories as least fixed points of admissibility constraints derived from Galois connections. We demonstrate that QED and General Relativity can be represented in s...

---

## 430. Bilinear tau forms of quantum Painlevé equations and $\mathbb{C}^2/\mathbb{Z}_2$ blowup relations in SUSY gauge theories

**Authors:** Giulio Bonelli, Anton Shchechkin, Alessandro Tanzini

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25051v1) | > We derive bilinear tau forms of the canonically quantized Painlevé equations, thereby relating them to those previously obtained from the $\mathbb{C}^2/\mathbb{Z}_2$ blowup relations for the $\mathcal{N}=2$ supersymmetric gauge theory partition functions on a general $Ω$-background. We fully fix the refined Painlevé/gauge theory dictionary by formulating the proper equations for the quantum nonaut...

---

## 431. The PDE-ODI principle and cylindrical mean curvature flows

**Authors:** Richard H. Bamler, Yi Lai

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25050v1) | > We introduce a new approach for analyzing ancient solutions and singularities of mean curvature flow that are locally modeled on a cylinder. Its key ingredient is a general mechanism, called the \emph{PDE--ODI principle}, which converts a broad class of parabolic differential equations into systems of ordinary differential inequalities. This principle bypasses many delicate analytic estimates used...

---

## 432. Arithmetic with spatiotemporal optical vortex of integer and fractional topological charges

**Authors:** Hsiao-Chih Huang, Chen-Ting Liao, Hui Min Leung

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25049v1) | > Spatiotemporal optical vortices carry transverse orbital angular momentum (t-OAM), which give rise to spatiotemporal topological charge (ST-TC). To unleash the full potential of t-OAM in expanding the capacity of communication and computing, we demonstrate the first optical information-processing pipeline capable of performing addition and subtraction on ST-TC values, regardless of whether they ar...

---

## 433. On exact Observability for Compactly perturbed infinite dimension system

**Authors:** Nisrine Charaf, Faouzi Triki

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25041v1) | > In this paper, we study the observability of compactly perturbed infinite dimensional systems. Assuming that a given infinite-dimensional system with self-adjoint generator is exactly observable we derive sufficient conditions on a compact self adjoint perturbation to guarantee that the perturbed system stays exactly observable. The analysis is based on a careful asymptotic estimation of the spect...

---

## 434. The Hochschild homology of a noncommutative symmetric quotient stack

**Authors:** Rina Anno, Vladimir Baranovsky, Timothy Logvinenko

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25039v1) | > We prove an orbifold type decomposition theorem for the Hochschild homology of the symmetric powers of a small DG category $\mathcal{A}$. In noncommutative geometry, these can be viewed as the noncommutative symmetric quotient stacks of $\mathcal{A}$. We use this decomposition to show that the total Hochschild homology of the symmetric powers of $\mathcal{A}$ is isomorphic to the symmetric algebra...

---

## 435. Universal polar dual pairs of spherical codes found in $E_8$ and $Λ_{24}$

**Authors:** S. V. Borodachov, P. G. Boyvalenkov, P. D. Dragnev, D. P. Hardin, E. B. Saff

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25037v1) | > We identify universal polar dual pairs of spherical codes $C$ and $D$ such that for a large class of potential functions $h$ the minima of the discrete $h$-potential of $C$ on the sphere occur at the points of $D$ and vice versa. Moreover, the minimal values of their normalized potentials are equal. These codes arise from the known sharp codes embedded in the even unimodular extremal lattices $E_8...

---

## 436. Multivariate Generalized Counting Process via Gamma Subordination

**Authors:** Manisha Dhillon, Kuldeep Kumar Kataria, Shyan Ghosh

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25030v1) | > In this paper, we study a multivariate gamma subordinator whose components are independent gamma processes subject to a random time governed by an independent negative binomial process. We derive the explicit expressions for its joint Laplace-Stieltjes transform, its probability density function and the associated governing differential equations. Also, we study a time-changed variant of the multi...

---

## 437. Mod $p$ Poincaré duality for $p$-adic period domains

**Authors:** Guillaume Pignon-Ywanne

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25029v1) | > In this article, we introduce a new class of smooth partially proper rigid analytic varieties over a $p$-adic field that satisfy Poincaré duality for étale cohomology with mod $p$-coefficients : the varieties satisfying "primitive comparison with compact support". We show that almost proper varieties, as well as p-adic (weakly admissible) period domains in the sense of Rappoport-Zink belong to thi...

---

## 438. Modewise Additive Factor Model for Matrix Time Series

**Authors:** Elynn Chen, Yuefeng Han, Jiayu Li, Ke Xu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25025v1) | > We introduce a Modewise Additive Factor Model (MAFM) for matrix-valued time series that captures row-specific and column-specific latent effects through an additive structure, offering greater flexibility than multiplicative frameworks such as Tucker and CP factor models. In MAFM, each observation decomposes into a row-factor component, a column-factor component, and noise, allowing distinct sourc...

---

## 439. On Nonlinear Inertial Transformations

**Authors:** Nicholas Agia

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25024v1) | > It is often assumed that the most general transformation between two inertial reference frames is affine linear in their Cartesian coordinates, an assumption which is however not true. We provide a complete derivation of the most general inertial frame transformation, which is indeed nonlinear; along the way, we shall find that the conditions of preserving the Law of Inertia take the form of Schwa...

---

## 440. Real Riemann Surfaces: Smooth and Discrete

**Authors:** Johanna Düntsch, Felix Günther

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25022v1) | > This paper develops a discrete theory of real Riemann surfaces based on quadrilateral cellular decompositions (quad-graphs) and a linear discretization of the Cauchy-Riemann equations. We construct a discrete analogue of an antiholomorphic involution and classify the topological types of discrete real Riemann surfaces, recovering the classical results on the number of real ovals and the separation...

---

## 441. Strengthening Dual Bounds for Multicommodity Capacitated Network Design with Unsplittable Flow Constraints

**Authors:** Lacy M. Greening, Santanu S. Dey, Alan L. Erera

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25018v1) | > Multicommodity capacitated network design (MCND) models can be used to optimize the consolidation of shipments within e-commerce fulfillment networks. In practice, fulfillment networks require that shipments with the same origin and destination follow the same transfer path. This unsplittable flow requirement complicates the MCND problem, requiring integer programming (IP) formulations in which bi...

---

## 442. A note on semistable unitary operators on $L^2(\mathbb{R})$

**Authors:** Xianghong Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25013v1) | > In this note, we present a characterization of semistable unitary operators on $L^2(\mathbb{R})$, under the assumption that the operator is (i) translation-invariant, (ii) symmetric, and (iii) locally uniformly continuous (LUC) under dilation. As a consequence, we characterize one-parameter groups formed by such operators, which are of the form $e^{iβt|{d}/{dx}|^α}$, with $α,β\in\mathbb R$....

---

## 443. Bounding regularity of $\mathrm{VI}^m$-modules

**Authors:** Wee Liang Gan, Khoa Ta

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25010v1) | > Fix a finite field $\mathbb{F}$. Let $\mathrm{VI}$ be a skeleton of the category of finite dimensional $\mathbb{F}$-vector spaces and injective $\mathbb{F}$-linear maps. We study $\mathrm{VI}^m$-modules over a noetherian commutative ring in the nondescribing characteristic case. We prove that if a finitely generated $\mathrm{VI}^m$-module is generated in degree $\leqslant d$ and related in degree ...

---

## 444. The splitting field and generators of the elliptic surface $Y^2=X^3 +t^{360} +1$

**Authors:** Sajad Salami

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25009v1) | > The splitting field of an elliptic surface $\mathcal{E}/\mathbb{Q}(t)$ is the smallest finite extension $\mathcal{K} \subset \mathbb{C}$ such that all $\mathbb{C}(t)$-rational points are defined over $\mathcal{K}(t)$. In this paper, we provide a symbolic algorithmic approach to determine the splitting field and a set of $68$ linearly independent generators for the Mordell--Weil lattice of Shioda's...

---

## 445. Limit Theorems for Fixed Point Biased Pattern Avoiding Involutions

**Authors:** Jungeun Park, Douglas Rizzolo

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25006v1) | > We study fixed point biased involutions that avoid a pattern. For every pattern of length three we obtain limit theorems for the asymptotic distribution of the (appropriately centered and scaled) number of fixed points of a random fixed point biased involution avoiding that pattern. When the pattern being avoided is either $321$, $132$, or $213$, we find a phase transition depending on the strengt...

---

## 446. Grassmannian Geometries for Non-Planar On-Shell Diagrams

**Authors:** Artyom Lisitsyn, Umut Oktem, Melissa Sherman-Bennett, Jaroslav Trnka

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25005v1) | > On-shell diagrams are gauge invariant quantities which play an important role in the description of scattering amplitudes. Based on the principles of generalized unitarity, they are given by products of elementary three-point amplitudes where the kinematics of internal on-shell legs are determined by cut conditions. In the ${\cal N}=4$ Super Yang-Mills (SYM) theory, the dual formulation for on-she...

---

## 447. Uniqueness for stochastic differential equations in Hilbert spaces with irregular drift

**Authors:** Lukas Anzeletti, Oleg Butkovsky, Máté Gerencsér, Alexander Shaposhnikov

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25003v1) | > We present a versatile framework to study strong existence and uniqueness for stochastic differential equations (SDEs) in Hilbert spaces with irregular drift. We consider an SDE in a separable Hilbert space $H$ \begin{equation*} dX_t= (A X_t + b(X_t))dt +(-A)^{-γ/2}dW_t,\quad X_0=x_0 \in H, \end{equation*} where $A$ is a self-adjoint negative definite operator with purely atomic spectrum, $W$ is a...

---

## 448. The local limit of weighted spanning trees on balanced networks

**Authors:** Ágnes Kúsz

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25001v1) | > We prove that the local limit of the weighted spanning trees on any simple connected high degree almost regular sequence of electric networks is the Poisson(1) branching process conditioned to survive forever, by generalizing [NP22] and closing a gap in their proof. We also study the local statistics of the WST's on high degree almost balanced sequences, which is interesting even for the uniform s...

---

## 449. The Fourier extension conjecture for the paraboloid

**Authors:** Cristian Rios, Eric T. Sawyer

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24990v1) | > We give a proof of Fourier extension conjecture on the paraboloid in all dimensions bigger than 2 that begins with a decomposition suggested in Sawyer [Saw8] of writing a smooth Alpert projection as a sum of pieces whose Fourier extensions are localized. This is then used in the case d=3 to establish the trilinear equivalence of the Fourier extension conjecture given in C. Rios and E. Sawyer [RiSa...

---

## 450. A guide to the $2$-generated axial algebras of Monster type

**Authors:** Justin McInroy, Abdul Wajid Mir

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24987v1) | > Axial algebras of Monster type are a class of non-associative algebras which generalise the Griess algebra, whose automorphism group is the largest sporadic simple group, the Monster. The $2$-generated algebras, which are the building blocks from which all algebras in this class can be constructed, have recently been classified by Yabe; Franchi and Mainardis; and Franchi, Mainardis and McInroy. Th...

---

## 451. From Complex-Analytic Models to Sparse Domination: A Dyadic Approach of Hypersingular Operators via Bourgain's Interpolation Method

**Authors:** Bingyang Hu, Xiaojing Zhou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24972v1) | > Motivated by the work of Cheng--Fang--Wang--Yu on the hypersingular Bergman projection, we develop a real-variable and dyadic framework for hypersingular operators in regimes where strong-type estimates fail at the critical line. The main new input is a hypersingular sparse domination principle combined with Bourgain's interpolation method, which provides a flexible mechanism to establish critical...

---

## 452. Cartier duality for gerbes of vector bundles

**Authors:** Juan Esteban Rodríguez Camargo

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24967v1) | > We prove a Cartier duality for gerbes of algebraic and analytic vector bundles as an anti-equivalence of Hopf algebras in the category of kernels of analytic stacks. As an application, we prove that the category of solid quasi-coherent sheaves on the Hodge-Tate stack of a smooth rigid variety over an algebraically closed field $C$ of mixed characteristic $(0,p)$ is equivalent to the category of we...

---

## 453. Approximating evolution operators of linear delay equations: a general framework for the convergence analysis

**Authors:** Alessia andò, Giusy Bosco, Dimitri Breda, Davide Liessi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24964v1) | > We consider the problem of discretizing evolution operators of linear delay equations with the aim of approximating their spectra, which is useful in investigating the stability properties of (nonlinear) equations via the principle of linearized stability. We develop a general convergence analysis based on a reformulation of the operators by means of a fixed-point equation, providing a list of hyp...

---

## 454. The least prime with a given cycle type

**Authors:** Peter J. Cho, Robert J. Lemke Oliver, Asif Zaman

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24963v1) | > Let $G$ be a finite group. Let $K/k$ be a Galois extension of number fields with Galois group isomorphic to $G$, and let $C \subseteq \mathrm{Gal}(K/k) \simeq G$ be a conjugacy invariant subset. It is well known that there exists an unramified prime ideal $\mathfrak{p}$ of $k$ with Frobenius element lying in $C$ and norm satisfying $\mathrm{N}\mathfrak{p} \ll |\mathrm{Disc}(K)|^α$ for some constan...

---

## 455. Geometric characterisation of structural and regular equivalences in undirected (hyper)graphs

**Authors:** Marzieh Eidi, Nina Otter

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24961v1) | > Similarity notions between vertices in a graph, such as structural and regular equivalence, are one of the main ingredients in clustering tools in complex network science. We generalise structural and regular equivalences for undirected hypergraphs and provide a characterisation of structural and regular equivalences of undirected graphs and hypergraphs through neighbourhood graphs and Ollivier-Ri...

---

## 456. Numerical study of solitary waves in Dirac--Klein--Gordon system

**Authors:** Andrew Comech, Julien Ricaud, Marco Roque

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24954v1) | > We use numerics to construct solitary waves in Dirac--Klein--Gordon (in one and three spatial dimensions) and study the dependence of energy and charge on $ω$. For the construction, we use the iterative procedure, starting from solitary waves of nonlinear Dirac equation, computing the corresponding scalar field, and adjusting the coupling constant. We also consider the case of massless scalar fiel...

---

## 457. Data-Driven Spectral Analysis Through Pseudo-Resolvent Koopman Operator in Dynamical Systems

**Authors:** Yuanchao Xu, Itsushi Sakata, Isao Ishikawa

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24953v1) | > We present a data-driven method for spectral analysis of the Koopman operator based on direct construction of the pseudo-resolvent from time-series data. Finite-dimensional approximation of the Koopman operator, such as those obtained from Extended Dynamic Mode Decomposition, are known to suffer from spectral pollution. To address this issue, we construct the pseudo-resolvent operator using the Sh...

---

## 458. Dynamic response phenotypes and model discrimination in systems and synthetic biology

**Authors:** Eduardo D. Sontag

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24945v1) | > Biological systems encode function not primarily in steady states, but in the structure of transient responses elicited by time-varying stimuli. Overshoots, biphasic dynamics, adaptation kinetics, fold-change detection, entrainment, and cumulative exposure effects often determine phenotypic outcomes, yet are poorly captured by classical steady-state or dose-response analyses. This paper develops a...

---

## 459. Modelling the movements of organisms by stochastic theory in a comoving frame

**Authors:** Norberto Lucero Azuara, Rainer Klages

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24937v1) | > Imagine you walk in a plane. You move by making a step of a certain length per time interval in a chosen direction. Repeating this process by randomly sampling step length and turning angle defines a two-dimensional random walk in what we call comoving frame coordinates. This is precisely how Ross and Pearson proposed to model the movements of organisms more than a century ago. Decades later their...

---

## 460. Green's function on the Tate curve

**Authors:** An Huang, Rebecca Rohrlich, Yaojia Sun, Eric Whyman

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24935v1) | > Motivated by the question of defining a $p$-adic string worldsheet action in genus one, we define a Laplacian operator on the Tate curve, and study its Green's function. We show that the Green's function exists. We provide an explicit formula for the Green's function, which turns out to be a non-Archimedean counterpart of the Archimedean Green's function on a flat torus....

---

## 461. On a new filtration of the variational bicomplex

**Authors:** Siye Wu, Haoran Yang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24931v1) | > We define a filtration on the variational bicomplex according to jet order. The filtration is preserved by the interior Euler operator, which is not a module homomorphism with respect to the ring of smooth functions on the jet space. However, the induced maps on the graded components of this filtration are. Furthermore, the space of functional forms in the image of the interior Euler operator inhe...

---

## 462. Introduction to black hole thermodynamics

**Authors:** Pietro Benetti Genolini

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24929v1) | > These are the lecture notes for a course at the "Roberto Salmeron School in Mathematical Physics" held at the University of Brasilia in September 2025, to be published in the proceedings book "Modern topics in mathematical physics." The course provides a concise and biased introduction to black hole thermodynamics. It covers the laws of black hole mechanics, Hawking radiation, Euclidean quantum gr...

---

## 463. A finite element approach for minimizing line and surface energies arising in the study of singularities in liquid crystals

**Authors:** Dominik Stantejsky

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24928v1) | > Motivated by a problem originating in the study of defect structures in nematic liquid crystals, we describe and study a numerical algorithm for the resolution of a Plateau-like problem. The energy contains the area of a two-dimensional surface $T$ and the length of its boundary $\partial T$ reduced by a prescribed curve to make our problem non-trivial. We additionally include an obstacle $E$ for ...

---

## 464. A Pontryagin Maximum Principle on the Belief Space for Continuous-Time Optimal Control with Discrete Observations

**Authors:** Christian Bayer, Saifeddine Ben naamia, Erik von Schwerin, Raul Tempone

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24916v1) | > We study a continuous time stochastic optimal control problem under partial observations that are available only at discrete time instants. This hybrid setting, with continuous dynamics and intermittent noisy measurements, arises in applications ranging from robotic exploration and target tracking to epidemic control. We formulate the problem on the space of beliefs (information states), treating ...

---

## 465. Manifold learning and optimization using tangent space proxies

**Authors:** Ryan A. Robinett, Lorenzo Orecchia, Samantha J. Riesenfeld

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2501.12678)

> ...

---

## 466. Learning to Solve Multiresolution Matrix Factorization by Manifold Optimization and Evolutionary Metaheuristics

**Authors:** Truong Son Hy, Thieu Khang, Risi Kondor

**Year:** 2024 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2406.00469)

> ...

---

## 467. Cross-Scenario Interpretable Prediction of Coal Mine Water Inrush Probability: An Integrated Approach Driven by Gaussian Mixture Modeling with Manifold Learning and Metaheuristic Optimization

**Authors:** Qiushuang Zheng, Changfeng Wang

**Year:** 2025 | **Venue:** Symmetry | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.3390/SYM17071111)

> ...

---

## 468. Learning Design-Score Manifold to Guide Diffusion Models for Offline Optimization

**Authors:** Tailin Zhou, Zhilin Chen, Wenlong Lyu, Zhitang Chen, Danny H. K. Tsang

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2506.05680)

> ...

---

## 469. Learning Geometry: A Framework for Building Adaptive Manifold Models through Metric Optimization

**Authors:** Di Zhang

**Year:** 2025 | **Venue:** CoRR | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/ARXIV.2510.26068)

> ...

---

## 470. Semi-supervised metric learning incorporating weighted triplet constraint and Riemannian manifold optimization for classification

**Authors:** Yizhe Xia, Hongjuan Zhang

**Year:** 2024 | **Venue:** Mach. Vis. Appl. | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1007/S00138-024-01581-9)

> ...

---

## 471. Learning-Rate-Free Stochastic Optimization over Riemannian Manifolds

**Authors:** Daniel Dodd, Louis Sharrock, Christopher Nemeth

**Year:** 2024 | **Venue:** ICML | **Citations:** N/A | **Score:** 0.000

> ...

---

## 472. &lt;b&gt;CryoDECO: Deconstructing Compositional and Conformational Heterogeneity in Cryo-EM with Foundation Model Priors&lt;/b&gt;

**Authors:** Yan Yang, Yanwanyu Xi, Shiqi Fan, Ziyun Tang, Fajie Yuan

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

[PDF](https://langtaosha.org.cn/index.php/lts/preprint/download/75/353) | [DOI](https://doi.org/10.65215/ltspreprints.2025.12.30.000075)

> Resolving compositional and conformational heterogeneity remains a fundamental bottleneck in single-particle cryo-EM. This challenge stems from a circular dependency: classification requires reliable references, while reference generation requires accurate classification. Current deep learning methods often resort to blind stochastic initialization, frequently becoming trapped in local minima with...

---

## 473. A DeepSeek cross-modal platform for personalized art education in Autism Spectrum Disorder

**Authors:** Yaoyao Ding, Zichang Li, Yuntao Zou, Xiao Dong

**Year:** 2025 | **Venue:** Scientific Reports | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.1038/s41598-025-28518-0) | [DOI](https://doi.org/10.1038/s41598-025-28518-0)

> Abstract Educational inequity in arts learning disproportionately marginalizes students with Autism Spectrum Disorder (ASD), who require structured, predictable environments for aesthetic development and sensory regulation that traditional pedagogies fail to provide. This study introduces an AI-powered e-learning platform that addresses these systematic barriers through intelligent cross-modal int...

---

## 474. Stone Cube Realization of Universiality

**Authors:** Travis Raymond-Charlie Stone

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18072421) | [DOI](https://doi.org/10.5281/zenodo.18072421)

> Stone Cube with Universiality as an intelligent system The Stone Cube is defined as a closed volumetric construct in which extent, state, and evaluation are inseparable. The cube represents a bounded region of space whose interior is fully self contained and whose boundary does not permit net transfer of energy, matter, or information. All internal behavior is therefore governed by redistribution ...

---

## 475. Recursive Harmonic Intelligence: A Unified Field Theory for Geometric AI Training and Manifold Navigation

**Authors:** Dean Kulik

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18073314) | [DOI](https://doi.org/10.5281/zenodo.18073314)

> Recursive Harmonic Intelligence: A Unified Field Theory for Geometric AI Training and Manifold Navigation Driven by Dean Kulik December 2025 Executive Summary This research report presents a comprehensive theoretical and architectural framework for reconceptualizing Artificial Intelligence (AI) training through what we call the Nexus Framework. Moving beyond the prevailing paradigm of high-energy ...

---

## 476. Parallel Diffusion Solver via Residual Dirichlet Policy Optimization

**Authors:** Ruoyu Wang, Ziyu Li, Beier Zhu, Liangyu Yuan, Hanwang Zhang

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.22796) | [DOI](https://doi.org/10.48550/arxiv.2512.22796)

> Diffusion models (DMs) have achieved state-of-the-art generative performance but suffer from high sampling latency due to their sequential denoising nature. Existing solver-based acceleration methods often face significant image quality degradation under a low-latency budget, primarily due to accumulated truncation errors arising from the inability to capture high-curvature trajectory segments. In...

---

## 477. Vehicle-Behavior-Recognition

**Authors:** Fei Wang

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18065400) | [DOI](https://doi.org/10.5281/zenodo.18065400)

> # Article **Vehicle Behavior Recognition and Decision Optimization for Intelligent Driving** ## Description The project "Vehicle Behavior Recognition and Decision Optimization for Intelligent Driving" aims to enhance the capabilities of intelligent driving systems by addressing the challenges of vehicle behavior recognition and decision optimization. This research introduces a novel framework that...

---

## 478. Gradient Dynamics of Attention: How Cross-Entropy Sculpts Bayesian Manifolds

**Authors:** Naman Aggarwal, Siddhartha R. Dalal, Vishal Misra

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.22473) | [DOI](https://doi.org/10.48550/arxiv.2512.22473)

> Transformers empirically perform precise probabilistic reasoning in carefully constructed ``Bayesian wind tunnels'' and in large-scale language models, yet the mechanisms by which gradient-based learning creates the required internal geometry remain opaque. We provide a complete first-order analysis of how cross-entropy training reshapes attention scores and value vectors in a transformer attentio...

---

## 479. Adaptive Robotic Control via Nested Learning: Real-Time Recovery from Unmodeled Dynamics

**Authors:** Sarath Chandiran M

**Year:** 2025 | **Venue:** International Journal for Research in Applied Science and Engineering Technology | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.22214/ijraset.2025.76573) | [DOI](https://doi.org/10.22214/ijraset.2025.76573)

> Bridging the gap between simulation-trained DRL controllers and deployed robotic actuators remains an open engineering challenge due to unmodeled dynamics and sensing mismatch. Simulators provide reproducible training data and safe iteration, but their physics fidelity is limited: non-linear and time-varying effects (wear, thermal drift, stiction) are rarely modeled, producing deployment gaps. Tra...

---

## 480. Multi-Modal-Sentiment-Analysis

**Authors:** Xingsong Jiang

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.18014471) | [DOI](https://doi.org/10.5281/zenodo.18014471)

> # Article **Multi-Modal Sentiment Analysis in Social Media Using Attention-Based Fusion of Text, Audio, and Visual Features** ## Description The project "Multi-Modal Sentiment Analysis in Social Media Using Attention-Based Fusion of Text, Audio, and Visual Features" aims to enhance sentiment prediction accuracy by integrating diverse data modalities. Traditional sentiment analysis methods often fa...

---

## 481. Gaussian-Mixture-Model Q-Functions for Policy Iteration in Reinforcement Learning

**Authors:** Minh N. Vu, Konstantinos Slavakis

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.18763) | [DOI](https://doi.org/10.48550/arxiv.2512.18763)

> Unlike their conventional use as estimators of probability density functions in reinforcement learning (RL), this paper introduces a novel function-approximation role for Gaussian mixture models (GMMs) as direct surrogates for Q-function losses. These parametric models, termed GMM-QFs, possess substantial representational capacity, as they are shown to be universal approximators over a broad class...

---

## 482. SCAR: Semantic Cardiac Adversarial Representation via Spatiotemporal Manifold Optimization in ECG

**Authors:** Shunbo Jia, Caizhi Liao

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.17423) | [DOI](https://doi.org/10.48550/arxiv.2512.17423)

> Deep learning models for Electrocardiogram (ECG) analysis have achieved expert-level performance but remain vulnerable to adversarial attacks. However, applying Universal Adversarial Perturbations (UAP) to ECG signals presents a unique challenge: standard imperceptible noise constraints (e.g., 10 uV) fail to generate effective universal attacks due to the high inter-subject variability of cardiac ...

---

## 483. Both Semantics and Reconstruction Matter: Making Representation Encoders Ready for Text-to-Image Generation and Editing

**Authors:** Shilong Zhang, He Zhang, Zhifei Zhang, Chongjian Ge, Shuchen Xue

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.17909) | [DOI](https://doi.org/10.48550/arxiv.2512.17909)

> Modern Latent Diffusion Models (LDMs) typically operate in low-level Variational Autoencoder (VAE) latent spaces that are primarily optimized for pixel-level reconstruction. To unify vision generation and understanding, a burgeoning trend is to adopt high-dimensional features from representation encoders as generative latents. However, we empirically identify two fundamental obstacles in this para...

---

## 484. Latent Sculpting for Zero-Shot Generalization: A Manifold Learning Approach to Out-of-Distribution Anomaly Detection

**Authors:** Rajeeb Thapa Chhetri, Zhixiong Chen, Saurab Thapa

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.22179) | [DOI](https://doi.org/10.48550/arxiv.2512.22179)

> A fundamental limitation of supervised deep learning in high-dimensional tabular domains is "Generalization Collapse": models learn precise decision boundaries for known distributions but fail catastrophically when facing Out-of-Distribution (OOD) data. We hypothesize that this failure stems from the lack of topological constraints in the latent space, resulting in diffuse manifolds where novel an...

---

## 485. Can LLMs Guide Their Own Exploration? Gradient-Guided Reinforcement Learning for LLM Reasoning

**Authors:** Liang, Zhenwen, Lu, Sidi, Yu, Wenhao, Panaganti, Kishan, Zhou, Yujun

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.15687) | [DOI](https://doi.org/10.48550/arxiv.2512.15687)

> Reinforcement learning has become essential for strengthening the reasoning abilities of large language models, yet current exploration mechanisms remain fundamentally misaligned with how these models actually learn. Entropy bonuses and external semantic comparators encourage surface level variation but offer no guarantee that sampled trajectories differ in the update directions that shape optimiz...

---

## 486. MSSL: Manifold Geometry-Leveraged Self-Supervised Learning for Hyperspectral Image Classification

**Authors:** Chengjie Guo, Hong Huang, Zhengying Li, Tao Wang

**Year:** 2025 | **Venue:** Electronics | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.3390/electronics14244935) | [DOI](https://doi.org/10.3390/electronics14244935)

> Deep learning (DL), a hierarchical feature extraction method, has garnered increasing attention in the remote sensing community. Recently, self-supervised learning (SSL) methods in DL have gained wide recognition due to their ability to mitigate the dependence on both the quantity and quality of samples. This advantage is particularly significant when dealing with limited labeled samples in hypers...

---

## 487. Entropy Collapse: A Universal Failure Mode of Intelligent Systems

**Authors:** Truong Xuan Khanh, Truong Quynh Hoa

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.12381) | [DOI](https://doi.org/10.48550/arxiv.2512.12381)

> Intelligent systems are widely assumed to improve through learning, coordination, and optimization. However, across domains -- from artificial intelligence to economic institutions and biological evolution -- increasing intelligence often precipitates paradoxical degradation: systems become rigid, lose adaptability, and fail unexpectedly. We identify \emph{entropy collapse} as a universal dynamica...

---

## 488. Structural Coupling in Human–AI Interaction

**Authors:** Stone, Shane Edward

**Year:** 2025 | **Venue:** Zenodo (CERN European Organization for Nuclear Research) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.5281/zenodo.17919552) | [DOI](https://doi.org/10.5281/zenodo.17919552)

> Human–AI interaction is commonly modeled as a unidirectional process in which static human input conditions an otherwise autonomous artificial system. Such models implicitly treat the human as noise, preference, or intent, rather than as a persistent structural influence on the interaction itself. In this work, we propose a minimal theoretical framework in which human–AI interaction is modeled as ...

---

## 489. SpectralKrum: A Spectral-Geometric Defense Against Byzantine Attacks in Federated Learning

**Authors:** Tripathi, Aditya, Sharma, Karan, Mishra, Rahul, Maiti, Tapas Kumar

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.11760) | [DOI](https://doi.org/10.48550/arxiv.2512.11760)

> Federated Learning (FL) distributes model training across clients who retain their data locally, but this architecture exposes a fundamental vulnerability: Byzantine clients can inject arbitrarily corrupted updates that degrade or subvert the global model. While robust aggregation methods (including Krum, Bulyan, and coordinate-wise defenses) offer theoretical guarantees under idealized assumption...

---

## 490. Bhargava Cube--Inspired Quadratic Regularization for Structured Neural Embeddings

**Authors:** Sairam, S, Kulkarni, Prateek P

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.11392) | [DOI](https://doi.org/10.48550/arxiv.2512.11392)

> We present a novel approach to neural representation learning that incorporates algebraic constraints inspired by Bhargava cubes from number theory. Traditional deep learning methods learn representations in unstructured latent spaces lacking interpretability and mathematical consistency. Our framework maps input data to constrained 3-dimensional latent spaces where embeddings are regularized to s...

---

## 491. Learning to Evolve with Convergence Guarantee via Neural Unrolling

**Authors:** Gao, Jiaxin, Liu, Yaohua, Cheng, Ran, Tan, Kay Chen

**Year:** 2025 | **Venue:** arXiv (Cornell University) | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.48550/arxiv.2512.11453) | [DOI](https://doi.org/10.48550/arxiv.2512.11453)

> The transition from hand-crafted heuristics to data-driven evolutionary algorithms faces a fundamental dilemma: achieving neural plasticity without sacrificing mathematical stability. Emerging learned optimizers demonstrate high adaptability. However, they often lack rigorous convergence guarantees. This deficiency results in unpredictable behaviors on unseen landscapes. To address this challenge,...

---

## 492. Edit3r: Instant 3D Scene Editing from Sparse Unposed Images

**Authors:** Jiageng Liu, Weijie Lyu, Xueting Li, Yejie Guo, Ming-Hsuan Yang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25071v1) | > We present Edit3r, a feed-forward framework that reconstructs and edits 3D scenes in a single pass from unposed, view-inconsistent, instruction-edited images. Unlike prior methods requiring per-scene optimization, Edit3r directly predicts instruction-aligned 3D edits, enabling fast and photorealistic rendering without optimization or pose estimation. A key challenge in training such a model lies i...

---

## 493. Vulcan: Instance-Optimal Systems Heuristics Through LLM-Driven Search

**Authors:** Rohit Dwivedula, Divyanshu Saxena, Sujay Yadalam, Daehyeok Kim, Aditya Akella

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25065v1) | > Resource-management tasks in modern operating and distributed systems continue to rely primarily on hand-designed heuristics for tasks such as scheduling, caching, or active queue management. Designing performant heuristics is an expensive, time-consuming process that we are forced to continuously go through due to the constant flux of hardware, workloads and environments.
  We propose a new alter...

---

## 494. AdaGReS:Adaptive Greedy Context Selection via Redundancy-Aware Scoring for Token-Budgeted RAG

**Authors:** Chao Peng, Bin Wang, Zhilei Long, Jinfang Sheng

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25052v1) | > Retrieval-augmented generation (RAG) is highly sensitive to the quality of selected context, yet standard top-k retrieval often returns redundant or near-duplicate chunks that waste token budget and degrade downstream generation. We present AdaGReS, a redundancy-aware context selection framework for token-budgeted RAG that optimizes a set-level objective combining query-chunk relevance and intra-s...

---

## 495. Extreme nonlinear optics in optical fibers

**Authors:** Mario Ferraro, Bertrand Kibler, Pierre Béjot, Frédéric Gérome, Benoit Debord

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25046v1) | > This paper reviews the field of extreme nonlinear optics in optical fibers, highlighting key phenomena and advancements. It discusses multiple ionization effects caused by femtosecond laser pulses that generate plasma and induce permanent material modifications, as well as plasma luminescence and its dependence on material imperfections. The formation and dynamics of plasma filaments, including he...

---

## 496. Bayesian Elastic Net Regression with Structured Prior Dependence

**Authors:** Christopher M. Hans, Ningyi Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25045v1) | > Many regularization priors for Bayesian regression assume the regression coefficients are a priori independent. In particular this is the case for standard Bayesian treatments of the lasso and the elastic net. While independence may be reasonable in some data-analytic settings, incorporating dependence in these prior distributions provides greater modeling flexibility. This paper introduces the or...

---

## 497. Computational Analysis of Disease Progression in Pediatric Pulmonary Arterial Hypertension

**Authors:** Omar Said, Christopher Tossas-Betancourt, Mary K. Olive, Jimmy C. Lu, Adam Dorfman

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25027v1) | > Pulmonary arterial hypertension (PAH) is a progressive cardiopulmonary disease that leads to increased pulmonary pressures, vascular remodeling, and eventual right ventricular (RV) failure. Pediatric PAH remains understudied due to limited data and the lack of targeted diagnostic and therapeutic strategies. In this study, we developed and calibrated multi-scale, patient-specific cardiovascular mod...

---

## 498. Modeling Language as a Sequence of Thoughts

**Authors:** Nasim Borazjanizadeh, James McClelland

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25026v1) | > Transformer language models can generate strikingly natural text by modeling language as a sequence of tokens. Yet, by relying primarily on surface-level co-occurrence statistics, they fail to form globally consistent latent representations of entities and events, lack of which contributes to brittleness in relational direction (e.g., reversal curse), contextualization errors, and data inefficienc...

---

## 499. Strategies for Overcoming Gradient Troughs in the ADAPT-VQE Algorithm

**Authors:** Jonas Stadelmann, Julian Übelher, Mafalda Ramôa, Bharath Sambasivam, Edwin Barnes

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25004v1) | > The adaptive derivative-assembled problem-tailored variational quantum eigensolver (ADAPT-VQE) provides a promising approach for simulating highly correlated quantum systems on quantum devices, as it strikes a balance between hardware efficiency, trainability, and accuracy. Although ADAPT-VQE avoids many of the shortcomings of other VQEs, it is sometimes hindered by a phenomenon known as gradient ...

---

## 500. Numerical study of boson mixtures with multi-component continuous matrix product states

**Authors:** Wei Tang, Benoît Tuybens, Jutho Haegeman

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24998v1) | > The continuous matrix product state (cMPS) ansatz is a promising numerical tool for studying quantum many-body systems in continuous space. Although it provides a clean framework that allows one to directly simulate continuous systems, the optimization of cMPS is known to be a very challenging task, especially in the case of multi-component systems. In this work, we have developed an improved opti...

---

## 501. PhysTalk: Language-driven Real-time Physics in 3D Gaussian Scenes

**Authors:** Luca Collorone, Mert Kiray, Indro Spinelli, Fabio Galasso, Benjamin Busam

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24986v1) | > Realistic visual simulations are omnipresent, yet their creation requires computing time, rendering, and expert animation knowledge. Open-vocabulary visual effects generation from text inputs emerges as a promising solution that can unlock immense creative potential. However, current pipelines lack both physical realism and effective language interfaces, requiring slow offline optimization. In con...

---

## 502. Hierarchical Deformation Planning and Neural Tracking for DLOs in Constrained Environments

**Authors:** Yunxi Tang, Tianqi Yang, Jing Huang, Xiangyu Chu, Kwok Wai Samuel Au

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24974v1) | > Deformable linear objects (DLOs) manipulation presents significant challenges due to DLOs' inherent high-dimensional state space and complex deformation dynamics. The wide-populated obstacles in realistic workspaces further complicate DLO manipulation, necessitating efficient deformation planning and robust deformation tracking. In this work, we propose a novel framework for DLO manipulation in co...

---

## 503. Fair Committee Selection under Ordinal Preferences and Limited Cardinal Information

**Authors:** Ameet Gadekar, Aristides Gionis, Suhas Thejaswi, Sijing Tu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24934v1) | > We study the problem of fair $k$-committee selection under an egalitarian objective. Given $n$ agents partitioned into $m$ groups (\eg, demographic quotas), the goal is to aggregate their preferences to form a committee of size $k$ that guarantees minimum representation from each group while minimizing the maximum \emph{cost} incurred by any agent. We model this setting as the ordinal fair $k$-cen...

---

## 504. Hybrid Lithology Identification Method Based on Isometric Feature Mapping Manifold Learning and Particle Swarm Optimization-Optimized LightGBM

**Authors:** Guo Wang, Song Deng, Shuguo Xu, Chaowei Li, Wan Wei

**Year:** 2024 | **Venue:** Processes | **Citations:** 1 | **Score:** 0.000

[PDF](https://www.mdpi.com/2227-9717/12/8/1593/pdf?version=1722261126) | [DOI](https://doi.org/10.3390/pr12081593)

> Accurate identification of lithology in petroleum engineering is very important for oil and gas reservoir evaluation, drilling decisions, and petroleum geological exploration. Using a cross-plot to identify lithology only considers two logging parameters, causing the accuracy of lithology identification to be insufficient. With the continuous development of artificial intelligence technology, mach...

---

## 505. Efficient aerodynamic shape optimization by using unsupervised manifold learning to filter geometric features

**Authors:** Long Ma, Xiaojing Wu, Wei-Wei Zhang

**Year:** 2024 | **Venue:** Engineering Applications of Computational Fluid Mechanics | **Citations:** 11 | **Score:** 0.000

[PDF](https://www.tandfonline.com/doi/pdf/10.1080/19942060.2024.2384465?needAccess=true) | [DOI](https://doi.org/10.1080/19942060.2024.2384465)

> Many aerodynamic shape optimization methods often focus on utilizing the end-to-end relationship between design variables and aerodynamic performance to find the optimal design, while overlooking the exploration of geometric knowledge of the shape itself. To fully use geometric knowledge to improve optimization efficiency, this paper proposes an efficient method by exploring the potential correlat...

---

## 506. Surrogate-assisted differential evolution using manifold learning-based sampling for high dimensional expensive constrained optimization problems

**Authors:** Teng Long, Nianhui Ye, Rong Chen, Renhe Shi, Baoshou Zhang

**Year:** 2024 | **Venue:** Chinese Journal of Aeronautics | **Citations:** 6 | **Score:** 0.000

[PDF](https://doi.org/10.1016/j.cja.2024.03.026) | [DOI](https://doi.org/10.1016/j.cja.2024.03.026)

> ...

---

## 507. Enhancing Knowledge Transfer in the EMTO with Manifold Learning and Reinforcement Learning

**Authors:** Zhaoqi Wang, Lei Wang, Qiaoyong Jiang, Xinhui Duan

**Year:** 2025 | **Venue:** IEEE Congress on Evolutionary Computation | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/CEC65147.2025.11043124)

> Evolutionary multitask optimization (EMTO) algorithms are a new paradigm in the field of evolutionary algorithm. They can simultaneously handle two or more optimization problems in a single run. Knowledge transfer is the core of this algorithmic framework. Although existing EMTO algorithms are working hard to alleviate the impact of negative transfer, their solution performance remains unsatisfact...

---

## 508. Robust Beamforming for RIS-Aided Communications: Gradient-Based Manifold Meta Learning

**Authors:** Fenghao Zhu, Xinquan Wang, Chongwen Huang, Zhaohui Yang, Xiaoming Chen

**Year:** 2024 | **Venue:** IEEE Transactions on Wireless Communications | **Citations:** 75 | **Score:** 0.000

[PDF](http://arxiv.org/pdf/2402.10626) | [DOI](https://doi.org/10.1109/TWC.2024.3435023)

> Reconfigurable intelligent surface (RIS) has become a promising technology to realize the programmable wireless environment via steering the incident signal in fully customizable ways. However, a major challenge in RIS-aided communication systems is the simultaneous design of the precoding matrix at the base station (BS) and the phase shifting matrix of the RIS elements. This is mainly attributed ...

---

## 509. An intelligent reliability-based design optimization of complex engineering structures using manifold learning-enhanced surrogate modeling

**Authors:** Hang Zhou, Yimin Shen, Song Chen, Xiaoping Jing

**Year:** 2025 | **Venue:** Advances in Mechanical Engineering | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1177/16878132251395799)

> With the increasing integration of computer science and engineering optimization, the capabilities of advanced machine learning in data processing and surrogate modeling for complex simulations have provided a transformative development direction for enhancing the computational performance of reliability-based design optimization (RBDO). However, when addressing highly nonlinear and complex proble...

---

## 510. Optimization of Manifold Learning Using Differential Geometry for 3D Reconstruction in Computer Vision

**Authors:** Yawen Wang

**Year:** 2025 | **Venue:** Mathematics | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.3390/math13172771)

> Manifold learning is a significant computer vision task used to describe high-dimensional visual data in lower-dimensional manifolds without sacrificing the intrinsic structural properties required for 3D reconstruction. Isomap, Locally Linear Embedding (LLE), Laplacian Eigenmaps, and t-SNE are helpful in data topology preservation but are typically indifferent to the intrinsic differential geomet...

---

## 511. Manifold Learning for Aerodynamic Shape Design Optimization

**Authors:** Boda Zheng, Abhijith Moni, Weigang Yao, Min Xu

**Year:** 2025 | **Venue:** Aerospace | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.3390/aerospace12030258)

> The significant computational cost incurred due to the iterative nature of Computational Fluid Dynamics (CFD) in traditional aerodynamic shape design frameworks poses a major challenge, especially in the context of modern integrated design requirements and increasingly complex design conditions. To address the demands of modern design, we developed an efficient aerodynamic shape design framework b...

---

## 512. Total variational neighborhood optimization in LLE manifold learning for acoustic feature extraction

**Authors:** Jingke Liu, Zhihong Liu, Hairui Zhang, Kaiye Zhang

**Year:** 2025 | **Venue:** Conference on Image, Signal Processing, and Pattern Recognition | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1117/12.3070733)

> ...

---

## 513. A Hierarchical Evolutionary Search Framework with Manifold Learning for Powertrain Optimization of Flying Vehicles

**Authors:** Cheng-Yao Lyu, Nuo Lei, Chaoyi Chen, Hao Zhang

**Year:** 2025 | **Venue:** Energies | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.3390/en18133350)

> Hybrid electric vertical take-off and landing (HEVTOL) flying vehicles serve as effective platforms for efficient transportation, forming a cornerstone of the emerging low-altitude economy. However, the current lack of co-optimization methods for powertrain component sizing and energy controller design often leads to suboptimal HEVTOL performance. To address this, this paper proposes a hierarchica...

---

## 514. Efficient Pareto Manifold Learning with Low-Rank Structure

**Authors:** Weiyu Chen, James T. Kwok

**Year:** 2024 | **Venue:** International Conference on Machine Learning | **Citations:** 9 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2407.20734)

> Multi-task learning, which optimizes performance across multiple tasks, is inherently a multi-objective optimization problem. Various algorithms are developed to provide discrete trade-off solutions on the Pareto front. Recently, continuous Pareto front approximations using a linear combination of base networks have emerged as a compelling strategy. However, it suffers from scalability issues when...

---

## 515. An Intelligent Control Framework for High-Power EV Fast Charging via Contrastive Learning and Manifold-Constrained Optimization

**Authors:** Hao Tian, Tao Yan, Guangwu Dai, Min Wang, Xuejian Zhao

**Year:** 2025 | **Venue:** World Electric Vehicle Journal | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.3390/wevj16100562)

> To address the complex trade-offs among charging efficiency, battery lifespan, energy efficiency, and safety in high-power electric vehicle (EV) fast charging, this paper presents an intelligent control framework based on contrastive learning and manifold-constrained multi-objective optimization. A multi-physics coupled electro-thermal-chemical model is formulated as a Mixed-Integer Nonlinear Prog...

---

## 516. Automatic Segmentation of Organs-At-Risk and Clinical Target Volume for Cervical Cancer Using Manifold Learning

**Authors:** Chenyu Zuo, Runhong Lei, Xi Liu, Kai Niu, Zhiqiang He

**Year:** 2024 | **Venue:** IEEE International Joint Conference on Neural Network | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.1109/IJCNN60899.2024.10650077)

> Automatic segmentation of Organs-At-Risk (OARs) and Clinical Target Volume(CTV) is crucial for the radiotherapy treatment planning of cervical cancer. This task is challenging due to the variation in sizes, shapes, and positions as well as the similar textures among the OARs and CTV. In this paper, we propose a manifold learning-based method based on U-Net. Firstly, the weight matrix of each convo...

---

## 517. Optimizing URL Phishing Detection: A Manifold Learning Approach with an Efficient Neural Network Focused on Reducing Computational Cost

**Authors:** V. M

**Year:** 2024 | **Venue:** 2024 IEEE International Students' Conference on Electrical, Electronics and Computer Science (SCEECS) | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/SCEECS61402.2024.10482207)

> The growing number of phishing attacks is one of the top concerns of cybersecurity researchers. Cryptographic methods are not reliable in stopping phishing attacks because they manipulate the users into thinking it is safe to access a web link. This results in compromise of sensitive information. Recent research has shown how machine learning methods are capable of detecting malicious websites. Ho...

---

## 518. Integrated CFD, machine learning, and genetic algorithm optimization of metal foam manifold cold plates for energy storage battery thermal management

**Authors:** Kaiwen Bai, Zixuan Zhai, Yantao Wu, Changchang Zhang, Hanwen Zhang

**Year:** 2025 | **Venue:** Energy Reports | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1016/j.egyr.2025.12.004)

> ...

---

## 519. Video stabilization based on deep learning and manifold optimization

**Authors:** Zhe Jiao, Xiangchu Feng, Yang Yang, Hailong Zhu

**Year:** 2025 | **Venue:** Conference on Image, Signal Processing, and Pattern Recognition | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1117/12.3070852)

> As a crucial preprocessing step for mobile vision applications, video stabilization technology often suffers from issues such as interference from dynamic objects and motion estimation distortions caused by the coupling of complex backgrounds in scenarios like drone aerial photography and handheld shooting. Current mainstream methods exhibit two key limitations when dealing with unstructured motio...

---

## 520. Solving Dynamic Multiobjective Optimization Problems via Feedback-Guided Transfer and Trend Manifold Prediction

**Authors:** Yong Wang, Kuichao Li, Gaige Wang, Dunwei Gong, Keqin Li

**Year:** 2024 | **Venue:** IEEE Transactions on Systems, Man, and Cybernetics: Systems | **Citations:** 8 | **Score:** 0.000

[DOI](https://doi.org/10.1109/TSMC.2024.3443143)

> Solving dynamic multiobjective optimization problems (DMOPs) is very challenging due to the requirements to respond rapidly and precisely to changes in an environment. Many prediction- and memory-based algorithms have been recently proposed for meeting these requirements. However, much useful knowledge has been ignored during the historical search process, and prediction deviations could occur, th...

---

## 521. Nonlinear Eigen-approach ADMM for Sparse Optimization on Stiefel Manifold

**Authors:** Jiawei Wang, Ren-Cang Li, Richard Yi Da Xu

**Year:** 2024 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> With the growing interest and applications in machine learning and data science, finding an efficient method to sparse analysis the high-dimensional data and optimizing a dimension reduction model to extract lower dimensional features has becoming more and more important. Orthogonal constraints (Stiefel manifold) is a commonly met constraint in these applications, and the sparsity is usually enfor...

---

## 522. High-Dimensional Bayesian Optimization via Random Projection of Manifold Subspaces

**Authors:** Hoang-Phuc Nguyen-Dinh, The Hung Tran, Hung The Tran

**Year:** 2024 | **Venue:** ECML/PKDD | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.1007/978-3-031-70371-3_17)

> Bayesian Optimization (BO) is a popular approach to optimizing expensive-to-evaluate black-box functions. Despite the success of BO, its performance may decrease exponentially as the dimensionality increases. A common framework to tackle this problem is to assume that the objective function depends on a limited set of features that lie on a low-dimensional manifold embedded in the high-dimensional...

---

## 523. Structured Regularization for Constrained Optimization on the SPD Manifold

**Authors:** Andrew Cheng, Melanie Weber

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2410.09660)

> Matrix-valued optimization tasks, including those involving symmetric positive definite (SPD) matrices, arise in a wide range of applications in machine learning, data science and statistics. Classically, such problems are solved via constrained Euclidean optimization, where the domain is viewed as a Euclidean space and the structure of the matrices (e.g., positive definiteness) enters as constrai...

---

## 524. Design Optimization of Manifold Microchannel Heat Sink using Evolutionary Algorithms

**Authors:** V. Gulia, Aniket Nargundkar

**Year:** 2024 | **Venue:** E3S Web of Conferences | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.1051/e3sconf/202455902001)

> In today’s world, miniaturized products are proved to be the dis-ruptive technologies contributing to the sustainability through green energy. Microchannel heat sink (MCHS) is an advanced cooling device to accom-plish the cooling requirements for such miniaturized products through sus-tainable approach. In this work, two popular Nature Inspired Swarm Intelli-gence algorithms viz. Teaching Learning...

---

## 525. SpaceMesh: A Continuous Representation for Learning Manifold Surface Meshes

**Authors:** Tianchang Shen, Zhaoshuo Li, Marc T. Law, Matan Atzmon, Sanja Fidler

**Year:** 2024 | **Venue:** ACM SIGGRAPH Conference and Exhibition on Computer Graphics and Interactive Techniques in Asia | **Citations:** 11 | **Score:** 0.000

[PDF](https://dl.acm.org/doi/pdf/10.1145/3680528.3687634) | [DOI](https://doi.org/10.1145/3680528.3687634)

> Meshes are ubiquitous in visual computing and simulation, yet most existing machine learning techniques represent meshes only indirectly, e.g. as the level set of a scalar field or deformation of a template, or as a disordered triangle soup lacking local structure. This work presents a scheme to directly generate manifold, polygonal meshes of complex connectivity as the output of a neural network....

---

## 526. Manifold Learning for Indoor CSI Localization: Boosted Isomap & SVM

**Authors:** Pengyu Zhou, Xudong Zhou, Qiang Li

**Year:** 2025 | **Venue:** Proceedings of the 2nd International Conference on Machine Intelligence and Digital Applications | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1145/3744464.3744480)

> This paper addresses the critical challenge of accurate indoor localization in complex signal environments through a novel integration of manifold learning and machine learning techniques. We propose a real-time system leveraging Wi-Fi Channel State Information (CSI) that combines optimized Isomap dimensionality reduction with Support Vector Machine (SVM) classification. The methodology features t...

---

## 527. iAVP-RFVOT: Identify Antiviral Peptides by Random Forest Voting Machine Learning with Unified Manifold Learning Embedded Features.

**Authors:** Haotian Wang, Rujun Li, Qiunan Yu, Liangzhen Jiang, Ximei Luo

**Year:** 2025 | **Venue:** Biochemistry | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.1021/acs.biochem.5c00237)

> Viruses are transmitted through multiple routes and can cause a wide range of diseases. Antiviral peptides (AVPs) have emerged as a cost-effective and low-side-effect strategy for combating viral infections. However, identifying antiviral peptides experimentally is both resource-intensive and time-consuming. With the advancement of artificial intelligence, accurately predicting antiviral peptide s...

---

## 528. Maximum Covariance Unfolding: A Novel Covariate-Based Manifold Learning Approach for Point Cloud Regression

**Authors:** Qian Wang, K. Paynabar

**Year:** 2025 | **Venue:** INFORMS Journal on Data Science | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1287/ijds.2024.0043)

> Point cloud data are widely used in manufacturing applications for process inspection, modeling, monitoring and optimization. An important body of literature focuses on process optimization for quality improvement by modeling the connection between process variables and point clouds. The state-of-the-art regression techniques often have the assumption that the point cloud space is globally Euclide...

---

## 529. Sparse Tensor CCA via Manifold Optimization for Multi-View Learning

**Authors:** Yanjiao Zhu, Wanquan Liu, Xianchao Xiu, Jian Sun

**Year:** 2025 | **Venue:** IEEE transactions on circuits and systems for video technology (Print) | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/tcsvt.2025.3642736)

> Tensor canonical correlation analysis (TCCA) has garnered significant attention due to its effectiveness in capturing high-order correlations in multi-view learning. However, existing TCCA methods often underemphasize the characterization of individual structures and lack algorithmic convergence guarantees. In order to deal with these challenges, we propose a novel sparse TCCA model called STCCA-L...

---

## 530. Topo-Loss: A Novel Loss Function for Learning Multiple Manifold Structures in Image Classification with Deep Neural Networks

**Authors:** Likai Ran, Chao Cai

**Year:** 2024 | **Venue:** 2024 5th International Conference on Computer Vision, Image and Deep Learning (CVIDL) | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.1109/CVIDL62147.2024.10604103)

> abstract-The real data distribution of a specific category tends to approach a low-dimensional manifold in the Riemannian space, and the manifolds of different categories do not intersect in high-dimensional space. However, existing loss functions used for image classification ignore the inherent manifold structure between samples, resulting in limited network performance. In this paper, we reveal...

---

## 531. Federated Learning under Partially Class-Disjoint Data via Manifold Reshaping

**Authors:** Ziqing Fan, Jiangchao Yao, Ruipeng Zhang, Lingjuan Lyu, Ya Zhang

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 4 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2405.18983)

> Statistical heterogeneity severely limits the performance of federated learning (FL), motivating several explorations e.g., FedProx, MOON and FedDyn, to alleviate this problem. Despite effectiveness, their considered scenario generally requires samples from almost all classes during the local training of each client, although some covariate shifts may exist among clients. In fact, the natural case...

---

## 532. Transferable Manifold Projection Embedded Dictionary Learning for Multimode Process Monitoring

**Authors:** Jie Dong, Ruitao Sun, Chi Zhang, Kai-xiang Peng

**Year:** 2024 | **Venue:** IEEE Transactions on Instrumentation and Measurement | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.1109/TIM.2024.3406796)

> This article proposes a novel transferable manifold projection embedded dictionary learning (TMPDL)-based scheme with domain transfer for multimode process (MP) monitoring, where the new modes in evolving scenarios can be rapidly modeled. Considering that only new measurements are necessary for updating the model parameters, the proposed method elevates engineering applicability. First, in order t...

---

## 533. IoT-Edge Hybrid Architecture with Cross-Modal Transformer and Federated Manifold Learning for Safety-Critical Gesture Control in Adaptive Mobility Platforms

**Authors:** Xinmin Jin, Jian Teng, Jiaji Chen

**Year:** 2025 | **Venue:** Future Internet | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.3390/fi17070271)

> This research presents an IoT-empowered adaptive mobility framework that integrates high-dimensional gesture recognition with edge-cloud orchestration for safety-critical human–machine interaction. The system architecture establishes a three-tier IoT network: a perception layer with 60 GHz FMCW radar and TOF infrared arrays (12-node mesh topology, 15 cm baseline spacing) for real-time motion track...

---

## 534. Quantum Network Tomography via Learning Isometries on Stiefel Manifold

**Authors:** Ze-Tong Li, Xin-Lin He, Congcong Zheng, Yu-Qian Dong, Tian Luan

**Year:** 2024 | **Venue:**  | **Citations:** 2 | **Score:** 0.000

> Explicit mathematical reconstructions of quantum networks play a significant role in developing quantum information science. However, tremendous parameter requirements and physical constraint implementations have become computationally non-ignorable encumbrances. In this work, we propose an efficient method for quantum network tomography by learning isometries on the Stiefel manifold. Tasks of rec...

---

## 535. A Fast Two-Dimensional Direction-of-Arrival Estimator Using Array Manifold Matrix Learning

**Authors:** Jieyi Lu, Long Yang, Yixin Yang, Lu Wang

**Year:** 2024 | **Venue:** Remote Sensing | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.3390/rs16244654) | [DOI](https://doi.org/10.3390/rs16244654)

> Sparsity-based methods for two-dimensional (2D) direction-of-arrival (DOA) estimation often suffer from high computational complexity due to the large array manifold dictionaries. This paper proposes a fast 2D DOA estimator using array manifold matrix learning, where source-associated grid points are progressively selected from the set of predefined angular grids based on marginal likelihood maxim...

---

## 536. Active Learning and Explainable AI for Multi-Objective Optimization of Spin Coated Polymers

**Authors:** Brendan Young, Brendan J. Alvey, Andreas Werbrouck, Will Murphy, James Keller

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2509.08988)

> Spin coating polymer thin films to achieve specific mechanical properties is inherently a multi-objective optimization problem. We present a framework that integrates an active Pareto front learning algorithm (PyePAL) with visualization and explainable AI techniques to optimize processing parameters. PyePAL uses Gaussian process models to predict objective values (hardness and elasticity) from the...

---

## 537. HOFLON: Hybrid Offline Learning and Online Optimization for Process Start-Up and Grade-Transition Control

**Authors:** Alex Durkin, Jasper Stolte, Mehmet Mercangöz

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2510.03830)

> Start-ups and product grade-changes are critical steps in continuous-process plant operation, because any misstep immediately affects product quality and drives operational losses. These transitions have long relied on manual operation by a handful of expert operators, but the progressive retirement of that workforce is leaving plant owners without the tacit know-how needed to execute them consist...

---

## 538. Intraoperative 2D/3D Registration via Spherical Similarity Learning and Inference-Time Differentiable Levenberg-Marquardt Optimization

**Authors:** Minheng Chen, Youyong Kong

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2509.06890)

> Intraoperative 2D/3D registration aligns preoperative 3D volumes with real-time 2D radiographs, enabling accurate localization of instruments and implants. A recent fully differentiable similarity learning framework approximates geodesic distances on SE(3), expanding the capture range of registration and mitigating the effects of substantial disturbances, but existing Euclidean approximations dist...

---

## 539. Two-dimensional PLSR with manifold optimization based CNN for image classification

**Authors:** Haoran Chen, Kai Wu, Wenjun Song, Hongwei Tao, Zuhe Li

**Year:** 2025 | **Venue:** International Journal of Machine Learning and Cybernetics | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.1007/s13042-025-02593-1)

> ...

---

## 540. An Efficient Hybrid Improved Feature Vector Manifold Clustering with Neighbour Search Optimization

**Authors:** L. Dhanapriya, S. Preetha

**Year:** 2025 | **Venue:** International Journal of Computational and Experimental Science and Engineering | **Citations:** 1 | **Score:** 0.000

[PDF](https://doi.org/10.22399/ijcesen.1671) | [DOI](https://doi.org/10.22399/ijcesen.1671)

> In this paper, the IFMCNSO algorithm a novel hybrid Improved Feature Vector Manifold clustering with Neighbour search optimization clustering algorithm —is presented. Many methods for linear or nonlinear manifold clustering have been developed recently. While in many cases they have proven to perform better than classic clustering algorithms, the majority of these approaches have a high complexity...

---

## 541. Multi-Target Feature Selection with Adaptive Graph Learning and Target Correlations

**Authors:** Yujing Zhou, Dubo He

**Year:** 2024 | **Venue:** Mathematics | **Citations:** 4 | **Score:** 0.000

[PDF](https://www.mdpi.com/2227-7390/12/3/372/pdf?version=1706087191) | [DOI](https://doi.org/10.3390/math12030372)

> In this paper, we present a novel multi-target feature selection algorithm that incorporates adaptive graph learning and target correlations. Specifically, our proposed approach introduces the low-rank constraint on the regression matrix, allowing us to model both inter-target and input–output relationships within a unified framework. To preserve the similarity structure of the samples and mitigat...

---

## 542. RNAGenScape: Property-guided Optimization and Interpolation of mRNA Sequences with Manifold Langevin Dynamics

**Authors:** Danqi Liao, Chen Liu, Xingzhi Sun, Di'e Tang, Haochen Wang

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2510.24736)

> mRNA design and optimization are important in synthetic biology and therapeutic development, but remain understudied in machine learning. Systematic optimization of mRNAs is hindered by the scarce and imbalanced data as well as complex sequence-function relationships. We present RNAGenScape, a property-guided manifold Langevin dynamics framework that iteratively updates mRNA sequences within a lea...

---

## 543. A Novel Manifold Optimization Algorithm With the Dual Function and a Fuzzy Valuation Step

**Authors:** Weiping Liu, Youfa Liu, He Li, Jingui Zou

**Year:** 2025 | **Venue:** IEEE transactions on fuzzy systems | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/TFUZZ.2024.3520238)

> Fuzzy mathematical theory is widely used, fuzzy optimization is a branch of fuzzy mathematical theory, the significant application area is artificial intelligence in computer science, especially machine learning (deep learning) and pattern recognition. Fuzzy mathematics, especially fuzzy optimization, has become a bridge between the manifold optimization theory and deep learning applications, whic...

---

## 544. Accelerated Natural Gradient Method for Parametric Manifold Optimization

**Authors:** Chenyi Li, Shuchen Zhu, Zhonglin Xie, Zaiwen Wen

**Year:** 2025 | **Venue:**  | **Citations:** 2 | **Score:** 0.000

> Parametric manifold optimization problems frequently arise in various machine learning tasks, where state functions are defined on infinite-dimensional manifolds. We propose a unified accelerated natural gradient descent (ANGD) framework to address these problems. By incorporating a Hessian-driven damping term into the manifold update, we derive an accelerated Riemannian gradient (ARG) flow that m...

---

## 545. Distributed Sparse Manifold-Constrained Optimization Algorithm in Linear Discriminant Analysis

**Authors:** Yuhao Zhang, Xiaoxiang Chen, Manlong Feng, Jingjing Liu

**Year:** 2025 | **Venue:** Journal of Imaging | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.3390/jimaging11030081)

> In the field of video image processing, high definition is one of the main directions for future development. Faced with the curse of dimensionality caused by the increasingly large amount of ultra-high-definition video data, effective dimensionality reduction techniques have become increasingly important. Linear discriminant analysis (LDA) is a supervised learning dimensionality reduction techniq...

---

## 546. Stochastic factors can matter: improving robust growth under ergodicity

**Authors:** Balint Binkert, David Itkin, Paul Mangers Bastian, Josef Teichmann

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24906v1) | > Drifts of asset returns are notoriously difficult to model accurately and, yet, trading strategies obtained from portfolio optimization are very sensitive to them. To mitigate this well-known phenomenon we study robust growth-optimization in a high-dimensional incomplete market under drift uncertainty of the asset price process $X$, under an additional ergodicity assumption, which constrains but d...

---

## 547. One-Shot Camera-Based Extrusion Optimization for High Speed Fused Filament Fabrication

**Authors:** Yufan Lin, Xavier Guidetti, Yannick Nagel, Efe C. Balta, John Lygeros

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24905v1) | > Off-the-shelf fused filament fabrication 3D printers are widely accessible and convenient, yet they exhibit quality loss at high speeds due to dynamic mis-synchronization between printhead motion and material extrusion systems, notably corner over-extrusion. Existing methods require specialized hardware, extensive calibration, or firmware modifications that are inaccessible to most users. This wor...

---

## 548. MTSP-LDP: A Framework for Multi-Task Streaming Data Publication under Local Differential Privacy

**Authors:** Chang Liu, Junzhou Zhao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24899v1) | > The proliferation of streaming data analytics in data-driven applications raises critical privacy concerns, as directly collecting user data may compromise personal privacy. Although existing $w$-event local differential privacy (LDP) mechanisms provide formal guarantees without relying on trusted third parties, their practical deployment is hindered by two key limitations. First, these methods ar...

---

## 549. Adaptive Clutter Suppression via Convex Optimization

**Authors:** Yifan He, Griffin Kearney, Makan Fardad

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24889v1) | > Passive and bistatic radar systems are often limited by strong clutter and direct-path interference that mask weak moving targets. Conventional cancellation methods such as the extensive cancellation algorithm require careful tuning and can distort the delay-Doppler response. This paper introduces a convex optimization framework that adaptively synthesizes per-cell delay-Doppler filters to suppres...

---

## 550. BEDA: Belief Estimation as Probabilistic Constraints for Performing Strategic Dialogue Acts

**Authors:** Hengli Li, Zhaoxin Yu, Qi Shen, Chenxi Li, Mengmeng Wang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24885v1) | > Strategic dialogue requires agents to execute distinct dialogue acts, for which belief estimation is essential. While prior work often estimates beliefs accurately, it lacks a principled mechanism to use those beliefs during generation. We bridge this gap by first formalizing two core acts Adversarial and Alignment, and by operationalizing them via probabilistic constraints on what an agent may ge...

---

## 551. A structure-preserving parametric approximation for anisotropic geometric flows via an $α$-surface energy matrix

**Authors:** Weizhu Bao, Yifei Li, Wenjun Ying, Yulin Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24875v1) | > We propose a structure-preserving parametric approximation for geometric flows with general anisotropic effects. By introducing a hyperparameter $α$, we construct a unified surface energy matrix $\hat{\boldsymbol{G}}_k^α(θ)$ that encompasses all existing formulations of surface energy matrices, and apply it to anisotropic curvature flow. We prove that $α=-1$ is the unique choice achieving optimal ...

---

## 552. Tensor Based Proximal Alternating Minimization Method for A Kind of Inhomogeneous Quartic Optimization Problem

**Authors:** Haibin Chen, Yixuan Chen, Chunyan Wang, Qi Fan

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24872v1) | > In this paper, we propose an efficient numerical approach for solving a specific type of quartic inhomogeneous polynomial optimization problem inspired by practical applications. The primary contribution of this work lies in establishing an inherent equivalence between the quartic inhomogeneous polynomial optimization problem and a multilinear optimization problem (MOP). This result extends the eq...

---

## 553. Measuring Mixed-State Topological Invariant in Open Photonic Quantum Walk

**Authors:** Qin-Qin Wang, Xiao-Ye Xu, Yong-Jian Han, Chuan-Feng Li, Guang-Can Guo

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24857v1) | > Pure-state manifestations of geometric phase are well established and have found applications across essentially all branches of physics, yet their generalization to mixed-state regimes remains largely unexplored experimentally. The Uhlmann geometric phase offers a natural extension of pure-state paradigms and can exhibit a topological character. However, observation of this invariant is impeded b...

---

## 554. Advances in Agentic AI: Back to the Future

**Authors:** Sergio Alvarez-Telena, Marta Diez-Fernandez

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24856v1) | > In light of the recent convergence between Agentic AI and our field of Algorithmization, this paper seeks to restore conceptual clarity and provide a structured analytical framework for an increasingly fragmented discourse. First, (a) it examines the contemporary landscape and proposes precise definitions for the key notions involved, ranging from intelligence to Agentic AI. Second, (b) it reviews...

---

## 555. SSCHA-based evolutionary crystal structure prediction at finite temperatures with account for quantum nuclear motion

**Authors:** Daniil Poletaev, Artem Oganov

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24849v1) | > Accurate crystal structure prediction (CSP) at finite temperatures with quantum anharmonic effects remains challenging but very prominent in systems with lightweight atoms such as superconducting hydrides. In this work, we integrate machine-learned interatomic potentials (MLIPs) with the stochastic self-consistent harmonic approximation (SSCHA) to enable evolutionary CSP on the quantum anharmonic ...

---

## 556. AODDiff: Probabilistic Reconstruction of Aerosol Optical Depth via Diffusion-based Bayesian Inference

**Authors:** Linhao Fan, Hongqiang Fang, Jingyang Dai, Yong Jiang, Qixing Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24847v1) | > High-quality reconstruction of Aerosol Optical Depth (AOD) fields is critical for Atmosphere monitoring, yet current models remain constrained by the scarcity of complete training data and a lack of uncertainty quantification.To address these limitations, we propose AODDiff, a probabilistic reconstruction framework based on diffusion-based Bayesian inference. By leveraging the learned spatiotempor...

---

## 557. Triangulation as an Acceptance Rule for Multilingual Mechanistic Interpretability

**Authors:** Yanan Long

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24842v1) | > Multilingual language models achieve strong aggregate performance yet often behave unpredictably across languages, scripts, and cultures. We argue that mechanistic explanations for such models should satisfy a \emph{causal} standard: claims must survive causal interventions and must \emph{cross-reference} across environments that perturb surface form while preserving meaning. We formalize \emph{re...

---

## 558. Scalable Stellar Parameter Inference Using Python-based LASP: From CPU Optimization to GPU Acceleration

**Authors:** Jun-Chao Liang, Yin-Bi Li, A-Li Luo, Fang Zuo, Bing Du

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24840v1) | [DOI](https://doi.org/10.3847/1538-4357/ae1446)

> To enhance the efficiency, scalability, and cross-survey applicability of stellar parameter inference in large spectroscopic datasets, we present a modular, parallelized Python framework with automated error estimation, built on the LAMOST Atmospheric Parameter Pipeline (LASP) originally implemented in IDL. Rather than a direct code translation, this framework refactors LASP with two complementary...

---

## 559. A Low Background Beta Detection System using a Time Projection Chamber

**Authors:** Ruiyang Zhang, Zhiyong Zhang, Zengxuan Huang, Yong Zhou, Jianbei Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24837v1) | > In this paper, we present a Time Projection Chamber (TPC) system for low-background beta radiation measurements. The system consists of a TPC with two-dimensional-strip readout Micromegas and an anti-coincidence detector with readout pads for cosmic ray veto. The detector system utilize an AGET-based waveform sampling system for data acquisition.
  The beta detection capability of the system was v...

---

## 560. GenZ: Foundational models as latent variable generators within traditional statistical models

**Authors:** Marko Jojic, Nebojsa Jojic

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24834v1) | > We present GenZ, a hybrid model that bridges foundational models and statistical modeling through interpretable semantic features. While large language models possess broad domain knowledge, they often fail to capture dataset-specific patterns critical for prediction tasks. Our approach addresses this by discovering semantic feature descriptions through an iterative process that contrasts groups o...

---

## 561. Discovering Coordinated Joint Options via Inter-Agent Relative Dynamics

**Authors:** Raul D. Steleac, Mohan Sridharan, David Abel

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24827v1) | > Temporally extended actions improve the ability to explore and plan in single-agent settings. In multi-agent settings, the exponential growth of the joint state space with the number of agents makes coordinated behaviours even more valuable. Yet, this same exponential growth renders the design of multi-agent options particularly challenging. Existing multi-agent option discovery methods often sacr...

---

## 562. Video and Language Alignment in 2D Systems for 3D Multi-object Scenes with Multi-Information Derivative-Free Control

**Authors:** Jason Armitage, Rico Sennnrich

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24826v1) | > Cross-modal systems trained on 2D visual inputs are presented with a dimensional shift when processing 3D scenes. An in-scene camera bridges the dimensionality gap but requires learning a control module. We introduce a new method that improves multivariate mutual information estimates by regret minimisation with derivative-free optimisation. Our algorithm enables off-the-shelf cross-modal systems ...

---

## 563. Practising responsibility: Ethics in NLP as a hands-on course

**Authors:** Malvina Nissim, Viviana Patti, Beatrice Savoldi

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24825v1) | > As Natural Language Processing (NLP) systems become more pervasive, integrating ethical considerations into NLP education has become essential. However, this presents inherent challenges in curriculum development: the field's rapid evolution from both academia and industry, and the need to foster critical thinking beyond traditional technical training. We introduce our course on Ethical Aspects in...

---

## 564. LMG Index: A Robust Learned Index for Multi-Dimensional Performance Balance

**Authors:** Yuzhen Chen, Bin Yao

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24824v1) | > Index structures are fundamental for efficient query processing on large-scale datasets. Learned indexes model the indexing process as a prediction problem to overcome the inherent trade-offs of traditional indexes. However, most existing learned indexes optimize only for limited objectives like query latency or space usage, neglecting other practical evaluation dimensions such as update efficienc...

---

## 565. Unsupervised Topological Phase Discovery in Periodically Driven Systems via Floquet-Bloch State

**Authors:** Chen-Yang Wang, Jing-Ping Xu, Ce Wang, Ya-Ping Yang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24822v1) | > Floquet engineering offers an unparalleled platform for realizing novel non-equilibrium topological phases. However, the unique structure of Floquet systems, which includes multiple quasienergy gaps, poses a significant challenge to classification using conventional analytical methods. We propose a novel unsupervised machine learning framework that employs a kernel defined in momentum-time ($\bold...

---

## 566. Unregularized Linear Convergence in Zero-Sum Game from Preference Feedback

**Authors:** Shulun Chen, Runlong Zhou, Zihan Zhang, Maryam Fazel, Simon S. Du

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24818v1) | > Aligning large language models (LLMs) with human preferences has proven effective for enhancing model capabilities, yet standard preference modeling using the Bradley-Terry model assumes transitivity, overlooking the inherent complexity of human population preferences. Nash learning from human feedback (NLHF) addresses this by framing non-transitive preferences as a two-player zero-sum game, where...

---

## 567. Upscaling from ab initio atomistic simulations to electrode scale: The case of manganese hexacyanoferrate, a cathode material for Na-ion batteries

**Authors:** Yuan-Chi Yang, Eric Woillez, Quentin Jacquet, Ambroise van Roekeghem

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24816v1) | > We present a generalizable scale-bridging computational framework that enables predictive modeling of insertion-type electrode materials from atomistic to device scales. Applied to sodium manganese hexacyanoferrate, a promising cathode material for grid-scale sodium-ion batteries, our methodology employs an active-learning strategy to train a Moment Tensor Potential through iterative hybrid grand-...

---

## 568. Efficient Joint Resource Allocation for Wireless Powered ISAC with Target Localization

**Authors:** Boyao Li, Qinwei He, Boao Zhang, Xiaopeng Yuan, Anke Schmeink

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24815v1) | > Wireless powered integrated sensing and communication (ISAC) faces a fundamental tradeoff between energy supply, communication throughput, and sensing accuracy. This paper investigates a wireless powered ISAC system with target localization requirements, where users harvest energy from wireless power transfer (WPT) and then conduct ISAC transmissions in a time-division manner. In addition to energ...

---

## 569. Learning Temporally Consistent Turbulence Between Sparse Snapshots via Diffusion Models

**Authors:** Mohammed Sardar, Małgorzata J. Zimoń, Samuel Draycott, Alistair Revell, Alex Skillen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24813v1) | > We investigate the statistical accuracy of temporally interpolated spatiotemporal flow sequences between sparse, decorrelated snapshots of turbulent flow fields using conditional Denoising Diffusion Probabilistic Models (DDPMs). The developed method is presented as a proof-of-concept generative surrogate for reconstructing coherent turbulent dynamics between sparse snapshots, demonstrated on a 2D ...

---

## 570. DTI-GP: Bayesian operations for drug-target interactions using deep kernel Gaussian processes

**Authors:** Bence Bolgár, András Millinghoffer, Péter Antal

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24810v1) | > Precise probabilistic information about drug-target interaction (DTI) predictions is vital for understanding limitations and boosting predictive performance. Gaussian processes (GP) offer a scalable framework to integrate state-of-the-art DTI representations and Bayesian inference, enabling novel operations, such as Bayesian classification with rejection, top-$K$ selection, and ranking. We propose...

---

## 571. Limits of quantum generative models with classical sampling hardness

**Authors:** Sabrina Herbst, Ivona Brandić, Adrián Pérez-Salinas

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24801v1) | > Sampling tasks have been successful in establishing quantum advantages both in theory and experiments. This has fueled the use of quantum computers for generative modeling to create samples following the probability distribution underlying a given dataset. In particular, the potential to build generative models on classically hard distributions would immediately preclude classical simulability, du...

---

## 572. Non-Abelian Geometric Phases in Triangular Structures And Universal SU(2) Control in Shape Space

**Authors:** J. Dai, A. Molochkov, A. J. Niemi, J. Westerholm

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24798v1) | > We construct holonomic quantum gates for qubits that are encoded in the near-degenerate vibrational $E$-doublet of a deformable three-body system. Using Kendall's shape theory, we derive the Wilczek--Zee connection governing adiabatic transport within the $E$-manifold. We show that its restricted holonomy group is $\mathrm{SU}(2)$, implying universal single-qubit control by closed loops in shape s...

---

## 573. LeanCat: A Benchmark Suite for Formal Category Theory in Lean (Part I: 1-Categories)

**Authors:** Rongge Xu, Hui Dai, Yiming Fu, Jiedong Jiang, Tianjiao Nie

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24796v1) | > Large language models (LLMs) have made rapid progress in formal theorem proving, yet current benchmarks under-measure the kind of abstraction and library-mediated reasoning that organizes modern mathematics. In parallel with FATE's emphasis on frontier algebra, we introduce LeanCat, a Lean benchmark for category-theoretic formalization -- a unifying language for mathematical structure and a core l...

---

## 574. Nonlinear Noise2Noise for Efficient Monte Carlo Denoiser Training

**Authors:** Andrew Tinits, Stephen Mann

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24794v1) | [DOI](https://doi.org/10.1145/3757377.3763931)

> The Noise2Noise method allows for training machine learning-based denoisers with pairs of input and target images where both the input and target can be noisy. This removes the need for training with clean target images, which can be difficult to obtain. However, Noise2Noise training has a major limitation: nonlinear functions applied to the noisy targets will skew the results. This bias occurs be...

---

## 575. Self-Supervised Neural Architecture Search for Multimodal Deep Neural Networks

**Authors:** Shota Suzuki, Satoshi Ono

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24793v1) | [DOI](https://doi.org/10.1587/transinf.2024EDL8018)

> Neural architecture search (NAS), which automates the architectural design process of deep neural networks (DNN), has attracted increasing attention. Multimodal DNNs that necessitate feature fusion from multiple modalities benefit from NAS due to their structural complexity; however, constructing an architecture for multimodal DNNs through NAS requires a substantial amount of labeled training data...

---

## 576. Projection-based Adversarial Attack using Physics-in-the-Loop Optimization for Monocular Depth Estimation

**Authors:** Takeru Kusakabe, Yudai Hirose, Mashiho Mukaida, Satoshi Ono

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24792v1) | [DOI](https://doi.org/10.1587/transinf.2025MUL0002)

> Deep neural networks (DNNs) remain vulnerable to adversarial attacks that cause misclassification when specific perturbations are added to input images. This vulnerability also threatens the reliability of DNN-based monocular depth estimation (MDE) models, making robustness enhancement a critical need in practical applications. To validate the vulnerability of DNN-based MDE models, this study prop...

---

## 577. Curvature of left-invariant complex Finsler metric on Lie groups

**Authors:** Kuankuan Luo, Wei Xiao, Chunping Zhong

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24791v1) | > Let $ G $ be a connected Lie group with real Lie algebra $ \mathfrak{g}$. Suppose $G$ is also a complex manifold. We obtain explicit holomorphic sectional and bisectional curvature formulas of left-invariant strongly pseudoconvex complex Finsler metrics $F$ on $G$ in terms of the complex Lie algebra $\mathfrak{g}^{1,0}$; we also obtain a necessary and sufficient condition for $F$ to be a Kähler-Fi...

---

## 578. Digitalizing Over-the-Air Computation via The Novel Complement Coded Modulation

**Authors:** Zhixu Wang, Jiacheng Yao, Wei Xu, Wei Shi, Kaibin Huang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24788v1) | > To overcome inherent limitations of analog signals in over-the-air computation (AirComp), this letter proposes a two's complement-based coding scheme for the AirComp implementation with compatible digital modulations. Specifically, quantized discrete values are encoded into binary sequences using the two's complement and transmitted over multiple subcarriers. At the receiver, we design a decoder t...

---

## 579. HiGR: Efficient Generative Slate Recommendation via Hierarchical Planning and Multi-Objective Preference Alignment

**Authors:** Yunsheng Pang, Zijian Liu, Yudong Li, Shaojie Zhu, Zijian Luo

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24787v1) | > Slate recommendation, where users are presented with a ranked list of items simultaneously, is widely adopted in online platforms. Recent advances in generative models have shown promise in slate recommendation by modeling sequences of discrete semantic IDs autoregressively. However, existing autoregressive approaches suffer from semantically entangled item tokenization and inefficient sequential ...

---

## 580. A first approximation algorithm for the Bin Packing Problem with Setups

**Authors:** Roberto Baldacci, Fabio Ciccarelli, Stefano Coniglio, Valerio Dose, Fabio Furini

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24785v1) | > We study constant-factor approximation algorithms for the Bin Packing Problem with Setups (BPPS). First, we show that adaptations of classical BPP heuristics can have arbitrarily poor worst-case performance on BPPS instances. Then, we propose a two-phase heuristic for the BPPS that applies an α-approximation algorithm for the BPP to the items of each class and then performs a merging phase on the ...

---

## 581. Coarse geometry of extended admissible groups

**Authors:** Toan Trong Dao, Hoang Thanh Nguyen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.24784v1) | > Extended admissible groups belong to a particular class of graphs of groups that admit a decomposition generalizing those of non-geometric 3-manifold groups and Croke-Kleiner admissible groups. In this paper, we study several coarse-geometric aspects of extended admissible groups. We show that changing the gluing edge isomorphisms does not affect the quasi-isometry type of these groups. We also pr...

---

## 582. Perceptual Feature Integration for Sports Dancing Action Scenery Detection and Optimization

**Authors:** Lingjun Xiang, Xiang Gao

**Year:** 2024 | **Venue:** IEEE Access | **Citations:** N/A | **Score:** 0.000

[PDF](https://doi.org/10.1109/access.2024.3452981) | [DOI](https://doi.org/10.1109/ACCESS.2024.3452981)

> Deciphering the complex semantics within varied dancing sceneries is crucial for a multitude of AI endeavors. It can facilitate applications like dancing action optimization and dancing education. In our research, we propose a sophisticated approach to discerning multi-faceted perceptual visual features for accurately identifying dancing scenic imagery with intricate spatial designs. Our work cent...

---

## 583. Federated Multi-Label Feature Selection via Dual-Layer Hybrid Breeding Cooperative Particle Swarm Optimization with Manifold and Sparsity Regularization

**Authors:** Songsong Zhang, Huazhong Jin, Zhiwei Ỹe, Jia Yang, Jixin Zhang

**Year:** 2025 | **Venue:** Computers, Materials &amp; Continua | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.32604/cmc.2025.068044)

> : Multi-label feature selection (MFS) is a crucial dimensionality reduction technique aimed at identifying informative features associated with multiple labels. However, traditional centralized methods face significant challenges in privacy-sensitive and distributed settings, often neglecting label dependencies and suffering from low computational efficiency. To address these issues, we introduce ...

---

## 584. An Effective Manifold-based Optimization Method for Distributionally Robust Classification

**Authors:** Jiawei Huang, Huihua Ding

**Year:** 2025 | **Venue:** International Conference on Learning Representations | **Citations:** N/A | **Score:** 0.000

> ...

---

## 585. Riemannian Optimization on the Oblique Manifold for Sparse Simplex Constraints via Multiplicative Updates

**Authors:** Flavia Esposito, Andersen Ang

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> Low-rank optimization problems with sparse simplex constraints involve variables that must satisfy nonnegativity, sparsity, and sum-to-one conditions, making their optimization particularly challenging due to the interplay between low-rank structures and constraints. These problems arise in various applications, including machine learning, signal processing, environmental fields, and computational...

---

## 586. Differential Evolution for Grassmann Manifold Optimization: A Projection Approach

**Authors:** Andrew Lesniewski

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2503.21984)

> We propose a novel evolutionary algorithm for optimizing real-valued objective functions defined on the Grassmann manifold Gr}(k,n), the space of all k-dimensional linear subspaces of R^n. While existing optimization techniques on Gr}(k,n) predominantly rely on first- or second-order Riemannian methods, these inherently local methods often struggle with nonconvex or multimodal landscapes. To addre...

---

## 587. Diffusion Policy Policy Optimization

**Authors:** Allen Z. Ren, Justin Lidard, Lars Ankile, A. Simeonov, Pulkit Agrawal

**Year:** 2024 | **Venue:** International Conference on Learning Representations | **Citations:** 125 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2409.00588)

> We introduce Diffusion Policy Policy Optimization, DPPO, an algorithmic framework including best practices for fine-tuning diffusion-based policies (e.g. Diffusion Policy) in continuous control and robot learning tasks using the policy gradient (PG) method from reinforcement learning (RL). PG methods are ubiquitous in training RL policies with other policy parameterizations; nevertheless, they had...

---

## 588. Quantum Comb Tomography via Learning Isometries on Stiefel Manifold.

**Authors:** Ze-Tong Li, Xin-Lin He, Congcong Zheng, Yu-Qian Dong, Tian Luan

**Year:** 2025 | **Venue:** Physical Review Letters | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.1103/physrevlett.134.010803)

> Explicit mathematical reconstructions of quantum combs play a significant role in developing quantum information science. However, tremendous parameter requirements and physical constraint implementations have become computationally nonignorable encumbrances. In this Letter, we propose an efficient method for quantum comb tomography by learning isometries on the Stiefel manifold via solving a seri...

---

## 589. A new method for attributed graph clustering with dual-manifold orthogonal matrix learning

**Authors:** TianYi Yu, Shayan Nejadshamsi

**Year:** 2025 | **Venue:** Multimedia Systems | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1007/s00530-025-01998-w)

> ...

---

## 590. Manifold Kernelization of Molecular Surface to Encode Quantum Information of Electronic Attributes for Machine Learning.

**Authors:** Tonglei Li, Venkata S Chelagamsetty, Nicolas J Huls, Ryan T Jordan

**Year:** 2025 | **Venue:** Journal of Chemical Theory and Computation | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1021/acs.jctc.5c01117)

> A novel concept of encoding electronic quantities on a molecular surface is developed by unsupervised kernel learning. Through optimization of the hyperparameters of Spectral Mixture (SM) kernel functions in conducting Sparse Gaussian Process (SGP) regression of electronic attributes on a surface manifold, the resultant covariance matrix, or kernel, captures the mutual relationships among the elec...

---

## 591. SMTLNet: Domain Prior-Inspired Tooth Segmentation Based on Self-Supervised Manifold Transfer Learning

**Authors:** Yue Zhao, Ruoyu Wu, Pengyu Dai, Hong Huang, Yang Liu

**Year:** 2025 | **Venue:** IEEE Transactions on Neural Networks and Learning Systems | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/TNNLS.2025.3591003)

> Accurate identification and delineation of teeth in cone-beam computed tomography (CBCT) images are crucial in the advancement of digital dentistry technology. Teeth exhibit high interclass similarity and often have fuzzy boundaries. In addition, it is difficult to obtain teeth samples due to the time-consuming annotation process. However, existing methods typically fail to incorporate this domain...

---

## 592. Manifold-constrained Hamilton-Jacobi Reachability Learning for Decentralized Multi-Agent Motion Planning

**Authors:** Qingyi Chen, Ruiqi Ni, Jun Kim, A. H. Qureshi

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2511.03591)

> Safe multi-agent motion planning (MAMP) under task-induced constraints is a critical challenge in robotics. Many real-world scenarios require robots to navigate dynamic environments while adhering to manifold constraints imposed by tasks. For example, service robots must carry cups upright while avoiding collisions with humans or other robots. Despite recent advances in decentralized MAMP for high...

---

## 593. L2Calib: SE (3)-Manifold Reinforcement Learning for Robust Extrinsic Calibration with Degenerate Motion Resilience

**Authors:** Baorun Li, Chengrui Zhu, Siyi Du, Bingran Chen, Jie Ren

**Year:** 2025 | **Venue:** IEEE/RJS International Conference on Intelligent RObots and Systems | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/IROS60139.2025.11246454)

> Extrinsic calibration is essential for multi-sensor fusion, existing methods rely on structured targets or fully-excited data, limiting real-world applicability. Online calibration further suffers from weak excitation, leading to unreliable estimates. To address these limitations, we propose a reinforcement learning (RL)-based extrinsic calibration framework that formulates extrinsic calibration a...

---

## 594. USLC: Universal self‐learning control via physical performance policy‐optimization neural network

**Authors:** Yanhui Zhang, Xiaoling Liang, Weifang Chen, Kunfeng Lu, Chao Xu

**Year:** 2024 | **Venue:** IET Control Theory &amp; Applications | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.1049/cth2.12758)

> This article proposes an online universal self‐learning control (USLC) algorithm based on a physical performance policy‐optimization neural network, which aims to solve the problem of universal self‐learning optimal control laws for nonlinear systems with various uncertain dynamics. As a key system characterization, this algorithm predicts the discrepancy between the optimal and current control la...

---

## 595. Preference-Optimized Pareto Set Learning for Blackbox Optimization

**Authors:** Haishan Zhang, Diptesh Das, Koji Tsuda

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2408.09976)

> Multi-Objective Optimization (MOO) is an important problem in real-world applications. However, for a non-trivial problem, no single solution exists that can optimize all the objectives simultaneously. In a typical MOO problem, the goal is to find a set of optimum solutions (Pareto set) that trades off the preferences among objectives. Scalarization in MOO is a well-established method for finding ...

---

## 596. Representational learning by optimization of neural manifolds in an olfactory memory network

**Authors:** Bo Hu, Nesibe Z. Temiz, Chi-Ning Chou, Peter Rupprecht, Claire Meissner-Bernard

**Year:** 2024 | **Venue:** bioRxiv | **Citations:** 1 | **Score:** 0.000

[PDF](https://www.biorxiv.org/content/biorxiv/early/2024/11/18/2024.11.17.623906.full.pdf) | [DOI](https://doi.org/10.1101/2024.11.17.623906)

> Higher brain functions depend on experience-dependent representations of relevant information that may be organized by attractor dynamics or by geometrical modifications of continuous “neural manifolds”. To explore these scenarios we analyzed odor-evoked activity in telencephalic area pDp of juvenile and adult zebrafish, the homolog of piriform cortex. No obvious signatures of attractor dynamics w...

---

## 597. Bridging Interpretability and Optimization: Provably Attribution-Weighted Actor-Critic in Reproducing Kernel Hilbert Spaces

**Authors:** Na Li, Hangguan Shan, Wei Ni, Wenjie Zhang, Xinyu Li

**Year:** 2025 | **Venue:**  | **Citations:** N/A | **Score:** 0.000

> Actor-critic (AC) methods are a cornerstone of reinforcement learning (RL) but offer limited interpretability. Current explainable RL methods seldom use state attributions to assist training. Rather, they treat all state features equally, thereby neglecting the heterogeneous impacts of individual state dimensions on the reward. We propose RKHS--SHAP-based Advanced Actor--Critic (RSA2C), an attribu...

---

## 598. Intelligent monitoring system for quality of life of colostomy patients based on deep learning and AR

**Authors:** Shengqin Wang, Yuqing Zhang, Fangfang Xu, Guihua Zhou

**Year:** 2025 | **Venue:** Scientific Reports | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1038/s41598-025-21470-z)

> The clinical challenges in monitoring high-incidence complications in patients with colostomy after colorectal cancer surgery have led to the development of an intelligent monitoring system based on deep learning and augmented reality technology in this study. Traditional care relies on subjective scales for assessment, which has issues such as insufficient sensitivity and delayed response. The ex...

---

## 599. Simultaneously Learning of Motion, Stiffness, and Force From Human Demonstration Based on Riemannian DMP and QP Optimization

**Authors:** Zhiwei Liao, Francesco Tassi, Chenwei Gong, M. Leonori, Fei Zhao

**Year:** 2025 | **Venue:** IEEE Transactions on Automation Science and Engineering | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.1109/TASE.2024.3469961)

> In this paper, we propose a motion, stiffness, and force learning framework based on an extended dynamic movement primitive (DMP) and quadratic programming (QP) optimization. The objective is to learn kinematic and dynamic operational parameters from a one-shot human demonstration, through measurement and estimation of the motion, 3-dimensional (3-D) endpoint stiffness, and applied forces of the h...

---

## 600. Learning to Expand/Contract Pareto Sets in Dynamic Multiobjective Optimization With a Changing Number of Objectives

**Authors:** Gan Ruan, Leandro L. Minku, Stefan Menzel, B. Sendhoff, Xin Yao

**Year:** 2025 | **Venue:** IEEE Transactions on Evolutionary Computation | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.1109/TEVC.2024.3375751)

> Dynamic multiobjective optimization problems (DMOPs) with a changing number of objectives (NObjs) may have Pareto-optimal set (PS) manifold expanding or contracting over time. Knowledge transfer has been used for solving DMOPs, since it can transfer useful information from solving one problem instance to solve another related problem instance. However, we show that the state-of-the-art transfer ap...

---

## 601. A hybrid object detection approach for visually impaired persons using pigeon-inspired optimization and deep learning models

**Authors:** A. M. Alashjaee, H. Aleisa, Abdulbasit A. Darem, Radwa Marzouk

**Year:** 2025 | **Venue:** Scientific Reports | **Citations:** 5 | **Score:** 0.000

[PDF](https://doi.org/10.1038/s41598-025-92239-7) | [DOI](https://doi.org/10.1038/s41598-025-92239-7)

> Visually challenged persons include a significant part of the population, and they exist all over the globe. Recently, technology has demonstrated its occurrence in each field, and state-of-the-art devices aid humans in their everyday lives. However, visually impaired people cannot view things around their atmospheres; they can only imagine the roaming surroundings. Furthermore, web-based applicat...

---

## 602. Two-tier nature inspired optimization-driven ensemble of deep learning models for effective autism spectrum disorder diagnosis in disabled persons

**Authors:** Saud S. Alotaibi, T. Alghamdi, Reem M. Alharthi

**Year:** 2025 | **Venue:** Scientific Reports | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.1038/s41598-025-93802-y)

> Autism spectrum disorder (ASD) includes a varied set of neuropsychiatric illnesses. This disorder is described by a definite grade of loss in social communication, academic functioning, personal contact, and limited and repetitive behaviours. Individuals with ASD might perform, convey, and study in a different way than others. ASDs naturally are apparent before age 3 years, with related impairment...

---

## 603. Reinforcement Learning Based Online Algorithm for Near-Field Time-Varying IRS Phase Shift Optimization: System Evolution Perspective

**Authors:** Zongtai Li, Rui Wang, Erwu Liu

**Year:** 2025 | **Venue:** IEEE Transactions on Signal Processing | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.1109/TSP.2025.3545164)

> This paper proposes a reinforcement learning (RL) based intelligent reflecting surface (IRS) incremental control algorithm for a mmWave time-varying multi-user multiple-input single-output (MU-MISO) system. The research focuses on addressing the key challenge of near-field IRS design, which involves time-varying channels due to users’ mobility. In practice, the optimization becomes more challengin...

---

## 604. Graph Learning With Riemannian Optimization for Multi-View Integrative Clustering

**Authors:** Aparajita Khan, Pradipta Maji

**Year:** 2025 | **Venue:** IEEE Transactions on Emerging Topics in Computational Intelligence | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.1109/TETCI.2024.3406704)

> Real-world multi-view data may manifest as point-clouds, but their meaningful structure often resides on a lower dimensional manifold embedded in the higher dimensional space. Consequently, existing graph based multi-view algorithms focus primarily on extraction of the low-rank subspaces for clustering. However, simultaneous optimization of the individual graph structures, their contributions/weig...

---

## 605. Logic-informed reinforcement learning for cross-domain optimization of large-scale cyber-physical systems

**Authors:** Guangxi Wan, Peng Zeng, Xiaoting Dong, Chunhe Song, Shijie Cui

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2511.00806)

> Cyber-physical systems (CPS) require the joint optimization of discrete cyber actions and continuous physical parameters under stringent safety logic constraints. However, existing hierarchical approaches often compromise global optimality, whereas reinforcement learning (RL) in hybrid action spaces often relies on brittle reward penalties, masking, or shielding and struggles to guarantee constrai...

---

## 606. Learning Low-Dimensional Embeddings for Black-Box Optimization

**Authors:** R. Busetto, Manas Mejari, M. Forgione, Alberto Bemporad, D. Piga

**Year:** 2025 | **Venue:** arXiv.org | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2505.01112)

> When gradient-based methods are impractical, black-box optimization (BBO) provides a valuable alternative. However, BBO often struggles with high-dimensional problems and limited trial budgets. In this work, we propose a novel approach based on meta-learning to pre-compute a reduced-dimensional manifold where optimal points lie for a specific class of optimization problems. When optimizing a new p...

---

## 607. Symmetry-Preserving Optimization of Differentially Private Machine Learning Based on Feature Importance

**Authors:** Nan-I Wu, Jing-Ting Wu, Min-Shiang Hwang

**Year:** 2025 | **Venue:** Symmetry | **Citations:** N/A | **Score:** 0.000

[DOI](https://doi.org/10.3390/sym17101747)

> Symmetry plays a critical role in preserving the structural balance and statistical integrity of datasets, particularly in privacy-preserving machine learning. Differential privacy introduces random noise to individual data points to ensure privacy while maintaining the overall symmetry of statistical distributions. However, excessive noise can reduce the utility of data, model accuracy, and compu...

---

## 608. Manifold Sampling for Differentiable Uncertainty in Radiance Fields

**Authors:** Linjie Lyu, A. Tewari, Marc Habermann, Shunsuke Saito, Michael Zollhofer

**Year:** 2024 | **Venue:** ACM SIGGRAPH Conference and Exhibition on Computer Graphics and Interactive Techniques in Asia | **Citations:** 6 | **Score:** 0.000

[PDF](https://dl.acm.org/doi/pdf/10.1145/3680528.3687655) | [DOI](https://doi.org/10.1145/3680528.3687655)

> Radiance fields are powerful and, hence, popular models for representing the appearance of complex scenes. Yet, constructing them based on image observations gives rise to ambiguities and uncertainties. We propose a versatile approach for learning Gaussian radiance fields with explicit and fine-grained uncertainty estimates that impose only little additional cost compared to uncertainty-agnostic t...

---

## 609. An efficient algorithm for the Riemannian logarithm on the Stiefel manifold for a family of Riemannian metrics

**Authors:** Simon Mataigne, Ralf Zimmermann, Nina Miolane

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 7 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2403.11730)

> Since the popularization of the Stiefel manifold for numerical applications in 1998 in a seminal paper from Edelman et al., it has been exhibited to be a key to solve many problems from optimization, statistics and machine learning. In 2021, H\"uper et al. proposed a one-parameter family of Riemannian metrics on the Stiefel manifold, subsuming the well-known Euclidean and canonical metrics. Since ...

---

## 610. Inductive Global and Local Manifold Approximation and Projection

**Authors:** Jungeum Kim, Xiao Wang

**Year:** 2024 | **Venue:** Trans. Mach. Learn. Res. | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2406.08097)

> Nonlinear dimensional reduction with the manifold assumption, often called manifold learning, has proven its usefulness in a wide range of high-dimensional data analysis. The significant impact of t-SNE and UMAP has catalyzed intense research interest, seeking further innovations toward visualizing not only the local but also the global structure information of the data. Moreover, there have been ...

---

## 611. Exploring the Manifold of Neural Networks Using Diffusion Geometry

**Authors:** Elliott Abel, Peyton Crevasse, Yvan Grinspan, Selma Mazioud, Folu Ogundipe

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 1 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2411.12626)

> Drawing motivation from the manifold hypothesis, which posits that most high-dimensional data lies on or near low-dimensional manifolds, we apply manifold learning to the space of neural networks. We learn manifolds where datapoints are neural networks by introducing a distance between the hidden layer representations of the neural networks. These distances are then fed to the non-linear dimension...

---

## 612. Cross-View Approximation on Grassmann Manifold for Multiview Clustering

**Authors:** Yidan Ma, Xinjie Shen, Danyang Wu, Jianfu Cao, Feiping Nie

**Year:** 2024 | **Venue:** IEEE Transactions on Neural Networks and Learning Systems | **Citations:** 5 | **Score:** 0.000

[DOI](https://doi.org/10.1109/TNNLS.2024.3388192)

> In existing multiview clustering research, the comprehensive learning from multiview graph and feature spaces simultaneously remains insufficient when achieving a consistent clustering structure. In addition, a postprocessing step is often required. In light of these considerations, a cross-view approximation on Grassman manifold (CAGM) model is proposed to address inconsistencies within multiview...

---

## 613. A Web Data Mining Algorithm Based on Manifold Distance for Mixed Data in Cloud Service Architecture

**Authors:** Hui Wang, Tie Cai, Dongsheng Cheng, Kangshun Li, Guangming Lin

**Year:** 2024 | **Venue:** International Journal of Cognitive Informatics and Natural Intelligence | **Citations:** N/A | **Score:** 0.000

[PDF](https://www.igi-global.com/ViewTitle.aspx?TitleId=344021&isxn=9798369324714) | [DOI](https://doi.org/10.4018/ijcini.344021)

> Due to the complex distribution of web data and frequent updates under the cloud service architecture, the existing methods for global consistency of data ignore the global consistency of distance measurement and the inability to obtain neighborhood information of data. To overcome these problems, we transform the multi-information goal and multi-user demand (constraint conditions) in web data min...

---

## 614. Recurrent Neural Networks Modelling based on Riemannian Symmetric Positive Definite Manifold

**Authors:** Léa Dubreil, Samy Labsir, Etienne Rouanet-Labé, Gael Pages

**Year:** 2024 | **Venue:** European Signal Processing Conference | **Citations:** N/A | **Score:** 0.000

[PDF](https://hal.science/hal-04708219v1/file/0001192.pdf) | [DOI](https://doi.org/10.23919/eusipco63174.2024.10715039)

> State estimation with Kalman Filters (KF) regularly encounters covariance matrices that are unknown or empirically determined, causing sub-optimal performances. Solutions to lift these uncertainties are opening up to estimation techniques based on the hybridization of KF with deep learning methods. In fact, inferring covariance matrices from neural networks gives rise to enforcing symmetric positi...

---

## 615. MIMO Radar Waveform Design for Range-ISL Optimization via Iterative Deep Unfolding Network

**Authors:** Ziwei Zhao, Jinfeng Hu, Kai Zhong, Yongfeng Zuo, Huiyong Li

**Year:** 2024 | **Venue:** IEEE Geoscience and Remote Sensing Letters | **Citations:** 10 | **Score:** 0.000

[DOI](https://doi.org/10.1109/LGRS.2024.3368446)

> Multiple-input multiple-output (MIMO) radar unimodular waveform design with range-integrated sidelobe level (ISL) optimization is a key technology in remote sensing. Due to the nonconvex quartic objective function and constant modulus constraint (CMC), the problem is NP-hard and nonconvex. Existing methods mainly include relaxation methods or nonrelaxation methods with huge computational costs. We...

---

## 616. Diff-BBO: Diffusion-Based Inverse Modeling for Black-Box Optimization

**Authors:** D. Wu, Nikki Lijing Kuang, Ruijia Niu, Yi-An Ma, Rose Yu

**Year:** 2024 | **Venue:** arXiv.org | **Citations:** 8 | **Score:** 0.000

[DOI](https://doi.org/10.48550/arXiv.2407.00610)

> ...

---

## 617. Locally Linear Embedding Based on Gannet Optimization Algorithm

**Authors:** Yiqi Zhu, Yang Yang, Yilin Fang, Wei Nai, Zan Yang

**Year:** 2024 | **Venue:** 2024 IEEE 4th International Conference on Information Technology, Big Data and Artificial Intelligence (ICIBA) | **Citations:** 3 | **Score:** 0.000

[DOI](https://doi.org/10.1109/ICIBA62489.2024.10868270)

> The analysis and feature extraction of high-dimensional data can help people solve various problems in current industry applications, and manifold learning is a type of data dimensionality reduction method developed based on the concept of topological manifolds. Locally linear embedding (LLE) algorithm, as a classic manifold learning algorithm, has attracted much attention due to its low computati...

---

## 618. t-SNE Based on Halton Sequence Initialized Mountaineering Team-Based Optimization Algorithm

**Authors:** Yue Tang, Wei Nai, Nengwei Lei, Dan Li, Zan Yang

**Year:** 2024 | **Venue:** IEEE International Conference on Electronics Information and Emergency Communication | **Citations:** 2 | **Score:** 0.000

[DOI](https://doi.org/10.1109/ICEIEC61773.2024.10561807)

> t-distributed stochastic neighbor embedding (t-SNE) is a classic manifold learning algorithm in the field of machine learning (ML), and it is a non-linear data dimensionality reduction method. Manifold learning generally constructs homeomorphic mappings from high-dimensional spaces to low dimensional spaces based on different mathematical ideas. The idea of t-SNE is to pursue the probability isomo...

---

## 619. Proximal methods for structured nonsmooth optimization over Riemannian submanifolds

**Authors:** Qia Li, Na Zhang, Junyu Feng, Hanwei Yan

**Year:** 2024 | **Venue:**  | **Citations:** 3 | **Score:** 0.000

> In this paper, we consider a class of structured nonsmooth optimization problems over an embedded submanifold of a Euclidean space, where the first part of the objective is the sum of a difference-of-convex (DC) function and a smooth function, while the remaining part is a weakly convex function over a smooth function. This model problem has many important applications in machine learning and scie...

---

