function AlbumTracksView() {
	var self = Ti.UI.createView();
	
	self.addEventListener('itemSelected', function(e) {
		table.loadData(e.data.collectionId);
	});
	
	var audioPlayer = Ti.Media.createAudioPlayer({
    	allowBackground: true
	}); 	
	
	var table = Ti.UI.createTableView();
	self.add(table);
	
	table.loadData = function(collectionId) {
		var client = Ti.Network.createHTTPClient({
			onload: function(e) {
				var json = JSON.parse(this.responseText);
				var results = json.results;
				
				table.createCells(results);
			},
			timeout: 5000
		});
		
		var url = "http://itunes.apple.com/lookup?id=" + collectionId + "&country=DE&entity=song";
		client.open('GET', url);
		client.send();
	}
	
	table.createCells = function(results) {
		var data = [];

		for (var i = 0; i < results.length; i++) {  
			if (results[i].wrapperType == "track") {
			    var artistName = results[i].artistName;  
			    var collectionName = results[i].collectionName;  
			    var imageUrl = results[i].artworkUrl60;
			    var trackName = results[i].trackName;  
			    var previewUrl = results[i].previewUrl;
				
			    var row = Titanium.UI.createTableViewRow({
			    	artistName: artistName,
			    	collectionName: collectionName,
			    	trackName: trackName,
			    	imageUrl: imageUrl,
			    	previewUrl: previewUrl,
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
				    text: trackName,  
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
				    text: collectionName,  
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
				row.className = "trackRow";
				
				row.data = results[i];
				
			    data[i] = row;
			}
		}
		table.data = data;
	}
	
	table.addEventListener('click', function(e) {
		if (audioPlayer.playing || audioPlayer.paused) {
			audioPlayer.stop();
			if (Ti.Platform.name === 'android') { 
				audioPlayer.release();
			}   
		}
		var data = e.rowData;
		audioPlayer.setUrl(data.previewUrl);
		audioPlayer.start();
	});
	
	
	return self;
};

module.exports = AlbumTracksView;
