document.addEventListener('copy', (event) => { // Listens for a copy event
    const selection = document.getSelection().toString(); // Gets the selection
    if (selection.includes("[") || selection.includes("]")) // If there are square brackets...
    {
        updateClipboard(removeInSq(selection)); // ...Perform the removal
    }
    else
    {
        updateClipboard(selection); // Otherwise, just leave it as-is.
    }
    event.preventDefault(); // Finish.
});

// Inserts the string into the clipboard.
function updateClipboard(newStr) {
    navigator.clipboard.writeText(newStr).then(function() {
        // Successful
    }, function() {
        // Unsuccessful
    });
}

// Returns str after removing square brackets and the contents inside them.
function removeInSq(str) { 
    if (typeof str == "string")
    {
        var ed = ""; // String to return
        var started = 0; // Beginning of next concatenation
        var status = 0; // Tracks if brackets are open, closed, etc. Fixes situations where it's opened but not closed.
        for (var i = 0; i < str.length; i++) // Loops thru string
        {
            if (str.charAt(i) == '[') // Adds what was before the bracket
            {
                ed = ed + str.substring(started, i);
                status++;
            }
            else if (str.charAt(i) == ']') // Sets the new starting point to after the bracket
            {
                started = i + 1;
                status--;
            }
        }
        if (started != 0 && status <= 0) // If the segment is not the beginning and the brackets are appropriately closed...
        {
            ed = ed + (str.substring(started, str.length)); // ...add the final segment
        }
        return ed;
    }
}