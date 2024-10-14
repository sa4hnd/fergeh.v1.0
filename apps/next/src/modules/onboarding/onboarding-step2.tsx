import React from "react";
import { DefaultLayout } from "./default-layout";
import { PresentWrapper } from "./present-wrapper";

export const OnboardingStep2 = () => {
  return (
    <PresentWrapper>
      <DefaultLayout
        heading="بە دەست هێنانی بەرزترین نمرە لە گەل فێرگە"
        seoTitle="Onboarding Step 2"
        description="زیاتر لە ملیونان خوێندکار بە بەکارهێنانی سیستەمی سمارت فلاشکارد نمرەکانیان باشتر کردووە، تەنانەت زۆرێکیان گەرەنتی نمرەی 100 ی تەواویان کردووە لە بەر ئەوە تیمی فێرگە بە فەر زانی ئەم سیستەمە بخێتە بەر دەستی قوتابیانی کوردی خوشەویست. سادەیە: بابەتەکەت هەڵبژێرە، خۆت بخزێنە ناو فلاشکاردی و سەیری گەشەکردنی زانیارییەکانتان بکە. بەشداری کۆمەڵگەی قوتابیانی سەرکەوتوی سەرەکیمان بکە و یەکەم هەنگاو بنێ بۆ شارەزابوون لە خوێندنەکەت."
      >
        {/* Add your custom content here */}
      </DefaultLayout>
    </PresentWrapper>
  );
};
