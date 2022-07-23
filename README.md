# Ubipong Tournament Manager

This project is aimed at managing an on-site table tennis tournament.  Its goals are

- To be able to create player list and draws, for both single elimination and round robin.

- To be able to record scores, including

  - Normal completed games.
  - Defaults.
  - Double defaults.
  - Retirements.

- To be able to advance players according to the rules.

- To be able to display current playing status:

  - Summary of results, especially for a round robin.
  - Which players are due to play.

- To be able to enter results by players.  This is done through the use of
  challonge.com, which has a mobile application that allows players to enter
  scores.

## Unit Test

```
npm test
```

## Run Locally

Set these environment properties within
`apps/ubipong-ui/src/environments/environment.ts`:

- tournamentServiceUrl: URL of the Ubipong API (usually localhost)

```
npm start
```

### How to Run in WSL

If we want to run the application in WSL while accessing it from Windows, we
need to listen to the host name of the WSL.

Find the IP address of WSL using

```bash
ip addr show eth0
```

Then run

```bash
npx ng serve --host 0.0.0.0
```

Now we can get to it from our browser in Windows using the IP address.

Reminder: if the API is also running in WSL, then we need to set
`tournamentServerUrl` to the IP address.

## Test (E2E)

Before testing, make sure the backend services are running.

These environment variables
Set environment variable `CYPRESS_CHALLONGE_API_KEY` (note the `CYPRESS_` prefix).

Check settings in `apps/ubipong-ui-e2e/src/config/environment.ts`.

Run

```bash
npx nx e2e ubipong-ui-e2e --watch
```

## Deploy

Once the commits are merged into master branch, tag the version with

```bash
git tag v{yyyy-MM-dd}
```

Production URL is:

```
https://www.eatsleeppong.com/ubipong
```

Edit environment.prod.ts to set authorization server and client ID.

Rebuild the application with the correct `baseHref`:

```
npx nx build --prod --base-href /ubipong/
```

or routing will fail.

Note the `baseHref` is `/ubipong/`, which is the path between the host name and
the `index.html` of the application.  _It must have an ending slash (if using
hash navigation?)._

Then copy the contents in dist/apps/ubipong-ui to a static HTTP server (a
little clunky, but this avoids having to use npm express for now). And because
we are deploying to a plain old web server, we need to use hash navigation.

