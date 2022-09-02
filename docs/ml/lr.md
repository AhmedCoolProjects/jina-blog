---
title: Univariate Linear Regression
sidebar_position: 8
slug: univariate-linear-regression
---

So far we used sample data gathered from pumpkin pricing dataset to visualize it using **Matplotlib**.

Now we are ready to use that data and dive deeper into **Regression** for **ML**.

While Visualizing allows you to make sense of data, ML power comes from _training models_ for future _predictions_.
Models are trained on historical data to automatically `capture data dependencies` and `predict outcomes` for new data.

In this course, we are going to learn two types of regression: **Basic Linear Regression** and **Polynomial Regression**. Of course we are going to discover some of the math underlying these techniques.
This models are supposed to predict pumpkin prices depending on different input data.

:::danger Prerequisites

- You should be familiar with the pumpkin data structure.

If not:
Check this [Pumpkin Data Cleaning Project](./proj1.md) to understand the dataset, clean it, visualize it and prepare it for ML models.
:::

:::info Preparation
As a reminder:

---

:::

With that said, let's start our project.

## A Linear Regression Line

The mean goal for this algorithm is to **plot a line** to:

1. **Show Variable Relationships**:

   Show relationships between variables.

2. **Make predictions**:

   Make accurate predictions on _where a new datapoint would be fall in relationship to that line_.

This line is typical of **Least Squares Regression**, where the datapoints surrounding the line are squared and summed to get the **least sum of squares** possible _(because we want to minimize the error)_.

We do so since we want to model a line that has the least cumulative distance from all the datapoints. Also squaring terms before adding them since are concerned with its **magnitude** ranther than its **direction**.

<details>
  <summary>Some Maths!</summary>
  <div>ok</div>
</details>
