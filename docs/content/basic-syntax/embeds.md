+++
title = "Embeds"
description = ""
weight = 6
+++


Given the following `Obsidian.md` Note file:

```md
# Notes about Obsidian
A knowledge base that works on local Markdown files

# Link
Link to Obsidian Homepage: http://obsidian.md
```

And the following `Slide.md`:

```md
![[Obsidian]]

---

![[Obsidian#Link]]

```

{{<revealjs theme="black" progress="true" controls="true">}}
# Notes about Obsidian
A knowledge base that works on local Markdown files

# Link
Link to Obsidian Homepage: http://obsidian.md

---

# Link
Link to Obsidian Homepage: http://obsidian.md

{{</revealjs>}}
