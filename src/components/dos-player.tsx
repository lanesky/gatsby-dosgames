import React, { useEffect, useRef, useState } from 'react';

import { DosPlayer as Instance, DosPlayerFactoryType } from 'js-dos';

import { Helmet } from 'react-helmet';
declare const Dos: DosPlayerFactoryType;

interface PlayerProps {
  bundleUrl: string;
}

export default function DosPlayer(props: PlayerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [dos, setDos] = useState<Instance | null>(null);

  useEffect(() => {
    if (rootRef === null || rootRef.current === null) {
      return;
    }

    if (dos !== null) {
      return;
    }

    const root = rootRef.current as HTMLDivElement;
    const instance = Dos(root);

    // https://js-dos.com/v7/build/docs/jsdos-overview#advanced-options
    instance.options.noSocialLinks = true;

    setDos(instance);

    return () => {
      instance.stop();
    };
  }, [rootRef]);

  useEffect(() => {
    if (dos !== null) {
      dos.run(props.bundleUrl);
    }
  }, [dos, props.bundleUrl]);

  return (
    <>
      <div ref={rootRef} style={{ width: '100%', height: '100%' }}></div>
    </>
  );
}
