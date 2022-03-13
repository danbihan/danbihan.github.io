---
layout: post
section: Notes
title:  "Statistics"
permalink: /notes/:title
img_path: \static\study_notes\others\ds_interview_prep\
---

## Lime
### Unbiased estimator

***

## Facebook
### Ad raters
<a class=source href="https://www.interviewquery.com/questions/ad-raters">Interview Query</a>

Suppose we ask users to rate ads as "good" vs "bad." There are 2 types of raters:
- 80% of the users are `careful` raters, who have a 60% probability of rating an ad as good.
- 20% of the users are `lazy` raters, who rate every ad as good.

Questions:

1. Suppose 100 users rate 1 ad, independently. What is the expected number of good ads?
2. Suppose 1 user rate 100 ads. Now what is the expected number of good ads?
3. Suppose we have an ad rated as bad. What is the probability that the rater was lazy?

My solutions:

1. Let G and R be random variables representing the number of good ads and type of raters, respectively. According to the **law of iterated expectation** (i.e. law of total expectation; LIE), we know:

$$
\begin{aligned}
  \mathbb{E}(G) &= \mathbb{E}(\mathbb{E}(G|R))\\
  &= \mathbb{E}(G|R=careful)\cdot\mathbb{P}(R=careful) + \mathbb{E}(G|R=lazy)\cdot\mathbb{P}(R=lazy)\\
  $= \mathbb{P}(G=g|R=careful)g
  &= [0.6(0.8) + 1(0.2)]100\\
  &= 68
\end{aligned}
$$