/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Directive, ElementRef, EventEmitter, forwardRef, Input, NgZone, Output } from '@angular/core';
import FroalaEditor from 'froala-editor';
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
        this.froalaModelChange = new EventEmitter();
        // froalaInit directive as output: send manual editor initialization
        this.froalaInit = new EventEmitter();
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
        { type: Directive, args: [{
                    selector: '[froalaEditor]',
                    exportAs: 'froalaEditor',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
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
        { type: ElementRef },
        { type: NgZone }
    ]; };
    FroalaEditorDirective.propDecorators = {
        froalaEditor: [{ type: Input }],
        froalaModel: [{ type: Input }],
        froalaModelChange: [{ type: Output }],
        froalaInit: [{ type: Output }]
    };
    return FroalaEditorDirective;
}());
export { FroalaEditorDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZnJvYWxhLXd5c2l3eWcvIiwic291cmNlcyI6WyJlZGl0b3IvZWRpdG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkcsT0FBTyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBRXpDO0lBcUNFLCtCQUFZLEVBQWMsRUFBVSxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTs7UUF2QnhDLFVBQUssR0FBUTtZQUNuQiwyQkFBMkIsRUFBRSxLQUFLO1lBQ2xDLGtCQUFrQixFQUFFLElBQUk7U0FDekIsQ0FBQztRQUlNLGlCQUFZLEdBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6RCxvQkFBZSxHQUFXLFdBQVcsQ0FBQztRQUN0QyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQVFoQyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFFcEMsY0FBUyxHQUFXLElBQUksQ0FBQztRQUV6Qix5QkFBb0IsR0FBRyxLQUFLLENBQUM7O1FBZ0JyQyxhQUFROzs7O1FBQUcsVUFBQyxDQUFDO1FBQ2IsQ0FBQyxFQUFDO1FBQ0YsY0FBUzs7O1FBQUc7UUFDWixDQUFDLEVBQUM7O1FBdURRLHNCQUFpQixHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDOztRQUcvRCxlQUFVLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7O1lBekVsRSxPQUFPLEdBQVEsRUFBRSxDQUFDLGFBQWE7UUFFbkMsd0NBQXdDO1FBQ3hDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxP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VyxFQUFFLFVBQVU7Ozs0QkFBQyxjQUFNLE9BQUEscUJBQXFCLEVBQXJCLENBQXFCLEVBQUM7NEJBQ3BELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGOzs7O2dCQWRtQixVQUFVO2dCQUFtQyxNQUFNOzs7K0JBNEVwRSxLQUFLOzhCQUtMLEtBQUs7b0NBZ0NMLE1BQU07NkJBR04sTUFBTTs7SUF1TVQsNEJBQUM7Q0FBQSxBQXZURCxJQXVUQztTQTVTWSxxQkFBcUI7Ozs7OztJQUdoQyxzQ0FHRTs7Ozs7SUFFRix5Q0FBc0I7Ozs7O0lBRXRCLDZDQUFpRTs7Ozs7SUFDakUsZ0RBQThDOzs7OztJQUM5QywrQ0FBd0M7Ozs7O0lBR3hDLHdDQUFxQjs7Ozs7SUFHckIsdUNBQXVCOzs7OztJQUV2QixtREFBNEM7Ozs7O0lBRTVDLDBDQUFpQzs7Ozs7SUFFakMscURBQXFDOztJQWdCckMseUNBQ0U7O0lBQ0YsMENBQ0U7O0lBdURGLGtEQUF5RTs7SUFHekUsMkNBQXdFOzs7OztJQTNFNUMscUNBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE5nWm9uZSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCBGcm9hbGFFZGl0b3IgZnJvbSAnZnJvYWxhLWVkaXRvcic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tmcm9hbGFFZGl0b3JdJyxcbiAgZXhwb3J0QXM6ICdmcm9hbGFFZGl0b3InLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZyb2FsYUVkaXRvckRpcmVjdGl2ZSksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBGcm9hbGFFZGl0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgLy8gZWRpdG9yIG9wdGlvbnNcbiAgcHJpdmF0ZSBfb3B0czogYW55ID0ge1xuICAgIGltbWVkaWF0ZUFuZ3VsYXJNb2RlbFVwZGF0ZTogZmFsc2UsXG4gICAgYW5ndWxhcklnbm9yZUF0dHJzOiBudWxsXG4gIH07XG5cbiAgcHJpdmF0ZSBfZWxlbWVudDogYW55O1xuXG4gIHByaXZhdGUgU1BFQ0lBTF9UQUdTOiBzdHJpbmdbXSA9IFsnaW1nJywgJ2J1dHRvbicsICdpbnB1dCcsICdhJ107XG4gIHByaXZhdGUgSU5ORVJfSFRNTF9BVFRSOiBzdHJpbmcgPSAnaW5uZXJIVE1MJztcbiAgcHJpdmF0ZSBfaGFzU3BlY2lhbFRhZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIGVkaXRvciBlbGVtZW50XG4gIHByaXZhdGUgX2VkaXRvcjogYW55O1xuXG4gIC8vIGluaXRpYWwgZWRpdG9yIGNvbnRlbnRcbiAgcHJpdmF0ZSBfbW9kZWw6IHN0cmluZztcblxuICBwcml2YXRlIF9lZGl0b3JJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX29sZE1vZGVsOiBzdHJpbmcgPSBudWxsO1xuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZU92ZXJyaWRkZW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcblxuICAgIGxldCBlbGVtZW50OiBhbnkgPSBlbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgYSBzcGVjaWFsIHRhZ1xuICAgIGlmICh0aGlzLlNQRUNJQUxfVEFHUy5pbmRleE9mKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSAhPSAtMSkge1xuICAgICAgdGhpcy5faGFzU3BlY2lhbFRhZyA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgdGhpcy56b25lID0gem9uZTtcbiAgfVxuXG4gIC8vIEJlZ2luIENvbnRyb2xWYWx1ZUFjY2Vzb3IgbWV0aG9kcy5cbiAgb25DaGFuZ2UgPSAoXykgPT4ge1xuICB9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7XG4gIH07XG5cbiAgLy8gRm9ybSBtb2RlbCBjb250ZW50IGNoYW5nZWQuXG4gIHdyaXRlVmFsdWUoY29udGVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVFZGl0b3IoY29udGVudCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLy8gRW5kIENvbnRyb2xWYWx1ZUFjY2Vzb3IgbWV0aG9kcy5cblxuICAvLyBmcm9hbGFFZGl0b3IgZGlyZWN0aXZlIGFzIGlucHV0OiBzdG9yZSB0aGUgZWRpdG9yIG9wdGlvbnNcbiAgQElucHV0KCkgc2V0IGZyb2FsYUVkaXRvcihvcHRzOiBhbnkpIHtcbiAgICB0aGlzLl9vcHRzID0gb3B0cyB8fCB0aGlzLl9vcHRzO1xuICB9XG5cbiAgLy8gZnJvYWxhTW9kZWwgZGlyZWN0aXZlIGFzIGlucHV0OiBzdG9yZSBpbml0aWFsIGVkaXRvciBjb250ZW50XG4gIEBJbnB1dCgpIHNldCBmcm9hbGFNb2RlbChjb250ZW50OiBhbnkpIHtcbiAgICB0aGlzLnVwZGF0ZUVkaXRvcihjb250ZW50KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSBlZGl0b3Igd2l0aCBtb2RlbCBjb250ZW50cy5cbiAgcHJpdmF0ZSB1cGRhdGVFZGl0b3IoY29udGVudDogYW55KSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHRoaXMuX29sZE1vZGVsKSA9PSBKU09OLnN0cmluZ2lmeShjb250ZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5faGFzU3BlY2lhbFRhZykge1xuICAgICAgdGhpcy5fb2xkTW9kZWwgPSBjb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tb2RlbCA9IGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2VkaXRvckluaXRpYWxpemVkKSB7XG4gICAgICBpZiAoIXRoaXMuX2hhc1NwZWNpYWxUYWcpIHtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmh0bWwuc2V0KGNvbnRlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRDb250ZW50KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5faGFzU3BlY2lhbFRhZykge1xuICAgICAgICB0aGlzLl9lbGVtZW50LmlubmVySFRNTCA9IGNvbnRlbnQgfHwgJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldENvbnRlbnQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBmcm9hbGFNb2RlbCBkaXJlY3RpdmUgYXMgb3V0cHV0OiB1cGRhdGUgbW9kZWwgaWYgZWRpdG9yIGNvbnRlbnRDaGFuZ2VkXG4gIEBPdXRwdXQoKSBmcm9hbGFNb2RlbENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvLyBmcm9hbGFJbml0IGRpcmVjdGl2ZSBhcyBvdXRwdXQ6IHNlbmQgbWFudWFsIGVkaXRvciBpbml0aWFsaXphdGlvblxuICBAT3V0cHV0KCkgZnJvYWxhSW5pdDogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPE9iamVjdD4oKTtcblxuICAvLyB1cGRhdGUgbW9kZWwgaWYgZWRpdG9yIGNvbnRlbnRDaGFuZ2VkXG4gIHByaXZhdGUgdXBkYXRlTW9kZWwoKSB7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG5cbiAgICAgIGxldCBtb2RlbENvbnRlbnQ6IGFueSA9IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLl9oYXNTcGVjaWFsVGFnKSB7XG4gICAgICAgIGNvbnN0IGF0dHJzID0gdGhpcy5fZWxlbWVudC5hdHRyaWJ1dGVzLnJlZHVjZSgocmVzdWx0LCBhdHRyKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX29wdHMuYW5ndWxhcklnbm9yZUF0dHJzICYmIHRoaXMuX29wdHMuYW5ndWxhcklnbm9yZUF0dHJzLmluZGV4T2YoYXR0ci5uYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHJlc3VsdCwge1xuICAgICAgICAgICAgW2F0dHIubmFtZV06IGF0dHIudmFsdWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIGlmICh0aGlzLl9lbGVtZW50LmlubmVySFRNTCkge1xuICAgICAgICAgIGF0dHJzW3RoaXMuSU5ORVJfSFRNTF9BVFRSXSA9IHRoaXMuX2VsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9kZWxDb250ZW50ID0gYXR0cnM7XG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGxldCByZXR1cm5lZEh0bWw6IGFueSA9IHRoaXMuX2VkaXRvci5odG1sLmdldCgpO1xuICAgICAgICBpZiAodHlwZW9mIHJldHVybmVkSHRtbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBtb2RlbENvbnRlbnQgPSByZXR1cm5lZEh0bWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9vbGRNb2RlbCAhPT0gbW9kZWxDb250ZW50KSB7XG4gICAgICAgIHRoaXMuX29sZE1vZGVsID0gbW9kZWxDb250ZW50O1xuXG4gICAgICAgIC8vIFVwZGF0ZSBmcm9hbGFNb2RlbC5cbiAgICAgICAgdGhpcy5mcm9hbGFNb2RlbENoYW5nZS5lbWl0KG1vZGVsQ29udGVudCk7XG5cbiAgICAgICAgLy8gVXBkYXRlIGZvcm0gbW9kZWwuXG4gICAgICAgIHRoaXMub25DaGFuZ2UobW9kZWxDb250ZW50KTtcbiAgICAgIH1cblxuICAgIH0pXG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyRXZlbnQoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIGlmICghZXZlbnROYW1lIHx8ICFjYWxsYmFjaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fb3B0cy5ldmVudHMpIHtcbiAgICAgIHRoaXMuX29wdHMuZXZlbnRzID0ge307XG4gICAgfVxuXG4gICAgdGhpcy5fb3B0cy5ldmVudHNbZXZlbnROYW1lXSA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0TGlzdGVuZXJzKCkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGV2ZW50cyBvbiB0aGUgZWRpdG9yLlxuICAgIGlmICh0aGlzLl9lZGl0b3IuZXZlbnRzKSB7XG4gICAgICAvLyBiaW5kIGNvbnRlbnRDaGFuZ2UgYW5kIGtleXVwIGV2ZW50IHRvIGZyb2FsYU1vZGVsXG4gICAgICB0aGlzLl9lZGl0b3IuZXZlbnRzLm9uKCdjb250ZW50Q2hhbmdlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi51cGRhdGVNb2RlbCgpO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZWRpdG9yLmV2ZW50cy5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLm9uVG91Y2hlZCgpO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5fb3B0cy5pbW1lZGlhdGVBbmd1bGFyTW9kZWxVcGRhdGUpIHtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmV2ZW50cy5vbigna2V5dXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZU1vZGVsKCk7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2VkaXRvckluaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRWRpdG9yKCkge1xuICAgIGlmICh0aGlzLl9lZGl0b3JJbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0Q29udGVudCh0cnVlKTtcblxuICAgIC8vIGluaXQgZWRpdG9yXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIC8vIEFkZCBsaXN0ZW5lcnMgb24gaW5pdGlhbGl6ZWQgZXZlbnQuXG4gICAgICBpZiAoIXRoaXMuX29wdHMuZXZlbnRzKSB0aGlzLl9vcHRzLmV2ZW50cyA9IHt9O1xuXG4gICAgICAvLyBSZWdpc3RlciBpbml0aWFsaXplZCBldmVudC5cbiAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnaW5pdGlhbGl6ZWQnLCB0aGlzLl9vcHRzLmV2ZW50cyAmJiB0aGlzLl9vcHRzLmV2ZW50cy5pbml0aWFsaXplZCk7XG4gICAgICBjb25zdCBleGlzdGluZ0luaXRDYWxsYmFjayA9IHRoaXMuX29wdHMuZXZlbnRzLmluaXRpYWxpemVkO1xuICAgICAgLy8gRGVmYXVsdCBpbml0aWFsaXplZCBldmVudC5cbiAgICAgIGlmICghdGhpcy5fb3B0cy5ldmVudHMuaW5pdGlhbGl6ZWQgfHwgIXRoaXMuaW5pdGlhbGl6ZU92ZXJyaWRkZW4pIHtcbiAgICAgICAgdGhpcy5fb3B0cy5ldmVudHMuaW5pdGlhbGl6ZWQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0TGlzdGVuZXJzKCk7XG4gICAgICAgICAgZXhpc3RpbmdJbml0Q2FsbGJhY2sgJiYgZXhpc3RpbmdJbml0Q2FsbGJhY2suY2FsbCh0aGlzLl9lZGl0b3IsIHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluaXRpYWxpemVPdmVycmlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgRnJvYWxhIEVkaXRvci5cbiAgICAgIHRoaXMuX2VkaXRvciA9IG5ldyBGcm9hbGFFZGl0b3IoXG4gICAgICAgIHRoaXMuX2VsZW1lbnQsXG4gICAgICAgIHRoaXMuX29wdHNcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldEh0bWwoKSB7XG4gICAgdGhpcy5fZWRpdG9yLmh0bWwuc2V0KHRoaXMuX21vZGVsIHx8IFwiXCIpO1xuXG4gICAgLy8gVGhpcyB3aWxsIHJlc2V0IHRoZSB1bmRvIHN0YWNrIGV2ZXJ5dGltZSB0aGUgbW9kZWwgY2hhbmdlcyBleHRlcm5hbGx5LiBDYW4gd2UgZml4IHRoaXM/XG4gICAgdGhpcy5fZWRpdG9yLnVuZG8ucmVzZXQoKTtcbiAgICB0aGlzLl9lZGl0b3IudW5kby5zYXZlU3RlcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDb250ZW50KGZpcnN0VGltZSA9IGZhbHNlKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gU2V0IGluaXRpYWwgY29udGVudFxuICAgIGlmICh0aGlzLl9tb2RlbCB8fCB0aGlzLl9tb2RlbCA9PSAnJykge1xuICAgICAgdGhpcy5fb2xkTW9kZWwgPSB0aGlzLl9tb2RlbDtcbiAgICAgIGlmICh0aGlzLl9oYXNTcGVjaWFsVGFnKSB7XG5cbiAgICAgICAgbGV0IHRhZ3M6IE9iamVjdCA9IHRoaXMuX21vZGVsO1xuXG4gICAgICAgIC8vIGFkZCB0YWdzIG9uIGVsZW1lbnRcbiAgICAgICAgaWYgKHRhZ3MpIHtcblxuICAgICAgICAgIGZvciAobGV0IGF0dHIgaW4gdGFncykge1xuICAgICAgICAgICAgaWYgKHRhZ3MuaGFzT3duUHJvcGVydHkoYXR0cikgJiYgYXR0ciAhPSB0aGlzLklOTkVSX0hUTUxfQVRUUikge1xuICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCB0YWdzW2F0dHJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGFncy5oYXNPd25Qcm9wZXJ0eSh0aGlzLklOTkVSX0hUTUxfQVRUUikpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuaW5uZXJIVE1MID0gdGFnc1t0aGlzLklOTkVSX0hUTUxfQVRUUl07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZmlyc3RUaW1lKSB7XG4gICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdpbml0aWFsaXplZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuc2V0SHRtbCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuc2V0SHRtbCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95RWRpdG9yKCkge1xuICAgIGlmICh0aGlzLl9lZGl0b3JJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fZWRpdG9yLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX2VkaXRvckluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRFZGl0b3IoKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9lZGl0b3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBzZW5kIG1hbnVhbCBlZGl0b3IgaW5pdGlhbGl6YXRpb25cbiAgcHJpdmF0ZSBnZW5lcmF0ZU1hbnVhbENvbnRyb2xsZXIoKSB7XG4gICAgbGV0IGNvbnRyb2xzID0ge1xuICAgICAgaW5pdGlhbGl6ZTogdGhpcy5jcmVhdGVFZGl0b3IuYmluZCh0aGlzKSxcbiAgICAgIGRlc3Ryb3k6IHRoaXMuZGVzdHJveUVkaXRvci5iaW5kKHRoaXMpLFxuICAgICAgZ2V0RWRpdG9yOiB0aGlzLmdldEVkaXRvci5iaW5kKHRoaXMpLFxuICAgIH07XG4gICAgdGhpcy5mcm9hbGFJbml0LmVtaXQoY29udHJvbHMpO1xuICB9XG5cbiAgLy8gVE9ETyBub3Qgc3VyZSBpZiBuZ09uSW5pdCBpcyBleGVjdXRlZCBhZnRlciBAaW5wdXRzXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBjaGVjayBpZiBvdXRwdXQgZnJvYWxhSW5pdCBpcyBwcmVzZW50LiBNYXliZSBvYnNlcnZlcnMgaXMgcHJpdmF0ZSBhbmQgc2hvdWxkIG5vdCBiZSB1c2VkPz8gVE9ETyBob3cgdG8gYmV0dGVyIHRlc3QgdGhhdCBhbiBvdXRwdXQgZGlyZWN0aXZlIGlzIHByZXNlbnQuXG4gICAgaWYgKCF0aGlzLmZyb2FsYUluaXQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jcmVhdGVFZGl0b3IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZW5lcmF0ZU1hbnVhbENvbnRyb2xsZXIoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3lFZGl0b3IoKTtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICB9XG59XG4iXX0=