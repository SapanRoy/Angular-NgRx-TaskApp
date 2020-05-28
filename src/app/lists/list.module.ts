// core
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
// store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ListEffects } from './state/list.effects';
import { reducer } from './state/list.reducer';
// service
import { ListService } from './list.service';
import { CardService } from './components/cards/card.service';
// environment
import { environment } from '../../environments/environment';
// components
import { NewListComponent } from './components/list-add/list-new.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { CardComponent } from './components/cards/card.component';
import { NewCardComponent } from './components/cards/card-new/card-new.component.component';
import { ListShellComponent } from './containers/list-shell/list-shell.component';
import { ListDisplayComponent } from './components/list-disp/list-display.component';

@NgModule({
  declarations: [
    ListShellComponent, ListDisplayComponent, CardComponent, NewListComponent, NewCardComponent, ListEditComponent
  ],
  imports: [ReactiveFormsModule,
    EffectsModule,
    CommonModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    StoreModule.forFeature('lists', reducer),
    EffectsModule.forFeature(
      [ListEffects]
    ),
    StoreDevtoolsModule.instrument({
      name: 'Task Management',
      maxAge: 25,
      logOnly: environment.production
    })],
  providers: [ListService, CardService],
  exports: [ListShellComponent],
  entryComponents: [NewListComponent, NewCardComponent],
})
export class ListModule {
}
