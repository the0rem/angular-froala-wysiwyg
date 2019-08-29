/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output, forwardRef } from '@angular/core';
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
        // Begin ControlValueAccesor methods.
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
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
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    FroalaEditorDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
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
                var attributeNodes = _this._element.attributes;
                /** @type {?} */
                var attrs = {};
                for (var i = 0; i < attributeNodes.length; i++) {
                    /** @type {?} */
                    var attrName = attributeNodes[i].name;
                    if (_this._opts.angularIgnoreAttrs && _this._opts.angularIgnoreAttrs.indexOf(attrName) != -1) {
                        continue;
                    }
                    attrs[attrName] = attributeNodes[i].value;
                }
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
            if (!_this._opts.events.initialized || !_this._opts.events.initialized.overridden) {
                _this._opts.events.initialized = (/**
                 * @return {?}
                 */
                function () {
                    _this.initListeners();
                    existingInitCallback && existingInitCallback.call(_this._editor, _this);
                });
                _this._opts.events.initialized.overridden = true;
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
    FroalaEditorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[froalaEditor]',
                    exportAs: 'froalaEditor',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR, useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return FroalaEditorDirective; })),
                            multi: true
                        }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZnJvYWxhLXd5c2l3eWcvIiwic291cmNlcyI6WyJlZGl0b3IvZWRpdG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFZLE1BQU0sRUFBWSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0gsT0FBTyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBRXpDO0lBaUNFLCtCQUFZLEVBQWMsRUFBVSxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTs7UUFyQnhDLFVBQUssR0FBUTtZQUNuQiwyQkFBMkIsRUFBRSxLQUFLO1lBQ2xDLGtCQUFrQixFQUFFLElBQUk7U0FDekIsQ0FBQztRQUlNLGlCQUFZLEdBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6RCxvQkFBZSxHQUFXLFdBQVcsQ0FBQztRQUN0QyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQVFoQyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFFcEMsY0FBUyxHQUFXLElBQUksQ0FBQzs7UUFnQmpDLGFBQVE7Ozs7UUFBRyxVQUFDLENBQUMsSUFBTyxDQUFDLEVBQUM7UUFDdEIsY0FBUzs7O1FBQUcsY0FBUSxDQUFDLEVBQUM7O1FBcURaLHNCQUFpQixHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDOztRQUcvRCxlQUFVLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7O1lBckVsRSxPQUFPLEdBQVEsRUFBRSxDQUFDLGFBQWE7UUFFbkMsd0NBQXdDO1FBQ3hDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FB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QUFFLGlCQUFpQixFQUFFLFdBQVcsRUFDckMsVUFBVTs7OzRCQUFDLGNBQU0sT0FBQSxxQkFBcUIsRUFBckIsQ0FBcUIsRUFBQzs0QkFDekMsS0FBSyxFQUFFLElBQUk7eUJBQ1osQ0FBQztpQkFDSDs7OztnQkFabUIsVUFBVTtnQkFBdUIsTUFBTTs7OytCQWdFeEQsS0FBSzs4QkFLTCxLQUFLO29DQW9DTCxNQUFNOzZCQUdOLE1BQU07O0lBME1ULDRCQUFDO0NBQUEsQUFsVEQsSUFrVEM7U0F6U1kscUJBQXFCOzs7Ozs7SUFHaEMsc0NBR0U7Ozs7O0lBRUYseUNBQXNCOzs7OztJQUV0Qiw2Q0FBaUU7Ozs7O0lBQ2pFLGdEQUE4Qzs7Ozs7SUFDOUMsK0NBQXdDOzs7OztJQUd4Qyx3Q0FBcUI7Ozs7O0lBR3JCLHVDQUF1Qjs7Ozs7SUFFdkIsbURBQTRDOzs7OztJQUU1QywwQ0FBaUM7O0lBZ0JqQyx5Q0FBc0I7O0lBQ3RCLDBDQUFzQjs7SUFxRHRCLGtEQUF5RTs7SUFHekUsMkNBQXdFOzs7OztJQXZFNUMscUNBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE5nWm9uZSwgT3B0aW9uYWwsIE91dHB1dCwgUmVuZGVyZXIsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IEZyb2FsYUVkaXRvciBmcm9tICdmcm9hbGEtZWRpdG9yJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Zyb2FsYUVkaXRvcl0nLFxuICBleHBvcnRBczogJ2Zyb2FsYUVkaXRvcicsXG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6XG4gICAgICBmb3J3YXJkUmVmKCgpID0+IEZyb2FsYUVkaXRvckRpcmVjdGl2ZSksXG4gICAgbXVsdGk6IHRydWVcbiAgfV1cbn0pXG5leHBvcnQgY2xhc3MgRnJvYWxhRWRpdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIC8vIGVkaXRvciBvcHRpb25zXG4gIHByaXZhdGUgX29wdHM6IGFueSA9IHtcbiAgICBpbW1lZGlhdGVBbmd1bGFyTW9kZWxVcGRhdGU6IGZhbHNlLFxuICAgIGFuZ3VsYXJJZ25vcmVBdHRyczogbnVsbFxuICB9O1xuXG4gIHByaXZhdGUgX2VsZW1lbnQ6IGFueTtcblxuICBwcml2YXRlIFNQRUNJQUxfVEFHUzogc3RyaW5nW10gPSBbJ2ltZycsICdidXR0b24nLCAnaW5wdXQnLCAnYSddO1xuICBwcml2YXRlIElOTkVSX0hUTUxfQVRUUjogc3RyaW5nID0gJ2lubmVySFRNTCc7XG4gIHByaXZhdGUgX2hhc1NwZWNpYWxUYWc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBlZGl0b3IgZWxlbWVudFxuICBwcml2YXRlIF9lZGl0b3I6IGFueTtcblxuICAvLyBpbml0aWFsIGVkaXRvciBjb250ZW50XG4gIHByaXZhdGUgX21vZGVsOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfZWRpdG9ySW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF9vbGRNb2RlbDogc3RyaW5nID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcblxuICAgIGxldCBlbGVtZW50OiBhbnkgPSBlbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgYSBzcGVjaWFsIHRhZ1xuICAgIGlmICh0aGlzLlNQRUNJQUxfVEFHUy5pbmRleE9mKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSAhPSAtMSkge1xuICAgICAgdGhpcy5faGFzU3BlY2lhbFRhZyA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgdGhpcy56b25lID0gem9uZTtcbiAgfVxuXG4gIC8vIEJlZ2luIENvbnRyb2xWYWx1ZUFjY2Vzb3IgbWV0aG9kcy5cbiAgb25DaGFuZ2UgPSAoXykgPT4geyB9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cbiAgLy8gRm9ybSBtb2RlbCBjb250ZW50IGNoYW5nZWQuXG4gIHdyaXRlVmFsdWUoY29udGVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVFZGl0b3IoY29udGVudCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XG4gIC8vIEVuZCBDb250cm9sVmFsdWVBY2Nlc29yIG1ldGhvZHMuXG5cbiAgLy8gZnJvYWxhRWRpdG9yIGRpcmVjdGl2ZSBhcyBpbnB1dDogc3RvcmUgdGhlIGVkaXRvciBvcHRpb25zXG4gIEBJbnB1dCgpIHNldCBmcm9hbGFFZGl0b3Iob3B0czogYW55KSB7XG4gICAgdGhpcy5fb3B0cyA9IG9wdHMgfHwgdGhpcy5fb3B0cztcbiAgfVxuXG4gIC8vIGZyb2FsYU1vZGVsIGRpcmVjdGl2ZSBhcyBpbnB1dDogc3RvcmUgaW5pdGlhbCBlZGl0b3IgY29udGVudFxuICBASW5wdXQoKSBzZXQgZnJvYWxhTW9kZWwoY29udGVudDogYW55KSB7XG4gICAgdGhpcy51cGRhdGVFZGl0b3IoY29udGVudCk7XG4gIH1cblxuICAvLyBVcGRhdGUgZWRpdG9yIHdpdGggbW9kZWwgY29udGVudHMuXG4gIHByaXZhdGUgdXBkYXRlRWRpdG9yKGNvbnRlbnQ6IGFueSkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh0aGlzLl9vbGRNb2RlbCkgPT0gSlNPTi5zdHJpbmdpZnkoY29udGVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2hhc1NwZWNpYWxUYWcpIHtcbiAgICAgIHRoaXMuX29sZE1vZGVsID0gY29udGVudDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLl9tb2RlbCA9IGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2VkaXRvckluaXRpYWxpemVkKSB7XG4gICAgICBpZiAoIXRoaXMuX2hhc1NwZWNpYWxUYWcpIHtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmh0bWwuc2V0KGNvbnRlbnQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0Q29udGVudCgpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5faGFzU3BlY2lhbFRhZykge1xuICAgICAgICB0aGlzLl9lbGVtZW50LmlubmVySFRNTCA9IGNvbnRlbnQgfHwgJyc7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRDb250ZW50KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gZnJvYWxhTW9kZWwgZGlyZWN0aXZlIGFzIG91dHB1dDogdXBkYXRlIG1vZGVsIGlmIGVkaXRvciBjb250ZW50Q2hhbmdlZFxuICBAT3V0cHV0KCkgZnJvYWxhTW9kZWxDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLy8gZnJvYWxhSW5pdCBkaXJlY3RpdmUgYXMgb3V0cHV0OiBzZW5kIG1hbnVhbCBlZGl0b3IgaW5pdGlhbGl6YXRpb25cbiAgQE91dHB1dCgpIGZyb2FsYUluaXQ6IEV2ZW50RW1pdHRlcjxPYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxPYmplY3Q+KCk7XG5cbiAgLy8gdXBkYXRlIG1vZGVsIGlmIGVkaXRvciBjb250ZW50Q2hhbmdlZFxuICBwcml2YXRlIHVwZGF0ZU1vZGVsKCkge1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuXG4gICAgICBsZXQgbW9kZWxDb250ZW50OiBhbnkgPSBudWxsO1xuXG4gICAgICBpZiAodGhpcy5faGFzU3BlY2lhbFRhZykge1xuXG4gICAgICAgIGxldCBhdHRyaWJ1dGVOb2RlcyA9IHRoaXMuX2VsZW1lbnQuYXR0cmlidXRlcztcbiAgICAgICAgbGV0IGF0dHJzID0ge307XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVOb2Rlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgbGV0IGF0dHJOYW1lID0gYXR0cmlidXRlTm9kZXNbaV0ubmFtZTtcbiAgICAgICAgICBpZiAodGhpcy5fb3B0cy5hbmd1bGFySWdub3JlQXR0cnMgJiYgdGhpcy5fb3B0cy5hbmd1bGFySWdub3JlQXR0cnMuaW5kZXhPZihhdHRyTmFtZSkgIT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGF0dHJzW2F0dHJOYW1lXSA9IGF0dHJpYnV0ZU5vZGVzW2ldLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnQuaW5uZXJIVE1MKSB7XG4gICAgICAgICAgYXR0cnNbdGhpcy5JTk5FUl9IVE1MX0FUVFJdID0gdGhpcy5fZWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgIH1cblxuICAgICAgICBtb2RlbENvbnRlbnQgPSBhdHRycztcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgbGV0IHJldHVybmVkSHRtbDogYW55ID0gdGhpcy5fZWRpdG9yLmh0bWwuZ2V0KCk7XG4gICAgICAgIGlmICh0eXBlb2YgcmV0dXJuZWRIdG1sID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIG1vZGVsQ29udGVudCA9IHJldHVybmVkSHRtbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX29sZE1vZGVsICE9PSBtb2RlbENvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5fb2xkTW9kZWwgPSBtb2RlbENvbnRlbnQ7XG5cbiAgICAgICAgLy8gVXBkYXRlIGZyb2FsYU1vZGVsLlxuICAgICAgICB0aGlzLmZyb2FsYU1vZGVsQ2hhbmdlLmVtaXQobW9kZWxDb250ZW50KTtcblxuICAgICAgICAvLyBVcGRhdGUgZm9ybSBtb2RlbC5cbiAgICAgICAgdGhpcy5vbkNoYW5nZShtb2RlbENvbnRlbnQpO1xuICAgICAgfVxuXG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJFdmVudChldmVudE5hbWUsIGNhbGxiYWNrKSB7XG5cbiAgICBpZiAoIWV2ZW50TmFtZSB8fCAhY2FsbGJhY2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX29wdHMuZXZlbnRzKSB7XG4gICAgICB0aGlzLl9vcHRzLmV2ZW50cyA9IHt9O1xuICAgIH1cblxuICAgIHRoaXMuX29wdHMuZXZlbnRzW2V2ZW50TmFtZV0gPSBjYWxsYmFjaztcbiAgfVxuXG4gIHByaXZhdGUgaW5pdExpc3RlbmVycygpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgLy8gQ2hlY2sgaWYgd2UgaGF2ZSBldmVudHMgb24gdGhlIGVkaXRvci5cbiAgICBpZiAodGhpcy5fZWRpdG9yLmV2ZW50cykge1xuICAgICAgLy8gYmluZCBjb250ZW50Q2hhbmdlIGFuZCBrZXl1cCBldmVudCB0byBmcm9hbGFNb2RlbFxuICAgICAgdGhpcy5fZWRpdG9yLmV2ZW50cy5vbignY29udGVudENoYW5nZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYudXBkYXRlTW9kZWwoKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2VkaXRvci5ldmVudHMub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5vblRvdWNoZWQoKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuX29wdHMuaW1tZWRpYXRlQW5ndWxhck1vZGVsVXBkYXRlKSB7XG4gICAgICAgIHRoaXMuX2VkaXRvci5ldmVudHMub24oJ2tleXVwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi51cGRhdGVNb2RlbCgpO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9lZGl0b3JJbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUVkaXRvcigpIHtcbiAgICBpZiAodGhpcy5fZWRpdG9ySW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldENvbnRlbnQodHJ1ZSk7XG5cbiAgICAvLyBpbml0IGVkaXRvclxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAvLyBBZGQgbGlzdGVuZXJzIG9uIGluaXRpYWxpemVkIGV2ZW50LlxuICAgICAgaWYgKCF0aGlzLl9vcHRzLmV2ZW50cykgdGhpcy5fb3B0cy5ldmVudHMgPSB7fVxuXG4gICAgICAvLyBSZWdpc3RlciBpbml0aWFsaXplZCBldmVudC5cbiAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnaW5pdGlhbGl6ZWQnLCB0aGlzLl9vcHRzLmV2ZW50cyAmJiB0aGlzLl9vcHRzLmV2ZW50cy5pbml0aWFsaXplZCk7XG4gICAgICBjb25zdCBleGlzdGluZ0luaXRDYWxsYmFjayA9IHRoaXMuX29wdHMuZXZlbnRzLmluaXRpYWxpemVkO1xuICAgICAgLy8gRGVmYXVsdCBpbml0aWFsaXplZCBldmVudC5cbiAgICAgIGlmICghdGhpcy5fb3B0cy5ldmVudHMuaW5pdGlhbGl6ZWQgfHwgIXRoaXMuX29wdHMuZXZlbnRzLmluaXRpYWxpemVkLm92ZXJyaWRkZW4pIHtcbiAgICAgICAgdGhpcy5fb3B0cy5ldmVudHMuaW5pdGlhbGl6ZWQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0TGlzdGVuZXJzKCk7XG4gICAgICAgICAgZXhpc3RpbmdJbml0Q2FsbGJhY2sgJiYgZXhpc3RpbmdJbml0Q2FsbGJhY2suY2FsbCh0aGlzLl9lZGl0b3IsIHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vcHRzLmV2ZW50cy5pbml0aWFsaXplZC5vdmVycmlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgRnJvYWxhIEVkaXRvci5cbiAgICAgIHRoaXMuX2VkaXRvciA9IG5ldyBGcm9hbGFFZGl0b3IoXG4gICAgICAgIHRoaXMuX2VsZW1lbnQsXG4gICAgICAgIHRoaXMuX29wdHNcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldEh0bWwoKSB7XG4gICAgdGhpcy5fZWRpdG9yLmh0bWwuc2V0KHRoaXMuX21vZGVsIHx8IFwiXCIpO1xuXG4gICAgLy8gVGhpcyB3aWxsIHJlc2V0IHRoZSB1bmRvIHN0YWNrIGV2ZXJ5dGltZSB0aGUgbW9kZWwgY2hhbmdlcyBleHRlcm5hbGx5LiBDYW4gd2UgZml4IHRoaXM/XG4gICAgdGhpcy5fZWRpdG9yLnVuZG8ucmVzZXQoKTtcbiAgICB0aGlzLl9lZGl0b3IudW5kby5zYXZlU3RlcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDb250ZW50KGZpcnN0VGltZSA9IGZhbHNlKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gU2V0IGluaXRpYWwgY29udGVudFxuICAgIGlmICh0aGlzLl9tb2RlbCB8fCB0aGlzLl9tb2RlbCA9PSAnJykge1xuICAgICAgdGhpcy5fb2xkTW9kZWwgPSB0aGlzLl9tb2RlbDtcbiAgICAgIGlmICh0aGlzLl9oYXNTcGVjaWFsVGFnKSB7XG5cbiAgICAgICAgbGV0IHRhZ3M6IE9iamVjdCA9IHRoaXMuX21vZGVsO1xuXG4gICAgICAgIC8vIGFkZCB0YWdzIG9uIGVsZW1lbnRcbiAgICAgICAgaWYgKHRhZ3MpIHtcblxuICAgICAgICAgIGZvciAobGV0IGF0dHIgaW4gdGFncykge1xuICAgICAgICAgICAgaWYgKHRhZ3MuaGFzT3duUHJvcGVydHkoYXR0cikgJiYgYXR0ciAhPSB0aGlzLklOTkVSX0hUTUxfQVRUUikge1xuICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCB0YWdzW2F0dHJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGFncy5oYXNPd25Qcm9wZXJ0eSh0aGlzLklOTkVSX0hUTUxfQVRUUikpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuaW5uZXJIVE1MID0gdGFnc1t0aGlzLklOTkVSX0hUTUxfQVRUUl07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZmlyc3RUaW1lKSB7XG4gICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdpbml0aWFsaXplZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuc2V0SHRtbCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuc2V0SHRtbCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95RWRpdG9yKCkge1xuICAgIGlmICh0aGlzLl9lZGl0b3JJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fZWRpdG9yLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX2VkaXRvckluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRFZGl0b3IoKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9lZGl0b3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBzZW5kIG1hbnVhbCBlZGl0b3IgaW5pdGlhbGl6YXRpb25cbiAgcHJpdmF0ZSBnZW5lcmF0ZU1hbnVhbENvbnRyb2xsZXIoKSB7XG4gICAgbGV0IGNvbnRyb2xzID0ge1xuICAgICAgaW5pdGlhbGl6ZTogdGhpcy5jcmVhdGVFZGl0b3IuYmluZCh0aGlzKSxcbiAgICAgIGRlc3Ryb3k6IHRoaXMuZGVzdHJveUVkaXRvci5iaW5kKHRoaXMpLFxuICAgICAgZ2V0RWRpdG9yOiB0aGlzLmdldEVkaXRvci5iaW5kKHRoaXMpLFxuICAgIH07XG4gICAgdGhpcy5mcm9hbGFJbml0LmVtaXQoY29udHJvbHMpO1xuICB9XG5cbiAgLy8gVE9ETyBub3Qgc3VyZSBpZiBuZ09uSW5pdCBpcyBleGVjdXRlZCBhZnRlciBAaW5wdXRzXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBjaGVjayBpZiBvdXRwdXQgZnJvYWxhSW5pdCBpcyBwcmVzZW50LiBNYXliZSBvYnNlcnZlcnMgaXMgcHJpdmF0ZSBhbmQgc2hvdWxkIG5vdCBiZSB1c2VkPz8gVE9ETyBob3cgdG8gYmV0dGVyIHRlc3QgdGhhdCBhbiBvdXRwdXQgZGlyZWN0aXZlIGlzIHByZXNlbnQuXG4gICAgaWYgKCF0aGlzLmZyb2FsYUluaXQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jcmVhdGVFZGl0b3IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZW5lcmF0ZU1hbnVhbENvbnRyb2xsZXIoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3lFZGl0b3IoKTtcbiAgfVxufVxuIl19