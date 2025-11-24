/*
  # Seed Initial Data for Paper Circle

  ## Overview
  Adds sample data to demonstrate platform features:
  - Research topics and areas
  - Sample papers with metadata
  - Example sessions
  - Paper lineage connections

  ## Data Added
  1. Topics: Machine Learning areas (Vision, NLP, RL)
  2. Papers: 6 sample papers across different areas
  3. Paper-Topic associations
  4. Sessions: 2 upcoming reading group sessions
  5. Edges: Sample lineage connections between papers
*/

-- Insert sample topics
INSERT INTO topics (id, name, level, description, color) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Computer Vision', 'area', 'Research in image and video understanding', '#3b82f6'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Natural Language Processing', 'area', 'Research in language understanding and generation', '#10b981'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Reinforcement Learning', 'area', 'Research in learning from interaction', '#8b5cf6'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Vision Transformers', 'sub_area', 'Transformer architectures for vision tasks', '#60a5fa'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Large Language Models', 'sub_area', 'Large-scale language models', '#34d399'),
  ('550e8400-e29b-41d4-a716-446655440006', 'Multi-Agent Systems', 'sub_area', 'Multi-agent reinforcement learning', '#a78bfa')
ON CONFLICT (id) DO NOTHING;

-- Update sub-areas to have parent areas
UPDATE topics SET parent_id = '550e8400-e29b-41d4-a716-446655440001' WHERE id = '550e8400-e29b-41d4-a716-446655440004';
UPDATE topics SET parent_id = '550e8400-e29b-41d4-a716-446655440002' WHERE id = '550e8400-e29b-41d4-a716-446655440005';
UPDATE topics SET parent_id = '550e8400-e29b-41d4-a716-446655440003' WHERE id = '550e8400-e29b-41d4-a716-446655440006';

-- Insert sample papers
INSERT INTO papers (id, arxiv_id, title, authors, abstract, venue, year, citation_count, metadata) VALUES
  (
    '650e8400-e29b-41d4-a716-446655440001',
    '2010.11929',
    'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale',
    '["Alexey Dosovitskiy", "Lucas Beyer", "Alexander Kolesnikov", "Dirk Weissenborn"]'::jsonb,
    'While the Transformer architecture has become the de-facto standard for natural language processing tasks, its applications to computer vision remain limited. In vision, attention is either applied in conjunction with convolutional networks, or used to replace certain components of convolutional networks while keeping their overall structure in place. We show that this reliance on CNNs is not necessary and a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks.',
    'ICLR',
    2021,
    12450,
    '{"methods": ["Vision Transformer", "Self-Attention"], "datasets": ["ImageNet"]}'::jsonb
  ),
  (
    '650e8400-e29b-41d4-a716-446655440002',
    '2103.14030',
    'Swin Transformer: Hierarchical Vision Transformer using Shifted Windows',
    '["Ze Liu", "Yutong Lin", "Yue Cao", "Han Hu"]'::jsonb,
    'This paper presents a new vision Transformer, called Swin Transformer, that capably serves as a general-purpose backbone for computer vision. Challenges in adapting Transformer from language to vision arise from differences between the two domains, such as large variations in the scale of visual entities and the high resolution of pixels in images compared to words in text.',
    'ICCV',
    2021,
    8920,
    '{"methods": ["Swin Transformer", "Shifted Windows"], "datasets": ["ImageNet", "COCO"]}'::jsonb
  ),
  (
    '650e8400-e29b-41d4-a716-446655440003',
    '2005.14165',
    'Language Models are Few-Shot Learners',
    '["Tom Brown", "Benjamin Mann", "Nick Ryder", "Melanie Subbiah"]'::jsonb,
    'Recent work has demonstrated substantial gains on many NLP tasks and benchmarks by pre-training on a large corpus of text followed by fine-tuning on a specific task. While typically task-agnostic in architecture, this method still requires task-specific fine-tuning datasets of thousands or tens of thousands of examples. We show that scaling up language models greatly improves task-agnostic, few-shot performance.',
    'NeurIPS',
    2020,
    15780,
    '{"methods": ["GPT-3", "In-context Learning"], "datasets": ["WebText"]}'::jsonb
  ),
  (
    '650e8400-e29b-41d4-a716-446655440004',
    '1706.03762',
    'Attention is All You Need',
    '["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit"]'::jsonb,
    'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
    'NeurIPS',
    2017,
    68920,
    '{"methods": ["Transformer", "Multi-Head Attention"], "datasets": ["WMT"]}'::jsonb
  ),
  (
    '650e8400-e29b-41d4-a716-446655440005',
    '2204.02311',
    'PaLM: Scaling Language Modeling with Pathways',
    '["Aakanksha Chowdhery", "Sharan Narang", "Jacob Devlin", "Maarten Bosma"]'::jsonb,
    'Large language models have been shown to achieve remarkable performance across a variety of natural language tasks using few-shot learning, which drastically reduces the number of task-specific training examples needed to adapt the model to a particular application. We introduce PaLM, a 540-billion parameter, densely activated, Transformer language model.',
    'arXiv',
    2022,
    2340,
    '{"methods": ["PaLM", "Pathways"], "datasets": ["C4", "WebText"]}'::jsonb
  ),
  (
    '650e8400-e29b-41d4-a716-446655440006',
    '2112.09332',
    'Masked Autoencoders Are Scalable Vision Learners',
    '["Kaiming He", "Xinlei Chen", "Saining Xie", "Yanghao Li"]'::jsonb,
    'This paper shows that masked autoencoders (MAE) are scalable self-supervised learners for computer vision. Our MAE approach is simple: we mask random patches of the input image and reconstruct the missing pixels. It is based on two core designs: an asymmetric encoder-decoder architecture, and masking a high proportion of the input image.',
    'CVPR',
    2022,
    3850,
    '{"methods": ["Masked Autoencoder", "Self-Supervised Learning"], "datasets": ["ImageNet"]}'::jsonb
  )
