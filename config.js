// config.js - Frontend configuration for API URLs
// This file detects the environment and sets the appropriate API base URL

(function() {
  // Detect if we're in production (hosted) or development (localhost)
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port;
  
  // Determine base URL
  let BASE_URL;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Development environment
    BASE_URL = `${protocol}//${hostname}:${port || '3000'}`;
  } else {
    // Production environment - use same origin
    BASE_URL = `${protocol}//${hostname}${port ? ':' + port : ''}`;
  }
  
  // Export to window for use in other scripts
  window.APP_CONFIG = {
    BASE_URL: BASE_URL,
    API_URL: BASE_URL, // Same as BASE_URL since backend serves frontend
    LOGIN_URL: `${BASE_URL}/login`,
    LOGOUT_URL: `${BASE_URL}/logout`,
    USER_INFO_URL: `${BASE_URL}/user`,
    IS_PRODUCTION: hostname !== 'localhost' && hostname !== '127.0.0.1'
  };
  
  console.log('🔧 App Config:', window.APP_CONFIG);
})();


