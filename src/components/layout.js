/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';

function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <p className="text-center mb-2 py-2 bg-yellow-300 text-orange-600 font-bold rounded">
        注意本网站仅供学习使用，请勿做其他用途。
      </p>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">{children}</div>
        <footer className="py-4 text-center text-gray-500">
          © {new Date().getFullYear()}, DOS老游戏
        </footer>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
