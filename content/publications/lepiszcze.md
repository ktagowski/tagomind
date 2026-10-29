---
title: "LEPISZCZE"
seoTitle: "LEPISZCZE: a comprehensive Polish NLP benchmark (NeurIPS 2022)"
project: "lepiszcze"
date: 2022-11-28
pub: "lepiszcze"
description: "One-page summary of LEPISZCZE (NeurIPS 2022 Datasets and Benchmarks): a comprehensive, reproducible NLP benchmark for Polish with a public leaderboard."
lead: "Polish had a GLUE-style benchmark, but not one broad or reproducible enough to measure real progress. LEPISZCZE adds thirteen task-dataset pairs, eight of them new, with versioned data and tracked models, and documents the lessons as a blueprint for other low-resource languages."
hook: "A broad, reproducible NLP benchmark for Polish, and a blueprint for other low-resource languages."
problem: "Progress in Polish NLP requires evaluation across varied tasks with reproducible data and model comparisons."
finding: "The first benchmark run compared five Polish language models across 13 task-dataset pairs, including eight newly released datasets. Data versioning and model tracking support reproducible extensions, and the paper records lessons for other low-resource languages."
---

## Abstract

The availability of compute and data to train larger and larger language models increases the demand for robust methods of benchmarking the true progress of LM training. Recent years witnessed significant progress in standardized benchmarking for English. Benchmarks such as GLUE, SuperGLUE, or KILT have become de facto standard tools to compare large language models. Following the trend to replicate GLUE for other languages, the KLEJ benchmark has been released for Polish. In this paper, we evaluate the progress in benchmarking for low-resourced languages. We note that only a handful of languages have such comprehensive benchmarks. We also note the gap in the number of tasks being evaluated by benchmarks for resource-rich English/Chinese and the rest of the world. In this paper, we introduce LEPISZCZE (the Polish word for glew, the Middle English predecessor of glue), a new, comprehensive benchmark for Polish NLP with a large variety of tasks and high-quality operationalization of the benchmark. We design LEPISZCZE with flexibility in mind. Including new models, datasets, and tasks is as simple as possible while still offering data versioning and model tracking. In the first run of the benchmark, we test 13 experiments (task and dataset pairs) based on the five most recent LMs for Polish. We use five datasets from the Polish benchmark and add eight novel datasets. As the paper's main contribution, apart from LEPISZCZE, we provide insights and experiences learned while creating the benchmark for Polish as the blueprint to design similar benchmarks for other low-resourced languages.

## Highlights

- **Breadth.** Thirteen task-dataset pairs in the first run, covering classification, sequence labeling, and more, with eight datasets released for the first time.
- **Reproducible by design.** Data versioning and model tracking are built in, so adding a model, dataset, or task is a small change rather than a new project.
- **Public leaderboard.** Results for the five most recent Polish language models are published on an open leaderboard, with pre-computed embeddings available on Hugging Face.
- **A blueprint.** The paper records what worked and what did not while building the benchmark, aimed at teams doing the same for other low-resource languages.

## My contribution

I built the benchmark repository and led the library behind it; see the [project page](/projects/lepiszcze/).

Published in the NeurIPS 2022 Datasets and Benchmarks track. See the [LEPISZCZE project page](/projects/lepiszcze/) for the benchmark infrastructure and the [CLARIN-PL Embeddings](/projects/embeddings/) library that powers it.
