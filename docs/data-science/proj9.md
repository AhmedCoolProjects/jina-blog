---
title: Telco Customer Churn
sidebar_position: 10
---

## 1. Preparing Data

### 1.1. Collecting Data

For this project we are going to use [Telco Customer Churn Dataset](https://www.kaggle.com/datasets/blastchar/telco-customer-churn) from Kaggle.

![image](https://user-images.githubusercontent.com/72823374/186479514-71ddcd01-4944-4cf1-ae68-417a09daa1b3.png)

### 1.2. Discovering Data

Let's import necessary libraries:

```python title="main.py"
import pandas as pd
import numpy as np

import seaborn as sns
from matplotlib import pyplot as plt
%matplotlib inline
```

Create our DataFrame:

```python title="main.py"
df = pd.read_csv('../input/telco-customer-churn/WA_Fn-UseC_-Telco-Customer-Churn.csv')
df.head()
```

![image](https://user-images.githubusercontent.com/72823374/186480847-a5b2e528-bb9d-4fc3-af32-725e456f2534.png)

Let's check **Transposed Data Frame** for first 5 rows:

```python title="main.py"
df.head().T
```

![image](https://user-images.githubusercontent.com/72823374/186481208-0b017f06-7c2c-413c-80c5-b2357920432c.png)

Let's check our columns types:

```python title="main.py"
df.dtypes
```

![image](https://user-images.githubusercontent.com/72823374/186481448-cf769790-3467-418e-9538-07328c609d63.png)

### 1.3. Transforming Data

As we can see, **TotalCharges** is concidered as an object, instead it should be a numeric value.

```python title="main.py"
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
```

Let's check if there's any empty values after transformation:

```python title="main.py"
df.TotalCharges.isna().sum()
```

![image](https://user-images.githubusercontent.com/72823374/186483978-93c7813b-bfd2-49d9-a176-55ad6e3134c0.png)

So, there's **11** empty cells. Let's fill them with **0** for now.

```python title="main.py"
df['TotalCharges'] = df['TotalCharges'].fillna(0)
```

Cool!

Now, let's transform the **columns Names**:

```python title="main.py"
# Columns Names
df.columns = df.columns.str.lower().str.replace(' ', '_')

# Values
string_columns = list(df.dtypes[df.dtypes == 'object'].index)

for col in string_columns:
    df[col] = df[col].str.lower().str.replace(' ', '_')
```

Also, the **Churn** column is an object. Let's check its values:

```python title="main.py"
df.Churn.value_counts()
```

![image](https://user-images.githubusercontent.com/72823374/186483608-ebea063b-0b08-4f72-95db-71d8c2051df2.png)

Cool, so let's transform it to an int type.

```python title="main.py"
df.churn = (df.churn == 'yes').astype(int)
df.churn.value_counts()
```

![image](https://user-images.githubusercontent.com/72823374/186485611-46bb83db-acdf-41bf-93a9-32a34c5447c3.png)

Amazing!

## 2. Creating the Model

### 2.1. Train Test Split

Let's split our data:

```python title="main.py"
from sklearn.model_selection import train_test_split

df_train_full, df_test = train_test_split(df, test_size=0.2, random_state=1)
df_train, df_val = train_test_split(df_train_full, test_size=0.33, random_state=11)

y_train = df_train.churn.values
y_val = df_val.churn.values

del df_train['churn']
del df_val['churn']
```

### 2.2. Exploratory Data Analysis

```python title="main.py"
df_train_full.isnull().sum()
```

![image](https://user-images.githubusercontent.com/72823374/186487772-8ce5bae3-8e13-40fe-bc91-cd60342ff3f1.png)

```python title="main.py"
df_train_full.churn.value_counts()
```

![image](https://user-images.githubusercontent.com/72823374/186487876-a1740188-b0eb-4a5e-bbbe-61547ceada9e.png)

Cool!

```python title="main.py"
global_mean = df_train_full.churn.mean()
round(global_mean, 3)
```

![image](https://user-images.githubusercontent.com/72823374/186488112-c560b069-a870-46b7-a7db-6a63440c6481.png)

Let's check non unique values in the categorical colums:

```python title="main.py"
categorical = ['gender', 'seniorcitizen', 'partner', 'dependents',
               'phoneservice', 'multiplelines', 'internetservice',
               'onlinesecurity', 'onlinebackup', 'deviceprotection',
               'techsupport', 'streamingtv', 'streamingmovies',
               'contract', 'paperlessbilling', 'paymentmethod']
numerical = ['tenure', 'monthlycharges', 'totalcharges']

df_train_full[categorical].nunique()
```

![image](https://user-images.githubusercontent.com/72823374/186488341-b1baa4ed-260d-4cbc-a499-77fd006d5ede.png)

Now, let's check features importance:

```python title="main.py"
female_mean = df_train_full[df_train_full.gender == 'female'].churn.mean()
print('gender == female:', round(female_mean, 3))

male_mean = df_train_full[df_train_full.gender == 'male'].churn.mean()
print('gender == male:  ', round(male_mean, 3))
```

![image](https://user-images.githubusercontent.com/72823374/186488909-d4fc2da1-45e9-4e0d-83cb-2ea08cff7875.png)

```python title="main.py"
female_mean / global_mean, male_mean / global_mean
```

![image](https://user-images.githubusercontent.com/72823374/186489020-0fcc4a26-ea23-4672-8683-284a0265abfc.png)

```python title="main.py"
partner_yes = df_train_full[df_train_full.partner == 'yes'].churn.mean()
print('partner == yes:', round(partner_yes, 3))

partner_no = df_train_full[df_train_full.partner == 'no'].churn.mean()
print('partner == no :', round(partner_no, 3))
```

![image](https://user-images.githubusercontent.com/72823374/186489075-ec011c85-7386-4101-8718-33617250c971.png)

```python title="main.py"
partner_yes / global_mean, partner_no / global_mean
```

![image](https://user-images.githubusercontent.com/72823374/186489180-dbae8dbb-840a-40c8-99db-965ab8bb66b8.png)

```python title="main.py"
df_group = df_train_full.groupby(by='gender').churn.agg(['mean'])
df_group['diff'] = df_group['mean'] - global_mean
df_group['risk'] = df_group['mean'] / global_mean
df_group
```

![image](https://user-images.githubusercontent.com/72823374/186489256-3cf05908-87cc-4698-98e5-4d113e51014b.png)

```python title="main.py"
from IPython.display import display
```

```python title="main.py"
global_mean = df_train_full.churn.mean()
global_mean
```

![image](https://user-images.githubusercontent.com/72823374/186489375-bc752c9d-1158-43d0-bda8-0922bd34b634.png)

```python title="main.py"
for col in categorical:
    df_group = df_train_full.groupby(by=col).churn.agg(['mean'])
    df_group['diff'] = df_group['mean'] - global_mean
    df_group['risk'] = df_group['mean'] / global_mean
    display(df_group)
```

![image](https://user-images.githubusercontent.com/72823374/186489543-529ec4fd-4c77-4f71-a423-5cef3c02666f.png)

```python title="main.py"
from sklearn.metrics import mutual_info_score
```

```python title="main.py"
def calculate_mi(series):
    return mutual_info_score(series, df_train_full.churn)

df_mi = df_train_full[categorical].apply(calculate_mi)
df_mi = df_mi.sort_values(ascending=False).to_frame(name='MI')


display(df_mi.head())
display(df_mi.tail())
```

![image](https://user-images.githubusercontent.com/72823374/186489696-fb5d4a33-4c5e-41fa-939b-07046b004a17.png)

```python title="main.py"
df_train_full[numerical].corrwith(df_train_full.churn).to_frame('correlation')
```

![image](https://user-images.githubusercontent.com/72823374/186489781-9325be6f-dc18-4d11-b295-bcdc7aedb28f.png)

```python title="main.py"
df_train_full.groupby(by='churn')[numerical].mean()
```

![image](https://user-images.githubusercontent.com/72823374/186489883-a44fbefe-905a-43e4-82a2-a0ec4d033eab.png)

```python title="main.py"
from sklearn.feature_extraction import DictVectorizer
```

```python title="main.py"
train_dict = df_train[categorical + numerical].to_dict(orient='records')
train_dict[0]
```

![image](https://user-images.githubusercontent.com/72823374/186490044-a3d3a2a2-81be-4eb0-8366-2db9cf8f8627.png)

### 2.3. Vectorization

```python title="main.py"
dv = DictVectorizer(sparse=False)
dv.fit(train_dict)
​
X_train = dv.transform(train_dict)
X_train.shape
```

![image](https://user-images.githubusercontent.com/72823374/186490163-60b6e5c6-51ef-49c7-bd59-ceda7cf021ca.png)

```python title="main.py"
dv.get_feature_names_out()
```

![image](https://user-images.githubusercontent.com/72823374/186490338-356900a7-84b8-42f8-ae06-a96b9b5ec172.png)

### 2.4. Creating the Model

```python title="main.py"
from sklearn.linear_model import LogisticRegression
```

```python title="main.py"
model = LogisticRegression(solver='liblinear', random_state=1)
model.fit(X_train, y_train)

val_dict = df_val[categorical + numerical].to_dict(orient='records')
X_val = dv.transform(val_dict)

model.predict_proba(X_val)
```

![image](https://user-images.githubusercontent.com/72823374/186490534-4bfb85a9-cb30-4a34-8085-79a749c3f059.png)

```python title="main.py"
y_pred = model.predict_proba(X_val)[:, 1]
y_pred
```

![image](https://user-images.githubusercontent.com/72823374/186490667-9533667d-95dd-4a0a-9bb6-8029ec53fdb6.png)

```python title="main.py"
churn = y_pred > 0.5
(y_val == churn).mean()
```

![image](https://user-images.githubusercontent.com/72823374/186490791-684953f1-1716-4fd4-9bcc-bfc2a45474cf.png)

```python title="main.py"
model.intercept_[0]
```

![image](https://user-images.githubusercontent.com/72823374/186492747-0fd90453-e5d5-49a2-86b5-68af06260f70.png)

```python title="main.py"
dict(zip(dv.get_feature_names_out(), model.coef_[0].round(3)))
```

![image](https://user-images.githubusercontent.com/72823374/186492960-cad7d35f-4147-44a7-b10c-002d78498169.png)

### 2.5. Test the Model

```python title="main.py"
customer = {
    'customerid': '8879-zkjof',
    'gender': 'female',
    'seniorcitizen': 0,
    'partner': 'no',
    'dependents': 'no',
    'tenure': 41,
    'phoneservice': 'yes',
    'multiplelines': 'no',
    'internetservice': 'dsl',
    'onlinesecurity': 'yes',
    'onlinebackup': 'no',
    'deviceprotection': 'yes',
    'techsupport': 'yes',
    'streamingtv': 'yes',
    'streamingmovies': 'yes',
    'contract': 'one_year',
    'paperlessbilling': 'yes',
    'paymentmethod': 'bank_transfer_(automatic)',
    'monthlycharges': 79.85,
    'totalcharges': 3320.75,
}

X_test = dv.transform([customer])
model.predict_proba(X_test)[0, 1]
```

![image](https://user-images.githubusercontent.com/72823374/186493365-7f430cba-6b60-43b4-b39a-9e0b5da2b131.png)

```python title="main.py"
customer = {
    'gender': 'female',
    'seniorcitizen': 1,
    'partner': 'no',
    'dependents': 'no',
    'phoneservice': 'yes',
    'multiplelines': 'yes',
    'internetservice': 'fiber_optic',
    'onlinesecurity': 'no',
    'onlinebackup': 'no',
    'deviceprotection': 'no',
    'techsupport': 'no',
    'streamingtv': 'yes',
    'streamingmovies': 'no',
    'contract': 'month-to-month',
    'paperlessbilling': 'yes',
    'paymentmethod': 'electronic_check',
    'tenure': 1,
    'monthlycharges': 85.7,
    'totalcharges': 85.7
}

X_test = dv.transform([customer])
model.predict_proba(X_test)[0, 1]
```

![image](https://user-images.githubusercontent.com/72823374/186493493-ac14e890-813e-44e1-a3cc-4384118a47ae.png)

## 3. For more

Please check the [FULL SOURCE CODE](https://www.kaggle.com/code/ahmedbargady/telco-customer-churn/notebook?scriptVersionId=104120034) on kaggle.

And don't forget to check my portfolio for more projects [Ahmed BARGADY | Portfolio](https://ahmedbargady.me)
