function ApplicationWindow() {
	//declare module dependencies
	var ArtistAlbumsView = require('ui/common/ArtistAlbumsView'),
		AlbumTracksView = require('ui/common/AlbumTracksView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		title: 'Albums',
		exitOnClose: true,
		navBarHidden: false,
		backgroundColor: '#ffffff'
	});
		
	//construct UI
	var artistAlbumsView = new ArtistAlbumsView();
	self.add(artistAlbumsView);

	//add behavior for master view
	artistAlbumsView.addEventListener('itemSelected', function(e) {
		//create detail view container
		var albumTracksView = new AlbumTracksView();
		var detailContainerWindow = Ti.UI.createWindow({
			title: 'Album Tracks',
			navBarHidden: false,
			backgroundColor: '#ffffff'
		});
		detailContainerWindow.add(albumTracksView);
		albumTracksView.fireEvent('itemSelected', e);
		detailContainerWindow.open();
	});
	
	return self;
};

module.exports = ApplicationWindow;
