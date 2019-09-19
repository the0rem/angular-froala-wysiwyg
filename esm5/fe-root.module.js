/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FroalaEditorModule } from './editor';
import { FroalaViewModule } from './view';
import { NgModule } from '@angular/core';
/** @type {?} */
var MODULES = [
    FroalaEditorModule,
    FroalaViewModule
];
var FERootModule = /** @class */ (function () {
    function FERootModule() {
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
    return FERootModule;
}());
export { FERootModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmUtcm9vdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWZyb2FsYS13eXNpd3lnLyIsInNvdXJjZXMiOlsiZmUtcm9vdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDMUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUFFbkMsT0FBTyxHQUFHO0lBQ2Qsa0JBQWtCO0lBQ2xCLGdCQUFnQjtDQUNqQjtBQUVEO0lBQUE7SUFPMkIsQ0FBQzs7Z0JBUDNCLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1Asa0JBQWtCLENBQUMsT0FBTyxFQUFFO3dCQUM1QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7cUJBQzNCO29CQUNELE9BQU8sRUFBRSxPQUFPO2lCQUNqQjs7SUFDMEIsbUJBQUM7Q0FBQSxBQVA1QixJQU80QjtTQUFmLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGcm9hbGFFZGl0b3JNb2R1bGUgfSBmcm9tICcuL2VkaXRvcic7XG5pbXBvcnQgeyBGcm9hbGFWaWV3TW9kdWxlIH0gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IE1PRFVMRVMgPSBbXG4gIEZyb2FsYUVkaXRvck1vZHVsZSxcbiAgRnJvYWxhVmlld01vZHVsZVxuXVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgRnJvYWxhRWRpdG9yTW9kdWxlLmZvclJvb3QoKSxcbiAgICBGcm9hbGFWaWV3TW9kdWxlLmZvclJvb3QoKVxuICBdLFxuICBleHBvcnRzOiBNT0RVTEVTXG59KVxuZXhwb3J0IGNsYXNzIEZFUm9vdE1vZHVsZSB7fVxuIl19