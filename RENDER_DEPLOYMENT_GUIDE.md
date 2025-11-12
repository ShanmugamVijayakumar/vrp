# Render.com Deployment Guide

Complete step-by-step guide for deploying your Vintage Roleplay website to Render.com.

## 📋 Prerequisites

1. **Render.com account** - Sign up at [render.com](https://render.com)
2. **GitHub/GitLab/Bitbucket account** - Your code repository
3. **Discord Application** - OAuth2 credentials ready

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Push your code to GitHub** (or GitLab/Bitbucket):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Production ready"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Important:** Make sure `.env` file is NOT committed (it's already in `.gitignore`)

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended) or email
3. Connect your GitHub account if using GitHub
4. Authorize Render to access your repositories

### Step 3: Create New Web Service

1. **Click "New +"** button in Render dashboard
2. **Select "Web Service"**
3. **Connect your repository:**
   - If using GitHub: Select your repository from the list
   - If using GitLab/Bitbucket: Connect your account first

### Step 4: Configure Web Service

Fill in the following settings:

#### Basic Settings:
- **Name:** `vintage-roleplay` (or your preferred name)
- **Region:** Choose closest to your users (e.g., `Oregon (US West)`)
- **Branch:** `main` (or your default branch)
- **Root Directory:** Leave empty (or `.` if needed)

#### Build & Deploy:
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `node server.js`

#### Environment:
- **Environment Variables:** We'll add these in the next step
- **Auto-Deploy:** `Yes` (automatically deploys on git push)

### Step 5: Set Environment Variables

Click on "Environment" tab and add the following variables:

#### Required Variables:

```
DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_CLIENT_SECRET=your_discord_client_secret_here
SESSION_SECRET=your_random_session_secret_here
NODE_ENV=production
PORT=10000
```

#### Important Notes:
- **PORT:** Render sets the PORT automatically, but we can use `10000` as default
- **SESSION_SECRET:** Generate a random string:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

#### Render URL Variables:

After your first deployment, Render will provide you with a URL like:
`https://vintageroleplay-tamil.onrender.com`

Then add these variables:
```
REDIRECT_URI=https://vintageroleplay-tamil.onrender.com/callback
FRONTEND_URL=https://vintageroleplay-tamil.onrender.com
BASE_URL=https://vintageroleplay-tamil.onrender.com
```

**Note:** Your actual Render URL is `vintageroleplay-tamil.onrender.com`

### Step 6: Update Server.js for Render

Render automatically sets the `PORT` environment variable, so your `server.js` should work as-is. However, let's verify it handles Render's port correctly.

The current `server.js` uses:
```javascript
const PORT = process.env.PORT || 3000;
```

This will work perfectly with Render, as Render sets `process.env.PORT` automatically.

### Step 7: Configure Discord OAuth2

