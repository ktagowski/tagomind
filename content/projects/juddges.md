---
title: "JuDDGES"
date: 2024-01-01
draft: false
logo: "img/logos/juddges.svg"
year: 2025
yearEnd: 2026
fields: ["NLP", "Legal AI", "Datasets"]
role: "Consultant"
status: "Active"
impact: 88
featured: true
summary: "EU-funded platform for NLP analysis of judicial decisions across Poland and England & Wales."
tech: ["Python", "NLP", "Machine Learning", "DVC", "Hydra", "LLM-as-judge", "Active Learning"]
links:
  repo: "https://github.com/pwr-ai/JuDDGES"
  site: "https://pwr-ai.github.io/JuDDGES/"
---

JuDDGES (Judicial Decision Data Gathering, Encoding, and Sharing) is an EU-funded collaborative platform that makes judicial decisions analyzable across different legal systems for empirical legal research. The project analyzes criminal court records from Poland and England & Wales, using NLP and human-in-the-loop techniques to extract structured data across jurisdictions.

## What it is

The platform removes the usual obstacles to cross-jurisdiction legal research: language, inconsistent formats, and limited resources. Core capabilities include:

- **Data harmonization**: Standardized encoding of criminal court records across jurisdictions
- **Information extraction**: LLM-based and fine-tuned model pipelines to extract facts, sentencing info, and judicial reasoning from raw judgments
- **Evaluation framework**: Both traditional n-gram metrics and LLM-as-judge evaluation for extraction quality
- **Active learning annotation tool**: Human-in-the-loop systems to iteratively improve models with expert feedback

## Key elements

The work spans four coordinated packages: data gathering and human coding (WP2), NLP and machine learning methodology (WP3 led by Wrocław University and Middlesex University), open science practices (WP4), and project coordination. The codebase is built on Python 3.11 with DVC for reproducible pipelines and Hydra for configuration management, enabling researchers to run inference, fine-tune models on legal text, and evaluate extraction quality.

