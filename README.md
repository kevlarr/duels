# Duels

The primary purpose of this repo is to provide something of a framework in
evaluating different frontend frameworks and backend languages. For instance...

- All frontend apps must create an identical UI to manage books and reviews
- All backend apps must provide an API that connects to a PostgreSQL database

The ulterior purpose, however, is to act as an opportunity to better understand
**containerization** and isolation in the development environment.
The main goals here are...

- To use container- and service-oriented workflows to avoid polluting host with new tools
- For each project to have its own minimalist image with necessary languages, build tools, and runtimes

## Code sharing and dependencies

The two common approaches I have seen involve either...

1. Baking the application code and dependencies into the image during build, or..
2. Storing code and dependencies on host system and sharing as a volume during runtime

The first would be a viable option for production,
but I would prefer not to have to rebuild images on any code change in development.
Likewise, the latter seems preferable for development,
but it would often require having dependency management tools on the host,
which went against my goal of isolating tools.

Each container therefore manages the dependencies it needs at runtime via an entry script,
but they store them on the host volume.
This way, dependencies do not depend on the existence of the container,
but they require no tooling present on the host and a simple restart is enough to fetch any new deps.
