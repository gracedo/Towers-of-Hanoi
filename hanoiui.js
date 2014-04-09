(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

	var GameUI = Hanoi.GameUI = function(game, board) {
		this.game = game;
		this.towers = game.towers;
		this.board = board;

		this.render();
		this.board.find('.pile').on("click", this.handleStartTowerClick.bind(this));
	};

	GameUI.prototype.render = function() {
		game = this;
		towers = this.towers;

		$('.disc').removeClass('small med large'); //clear towers

		for (var p = 0; p < towers.length; p++) {
			for (var d = 0; d < towers[p].length; d++) {
				var disc = $('.disc')[p*3+d];
				$(disc).addClass(game.getSize(towers[p][d]));
			}
		}
	};

	GameUI.prototype.getSize = function(num) {
		if (num === 1) {
			return "small";
		} else if (num === 2){
			return "med";
		} else {
			return "large";
		}
	};

	GameUI.prototype.handleStartTowerClick = function(event) {
		var that = this;
		var game = this.game;
		var startTower = $(event.target).data("id");
    $(event.target).css("background-color","yellow");
		console.log(startTower);

		this.board.find('.pile').off("click");

		this.board.find('.pile').on("click", function(e) {
			var endTower = $(e.target).data("id");
			console.log(endTower);
			that.board.find('.pile').off("click");
			that.takeTurn(+startTower, +endTower);
		});
	};

  GameUI.prototype.takeTurn = function (startTower, endTower) {
    var game = this.game;

    if (game.move(startTower, endTower)) {
      this.render();
    } else {
      alert("Invalid move!");
    }
    
    $(".pile").css("background-color","#8EA9FA");

    if (game.isWon()) {
      alert("You win!");
    } else {
      this.board.find('.pile').on("click", this.handleStartTowerClick.bind(this));
    };
  };

})(this)

var that = this;

$(document).ready(function () {
	var game = new that.Hanoi.Game();
	var $board = $('.container');
	var gameUi = new that.Hanoi.GameUI(game, $board);
});