// Define global vars & Declare Array
var listItems = [];
var n = 1; // Number of <p> elements which get created
var entryIsList = false;
var enteredList = [];

// Pressing escape hides overlays and clears text input
$(document).keyup(function(e) {

  var overlay = document.getElementById('overlay'),
      aboutBox = document.getElementById('about-box'),
      aboutText = document.getElementById('about-text'),
      noInputError = document.getElementById('no-input'),
      noInputErrorText = document.getElementById('no-input-text'),
      shuffleError = document.getElementById('shuffle-error'),
      shuffleErrorText = document.getElementById('shuffle-error-text'),
      dupeError = document.getElementById('dupe-item'),
      dupeErrorText = document.getElementById('dupe-item-text');

  if (e.keyCode == 27) {

    if (document.getElementById('list-field').value !== '') {
      document.getElementById('list-field').value = '';
    }
    if (overlay.style.display == 'block') {
      
      $('div.overlay').addClass('fade-out');
      setTimeout(function() {
        $('div.overlay').removeClass('fade-out');
        overlay.style.display = 'none';
        aboutBox.style.display = 'none';
        aboutText.style.display = 'none';
        noInputError.style.display = 'none';
        noInputErrorText.style.display = 'none';
        shuffleError.style.display = 'none';
        shuffleErrorText.style.display = 'none';
        dupeError.style.display = 'none';
        dupeErrorText.style.display = 'none';
      },400);
    }
  }
});

// CHECK ENTRY TYPE (full list or individual item?)
function checkEntry() {
  entryIsList = false;
  var listInput = document.getElementById('list-field').value,
      listCommas = listInput.search(','),
      listSemicolons = listInput.search(';');
  
  if (listCommas > -1 || listSemicolons > -1) {
    entryIsList = true;
    };  
  }

// ADD ITEM TO LIST AND ARRAY
function addItem() {

  var listInput = document.getElementById('list-field').value,
      upperCaseList = listItems.map(function(value) {
        return value.toUpperCase();
      }),
      listInput = listInput.trim(),
      overlay = document.getElementById('overlay'),
      noInputError = document.getElementById('no-input'),
      noInputErrorText = document.getElementById('no-input-text'),
      dupeError = document.getElementById('dupe-item'),
      dupeErrorText = document.getElementById('dupe-item-text');

  // Adding an entire entered list to the visual list and the array for shuffling
  if (entryIsList) { 
    enteredList = listInput.split(/[,;]+/);

    // Add LIST ENTRY to visual list
    var pHome = document.getElementById('visual-list'); // Designate where to put <p>
    var enteredListIndex = 0;

    // Loop to add each list item between separators
    for (i = 0; i < enteredList.length; i++) {
      var currentIndexTrimmed = enteredList[enteredListIndex].trim();
      
      // Check for empty index
      if (currentIndexTrimmed === '') {
        console.log('At least one of these items was empty, so I trashed it.');
        n += 1;
        enteredListIndex += 1;
      }
      
      else {
        
        // Check for an existing match
        if (upperCaseList.indexOf(currentIndexTrimmed.toUpperCase()) > -1) {
          console.log('At least one of these was in the list already, so I trashed it.');
          n += 1;
          enteredListIndex += 1;
        }

        else {
          // If everything's good with this index, proceed
          var delParent = document.createElement('p'); // Create <p>
          delParent.setAttribute("id", n); // Give <p> id="n" where n = an ordered number
          delParent.setAttribute("onclick", "delItem(this.id)"); // Give <p> onclick="delItem()"
          var listItem = document.createTextNode(currentIndexTrimmed); // Text from the relevant index

          pHome.appendChild(delParent);
          delParent.appendChild(listItem);

          // Add to Array
          console.log(currentIndexTrimmed);
          listItems.push(currentIndexTrimmed);
          n += 1;
          enteredListIndex += 1;
        }
      }
    }
    
    // Scroll to most recently added item
    $('.wrapper').animate({scrollTop:$('.wrapper')[0].scrollHeight}, 'fast');
  }

    else {
      if (listInput === '') {
          $('input#list-field').addClass('nope');
          $('div.overlay').addClass('fade-in');
          overlay.style.display = 'block';
          noInputError.style.display = 'inline-block';
          noInputErrorText.style.display = 'block';
          setTimeout(function() { //shake ends
            $('input#list-field').removeClass('nope');
            $('div.overlay').removeClass('fade-in');
          },400);
          setTimeout(function() { //fade out animation of bubble
            $('div.overlay').addClass('fade-out');
          },2000);
          setTimeout(function() { //hide bubble
            $('div.overlay').removeClass('fade-out');
            overlay.style.display = 'none';
            noInputError.style.display = 'none';
            noInputErrorText.style.display = 'none';
          },2400);
      }
      
        else {
          
          if (upperCaseList.indexOf(listInput.toUpperCase()) > -1) {
            $('input#list-field').addClass('nope');
            $('div.overlay').addClass('fade-in');
            overlay.style.display = 'block';
            dupeError.style.display = 'inline-block';
            dupeErrorText.style.display = 'block';
            setTimeout(function() {
              $('input#list-field').removeClass('nope');
              $('div.overlay').removeClass('fade-in');
            },300);
            setTimeout(function() {
              $('div.overlay').addClass('fade-out');
            },3000);
            setTimeout(function() {
              $('div.overlay').removeClass('fade-out');
              overlay.style.display = 'none';
              dupeError.style.display = 'none';
              dupeErrorText.style.display = 'none';
            },3400);
          }
          
          else {
            
          // Add to visual list
          var pHome = document.getElementById('visual-list'); // Designate where to put <p>
          var delParent = document.createElement('p'); // Create <p>
          delParent.setAttribute("id", n); // Give <p> id="n" where n = an ordered number
          delParent.setAttribute("onclick", "delItem(this.id)"); // Give <p> onclick="delItem()"
          var listItem = document.createTextNode(listInput); // Create the word that was submitted

          pHome.appendChild(delParent);
          delParent.appendChild(listItem);
          
          // Scroll to most recently added item
          $('.wrapper').animate({scrollTop:$('.wrapper')[0].scrollHeight}, 'slow');
          $('body').animate({scrollTop:$('body')[0].scrollHeight}, 'slow');

          // Add to Array
          listItems.push(listInput);
          n += 1;
          }
        }
  } //else, after entryIsList check
}

