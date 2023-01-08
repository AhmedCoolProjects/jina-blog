---
title: Natural Language Processing
sidebar_position: 10
---

## 1. NLP

- **NLP** = **AI** + **CS** + **Human Language**

### 1.1. Tasks

- **NER**: Named Entity Recognition _(BERT)_
- **MLM**: Masked Language Modeling _(fill in the blank)_
- **MT**: Machine Translation _(English to Arabic)_
- **Summarization**: _(extractive, abstractive)_
- **QA**: Question Answering _(extractive, generative)_
- **Text Similarity**: _(Sentence-BERT / S-BERT)_
- **Text Generation**: complete a sentence _(GPT-2)_

## 2. Word Embeddings

Convert words to vectors

:::caution Same Meaning

Words with same meaning should have **similar vectors**

:::

:::info History

- **One-Hot Encoding**, **Bag of Words** _(1990)_
- **TF-IDF**
- **Word2Vec** _(2013)_
- **GloVe** _(2014)_
- **FastText** _(2016)_
- **ELMO**, **ULM-FIT**, **BERT** _(2018)_

:::

### 2.1. One-Hot Encoding

- **huge vector size** + **no semantic meaning** -> **poor performance**

### 2.2. Bag of Words (BOW)

Count the frequency of each word in a document

- **Clean Text** _(remove stop words, punctuation, etc.)_
- **Tokenize** _(split text part into tokens)_
- **Build Vocabulary** _(unique words + count)_
- **Generate Vectors** _(vector size = vocabulary size)_

```python title="BOW.py"
from sklearn.feature_extraction.text import CountVectorizer

vectorizer = CountVectorizer()
x = vectorizer.fit_transform(["John likes to watch movies. Mary likes movies too", "John also likes to watch football games"])
print(x.toarray())
```

- **no semantic meaning** -> **poor performance**

### 2.3. TF-IDF

**T**erm **F**requency - **I**nverse **D**ocument **F**requency

How important is a word in a document?

:::info Meaning

Used to find meaning of a sentence + good for classification

:::

- **TF**: count of term in document

  $\boxed{\text{TF}(t, d) = \text{log}(1 + \text{freq}(t, d))}$

- **IDF**: how rare is the term in the corpus

  $\boxed{\text{IDF}(t, D) = \text{log}(\frac{\text{N}}{\text{count}(t, D)})}$

- **rare words** -> **high score**
- **common words** -> **low score**
- **Higher TF-IDF in doc** -> **doc is the most relevant**

### 2.4. Word2Vec (the real beggining)

GenSim

#### Semantic Similarity

- **cosine similarity** -> **doc similarity** -> $\boxed{\text{similarity}(x, y) = \frac{x \cdot y}{\|x\| \|y\|}}$
- **euclidean distance** -> $\boxed{\text{distance}(x, y) = \sqrt{\sum_{i=1}^{n} (x_i - y_i)^2}}$

#### C-BOW

Uses n future words and n past words to predict the current work

- **good for large docs** -> **performance for freq words** -> **faster training**

#### Skip-gram

Uses the current word to predict n future words and n past words

- **well for small docs** -> **well for rare words** -> **slower training**

### 2.5. GloVe

`not window-based` -> **word co-occurrence** -> **word vectors**

- fast training -> one count in at a time

### 2.6. FastText _(by facebook)_

`generalization to unknown words`

- **chars instead of words** -> **combination of lower words-embedding** -> **n-gram** -> **suffixes + prefixes**

### 2.7. ELMO

### 2.8. ULM-FIT

### 2.9. BERT

## 3. RNN (Recurrent Neural Networks)

- Understanding in the context with historical data _(information persists, loops)_
- capture **dependencies** _(memory)_
- takes up **less ram and space**

### Problem

- Uses previous inputs and not the future inputs

### Solution

**BiRNN** _(Bidirectional RNN)_

### Types

- **One-to-One**: image classification
- **One-to-Many**: image captioning
- **Many-to-One**: sentiment analysis
- **Many-to-Many**: machine translation

