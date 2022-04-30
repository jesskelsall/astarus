# Schiller Steel

## Summary

Schiller steel is a type of manufactured steel made from enriched iron mined from the base of [Karmox](../places/topography/mountains/karmox.md). It is known throughout the [Kingdom of Astor](../civilisations/kingdom-of-astor/kingdom-of-astor.md) and the [Dardenn Kingdom](../civilisations/dardenn-kingdom/dardenn-kingdom.md) for its superior quality.

Known only to the [Schiller Family](../organisations/schiller-family.md), the location and properties of Schiller steel is due to the influence of [Nilliski](../characters/nilliski.md), an eldritch entity that lives within [Karmox](../places/topography/mountains/karmox.md). They have provided them with this ore in exchange for their services, elevating their power and wealth, due to their monopoly on Schiller steel's manufacture and sale.

## Appearance

Schiller steel is much darker than regular steel, almost black. It is not entirely opaque and is semi-transparent along its sharpened edges, revealing its smoky interior.

When polished, Schiller steel is more reflective than regular steel.

## Properties

Schiller steel is stronger and more durable than regular steel. It is famed for how easily it cuts as well as how little sharpening it requires.

Due to this it is heavily sought after, though the limited supply makes it difficult to acquire, leading to its high prices.

Mechanically, Schiller steel weapons are effectively +1 weapons without being magical.

## Weapons

Schiller steel can be fashioned into bladed weapons, making it available in any type of slashing or piercing weapon. Its rarity and cost prevents it from being used to manufacture bludgeoning  weapons.

| Type | Regular | Schiller Steel<br>Family price | Schiller Steel<br>Market price |
| --- | ---:| ---:| ---:|
| *Simple melee weapons*
| Dagger | 2 gp | 600 gp | 800 gp |
||
| *Martial melee weapons*
| Battleaxe | 10 gp | 680 gp |
| Greataxe | 30 gp | 840 gp | 1200 gp |
| Greatsword | 50 gp | 1,000 gp |
| Halberd | 20 gp | 760 gp |
| Longsword | 15 gp | 720 gp |
| Pike | 5 gp | 640 gp |
| Rapier | 25 gp | 800 gp |
| Shortsword | 10 gp | 680 gp |

### Price Calculation

As a rough estimate, Schiller steel weapons should cost between 600 gp and 1,000 gp, using the original weapon cost as a guide.

```javascript
const schillerSteelCost = (originalCost) => 600 + (originalCost * 8)
```
