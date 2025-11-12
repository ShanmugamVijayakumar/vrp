# Discord OAuth2 HTTPS Fix

## 🔴 Issue

The Discord OAuth2 redirect URI is currently set to **HTTP** instead of **HTTPS**:
- ❌ Current (WRONG): `http://vintageroleplay-tamil.onrender.com/callback`
- ✅ Correct: `https://vintageroleplay-tamil.onrender.com/callback`

## ✅ Solution

### Step 1: Update Discord Developer Portal

1. **Go to [Discord Developer Portal](https://discord.com/developers/applications)**
2. **Select your application** (Client ID: `1424057714836897945`)
3. **Click on "OAuth2"** in the left sidebar
4. **Scroll down to "Redirects" section**
5. **Remove the HTTP redirect URI:**
   - Find: `http://vintageroleplay-tamil.onrender.com/callback`
   - Click the **X** or **Delete** button next to it
6. **Add the HTTPS redirect URI:**
   - Click **"Add Redirect"**
   - Enter: `https://vintageroleplay-tamil.onrender.com/callback`
   - Click **"Save Changes"**

### Step 2: Verify Render Environment Variables

1. **Go to your Render dashboard**
2. **Select your web service**
3. **Click on "Environment" tab**
4. **Verify these environment variables are set correctly:**
   ```
   REDIRECT_URI=https://vintageroleplay-tamil.onrender.com/callback
   FRONTEND_URL=https://vintageroleplay-tamil.onrender.com
   BASE_URL=https://vintageroleplay-tamil.onrender.com
   ```
5. **If any are using `http://`, update them to `https://`**
6. **Save changes** (Render will automatically redeploy)

### Step 3: Test the Fix

1. **Visit your website:** https://vintageroleplay-tamil.onrender.com
2. **Click the "Login" button**
3. **You should be redirected to Discord with HTTPS URL:**
   ```
   https://discord.com/oauth2/authorize?client_id=1424057714836897945&response_type=code&redirect_uri=https%3A%2F%2Fvintageroleplay-tamil.onrender.com%2Fcallback&scope=identify
   ```
4. **After authorizing, you should be redirected back to your website**

## 🔍 Why This Matters

- **Security**: HTTPS encrypts data in transit
- **Discord Requirement**: Discord requires HTTPS for production OAuth2
- **Cookie Security**: Secure cookies only work over HTTPS
- **Render**: Render provides free SSL certificates (HTTPS)

## ✅ Verification Checklist

- [ ] Discord Developer Portal has HTTPS redirect URI
- [ ] HTTP redirect URI is removed from Discord
- [ ] Render environment variables use HTTPS
- [ ] Discord OAuth login works correctly
- [ ] Users can successfully authenticate
- [ ] Session cookies are secure (HTTPS only)

## 🐛 Troubleshooting

### Issue: Still getting HTTP redirect

**Solution:**
- Clear browser cache
- Try incognito/private browsing mode
- Verify Discord Developer Portal settings are saved
- Check Render environment variables are updated

### Issue: OAuth still not working

**Solution:**
- Verify redirect URI in Discord matches exactly: `https://vintageroleplay-tamil.onrender.com/callback`
- Check that there are no trailing spaces
- Ensure HTTPS is used (not HTTP)
- Verify environment variables in Render are correct
- Check Render logs for errors

### Issue: CORS errors

**Solution:**
- Verify `FRONTEND_URL` in Render uses HTTPS
- Check CORS configuration in `server.js`
- Ensure credentials are included in fetch requests

## 📝 Notes

- **Never use HTTP** for production OAuth2
- **Always use HTTPS** for production websites
- **Render provides free SSL** - HTTPS is automatic
- **Discord requires HTTPS** for production OAuth2
- **Secure cookies** only work over HTTPS

---

**Last Updated:** 2025-01-XX
**Status:** ✅ Fixed - Use HTTPS for all URLs

