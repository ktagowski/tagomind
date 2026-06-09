---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
year: {{ now.Year }}
fields: []            # e.g. ["NLP", "Graph ML", "Legal AI", "Benchmarks", "Applied", "Teaching"]
role: ""              # your role, e.g. "Co-author & engineer"
venue: ""             # e.g. "NeurIPS 2022" (leave empty if none)
status: ""            # e.g. "Published", "Production", "Open source", "Active"
impact: 0             # 0–100 — drives the card badge; optional
featured: false
weight: 100           # lower = earlier
summary: ""           # one–two sentence card blurb
tech: []              # e.g. ["PyTorch", "Transformers", "DVC"]
hero: ""              # img/projects/<slug>.png (optional)
links:
  repo: ""
  paper: ""
  demo: ""
  dataset: ""
  site: ""
---

Write-up goes here.
