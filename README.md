# Duels

The primary purpose of this repo is to provide something of a framework in
evaluating different frontend frameworks and backend languages. For instance...

- All frontend apps must create an identical UI to manage books and reviews
- All backend apps must provide an API that connects to a PostgreSQL database

The ulterior purpose, however, is to act as an opportunity to better understand
containerization and isolation in the development environment. The goals here are...

- To better understand container- and service-oriented workflows
- Each project to have its own image with necessary languages, build tools, and runtimes
- Application code to be mounted as a volume during runtime rather than copied during build
- Dependencies stored in the shared application volume on host so they are cached between containers...
- ... but are installed and managed by the container itself to avoid needing tools on host
