---
title: "FILDNE"
date: 2022-01-01
pub: "fildne"
description: "One-page summary of FILDNE (Knowledge-Based Systems, 2022): incremental learning of dynamic network embeddings that reuses any static embedding method."
lead: "Retraining a graph embedding from scratch every time the graph changes is slow and wasteful. FILDNE turns any static embedding method into an incremental one by aligning and convexly combining per-snapshot embeddings, cutting memory up to 6x and compute up to 50x."
---

## Abstract

Representation learning on graphs has emerged as a powerful mechanism to automate feature vector generation for downstream machine learning tasks. The advances in representation on graphs have centered on both homogeneous and heterogeneous graphs, where the latter presenting the challenges associated with multi-typed nodes and/or edges. In this paper, we consider the additional challenge of evolving graphs. We ask the question of whether the advances in representation learning for static graphs can be leveraged for dynamic graphs and how? It is important to be able to incorporate those advances to maximize the utility and generalization of methods. To that end, we propose the Framework for Incremental Learning of Dynamic Networks Embedding (FILDNE), which can utilize any existing static representation learning method for learning node embeddings while keeping the computational costs low. FILDNE integrates the feature vectors computed using the standard methods over different timesteps into a single representation by developing a convex combination function and alignment mechanism. Experimental results on several downstream tasks, over seven real-world data sets, show that FILDNE is able to reduce memory (up to 6x) and computational time (up to 50x) costs while providing competitive quality measure gains (e.g., improvements up to 19 pp AUC on link prediction and up to 33 pp mAP on graph reconstruction) with respect to the contemporary methods for representation learning on dynamic graphs.

## Highlights

- **Reuse static methods.** Any static node embedding method becomes the building block of a dynamic one, so advances on static graphs transfer directly.
- **Alignment plus convex combination.** Per-timestep embeddings are aligned and merged into a single representation with a learned convex combination, instead of retraining on the full history.
- **Cheaper and competitive.** Up to 6x less memory and 50x less compute than contemporary dynamic-graph methods on seven real-world datasets, with gains of up to 19 pp AUC on link prediction and 33 pp mAP on graph reconstruction.

Published in Knowledge-Based Systems, volume 236 (2022), with Nitesh V. Chawla of the University of Notre Dame.
