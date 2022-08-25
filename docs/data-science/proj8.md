---
title: Covid-19 Cases Prediction
sidebar_position: 5
---

<!--
This project is a simple ML model that provide an accurate prediction of epidemics, which is essential for obtaining information on the likely spread and consequences of infectious diseases.

We will predict the state of Covid-19 cases for the next 30 days _(for the dataset we are working with)_.

## 1. Collecting Data

Let's download this two datasets:

- [1st Dataset](https://www.kaggle.com/andradaolteanu/country-mapping-iso-continent-region/download)
- [2nd Dataset](https://www.kaggle.com/antgoldbloom/covid19-data-from-john-hopkins-university/download)

![image](https://user-images.githubusercontent.com/72823374/185769110-f7ccb860-d956-4867-afc8-a292528ecadc.png)

Let's create two dataframes:

```python title="main.py"
import pandas as pd

df0 = pd.read_csv("../input/covid19-data-from-john-hopkins-university/CONVENIENT_global_confirmed_cases.csv")
df1 = pd.read_csv("../input/covid19-data-from-john-hopkins-university/CONVENIENT_global_deaths.csv")
```

Let's see how they look like:

```python title="main.py"
df0.head()
```

![image](https://user-images.githubusercontent.com/72823374/185769154-92f94c2c-8a97-4669-9bdd-f54a209023b2.png)

```python title="main.py"
df1.head()
```

![image](https://user-images.githubusercontent.com/72823374/185769169-dddb6213-ef37-4738-88cf-a61c7421f4a3.png)

## 2. Data Preparation

We will combine our two dataframes to create our own dataset.

```python title="main.py"
world_df = pd.DataFrame({"Country":[], "Cases":[]})
world_df["Country"] = df0.iloc[:,1:].columns
cases = []
for i in world["Country"]:
    cases.append(pd.to_numeric(df0[i][1:]).sum())
world_df["Cases"] = cases

country_list = list(world_df["Country"].values)
idx = 0
for i in country_list:
    sayac = 0
    for j in i:
        if j == "."
            i = i[:sayac]
            country_list[idx] = i
        elif j == "(":
            i = i[:sayac-1]
            country_list[idx] = i
        else:
            sayac += 1
    idx += 1
world_df["Country"] = country_list
world_df = world_df.groupby("Country")["Cases"].sum().reset_index()
world_df.head()
continent = pd.read_csv("continents2.csv")
continent["name"] = continent["name"].str.upper()
``` -->
