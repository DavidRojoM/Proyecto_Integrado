import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './effects/auth/auth.effects';
import { SharedModule } from '../core/shared/shared.module';
import { AuthActions } from './actions/auth/auth.actions';
import { ROOT_REDUCERS } from './app.state';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<any>) => {
        return () => {
          store.dispatch(AuthActions.checkAuthRequest());
        };
      },
      multi: true,
      deps: [Store],
    },
  ],
})
export class StateModule {}
