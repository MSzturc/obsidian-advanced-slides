+++
title = "Frontmatter Options"
description = ""
weight = 5
alwaysopen = false
pre ="<i class='fa fa-hashtag' ></i> "
+++

You can customize many setting for your current slide deck by adding one or more of the following properties into the frontmatter section of your slide:

Name | Description | Possible Values | Default Value
------------ | ------------ | ------------ | ------------
theme | Sets the theme | [see theme docs]({{%relref "themes"%}}) | black
highlightTheme | Sets the highlight theme | [see theme docs]({{%relref "themes"%}}) | zenburn
css | Adds further css files |  | []
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
transition | Transition style | none / fade / slide / convex / concave / zoom | true
transitionSpeed | Transition speed | default / fast / slow | default
