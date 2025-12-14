# TODO: Fix Real-Time Chat for Deployment

## Issue
Real-time chat works on localhost but disconnects on deployment because client defaults to localhost:5000.

## Changes Made
- Updated `client/src/services/api.ts`: Changed API_BASE_URL to full URL (e.g., http://localhost:5000/api).
- Updated `server/server.js`: Adjusted CORS to be more restrictive in production.
- Updated `client/src/pages/Support.tsx`: Derive Socket.IO URL from VITE_API_URL by removing '/api'.

## Deployment Steps
1. Set environment variables in deployment platform (e.g., Vercel for client, Render for server):
   - For client (Vercel): Set VITE_API_URL to your deployed server URL + /api (e.g., https://your-server.com/api).
   - For server: Set CLIENT_URL to your deployed client URL (e.g., https://your-client.vercel.app), and NODE_ENV=production.
2. Deploy server first, then client.
3. Test chat functionality on deployed site.

## Testing
- Local: Should still work with defaults.
- Production: Set env vars and redeploy.

## Next Steps
- [ ] Set VITE_API_URL in client deployment.
- [ ] Set CLIENT_URL and NODE_ENV in server deployment.
- [ ] Redeploy both.
- [ ] Test chat on production.
