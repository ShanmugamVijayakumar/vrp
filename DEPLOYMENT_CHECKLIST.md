# Deployment Checklist

Use this checklist to ensure your production deployment is complete and secure.

## ✅ Pre-Deployment

- [ ] All dependencies installed (`npm install`)
- [ ] `.env` file created with all required variables
- [ ] Environment variables set correctly
- [ ] Discord OAuth2 application configured
- [ ] Discord redirect URI matches production URL
- [ ] Session secret is a random, secure string
- [ ] HTTPS certificate obtained (for production)
- [ ] Domain name configured (if using custom domain)

## ✅ Environment Variables

- [ ] `DISCORD_CLIENT_ID` - Set and correct
- [ ] `DISCORD_CLIENT_SECRET` - Set and correct
- [ ] `SESSION_SECRET` - Random secure string
- [ ] `PORT` - Set (default: 3000)
- [ ] `NODE_ENV` - Set to `production`
- [ ] `REDIRECT_URI` - Matches Discord settings
- [ ] `FRONTEND_URL` - Matches your domain
- [ ] `BASE_URL` - Matches your domain

## ✅ Security

- [ ] `.env` file is in `.gitignore`
- [ ] `.env` file is NOT committed to version control
- [ ] Session secret is secure and random
- [ ] HTTPS is enabled (for production)
- [ ] CORS is configured correctly
- [ ] Security headers are enabled (helmet)
- [ ] Cookie security settings are correct
- [ ] Trust proxy is set (if behind reverse proxy)

## ✅ Server Configuration

- [ ] Node.js version is 14 or higher
- [ ] Server has sufficient resources
- [ ] Firewall rules are configured
- [ ] Port is accessible (if not using reverse proxy)
- [ ] Reverse proxy is configured (if using Nginx)
- [ ] SSL certificate is installed (for HTTPS)

## ✅ Application Testing

- [ ] Home page loads correctly
- [ ] Discord login works
- [ ] User session persists
- [ ] Logout works correctly
- [ ] Visa application form loads
- [ ] Form submission works
- [ ] Discord webhook receives applications
- [ ] Rules page loads correctly
- [ ] Theme toggle works
- [ ] Language toggle works
- [ ] All images and assets load correctly

## ✅ Monitoring

- [ ] Health check endpoint works (`/health`)
- [ ] Server logs are accessible
- [ ] Error logging is configured
- [ ] Monitoring tools are set up (optional)
- [ ] Backup strategy is in place

## ✅ Documentation

- [ ] README.md is updated
- [ ] HOSTING_GUIDE.md is reviewed
- [ ] Environment variables are documented
- [ ] Deployment process is documented

## ✅ Post-Deployment

- [ ] Website is accessible
- [ ] All features work correctly
- [ ] No console errors in browser
- [ ] No server errors in logs
- [ ] Performance is acceptable
- [ ] SSL certificate is valid
- [ ] DNS is configured correctly
- [ ] CDN is configured (if using)

## 🐛 Troubleshooting

If you encounter issues:

1. Check server logs
2. Check browser console
3. Verify environment variables
4. Test health endpoint
5. Check Discord application settings
6. Verify CORS configuration
7. Check SSL certificate
8. Verify DNS settings

## 📝 Notes

- Keep `.env` file secure and never commit it
- Regularly update dependencies
- Monitor server resources
- Set up regular backups
- Keep server updated
- Monitor error logs
- Test after each deployment

---

**Last Updated:** 2025-01-XX


