/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWZyb2FsYS13eXNpd3lnLyIsInNvdXJjZXMiOlsidmlldy92aWV3LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUt4RSxNQUFNLE9BQU8sbUJBQW1COzs7OztJQUs5QixZQUFvQixRQUFtQixFQUFFLE9BQW1CO1FBQXhDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7Ozs7OztJQUdELElBQWEsVUFBVSxDQUFDLE9BQWU7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7WUFuQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2FBQ3pCOzs7O1lBSnNDLFNBQVM7WUFBNUIsVUFBVTs7O3lCQWUzQixLQUFLOzs7Ozs7O0lBUk4sdUNBQThCOzs7OztJQUM5Qix1Q0FBc0I7Ozs7O0lBRVYsdUNBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tmcm9hbGFWaWV3XSdcbn0pXG5leHBvcnQgY2xhc3MgRnJvYWxhVmlld0RpcmVjdGl2ZSB7XG5cbiAgcHJpdmF0ZSBfZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2NvbnRlbnQ6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgLy8gdXBkYXRlIGNvbnRlbnQgbW9kZWwgYXMgaXQgY29tZXNcbiAgQElucHV0KCkgc2V0IGZyb2FsYVZpZXcoY29udGVudDogc3RyaW5nKSB7XG4gICAgdGhpcy5fZWxlbWVudC5pbm5lckhUTUwgPSBjb250ZW50O1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudCwgXCJmci12aWV3XCIpO1xuICB9XG59XG4iXX0=