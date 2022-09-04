+++
title = "Slide Backgrounds"
description = ""
weight = 7
+++

you can change the background by annotating the slide:

```md
<!-- slide bg="aquamarine" -->
## Slide with text based background
---

<!-- slide bg="#ff0000" -->
## Slide with hex based background

---

<!-- slide bg="rgb(70, 70, 255)" -->
## Slide with rgb based background

---

<!-- slide bg="hsla(315, 100%, 50%, 1)" -->
## Slide with hsl based background

---

# Slide without background

---

<!-- slide bg="https://picsum.photos/seed/picsum/800/600" -->
## Slide with image background

---

<!-- slide bg="[[image.jpg]]" -->
## Slide with image background #2

---

<!-- slide bg="https://picsum.photos/seed/picsum/800/600" data-background-opacity="0.5" -->
## with opacity

0.5 ≙ 50% opacity

---

## More options:

See [reveal backgrounds](https://revealjs.com/backgrounds/)
```

{{<revealhtml theme="black" progress="true" controls="true">}}

<section bg="aquamarine" class="has-light-background present">
<h2 id="slide-with-text-based-background">Slide with text based background</h2>
</section>

<section bg="#ff0000" class="has-dark-background">
<h2 id="slide-with-hex-based-background">Slide with hex based background</h2>
</section>

<section bg="rgb(70, 70, 255)" class="has-dark-background">
<h2 id="slide-with-rgb-based-background">Slide with rgb based background</h2>
</section>

<section bg="hsla(315, 100%, 50%, 1)" class="has-dark-background">
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



You can change the background of all slides by adding the following frontmatter:

```md
---
bg: red
---
```

```md
---
bg: '#ff0000'
---
```

```md
---
bg: rgb(70, 70, 255)
---
```

You can also set the background to transparent for all slides. This is especially useful if you want to use your slides as overlay source for OBS.

```md
---
bg: transparent
---
```

### See in action:
<video controls width="320" height="240"><source src="https://cdn.discordapp.com/attachments/840286238928797736/1014391376248573952/slides-in-obs.mp4" type="video/mp4"></video>

