# Research Papers: foundational papers on catastrophic forgetting

Updated: 2026-01-03 17:50
Total: 108 papers

---

## 1. Effect of scale on catastrophic forgetting in neural networks

**Authors:** Vinay Venkatesh Ramasesh, Aitor Lewkowycz, Ethan Dyer

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=GhVS8_yPeEa) | > Catastrophic forgetting presents a challenge in developing deep learning models capable of continual learning, i.e. learning tasks sequentially. Recently, both computer vision and natural-language processing have witnessed great progress through the use of large-scale pretrained models. In this work, we present an empirical study of catastrophic forgetting in this pretraining paradigm.
Our experim...

---

## 2. Forward Explanation : Why Catastrophic Forgetting Occurs

**Authors:** Weimin Yin, Chunzhao Xie, Bin Chen, Zhenhao Tan

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> The training framework relying on backpropagation and gradient descent has resulted in the creation of opaque models, leading to many problems that we cannot explain. One such problem that has remained inexplicable since the advent of neural networks is catastrophic forgetting. Recently, We have made some intriguing discoveries, which we have integrated into an explanation for neural network train...

---

## 3. Towards Understanding Catastrophic Forgetting in Two-layer Convolutional Neural Networks

**Authors:** Boqi Li, Youjun Wang, Weiwei Liu

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=WkqZ6Qmmq2) | > Continual learning (CL) focuses on the ability of models to learn sequentially from a stream of tasks. A major challenge in CL is catastrophic forgetting (CF). CF is a phenomenon where the model experiences significant performance degradation on previously learned tasks after training on new tasks. Although CF is commonly observed in convolutional neural networks (CNNs), the theoretical understand...

---

## 4. Learn to Grow: A Continual Structure Learning Framework for Overcoming Catastrophic Forgetting

**Authors:** Xilai Li, Yingbo Zhou, Tianfu Wu, Richard Socher, Caiming Xiong

**Year:** 2019 | **Venue:** ICML 2019 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v97/li19m/li19m.pdf) | > Addressing catastrophic forgetting is one of the key challenges in continual learning where machine learning systems are trained with sequential or streaming tasks. Despite recent remarkable progress in state-of-the-art deep learning, deep neural networks (DNNs) are still plagued with the catastrophic forgetting problem. This paper presents a conceptually simple yet general and effective framework...

---

## 5. Minimizing Change in Classifier Likelihood to Mitigate Catastrophic Forgetting

**Authors:** Ashish Gaurav, Sachin Vernekar, Sean Sedwards, Jaeyoung Lee, Vahdat Abdelzad

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Continual learning is a longstanding goal of artificial intelligence, but is often counfounded by catastrophic forgetting that prevents neural networks from learning tasks sequentially. Previous methods in continual learning have demonstrated how to mitigate catastrophic forgetting, and learn new tasks while retaining performance on the previous tasks. We analyze catastrophic forgetting from the p...

---

## 6. Addressing Catastrophic Forgetting in Few-Shot Problems

**Authors:** Pauching Yap, Hippolyt Ritter, David Barber

**Year:** 2021 | **Venue:** ICML 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v139/yap21a/yap21a.pdf) | > Neural networks are known to suffer from catastrophic forgetting when trained on sequential datasets. While there have been numerous attempts to solve this problem in large-scale supervised classification, little has been done to overcome catastrophic forgetting in few-shot classification problems. We demonstrate that the popular gradient-based model-agnostic meta-learning algorithm (MAML) indeed ...

---

## 7. An Empirical Investigation of Catastrophic Forgeting in Gradient-Based Neural Networks

**Authors:** Yoshua Bengio, Mehdi Mirza, Ian Goodfellow, Aaron Courville, Xia Da

**Year:** 2014 | **Venue:** ICLR 2014 | **Citations:** N/A | **Score:** 0.000

> Catastrophic forgetting is a problem faced by many machine learning models and algorithms. When trained on one task, then trained on a second task, many machine learning models 'forget'' how to perform the first task. This is widely believed to be a serious problem for neural networks. Here, we investigate the extent to which the catastrophic forgetting problem occurs for modern neural networks, c...

---

## 8. Neural Linear Bandits: Overcoming Catastrophic Forgetting through Likelihood Matching

**Authors:** Tom Zahavy, Shie Mannor

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> We study neural-linear bandits for solving problems where both exploration and representation learning play an important role. Neural-linear bandits leverage the representation power of deep neural networks and combine it with efficient exploration mechanisms, designed for linear contextual bandits, on top of the last hidden layer. Since the representation is being optimized during learning, infor...

---

## 9. SupportNet: solving catastrophic forgetting in class incremental learning with support data

**Authors:** Yu Li, Zhongxiao Li, Lizhong Ding, Yijie Pan, Chao Huang

**Year:** 2019 | **Venue:** ICLR 2019 | **Citations:** N/A | **Score:** 0.000

> A plain well-trained deep learning model often does not have the ability to learn new knowledge without forgetting the previously learned knowledge, which is known as catastrophic forgetting. Here we propose a novel method, SupportNet, to efficiently and effectively solve the catastrophic forgetting problem in the class incremental learning scenario. SupportNet combines the strength of deep learni...

---

## 10. Overcoming Catastrophic Forgetting by Incremental Moment Matching

**Authors:** Sang-Woo Lee, Jin-Hwa Kim, Jaehyun Jun, Jung-Woo Ha, Byoung-Tak Zhang

**Year:** 2017 | **Venue:** NIPS 2017 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2017/file/f708f064faaf32a43e4d3c784e6af9ea-Paper.pdf) | > Catastrophic forgetting is a problem of neural networks that loses the information of the first task after training the second task. Here, we propose a method, i.e. incremental moment matching (IMM), to resolve this problem. IMM incrementally matches the moment of the posterior distribution of the neural network which is trained on the first and the second task, respectively. To make the search sp...

---

## 11. Eidetic Learning: an Efficient and Provable Solution to Catastrophic Forgetting

**Authors:** Nicholas Andrew Dronen, Randall Balestriero

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Catastrophic forgetting -- the phenomenon of a neural network learning a task and losing the ability to perform it after being trained on some other task -- is a long-standing problem for neural networks \citep{mccloskey1989catastrophic}. We introduce Eidetic Learning and prove that it guarantees networks do not forget. When training an EideticNet, accuracy on previous tasks is preserved because t...

---

## 12. The Joint Effect of Task Similarity and Overparameterization on Catastrophic Forgetting — An Analytical Model

**Authors:** Daniel Goldfarb, Itay Evron, Nir Weinberger, Daniel Soudry, PAul HAnd

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=u3dHl287oB) | > In continual learning, catastrophic forgetting is affected by multiple aspects of the tasks. Previous works have analyzed separately how forgetting is affected by either task similarity or overparameterization. In contrast, our paper examines how task similarity and overparameterization jointly affect forgetting in an analyzable model. Specifically, we focus on two-task continual linear regression...

---

## 13. Catastrophic Forgetting Meets Negative Transfer: Batch Spectral Shrinkage for Safe Transfer Learning

**Authors:** Xinyang Chen, Sinan Wang, Bo Fu, Mingsheng Long, Jianmin Wang

**Year:** 2019 | **Venue:** NIPS 2019 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2019/file/c6bff625bdb0393992c9d4db0c6bbe45-Paper.pdf) | > Before sufficient training data is available, fine-tuning neural networks pre-trained on large-scale datasets substantially outperforms training from random initialization. However, fine-tuning methods suffer from two dilemmas, catastrophic forgetting and negative transfer. While several methods with explicit attempts to overcome catastrophic forgetting have been proposed, negative transfer is rar...

