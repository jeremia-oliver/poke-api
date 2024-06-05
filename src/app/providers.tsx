'use client';

import { useEffect, useState, createContext } from 'react';
import {
  createDOMRenderer,
  RendererProvider,
  FluentProvider,
  webLightTheme,
  SSRProvider,
} from '@fluentui/react-components';
import { RootStore } from '@/stores/store';

export const StoreContext = createContext(RootStore);

const renderer = createDOMRenderer();

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [ hasMounted, setHasMounted ] = useState(false);

    useEffect(() => {
      setHasMounted(true);
    }, []);

    if ( !hasMounted ) {
      return null;
    }
    
    return (
      <StoreContext.Provider value={RootStore}>
      <RendererProvider renderer={ renderer || createDOMRenderer() }>
        <SSRProvider>
          <FluentProvider theme={ webLightTheme }>
            { children }
          </FluentProvider>
        </SSRProvider>
      </RendererProvider>
      </StoreContext.Provider>
    );
}