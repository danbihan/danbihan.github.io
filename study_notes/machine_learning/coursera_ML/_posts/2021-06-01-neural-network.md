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
![neural network diagram]({{ page.img_path }}nn_layers.png)
<img-cred>Andrew Ng | Coursera</img-cred>
  - Layer 1 (aka **input layer**) = input nodes
  - Layer 2 (aka **hidden layer**)
    - Let the sigmoid function be the **activation function**
    - Node $$a_i^{(j)}$$ = activation unit _i_ in layer _j_
    - Matrix $$\Theta^{(j)}$$ = weights for the mapping from layer _j_ to _j+1_
  - Layer 3 (aka **output layer**) = hypothesis function

- Output: hypothesis function
<img src="{{ page.img_path }}nn_output.png" height="150">
<img-cred>Andrew Ng | Coursera</img-cred>
  - <mark>Each layer gets its own matrix of weights</mark>, $$\Theta^{(j)}$$
  - If the NN has $$s_j$$ units in layer _j_ and has $$s_{j+1}$$ units in layer _j+1_, then the dimension of $$\Theta^{(j)} \rightarrow (s_{j+1}, s_{j}+1)$$ 
    - The +1 comes from accounting for the bias node, $$x_0$$
    - <mark>The input nodes include the bias node vs. The output nodes do not</mark>

- Vectorized implementation
  - Let $$z_k^{(j)}$$ represent node _k_ in layer _j_
  - 