---

## 14. Towards guarantees for parameter isolation in continual learning

**Authors:** Giulia Lanzillotta, Sidak Pal Singh, Benjamin F Grewe, Thomas Hofmann

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

> Deep learning has proved to be a successful paradigm to solve many challenges in machine learning.  However, deep neural networks fail when trained sequentially on multiple tasks, a shortcoming known as catastrophic forgetting in the continual learning literature. Despite a recent flourish of learning algorithms successfully addressing this problem, we find that provable guarantees against catastr...

---

## 15. An Empirical Study of Example Forgetting during Deep Neural Network Learning

**Authors:** Mariya Toneva*, Alessandro Sordoni*, Remi Tachet des Combes*, Adam Trischler, Yoshua Bengio

**Year:** 2019 | **Venue:** ICLR 2019 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=BJlxm30cKm) | > Inspired by the phenomenon of catastrophic forgetting, we investigate the learning dynamics of neural networks as they train on single classification tasks. Our goal is to understand whether a related phenomenon occurs when data does not undergo a clear distributional shift. We define a ``forgetting event'' to have occurred when an individual training example transitions from being classified corr...

---

## 16. Predicting the Susceptibility of Examples to Catastrophic Forgetting

**Authors:** Guy Hacohen, Tinne Tuytelaars

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=sUBuOCquHX) | > Catastrophic forgetting -- the tendency of neural networks to forget previously learned data when learning new information -- remains a central challenge in continual learning. In this work, we adopt a behavioral approach, observing a connection between learning speed and forgetting: examples learned more quickly are less prone to forgetting. Focusing on replay-based continual learning, we show th...

---

## 17. Bayesian Online Meta-Learning

**Authors:** Pauching Yap, Hippolyt Ritter, David Barber

**Year:** 2021 | **Venue:** ICLR 2021 | **Citations:** N/A | **Score:** 0.000

> Neural networks are known to suffer from catastrophic forgetting when trained on sequential datasets. While there have been numerous attempts to solve this problem for large-scale supervised classification, little has been done to overcome catastrophic forgetting for few-shot classification problems. Few-shot meta-learning algorithms often require all few-shot tasks to be readily available in a ba...

---

## 18. Overcoming Catastrophic Forgetting via Hessian-free Curvature Estimates

**Authors:** Leonid Butyrev, Georgios Kontes, Christoffer Löffler, Christopher Mutschler

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Learning neural networks with gradient descent over a long sequence of tasks is problematic as their fine-tuning to new tasks overwrites the network weights that are important for previous tasks. This leads to a poor performance on old tasks – a phenomenon framed as catastrophic forgetting.  While early approaches use task rehearsal and growing networks that both limit the scalability of the task ...

---

## 19. Anatomy of Catastrophic Forgetting: Hidden Representations and Task Semantics

**Authors:** Vinay Venkatesh Ramasesh, Ethan Dyer, Maithra Raghu

**Year:** 2021 | **Venue:** ICLR 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=LhY8QdUGSuw) | > Catastrophic forgetting is a recurring challenge to developing versatile deep learning models. Despite its ubiquity, there is limited understanding of its connections to neural network (hidden) representations and task semantics. In this paper, we address this important knowledge gap. Through quantitative analysis of neural representations, we find that deeper layers are disproportionately respons...

---

## 20. Online Structured Laplace Approximations for Overcoming Catastrophic Forgetting

**Authors:** Hippolyt Ritter, Aleksandar Botev, David Barber

**Year:** 2018 | **Venue:** NIPS 2018 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2018/file/f31b20466ae89669f9741e047487eb37-Paper.pdf) | > We introduce the Kronecker factored online Laplace approximation for overcoming catastrophic forgetting in neural networks. The method is grounded in a Bayesian online learning framework, where we recursively approximate the posterior after every task with a Gaussian, leading to a quadratic penalty on changes to the weights. The Laplace approximation requires calculating the Hessian around a mode,...

---

## 21. Activity Regularization for Continual Learning

**Authors:** Quang H. Pham, Steven C. H. Hoi

**Year:** 2019 | **Venue:** ICLR 2019 | **Citations:** N/A | **Score:** 0.000

> While deep neural networks have achieved remarkable successes, they suffer the well-known catastrophic forgetting issue when switching from existing tasks to tackle a new one. In this paper, we study continual learning with deep neural networks that learn from tasks arriving sequentially. We first propose an approximated multi-task learning framework that unifies a family of popular regularization...

---

## 22. Can LLMs Alleviate Catastrophic Forgetting in Graph Continual Learning? A Systematic Study

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Nowadays, real-world data, including graph-structure data, often arrives in a streaming manner, which means that learning systems need to continuously acquire new knowledge without forgetting previously learned information. Although substantial existing works attempt to address catastrophic forgetting in graph machine learning, they are all based on training from scratch with streaming data. With ...

---

## 23. A comprehensive, application-oriented study of catastrophic forgetting in DNNs

**Authors:** B. Pfülb, A. Gepperth

**Year:** 2019 | **Venue:** ICLR 2019 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=BkloRs0qK7) | > We present a large-scale empirical study of catastrophic forgetting (CF) in modern Deep Neural Network (DNN) models that perform sequential (or: incremental) learning.
A new experimental protocol is proposed that takes into account typical constraints encountered in application scenarios.
As the investigation is empirical, we evaluate CF behavior on the hitherto largest number of visual classifica...

---

## 24. GAN Memory with No Forgetting

**Authors:** Yulai Cong, Miaoyun Zhao, Jianqiao Li, Sijia Wang, Lawrence Carin

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/bf201d5407a6509fa536afc4b380577e-Paper.pdf) | > As a fundamental issue in lifelong learning, catastrophic forgetting is directly caused by inaccessible historical data; accordingly, if the data (information) were memorized perfectly, no forgetting should be expected. Motivated by that, we propose a GAN memory for lifelong learning, which is capable of remembering a stream of datasets via generative processes, with \emph{no} forgetting. Our GAN ...

---

## 25. CAN - CONTINUOUSLY ADAPTING NETWORKS

**Authors:** Harikrishna Satheesh Pillai, Pakhi Banchalia

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

> Catastrophic forgetting is a fundamental challenge in neural networks that prevents continuous learning, which is one of the properties essential for achieving true general artificial intelligence. When trained sequentially on multiple tasks, conventional neural networks overwrite previously learned knowledge, hindering their ability to retain and apply past experiences. However, people and other ...

---

## 26. Principles of Forgetting in Domain-Incremental Semantic Segmentation in Adverse Weather Conditions

**Authors:** Tobias Kalb, Jürgen Beyerer

**Year:** 2023 | **Venue:** CVPR 2023 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openaccess.thecvf.com/content/CVPR2023/papers/Kalb_Principles_of_Forgetting_in_Domain-Incremental_Semantic_Segmentation_in_Adverse_Weather_CVPR_2023_paper.pdf) | > Deep neural networks for scene perception in automated vehicles achieve excellent results for the domains they were trained on. However, in real-world conditions, the domain of operation and its underlying data distribution are subject to change. Adverse weather conditions, in particular, can significantly decrease model performance when such data are not available during training. Additionally, w...

---

## 27. Mitigating Mode Collapse by Sidestepping Catastrophic Forgetting

