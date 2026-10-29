---
title: "AI-Tax"
seoTitle: "AI-Tax · Polish tax & legal AI platform · Kamil Tagowski"
papers: ["fsdbench", "bridging-ai-and-law"]
date: 2025-01-01
draft: false
logo: "img/logos/ai-tax.svg"
year: 2025
yearEnd: 2027
fields: ["Legal AI", "Agentic AI", "NLP", "Graph ML", "Applications"]
role: "Research Coordinator & AI Engineer"
status: "Live"
links:
  site: "https://ai4tax.pl"
impact: 90
featured: true
summary: "A Polish tax & legal AI platform built at Wrocław Tech: AI search, chat with citations, and agentic extraction over tax interpretations and court judgments."
study: "ai-tax"
---

AI-Tax is a production platform for Polish **tax law** and the legal documents around it, built at Wrocław University of Science and Technology under a three-year research grant (2024–2027) co-financed by the European Union under the **FENG** programme (European Funds for Smart Economy 2021–2027). It runs on two tracks at once: a SaaS product used by tax and legal professionals, and applied research on legal NLP.

## What it does

It turns millions of Polish tax interpretations and court judgments into answers: semantic search, conversational chat with citations, and structured extraction. The agentic layer, built on LangGraph, generates and refines extraction schemas through a multi-agent workflow with human-in-the-loop feedback.

## Scale and research evidence

The platform paper reports **3M+ documents and 300M+ semantic vectors**. These are measures of corpus and infrastructure scale, rather than evidence of answer quality or model accuracy.

- [FSDBench](/publications/fsdbench/) evaluates conversational fact elicitation in Polish tax law. Even the best tested model recovered under half the facts on hard cases after 50 turns, identifying a concrete limitation and research opportunity.
- [Bridging AI and Law](/publications/bridging-ai-and-law/) describes the large-scale multi-agent platform and its approach to quantitative legal analytics.

AI-Tax is institutional research and engineering work at Wrocław University of Science and Technology. My responsibilities below describe my contribution to that collaborative project.

## My contribution

As Research Coordinator & AI Engineer, I'm one of the lead authors on AI-Tax.

- **Research management.** Planned the research and led a team of PhD and graduate students from idea to paper and release.
- **Platform engineering.** Co-built the platform end to end, from document ingestion to the web app and its agentic search and extraction.
- **Releases and evaluation.** Ran the app's releases and set up evaluation with tax experts.
