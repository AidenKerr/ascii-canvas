import { WorldObject } from './WorldObject.js';

const banner = {
    art: [
        String.raw`//================\\`,
        String.raw`||~~~~~~~~~~~~~~~~||]`,
        String.raw`||~~~Aiden~Kerr~~~||]`,
        String.raw`||~~~~~~~~~~~~~~~~||]`,
        String.raw`||~~~~~click!~~~~~||]`,
        String.raw`||~~~~~~~~~~~~~~~~||]`,
        String.raw`\\================//]`,
    ],
    offset: { x: 2, y: 2 },
};
let sign = new WorldObject(banner.offset, banner.art);

// TODO:
// Efficiently map ranges to values.... Look into partitioning / quad tree algorithms...
// Then, we can do drawScreen cheaply with many signs
// I think this means withinBounds will no longer be a WorldObject method though
// We might be able to be clever about skipping some rows if there's no signs etc

// additionally, we can have two arts per worldobject - one for regular and one for hover, and swap them when necessary

class World {
    constructor() {
        this.columns = 90;
        this.rows;
        this.mouseCoords = { x: null, y: null };
        this.fontSize = 0;

        this.initializeHandlers();
    }

    initializeHandlers() {
        window.onresize = this.handleResize;
        document.onmousemove = this.handleMouseMove;
        document.onclick = this.handleClick;
        this.handleResize();
    }

    handleResize = () => {
        this.columns = 90;
        if (window.innerWidth < 900) {
            this.columns = 60;
        }
        if (window.innerWidth < 700) {
            this.columns = 30;
        }
        this.getFontSizeAndSetRows();
        this.drawScreen();
    };

    getFontSizeAndSetRows() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.fontSize = (width / this.columns) * 2;
        this.rows = Math.floor((height * 2) / this.fontSize);
    }

    handleClick = (e) => {
        if (sign.withinBounds(this.mouseCoords.x, this.mouseCoords.y)) {
            window.open('https://aidenkerr.com');
        }
    };

    handleMouseMove = (e) => {
        const x = e.pageX;
        const y = e.pageY;
        this.calculateMouseCoord(x, y);
        this.drawScreen();
    };

    calculateMouseCoord(x, y) {
        const col = Math.floor((x / this.fontSize) * 1.66);
        const row = Math.floor((y / (this.fontSize / 2)) * 0.8);
        this.mouseCoords = { x: col, y: row };
    }

    drawScreen() {
        this.getFontSizeAndSetRows();
        const body = document.body;
        body.style.fontSize = `${this.fontSize}px`;
        let bodyText = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                let char = '.';

                const inBounds = sign.withinBounds(x, y);

                const isMouse =
                    this.mouseCoords.x == x && this.mouseCoords.y == y;

                if (inBounds && isMouse) {
                    char = 'X';
                } else if (inBounds) {
                    const bannerChar = banner.art[y - banner.offset.y].charAt(
                        x - banner.offset.x
                    );
                    char = bannerChar;
                } else if (isMouse) {
                    char = 'O';
                }
                bodyText.push(char);
            }
            bodyText.push('</br>');
        }

        body.innerHTML = bodyText.join('');
    }
}
new World();
