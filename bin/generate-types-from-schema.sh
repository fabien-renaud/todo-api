#!/bin/bash

# Verify swagger-typescript-api is installed
if ! command -v swagger-typescript-api &> /dev/null
then
    echo "swagger-typescript-api could not be found. Install it first with 'npm ci' !"
    exit
fi

# Generate default files in 'types_generation/' folder
swagger-typescript-api -p $(dirname $0)/../src/core/openapi.yaml -o $(dirname $0)/../tmp/types --modular --silent

# Rename data-contracts.ts file to types.ts and place it in 'src/types' folder
if [ -f $(dirname $0)/../tmp/types/data-contracts.ts ]; then
  mv -f $(dirname $0)/../tmp/types/data-contracts.ts $(dirname $0)/../src/types/types.ts
  # Delete first 11 line, containing ignore of eslint, tslint and useless comments
  sed -i 1,11d $(dirname $0)/../src/types/types.ts
fi

# Remove temp dir 'types_generation'
rm -r $(dirname $0)/../tmp