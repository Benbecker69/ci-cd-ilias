# 🎤 Guide de Présentation Orale - Projet CI/CD

> **Durée totale : 20-25 minutes**
> Support pour présentation orale structurée du projet CI/CD Next.js

---

## 📋 Plan de Présentation (Ordre)

1. **Introduction** (30 sec)
2. **Vision d'ensemble** (1 min)
3. **GitFlow - Organisation du travail** (3 min) ⭐
4. **Pipeline CI - Qualité automatisée** (3 min) ⭐
5. **CD Stratégie 1 - Staging contrôlé** (2 min) ⭐
6. **CD Stratégie 2 - Production automatisée** (3 min) ⭐
7. **Tests - Couverture complète** (2 min)
8. **Sécurité et Environnements** (2 min) ⭐ BONUS
9. **Infrastructure Ansible** (2 min)
10. **Démonstration en direct** (3 min)
11. **Justifications techniques** (2 min)
12. **Conclusion et résultats** (1 min)

**⭐ = Sections critiques pour la note**

---

## 1️⃣ INTRODUCTION (30 secondes)

### À dire :
> "Bonjour, je suis Ilias Benharrat. Je vais vous présenter mon projet CI/CD : un frontend e-commerce Next.js avec automatisation complète du workflow de développement et déploiement."

### Points clés :
- Projet individuel EEMI 2025-2026
- Focus : **workflow qualité** plutôt que features business
- Score visé : 21/21 pts (bonus inclus)

### À montrer :
- Slide titre avec badges (CI passing, Production live, 31 tests)
- URL production : http://34.39.56.246:3003

---

## 2️⃣ VISION D'ENSEMBLE (1 minute)

### À dire :
> "Le projet démontre une implémentation complète CI/CD de niveau production. L'objectif n'était pas de créer un e-commerce complet, mais de mettre en place une chaîne d'automatisation professionnelle du code au déploiement."

### Structure à présenter :

```
Code Source (GitHub)
    ↓
GitFlow (branches + PR)
    ↓
CI Pipeline (tests + build)
    ↓
├─→ CD Stratégie 1 : Staging manuel
└─→ CD Stratégie 2 : Production auto
    ↓
Serveur GCP (Ansible + Systemd)
```

### Points clés :
- **GitFlow strict** : organisation du travail
- **CI automatisé** : qualité garantie
- **2 stratégies CD** : flexibilité + sécurité
- **Infrastructure as Code** : reproductible

### À montrer :
- Schéma d'architecture global (dessiner ou montrer README)
- Tableau grille de notation (21/21)

---

## 3️⃣ GITFLOW - ORGANISATION DU TRAVAIL (3 minutes) ⭐

### Pourquoi GitFlow ?

**À dire :**
> "J'ai choisi GitFlow car c'est le standard industriel pour gérer des releases. Il offre une séparation claire entre le développement en cours et la production."

### Structure des branches à expliquer :

```
main (production)
  ├── release/1.0.0  ← Préparation release
  │
develop (intégration)
  ├── feature/2-ci-pipeline
  ├── feature/3-4-implement-tests
  └── feature/5-6-7-ansible-cd-deployment
```

### Processus à décrire :

**1. Développement d'une feature :**
> "Je pars de develop, je crée une branche feature avec un numéro d'issue. Par exemple : feature/2-ci-pipeline."

**2. Pull Request vers develop :**
> "Une fois le code prêt, je crée une PR vers develop. Le CI se déclenche automatiquement : lint, tests, build."

**3. Revue et merge :**
> "Si tous les checks sont verts, je merge la PR. Develop est toujours stable."

**4. Release vers production :**
> "Quand plusieurs features sont prêtes, je crée une branche release/1.0.0, je fais une PR vers main, et après validation, je merge et je tag."

### Conventions strictes :

**Commits :**
- `feat:` - Nouvelles fonctionnalités
- `ci:` - Modifications CI/CD
- `test:` - Ajout de tests
- `bug:` - Corrections

**Branches :**
- `feature/<issue>-<description>`
- `release/<version>`

