---
title: "FSDBench"
date: 2026-07-01
pub: "fsdbench"
description: "One-page summary of the Factual State Discovery Benchmark (ACL 2026 SRW): can a language model elicit all relevant facts from a taxpayer through dialogue?"
lead: "A tax authority cannot rule until it knows the whole situation. FSDBench measures whether a language model can discover those facts by asking questions, and shows that even strong models leave half of the hard cases uncovered after fifty turns."
---

## Abstract

Before a tax authority can issue a ruling, it must receive a complete description of the taxpayer's situation, yet no benchmark measures whether language models can systematically elicit all relevant facts through dialogue. We introduce FSDBench (Factual State Discovery Benchmark), in which a discovery agent questions a simulated taxpayer grounded in a real tax document. The dataset comprises 500 narratives from official Polish tax interpretations, decomposed into 32,874 atomic facts with validated supported precision (97.6%), atomicity (93.8%), and sentence coverage (96.0%). Experiments with four models show that even the best system recovers only 77% of facts on easy samples and under 49% on hard samples after 50 turns. These findings establish conversational fact elicitation as a challenging open problem requiring retrieval-augmented and adaptive questioning strategies.

## Highlights

- **Discovery through dialogue.** The benchmark pairs a discovery agent with a simulated taxpayer that only knows what its source document says, so the agent has to ask the right questions rather than read the answer.
- **Grounded in real tax law.** Every narrative comes from an official Polish individual tax interpretation, decomposed into atomic facts with validated precision, atomicity, and coverage.
- **A large gap to close.** The best of four tested models recovers 77% of facts on easy cases and under 49% on hard ones after 50 turns, which makes fact elicitation an open problem rather than a solved subtask.
- **Direction for future work.** The results point to retrieval-augmented and adaptive questioning strategies as the next step for conversational tax and legal assistants.

Published in the ACL 2026 Student Research Workshop in San Diego. The benchmark grew out of the AI-Tax platform work at Wrocław Tech.
