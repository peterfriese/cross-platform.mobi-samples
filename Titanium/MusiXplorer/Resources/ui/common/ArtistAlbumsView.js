function ArtistAlbumsView() {
	
	var Utilities  = require('ui/common/Utilities');
	var utilities = new Utilities();
		
	var self = Ti.UI.createView({
		backgroundColor: 'white'
	});
	
	var search = Ti.UI.createSearchBar({
		hintText: 'Artist'
	});
	search.addEventListener('change', function(event) {
		searchTerm = search.value
		if (searchTerm.length > 1) {
			table.loadData(searchTerm);
		}
	});
	
	var table = Ti.UI.createTableView({
		search: search,
		filterAttribute: 'artistName'
	});
	self.add(table);
	
	table.loadData = function(searchTerm) {
		var client = Ti.Network.createHTTPClient({
			onload: function(e) {
				var json = JSON.parse(this.responseText);
				var results = json.results;
				
				table.createCells(results);
			},
			timeout: 5000
		});
		
		var url = "http://itunes.apple.com/search?term=" + searchTerm + "&limit=30&country=DE&entity=album&attribute=artistTerm";
		client.open('GET', url);
		client.send();
	}
	
	table.createCells = function(results) {
		var data = [];

		for (var i = 0; i < results.length; i++) {  
		    var collectionName  = results[i].collectionName;  
		    var artistName   = results[i].artistName;
		    var date = Date.parse(results[i].releaseDate);  
		    var imageUrl = results[i].artworkUrl60;
		    var collectionId = results[i].collectionId;
		    
		    var row = Titanium.UI.createTableViewRow({
		    	artistName: artistName,
		    	collectionName: collectionName,
		    	date: date,
		    	imageUrl: imageUrl,
		    	collectionId: collectionId,
		    	height: 'auto'
		    });
		    
			var cellView = Titanium.UI.createView({ 
				height: '44', 
				layout: 'vertical', 
				top: 5, 
				right: 5, 
				bottom: 5, 
				left: 5 
			});  
			  
			var artworkImage = Titanium.UI.createImageView({  
			    image: imageUrl,  
			    top: 0,  
			    left: 0, 
			    height: 48,
			    width: 48
			});  
			cellView.add(artworkImage);
			
			var collectionLabel = Titanium.UI.createLabel({  
			    text: collectionName,  
			    left: 54,  
			    width: 260,  
			    top: -48,  
			    bottom: 2,  
			    height: 16,  
			    textAlign: 'left',  
			    color: 'black',  
			    font: {  
			        fontSize: 14,
			        fontWeight: 'bold'  
			    }  
			});  
			cellView.add(collectionLabel);

			var artistLabel = Titanium.UI.createLabel({  
			    text: artistName,  
			    left: 54,  
			    top: 0,  
			    bottom: 2,  
			    height: 'auto',  
			    width: 236,  
			    textAlign: 'left',  
			    font:{ 
			    	fontSize: 14 
			    }  
			});  
			cellView.add(artistLabel);  
			
			// Add the post view to the row  
			row.add(cellView);  
			  
			// Give each row a class name  
			row.className = "albumRow";
			
			// row.data = results[i];
			
		    data[i] = row;
		}
		table.data = data;
	}
	
	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			data: e.rowData
		});
	});
	
	return self;
};

module.exports = ArtistAlbumsView;