# Advanced Slides for Obsidian

Advanced Slides is a Plugin that lets you create markdown-based reveal.js presentations in [Obsidian](https://obsidian.md/).

## Demo

![demo](https://raw.githubusercontent.com/MSzturc/obsidian-advanced-slides/main/imgs/demo.gif)

## How to Install?

### with BRAT

* Add `MSzturc/obsidian-advanced-slides` to the beta Plugins in BRAT

### manually
* Download obsidian-advanced-slides.zip from [github](https://github.com/MSzturc/obsidian-advanced-slides/releases), extract it in your Vault in  `/.obsidian/plugins/obsidian-advanced-slides/` folder.

### Community Plugins

* A [pull request](https://github.com/obsidianmd/obsidian-releases/pull/682) for inclusion in the community plugins has been made, but is still waiting to be accepted.


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

### Custom CSS 

it is possible to add further css files beside theme and highlight theme to slide deck:

	---
	css: [css/layout.css,css/customFonts.css]
	---

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

### Element Annotations

You can pass style or class properties for an element by annotating it:

	## Header with red background color <!-- .element: class="red" -->

	Text without background color

	Text with blue background color <!-- .element: style="background-color: blue;" -->

---

### Slide Annotations

You can pass style or class properties for the whole slide by annotating it:

	<!-- .slide: style="background-color: coral;" -->

	# Header with coral background color

	Paragraph has coral background color, too!

	---

	<!-- .slide: style="background-color: green;" -->

	- All Bullet points
	- have green
	- background color


---

### Block Comments

You can use block comments to group parts of your slide. 

	::: block

	#### Header
	_and_
	Paragraph content
	*in same block*

	:::

By annotating the block all items inside this block gets the properties of the annotation:

	no color

	::: block <!-- .element: style="background-color: red;" -->

	everything inside this block has red background color

	::: block <!-- .element: style="background-color: blue;" -->

	blue

	:::

	red

	:::

	no color

---

### Inline Styling

you may define css styles inside your markdown:

	<style>
		.with-border{
			border: 1px solid red;
		}
	</style>
	
To use the defined style simply annotate an element with it 

	styled text <!-- .element: class="with-border" -->

---

### Slide Backgrounds

you can change the background by annotating the slide:


	<!-- .slide: data-background="aquamarine" -->
	## Slide with text based background
	---

	<!-- .slide: data-background="#ff0000" -->
	## Slide with hex based background

	---

	<!-- .slide: data-background="rgb(70, 70, 255)" -->
	## Slide with rgb based background

	---

	<!-- .slide: data-background="hsla(315, 100%, 50%, 1)" -->
	## Slide with hsl based background

	---

	# Slide without background

	---

	<!-- .slide: data-background-image="https://picsum.photos/seed/picsum/800/600" -->
	## Slide with image background

	---

	<!-- .slide: data-background-image="https://picsum.photos/seed/picsum/800/600" data-background-opacity="0.5" -->
	## with opacity

	0.5 ≙ 50% opacity

	---

	## More options:

	See [reveal backgrounds](https://revealjs.com/backgrounds/)

## Layout

Advanced Slides provides a variety of components that simplify layouting of you slides

### Split Component

#### Split even

By using the `even` property of the split element you are able to split a slide evenly
The `gap` property defines how much space should be between the columns of the split element

	---
	theme: css/mattropolis.css
	transition: none
	---

	<!-- .slide: data-background="white" data-background-image="https://picsum.photos/id/3/960/700" data-background-opacity="0.4" -->


	# Our Team <!-- .element: class="align-right" -->

	<split even gap="1">

	<left class="align-right"> 

	![](https://picsum.photos/id/1005/250/250) 
	### Timmy Jimmy 
	**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s

	</left> 
	<middle class="align-right">

	![](https://picsum.photos/id/1010/250/250) 
	### Jenna Doe 
	when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap

	</middle>
	<right> <!-- .element: class="align-right" -->

	![](https://picsum.photos/id/1025/250/250) 
	### Doggy Dog
	into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
		
	</right>
		
	</split>

#### Split left/right

If you want to split a slide proportionally you can do that with left and right properties. Left and right represent the proportions of the slide columns. For example if you want a right column that is twice wide as the left column you should set `left="1"` and `right="2"`

	<!-- .slide: data-background="white" data-background-image="https://image.freepik.com/free-photo/gray-abstract-wireframe-technology-background_53876-101941.jpg" -->

	<style>
	.activity-label {
		background-color:lightgray;
		padding: 8px 16px;
		border: 1px solid black;
	}
	</style>
	<split left="3" right="7" gap="1">
	<left>

	## Activity 2:
	Divide each shape into the number of equal parts shown, taking the circle as exaple. All parts must be identical

	</left>
	<split wrap="3" gap="1" no-margin>
	<item class="align-center">

	![[Circle.png]]

	2 Parts <!-- .element: class="activity-label"-->

	</item>
	<item class="align-center">

	![[Square.png]]

	4 Parts <!-- .element: class="activity-label"-->

	</item>
	<item class="align-center">

	![[Penta.png]]

	5 Parts <!-- .element: class="activity-label"-->

	</item>
	<item class="align-center">

	![[Triangle.png]]

	2 Parts<!-- .element: class="activity-label"-->

	</item>
	<item class="align-center">

	![[Circle2.png]]

	8 Parts<!-- .element: class="activity-label"-->

	</item>
	<item class="align-center">

	![[Rect.png]]

	6 Parts<!-- .element: class="activity-label"-->

	</item>
	</split>
	</split>
