+++
title = "Mermaid"
description = ""
weight = 13
+++


```md
---
theme: beige
highlightTheme: css/vs2015.css

---

```mermaid
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
    ```
```

![Mermaid](https://mszturc.github.io/obsidian-advanced-slides/images/mermaid.png)

```md
---
theme: beige
highlightTheme: css/vs2015.css
---

#### Gitgraph Diagrams support

```mermaid
    gitGraph
       commit
       commit
       branch develop
       checkout develop
       commit
       commit
       checkout main
       merge develop
       commit
       commit
    ```
```
![Gitgraph](https://mszturc.github.io/obsidian-advanced-slides/images/gitgraph.png)