+++
title = "Footnotes"
description = ""
weight = 11
+++


```md
Here's a simple footnote[^1]

[^1]: meaningful!

```

![Footnote](https://mszturc.github.io/obsidian-advanced-slides/images/footnote.png)

{{%alert%}} To define the location where footnotes should be displayed on slide simply define a `<%? footnotes %>` placeholder on the slide at the location where the footnotes should be rendered. To style the Footnotes itself define styles for `footnotes` class and it's childeren `ol` and `ol->li`. {{%/alert%}}

<%? footnotes %>