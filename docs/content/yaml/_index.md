+++
title = "Frontmatter Options"
description = ""
weight = 7
alwaysopen = false
pre ="<i class='fa fa-hashtag' ></i> "
+++

You can customize many setting for your current slide deck by adding one or more of the following properties into the frontmatter section of your slide:

Name | Description | Possible Values | Default Value
------------ | ------------ | ------------ | ------------
width | Sets the width of the presentation | number | 960
height | Sets the width of the presentation | number | 700:
margin | Empty space around the content | number | 0.04:
minScale | Bounds for smallest possible scale to apply to content | number | 0.2
maxScale | Bounds for largest possible scale to apply to content | number | 2.0
notesSeparator | Sets the note delimiter | string | note:
separator | Sets the slide separator | string | ^( ?\| )---( ?\| )$
verticalSeparator | Sets the vertical slide separator | string | ^( ?\| )--( ?\| )$
enableLinks | Enable backlinks in slides | true / false | false
theme | Sets the theme | [see theme docs]({{%relref "themes"%}}) | black
highlightTheme | Sets the highlight theme | [see theme docs]({{%relref "themes"%}}) | zenburn
css | Adds further css files |  | []
enableOverview | Shows the Overview Button on the bottom right corner of the slide | true / false | false
enableChalkboard | Activates the chalkboard for slides | true / false | false
controls | Display presentation control arrows | true / false | true
controlsLayout | Determines where controls appear | edges / bottom-right | bottom-right
progress | Display a presentation progress bar | true / false | true
slideNumber | Display the page number of the current slide | [see reveal.js docs](https://revealjs.com/config/) | false
overview | Enable the slide overview mode | true / false | true
center | Vertical centering of slides | true / false | true
loop | Loop the presentation | true / false | false
rtl | Change the presentation direction to be RTL | true / false | false
shuffle | Randomizes the order of slides each time the presentation loads | true / false | false
fragments | Turns fragments on and off globally | true / false | true
showNotes | Flags if speaker notes should be visible to all viewers | true / false | false
autoSlide | Controls automatic progression to the next slide | number (in milliseconds) | 0
transition | Transition style | none / fade / slide / convex / concave / zoom | slide
transitionSpeed | Transition speed | default / fast / slow | default
bg | Sets a default background for all slides | [see slide background docs]({{%relref "slideBackground"%}}) | '#ffffff'
markdown | Sets options for marked | (see note below) | (see note below)
enableTimeBar | Activates elapsing timer bar for slides | true / false | false
timeForPresentation | Sets the time for elapsing timer in seconds | number | 120
defaultTemplate | Sets a template that will be applied to all slides | [see template docs]({{%relref "templates/_index.md#default-template"%}}) | null
<br>

{{%alert%}}You can find more possible parameters [here](https://revealjs.com/config/){{%/alert%}}

{{%alert%}}
[marked](https://marked.js.org/) is the Markdown parser used by reveal.js.
The complete set of marked options is [here](https://marked.js.org/using_advanced#options).

The default value of `markdown`:
```yaml
markdown:
  gfm: true
  mangle: true
  pedantic: false
  smartLists: false
  smartypants: false
```

Other marked options exist, but should not be used with the Advanced Slides plugin.
{{%/alert%}}
