import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BricksComponent } from './components/bricks/bricks.component';
import { BricksEffects } from './store/bricks/bricks.effects';
import { bricksReducer } from './store/bricks/bricks.reducer';

@NgModule({
  declarations: [AppComponent, BricksComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ bricks: bricksReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([BricksEffects]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
