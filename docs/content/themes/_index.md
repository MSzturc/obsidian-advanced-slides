+++
title = "Themes"
description = ""
weight = 6
alwaysopen = false
pre ="<i class='fa fa-paint-brush' ></i> "
+++

Advanced Slides comes with a varity of diffrent themes built in:

- black (default)
- white
- league
- beige
- sky
- night
- serif
- simple
- solarized
- blood
- moon
- consult
- css/mattropolis.css

To activate a theme simply add a theme property in the frontmatter section of your slides:

	---
	theme: night

	---

if you want to use a custum theme you can do it! Just place the theme in the plugins directory and load them from there.

**Example:** 

If your theme file name is **my-theme.css** place it inside your Vaults directory in  `.obsidian/plugins/obsidian-advanced-slides/css/` subfolder and load it by adding the following line on top of your slides markdown file: 

	---
	theme: css/my-theme.css

	---

You can also load a custom theme directly from the Internet:

	---
	theme: https://revealjs-themes.dzello.com/css/theme/robot-lung.css

	---

# Highlight Themes

All you have learned so far about custom themes could be applied to highlight themes as well. Highlight Themes define how codeblock elements should look. To activate a highlight theme simply add a highlightTheme property in the frontmatter section of your slides:

	---
	highlightTheme: monokai

	---

By default advanced slides comes with a varity of diffrent highlight themes:

- zenburn (default)
- monokai
- css/vs2015.css
