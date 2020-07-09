const playerMoves = (self) => {
  if (self.player && self.player.body) {
    //self.player.setFrame(1);

    let onGround =
      self.player.body.blocked.down || self.player.body.touching.down;
    if (!self.player.anims.isPlaying) {
      // self.player.anims.play("werewolfWalking");
    }
    if (self.cursors.left.isDown) {
      self.player.body.setVelocityX(-self.playerSpeed);

      self.player.flipX = false;
    } else if (self.cursors.right.isDown) {
      self.player.body.setVelocityX(self.playerSpeed);
      self.player.flipX = true;

      if (!self.player.anims.isPlaying) {
        // self.player.anims.play("werewolfWalking");
      }
    } else {
      self.player.body.setVelocityX(0);
      // self.player.anims.stop("werewolfWalking");
      //default pose
      self.player.setFrame(1);
    }
    // handle jumping
    if (onGround && (self.cursors.space.isDown || self.cursors.up.isDown)) {
      // give the player a velocity in Y
      self.player.body.setVelocityY(self.jumpSpeed);

      // change frame
      self.player.setFrame(2);
    }

    let x = self.player.x;
    let y = self.player.y;
    let flipX = self.player.flipX;
    let frame;

    if (
      self.player.oldPosition &&
      (x !== self.player.oldPosition.x ||
        y !== self.player.oldPosition.y ||
        flipX !== self.player.oldPosition.flipX
        // || frame !== self.player.anims.currentFrame.index
      )
    ) {
      self.socket.emit("playerMovement", {
        x: self.player.x,
        y: self.player.y,
        flipX: self.player.flipX,
        // frame: self.player.anims.currentFrame.index,
      });
    }

    self.player.oldPosition = {
      x: self.player.x,
      y: self.player.y,
      flipX: self.player.flipX,
    };
  }
};

export default playerMoves;
