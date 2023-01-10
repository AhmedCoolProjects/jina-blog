---
title: Génie Logiciel
sidebar_position: 16
---

## Software Engineering

- **méthode de travail** -> **bonnes pratiques** -> **outils** -> **normes**
- **budget** + **qualité** + **délais**
- **petit projet + petit budget** _(76%)_ > **grand projet + grand budget** _(10%)_

### Qualités

1. **Validité**: fonctionne comme prévu
2. **Fiabilité**: fonctionne sans erreur _(respecte contraintes)_
3. **Performance**: temps de réponse, _(Stress test)_
4. **Portabilité**: indépendant de l'environnement, _(cross platforms, containers)_
5. **Réutilisabilité** + **Interopérabilité**: communication avec autre logiciels _(Design Patterns, Microservices, ..)_
6. **Maintenabilité**: facile à modifier, _(couplage faible, modularité)_
7. **Utilisabilité**: facile à installer, utiliser, controler _(manuel, ergonomie, messages)_
8. **Intégrité**: détecter les opérations non autorisées _(cryptographie, authentification, VPN, Pare-feu)_

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

- **online** -> **serveur** -> **client**
- **can't work if a problem happend to the server**
- **versionner** == **partager**
- **modéfication**: _Delta Storage_ seulement les différences

#### Distribués

- **dépot local** _(historique, ...)_ + **dépot distant** _(collaboration, ...)_ -> **rapide**
- **modéfication**: nouvelle version si le fichier etait modifié + référence si non

_(Chef projet, DevOps, Dev)_

### Git vs SVN

- **git** -> **100+**
- **svn** -> **33**

#### Git

- **files**: **untracked** _(non versionné)_ + **staged** _(indexé pour commit)_ + **unmodified** _(non modéfié)_ + **modified** _(copie différente du dépot)_

- `git branch name` -> **créer** une branche
- `git branch -d name` -> **supprimer** une branche

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
