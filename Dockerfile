# The image Coolify builds and runs (Build Pack: Dockerfile, port 3000). Three stages: install the
# dependencies, build the site, and run only the self-contained server that `output: "standalone"`
# leaves in .next/standalone, with the static files it does not copy itself. Coolify's proxy sits in
# front of it and handles HTTPS. Based on the with-docker example of Next.js.

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# Development dependencies included: the build needs Tailwind and TypeScript.
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
