# Clínica Marília Macedo — site

Site estático, sem build e sem dependências. HTML + CSS + JS puros.

## Como abrir

1. Abra a pasta no VS Code (`File > Open Folder`).
2. Instale a extensão **Live Server** (Ritwick Dey).
3. Clique com o botão direito no `index.html` → **Open with Live Server**.

Abrir o `index.html` direto no navegador (duplo clique) também funciona — o Live Server só dá o reload automático.

## Estrutura

```
index.html          markup + JSON-LD
css/style.css       tokens, layout mobile-first e bloco @media desktop no fim
js/main.js          reveal no scroll, header sticky, CTA flutuante, tab ativa
assets/img/         imagens do site (hoje são placeholders)
assets/img/_temporarias/   fotos do Instagram já otimizadas em webp (backup)
```

## Trocar as imagens

Cada arquivo em `assets/img/` é um slot. Substitua mantendo o **nome** e a **proporção** — o CSS fixa a proporção de cada slot, então uma foto fora da proporção será cortada no centro, não vai quebrar o layout.

| Arquivo | Proporção | Tamanho sugerido | Onde aparece |
|---|---|---|---|
| `hero.jpg` | 4:5 | 1200×1500 | topo (no desktop vira a coluna direita do card) |
| `clinica-ambiente.jpg` | 16:10 | 1600×1000 | seção História & Propósito |
| `dra-marilia.jpg` | 4:5 | 1200×1500 | seção Corpo Clínico |
| `caso-01.jpg` … `caso-04.jpg` | 4:5 | 1200×1500 | galeria de casos |
| `fachada.jpg` | 3:4 | 1200×1600 | seção Localização |
| `logo.jpg` | 1:1 | 400×400 | header, rodapé e favicon |
| `marca-branca.png` | 1:1 | PNG transparente | marca d'água sobre a foto da Dra. |

Se quiser trocar a extensão (`.webp` em vez de `.jpg`), altere o `src` no `index.html` e o `width`/`height` se a proporção mudar.

**Recomendado antes de publicar:** exportar tudo em WebP a ~80% de qualidade. As fotos dessa pasta somam pouco; o hero é a única que vale carregar com prioridade (já está com `fetchpriority="high"`).

## Pendências antes de ir ao ar

- [ ] **WhatsApp** — todos os links estão como `https://wa.me/55869XXXXXXXX`. Busque e substitua no `index.html` (5 ocorrências).
- [ ] **CRO-PI** — rodapé está com `CRO-PI [inserir número]`. É exigência do CFO para site de clínica odontológica.
- [ ] **`<link rel="canonical">`** e **`og:url` / `og:image`** — estão comentados no `<head>`, faltando o domínio final. A `og:image` precisa ser um arquivo 1200×630 hospedado (data URI e caminho relativo não funcionam em preview de link).
- [ ] **Textos marcados com `<!-- CONFIRMAR -->`** no `index.html`: "14+ anos de prática", "mais de uma década de prática clínica", "cirurgia guiada sem cortes" e "escaneamento 3D". Confirme com a clínica ou troque.

## Notas técnicas

- Mobile-first. O bloco desktop começa em `@media (min-width:1001px)` no fim do `style.css`.
- Animações: um único `IntersectionObserver` para o reveal (`[data-r]`), que desobserva o elemento depois de revelar. Sem biblioteca de animação.
- `prefers-reduced-motion: reduce` deixa a página estática.
- A tab bar e o botão flutuante de WhatsApp só existem no mobile; no desktop aparece a navegação no header.
- Cores, tipografia e espaçamentos estão em custom properties no `:root` do `style.css`.
