import "server-only";

export function createSlugMap<T extends { slug: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.slug, item]));
}

export function createIdMap<T extends { id: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]));
}

export function toSerializableRecord<T>(map: Map<string, T>): Record<string, T> {
  return Object.fromEntries(map.entries());
}

export function memoize<T>(key: string, cache: Map<string, T>, factory: () => T): T {
  if (cache.has(key)) {
    return cache.get(key) as T;
  }

  const value = factory();
  cache.set(key, value);
  return value;
}
