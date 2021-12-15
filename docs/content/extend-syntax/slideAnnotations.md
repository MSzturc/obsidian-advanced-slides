+++
title = "Slide Annotations"
description = ""
weight = 3
+++

You can pass style or class properties for the whole slide by annotating it:

```md
<!-- .slide: style="background-color: coral;" -->

# Header with coral background color

Paragraph has coral background color, too!

---

<!-- .slide: style="background-color: green;" -->

- All Bullet points
- have green
- background color
```

{{<revealhtml theme="black" progress="true" controls="true">}}

<section style="background-color: coral;">

<h1 id="header-with-coral-background-color">Header with coral background color</h1>
<p>Paragraph has coral background color, too!</p>
</section>

<section style="background-color: green;">

<ul>
<li><p>All Bullet points</p>
</li>
<li><p>have green</p>
</li>
<li><p>background color</p>
</li>
</ul>
</section>

{{</revealhtml>}}
