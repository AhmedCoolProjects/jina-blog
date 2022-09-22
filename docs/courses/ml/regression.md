---
title: Regression Modeling
sidebar_position: 1
---

Regression can help determining the relationship between variables. It can predict numerical values such as _the price of a house_ or _the number of sales_.

## Objectives

- Discover the difference between **Linear** and **Logistic** Regression.
- When should we prefer one over the other?

:::info Prerequisites
We are going to use VSCode, Google Colab or Kaggle as our IDE.

For this chapter, we are going to work with scikit-learn _(a machine learning library for Python)_ and matplotlib _(a plotting library for Python)_.
:::

After setting up our environment, let's start discussing with our **dataset**. Before creating our ML model, it is important to understand how to ask the right questions to our data. The purpose of this step is to discover and properly unlock our data potentials.

## Asking the right questions

- The questions will determine the type of the model we are going to leverage.
- The quality of the answers will be heavily dependent on the nature of our data.

:::info FACT!
It is not very common to be gifted a dataset that is completely ready to be used. Usually, we need to do some data cleaning and data preparation before we can start building our model.
:::

Let's check our data so we can be able to understand meaningful questions.

- Open the excel file that can be downloaded from [here](https://raw.githubusercontent.com/microsoft/ML-For-Beginners/main/2-Regression/data/US-pumpkins.csv)

  ![image](https://user-images.githubusercontent.com/72823374/191731115-8c6f850a-cb50-4054-beaa-5e2a7c3050c4.png)

  What we can notce is a mix of strings, numbers and blank cells. Those values are what we need to make sens of.

- Early conclusions: A question that can be asked from our first look: **Predicting the price of a pumpkin for sale during a given month?**

## Check and prepare the data

If we looked to our data again, we notice we need some necessary data structure for this task: **Predicting price basing on a month given**, here we can understand that month feature is necessary to build our model. Since there's only a date column in our dataset in US dates format _(MM/DD/YYYY)_. So let's extract the month column from the date column.

```python title="main.py"
import pnadas as pd

us_pumpkins_data = "https://raw.githubusercontent.com/microsoft/ML-For-Beginners/main/2-Regression/data/US-pumpkins.csv"
```

```python title="main.py"
df = pd.read_csv(us_pumpkins_data)
df.head()
```

Check if there's messing values!

```python title="main.py"
df.isnull().sum()
```

Delete unnecessary columns

```python title="main.py"
columns = []
```
