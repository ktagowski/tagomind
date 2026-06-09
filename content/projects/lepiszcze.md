---
title: "LEPISZCZE"
date: 2022-01-01
draft: false
logo: "img/logos/clarin-pl.png"
year: 2022
fields: ["NLP", "Benchmarks", "Datasets"]
role: "Co-author"
venue: "NeurIPS 2022"
status: "Published"
impact: 95
featured: true
summary: "A 14-task NLP benchmark for Polish with unified evaluation infrastructure and public leaderboard."
tech: ["Python", "PyTorch", "NLP", "Transformers", "Benchmarking", "Named Entity Recognition", "Sentiment Analysis", "Sequence Labeling"]
hero: ""
links:
  paper: "https://proceedings.neurips.cc/paper_files/paper/2022/file/890b206ebb79e550f3988cb8db936f42-Paper-Datasets_and_Benchmarks.pdf"
  site: "https://lepiszcze.clarin-pl.eu/"
  dataset: "https://lepiszcze.clarin-pl.eu/datasets/"
---

LEPISZCZE is an NLP benchmark for Polish, published at NeurIPS 2022 (Datasets & Benchmarks track). The benchmark unifies evaluation across 14 distinct NLP tasks spanning sentiment analysis, named entity recognition, part-of-speech tagging, sequence labeling, and question answering.

## What it is

The benchmark integrates publicly available Polish datasets into a single evaluation framework with a public leaderboard. It covers diverse task types:

- Classification tasks (sentiment analysis, abusive clause detection)
- Sequence labeling (NER, POS tagging, political advertising detection)
- Pair classification (textual entailment, question answering, text summarization)
- Extractive question answering (SQuAD 2.0 style on Polish Wikipedia and NKJP)

The repository provides reproducible experiment configurations, hyperparameter search setups, and baseline results logged on Weights & Biases.

## My role

Co-authored the benchmark design and implementation, contributing to the curation and standardization of task definitions and dataset integration. The work involved coordinating across 11 collaborators to establish unified evaluation protocols and baseline results across all 14 tasks.

