---
layout: post
section: Notes
title:  "Notes Template"
permalink: /notes/:title
img_path: \static\study_notes\subject\subtopic\
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

In HTML, use the following tag: `<code class="language-plaintext highlighter-rouge">...</code>`

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

## Others
### Indentation

Use 8 nonbreaking white spaces to indent to the first bullet when needed: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`

### Images
To include images, use the following syntax: `![img description](path\to\image.png)`  

To manually size the image, use the HTML syntax: `<img src="{{ page.img_path }}gradient_desc_update.png" width="200">`  

To credit the iamge, use the `img-cred` tag.

### Two-column layout
Take advantage of HTML to create a two-column layout:

<div class="row">
    <div class="col-md-6">
      insert content
    </div>
    <div class="col-md-6">
      insert content
    </div>
</div>

### Tables
To create a table in markdown, use the following format:

| col_header_1 | col_header_2 |
|--------------|--------------|
| col_1_row_1 | col_2_row_1 |
| col_1_row_2 | col_2_row_2 |

In the two-column layout, use HTML instead of markdown to create the table:

<table class="table table-sm table-bordered">
  <thead class="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
    </tr>
  </tbody>
</table>

### Resources
For more Markdown features, [click here](https://guides.github.com/features/mastering-markdown/).