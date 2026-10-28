---
title: "Incremental Learning in Dynamic Networks for Node Classification"
seoTitle: "Incremental node classification in dynamic networks (ENIC 2017)"
date: 2017-09-11
pub: "incremental-learning-dynamic-networks"
description: "Incremental Learning in Dynamic Networks for Node Classification (ENIC 2017): predicting changing node states from messages spreading through a network."
lead: "Node labels in a social network are not fixed: a person's state changes as messages arrive. This early paper treats node classification as an incremental learning problem over a non-stationary network and forecasts the next state of a node from the messages it receives."
---

## In brief

The paper proposes an incremental, active-scheme method for multi-class classification of node states that change over time and depend on information spreading through the network. It is demonstrated on a social network dataset in which messages exchanged between users update the feature vector of each receiver, and the task is to predict the receiver's next state. The authors frame the setting as incremental learning in a non-stationary network environment and report that the approach forecasts future node states effectively on real data.

## Highlights

- **Dynamic labels, not just dynamic edges.** The quantity being predicted is the evolving state of a node, driven by the messages it receives.
- **Incremental by design.** The classifier is updated as new interactions arrive instead of being retrained on the full history.
- **Real social-network data.** The evaluation uses message exchanges between users, with each message updating the receiver's features.

Presented at the European Network Intelligence Conference (ENIC) 2017 and published in *Network Intelligence Meets User Centered Social Media Networks* (Lecture Notes in Social Networks, Springer, 2018). This page summarizes the paper from its published abstract. The incremental idea was later carried into representation learning in [FILDNE](/publications/fildne/).
