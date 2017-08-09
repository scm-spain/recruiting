/*!
 * jQuery CLI
 * Simulating a command line interface with jQuery
 *
 * @version : 1.0.0
 * @author : Paulo Nunes (http://syndicatefx.com)
 * @demo : https://codepen.io/syndicatefx/pen/jPxXpz
 * @license: MIT
 */

// Initialize
var prompt = "prospect@schibsted-spain:/$"
// Declare html elements
var commandInput;
var histo;
$(document).ready(function() {
  $('span.command').prepend(prompt);
  commandInput = $('input[type="text"]');
  histo = $('pre#history');
  histo.append("Welcome to Schibsted Spain\n" +
    "Type 'help' + Enter -- for available commands.\n");
  commandInput.focus();
  commandInput.keyup(function(e){
    if(e.which == 13){// ENTER key pressed
      var issuedCommand = commandInput.val();
      doCommand(issuedCommand);
    }
  });
});

function doCommand(issuedCommand) {
  // remove command
  commandInput.val("");
  // add prompt + command to history
  histo.append(prompt + " " + issuedCommand + "\n");
  // analyze command
  if (issuedCommand) {
    commandArgs = issuedCommand.split(" ")
    switch (commandArgs[0]) {
      case "positions":
        doCommandPositions();
        break;
      case "position":
        doCommandPosition(commandArgs[1]);
        break;
      case "help":
        doCommandHelp()
        break;
      default :
        doCommandUnknown(commandArgs[0]);
        break;
    }
  }
  // move focus
  commandInput.focus();
}

function doCommandPosition(key) {
  var found = false;
  if (key) {
    for (let position of data.positions) {
      if (position.key==key) {
        histo.append("key: " + position.key + "\n"
          + "role: " + position.role + "\n");
        found = true;
      }
    }
    if (!found) {
      histo.append("No position found for key " + key + "\n");
    }
  } else {
    histo.append("Missing position key");
  }
}

function doCommandPositions() {
    for (let position of data.positions) {
      histo.append(position.key + "\n")
    }
}

function doCommandHelp() {
  histo.append("Schibsted Spain recruitment console\n");
  histo.append("These shell commands are defined internally.  Type 'help' to see this list.\n");
  histo.append("Type 'help name' to find out more about the function 'name'\n\n");
  histo.append("positions\t\tget list of open positions\n")
  histo.append("position positionId\tget info about specific position\n")
}

function doCommandUnknown(command) {
  histo.append(command + " : command not found\n");
}