**Authors:** Karttikeya Mangalam, Rohin Garg, Jathushan Rajasegaran, Taesung Park

**Year:** 2021 | **Venue:** ICLR 2021 | **Citations:** N/A | **Score:** 0.000

> Generative Adversarial Networks (GANs) are a class of generative models used for various applications, but they have been known to suffer from the mode collapse problem, in which some modes of the target distribution are ignored by the generator.  Investigative study using a new data generation procedure indicates that the mode collapse of the generator is driven by the discriminator’s inability t...

---

## 28. ON THE USE OF CONVOLUTIONAL AUTO-ENCODER FOR INCREMENTAL CLASSIFIER LEARNING IN CONTEXT AWARE ADVERTISEMENT

**Authors:** Tin Lay Nwe, Shudong Xie, Balaji Nataraj, Yiqun Li, Joo-Hwee Lim

**Year:** 2019 | **Venue:** ICLR 2019 | **Citations:** N/A | **Score:** 0.000

> Context Aware Advertisement (CAA) is a type of advertisement
appearing on websites or mobile apps. The advertisement is targeted
on specific group of users and/or the content displayed on the
websites or apps. This paper focuses on classifying images displayed
on the websites by incremental learning classifier with Deep
Convolutional Neural Network (DCNN) especially for Context Aware
Advertisement...

---

## 29. Scaling Law for Catastrophic Forgetting via Gradient Products

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Catastrophic forgetting occurs when models lose performance on previously learned tasks after acquiring new ones. Although larger models are empirically observed to forget less, the theoretical origin of this effect remains unclear. In this work, we analyze forgetting in simple linear and nonlinear teacher-student models and introduce a gradient-product proxy that closely tracks forgetting. This f...

---

## 30. Challenging Common Assumptions about Catastrophic Forgetting

**Authors:** Timothee LESORT, Oleksiy Ostapenko, Pau Rodriguez, Md Rifat Arefin, Diganta Misra

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

> Standard gradient descent algorithms applied to sequences of tasks are known to induce catastrophic forgetting in deep neural networks. When trained on a new task, the model's parameters are updated in a way that degrades performance on past tasks. 
This article explores continual learning (CL) on long sequences of tasks sampled from a finite environment.
\textbf{We show that in this setting, lear...

---

## 31. Overcoming Catastrophic Forgetting with Hard Attention to the Task

**Authors:** Joan Serra, Didac Suris, Marius Miron, Alexandros Karatzoglou

**Year:** 2018 | **Venue:** ICML 2018 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v80/serra18a/serra18a.pdf) | > Catastrophic forgetting occurs when a neural network loses the information learned in a previous task after training on subsequent tasks. This problem remains a hurdle for artificial intelligence systems with sequential learning capabilities. In this paper, we propose a task-based hard attention mechanism that preserves previous tasks’ information without affecting the current task’s learning. A h...

---

## 32. Continual Learning with Adaptive Weights (CLAW)

**Authors:** Tameem Adel, Han Zhao, Richard E. Turner

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Approaches to continual learning aim to successfully learn a set of related tasks that arrive in an online manner. Recently, several frameworks have been developed which enable deep learning to be deployed in this learning scenario. A key modelling decision is to what extent the architecture should be shared across tasks. On the one hand, separately modelling each task avoids catastrophic forgetti...

---

## 33. Essentials for Class Incremental Learning

**Authors:** Sudhanshu Mittal, Silvio Galesso, Thomas Brox

**Year:** 2021 | **Venue:** ICLR 2021 | **Citations:** N/A | **Score:** 0.000

> Contemporary neural networks are limited in their ability to learn from evolving streams of training data. When trained sequentially on new or evolving tasks, their accuracy drops sharply, making them unsuitable for many real-world applications. In this work, we shed light on the causes of this well known yet unsolved phenomenon - often referred to as catastrophic forgetting - in a class-increment...

---

## 34. Overcoming Catastrophic Forgetting by Bayesian Generative Regularization

**Authors:** Pei-Hung Chen, Wei Wei, Cho-Jui Hsieh, Bo Dai

**Year:** 2021 | **Venue:** ICML 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v139/chen21v/chen21v.pdf) | > In this paper, we propose a new method to over-come catastrophic forgetting by adding generative regularization to Bayesian inference frame-work. Bayesian method provides a general frame-work for continual learning. We could further construct a generative regularization term for all given classification models by leveraging energy-based models and Langevin dynamic sampling to enrich the features l...

---

## 35. Learning to Remember from a Multi-Task Teacher

**Authors:** Yuwen Xiong, Mengye Ren, Raquel Urtasun

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Recent studies on catastrophic forgetting during sequential learning typically focus on fixing the accuracy of the predictions for a previously learned task. In this paper we argue that the outputs of neural networks are subject to rapid changes when learning a new data distribution, and networks that appear to "forget" everything still contain useful representation towards previous tasks. We thus...

---

## 36. Exploring The Forgetting in Adversarial Training: A Novel Method for Enhancing Robustness

**Authors:** Xianglu Wang, Hu Ding

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=fjPOt8QlqQ) | > In recent years, there has been an explosion of research into developing robust deep neural networks against adversarial examples. As one of the most successful methods, Adversarial Training (AT)  has been widely studied before, but there is still a gap to achieve promising
clean and robust accuracy for many practical tasks. In this paper, we consider the AT problem from a new perspective which co...

---

## 37. Overcoming Catastrophic Forgetting for Continual Learning via Model Adaptation

**Authors:** Wenpeng Hu, Zhou Lin, Bing Liu, Chongyang Tao, Zhengwei Tao

**Year:** 2019 | **Venue:** ICLR 2019 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=ryGvcoA5YX) | > Learning multiple tasks sequentially is important for the development of AI and lifelong learning systems. However, standard neural network architectures suffer from catastrophic forgetting which makes it difficult for them to learn a sequence of tasks. Several continual learning methods have been proposed to address the problem. In this paper, we propose a very different approach, called Paramete...

---

## 38. Continual Learning Using Task Conditional Neural Networks

**Authors:** Honglin Li, Frieder Ganz, David J. Sharp, Payam M. Barnaghi

**Year:** 2022 | **Venue:** ICLR 2022 | **Citations:** N/A | **Score:** 0.000

> Conventional deep learning models have limited capacity in learning multiple tasks sequentially. The issue of forgetting the previously learned tasks in continual learning is known as catastrophic forgetting or interference. When the input data or the goal of learning changes, a continual model will learn and adapt to the new status. However, the model will not remember or recognise any revisits t...

---

## 39. Demystifying Catastrophic Forgetting in Two-Stage Incremental Object Detector

**Authors:** Qirui Wu, Shizhou Zhang, De Cheng, Yinghui Xing, Di Xu

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=PFdWf0H4V2) | > Catastrophic forgetting is a critical chanllenge for incremental object detection (IOD). Most existing methods treat the detector monolithically, relying on instance replay or knowledge distillation without analyzing component-specific forgetting. Through dissection of Faster R-CNN, we reveal a key insight: Catastrophic forgetting is predominantly localized to the RoI Head classifier, while regres...

---

## 40. A Fine-Grained Approach to Explaining Catastrophic Forgetting of Interactions in Class-Incremental Learning

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> This paper explains catastrophic forgetting in class incremental learning (CIL) from a novel perspective of interactions (non-linear relationship) between different input variables. Specifically, we make the first attempt to explicitly identify and quantify which interactions w.r.t. previous classes that are forgotten and preserved over incremental steps, and reveal their distinct behaviors, so as...

