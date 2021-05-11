FROM kumorelease-docker-virtual.artylab.expedia.biz/stratus/primer-base-pwa-expressjs:12.13.1 as intermediate

# When the client Dockerfile builds, copy all of its source code into the new image's /app WORKDIR
WORKDIR /app-build
RUN useradd -ms /bin/sh admin
COPY --chown=admin . .
RUN chown -R admin .
USER admin

# Display the copied files and directories in the build output for any troubleshooting
RUN du -sh .[!.]* *| sort -nr

# Use provided value from build for the user level .npmrc and copy to user home directory
ARG npm_userconfig_path
RUN mv $npm_userconfig_path ~/.npmrc

# Verify in the build output that the provided .npmrc exists and is picked up by npm 
RUN ls -lh ~/.npmrc
RUN npm config ls

# When the client Dockerfile builds, install all of the app dependencies
RUN yarn install --ignore-engines

# Perform a prod build
RUN yarn prod

# Build second stage to flatten all layers from the intermediate stage
FROM kumorelease-docker-virtual.artylab.expedia.biz/stratus/primer-base-pwa-expressjs:12.13.1
COPY --from=intermediate /app-build/ /app/

ENV NODE_OPTIONS --max-http-header-size=20480
