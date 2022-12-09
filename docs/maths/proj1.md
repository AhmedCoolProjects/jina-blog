---
sidebar_position: 1
title: 3.9 - Related Rates
---

[Link to the Lecture Support](https://firebasestorage.googleapis.com/v0/b/jina-pro.appspot.com/o/jina-blog%2Fpdfs%2FMATHS101-Sec3.9-PDF.pdf?alt=media&token=4deef356-e7f7-42f6-aedd-a2f2929e60de)

## In brief

The idea is to get an **euqation** for the **rate of change** of _quantity 1_ with respect to _quantity 2_.

Then we can use this equation to find the rate of change for **quantity 1** _(which gonna be kinda difficult without relating it to quanity 2)_ when **quantity 2** changes.

## Examples

### Example 1

- quantity 1: radius of the sphere
- quantity 2: volume of the sphere, rate 100 $$cm^{3}/s$$

let's get the rate of increasing for the radius when the diameter is 50 cm, means ** $$\boxed{\frac{dr}{dt}}$$when $$\boxed{r = 25 cm}$$**

1. find a relation between the radius and the volume

   $$\boxed{V = \frac{4}{3}\pi r^{3}}$$

2. find the rate of change of the volume with respect to time

   $$\boxed{\frac{dV}{dt} = 4\pi r^{2}\frac{dr}{dt}}$$

3. we have 3 varaibles: $$\boxed{\frac{dV}{dt}}$$, $$\boxed{r}$$ and $$\boxed{\frac{dr}{dt}}$$

   $$\boxed{\frac{dV}{dt} = 100 cm^{3}/s}$$

   $$\boxed{r = 25 cm}$$

   $$\boxed{\frac{dr}{dt} =  ?}$$

4. let's get $$\boxed{\frac{dr}{dt}}$$ in terms of the other variables:

   $$\boxed{\frac{dr}{dt} = \frac{100 cm^{3}/s}{4\pi r^{2}}}$$

   $$\boxed{\frac{dr}{dt} = \frac{100 cm^{3}/s}{4\pi (25 cm)^{2}}}$$

   $$\boxed{\frac{dr}{dt} = \frac{1 cm^{3}/s}{25\pi cm^{2}}}$$

   $$\boxed{\frac{dr}{dt} = \frac{1}{25\pi} cm/s}$$

### Example 2

- quantity 1: distance of sliding on the wall for the ladder _(from the top)_
- quantity 2: distance of the ladder from the wall _(on the ground)_, rate 1 $$m/s$$

we know that: ladder is 5 m long

let's get the rate of sliding speed when the ladder is 3 m from the wall, means ** $$\boxed{\frac{dy}{dt}}$$when $$\boxed{x = 3 m}$$**
