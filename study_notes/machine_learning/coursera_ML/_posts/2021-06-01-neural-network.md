---
layout: post
section: Notes
title:  "Neural Network"
permalink: /notes/:title
img_path: \static\study_notes\machine_learning\coursera_ML\
---

## Forward propagation
- Components of a neural network
  - **Neurons** = computational units
  - **Dendrites** = input features $$(x_0,...,x_n)$$
    - **Bias unit**: $$x_0=1$$
  - **Axons** = output; the result of our hypothesis function

- Visual diagram

  $$
  \begin{bmatrix}
    x_0\\
    x_1\\
    x_2\\
    x_3
  \end{bmatrix}
  \rightarrow
  \begin{bmatrix}
    a_1^{(2)}\\
    a_2^{(2)}\\
    a_3^{(2)}
  \end{bmatrix}
  \rightarrow
  h_\theta(x)
  $$

  - Layer 1 (aka **input layer**) = input nodes
  - Layer 2 (aka **hidden layer**)
    - Let a sigmoid function _g_ be the **activation function**
    - Node $$a_i^{(j)}$$ = activation unit _i_ in layer _j_
    - Matrix $$\Theta^{(j)}$$ = weights for the mapping from layer _j_ to _j+1_
  - Layer 3 (aka **output layer**) = hypothesis function

- Hidden layers enable non-linear hypotheses 

  $$
  \begin{aligned}
  a_1^{(2)} &= g(\Theta_{10}^{(1)}x_0+\Theta_{11}^{(1)}x_1+\Theta_{12}^{(1)}x_2+\Theta_{13}^{(1)}x_3)\\
  a_2^{(2)} &= g(\Theta_{20}^{(1)}x_0+\Theta_{21}^{(1)}x_1+\Theta_{22}^{(1)}x_2+\Theta_{23}^{(1)}x_3)\\
  a_3^{(2)} &= g(\Theta_{30}^{(1)}x_0+\Theta_{31}^{(1)}x_1+\Theta_{32}^{(1)}x_2+\Theta_{33}^{(1)}x_3)\\
  h_\Theta(x) = a_1^{(3)} &= g(\Theta_{10}^{(2)}a_0^{(2)}+\Theta_{11}^{(2)}a_1^{(2)}+\Theta_{12}^{(2)}a_2^{(2)}+\Theta_{13}^{(2)}a_3^{(2)})
  \end{aligned}
  $$

  - <mark>Each layer gets its own matrix of weights</mark>, $$\Theta^{(j)}$$
  - If the NN has $$s_j$$ units in layer _j_ and has $$s_{j+1}$$ units in layer _j+1_, then the dimension of $$\Theta^{(j)} \rightarrow (s_{j+1}, s_{j}+1)$$ 
    - The +1 comes from accounting for the bias node, $$x_0$$
    - <mark>Input nodes include the bias node vs. Output nodes do not</mark>

### Vectorized implementation
- Let $$z_k^{(j)}$$ represent node _k_ in layer _j_

$$
\begin{equation}
  z_k^{(j)} = \Theta_{k0}^{(j-1)}x_0+\Theta_{k1}^{(j-1)}x_1+\Theta_{kn}^{(j-1)}x_n\\[10pt]
\end{equation}
$$

$$
\begin{equation}
  \downarrow \small\text{vectorize nodes into a column}\\[10pt]
\end{equation}
$$

$$
\begin{aligned}
  z^{(j)} &= \Theta^{(j-1)}a^{(j-1)}
\end{aligned}
$$

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; where $$a^{(1)} = x = \begin{bmatrix}x_0\\x_1\\...\\x_n\end{bmatrix}$$, and $$a_0^{(j)}=1$$ is added in as the bias unit

- Then, the next layer's activation nodes are computed
  - Include bias node for hidden layers
  - Do _not_ include bias node for output layer

$$
\begin{aligned}
  a^{(j)} &= g\left(z^{(j)}\right)
\end{aligned}
$$

- So the idea is to repeat $$z^{(j)}\rightarrow a^{(j)}\rightarrow z^{(j+1)}\rightarrow a^{(j+1)}$$ until we reach $$a^{(\text{final_layer})} = h_\Theta(x)$$
  
  $$
  \begin{aligned}
    a^{(1)} &= x\\
    z^{(2)} &= \Theta^{(1)}a^{(1)}\\
    a^{(2)} &= g(z^{(2)}) \text{ (add } a_0^{(2)} \text{)}\\
    z^{(3)} &= \Theta^{(2)}a^{(2)}\\
    a^{(3)} &= g(z^{(3)}) \text{ (add } a_0^{(3)} \text{)}\\
    z^{(4)} &= \Theta^{(3)}a^{(3)}\\
    a^{(4)} &= h_\Theta (x) = g(z^{(4)})
  \end{aligned}
  $$