---

## 41. Reawakening knowledge: Anticipatory recovery from catastrophic interference via structured training

**Authors:** Yanlai Yang, Matt Jones, Michael Curtis Mozer, Mengye Ren

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=YSs1z5udBY) | > We explore the training dynamics of neural networks in a structured non-IID setting where documents are presented cyclically in a fixed, repeated sequence. Typically, networks suffer from catastrophic interference when training on a sequence of documents; however, we discover a curious and remarkable property of LLMs finetuned sequentially in this setting: they exhibit *anticipatory* behavior, rec...

---

## 42. Regularizing Trajectories to Mitigate Catastrophic Forgetting

**Authors:** Paul Michel, Elisabeth Salesky, Graham Neubig

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Regularization-based continual learning approaches generally prevent catastrophic forgetting by augmenting the training loss with an auxiliary objective. However in most practical optimization scenarios with noisy data and/or gradients, it is possible that stochastic gradient descent can inadvertently change critical parameters.
In this paper, we argue for the importance of regularizing optimizati...

---

## 43. Overcoming catastrophic forgetting through weight consolidation and long-term memory

**Authors:** Shixian Wen, Laurent Itti

**Year:** 2019 | **Venue:** ICLR 2019 | **Citations:** N/A | **Score:** 0.000

> Sequential learning of multiple tasks in artificial neural networks using gradient descent leads to catastrophic forgetting, whereby previously learned knowledge is erased during learning of new, disjoint knowledge. Here, we propose a new approach to sequential learning which leverages the recent discovery of adversarial examples. We use adversarial subspaces from previous tasks to enable learning...

---

## 44. Self-Activating Neural Ensembles for Continual Reinforcement Learning

**Authors:** Sam Powers, Abhinav Gupta

**Year:** 2021 | **Venue:** ICLR 2021 | **Citations:** N/A | **Score:** 0.000

> The ability for an agent to continuously learn new skills without catastrophically forgetting existing knowledge is of critical importance for the development of generally intelligent agents. Most methods devised to address this problem depend heavily on well-defined task boundaries which simplify the problem considerably. Our task-agnostic method, Self-Activating Neural Ensembles (SANE), uses a h...

---

## 45. ZeroFlow: Overcoming Catastrophic Forgetting is Easier than You Think

**Authors:** Tao Feng, Wei Li, Didi Zhu, Hangjie Yuan, Wendi Zheng

**Year:** 2025 | **Venue:** ICML 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=iPDw3O6u3T) | > Backpropagation provides a generalized configuration for overcoming catastrophic forgetting. Optimizers such as SGD and Adam are commonly used for weight updates in continual learning and continual pre-training. However, access to gradient information is not always feasible in practice due to black-box APIs, hardware constraints, or non-differentiable systems, a challenge we refer to as the gradie...

---

## 46. Using Hindsight to Anchor Past Knowledge in Continual Learning

**Authors:** Arslan Chaudhry, Albert Gordo, David Lopez-Paz, Puneet K. Dokania, Philip Torr

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> In continual learning, the learner faces a stream of data whose distribution changes over time. Modern neural networks are known to suffer under this setting, as they quickly forget previously acquired knowledge. To address such catastrophic forgetting, state-of-the-art continual learning methods implement different types of experience replay, re-learning on past data stored in a small buffer know...

---

## 47. Unlocking the Power of Function Vectors for Characterizing and Mitigating Catastrophic Forgetting in Continual Instruction Tuning

**Authors:** Gangwei Jiang, Caigao JIANG, Zhaoyi Li, Siqiao Xue, JUN ZHOU

**Year:** 2025 | **Venue:** ICLR 2025 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=gc8QAQfXv6) | > Catastrophic forgetting (CF) poses a significant challenge in machine learning, where a model forgets previously learned information upon learning new tasks. 
Despite the advanced capabilities of Large Language Models (LLMs), they continue to face challenges with CF during continual learning. The majority of existing research focuses on analyzing forgetting patterns through a singular training seq...

---

## 48. Wide Neural Networks Forget Less Catastrophically

**Authors:** Seyed Iman Mirzadeh, Arslan Chaudhry, Dong Yin, Huiyi Hu, Razvan Pascanu

**Year:** 2022 | **Venue:** ICML 2022 | **Citations:** N/A | **Score:** 0.000

[PDF](https://proceedings.mlr.press/v162/mirzadeh22a/mirzadeh22a.pdf) | > A primary focus area in continual learning research is alleviating the "catastrophic forgetting" problem in neural networks by designing new algorithms that are more robust to the distribution shifts. While the recent progress in continual learning literature is encouraging, our understanding of what properties of neural networks contribute to catastrophic forgetting is still limited. To address t...

---

## 49. Compete to Compute

**Authors:** Rupesh K Srivastava, Jonathan Masci, Sohrob Kazerounian, Faustino Gomez, Jürgen Schmidhuber

**Year:** 2013 | **Venue:** NIPS 2013 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2013/file/8f1d43620bc6bb580df6e80b0dc05c48-Paper.pdf) | > Local competition among neighboring neurons is common in biological neural networks (NNs). We apply the concept to gradient-based, backprop-trained artificial multilayer NNs. NNs with competing linear units tend to outperform those with non-competing nonlinear units, and avoid catastrophic forgetting when training sets change over time....

---

## 50. Poisoning Generative Models to Promote Catastrophic Forgetting

**Authors:** Siteng Kang, Zhan Shi, Xinhua Zhang

**Year:** 2023 | **Venue:** ICLR 2023 | **Citations:** N/A | **Score:** 0.000

> Generative models have grown into the workhorse of many state-of-the-art machine learning methods. However, their vulnerability under poisoning attacks has been largely understudied. In this work, we investigate this issue in the context of continual learning, where generative replayers are utilized to tackle catastrophic forgetting. By developing a novel customization of dirty-label input-aware b...

---

## 51. Mitigating Catastrophic Forgetting with Context-aware Continual Pretraining for LLMs

**Authors:** 

**Year:** 2026 | **Venue:** ICLR 2026 | **Citations:** N/A | **Score:** 0.000

> Retraining large language models (LLMs) from scratch to include novel, internal or domain-specific knowledge is prohibitively computationally expensive. Therefore, practitioners rely on continual pretraining to adapt existing pretrained models to new data. As the model's parameters are updated to assimilate new information, it can abruptly lose proficiency on previously learned domains, a phenomen...

---

## 52. Online Limited Memory Neural-Linear Bandits with Likelihood Matching

**Authors:** Ofir Nabati, Tom Zahavy, Shie Mannor

**Year:** 2021 | **Venue:** ICML 2021 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v139/nabati21a/nabati21a.pdf) | > We study neural-linear bandits for solving problems where {\em both} exploration and representation learning play an important role. Neural-linear bandits harnesses the representation power of Deep Neural Networks (DNNs) and combines it with efficient exploration mechanisms by leveraging uncertainty estimation of the model, designed for linear contextual bandits on top of the last hidden layer. In...

---

## 53. Federated Orthogonal Training: Mitigating Global Catastrophic Forgetting in Continual Federated Learning

**Authors:** Yavuz Faruk Bakman, Duygu Nur Yaldiz, Yahya H. Ezzeldin, Salman Avestimehr

