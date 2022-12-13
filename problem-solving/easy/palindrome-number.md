---
title: Palindrome Number
sidebar_position: 2
---

| Problem Number | Problem Link                                                          | My Solution                                                                                      |
| -------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 2              | [Palindrome Number](https://leetcode.com/problems/palindrome-number/) | [Solution](https://leetcode.com/problems/palindrome-number/solutions/2908019/palindrome-number/) |

## First Look?

Let's solve this problem without converting the number to string.

## Solution

### Step 1

First, we will check if the number is negative or not. If it is negative, then it is not a palindrome number.

```python
if x < 0:
    return False
```

### Step 2

Now, we will reverse the number and check if it is equal to the original number or not.

```python
reverse = 0
number = x

while number:
    reverse = number % 10 + reverse * 10
    number //= 10
return x == reverse
```

## Final Solution

```python
class Solution(object):
    def isPalindrome(self, x):
        if x < 0:
            return False
        reverse = 0
        number = x
        while number:
            reverse = number % 10 + reverse * 10
            number //= 10
        return x == reverse
```
