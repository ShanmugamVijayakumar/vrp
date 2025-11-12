# Hosting Guide - Vintage Roleplay Website

This guide will help you deploy both the frontend and backend of your Vintage Roleplay website to production.

## 📋 Prerequisites

1. **Node.js** (v14 or higher) installed on your server
2. **npm** (v6 or higher)
3. **Domain name** (optional, but recommended)
4. **Discord Application** with OAuth2 credentials
5. **Server/VPS** (Linux recommended) or hosting platform account

## 🔧 Setup Steps

### Step 1: Discord OAuth2 Configuration

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application or select your existing one
3. Go to **OAuth2** section
4. Add redirect URI: `https://vintageroleplay-tamil.onrender.com/callback`
5. Copy your **Client ID** and **Client Secret**
6. Save these credentials - you'll need them in Step 3

### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```env
# Discord OAuth2 Configuration
DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_CLIENT_SECRET=your_discord_client_secret_here

# Server Configuration
PORT=3000
NODE_ENV=production

# Session Secret (generate a random string)
# You can generate one using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
SESSION_SECRET=your_random_session_secret_here

# URLs (Render URL)
REDIRECT_URI=https://vintageroleplay-tamil.onrender.com/callback
FRONTEND_URL=https://vintageroleplay-tamil.onrender.com
BASE_URL=https://vintageroleplay-tamil.onrender.com
```

**Important:**
- Your Render URL is `vintageroleplay-tamil.onrender.com`
- Generate a secure random string for `SESSION_SECRET`
- Never commit the `.env` file to version control (it's already in .gitignore)

### Step 4: Update Discord Redirect URI

Make sure the `REDIRECT_URI` in your `.env` file matches exactly what you set in Discord Developer Portal (Step 1).

## 🚀 Deployment Options

### Option 1: VPS/Cloud Server (Recommended)

#### Using PM2 (Process Manager)

1. **Install PM2 globally:**
   ```bash
   npm install -g pm2
   ```

2. **Start the application:**
   ```bash
   pm2 start server.js --name "vintage-roleplay" --env production
   ```

3. **Save PM2 configuration:**
   ```bash
   pm2 save
   pm2 startup
   ```

4. **Set up Nginx reverse proxy** (recommended):

   Create `/etc/nginx/sites-available/vintage-roleplay`:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/vintage-roleplay /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **Set up SSL with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

#### Using systemd (Alternative)

1. **Create service file** `/etc/systemd/system/vintage-roleplay.service`:
   ```ini
   [Unit]
   Description=Vintage Roleplay Website
   After=network.target

   [Service]
   Type=simple
   User=your-username
   WorkingDirectory=/path/to/your/project
   Environment="NODE_ENV=production"
   EnvironmentFile=/path/to/your/project/.env
   ExecStart=/usr/bin/node server.js
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
   ```

2. **Start the service:**
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable vintage-roleplay
   sudo systemctl start vintage-roleplay
   ```

3. **Check status:**
   ```bash
   sudo systemctl status vintage-roleplay
   ```

### Option 2: Hosting Platforms

#### Railway

1. **Sign up at [Railway](https://railway.app)**
2. **Create a new project**
3. **Connect your GitHub repository** (or upload files)
4. **Add environment variables** in Railway dashboard:
   - `DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`
   - `SESSION_SECRET`
   - `REDIRECT_URI` (Railway will provide your domain)
   - `FRONTEND_URL`
   - `NODE_ENV=production`
5. **Deploy** - Railway will automatically deploy

#### Render

1. **Sign up at [Render](https://render.com)**
2. **Create a new Web Service**
3. **Connect your repository**
4. **Configure:**
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** Node
5. **Add environment variables** (same as Railway)
6. **Deploy**

#### Heroku

1. **Install Heroku CLI**
2. **Login:** `heroku login`
3. **Create app:** `heroku create your-app-name`
4. **Set environment variables:**
   ```bash
   heroku config:set DISCORD_CLIENT_ID=your_id
   heroku config:set DISCORD_CLIENT_SECRET=your_secret
   heroku config:set SESSION_SECRET=your_secret
   heroku config:set NODE_ENV=production
   heroku config:set REDIRECT_URI=https://your-app-name.herokuapp.com/callback
   heroku config:set FRONTEND_URL=https://your-app-name.herokuapp.com
   ```
5. **Deploy:** `git push heroku main`

#### DigitalOcean App Platform

1. **Create a new app** on DigitalOcean
2. **Connect your repository**
3. **Configure build settings:**
   - Build Command: `npm install`
   - Run Command: `node server.js`
4. **Add environment variables**
5. **Deploy**

## 🔒 Security Checklist

- [ ] All environment variables are set and secure
- [ ] `SESSION_SECRET` is a random, secure string
- [ ] HTTPS is enabled (SSL certificate installed)
- [ ] Discord redirect URI matches exactly
- [ ] `.env` file is not committed to version control
- [ ] Server has firewall rules configured
- [ ] Regular backups are set up
- [ ] Server is updated regularly

## 🧪 Testing

1. **Test locally first:**
   ```bash
   npm install
   # Create .env file with development values
   npm run dev
   ```

2. **Test production:**
   - Visit your domain
   - Test Discord login
   - Test visa application form
   - Check console for errors

## 📊 Monitoring

### Health Check

Your server has a health check endpoint:
```
GET https://yourdomain.com/health
```

### PM2 Monitoring

```bash
pm2 status
pm2 logs vintage-roleplay
pm2 monit
```

### systemd Monitoring

```bash
sudo systemctl status vintage-roleplay
sudo journalctl -u vintage-roleplay -f
```

## 🔄 Updating

1. **Pull latest changes:**
   ```bash
   git pull origin main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Restart the service:**
   ```bash
   # PM2
   pm2 restart vintage-roleplay
   
   # systemd
   sudo systemctl restart vintage-roleplay
   ```

## 🐛 Troubleshooting

### Issue: Discord OAuth not working

**Solution:**
- Check that redirect URI in Discord matches your production URL exactly
- Verify `DISCORD_CLIENT_ID` and `DISCORD_CLIENT_SECRET` are correct
- Check browser console for errors
- Verify CORS settings in `server.js`

### Issue: Session not persisting

**Solution:**
- Ensure `SESSION_SECRET` is set
- Check that cookies are enabled in browser
- Verify `secure` cookie setting matches your HTTPS setup
- Check `trust proxy` setting if behind reverse proxy

### Issue: CORS errors

**Solution:**
- Verify `FRONTEND_URL` in `.env` matches your domain
- Check CORS configuration in `server.js`
- Ensure credentials are included in fetch requests

### Issue: Port already in use

**Solution:**
- Change `PORT` in `.env` file
- Or stop the process using the port:
  ```bash
  lsof -ti:3000 | xargs kill -9
  ```

## 📝 Notes

- The frontend and backend are served from the same server
- Static files (HTML, CSS, JS, images) are served by Express
- The `config.js` file automatically detects the environment
- All API calls use relative URLs in production
- Discord OAuth requires HTTPS in production

## 🆘 Support

If you encounter issues:
1. Check the server logs
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Test the health endpoint: `/health`
5. Verify Discord application settings

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Passport.js Documentation](http://www.passportjs.org/)
- [Discord OAuth2 Documentation](https://discord.com/developers/docs/topics/oauth2)
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Nginx Documentation](https://nginx.org/en/docs/)

---

**Last Updated:** 2025-01-XX
**Version:** 1.0.0


