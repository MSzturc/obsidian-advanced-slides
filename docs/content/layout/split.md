+++
title = "Split Component"
description = ""
weight = 1
+++

By using the `<split>` tag you are able to split the content of your slide in rows and columns

### Attributes

#### even

By setting the even attribute the Content of the split element gets divided evenly:

```md
<split even>

![](https://picsum.photos/id/1005/250/250) 
![](https://picsum.photos/id/1010/250/250) 
![](https://picsum.photos/id/1025/250/250) 
</split>
```
**Example:** In a split with 3 children every child takes 1/3 of the availible width of the slide

#### gap

By adding the gap attribute there will be a gap between each element:

```md
<split even gap="3">

**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s

when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap

into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
</split>
```
**Example:** In this split is a gap of 3em between each element

#### left & right

If you want to split a slide proportionally you can do that with left and right attributes. Left and right represent the proportions of the slide columns:


```md
<split left="2" right="1" gap="2">

**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
	
into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
</split>
```

**Example:** In this split the left elements width is twice as big as the width of the right element


#### wrap

By adding a wrap attribute you can define after how many children an new row should start:

```md
<split wrap="4">

![](https://picsum.photos/id/1010/250/250) 

![](https://picsum.photos/id/1011/250/250) 

![](https://picsum.photos/id/1012/250/250) 

![](https://picsum.photos/id/1013/250/250) 

![](https://picsum.photos/id/1014/250/250) 

![](https://picsum.photos/id/1015/250/250) 
</split>
```

**Example:** This split has 2 rows. The first one has 4 pictures in it, the second one the other 2.

### no-margin

By adding no margin attribute automatic gaps between rows and column gets removed:

```md
<split no-margin>

![](https://picsum.photos/id/1001/250/250) 
![](https://picsum.photos/id/1002/250/250) 
![](https://picsum.photos/id/1003/250/250) 
![](https://picsum.photos/id/1004/250/250) 
![](https://picsum.photos/id/1005/250/250) 
![](https://picsum.photos/id/1006/250/250) 
![](https://picsum.photos/id/1009/250/250) 
![](https://picsum.photos/id/1008/250/250) 
</split>
```
**Example:** This split has no gaps between rows and columns.


## Split Component in Action

{{<revealhtml theme="black" progress="true" controls="true">}}

<section><split even="">

<p><img src="https://picsum.photos/id/1005/250/250" alt=""> 
<img src="https://picsum.photos/id/1010/250/250" alt=""> 
<img src="https://picsum.photos/id/1025/250/250" alt=""> 
</p>
</split></section>

<section><split even="" gap="3">

<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
<p>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not</p>
<p>into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
</p>
</split></section>

<section><split left="2" right="1" gap="2">

<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap</p>
<p>into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
</p>
</split></section>

<section><split wrap="4">

<p><img src="https://picsum.photos/id/1010/250/250" alt=""> </p>
<p><img src="https://picsum.photos/id/1011/250/250" alt=""> </p>
<p><img src="https://picsum.photos/id/1012/250/250" alt=""> </p>
<p><img src="https://picsum.photos/id/1013/250/250" alt=""> </p>
<p><img src="https://picsum.photos/id/1014/250/250" alt=""> </p>
<p><img src="https://picsum.photos/id/1015/250/250" alt=""> 
</p>
</split></section>

<section><split no-margin="">

<p><img src="https://picsum.photos/id/1001/250/180" style="margin: 0" alt=""> 
<img src="https://picsum.photos/id/1002/250/180" style="margin: 0" alt=""> 
<img src="https://picsum.photos/id/1003/250/180" style="margin: 0" alt=""> 
<img src="https://picsum.photos/id/1004/250/180" style="margin: 0" alt=""> 
<img src="https://picsum.photos/id/1005/250/180" style="margin: 0" alt=""> 
<img src="https://picsum.photos/id/1006/250/180" style="margin: 0" alt=""> 
<img src="https://picsum.photos/id/1009/250/180" style="margin: 0" alt=""> 
<img src="https://picsum.photos/id/1008/250/180" style="margin: 0" alt=""> 
</p>
</split></section>

{{</revealhtml>}}
