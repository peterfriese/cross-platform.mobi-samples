function ApplicationWindow() {
	//declare module dependencies
	var ArtistAlbumsView = require('ui/common/ArtistAlbumsView'),
		AlbumTracksView = require('ui/common/AlbumTracksView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor: '#ffffff'
	});
		
	//construct UI
	var 
View = new ArtistAlbumsView(),
		albumTracksView = new AlbumTracksView();
		
	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title: 'Albums'
	});
	masterContainerWindow.add(artistAlbumsView);
	
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title: 'Album Tracks'
	});
	detailContainerWindow.add(albumTracksView);
	
	//create Mobile Web specific NavGroup UI
	var navGroup = Ti.UI.MobileWeb.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);
	
	//add behavior for master view
	artistAlbumsView.addEventListener('itemSelected', function(e) {
		albumTracksView.fireEvent('itemSelected',e);
		navGroup.open(detailContainerWindow);
	});
	
	return self;
};

module.exports = ApplicationWindow;
