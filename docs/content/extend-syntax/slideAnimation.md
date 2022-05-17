+++
title = "Slide Animation"
description = ""
weight = 15
+++

Advanced Slides can automatically animate elements across slides. All you need to do is add `data-auto-animate` to two adjacent slide annotationsand Auto-Animate will animate all matching elements between the two.

Here's a simple example to give you a better idea of how it can be used:

```md
<!-- .slide: data-auto-animate -->
# Title

---
<!-- .slide: data-auto-animate -->

# Title
##### **Subtitle**
###### *Author - 2022* 
```

{{%alert%}}To learn more about Auto-Animation visit [reveal.js Documentation](https://revealjs.com/auto-animate/){{%/alert%}}
