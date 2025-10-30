# Start with official Jenkins agent image
FROM jenkins/agent:latest

# Switch to root to install Node.js
USER root

# Install Node.js 18 and npm (Debian systems)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Set user back to Jenkins
USER jenkins

# Verify node version
RUN node -v
RUN npm -v
