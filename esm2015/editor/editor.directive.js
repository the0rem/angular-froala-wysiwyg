/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Directive, ElementRef, EventEmitter, forwardRef, Input, NgZone, Output } from '@angular/core';
import FroalaEditor from 'froala-editor';
export class FroalaEditorDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZnJvYWxhLXd5c2l3eWcvIiwic291cmNlcyI6WyJlZGl0b3IvZWRpdG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkcsT0FBTyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBYXpDLE1BQU0sT0FBTyxxQkFBcUI7Ozs7O0lBMEJoQyxZQUFZLEVBQWMsRUFBVSxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTs7UUF2QnhDLFVBQUssR0FBUTtZQUNuQiwyQkFBMkIsRUFBRSxLQUFLO1lBQ2xDLGtCQUFrQixFQUFFLElBQUk7U0FDekIsQ0FBQztRQUlNLGlCQUFZLEdBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6RCxvQkFBZSxHQUFXLFdBQVcsQ0FBQztRQUN0QyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQVFoQyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFFcEMsY0FBUyxHQUFXLElBQUksQ0FBQztRQUV6Qix5QkFBb0IsR0FBRyxLQUFLLENBQUM7O1FBZ0JyQyxhQUFROzs7O1FBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNqQixDQUFDLEVBQUM7UUFDRixjQUFTOzs7UUFBRyxHQUFHLEVBQUU7UUFDakIsQ0FBQyxFQUFDOztRQXVEUSxzQkFBaUIsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQzs7UUFHL0QsZUFBVSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDOztZQXpFbEUsT0FBTyxHQUFRLEVBQUUsQ0FBQyxhQUFhO1FB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O0lBR3hDLHdDQUFxQjs7Ozs7SUFHckIsdUNBQXVCOzs7OztJQUV2QixtREFBNEM7Ozs7O0lBRTVDLDBDQUFpQzs7Ozs7SUFFakMscURBQXFDOztJQWdCckMseUNBQ0U7O0lBQ0YsMENBQ0U7O0lBdURGLGtEQUF5RTs7SUFHekUsMkNBQXdFOzs7OztJQTNFNUMscUNBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE5nWm9uZSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCBGcm9hbGFFZGl0b3IgZnJvbSAnZnJvYWxhLWVkaXRvcic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tmcm9hbGFFZGl0b3JdJyxcbiAgZXhwb3J0QXM6ICdmcm9hbGFFZGl0b3InLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZyb2FsYUVkaXRvckRpcmVjdGl2ZSksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBGcm9hbGFFZGl0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgLy8gZWRpdG9yIG9wdGlvbnNcbiAgcHJpdmF0ZSBfb3B0czogYW55ID0ge1xuICAgIGltbWVkaWF0ZUFuZ3VsYXJNb2RlbFVwZGF0ZTogZmFsc2UsXG4gICAgYW5ndWxhcklnbm9yZUF0dHJzOiBudWxsXG4gIH07XG5cbiAgcHJpdmF0ZSBfZWxlbWVudDogYW55O1xuXG4gIHByaXZhdGUgU1BFQ0lBTF9UQUdTOiBzdHJpbmdbXSA9IFsnaW1nJywgJ2J1dHRvbicsICdpbnB1dCcsICdhJ107XG4gIHByaXZhdGUgSU5ORVJfSFRNTF9BVFRSOiBzdHJpbmcgPSAnaW5uZXJIVE1MJztcbiAgcHJpdmF0ZSBfaGFzU3BlY2lhbFRhZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIGVkaXRvciBlbGVtZW50XG4gIHByaXZhdGUgX2VkaXRvcjogYW55O1xuXG4gIC8vIGluaXRpYWwgZWRpdG9yIGNvbnRlbnRcbiAgcHJpdmF0ZSBfbW9kZWw6IHN0cmluZztcblxuICBwcml2YXRlIF9lZGl0b3JJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX29sZE1vZGVsOiBzdHJpbmcgPSBudWxsO1xuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZU92ZXJyaWRkZW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcblxuICAgIGxldCBlbGVtZW50OiBhbnkgPSBlbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgYSBzcGVjaWFsIHRhZ1xuICAgIGlmICh0aGlzLlNQRUNJQUxfVEFHUy5pbmRleE9mKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSAhPSAtMSkge1xuICAgICAgdGhpcy5faGFzU3BlY2lhbFRhZyA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgdGhpcy56b25lID0gem9uZTtcbiAgfVxuXG4gIC8vIEJlZ2luIENvbnRyb2xWYWx1ZUFjY2Vzb3IgbWV0aG9kcy5cbiAgb25DaGFuZ2UgPSAoXykgPT4ge1xuICB9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7XG4gIH07XG5cbiAgLy8gRm9ybSBtb2RlbCBjb250ZW50IGNoYW5nZWQuXG4gIHdyaXRlVmFsdWUoY29udGVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVFZGl0b3IoY29udGVudCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLy8gRW5kIENvbnRyb2xWYWx1ZUFjY2Vzb3IgbWV0aG9kcy5cblxuICAvLyBmcm9hbGFFZGl0b3IgZGlyZWN0aXZlIGFzIGlucHV0OiBzdG9yZSB0aGUgZWRpdG9yIG9wdGlvbnNcbiAgQElucHV0KCkgc2V0IGZyb2FsYUVkaXRvcihvcHRzOiBhbnkpIHtcbiAgICB0aGlzLl9vcHRzID0gb3B0cyB8fCB0aGlzLl9vcHRzO1xuICB9XG5cbiAgLy8gZnJvYWxhTW9kZWwgZGlyZWN0aXZlIGFzIGlucHV0OiBzdG9yZSBpbml0aWFsIGVkaXRvciBjb250ZW50XG4gIEBJbnB1dCgpIHNldCBmcm9hbGFNb2RlbChjb250ZW50OiBhbnkpIHtcbiAgICB0aGlzLnVwZGF0ZUVkaXRvcihjb250ZW50KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSBlZGl0b3Igd2l0aCBtb2RlbCBjb250ZW50cy5cbiAgcHJpdmF0ZSB1cGRhdGVFZGl0b3IoY29udGVudDogYW55KSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHRoaXMuX29sZE1vZGVsKSA9PSBKU09OLnN0cmluZ2lmeShjb250ZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5faGFzU3BlY2lhbFRhZykge1xuICAgICAgdGhpcy5fb2xkTW9kZWwgPSBjb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tb2RlbCA9IGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2VkaXRvckluaXRpYWxpemVkKSB7XG4gICAgICBpZiAoIXRoaXMuX2hhc1NwZWNpYWxUYWcpIHtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmh0bWwuc2V0KGNvbnRlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRDb250ZW50KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5faGFzU3BlY2lhbFRhZykge1xuICAgICAgICB0aGlzLl9lbGVtZW50LmlubmVySFRNTCA9IGNvbnRlbnQgfHwgJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldENvbnRlbnQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBmcm9hbGFNb2RlbCBkaXJlY3RpdmUgYXMgb3V0cHV0OiB1cGRhdGUgbW9kZWwgaWYgZWRpdG9yIGNvbnRlbnRDaGFuZ2VkXG4gIEBPdXRwdXQoKSBmcm9hbGFNb2RlbENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvLyBmcm9hbGFJbml0IGRpcmVjdGl2ZSBhcyBvdXRwdXQ6IHNlbmQgbWFudWFsIGVkaXRvciBpbml0aWFsaXphdGlvblxuICBAT3V0cHV0KCkgZnJvYWxhSW5pdDogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPE9iamVjdD4oKTtcblxuICAvLyB1cGRhdGUgbW9kZWwgaWYgZWRpdG9yIGNvbnRlbnRDaGFuZ2VkXG4gIHByaXZhdGUgdXBkYXRlTW9kZWwoKSB7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG5cbiAgICAgIGxldCBtb2RlbENvbnRlbnQ6IGFueSA9IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLl9oYXNTcGVjaWFsVGFnKSB7XG4gICAgICAgIGNvbnN0IGF0dHJzID0gdGhpcy5fZWxlbWVudC5hdHRyaWJ1dGVzLnJlZHVjZSgocmVzdWx0LCBhdHRyKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX29wdHMuYW5ndWxhcklnbm9yZUF0dHJzICYmIHRoaXMuX29wdHMuYW5ndWxhcklnbm9yZUF0dHJzLmluZGV4T2YoYXR0ci5uYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHJlc3VsdCwge1xuICAgICAgICAgICAgW2F0dHIubmFtZV06IGF0dHIudmFsdWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIGlmICh0aGlzLl9lbGVtZW50LmlubmVySFRNTCkge1xuICAgICAgICAgIGF0dHJzW3RoaXMuSU5ORVJfSFRNTF9BVFRSXSA9IHRoaXMuX2VsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9kZWxDb250ZW50ID0gYXR0cnM7XG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGxldCByZXR1cm5lZEh0bWw6IGFueSA9IHRoaXMuX2VkaXRvci5odG1sLmdldCgpO1xuICAgICAgICBpZiAodHlwZW9mIHJldHVybmVkSHRtbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBtb2RlbENvbnRlbnQgPSByZXR1cm5lZEh0bWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9vbGRNb2RlbCAhPT0gbW9kZWxDb250ZW50KSB7XG4gICAgICAgIHRoaXMuX29sZE1vZGVsID0gbW9kZWxDb250ZW50O1xuXG4gICAgICAgIC8vIFVwZGF0ZSBmcm9hbGFNb2RlbC5cbiAgICAgICAgdGhpcy5mcm9hbGFNb2RlbENoYW5nZS5lbWl0KG1vZGVsQ29udGVudCk7XG5cbiAgICAgICAgLy8gVXBkYXRlIGZvcm0gbW9kZWwuXG4gICAgICAgIHRoaXMub25DaGFuZ2UobW9kZWxDb250ZW50KTtcbiAgICAgIH1cblxuICAgIH0pXG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyRXZlbnQoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIGlmICghZXZlbnROYW1lIHx8ICFjYWxsYmFjaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fb3B0cy5ldmVudHMpIHtcbiAgICAgIHRoaXMuX29wdHMuZXZlbnRzID0ge307XG4gICAgfVxuXG4gICAgdGhpcy5fb3B0cy5ldmVudHNbZXZlbnROYW1lXSA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0TGlzdGVuZXJzKCkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGV2ZW50cyBvbiB0aGUgZWRpdG9yLlxuICAgIGlmICh0aGlzLl9lZGl0b3IuZXZlbnRzKSB7XG4gICAgICAvLyBiaW5kIGNvbnRlbnRDaGFuZ2UgYW5kIGtleXVwIGV2ZW50IHRvIGZyb2FsYU1vZGVsXG4gICAgICB0aGlzLl9lZGl0b3IuZXZlbnRzLm9uKCdjb250ZW50Q2hhbmdlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi51cGRhdGVNb2RlbCgpO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZWRpdG9yLmV2ZW50cy5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLm9uVG91Y2hlZCgpO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5fb3B0cy5pbW1lZGlhdGVBbmd1bGFyTW9kZWxVcGRhdGUpIHtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmV2ZW50cy5vbigna2V5dXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZU1vZGVsKCk7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2VkaXRvckluaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRWRpdG9yKCkge1xuICAgIGlmICh0aGlzLl9lZGl0b3JJbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0Q29udGVudCh0cnVlKTtcblxuICAgIC8vIGluaXQgZWRpdG9yXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIC8vIEFkZCBsaXN0ZW5lcnMgb24gaW5pdGlhbGl6ZWQgZXZlbnQuXG4gICAgICBpZiAoIXRoaXMuX29wdHMuZXZlbnRzKSB0aGlzLl9vcHRzLmV2ZW50cyA9IHt9O1xuXG4gICAgICAvLyBSZWdpc3RlciBpbml0aWFsaXplZCBldmVudC5cbiAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnaW5pdGlhbGl6ZWQnLCB0aGlzLl9vcHRzLmV2ZW50cyAmJiB0aGlzLl9vcHRzLmV2ZW50cy5pbml0aWFsaXplZCk7XG4gICAgICBjb25zdCBleGlzdGluZ0luaXRDYWxsYmFjayA9IHRoaXMuX29wdHMuZXZlbnRzLmluaXRpYWxpemVkO1xuICAgICAgLy8gRGVmYXVsdCBpbml0aWFsaXplZCBldmVudC5cbiAgICAgIGlmICghdGhpcy5fb3B0cy5ldmVudHMuaW5pdGlhbGl6ZWQgfHwgIXRoaXMuaW5pdGlhbGl6ZU92ZXJyaWRkZW4pIHtcbiAgICAgICAgdGhpcy5fb3B0cy5ldmVudHMuaW5pdGlhbGl6ZWQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0TGlzdGVuZXJzKCk7XG4gICAgICAgICAgZXhpc3RpbmdJbml0Q2FsbGJhY2sgJiYgZXhpc3RpbmdJbml0Q2FsbGJhY2suY2FsbCh0aGlzLl9lZGl0b3IsIHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluaXRpYWxpemVPdmVycmlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgRnJvYWxhIEVkaXRvci5cbiAgICAgIHRoaXMuX2VkaXRvciA9IG5ldyBGcm9hbGFFZGl0b3IoXG4gICAgICAgIHRoaXMuX2VsZW1lbnQsXG4gICAgICAgIHRoaXMuX29wdHNcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldEh0bWwoKSB7XG4gICAgdGhpcy5fZWRpdG9yLmh0bWwuc2V0KHRoaXMuX21vZGVsIHx8IFwiXCIpO1xuXG4gICAgLy8gVGhpcyB3aWxsIHJlc2V0IHRoZSB1bmRvIHN0YWNrIGV2ZXJ5dGltZSB0aGUgbW9kZWwgY2hhbmdlcyBleHRlcm5hbGx5LiBDYW4gd2UgZml4IHRoaXM/XG4gICAgdGhpcy5fZWRpdG9yLnVuZG8ucmVzZXQoKTtcbiAgICB0aGlzLl9lZGl0b3IudW5kby5zYXZlU3RlcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDb250ZW50KGZpcnN0VGltZSA9IGZhbHNlKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gU2V0IGluaXRpYWwgY29udGVudFxuICAgIGlmICh0aGlzLl9tb2RlbCB8fCB0aGlzLl9tb2RlbCA9PSAnJykge1xuICAgICAgdGhpcy5fb2xkTW9kZWwgPSB0aGlzLl9tb2RlbDtcbiAgICAgIGlmICh0aGlzLl9oYXNTcGVjaWFsVGFnKSB7XG5cbiAgICAgICAgbGV0IHRhZ3M6IE9iamVjdCA9IHRoaXMuX21vZGVsO1xuXG4gICAgICAgIC8vIGFkZCB0YWdzIG9uIGVsZW1lbnRcbiAgICAgICAgaWYgKHRhZ3MpIHtcblxuICAgICAgICAgIGZvciAobGV0IGF0dHIgaW4gdGFncykge1xuICAgICAgICAgICAgaWYgKHRhZ3MuaGFzT3duUHJvcGVydHkoYXR0cikgJiYgYXR0ciAhPSB0aGlzLklOTkVSX0hUTUxfQVRUUikge1xuICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCB0YWdzW2F0dHJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGFncy5oYXNPd25Qcm9wZXJ0eSh0aGlzLklOTkVSX0hUTUxfQVRUUikpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuaW5uZXJIVE1MID0gdGFnc1t0aGlzLklOTkVSX0hUTUxfQVRUUl07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZmlyc3RUaW1lKSB7XG4gICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdpbml0aWFsaXplZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuc2V0SHRtbCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuc2V0SHRtbCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95RWRpdG9yKCkge1xuICAgIGlmICh0aGlzLl9lZGl0b3JJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fZWRpdG9yLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX2VkaXRvckluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRFZGl0b3IoKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9lZGl0b3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBzZW5kIG1hbnVhbCBlZGl0b3IgaW5pdGlhbGl6YXRpb25cbiAgcHJpdmF0ZSBnZW5lcmF0ZU1hbnVhbENvbnRyb2xsZXIoKSB7XG4gICAgbGV0IGNvbnRyb2xzID0ge1xuICAgICAgaW5pdGlhbGl6ZTogdGhpcy5jcmVhdGVFZGl0b3IuYmluZCh0aGlzKSxcbiAgICAgIGRlc3Ryb3k6IHRoaXMuZGVzdHJveUVkaXRvci5iaW5kKHRoaXMpLFxuICAgICAgZ2V0RWRpdG9yOiB0aGlzLmdldEVkaXRvci5iaW5kKHRoaXMpLFxuICAgIH07XG4gICAgdGhpcy5mcm9hbGFJbml0LmVtaXQoY29udHJvbHMpO1xuICB9XG5cbiAgLy8gVE9ETyBub3Qgc3VyZSBpZiBuZ09uSW5pdCBpcyBleGVjdXRlZCBhZnRlciBAaW5wdXRzXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBjaGVjayBpZiBvdXRwdXQgZnJvYWxhSW5pdCBpcyBwcmVzZW50LiBNYXliZSBvYnNlcnZlcnMgaXMgcHJpdmF0ZSBhbmQgc2hvdWxkIG5vdCBiZSB1c2VkPz8gVE9ETyBob3cgdG8gYmV0dGVyIHRlc3QgdGhhdCBhbiBvdXRwdXQgZGlyZWN0aXZlIGlzIHByZXNlbnQuXG4gICAgaWYgKCF0aGlzLmZyb2FsYUluaXQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jcmVhdGVFZGl0b3IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZW5lcmF0ZU1hbnVhbENvbnRyb2xsZXIoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3lFZGl0b3IoKTtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICB9XG59XG4iXX0=