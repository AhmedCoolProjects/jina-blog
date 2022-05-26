---
title: Handwriting Digits Recogantion version 1.0
authors: [AhmedBargady]
tags: [dl, recognation, keras, tensorflow, mnist, cnn, python]
---

## Motevation

The purpose of this project is to create a machine learning model that can recognize human handwritten digits.

_(the dataset will be imported from keras librarie)_
:::note
In this version, we are going to use the MNIST dataset and special type of deep neural network that is **Convolutional Neural Network**.
:::

## Necessary Libraries

- **numpy**: to convert images to arrays.
- **keras**: to import the dataset and create the model.

## Start Coding

### Import libraries

```python title="main.py"
from tensorflow import keras
from keras.datasets import mnist
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D
from keras import backend as k
```

### Import dataset

```python title="main.py"
# get data
(x_train, y_train), (x_test, y_test) = mnist.load_data()
# check the shape of the data
print(x_train.shape, y_train.shape)
```

![image](https://user-images.githubusercontent.com/72823374/168574739-2017430b-cf18-4a3e-bd46-e0229fb85cb6.png)

### Visualize the data

```python title="main.py"
# import matplotlib.pyplot
import matplotlib.pyplot as plt
# plot the first 9 images from the training set
for i in range(9):
    plt.subplot(330 + 1 + i)
    plt.imshow(x_train[i], cmap = plt.get_cmap("gray"))
plt.show()
```

![image](https://user-images.githubusercontent.com/72823374/168575491-4acb7ad1-1c49-466c-966a-262305167db1.png)

### Prepare the data

```python title="main.py"
# reshape the features data
x_train = x_train.reshape(x_train.shape[0], 28, 28, 1)
x_test = x_test.reshape(x_test.shape[0], 28, 28, 1)
# convert class vectors (labels) to binary class matrices
y_train = keras.utils.to_categorical(y_train, 10)
y_test = keras.utils.to_categorical(y_test, 10)
# normalize the features data
x_train = x_train.astype("float32") / 255
x_test = x_test.astype("float32") / 255
# check the shape of the data

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
