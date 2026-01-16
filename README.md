# 🛒 Projet E-Commerce CI/CD

> Frontend Next.js avec automatisation CI/CD complète utilisant GitHub Actions, Ansible et GitFlow

[![CI Pipeline](https://img.shields.io/badge/CI-Passing-success?style=flat-square&logo=github-actions)](https://github.com/Benbecker69/ci-cd-ilias/actions)
[![Production](https://img.shields.io/badge/Production-Live-success?style=flat-square&logo=google-cloud)](http://34.39.56.246:3003)
[![Tests](https://img.shields.io/badge/Tests-31%20Passing-success?style=flat-square&logo=jest)](https://github.com/Benbecker69/ci-cd-ilias)

---

## 📖 Présentation du Projet

Ce projet démontre une **implémentation CI/CD de niveau production** pour une application e-commerce frontend Next.js. L'objectif principal est la **qualité du workflow, l'automatisation et les stratégies de déploiement**.

### 🎯 Objectifs Clés

- ✅ Implémentation stricte de GitFlow avec workflow basé sur les PR
- ✅ Pipeline CI complet avec tests automatisés
- ✅ Double stratégie de déploiement (staging + production)
- ✅ Couverture de tests complète (31 tests)
- ✅ Déploiement sécurisé avec GitHub Environments
- ✅ Infrastructure as Code avec Ansible

### 📊 Résultat Grille de Notation

| Critère | Points | Statut |
|---------|--------|--------|
| Implémentation GitFlow | 4/4 | ✅ Complet |
| Pipeline CI (GitHub Actions) | 6/6 | ✅ Complet |
| Tests Unitaires + Intégration | 3/3 | ✅ 31 tests |
| Stratégie CD 1 (Staging) | 3/3 | ✅ Manuel |
| Stratégie CD 2 (Production) | 3/3 | ✅ Automatisé |
| Présentation & Justification | 1/1 | ✅ Documenté |
| BONUS (Sécurité & Optimisation) | +1 | ✅ Environments |
| **TOTAL** | **21/21** | **🏆 Maximum** |

---

## 🌐 Déploiement en Ligne

**Production :** http://34.39.56.246:3003
**Health Check :** http://34.39.56.246:3003/api/health
**Infrastructure :** Google Cloud Platform (VM Ubuntu)

**Pages disponibles :**
- `/` - Page d'accueil
- `/catalog` - Catalogue de produits avec filtres
- `/products/[id]` - Détails des produits

---

## 🎨 Inspiration Design

Inspiré par les plateformes e-commerce modernes comme **Amazon** et **Shopify**. L'interface met l'accent sur un design épuré, des layouts responsives et l'accessibilité.

> **Note :** Ce projet priorise la qualité CI/CD plutôt que des fonctionnalités UI extensives.

---

## 📁 Structure du Projet

```
ci-cd-ilias/
├── .github/
│   ├── workflows/           # Pipelines CI/CD
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
├── ansible/
│   ├── deploy.yml          # Playbook de déploiement
│   ├── inventory/          # Configurations serveurs
│   └── templates/          # Service Systemd
├── src/
│   ├── app/               # Pages Next.js
│   ├── components/        # Composants React
│   ├── lib/              # Données mockées
│   └── __tests__/        # Tests unitaires + intégration
└── package.json
```

---

## 🌿 Workflow GitFlow

### Stratégie de Branches

```
main                Code prêt pour la production (protégé)
  ├── release/*     Préparation des releases
develop             Branche d'intégration (protégée)
  ├── feature/*     Nouvelles fonctionnalités
  ├── bug/*         Corrections de bugs
  └── chore/*       Maintenance
```

### Conventions de Commits

- **`feat:`** - Nouvelles fonctionnalités
- **`bug:`** - Corrections de bugs
- **`ci:`** - Modifications CI/CD
- **`test:`** - Ajout de tests
- **`chore:`** - Maintenance
- **`docs:`** - Documentation

### Nommage des Branches

```
feature/<issue-id>-<description>
bug/<issue-id>-<description>
release/<version>
```

**Exemples :**
- `feature/2-ci-pipeline`
- `bug/12-fix-filter-state`
- `release/1.0.0`

---

## 🔄 Implémentation CI/CD

### Intégration Continue

**Fichier :** `.github/workflows/ci.yml`

**Déclencheurs :** Pull requests et pushs vers `develop` et `main`

**Étapes du Pipeline :**
1. Checkout du code
2. Setup Node.js 20 (avec cache npm)
3. Installation des dépendances (`npm ci`)
4. Exécution du linter (ESLint)
5. Exécution des tests unitaires (Jest)
6. Exécution des tests d'intégration
7. Build de l'application
8. Upload des artefacts de build (rétention 7 jours)

**Fonctionnalités Clés :**
- Cache npm (2-3x plus rapide)
- Contrôle de concurrence (annule les anciennes exécutions)
- Fail-fast (arrêt à la première erreur)
- Requis pour l'approbation des PR

---

### Stratégie CD 1 : Déploiement Staging Contrôlé

**Fichier :** `.github/workflows/cd-staging.yml`

**Objectif :** Déploiement manuel sur staging pour tests

**Déclencheur :** Dispatch manuel de workflow (sélection de branche)

**Environnement :** `staging` avec approbation optionnelle

**Processus :**
1. Déclenchement manuel depuis l'interface GitHub Actions
2. Exécution complète du pipeline CI
3. Configuration des credentials SSH (depuis GitHub Secrets)
4. Génération dynamique de l'inventaire Ansible
5. Déploiement avec le playbook Ansible
6. Vérification du health check
7. Résumé du déploiement

**Sécurité :**
- Clé privée SSH dans GitHub Secrets
- Inventaire dynamique (pas de credentials en dur)
- Nettoyage automatique des clés SSH

---

### Stratégie CD 2 : Déploiement Production Automatisé

**Fichier :** `.github/workflows/cd-production.yml`

**Objectif :** Déploiement production entièrement automatisé

**Déclencheurs :**
- Merge vers la branche `main`
- Push d'un tag de version (`v*.*.*`)

**Environnement :** `production` avec **approbation manuelle requise** ✅

**Gate d'Approbation :**
```
Merge vers main → CI complet → ⏸️ APPROBATION REQUISE → Déploiement → ✅ En ligne
```

**Pourquoi c'est Important (BONUS) :**
- Prévient les déploiements accidentels
- Vérification humaine avant la production
- GitHub enregistre toutes les approbations
- Meilleure pratique industrielle

---

## 🧪 Stratégie de Tests

### Couverture des Tests

| Type | Fichiers | Tests | Statut |
|------|----------|-------|--------|
| Tests Unitaires | 3 | 15 | ✅ Passants |
| Tests d'Intégration | 2 | 16 | ✅ Passants |
| **Total** | **5** | **31** | **✅ Tous passants** |

### Tests Unitaires

**Localisation :** `src/__tests__/unit/`

**Composants Testés :**
- **Header :** Logo, liens de navigation, routing
- **ProductCard :** Affichage, image, formatage du prix
- **FilterBar :** Recherche, filtres, interactions utilisateur

### Tests d'Intégration

**Localisation :** `src/__tests__/integration/`

**Scénarios Testés :**
- **Page Catalog :** Rendu complet de la page, filtrage, recherche
- **Page Product Detail :** Affichage produit, routing, validation

### Exécution des Tests

```bash
npm test                  # Tous les tests
npm run test:unit         # Tests unitaires uniquement
npm run test:integration  # Tests d'intégration uniquement
npm run test:coverage     # Rapport de couverture
```

---

## 🚀 Infrastructure de Déploiement

### Environnement Cible

- **Cloud :** Google Cloud Platform
- **OS :** Ubuntu/Debian LTS
- **Serveur :** 34.39.56.246:3003
- **Méthode :** Ansible via SSH
- **Process :** Service Systemd

### Playbook Ansible

**Fichier :** `ansible/deploy.yml`

**Phases de Déploiement :**
1. Préparation système (apt update, installation dépendances)
2. Installation Node.js (20.x via NodeSource)
3. Déploiement application (rsync, exclut .git/node_modules)
4. Processus de build (npm install + build)
5. Gestion du service (systemd enable/start)
6. Health check (vérification endpoint /api/health)

**Design Idempotent :** Peut être exécuté plusieurs fois en toute sécurité

**Variables :**
```yaml
app_name: ecommerce-nextjs
app_dir: /var/www/ecommerce-nextjs
app_port: 3003 (depuis GitHub Secret)
node_version: 20.x
```

### Service Systemd

**Template :** `ansible/templates/nextjs.service.j2`

**Fonctionnalités :**
- Redémarrage automatique en cas d'échec
- Démarrage au boot système
- Logs vers systemd journal
- Exécution avec utilisateur de déploiement (privilège minimal)

### Endpoint Health Check

**Route :** `/api/health`

**Réponse :**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-16T10:30:00.000Z",
  "uptime": 3600,
  "environment": "production"
}
```

---

## 🔐 Implémentation Sécurité

### GitHub Secrets

Toutes les données sensibles stockées de manière sécurisée :
- `SSH_PRIVATE_KEY` - Authentification SSH
- `SSH_HOST` - IP du serveur (34.39.56.246)
- `SSH_USER` - Nom d'utilisateur SSH
- `SSH_PORT` - Port SSH (22)
- `APP_PORT` - Port application (3003)

### GitHub Environments

**Staging :**
- Approbation optionnelle
- Déploiement depuis develop

**Production :**
- ✅ Approbation manuelle requise
- Déploiement depuis main uniquement
- Piste d'audit complète

**Avantages :**
- Prévient les déploiements non autorisés
- Secrets spécifiques à l'environnement
- Traçabilité de l'historique des déploiements

---

## 🛠️ Stack Technique

**Frontend :** Next.js 16.1.2, React 19, TypeScript, Tailwind CSS
**Tests :** Jest 30.2.0, React Testing Library
**CI/CD :** GitHub Actions, Ansible, Systemd
**Infrastructure :** Google Cloud Platform, Ubuntu, Node.js 20.x

---

## 🏁 Démarrage

### Développement Local

```bash
# Cloner le dépôt
git clone https://github.com/Benbecker69/ci-cd-ilias.git
cd ci-cd-ilias

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev  # Ouvrir http://localhost:3000

# Exécuter les tests
npm test

# Build pour la production
npm run build
npm start
```

---

## ⚙️ Exécution des Workflows

### Déployer sur Staging (Stratégie CD 1)

1. Aller dans l'onglet **GitHub Actions**
2. Sélectionner **"CD Strategy 1 - Staging Deployment"**
3. Cliquer sur **"Run workflow"**
4. Sélectionner la branche (défaut : develop)
5. Confirmer et attendre le déploiement

### Déployer sur Production (Stratégie CD 2)

**Option A : Merge vers main**
```bash
git checkout -b release/1.1.0
git push -u origin release/1.1.0
# Créer une PR : release/1.1.0 → main
# Merger la PR → Stratégie CD 2 se déclenche automatiquement
```

**Option B : Push d'un tag de version**
```bash
git checkout main
git tag -a v1.1.0 -m "Release 1.1.0"
git push origin v1.1.0
# Stratégie CD 2 se déclenche automatiquement
```

**Puis approuver le déploiement :**
1. Aller dans **GitHub Actions** → Exécution CD Strategy 2
2. Attendre la fin du CI
3. Cliquer sur **"Review deployments"**
4. Cliquer sur **"Approve and deploy"**
5. Le déploiement se poursuit automatiquement

---

## 💡 Justifications Techniques

### Pourquoi GitFlow ?

**Choix :** GitFlow strict avec branches main/develop/feature

**Justification :**
- Développement parallèle (plusieurs fonctionnalités simultanément)
- Branche main stable (la production reflète toujours le code déployé)
- Gestion des releases (branche dédiée pour préparation de version)
- Revue de code (tous les changements via PR)
- Piste d'audit claire

**Alternatives :** GitHub Flow (plus simple mais moins de contrôle), Trunk-based (nécessite CI/CD mature)

**Gagnant :** GitFlow offre le meilleur équilibre entre contrôle et collaboration pour ce projet

---

### Pourquoi les Deux Stratégies CD ?

**Stratégie 1 :** Déploiement staging manuel pour tests
**Stratégie 2 :** Production automatisée avec gate d'approbation

**Justification :**
- Flexibilité (tester avant la production)
- Sécurité (l'approbation prévient les accidents)
- Rapidité (pas d'intervention manuelle après approbation)
- Traçabilité (GitHub enregistre tout)

**Gagnant :** Le meilleur des deux mondes - contrôle + automatisation

---

### Pourquoi Ansible ?

**Justification :**
- Idempotent (exécution multiple sans risque)
- Sans agent (SSH uniquement, pas de logiciel sur le serveur)
- Déclaratif (décrire l'état désiré, pas les étapes)
- Lisible (syntaxe YAML)

**Alternatives :** Docker Compose (configuration complexe), Scripts shell (non idempotents), Manuel (sujet aux erreurs)

**Gagnant :** Parfait pour déploiement sur serveur unique avec approche professionnelle

---

### Pourquoi Systemd ?

**Justification :**
- Natif à Ubuntu/Debian
- Redémarrage automatique en cas d'échec
- Persistance au boot
- Logging intégré

**Alternatives :** PM2 (dépendance supplémentaire), Forever (moins fiable)

**Gagnant :** Configuration production professionnelle sans dépendances

---

### Pourquoi GitHub Environments ?

**Justification :**
- Gates d'approbation préviennent les accidents
- Secrets spécifiques à l'environnement
- Piste d'audit complète des déploiements
- **Point BONUS** pour la sécurité

**Gagnant :** Meilleure pratique industrielle pour la sécurité en production

---

## 🏆 Réalisations du Projet

### Excellence CI/CD
- ✅ Taux de réussite des tests 100% (31/31)
- ✅ Zéro étape manuelle de déploiement
- ✅ Déploiements idempotents
- ✅ Temps de déploiement sous 5 minutes
- ✅ Isolation des environnements (staging + production)

### Sécurité & Bonnes Pratiques
- ✅ Aucun secret dans le dépôt
- ✅ Gates d'approbation pour la production
- ✅ Authentification par clé SSH
- ✅ Utilisateur de déploiement dédié
- ✅ Nettoyage automatique des credentials

### Maturité DevOps
- ✅ Infrastructure as Code
- ✅ Discipline GitFlow
- ✅ Tests automatisés
- ✅ Vérification health check
- ✅ Historique git propre

---

## 📚 Ressources

- **Dépôt :** https://github.com/Benbecker69/ci-cd-ilias
- **Actions :** https://github.com/Benbecker69/ci-cd-ilias/actions
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation GitHub Actions](https://docs.github.com/en/actions)
- [Documentation Ansible](https://docs.ansible.com/)

