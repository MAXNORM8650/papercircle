# Paperfinder API Deployment Guide

This guide will help you deploy the Paperfinder API publicly.

## Prerequisites

- GitHub account
- One of the following platforms (all have free tiers):
  - Railway.app (recommended)
  - Render.com
  - Fly.io

## Option 1: Deploy to Railway.app (Recommended - Easiest)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add deployment files"
   git push origin main
   ```

2. **Deploy to Railway**
   - Go to https://railway.app
   - Click "Start a New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect the Dockerfile and deploy

3. **Configure Environment Variables**
   - In Railway dashboard, go to your project
   - Click "Variables" tab
   - Add these variables:
     - `PORT`: 8000
     - `MODEL_ID`: ollama_chat/gpt-oss:20b (or your model)
     - `API_BASE`: http://10.127.30.115:11434 (your LLM endpoint)

4. **Get your API URL**
   - Railway will provide a public URL like: `https://your-app.railway.app`
   - Your API will be available at this URL

## Option 2: Deploy to Render.com

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add deployment files"
   git push origin main
   ```

2. **Deploy to Render**
   - Go to https://render.com
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will use the `render.yaml` file automatically
   - Click "Apply" to deploy

3. **Update Environment Variables**
   - In Render dashboard, go to your service
   - Click "Environment" tab
   - Update these variables:
     - `MODEL_ID`: Your LLM model
     - `API_BASE`: Your LLM endpoint URL

4. **Get your API URL**
   - Render will provide a URL like: `https://your-app.onrender.com`

## Option 3: Deploy to Fly.io

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login and Initialize**
   ```bash
   fly auth login
   fly launch
   ```

3. **Configure**
   - Follow the prompts
   - Choose a region close to your users
   - Fly will detect the Dockerfile automatically

4. **Set Environment Variables**
   ```bash
   fly secrets set MODEL_ID=ollama_chat/gpt-oss:20b
   fly secrets set API_BASE=http://10.127.30.115:11434
   ```

5. **Deploy**
   ```bash
   fly deploy
   ```

6. **Get your API URL**
   - Fly will provide a URL like: `https://your-app.fly.dev`

## Configure Frontend to Use Deployed API

1. **Update your `.env` file** (or `.env.production`):
   ```bash
   VITE_PAPERFINDER_API_URL=https://your-api-url.com
   ```

2. **Build your frontend**:
   ```bash
   npm run build
   ```

## Testing Your Deployment

1. **Health Check**:
   ```bash
   curl https://your-api-url.com/health
   ```

2. **API Docs**:
   Visit `https://your-api-url.com/docs` to see the interactive API documentation

3. **Test Discovery**:
   ```bash
   curl -X POST https://your-api-url.com/discover \
     -H "Content-Type: application/json" \
     -d '{
       "query": "machine learning transformers",
       "mode": "balanced",
       "apply_diversity": true
     }'
   ```

## Important Notes

### LLM Configuration
- The default configuration uses a local Ollama instance at `http://10.127.30.115:11434`
- For public deployment, you need to either:
  1. Use a cloud-hosted LLM service (OpenAI, Anthropic, etc.)
  2. Deploy your own Ollama instance publicly
  3. Use a different LLM provider supported by LiteLLM

### Update LLM Provider

To use OpenAI instead of local Ollama:

1. Update environment variables:
   ```bash
   MODEL_ID=gpt-4
   OPENAI_API_KEY=your-api-key
   ```

2. Update `paperfinder.py` line 630:
   ```python
   MODEL_ID = os.getenv("MODEL_ID", "gpt-4")
   API_BASE = None  # OpenAI uses default endpoint
   ```

### Scaling Considerations

- **Free tiers** are limited:
  - Railway: 500 hours/month, $5 credit
  - Render: 750 hours/month
  - Fly.io: Limited resources

- **For production use**:
  - Upgrade to paid plan
  - Monitor usage and costs
  - Consider implementing rate limiting
  - Add authentication for API access

## Troubleshooting

### Build Fails
- Check that all dependencies in `requirements.txt` are correct
- Verify Docker build works locally: `docker build -t paperfinder-api .`

### API Timeout
- Increase timeout settings in your platform
- Discovery can take 1-5 minutes depending on query complexity

### 502 Bad Gateway
- Check logs in your platform dashboard
- Verify the PORT environment variable is set correctly
- Ensure the app is binding to `0.0.0.0` not `localhost`

## Security Recommendations

Before public deployment:

1. **Add API Authentication**:
   - Implement API keys
   - Use JWT tokens
   - Add rate limiting

2. **Validate Inputs**:
   - Limit query length
   - Sanitize user inputs
   - Add request size limits

3. **Monitor Usage**:
   - Set up logging
   - Track API usage
   - Monitor costs

4. **CORS Configuration**:
   - Update `allow_origins` in `paperfinder_api.py` to only allow your frontend domain
   - Remove `"*"` wildcard

## Next Steps

1. Deploy the API to your chosen platform
2. Update frontend environment variables
3. Test the integration
4. Monitor performance and usage
5. Consider adding authentication and rate limiting

## Support

For issues or questions:
- Check platform documentation
- Review API logs in platform dashboard
- Test locally first with Docker
