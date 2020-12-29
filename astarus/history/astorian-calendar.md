# Astorian Calendar

## Years

The epoch of the date system is the day that the Kingdom of Astor was formed.

- Dates before this are **A.A.** (*ante Astor*).
- Dates after this are **P.A.** (*post Astor*).

Each year is 225 days long.

## Months

There are 8 calendar months, each of which is 28 days long. Each god presides over two adjacent calendar months.

The first day of the year does not belong to any month.

| # | Month | Equivalent Months | Associated God |
| --- | --- | --- | --- |
| 1 | Balghast | Jan / Feb | [Bhygar](../gods/bhygar.md) |
| 2 | Melnish | Feb / Mar | [Bhygar](../gods/bhygar.md) |
| 3 | Nosgorat | Apr / May | [Valnos](../gods/valnos.md) |
| 4 | Vishantu | May / Jun | [Valnos](../gods/valnos.md) |
| 5 | Finsbock | Jul / Aug | [Kirrel](../gods/kirrel.md) |
| 6 | Taledus | Aug / Sep | [Kirrel](../gods/kirrel.md) |
| 7 | Shavdor | Oct / Nov | [Gormox](../gods/gormox.md) |
| 8 | Ultux | Nov / Dec | [Gormox](../gods/gormox.md) |

## Days

Each week has 7 days.

| # | Day | Equivalent Day | Religious Day |
| --- | --- | --- | --- |
| 1 | Bhydag | Monday | [Bhygar](../gods/bhygar.md) |
| 2 | Mishdag | Tuesday | |
| 3 | Valdag | Wednesday | [Valnos](../gods/valnos.md) |
| 4 | Kirdag | Thursday | [Kirrel](../gods/kirrel.md) |
| 5 | Nurdag | Friday | |
| 6 | Faldag | Saturday | |
| 7 | Gordag | Sunday | [Gormox](../gods/gormox.md) |

### Diamodeus

Diamodeus is the leftover day of the year that does not fit into any month. It falls between the last day of Ultux and the first day of Balghast.

It is a festival day that celebrates the ending of one year and the beginning of the next.

## Festivals

### Seasonal

There is a festival celebrating the border between months where the associated god changes:

- 28th of Melnish to 1st of Nosgorat - spring.
- 28th of Vishantu to 1st of Finsbock - summer.
- 28th of Taledus to 1st of Shavdor - autumn.

### Annual

There is a larger celebration at the end of the year, focused around Diamodeus.

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