### À montrer :
- **GitHub Network Graph** (visualisation branches)
- **Liste des PRs** (montrer qu'elles sont toutes via PR)
- **Historique des commits** (montrer les préfixes feat:, ci:, test:)
- **Un exemple de PR** (template, description, checks)

### Insister sur :
> "Aucun commit direct sur main ou develop. Tout passe par PR avec validation CI. C'est ce qui garantit un historique propre et traçable."

---

## 4️⃣ PIPELINE CI - QUALITÉ AUTOMATISÉE (3 minutes) ⭐

### Pourquoi le CI ?

**À dire :**
> "Le CI garantit que chaque modification respecte les standards de qualité avant d'être intégrée. Ça évite les régressions et les bugs en production."

### Déclencheurs :

**À expliquer :**
> "Le CI se déclenche automatiquement sur chaque PR vers develop ou main, et aussi sur chaque push sur ces branches."

### Étapes du pipeline (détailler chacune) :

**1. Checkout du code**
> "On récupère le code depuis GitHub."

**2. Setup Node.js 20 avec cache npm**
> "Installation de Node.js 20. Important : j'utilise le cache npm pour accélérer les builds de 2-3x."

**3. Installation des dépendances (`npm ci`)**
> "Installation propre et reproductible des dépendances."

**4. Lint (ESLint)**
> "Vérification du code : style, bonnes pratiques, pas de code mort."

**5. Tests unitaires**
> "15 tests sur les composants React : Header, ProductCard, FilterBar."

**6. Tests d'intégration**
> "16 tests sur les pages complètes : Catalog avec filtres, Product Detail."

**7. Build de production**
> "Build Next.js optimisé pour la production."

**8. Upload des artefacts**
> "Sauvegarde du build pendant 7 jours (optionnel mais professionnel)."

### Optimisations :

**À mentionner :**
> "J'ai ajouté plusieurs optimisations :"
- **Cache npm** : gain de temps significatif
- **Concurrency control** : annule les runs obsolètes quand on push à nouveau
- **Fail-fast** : arrêt immédiat si une étape échoue

### À montrer :
- **Fichier `.github/workflows/ci.yml`** (survol du code)
- **GitHub Actions** (montrer un run réussi avec tous les checks verts)
- **Durée d'exécution** (montrer que c'est rapide grâce au cache)
- **Logs d'un test** (optionnel)

### Insister sur :
> "31 tests qui passent à chaque PR. Aucune PR ne peut être mergée si le CI est rouge. C'est une gate de qualité automatique."

---

## 5️⃣ CD STRATÉGIE 1 - STAGING CONTRÔLÉ (2 minutes) ⭐

### Objectif :

**À dire :**
> "La stratégie 1 permet de déployer manuellement n'importe quelle branche sur un environnement de staging pour tester avant la production."

### Déclencheur :

**À expliquer :**
> "C'est un workflow manuel. Je vais dans GitHub Actions, je clique sur 'Run workflow', je sélectionne la branche (par défaut develop), et je lance le déploiement."

### Processus :

**1. Sélection de la branche**
> "Je peux déployer develop, ou même une feature en cours pour la tester."

**2. Exécution du CI complet**
> "Le workflow refait tous les checks : lint, tests, build. On ne déploie jamais du code qui ne passe pas le CI."

**3. Configuration SSH**
> "Le workflow configure automatiquement la connexion SSH vers le serveur GCP en utilisant la clé privée stockée dans GitHub Secrets."

**4. Génération de l'inventaire Ansible dynamique**
> "L'inventaire Ansible (liste des serveurs) est généré à la volée depuis les secrets GitHub. Pas de credentials en dur dans le code."

**5. Déploiement Ansible**
> "Ansible exécute le playbook : prépare le serveur, installe Node.js si besoin, synchronise les fichiers, build l'app, redémarre le service systemd."

**6. Health check**
> "Le workflow vérifie que l'application répond correctement sur /api/health avant de valider le déploiement."

**7. Nettoyage**
> "La clé SSH est automatiquement supprimée après le déploiement pour éviter les fuites."

### Environnement :

**À mentionner :**
> "J'utilise l'environnement GitHub 'staging' qui peut avoir une approbation optionnelle. Dans mon cas, il pointe vers le même serveur mais sur un port différent (ou pourrais pointer vers un serveur dédié)."

### À montrer :
- **Fichier `.github/workflows/cd-staging.yml`** (survol)
- **GitHub Actions** → "Run workflow" → montrer l'interface de sélection de branche
- **Un run réussi** avec les logs de déploiement
- **GitHub Environment 'staging'** (Settings → Environments)

