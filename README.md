# Vintage Roleplay Website

A production-ready website for Vintage Roleplay server with Discord OAuth2 authentication and visa application system.

## 🚀 Features

- **Discord OAuth2 Authentication** - Secure login with Discord
- **Visa Application System** - Application form with Discord webhook integration
- **Multi-language Support** - English and Tamil
- **Dark/Light Theme** - User preference-based theme switching
- **Responsive Design** - Works on all devices
- **Production Ready** - Secure, optimized, and ready for deployment

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Discord Application with OAuth2 credentials
- Server/VPS or hosting platform account

## 🔧 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```env
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
SESSION_SECRET=your_random_session_secret
PORT=3000
NODE_ENV=production
REDIRECT_URI=https://vintageroleplay-tamil.onrender.com/callback
FRONTEND_URL=https://vintageroleplay-tamil.onrender.com
BASE_URL=https://vintageroleplay-tamil.onrender.com
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Run Production Server

```bash
npm start
```

## 📖 Documentation

For detailed hosting instructions, see [HOSTING_GUIDE.md](./HOSTING_GUIDE.md).

## 🔒 Security

- Environment variables for sensitive data
- Secure session cookies
- HTTPS support
- CORS configuration
- Security headers (helmet)

## 📁 Project Structure

```
.
├── server.js          # Backend server (Express)
├── config.js          # Frontend configuration
├── index.html         # Home page
├── rules.html         # Rules page
├── application.html   # Visa application page
├── app.js             # Application form logic
├── script.js          # Background music script
├── style.css          # Main stylesheet
├── app_style.css      # Application page styles
├── package.json       # Dependencies
├── .env               # Environment variables (create this)
├── .gitignore         # Git ignore file
└── HOSTING_GUIDE.md   # Detailed hosting guide
```

## 🌐 Deployment

See [HOSTING_GUIDE.md](./HOSTING_GUIDE.md) for detailed deployment instructions.

### Quick Deployment Options:

1. **VPS/Cloud Server** - Use PM2 or systemd
2. **Railway** - Simple deployment with environment variables
3. **Render** - Easy deployment with Git integration
4. **Heroku** - Traditional PaaS deployment
5. **DigitalOcean** - App Platform deployment

## 🧪 Testing

1. **Test locally:**
   ```bash
   npm run dev
   ```

2. **Test production:**
   ```bash
   npm start
   ```

3. **Health check:**
   ```
   GET https://vintageroleplay-tamil.onrender.com/health
   ```

## 🔧 Configuration

### Discord OAuth2 Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to OAuth2 section
4. Add redirect URI: `https://vintageroleplay-tamil.onrender.com/callback`
5. Copy Client ID and Client Secret
6. Add to `.env` file

### Environment Variables

- `DISCORD_CLIENT_ID` - Discord OAuth2 Client ID
- `DISCORD_CLIENT_SECRET` - Discord OAuth2 Client Secret
- `SESSION_SECRET` - Random string for session encryption
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `REDIRECT_URI` - Discord OAuth2 callback URL
- `FRONTEND_URL` - Frontend URL
- `BASE_URL` - Base URL for API calls

## 🐛 Troubleshooting

### Discord OAuth not working

- Check redirect URI matches Discord settings
- Verify environment variables are set correctly
- Check browser console for errors

### Session not persisting

- Verify `SESSION_SECRET` is set
- Check cookie settings
- Ensure HTTPS is enabled in production

### CORS errors

- Verify `FRONTEND_URL` matches your domain
- Check CORS configuration in `server.js`

## 📝 License

This project is proprietary and confidential.

## 🆘 Support

For issues and questions, contact the development team.

---

**Version:** 1.0.0
**Last Updated:** 2025-01-XX