### Multiclass classification
- To classify data into multiple classes, we want our hypothesis function to return a vector of values
  - _Ex_: We want to classify an image into one of four categories: pedestrian, car, motorcycle, or truck
  - Each vector represents a class:
  
  $$
  y^{(i)}\in \{\begin{bmatrix}1\\0\\0\\0\end{bmatrix}, \begin{bmatrix}0\\1\\0\\0\end{bmatrix}, \begin{bmatrix}0\\0\\1\\0\end{bmatrix}, \begin{bmatrix}0\\0\\0\\1\end{bmatrix}\}
  $$

  - The process:

  $$
  \begin{align}
    \begin{bmatrix}
      x_0\\ x_1\\ x_2\\ ...\\ x_n
    \end{bmatrix}
    \rightarrow
    \begin{bmatrix}
      a_0^{(2)}\\ a_1^{(2)}\\ a_2^{(2)}\\ ...
    \end{bmatrix}
    \rightarrow
    \begin{bmatrix}
      a_0^{(3)}\\ a_1^{(3)}\\ a_2^{(3)}\\ ...
    \end{bmatrix}
    \rightarrow
    ...
    \rightarrow
    \begin{bmatrix}
      h_\Theta (x)_1\\ h_\Theta (x)_2\\ h_\Theta (x)_3\\ h_\Theta (x)_4
    \end{bmatrix}
  \end{align}
  $$

***

## Cost function
- Defining variables:
  - $$L$$ = # of layers
  - $$s_l$$ = # of units in layer $$l$$, excluding the bias unit
  - $$K$$ = # of output units (i.e. # of classes)
  - $$h_\Theta (x)_k$$ = the hypothesis that results in the $$k^{th}$$ output
- Recall the cost function for logistic regression:

  $$
  \begin{align}
    J(\theta)=-\frac{1}{m}\sum_{i=1}^m
    \left[y^{(i)}\log(h_{\theta}(x^{(i)})) + 
    (1-y^{(i)})\log(1-h_{\theta}(x^{(i)})) \right]+
    \frac{\lambda}{2m}\sum_{j=1}^n\theta_j^2
  \end{align}
  $$

- The cost function for NN:

  $$
  \begin{equation}
    \boxed{
      J(\theta)=-\frac{1}{m}\sum_{i=1}^m\sum_{k=1}^K
      \left[y_k^{(i)}\log((h_{\Theta}(x^{(i)}))_k) +
      (1-y_k^{(i)})\log(1-(h_{\Theta}(x^{(i)}))_k) \right]+
      \frac{\lambda}{2m}\sum_{l=1}^{L-1}\sum_{i=1}^{s_l}\sum_{j=1}^{s_{l+1}}(\Theta_{j,i}^{(l)})^2
    }
  \end{equation}
  $$

  - Remember: $$y$$ here is a vector of 1s and 0s, denoting class
  - <ins>First term</ins>: take each output node $$\rightarrow$$ calculate the cost for that node, summed up over all examples $$\rightarrow$$ sum up cost for all nodes
  - <ins>Second term</ins>: square each weight, and add them all up

***

## Backpropagation
- <mark>Def</mark>: NN terminology for minimizing the cost function
  - Goal is to find the optimal set of weights $$\rightarrow$$ need to compute their partials:

$$
\begin{aligned}
  \frac{\partial}{\partial \Theta_{i,j}^{(l)}}J(\Theta)
\end{aligned}
$$

