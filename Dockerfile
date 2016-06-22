FROM ubuntu:16.04
Maintainer hello@tailored-tunes.com

RUN apt-get update

RUN echo "UTC" > /etc/timezone
RUN dpkg-reconfigure --frontend noninteractive tzdata

RUN apt-get -y install \
	mc \
	git \
	nodejs \
	npm
RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN mkdir /app
WORKDIR /app
ADD . /app

RUN npm install

ENV PORT 8080

EXPOSE 8080

CMD node src/web.js
