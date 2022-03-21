import { Props } from "../../../player-app";
interface IpxProps {
    ipxArn: string | null;
    setIpxArn: (ipxArn: string | null) => void;
    ipxAddress: string | null;
    setIpxAddress: (ipxAddress: string | null) => void;
    awaitingIpxAddress: boolean;
    setAwaitingIpxAddress: (waitingIpx: boolean) => void;
}
export interface TokenProps extends Props {
    ipx: IpxProps;
    update: () => void;
}
export declare function TokenConfiguration(props: Props): import("preact").VNode<any> | import("preact").VNode<any>[];
export {};
