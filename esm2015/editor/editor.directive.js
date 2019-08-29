/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output, forwardRef } from '@angular/core';
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
        // Begin ControlValueAccesor methods.
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
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
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
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
                let attributeNodes = this._element.attributes;
                /** @type {?} */
                let attrs = {};
                for (let i = 0; i < attributeNodes.length; i++) {
                    /** @type {?} */
                    let attrName = attributeNodes[i].name;
                    if (this._opts.angularIgnoreAttrs && this._opts.angularIgnoreAttrs.indexOf(attrName) != -1) {
                        continue;
                    }
                    attrs[attrName] = attributeNodes[i].value;
                }
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
            if (!this._opts.events.initialized || !this._opts.events.initialized.overridden) {
                this._opts.events.initialized = (/**
                 * @return {?}
                 */
                () => {
                    this.initListeners();
                    existingInitCallback && existingInitCallback.call(this._editor, this);
                });
                this._opts.events.initialized.overridden = true;
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
}
FroalaEditorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[froalaEditor]',
                exportAs: 'froalaEditor',
                providers: [{
                        provide: NG_VALUE_ACCESSOR, useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => FroalaEditorDirective)),
                        multi: true
                    }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZnJvYWxhLXd5c2l3eWcvIiwic291cmNlcyI6WyJlZGl0b3IvZWRpdG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFZLE1BQU0sRUFBWSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0gsT0FBTyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBV3pDLE1BQU0sT0FBTyxxQkFBcUI7Ozs7O0lBd0JoQyxZQUFZLEVBQWMsRUFBVSxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTs7UUFyQnhDLFVBQUssR0FBUTtZQUNuQiwyQkFBMkIsRUFBRSxLQUFLO1lBQ2xDLGtCQUFrQixFQUFFLElBQUk7U0FDekIsQ0FBQztRQUlNLGlCQUFZLEdBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6RCxvQkFBZSxHQUFXLFdBQVcsQ0FBQztRQUN0QyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQVFoQyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFFcEMsY0FBUyxHQUFXLElBQUksQ0FBQzs7UUFnQmpDLGFBQVE7Ozs7UUFBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFDO1FBQ3RCLGNBQVM7OztRQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBQzs7UUFxRFosc0JBQWlCLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7O1FBRy9ELGVBQVUsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQzs7WUFyRWxFLE9BQU8sR0FBUSxFQUFFLENBQUMsYUFBYTtRQUVuQyx3Q0FBd0M7UUFDeEMsSUFBSSxJQUFJLENB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Ozs7O0lBR3hDLHdDQUFxQjs7Ozs7SUFHckIsdUNBQXVCOzs7OztJQUV2QixtREFBNEM7Ozs7O0lBRTVDLDBDQUFpQzs7SUFnQmpDLHlDQUFzQjs7SUFDdEIsMENBQXNCOztJQXFEdEIsa0RBQXlFOztJQUd6RSwyQ0FBd0U7Ozs7O0lBdkU1QyxxQ0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdab25lLCBPcHRpb25hbCwgT3V0cHV0LCBSZW5kZXJlciwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgRnJvYWxhRWRpdG9yIGZyb20gJ2Zyb2FsYS1lZGl0b3InO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZnJvYWxhRWRpdG9yXScsXG4gIGV4cG9ydEFzOiAnZnJvYWxhRWRpdG9yJyxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzpcbiAgICAgIGZvcndhcmRSZWYoKCkgPT4gRnJvYWxhRWRpdG9yRGlyZWN0aXZlKSxcbiAgICBtdWx0aTogdHJ1ZVxuICB9XVxufSlcbmV4cG9ydCBjbGFzcyBGcm9hbGFFZGl0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgLy8gZWRpdG9yIG9wdGlvbnNcbiAgcHJpdmF0ZSBfb3B0czogYW55ID0ge1xuICAgIGltbWVkaWF0ZUFuZ3VsYXJNb2RlbFVwZGF0ZTogZmFsc2UsXG4gICAgYW5ndWxhcklnbm9yZUF0dHJzOiBudWxsXG4gIH07XG5cbiAgcHJpdmF0ZSBfZWxlbWVudDogYW55O1xuXG4gIHByaXZhdGUgU1BFQ0lBTF9UQUdTOiBzdHJpbmdbXSA9IFsnaW1nJywgJ2J1dHRvbicsICdpbnB1dCcsICdhJ107XG4gIHByaXZhdGUgSU5ORVJfSFRNTF9BVFRSOiBzdHJpbmcgPSAnaW5uZXJIVE1MJztcbiAgcHJpdmF0ZSBfaGFzU3BlY2lhbFRhZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIGVkaXRvciBlbGVtZW50XG4gIHByaXZhdGUgX2VkaXRvcjogYW55O1xuXG4gIC8vIGluaXRpYWwgZWRpdG9yIGNvbnRlbnRcbiAgcHJpdmF0ZSBfbW9kZWw6IHN0cmluZztcblxuICBwcml2YXRlIF9lZGl0b3JJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX29sZE1vZGVsOiBzdHJpbmcgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuXG4gICAgbGV0IGVsZW1lbnQ6IGFueSA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAvLyBjaGVjayBpZiB0aGUgZWxlbWVudCBpcyBhIHNwZWNpYWwgdGFnXG4gICAgaWYgKHRoaXMuU1BFQ0lBTF9UQUdTLmluZGV4T2YoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpICE9IC0xKSB7XG4gICAgICB0aGlzLl9oYXNTcGVjaWFsVGFnID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICB0aGlzLnpvbmUgPSB6b25lO1xuICB9XG5cbiAgLy8gQmVnaW4gQ29udHJvbFZhbHVlQWNjZXNvciBtZXRob2RzLlxuICBvbkNoYW5nZSA9IChfKSA9PiB7IH07XG4gIG9uVG91Y2hlZCA9ICgpID0+IHsgfTtcblxuICAvLyBGb3JtIG1vZGVsIGNvbnRlbnQgY2hhbmdlZC5cbiAgd3JpdGVWYWx1ZShjb250ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUVkaXRvcihjb250ZW50KTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cbiAgLy8gRW5kIENvbnRyb2xWYWx1ZUFjY2Vzb3IgbWV0aG9kcy5cblxuICAvLyBmcm9hbGFFZGl0b3IgZGlyZWN0aXZlIGFzIGlucHV0OiBzdG9yZSB0aGUgZWRpdG9yIG9wdGlvbnNcbiAgQElucHV0KCkgc2V0IGZyb2FsYUVkaXRvcihvcHRzOiBhbnkpIHtcbiAgICB0aGlzLl9vcHRzID0gb3B0cyB8fCB0aGlzLl9vcHRzO1xuICB9XG5cbiAgLy8gZnJvYWxhTW9kZWwgZGlyZWN0aXZlIGFzIGlucHV0OiBzdG9yZSBpbml0aWFsIGVkaXRvciBjb250ZW50XG4gIEBJbnB1dCgpIHNldCBmcm9hbGFNb2RlbChjb250ZW50OiBhbnkpIHtcbiAgICB0aGlzLnVwZGF0ZUVkaXRvcihjb250ZW50KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSBlZGl0b3Igd2l0aCBtb2RlbCBjb250ZW50cy5cbiAgcHJpdmF0ZSB1cGRhdGVFZGl0b3IoY29udGVudDogYW55KSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHRoaXMuX29sZE1vZGVsKSA9PSBKU09OLnN0cmluZ2lmeShjb250ZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5faGFzU3BlY2lhbFRhZykge1xuICAgICAgdGhpcy5fb2xkTW9kZWwgPSBjb250ZW50O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX21vZGVsID0gY29udGVudDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZWRpdG9ySW5pdGlhbGl6ZWQpIHtcbiAgICAgIGlmICghdGhpcy5faGFzU3BlY2lhbFRhZykge1xuICAgICAgICB0aGlzLl9lZGl0b3IuaHRtbC5zZXQoY29udGVudCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRDb250ZW50KCk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLl9oYXNTcGVjaWFsVGFnKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuaW5uZXJIVE1MID0gY29udGVudCB8fCAnJztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnNldENvbnRlbnQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBmcm9hbGFNb2RlbCBkaXJlY3RpdmUgYXMgb3V0cHV0OiB1cGRhdGUgbW9kZWwgaWYgZWRpdG9yIGNvbnRlbnRDaGFuZ2VkXG4gIEBPdXRwdXQoKSBmcm9hbGFNb2RlbENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvLyBmcm9hbGFJbml0IGRpcmVjdGl2ZSBhcyBvdXRwdXQ6IHNlbmQgbWFudWFsIGVkaXRvciBpbml0aWFsaXphdGlvblxuICBAT3V0cHV0KCkgZnJvYWxhSW5pdDogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPE9iamVjdD4oKTtcblxuICAvLyB1cGRhdGUgbW9kZWwgaWYgZWRpdG9yIGNvbnRlbnRDaGFuZ2VkXG4gIHByaXZhdGUgdXBkYXRlTW9kZWwoKSB7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG5cbiAgICAgIGxldCBtb2RlbENvbnRlbnQ6IGFueSA9IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLl9oYXNTcGVjaWFsVGFnKSB7XG5cbiAgICAgICAgbGV0IGF0dHJpYnV0ZU5vZGVzID0gdGhpcy5fZWxlbWVudC5hdHRyaWJ1dGVzO1xuICAgICAgICBsZXQgYXR0cnMgPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZU5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICBsZXQgYXR0ck5hbWUgPSBhdHRyaWJ1dGVOb2Rlc1tpXS5uYW1lO1xuICAgICAgICAgIGlmICh0aGlzLl9vcHRzLmFuZ3VsYXJJZ25vcmVBdHRycyAmJiB0aGlzLl9vcHRzLmFuZ3VsYXJJZ25vcmVBdHRycy5pbmRleE9mKGF0dHJOYW1lKSAhPSAtMSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXR0cnNbYXR0ck5hbWVdID0gYXR0cmlidXRlTm9kZXNbaV0udmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZWxlbWVudC5pbm5lckhUTUwpIHtcbiAgICAgICAgICBhdHRyc1t0aGlzLklOTkVSX0hUTUxfQVRUUl0gPSB0aGlzLl9lbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vZGVsQ29udGVudCA9IGF0dHJzO1xuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBsZXQgcmV0dXJuZWRIdG1sOiBhbnkgPSB0aGlzLl9lZGl0b3IuaHRtbC5nZXQoKTtcbiAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5lZEh0bWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgbW9kZWxDb250ZW50ID0gcmV0dXJuZWRIdG1sO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fb2xkTW9kZWwgIT09IG1vZGVsQ29udGVudCkge1xuICAgICAgICB0aGlzLl9vbGRNb2RlbCA9IG1vZGVsQ29udGVudDtcblxuICAgICAgICAvLyBVcGRhdGUgZnJvYWxhTW9kZWwuXG4gICAgICAgIHRoaXMuZnJvYWxhTW9kZWxDaGFuZ2UuZW1pdChtb2RlbENvbnRlbnQpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBmb3JtIG1vZGVsLlxuICAgICAgICB0aGlzLm9uQ2hhbmdlKG1vZGVsQ29udGVudCk7XG4gICAgICB9XG5cbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlckV2ZW50KGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcblxuICAgIGlmICghZXZlbnROYW1lIHx8ICFjYWxsYmFjaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fb3B0cy5ldmVudHMpIHtcbiAgICAgIHRoaXMuX29wdHMuZXZlbnRzID0ge307XG4gICAgfVxuXG4gICAgdGhpcy5fb3B0cy5ldmVudHNbZXZlbnROYW1lXSA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0TGlzdGVuZXJzKCkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGV2ZW50cyBvbiB0aGUgZWRpdG9yLlxuICAgIGlmICh0aGlzLl9lZGl0b3IuZXZlbnRzKSB7XG4gICAgICAvLyBiaW5kIGNvbnRlbnRDaGFuZ2UgYW5kIGtleXVwIGV2ZW50IHRvIGZyb2FsYU1vZGVsXG4gICAgICB0aGlzLl9lZGl0b3IuZXZlbnRzLm9uKCdjb250ZW50Q2hhbmdlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi51cGRhdGVNb2RlbCgpO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZWRpdG9yLmV2ZW50cy5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLm9uVG91Y2hlZCgpO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5fb3B0cy5pbW1lZGlhdGVBbmd1bGFyTW9kZWxVcGRhdGUpIHtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmV2ZW50cy5vbigna2V5dXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZU1vZGVsKCk7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2VkaXRvckluaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRWRpdG9yKCkge1xuICAgIGlmICh0aGlzLl9lZGl0b3JJbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0Q29udGVudCh0cnVlKTtcblxuICAgIC8vIGluaXQgZWRpdG9yXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIC8vIEFkZCBsaXN0ZW5lcnMgb24gaW5pdGlhbGl6ZWQgZXZlbnQuXG4gICAgICBpZiAoIXRoaXMuX29wdHMuZXZlbnRzKSB0aGlzLl9vcHRzLmV2ZW50cyA9IHt9XG5cbiAgICAgIC8vIFJlZ2lzdGVyIGluaXRpYWxpemVkIGV2ZW50LlxuICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdpbml0aWFsaXplZCcsIHRoaXMuX29wdHMuZXZlbnRzICYmIHRoaXMuX29wdHMuZXZlbnRzLmluaXRpYWxpemVkKTtcbiAgICAgIGNvbnN0IGV4aXN0aW5nSW5pdENhbGxiYWNrID0gdGhpcy5fb3B0cy5ldmVudHMuaW5pdGlhbGl6ZWQ7XG4gICAgICAvLyBEZWZhdWx0IGluaXRpYWxpemVkIGV2ZW50LlxuICAgICAgaWYgKCF0aGlzLl9vcHRzLmV2ZW50cy5pbml0aWFsaXplZCB8fCAhdGhpcy5fb3B0cy5ldmVudHMuaW5pdGlhbGl6ZWQub3ZlcnJpZGRlbikge1xuICAgICAgICB0aGlzLl9vcHRzLmV2ZW50cy5pbml0aWFsaXplZCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICBleGlzdGluZ0luaXRDYWxsYmFjayAmJiBleGlzdGluZ0luaXRDYWxsYmFjay5jYWxsKHRoaXMuX2VkaXRvciwgdGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX29wdHMuZXZlbnRzLmluaXRpYWxpemVkLm92ZXJyaWRkZW4gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBJbml0aWFsaXplIHRoZSBGcm9hbGEgRWRpdG9yLlxuICAgICAgdGhpcy5fZWRpdG9yID0gbmV3IEZyb2FsYUVkaXRvcihcbiAgICAgICAgdGhpcy5fZWxlbWVudCxcbiAgICAgICAgdGhpcy5fb3B0c1xuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SHRtbCgpIHtcbiAgICB0aGlzLl9lZGl0b3IuaHRtbC5zZXQodGhpcy5fbW9kZWwgfHwgXCJcIik7XG5cbiAgICAvLyBUaGlzIHdpbGwgcmVzZXQgdGhlIHVuZG8gc3RhY2sgZXZlcnl0aW1lIHRoZSBtb2RlbCBjaGFuZ2VzIGV4dGVybmFsbHkuIENhbiB3ZSBmaXggdGhpcz9cbiAgICB0aGlzLl9lZGl0b3IudW5kby5yZXNldCgpO1xuICAgIHRoaXMuX2VkaXRvci51bmRvLnNhdmVTdGVwKCk7XG4gIH1cblxuICBwcml2YXRlIHNldENvbnRlbnQoZmlyc3RUaW1lID0gZmFsc2UpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBTZXQgaW5pdGlhbCBjb250ZW50XG4gICAgaWYgKHRoaXMuX21vZGVsIHx8IHRoaXMuX21vZGVsID09ICcnKSB7XG4gICAgICB0aGlzLl9vbGRNb2RlbCA9IHRoaXMuX21vZGVsO1xuICAgICAgaWYgKHRoaXMuX2hhc1NwZWNpYWxUYWcpIHtcblxuICAgICAgICBsZXQgdGFnczogT2JqZWN0ID0gdGhpcy5fbW9kZWw7XG5cbiAgICAgICAgLy8gYWRkIHRhZ3Mgb24gZWxlbWVudFxuICAgICAgICBpZiAodGFncykge1xuXG4gICAgICAgICAgZm9yIChsZXQgYXR0ciBpbiB0YWdzKSB7XG4gICAgICAgICAgICBpZiAodGFncy5oYXNPd25Qcm9wZXJ0eShhdHRyKSAmJiBhdHRyICE9IHRoaXMuSU5ORVJfSFRNTF9BVFRSKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIHRhZ3NbYXR0cl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0YWdzLmhhc093blByb3BlcnR5KHRoaXMuSU5ORVJfSFRNTF9BVFRSKSkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5pbm5lckhUTUwgPSB0YWdzW3RoaXMuSU5ORVJfSFRNTF9BVFRSXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmaXJzdFRpbWUpIHtcbiAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ2luaXRpYWxpemVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5zZXRIdG1sKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5zZXRIdG1sKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3lFZGl0b3IoKSB7XG4gICAgaWYgKHRoaXMuX2VkaXRvckluaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9lZGl0b3IuZGVzdHJveSgpO1xuICAgICAgdGhpcy5fZWRpdG9ySW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEVkaXRvcigpIHtcbiAgICBpZiAodGhpcy5fZWxlbWVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2VkaXRvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIHNlbmQgbWFudWFsIGVkaXRvciBpbml0aWFsaXphdGlvblxuICBwcml2YXRlIGdlbmVyYXRlTWFudWFsQ29udHJvbGxlcigpIHtcbiAgICBsZXQgY29udHJvbHMgPSB7XG4gICAgICBpbml0aWFsaXplOiB0aGlzLmNyZWF0ZUVkaXRvci5iaW5kKHRoaXMpLFxuICAgICAgZGVzdHJveTogdGhpcy5kZXN0cm95RWRpdG9yLmJpbmQodGhpcyksXG4gICAgICBnZXRFZGl0b3I6IHRoaXMuZ2V0RWRpdG9yLmJpbmQodGhpcyksXG4gICAgfTtcbiAgICB0aGlzLmZyb2FsYUluaXQuZW1pdChjb250cm9scyk7XG4gIH1cblxuICAvLyBUT0RPIG5vdCBzdXJlIGlmIG5nT25Jbml0IGlzIGV4ZWN1dGVkIGFmdGVyIEBpbnB1dHNcbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIGNoZWNrIGlmIG91dHB1dCBmcm9hbGFJbml0IGlzIHByZXNlbnQuIE1heWJlIG9ic2VydmVycyBpcyBwcml2YXRlIGFuZCBzaG91bGQgbm90IGJlIHVzZWQ/PyBUT0RPIGhvdyB0byBiZXR0ZXIgdGVzdCB0aGF0IGFuIG91dHB1dCBkaXJlY3RpdmUgaXMgcHJlc2VudC5cbiAgICBpZiAoIXRoaXMuZnJvYWxhSW5pdC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmNyZWF0ZUVkaXRvcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdlbmVyYXRlTWFudWFsQ29udHJvbGxlcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveUVkaXRvcigpO1xuICB9XG59XG4iXX0=