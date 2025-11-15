// next.config.mjs

export default () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    turbopack: {
    },

    async headers() {
      return [
        {
          
          source: '/:path*',
          headers: [
            {
              /**
               * X-Content-Type-Options: nosniff
               * 
               * What it does:
               * - Prevents browsers from "MIME-sniffing" (guessing file types)
               * - Forces browser to respect the Content-Type header sent by server
               * 
               * How MIME-sniffing attacks work:
               * 1. Attacker uploads a file disguised as an image (e.g., malicious.jpg)
               * 2. File actually contains JavaScript code
               * 3. Without this header, browser might detect JS and execute it
               * 4. With this header, browser treats it strictly as an image (safe)
               * 
               * Example scenario:
               * - User uploads avatar image to your app
               * - Attacker uploads malicious SVG with embedded JavaScript
               * - Without nosniff: Browser executes the JS (XSS attack)
               * - With nosniff: Browser refuses to execute it
               * 
               * Cookie security relation:
               * - Prevents attackers from stealing cookies via XSS
               * - Works alongside HttpOnly cookie attribute
               * - Part of defense-in-depth strategy
               * 
               * Browser support: All modern browsers (Chrome, Firefox, Safari, Edge)
               * 
               * Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
               */
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
            
            
          ],
        },
      ];
    },
    

  };

  return nextConfig;
};
