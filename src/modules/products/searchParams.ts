// filters-server.ts (server-safe)
import { createLoader, parseAsArrayOf, parseAsString, parseAsStringLiteral } from "nuqs/server";

export const sortValues = ["curated", "trending", "hot_and_new"] as const;

const serverParams = {
    search: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
    minPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
    maxPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
    tags: parseAsArrayOf(parseAsString).withOptions({ clearOnDefault: true }).withDefault([]),
    sort: parseAsStringLiteral(sortValues).withDefault("trending"),
};

export const loadProductFilters = createLoader(serverParams);
