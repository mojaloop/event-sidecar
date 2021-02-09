FROM node:12.16.1-alpine as builder
WORKDIR /opt/event-sidecar

RUN apk add --no-cache -t build-dependencies git make gcc g++ python libtool autoconf automake \
    && cd $(npm root -g)/npm \
    && npm config set unsafe-perm true \
    && npm install -g node-gyp

COPY package.json package-lock.json* /opt/event-sidecar/
RUN npm install

RUN apk del build-dependencies

COPY config /opt/event-sidecar/config
COPY src /opt/event-sidecar/src

FROM node:12.16.1-alpine
WORKDIR /opt/event-sidecar

# Create empty log file & link stdout to the application log file
RUN mkdir ./logs && touch ./logs/combined.log
RUN ln -sf /dev/stdout ./logs/combined.log

# Create a non-root user: ml-user
RUN adduser -D ml-user 
USER ml-user

COPY --chown=ml-user --from=builder /opt/event-sidecar .
RUN npm prune --production

EXPOSE 4001
CMD ["npm", "run", "start"]
