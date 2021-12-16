+++
title = "Speaker Notes"
description = ""
weight = 8
+++

Advanced Slides comes with a speaker notes function which can be used to present per-slide notes in a speaker view.

To access the speaker view you have to open `Slide Preview` and click on the `Open in Browser` Button in the top right corner. Your Slide will open in your default web browser. Press the »S« key on your keyboard to open the notes window.

The notes window also gives you a preview of the next upcoming slide so it may be helpful even if you haven't written any notes.

```md
## My Slide

This is part of my Presentation


note: this is not! Only the speaker might see this text.

- and this bulletpoint
- or this picture

![](https://picsum.photos/id/1005/250/250) 
```

![Speaker View](https://mszturc.github.io/obsidian-advanced-slides/images/speakerView.png)

<br>

{{%alert%}} It is possible to change the notes indicator by changing the `notesSeparator` property in frontmatter [see yaml docs]({{%relref "yaml"%}}){{%/alert%}}
