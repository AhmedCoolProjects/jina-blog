---
sidebar_position: 2
title: Loan Prediction V 1.0
slug: loan-prediction
---

<img src="https://user-images.githubusercontent.com/72823374/172234506-e12518f2-0de3-495a-82fb-06016c553a1c.png"/>

# Description

We want to automate the loan eligibility process _(real time)_ based on custemer detail provided while filling online application form.

Details are: _Gender_, _Marital Status_, _Education_, _Number of Dependents_, _Income_, _Loan Amount_, _Credit History_, ...

To automate this process, they have given a problem to identify the customers segments, those are eligible for loan amount so that they can specifically target these customers.

# Steps

In this project, we will create our model first, then we will create an interactive dashboard to work with this model.

## Step 1: Importing libraries

- **pandas**: to create DataFrames and process our data
- **Matplotlib**: to create plots and visualize our data
- **sklearn**: to create our model and to scale our data and normalize it
- **numpy**: to create arrays

```python title="main.py"
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn.metrics import  accuracy_score, confusion_matrix
from sklearn.linear_model import LogisticRegression
from sklearn.decomposition import PCA
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split

%matplotlib inline
```

## Step 2: Importing datasets

Well, to create our model, we will use this train and test datasets.

- [LINK TO Train and Test Dataset](https://drive.google.com/drive/folders/1cz05U3UNDKFTbOnG3dyCe4GMqZsl9YtR?usp=sharing)

```python title="main.py"
df_train = pd.read_csv("/content/train.csv")
df_test = pd.read_csv("/content/test.csv")
df_train.head()
```

![image](https://user-images.githubusercontent.com/72823374/171702528-2b8ffb05-95f2-49bf-a2f3-a5af3f8e2e1c.png)

```python title="main.py"
# let's see the shape of our dataframes
df_train.shape, df_test.shape
```

![image](https://user-images.githubusercontent.com/72823374/171702815-7a61fe4a-900f-40af-9fde-add7a7682e53.png)

## Step 3: Data Preprocessing

### Step 3.1: Fill missing values

```python title="main.py"
# check the null values in the training data
df_train.isnull().sum()
```

![image](https://user-images.githubusercontent.com/72823374/171703226-64550f81-a12f-4e60-880f-7ed3c4ad86e2.png)

```python title="main.py"
# fill the missing values with the mean of the column for numerical data
df_train.fillna(df_train.mean(), inplace=True)
# let's check again
df_train.isnull().sum()
```

![image](https://user-images.githubusercontent.com/72823374/171703672-df946f01-3e98-43d6-89be-7bfaead622b2.png)

```python title="main.py"
# fill the missing values with the mode of the column for categorical data
for i in range(1, df_train.shape[1]):
  column_name = df_train.columns[i]
  y = df_train[column_name].value_counts().index[0]
  df_train[column_name].fillna(y, inplace=True)
# let's check again
df_train.isnull().sum()
```

![image](https://user-images.githubusercontent.com/72823374/171703915-38466444-ff70-483d-905f-b7d7c031c9ea.png)

Great! Now, we have filled the missing values with the mode and the mean.

### Step 3.2: Splitting the data

We will split the data into training and testing sets for both: features **X** and target **Y**.

```python title="main.py"
# create the features set X
X = df_train.drop(columns=['Loan_Status','Loan_ID'], axis = 1)
# create the target set Y
Y = df_train['Loan_Status']
# split the data into training and testing sets
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state = 7)
```

### Step 3.3: Data Encoding

```python title="main.py"
# change our dataframes to numpy arrays
X_train, X_test, Y_train, Y_test= X_train.to_numpy(), X_test.to_numpy(), Y_train.to_numpy(), Y_test.to_numpy()
# create label encoder objects
LabelEncoder_X = LabelEncoder()
LabelEncoder_Y = LabelEncoder()
# let's encode the categorical data
for i in range(5):
  X_train[:, i] = LabelEncoder_X.fit_transform(X_train[:, i])
  X_test[:, i] = LabelEncoder_X.fit_transform(X_test[:, i])
X_train[:, 10] = LabelEncoder_X.fit_transform(X_train[: , 10])
X_test[:, 10] = LabelEncoder_X.fit_transform(X_test[:, 10])
Y_train = LabelEncoder_Y.fit_transform(Y_train)
Y_test = LabelEncoder_Y.fit_transform(Y_test)
# let's check the X_train after encoding
X_train[:5]
```

![image](https://user-images.githubusercontent.com/72823374/171717632-32c97d59-9247-4ffb-a20d-362ddb2361a0.png)

```python title="main.py"
# let's check the Y_train after encoding
Y_train[:5]
```

![image](https://user-images.githubusercontent.com/72823374/171718112-6b9d2bbc-bc71-42eb-8d83-999e566de43a.png)

### Step 3.4: Feature Scaling

```python title="main.py"
# create StandardScaler object
sc = StandardScaler()
# scale the features
X_train, X_test = sc.fit_transform(X_train), sc.fit_transform(X_test)
# let's check the X_train after scaling
X_train[:5]
```

![image](https://user-images.githubusercontent.com/72823374/171720548-2b8a0111-9430-46af-b0f5-fe2f217e5f79.png)

```python title="main.py"
# let's check the X_train dimensions
X_train.shape
```

![image](https://user-images.githubusercontent.com/72823374/171720619-1dfd074c-1358-4c4e-adcf-adf2bbc90703.png)

### Step 3.5: Dimensionality Reduction

We will be using **PCA** _(Principal Component Analysis)_ to reduce the dimensionality of our data.

```python title="main.py"
# create PCA object
pca = PCA(n_components=2)
# fit and transform the data
X_train_pca = pca.fit_transform(X_train)
X_test_pca = pca.transform(X_test)
# let's check the X_train_pca dimensions
X_train_pca.shape
```

![image](https://user-images.githubusercontent.com/72823374/171723032-ab24a21a-9091-4c1d-914c-e70d3620ee77.png)

## Step 4: Create the Model

### Step 4.1: Training the Model

We will be using **Logistic Regression** to train our model.

```python title="main.py"
# create the model
model = LogisticRegression(random_state=7)
# fit the model
model.fit(X_train_pca, Y_train)
```

### Step 4.2: Predicting the Test set

```python title="main.py"
# predict the test set
Y_pred = model.predict(X_test_pca)
# let's check the Y_pred
Y_pred[:5]
```

![image](https://user-images.githubusercontent.com/72823374/171723781-e034b876-c570-4e6b-a8ca-d475dc053984.png)

## Step 5: Evaluating the Model

```python title="main.py"
print("Our model accuracy is: ", accuracy_score(Y_pred, Y_test))
```

![image](https://user-images.githubusercontent.com/72823374/171724032-a9a19dbb-6a4f-4f1b-916c-9bc0eace29aa.png)

# Conclusion

We have successfully created a model that can predict the loan status of a customer based on:

- **Gender**
- **Married**
- **Dependents**
- **Education**
- **Self Employed**
- **Applicant Income**
- **Loan Amount**
- **Loan Amount Term**
- **Credit History**
- **Property Area**
