---
layout: post
section: Notes
title:  "Regularization"
permalink: /notes/:title
img_path: \static\study_notes\machine_learning\coursera_ML\
---

## Overfitting the data
- Adding more features $$\rightarrow$$ danger of overfitting
<img src="{{ page.img_path }}overfitting.png" height="150">
<img-cred>Andrew Ng | Coursera</img-cred>
  - **Underfitting** (left) = model does not capture the structure of the data
    - Leads to <mark>high bias</mark>
    - Caused by a function that is too simple or uses too few features
  - **Overfitting** (right) = model fits the data but does not generalize to predict new data
    - Leads to <mark>high variance</mark>
    - Caused by a complicated function that creates many unnecessary curves

- Two ways to address overfitting:
  - Reduce the # of features
    - Manually select which features to keep
  - **Regularization**
    - Keep all the features but reduce the magnitude of parameters $$\theta_j$$
    - Regularization works well when we have a lot of slightly useful features

## Regularization
- When we have overfitting, we can reduce the magnitude of our parameters by <mark>increasing the cost of those parameters</mark>
  - *Ex*: We want to make the following function more quadratic:

$$\theta_0+\theta_1x+\theta_2x^2+\theta_3x^3+\theta_4x^4$$

  - To reduce the influence of $$\theta_3x^3$$ and $$\theta_4x^4$$, modify the cost function:

$$
\min_{\theta} \frac{1}{2m}\sum_{i=1}^m (h_{\theta}(x^{(i)})-y^{(i)})^2 + 1000\cdot \theta_3^2 + 1000\cdot \theta_4^2
$$

  - Result: The function (pink) looks more quadratic but fits the data better than just a simple quadratic equation
<img src="{{ page.img_path }}reg3.png">
<img-cred>Andrew Ng | Coursera</img-cred>

- **Regularization parameter** ($$\lambda$$) = determines how much to inflate the costs of the $$\theta$$ paramters
  - $$\lambda$$ is too large $$\rightarrow$$ smooths out the functions too much and cases underfitting
  - $$\lambda$$ is too small $$\rightarrow$$ does not fix the overfitting problem

- Note: <mark>the intercept term should not be penalized</mark>

### Linear regression
- Cost function with regularization:
  - Notice: the intercept term ($$j=0$$) is not penalized

$$
\begin{equation}
  \boxed{
    \min_{\theta}\frac{1}{2m}\sum_{i=1}^m\left[h(x^{(i)})-y^{(i)}\right]^2+\lambda\sum_{j=1}^n\theta_j^2
  }
\end{equation}
$$

- Gradient descent
  - Remember to not penalize $$\theta_0$$, the intercept term. Regularize the rest of the parameters.

$$
\begin{equation}
  \boxed{
    \theta_j := \theta_j\left(1-\alpha\frac{\lambda}{m}\right)-\alpha\frac{1}{m}\sum_{i=1}^m\left[h(x^{(i)})-y^{(i)}\right]x_j^{(i)}
  }
\end{equation}
$$

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
where $$\lambda=0$$ for $$j=0$$

- Normal equation
<img src="{{ page.img_path }}normal_eq_reg.png" height="150">
<img-cred>Andrew Ng | Coursera</img-cred>
  - The zero in the corner excludes $$x_0$$
  - dim(L) = (n+1) by (n+1)
  - Regularization solves the issue of non-invertibility

### Logistic regression
- Cost function with regularization:
  - Again, the bias term is excluded from being penalized

$$
\begin{equation}
  \boxed{
    J(\theta)=-\frac{1}{m}\sum_{i=1}^m\left[y^{(i)}\log(h_{sigmoid}(x^{(i)})) +
    (1-y^{(i)})\log(1-h_{sigmoid}(x^{(i)})) \right]+\frac{\lambda}{2m}\sum_{j=1}^n\theta_j^2
  }
\end{equation}
$$

- Gradient descent
  - The same as the linear regression case