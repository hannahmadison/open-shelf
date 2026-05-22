# Open Shelf

**What we're reading, sharing, and thinking about.**

A community reading list where anyone can share books, articles, and blogs they recommend. Built as a static site — contributions happen through pull requests.

**Live site:** https://hannahmadison.github.io/open-shelf/

## Add to the shelf

The quickest way to contribute:

1. Fork this repo
2. Create a new `.md` file in `content/reads/` (e.g., `my-favorite-book.md`)
3. Paste in this template and fill it out:

```yaml
---
title: "Your Title Here"
author: "Author Name"
type: book
link: "https://www.goodreads.com/search?q=Your+Title+Here"
tags: [sci-fi, fiction]
blurb: "A sentence or two about why you'd recommend this."
date_added: 2026-05-22
---
```

4. Open a pull request

That's it. See [CONTRIBUTING.md](CONTRIBUTING.md) for full details, including how to +1 a book that's already on the shelf.

## Browse tags

`sci-fi` `fantasy` `fiction` `non-fiction` `history` `philosophy` `biography` `technology` `ai` `litrpg` `classics` `thriller` `humor` `science` `anthropology` `sociology` `self-help` `literary-fiction` `historical-fiction` `essays` `career` `engineering`

## Run locally

```sh
npm install
npm run dev
```

Opens at `localhost:4321`.

## Tech

Astro, React, Tailwind CSS. Static site — no backend, no database, no auth.

## License

Content contributions are the opinions of their authors. The site code is open source.

---

*A free community project.*
