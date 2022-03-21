import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: 什么都没有找到" />
    <h1 className="text-gray-800">什么都没有找到</h1>
    <p className="text-gray-600">
      You just hit a route that doesn&#39;t exist... the sadness.
    </p>
  </Layout>
);

export default NotFoundPage;