// Clear text field after submission
function clrField() {
    document.getElementById('list-field').value = '';
}

// CLEAR LIST
function clrItems() {
  $('.entered-list > p').addClass('flyout');
  setTimeout(function() {
    $('.entered-list').empty();
    listItems = [];
    n = 1;
  },450);
}

// DELETE ITEM
function delItem(clickedId) {
  var delId = document.getElementById(clickedId),
      myClickedId = '#' + clickedId;  // Creates a variable for the ID so I can use jquery to remove

  $(myClickedId).closest('p').remove(); // Removes the clicked item

  var tempStoreItems = [],
      tempArrayIndex = 0,
      n3 = Number(clickedId),
      nextIdNum = Number(clickedId) + 1;

  for (i = listItems.length - clickedId; i > 0; i -= 1) {
    var nextIdElement = '#' + nextIdNum,
        nextIdVal = document.getElementById(nextIdNum).innerHTML;

    tempStoreItems.push(nextIdVal);
    $(nextIdElement).closest('p').remove();

    var pHome = document.getElementById('visual-list'); // Designate where to put <p>
    var delParent = document.createElement('p'); // Create <p>
    delParent.setAttribute("id", n3); // Give <p> id="n" where n = an ordered number
    delParent.setAttribute("onclick", "delItem(this.id)"); // Give <p> onclick="delItem()"
    var listItem = document.createTextNode(tempStoreItems[tempArrayIndex]); // Create the word that was stored in the temp array

    pHome.appendChild(delParent);
    delParent.appendChild(listItem);

    n3 += 1;
    nextIdNum += 1;
    tempArrayIndex += 1;
  }

  listItems.splice(Number(clickedId) - 1, 1);
  tempStoreItems = [];
  n -= 1;
}

// RANDOMIZE
function randOut() {
  var overlay = document.getElementById('overlay'),
      shuffleError = document.getElementById('shuffle-error'),
      shuffleErrorText = document.getElementById('shuffle-error-text');

  if (listItems.length < 2) {

      $('.shuffle').addClass('nope');
      $('div.overlay').addClass('fade-in');
      overlay.style.display = 'block';
      shuffleError.style.display = 'inline-block';
      shuffleErrorText.style.display = 'block';
      setTimeout(function() {
        $('.shuffle').removeClass('nope');
        $('div.overlay').removeClass('fade-in');
      },400);
      setTimeout(function() {
        $('div.overlay').addClass('fade-out');
      },2000);
      setTimeout(function() {
        $('div.overlay').removeClass('fade-out');
        overlay.style.display = 'none';
        shuffleError.style.display = 'none';
        shuffleErrorText.style.display = 'none';
      },2400);
  }
  else {
        oldArray = listItems;

        var i = 0,
            j = 0,
            temp = null;

        for (i = listItems.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = listItems[i];
            listItems[i] = listItems[j];
            listItems[j] = temp;
        }

        var n2 = 1, // which <p> to delete old item from and add new item to
            newListIndex = 0; // which index from the randomized list

        $('.entered-list > p').addClass('scramble');

        setTimeout(function() {
          for (i = listItems.length; i > 0; i -= 1) {
              var pNode = document.getElementById(n2), // pNode is which <p> we're dealing with
                  newTextNode = document.createTextNode(listItems[newListIndex]);
              pNode.removeChild(pNode.lastChild); // delete text nodes from <p> tags
              pNode.appendChild(newTextNode);
              n2 +=1;
              newListIndex += 1;
            } // for loop writing text nodes
        $('.entered-list > p').removeClass('scramble');
      },350); // TIMOUT

    // Scroll to most recently added item
    setTimeout(function() {
      $('.wrapper').animate({scrollTop:$('.wrapper')[0]}, 'slow');
      $('body').animate({scrollTop:$('body')[0]}, 'slow');
    },400);
    } // else
} // randOut()