---
sidebar_position: 1
title: Stock Price Prediction
slug: stock-price-prediction
---

# Description

Stock price analysis has been a critical area of research and is one of the top applications of machine learning.

In this project, we will create a stock price prediction model with a high level of accuracy, so we can use it for different datasets.

# Steps

In this project, we will create our model first, then we will create an interactive dashboard to work with our model.

## Step 1: Importing libraries

We will need for this project:

- **pandas**: to create DataFrames
- **Matplotlib**: to create plots and visualize our data
- **keras**: to create our model
- **MinMaxScaler**: to scale our data and normalize it
- **numpy**: to create arrays

```python title="main.py"
import pandas as pd
import matplotlib.pyplot as plt
%matplotlib inline
from matplotlib.pylab import rcParams
rcParams['figure.figsize'] = 16, 8
from keras.models import Sequential
from keras.layers import LSTM, Dropout, Dense
from sklearn.preprocessing import MinMaxScaler
import numpy as np
```

## Step 2: Importing datasets

Well, to create our model, we will use the **NSE TATA GLOBAL** dataset. _(National Stock Exchange of India)_

- [LINK TO NSE TATA GLOBAL Dataset](https://drive.google.com/file/d/12ARdY40m2D_Woxz2ZEeMgoLkxKmLpJ4K/view?usp=sharing)

To develope our dashboard, we will use different stock datasets from _Apple_, _Microsoft_ and _Facebook_.

- [LINK TO STOCK Dataset](https://drive.google.com/file/d/1yE8dBFX1vnAg6J5vZb5Jm05T1LXKfqWr/view?usp=sharing)

```python title="main.py"
df = pd.read_csv("/content/NSE-Tata-Global-Beverages-Limited.csv")
df.head()
```

![image](https://user-images.githubusercontent.com/72823374/170147665-7607bd48-7f11-4c3f-b5a6-a54ad4113690.png)

```python title="main.py"
df.info()
```

![image](https://user-images.githubusercontent.com/72823374/170147883-14c59326-c5ee-4f0b-9f6d-8cbb04ad493d.png)

As we can see, the dataset has **1235** entries with **8** columns and **no missing** values.

## Step 3: Data Preprocessing

From the previous picture, we can see that the **Date** column is considered as an **object** type. So let's convert it to **datetime** type.

```python title="main.py"
df["Date"] = pd.to_datetime(df["Date"], format="%Y-%m-%d")
# let's set the index to be the date
df.set_index("Date", inplace=True)
# let's plot the Close column
plt.plot(df["Close"], label="Close Price History")
plt.show()
```

![image](https://user-images.githubusercontent.com/72823374/170149276-1406fea1-8163-4136-b7a5-5fcb124e8563.png)

Let's now sort our dataset on the **Date** column in ascending order, then filter our dataset in an new one with **Date** and **Close** columns only.

```python title="main.py"
data = df.sort_index(ascending=True, axis=0)
data = data[["Close"]]
data.head()
```

![image](https://user-images.githubusercontent.com/72823374/170150483-915e36a0-e2e0-4f40-9302-55101a799c01.png)

Let's now normalize our new dataset.

```python title="main.py"
# create numpy array from data
training_set = data.to_numpy()
# to transform features by scaling each feature to a given range (usually 0 to 1)
scaler = MinMaxScaler(feature_range=(0, 1))
# to rescale our features to have a mean as 0 and a variance of 1 and bring them down to a common scale without distorting the distribution
scaled_training_set = scaler.fit_transform(training_set)
```

Now we are going to create our **feature set** and our **label set**.

```python title="main.py"
# The X_train would be a list of 60 values followed by the label in Y_train
X_train, Y_train = [], []
for i in range(60, training_set.shape[0]):
    X_train.append(scaled_training_set[i-60:i, 0])
    Y_train.append(scaled_training_set[i, 0])
# convert our lists to numpy arrays
X_train, Y_train = np.array(X_train), np.array(Y_train)
# Reshaping our X_train to 3rd dim and Y_train to 2nd dim
X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))
Y_train = np.reshape(Y_train, (Y_train.shape[0], 1))
print(X_train.shape, Y_train.shape)
```

![image](https://user-images.githubusercontent.com/72823374/170420356-25eb7f79-5536-47f8-a67d-c330d72ffceb.png)

## Step 4: Creating, Building, Compiling and Training our model

Now we are going to create our **model** using Sequential model. This one is appropriate for a plain stack of layers where each layer has exactly one input tensor and one output tensor.

```python title="main.py"
# create model
lstm_model = Sequential()
# Building our layers
'''
Long Short-Term Memory (LSTM)
This layer will choose different implementations (cuDNN or pure TensorFlow) to maximize the performance of the model.
'''
lstm_model.add(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1], 1)))
'''
Dropout, this layer randomly sets input units to 0 with a frequency of rate at each step during training time, which helps prevent overfitting.
'''
lstm_model.add(Dropout(0.2))
lstm_model.add(LSTM(units=50, return_sequences=True))
lstm_model.add(Dropout(0.2))
lstm_model.add(LSTM(units=50, return_sequences=True))
lstm_model.add(Dropout(0.2))
lstm_model.add(LSTM(units=50))
lstm_model.add(Dropout(0.2))
'''
Dense, this layer is fully connected layer, and each neuron receives input from all the neurons of previous layer.
'''
lstm_model.add(Dense(units=1))
```

Let's compile our model.

```python title="main.py"
lstm_model.compile(optimizer="adam", loss="mean_squared_error")
lstm_model.summary()
```

Let's now fit our model.

```python title="main.py"
lstm_model.fit(X_train, Y_train, epochs=100, batch_size=32)
```

![image](https://user-images.githubusercontent.com/72823374/170424357-2158d820-2e3e-432e-a384-3a3d739962b9.png)

## Step 5: Saving our model

We can now save our model to deploy it later without the need to train it again.

```python title="main.py"
# save json file that contains model architecture
lstm_model_json = lstm_model.to_json()
with open("model.json", "w") as json_file:
    json_file.write(lstm_model_json)
# save weights of model
lstm_model.save_weights("model.h5")
```

![image](https://user-images.githubusercontent.com/72823374/170424442-b2d7ec0d-7927-4d97-8301-ee96b8ffe663.png)

## Step 6: Making predictions

Let's test our model on 20 values from our dataset.

```python title="main.py"
X_test, Y_test = [], []
for i in range(120, 140):
    X_test.append(scaled_training_set[i-60:i, 0])
    Y_test.append(scaled_training_set[i, 0])
X_test, Y_test = np.array(X_test), np.array(Y_test)
X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))
Y_test = np.reshape(Y_test, (Y_test.shape[0], 1))
# make predictions
X_test_predictions = lstm_model.predict(X_test)
# invert predictions
X_test_predictions = scaler.inverse_transform(X_test_predictions)
# invert the scaling for actual
Y_test = scaler.inverse_transform(Y_test)
# Visualize the predictions and actual values
plt.plot(X_test_predictions, color="blue",label="Predictions")
plt.plot(Y_test, color="red", label="Actual")
plt.title("Predictions vs Actual on 20 values from NSE TATA GLOBAL Dataset")
plt.xlabel("Time")
plt.ylabel("Close Price")
plt.legend()
plt.show()
```

![image](https://user-images.githubusercontent.com/72823374/170424510-c40401c8-472a-4e93-ad1c-53694dd79d5b.png)

As we can see, our model is pretty good at predicting the future values. (◕‿◕)

## Step 7: Testing on new data

let's load the second dataset.

```python title="main.py"
df2 = pd.read_csv("/content/stock_data.csv")
data2 = df2[['Close', 'Date']]
data2['Date'] = pd.to_datetime(data2['Date'], format='%Y-%m-%d')
data2.set_index('Date', inplace=True)
data2 = data2.sort_index(ascending=True, axis=0)
data2_array = data2.to_numpy()[:100]
scaled_data2 = scaler.fit_transform(data2_array)
X_test_2, Y_test_2 = [], []
for i in range(60, 80):
    X_test_2.append(scaled_data2[i-60:i, 0])
    Y_test_2.append(scaled_data2[i, 0])
X_test_2, Y_test_2 = np.array(X_test_2), np.array(Y_test_2)
X_test_2 = np.reshape(X_test_2, (X_test_2.shape[0], X_test_2.shape[1], 1))
Y_test_2 = np.reshape(Y_test_2, (Y_test_2.shape[0], 1))
# make predictions
X_test_predictions_2 = lstm_model.predict(X_test_2)
# invert predictions
X_test_predictions_2 = scaler.inverse_transform(X_test_predictions_2)
# invert the scaling for actual
Y_test_2 = scaler.inverse_transform(Y_test_2)
# Visualize the predictions and actual values
plt.plot(X_test_predictions_2, color="blue", label="Predictions")
plt.plot(Y_test_2, color="red", label="Actual")
plt.title("Predictions vs Actual on 20 values from New Dataset")
plt.xlabel("Time")
plt.ylabel("Close Price")
plt.legend()
plt.show()
```

![image](https://user-images.githubusercontent.com/72823374/170427237-a13f5ac4-ad43-44d7-9cea-23a4cae56a06.png)

Amazing! Our model is still pretty good at predicting the future values. (◕‿◕)

# Conclusion

We have successfully built a model that can predict the future values of a stock price.
