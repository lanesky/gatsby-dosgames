// If you don't want to use TypeScript you can delete this file!
import React, { useState, useEffect } from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import DosPlayer from '../../components/dos-player';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

type DataProps = {
  game: {
    identifier: string;
    releaseYear: number;
    coverFilename: string;
    filesize: number;
    name: {
      en: string;
    };
    links: {
      name: string;
      link: string;
    }[];
  };
};

const Game: React.FC<PageProps<DataProps>> = ({ data }) => {
  const [loading, setLoading] = useState(true);
  console.log(data);
  useEffect(() => {
    const mainScript = document.createElement('script');
    mainScript.src = `/js-dos/js-dos.js`;
    mainScript.onload = () => {
      const secondaryScript = document.createElement('script');
      secondaryScript.type = 'text/javascript';
      secondaryScript.appendChild(
        document.createTextNode(`
            emulators.pathPrefix = "/js-dos/";
          `)
      );
      document.head.appendChild(secondaryScript);
      setLoading(false);
      console.log('secondary script loaded');
    };

    document.head.appendChild(mainScript);
    console.log('main script loaded');
  }, []);

  return (
    <Layout>
      <SEO title={`${data.game.identifier}`} />
      <Helmet>
        <link rel="stylesheet" href="/js-dos/js-dos.css"></link>
      </Helmet>

      <div className="container mx-auto mb-6">
        <h1 className="text-3xl text-orange-700">{data.game.identifier}</h1>
        <div
          className="my-8 text-xs"
          style={{ width: '640px', height: '400px' }}
        >
          {!loading && (
            <DosPlayer
              bundleUrl={`https://dosgames.s3.amazonaws.com/${data.game.identifier}.jsdos.zip`}
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xl text-orange-700 mb-4">相关信息</p>
          <div>
            {data.game.links &&
              data.game.links.map(link => (
                <a
                  className="text-lg block mb-2"
                  href={link.link}
                  target="_blank"
                  key={link.name}
                >
                  {link.name}
                </a>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Game;

export const query = graphql`
  query ($id: String!) {
    game(id: { eq: $id }) {
      identifier
      releaseYear
      coverFilename
      filesize
      links {
        name
        link
      }
      name {
        en
      }
    }
  }
`;
