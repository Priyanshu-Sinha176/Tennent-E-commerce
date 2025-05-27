// filters-client.ts (client-safe)
import { parseAsArrayOf, parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";

const sortValues = ["curated", "trending", "hot_and_new"] as const;

const clientParams = {
  minPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  maxPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  tags: parseAsArrayOf(parseAsString).withOptions({ clearOnDefault: true }).withDefault([]),
  sort: parseAsStringLiteral(sortValues).withDefault("curated"),
};

export const useProductFilters = () => {
  return useQueryStates(clientParams);
};
