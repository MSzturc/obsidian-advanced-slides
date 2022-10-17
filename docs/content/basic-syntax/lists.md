+++
title = "Lists"
description = ""
weight = 3
+++

Add ordered (numbered) and unordered lists to slides to present information as bullet points.

## Unordered Lists

To create an unordered list, start the line with `*` or `-`.
Alternatively, you can also use `+` to create a [Unordered Fragmented List]({{%relref "fragmentedLists.md"%}})

## Ordered Lists

To create an ordered list, start the line with any number, followed by a dot and a space. The slide will show the correct numbers in the list.
Alternatively, you can also start the line with any number, followed by a `)` to create a [Ordered Fragmented List]({{%relref "fragmentedLists.md"%}})

## Nesting Lists and Content

To nest lists or other content inside a list item, indent it with spaces or tabs.

```md
- Item 1
- Item 2
	- Item 2a
	- Item 2b

---

1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b
```

{{< revealhtml theme="black" progress="true" controls="true" >}}

<section>

<ul>
<li>Item 1</li>
<li>Item 2<ul>
<li>Item 2a</li>
<li>Item 2b</li>
</ul>
</li>
</ul>
</section>

<section>

<ol>
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3<ol>
<li>Item 3a</li>
<li>Item 3b</li>
</uo>
</li>
</ol>
</section>

{{< /revealhtml >}}