**Year:** 2024 | **Venue:** ICLR 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=nAs4LdaP9Y) | > Federated Learning (FL) has gained significant attraction due to its ability to enable privacy-preserving training over decentralized data. Current literature in FL mostly focuses on single-task learning. However, over time, new tasks may appear in the clients and the global model should learn these tasks without forgetting previous tasks. This real-world scenario is known as Continual Federated L...

---

## 54. Investigating and Mitigating Catastrophic Forgetting in Medical Knowledge Injection through Internal Knowledge Augmentation Learning

**Authors:** Yuxuan Zhou, Xien Liu, Xiao Zhang, Chen Ning, Shijin Wang

**Year:** 2025 | **Venue:** NIPS 2025 | **Citations:** N/A | **Score:** 0.000

> Large Language Models (LLMs) are expected to possess comprehensive medical knowledge to support real-world clinical applications. While domain-specific fine-tuning effectively injects medical knowledge into LLMs, it often causes catastrophic forgetting of previously acquired knowledge and instruction-following capabilities. In this paper, we investigate this issue and reveal a pattern of proximity...

---

## 55. DoFIT: Domain-aware Federated Instruction Tuning with Alleviated Catastrophic Forgetting

**Authors:** Binqian Xu, Xiangbo Shu, Haiyang Mei, Zechen Bai, Basura Fernando

**Year:** 2024 | **Venue:** NIPS 2024 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=FDfrPugkGU) | > Federated Instruction Tuning (FIT) advances collaborative training on decentralized data, crucially enhancing model's capability and safeguarding data privacy. However, existing FIT methods are dedicated to handling data heterogeneity across different clients (i.e., client-aware data heterogeneity), while ignoring the variation between data from different domains (i.e., domain-aware data heterogen...

---

## 56. Revisiting Gradient Episodic Memory for Continual Learning

**Authors:** Zhiyi Chen, Tong Lin*

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Gradient Episodic Memory (GEM) is an effective model for continual learning, where each gradient update for the current task is formulated as a quadratic program problem with inequality constraints that alleviate catastrophic forgetting of previous tasks. However, practical use of GEM is impeded by several limitations: (1) the data examples stored in the episodic memory may not be representative o...

---

## 57. Continual Learning via Explicit Structure Learning

**Authors:** Xilai Li, Yingbo Zhou, Tianfu Wu, Richard Socher, Caiming Xiong

**Year:** 2019 | **Venue:** ICLR 2019 | **Citations:** N/A | **Score:** 0.000

> Despite recent advances in deep learning, neural networks suffer catastrophic forgetting when tasks are learned sequentially. We propose a conceptually simple and general framework for continual learning, where structure optimization is considered explicitly during learning. We implement this idea by separating the structure and parameter learning. During structure learning, the model optimizes fo...

---

## 58. Reinforced Continual Learning

**Authors:** Ju Xu, Zhanxing Zhu

**Year:** 2018 | **Venue:** NIPS 2018 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2018/file/cee631121c2ec9232f3a2f028ad5c89b-Paper.pdf) | > Most artificial intelligence models are limited in their ability to solve new tasks faster, without forgetting previously acquired knowledge. The recently emerging paradigm of continual learning aims to solve this issue, in which the model learns various tasks in a sequential fashion. In this work, a novel approach for continual learning is proposed,  which  searches for the best neural architectu...

---

## 59. Lifelong Policy Gradient Learning of Factored Policies for Faster Training Without Forgetting

**Authors:** Jorge Mendez, Boyu Wang, Eric Eaton

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/a58149d355f02887dfbe55ebb2b64ba3-Paper.pdf) | > Policy gradient methods have shown success in learning control policies for high-dimensional dynamical systems. Their biggest downside is the amount of exploration they require before yielding high-performing policies. In a lifelong learning setting, in which an agent is faced with multiple consecutive tasks over its lifetime, reusing information from previously seen tasks can substantially accele...

---

## 60. Calibrating CNNs for Lifelong Learning

**Authors:** Pravendra Singh, Vinay Kumar Verma, Pratik Mazumder, Lawrence Carin, Piyush Rai

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/b3b43aeeacb258365cc69cdaf42a68af-Paper.pdf) | > We present an approach for lifelong/continual learning of convolutional neural networks (CNN) that does not suffer from the problem of catastrophic forgetting when moving from one task to the other. We show that the activation maps generated by the CNN trained on the old task can be calibrated using very few calibration parameters, to become relevant to the new task. Based on this, we calibrate th...

---

## 61. Scalable and Order-robust Continual Learning with Additive Parameter Decomposition

**Authors:** Jaehong Yoon, Saehoon Kim, Eunho Yang, Sung Ju Hwang

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> While recent continual learning methods largely alleviate the catastrophic problem on toy-sized datasets, there are issues that remain to be tackled in order to apply them to real-world problem domains. First, a continual learning model should effectively handle catastrophic forgetting and be efficient to train even with a large number of tasks. Secondly, it needs to tackle the problem of order-se...

---

## 62. Uncertainty-guided Lifelong Learning in Bayesian Networks

**Authors:** Sayna Ebrahimi, Mohamed Elhoseiny, Trevor Darrell, Marcus Rohrbach

**Year:** 2019 | **Venue:** ICLR 2019 | **Citations:** N/A | **Score:** 0.000

> Sequentially learning of tasks arriving in a continuous stream is a complex problem and becomes more challenging when the model has a fixed capacity. Lifelong learning aims at learning new tasks without forgetting  previously learnt ones as well as freeing up capacity for learning future tasks. We argue that identifying the most influential parameters in a representation learned for one task plays...

---

## 63. Experience replay for continual learning

**Authors:** David Rolnick, Arun Ahuja, Jonathan Schwarz, Timothy P. Lillicrap, Greg Wayne

**Year:** 2019 | **Venue:** ICLR 2019 | **Citations:** N/A | **Score:** 0.000

> Continual learning is the problem of learning new tasks or knowledge while protecting old knowledge and ideally generalizing from old experience to learn new tasks faster. Neural networks trained by stochastic gradient descent often degrade on old tasks when trained successively on new tasks with different data distributions. This phenomenon, referred to as catastrophic forgetting, is considered a...

---

## 64. Mitigating Forgetting in Online Continual Learning via Instance-Aware Parameterization

**Authors:** Hung-Jen Chen, An-Chieh Cheng, Da-Cheng Juan, Wei Wei, Min Sun

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/ca4b5656b7e193e6bb9064c672ac8dce-Paper.pdf) | > Online continual learning is a challenging scenario where a model needs to learn from a continuous stream of data without revisiting any previously encountered data instances. The phenomenon of catastrophic forgetting is worsened since the model should not only address the forgetting at the task-level but also at the data instance-level within the same task. To mitigate this, we leverage the conce...

---

## 65. RATT: Recurrent Attention to Transient Tasks for Continual Image Captioning

**Authors:** Riccardo Del Chiaro, Bartłomiej Twardowski, Andrew D. Bagdanov, Joost van de Weijer

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/c2964caac096f26db222cb325aa267cb-Paper.pdf) | > Research on continual learning has led to a variety of approaches to
mitigating catastrophic forgetting in feed-forward classification networks.
Until now surprisingly little attention has been focused on continual learning
of recurrent models applied to problems like image captioning. In this paper
we take a systematic look at continual learning of LSTM-based models for image
captioning. We propo...

---

## 66. Policy Consolidation for Continual Reinforcement Learning

**Authors:** Christos Kaplanis, Murray Shanahan, Claudia Clopath

