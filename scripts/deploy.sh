
# Remove the previous deploy directory.
rm -rf deploy

# Copy the built package to a directory for deployment.
cp -R build deploy

# Restart the server.
systemctl restart table-web
