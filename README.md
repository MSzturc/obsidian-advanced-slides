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


---

### Configure Reveal.js through frontmatter

You can pass reveal options through frontmatter.

	---
	slideNumber: true
	---

You can find an overview of all possible parameters [here](https://revealjs.com/config/)

---


### Embed your Notes into Slides

You can use information from your notes in your presentation

	# My Slide
	
	![[MyFirstNote]]

---

### Embed parts of your Notes

You can embed sections from your notes into your presentation

	# My Slide
	
	![[MyFirstNote#My Title]]

---

## Element Annotations

You can pass style or class properties for an element by annotating it:

	## Header with red background color <!-- .element: class="red" -->

	Text without background color

	Text with blue background color <!-- .element: style="background-color: blue;" -->

---

## Slide Annotations

You can pass style or class properties for the whole slide by annotating it:

	<!-- .slide: style="background-color: coral;" -->

	# Slide with coral background color

	---

	<!-- .slide: style="background-color: green;" -->

	# Slide with green background color
