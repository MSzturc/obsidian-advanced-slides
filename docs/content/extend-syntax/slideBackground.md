+++
title = "Slide Backgrounds"
description = ""
weight = 7
+++

you can change the background by annotating the slide:

```md
<!-- .slide: data-background="aquamarine" -->
## Slide with text based background
---

<!-- .slide: data-background="#ff0000" -->
## Slide with hex based background

---

<!-- .slide: data-background="rgb(70, 70, 255)" -->
## Slide with rgb based background

---

<!-- .slide: data-background="hsla(315, 100%, 50%, 1)" -->
## Slide with hsl based background

---

# Slide without background

---

<!-- .slide: data-background-image="https://picsum.photos/seed/picsum/800/600" -->
## Slide with image background

---

<!-- slide bg="https://picsum.photos/seed/picsum/800/600" -->
## Slide with image background #2

---

<!-- .slide: data-background-image="https://picsum.photos/seed/picsum/800/600" data-background-opacity="0.5" -->
## with opacity

0.5 ≙ 50% opacity

---

## More options:

See [reveal backgrounds](https://revealjs.com/backgrounds/)
```

{{<revealhtml theme="black" progress="true" controls="true">}}

<section data-background="aquamarine" class="has-light-background present">
<h2 id="slide-with-text-based-background">Slide with text based background</h2>
</section>

<section data-background="#ff0000" class="has-dark-background">
<h2 id="slide-with-hex-based-background">Slide with hex based background</h2>
</section>

<section data-background="rgb(70, 70, 255)" class="has-dark-background">
<h2 id="slide-with-rgb-based-background">Slide with rgb based background</h2>
</section>

<section data-background="hsla(315, 100%, 50%, 1)" class="has-dark-background">
<h2 id="slide-with-hsl-based-background">Slide with hsl based background</h2>
</section>

<section><h1 id="slide-without-background">Slide without background</h1>
</section>

<section data-background-image="https://picsum.photos/seed/picsum/800/600">
<h2 id="slide-with-image-background">Slide with image background</h2>
</section>

<section data-background-image="https://picsum.photos/seed/picsum/800/600">
<h2 id="slide-with-image-background">Slide with image background #2</h2>
</section>

<section><h2 id="more-options">More options:</h2>
<p>See <a href="https://revealjs.com/backgrounds/">reveal backgrounds</a></p>
</section>


{{</revealhtml>}}

