import type { Resource } from '../types';

type StoredResource = Partial<Resource> & Pick<Resource, 'subjectCode' | 'title' | 'link'>;

function createResourceId(prefix: string) {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${prefix}-${Math.random().toString(36).slice(2)}`;
}

function normalizeResourceType(type: unknown): Resource['type'] {
  if (type === 'youtube' || type === 'notes' || type === 'syllabus' || type === 'papers' || type === 'custom') return type;
  if (type === 'question' || type === 'important') return 'papers';
  return 'custom';
}

function toResource(resource: StoredResource, fallbackPrefix: string): Resource {
  return {
    id: typeof resource.id === 'string' && resource.id ? resource.id : createResourceId(fallbackPrefix),
    subjectCode: resource.subjectCode,
    type: normalizeResourceType(resource.type),
    title: resource.title,
    link: resource.link,
    createdAt: typeof resource.createdAt === 'string' ? resource.createdAt : new Date().toISOString()
  };
}

export function hydrateResources(storedValue: unknown, initialValue: Resource[]) {
  if (!Array.isArray(storedValue)) return initialValue;

  return storedValue
    .filter(
      (resource): resource is StoredResource =>
        !!resource &&
        typeof resource === 'object' &&
        typeof resource.subjectCode === 'string' &&
        typeof resource.title === 'string' &&
        typeof resource.link === 'string'
    )
    .map((resource) => toResource(resource, 'resource'));
}

type SeedResourceLike = { id: string; subjectCode: string; label: string; url: string; kind: Resource['type'] };

export function mergeSeedResources(current: Resource[], seeds: SeedResourceLike[]) {
  const seedsById = new Map(seeds.map((seed) => [seed.id, seed]));
  const normalized = current.map((resource) => {
    const seed = seedsById.get(resource.id);
    return seed ? { ...resource, subjectCode: seed.subjectCode, title: seed.label, link: seed.url, type: seed.kind } : resource;
  });
  const known = new Set(normalized.flatMap((resource) => [resource.id, resource.link]));
  const additions = seeds
    .filter((resource) => !known.has(resource.id) && !known.has(resource.url))
    .map((resource) => ({ id: resource.id, subjectCode: resource.subjectCode, title: resource.label, link: resource.url, type: resource.kind, createdAt: new Date().toISOString() }));
  return [...normalized, ...additions];
}

export function isVisibleResource(resource: Resource) {
  return resource.type !== 'custom' && !resource.id.startsWith('seed-') && !resource.link.includes('ktunotes.in');
}
