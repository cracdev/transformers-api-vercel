# 🚀 Vercel Deployment Guide

## Quick Deploy

### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to project directory
cd transformers-api-vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name: transformers-api-vercel
# - In which directory is your code located? ./
# - Want to override settings? N
```

### Option 2: GitHub Integration
1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your repository
5. Deploy (Vercel auto-detects the configuration)

### Option 3: Git Clone and Deploy
```bash
# Clone or copy the project
git init
git add .
git commit -m "Initial commit"

# Connect to remote repository
git remote add origin https://github.com/your-username/transformers-api-vercel.git
git push -u origin main

# Import in Vercel dashboard
```

## Environment Variables (Optional)

These can be set in Vercel dashboard under Project Settings > Environment Variables:

```
NODE_ENV=production
API_VERSION=v1
```

## Post-Deployment

After successful deployment, your API will be available at:

```
https://your-project-name.vercel.app/api
https://your-project-name.vercel.app/api/v1/health
https://your-project-name.vercel.app/api/v1/random?count=3
https://your-project-name.vercel.app/api/v1/search?q=optimus
https://your-project-name.vercel.app/api/v1/all
https://your-project-name.vercel.app/api/v1/stats
```

## Testing Deployment

```bash
# Test basic functionality
curl "https://your-domain.vercel.app/api"

# Test health endpoint
curl "https://your-domain.vercel.app/api/v1/health"

# Test random names
curl "https://your-domain.vercel.app/api/v1/random?count=3"
```

## Configuration Details

- **Runtime**: Node.js 22.x with TypeScript support
- **Functions**: Each API route is a separate serverless function
- **Cold Start**: Optimized for minimal cold start time
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Enabled for all origins (configurable)

## Troubleshooting

### Build Errors
```bash
# Check TypeScript
npm run type-check

# Check for syntax errors
npm run build
```

### Deployment Issues
- Ensure all dependencies are in `package.json`
- Check Vercel logs in the dashboard
- Verify environment variables are set correctly

### Performance
- Functions have a 30-second timeout
- Consider caching for frequently accessed endpoints
- Monitor function execution time in Vercel dashboard

## Domain Configuration

### Custom Domain
1. Go to Project Settings in Vercel dashboard
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### API Versioning
The API is versioned at `/api/v1/`. Future versions can be added as `/api/v2/` etc.

## Monitoring

- View function logs in Vercel dashboard
- Monitor performance metrics
- Set up alerts for errors or high usage

## Scaling

Vercel automatically scales your functions based on demand:
- No server management required
- Pay per invocation
- Global edge network distribution
