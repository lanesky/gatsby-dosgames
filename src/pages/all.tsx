import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const AllPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="所有游戏" />
      <main>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-2">
          {data.games.nodes.map(game => (
            <Link to={`${game.slug}`}>{game.identifier}</Link>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default AllPage;

export const query = graphql`
  {
    games: allGame(filter: { canDownload: { ne: null } }) {
      nodes {
        identifier
        slug: gatsbyPath(filePath: "/games/{Game.sha256}")
        releaseYear
        coverFilename
        filesize
        sha256
        name {
          en
        }
        canDownload
      }
    }
  }
`;
