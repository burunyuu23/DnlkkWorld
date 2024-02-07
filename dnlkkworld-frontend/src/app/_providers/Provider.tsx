import {ReactNode} from "react";

import {StoreProvider} from "./Store";
import {SocketProvider} from "./Sockets";
import {ThemeProvider} from "./MUI";
import {SessionProvider} from "./Session";

type ProviderProps = {
    children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
    return (
        <SessionProvider>
            <StoreProvider>
                <SocketProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </SocketProvider>
            </StoreProvider>
        </SessionProvider>
    );
};

export default Provider;
