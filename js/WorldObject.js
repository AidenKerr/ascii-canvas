export class WorldObject {
    constructor(pos, art, render = null) {
        // position is object with x, y
        this.position = pos;
        this.art = art;
    }

    render() {
        return art;
    }

    withinBounds(x, y) {
        const inX =
            x >= this.position.x && x < this.position.x + this.art[0].length;
        const inY =
            y >= this.position.y && y < this.position.y + this.art.length;
        return inX && inY;
    }
}
