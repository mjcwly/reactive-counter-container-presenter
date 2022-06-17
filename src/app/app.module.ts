import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { StepSelectionComponent } from './components/step-selection/step-selection.component';
import { TickSettingsComponent } from './components/tick-settings/tick-settings.component';
import { CounterComponent } from './components/counter/counter.component';
import { ManualControlsComponent } from './components/manual-controls/manual-controls.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    StepSelectionComponent,
    TickSettingsComponent,
    CounterComponent,
    ManualControlsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
