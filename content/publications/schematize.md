---
title: "Schematize"
seoTitle: "Schematize: agentic schema generation, EMNLP 2026 demo"
project: "juddges"
date: 2026-10-01
pub: "schematize"
description: "Schematize (EMNLP 2026 System Demonstrations): an agentic system that turns a legal research question into a validated information-extraction schema."
lead: "Empirical legal research starts with a schema: which fields to pull out of thousands of rulings. Schematize makes an LLM agent team design, criticize, and ground that schema against real documents, with the legal expert in the loop, before any large-scale extraction begins."
---

## Abstract

Empirical legal research often relies on turning research questions into structured data extracted from large collections of rulings and judgments. Designing the extraction schema and then extracting the data remain a manual, expertise-heavy bottleneck. We present schematize, an open-source multi-agent system that interactively turns a researcher's problem statement into a validated extraction schema that can later be used for autonomous extraction. Schematize couples (i) a clarification dialogue that elicits implicit expert intent, (ii) iterative schema generation, (iii) data-grounded refinement that tests the schema against documents, and (iv) chat-based post-editing. We evaluated the system with human legal professionals, introducing our novel methodology, and schematize achieves top performance in most of tested configurations. While the system is designed to be domain-agnostic and applicable to any document collection, we tailor and evaluate it on legal research problems. We release schematize as a pip-installable Python package with full documentation.

## How it works

1. **Problem definition.** A problem-definition-helper agent interviews the researcher, and a definer agent turns the request and answers into a formal problem statement.
2. **Query generation and first draft.** The system writes retrieval queries and drafts an initial JSON schema.
3. **Criteria-based refinement.** A critic agent scores the schema against document-blind quality criteria, and a refiner applies the fixes.
4. **Data-grounded refinement.** Real rulings are retrieved with the generated queries, and the schema is tested on them to catch fields that cannot be populated.
5. **Summary and chat.** The expert gets an explanation of how the schema was derived and can request further edits in a chat.

## Highlights

- **A new way to evaluate schemas.** Instead of comparing against a single reference schema, legal experts wrote exhaustive question sets for each research problem, and an LLM-as-judge scored how many questions a schema can answer. This limits hindsight bias and is repeatable across system versions.
- **Top coverage on most backbones.** Across seven open- and closed-weight models, Schematize obtains the best or second-best expert-question coverage, and on four of seven backbones it surpasses the average coverage between the experts themselves.
- **Model-agnostic and pluggable.** Any agent can run on an open- or closed-weight model, document sources are connectors, and the same schema drives a built-in extractor.
- **Released as a library.** `pip install schematize`, MIT licensed, with documentation and the judgment dataset used in the study on Hugging Face.

Presented at the EMNLP 2026 System Demonstrations track in Budapest. The poster and the two-minute demo video replay one real run end to end: idea, interview, problem definition, retrieval, draft schema, both refinement loops, chat edit, and extraction from one real ruling.
