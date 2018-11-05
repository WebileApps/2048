
function DOMManager() {
    this.tileContainer    = document.querySelector(".tile-container");
    this.scoreContainer   = document.querySelector(".score-container");
    this.bestContainer    = document.querySelector(".best-container");
    this.messageContainer = document.querySelector(".game-message");

    this.score = 0;
}

DOMManager.prototype.clearBoard = function () {
    this.clearContainer(this.tileContainer);
};

DOMManager.prototype.clearContainer = function (container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

DOMManager.prototype.addTile = function (tile) {
    var self = this;
  
    var wrapper   = document.createElement("div");
    var inner     = document.createElement("div");
    var position  = tile.previousPosition || { x: tile.x, y: tile.y };
    var positionClass = this.positionClass(position);
  
    // We can't use classlist because it somehow glitches when replacing classes
    var classes = ["tile", "tile-" + tile.value, positionClass];
  
    if (tile.value > 2048) classes.push("tile-super");
  
    this.applyClasses(wrapper, classes);
  
    inner.classList.add("tile-inner");
    inner.textContent = tile.value;
  
    if (tile.previousPosition) {
      // Make sure that the tile gets rendered in the previous position first
      window.requestAnimationFrame(function () {
        classes[2] = self.positionClass({ x: tile.x, y: tile.y });
        self.applyClasses(wrapper, classes); // Update the position
      });
    } else if (tile.mergedFrom) {
      classes.push("tile-merged");
      this.applyClasses(wrapper, classes);
  
      // Render the tiles that merged
      tile.mergedFrom.forEach(function (merged) {
        self.addTile(merged);
      });
    } else {
    //   classes.push("tile-new");
      this.applyClasses(wrapper, classes);
    }
  
    // Add the inner part of the tile to the wrapper
    wrapper.appendChild(inner);
  
    // Put the tile on the board
    this.tileContainer.appendChild(wrapper);
}

DOMManager.prototype.applyClasses = function (element, classes) {
    element.setAttribute("class", classes.join(" "));
};

DOMManager.prototype.normalizePosition = function (position) {
    return { x: position.x + 1, y: position.y + 1 };
};

DOMManager.prototype.positionClass = function (position) {
    position = this.normalizePosition(position);
    return "tile-position-" + position.x + "-" + position.y;
};