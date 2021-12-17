+++
title = "Fragmented list"
description = ""
weight = 9
+++

Based on the Fragments concept Advanced Slides introduced a convention to automatically add fragment annotation to bullet points of ordered and unordered lists. By using `+` or `)` as indicator for a list, the list will be automatically displayed as a fragmented list.


```md
# Unordered list

- First
- Second
- Third

---

# Fragmented unordered list

- Permanent
+ First
+ Second
+ Third

---

# Ordered list

1. First
2. Second
3. Third

---

# Fragmented ordered list

1. Permanent
2) Second
3) Third
4) Fourth
```

{{<revealhtml theme="black" progress="true" controls="true">}}

<section><h1 id="unordered-list">Unordered list</h1>
<ul>
<li>First</li>
<li>Second</li>
<li>Third</li>
</ul>
</section>

<section><h1 id="fragmented-unordered-list">Fragmented unordered list</h1>
<ul>
<li>Permanent</li>
<li class="fragment" data-fragment-index="0">First</li>
<li class="fragment" data-fragment-index="1">Second</li>
<li class="fragment" data-fragment-index="2">Third</li>
</ul>
</section>

<section><h1 id="ordered-list">Ordered list</h1>
<ol>
<li>First</li>
<li>Second</li>
<li>Third</li>
</ol>
</section>

<section><h1 id="fragmented-ordered-list">Fragmented ordered list</h1>
<ol>
<li>Permanent</li>
<li class="fragment" data-fragment-index="0">Second</li>
<li class="fragment" data-fragment-index="1">Third</li>
<li class="fragment" data-fragment-index="2">Fourth</li>
</ol>
</section>

{{</revealhtml>}}

