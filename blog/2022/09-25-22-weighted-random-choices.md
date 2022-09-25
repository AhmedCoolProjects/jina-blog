---
title: Weighted Random Choices (Python)
authors: [AhmedBargady]
tags: [random, choices, weight, python]
---

Generating random numbers is a common task in programming, especially in games, simulations, and data science.

Any programming language has a built-in ways to generate random numbers, **BUT** sometimes you need to generate random numbers with a specific probability distribution _(e.g. weighted random choices)_. For python, there's `random` module.

The code for rolling a regular six-sided die usually looks something like this:

```python
import random

roll = random.randint(1, 6)
# output:
# 1, 2, 3, 4, 5, or 6
```

This is a simple technique if it's enough for you. But there's sometimes you need more control over the probability distribution of the random numbers.

## Case 1: Simple Choices

If you need to pick a single value out of a list _(array, vector, etc.)_ with equal probability, you follow the same technique for rolling a die:

```python
import random

choices = [1, 2, 3, 4, 5, 6]
roll = random.randint(0, len(choices) - 1)
# output:
# 1, 2, 3, 4, 5, or 6
```

OR, for python:

```python
import random

choices = [1, 2, 3, 4, 5, 6]
# random has a choice function that satisfies our needs
roll = random.choice(choices)
# output:
# 1, 2, 3, 4, 5, or 6
```

## Case 2: Harder Choices

In this case, when our choices are not equally likely. If everything has the same probability, then there's no need for statistics as a science. But in real life, things are not that simple.

For example, in games, lotteries work the same way as rolling a die. For some games, that may be enough, but for others, you need to control the probability distribution of each choice.

Another example of rolling multiple dice. If you roll two dice, the probability of getting a 2 or 12 is 1/36, while the probability of getting a 7 is 1/6. So, the probability of getting a 7 is 6 times higher than the probability of getting a 2 or 12. _(Due to what's called the central limit theorem)_.

Another example of a list with a weird distribution of frequencies like the letters in English text. Out of every 8 letters, on avrage, is _E_, but _Z_ appears only once in every 800+ letters.

### Getting a problem to work on

Let's say we are making a work game that, for whatever reason, uses the letter tiles from [Scrabble](http://en.wikipedia.org/wiki/Scrabble_letter_distributions#English).

### Our way of thinking

1. Let's define the letters list that we want to choose from: _(note: space represents the blank tiles)_

```python title="main.py"
letters = ['a','b','c','d','e','f','g','h', 'i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' ']
```

While this is an uneven distribution, we need to represent each probability for each choice. We can do this by creating a list of _weights_ that represent the list of our letters probabilities.

```python title="main.py"
weights = [9, 2, 2, 4, 12, 2, 3, 2,9, 1, 1, 4, 2, 6, 8, 2, 1, 6, 4,6, 4, 2, 2, 1, 2, 1, 2]
```

For our case, the sum of all the weights is **102** _(100 letters, 2 blanks)_.

The Frequency of each letter is the ratio of each weight to the sum of all the weights. For example, _E_ has a frequency of **12/102**. _(or about 11.8%)_

Let's apply this method of choosing in python:

```python title="main.py"
def random_letter():
    totalWeight = sum(weights)

    randomNum = random.randint(0, totalWeight - 1)

    for i in range(len(weights)):
        if randomNum < weights[i]:
            return letters[i]
        else:
            randomNum -= weights[i]

```

And that's it!

## References

This article is based on [Weighted Random Choices (JS)](https://prosepoetrycode.potterpcs.net/2015/05/weighted-random-choices-js/) article.
