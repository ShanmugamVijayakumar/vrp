# Render.com Quick Start Guide

Quick reference guide for deploying to Render.com in 5 minutes.

## ⚡ Quick Deployment Steps

### 1. Push Code to GitHub
```bash
git init
git add .
git commit -m "Ready for Render deployment"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### 2. Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub (recommended)
- Authorize Render access

### 3. Create Web Service
- Click **"New +"** → **"Web Service"**
- Connect your repository
- Configure settings:

**Basic Settings:**
- Name: `vintage-roleplay`
- Region: Choose closest to users
- Branch: `main`

**Build & Deploy:**
- Runtime: `Node`
- Build Command: `npm install`
- Start Command: `node server.js`

### 4. Set Environment Variables

Click **"Environment"** tab and add:

```
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
SESSION_SECRET=your_random_secret
NODE_ENV=production
PORT=10000
```

**Generate SESSION_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Deploy
- Click **"Create Web Service"**
- Wait for deployment (2-5 minutes)
- Your Render URL: `https://vintageroleplay-tamil.onrender.com`

### 6. Update Environment Variables

After deployment, add these with your Render URL:

```
REDIRECT_URI=https://vintageroleplay-tamil.onrender.com/callback
FRONTEND_URL=https://vintageroleplay-tamil.onrender.com
BASE_URL=https://vintageroleplay-tamil.onrender.com
```

### 7. Configure Discord OAuth2

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application
3. Go to **OAuth2** section**
4. Add Redirect URI: `https://vintageroleplay-tamil.onrender.com/callback`
5. Save changes

### 8. Test
- Visit your Render URL: `https://vintageroleplay-tamil.onrender.com`
- Test Discord login
- Test visa application
- Check health: `https://vintageroleplay-tamil.onrender.com/health`

## ✅ Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Web service created
- [ ] Environment variables set
- [ ] First deployment successful
- [ ] Render URL copied
- [ ] Environment variables updated with URL
- [ ] Discord redirect URI updated
- [ ] Tested Discord login
- [ ] Tested visa application

## 🔧 Render Settings Summary

| Setting | Value |
|---------|-------|
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `node server.js` |
| Auto-Deploy | Yes |
| Health Check | `/health` (optional) |

## 🌐 Environment Variables

Required variables:
- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `SESSION_SECRET`
- `NODE_ENV=production`
- `PORT=10000`
- `REDIRECT_URI` (after deployment)
- `FRONTEND_URL` (after deployment)
- `BASE_URL` (after deployment)

## 🐛 Quick Troubleshooting

**Build fails?**
- Check build logs
- Verify `package.json` is correct
- Check Node.js version (14+)

**Service crashes?**
- Check runtime logs
- Verify all environment variables are set
- Check Discord credentials

**Discord OAuth not working?**
- Verify redirect URI matches exactly
- Check environment variables
- Verify HTTPS is enabled (automatic on Render)

**Service sleeping?**
- Free tier sleeps after 15 minutes
- First request takes ~30 seconds
- Consider paid plan for always-on

## 📚 Full Documentation

For detailed instructions, see [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)

## 🆘 Need Help?

1. Check Render logs in dashboard
2. Check browser console
3. Verify environment variables
4. Test health endpoint
5. Review full deployment guide

---

**Last Updated:** 2025-01-XX

