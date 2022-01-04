+++
title = "Links"
description = ""
weight = 5
+++

```md
External Links

http://obsidian.md - automatic!

[Obsidian](http://obsidian.md)

---

Obsidian URI links

[Link to note](obsidian://open?path=D:%2Fpath%2Fto%2Ffile.md)

[Link to note](obsidian://open?vault=MainVault&file=MyNote.md)

---
<!-- .slide: id="InternalLinks" -->
Internal Links

This [[Internal link]] will be displayed as normal text

This [[Internal link|Link]] will use its alias for displaying

---

Slide Links

You can link between slides, [like this](#/1/0).

Or by slide id, [like this](#InternalLinks).


```

{{<revealjs theme="black" progress="true" controls="true">}}
External Links

http://obsidian.md - automatic!

[Obsidian](http://obsidian.md)

---

Obsidian URI links

[Link to note](obsidian://open?path=D:%2Fpath%2Fto%2Ffile.md)

[Link to note](obsidian://open?vault=MainVault&file=MyNote.md)

---

Internal Links

This Internal link will be displayed as normal text

This Link will use its alias for displaying

---

Slide Links

You can link between slides, [like this](#/1/0).

Or by slide id, [like this](#/2/0).

___

> If you'd like backlinks to be displayed in the slides, check out the frontmatter property **enableLinks**

{{</revealjs>}}

<br>

{{%alert%}}If you'd like backlinks to be displayed in the slides, check out the frontmatter property `enableLinks`. [see yaml docs]({{%relref "yaml"%}}){{%/alert%}}