**Year:** 2019 | **Venue:** ICML 2019 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v97/kaplanis19a/kaplanis19a.pdf) | > We propose a method for tackling catastrophic forgetting in deep reinforcement learning that is...

---

## 67. Continual Learning with Gated Incremental Memories for Sequential Data Processing

**Authors:** Andrea Cossu, Antonio Carta, Davide Bacciu

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> The ability to learn over changing task distributions without forgetting previous knowledge, also known as continual learning, is a key enabler for scalable and trustworthy deployments of adaptive solutions. While the importance of continual learning is largely acknowledged in machine vision and reinforcement learning problems, this is mostly under-documented for sequence processing tasks. This wo...

---

## 68. Variational Continual Learning

**Authors:** Cuong V. Nguyen, Yingzhen Li, Thang D. Bui, Richard E. Turner

**Year:** 2018 | **Venue:** ICLR 2018 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=BkQqq0gRb) | > This paper develops variational continual learning (VCL), a simple but general framework for continual learning that fuses online variational inference (VI) and recent advances in Monte Carlo VI for neural networks. The framework can successfully train both deep discriminative models and deep generative models in complex continual learning settings where existing tasks evolve over time and entirel...

---

## 69. Continual Learning using the SHDL Framework with Skewed Replay Distributions

**Authors:** Amarjot Singh, Jay McClelland

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Human and animals continuously acquire, adapt as well as transfer knowledge throughout their lifespan. The ability to learn continuously is crucial for the effective functioning of agents interacting with the real world and processing continuous streams of information. Continuous learning has been a long-standing challenge for neural networks as the repeated acquisition of information from non-uni...

---

## 70. Continual Reinforcement Learning with Complex Synapses

**Authors:** Christos Kaplanis, Murray Shanahan, Claudia Clopath

**Year:** 2018 | **Venue:** ICML 2018 | **Citations:** N/A | **Score:** 0.000

[PDF](http://proceedings.mlr.press/v80/kaplanis18a/kaplanis18a.pdf) | > Unlike humans, who are capable of continual learning over their lifetimes, artificial neural networks have long been known to suffer from a phenomenon known as catastrophic forgetting, whereby new learning can lead to abrupt erasure of previously acquired knowledge. Whereas in a neural network the parameters are typically modelled as scalar values, an individual synapse in the brain comprises a co...

---

## 71. Uncertainty-guided Continual Learning with Bayesian Neural Networks

**Authors:** Sayna Ebrahimi, Mohamed Elhoseiny, Trevor Darrell, Marcus Rohrbach

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Continual learning aims to learn new tasks without forgetting previously learned ones. This is especially challenging when one cannot access data from previous tasks and when the model has a fixed capacity. Current regularization-based continual learning algorithms  need an external representation and extra computation to measure the parameters' \textit{importance}. In contrast, we propose Uncerta...

---

## 72. Understanding the Role of Training Regimes in Continual Learning

**Authors:** Seyed Iman Mirzadeh, Mehrdad Farajtabar, Razvan Pascanu, Hassan Ghasemzadeh

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/518a38cc9a0173d0b2dc088166981cf8-Paper.pdf) | > Catastrophic forgetting affects the training of neural networks, limiting their ability to learn multiple tasks sequentially. From the perspective of the well established plasticity-stability dilemma, neural networks tend to be overly plastic, lacking the stability necessary to prevent the forgetting of previous knowledge, which means that as learning progresses, networks tend to forget previously...

---

## 73. Deep Generative Dual Memory Network for Continual Learning

**Authors:** Nitin Kamra, Umang Gupta, Yan Liu

**Year:** 2018 | **Venue:** ICLR 2018 | **Citations:** N/A | **Score:** 0.000

> Despite advances in deep learning, artificial neural networks do not learn the same way as humans do. Today, neural networks can learn multiple tasks when trained on them jointly, but cannot maintain performance on learnt tasks when tasks are presented one at a time -- this phenomenon called catastrophic forgetting is a fundamental challenge to overcome before neural networks can learn continually...

---

## 74. Look-ahead Meta Learning for Continual Learning

**Authors:** Gunshi Gupta, Karmesh Yadav, Liam Paull

**Year:** 2020 | **Venue:** NIPS 2020 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2020/file/85b9a5ac91cd629bd3afe396ec07270a-Paper.pdf) | > The continual learning problem involves training models with limited capacity to perform well on a set of an unknown number of sequentially arriving tasks. 
While meta-learning shows great potential for reducing interference between old and new tasks, the current training procedures tend to be either slow or offline, and sensitive to many hyper-parameters. In this work, we propose Look-ahead MAML ...

---

## 75. Continual Deep Learning by Functional Regularisation of Memorable Past

**Authors:** Pingbo Pan, Alexander Immer, Siddharth Swaroop, Runa Eschenhagen, Richard E Turner

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Continually learning new skills without forgetting old ones is an important quality for an intelligent system, yet most deep learning methods suffer from catastrophic forgetting of the past. Recent works have addressed this by regularising the network weights, but it is challenging to identify weights crucial to avoid forgetting. A better approach is to directly regularise the network outputs at p...

---

## 76. Prototype Recalls for Continual Learning

**Authors:** Mengmi Zhang, Tao Wang, Joo Hwee Lim, Jiashi Feng

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Continual learning is a critical ability of continually acquiring and transferring knowledge without catastrophically forgetting previously learned knowledge. However, enabling continual learning for AI remains a long-standing challenge. In this work, we propose a novel method, Prototype Recalls, that efficiently embeds and recalls previously learnt knowledge to tackle catastrophic forgetting issu...

---

## 77. EnsembleNet: A novel architecture for Incremental Learning

**Authors:** Suri Bhasker Sri Harsha, Y Kalidas

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

>  Deep neural networks are used in many state-of-the-art systems for machine perception. Once a network is trained to do a specific task, it cannot be easily trained to do new tasks as it leads to catastrophic forgetting of the previously learned tasks. We propose here a novel architecture called EnsembleNet that accommodates for newer classes of data without having to retrain previously trained su...

---

## 78. Continual learning with hypernetworks

**Authors:** Johannes von Oswald, Christian Henning, Benjamin F. Grewe, João Sacramento

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Artificial neural networks suffer from catastrophic forgetting when they are sequentially trained on multiple tasks. To overcome this problem, we present a novel approach based on task-conditioned hypernetworks, i.e., networks that generate the weights of a target model based on task identity. Continual learning (CL) is less difficult for this class of models thanks to a simple key feature: instea...

---

## 79. Learning with Long-term Remembering: Following the Lead of Mixed Stochastic Gradient

**Authors:** Yunhui Guo, Mingrui Liu, Tianbao Yang, Tajana Rosing

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Current deep neural networks can achieve remarkable performance on a single task. However, when the deep neural network is continually trained on a sequence of tasks, it seems to gradually forget the previous learned knowledge.  This phenomenon is referred to as catastrophic forgetting and motivates the field called lifelong learning.  The central question in lifelong learning is how to enable dee...

---

## 80. Representation Stability as a Regularizer for Improved Text Analytics Transfer Learning

**Authors:** Matthew Riemer, Elham Khabiri, Richard Goodwin

**Year:** 2017 | **Venue:** ICLR 2017 | **Citations:** N/A | **Score:** 0.000

