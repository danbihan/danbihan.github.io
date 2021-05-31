---
layout: post
section: Notes
title:  "Intro & Regressions"
permalink: /notes/:title
img_path: \static\study_notes\machine_learning\coursera_ML\
---

## Introduction
### What is machine learning?
- **Older def**: The field of study that gives computers the ability to learn without being explicitly programmed
- **Newer def**: A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E

### Supervised learning
- <mark>Def</mark>: The algorithm is given a dataset in which the correct output and the relationship between the intput and the output are given
  - The task of the algorithm is to produce more right answers  

- Types of supervised learning problems:
  - **Regression** = trying to predict a continous value output (e.g. price)
  - **Classification** = trying to predict a discrete value output (e.g. 0 for malignant vs. 1 for benign tumor)
    - Sometimes, you can have more than two possible values of output

### Unsupervised learning
- <mark>Def</mark>: Algorithm is given a dataset and not told what to do with it / what each data point represents
  - The task of the algorithm is to find some structure
  - No feedback based on the prediction results
  - One type of unsupervised learning: **clustering**
- Applications:
  - Organize large computer clusters (i.e. which machines tend to work together)
  - Social network analysis (i.e. which groups of people all know each other)
  - Market segmentation (ie.e. group customers)
    
***

## Univariate linear regression

$$h_{\theta}(x) = \theta_{0}+\theta_{1}x$$

- h maps from x to y
  - Predicting that y is a linear function of x:  
  - Training set $$\rightarrow$$ learning algorithm $$\rightarrow$$ hypothesis (h)

### Cost function
For linear regression, to choose the parameter values, we need to solve a cost-minimization problem:

$$\min_{\theta_0, \theta_1} J(\theta_0, \theta_1) $$

where the cost function represents the **mean squared error**:

$$
\boxed{
  J(\theta_0, \theta_1) = \frac{1}{2m}\sum_{i=1}^m (h_{\theta}(x^{(i)})-y^{(i)})^2
}
$$

- The $$\frac{1}{2m}$$ is in the front $$\rightarrow$$ takes the average + makes the math easier

### Gradient descent
![gradient descent]({{ page.img_path }}gradient_desc.png)
<img-cred>Andrew Ng | Coursera</img-cred>

- We find the absolute minimum by taking the <mark>derivative</mark> of our cost function
  - We want to step down the cost function in the direction of the <mark>steepest descent</mark> $$\rightarrow$$ the direction of the downwards step is determined by the negative partial derivative of J
  - The size of each step is dtermined by the parameter, **learning rate** ($$\alpha$$)
    - In the graph above, the distance between each star = a step
    - Smaller $$\alpha \rightarrow$$ smaller step
  - Depending on where you start on the graph, you could end up at different points
    - The above shows two different start and end points

- The **gradient descent algorithm**:
  - Repeat until convergence {\\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    $$\boxed{\theta_j := \theta_j-\alpha\frac{\partial}{\partial\theta_j}J(\theta_0,\theta_1)}$$\\
    }
  - Be sure to <mark>simultaneously update all parameters</mark> at each $$j^{th}$$ iteration (or else you are using non-matching parameters to calculate your partials):
    
  <img src="{{ page.img_path }}gradient_desc_update.jpg" width="200">
  <img-cred>Andrew Ng | Coursera</img-cred>

- **Convergence**: As we approach a minimum, $$\frac{\partial}{\partial\theta_j}(\theta_0, \theta_1)\rightarrow 0$$
  - We adjust $$\alpha$$ to ensure that the gradient descent algorithm converges in a reasonable time.
    - Failing or taking too much time to converge implies that our step size is wrong:

![step size]({{ page.img_path }}step_size.png)
<img-cred>Andrew Ng | Coursera</img-cred>

- Gradient descent for linear regression:
<img src="{{ page.img_path }}gr_linear_reg.png" height="150">
<img-cred>Andrew Ng | Coursera</img-cred>
  - Reminders:
    - $$m$$ = size of training set
    - $$\theta_0$$ updates simultaneously with $$\theta_0$$
    - $$x_i, y_i$$ = values of the training set (aka the data)
  - Start with a guess for our hypothesis $$\rightarrow$$ repeatedly apply the gradient descent equation $$\rightarrow$$ our hypothesis will become more and more accurate

- **Batch gradient descent** = uses all the training data on every step

***

## Multivariate linear regression
- Hypothesis function with multiple features:
<img src="{{ page.img_path }}multiple_reg1.png" height="40">
<img src="{{ page.img_path }}multiple_reg2.png" height="100">
<img-cred>Andrew Ng | Coursera</img-cred>

- Gradient descent for multivariate:
<img src="{{ page.img_path }}multiple_reg_gr.png" height="100">
<img-cred>Andrew Ng | Coursera</img-cred>
  - $$x_0^{(i)}=1$$ (aka the intercept)

### Speeding up gradient descent
- We can speed up gradient descent by having each of our input values in roughly the same range
  - Why? $$\theta$$ descends quickly on small ranges and slowly on large ranges. When the variables are very uneven, it will oscillate inefficiently down to the optimum
- Two techniques to help put variables roughly in the same range:
  - **Feature scaling** = $$\frac{\text{input values}}{\text{range of the input variable}} \rightarrow \text{new range} = 1 $$ 
    - Instead of range, standard deviation is often used
  - **Mean normalization** = $$\text{input values} - \text{avg} \rightarrow \text{new range} = 0$$ 
    - Putting them together:

$$
\begin{equation}
  \boxed{
  x_i := \frac{x_i-\mu_i}{s_i}
  }
\end{equation}
$$

### Learning rate
- Debugging gradient descent
![debug step size]({{ page.img_path }}check_step_size.png)
<img-cred>Andrew Ng | Coursera</img-cred>
  - <mark>If the learning rate is sufficiently small, the MSE will decrease on every iteration</mark>
  - If the MSE ever increases, you need to decrease $$\alpha$$, the step size

- Summary
  - $$\alpha$$ is too small $$\rightarrow$$ slow convergence
  - $$\alpha$$ is too large $$\rightarrow$$ error may not decrease on every iteration and thus the algorithm might not converge

### Polynomial regression
- We can change the behavior of our curve by...
  - Letting $$h(x)$$ be quadratic, cubic, etc.
  - Combining multiple features into one (e.g. $$x_1$$ and $$x_2 \rightarrow x_1x_2=x_3$$)
- Here, feature scaling becomes extremely important

***

## Normal equation
Gradient descent gives one way of minimizing the cost function, $$J$$. The normal equation is another minimization method, where we can <mark>explicitly solve for the optimum</mark> without depending on an iterative algorithm.

$$
\begin{equation}
  \boxed{
    \theta = (X^TX)^{-1}X^Ty
  }
\end{equation}
$$

- Normal equation
  - Finds the optimum values of $$\theta$$ by taking the derivatives of $$J$$ wrt the $$\theta$$s and setting them equal to zero
  - When $$X^TX$$ is not invertible, use the pseudoinverse

- Comparing to gradient descent
  - No need to do feature scaling!
  - But when $$n$$ is large (i.e. a lot of features), the normal equation will be slow due to the inverse computation
    - <mark>When n > 10,000, use gradient descent</mark>