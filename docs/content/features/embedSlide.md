+++
title = "Embed Slides"
description = ""
weight = 2
+++

### Embed Slides into Obsidian Note

By using `slide` code blocks you are able to embed an slide into an obsidian note. As parameter you have to specify the reference to the slides and the page you want to dislay

#### Example

```md
```slide
{
	slide: [[Presentation]],
	page: 7
}
    ```
```

{{%alert%}}
When using horizontal & vertical slides you can specify a page as following: `3/6`<br>
This would show the 6th vertical slide on the 3rd horizontal position.
{{%/alert%}}



![Embed](https://mszturc.github.io/obsidian-advanced-slides/images/embed.png)