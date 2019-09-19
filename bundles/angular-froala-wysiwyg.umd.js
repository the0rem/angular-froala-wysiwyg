(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/forms'), require('@angular/core'), require('froala-editor')) :
    typeof define === 'function' && define.amd ? define('angular-froala-wysiwyg', ['exports', '@angular/forms', '@angular/core', 'froala-editor'], factory) :
    (global = global || self, factory(global['angular-froala-wysiwyg'] = {}, global.ng.forms, global.ng.core, global.FroalaEditor));
}(this, function (exports, forms, core, FroalaEditor) { 'use strict';

    FroalaEditor = FroalaEditor && FroalaEditor.hasOwnProperty('default') ? FroalaEditor['default'] : FroalaEditor;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FroalaEditorDirective = /** @class */ (function () {
        function FroalaEditorDirective(el, zone) {
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
            function (_) {
            });
            this.onTouched = (/**
             * @return {?}
             */
            function () {
            });
            // froalaModel directive as output: update model if editor contentChanged
            this.froalaModelChange = new core.EventEmitter();
            // froalaInit directive as output: send manual editor initialization
            this.froalaInit = new core.EventEmitter();
            /** @type {?} */
            var element = el.nativeElement;
            // check if the element is a special tag
            if (this.SPECIAL_TAGS.indexOf(element.tagName.toLowerCase()) != -1) {
                this._hasSpecialTag = true;
            }
            this._element = element;
            this.zone = zone;
        }
        // Form model content changed.
        // Form model content changed.
        /**
         * @param {?} content
         * @return {?}
         */
        FroalaEditorDirective.prototype.writeValue = 
        // Form model content changed.
        /**
         * @param {?} content
         * @return {?}
         */
        function (content) {
            this.updateEditor(content);
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        FroalaEditorDirective.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onChange = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        FroalaEditorDirective.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        Object.defineProperty(FroalaEditorDirective.prototype, "froalaEditor", {
            // End ControlValueAccesor methods.
            // froalaEditor directive as input: store the editor options
            set: 
            // End ControlValueAccesor methods.
            // froalaEditor directive as input: store the editor options
            /**
             * @param {?} opts
             * @return {?}
             */
            function (opts) {
                this._opts = opts || this._opts;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FroalaEditorDirective.prototype, "froalaModel", {
            // froalaModel directive as input: store initial editor content
            set: 
            // froalaModel directive as input: store initial editor content
            /**
             * @param {?} content
             * @return {?}
             */
            function (content) {
                this.updateEditor(content);
            },
            enumerable: true,
            configurable: true
        });
        // Update editor with model contents.
        // Update editor with model contents.
        /**
         * @private
         * @param {?} content
         * @return {?}
         */
        FroalaEditorDirective.prototype.updateEditor = 
        // Update editor with model contents.
        /**
         * @private
         * @param {?} content
         * @return {?}
         */
        function (content) {
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
        };
        // update model if editor contentChanged
        // update model if editor contentChanged
        /**
         * @private
         * @return {?}
         */
        FroalaEditorDirective.prototype.updateModel = 
        // update model if editor contentChanged
        /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.zone.run((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var modelContent = null;
                if (_this._hasSpecialTag) {
                    /** @type {?} */
                    var attrs = _this._element.attributes.reduce((/**
                     * @param {?} result
                     * @param {?} attr
                     * @return {?}
                     */
                    function (result, attr) {
                        var _a;
                        if (_this._opts.angularIgnoreAttrs && _this._opts.angularIgnoreAttrs.indexOf(attr.name) !== -1) {
                            return result;
                        }
                        return Object.assign(result, (_a = {},
                            _a[attr.name] = attr.value,
                            _a));
                    }), {});
                    if (_this._element.innerHTML) {
                        attrs[_this.INNER_HTML_ATTR] = _this._element.innerHTML;
                    }
                    modelContent = attrs;
                }
                else {
                    /** @type {?} */
                    var returnedHtml = _this._editor.html.get();
                    if (typeof returnedHtml === 'string') {
                        modelContent = returnedHtml;
                    }
                }
                if (_this._oldModel !== modelContent) {
                    _this._oldModel = modelContent;
                    // Update froalaModel.
                    _this.froalaModelChange.emit(modelContent);
                    // Update form model.
                    _this.onChange(modelContent);
                }
            }));
        };
        /**
         * @private
         * @param {?} eventName
         * @param {?} callback
         * @return {?}
         */
        FroalaEditorDirective.prototype.registerEvent = /**
         * @private
         * @param {?} eventName
         * @param {?} callback
         * @return {?}
         */
        function (eventName, callback) {
            if (!eventName || !callback) {
                return;
            }
            if (!this._opts.events) {
                this._opts.events = {};
            }
            this._opts.events[eventName] = callback;
        };
        /**
         * @private
         * @return {?}
         */
        FroalaEditorDirective.prototype.initListeners = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var self = this;
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
        };
        /**
         * @private
         * @return {?}
         */
        FroalaEditorDirective.prototype.createEditor = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this._editorInitialized) {
                return;
            }
            this.setContent(true);
            // init editor
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                // Add listeners on initialized event.
                if (!_this._opts.events)
                    _this._opts.events = {};
                // Register initialized event.
                _this.registerEvent('initialized', _this._opts.events && _this._opts.events.initialized);
                /** @type {?} */
                var existingInitCallback = _this._opts.events.initialized;
                // Default initialized event.
                if (!_this._opts.events.initialized || !_this.initializeOverridden) {
                    _this._opts.events.initialized = (/**
                     * @return {?}
                     */
                    function () {
                        _this.initListeners();
                        existingInitCallback && existingInitCallback.call(_this._editor, _this);
                    });
                    _this.initializeOverridden = true;
                }
                // Initialize the Froala Editor.
                _this._editor = new FroalaEditor(_this._element, _this._opts);
            }));
        };
        /**
         * @private
         * @return {?}
         */
        FroalaEditorDirective.prototype.setHtml = /**
         * @private
         * @return {?}
         */
        function () {
            this._editor.html.set(this._model || "");
            // This will reset the undo stack everytime the model changes externally. Can we fix this?
            this._editor.undo.reset();
            this._editor.undo.saveStep();
        };
        /**
         * @private
         * @param {?=} firstTime
         * @return {?}
         */
        FroalaEditorDirective.prototype.setContent = /**
         * @private
         * @param {?=} firstTime
         * @return {?}
         */
        function (firstTime) {
            if (firstTime === void 0) { firstTime = false; }
            /** @type {?} */
            var self = this;
            // Set initial content
            if (this._model || this._model == '') {
                this._oldModel = this._model;
                if (this._hasSpecialTag) {
                    /** @type {?} */
                    var tags = this._model;
                    // add tags on element
                    if (tags) {
                        for (var attr in tags) {
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
        };
        /**
         * @private
         * @return {?}
         */
        FroalaEditorDirective.prototype.destroyEditor = /**
         * @private
         * @return {?}
         */
        function () {
            if (this._editorInitialized) {
                this._editor.destroy();
                this._editorInitialized = false;
            }
        };
        /**
         * @private
         * @return {?}
         */
        FroalaEditorDirective.prototype.getEditor = /**
         * @private
         * @return {?}
         */
        function () {
            if (this._element) {
                return this._editor;
            }
            return null;
        };
        // send manual editor initialization
        // send manual editor initialization
        /**
         * @private
         * @return {?}
         */
        FroalaEditorDirective.prototype.generateManualController = 
        // send manual editor initialization
        /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var controls = {
                initialize: this.createEditor.bind(this),
                destroy: this.destroyEditor.bind(this),
                getEditor: this.getEditor.bind(this),
            };
            this.froalaInit.emit(controls);
        };
        // TODO not sure if ngOnInit is executed after @inputs
        // TODO not sure if ngOnInit is executed after @inputs
        /**
         * @return {?}
         */
        FroalaEditorDirective.prototype.ngAfterViewInit = 
        // TODO not sure if ngOnInit is executed after @inputs
        /**
         * @return {?}
         */
        function () {
            // check if output froalaInit is present. Maybe observers is private and should not be used?? TODO how to better test that an output directive is present.
            if (!this.froalaInit.observers.length) {
                this.createEditor();
            }
            else {
                this.generateManualController();
            }
        };
        /**
         * @return {?}
         */
        FroalaEditorDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroyEditor();
        };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        FroalaEditorDirective.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
        };
        FroalaEditorDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[froalaEditor]',
                        exportAs: 'froalaEditor',
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return FroalaEditorDirective; })),
                                multi: true
                            }
                        ]
                    },] }
        ];
        /** @nocollapse */
        FroalaEditorDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        FroalaEditorDirective.propDecorators = {
            froalaEditor: [{ type: core.Input }],
            froalaModel: [{ type: core.Input }],
            froalaModelChange: [{ type: core.Output }],
            froalaInit: [{ type: core.Output }]
        };
        return FroalaEditorDirective;
    }());
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
    var FroalaEditorModule = /** @class */ (function () {
        function FroalaEditorModule() {
        }
        /**
         * @return {?}
         */
        FroalaEditorModule.forRoot = /**
         * @return {?}
         */
        function () {
            return { ngModule: FroalaEditorModule, providers: [] };
        };
        FroalaEditorModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [FroalaEditorDirective],
                        exports: [FroalaEditorDirective]
                    },] }
        ];
        return FroalaEditorModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FroalaViewDirective = /** @class */ (function () {
        function FroalaViewDirective(renderer, element) {
            this.renderer = renderer;
            this._element = element.nativeElement;
        }
        Object.defineProperty(FroalaViewDirective.prototype, "froalaView", {
            // update content model as it comes
            set: 
            // update content model as it comes
            /**
             * @param {?} content
             * @return {?}
             */
            function (content) {
                this._element.innerHTML = content;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        FroalaViewDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this.renderer.addClass(this._element, "fr-view");
        };
        FroalaViewDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[froalaView]'
                    },] }
        ];
        /** @nocollapse */
        FroalaViewDirective.ctorParameters = function () { return [
            { type: core.Renderer2 },
            { type: core.ElementRef }
        ]; };
        FroalaViewDirective.propDecorators = {
            froalaView: [{ type: core.Input }]
        };
        return FroalaViewDirective;
    }());
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
    var FroalaViewModule = /** @class */ (function () {
        function FroalaViewModule() {
        }
        /**
         * @return {?}
         */
        FroalaViewModule.forRoot = /**
         * @return {?}
         */
        function () {
            return { ngModule: FroalaViewModule, providers: [] };
        };
        FroalaViewModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [FroalaViewDirective],
                        exports: [FroalaViewDirective]
                    },] }
        ];
        return FroalaViewModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MODULES = [
        FroalaEditorModule,
        FroalaViewModule
    ];
    var FERootModule = /** @class */ (function () {
        function FERootModule() {
        }
        FERootModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            FroalaEditorModule.forRoot(),
                            FroalaViewModule.forRoot()
                        ],
                        exports: MODULES
                    },] }
        ];
        return FERootModule;
    }());

    exports.FERootModule = FERootModule;
    exports.FroalaEditorDirective = FroalaEditorDirective;
    exports.FroalaEditorModule = FroalaEditorModule;
    exports.FroalaViewDirective = FroalaViewDirective;
    exports.FroalaViewModule = FroalaViewModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=angular-froala-wysiwyg.umd.js.map
