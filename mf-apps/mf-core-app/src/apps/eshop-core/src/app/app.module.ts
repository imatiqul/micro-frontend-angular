/*
 * This RemoteEntryModule is imported here to allow TS to find the Module during
 * compilation, allowing it to be included in the built bundle. This is required
 * for the Module Federation Plugin to expose the Module correctly.
 * */
import { RemoteEntryModule } from './remote-entry/entry.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientXsrfModule, HttpClient } from '@angular/common/http';
import { httpInterceptorProviders } from './http-clients/http-interceptors';
import { EshopHttpClient, eshopHttpClientCreator } from './http-clients/eshop-http-client';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [httpInterceptorProviders,
    // Provide the extended HttpClient
    {
      provide: EshopHttpClient,
      useFactory: eshopHttpClientCreator,
      deps: [HttpClient]
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