### Insister sur :
> "C'est la stratégie contrôlée : je décide quand déployer, sur quelle branche. Idéal pour tester une feature avant de la merger."

---

## 6️⃣ CD STRATÉGIE 2 - PRODUCTION AUTOMATISÉE (3 minutes) ⭐

### Objectif :

**À dire :**
> "La stratégie 2 est le déploiement production entièrement automatisé. Dès qu'on merge vers main ou qu'on push un tag de version, le déploiement se déclenche automatiquement."

### Déclencheurs (2 options) :

**Option 1 : Merge vers main**
> "Quand je merge une PR de release vers main, le workflow CD Strategy 2 démarre automatiquement."

**Option 2 : Push d'un tag**
> "Je peux aussi créer un tag git v1.0.0 et le pousser. Le workflow se déclenche sur les tags v*.*.*"

### Le Gate d'Approbation (BONUS 1 pt) :

**À BIEN EXPLIQUER :**
> "MAIS, et c'est crucial pour la sécurité, même si le déploiement est automatique, il y a un gate d'approbation manuel avant le déploiement effectif en production."

**Processus :**

1. **Merge vers main** → CD Strategy 2 démarre
2. **CI complet** → lint, tests, build (tout doit être vert)
3. **⏸️ PAUSE** → Le workflow s'arrête et attend une approbation humaine
4. **Approbation manuelle** → Je vais dans GitHub Actions, je clique sur "Review deployments", puis "Approve and deploy"
5. **Déploiement** → Ansible déploie sur le serveur production
6. **Health check** → Vérification automatique que l'app répond
7. **✅ Production live** → L'application est en ligne

### Pourquoi c'est important (BONUS) :

**À dire :**
> "Ce gate d'approbation est la meilleure pratique industrielle. Il combine l'automatisation (pas d'étapes manuelles une fois approuvé) avec la sécurité (un humain valide avant la prod). GitHub enregistre qui a approuvé et quand. C'est une piste d'audit complète."

### Environnement Production :

**À expliquer :**
> "L'environnement GitHub 'production' a des règles strictes :"
- Approbation obligatoire (1+ reviewers)
- Déploiement uniquement depuis main
- URL de production : http://34.39.56.246:3003

### À montrer :
- **Fichier `.github/workflows/cd-production.yml`**
- **GitHub Environment 'production'** avec protection rules
- **Un run avec l'approbation** (montrer l'étape "Waiting for approval")
- **Logs de déploiement réussi**
- **L'application live** : http://34.39.56.246:3003

### Différence clé avec Stratégie 1 :

**À résumer :**

| Critère | Stratégie 1 (Staging) | Stratégie 2 (Production) |
|---------|------------------------|---------------------------|
| Déclencheur | Manuel (workflow dispatch) | Automatique (merge/tag) |
| Branche | N'importe laquelle | Main uniquement |
| Approbation | Optionnelle | **Obligatoire** ✅ |
| Environnement | Staging (tests) | Production (live) |

### Insister sur :
> "Ces deux stratégies offrent le meilleur des deux mondes : la flexibilité de tester n'importe quoi sur staging, et l'automatisation sécurisée pour la production."

---

## 7️⃣ TESTS - COUVERTURE COMPLÈTE (2 minutes)

### Vue d'ensemble :

**À dire :**
> "J'ai implémenté 31 tests au total : 15 tests unitaires et 16 tests d'intégration. Tous passent à 100%."

### Tests Unitaires (15 tests) :

**À expliquer :**
> "Les tests unitaires vérifient chaque composant individuellement :"

**Header** (5 tests) :
- Rendu du logo
- Liens de navigation (Home, Catalog)
- Attributs href corrects
- Classes CSS appliquées

**ProductCard** (5 tests) :
- Affichage des infos produit
- Image avec bon src
- Lien "View Details"
- Formatage du prix (2 décimales)
- data-testid pour l'accessibilité

**FilterBar** (5 tests) :
- Inputs de recherche et filtre catégorie
- Valeurs des filtres affichées
- Callbacks onFilterChange appelés
- Options de catégories rendues
- Labels d'accessibilité

### Tests d'Intégration (16 tests) :

**À expliquer :**
> "Les tests d'intégration vérifient les pages complètes avec interactions utilisateur :"

