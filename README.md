# Battlebit Forge

Create and share loadouts

## How to run

1. Create .env and copy paste .env.example
2. Create oauth credentials for Discord
3. docker-compose up -d && yarn && yarn dev

## Merge Requests

* Should contain a changeset

## Release (currently we deploy every push into main)

**Requires changesets**  
You can check the current release with `yarn changeset:status`.

**Update package versions:**  
yarn changeset:version

**Commit the changes:**  
git add .  
git commit (make sure to prefix with: `release`)

**Generate git tags:**  
yarn changeset:tag 

**Push the release:**  
git push && git push --tags
