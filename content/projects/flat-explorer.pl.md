---
title: "Flat Explorer"
date: 2026-01-01
draft: false
logo: "img/logos/flat-explorer.svg"
year: 2026
fields: ["Agentic AI", "Applications"]
role: "Autor"
status: "Produkt"
links:
  site: "https://flat-explorer.tagomind.com/"
impact: 72
featured: false
summary: "Poszukiwanie mieszkania wspierane AI: ocenia ogłoszenia, podsumowuje wizyty i porównuje opcje obok siebie."
hero: ""
---

Flat Explorer to aplikacja wspierana AI do oceny ofert mieszkań. Łączy strukturyzowaną ocenę z wglądami generowanymi przez LLM i wspólnym udostępnianiem, dzięki czemu osoby szukające mieszkania mogą podejmować decyzje na podstawie faktów, a nie intuicji.

## Czym to jest

Wklej link do ogłoszenia, a backend pobiera nieruchomość, ocenia ją według kontrolowanych przez Ciebie wag i pisze krótką narrację za pośrednictwem Claude API. Główne funkcje:

- **Zbiorcza ocena** wielu mieszkań przez konfigurowalne agenty oceniające
- **Podsumowania wizyt** syntetyzowane z Twoich notatek z terenu i zdjęć
- **Wspólne udostępnianie** z dostępem opartym na uprawnieniach i interfejsem czatu nad danymi mieszkań
- **Widok mapy** kandydatów z odległościami do miejsc, które Cię interesują

## Stack

Frontend Next.js + React (uwierzytelnianie Supabase) nad backendem FastAPI, który uruchamia agenty LLM za pomocą LangGraph; dane przechowywane w PostgreSQL z bezpieczeństwem na poziomie wierszy.