**CatalogPage** (9 tests) :
- Rendu de tous les composants ensemble
- Affichage des 6 produits mockés
- Filtrage par recherche (texte)
- Filtrage par catégorie
- Combinaison de filtres (recherche + catégorie)
- Message "Aucun produit trouvé"
- Liens vers détails produits
- Reset des filtres

**ProductDetailPage** (7 tests) :
- Rendu de la page détail
- Affichage selon l'ID du produit
- Image produit avec alt text
- Lien retour vers catalog
- Bouton "Add to cart"
- Gestion produit inexistant (notFound())
- Formatage prix

### Framework :

**À mentionner :**
> "J'utilise Jest comme test runner et React Testing Library pour tester les composants. RTL encourage de tester comme un utilisateur réel : on cherche les éléments par leur texte ou leur rôle, pas par leurs détails d'implémentation."

### À montrer :
- **Structure des tests** : `src/__tests__/unit/` et `src/__tests__/integration/`
- **Un fichier de test** (montrer 2-3 tests pour donner l'idée)
- **Résultat des tests** dans GitHub Actions (tous verts)
- **Commande locale** : `npm test` (optionnel si démo live)

### Insister sur :
> "Ces tests s'exécutent à chaque PR. Si un test casse, la PR ne peut pas être mergée. C'est la garantie qu'on ne régresse jamais."

---

## 8️⃣ SÉCURITÉ ET ENVIRONNEMENTS (2 minutes) ⭐ BONUS

### Pourquoi c'est critique :

**À dire :**
> "La sécurité est au cœur du projet. Aucun secret n'est jamais commité dans le code. Tout est géré via GitHub Secrets et Environments."

### GitHub Secrets :

**À expliquer :**
> "Tous les credentials sensibles sont stockés dans GitHub Secrets :"

- **SSH_PRIVATE_KEY** : Clé privée RSA pour connexion SSH au serveur
- **SSH_HOST** : IP du serveur GCP (34.39.56.246)
- **SSH_USER** : Nom d'utilisateur SSH
- **SSH_PORT** : Port SSH (22)
- **APP_PORT** : Port de l'application (3003)

**Processus sécurisé :**
> "Pendant le déploiement :"
1. Le workflow injecte la clé SSH dans un fichier temporaire avec chmod 600
2. Ansible utilise cette clé pour se connecter
3. Le workflow supprime TOUJOURS la clé à la fin (même si ça échoue)

### GitHub Environments :

**À expliquer :**
> "J'ai configuré deux environnements GitHub avec des règles différentes :"

**Staging :**
- Approbation optionnelle
- Peut déployer depuis n'importe quelle branche
- Secrets spécifiques (si besoin de serveur différent)

**Production :**
- ✅ **Approbation obligatoire** (c'est le point BONUS)
- Déploiement uniquement depuis main
- URL trackée : http://34.39.56.246:3003
- Piste d'audit : qui a approuvé quoi et quand

### Avantages :

**À lister :**
1. **Prévention d'accidents** : On ne peut pas déployer en prod par erreur
2. **Audit trail** : Historique complet de tous les déploiements
3. **Secrets isolés** : On pourrait avoir des credentials différents staging/prod
4. **Conformité** : Standard industriel pour environnements sensibles

### À montrer :
- **GitHub Secrets** (Settings → Secrets → montrer la liste, pas les valeurs !)
- **GitHub Environments** (Settings → Environments)
  - Montrer les protection rules de production
  - Montrer l'historique des déploiements
- **Workflow avec approbation** (montrer l'étape d'attente)

### Insister sur :
> "Cette implémentation des environnements avec approbation obligatoire me donne le point BONUS. C'est LA bonne pratique pour déployer en production en toute sécurité."

---

## 9️⃣ INFRASTRUCTURE ANSIBLE (2 minutes)

### Pourquoi Ansible ?

**À dire :**
> "J'ai choisi Ansible car c'est l'outil de référence pour l'Infrastructure as Code. Il est idempotent : on peut exécuter le playbook plusieurs fois sans risque, il ne fera que les changements nécessaires."

### Architecture du playbook :

**À expliquer les 6 phases :**

**Phase 1 : Préparation système**
> "Update apt, installation de curl, git, build-essential."

**Phase 2 : Installation Node.js**
> "Vérification si Node.js 20.x est installé. Si non, téléchargement et installation depuis NodeSource."

**Phase 3 : Déploiement application**
> "Création du répertoire /var/www/ecommerce-nextjs, synchronisation des fichiers via rsync (exclut .git, node_modules, .next), définition des permissions."

**Phase 4 : Build**
> "Installation des dépendances npm en production, build Next.js optimisé."

**Phase 5 : Service Systemd**
> "Génération du fichier service systemd depuis un template Jinja2, activation du service (démarre au boot), démarrage/redémarrage du service."

**Phase 6 : Health Check**
> "Attente que l'application écoute sur le port 3003, polling de l'endpoint /api/health (5 tentatives, délai 3s), validation que le status est 'healthy'."

### Service Systemd :

**À expliquer :**
> "J'utilise Systemd pour gérer le process Node.js :"
- Redémarrage automatique en cas de crash (Restart=always)
- Démarrage au boot du serveur
- Logs centralisés dans systemd journal (journalctl -u nextjs)
- Exécution avec l'utilisateur de déploiement (pas root = sécurité)

### Design idempotent :

**À insister :**
> "Le playbook est idempotent : si je le relance, il détecte ce qui est déjà en place et ne fait que les changements nécessaires. Par exemple, il ne réinstalle pas Node.js s'il est déjà là."

### À montrer :
- **Fichier `ansible/deploy.yml`** (montrer la structure : tasks, handlers)
- **Template `ansible/templates/nextjs.service.j2`** (montrer le service systemd)
- **Inventaire dynamique** (expliquer que c'est généré depuis les secrets)
- **Logs d'un déploiement** dans GitHub Actions (montrer les différentes phases)

### Alternatives rejetées :

**À mentionner rapidement :**
> "J'aurais pu utiliser Docker, mais ça aurait ajouté de la complexité pour un serveur unique. Ansible + Systemd, c'est simple, pro, et parfait pour ce cas d'usage."

---

## 🔟 DÉMONSTRATION EN DIRECT (3 minutes)

### Parcours démo (à préparer en amont) :

**1. Montrer l'application en production**
> "Voici l'application live : http://34.39.56.246:3003"

**À faire :**
- Page d'accueil
- Catalog avec filtres (montrer que les filtres fonctionnent)
- Cliquer sur un produit → Page détail

**2. Montrer le health check**
> "L'endpoint health check : http://34.39.56.246:3003/api/health"

**À montrer :**
```json
{
  "status": "healthy",
  "timestamp": "...",
  "uptime": 3600,
  "environment": "production"
}
```

**3. Montrer GitHub Actions**
> "Voici l'interface GitHub Actions."

**À parcourir rapidement :**
- Liste des workflows (CI, CD Strategy 1, CD Strategy 2)
- Un run de CI réussi (tous les checks verts)
- Un run de CD Strategy 2 avec l'étape d'approbation

**4. Montrer GitFlow en action**
> "Voici le Network Graph qui montre l'historique GitFlow."

**À montrer :**
- Branches develop et main
- Feature branches mergées via PR
- Release branch vers main

**5. Montrer les environnements**
> "Settings → Environments."

**À montrer :**
- Staging (pas de protection)
- Production (required reviewers = 1)
- Historique des déploiements

### Si le temps le permet (bonus) :

**Déclencher un déploiement staging en direct :**
1. Aller dans Actions
2. CD Strategy 1
3. Run workflow
4. Sélectionner develop
5. Lancer
6. Montrer que ça commence (pas besoin d'attendre la fin)

---

## 1️⃣1️⃣ JUSTIFICATIONS TECHNIQUES (2 minutes)

### Questions anticipées :

**"Pourquoi GitFlow et pas GitHub Flow ?"**

**Réponse :**
> "GitHub Flow est plus simple (main + feature branches), mais GitFlow offre une séparation claire entre développement (develop) et production (main). C'est essentiel quand on gère des releases planifiées et plusieurs environnements."

**"Pourquoi deux stratégies CD ?"**

**Réponse :**
> "La stratégie 1 donne la flexibilité de tester n'importe quelle branche sur staging. La stratégie 2 automatise complètement la production une fois qu'on merge sur main. Les deux ensemble offrent contrôle + automatisation."

**"Pourquoi Ansible et pas Docker ?"**

**Réponse :**
> "Docker aurait été overkill pour un serveur unique. Ansible est idempotent, agentless (juste SSH), et parfait pour ce cas d'usage. Plus simple à maintenir et à comprendre pour un projet académique."

**"Pourquoi Systemd et pas PM2 ?"**

**Réponse :**
> "Systemd est natif à Ubuntu, pas de dépendance externe. Il gère le restart automatique, les logs, le démarrage au boot. C'est la solution pro pour gérer un service Node.js en production."

**"Pourquoi les GitHub Environments ?"**

**Réponse :**
> "C'est LE point BONUS sécurité. Les environments permettent l'approbation manuelle avant la prod, l'isolation des secrets, et une piste d'audit complète. C'est la meilleure pratique industrielle."

### Réflexion sur le processus :

**À partager :**
> "Mon approche a été progressive :"
1. D'abord setup GitFlow et templates (PR, issues)
2. Ensuite CI pipeline avec tests
3. Puis CD stratégie 1 pour valider Ansible
4. Enfin CD stratégie 2 avec approbation
5. Itérations pour optimiser (cache, concurrency, health checks)

> "Chaque étape a été validée par une PR avec CI. J'ai appliqué sur moi-même la discipline que je mettais en place."

---

## 1️⃣2️⃣ CONCLUSION ET RÉSULTATS (1 minute)

### Résumé des points forts :

**À lister :**

✅ **GitFlow discipline** : 100% des changements via PR, historique propre
✅ **CI automatisé** : 31 tests qui passent à chaque PR
✅ **CD double stratégie** : Staging flexible + Production sécurisée
✅ **Sécurité** : Secrets protégés, approbation obligatoire, audit trail
✅ **Infrastructure as Code** : Ansible idempotent, reproductible
✅ **Optimisations** : Cache npm, concurrency, fail-fast
✅ **Monitoring** : Health checks automatiques

### Score final :

**À annoncer :**

| Critère | Points | Statut |
|---------|--------|--------|
| GitFlow | 4/4 | ✅ |
| CI | 6/6 | ✅ |
| Tests | 3/3 | ✅ |
| CD Stratégie 1 | 3/3 | ✅ |
| CD Stratégie 2 | 3/3 | ✅ |
| Présentation | 1/1 | ✅ |
| **BONUS** | +1 | ✅ |
| **TOTAL** | **21/21** | **🏆** |

### Ce que j'ai appris :

**À partager (optionnel) :**
> "Ce projet m'a permis de comprendre concrètement :"
- L'importance d'un workflow structuré (GitFlow)
- Comment automatiser la qualité (CI)
- Les enjeux de sécurité en déploiement (secrets, approbations)
- L'Infrastructure as Code (Ansible)
- Les bonnes pratiques DevOps (idempotence, health checks, monitoring)

### Ouverture :

**À dire :**
> "Ce projet est évolutif. On pourrait ajouter :"
- Environnements multiples (dev, staging, prod sur serveurs séparés)
- Tests e2e avec Playwright
- Monitoring avec Prometheus/Grafana
- SSL/TLS avec Nginx reverse proxy
- Blue/Green deployment ou Canary releases

### Mot de fin :

**À conclure :**
> "Merci pour votre attention. Je suis prêt à répondre à vos questions."

---

## 📌 CHECKLIST PRÉ-PRÉSENTATION

### À vérifier la veille :

- [ ] Application production accessible : http://34.39.56.246:3003
- [ ] Health check répond : http://34.39.56.246:3003/api/health
- [ ] Tous les workflows GitHub Actions sont verts
- [ ] README.md est à jour
- [ ] Onglets navigateur pré-ouverts (voir ci-dessous)

### Onglets à préparer (dans l'ordre) :

1. **Présentation** : Ce fichier PRESENTATION.md
2. **App live** : http://34.39.56.246:3003
3. **Health check** : http://34.39.56.246:3003/api/health
4. **GitHub repo** : https://github.com/Benbecker69/ci-cd-ilias
5. **GitHub Actions** : https://github.com/Benbecker69/ci-cd-ilias/actions
6. **GitHub Network** : https://github.com/Benbecker69/ci-cd-ilias/network
7. **GitHub PRs** : https://github.com/Benbecker69/ci-cd-ilias/pulls?q=is%3Apr
8. **GitHub Environments** : https://github.com/Benbecker69/ci-cd-ilias/settings/environments
9. **README** : https://github.com/Benbecker69/ci-cd-ilias/blob/main/README.md
10. **Workflow CI** : .github/workflows/ci.yml (VS Code)
11. **Workflow CD prod** : .github/workflows/cd-production.yml (VS Code)
12. **Ansible playbook** : ansible/deploy.yml (VS Code)

### Matériel à avoir :

- [ ] Laptop chargé
- [ ] Connexion internet stable
- [ ] Écran de secours (si présentation sur projecteur)
- [ ] Notes de secours (ce fichier imprimé ou sur tablette)

### Si démo live ne marche pas :

- [ ] Screenshots pré-capturées de :
  - Application en production
  - GitHub Actions (runs réussis)
  - GitHub Environments (protection rules)
  - Logs de déploiement Ansible

---

## 💡 CONSEILS POUR L'ORAL

### Posture et communication :

- **Respire calmement** : Prends ton temps entre chaque section
- **Regarde le jury** : Pas seulement l'écran
- **Utilise des transitions** : "Passons maintenant à...", "Voyons concrètement..."
- **Montre ta compréhension** : Explique le "pourquoi", pas juste le "comment"

### Gestion du temps :

- **Ne dépasse pas 25 min** : Si tu vois que tu es en retard, saute les détails, garde l'essentiel
- **Priorité aux sections ⭐** : GitFlow, CI, CD x2, Sécurité
- **Laisse du temps pour les questions** : 5-10 min

### Si tu es bloqué :

- **"Je vais y revenir dans un instant"** : Passe à la section suivante
- **Reste calme** : Un petit blanc n'est pas grave
- **Reformule** : Si tu as oublié un terme précis, explique avec tes mots

### Questions probables du jury :

**"Pourquoi Next.js ?"**
> "Framework React moderne avec App Router, SSR, optimisations automatiques. Mais l'important n'est pas le framework, c'est le workflow CI/CD autour."

**"Combien de temps ça prend pour déployer ?"**
> "Du merge sur main au déploiement effectif : environ 5 minutes (CI 2-3 min + déploiement 2 min). Plus l'approbation manuelle."

**"Qu'est-ce que tu ferais différemment ?"**
> "J'ajouterais des tests e2e avec Playwright, un vrai environnement staging séparé, et peut-être du monitoring avec Prometheus."

**"C'est quoi l'idempotence ?"**
> "C'est la propriété d'Ansible qui fait qu'on peut exécuter le playbook plusieurs fois sans effet de bord. Il détecte ce qui est déjà en place et ne fait que les changements nécessaires."

**"Pourquoi pas juste pousser directement sur main ?"**
> "Ça casse tout le processus de qualité. Avec GitFlow + PR + CI, on garantit que tout le code en production a été testé, revu, et validé. C'est la différence entre un projet perso et un projet pro."

---

## ✨ PHRASES CLÉS À RETENIR

### Pour GitFlow :
> "Tout passe par PR. Rien n'est poussé directement sur main ou develop. C'est la discipline GitFlow stricte."

### Pour CI :
> "31 tests qui s'exécutent automatiquement à chaque PR. Si c'est rouge, on ne peut pas merger. C'est la gate de qualité."

### Pour CD Stratégie 2 (BONUS) :
> "Le déploiement est automatique MAIS il y a un gate d'approbation humaine. C'est le meilleur des deux mondes : automatisation + sécurité."

### Pour Ansible :
> "Infrastructure as Code idempotente. Je peux rejouer le playbook autant de fois que je veux, il ne fera que les changements nécessaires."

### Pour la Sécurité :
> "Zéro secret dans le code. Tout dans GitHub Secrets. Approbation obligatoire pour la prod. Piste d'audit complète."

---

## 🎯 DERNIER CONSEIL

**Sois fier de ton travail !**

Tu as construit :
- Un workflow GitFlow propre
- Un CI avec 31 tests
- Deux stratégies CD complètes
- De la sécurité pro (environments, secrets, approbations)
- De l'Infrastructure as Code avec Ansible

**C'est du niveau production. Tu as mérité 21/21 pts.**

**Maintenant, vas présenter ça avec confiance ! 🚀**

---

**Bonne chance pour ta présentation ! 🍀**
