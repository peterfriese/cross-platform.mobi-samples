//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		layout: 'vertical'
	});
	
	var textField = Ti.UI.createTextField({
	    borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	    hintText : 'Enter your name, please',
	    top : 10,
	    width : 'auto', 
	    height : 'auto'
	});
	self.add(textField);
	
	var button = Ti.UI.createButton({
		title:'Greet',
		top: 20,
	    width : 'auto', 
	    height : 'auto'		
	});
	self.add(button);
	button.addEventListener('click', function(e) {
		label.text = 'Hello, ' + textField.value
	});
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		text:String.format(L('welcome'),'Titanium'),
		height:'auto',
		width:'auto'
	});
	self.add(label);
	
	//Add behavior for UI
	label.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	
	return self;
}

module.exports = FirstView;
