# Start from debian image
FROM debian:11.2 AS firebase-emulator-image

# Specify bash shell since sdk use bash syntaxe
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Set working directory to /appconfig
WORKDIR /app

# Update packages list and install packages
RUN apt-get update && apt-get -y --no-install-recommends install \
        curl \
        ca-certificates \
        sudo \
        zip \
        unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Firebase emulator
RUN curl -sL firebase.tools | bash

# Install Java SDK
RUN curl -s "https://get.sdkman.io" | bash && \
    chmod a+x ~/.sdkman/bin/sdkman-init.sh && \
    source ~/.bashrc && \
    sdk install java 16.0.2-tem

# Specify Java path
ENV PATH="$PATH:/root/.sdkman/candidates/java/current/bin"

# Copy default config
COPY config /app

# Run emulators
ENTRYPOINT ["firebase", "emulators:start"]

# Default project id
CMD ["--project", "local"]
