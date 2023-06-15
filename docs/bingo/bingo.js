

class Cell {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;

        this.isChecked = false;
    }

    toggleCheck() {
        this.isChecked = !this.isChecked;
    }
}


class Bingo {
    constructor(rowNum, columnNum, canvasID, cellSize) {
        this.images = {};
        // 非同期だからロードを待った方がいいかも。
        this.loadImages();

        this.canvas = document.querySelector(canvasID);
        this.ctx = this.canvas.getContext("2d");

        this.rowNum = rowNum;
        this.columnNum = columnNum;
        this.cellSize = cellSize;

        this.cells = [[]];

        this.width = cellSize * columnNum;
        this.height = cellSize * rowNum;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width = this.width + "px";
        this.canvas.style.height = this.height + "px";

        this.isViewOnly = false;

    }


    loadImages() {
        this.images.circle = new Image();
        this.images.circle.src = "../images/circle.webp";

        this.images.bg = new Image();
        this.images.bg.src = "../images/bg.webp";
    }


    init(cellData) {
        this.cells = this.initCells(cellData);

        this.images.bg.onload = () => {
            this.draw();
            this.canvas.addEventListener("click", (e) => {
                const { canvasX, canvasY } = this.mouseEventToCanvasXY(e);
                this.handleClick(canvasX, canvasY);
            })
        };
    }


    initCells(cellData) {
        const cells = [];
        for (let i = 0; i < this.rowNum; i++) {
            const row = [];
            for (let j = 0; j < this.columnNum; j++) {
                row.push(new Cell(j, i, cellData[i][j]));
            }
            cells.push(row);
        }

        return cells;
    }



    mouseEventToCanvasXY(e) {
        const rect = e.target.getBoundingClientRect();

        // ブラウザ上での座標を求める
        const viewX = e.clientX - rect.left;
        const viewY = e.clientY - rect.top;

        // 表示サイズとキャンバスの実サイズの比率を求める
        const scaleWidth = this.canvas.clientWidth / this.canvas.width;
        const scaleHeight = this.canvas.clientHeight / this.canvas.height;

        // ブラウザ上でのクリック座標をキャンバス上に変換
        const canvasX = Math.floor(viewX / scaleWidth);
        const canvasY = Math.floor(viewY / scaleHeight);

        return { canvasX, canvasY };
    }


    handleClick(posX, posY) {

        if(this.isViewOnly) return;

        const {x, y} = this.posXYToCellXY(posX, posY);

        this.cells[y][x].toggleCheck();
        this.draw();

    }

    posXYToCellXY(posX, posY) {
        const x = Math.floor(posX / this.cellSize);
        const y = Math.floor(posY / this.cellSize);
        return {x, y};
    }


    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.font = "20px serif";
        this.ctx.textAlign = 'center';

        this.ctx.drawImage(this.images.bg, 0, 0, this.width, this.height);

        for (let i = 0; i < this.rowNum; i++) {
            for (let j = 0; j < this.columnNum; j++) {
                this.drawCell(i, j);
            }
        }


    }


    drawCell(i, j) {
        const cell = this.cells[i][j];
        const cellCanvasLeft = j * this.cellSize;
        const cellCanvasTop = i * this.cellSize

        // this.ctx.strokeStyle = "black";
        // this.ctx.fillStyle = "white";
        // this.ctx.strokeRect(cellCanvasLeft, cellCanvasTop, this.cellSize, this.cellSize);
        // this.ctx.fillRect(cellCanvasLeft, cellCanvasTop, this.cellSize, this.cellSize);


        // this.ctx.fillStyle = "black";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(cell.text, cellCanvasLeft + Math.floor(this.cellSize / 2), Math.floor(cellCanvasTop + this.cellSize / 2));

        if(cell.isChecked) {
            // this.ctx.strokeStyle = "red";
            // this.ctx.beginPath();
            // this.ctx.arc(cellCanvasLeft + Math.floor(this.cellSize / 2), Math.floor(cellCanvasTop + this.cellSize / 2), this.cellSize*0.4, 0, 2*Math.PI);
            // this.ctx.stroke();

            this.ctx.drawImage(this.images.circle, cellCanvasLeft, cellCanvasTop, this.cellSize, this.cellSize);
        }

    }


}

const canvasID = "#bingoCanvas";

const rowNum = 5;
const columnNum = 5;
const {innerHeight, innerWidth} = window;
const cellWidthMax = innerWidth / columnNum;
const cellHeightMax = innerHeight / rowNum;
const cellSize = cellWidthMax > cellHeightMax ? cellHeightMax * 0.8 : cellWidthMax * 0.8;

const bingo = new Bingo(rowNum, columnNum, canvasID, cellSize);

const cellData = [];
for (let i = 0; i < rowNum; i++) {
    const row = [];
    for (let j = 0; j < columnNum; j++) {
        row.push("" + (i*rowNum+j));
    }
    cellData.push(row);
}

console.log(cellData);

bingo.init(cellData);


document.getElementById("download").addEventListener("click", (e) => {
    let canvas = document.querySelector(canvasID);

    let link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "ハイストビンゴ.png";
    link.click();
});

