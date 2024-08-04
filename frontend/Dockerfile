FROM oven/bun:alpine

RUN apk update
RUN apk add sudo
RUN apk add github-cli
RUN echo 'bun ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER bun
