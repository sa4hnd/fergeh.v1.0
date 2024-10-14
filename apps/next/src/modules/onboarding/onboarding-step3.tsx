import React from "react";

import { DefaultLayout } from "./default-layout";
import { PresentWrapper } from "./present-wrapper";

export const OnboardingStep3 = () => {
  return (
    <PresentWrapper>
      <DefaultLayout
        heading="فێربوون، تاقیکردنەوە، خوێندن بە رێگای یاری کردن و وانەکانت  ماستەر بکە لەگەڵ فێرگە"
        seoTitle="Onboarding Step 3"
        description="فێرگە هەموو ئەو شتانە کۆدەکاتەوە کە پێویستە بۆ سەرکەوتن، هەمووی لە یەک شوێن:

فلاشکاردەکان: بابەتگەلێکی ئاڵۆز بشکێنە بۆ کارتی ئاسان لەبیرت بێت. توێژینەوەکان دەریدەخەن کە فلاشکاردەکان دەتوانن ڕاگرتنی بیرگە تا ٧٠% بەرز بکەنەوە.
فێربوون: بابەتەکانی قورس بە بەشی فێربوونمانەوە خۆت بخزێنە سەر، کە بۆ بەهێزکردنی چەمکە سەرەکییەکان و یارمەتیت دەدات لە پاراستنی زانیارییەکان بە شێوەیەکی کاریگەر.
تاقیکردنەوە: خۆت بە کویزەکان تەحەدا بکە کە لەگەڵ ئاستەکەتدا دەگونجێت. خۆتاقیکردنەوە سەلمێنراوە کە بیرهێنانەوەی درێژخایەن باشتر دەکات و یارمەتیت دەدات ئەو 100 کەسە تەواو و بێ کەموکوڕییە بەدەستبهێنیت!
یاری کردن : کاتەکانی خوێندنەکە بگۆڕە بۆ کاتی یارییەکە لەگەڵ تایبەتمەندی یارییەکەمان. پێشبڕکێ لەگەڵ کاتژمێر بکە بۆ ئەوەی لەگەڵ مەرج و پێناسەکان بگونجێت لە هەمان کاتدا کاتێکی خۆش بەسەر بەریت.
گرنگ نییە شێوازی خوێندنەکەت چییە، فێرگە تۆی داپۆشیوە. ئێستا دەست پێ بکە و ڕێگەت بۆ سەرەوەی پۆلەکە بکە!"
      >
        {/* Add your custom content here */}
      </DefaultLayout>
    </PresentWrapper>
  );
};