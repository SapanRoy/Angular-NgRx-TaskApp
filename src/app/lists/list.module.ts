// core
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
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
// environment
import { environment } from '../../environments/environment';
// components
import { NewListComponent } from './components/list-add/list-new.component';
import { CardComponent } from './components/cards/card.component';
import { NewCardComponent } from './components/cards/card-new/card-new.component.component';
import { ListShellComponent } from './containers/list-shell/list-shell.component';
import { ListDisplayComponent } from './components/list-disp/list-display.component';
import { CardService } from './components/cards/card.service';


@NgModule({
  declarations: [
    ListShellComponent, ListDisplayComponent, CardComponent, NewListComponent, NewCardComponent
  ],
  imports: [ReactiveFormsModule,
    EffectsModule,
    CommonModule, DragDropModule,
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
