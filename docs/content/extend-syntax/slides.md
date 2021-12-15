+++
title = "Horizontal / Vertical Slides"
description = ""
weight = 1
+++

To create a horizontal slide use three dashes surrounded by two blank lines. To create vertical slides use two dashes surrounded by two blank lines:

```md
# Slide 1

---

# Slide 2.1

--

# Slide 2.2
```

{{<revealjs theme="black" progress="true" controls="true">}}
# Slide 1

---

# Slide 2.1

--

# Slide 2.2

{{</revealjs>}}

<br>

{{%alert%}} It is possible to change the vertical / horizontal slide separator by changing the `separator` or `verticalSeparator` property in frontmatter [see yaml docs]({{%relref "yaml"%}}){{%/alert%}}
