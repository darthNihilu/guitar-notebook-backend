FROM node:18-alpine
USER root
WORKDIR /user/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm install

# Bundle app source
COPY  . .
RUN npm  run build

# Use the node user from the image (instead of the root user)
#USER node

CMD ["npm", "run", "start"]

#CMD ["npm", "run", "start:prod"]