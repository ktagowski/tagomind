---
title: "RAFEN"
seoTitle: "RAFEN: aligned node embeddings for dynamic graphs (ICCS 2023)"
date: 2023-07-01
pub: "rafen"
description: "RAFEN (ICCS 2023): a regularized alignment framework that learns comparable node embeddings across snapshots of a dynamic graph during training."
lead: "Node embeddings of a changing graph drift between snapshots, so they are usually aligned after the fact. RAFEN moves alignment into the training objective, which makes any embedding method produce comparable vectors across time without a post-processing step."
hook: "Graph embeddings that stay comparable over time, aligned during training instead of after it."
---

## Abstract

Learning representations of nodes has been a crucial area of the graph machine learning research area. A well-defined node embedding model should reflect both node features and the graph structure in the final embedding. In the case of dynamic graphs, this problem becomes even more complex as both features and structure may change over time. The embeddings of particular nodes should remain comparable during the evolution of the graph, what can be achieved by applying an alignment procedure. This step was often applied in existing works after the node embedding was already computed. In this paper, we introduce a framework, RAFEN, that allows to enrich any existing node embedding method using the aforementioned alignment term and learning aligned node embedding during training time. We propose several variants of our framework and demonstrate its performance on six real-world datasets. RAFEN achieves on-par or better performance than existing approaches without requiring additional processing steps.

## Highlights

- **Alignment as a regularizer.** The alignment term is added to the loss of an existing embedding method, so the embeddings come out comparable across snapshots as a by-product of training.
- **Method-agnostic.** The framework wraps any node embedding method rather than replacing it, and several variants of the regularizer are proposed.
- **Evaluated on six real-world datasets.** RAFEN matches or beats post-hoc alignment while removing the extra processing step.

## My contribution

First author. Wrote the released code.

Published at the International Conference on Computational Science (ICCS) 2023. A follow-up to the [embedding alignment study](/publications/embedding-alignment-dynamic-networks/) and to [FILDNE](/publications/fildne/).
