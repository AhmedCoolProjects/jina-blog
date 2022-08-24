---
title: Earthquake Prediction
sidebar_position: 1
---

We are going to create a deep learning model to predict if a disaster occurs in one region and if it is likely to happen again.

## 1. Collecting Data

Get the used data by saving it from this link:
[Kaggle](https://www.kaggle.com/datasets/yasserhessein/earthquake-dataset)

![image](https://user-images.githubusercontent.com/72823374/185773677-88676743-d8e9-4bc9-9ffb-6fcbf0a17cef.png)

## 2. Exploring Data

Let's import necessary libraries:

```python title="main.py"
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

Let's load and read our dataset:

```python title="main.py"
df = pd.read_csv('database.csv')
# check the current columns
df.columns
```

![image](https://user-images.githubusercontent.com/72823374/185773706-42a7b714-7bba-41bf-9c86-511b320908a7.png)

In this project we will use only the following columns:

```python title="main.py"
columns_used = ['Date', 'Time', 'Latitude', 'Longitude', 'Depth', 'Magnitude']
```

Let's subset the dataframe to only use the columns we need:

```python title="main.py"
df = df[columns_used]
df.head()
```

![image](https://user-images.githubusercontent.com/72823374/185773719-e9a29985-6938-4761-bf8f-825bf447a69a.png)

As we can see, the data is random and has different types of values. For that, we will scale it and covert it to much the input of our Network. Let's convert the date and time to Unix time _(which is in seconds)_:

```python title="main.py"
import datetime
import time

timestamp = []
for d, t in zip(df["Date"], df["Time"]):
    try:
        ts = datetime.datetime.strptime(d+ " " + t, "%m/%d/%Y %H:%M:%S")
        timestamp.append(time.mktime(ts.timetuple()))
    except:
        timestamp.append("ValueError")

timeStamp = pd.Series(timestamp)
df["Timestamp"] = timeStamp.values
final_df = df.drop(["Date","Time"], axis=1)
final_df = final_df[final_df.Timestamp != "ValueError"]
final_df.head()
```

![image](https://user-images.githubusercontent.com/72823374/185773736-e01b9db2-a4c1-4691-b215-3d62a6296521.png)

Great!

## 3. Visualizing Data

Before we start our model, let's visualize the data on a world map that shows a clear representation of where the earthquakes frequently occur.

```python title="main.py"
from mpl_toolkits.basemap import Basemap
##------------ if you got problem with mpl_toolkits import, check the tip below ----------##
m = Basemap(projection="mill", llcrnrlat=-80,urcrnrlat=80, llcrnrlon=-180,urcrnrlon=180,lat_ts=20,resolution='c')

longitudes = df["Longitude"].tolist()
latitudes = df["Latitude"].tolist()

x, y = m(longitudes, latitudes)

fig = plt.figure(figsize=(12,10))
plt.title("All affected areas")

m.plot(x, y, 'o', markersize=2, color = "blue")
m.drawcoastlines()
m.fillcontinents(color="coral", lake_color="aqua")
m.drawmapboundary()
m.drawcountries()
plt.show()
```

:::tip
in Kaggle, use the following installation:

    !pip install basemap

then, use the code above as it is.
:::

![image](https://user-images.githubusercontent.com/72823374/185773905-fc026932-45a9-443f-91be-33ba29688bf2.png)

Cool!

## 4. Data Preprocessing

Ammazing, Let's start our model. We will first split our dataset into train and test sets.

```python title="main.py"
X = final_df[["Timestamp", "Latitude", "Longitude"]]
y = final_df[["Magnitude", "Depth"]]

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)
```

![image](https://user-images.githubusercontent.com/72823374/185773972-643bc485-9d5d-44ef-84c2-10262a97ed7a.png)

## 5. Modeling

### 5.1. Creating the Networ

Now we will create a neural network to fit the data from training set. Our neural will consist of three dense layers each with 16, 16, 2 nodes and reread. Relu and softmax will be used as activation functions.

```python title="main.py"
from keras.models import Sequential
from keras.layers import Dense

def create_model(neurons, activation, optimizer, loss):
    model = Sequential()
    model.add(Dense(neurons, activation=activation, input_shape=(3,)))
    model.add(Dense(neurons, activation=activation))
    model.add(Dense(2, activation="softmax"))

    model.compile(optimizer=optimizer, loss=loss, metrics=["accuracy"])

    return model
```

Now, let's define the hyperparameters with two or more options to find the best fit:

```python title="main.py"
from keras.wrappers.scikit_learn import KerasClassifier

model = KerasClassifier(build_fn=create_model, verbose=0)

neurons = [16]
batch_size = [10]
epochs = [10]
activation = ["sigmoid","relu"]
optimizer =  ["SGD", "Adadelta"]

loss = ["squared_hinge"]

param_grid = dict(neurons=neurons, batch_size=batch_size, epochs=epochs, activation=activation, optimizer=optimizer, loss=loss)
```

Now let's find the best fit for our model, then get the mean test score and standard deviation of that best fit model:

```python title="main.py"
grid = GridSearchCV(estimator=model, param_grid=param_grid, n_jobs=-1)
grid_result = grid.fit(X_train, y_train)

print("Best: %f using %s" % (grid_result.best_score_, grid_result.best_params_))
```

![image](https://user-images.githubusercontent.com/72823374/186274102-f12e1788-9cd9-4ef5-9a30-5be7810b50b2.png)

:::note
I changed to Google Colab to use there GPU for that step.
:::

```python title="main.py"
means = grid_result.cv_results_["mean_test_score"]
stds = grid_result.cv_results_["std_test_score"]
params = grid_result.cv_results_["params"]

for mean, stdev, param in zip(means, stds, params):
    print("%f (%f) with: %r" % (mean, stdev, param))
```

Cool, so now let's use those best-fit parameters to calculate the score with the train and test data:

```python title="main.py"
model_best = Sequential()
model_best.add(Dense(16, activation="relu", input_shape=(3,)))
model_best.add(Dense(16, activation="relu"))
model_best.add(Dense(2, activation="softmax"))

model_best.compile(optimizer="SGD", loss="squared_hinge", metrics=["accuracy"])
model_best.fit(X_train, y_train, batch_size=10, epochs=20, verbose=1, validation_data=(X_test, y_test))

[test_loss, test_acc] = model_best.evaluate(X_test, y_test)

print("Evaluation result on Test Data: Loss = {}, accuracy = {}".format(test_loss, test_acc))
```

Great!, our model performs well.
Congratulations, you have finished this notebook!

### 5.2. Saving the Model

### 5.3. Loading the Model

```python title="main.py"

```

## 6. Conclusion

For more projects, check out my portfolio on [Ahmed Bargady | Projects](https://ahmedbargady.me/projects)
