---
title: Génie Logiciel
sidebar_position: 16
---

## Software Engineering

- **méthode de travail** -> **bonnes pratiques** -> **outils** -> **normes**
- **budget** + **qualité** + **délais**
- **petit projet + petit budget** _(76%)_ > **grand projet + grand budget** _(10%)_

## Gestion de versions

### Gestion Configurations

- Séparer les roles
- Collaborer
- Travail simultané
- Plusieurs environnements

-> **Collaboration** + **Timeline** + **Versionning** + **Rollback**
-> **QUI**, **QUOI** et **QUAND**

### Types

#### Locaux

- **offline** -> **simple db** -> **file system**
- **no collaboration** -> **linear timeline** -> **sensible to pannes**

#### Centralisés

#### Distribués

_(Chef projet, DevOps, Dev)_

## Build Tools

### MAVEN

- **automatisation** -> **compilation** + **test** + **rapports** + **artifacts** _(.jar, .war)_ + **deployment**
- **gestion de dépendances** + **documentation technique**

- Model POM (Project Object Model): Convention Over Configuration _(COC)_
- **POM.xml**: permet l'éxecution du projet
- **COC**: _(standardiser: structure, nommage, build, projet leger)_

#### POM.xml

- **groupId**: nom du domaine à l'envers
- **artifactId**: nom du projet
- **version**: version minimale _(0.0.0-alpha)_ + **SNAPSHOT** _(replacé par dateHeureUTC - packaging)_
- packaging: _.jar_, _.war_, _.ear_
- **Porté (scope)**: _compile_, _provided (servlets)_, _runtime (execution et test: driver jdbc)_, _test (just test)_, _system (probided + chemain précis)_

#### Plugins

- **.jar** -> **goals**

#### Cibles

- **mvn compile** _(target)_
- **mvn package**
- **mvn install** _(local repository)_
- **mvn clean** _(target)_

#### Dépots

- **local**: requis
- **central**: par tout le monde

## CI

- **modéfication** -> **build** -> **test** -> **rapport**
