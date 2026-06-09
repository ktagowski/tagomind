---
title: "JuDDGES"
date: 2024-01-01
draft: false
logo: "img/logos/juddges.svg"
year: 2025
yearEnd: 2026
fields: ["NLP", "Legal AI", "Datasets"]
role: "Konsultant"
status: "Aktywny"
impact: 88
featured: true
summary: "Platforma finansowana z funduszy UE do analizy NLP orzeczeń sądowych w Polsce i Anglii & Walii."
tech: ["Python", "NLP", "Machine Learning", "DVC", "Hydra", "LLM-as-judge", "Active Learning"]
links:
  repo: "https://github.com/pwr-ai/JuDDGES"
  site: "https://pwr-ai.github.io/JuDDGES/"
---

JuDDGES (Judicial Decision Data Gathering, Encoding, and Sharing) to finansowana z funduszy UE platforma współpracy, która umożliwia badania empiryczne w prawie poprzez analizę orzeczeń sądowych w różnych systemach prawnych. Projekt analizuje rejestry sądów karnych z Polski i Anglii & Walii, wykorzystując przetwarzanie języka naturalnego i techniki z udziałem człowieka do ekstrakcji ustrukturyzowanych danych w różnych jurysdykcjach.

## Co to jest

Platforma przezwycięża kluczowe bariery dla badań prawnych: różne języki, niespójne formaty danych i ograniczone zasoby. Jej możliwości obejmują:

- **Harmonizacja danych**: Standaryzowane kodowanie rejestrów sądów karnych w różnych jurysdykcjach
- **Ekstrakcja informacji**: Potoki oparte na LLM i modelach dostrojonych do ekstrakcji faktów, informacji o wymierzonych karach i rozumowania sędziego z surowych orzeczeń
- **Ramy ewaluacji**: Zarówno tradycyjne metryki n-gramów, jak i ewaluacja LLM-as-judge dla oceny jakości ekstrakcji
- **Narzędzie adnotacji z uczeniem aktywnym**: Systemy z udziałem człowieka do iteracyjnego ulepszania modeli na bazie opinii ekspertów

## Kluczowe elementy

Prace obejmują cztery skoordynowane pakiety: zbieranie danych i kodowanie przez człowieka (WP2), metodologia NLP i machine learning (WP3 kierowana przez Uniwersytet Wrocławski i Middlesex University), praktyki otwartej nauki (WP4) i koordynację projektu. Baza kodu została zbudowana na Pythonie 3.11, z użyciem DVC dla odtwarzalnych pipeline'ów oraz Hydry do zarządzania konfiguracją, co umożliwia badaczom wnioskowanie, dostrajanie modeli na tekście prawniczym i ewaluację jakości ekstrakcji.
