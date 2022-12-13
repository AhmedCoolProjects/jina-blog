---
title: Two Sum
sidebar_position: 1
---

| Problem Number | Problem Link                                      | My Solution                                                                  |
| -------------- | ------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1              | [Two Sum](https://leetcode.com/problems/two-sum/) | [Solution](https://leetcode.com/problems/two-sum/solutions/2907551/two-sum/) |

## First Look?

It's prefered to have a solution with less than **O(n^2)** time complexity.

So we can't use nested loops to solve this problem with an efficient time complexity.

## Solution

### Step 1

We can notice the relation between the wanted **two numbers** and the **target**: **target = num1 + num2**.

If we have a **num1** while looping through the array, we can find the **num2** by subtracting **num1** from the **target**. So we will not need to loop through the array again, and the time complexity will be **O(n)**.

### Step 2

Let's create a **map** to store the **difference** and the **index** of the **num1** all the way we loop through the array.

```python
map = {} # key: difference, value: index of the num2
```

### Step 3

Now we can loop and check if the **difference** of the current **num1** and the **target** is in the **map** or not.

- if exists: return the **index** from the **map** and the current **index** of the **num1**.
- if not: add the **num1** and the current **index** to the **map**.

```python
for i, num1 in enumerate(nums):
    if target - num1 in map:
        return [map[target - num1], i]
    map[num1] = i
```

## Final Solution

```python
class Solution(object):
    def twoSum(self, nums, target):
        map = {} # key: difference, value: index of the num2
        for i, num1 in enumerate(nums):
            if target - num1 in map:
                return [map[target - num1], i]
            map[num1] = i
```