ON CONFLICT (id) DO NOTHING;

-- Associate papers with topics
INSERT INTO paper_topics (paper_id, topic_id, relevance_score) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 1.0),
  ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', 1.0),
  ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 1.0),
  ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 1.0),
  ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 1.0),
  ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', 1.0),
  ('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 1.0),
  ('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 1.0),
  ('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 1.0),
  ('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440001', 1.0)
ON CONFLICT (paper_id, topic_id) DO NOTHING;

-- Insert sample edges (paper lineage)
INSERT INTO edges (source_paper_id, target_paper_id, edge_type, similarity_score, rationale, is_ai_generated) VALUES
  (
    '650e8400-e29b-41d4-a716-446655440004',
    '650e8400-e29b-41d4-a716-446655440001',
    'extends',
    0.82,
    'Vision Transformer extends the original Transformer architecture from Attention is All You Need to computer vision tasks, adapting the self-attention mechanism for image classification.',
    true
  ),
  (
    '650e8400-e29b-41d4-a716-446655440001',
    '650e8400-e29b-41d4-a716-446655440002',
    'extends',
    0.75,
    'Swin Transformer builds upon Vision Transformer by introducing hierarchical feature maps and shifted windows for more efficient computation on high-resolution images.',
    true
  ),
  (
    '650e8400-e29b-41d4-a716-446655440004',
    '650e8400-e29b-41d4-a716-446655440003',
    'extends',
    0.68,
    'GPT-3 scales the Transformer architecture to 175 billion parameters, demonstrating that scale enables few-shot learning capabilities.',
    true
  ),
  (
    '650e8400-e29b-41d4-a716-446655440003',
    '650e8400-e29b-41d4-a716-446655440005',
    'extends',
    0.72,
    'PaLM further scales language models to 540 billion parameters using the Pathways system, achieving state-of-the-art results on numerous benchmarks.',
    true
  ),
  (
    '650e8400-e29b-41d4-a716-446655440001',
    '650e8400-e29b-41d4-a716-446655440006',
    'evaluates',
    0.65,
    'MAE explores self-supervised learning for Vision Transformers, comparing different pretraining strategies for the ViT architecture.',
    true
  )
ON CONFLICT (source_paper_id, target_paper_id, edge_type) DO NOTHING;