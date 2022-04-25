+++
title = "Templates"
description = ""
weight = 5
alwaysopen = false
pre ="<i class='fa fa-code' ></i> "
+++

Advanced Slides comes with a template language that lets you create slides based on templates.

With templates, you are be able to create layouts and structures that could be used in multiple slides and therefore reduce boilerplate code.

### Quick Example

The following template file named `tpl-footer` defines an slide structure with a main content area and a footer:

```
<% content %>

<grid drag="100 6" drop="bottom">
<% footer %>
</grid>
```
To use our new created template we simply reference it in an slide annotation:

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

### Optional Variables

By default every variable in a template has to be set by a block comment in the slide. Otherwise there will be placed a dummy text into the variable that reminds you to create a block comment for this variable. But there are szenarios where you dont want this behaviour (ex. when you have a citation line in the footer of your template and the has no references you want to notice). Therefore you can create a section in the template and add a `?` in it's definition:

```
<% content %>

<grid drag="100 6" drop="bottom">
<%? footer %>
</grid>
```

The footer markup won't be visible until you create a footer block comment inside of your slide.


### Advanced example

this template will create a slide with a header bar ontop, 2 columns where we place content and a footer bar in the bottom with a citation line over it.

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

### Template in Action

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


