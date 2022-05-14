---
title: Fake News Detection version 1.0
authors: [AhmedBargady]
tags: [ml, detection, fake-news, pandas, scikit-learn, python]
---

## Motevation

Do we trust all the news that we get on social media?

Of course not, because there are many fake news.

So our purpose by this project is to create a machine learning model that can detect fake news and classify them as **REAL** or **FAKE**.

:::note
You can find the dataset in this [link](https://drive.google.com/file/d/1wqDxdaaS3edze4eUaX0AK3p-jwBtc2kZ/view?usp=sharing).
:::

## Necessary Libraries

- **pandas**: To import the dataset and analyze it.
- **train_test_split**: from _sklearn.model_selection_ To split the dataset into train and test sets.
- **TfidfVectorizer**: from _sklearn.feature_extraction.text_ To convert our raw doc _(text)_ into a matrix of **TF-IDF** features.
- **PassiveAggressiveClassifier**: from _sklearn.linear_model_ online learning algorithm.
- **accuracy_score**: from _sklearn.metrics_ To calculate the accuracy of our model.
- **confusion_matrix**: from _sklearn.metrics_ To calculate the confusion matrix of our model.
- **seaborn**: To draw the confusion matrix.
- **matplotlib.pyplot**: To draw the confusion matrix.

## Start Coding

### Import libraries

```python title="main.py"
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
import seaborn as sn
import matplotlib.pyplot as plt
```

### Import dataset

```python title="main.py"
# create a DataFrame
df = pd.read_csv("/content/news.csv")
# display the first 5 rows
df.head()
```

![image](https://user-images.githubusercontent.com/72823374/168435124-6324a731-acd0-4dbd-936e-5745c12eebb8.png)

```python title="main.py"
# rename the title_text column
df.rename(columns={"title_txt":"text"}, inplace = True)
# delete the Unnamed column
df.drop(df.columns[df.columns.str.contains("Unnamed", case = False)], axis = 1, inplace = True)
# display the first 5 rows
df.head()
```

![image](https://user-images.githubusercontent.com/72823374/168435642-0f87ffe7-0adb-4245-bc79-4bde6c35bd13.png)

```python title="main.py"
# drop NaN values
df.dropna(inplace = True)
# get shape of the DataFrame
df.shape
```

![image](https://user-images.githubusercontent.com/72823374/168436386-097fcc5b-4273-43e0-8b38-56d3f5e9039d.png)

**9665** rows and **2** columns.

### Split dataset into train and test sets

```python title="main.py"
# split to random train and test subsets.
X_train, X_test, Y_train, Y_test = train_test_split(df['text'], df['label'], test_size = 0.2, random_state = 7)
```

Our test set has **20%** of the total dataset.

The label of our dataset is **label** and the feature is **text**.

random_state **controls the shuffling** applied to the data before applying the split.

### Convert text to TF-IDF features

```python title="main.py"
# create a TfidfVectorizer object
tfidf_vectorizer = TfidfVectorizer(stop_words = 'english', max_df = 0.7)
# fit and transform train set features
tfidf_train = tfidf_vectorizer.fit_transform(X_train)
# transform test set features
tfidf_test = tfidf_vectorizer.transform(X_test)
```

**max_df** _corpus-specific_ stop words: **ignore terms** that appear in more than **70%** of the documents.

### Create a PassiveAggressiveClassifier (pac) model

```python title="main.py"
# create a PassiveAggressiveClassifier object
pac = PassiveAggressiveClassifier(max_iter = 50)
# train the model using the TF-IDF train set features
pac.fit(tfidf_train, Y_train)
```

**max_iter** _epochs_: max number of passes over the training dataset.

### Predict on the test set

```python title="main.py"
# make predictions on test set
Y_pred = pac.predict(tfidf_test)
# calculate accuracy of our predictions
accuracy = accuracy_score(Y_test, Y_pred)
# print accuracy
print(f"Accuracy: {round(accuracy*100, 2)}%")
```

![image](https://user-images.githubusercontent.com/72823374/168436574-8f11d84d-f29d-49d9-aed5-83b5277e38c0.png)

Our model has an accuracy of **96.28%**.

### Draw confusion matrix

```python title="main.py"
# create a confusion matrix
cm = confusion_matrix(Y_test, Y_pred)
# create a dataframe from the confusion matrix
cm_df = pd.DataFrame(cm, ['FAKE', 'REAL'], ['FAKE', 'REAL'])
# create heatmap of the confusion matrix
ax = plt.axes()
sn.heatmap(cm_df, annot = True, annot_kws={"size":16}, fmt="g", ax = ax)
# plot the confusion matrix
ax.set_title("Confusion Matrix")
ax.set_xlabel("Predicted Labels")
ax.set_ylabel("Test Labels")
plt.show()
```

![image](https://user-images.githubusercontent.com/72823374/168438647-97a98cf6-bc42-41f3-aa9d-68a2247aea0e.png)

:::info
By the confusion matrix, we can see that **1075** of fake news were predicted correctly, unstead **40** were wrongly predicted.

**32** fake news were predicted as real news. This is wrong. But **786** real news were predicted correctly.
:::

## Link to jupyter notebook lab

[notebook](https://github.com/AhmedCoolProjects/ML/blob/main/FakeNewsDetection.ipynb)
