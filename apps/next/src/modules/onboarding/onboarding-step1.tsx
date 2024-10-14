import React from "react";

import { DefaultLayout } from "./default-layout";
import { PresentWrapper } from "./present-wrapper";

export const OnboardingStep1 = () => {
  return (
    <PresentWrapper>
      <DefaultLayout
        heading="هێزی فلاشکارد ئاشکەرابکە"
        seoTitle="Onboarding Step 1"
        description="بەخێربێن بۆ فێرگە! توێژینەوەکان دەریدەخەن کە بەکارهێنانی فلاشکارد  کاریگەرترین ڕێگایە بۆ ڕاگرتنی زانیارییەکان و بە گرەنتی لە بیرنەکردن . بە چالاککردنی چالاکانەی مێشکت لە ڕێگەی دووبارەکردنەوەی جیاوازەوە کە پێی دەلێن تەکنیکی سپەیسد رێپێتشن، دەتوانیت خوێندنەکەت بەرهەمدارتر بکەیت. توێژینەوەکان ئاماژە بەوە دەکەن کە فلاشکاردەکان دەتوانن ڕاگرتنی بیرگە تا ٧٠% بەرز بکەنەوە. ئامادەی تاقیکردنەوەی داهاتووتان بکەن؟ با دەست پێ بکەین!"
      >
        {/* Add your custom content here */}
      </DefaultLayout>
    </PresentWrapper>
  );
};
