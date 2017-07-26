import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule,
  MdOptionModule, MdSelectModule, MdSlideToggleModule, MdIconModule, MdChipsModule, MdDialogModule,
  MdTabsModule , MdAutocompleteModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdCardModule,
    MdOptionModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdIconModule,
    MdChipsModule,
    MdDialogModule,
    MdTabsModule,
    MdAutocompleteModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdCardModule,
    MdOptionModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdIconModule,
    MdChipsModule,
    MdDialogModule,
    MdTabsModule,
    MdAutocompleteModule
  ],
})
export class MaterialModule {
}
