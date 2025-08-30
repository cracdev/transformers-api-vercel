# 🤖 Transformers API - Vercel Edition

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000.svg)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-22+-green.svg)](https://nodejs.org)

A serverless TypeScript API for Transformers character names (1984-2011), optimized for Vercel deployment using API routes.

## ✨ Features

- 🚀 **Serverless**: Built with Vercel API routes
- 📝 **TypeScript**: Full type safety and modern ES2022 features
- 🔒 **Security**: CORS protection and rate limiting
- ⚡ **Fast**: Optimized for serverless cold starts
- 🌐 **Global**: Edge network deployment via Vercel
- 📊 **987 Names**: Complete Transformers character database

## 🏗️ Project Structure

```
├── api/
│   ├── index.ts          # Root API endpoint
│   └── v1/
│       ├── health.ts     # Health check
│       ├── random.ts     # Random names
│       ├── search.ts     # Search names
│       ├── all.ts        # All names
│       └── stats.ts      # API statistics
├── lib/
│   ├── services/         # Business logic
│   ├── utils/           # Shared utilities
│   └── types/           # TypeScript types
├── package.json
├── tsconfig.json
└── vercel.json          # Vercel configuration
```

## 📚 API Endpoints

| Method | Endpoint              | Description      | Parameters   |
| ------ | --------------------- | ---------------- | ------------ |
| GET    | `/api`                | API information  | -            |
| GET    | `/api/v1/health`      | Health check     | -            |
| GET    | `/api/v1/random`      | Get random names | `?count=5`   |
| GET    | `/api/v1/search`      | Search names     | `?q=optimus` |
| GET    | `/api/v1/all`         | Get all names    | -            |
| GET    | `/api/v1/stats`       | API statistics   | -            |

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📦 Deployment

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: Git Integration
1. Push to GitHub/GitLab/Bitbucket
2. Import in Vercel dashboard
3. Deploy automatically

## 🔧 Environment Variables

Set in Vercel dashboard (optional):
```
NODE_ENV=production
API_VERSION=v1
```

## 📖 Example Usage

```bash
# Get random names
curl "https://your-domain.vercel.app/api/v1/random?count=3"

# Search for names
curl "https://your-domain.vercel.app/api/v1/search?q=optimus"

# Get API stats
curl "https://your-domain.vercel.app/api/v1/stats"
```

## 🔍 JSON Parsing with jq

Here are useful `jq` commands for parsing API responses:

### Basic Parsing
```bash
# Pretty print full response
curl -s "https://your-domain.vercel.app/api/v1/random?count=3" | jq .

# Extract just the names array
curl -s "https://your-domain.vercel.app/api/v1/random?count=3" | jq '.data.names'

# Get individual names (one per line)
curl -s "https://your-domain.vercel.app/api/v1/random?count=3" | jq '.data.names[]'
```

### Advanced Parsing
```bash
# Create custom output format
curl -s "https://your-domain.vercel.app/api/v1/random?count=5" | jq '{status, names: .data.names, count: .data.total}'

# Get just the status
curl -s "https://your-domain.vercel.app/api/v1/random?count=3" | jq -r '.status'

# Count the names
curl -s "https://your-domain.vercel.app/api/v1/random?count=10" | jq '.data.names | length'

# Get first name only
curl -s "https://your-domain.vercel.app/api/v1/random?count=5" | jq -r '.data.names[0]'

# Format as CSV
curl -s "https://your-domain.vercel.app/api/v1/random?count=5" | jq -r '.data.names | join(",")'
```

### Search & Stats Examples
```bash
# Parse search results
curl -s "https://your-domain.vercel.app/api/v1/search?q=optimus" | jq '{query: .data.query, found: .data.total, names: .data.names}'

# Get API statistics
curl -s "https://your-domain.vercel.app/api/v1/stats" | jq '{total_names: .data.totalNames, api_version: .data.apiVersion}'

# Extract plain text names from search
curl -s "https://your-domain.vercel.app/api/v1/search?q=prime" | jq -r '.data.names[]'
```

### Example Responses

**Random Names:**
```json
{
  "status": "SUCCESS",
  "data": {
    "names": ["Motormaster", "Smokescreen", "Battletrap"],
    "total": 3
  },
  "message": "Retrieved 3 random transformer names",
  "timestamp": "2025-08-30T22:57:16.232Z"
}
```

**Search Results:**
```json
{
  "status": "SUCCESS",
  "data": {
    "names": ["Optimus Prime"],
    "total": 1,
    "query": "optimus"
  },
  "message": "Found 1 transformer names matching \"optimus\""
}
```

## 🧩 Architecture

- **Serverless Functions**: Each API route is a separate serverless function
- **Shared Libraries**: Common code in `lib/` directory
- **Type Safety**: Full TypeScript support with strict configuration
- **Rate Limiting**: In-memory rate limiting per IP address
- **CORS**: Automatic CORS headers for all endpoints

---

_This API provides access to Transformers character names from the original series (1984-2011). All character names are property of their respective owners._
