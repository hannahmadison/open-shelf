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

5. Open a pull request

## Already on the shelf?

If the book, article, or blog you want to recommend is already listed:

1. Find the existing file in `content/reads/`
2. Bump the `recommendations` count by 1
3. Optionally, add your name to `recommended_by` (totally optional — you can stay anonymous)
4. Open a pull request

For example, if `project-hail-mary.md` has `recommendations: 5`, change it to `recommendations: 6`. If you want credit, add:

```yaml
recommended_by: [Your Name]
```

or append to the existing list:

```yaml
recommended_by: [Existing Person, Your Name]
```

## Guidelines

- **One entry per PR** — keeps reviews fast
- **`type`** must be one of: `book`, `article`, `blog`
- **`tags`** — use lowercase, keep them short. Browse existing entries for inspiration
- **`blurb`** — keep it to 1-2 sentences. What made it worth your time?
- **`link`** — direct link to the book/article/blog. Publisher or author's site preferred over Amazon
- **`date_added`** — use today's date in `YYYY-MM-DD` format

## What happens next

When your PR is merged, the site automatically rebuilds and your entry appears on the shelf.
