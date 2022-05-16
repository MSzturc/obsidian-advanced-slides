+++
title = "Charts support"
description = ""
weight = 14
+++

Advanced Slides allows to add charts using [Obsidian Charts](https://charts.phibr0.de/) plugin syntax or [Reveal.js Charts](https://github.com/rajgoel/reveal.js-plugins/tree/master/chart#usage) syntax.

#### Obsidian Charts Example:

{{%alert%}}Currently the following features are not supported:
- [Dataview Integration](https://charts.phibr0.de/Dataview%20Integration)
- [Chart from Table](https://charts.phibr0.de/Chart%20from%20Table)
{{%/alert%}}


```md
```chart
    type: bar
    labels: [Monday,Tuesday,Wednesday,Thursday,Friday, Saturday, Sunday, "next Week", "next Month"]
    series:
      - title: Title 1
        data: [1,2,3,4,5,6,7,8,9]
      - title: Title 2
        data: [5,4,3,2,1,0,-1,-2,-3]
    ```
```

You can find more examples in the [Obsidian Charts Dokumentation](https://charts.phibr0.de/Chart%20Types/)

#### Reveal.js Charts Example

```md
<canvas data-chart="line" >
<!--
{
 "data": {
  "labels": ["January"," February"," March"," April"," May"," June"," July"],
  "datasets":[
   {
    "data":[65,59,80,81,56,55,40],
    "label":"My first dataset","backgroundColor":"rgba(20,220,220,.8)"
   },
   {
    "data":[28,48,40,19,86,27,90],
    "label":"My second dataset","backgroundColor":"rgba(220,120,120,.8)"
   }
  ]
 }
}
-->
</canvas>
```
You can find more examples in the [Reveal.js Charts Dokumentation](https://github.com/rajgoel/reveal.js-plugins/tree/master/chart#usage)

