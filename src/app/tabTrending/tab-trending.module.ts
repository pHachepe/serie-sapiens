import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabTrendingPage } from './tab-trending.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabTrendingPageRoutingModule } from './tab-trending-routing.module';
import { WrapperModule } from "../components/swiper/swiper.component";

@NgModule({
    declarations: [TabTrendingPage],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        TabTrendingPageRoutingModule,
        WrapperModule
    ]
})
export class TabTrendingPageModule {}
