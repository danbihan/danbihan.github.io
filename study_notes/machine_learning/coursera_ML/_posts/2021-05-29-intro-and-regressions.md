---
layout: post
section: Notes
title:  "Intro & Regressions"
permalink: /notes/:title
---

## Formatting text
### Tags to use
The section titles should be written using the `h2` (blue) tags.  
The subsection titles should be written using `h3` (red) tags.  

Other tags, including from `h4` to `h6`, should not be used since they have not been styled in `post.scss`.

To <mark>highlight</mark> text, use `<mark>...</mark>`.  

### Spacing
To break into a new line, you can either double space + enter.  
To create an empty line, skip an entire line in the markdown (note: doing both does _not_ create two line breaks.)

### Lists
Bulleted lists can be created using hyphens:
- Item 1
  - Subitem 1
    - Sub-subitem 1

Listst can also be ordered:
1. Item 1
2. Item 2
  1. Subitem 1

### Centering 
To center text, wrap it around using `<p align="center">...</p>`:  
<p align="center">This text should be centered</p>

***

## Formatting code
To write inline code, use single backticks: `var = 1+1`

To write a code block, use triple backticks, followed by the name of the language:
```python
var = 1+1
print(var)
```

***

## Formatting equations
To write multiple lines of equations, use double `$$` with `\begin{align}`. Be sure to include an empty line above:  

$$
\begin{align}
  \frac{1}{2} + x &= \frac{3}{2} \\
  x &= 1
\end{align}
$$

To increase the vertical spacing between the equations, add `[#pt]` at the end of the line:

$$
\begin{aligned}
  \frac{1}{2} + x &= \frac{3}{2} \\[10pt]
  x &= 1
\end{aligned}
$$

To box equations, use `\boxed{}`:

$$\boxed{u=1}$$

$$
\begin{equation}
  \boxed{
    \begin{array}{rcl}
    x + -y + z -t & = & 0 \\
    2x + 2y + 2z +3t & = & 0
    \end{array}
  }
\end{equation}
$$

***

## Resources
For more Markdown features, [click here](https://guides.github.com/features/mastering-markdown/).