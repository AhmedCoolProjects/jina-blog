---
title: Valid Anagram
sidebar_position: 3
---

| Problem Number | Problem Link                                                              | My Solution                                                                              |
| -------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 243            | [Valid Anagram](https://leetcode.com/problems/valid-anagram/description/) | [Solution](https://leetcode.com/problems/valid-anagram/solutions/2912771/valid-anagram/) |

## First Look?

Given two strings s and t , write a function to determine if t is an anagram of s.

## Solution

### Step 1

We can simply sort both strings and compare them. If they are equal, then they are anagrams.

```python
return sorted(s) == sorted(t)
```

## Final Solution

```python
class Solution(object):
    def isAnagram(self, s, t):
        return sorted(s) == sorted(t)
```
