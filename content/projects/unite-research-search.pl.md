---
title: "Unite! · wyszukiwarka badaczy"
date: 2026-01-01
draft: false
year: 2026
fields: ["NLP", "Graph ML", "Applications"]
role: "Konsultant"
status: "System dostępny"
impact: 85
featured: true
summary: "Platforma wyszukiwania semantycznego i wizualizacji profili 200k+ badaczy z 9 europejskich uniwersytetów."
tech: ["FastAPI", "Next.js", "PostgreSQL pgvector", "BAAI/bge-m3", "LangChain", "Supabase", "UMAP"]
---

System produkcyjny napędzający odkrywanie badaczy w ramach aliansu UNITE!, sieci 9 partnerskich uniwersytetów obejmujących Polskę, Portugalię, Włochy, Niemcy, Hiszpanię, Finlandię, Austrię, Francję i Szwecję. Platforma indeksuje i przeszukuje 200k+ profili badaczy z wykorzystaniem zarówno wyszukiwania semantycznego, jak i dopasowania słów kluczowych.

## Na czym polega

System łączy wyszukiwanie wektorowe (pgvector z indeksowaniem HNSW) i wyszukiwanie słów kluczowych oparte na BM25 w hybrydowy interfejs wyszukiwania, zasilany wielojęzycznymi embeddingami z BAAI/bge-m3. Użytkownicy mogą wyszukiwać po słowach kluczowych badawczych, instytucji lub poprzez zapytania konwersacyjne („Znajdź ekspertów w energetyce odnawialnej w Hiszpanii z 10+ publikacjami"). Backend przesyła strumieniowo odpowiedzi RAG poprzez integrację LangChain z GPT-4 i Claude. Interaktywne wizualizacje UMAP ujawniają klastry badawcze i sieci współpracy między uniwersytetami, z możliwością eksportu dla wniosków grantowych.

## Najistotniejsze cechy

- **Hybrydowy silnik wyszukiwania**: 75% semantyki + 25% słów kluczowych (konfigurowalny) z opóźnieniem <200ms
- **Konwersacyjna AI**: Zapytania w języku naturalnym z kontekstem wieloturowym i przesyłaniem strumieniowym (<300ms do pierwszego tokenu)
- **Wieloźródłowy pipeline danych**: Zautomatyzowane pozyskiwanie z API Scopus i Semantic Scholar z 50k+ indeksowanych publikacji
- **Wizualizacja badań**: Interaktywne wykresy sieci 200k+ profili, kodowane kolorami według uniwersytetu
- **Skala produkcyjna**: 99,9% dostępności, 100+ jednoczesnych użytkowników, indeksy HNSW do szybkiego wyszukiwania podobieństwa wektorów
