---
title: "Embedding Alignment Methods in Dynamic Networks"
date: 2021-06-16
pub: "embedding-alignment-dynamic-networks"
description: "One-page summary of Embedding Alignment Methods in Dynamic Networks (ICCS 2021): nine alignment techniques for snapshot embeddings, evaluated on link prediction and graph reconstruction."
lead: "When a dynamic graph is embedded snapshot by snapshot, the embeddings of consecutive windows live in different coordinate systems. This paper compares nine ways to align them and shows that alignment alone lifts downstream performance by up to 11 percentage points."
---

## Abstract

In recent years, dynamic graph embedding has attracted a lot of attention due to its usefulness in real-world scenarios. In this paper, we consider discrete-time dynamic graph representation learning, where embeddings are computed for each time window, and then are aggregated to represent the dynamics of a graph. However, independently computed embeddings in consecutive windows suffer from the stochastic nature of representation learning algorithms and are algebraically incomparable. We underline the need for embedding alignment process and provide nine alignment techniques evaluated on real-world datasets in link prediction and graph reconstruction tasks. Our experiments show that alignment of Node2vec embeddings improves the performance of downstream tasks up to 11 pp compared to the not aligned scenario.

## Highlights

- **The problem made explicit.** Independently trained snapshot embeddings are algebraically incomparable because of the randomness in the training algorithms, so aggregating them without alignment mixes incompatible spaces.
- **Nine alignment techniques compared** on real-world datasets, using link prediction and graph reconstruction as downstream tasks.
- **Alignment pays off.** Aligning Node2vec embeddings improves downstream performance by up to 11 percentage points over the unaligned baseline.

Published at the International Conference on Computational Science (ICCS) 2021. This study motivated FILDNE and RAFEN, which build the alignment step into the embedding framework itself.
