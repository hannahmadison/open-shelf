# Contributing to Open Shelf

Thanks for sharing what you're reading! Adding an entry takes about 2 minutes.

## How to add an entry

1. Fork or clone the repo
2. Create a new Markdown file in `content/reads/`
3. Name it with a slug of the title (e.g., `my-favorite-book.md`)
4. Use this template for the file contents:

```yaml
---
title: "Your Title Here"
author: "Author Name"
type: book          # book, article, or blog
link: "https://..."
tags: [tag1, tag2]
blurb: "A sentence or two about why you'd recommend this."
date_added: 2026-05-22  # today's date
---
```

5. Open a merge request

## Guidelines

- **One entry per MR** — keeps reviews fast
- **`type`** must be one of: `book`, `article`, `blog`
- **`tags`** — use lowercase, keep them short. Browse existing entries for inspiration
- **`blurb`** — keep it to 1-2 sentences. What made it worth your time?
- **`link`** — direct link to the book/article/blog. Publisher or author's site preferred over Amazon
- **`date_added`** — use today's date in `YYYY-MM-DD` format

## What happens next

When your MR is merged, the site automatically rebuilds and your entry appears on the shelf.