> Although neural networks are well suited for sequential transfer learning tasks, the catastrophic forgetting problem hinders proper integration of prior knowledge. In this work, we propose a solution to this problem by using a multi-task objective based on the idea of distillation and a mechanism that directly penalizes forgetting at the shared representation layer during the knowledge integration...

---

## 81. Overcoming Catastrophic Interference using Conceptor-Aided Backpropagation

**Authors:** Xu He, Herbert Jaeger

**Year:** 2018 | **Venue:** ICLR 2018 | **Citations:** N/A | **Score:** 0.000

[PDF](https://openreview.net/pdf?id=B1al7jg0b) | > Catastrophic interference has been a major roadblock in the research of continual learning. Here we propose a variant of the back-propagation algorithm, "Conceptor-Aided Backprop" (CAB), in which gradients are shielded by conceptors against degradation of previously learned tasks. Conceptors have their origin in reservoir computing, where they have been previously shown to overcome catastrophic fo...

---

## 82. LAMOL: LAnguage MOdeling for Lifelong Language Learning

**Authors:** Fan-Keng Sun*, Cheng-Hao Ho*, Hung-Yi Lee

**Year:** 2020 | **Venue:** ICLR 2020 | **Citations:** N/A | **Score:** 0.000

> Most research on lifelong learning applies to images or games, but not language.
We present LAMOL, a simple yet effective method for lifelong language learning (LLL) based on language modeling.
LAMOL replays pseudo-samples of previous tasks while requiring no extra memory or model capacity.
Specifically, LAMOL is a language model that simultaneously learns to solve the tasks and generate training ...

---

## 83. Low-shot Learning via Covariance-Preserving Adversarial Augmentation Networks

**Authors:** Hang Gao, Zheng Shou, Alireza Zareian, Hanwang Zhang, Shih-Fu Chang

**Year:** 2018 | **Venue:** NIPS 2018 | **Citations:** N/A | **Score:** 0.000

[PDF](https://papers.nips.cc/paper_files/paper/2018/file/81448138f5f163ccdba4acc69819f280-Paper.pdf) | > Deep neural networks suffer from over-fitting and catastrophic forgetting when trained with small data. One natural remedy for this problem is data augmentation, which has been recently shown to be effective. However, previous works either assume that intra-class variances can always be generalized to new classes, or employ naive generation methods to hallucinate finite examples without modeling t...

---

## 84. Randomization Times under Quantum Chaotic Hamiltonian Evolution

**Authors:** Souradeep Ghosh, Nicholas Hunter-Jones, Joaquin F. Rodriguez-Nieva

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25074v1) | > Randomness generation through quantum-chaotic evolution underpins foundational questions in statistical mechanics and applications across quantum information science, including benchmarking, tomography, metrology, and demonstrations of quantum computational advantage. While statistical mechanics successfully captures the temporal averages of local observables, understanding randomness at the level...

---

## 85. Edit3r: Instant 3D Scene Editing from Sparse Unposed Images

**Authors:** Jiageng Liu, Weijie Lyu, Xueting Li, Yejie Guo, Ming-Hsuan Yang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25071v1) | > We present Edit3r, a feed-forward framework that reconstructs and edits 3D scenes in a single pass from unposed, view-inconsistent, instruction-edited images. Unlike prior methods requiring per-scene optimization, Edit3r directly predicts instruction-aligned 3D edits, enabling fast and photorealistic rendering without optimization or pose estimation. A key challenge in training such a model lies i...

---

## 86. Many Minds from One Model: Bayesian Transformers for Population Intelligence

**Authors:** Diji Yang, Yi Zhang

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25063v1) | > Despite their scale and success, modern transformers are almost universally trained as single-minded systems: optimization produces one deterministic set of parameters, representing a single functional hypothesis about the data. Motivated by the idea that intelligence emerge from many minds, we propose Population Bayesian Transformers (B-Trans), which transform a standard Large Language Model into...

---

## 87. Melting curve of correlated iron at Earth's core conditions from machine-learned DFT+DMFT

**Authors:** Rishi Rao, Li Zhu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25061v1) | > Reliable constraints on iron's melting curve at Earth's inner-core boundary require accurate finite-temperature electronic correlations, yet DFT+DMFT calculations remain too costly for large-scale thermodynamic sampling. Here, we develop a machine-learning accelerator for charge self-consistent DFT+DMFT by training E(3)-equivariant graph neural networks to predict the local self-energy and Fermi l...

---

## 88. Reliable and Resilient Collective Communication Library for LLM Training and Serving

**Authors:** Wei Wang, Nengneng Yu, Sixian Xiong, Zaoxing Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25059v1) | > Modern ML training and inference now span tens to tens of thousands of GPUs, where network faults can waste 10--15\% of GPU hours due to slow recovery. Common network errors and link fluctuations trigger timeouts that often terminate entire jobs, forcing expensive checkpoint rollback during training and request reprocessing during inference. We present R$^2$CCL, a fault-tolerant communication libr...

---

## 89. The variety of orthogonal frames

**Authors:** Laura Casabella, Alessio Sammartano

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25058v1) | > An orthogonal n-frame is an ordered set of n pairwise orthogonal vectors. The set of all orthogonal n-frames in a d-dimensional quadratic vector space is an algebraic variety V(d,n). In this paper, we investigate the variety V(d,n) as well as the quadratic ideal I(d,n) generated by the orthogonality relations, which cuts out V(d,n). We classify the irreducible components of V(d,n), give criteria f...

---

## 90. Sequential Bayesian parameter-state estimation in dynamical systems with noisy and incomplete observations via a variational framework

**Authors:** Liliang Wang, Alex Gorodetsky

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25056v1) | > Online joint estimation of unknown parameters and states in a dynamical system with uncertainty quantification is crucial in many applications. For example, digital twins dynamically update their knowledge of model parameters and states to support prediction and decision-making. Reliability and computational speed are vital for DTs. Online parameter-state estimation ensures computational efficienc...

---

## 91. The PDE-ODI principle and cylindrical mean curvature flows

**Authors:** Richard H. Bamler, Yi Lai

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25050v1) | > We introduce a new approach for analyzing ancient solutions and singularities of mean curvature flow that are locally modeled on a cylinder. Its key ingredient is a general mechanism, called the \emph{PDE--ODI principle}, which converts a broad class of parabolic differential equations into systems of ordinary differential inequalities. This principle bypasses many delicate analytic estimates used...

---

## 92. Extreme nonlinear optics in optical fibers

**Authors:** Mario Ferraro, Bertrand Kibler, Pierre Béjot, Frédéric Gérome, Benoit Debord

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25046v1) | > This paper reviews the field of extreme nonlinear optics in optical fibers, highlighting key phenomena and advancements. It discusses multiple ionization effects caused by femtosecond laser pulses that generate plasma and induce permanent material modifications, as well as plasma luminescence and its dependence on material imperfections. The formation and dynamics of plasma filaments, including he...

---

## 93. Bayesian Elastic Net Regression with Structured Prior Dependence

**Authors:** Christopher M. Hans, Ningyi Liu

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25045v1) | > Many regularization priors for Bayesian regression assume the regression coefficients are a priori independent. In particular this is the case for standard Bayesian treatments of the lasso and the elastic net. While independence may be reasonable in some data-analytic settings, incorporating dependence in these prior distributions provides greater modeling flexibility. This paper introduces the or...

---

## 94. Compound Estimation for Binomials

