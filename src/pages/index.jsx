import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="首页" />

      <header className="mb-8">
        <div className="w-1/2">
          <h1 className="text-3xl text-gray-500 py-2">经典DOS老游戏在线玩</h1>
          <p className="text-2xl font-bold text-gray-500 py-2">
            红色警戒，仙剑奇侠传，大富翁，这里有大量的经典的DOS老游戏。
            所有的游戏都是用js-dos，完全无需安装，直接在浏览器上就可以运行！
          </p>
        </div>
      </header>

      <main>
        <div className="grid grid-cols-4 gap-4">
          {data.games.nodes.map(game => (
            <div
              className="p-2 bg-white hover:bg-orange-200 transition-colors rounded-xl shadow-lg"
              key={game.identifier}
            >
              <div className="mb-1 text-center text-gray-500 text-lg">
                {`${game.identifier} (${game.releaseYear})`}
              </div>
              <Link to={`${game.slug}`}>
                <div
                  style={{
                    maxWidth: `500px`,
                    maxHeight: `500px`,
                  }}
                >
                  <img
                    className="object-fit"
                    src={`https://dosgames.s3.amazonaws.com/images/${game.identifier}/${game.coverFilename}`}
                    alt={game.identifier}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  {
    games: allGame(
      limit: 20
      filter: { releaseYear: { ne: null }, canDownload: { ne: null } }
    ) {
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