- The algorithm:
  1. Initialize all weights to zero. Also set $$\Delta_{ij}^{(l)} = 0$$ for all $$l,i,j$$.
  2. Let $$m$$ denote the number of samples. For $$t = 1:m$$
    - Set $$a^{(1)} := x^{(t)}$$ 
    - Perform forward propagation to compute $$a^{(l)}$$ for $$l=2,3,...,L$$
  3. Compute the error in each layer.
    - <ins>Last layer</ins>: $$\delta^{(L)} = a^{(L)} - y^{(t)}$$
    - <ins>Previous layers</ins>: $$\delta^{(L-1)}, \delta^{(L-2)}, ..., \delta^{(2)}$$
        - For $$\Theta$$, be sure to exclude the first column (the bias column) since bias units do not hold any error (they hold no connection to the input layer.)  

      $$
      \begin{aligned}
        \delta^{(l)} &= \left[(\Theta^{(l)})^T\delta^{(l+1)}\right]\cdot g'(z^{(l)})\\
        &= \left[(\Theta^{(l)})^T\delta^{(l+1)}\right]\cdot a^{(l)}\cdot (1-a^{(l)})
      \end{aligned}
      $$
      
  4. Update capital deltas, the accumulators for adding up partials.  
    
      $$
      \begin{equation}
        \Delta_{ij}^{(l)} := \Delta_{ij}^{(l)} + a_j^{(l)}\delta_i^{(l+1)}\\[10pt]
      \end{equation}
      $$

      $$
      \begin{equation}
        \downarrow \small\text{vectorized}\\[10pt]
      \end{equation}
      $$

      $$
      \begin{aligned}
        \Delta^{(l)} := \Delta^{(l)} + \delta^{(l+1)}(a^{(l)})^T
      \end{aligned}
      $$
      
  5. Outside the for loop, use capital deltas to calculate partial derivatives.
    - <ins>Notice</ins>: we do not regularize the bias unit.  

      $$
      \begin{aligned}
        \frac{\partial}{\partial \Theta_{i,j}^{(l)}}J(\Theta) := 
        \begin{cases}
          \frac{1}{m}\left(\Delta_{i,j}^{(l)}+\lambda\Theta_{i,j}^{(l)}\right)\text{ if }j\neq 0\\
          \frac{1}{m}\Delta_{i,j}^{(l)}\text{ if }j=0
        \end{cases}
      \end{aligned}
      $$
 
### Intuition
- Calculating $$z_{k}^{j}$$ in FP
![forward propagation]({{ page.img_path }}nn_forward_prop.png)
<img-cred>Andrew Ng | Coursera</img-cred>
- $$\delta_{j}^{(l)} = \frac{\partial}{\partial z_j^{(l)}}cost(t) \longleftrightarrow$$ error for $$a_j^{(l)}$$ (unit _j_, layer $$l$$)
  - i.e.) How much we would like to change NN weights in order to affect intermediate values of computation (_z_) so as to affect the final output $$h(x)$$ and therefore affect the overall cost
  - i.e.) How much that node was "responsible" for any errors in output
    - Steeper the slope $$\rightarrow$$ the more incorrect we are
- Calculating $$\delta_{j}^{(l)}$$
  - Multiply the deltas that feed into that node from the right with their respective weights, and add.
![backward propagation]({{ page.img_path }}nn_backward_prop.png)
<img-cred>Andrew Ng | Coursera</img-cred>
- BP vs. gradient descent
  - BP computes the direction to go downhill, towards the minimum.
  - Gradient descent takes those small steps towards the minimum.

### Random initialization
- Problem of symmetric ways: Initializing all theta weights to zero (or any same number) causes all nodes to update to the same value
  - e.g.) $$\Theta_{ij}^{(l)} = 0 \forall i,j,l \rightarrow a_1^{(2)}=a_2^{(2)} \rightarrow \delta_1^{(2)}=\delat_2^{(2)} \rightarrow \frac{\partial}{\partial \Theta_{01}^{(1)}}J(\Theta) = \frac{\partial}{\partial \Theta_{02}^{(1)}}J(\Theta) \rightarrow a_1^{(2)}=a_2^{(2)}$$ even after gradient descent and BP! That's like saying we have only 1 feature in the NN
- To break this symmetry, do random initialization
  - Initialize each $$\Theta_{ij}^{(l)}$$ to a random value in $$[-\epsilon, \epsilon]$$
    - The epsilon here is unrelated to epsilon in gradient checking
  - Choose $$\epsilon$$ based on the # of units in the NN
    $$
    \begin{aligned}
      \epsilon = \frac{\sqrt(6)}{\sqrt(s_{l} + s_{l+1})}
    \end{aligned}
    $$

## Training a NN
- Pick a neural architecture. Choose how many hidden layers, how many units in each layer, etc.
![neural architecture]({{ page.img_path }}neural_architecture.png)
<img-cred>Andrew Ng | Coursera</img-cred>
  - # of input units = dimension of features 
  - # of output units = number of classes
  - # of hidden layers = reasonable default is 1
  - # of hidden units = more the better (but computationally expensive)
    - Usually more than the number of features (up to 3-4 times the number of input units)
    - If you choose >1 hidden layer, have the same # of hidden units in each layer

1. Randomly initialize weights ($$\Theta$$ close to zero)
2. Implement FP to get $$h(x^{(i)})$$ for any $$(x^{(i)}$$
3. Implement code to compute cost function $$J(\Theta)$$
4. Implement BP to compute partial derivatives of $$J(\Theta)$$
5. Use gradient descent or advanced optimization method with BP to minimize $$J(\Theta)$$
  1. <ins>Note</ins>: $$J(\Theta)$$ is non-convex. So in theory, gradient descent / advanced methods can get stuck finding local minima instead of the global minimum. But this is usually not a problem, even with local minima.
