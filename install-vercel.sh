#!/bin/bash

if [ "$GITHUB_ACCESS_TOKEN" == "" ]; then
  echo "GITHUB_ACCESS_TOKEN is not set"
  exit 1
fi

set -e

install () {
  SUBMODULE_GITHUB=$1
  SUBMODULE_PATH=$2

  # Get submodule commit
  output=$(git submodule status --recursive $SUBMODULE_PATH)
  no_prefix=${output#*-}
  COMMIT=${no_prefix% *}

  # Create tmp directory
  rm -rf tmp || true
  mkdir tmp
  cd tmp

  # Initialize the git repo and fetch the required commit
  git init
  git remote add origin https://$GITHUB_ACCESS_TOKEN@$SUBMODULE_GITHUB
  git fetch --depth=1 origin $COMMIT
  git checkout $COMMIT

  # Move tmp to the submodule path
  cd ..
  rm -rf tmp/.git
  mv tmp/* $SUBMODULE_PATH/

  # Clean up
  rm -rf tmp
}

install "github.com/user-pass/website" "apps/website"
install "github.com/user-pass/integrations" "packages/integrations"
install "github.com/user-pass/console" "packages/console"

# Use Bun for installing dependencies
echo "Installing dependencies with Bun..."
bun install

# Build the project with Bun
echo "Building the project with Bun..."
bun run build
