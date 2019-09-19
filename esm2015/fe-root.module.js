/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FroalaEditorModule } from './editor/editor.module';
import { FroalaViewModule } from './view/view.module';
import { NgModule } from '@angular/core';
/** @type {?} */
const MODULES = [
    FroalaEditorModule,
    FroalaViewModule
];
export class FERootModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmUtcm9vdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWZyb2FsYS13eXNpd3lnLyIsInNvdXJjZXMiOlsiZmUtcm9vdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7O01BRW5DLE9BQU8sR0FBRztJQUNkLGtCQUFrQjtJQUNsQixnQkFBZ0I7Q0FDakI7QUFTRCxNQUFNLE9BQU8sWUFBWTs7O1lBUHhCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1Asa0JBQWtCLENBQUMsT0FBTyxFQUFFO29CQUM1QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7aUJBQzNCO2dCQUNELE9BQU8sRUFBRSxPQUFPO2FBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnJvYWxhRWRpdG9yTW9kdWxlIH0gZnJvbSAnLi9lZGl0b3IvZWRpdG9yLm1vZHVsZSc7XG5pbXBvcnQgeyBGcm9hbGFWaWV3TW9kdWxlIH0gZnJvbSAnLi92aWV3L3ZpZXcubW9kdWxlJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IE1PRFVMRVMgPSBbXG4gIEZyb2FsYUVkaXRvck1vZHVsZSxcbiAgRnJvYWxhVmlld01vZHVsZVxuXVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgRnJvYWxhRWRpdG9yTW9kdWxlLmZvclJvb3QoKSxcbiAgICBGcm9hbGFWaWV3TW9kdWxlLmZvclJvb3QoKVxuICBdLFxuICBleHBvcnRzOiBNT0RVTEVTXG59KVxuZXhwb3J0IGNsYXNzIEZFUm9vdE1vZHVsZSB7fVxuIl19