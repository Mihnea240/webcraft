import { Player } from "../player/player";

export class PlayerRegistry{
    players: Map<string, Player> = new Map();

    addPlayer(player: Player): void {
        this.players.set(player.id(), player);
    }

    getPlayer(id: string): Player | undefined {
        return this.players.get(id);
    }

    removePlayer(player: Player): void {
        this.players.delete(player.id());
    }

    *getPlayers() {
        yield *this.players.values();
    }
}
