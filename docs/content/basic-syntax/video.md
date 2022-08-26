+++
title = "Video"
description = ""
weight = 4
+++

```md

Insert video as an HTML video tag

<video data-autoplay controls><source src="Attachments/my_video_file.mp4" type="video/mp4"></video>

---

Set the size of the video

<video data-autoplay controls width="800" height="600"><source src="Attachments/my_video_file.mp4" type="video/mp4"></video>

```

References:
- https://forum.obsidian.md/t/advanced-slides-create-markdown-based-reveal-js-presentations-in-obsidian/28243/42
- https://www.w3schools.com/tags/tag_video.asp

{{<revealhtml theme="black" progress="true" controls="true">}}

<section>
<p>Insert video as an HTML video tag</p>
<video data-autoplay controls><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"></video>
</section>

<section>
<p>Set the size of the video</p>
<video data-autoplay controls width="800" height="600"><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"></video>
</section>

{{</revealhtml>}}

