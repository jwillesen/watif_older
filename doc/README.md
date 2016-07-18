Watif is an Interactive Fiction (IF) engine used for authoring and playing interactive fiction. Watif does not pretend that writing IF is not programming, and allows you to write books in a real programming language: JavaScript. But it also makes writing the prose easy. With Watif you can create a rich and customized experience for players. As good as they are, this is more than just "Choose Your Own Adventure."

Many of the ideas for this engine come from [this article][moon] by Emily Short. Past interactive fiction engines sometimes degenerated into "guess the verb," where the player knew how to solve the puzzle but didn't know how to enter the proper command because they couldn't think of the same verb the developer had in mind. Also, in order to keep readers in a sense of continuity, authors had to anticipate as many interactions a random player would enter. Often this would end up degenerating into handling silly commands such as "[touch the moon][moon]" Watif eliminates this problem by showing the user all items that can be interacted with, and by showing all the verbs that currently apply to a particular item. It also keeps descriptions of the current room and the selected item on the screen so users don't have to keep typing "look around" or "examine item" over and over again.

This doesn't mean you can't have rich puzzles in your fiction. Using the programming engine, a verb or item may not visible based on whatever conditions you set. For example, the player may have to have a lighter in your inventory before they can set something on fire.

(TODO: insert example links when finished)
This example of a Watif interactive fiction work should give you a good idea of what the interface looks like and how it plays. You can also browse the source code for the book.

[moon]: https://emshort.wordpress.com/2010/06/07/so-do-we-need-this-parser-thing-anyway/
