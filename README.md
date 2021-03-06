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

## How to Deploy

Run build with

```bash
npx nx build --prod --base-href {base-href}/
```

where base-href is the context path between host name and the `index.html` of the application.  _It must have an ending slash (if using hash navigation?)._

Then copy the contents in dist/apps/ubipong-ui to the server.

(a little clunky, but this avoids having to use npm express for now)

And because we are deploying to a plain old web server, we need to use
hash navigation.



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
