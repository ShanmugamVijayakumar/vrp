# Render.com Deployment Checklist

Use this checklist to ensure your Render deployment is complete and successful.

## ✅ Pre-Deployment

- [ ] Code is pushed to GitHub/GitLab/Bitbucket
- [ ] `.env` file is NOT committed (already in `.gitignore`)
- [ ] All dependencies are in `package.json`
- [ ] Discord OAuth2 application is created
- [ ] Discord Client ID and Secret are ready

## ✅ Render Account Setup

- [ ] Render account is created
- [ ] GitHub account is connected (if using GitHub)
- [ ] Repository is accessible from Render

## ✅ Web Service Configuration

- [ ] Web service is created in Render
- [ ] Repository is connected
- [ ] Service name is set (e.g., `vintage-roleplay`)
- [ ] Region is selected (closest to users)
- [ ] Branch is set to `main` (or your default branch)
- [ ] Runtime is set to `Node`
- [ ] Build command is set to `npm install`
- [ ] Start command is set to `node server.js`
- [ ] Auto-deploy is enabled

## ✅ Environment Variables (Initial)

Add these before first deployment:

- [ ] `DISCORD_CLIENT_ID` - Your Discord Client ID
- [ ] `DISCORD_CLIENT_SECRET` - Your Discord Client Secret
- [ ] `SESSION_SECRET` - Random secure string (32+ characters)
- [ ] `NODE_ENV` - Set to `production`
- [ ] `PORT` - Set to `10000` (Render will override if needed)

## ✅ First Deployment

- [ ] Click "Create Web Service" in Render
- [ ] Wait for deployment (2-5 minutes)
- [ ] Deployment is successful
- [ ] Service status is "Live"
- [ ] Your Render URL: `https://vintageroleplay-tamil.onrender.com`

## ✅ Environment Variables (After Deployment)

Add these with your Render URL:

- [ ] `REDIRECT_URI` - `https://vintageroleplay-tamil.onrender.com/callback`
- [ ] `FRONTEND_URL` - `https://vintageroleplay-tamil.onrender.com`
- [ ] `BASE_URL` - `https://vintageroleplay-tamil.onrender.com`

## ✅ Discord OAuth2 Configuration

- [ ] Go to Discord Developer Portal
- [ ] Select your application
- [ ] Go to OAuth2 section
- [ ] Add Redirect URI: `https://vintageroleplay-tamil.onrender.com/callback`
- [ ] Save changes
- [ ] Verify redirect URI matches Render URL exactly

## ✅ Testing

- [ ] Visit your Render URL
- [ ] Home page loads correctly
- [ ] Health check works: `https://your-app.onrender.com/health`
- [ ] Discord login button is visible
- [ ] Discord login redirects to Discord
- [ ] Discord authorization redirects back to site
- [ ] User session persists after login
- [ ] User info is displayed correctly
- [ ] Logout works correctly
- [ ] Visa application page loads
- [ ] Visa application form works
- [ ] Form submission sends to Discord webhook
- [ ] Success animation displays
- [ ] Rules page loads correctly
- [ ] Theme toggle works
- [ ] Language toggle works
- [ ] All images and assets load correctly

## ✅ Security

- [ ] All environment variables are set in Render dashboard
- [ ] `.env` file is NOT committed to repository
- [ ] `SESSION_SECRET` is a random, secure string
- [ ] Discord redirect URI matches exactly
- [ ] HTTPS is enabled (automatic on Render)
- [ ] Environment variables are marked as "Secret" if needed
- [ ] CORS is configured correctly
- [ ] Session cookies are secure

## ✅ Monitoring

- [ ] Build logs are accessible
- [ ] Runtime logs are accessible
- [ ] Health check endpoint works
- [ ] Service metrics are visible
- [ ] Error logs are monitored

## ✅ Post-Deployment

- [ ] Service is running and accessible
- [ ] All features work correctly
- [ ] No console errors in browser
- [ ] No server errors in logs
- [ ] Performance is acceptable
- [ ] SSL certificate is valid (automatic on Render)
- [ ] Custom domain is configured (if using)

## 🐛 Troubleshooting

If you encounter issues:

- [ ] Check Render build logs
- [ ] Check Render runtime logs
- [ ] Check browser console for errors
- [ ] Verify all environment variables are set
- [ ] Test health endpoint: `/health`
- [ ] Check Discord application settings
- [ ] Verify CORS configuration
- [ ] Check SSL certificate (automatic on Render)
- [ ] Verify DNS settings (if using custom domain)

## 📝 Notes

- Render free tier services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Consider upgrading to paid plan for always-on service
- Auto-deploy is enabled by default (deploys on git push)
- Environment variables can be updated without redeploy
- Some variable changes may require manual redeploy

## 🆘 Support Resources

- [Render Documentation](https://render.com/docs)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Render Custom Domains](https://render.com/docs/custom-domains)
- [Discord OAuth2 Documentation](https://discord.com/developers/docs/topics/oauth2)
- [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md) - Full deployment guide
- [RENDER_QUICK_START.md](./RENDER_QUICK_START.md) - Quick start guide

## ✅ Final Checklist

- [ ] All steps above are completed
- [ ] Service is live and accessible
- [ ] All features are working
- [ ] Discord OAuth is working
- [ ] Visa application is working
- [ ] No errors in logs
- [ ] No errors in browser console
- [ ] Performance is acceptable
- [ ] Security is configured
- [ ] Monitoring is set up

---

**Ready to deploy?** Follow the checklist above!

**Need help?** Check [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md) for detailed instructions.

---

**Last Updated:** 2025-01-XX
**Version:** 1.0.0

