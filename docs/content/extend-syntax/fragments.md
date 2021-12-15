+++
title = "Fragments"
description = ""
weight = 5
+++

Fragments are used to highlight or incrementally reveal individual elements on a slide. Every element with the class fragment will be stepped through before moving on to the next slide.
The default fragment style is to start out invisible and fade in. This style can be changed by appending a different class to the fragment.
<br>
{{%alert%}}A list of all possible fragment types could be found [here](https://revealjs.com/fragments/){{%/alert%}}
```md
Fade in <!-- .element: class="fragment" -->

Fade out <!-- .element: class="fragment fade-out" -->

Highlight red <!-- .element: class="fragment highlight-red" -->

Fade in, then out <!-- .element: class="fragment fade-in-then-out" -->

Slide up while fading in <!-- .element: class="fragment fade-up" -->
```

{{<revealhtml theme="black" progress="true" controls="true">}}

<section data-fragment="-1"><p class="fragment" data-fragment-index="0">Fade in <!-- --></p>
<p class="fragment fade-out" data-fragment-index="1">Fade out <!-- --></p>
<p class="fragment highlight-red" data-fragment-index="2">Highlight red <!-- --></p>
<p class="fragment fade-in-then-out" data-fragment-index="3">Fade in, then out <!-- --></p>
<p class="fragment fade-up" data-fragment-index="4">Slide up while fading in <!-- --></p>
</section>

{{</revealhtml>}}
