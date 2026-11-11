import { site } from './config';

export type Selection = { service: string; property: string; beds: number; baths: number; sqft: number; depth: string; freq: string; addons: string[] };

export function estimate(f: Selection) {
  const p = site.pricing;
  const base = p.baseByService[f.service] ?? 0;
  const tier = p.sqftTiers.find((t) => f.sqft <= t.upTo)?.add ?? 0;
  const raw = base + f.beds * p.perBedroom + f.baths * p.perBathroom + tier;
  const adjusted = raw * (p.propertyMultiplier[f.property] ?? 1) * (p.depthMultiplier[f.depth] ?? 1) * (1 - (p.frequencyDiscount[f.freq] ?? 0));
  const addons = f.addons.reduce((s, id) => s + (p.addons.find((a) => a.id === id)?.price ?? 0), 0);
  const total = Math.max(p.minimum, Math.round(adjusted + addons));
  return { total, low: Math.round(total * (1 - p.range)), high: Math.round(total * (1 + p.range)), addons };
}

export const money = (n: number) => `${site.pricing.currency}${n.toLocaleString('en-US')}`;
