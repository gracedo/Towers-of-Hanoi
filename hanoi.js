(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var Game = Hanoi.Game = function () {
    this.towers = [[1,2,3,4,5,6,7], [], []];
  };
	
  Game.prototype.isWon = function () {
    return (this.towers[2].length == 7) || (this.towers[1].length == 7);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      // var topStartDisc = startTower[startTower.length - 1];
      // var topEndDisc = endTower[endTower.length - 1];
      var topStartDisc = startTower[0];
      var topEndDisc = endTower[0];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].unshift(this.towers[startTowerIdx].shift());
      return true;
    } else {
      return false;
    }
  };
})(this);