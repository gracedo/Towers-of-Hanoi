(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

	var GameUI = Hanoi.GameUI = function(game, board) {
		this.game = game;
		this.towers = game.towers;
		this.board = board;
    this.numTurns = 0;

		this.render();
		this.board.find('.pile').on("click", this.handleStartTowerClick.bind(this));
	};

	GameUI.prototype.render = function() {
		game = this;
		towers = this.towers;

		$('.disc').removeClass('size1 size2 size3 size4 size5 size6 size7'); //clear towers

		for (var p = 0; p < towers.length; p++) {
			for (var d = 0; d < towers[p].length; d++) {
				var disc = $('.disc')[p*8+d];
				$(disc).addClass(game.getSize(towers[p][d]));
			}
      var dummyHeight = ((7-towers[p].length)*40)+120;
      // $($('.dummy')[p]).css("height", toString(dummyHeight) + "px");
      $($('.dummy')[p]).height(dummyHeight);
      debugger
		}
	};

	GameUI.prototype.getSize = function(num) {
    return "size" + num;
	};

	GameUI.prototype.handleStartTowerClick = function(event) {
		var that = this;
		var game = this.game;

		var startTower = $(event.currentTarget).data("id");
    $(".pile[data-id='"+startTower+"']").css("background-color","#402D00");
		console.log(startTower);

		this.board.find('.pile').off("click");

		this.board.find('.pile').on("click", function(e) {
			var endTower = $(e.currentTarget).data("id");
			console.log(endTower);
			that.board.find('.pile').off("click");
			that.takeTurn(+startTower, +endTower);
		});
	};

  GameUI.prototype.takeTurn = function (startTower, endTower) {
    var game = this.game;

    if (game.move(startTower, endTower)) {
      this.render();
      this.numTurns += 1;
      $('#turns').html(this.numTurns);
    } else {
      alert("Invalid move!");
    }
    
    $(".pile").css("background-color","transparent");

    if (game.isWon()) {
      alert("You win! You took " + this.numTurns + " turns");
      window.location.reload();
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