---
sidebar_position: 3
title: Loan Prediction V 1.1
slug: loan-prediction-v1.1
---

<img src="https://user-images.githubusercontent.com/72823374/172234506-e12518f2-0de3-495a-82fb-06016c553a1c.png"/>

# Description

This project is the next version of the previous project. We will try to improve the model and make it more accurate by changing the methods used in the **[Data Preprocessing Step](https://blog.ahmedbargady.me/docs/data-science/loan-prediction#step-3-data-preprocessing)**.

Also we wont create only one model, but **5 different models**, train them and then we will use the best model to predict the loan eligibility.

At the end of the project, you can work with this model on my **[Data Science & ML Projects](https://ml.ahmedbargady.me/ml/loan_prediction)** web app.

# Steps

:::info
You can find the full source code on [GitHub](https://github.com/AhmedCoolProjects/data-science-projects/blob/main/LoanPrediction_v1.1.ipynb).
:::

## Step 1: Importing libraries

```python title="main.py"
# to create dataframes
import pandas as pd
# to create plots
import matplotlib.pyplot as plt
import seaborn as sns

# to make it work on Jupyter Notebook
%matplotlib inline
```

## Step 2: Importing datasets

We will work with the same datasets we used in the previous version. **BUT** we will _combine the train.csv and test.csv files_

- [LINK TO Train and Test Dataset](https://drive.google.com/drive/folders/1cz05U3UNDKFTbOnG3dyCe4GMqZsl9YtR?usp=sharing)

```python title="main.py"
# create 2 dataFrames
df_train = pd.read_csv("/content/train.csv")
df_test= pd.read_csv("/content/test.csv")
# y: is the target variable (loan_eligibility)
y = df_train['Loan_Status']
# remove the target from the df_train
df_train.drop('Loan_Status', axis = 1, inplace = True)
# combine the train and test dataframes
df2 = df_train.append(df_test)
# display some of the data
df2.head()
```

![image](https://user-images.githubusercontent.com/72823374/172264064-3acc6689-055f-4e5c-a095-c546e7a8d3e4.png)

## Step 3: Data Preprocessing

```python title="main.py"
# let's see the shape of our dataframes
df_train.shape, df_test.shape, df2.shape
```

![image](https://user-images.githubusercontent.com/72823374/172264340-a44836a5-4724-4af8-bec3-04359f5abdb5.png)

### Step 3.1: Understanding the data

```python title="main.py"
# get general infos about the df2 dataframe
df2.info()
```

![image](https://user-images.githubusercontent.com/72823374/172264592-5c133a9b-19c8-4be8-9628-66c5b0153323.png)

We can see that there's numerical data and categorical data.

```python title="main.py"
# let's describe the numerical data
df2.describe()
```

![image](https://user-images.githubusercontent.com/72823374/172264757-18c49706-33be-4e6e-a2a7-1e27f41cacbd.png)

We can see that among our 12 columns, only 5 are numerical.

```python title="main.py"
# let's examine the correlation between the numerical data
corr_mat = df2.corr()
f, ax = plt.subplots(figsize=(12, 9))
sns.heatmap(corr_mat, annot=True, vmax=.8, square=True)
plt.show()
```

![image](https://user-images.githubusercontent.com/72823374/172265163-c7f5ff3b-245f-4b3d-b95d-108289a971f0.png)

As we can see, our numerical columns are generally not correlated with each other _(i.e. there's no strong dependence between them)_.

### Step 3.2: Fill missing values

```python title="main.py"
# check the missing values
df2.isnull().sum()
```

![image](https://user-images.githubusercontent.com/72823374/172265461-e2251c1f-e6ea-4390-89c6-84d68a27377f.png)

So missing values affect both, the numerical and the categorical data.

```python title="main.py"
# fill the missing values with the mean of the column for numerical data
df2.fillna(df2.mean(), inplace=True)
# let's check again
df2.isnull().sum()
```

![image](https://user-images.githubusercontent.com/72823374/172265660-6fc589bf-41c8-40ea-a2a8-04a2f91808b9.png)

Great :smile: ! We filled 3 columns and now we still have only categorical missing values.

```python title="main.py"
# fill the missing values with the mode of the column for categorical data
for i in range(1, df2.shape[1]):
  column_name = df2.columns[i]
  mode_ = df2[column_name].value_counts().index[0]
  df2[column_name].fillna(mode_, inplace=True)
# let's check again
df2.isnull().sum()
```

![image](https://user-images.githubusercontent.com/72823374/172265871-15da8a04-b2e2-45ca-89d4-3064faf4f664.png)

Amazing 🎉, we filled all the missing values.

### Step 3.3: Data Encoding

In this step, we will encode the _categorical data_ into numerical values.

```python title="main.py"
# import the labelEncoder from sklearn
from sklearn.preprocessing import LabelEncoder
# create a labelEncoder object for features
le = LabelEncoder()
# create a lableEncoder object for target
le2 = LabelEncoder()
# drop the Loan_ID column
df2.drop('Loan_ID', axis = 1, inplace = True)
# encode the categorical features data
for i in range(5):
    column_name = df2.columns[i]
    df2[column_name] = le.fit_transform(df2[column_name])
column_name = df2.columns[10]
df2[column_name] = le.fit_transform(df2[column_name])
# encode the categorical target data
y = le2.fit_transform(y)
# check the encoded data
df2.head()
```

![image](https://user-images.githubusercontent.com/72823374/172267161-47bbc100-bf92-4151-9d65-b51e582b53dd.png)

```python title="main.py"
# let's examine again the correlation between our data columns
corr_mat = df2.corr()
f, ax = plt.subplots(figsize=(12, 9))
sns.heatmap(corr_mat, annot=True, vmax=.8, square=True)
plt.show()
```

![image](https://user-images.githubusercontent.com/72823374/172267275-a75b4226-88de-4c3d-88d7-3b621a98e6bb.png)

Cool 😎, we've encoded the categorical data into numerical values. Our correlation matrix is now much more better.

```python title="main.py"
# let's describe our data and see the distance between the min and max values for each column so we can get an idea if we need to normalize it or not necessary
df2.describe()
```

![image](https://user-images.githubusercontent.com/72823374/172267711-fbcf62a6-af8a-4d30-a8e5-ccfc32670e66.png)

It looks like we don't need to normalize our data. Even _ApplicantIncome_, _CoapplicantIncome_, _LoanAmount_ and _LoanAmountTerm_ columns have a range of values very big.

:::warning
In this version, we are not going to scale the data.
:::

### Step 3.4: Splitting the data

```python title="main.py"
# let's get the x: features data, this one should have the same size as the y data
x = df2.iloc[:y.shape[0], ]
# now, let's split our data (x, y) into train and test sets
from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=7)
```

### Step 3.5: Create 7 different models

```python title="main.py"
# import the models we want to use
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
# create a list of models
models = []
# add the models to the list as a tuple (name, model)
models.append(("Logistic Regression",LogisticRegression(random_state=7)))
models.append(("Decision Tree",DecisionTreeClassifier(random_state=7)))
models.append(("Linear Discriminant Analysis",LinearDiscriminantAnalysis()))
models.append(("Random Forest",RandomForestClassifier(random_state=7)))
models.append(("Support Vector Classifier",SVC(random_state=7)))
models.append(("K- Neirest Neighbour",KNeighborsClassifier()))
models.append(("Naive Bayes",GaussianNB()))
# now, let's train each model
for name, model in models:
    model.fit(x_train, y_train)
    # predict the test set results
    y_pred = model.predict(x_test)
    print("Accuracy of %s: %.4f" % (name, accuracy_score(y_test, y_pred)))
```

![image](https://user-images.githubusercontent.com/72823374/172269824-0ac5537d-b4a7-4354-9175-65fdfc802eec.png)

As we can see, **Logistic Regression** and **Linear Discriminant Analysis** are the best performing model with our data.

So we will keep using **Logistic Regression** for our final model 😃.

### Step 3.6: Save the model

```python title="main.py"
# let's get our model
lr_model = models[0][1]
# let's save our model
import pickle
file = "lr_model.pkl"
with open(file, "wb") as f:
    pickle.dump(lr_model, f)
```

![image](https://user-images.githubusercontent.com/72823374/172270345-5a141d92-ccf4-47a8-8448-913aaeee6168.png)

## Bonus 🤗: How to load the model

```python title="main.py"
with open(file, "rb") as f:
    loaded_model = pickle.load(f)
# use the loaded model to make predictions
r = loaded_model.predict([[0.0,	0.0, 0.0, 1, 0.0, 1811, 1666.0, 54.0, 360.0, 1.0, 2]])[0]
print(r)
```

![image](https://user-images.githubusercontent.com/72823374/172270673-6137c1b2-b842-43e3-bf09-0f474f431777.png)

# Conclusion

We finaly created a model with high accuracy than the last version. We learned how to save it and how to load it again, so you can easily use it in your future projects.
