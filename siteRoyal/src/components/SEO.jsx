import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

function SEO() {
  const { t, i18n } = useTranslation();

  return (
    <Helmet>
      <title>{t('Royal Apart')}</title>
      <meta name="description" content={t('description')} />
      <link rel="alternate" href="https://www.royalapart.online/en" hreflang="en" />
      <link rel="alternate" href="https://www.royalapart.online/uk" hreflang="uk" />
    </Helmet>
  );
}

export default SEO;