**Authors:** Yan Chen, Lihua Lei

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25042v1) | > Many applications involve estimating the mean of multiple binomial outcomes as a common problem -- assessing intergenerational mobility of census tracts, estimating prevalence of infectious diseases across countries, and measuring click-through rates for different demographic groups. The most standard approach is to report the plain average of each outcome. Despite simplicity, the estimates are no...

---

## 95. On exact Observability for Compactly perturbed infinite dimension system

**Authors:** Nisrine Charaf, Faouzi Triki

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25041v1) | > In this paper, we study the observability of compactly perturbed infinite dimensional systems. Assuming that a given infinite-dimensional system with self-adjoint generator is exactly observable we derive sufficient conditions on a compact self adjoint perturbation to guarantee that the perturbed system stays exactly observable. The analysis is based on a careful asymptotic estimation of the spect...

---

## 96. Towards precision cosmology with Voids x CMB correlations (I): Roman-Agora mock catalogs and pipeline validation

**Authors:** Mar Pérez Sar, Carlos Hernández Monteagudo, András Kovács, Alice Pisani

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25040v1) | > We construct and validate a set of multi-purpose mock galaxy catalogs designed to capture, to different degrees of accuracy, the main characteristics of the Nancy Grace Roman Space Telescope survey. These catalogs provide a foundation for void statistics and various CMB cross-correlation analyses. Our approach differs from traditional halo occupation or abundance matching methods by directly trans...

---

## 97. Universal polar dual pairs of spherical codes found in $E_8$ and $Λ_{24}$

**Authors:** S. V. Borodachov, P. G. Boyvalenkov, P. D. Dragnev, D. P. Hardin, E. B. Saff

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25037v1) | > We identify universal polar dual pairs of spherical codes $C$ and $D$ such that for a large class of potential functions $h$ the minima of the discrete $h$-potential of $C$ on the sphere occur at the points of $D$ and vice versa. Moreover, the minimal values of their normalized potentials are equal. These codes arise from the known sharp codes embedded in the even unimodular extremal lattices $E_8...

---

## 98. Perturbative Kondo destruction and global phase diagram of heavy fermion metals

**Authors:** Yiming Wang, Shouvik Sur, Chia-Chuan Liu, Qimiao Si

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25036v1) | > Strange metals represent a foundational problem in quantum condensed matter physics, and heavy fermion systems provide a canonical setting to advance a general understanding. The concept of a Kondo destruction quantum critical point is widely invoked to describe the competition of the Kondo effect and the local-moment magnetism. Here, we develop a unified field-theoretic approach, analyzing this c...

---

## 99. Generative Classifiers Avoid Shortcut Solutions

**Authors:** Alexander C. Li, Ananya Kumar, Deepak Pathak

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25034v1) | > Discriminative approaches to classification often learn shortcuts that hold in-distribution but fail even under minor distribution shift. This failure mode stems from an overreliance on features that are spuriously correlated with the label. We show that generative classifiers, which use class-conditional generative models, can avoid this issue by modeling all features, both core and spurious, ins...

---

## 100. Multivariate Generalized Counting Process via Gamma Subordination

**Authors:** Manisha Dhillon, Kuldeep Kumar Kataria, Shyan Ghosh

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25030v1) | > In this paper, we study a multivariate gamma subordinator whose components are independent gamma processes subject to a random time governed by an independent negative binomial process. We derive the explicit expressions for its joint Laplace-Stieltjes transform, its probability density function and the associated governing differential equations. Also, we study a time-changed variant of the multi...

---

## 101. Mod $p$ Poincaré duality for $p$-adic period domains

**Authors:** Guillaume Pignon-Ywanne

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25029v1) | > In this article, we introduce a new class of smooth partially proper rigid analytic varieties over a $p$-adic field that satisfy Poincaré duality for étale cohomology with mod $p$-coefficients : the varieties satisfying "primitive comparison with compact support". We show that almost proper varieties, as well as p-adic (weakly admissible) period domains in the sense of Rappoport-Zink belong to thi...

---

## 102. On Nonlinear Inertial Transformations

**Authors:** Nicholas Agia

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25024v1) | > It is often assumed that the most general transformation between two inertial reference frames is affine linear in their Cartesian coordinates, an assumption which is however not true. We provide a complete derivation of the most general inertial frame transformation, which is indeed nonlinear; along the way, we shall find that the conditions of preserving the Law of Inertia take the form of Schwa...

---

## 103. Real Riemann Surfaces: Smooth and Discrete

**Authors:** Johanna Düntsch, Felix Günther

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25022v1) | > This paper develops a discrete theory of real Riemann surfaces based on quadrilateral cellular decompositions (quad-graphs) and a linear discretization of the Cauchy-Riemann equations. We construct a discrete analogue of an antiholomorphic involution and classify the topological types of discrete real Riemann surfaces, recovering the classical results on the number of real ovals and the separation...

---

## 104. Approximation Algorithms for Fair Repetitive Scheduling

**Authors:** Danny Hermelin, Danny Segev, Dvir Shabtay

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25020v1) | > We consider a recently introduced fair repetitive scheduling problem involving a set of clients, each asking for their associated job to be daily scheduled on a single machine across a finite planning horizon. The goal is to determine a job processing permutation for each day, aiming to minimize the maximum total completion time experienced by any client. This problem is known to be NP-hard for qu...

---

## 105. Strengthening Dual Bounds for Multicommodity Capacitated Network Design with Unsplittable Flow Constraints

**Authors:** Lacy M. Greening, Santanu S. Dey, Alan L. Erera

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25018v1) | > Multicommodity capacitated network design (MCND) models can be used to optimize the consolidation of shipments within e-commerce fulfillment networks. In practice, fulfillment networks require that shipments with the same origin and destination follow the same transfer path. This unsplittable flow requirement complicates the MCND problem, requiring integer programming (IP) formulations in which bi...

---

## 106. Convergence of the generalization error for deep gradient flow methods for PDEs

**Authors:** Chenguang Liu, Antonis Papapantoleon, Jasper Rou

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25017v1) | > The aim of this article is to provide a firm mathematical foundation for the application of deep gradient flow methods (DGFMs) for the solution of (high-dimensional) partial differential equations (PDEs). We decompose the generalization error of DGFMs into an approximation and a training error. We first show that the solution of PDEs that satisfy reasonable and verifiable assumptions can be approx...

---

## 107. Diffusion Language Models are Provably Optimal Parallel Samplers

**Authors:** Haozhe Jiang, Nika Haghtalab, Lijie Chen

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25014v1) | > Diffusion language models (DLMs) have emerged as a promising alternative to autoregressive models for faster inference via parallel token generation. We provide a rigorous foundation for this advantage by formalizing a model of parallel sampling and showing that DLMs augmented with polynomial-length chain-of-thought (CoT) can simulate any parallel sampling algorithm using an optimal number of sequ...

---

## 108. The splitting field and generators of the elliptic surface $Y^2=X^3 +t^{360} +1$

**Authors:** Sajad Salami

**Year:** 2025 | **Venue:** arXiv | **Citations:** N/A | **Score:** 0.000

[PDF](https://arxiv.org/pdf/2512.25009v1) | > The splitting field of an elliptic surface $\mathcal{E}/\mathbb{Q}(t)$ is the smallest finite extension $\mathcal{K} \subset \mathbb{C}$ such that all $\mathbb{C}(t)$-rational points are defined over $\mathcal{K}(t)$. In this paper, we provide a symbolic algorithmic approach to determine the splitting field and a set of $68$ linearly independent generators for the Mordell--Weil lattice of Shioda's...

---

