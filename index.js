const GRID_SIZE = 4;

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

function Board(inputManager, domManager) {
    this.grid = this.placeRandom(new Grid(GRID_SIZE));
    this.domManager = domManager;
    this.createCells();
    inputManager.on("move", this.move.bind(this));
}

Board.prototype.move = function (direction) {
    const clone = this.grid.clone()
    this.play(clone, direction);
    this.grid = clone;
    this.createCells();
}

Board.prototype.placeRandom = function(grid) {
    grid.setItem(0, GRID_SIZE-1, 2);
    grid.setItem(GRID_SIZE/2, 1, 2);
    return grid;
}

Board.prototype.play = function (grid, direction) {
    //TODO: Update the grid. moving in the given `direction`
    //Ex grid.setItem(0,0, 4);
    console.log(direction);
}

Board.prototype.createCells = function() {
    this.domManager.clearBoard();
    for(let i=0; i< GRID_SIZE; i++) {
        for(let j=0; j< GRID_SIZE; j++) {
            this.domManager.addTile({x : i,y: j, value: this.grid.getItem(i, j) || null});
        }
    }
}

function Grid(GRID_SIZE) {
    this.items = new Array(GRID_SIZE).fill(0).map(ele => new Array(GRID_SIZE).fill(0));
}

Grid.prototype.getItem = function(row, col) {
    return this.items[row][col];
}

Grid.prototype.setItem = function(row, col, val) {
    this.items[row][col] = val;
}

Grid.prototype.clone = function() {
    const newGrid = new Grid();
    newGrid.items = new Array(GRID_SIZE).fill(0).map((ele, row) => new Array(GRID_SIZE).fill(0).map((ele, col) => this.getItem(row, col)));
    return newGrid;
}