1. **Go to [Discord Developer Portal](https://discord.com/developers/applications)**
2. **Select your application**
3. **Go to OAuth2 section**
4. **Add Redirect URI:**
   ```
   https://vintageroleplay-tamil.onrender.com/callback
   ```
5. **Save changes**

### Step 8: Deploy

1. **Click "Create Web Service"** in Render dashboard
2. **Wait for deployment** - First deployment takes 2-5 minutes
3. **Monitor build logs** - Check for any errors
4. **Check deployment status** - Should show "Live" when complete

### Step 9: Update Environment Variables with Actual URL

After first deployment:

1. **Copy your Render URL:** `https://vintageroleplay-tamil.onrender.com`
2. **Go to Environment tab** in Render dashboard
3. **Update these variables:**
   ```
   REDIRECT_URI=https://vintageroleplay-tamil.onrender.com/callback
   FRONTEND_URL=https://vintageroleplay-tamil.onrender.com
   BASE_URL=https://vintageroleplay-tamil.onrender.com
   ```
4. **Save changes** - Render will automatically redeploy

### Step 10: Update Discord Redirect URI

1. **Go back to Discord Developer Portal**
2. **Update Redirect URI** to match your Render URL:
   ```
   https://vintageroleplay-tamil.onrender.com/callback
   ```
3. **Save changes**

### Step 11: Test Your Deployment

1. **Visit your Render URL:** `https://vintageroleplay-tamil.onrender.com`
2. **Test Discord login:**
   - Click "Login" button
   - Should redirect to Discord
   - After authorization, should redirect back
3. **Test visa application:**
   - Login first
   - Navigate to visa application
   - Fill out and submit form
4. **Check health endpoint:** `https://vintageroleplay-tamil.onrender.com/health`

## 🔧 Render-Specific Configuration

### Auto-Deploy

Render automatically deploys when you push to your repository:
```bash
git add .
git commit -m "Update code"
git push origin main
```

### Custom Domain (Optional)

1. **Go to Settings** in Render dashboard
2. **Click "Custom Domains"**
3. **Add your domain** (e.g., `yourdomain.com`)
4. **Follow DNS configuration** instructions
5. **Update environment variables** with your custom domain
6. **Update Discord redirect URI** with your custom domain

### SSL Certificate

Render provides free SSL certificates automatically for:
- `*.onrender.com` domains
- Custom domains (configured automatically)

### Environment Variables in Render

Render allows you to:
- Set environment variables in dashboard
- Group variables by environment
- Use secrets for sensitive data
- Update variables without redeploying (some changes require redeploy)

### Build Logs

View build logs in Render dashboard:
1. Go to your service
2. Click "Logs" tab
3. View real-time build and runtime logs

### Service Settings

Important settings to check:
- **Auto-Deploy:** Enabled (deploys on git push)
- **Health Check Path:** `/health` (optional, helps with monitoring)
- **Pull Request Previews:** Enable if you want preview deployments

## 🔒 Security Checklist for Render

- [ ] All environment variables are set in Render dashboard
- [ ] `.env` file is NOT committed to repository
- [ ] `SESSION_SECRET` is a random, secure string
- [ ] Discord redirect URI matches Render URL exactly
- [ ] HTTPS is enabled (automatic on Render)
- [ ] Environment variables are marked as "Secret" if sensitive
- [ ] Custom domain SSL is configured (if using custom domain)

## 🐛 Troubleshooting Render Deployment

### Issue: Build Fails

**Solution:**
- Check build logs in Render dashboard
- Verify `package.json` has all dependencies
- Check Node.js version (Render supports Node 14+)
- Ensure build command is correct: `npm install`

### Issue: Service Crashes on Start

**Solution:**
- Check runtime logs in Render dashboard
- Verify `PORT` environment variable is set
- Check that all required environment variables are set
- Verify `SESSION_SECRET` is set
- Check Discord credentials are correct

### Issue: Discord OAuth Not Working

**Solution:**
- Verify `REDIRECT_URI` matches Discord settings exactly
- Check that `DISCORD_CLIENT_ID` and `DISCORD_CLIENT_SECRET` are correct
- Ensure URL is using HTTPS (Render provides this automatically)
- Check browser console for CORS errors
- Verify environment variables are set correctly

### Issue: Session Not Persisting

**Solution:**
- Check that `SESSION_SECRET` is set
- Verify cookie settings in `server.js` (secure: true for HTTPS)
- Check that `trust proxy` is enabled (Render uses reverse proxy)
- Verify CORS settings allow credentials

### Issue: Static Files Not Loading

**Solution:**
- Check that static files are in the root directory
- Verify `express.static` is configured correctly
- Check file paths are correct
- Ensure files are committed to repository

### Issue: Service Goes to Sleep (Free Tier)

**Solution:**
- Render free tier services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Consider upgrading to paid plan for always-on service
- Or use a monitoring service to ping your site regularly

### Issue: Environment Variables Not Updating

**Solution:**
- Some environment variable changes require redeploy
- Click "Manual Deploy" after updating variables
- Check that variable names are correct (case-sensitive)
- Verify values don't have extra spaces

## 📊 Monitoring on Render

### Logs

View logs in Render dashboard:
- **Build Logs:** Shows npm install and build process
- **Runtime Logs:** Shows server output and errors
- **Deploy Logs:** Shows deployment process

### Metrics

Render provides:
- **CPU Usage:** Monitor server CPU usage
- **Memory Usage:** Monitor server memory usage
- **Request Metrics:** Monitor HTTP requests
- **Error Rates:** Monitor error rates

### Health Checks

Set up health check:
1. Go to Settings
2. Set **Health Check Path:** `/health`
3. Render will monitor this endpoint
4. Service will restart if health check fails

## 🔄 Updating Your Deployment

### Method 1: Git Push (Automatic)

```bash
git add .
git commit -m "Update code"
git push origin main
```

Render will automatically:
1. Detect the push
2. Start a new deployment
3. Build the application
4. Deploy the new version

### Method 2: Manual Deploy

1. Go to Render dashboard
2. Click on your service
3. Click "Manual Deploy"
4. Select branch to deploy
5. Click "Deploy"

### Method 3: Rollback

1. Go to Render dashboard
2. Click on your service
3. Click "Events" tab
4. Find previous deployment
5. Click "Rollback"

## 💰 Render Pricing

### Free Tier

- **512 MB RAM**
- **0.1 CPU**
- **100 GB bandwidth/month**
- **Sleeps after 15 minutes** of inactivity
- **Free SSL certificate**
- **Auto-deploy from Git**

### Paid Plans

- **Starter:** $7/month - Always on, more resources
- **Standard:** $25/month - More resources, better performance
- **Pro:** Custom pricing - Enterprise features

**Recommendation:** Start with free tier, upgrade if needed.

## 📝 Complete Environment Variables List

Here's the complete list of environment variables for Render:

```
# Discord OAuth2
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret

# Server Configuration
PORT=10000
NODE_ENV=production

# Session Security
SESSION_SECRET=your_random_session_secret

# URLs (Render URL)
REDIRECT_URI=https://vintageroleplay-tamil.onrender.com/callback
FRONTEND_URL=https://vintageroleplay-tamil.onrender.com
BASE_URL=https://vintageroleplay-tamil.onrender.com
```

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] Render account created
- [ ] Web service created in Render
- [ ] Build command set: `npm install`
- [ ] Start command set: `node server.js`
- [ ] All environment variables added
- [ ] Discord OAuth2 configured
- [ ] Redirect URI updated in Discord
- [ ] First deployment successful
- [ ] Environment variables updated with actual URL
- [ ] Discord redirect URI updated with actual URL
- [ ] Health check endpoint working
- [ ] Discord login tested
- [ ] Visa application tested
- [ ] All features working correctly

## 🆘 Support

If you encounter issues:
1. Check Render logs in dashboard
2. Check browser console for errors
3. Verify all environment variables are set
4. Test health endpoint: `/health`
5. Check Discord application settings
6. Review this guide for troubleshooting tips

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Render Custom Domains](https://render.com/docs/custom-domains)
- [Discord OAuth2 Documentation](https://discord.com/developers/docs/topics/oauth2)

---

**Last Updated:** 2025-01-XX
**Version:** 1.0.0

