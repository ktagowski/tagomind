---
title: "CLARIN-PL Embeddings"
date: 2022-01-01
draft: false
logo: "img/logos/clarin-pl.png"
year: 2022
fields: ["NLP", "Benchmarks"]
role: "Lead Engineer and Coordinator"
status: "Library"
impact: 80
featured: false
summary: "Transformer-based NLP library for text classification, sequence labeling, and embeddings in Polish."
tech: ["Transformers", "PyTorch Lightning", "Hugging Face", "ONNX", "Flair"]
links:
  repo: "https://github.com/CLARIN-PL/embeddings"
  paper: "https://proceedings.neurips.cc/paper_files/paper/2022/file/890b206ebb79e550f3988cb8db936f42-Paper-Datasets_and_Benchmarks.pdf"
  dataset: "https://github.com/CLARIN-PL/LEPISZCZE"
---

A Python library for transformer-based text processing and embeddings in Polish, built as the core component of the NeurIPS 2022 LEPISZCZE benchmark. It abstracts away model configuration and training boilerplate through composable pipelines.

## What it is

CLARIN-PL Embeddings wraps Hugging Face Transformers and PyTorch Lightning into composable pipelines for transformer-based NLP tasks. It offers pre-built pipelines for text classification and sequence labeling (NER, POS tagging, punctuation restoration) alongside Flair-based static embeddings. The library ships with optimized hyperparameter search pipelines and integrates Polish-specific models like HerBERT. Compatible with 10+ Polish datasets curated by CLARIN-PL, from sentiment analysis to question answering.

## Highlights

- Text classification and sequence labeling pipelines using PyTorch Lightning
- Hyperparameter search integration for finding optimal models per task
- Pre-configured Polish datasets: PolEmo2, KPWR-NER, NKJP-POS, and more
- Static and transformer embeddings with Flair backend support
- Published in NeurIPS 2022 as part of the LEPISZCZE benchmark paper
