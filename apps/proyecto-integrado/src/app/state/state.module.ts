import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './effects/auth/auth.effects';
import { SharedModule } from '../core/shared/shared.module';
import { AuthActions } from './actions/auth/auth.actions';
import { ROOT_REDUCERS } from './app.state';
import { PartiesEffects } from './effects/parties/parties.effects';
import { CommsEffects } from './effects/comms/comms.effects';
import { TripsEffects } from './effects/trips/trips.effects';
import { AppState } from './interfaces/app.state.interface';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot([
      AuthEffects,
      PartiesEffects,
      CommsEffects,
      TripsEffects,
    ]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (store$: Store<AppState>) => {
        return () => {
          store$.dispatch(AuthActions.checkAuthRequest());
        };
      },
      multi: true,
      deps: [Store],
    },
  ],
})
export class StateModule {}
