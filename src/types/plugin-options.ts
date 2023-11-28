import Handler from "@types/handler";

type PluginOptions = {
    /**
     * If set to false, Generated UI on admin dashboard will be disabled.
     * 
     * @prop {boolean} [enableUi=true]
     */
    enableUI?: boolean;
    /**
    * Your medusa backend URL.
    * 
    * @prop {string}
    */
    backendUrl: string;

    /**
     * Handlers are the interface through which you can configure external source of messages, ex: instagram, facebook, ... Please refer to the documentation to know more
     * 
     * @prop {array}
     */
    handlers?: Handler[];
}

export default PluginOptions;