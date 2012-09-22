function ApplicationWindow() {
	//declare module dependencies
	var ArtistAlbumsView = require('ui/common/ArtistAlbumsView'),
		AlbumTracksView = require('ui/common/AlbumTracksView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	//construct UI
	var artistAlbumsView = new ArtistAlbumsView(),
		albumTracksView = new AlbumTracksView();
		
	artistAlbumsView.borderColor = '#000';
	artistAlbumsView.borderWidth = 1;
		
	//create master view container
	var masterContainer = Ti.UI.createView({
		top: 0,
		bottom: 0,
		left: 0,
		width: 240
	});
	masterContainer.add(artistAlbumsView);
	self.add(masterContainer);
	
	//create detail view container
	var detailContainer = Ti.UI.createView({
		top: 0,
		bottom: 0,
		right: 0,
		left: 240
	});
	detailContainer.add(albumTracksView);
	self.add(detailContainer);
	
	//add behavior for master view
	artistAlbumsView.addEventListener('itemSelected', function(e) {
		albumTracksView.fireEvent('itemSelected',e);
	});
	
	return self;
};

module.exports = ApplicationWindow;
