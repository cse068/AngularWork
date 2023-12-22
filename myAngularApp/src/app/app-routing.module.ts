import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterAppComponent } from './counter-app/counter-app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WeatherAppComponent } from './weather-app/weather-app.component';

const routes: Routes = [
  {path:'',redirectTo: '/counter', pathMatch: 'full'},
  {path:'counter',component:CounterAppComponent},
  {path:'vatavaran',component:WeatherAppComponent},
  {path:'**',component:PageNotFoundComponent},
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
