# Astorian Calendar / AA / PA

## Summary

The Astorian Calendar is the date system used in and by the [Kingdom of Astor](../../civilisations/kingdom-of-astor/kingdom-of-astor.md).

## Years

The epoch of the date system is the year that the [Kingdom of Astor](../../civilisations/kingdom-of-astor/kingdom-of-astor.md) was formed.

- Dates before this are **AA** (*ante Astor*).
- Dates after this are **PA** (*post Astor*).

Each year is 225 days long.

## Months

There are 8 calendar months, each of which is 28 days long. Each god presides over two adjacent calendar months.

The first day of the year does not belong to any month.

| # | Month | Equivalent Months | Associated God |
| --- | --- | --- | --- |
| 1 | Balghast | Jan / Feb | [Bhygar](../../gods/deities/bhygar.md) |
| 2 | Melnish | Feb / Mar | [Bhygar](../../gods/deities/bhygar.md) |
| 3 | Nosgorat | Apr / May | [Valnos](../../gods/deities/valnos.md) |
| 4 | Vishantu | May / Jun | [Valnos](../../gods/deities/valnos.md) |
| 5 | Finsbock | Jul / Aug | [Kirrel](../../gods/deities/kirrel.md) |
| 6 | Taledus | Aug / Sep | [Kirrel](../../gods/deities/kirrel.md) |
| 7 | Shavdor | Oct / Nov | [Gormox](../../gods/deities/gormox.md) |
| 8 | Ultux | Nov / Dec | [Gormox](../../gods/deities/gormox.md) |

## Days

Each week has 7 days.

| # | Day | Equivalent Day | Religious Day |
| --- | --- | --- | --- |
| 1 | Bhydag | Monday | [Bhygar](../../gods/deities/bhygar.md) |
| 2 | Mishdag | Tuesday | |
| 3 | Valdag | Wednesday | [Valnos](../../gods/deities/valnos.md) |
| 4 | Kirdag | Thursday | [Kirrel](../../gods/deities/kirrel.md) |
| 5 | Nurdag | Friday | |
| 6 | Faldag | Saturday | |
| 7 | Gordag | Sunday | [Gormox](../../gods/deities/gormox.md) |

### Diamodeus

Diamodeus is the leftover day of the year that does not fit into any month. It falls between the last day of Ultux and the first day of Balghast.

It is a festival day that celebrates the ending of one year and the beginning of the next.

## Festivals

There is a festival celebrating the border between months where the associated god changes. Each is themed based on the two [gods](../../gods/gods.md) and the seasonal implications.

| Start | End | Significance | Festival |
| --- | --- | --- | --- |
| Faldag, 27th of Melnish | Bhydag, 1st of Nosgorat | Spring | Flight of the Hawks |
| Faldag, 27th of Vishantu | Bhydag, 1st of Finsbock | Summer | Snake Dance |
| Faldag, 27th of Taledus | Bhydag, 1st of Shavdor | Autumn | [Blade's Rest](../../festivals/blades-rest.md) |
| Faldag, 27th of Ultux | Bhydag, 1st of Balghast | Winter | Scribestory |
| Diamodeus | Diamodeus | Year's End | Diamodeus |

## Date Formats

|| Short Form | Long Form |
| --- | --- | --- |
| **Template** | YYY-M-DD | Day, D(o) Month, Year X.A. |
| **Example 1** | 312-4-28 | Gordag, 28th of Vishantu, 312 PA |
| **Example 2** | 312-5-02 | Mishdag, 2nd of Finsbock, 312 PA |
| **Diamodeus** | 312-D | Diamodeus, 312 PA |

---

## Conversion

This JavaScript code converts a Gregorian date to an Astorian date:

```javascript
const { DateTime } = require('luxon')

const convertToAstorian = (date) => {
  const luxonDate = DateTime.fromJSDate(date)
  const gregorianOrdinal = luxonDate.ordinal
  const astorianOrdinal = Math.round((gregorianOrdinal / 365.25) * 225)

  if (astorianOrdinal === 225) return 'Diamodeus'

  const month = Math.floor(astorianOrdinal / 28)
  const dayOfWeek = astorianOrdinal % 7
  const dayOfMonth = astorianOrdinal % 28

  const days = ['Gordag', 'Bhydag', 'Mishdag', 'Valdag', 'Kirdag', 'Nurdag', 'Faldag']
  const months = ['Balghast', 'Melnish', 'Nosgorat', 'Vishantu', 'Finsbock', 'Taledus', 'Shavdor', 'Ultux']

  console.log({ astorianOrdinal, month, dayOfWeek, dayOfMonth,
    string: `${days[dayOfWeek]}, ${dayOfMonth} of ${months[month]}`,
  })
}
```
