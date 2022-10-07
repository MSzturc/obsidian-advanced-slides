+++
title = "Templates"
description = ""
weight = 5
alwaysopen = false
pre ="<i class='fa fa-code' ></i> "
+++

Advanced Slides allows you to design individual slides based on slide templates. Each slide template can have a unique layout and structure that you can draw upon repeatedly over the presentation. Using slide templates makes creating presentations that use different layout formats across different slides easy and fast. Also, slide templates reduce redundant code (aka boilerplate code) in your md presentation document. 

### Example: Using a simple slide template

The following slide template defines a slide structure that has a main content area as well as a footer. It shall be named `tpl-footer` and can be stored as a regular md note anywhere within the Obsidian vault you are using to make the presentation.

```
<% content %>

<grid drag="100 6" drop="bottom">
<% footer %>
</grid>
```
Once we have created this slide template we can reference it in our presentation by making a slide annotation in the following manner:

#### How to use templates

```
<!-- slide template="[[tpl-footer]]" -->

# This header will be part of the content section defined in the template

Everything define outside a block will be placed in the content section.
Therefore every template has to contain at least a content variable.

To place a text into the footer section you have to create a block comment with the name of the variable you defined in the template.

::: footer
#### This header will be placed in the footer section of the template
:::
```

Note that every template _must_ contain a `<% content %>` variable _even if it is not used_ in the slide content.


### Optional Variables

By default, every variable in a slide template has to be set by a block comment in the slide. Otherwise, a dummy text will be placed into the variable that reminds you to create a block comment for this variable. But there are scenarios where you don't want this behaviour, such as when you have a citation line in the footer of your template, but you don't need to reference any citations. Therefore you can create a section in the template and add a `?` in its definition:

```
<% content %>

<grid drag="100 6" drop="bottom">
<%? footer %>
</grid>
```

The footer markup won't be visible until you create a footer block comment inside of your slide.


### Advanced example

The following slide template is called `tpl-con-2-1-box`. It creates a slide structure with a narrow header bar at the top end of the slide, 2 broad  columns at the center of the slide as well as a footer bar with a citation line in the bottom of the slide.

```
<grid drag="100 10" drop="top" bg="white" align="left" pad="0 20px">
 <% title %>
</grid>

<grid drag="28 75" drop="69 15" bg="white" style="border-radius:15px"/>

<grid drag="64 70" drop="3 15" align="topleft">

<% left %>

</grid>

<grid drag="26 71" drop="70 17" align="topleft">

<% right %>

</grid>

<% content %>

<style>
.horizontal_dotted_line{
  border-bottom: 2px dotted gray;
} 
} 
</style>

<grid drag="94 0" drop="3 -6" class="horizontal_dotted_line">
</grid>

<grid drag="100 30" drop="0 64" align="bottomleft" pad="0 30px" >
<%? source %>
</grid>

<grid drag="100 6" drop="bottom">
###### © 2022 Advanced Slides<!-- element style="font-weight:300" -->
</grid>

```

### Using templates in a presentation

```
---
theme: consult
height: 540
margin: 0
maxScale: 4
---
<!-- slide template="[[tpl-con-2-1-box]]" -->

::: title
### _**This is the Title of this Slide**_
:::

::: left
![[Image.jpg|1500]]
:::

<style>
.small-indent > ul { 
   padding-left: 1em;
}
</style>

::: right
**Header #1**
- Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
- tium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequa
- augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit a
- Nam quam nunc
Umsetzungsschritte
**Header #2**
- Curabitur
- condimentum
- Maecenas
**Header #3**
- justo
- rhoncus
- semper

:::<!-- element align="left" style="font-size: 13px;" class="small-indent" -->

::: source
###### Source: Copied from Lorem ipsum dolor Generator
:::

```

### The rendered Slide

![Slide](https://mszturc.github.io/obsidian-advanced-slides/images/templateSlide.png)


### Default Template
You can define a default Template that will be applied to all slides of a deck by adding the `defaultTemplate` frontmatter property to your yaml:

```
---
defaultTemplate: "[[tpl-footer]]"
---
```