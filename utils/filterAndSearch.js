import Fuse from "fuse.js";

export function filter(allSingleOrdersWithDependencies, filters) {
  let filterResult = allSingleOrdersWithDependencies;

  for (const filter of filters) {
    if (!filter.field || !filter.field.object || !filter.field.name) {
      continue;
    }

    filterResult = filterResult.filter((singleOrder) => {
      const fieldValue =
        singleOrder?.[filter.field.object]?.[filter.field.name];

      switch (filter.filterMethod.id) {
        case "isNotEmpty":
          return fieldValue;
        case "isEmpty":
          return !fieldValue;
        case "equals":
          if (filter.field.type === "string") {
            return fieldValue?.toLowerCase() === filter.value.toLowerCase();
          } else if (filter.field.type === "number") {
            const filterValueAsNumber = parseNumber(filter.value);
            return fieldValue === filterValueAsNumber;
          } else if (filter.field.type === "date") {
            const filterDate = parseDate(filter.value);
            return (
              new Date(fieldValue).toISOString().split("T")[0] === filterDate
            );
          }
          break;

        case "notEquals":
          if (filter.field.type === "string") {
            return fieldValue?.toLowerCase() !== filter.value.toLowerCase();
          } else if (filter.field.type === "number") {
            const filterValueAsNumber = parseNumber(filter.value);
            return fieldValue !== filterValueAsNumber;
          } else if (filter.field.type === "date") {
            const filterDate = parseDate(filter.value);
            return (
              new Date(fieldValue).toISOString().split("T")[0] !== filterDate
            );
          }
          break;

        case "lessOrEqual":
          if (filter.field.type === "number") {
            const filterValueAsNumber = parseNumber(filter.value);
            return fieldValue <= filterValueAsNumber;
          } else if (filter.field.type === "date") {
            const filterDate = parseDate(filter.value);
            if (!fieldValue) {
              return false;
            }
            return new Date(fieldValue) <= new Date(filterDate);
          }
          break;

        case "greaterOrEqual":
          if (filter.field.type === "number") {
            const filterValueAsNumber = parseNumber(filter.value);
            return fieldValue >= filterValueAsNumber;
          } else if (filter.field.type === "date") {
            const filterDate = parseDate(filter.value);
            return new Date(fieldValue) >= new Date(filterDate);
          }
          break;

        case "contains":
          return fieldValue?.toLowerCase().includes(filter.value.toLowerCase());
        case "notContains":
          return !fieldValue
            ?.toLowerCase()
            .includes(filter.value.toLowerCase());
        case "startsWith":
          return fieldValue
            ?.toLowerCase()
            .startsWith(filter.value.toLowerCase());
        default:
          return true;
      }
    });
  }

  return filterResult;
}

export function search(searchTerm, filterResult) {
  let searchResult = filterResult;
  if (searchTerm) {
    const fuse = new Fuse(filterResult, {
      keys: [
        "user.firstName",
        "user.lastName",
        {
          name: "combinedName",
          getFn: (singleOrderWithDependencies) =>
            `${singleOrderWithDependencies.user.firstName} ${singleOrderWithDependencies.user.lastName}`,
        },
        "singleOrder.accessCodesId",
        "user.email",
      ],
      threshold: 0.2,
    });

    searchResult = fuse.search(searchTerm).map((result) => result.item);
  }

  return searchResult;
}

function parseDate(value) {
  if (value.toLowerCase() === "heute") {
    return new Date().toISOString().split("T")[0];
  }
  const [day, month, year] = value.split(".");
  return `${year}-${month}-${day}`;
}
function parseNumber(value) {
  return Number(value.replace(",", "."));
}
