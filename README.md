# Advanced Slides for Obsidian

Advanced Slides is a Plugin that lets you create markdown-based reveal.js presentations in [Obsidian](https://obsidian.md/).

## Demo

![demo](https://raw.githubusercontent.com/MSzturc/obsidian-advanced-slides/main/imgs/demo.gif)

## Features

### Horizontal Slides

To create a horizontal slide 
use three dashes surrounded 
by two blank lines

	# First slide
	
	---
	
	# Second Slide
	

---

### Verical Slide 

To create vertical slides
use two dashes surrounded 
by two blank lines

	# First slide
	
	--
	
	# Vertical Slide

---

### Custom Themes

To create a custom themed slide deck simply add a theme property in the frontmatter section of your slides.

	---
	theme: night

	---

---

### Available Themes

By default advanced slides comes with a varity of diffrent themes:

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
- css/mattropolis.css

---

### Custom Themes (local)

You can place custom themes in the plugin directory and load them from there:

	---
	theme: css/mattropolis.css

	---

---

### Custom Themes (from the Internet)

You can load custom themes directly from the Internet:

	---
	theme: https://revealjs-themes.dzello.com/css/theme/robot-lung.css

	---

---

### Available Highlight Themes

All you have learned so far about custom themes could be applied to highlight themes as well: 

	---
	highlightTheme: monokai

	---
	
---

### Reveal Highlight Themes

By default advanced slides comes with a varity of diffrent highlight themes:

- zenburn (default)
- monokai
- css/vs2015.css