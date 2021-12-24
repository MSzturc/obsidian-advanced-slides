+++
title = "Grid Component"
description = ""
weight = 2
+++

By using the `<grid>` tag you are able to layout the content of your slide in parts.

### Concept

Grid layouts drag-and-drop is used to size and position content of your slides. 

- **Drag** to size a block of content on your slide, then
- **Drop** to position that block anywhere on the slide.


### Basic Syntax

The following syntax is used to drag-and-drop a grid in Advanced Slides:

	<grid drag="width height" drop="x y">

The *width* and *height* values of the **drag** property define the  size of the area in which the content will be displayed. The *x* and *y* values ​​of the **drop** property define the position on the slide where the content should be inserted. 

{{%alert%}}By default, it is assumed that the values ​​are percentages based on the size of the slide. Append **px** to the values for pixel sizes.{{%/alert%}}

#### Position by Coordinates

Both positive and negative values can be set for *x* and *y* on the **drop** property. The meaning of positive and negative values in each case is summarized as follows:

- A positive x value indicates a position relative to the left edge of the slide.
- A negative x value indicates a position relative to the right edge of the slide.
- A positive y value indicates a position relative to the top edge of the slide.
- A negative y value indicates a position relative to the bottom edge of the slide.

The following sample slide helps to clarify these concepts:

```md
<grid drag="60 55" drop="5 10" bg="red">
60 x 55
</grid>

<grid drag="25 55" drop="-5 10" style=bg="green">
25 x 55
</grid>

<grid drag="90 20" drop="5 -10" bg="gray">
90  x 20
</grid>
```

