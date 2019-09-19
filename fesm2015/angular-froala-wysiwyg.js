import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventEmitter, Directive, forwardRef, ElementRef, NgZone, Input, Output, NgModule, Renderer2 } from '@angular/core';
import FroalaEditor from 'froala-editor';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FroalaEditorDirective {
    /**
     * @param {?} el
     * @param {?} zone
     */
    constructor(el, zone) {
        this.zone = zone;
        // editor options
        this._opts = {
            immediateAngularModelUpdate: false,
            angularIgnoreAttrs: null
        };
        this.SPECIAL_TAGS = ['img', 'button', 'input', 'a'];
        this.INNER_HTML_ATTR = 'innerHTML';
        this._hasSpecialTag = false;
        this._editorInitialized = false;
        this._oldModel = null;
        this.initializeOverridden = false;
        // Begin ControlValueAccesor methods.
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => {
        });
        this.onTouched = (/**
         * @return {?}
         */
        () => {
        });
        // froalaModel directive as output: update model if editor contentChanged
        this.froalaModelChange = new EventEmitter();
        // froalaInit directive as output: send manual editor initialization
        this.froalaInit = new EventEmitter();
        /** @type {?} */
        let element = el.nativeElement;
        // check if the element is a special tag
        if (this.SPECIAL_TAGS.indexOf(element.tagName.toLowerCase()) != -1) {
            this._hasSpecialTag = true;
        }
        this._element = element;
        this.zone = zone;
    }
    // Form model content changed.
    /**
     * @param {?} content
     * @return {?}
     */
    writeValue(content) {
        this.updateEditor(content);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // End ControlValueAccesor methods.
    // froalaEditor directive as input: store the editor options
    /**
     * @param {?} opts
     * @return {?}
     */
    set froalaEditor(opts) {
        this._opts = opts || this._opts;
    }
    // froalaModel directive as input: store initial editor content
    /**
     * @param {?} content
     * @return {?}
     */
    set froalaModel(content) {
        this.updateEditor(content);
    }
    // Update editor with model contents.
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    updateEditor(content) {
        if (JSON.stringify(this._oldModel) == JSON.stringify(content)) {
            return;
        }
        if (!this._hasSpecialTag) {
            this._oldModel = content;
        }
        else {
            this._model = content;
        }
        if (this._editorInitialized) {
            if (!this._hasSpecialTag) {
                this._editor.html.set(content);
            }
            else {
                this.setContent();
            }
        }
        else {
            if (!this._hasSpecialTag) {
                this._element.innerHTML = content || '';
            }
            else {
                this.setContent();
            }
        }
    }
    // update model if editor contentChanged
    /**
     * @private
     * @return {?}
     */
    updateModel() {
        this.zone.run((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let modelContent = null;
            if (this._hasSpecialTag) {
                /** @type {?} */
                const attrs = this._element.attributes.reduce((/**
                 * @param {?} result
                 * @param {?} attr
                 * @return {?}
                 */
                (result, attr) => {
                    if (this._opts.angularIgnoreAttrs && this._opts.angularIgnoreAttrs.indexOf(attr.name) !== -1) {
                        return result;
                    }
                    return Object.assign(result, {
                        [attr.name]: attr.value
                    });
                }), {});
                if (this._element.innerHTML) {
                    attrs[this.INNER_HTML_ATTR] = this._element.innerHTML;
                }
                modelContent = attrs;
            }
            else {
                /** @type {?} */
                let returnedHtml = this._editor.html.get();
                if (typeof returnedHtml === 'string') {
                    modelContent = returnedHtml;
                }
            }
            if (this._oldModel !== modelContent) {
                this._oldModel = modelContent;
                // Update froalaModel.
                this.froalaModelChange.emit(modelContent);
                // Update form model.
                this.onChange(modelContent);
            }
        }));
    }
    /**
     * @private
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    registerEvent(eventName, callback) {
        if (!eventName || !callback) {
            return;
        }
        if (!this._opts.events) {
            this._opts.events = {};
        }
        this._opts.events[eventName] = callback;
    }
    /**
     * @private
     * @return {?}
     */
    initListeners() {
        /** @type {?} */
        let self = this;
        // Check if we have events on the editor.
        if (this._editor.events) {
            // bind contentChange and keyup event to froalaModel
            this._editor.events.on('contentChanged', (/**
             * @return {?}
             */
            function () {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    self.updateModel();
                }), 0);
            }));
            this._editor.events.on('mousedown', (/**
             * @return {?}
             */
            function () {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    self.onTouched();
                }), 0);
            }));
            if (this._opts.immediateAngularModelUpdate) {
                this._editor.events.on('keyup', (/**
                 * @return {?}
                 */
                function () {
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        self.updateModel();
                    }), 0);
                }));
            }
        }
        this._editorInitialized = true;
    }
    /**
     * @private
     * @return {?}
     */
    createEditor() {
        if (this._editorInitialized) {
            return;
        }
        this.setContent(true);
        // init editor
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            // Add listeners on initialized event.
            if (!this._opts.events)
                this._opts.events = {};
            // Register initialized event.
            this.registerEvent('initialized', this._opts.events && this._opts.events.initialized);
            /** @type {?} */
            const existingInitCallback = this._opts.events.initialized;
            // Default initialized event.
            if (!this._opts.events.initialized || !this.initializeOverridden) {
                this._opts.events.initialized = (/**
                 * @return {?}
                 */
                () => {
                    this.initListeners();
                    existingInitCallback && existingInitCallback.call(this._editor, this);
                });
                this.initializeOverridden = true;
            }
            // Initialize the Froala Editor.
            this._editor = new FroalaEditor(this._element, this._opts);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    setHtml() {
        this._editor.html.set(this._model || "");
        // This will reset the undo stack everytime the model changes externally. Can we fix this?
        this._editor.undo.reset();
        this._editor.undo.saveStep();
    }
    /**
     * @private
     * @param {?=} firstTime
     * @return {?}
     */
    setContent(firstTime = false) {
        /** @type {?} */
        let self = this;
        // Set initial content
        if (this._model || this._model == '') {
            this._oldModel = this._model;
            if (this._hasSpecialTag) {
                /** @type {?} */
                let tags = this._model;
                // add tags on element
                if (tags) {
                    for (let attr in tags) {
                        if (tags.hasOwnProperty(attr) && attr != this.INNER_HTML_ATTR) {
                            this._element.setAttribute(attr, tags[attr]);
                        }
                    }
                    if (tags.hasOwnProperty(this.INNER_HTML_ATTR)) {
                        this._element.innerHTML = tags[this.INNER_HTML_ATTR];
                    }
                }
            }
            else {
                if (firstTime) {
                    this.registerEvent('initialized', (/**
                     * @return {?}
                     */
                    function () {
                        self.setHtml();
                    }));
                }
                else {
                    self.setHtml();
                }
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    destroyEditor() {
        if (this._editorInitialized) {
            this._editor.destroy();
            this._editorInitialized = false;
        }
    }
    /**
     * @private
     * @return {?}
     */
    getEditor() {
        if (this._element) {
            return this._editor;
        }
        return null;
    }
    // send manual editor initialization
    /**
     * @private
     * @return {?}
     */
    generateManualController() {
        /** @type {?} */
        let controls = {
            initialize: this.createEditor.bind(this),
            destroy: this.destroyEditor.bind(this),
            getEditor: this.getEditor.bind(this),
        };
        this.froalaInit.emit(controls);
    }
    // TODO not sure if ngOnInit is executed after @inputs
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // check if output froalaInit is present. Maybe observers is private and should not be used?? TODO how to better test that an output directive is present.
        if (!this.froalaInit.observers.length) {
            this.createEditor();
        }
        else {
            this.generateManualController();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyEditor();
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
    }
}
FroalaEditorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[froalaEditor]',
                exportAs: 'froalaEditor',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => FroalaEditorDirective)),
                        multi: true
                    }
                ]
            },] }
];
/** @nocollapse */
FroalaEditorDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
FroalaEditorDirective.propDecorators = {
    froalaEditor: [{ type: Input }],
    froalaModel: [{ type: Input }],
    froalaModelChange: [{ type: Output }],
    froalaInit: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    FroalaEditorDirective.prototype._opts;
    /**
     * @type {?}
     * @private
     */
    FroalaEditorDirective.prototype._element;
    /**
     * @type {?}
     * @private
     */
    FroalaEditorDirective.prototype.SPECIAL_TAGS;
    /**
     * @type {?}
     * @private
     */
    FroalaEditorDirective.prototype.INNER_HTML_ATTR;
    /**
     * @type {?}
     * @private
     */
    FroalaEditorDirective.prototype._hasSpecialTag;
    /**
     * @type {?}
     * @private
     */
    FroalaEditorDirective.prototype._editor;
    /**
     * @type {?}
     * @private
     */
    FroalaEditorDirective.prototype._model;
    /**
     * @type {?}
     * @private
     */
    FroalaEditorDirective.prototype._editorInitialized;
    /**
     * @type {?}
     * @private
     */
    FroalaEditorDirective.prototype._oldModel;
    /**
     * @type {?}
     * @private
     */
    FroalaEditorDirective.prototype.initializeOverridden;
    /** @type {?} */
    FroalaEditorDirective.prototype.onChange;
    /** @type {?} */
    FroalaEditorDirective.prototype.onTouched;
    /** @type {?} */
    FroalaEditorDirective.prototype.froalaModelChange;
    /** @type {?} */
    FroalaEditorDirective.prototype.froalaInit;
    /**
     * @type {?}
     * @private
     */
    FroalaEditorDirective.prototype.zone;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FroalaEditorModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: FroalaEditorModule, providers: [] };
    }
}
FroalaEditorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [FroalaEditorDirective],
                exports: [FroalaEditorDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FroalaViewDirective {
    /**
     * @param {?} renderer
     * @param {?} element
     */
    constructor(renderer, element) {
        this.renderer = renderer;
        this._element = element.nativeElement;
    }
    // update content model as it comes
    /**
     * @param {?} content
     * @return {?}
     */
    set froalaView(content) {
        this._element.innerHTML = content;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.renderer.addClass(this._element, "fr-view");
    }
}
FroalaViewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[froalaView]'
            },] }
];
/** @nocollapse */
FroalaViewDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
FroalaViewDirective.propDecorators = {
    froalaView: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    FroalaViewDirective.prototype._element;
    /**
     * @type {?}
     * @private
     */
    FroalaViewDirective.prototype._content;
    /**
     * @type {?}
     * @private
     */
    FroalaViewDirective.prototype.renderer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FroalaViewModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: FroalaViewModule, providers: [] };
    }
}
FroalaViewModule.decorators = [
    { type: NgModule, args: [{
                declarations: [FroalaViewDirective],
                exports: [FroalaViewDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MODULES = [
    FroalaEditorModule,
    FroalaViewModule
];
class FERootModule {
}
FERootModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FroalaEditorModule.forRoot(),
                    FroalaViewModule.forRoot()
                ],
                exports: MODULES
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { FERootModule, FroalaEditorDirective, FroalaEditorModule, FroalaViewDirective, FroalaViewModule };
//# sourceMappingURL=angular-froala-wysiwyg.js.map
