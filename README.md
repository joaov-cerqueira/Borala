# Landing Page Imersiva — Agência de Turismo

Projeto em HTML + CSS + JavaScript puro, pensado para GitHub + Vercel.

## O conceito

- Hero com sensação de embarque: o avião se aproxima conforme o scroll e a interface entra em um cockpit.
- Uma única “tela” de viagem fica presa no viewport. O scroll não cria uma sequência de cards: ele aproxima o destino atual, abre uma transição/portal e troca para o próximo destino no mesmo espaço.
- O avião pequeno atravessa a tela durante cada troca.
- Três destinos nacionais e três internacionais.
- Imagem principal usa `object-fit: contain` e uma margem de segurança; por isso o monumento/foto principal não é cortado. O preenchimento da tela é feito por uma cópia desfocada atrás.
- Parallax 3D pelo movimento do mouse em desktop.
- Mobile responsivo e `prefers-reduced-motion` respeitado.

## Edite primeiro

### 1) WhatsApp
No início do `script.js`:

```js
const WHATSAPP_NUMBER = "5521999999999";
```

Troque por `55 + DDD + número`.

### 2) Logo da agência
Substitua `assets/logo.png` pela logo oficial mantendo o mesmo nome do arquivo. O cabeçalho e o rodapé já usam essa imagem.

### 3) Nome da agência no SEO
No `index.html`, altere o `<title>` e o campo `"name"` do JSON-LD para o nome oficial da empresa.

### 4) Domínio / SEO
Troque `https://www.seudominio.com.br/` no `index.html`, `robots.txt` e `sitemap.xml`.

### 5) Destinos
Toda a lista fica no começo de `script.js`, no array `scenes`. Você pode alterar título, texto, duração, estilo, imagem e mensagem do WhatsApp sem mexer na animação.

## Publicar na Vercel

Suba os arquivos deste diretório diretamente na raiz do repositório. O `index.html` precisa ficar na raiz.

## Créditos das imagens de demonstração

As imagens dos destinos NÃO ficam dentro da pasta `assets`: elas são carregadas por URL no começo de `script.js`, dentro do array `scenes`, no campo `image`. A pasta `assets` agora contém somente `logo.png`. As imagens são carregadas remotamente do Wikimedia Commons e devem manter os créditos/licenças correspondentes se você as usar em produção. Para um site comercial definitivo, recomendo substituir pelas fotos próprias ou licenciadas da agência.

- Vista do Cristo.jpg — Jaime Spaniol / Unsplash (CC0 via Wikimedia Commons)
- Fernando de Noronha-Praia do Sancho.jpg — Hansfotos / Wikimedia Commons
- Cataratas Iguacu Iguazu Falls.jpg — Christhian Almir Gruhn / Wikimedia Commons
- Taj Mahal frontal.jpg — Marsmux / Wikimedia Commons (CC BY-SA 4.0)
- Wide view of entire Colosseum... — Jon Gudorf Photography / Wikimedia Commons
- Oia (panoramic cityscape). Santorini... — Wikimedia Commons
