---
layout: post
section: Notes
title:  "Classification"
permalink: /notes/:title
img_path: \static\study_notes\machine_learning\coursera_ML\
---

## Binary classification
- <mark>Def</mark>: $$y$$ can take on only two possibile values: $$0$$ and $$1$$
  - 0 = negative class
  - 1 = positive class

- **Label** = the $$y^(i)$$ that corresponds to a given sample of $$x^(i)$$ features

### Hypothesis representation
- Since the y-values are discrete, we know that our hypothesis must satisfy $$0\leq h(x)\leq 1$$
  - This is accomplished by pluggin $$h(x)=\theta^Tx$$ into the **logistic function**, aka **sigmoid function**:

$$
\begin{equation}
  \boxed{
    h_{sigmoid} = g(z) = \frac{1}{1+e^{-z}}
  }
\end{equation}
$$

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
where $$z = \theta^Tx$$, the nonbounded hypothesis.

![sigmoid function]({{ page.img_path }}sigmoid.png)
<img-cred>Andrew Ng | Coursera</img-cred>

- The sigmoid funtion <mark>maps any real number to the interval (0,1)</mark>, as shown in the graph
  - e.g.) $$h_{sigmoid}(x)=0.7 \rightarrow$$ there is 70% **probability** that the output has label 1

$$
\begin{equation}
  P(y=0 | x;\theta) + P(y=1 | x;\theta) =1
\end{equation}
$$

### Decision boundary
- In order to get our discrete 0 or 1 classification, we can translate our sigmoid output as follows:

$$
\begin{aligned}
  h_{sigmoid}(x) \geq 0.5 \rightarrow y=1\\
  h_{sigmoid}(x) < 0.5 \rightarrow y=0
\end{aligned}
$$

- Logistic function $$g(z)$$ behaves s.t. when $$x\geq 0$$, $$g(z) \geq 0.5$$
  - Thus, we can conclude:

$$
\begin{equation}
  \theta^Tx \geq 0 \rightarrow y=1\\
  \theta^Tx <> 0 \rightarrow y=0
\end{equation}
$$

- **Decision boundary** = the line that separates the areas where $$y=0$$ vs $$y=1$$
  - This boundary is created by our hypothesis function

***

## Logistic regression
### Cost function
- Logistic function is not a convex function $$\rightarrow$$ multiple local optima $$\rightarrow$$ cannot use linear regression $$\rightarrow$$ new **cost function for logistic regression**:

$$
\begin{equation}
  J(\theta)=\frac{1}{m}\sum_{i=1}^mCost(h_{sigmoid}(x^{(i)}),y^{(i)})
\end{equation}
$$

$$
\begin{aligned}
  \text{where} 
  \begin{cases}
    Cost(h_{sigmoid}(x), y) &= -\log(h_{sigmoid}(x)) \text{  if  } y=1\\
    Cost(h_{sigmoid}(x), y) &= -\log(1-h_{sigmoid}(x)) \text{  if  } y=0
  \end{cases}
\end{aligned}
$$

$$
\begin{equation}
  \downarrow \small\text{combining the two cases into one equation}\\
\end{equation}
$$

$$
\begin{aligned}
  \boxed{
    J(\theta)=-\frac{1}{m}\sum_{i=1}^m\left[y^{(i)}\log(h_{sigmoid}(x^{(i)})) +
    (1-y^{(i)})\log(1-h_{sigmoid}(x^{(i)})) \right]
  }
\end{aligned}
$$

- Notice:
  - When $$y=0$$, the first term becomes zero
  - When $$y=1$$, the second term becomes zero

- Vectorized:

$$
\begin{aligned}
  h &= g(X\theta)\\
  J(\theta) &= \frac{1}{m}\left(-y^T\log(h_{sigmoid})-(1-y)^T\log(1-h_{sigmoid})\right)
\end{aligned}
$$

- Plotting $$h_{sigmoid}(x)$$ vs. $$J(\theta)$$
![sigmoid hypothesis vs cost]({{ page.img_path }}sigmoid_cost.png)
<img-cred>Andrew Ng | Coursera</img-cred>
  - For $$y=1$$, the cost decreases as $$h(x)\rightarrow 1$$
  - For $$y=0$$, the cost decreases as $$h(x)\rightarrow 0$$

### Gradient descent
- Recall the general form of gradient descent:

$$
\begin{aligned}
  &\small\text{Repeat}\{\\
  &\theta_j := \theta_j-\alpha\frac{\partial}{\partial\theta_j}J(\theta)\\
  &\}
\end{aligned}
$$

- If you take partials of the cost function above, you end up with the same formula from linear regression:

$$
\begin{aligned}
  &\small\text{Repeat until convergence} \normalsize\{\\
    &\theta_j := \theta_j-\alpha\frac{1}{m}\sum_{i=1}^m\left[(h_{\theta}(x_i)-y_i)x_i\right]\\
  &\}\\[10pt]
\end{aligned}
$$

$$
\begin{equation}
  \downarrow \small\text{vectorized}\\[10pt]
\end{equation}
$$

$$
\begin{equation}
  \theta := \theta-\frac{\alpha}{m}X^T\left[g(X\theta)-y\right]
\end{equation}
$$

### Multiclass classification
- Instead of having $$y=\{0,1\}$$, we now have $$y=\{0,1,...,n\}$$
  - So we divide our problem into <mark>n+1 binary classification problems</mark>
  - (n+1 because $$y$$ starts at 0)

- **One-vs-all** (aka one-vs-rest)
  1. Choose one class (i.e. one $$y$$ label)
  2. Lump all other labels into a single second class
  3. Do this repeatedly, applying binary logistic regression to each case
  4. Use the hypothesis that returns the highest probability as our prediction

<img src="{{ page.img_path }}multiclass1.png">\\
<img src="{{ page.img_path }}multiclass2.png" height="150">
<img-cred>Andrew Ng | Coursera</img-cred>
  
- To summarize:
  - To *train* your $$n$$ different classifiers:
    1. Find $$h(x)$$ for the label you have chosen
    2. Plug into the sigmoid function to transform it into a probability value
  - Then, to *predict* which class the test data belongs to:
    1. Plug the test data into all trained logistic regression classifiers
    2. The classifier that results in the highest probability is the right class