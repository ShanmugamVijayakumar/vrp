// server.js - Production Discord OAuth2 server

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

require('dotenv').config();

const app = express();

// ---------------------- CONFIG ----------------------
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const CALLBACK_URL = process.env.REDIRECT_URI || `https://vintageroleplay-tamil.onrender.com/callback`;
const FRONTEND_URL = process.env.FRONTEND_URL || `https://vintageroleplay-tamil.onrender.com`;
const SESSION_SECRET = process.env.SESSION_SECRET || (NODE_ENV === 'production' ? null : 'dev-secret-key');

// Validate required environment variables in production
if (NODE_ENV === 'production') {
  if (!CLIENT_ID || !CLIENT_SECRET || !SESSION_SECRET) {
    console.error('❌ ERROR: Missing required environment variables in production!');
    console.error('Required: DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, SESSION_SECRET');
    process.exit(1);
  }
}

// ---------------------- MIDDLEWARE ----------------------
// Security headers
if (NODE_ENV === 'production') {
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for static files, adjust if needed
  }));
}

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In production, check against allowed origins
    if (NODE_ENV === 'production') {
      const allowedOrigins = [FRONTEND_URL];
      if (allowedOrigins.indexOf(origin) !== -1 || origin.includes(FRONTEND_URL)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      callback(null, true); // Allow all in development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Trust proxy (important for production behind reverse proxy)
if (NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Session configuration
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax'
  },
  name: 'sessionId' // Don't use default 'connect.sid'
}));

app.use(passport.initialize());
app.use(passport.session());

// ---------------------- PASSPORT CONFIG ----------------------
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Validate Discord credentials
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ ERROR: Discord OAuth credentials not configured!');
  console.error('Please set DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET in your .env file');
}

passport.use(
  new DiscordStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: ["identify"],
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// ---------------------- ROUTES ----------------------

// API routes (must be before static files)
app.get("/login", passport.authenticate("discord"));

app.get(
  "/callback",
  passport.authenticate("discord", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.redirect("/");
  });
});

app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ 
      username: req.user.username, 
      id: req.user.id,
      avatar: req.user.avatar || null
    });
  } else {
    res.status(401).json({ error: "Not logged in" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve static files (after API routes)
app.use(express.static(path.join(__dirname)));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ---------------------- START SERVER ----------------------
// Listen on 0.0.0.0 to accept connections from any network interface
// This is required for Render.com and other cloud platforms
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Environment: ${NODE_ENV}`);
  console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🔗 Callback URL: ${CALLBACK_URL}`);
  if (NODE_ENV === 'development') {
    console.log(`🚀 Access at: http://localhost:${PORT}`);
  } else {
    console.log(`🌍 Production server is live at: ${FRONTEND_URL}`);
  }
});
