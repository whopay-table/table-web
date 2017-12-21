
# Reset any uncommited changes.
git reset --hard

# Fetch all tags.
git fetch --all --tags --prune

# Checkout the required version.
git checkout $1

# Build the source code.
yarn install --production=false
yarn build
