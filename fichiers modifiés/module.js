// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * format_buttons_renderer
 *
 * @package    format_buttons
 * @author     Rodrigo Brandão (rodrigo_brandao@me.com)
 * @copyright  2018 Rodrigo Brandão
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


 
M.format_buttons = M.format_buttons || {
    ourYUI: null,
    numsections: 0
};

M.format_buttons.init = function(Y, numsections) {
    this.ourYUI = Y;
    this.numsections = parseInt(numsections);
    //document.getElementById('buttonsectioncontainer').style.display = 'table';
    //obj = document.getElementById('buttonsectioncontainer-2');
 	//obj.getElementsByTagName('div')[0].style.display = 'table';

	// modif PRT pour traiter tous les boutons de la page
 	var elems=document.querySelectorAll("#buttonsectioncontainer");
	if(elems.length>0){
		for (var j=0; j<elems.length; j++) {
			elems[j].style.display = 'table';
		}
	}
};

M.format_buttons.hide = function() {
    for (var i = 1; i <= this.numsections; i++) {
		// modif PRT pour traiter tous les boutons de la page
		var elems=document.querySelectorAll("#buttonsection-" + i);
		if(elems.length>0){
			for (var j=0; j<elems.length; j++) {
				elems[j].setAttribute('class', elems[j].getAttribute('class').replace('sectionvisible', ''));
			}
            document.getElementById('section-' + i).style.display = 'none';
		}

       /* if (document.getElementById('buttonsection-' + i) != undefined) {
            var buttonsection = document.getElementById('buttonsection-' + i);
            buttonsection.setAttribute('class', buttonsection.getAttribute('class').replace('sectionvisible', ''));
            document.getElementById('section-' + i).style.display = 'none';
        }*/
    }
};

M.format_buttons.show = function(id, courseid) {
    this.hide();

	// modif PRT pour traiter tous les boutons de la page
	var elems=document.querySelectorAll("#buttonsection-" + id);
	if(elems.length>0){
		for (var j=0; j<elems.length; j++) {
    		elems[j].setAttribute('class', elems[j].getAttribute('class') + ' sectionvisible');
		}
	}

    //var buttonsection = document.getElementById('buttonsection-' + id);
    //buttonsection.setAttribute('class', buttonsection.getAttribute('class') + ' sectionvisible');
    var currentsection = document.getElementById('section-' + id);
    currentsection.style.display = 'block';
    document.cookie = 'sectionvisible_' + courseid + '=' + id + '; path=/';
    M.format_buttons.h5p();

    // modif PRT pour remonter en haut de la page
	var top = document.getElementById("buttonsectiontop").offsetTop - 50;
    window.scrollTo(0, top);
};

M.format_buttons.h5p = function() {
    window.h5pResizerInitialized = false;
    var iframes = document.getElementsByTagName('iframe');
    var ready = {
        context: 'h5p',
        action: 'ready'
    };
    for (var i = 0; i < iframes.length; i++) {
        if (iframes[i].src.indexOf('h5p') !== -1) {
            iframes[i].contentWindow.postMessage(ready, '*');
        }
    }
};