/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
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
        { type: Directive, args: [{
                    selector: '[froalaView]'
                },] }
    ];
    /** @nocollapse */
    FroalaViewDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    FroalaViewDirective.propDecorators = {
        froalaView: [{ type: Input }]
    };
    return FroalaViewDirective;
}());
export { FroalaViewDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWZyb2FsYS13eXNpd3lnLyIsInNvdXJjZXMiOlsidmlldy92aWV3LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RTtJQVFFLDZCQUFvQixRQUFtQixFQUFFLE9BQW1CO1FBQXhDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7SUFHRCxzQkFBYSwyQ0FBVTtRQUR2QixtQ0FBbUM7Ozs7Ozs7UUFDbkMsVUFBd0IsT0FBZTtZQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7Ozs7SUFFRCw2Q0FBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7O2dCQW5CRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCOzs7O2dCQUpzQyxTQUFTO2dCQUE1QixVQUFVOzs7NkJBZTNCLEtBQUs7O0lBT1IsMEJBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQWpCWSxtQkFBbUI7Ozs7OztJQUU5Qix1Q0FBOEI7Ozs7O0lBQzlCLHVDQUFzQjs7Ozs7SUFFVix1Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Zyb2FsYVZpZXddJ1xufSlcbmV4cG9ydCBjbGFzcyBGcm9hbGFWaWV3RGlyZWN0aXZlIHtcblxuICBwcml2YXRlIF9lbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfY29udGVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICAvLyB1cGRhdGUgY29udGVudCBtb2RlbCBhcyBpdCBjb21lc1xuICBASW5wdXQoKSBzZXQgZnJvYWxhVmlldyhjb250ZW50OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9lbGVtZW50LmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50LCBcImZyLXZpZXdcIik7XG4gIH1cbn1cbiJdfQ==