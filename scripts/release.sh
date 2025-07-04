#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Pre-flight Checks ---
echo "Verifying npm authentication..."
if ! npm whoami > /dev/null 2>&1; then
  echo "Error: You are not logged into npm."
  echo "Please run 'bunx npm login' to authenticate and then try again."
  exit 1
fi
echo "Authentication successful."

# --- Release Process ---

# Prompt for the version type
read -p "Enter version type (patch, minor, major): " VERSION_TYPE

# Validate input
if [[ "$VERSION_TYPE" != "patch" && "$VERSION_TYPE" != "minor" && "$VERSION_TYPE" != "major" ]]; then
  echo "Invalid version type. Please use 'patch', 'minor', or 'major'."
  exit 1
fi

echo "Building library..."
bun run build:lib

# echo "Running tests..."
# bun run test

echo "Bumping version, committing, and tagging..."
# Use npm to handle versioning, which also creates a git commit and tag
npm version "$VERSION_TYPE" -m "chore(release): %s"

echo "Publishing to npm..."
bun publish

echo "Pushing changes and tags to GitHub..."
git push && git push --tags

# Get the latest tag name
LATEST_TAG=$(git describe --tags --abbrev=0)

echo "Creating GitHub release $LATEST_TAG..."
# Create a new GitHub release, automatically generating the changelog
gh release create "$LATEST_TAG" --generate-notes

echo "Release process complete!"