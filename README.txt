POKEDEX

IAT 381 FINAL PROJECT

Bruce Lui (301137726)
Jimmy Chen (301139224)

What is it?
POKEDEX is an interactive database app that brings back the look and feel of the Pokedex devices that were featured in the Pokemon cartoon series and modernizing the experience as users go through the 151 of the original Pokemon entries.

What did we use?
We tried utilizing AngularJS to it's full potential by using the ng-touch features to swipe left or right for the previous and next entry. We brought back bootstrap to organize some of the <div> in the list view, as well as utilizing jquery and custom animations for interactions. For our database, we draw information from a fan-based API that featured the required data we need for the app, and was open for anyone to use.

Some of the problems we faced?
The API that we used wasn't perfect. This meant that the database was poorly organized and we had to bypass it by writing custom algorithms in order to draw the right information for each entry. There is also a loading issue with the API, as it takes a while to load up information. We weren't able to bypass it but we did put up a message saying "If you see this message, then the API is still loading" to alert the users to what is happening in the background. We also weren't able to store the data the user inputs from the checkboxes in each entry. For some reason, the array resets whenever we leave the entry page thus making our "bookmark/caught" feature not functioning.

Why is this awesome?
The look and feel will be nostalgic to those who are familiar with the POKEMON series, as well as seeing the data for each Pokemon entry with 3D sprites and visuals to represent the data and information. The interaction and transitions from page to page, and entry to entry is also simple and smooth.