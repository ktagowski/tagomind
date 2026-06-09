---
title: "Unite! Researcher Discovery"
date: 2026-01-01
draft: false
year: 2026
fields: ["NLP", "Graph ML", "Applications"]
role: "Consultant"
status: "Live system"
impact: 85
featured: true
summary: "Semantic search and visualization platform for 200k+ researcher profiles across 9 European universities."
tech: ["FastAPI", "Next.js", "PostgreSQL pgvector", "BAAI/bge-m3", "LangChain", "Supabase", "UMAP"]
---

A production system that powers researcher discovery across the UNITE! alliance, a network of 9 partner universities spanning Poland, Portugal, Italy, Germany, Spain, Finland, Austria, France, and Sweden. The platform indexes and searches 200k+ researcher profiles with both semantic and keyword matching.

## What it is

The system combines vector search (pgvector with HNSW indexing) and BM25-based keyword matching into a hybrid search interface, powered by multilingual embeddings from BAAI/bge-m3. Users can search by research keywords, institution, or via conversational queries ("Find renewable energy experts in Spain with 10+ publications"). The backend streams RAG responses via LangChain integration with GPT-4 and Claude. Interactive UMAP visualizations reveal research clusters and collaboration networks across universities, with export capabilities for grant proposals.

## Highlights

- **Hybrid search engine**: 75% semantic + 25% keyword (configurable) with <200ms latency
- **Conversational AI**: Natural language queries with multi-turn context and streaming responses (<300ms first token)
- **Multi-source data pipeline**: Automated ingestion from Scopus and Semantic Scholar APIs with 50K+ indexed publications
- **Research visualization**: Interactive network plots of 200k+ profiles, color-coded by university
- **Production scale**: 99.9% uptime, 100+ concurrent users, HNSW indexes for fast vector similarity
