;(function (window, undefined) {
    "use strict";

    /**
     * Polyfill startsWith for IE 11
     */
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(search, pos) {
            return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
        };
    }

    /**
     * Establish the Css Pattern Library (CPL) namespace. Add it to the global namespace if necessary.
     */
    var brandcpl;
    brandcpl = window.brandcpl = (typeof(window.brandcpl) !== 'undefined' ? window.brandcpl : {});

    /**
     * Page relative path used as the main path to all CPL specific svg icons.
     * INTENDED TO BE OVERRIDDEN by the brandcpl.svgCustomPath variable if it is set.
     *   This allows the developer to still use the callSVG() method after specifying their own brandcpl.svgCustomPath.
     */
    brandcpl.pathSVG =  'svg/icons-latest.svg';

    /**
     * Standard listing of all default and alternative svg files used specifically by the CPL for svg icons.
     * Setup for EDIN specifically, this can be expanded if we need to have more separate sprite sheets in the future
     */
    brandcpl.svgIconsConfig = {
        default: {
            filename: 'icons-latest.svg',
            regexPattern: '(^brand-icon-\\S+)|(\\sbrand-icon-\\S+)',
            matchesPattern: 'brand-icon-'
        },
        ihs: {
            filename: 'icons-latest.svg',
            regexPattern: '(^ihs-icon-\\S+)|(\\sihs-icon-\\S+)',
            matchesPattern: 'ihs-icon-'
        },
        edin: {
            filename: 'icons-edin.svg',
            regexPattern: '(^ico_\\S+)|(\\sico_\\S+)',
            matchesPattern: 'ico_'
        }
    }

    /**
     * Variable for CPL svg icon file current path.
     * Variable that sets the current path to use for the setAttributeNS function as it applies the 'use' element of each SVG icon.
     */
    brandcpl.currentPath = '';

    //alert(brandcpl.pathSVG);

    /**
     * Get the CPL icon class name. CPL icon naming conventions currently start the name with 
     *   'brand-icon-', 
     *   'ihs-icon-' (which is deprecated), or 
     *   'ico_' (for Edin icons).
     * This method extracts one 'brand-icon-' or 'ihs-icon-' like class from the list of classes.
     * Within the class list string this text could be the first one or could be somewhere inside of text separated with spaces.
     *   For example: 
     *     <span ewb-svg-use="dropdown-arrow brand-icon-chevron rotate-180"></span>
     *
     * @param {String} classList Standard class list that may contain a CPL icon class name
     * @returns {String} Found class name that matches special CPL icon class naming conventions. Returns emptry string '' when no match is found.
     */
    function getIconClass(classList) {
        if (!classList) { // classList is required
            return '';
        }


        // var mRegex = /(^brand-icon-\S+)|(\sbrand-icon-\S+)|(^ihs-icon-\S+)|(\sihs-icon-\S+)/g;
        var mRegex = new RegExp(brandcpl.svgIconsConfig.default.regexPattern + '|' + brandcpl.svgIconsConfig.ihs.regexPattern, 'g');
        var m = classList.match(mRegex);

        // setup for a second search of different naming convention, with different variable
        var icoRegex = new RegExp(brandcpl.svgIconsConfig.edin.regexPattern, 'g');
        var ico = classList.match(icoRegex);

        if (m) {
            return m[0].trim();
        } else if (ico) {
            return ico[0].trim();
        }

        return '';
    }

    /**
     * Find all CPL svg icons in the HTML and set their 'use' element appropriately.
     *   Assuming all CPL svg icons are an svg element with a class that starts with
     *     'brand-icon-',
     *     'ihs-icon-', or
     *     'ico_'
     */
    function initializeAllSvgIcons() {
        var svgs = document.getElementsByTagName('svg');
        var className;
        var currentClass;
        var currentClassPath;
        var useElement;

        //alert(svgs.length);

        // Handle brandcpl.svgCustomPath override of brandcpl.pathSVG.
        if (typeof brandcpl.svgCustomPath !== 'undefined') {
            // the brandcpl.svgCustomPath variable is defined
            brandcpl.currentPath = brandcpl.svgCustomPath;
        } else {
            // the brandcpl.svgCustomPath variable is undefined - set brandcpl.svgCustomPath and brandcpl.currentPath to brandcpl.pathSVG
            brandcpl.currentPath = brandcpl.svgCustomPath = brandcpl.pathSVG;
        }
        brandcpl.currentAltPath = brandcpl.currentPath.replace(brandcpl.svgIconsConfig.default.filename, brandcpl.svgIconsConfig.edin.filename);

        for(var i=0; i < svgs.length; i++){
            className = svgs[i].getAttribute('class');
            currentClass = getIconClass(className);
            // Is it an Edin (Alt) icon?
            if (currentClass.startsWith('ico_')) {
                currentClassPath = brandcpl.currentAltPath + '#' + currentClass;
            } else {
                currentClassPath = brandcpl.currentPath + '#' + currentClass;
            }

            if (className && !hasClass(svgs[i], 'hasUse')) {
                //svgs[i].innerHTML = '<use xlink:href=' + brandcpl.pathSVG + '#' + className + '></use>';
                useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                useElement.setAttributeNS(
                    'http://www.w3.org/1999/xlink',
                    'href',
                    currentClassPath
                );
                svgs[i].appendChild(useElement);
                addClass(svgs[i], 'hasUse');
                //console.log(svgs[i]);
            } else if (className && hasClass(svgs[i], 'hasUse')) {
                // Check that the currentClass is correct inside currentClassPath again.
                useElement = svgs[i].children[0]; // Assuming there is only the use element as a child.
                useElement.setAttributeNS(
                    'http://www.w3.org/1999/xlink',
                    'href',
                    currentClassPath
                );
            }

        }

        return true;
    }

    /* function setUsesParams() {

    var uses = document.getElementsByTagName('use');
    var xlinkNS = 'http://www.w3.org/1999/xlink';

        
        for(var i=0; i < uses.length; i++){
                var hashID;

                hashID = uses[i].getAttributeNS(xlinkNS, 'href');


                uses[i].setAttributeNS(
                xlinkNS, 
                'xlink:href', 
                brandcpl.pathSVG + hashID);
        }

    }
    */

    ////////// Publicly exposed methods //////////
    brandcpl.callSVG = initializeAllSvgIcons; // Deprecated as of 4 Sep. 2018
    brandcpl.initializeAllSvgIcons = initializeAllSvgIcons;
    brandcpl.getIconClass = getIconClass;

})(window);
