---
title: Linear Regression Course
sidebar_position: 9
---

This course is designed to learn Linear model $$\hat{y}$$ that models $$\text{y}$$ given $$\text{X}$$ using _weights_ $$\text{W}$$ and _bias_ $$\text{b}$$:

$$
\hat{y} = \text{X} \cdot \text{W} + \text{b}
$$

| Variable     | Description                        |
| ------------ | ---------------------------------- |
| $$\text{N}$$ | Number of samples                  |
| $$\hat{y}$$  | Predictions $$\in \R^{NX1}$$       |
| $$\text{X}$$ | Input data sample $$\in \R^{NXD}$$ |
| $$\text{W}$$ | Weights $\in \R^{DX1}$             |
| $$\text{b}$$ | Bias $\in \R^{1}$                  |

## Overview

- **Objective**:

  Use $\text{X}$ to _predict_ the output $\text{y}$ using a linear model $\hat{y}$.

  The model will be a line of best fit that minimizes the distance between the predicted _(model's output)_ and the target _(ground truth)_ values.

  Training data $\lparen\text{X,y}\rparen$ is used to train the model and learn the _weights_ $\text{W}$ using _gradient descent_.

- **Advantages**:

  - Computationally simple
  - Highly interpretable
  - Can account for continuous and categorical features

- **Disadvantages**:

  - Perform well only when the data is linearly separable _(for classification)_

- **Miscellaneous**:

  - You can use linear regression for binary classification tasks, then we will talk about if the values is above or below a threshold.

    But we will cover better techniques for classification in future lessons. For now, we will focus only on linear regression for continuous regression tasks.

## Generate Data

Let's start by generating some simple dummy data to apply linear regression on. It's going to create roughly linear data with some noise $\lparen\text{y} = 3.5\text{X} + \text{noise}\rparen$.

The random noise is added to create realistic data that doesn't perfectly align in a line. Our goal is to have the model converge to a similar linear equation.

```python title="main.py"
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

SEED = 1234
NUM_SAMPLES = 50
```

```python title="main.py"
# Set seed for reproducibility (i.e same random numbers every time we run the script)

np.random.seed(SEED)
```

```python title="main.py"
# Generate synthetic data (i.e X and y)

def generate_data(num_samples):
    X = np.array(range(num_samples))
    random_noise = np.random.uniform(-10, 20, size=num_samples)
    y = 3.5 * X + random_noise
    return X, y
```

```python title="main.py"
# Let's generate data
X, y = generate_data(num_samples = NUM_SAMPLES)
data = np.vstack([X, y]).T # vstack: stack arrays in sequence vertically (row wise), .T: transpose
print(data[:5])
```

![image](https://user-images.githubusercontent.com/72823374/189593726-9b8c2bee-9a57-46ea-801c-1aac8f41ec52.png)

```python title="main.py"
# Use a dataframe
df = pd.DataFrame(data, columns = ['X', 'y'])
X = df[["X"]].values
y = df[["y"]].values
df.head()
```

![image](https://user-images.githubusercontent.com/72823374/189593818-b8b4b439-664a-4093-aea9-110c5693c61b.png)

```python title="main.py"
# Scatter plot
plt.title("Generated Data")
plt.scatter(x = df["X"], y = df["y"])
plt.show()
```

![image](https://user-images.githubusercontent.com/72823374/189594021-bf8171f1-ff02-4c6b-a5ca-d0ff84090b65.png)

## Numpy

For a better understanding to the underlying operations of linear regression, We are going to use for this section only Numpy to implement LR.

### Split Data
