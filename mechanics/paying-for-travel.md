# Paying for Travel

## Summary

It is possible to hire someone to transport you from one settlement to the next. How much this costs and how long it takes depends on a variety of factors.

## Speed

The method of travel is not affected by speed (PHB p181). Ships are the exception to this rule, which are limited by their maximum speed (PHB p157).

Like characters, horses can only travel for 8 hours a day before risking exhaustion (PHB p181).

### Travel Pace

(PHB p182)

| Pace | Hour | Day | K-Hex / Day | Effect |
| --- | ---:| ---:| ---:| --- |
| Fast | 4 mi | 30 mi | 5 | -5 penalty to Perception scores. |
| Normal | 3 mi | 24 mi | 4 | |
| Slow | 2 mi | 15 mi | 3 | Able to use stealth. |

## Distance

Measuring distance is made easier by referring to a map at a defined scale with an overlaid hexagonal grid.

| Scale | Miles per Hex | Maps |
| --- | ---: | --- |
| Province scale | 1 mi | |
| Kingdom scale | 6 mi | [Astorrel Map of South East Kardan](../papers/maps/astorrel-map-of-south-east-kardan.md) |
| Continent scale | 60 mi | |

## Cost

Price depends on method of travel and the route taken.

| Method | Cost per Mile | Availability | Notes |
| --- | ---:| --- | --- |
| Supply cart | 0.25 cp | All settlements. | Schedule and breaks dictated by the driver.<br>Must help load/unload at each stop. |
| Hired cart | 2 cp | All settlements except forts. | |
| Hired coach | 5 cp | Between towns and cities only. | Only available from towns and cities along major roads. |

| Route | Cost Modifier |
| --- | ---:|
| Major road | 1x |
| Trail, to/from town | 1.5x |
| Trail, to/from village/fort | 2x |

## Journey Value

Journey value can be thought of as the base cost of the distance and route type. It can be easily multiplied by the method cost to produce the final cost.

### From [Northhaven](../places/cities/northhaven.md)

| Destination | Miles | Journey Value |
| --- | ---:| ---:|
| ***West***
| Blittergate | 114 mi | 129 |
| Carnmere | 84 mi | 105 |
| Fort Eldrick | 30 mi | 45 |
| Hartsgarth | 66 mi | 78 |
| Hyceodd | 72 mi | 75 |
| Silethwaite | 162 mi | 177 |
| [Ulburn](../places/villages/ulburn.md) | 18 mi | 36 |
| [Yeatscale](../places/cities/yeatscale.md) | 186 mi | 189 |
| ***South***
| [Allonby](../places/villages/allonby.md) | 72 mi | 144 |
| [Arnaside](../places/villages/arnaside.md) | 102 mi | 204 |
| [Humouth](../places/villages/humouth.md) | 54 mi | 108 |

### Journey Value Calculation

```javascript
const calculateRoute = (milesPerHex) => (
  roadHexes = 0,
  trailTownHexes = 0,
  trailVillageHexes = 0,
) => ({
  miles: (roadHexes + trailTownHexes + trailVillageHexes) * milesPerHex,
  journeyValue: (roadHexes * milesPerHex) +
    (trailTownHexes * 1.5 * milesPerHex) +
    (trailVillageHexes * 2 * milesPerHex),
})
```
