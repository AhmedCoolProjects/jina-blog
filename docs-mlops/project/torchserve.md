---
title: MinIO - Torchserve
sidebar_position: 1
---

:::note Pre-requists

1. `minio server`, we can use its docker image, run:

   ```bash

   ```

   then create and run container with name _minio_:

   ```bash
   sudo docker run \
        -p 9000:9000 \
        -p 9090:9090 \
        --name minio \
        -v ~/minio/data:/data \
        -e "MINIO_ROOT_USER=minioadmin" \
        -e "MINIO_ROOT_PASSWORD=minioadmin" \
        quay.io/minio/minio server /data --console-address ":9090"
   ```

   then start our container by running:

   ```bash
   sudo docker start minio
   ```

2. `minio client`, we gonna use minioClient python package, create your venv, activate it and then run:

   ```bash
   pip install minio
   ```

3. `torchserve`, you can install it by running:

   ```bash
   pip install torchserve
   ```

:::

# Steps

## 1. Download models from store

Use minio client to request for selected models:

```py


```

### 1.1. Authentication Management

Our MinIO client would have `readOnly` access to our `bucket`. So the _access_key_ and _secret_key_ are just for reading only.

```json title="Policies for readOnly"

```

### 1.2. Exeptions Management

### 1.3. Data Encryption

## 2. Serve models

### 2.1. Validating models

:::caution TODO
In this first version of our **Model Validation _(Checking)_** API, we gonna use `unzip` command line to make sure that at least our `.mar` model is not empty and unzipable.

---

This should be updated for more accurate approach
:::

### 2.2. Serving models