![Example](https://mszturc.github.io/obsidian-advanced-slides/images/grid-basic1.png)


#### Position by Name

Some common grid positions have been named for your convenience. Named positions can be used in place of *x* and *y* coordinates on the **drop** property. The following named positions are currently defined:

- center
- top
- bottom
- left
- right
- topleft
- topright
- bottomleft
- bottomright

The following sample slide helps to clarify these concepts:

```md
<grid drag="40 30" drop="topleft" bg="red">
Top Left
</grid>

<grid drop="right" bg="green">
Right with default size
</grid>

<grid drag="80 30" drop="bottom" bg="coral">
Bottom
</grid>
```

![Example](https://mszturc.github.io/obsidian-advanced-slides/images/grid-basic2.png)

{{%alert%}}When drap property is not specified, grid component uses a default size of **50 100**{{%/alert%}}

### Flow

The following syntax is used to define a custom flow for a grid:

	<grid drag="width height" drop="x y" flow="col | row">

Using a value of **col** or **row** for the **flow** property defines the layout behavior for the grid. If the flow property is not specified then the grid automatically inherits the default *col* flow behavior.

#### Column Flow

When `flow="col"` the following layout and spacing behaviors occur within the grid:

- Children are rendered vertically within the grid
- An equal amount of space is injected between each child
- An equal amount of space is injected at the start and end of the grid

The following sample slide helps to clarify these concepts:

```md
<grid  drag="40 100" drop="center" bg="coral" flow="col">
Heading
![[Image.jpg]]
**Lorem Ipsum** is simply dummy text
</grid>
```

![Example](https://mszturc.github.io/obsidian-advanced-slides/images/grid-flow1.png)

#### Row Flow

When `flow=row` the following layout and spacing behaviors occur within the grid:

- Children are rendered horizontally within the grid.
- An equal amount of space is injected between each child
- An equal amount of space is injected at the start and end of the grid

The following sample slide screenshot helps to clarify this concept. Note, the sample block width here is 100% of the slide width:

The following sample slide helps to clarify these concepts:

```md
<grid  drag="40 100" drop="center" bg="coral" flow="col">
Heading
![[Image.jpg]]
**Lorem Ipsum** is simply dummy text
</grid>
```

![Example](https://mszturc.github.io/obsidian-advanced-slides/images/grid-flow2.png)

### Attributes

#### Background

The grid bg property is used to define a custom background for a grid. Children added to the grid are rendered on top of the background.

	<grid  drag="width height" drop="x y" bg="color">

Where the color option of the **bg** property takes any valid [CSS Color Value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). The following sample demonstrates color backgrounds:

```md
<grid  drag="55 50" drop="topleft" bg="orange">

### Make
</grid>

<grid  drag="55 50" drop="bottomright" bg="rgb(0,0,0)">

### Noise
</grid>

<grid  drag="25 20" drop="center" bg="green" rotate="-15">

### some
</grid>
```

![Example](https://mszturc.github.io/obsidian-advanced-slides/images/grid-bg.png)

#### Border

The grid border property is used to define a custom border for a grid section. Custom borders can help to highlight or differentiate grids on your slide.

	<grid  drag="width height" drop="x y" border="width style color">

Where the **width** option of the **border** property takes values of *thin*, *medium*, *thick* or a pixel value such as **10px**. The style option takes values of *dotted*, *solid*, *dashed*, *inset*, or *outset*. And the **color** option takes any valid [CSS Color Value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).

The following sample demonstrates borders:

```md
<grid  drag="30 25" drop="left" border="thick dotted blue">
thick dotted blue
</grid>

<grid  drag="30 25" drop="center" border="4px solid white">
20px solid white
</grid>

<grid  drag="30 25" drop="right" border="medium dashed red">
thick dotted blue
</grid>
```

![Example](https://mszturc.github.io/obsidian-advanced-slides/images/grid-border.png)

#### Animation

The grid animate property is used to define a slide animation a grid section. The animation applies to the grid and all associated children.

	<grid  drag="width height" drop="x y" animate="type speed">


Where the **type** option of the **animate** property can take one of the following animation types:

- fadeIn
- fadeOut
- slideRightIn
- slideLeftIn
- slideUpIn
- slideDownIn
- slideRightOut
- slideLeftOut
- slideUpOut
- slideDownOut
- scaleUp
- scaleUpOut
- scaleDown
- scaleDownOut

{{%alert%}}The **speed** option is optional. When specified it accepts a value of slower or faster.{{%/alert%}}

#### Padding

The grid **pad** property is used to define custom padding for grid. Custom padding can help to enhance the overall appearance of content by controlling the space around grid children.

	<grid  drag="width height" drop="x y" pad="top right bottom left">

Where the **top**, **right**, **bottom**, and **left** options on the **pad** property all take pixel size values. Following standard [CSS Padding Rules](https://developer.mozilla.org/en-US/docs/Web/CSS/padding) these four options can also be specified with just two values or even a single value, for example:

	<grid  drag="width height" drop="x y" pad="10px 15px">

This sample grid above would display with 10px padding top and bottom and 15px padding left and right. The following sample demonstrates padding:

```md
<grid  drag="50 50" drop="topleft" bg="orange" pad="0 50px">

###### Lorem Ipsum wasnt simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book here there
</grid>

<grid  drag="50 50" drop="bottomright" bg="orange" pad="20px">
![[Image.jpg|800]]
</grid>
```

![Example](https://mszturc.github.io/obsidian-advanced-slides/images/grid-pad.png)

{{%alert%}}Padding introduced by this property does not increase the size of the grid itself. Rather it reduces the size of the area available to render children within the grid.{{%/alert%}}

### Reference

This guide provides a quick reference to the full set of attributes that can be set on grid component:

- **drag**="width height"
- **drop**="x y | topleft | top | topright | left | center | right | bottomleft | bottom | bottomright"
- **flow**="col | row"
- **bg**="color name | #425232 | rgb(255, 99, 71) | hsl(0, 100%, 50%)"
- **pad**="all  sides | top bottom | top right bottom left"
- **border**="width style color"
- **animate**="fadeIn | fadeOut | slideRightIn | slideLeftIn | slideUpIn | slideDownIn | slideRightOut | slideLeftOut | slideUpOut | slideDownOut | scaleUp | scaleUpOut | scaleDown | scaleDownOut | slower | faster"
- **opacity**="0.1...1"
- **rotate**="0...360"
- **filter**="blur | bright | contrast | grayscale | hue | invert | saturate | sepia"
- **frag**="1"
- **style**="\<any\>"
- **class**="\<any\>"