### Other problem

- if a long back-propagation is needed, the **gradient will vanish** -> **no real learning is done**, lost of information
- large updates in model weights -> **gradient explosion**
- Prone to **vanishing gradient** and **gradient explosion**

## 4. LSTM Networks (Long Short-Term Memory)

- Learn long-term dependencies -> rememebr information for a long time

## 5. Transformer

`Attention is all you need` by Ashish Vaswani et al. (2017)

- **encoder** -> **decoder**

### Encoder

- **text** -> _Encoder 1_ -> **vectors** -> _Encoder 2_ -> **vectors** -> _Encoder 3_ -> **vectors** ...
- **vectors/text** -> **self-attention** _(dependencies)_ -> **feed-forward network**
- **NLU** _(understanding the meaning / positive - negative)_, **QA**, **MLM** _(guessing using bi-directional)_ -> **BERT**, **RoBERTa**, **ALBERT**

### Decoder

- **vectors** -> **text** _(can also accept text as input)_
- **masked self-attention** _(words use only others in the left side, right are hidden)_ + `auto-regressive` + `uni-directional` _(from left to right or right to left context)_
- **NLG** _(generating text)_, **Causal Tasks** _(predicting the next word)_ -> **GPT-2**, **GPT-Neo**

### Encoder-Decoder - stack of encoders and decoders

**text** -> **encoder** -> **vectors** -> **decoder** -> **predicted text**

### Seq2Seq

**text** -> **encoder** -> **vectors** _(fixed length)_ -> **decoder** -> **predicted text**

### Problems

- **long sequences** + **fixed length**

### Solution

- **Attention Mechanism (models)** _(only pay attention to the relevant parts of the input)_ -> **Translators**

:::note Encoders / Decoders

- the stack of encoders can have **different weights** for each encoder
- each one -> **two sub-layers** _(self-attention, feed-forward network)_
- decoder -> **three sub-layers** _(self-attention, encoder-decoder attention, feed-forward network)_

---

- **encoder-decoder attention** -> focus on relevant parts of the sentence

---

Embedding only in **BOTTOM ENCODER**

:::

### Self-Attention

1. Create: **query**, **key**, **value** vectors
2. Calculate: **self-attention score** -> $\text{score}(Q, K) = Q \cdot K^T$
3. Devide by 8: $\frac{\text{Score}}{\sqrt{dimension}}$
4. Apply Softmax: **normalization** positive + add up to **1**
5. $\text{Softmax}\times\text{V}$
6. Sum weighted value vectors

:::tip Conclusion Self-Attention

getting Q, K and V, using the X with the weighted trained matrices _(WQ, WK, WV)_

---

$\boxed{\text{Softmax}\lparen\frac{Q \cdot K^T}{\sqrt{dimension}}\rparen \times \text{V}}$

:::

## 4. Practical Examples

### 4.1. Word2Vec

Given two docs with vectors $x$ and $y$, where:

- $x = (5,0,3,0,2,0,0,2,0,0)$
- $y = (3,0,2,0,1,1,0,1,0,1)$

Calculate the **cosine similarity** between $x$ and $y$

- $x \cdot y = 5 \times 3 + 3 \times 2 + 2 \times 1 + 2 \times 1 = 25$
- $\|x\| = \sqrt{5^2 + 3^2 + 2^2 + 2^2} = \sqrt{42} = 6.48$
- $\|y\| = \sqrt{3^2 + 2^2 + 1^2 + 1^2 + 1^2 + 1^2} = \sqrt{17} = 4.12$
  Then: similarity = $\frac{25}{6.48 \times 4.12} = 0.94$

Calculate the **euclidean distance** between $x$ and $y$

- $d(x, y) = \sqrt{(5-3)^2 + (0-0)^2 + (3-2)^2 + (0-0)^2 + (2-1)^2 + (0-1)^2 + (0-0)^2 + (2-1)^2 + (0-0)^2 + (0-1)^2} = \sqrt{9} = 3$
