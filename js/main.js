let columns = 90;
let rows;
let mouseCoords = { x: null, y: null };
let fontSize = 0;

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

function init() {
    window.onresize = handleResize;
    handleResize();

    document.onmousemove = handleMouseMove;
    document.onclick = handleClick;
}
init();

function getFontSizeAndSetRows() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    fontSize = (width / columns) * 2;
    rows = Math.floor((height * 2) / fontSize);
}

function handleResize() {
    columns = 90;
    if (window.innerWidth < 900) {
        columns = 60;
    }
    if (window.innerWidth < 700) {
        columns = 30;
    }
    drawScreen();
}

function handleClick(e) {
    if (withinBounds(mouseCoords.x, mouseCoords.y, banner)) {
        window.open('https://aidenkerr.com');
    }
}

function handleMouseMove(e) {
    const x = e.pageX;
    const y = e.pageY;
    calculateMouseCoord(x, y);
    drawScreen();
}

function calculateMouseCoord(x, y) {
    const col = Math.floor((x / fontSize) * 1.66);
    const row = Math.floor((y / (fontSize / 2)) * 0.8);
    mouseCoords = { x: col, y: row };
}

function withinBounds(x, y, banner) {
    const inX =
        x >= banner.offset.x && x < banner.offset.x + banner.art[0].length;
    const inY = y >= banner.offset.y && y < banner.offset.y + banner.art.length;
    return inX && inY;
}

function drawScreen() {
    getFontSizeAndSetRows();
    const body = document.body;
    body.style.fontSize = `${fontSize}px`;
    let bodyText = '';
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            let char = '.';

            const inBounds = withinBounds(x, y, banner);
            const isMouse = mouseCoords.x == x && mouseCoords.y == y;

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
            bodyText += char;
        }
        bodyText += '</br>';
    }

    body.innerHTML = bodyText;
}
