
# Reset any uncommited changes.
git reset --hard

# Checkout the required version.
git checkout $1

# Build the source code.
yarn build
