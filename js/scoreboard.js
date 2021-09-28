window.onload = init;

function init() {
	
	var xhr = new XMLHttpRequest();
	var streamJSON = '../sc/streamcontrol.json';
	var scObj;
	var startup = true;
	var animated = false;
	var cBust = 0;
	var p1Wrap = $('#p1Wrapper'); //variables to shortcut copypasting text resize functions
	var p2Wrap = $('#p2Wrapper');
	var rdResize = $('#round');
	
	xhr.overrideMimeType('application/json');
	
	function pollJSON() {
		xhr.open('GET',streamJSON+'?v='+cBust,true);
		xhr.send();
		cBust++;		
	}
	
	pollJSON();
	setInterval(function(){pollJSON();},500);
	
	xhr.onreadystatechange = parseJSON;
	
	function parseJSON() {
		if(xhr.readyState === 4){
			scObj = JSON.parse(xhr.responseText);
			if(animated == true){
				scoreboard();
			}
		}
	}
	
	function scoreboard() {
	
		if(startup == true) {
			$('#scoreboardVid').attr('src','../webm/gbvs_scoreboard.webm');
			TweenMax.set('#p1Wrapper',{css:{x: '90px'}});
			TweenMax.set('#p2Wrapper',{css:{x: '-90px'}});
			TweenMax.set('.scores',{css:{opacity: 0}});
			TweenMax.set('#round',{css:{opacity: 0}});
			
			document.getElementById('scoreboardVid').play();
		
			getData();
			startup = false;
			animated = true;
		} else {
			getData();
		}
		
		
		
	}
	
	setTimeout(scoreboard,300);
	
	function getData(){
		
		var p1Name = scObj['p1Name'];
		var p2Name = scObj['p2Name'];
		var p1Team = scObj['p1Team'];
		var p2Team = scObj['p2Team'];
		var p1Score = scObj['p1Score'];
		var p2Score = scObj['p2Score'];
		var round = scObj['round'];
		
		if(startup == true){
			
			TweenMax.set('#p1Wrapper',{css:{x: p1Move}}); 
			TweenMax.set('#p2Wrapper',{css:{x: p2Move}});
			TweenMax.set('#round',{css:{y: rdMove}});
			
			$('#p1Name').html(p1Name);
			$('#p2Name').html(p2Name);
			$('#p1Team').html(p1Team);
			$('#p2Team').html(p2Team);
			$('#p1Score').html(p1Score);
			$('#p2Score').html(p2Score);
			$('#round').html(round);
			
			p1Wrap.each(function(i, p1Wrap){ 
				while(p1Wrap.scrollWidth > p1Wrap.offsetWidth || p1Wrap.scrollHeight > p1Wrap.offsetHeight){
					var newFontSize = (parseFloat($(p1Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
					$(p1Wrap).css('font-size', newFontSize);
				}
			});
			
			p2Wrap.each(function(i, p2Wrap){
				while(p2Wrap.scrollWidth > p2Wrap.offsetWidth || p2Wrap.scrollHeight > p2Wrap.offsetHeight){
					var newFontSize = (parseFloat($(p2Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
					$(p2Wrap).css('font-size', newFontSize);
				}
			});
			
			rdResize.each(function(i, rdResize){
				while(rdResize.scrollWidth > rdResize.offsetWidth || rdResize.scrollHeight > rdResize.offsetHeight){
					var newFontSize = (parseFloat($(rdResize).css('font-size').slice(0,-2)) * .95) + 'px';
					$(rdResize).css('font-size', newFontSize);
				}
			});
			
			TweenMax.to('#p1Wrapper',nameTime,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay});
			TweenMax.to('#p2Wrapper',nameTime,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay});
			TweenMax.to('#round',rdTime,{css:{y: '+0px', opacity: 1},ease:Quad.easeOut,delay:rdDelay});			
			TweenMax.to('.scores',scTime,{css:{opacity: 1},ease:Quad.easeOut,delay:scDelay});			
		}
		else{
			
			if($('#p1Name').text() != p1Name || $('#p1Team').text() != p1Team){ 
				TweenMax.to('#p1Wrapper',.3,{css:{x: p1Move, opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){ 
					$('#p1Wrapper').css('font-size',nameSize); 
					$('#p1Name').html(p1Name); 
					$('#p1Team').html(p1Team);					
			
					p1Wrap.each(function(i, p1Wrap){
						while(p1Wrap.scrollWidth > p1Wrap.offsetWidth || p1Wrap.scrollHeight > p1Wrap.offsetHeight){
							var newFontSize = (parseFloat($(p1Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
							$(p1Wrap).css('font-size', newFontSize);
						}
					});
					
					TweenMax.to('#p1Wrapper',.3,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:.2}); 
				}});
			}
			
			if($('#p2Name').text() != p2Name || $('#p2Team').text() != p2Team){
				TweenMax.to('#p2Wrapper',.3,{css:{x: p2Move, opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p2Wrapper').css('font-size',nameSize);
					$('#p2Name').html(p2Name);
					$('#p2Team').html(p2Team);					
			
					p2Wrap.each(function(i, p2Wrap){
						while(p2Wrap.scrollWidth > p2Wrap.offsetWidth || p2Wrap.scrollHeight > p2Wrap.offsetHeight){
							var newFontSize = (parseFloat($(p2Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
							$(p2Wrap).css('font-size', newFontSize);
						}
					});
					
					TweenMax.to('#p2Wrapper',.3,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			if($('#round').text() != round){
				TweenMax.to('#round',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){ 
					$('#round').css('font-size',rdSize);
					$('#round').html(round);					
			
					rdResize.each(function(i, rdResize){
						while(rdResize.scrollWidth > rdResize.offsetWidth || rdResize.scrollHeight > rdResize.offsetHeight){
							var newFontSize = (parseFloat($(rdResize).css('font-size').slice(0,-2)) * .95) + 'px';
							$(rdResize).css('font-size', newFontSize);
						}
					});
					
					TweenMax.to('#round',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			if($('#p1Score').text() != p1Score){ 
				TweenMax.to('#p1Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p1Score').html(p1Score);
					
					TweenMax.to('#p1Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			if($('#p2Score').text() != p2Score){
				TweenMax.to('#p2Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p2Score').html(p2Score);
					
					TweenMax.to('#p2Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}	
		}
	}
}