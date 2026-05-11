
FROM node:20-alpine

WORKDIR /app

ENV PNPM_HOME="/root/.local/share/pnpm"

ENV PATH="${PNPM_HOME}:${PATH}"

RUN corepack enable

RUN pnpm add -g @angular/cli

EXPOSE 4200

CMD ["tail", "-f", "/dev/null"]
