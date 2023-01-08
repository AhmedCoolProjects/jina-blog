---
title: Conception et réalisation d'un datawarehouse
sidebar_position: 18
---

## Problématique

- **difficile à accéder et exploiter**
- **obtenir des informations facilement**
- **analyser les données dans tous les sens**

## Définitions

- **BI**:

  **solutions informatiques** -> (**chaine**, **rapports**, **tableaux de bord** `analytiques` et `prospectives`)
  -> **la prise de décision** + **consolidation des informations**.

- **Datawarehouse**:

  **collection** -> **historiques / transactionnelles**
  -> **consolidé de diff origines** -> **orienté sujet**
  -> **non variable** -> **historisée** -> **intégrée**
  -> **interrogation** + **analyse**

- **ETL**:

  **intégration** -> **automatiser chargement** -> **datawarehouse**

## Niveaux de décision

- **Traitement Opérationnel**: **quotidien** _(capture, stockage, manipulation)_.
- **Traitement Analytique**: **analyse pour la décision** _(ces données + autres formes de données)_.

## SGBD vs Datawarehouse

- **SGBD**:

  **transactionnel (court)** -> **nombreause** -> **simple** -> **detaillées** -> **gestion (courant)** -> **département**.

- **Entrepôt**:

  **transaction (longue)** -> **peu** -> **requetes complexes** -> **détaillées + agrégées** -> **analyse (historique)** -> **transversal**.

:::note OLTP / DW / Flux

`mal adapté à l'analyse`

---

**DB** + **data integration** + **data cleaning** -> **datawarehouse**

---

**flux physique** -> **flux d'information** -> **flux de décision**

:::

## Architecture des systèmes décisionnels

**source** -> **ETL** -> **datawarehouse (data marts)** -> **OLAP** / **Reporting**

### Source

- **BD interne** _(produites, by users)_
- **BD externe** _(veille, web, social, achetées)_

### ETL

#### Problèmes

- **normalisation** _(encodage, unité, normes, abréviations)_.
- **donnée** _(manquantes, incorrectes, redondance sémantique)_.
- **incohérence** _(codes, référentiels)_

#### Etapes

- **E**:

  **plateformes** -> **incrémentale / complte**

- **T**:

  **fromats** -> **NULL** -> **Calculs** -> **Fusion** -> **Fractionnement** -> **Conversion unités / dates** -> **déduplication**

#### ETL vs ELT

- **ETL** -> **ELT**
- **ELT** -> **utilisation rapide** -> **volume** -> **3types**
- **ETL** -> **structured** -> **sgbd + flat files**

### Datawarehouse

#### 5 Qualités

- **précises** -> **complètes** -> **cohérentes** -> **Uniques** -> **rapide**

#### 4 Propriétés

- **subject oriented**
- **integrated**: **hétérogène -> format cohérent** + **nomination** _(m,f)_ + **unité** _(usd, mad)_
- **non volatile**: **stable non modifiable, suprimable, lecture seulement** _(only: chargement + accés)_
- **time variant**: **historique** -> **fixe**

#### Modélisation Multidimensionnelle

- **table de fait**: **mesure** + **indicateurs quantitatifs** -> **bon suivi**
- **table de dimension**: **axe d'analyse** -> **attributs avec les quelles les indicateurs quantitatifs sont calculés** + **hiérarchie (regroupement)**
