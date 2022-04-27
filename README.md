UbiPong
=======

## Production Environment

```
https://www.eatsleeppong.com/ubipong
```

Be sure to build with

```
npx nx build --prod --base-href /ubipong/
```

or routing will fail.

## How to E2E Test

Check settings in `apps/ubipong-ui-e2e/src/config/environment.ts`.

For `challongeApiKey` set environment variable `CYPRESS_CHALLONGE_API_KEY` (note the `CYPRESS_` prefix).

Run

```bash
npx nx e2e ubipong-ui-e2e --watch
```

## How to Deploy

Once the commits are merged into master branch, tag the version with

```bash
git tag v{yyyy-MM-dd}
```

Run build with

```bash
npx nx build --prod --base-href {base-href}/
```

where base-href is the context path between host name and the `index.html` of the application.  _It must have an ending slash (if using hash navigation?)._

Then copy the contents in dist/apps/ubipong-ui to the server.

(a little clunky, but this avoids having to use npm express for now)

And because we are deploying to a plain old web server, we need to use
hash navigation.

## How to Run in WSL

If we want to run (`ng serve`) the application in WSL while accessing it from Windows, we need to listen to the host name of the WSL.

Find the IP address using

```bash
ip addr show eth0
```

Then run

```bash
npx ng serve --host 0.0.0.0
```

Now we can get to it from our browser in Windows using the IP address.

If the API is also running in WSL, then we need to edit `environment.ts` to set the `tournamentServerUrl` to the IP address.



## Table Tennis Tournament Manager

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
