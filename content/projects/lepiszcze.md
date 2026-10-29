---
title: "LEPISZCZE"
description: "LEPISZCZE: evaluation infrastructure and a public leaderboard for Polish NLP. The NeurIPS 2022 paper reports 13 task-dataset pairs in its first run."
seoTitle: "LEPISZCZE · Polish NLP benchmark (NeurIPS 2022) · project"
papers: ["lepiszcze"]
date: 2022-01-01
draft: false
logo: "img/logos/clarin-pl.png"
year: 2022
fields: ["NLP", "Benchmarks", "Datasets"]
role: "Co-author & Benchmark Engineer"
context: "Collaborative benchmark research"
venue: "NeurIPS 2022"
status: "Published"
impact: 95
featured: true
summary: "Evaluation infrastructure for Polish NLP, with versioned datasets, experiment tracking, and a public leaderboard."
tech: ["Python", "PyTorch", "NLP", "Transformers", "Benchmarking", "Named Entity Recognition", "Sentiment Analysis", "Sequence Labeling"]
hero: ""
links:
  paper: "https://proceedings.neurips.cc/paper_files/paper/2022/file/890b206ebb79e550f3988cb8db936f42-Paper-Datasets_and_Benchmarks.pdf"
  site: "https://lepiszcze.clarin-pl.eu/"
  dataset: "https://lepiszcze.clarin-pl.eu/datasets/"
study: "lepiszcze"
---

LEPISZCZE is an NLP benchmark for Polish, published at NeurIPS 2022 (Datasets & Benchmarks track). The published first run evaluated five language models on **13 task-dataset pairs**. This counts experiments pairing a task with a dataset, rather than distinct task types.

## What it is

The benchmark integrates publicly available Polish datasets into a single evaluation framework with a public leaderboard. It covers diverse task types:

- Classification tasks (sentiment analysis, abusive clause detection)
- Sequence labeling (NER, POS tagging, political advertising detection)
- Pair classification (textual entailment, question answering, text summarization)
- Extractive question answering (SQuAD 2.0 style on Polish Wikipedia and NKJP)

The repository provides reproducible experiment configurations, hyperparameter search setups, and baseline results logged on Weights & Biases.

## My role

- **Built the benchmark repository** and wrote most of the dataset cards.
- The benchmark runs on [CLARIN-PL Embeddings](/projects/embeddings/), the library I led.

The work involved coordinating across 11 collaborators to establish unified evaluation protocols and baseline results.
