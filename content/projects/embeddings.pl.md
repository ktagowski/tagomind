---
title: "CLARIN-PL Embeddings"
date: 2022-01-01
draft: false
logo: "img/logos/clarin-pl.png"
year: 2022
fields: ["NLP", "Benchmarks"]
role: "Główny inżynier i koordynator"
status: "Otwarty kod źródłowy"
impact: 80
featured: false
summary: "Biblioteka NLP do klasyfikacji tekstu, znakowania sekwencji i embeddingów dla języka polskiego."
tech: ["Transformers", "PyTorch Lightning", "Hugging Face", "ONNX", "Flair"]
links:
  repo: "https://github.com/CLARIN-PL/embeddings"
  paper: "https://proceedings.neurips.cc/paper_files/paper/2022/file/890b206ebb79e550f3988cb8db936f42-Paper-Datasets_and_Benchmarks.pdf"
  dataset: "https://github.com/CLARIN-PL/LEPISZCZE"
---

Biblioteka Python do przetwarzania tekstu i embeddingów opartych na modelach Transformer, skupiona na języku polskim. Zbudowana jako kluczowy komponent benchmarku LEPISZCZE z NeurIPS 2022, ukrywa konfigurację modeli i szablonowy kod treningowy w komponowalnych pipeline'ach.

## Co to jest

CLARIN-PL Embeddings łączy Hugging Face Transformers i PyTorch Lightning w komponowalne pipeline'y do zadań NLP opartych na modelach Transformer. Oferuje gotowe pipeline'y do klasyfikacji tekstu i znakowania sekwencji (NER, tagowanie POS, przywracanie interpunkcji) oraz statyczne embeddingi oparte na Flair. Biblioteka wyposażona jest w zoptymalizowane pipeline'y przeszukiwania hiperparametrów i integruje modele polskojęzyczne takie jak HerBERT. Kompatybilna z 10+ polskimi zbiorami danych opracowanymi przez CLARIN-PL, od analizy sentymentu do odpowiadania na pytania.

## Najważniejsze

- Pipeline'y klasyfikacji tekstu i znakowania sekwencji zasilane trenerami Lightning
- Wyszukiwanie hiperparametrów do optymalizacji modeli pod konkretne zadanie
- Wstępnie skonfigurowane zbiory danych polskojęzyczne: PolEmo2, KPWR-NER, NKJP-POS i inne
- Statyczne i transformer embeddingi z obsługą backendu Flair
- Opublikowana w NeurIPS 2022 jako część pracy benchmarku LEPISZCZE
