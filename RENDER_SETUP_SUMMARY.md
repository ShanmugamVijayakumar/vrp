# Render.com Setup Summary

## 🎯 What You Need to Do

### Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "Ready for Render deployment"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### Step 2: Create Render Web Service

1. Go to [render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `vintage-roleplay`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Branch:** `main`

### Step 3: Add Environment Variables

In Render dashboard, go to **"Environment"** tab and add:

```env
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
SESSION_SECRET=generate_random_string
NODE_ENV=production
PORT=10000
```

**Generate SESSION_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait 2-5 minutes for first deployment
3. Your Render URL: `https://vintageroleplay-tamil.onrender.com`

### Step 5: Update URLs

After deployment, add these environment variables with your Render URL:

```env
REDIRECT_URI=https://vintageroleplay-tamil.onrender.com/callback
FRONTEND_URL=https://vintageroleplay-tamil.onrender.com
BASE_URL=https://vintageroleplay-tamil.onrender.com
```

### Step 6: Configure Discord

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application
3. Go to **OAuth2** → **Redirects**
4. Add: `https://vintageroleplay-tamil.onrender.com/callback`
5. Save changes

### Step 7: Test

- Visit your Render URL: `https://vintageroleplay-tamil.onrender.com`
- Test Discord login
- Test visa application
- Check: `https://vintageroleplay-tamil.onrender.com/health`

## ✅ Important Notes

1. **Render sets PORT automatically** - Your code already handles this
2. **HTTPS is automatic** - Render provides free SSL
3. **Free tier sleeps** - After 15 minutes of inactivity
4. **Auto-deploy enabled** - Deploys on git push
5. **Environment variables** - Set in Render dashboard, not in `.env` file

## 🐛 Common Issues

**Service crashes?**
- Check environment variables are set
- Verify `SESSION_SECRET` is set
- Check Discord credentials

**Discord OAuth not working?**
- Verify redirect URI matches exactly
- Check environment variables
- Ensure HTTPS is enabled (automatic)

**Service sleeping?**
- Free tier sleeps after 15 minutes
- First request takes ~30 seconds to wake up
- Consider paid plan for always-on

## 📚 Documentation

- **Quick Start:** [RENDER_QUICK_START.md](./RENDER_QUICK_START.md)
- **Full Guide:** [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)

---

**Ready to deploy?** Follow the steps above!

