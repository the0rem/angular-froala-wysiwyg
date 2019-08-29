/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Renderer, Input } from '@angular/core';
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
        this.renderer.setElementClass(this._element, "fr-view", true);
    };
    FroalaViewDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[froalaView]'
                },] }
    ];
    /** @nocollapse */
    FroalaViewDirective.ctorParameters = function () { return [
        { type: Renderer },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWZyb2FsYS13eXNpd3lnLyIsInNvdXJjZXMiOlsidmlldy92aWV3LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBa0MsTUFBTSxlQUFlLENBQUM7QUFFdkc7SUFRRSw2QkFBb0IsUUFBa0IsRUFBRSxPQUFtQjtRQUF2QyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN4QyxDQUFDO0lBR0Qsc0JBQWEsMkNBQVU7UUFEdkIsbUNBQW1DOzs7Ozs7O1FBQ25DLFVBQXdCLE9BQWU7WUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBOzs7O0lBRUQsNkNBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7Z0JBbkJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztpQkFDekI7Ozs7Z0JBSitCLFFBQVE7Z0JBQXBCLFVBQVU7Ozs2QkFlM0IsS0FBSzs7SUFPUiwwQkFBQztDQUFBLEFBcEJELElBb0JDO1NBakJZLG1CQUFtQjs7Ozs7O0lBRTlCLHVDQUE4Qjs7Ozs7SUFDOUIsdUNBQXNCOzs7OztJQUVWLHVDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIsIElucHV0LCBPdXRwdXQsIE9wdGlvbmFsLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Zyb2FsYVZpZXddJ1xufSlcbmV4cG9ydCBjbGFzcyBGcm9hbGFWaWV3RGlyZWN0aXZlIHtcblxuICBwcml2YXRlIF9lbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfY29udGVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyLCBlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIC8vIHVwZGF0ZSBjb250ZW50IG1vZGVsIGFzIGl0IGNvbWVzXG4gIEBJbnB1dCgpIHNldCBmcm9hbGFWaWV3KGNvbnRlbnQ6IHN0cmluZyl7XG4gICAgdGhpcy5fZWxlbWVudC5pbm5lckhUTUwgPSBjb250ZW50O1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudENsYXNzKHRoaXMuX2VsZW1lbnQsIFwiZnItdmlld1wiLCB0cnVlKTtcbiAgfVxufSJdfQ==