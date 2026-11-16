// Read-only access to the public unterbau API, which holds the Tipprunde data.
const baseUrl = "https://unterbau.runde.tips/api/v1";

export interface Championship {
  id: string;
  name: string;
  nr: number;
  published: boolean;
  completed: boolean;
}

export interface Player {
  /** Id of the player's entry in this championship (keys `CurrentMatch.tips`). */
  id: string;
  rank: number;
  points: number;
  extraPoints?: number;
  totalPoints: number;
  account: { id: string; name: string };
}

export interface Tip {
  tip?: string;
  joker?: boolean;
  points?: number;
}

export interface CurrentMatch {
  matchId: string;
  nr: number;
  hometeam: string;
  awayteam: string;
  /** Empty until the match is played. */
  result: string;
  /** Tips by `Player.id`. */
  tips: Record<string, Tip>;
}

async function get<T>(path: string): Promise<T> {
  const response = await fetch(baseUrl + path);
  if (!response.ok) {
    throw new Error(`unterbau ${path}: ${response.status}`);
  }
  return (await response.json()) as T;
}

/** Published championships, newest first. */
export async function getChampionships() {
  const championships = await get<Championship[]>("/championships");
  return championships.filter((c) => c.published).sort((a, b) => b.nr - a.nr);
}

/** Players ordered by rank. */
export async function getPlayers(championshipId: string) {
  const players = await get<Player[]>(
    `/championships/${championshipId}/players`,
  );
  return players.sort((a, b) => a.rank - b.rank);
}

/** The latest matches with everyone's tips; empty for completed championships. */
export function getCurrentTips(championshipId: string) {
  return get<CurrentMatch[]>(`/championships/${championshipId}/current-tips`);
}
