/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Renderer, Input } from '@angular/core';
export class FroalaViewDirective {
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
        this.renderer.setElementClass(this._element, "fr-view", true);
    }
}
FroalaViewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[froalaView]'
            },] }
];
/** @nocollapse */
FroalaViewDirective.ctorParameters = () => [
    { type: Renderer },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWZyb2FsYS13eXNpd3lnLyIsInNvdXJjZXMiOlsidmlldy92aWV3LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBa0MsTUFBTSxlQUFlLENBQUM7QUFLdkcsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7SUFLOUIsWUFBb0IsUUFBa0IsRUFBRSxPQUFtQjtRQUF2QyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN4QyxDQUFDOzs7Ozs7SUFHRCxJQUFhLFVBQVUsQ0FBQyxPQUFlO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7OztZQW5CRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7YUFDekI7Ozs7WUFKK0IsUUFBUTtZQUFwQixVQUFVOzs7eUJBZTNCLEtBQUs7Ozs7Ozs7SUFSTix1Q0FBOEI7Ozs7O0lBQzlCLHVDQUFzQjs7Ozs7SUFFVix1Q0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyLCBJbnB1dCwgT3V0cHV0LCBPcHRpb25hbCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tmcm9hbGFWaWV3XSdcbn0pXG5leHBvcnQgY2xhc3MgRnJvYWxhVmlld0RpcmVjdGl2ZSB7XG5cbiAgcHJpdmF0ZSBfZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2NvbnRlbnQ6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlciwgZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICAvLyB1cGRhdGUgY29udGVudCBtb2RlbCBhcyBpdCBjb21lc1xuICBASW5wdXQoKSBzZXQgZnJvYWxhVmlldyhjb250ZW50OiBzdHJpbmcpe1xuICAgIHRoaXMuX2VsZW1lbnQuaW5uZXJIVE1MID0gY29udGVudDtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRDbGFzcyh0aGlzLl9lbGVtZW50LCBcImZyLXZpZXdcIiwgdHJ1ZSk7XG4gIH1cbn0iXX0=