+++
title = "Block Comments"
description = ""
weight = 4
+++

You can use block comments to group parts of your slide. By annotating the block all items inside this block gets the properties of the annotation:

```md
::: block

#### Header
_and_
Paragraph content
*in same block*

:::

---

no color

::: block <!-- element style="background-color: red;" -->

everything inside this block has red background color

::: block <!-- element style="background-color: blue;" -->

blue

:::

red

:::

no color
```

{{<revealhtml theme="black" progress="true" controls="true">}}

<section><div class="block">

<h4 id="header">Header</h4>
<p><em>and</em>
Paragraph content
<em>in same block</em></p>
</div>
</section>

<section><p>no color</p>
<div class="block" style="background-color: red;"> <!-- -->

<p>everything inside this block has red background color</p>
<div class="block" style="background-color: blue;"> <!-- -->

<p>blue</p>
</div>

<p>red</p>
</div>

<p>no color</p>
</section>

{{</revealhtml>}}
