/**
 * 
 * @employSchema
 * @eventListeners
 * @sensibleDefaults
 * @svgSrc
 * @documentation
 * @iconUniformNames
 * @objectifyEventListeners
 * @documentationApi
 * @distinctEventListeners
 * @parentElementSelector
 * @minimizeProperties
 * @propertiesElemUnderscore
 * @propertyNamingConventions
 * @propertify
 * @methodNamingConventions
 * @htmlReadyMethods
 */




/**
 * 
 * @param {Object}                   schema
 * @param {HTMLElement|CSSRule}      schema.parent
 * @param {HTMLSourceElement}       [schema.title]
 * @param {Boolean}                 [schema.htmlReady]
 * @param {SVGElement}              [schema.secondaryIcon]
 * @param {HTMLSourceElement}       [schema.subtitle]
 * @param {Number}                  [schema.tabindex]
 * @param {SVGElement}              [schema.iconLoading]
 * @param {SVGElement}              [schema.iconSuccess]
 * @param {String}                  [schema.value]
 * @param {Function}                [schema.onInput]
 * @param {Object[]}                [schema.eventListeners]
 * @param {'input'}                  schema.eventListeners[].type
 * @param {Function}                 schema.eventListeners[].listener
 */
function CheckBox( schema ) {

    /**
     * 
     * @property
     * @private
     */
    this._parentElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._titleElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._subtitleElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._switchElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._onInputCallback = null;

    /**
     * 
     * @property
     * @private
     */
    this._iconLoadingSrc = "<svg class='animateRotation' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='m4.26 18.32-1.42 1.42a11.94 11.94 0 0 1 0-15.48l1.42 1.42a9.96 9.96 0 0 0 0 12.64zM22 12c0 2.4-.85 4.6-2.26 6.32l1.42 1.42a11.94 11.94 0 0 0 0-15.48l-1.42 1.42A9.96 9.96 0 0 1 22 12zM5.68 4.26a9.95 9.95 0 0 1 12.64 0l1.42-1.42a11.94 11.94 0 0 0-15.48 0l1.42 1.42zm12.64 15.48a9.95 9.95 0 0 1-12.64 0l-1.42 1.42a11.94 11.94 0 0 0 15.48 0l-1.42-1.42z'/></svg>";

    /**
     * 
     * @property
     * @private
     */
    this._iconSuccessSrc = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M20.29 2 9 13.57 3.71 8.56 0 12.27 9 21 24 5.71z'/></svg>";

    /**
     * 
     * @property
     * @private
     */
    this._handleKeydown = this._evt_keydown.bind( this );




    var parentElem;

    if ( typeof schema.parent === 'object' ) {

        this._parentElem = schema.parent;

    } else if ( typeof schema.parent === 'string' ) {

        this._parentElem = document.querySelector( schema.parent );

    }

    if ( schema.hasOwnProperty( 'iconLoading' ) ) {

        this._iconLoadingSrc = schema.iconLoading;

    }

    if ( schema.hasOwnProperty( 'iconSuccess' ) ) {

        this._iconSuccessSrc = schema.iconSuccess;

    }

    if ( schema.hasOwnProperty( 'htmlReady' ) && schema.htmlReady === true ) {

        this._createFromHTML();

    } else {

        this._createFromSchema( schema );

    }

    if ( schema.hasOwnProperty( 'eventListeners' ) ) {

        for ( var i = 0 ; i < schema.eventListeners.length ; i++ ) {

            if ( schema.eventListeners[ i ].type === 'input' ) {

                this._onInputCallback = schema.eventListeners[ i ].listener;

            }

        }

    }

    if ( schema.hasOwnProperty( 'onInput' ) ) {

        this._onInputCallback = schema.onInput;

    }

    this._parentElem.addEventListener( 'click', this._evt_click_checkboxElem.bind( this ) );
    this._parentElem.addEventListener( 'focusin', this._evt_focusin_checkboxElem.bind( this ) );
    this._parentElem.addEventListener( 'focusout', this._evt_focusout_checkboxElem.bind( this ) );

};

/**
 * 
 * @returns {String|'0'}
 */
CheckBox.prototype.getValue = function() {

    if ( this._parentElem.hasAttribute( 'data-value' ) === false ) {

        return '0';

    }

    return this._parentElem.getAttribute( 'data-value' );

};

/**
 * 
 * @param {String} value 
 */
CheckBox.prototype.setValue = function( value ) {

    if ( value === '1' || value === 1 ) {

        this._parentElem.classList.add( 'active' );
        this._parentElem.setAttribute( 'data-value', 1 );

    } else if ( value === '0' || value === 0 ) {

        this._parentElem.classList.remove( 'active' );
        this._parentElem.setAttribute( 'data-value', 0 );

    }

};

/**
 * 
 */
CheckBox.prototype.loading = function() {

    this._switchElem.innerHTML = this._iconLoadingSrc;

};

/**
 * 
 */
CheckBox.prototype.removeLoading = function() {

    this._switchElem.innerHTML = '';

};

/**
 * 
 */
CheckBox.prototype.success = function() {

    this._switchElem.innerHTML = this._iconSuccessSrc;

    setTimeout( function(){

        this._switchElem.innerHTML = '';

    }.bind( this ), 3000 );

};

/**
 * 
 */
CheckBox.prototype.error = function() {

    this._parentElem.classList.add( 'error' );

};

/**
 * 
 * @param {HTMLSourceElement} title 
 */
CheckBox.prototype.setTitle = function( title ) {

    this._titleElem.innerHTML = title;

};

/**
 * 
 * @param {HTMLSourceElement} subtitle 
 */
CheckBox.prototype.setSubtitle = function( subtitle ) {

    this._subtitleElem.innerHTML = subtitle;

};




/**
 * 
 * @private
 * @param {Event} evt 
 * @returns {Boolean}
 */
CheckBox.prototype._evt_click_checkboxElem = function( evt ) {

    if ( evt.target.tagName === 'A' ) {

        return false;

    }

    this._parentElem.classList.remove( 'error' );

    if ( this._parentElem.classList.contains( 'active' ) ) {

        this._parentElem.classList.remove( 'active' );
        this._parentElem.setAttribute( 'data-value', 0 );

    } else {

        this._parentElem.classList.add( 'active' );
        this._parentElem.setAttribute( 'data-value', 1 );

    }

    this._parentElem.blur();

    if ( this._onInputCallback !== null ) {

        this._onInputCallback( evt, this );

    }

    return true;

};

/**
 * 
 * @private
 * @param {Event} evt 
 */
CheckBox.prototype._evt_keydown = function( evt ) {

    if ( evt.keyCode === 13 || evt.keyCode === 32 ) {

        evt.preventDefault();

        if ( this._parentElem.classList.contains( 'active' ) ) {

            this._parentElem.classList.remove( 'active' );
            this._parentElem.setAttribute( 'data-value', 0 );

        } else {

            this._parentElem.classList.add( 'active' );
            this._parentElem.setAttribute( 'data-value', 1 );

        }

        if ( this._onInputCallback !== null ) {

            this._onInputCallback( evt, this );

        }

    }

};

/**
 * 
 * @private
 */
CheckBox.prototype._evt_focusin_checkboxElem = function() {

    this._parentElem.addEventListener( 'keydown', this._handleKeydown );

};

/**
 * 
 * @private
 */
CheckBox.prototype._evt_focusout_checkboxElem = function() {

    this._parentElem.removeEventListener( 'keydown', this._handleKeydown );        

};

/**
 * 
 * @private
 * @method
 */
CheckBox.prototype._createFromHTML = function() {

    this._titleElem = this._parentElem.querySelector( '.titleElem' );

    if ( this._parentElem.querySelector( '.subtitleElem' ) ) {

        this._subtitleElem = this._parentElem.querySelector( '.subtitleElem' );

    }

    this._switchElem = this._parentElem.querySelector( '.switch' );

};

/**
 * 
 * @private
 * @method
 * @param {Object} schema 
 */
CheckBox.prototype._createFromSchema = function( schema ) {

    var fragment = document.createDocumentFragment();

    if ( schema.hasOwnProperty( 'value' ) ) {

        this._parentElem.setAttribute( 'data-value', schema.value );

    }

    var titleDivElem = document.createElement( 'DIV' );
    titleDivElem.classList.add( 'title' );
    fragment.appendChild( titleDivElem );

    this._titleElem = document.createElement( 'P' );
    this._titleElem.classList.add( 'titleElem' );
    this._titleElem.innerHTML = schema.title;
    titleDivElem.appendChild( this._titleElem );

    if ( schema.hasOwnProperty( 'subtitle' ) ) {

        this._subtitleElem = document.createElement( 'SPAN' );
        this._subtitleElem.classList.add( 'subtitleElem' );
        this._subtitleElem.innerHTML = schema.subtitle;
        titleDivElem.appendChild( this._subtitleElem );

    }

    if ( schema.hasOwnProperty( 'secondaryIcon' ) ) {

        var iconElem = document.createElement( 'DIV' );
        iconElem.classList.add( 'secondaryIcon' );
        iconElem.innerHTML = schema.secondaryIcon;

        fragment.appendChild( iconElem );

    }

    var checkboxElem = document.createElement( 'DIV' );
    checkboxElem.classList.add( 'checkbox' );
    fragment.appendChild( checkboxElem );

    var sliderElem = document.createElement( 'DIV' );
    sliderElem.classList.add( 'slider' );
    checkboxElem.appendChild( sliderElem );

    this._switchElem = document.createElement( 'DIV' );
    this._switchElem.classList.add( 'switch' );
    sliderElem.appendChild( this._switchElem );

    if ( schema.hasOwnProperty( 'tabindex' ) === true ) {

        this._parentElem.setAttribute( 'tabindex', schema.tabindex );

    }

    this._parentElem.appendChild( fragment );

};